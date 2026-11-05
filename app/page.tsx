const BENEFICES = [
  {
    titre: "Tu vois tout, classé par coût annuel",
    texte:
      "Un abonnement à 9 € par mois, ça paraît léger. À 108 € par an, ça se remarque. La liste est triée du plus coûteux au moins coûteux.",
  },
  {
    titre: "La lettre de résiliation est déjà écrite",
    texte:
      "Pour chaque abonnement, une lettre prête à envoyer. Tu relis, tu envoies, c'est terminé.",
  },
  {
    titre: "Ton relevé reste sur ton téléphone",
    texte:
      "L'analyse se fait dans ton navigateur. Aucun fichier bancaire n'est envoyé à nos serveurs.",
  },
];

export default function Accueil() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col px-5 pb-16 pt-10">
      <p className="text-sm font-semibold uppercase tracking-widest text-braise">
        Fantômes
      </p>

      <h1 className="mt-4 font-titre text-4xl font-bold leading-tight sm:text-5xl">
        Débusque les abonnements que tu paies sans t&apos;en servir.
      </h1>

      <p className="mt-5 text-lg">
        Un essai jamais résilié, un service remplacé, une option activée une
        fois : ces petits prélèvements tournent parfois pendant des années,
        invisibles sur un relevé.
      </p>

      <div className="mt-8 rounded-2xl border-2 border-encre bg-white p-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-braise">
          Audit complet
        </p>
        <p className="mt-1 font-titre text-4xl font-bold">
          19 €{" "}
          <span className="text-base font-normal">une seule fois</span>
        </p>
        <p className="mt-2 text-sm">
          Pas d&apos;abonnement. Pas de renouvellement automatique.
        </p>

        <form action="/api/checkout" method="POST" className="mt-5">
          <button
            type="submit"
            className="min-h-14 w-full rounded-xl bg-braise px-6 py-4 text-lg font-bold text-white active:translate-y-px"
          >
            Obtenir mon audit — 19 €
          </button>
        </form>

        <p className="mt-3 text-center text-sm">
          Paiement sécurisé par Stripe. Satisfait ou remboursé 14 jours.
        </p>
      </div>

      <ul className="mt-12 space-y-8">
        {BENEFICES.map((b) => (
          <li key={b.titre} className="border-l-4 border-braise pl-4">
            <h2 className="font-titre text-xl font-bold">{b.titre}</h2>
            <p className="mt-1">{b.texte}</p>
          </li>
        ))}
      </ul>

      <section className="mt-12 rounded-2xl bg-sable p-5">
        <h2 className="font-titre text-xl font-bold">
          Garantie satisfait ou remboursé
        </h2>
        <p className="mt-2">
          Pendant 14 jours après ton achat, écris-nous un simple email : tu es
          remboursé sous 5 jours ouvrés, sans justification à fournir.
        </p>
      </section>

      <footer className="mt-12 text-sm">
        <p>
          Mentions légales, conditions générales de vente et politique de
          confidentialité : bientôt disponibles, avant toute vente réelle.
        </p>
      </footer>
    </main>
  );
}
