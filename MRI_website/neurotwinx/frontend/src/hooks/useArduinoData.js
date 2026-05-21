import { useEffect, useRef, useState } from 'react';

const INITIAL_DATA = {
  hr: null,
  spo2: null,
  br: null,
  stress: 'calm',
  isConnected: false,
  error: 'Waiting for hardware bridge',
  history: []
};

function classifyStress({ hr, br }) {
  if (hr > 100 || br > 24) return 'high';
  if ((hr >= 86 && hr <= 100) || (br >= 19 && br <= 24)) return 'moderate';
  return 'calm';
}

export default function useArduinoData() {
  const [state, setState] = useState(INITIAL_DATA);
  const retryRef = useRef(500);
  const timeoutRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const connect = () => {
      const socket = new WebSocket('ws://localhost:8080');
      wsRef.current = socket;

      socket.onopen = () => {
        retryRef.current = 500;
        if (isMounted) {
          setState((current) => ({ ...current, isConnected: true, error: null }));
        }
      };

      socket.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          const reading = {
            hr: Number(payload.hr),
            spo2: Number(payload.spo2),
            br: Number(payload.br),
            raw: Number(payload.raw ?? 0),
            stress: payload.stress || classifyStress(payload),
            timestamp: payload.timestamp || new Date().toISOString()
          };

          if (!Number.isFinite(reading.hr) || !Number.isFinite(reading.br) || !Number.isFinite(reading.spo2)) {
            throw new Error('Malformed sensor packet');
          }

          if (isMounted) {
            setState((current) => ({
              ...current,
              ...reading,
              isConnected: true,
              error: null,
              history: [...current.history, reading].slice(-30)
            }));
          }
        } catch (error) {
          if (isMounted) {
            setState((current) => ({ ...current, error: error.message || 'Unable to read hardware packet' }));
          }
        }
      };

      const scheduleReconnect = (message) => {
        if (!isMounted) return;
        setState((current) => ({ ...current, isConnected: false, error: message }));
        const delay = Math.min(retryRef.current, 5000);
        retryRef.current = Math.min(retryRef.current * 1.6, 5000);
        timeoutRef.current = window.setTimeout(connect, delay);
      };

      socket.onerror = () => {
        scheduleReconnect('Hardware disconnected');
      };

      socket.onclose = () => {
        scheduleReconnect('Hardware disconnected');
      };
    };

    connect();

    return () => {
      isMounted = false;
      window.clearTimeout(timeoutRef.current);
      wsRef.current?.close();
    };
  }, []);

  return state;
}
