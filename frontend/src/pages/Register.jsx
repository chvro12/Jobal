import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ email: '', username: '', password: '', confirm: '', type: 'user' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Pré-remplir type si query param
  useState(() => {
    if (location.search.includes('type=annonceur')) setForm(f => ({ ...f, type: 'advertiser' }));
  }, [location.search]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) return setError('Les mots de passe ne correspondent pas.');
    // Appel API (à adapter selon type)
    try {
      const endpoint = form.type === 'advertiser' ? '/api/advertisers/register' : '/api/auth/register';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, username: form.username, password: form.password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Erreur lors de l’inscription');
      navigate('/connexion');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-blue-700 mb-2">Inscription</h2>
        <div className="flex gap-2 mb-2">
          <button type="button" className={`flex-1 py-2 rounded ${form.type==='user'?'bg-blue-600 text-white':'bg-gray-100 text-gray-600'}`} onClick={()=>setForm(f=>({...f,type:'user'}))}>Utilisateur</button>
          <button type="button" className={`flex-1 py-2 rounded ${form.type==='advertiser'?'bg-green-600 text-white':'bg-gray-100 text-gray-600'}`} onClick={()=>setForm(f=>({...f,type:'advertiser'}))}>Annonceur</button>
        </div>
        <input name="email" type="email" required placeholder="Email" className="w-full border rounded px-3 py-2" value={form.email} onChange={handleChange} />
        <input name="username" required placeholder="Nom d'utilisateur" className="w-full border rounded px-3 py-2" value={form.username} onChange={handleChange} />
        <input name="password" type="password" required placeholder="Mot de passe" className="w-full border rounded px-3 py-2" value={form.password} onChange={handleChange} />
        <input name="confirm" type="password" required placeholder="Confirmer le mot de passe" className="w-full border rounded px-3 py-2" value={form.confirm} onChange={handleChange} />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition">S'inscrire</button>
        <div className="text-sm text-center mt-2">Déjà un compte ? <a href="/connexion" className="text-blue-600 hover:underline">Se connecter</a></div>
      </form>
    </div>
  );
} 