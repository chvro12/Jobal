import React, { useState } from 'react';

export default function Dashboard() {
  const [surveys, setSurveys] = useState([]);
  const [microtasks, setMicrotasks] = useState([]);
  const [offerwalls, setOfferwalls] = useState([]);

  const token = 'your_token_here'; // Replace with actual token

  fetch('/api/surveys', { headers: { Authorization: `Bearer ${token}` } })
    .then(r => r.json()).then(setSurveys);
  fetch('/api/microtasks', { headers: { Authorization: `Bearer ${token}` } })
    .then(r => r.json()).then(setMicrotasks);
  fetch('/api/offerwalls', { headers: { Authorization: `Bearer ${token}` } })
    .then(r => r.json()).then(setOfferwalls);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Tableau de bord</h2>
      <p className="text-gray-600">Bienvenue sur votre espace personnel Jobal !<br/>Les fonctionnalités principales apparaîtront ici.</p>
      <div className="w-full max-w-2xl mb-8">
        <h3 className="text-lg font-semibold mb-2">Sondages rémunérés</h3>
        {surveys.length === 0 ? <div className="text-gray-400">Aucun sondage disponible.</div> : (
          <ul className="space-y-2">
            {surveys.map(s => (
              <li key={s.id} className="bg-white rounded shadow p-3 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-semibold text-blue-700">{s.title}</div>
                  <div className="text-gray-500 text-sm">{s.reward} XOF • {s.estimatedTime || '?'} min</div>
                </div>
                <button className="mt-2 md:mt-0 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition" disabled>Participer (à venir)</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-full max-w-2xl mb-8">
        <h3 className="text-lg font-semibold mb-2">Micro-tâches</h3>
        {microtasks.length === 0 ? <div className="text-gray-400">Aucune micro-tâche disponible.</div> : (
          <ul className="space-y-2">
            {microtasks.map(t => (
              <li key={t.id} className="bg-white rounded shadow p-3 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-semibold text-blue-700">{t.title}</div>
                  <div className="text-gray-500 text-sm">{t.reward} XOF</div>
                </div>
                <button className="mt-2 md:mt-0 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition" disabled>Faire la tâche (à venir)</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="w-full max-w-2xl mb-8">
        <h3 className="text-lg font-semibold mb-2">Murs d'offres partenaires</h3>
        {offerwalls.length === 0 ? <div className="text-gray-400">Aucun offerwall disponible.</div> : (
          <ul className="space-y-2">
            {offerwalls.map(o => (
              <li key={o.id} className="bg-white rounded shadow p-3 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-semibold text-blue-700">{o.provider}</div>
                  <div className="text-gray-500 text-sm">{o.url}</div>
                </div>
                <a href={o.url} target="_blank" rel="noopener noreferrer" className="mt-2 md:mt-0 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">Accéder</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 