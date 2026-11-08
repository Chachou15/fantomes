import Link from "next/link";

export type Section = { titre: string; paragraphes: string[] };

export default function PageLegale({
  titre,
  miseAJour,
  sections,
}: {
  titre: string;
  miseAJour: string;
  sections: Section[];
}) {
  return (
    <main className="mx-auto min-h-screen max-w-2xl px-5 py-10">
      <Link
        href="/"
        className="text-sm font-semibold uppercase tracking-widest text-braise"
      >
        Fantômes
      </Link>
      <h1 className="mt-4 font-titre text-3xl font-bold leading-tight">
        {titre}
      </h1>
      <p className="mt-2 text-sm">Dernière mise à jour : {miseAJour}</p>
      {sections.map((s) => (
        <section key={s.titre} className="mt-8">
          <h2 className="font-titre text-xl font-bold">{s.titre}</h2>
          {s.paragraphes.map((p, i) => (
            <p key={i} className="mt-2 text-base leading-relaxed">
              {p}
            </p>
          ))}
        </section>
      ))}
      <nav className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm underline">
        <Link href="/">Accueil</Link>
        <Link href="/mentions-legales">Mentions légales</Link>
        <Link href="/cgv">Conditions générales de vente</Link>
        <Link href="/confidentialite">Politique de confidentialité</Link>
      </nav>
    </main>
  );
}
