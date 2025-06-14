import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function DashboardAnnonceur() {
  const { token } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '', url: '', duration: 30, viewsWanted: 100, costTotal: 0 });
  const [message, setMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('/api/campaigns/mine', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setCampaigns).finally(() => setLoading(false));
  }, [token]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async e => {
    e.preventDefault();
    setMessage('');
    // Calcul du coût (exemple simple)
    const cost = Number(form.viewsWanted) * Number(form.duration) * 0.5;
    setForm(f => ({ ...f, costTotal: cost }));
    const res = await fetch('/api/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...form, costTotal: cost, duration: Number(form.duration), viewsWanted: Number(form.viewsWanted) })
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('Campagne créée !');
      setCampaigns(c => [data.campaign, ...c]);
    } else {
      setMessage(data.message || 'Erreur');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Espace Annonceur</h2>
      <div className="bg-white rounded shadow p-4 mb-6 w-full max-w-lg">
        <h3 className="text-lg font-semibold mb-2">Créer une campagne</h3>
        <form onSubmit={handleCreate} className="space-y-2">
          <input name="title" required placeholder="Titre" className="w-full border rounded px-3 py-2" value={form.title} onChange={handleChange} />
          <input name="url" required placeholder="URL à promouvoir" className="w-full border rounded px-3 py-2" value={form.url} onChange={handleChange} />
          <textarea name="description" required placeholder="Description" className="w-full border rounded px-3 py-2" value={form.description} onChange={handleChange} />
          <div className="flex gap-2">
            <input name="duration" type="number" min="5" max="60" required placeholder="Durée (s)" className="w-1/2 border rounded px-3 py-2" value={form.duration} onChange={handleChange} />
            <input name="viewsWanted" type="number" min="10" required placeholder="Vues souhaitées" className="w-1/2 border rounded px-3 py-2" value={form.viewsWanted} onChange={handleChange} />
          </div>
          <button type="submit" className="w-full py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700 transition">Créer la campagne</button>
        </form>
      </div>
      <div className="w-full max-w-2xl">
        <h3 className="text-lg font-semibold mb-2">Mes campagnes</h3>
        {loading ? <div>Chargement...</div> : campaigns.length === 0 ? <div className="text-gray-400">Aucune campagne créée.</div> : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Titre</th>
                <th className="p-2">Vues</th>
                <th className="p-2">Coût</th>
                <th className="p-2">Statut</th>
                <th className="p-2">Créée le</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map(c => (
                <tr key={c.id}>
                  <td className="p-2 font-semibold text-blue-700">{c.title}</td>
                  <td className="p-2">{c.viewsDone} / {c.viewsWanted}</td>
                  <td className="p-2">{c.costTotal} XOF</td>
                  <td className="p-2">{c.isActive ? 'Active' : 'Inactive'}</td>
                  <td className="p-2">{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {message && <div className="mt-4 text-center text-green-700">{message}</div>}
    </div>
  );
} 