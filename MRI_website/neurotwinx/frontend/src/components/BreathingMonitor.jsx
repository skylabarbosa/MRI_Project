import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function BreathingMonitor({ history }) {
  const data = history.map((item, index) => ({
    index: index + 1,
    br: item.br
  }));

  return (
    <div className="h-72 rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="text-base font-bold text-slate-950">Breathing Rate Chart</h2>
      <ResponsiveContainer width="100%" height="88%">
        <LineChart data={data} margin={{ top: 18, right: 12, bottom: 0, left: -24 }}>
          <XAxis dataKey="index" tick={{ fontSize: 11 }} />
          <YAxis domain={[10, 30]} tick={{ fontSize: 11 }} />
          <Tooltip />
          <Line type="monotone" dataKey="br" stroke="#4f46e5" strokeWidth={3} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
