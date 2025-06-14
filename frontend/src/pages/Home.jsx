import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <h1 className="text-3xl md:text-5xl font-bold text-blue-700 mb-4">Bienvenue sur Jobal</h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8 text-center max-w-xl">
        Gagnez de l'argent en ligne facilement ou faites la promotion de vos services auprès d'une audience sénégalaise engagée. Simple, rapide, sécurisé et 100% mobile !
      </p>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Link to="/inscription" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">Gagner de l'argent</Link>
        <Link to="/inscription?type=annonceur" className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold shadow hover:bg-green-600 transition">Faire de la publicité</Link>
      </div>
      <ul className="text-gray-600 text-center space-y-2 mb-8">
        <li>✔️ Paiement mobile (Orange Money, Wave, Free Money)</li>
        <li>✔️ Interface simple et adaptée à tous</li>
        <li>✔️ Retraits rapides dès 500 XOF</li>
        <li>✔️ Parrainage et bonus</li>
      </ul>
      <footer className="text-gray-400 text-sm mt-8">© {new Date().getFullYear()} Jobal. Tous droits réservés.</footer>
    </div>
  );
} 