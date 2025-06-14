export default function MentionsLegales() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Mentions Légales</h2>
      <div className="max-w-2xl w-full text-gray-700 space-y-4">
        <p><b>Éditeur :</b> [Nom de la société ou du porteur du projet]</p>
        <p><b>Adresse :</b> [Adresse à compléter]</p>
        <p><b>Email :</b> [Email de contact]</p>
        <p><b>Hébergement :</b> [Nom de l'hébergeur, adresse, téléphone]</p>
        <p><b>Responsable de la publication :</b> [Nom à compléter]</p>
        <p className="text-gray-400 text-sm mt-8">(Texte à personnaliser selon vos besoins légaux)</p>
      </div>
    </div>
  );
} 