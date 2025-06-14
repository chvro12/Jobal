import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '', type: 'user' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    // Appel API (à adapter selon type)
    try {
      const endpoint = form.type === 'advertiser' ? '/api/advertisers/login' : '/api/auth/login';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur lors de la connexion');
      // Stocker le token (à améliorer avec contexte/auth)
      auth.login(data.token, data.user || { role: data.advertiser ? 'ADVERTISER' : 'USER' });
      if (data.user?.role === 'ADVERTISER' || data.advertiser) {
        navigate('/dashboard-annonceur');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">Connexion</h2>
        <div className="flex gap-2 mb-2">
          <button type="button" className={`flex-1 py-2 rounded ${form.type==='user'?'bg-blue-600 text-white':'bg-gray-100 text-gray-600'}`} onClick={()=>setForm(f=>({...f,type:'user'}))}>Utilisateur</button>
          <button type="button" className={`flex-1 py-2 rounded ${form.type==='advertiser'?'bg-green-600 text-white':'bg-gray-100 text-gray-600'}`} onClick={()=>setForm(f=>({...f,type:'advertiser'}))}>Annonceur</button>
        </div>
        <input name="email" type="email" required placeholder="Email" className="w-full border rounded px-3 py-2" value={form.email} onChange={handleChange} />
        <input name="password" type="password" required placeholder="Mot de passe" className="w-full border rounded px-3 py-2" value={form.password} onChange={handleChange} />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition">Se connecter</button>
        <div className="text-sm text-center mt-2"><a href="#" className="text-blue-600 hover:underline">Mot de passe oublié ?</a></div>
        <div className="text-sm text-center mt-2">Pas encore de compte ? <a href="/inscription" className="text-blue-600 hover:underline">S'inscrire</a></div>
      </form>
    </div>
  );
} 