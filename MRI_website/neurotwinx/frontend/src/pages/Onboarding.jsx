import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar, { Logo } from '../components/Navbar.jsx';

const checklist = [
  'Headset is on and adjusted',
  'Pulse sensor attached to finger',
  'Found a comfortable seated position',
  'Removed glasses or jewellery'
];

export default function Onboarding() {
  const [checked, setChecked] = useState([]);
  const [launching, setLaunching] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const isReady = checked.length === checklist.length;

  useEffect(() => {
    if (!launching) return undefined;
    const start = Date.now();
    const interval = window.setInterval(() => {
      const percent = Math.min(((Date.now() - start) / 4000) * 100, 100);
      setProgress(percent);
      if (percent >= 100) {
        window.clearInterval(interval);
        navigate('/vr-experience');
      }
    }, 80);
    return () => window.clearInterval(interval);
  }, [launching, navigate]);

  const toggle = (item) => {
    setChecked((current) => (current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item]));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="mx-auto max-w-4xl px-5 py-12">
        <div className="grid grid-cols-3 gap-3">
          {[
            ['Check In', true, false],
            ['VR Simulation', false, true],
            ['Real Scan', false, false]
          ].map(([label, done, active]) => (
            <div key={label} className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${done ? 'bg-teal-600 text-white' : active ? 'border-2 border-teal-600 text-teal-700' : 'border border-slate-300 text-slate-500'}`}>
                {done ? '✓' : active ? '2' : '3'}
              </div>
              <span className={`hidden text-sm font-semibold sm:inline ${active ? 'text-teal-700' : 'text-slate-600'}`}>{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-lg border border-slate-200 bg-white p-6 md:p-8">
          <h1 className="text-3xl font-extrabold text-slate-950">VR Simulation Checklist</h1>
          <p className="mt-3 text-slate-600">Confirm each setup item before launching the MRI preparation environment.</p>
          <div className="mt-8 grid gap-3">
            {checklist.map((item) => (
              <label key={item} className="flex cursor-pointer items-center gap-4 rounded-md border border-slate-200 p-4 transition hover:border-teal-300">
                <input
                  type="checkbox"
                  checked={checked.includes(item)}
                  onChange={() => toggle(item)}
                  className="h-5 w-5 accent-teal-600"
                />
                <span className="font-medium text-slate-800">{item}</span>
              </label>
            ))}
          </div>
          <button
            type="button"
            disabled={!isReady}
            onClick={() => setLaunching(true)}
            className="mt-8 w-full rounded-md bg-teal-600 px-5 py-3 text-sm font-bold text-white transition enabled:hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Launch VR Simulation
          </button>
        </div>
      </section>
      {launching && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 px-6 text-white">
          <div className="animate-pulse"><Logo /></div>
          <p className="mt-8 text-xl font-semibold">Initialising VR environment...</p>
          <div className="mt-6 h-3 w-full max-w-md overflow-hidden rounded-full bg-slate-800">
            <div className="h-full bg-teal-400 transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}
