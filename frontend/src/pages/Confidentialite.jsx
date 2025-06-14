export default function Confidentialite() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Politique de Confidentialité</h2>
      <div className="max-w-2xl w-full text-gray-700 space-y-4">
        <p>Vos données personnelles sont collectées uniquement pour le bon fonctionnement de la plateforme Jobal (gestion des comptes, paiements, sécurité).</p>
        <p>Nous ne partageons pas vos données avec des tiers sans votre consentement, sauf obligation légale.</p>
        <p>Vous pouvez demander la suppression de votre compte et de vos données à tout moment.</p>
        <p>Pour toute question, contactez-nous via la page Contact.</p>
        <p className="text-gray-400 text-sm mt-8">(Texte à personnaliser selon vos besoins légaux)</p>
      </div>
    </div>
  );
} 