import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { token, role, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <nav className="w-full bg-white shadow flex items-center justify-between px-4 py-3">
      <Link to="/" className="text-xl font-bold text-blue-700">Jobal</Link>
      <div className="flex gap-4 items-center text-sm">
        <Link to="/faq" className="hover:text-blue-600">FAQ</Link>
        <Link to="/contact" className="hover:text-blue-600">Contact</Link>
        <Link to="/cgu" className="hover:text-blue-600 hidden md:inline">CGU</Link>
        {token ? (
          <>
            {role === 'ADVERTISER' ? (
              <Link to="/dashboard-annonceur" className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">Mon espace</Link>
            ) : (
              <Link to="/dashboard" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">Mon espace</Link>
            )}
            <button onClick={handleLogout} className="ml-2 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition">Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/connexion" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">Connexion</Link>
            <Link to="/inscription" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
} 