const int pulsePin = A0;
const int breathingPin = A1;
const int ledPin = 13;

int threshold = 540;
bool pulseHigh = false;
unsigned long lastBeat = 0;
unsigned long lastSend = 0;
int bpm = 72;

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int pulseRaw = analogRead(pulsePin);
  int breathRaw = analogRead(breathingPin);
  unsigned long now = millis();

  if (pulseRaw > threshold && !pulseHigh && now - lastBeat > 300) {
    unsigned long interval = now - lastBeat;
    if (lastBeat > 0 && interval > 300 && interval < 1600) {
      bpm = 60000 / interval;
    }
    lastBeat = now;
    pulseHigh = true;
    digitalWrite(ledPin, HIGH);
  }

  if (pulseRaw < threshold - 25) {
    pulseHigh = false;
    digitalWrite(ledPin, LOW);
  }

  if (now - lastSend >= 200) {
    lastSend = now;
    int br = map(breathRaw, 0, 1023, 12, 30);
    int spo2 = 97 + ((pulseRaw / 32) % 3) - 1;

    Serial.print("{\"hr\":");
    Serial.print(constrain(bpm, 45, 140));
    Serial.print(",\"spo2\":");
    Serial.print(constrain(spo2, 95, 99));
    Serial.print(",\"br\":");
    Serial.print(constrain(br, 12, 30));
    Serial.print(",\"raw\":");
    Serial.print(pulseRaw);
    Serial.println("}");
  }
}
