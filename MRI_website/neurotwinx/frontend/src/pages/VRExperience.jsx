import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useArduinoData from '../hooks/useArduinoData.js';

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

export default function VRExperience() {
  const data = useArduinoData();
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = window.setInterval(() => setSeconds((current) => current + 1), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-slate-950 text-white">
      <style>{'@keyframes breathe{0%,100%{transform:scale(1);opacity:.24}50%{transform:scale(1.08);opacity:.42}}'}</style>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[60vmin] w-[60vmin] rounded-full border border-teal-400/25 bg-teal-400/10" style={{ animation: 'breathe 5.5s ease-in-out infinite' }} />
      </div>
      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-between px-5 py-8">
        <div className="w-full text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-400">NeuroTwinX VR - Session Active</p>
          <h1 className="mt-5 text-4xl font-extrabold md:text-6xl">{formatTime(seconds)}</h1>
        </div>
        <div className="flex h-56 w-56 items-center justify-center rounded-full border border-teal-400/50">
          <div className="h-28 w-28 animate-ping rounded-full bg-teal-400/30" />
        </div>
        <div className="w-full">
          {!data.isConnected && (
            <div className="mx-auto mb-5 max-w-xl rounded-md border border-amber-400/50 bg-amber-400/10 px-4 py-3 text-center text-sm font-semibold text-amber-100">
              Hardware disconnected
            </div>
          )}
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ['Heart Rate', data.hr ?? '--', 'bpm'],
              ['Breathing Rate', data.br ?? '--', 'br/min'],
              ['Stress Level', data.stress, '']
            ].map(([label, value, unit]) => (
              <div key={label} className="rounded-lg border border-teal-400/30 bg-slate-900/85 p-5 text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
                <p className="mt-2 text-2xl font-extrabold capitalize text-white">{value} <span className="text-sm font-semibold text-teal-300">{unit}</span></p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="mx-auto mt-6 block rounded-md border border-teal-400 px-6 py-3 text-sm font-bold text-teal-100 transition hover:bg-teal-400 hover:text-slate-950"
          >
            End Session
          </button>
        </div>
      </section>
    </div>
  );
}
