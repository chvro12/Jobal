import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Profil() {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [payment, setPayment] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/users/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(u => {
        setUser(u);
        setUsername(u.username);
        setPayment(u.payment || '');
      });
  }, [token]);

  const handleUpdate = async e => {
    e.preventDefault();
    setMessage('');
    const res = await fetch('/api/users/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ username, payment })
    });
    if (res.ok) setMessage('Profil mis à jour !');
    else setMessage('Erreur lors de la mise à jour.');
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Mon profil</h2>
      <form onSubmit={handleUpdate} className="bg-white rounded-lg shadow p-6 w-full max-w-md space-y-4">
        <div>Email : <b>{user.email}</b></div>
        <input name="username" required placeholder="Nom d'utilisateur" className="w-full border rounded px-3 py-2" value={username} onChange={e=>setUsername(e.target.value)} />
        <input name="payment" placeholder="Préférence de paiement (ex: Orange Money)" className="w-full border rounded px-3 py-2" value={payment} onChange={e=>setPayment(e.target.value)} />
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition">Mettre à jour</button>
        {message && <div className="text-green-700 text-center">{message}</div>}
      </form>
    </div>
  );
} 