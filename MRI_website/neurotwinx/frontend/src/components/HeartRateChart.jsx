import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function HeartRateChart({ history }) {
  const data = history.map((item, index) => ({
    index: index + 1,
    hr: item.hr
  }));

  return (
    <div className="h-72 rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="text-base font-bold text-slate-950">Heart Rate Chart</h2>
      <ResponsiveContainer width="100%" height="88%">
        <LineChart data={data} margin={{ top: 18, right: 12, bottom: 0, left: -24 }}>
          <XAxis dataKey="index" tick={{ fontSize: 11 }} />
          <YAxis domain={[50, 115]} tick={{ fontSize: 11 }} />
          <Tooltip />
          <Line type="monotone" dataKey="hr" stroke="#0F6E56" strokeWidth={3} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
