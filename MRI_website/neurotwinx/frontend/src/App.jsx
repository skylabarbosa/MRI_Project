import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { PatientProvider } from './context/PatientContext.jsx';
import Landing from './pages/Landing.jsx';
import Onboarding from './pages/Onboarding.jsx';
import VRExperience from './pages/VRExperience.jsx';
import Dashboard from './pages/Dashboard.jsx';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <main key={location.pathname} className="min-h-screen animate-[fadeIn_220ms_ease-out] transition-opacity">
      <Routes location={location}>
        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/vr-experience" element={<VRExperience />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </main>
  );
}

export default function App() {
  return (
    <PatientProvider>
      <HashRouter>
        <style>{'@keyframes fadeIn{from{opacity:.35}to{opacity:1}}'}</style>
        <AnimatedRoutes />
      </HashRouter>
    </PatientProvider>
  );
}
