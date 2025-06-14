import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    // TODO: Envoyer le message à l'API ou par email
    setSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Contact</h2>
      {sent ? (
        <div className="bg-green-100 text-green-700 p-4 rounded shadow">Merci pour votre message, nous vous répondrons rapidement.</div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 w-full max-w-md space-y-4">
          <input name="name" required placeholder="Votre nom" className="w-full border rounded px-3 py-2" value={form.name} onChange={handleChange} />
          <input name="email" type="email" required placeholder="Votre email" className="w-full border rounded px-3 py-2" value={form.email} onChange={handleChange} />
          <textarea name="message" required placeholder="Votre message" className="w-full border rounded px-3 py-2" rows={4} value={form.message} onChange={handleChange} />
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition">Envoyer</button>
        </form>
      )}
    </div>
  );
} 