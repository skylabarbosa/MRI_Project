import { usePatient } from '../context/PatientContext.jsx';

export default function PatientStatusCard() {
  const { patientName, sessionId, sessionStartTime } = usePatient();

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current Patient</p>
      <div className="mt-3 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
        <div>
          <p className="font-semibold text-slate-950">{patientName}</p>
          <p>Patient</p>
        </div>
        <div>
          <p className="font-semibold text-slate-950">{sessionId}</p>
          <p>Session ID</p>
        </div>
        <div>
          <p className="font-semibold text-slate-950">{new Date(sessionStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <p>Started</p>
        </div>
      </div>
    </section>
  );
}
