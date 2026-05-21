import { EventEmitter } from 'node:events';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

export default class ArduinoBridge extends EventEmitter {
  constructor() {
    super();
    this.port = null;
  }

  start() {
    const path = process.env.ARDUINO_PORT;
    const baudRate = Number(process.env.ARDUINO_BAUD || 9600);

    if (!path) {
      this.emit('fallback', 'ARDUINO_PORT is not configured');
      return;
    }

    try {
      this.port = new SerialPort({ path, baudRate });
      const parser = this.port.pipe(new ReadlineParser({ delimiter: '\n' }));

      parser.on('data', (line) => {
        try {
          const reading = JSON.parse(String(line).trim());
          this.emit('data', reading);
        } catch (error) {
          console.error(`[arduinoBridge] Invalid JSON from Arduino: ${line}`);
        }
      });

      this.port.on('open', () => {
        console.log(`[arduinoBridge] Connected to Arduino on ${path} at ${baudRate}`);
      });

      this.port.on('error', (error) => {
        console.error(`[arduinoBridge] Serial port error: ${error.message}`);
        this.emit('fallback', error.message);
      });
    } catch (error) {
      console.error(`[arduinoBridge] Unable to open serial port: ${error.message}`);
      this.emit('fallback', error.message);
    }
  }
}
