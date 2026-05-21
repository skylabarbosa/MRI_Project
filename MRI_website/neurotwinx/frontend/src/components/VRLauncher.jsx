import { Link } from 'react-router-dom';

export default function VRLauncher() {
  return (
    <Link to="/onboarding" className="rounded-md bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800">
      Launch VR Experience
    </Link>
  );
}
