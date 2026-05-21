export function classifyStress({ hr, br }) {
  if (hr > 100 || br > 24) return 'high';
  if ((hr >= 86 && hr <= 100) || (br >= 19 && br <= 24)) return 'moderate';
  return 'calm';
}

export function assessScanAnxiety(readings = []) {
  const lastTen = readings.slice(-10);
  if (!lastTen.length) return false;

  const score = { calm: 0, moderate: 1, high: 2 };
  const average = lastTen.reduce((sum, reading) => {
    const stress = reading.stress || classifyStress(reading);
    return sum + score[stress];
  }, 0) / lastTen.length;

  return average >= 1;
}
