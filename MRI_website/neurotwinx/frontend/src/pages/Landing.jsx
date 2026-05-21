import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import VRLauncher from '../components/VRLauncher.jsx';

const features = [
  'Real-time stress monitoring',
  'Safe & non-invasive',
  'Personalised adaptive response',
  'Session summary for care team'
];

export default function Landing() {
  return (
    <div className="bg-slate-50">
      <Navbar />
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-24">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-teal-600">Where AI meets empathy in healthcare</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight text-slate-950 md:text-6xl">
            Feel calm, stay still, experience your scan first
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            NeuroTwinX prepares patients for MRI scans with an adaptive VR rehearsal that responds to live heart rate, breathing and anxiety signals.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <VRLauncher />
            <Link to="/dashboard" className="rounded-md border border-teal-600 px-5 py-3 text-center text-sm font-semibold text-teal-700 transition hover:bg-teal-50">
              View Dashboard
            </Link>
          </div>
        </div>
        <div className="rounded-lg border border-teal-100 bg-white p-5 shadow-sm">
          <div className="aspect-[4/3] rounded-md bg-teal-50 p-6">
            <div className="flex h-full flex-col justify-between rounded-md border border-teal-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-teal-800">MRI Prep Session</span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">Calm</span>
              </div>
              <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border-[14px] border-teal-400 text-center text-sm font-bold text-teal-800">
                VR MRI Preview
              </div>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="rounded-md bg-slate-50 p-3"><b>72</b><br />bpm</div>
                <div className="rounded-md bg-slate-50 p-3"><b>16</b><br />br/min</div>
                <div className="rounded-md bg-slate-50 p-3"><b>98%</b><br />SpO2</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['89%', 'reduced anxiety'],
            ['3 min', 'avg prep'],
            ['~0', 'sedation']
          ].map(([value, label]) => (
            <div key={label} className="rounded-lg border border-slate-200 bg-white p-6">
              <p className="text-3xl font-extrabold text-teal-600">{value}</p>
              <p className="mt-1 text-sm font-medium text-slate-600">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature} className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="mb-4 h-2 w-10 rounded-full bg-teal-400" />
              <h3 className="text-base font-bold text-slate-950">{feature}</h3>
            </div>
          ))}
        </div>
      </section>
      <footer className="border-t border-slate-200 bg-white px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 text-sm text-slate-600 md:flex-row">
          <p className="font-semibold text-slate-900">NeuroTwinX: Where AI meets empathy in healthcare</p>
          <div className="flex gap-5">
            <Link to="/onboarding">Onboarding</Link>
            <Link to="/vr-experience">VR Experience</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
