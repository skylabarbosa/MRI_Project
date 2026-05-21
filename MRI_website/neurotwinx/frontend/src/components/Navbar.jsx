import { Link, NavLink } from 'react-router-dom';

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-800 text-lg font-extrabold italic text-white">
        Nx
      </div>
      <span className="text-lg font-bold text-slate-950">NeuroTwinX</span>
    </div>
  );
}

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition ${isActive ? 'text-teal-600' : 'text-slate-600 hover:text-teal-600'}`;

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" aria-label="NeuroTwinX home">
          <Logo />
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/onboarding" className={linkClass}>Onboarding</NavLink>
          <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
        </div>
        <Link to="/onboarding" className="rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800">
          Begin Session
        </Link>
      </nav>
    </header>
  );
}
