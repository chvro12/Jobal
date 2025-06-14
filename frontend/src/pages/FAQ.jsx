export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Foire aux questions (FAQ)</h2>
      <div className="max-w-2xl w-full space-y-6 text-gray-700">
        <div>
          <h3 className="font-semibold text-lg">Comment gagner de l'argent sur Jobal ?</h3>
          <p>En regardant des publicités, en répondant à des sondages, en effectuant des micro-tâches ou via les murs d'offres partenaires.</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Quels sont les moyens de paiement disponibles ?</h3>
          <p>Orange Money, Wave, Free Money, et virement bancaire local.</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Quel est le seuil minimum de retrait ?</h3>
          <p>Le seuil minimum est de 500 XOF.</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Comment devenir annonceur ?</h3>
          <p>Inscrivez-vous en tant qu'annonceur et créez vos campagnes publicitaires en quelques clics.</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">J'ai un problème, comment contacter le support ?</h3>
          <p>Utilisez la page Contact pour nous écrire, nous vous répondrons rapidement.</p>
        </div>
      </div>
    </div>
  );
} 