import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import ArduinoBridge from './arduinoBridge.js';
import { classifyStress } from './stressEngine.js';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true, mode: useDemoMode ? 'demo' : 'serial' });
});

const httpPort = 3001;
const wsPort = 8080;
let useDemoMode = process.env.DEMO_MODE === 'true';
let latestReading = null;
let demoStart = Date.now();
let demoTick = 0;

const clients = new Set();
const wss = new WebSocketServer({ port: wsPort });

function withStress(reading) {
  return {
    ...reading,
    stress: classifyStress(reading),
    timestamp: new Date().toISOString()
  };
}

function generateDemoReading() {
  const t = (Date.now() - demoStart) / 1000;
  const spike = t > 30 && t < 40 ? 1 : 0;
  const coolDown = t >= 40 && t < 52 ? (52 - t) / 12 : 0;
  const hrBase = 82 + Math.sin(demoTick / 18) * 17;
  const brBase = 19 + Math.sin(demoTick / 21) * 5;
  demoTick += 1;

  const hr = Math.round(hrBase + spike * 20 + coolDown * 12 + (Math.random() * 4 - 2));
  const br = Math.round(brBase + spike * 6 + coolDown * 3 + (Math.random() * 2 - 1));
  const spo2 = Math.round(97 + Math.sin(demoTick / 30) * 1.5 + (Math.random() - 0.5));

  return withStress({
    hr: Math.max(65, Math.min(hr, 108)),
    br: Math.max(14, Math.min(br, 27)),
    spo2: Math.max(95, Math.min(spo2, 99)),
    raw: Math.round(500 + Math.sin(demoTick / 4) * 110 + Math.random() * 25)
  });
}

function broadcast(reading) {
  const message = JSON.stringify(reading);
  clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  });
}

function enableDemoMode(reason) {
  if (!useDemoMode) {
    console.error(`[server] Falling back to demo mode: ${reason}`);
  }
  useDemoMode = true;
  demoStart = Date.now();
}

if (!useDemoMode) {
  const bridge = new ArduinoBridge();
  bridge.on('data', (reading) => {
    latestReading = withStress(reading);
  });
  bridge.on('fallback', enableDemoMode);
  bridge.start();
}

wss.on('connection', (socket) => {
  clients.add(socket);
  if (latestReading) {
    socket.send(JSON.stringify(latestReading));
  }
  socket.on('close', () => clients.delete(socket));
  socket.on('error', (error) => {
    console.error(`[ws] Client error: ${error.message}`);
    clients.delete(socket);
  });
});

setInterval(() => {
  if (useDemoMode) {
    latestReading = generateDemoReading();
  }
  if (latestReading) {
    broadcast(latestReading);
  }
}, 200);

app.listen(httpPort, () => {
  console.log(`[server] Express listening on http://localhost:${httpPort}`);
  console.log(`[server] WebSocket listening on ws://localhost:${wsPort}`);
  console.log(`[server] Mode: ${useDemoMode ? 'DEMO' : 'SERIAL'}`);
});
