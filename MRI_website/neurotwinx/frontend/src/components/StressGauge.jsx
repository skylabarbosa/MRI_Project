const STYLES = {
  calm: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  moderate: 'bg-amber-100 text-amber-700 border-amber-200',
  high: 'bg-red-100 text-red-700 border-red-200'
};

export default function StressGauge({ stress = 'calm' }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold capitalize ${STYLES[stress] || STYLES.calm}`}>
      {stress}
    </span>
  );
}
