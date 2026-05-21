import { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import PatientStatusCard from '../components/PatientStatusCard.jsx';
import StressGauge from '../components/StressGauge.jsx';
import HeartRateChart from '../components/HeartRateChart.jsx';
import BreathingMonitor from '../components/BreathingMonitor.jsx';
import useArduinoData from '../hooks/useArduinoData.js';

const stressScore = { calm: 0, moderate: 1, high: 2 };
const stressWidth = { calm: '33%', moderate: '66%', high: '100%' };
const stressColor = { calm: 'bg-emerald-500', moderate: 'bg-amber-500', high: 'bg-red-500' };

export default function Dashboard() {
  const data = useArduinoData();
  const [anxietyDetected, setAnxietyDetected] = useState(false);
  const [logs, setLogs] = useState([]);
  const lastStress = useRef(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const lastTen = data.history.slice(-10);
      if (!lastTen.length) return;
      const average = lastTen.reduce((sum, item) => sum + stressScore[item.stress], 0) / lastTen.length;
      setAnxietyDetected(average >= 1);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [data.history]);

  useEffect(() => {
    if (!data.stress || data.stress === lastStress.current || !data.hr) return;
    lastStress.current = data.stress;
    setLogs((current) => [
      {
        timestamp: new Date().toLocaleTimeString(),
        stress: data.stress,
        hr: data.hr,
        br: data.br
      },
      ...current
    ].slice(0, 8));
  }, [data.stress, data.hr, data.br]);

  const metrics = useMemo(
    () => [
      ['Current HR', data.hr ?? '--', 'bpm'],
      ['SpO2', data.spo2 ?? '--', '%'],
      ['Breathing Rate', data.br ?? '--', 'br/min']
    ],
    [data.hr, data.spo2, data.br]
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="mx-auto max-w-6xl px-5 py-8">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-950">Patient Stress Dashboard</h1>
            <p className="mt-2 text-slate-600">Live MRI readiness monitoring from NeuroTwinX hardware bridge.</p>
          </div>
          <StressGauge stress={data.stress} />
        </div>
        {!data.isConnected && (
          <div className="mb-5 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
            Hardware disconnected
          </div>
        )}
        <PatientStatusCard />
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {metrics.map(([label, value, unit]) => (
            <div key={label} className="rounded-lg border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-slate-500">{label}</p>
              <p className="mt-3 text-3xl font-extrabold text-slate-950">{value} <span className="text-sm text-slate-500">{unit}</span></p>
            </div>
          ))}
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold text-slate-500">Stress Level</p>
            <div className="mt-4"><StressGauge stress={data.stress} /></div>
          </div>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <HeartRateChart history={data.history} />
          <BreathingMonitor history={data.history} />
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-base font-bold text-slate-950">Stress Timeline</h2>
            <div className="mt-5 h-5 overflow-hidden rounded-full bg-slate-100">
              <div className={`h-full ${stressColor[data.stress] || stressColor.calm} transition-all duration-500`} style={{ width: stressWidth[data.stress] || '33%' }} />
            </div>
            <div className="mt-3 flex justify-between text-xs font-semibold text-slate-500">
              <span>Calm</span><span>Moderate</span><span>High</span>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-base font-bold text-slate-950">Scan Anxiety Assessment</h2>
            <div className={`mt-5 rounded-md px-4 py-4 text-sm font-bold ${anxietyDetected ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {anxietyDetected ? 'Scan anxiety detected' : 'Patient is calm'}
            </div>
          </div>
        </div>
        <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-base font-bold text-slate-950">Session Log</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-5 py-3">Timestamp</th>
                  <th className="px-5 py-3">Stress Level</th>
                  <th className="px-5 py-3">HR</th>
                  <th className="px-5 py-3">BR</th>
                </tr>
              </thead>
              <tbody>
                {logs.length ? logs.map((log) => (
                  <tr key={`${log.timestamp}-${log.stress}`} className="border-t border-slate-100">
                    <td className="px-5 py-3">{log.timestamp}</td>
                    <td className="px-5 py-3 capitalize">{log.stress}</td>
                    <td className="px-5 py-3">{log.hr}</td>
                    <td className="px-5 py-3">{log.br}</td>
                  </tr>
                )) : (
                  <tr>
                    <td className="px-5 py-4 text-slate-500" colSpan="4">Waiting for stress level changes...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
