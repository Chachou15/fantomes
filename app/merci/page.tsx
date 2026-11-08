import Link from "next/link";

export default function Merci() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-5 py-10">
      <p className="text-sm font-semibold uppercase tracking-widest text-braise">
        Fantômes
      </p>
      <h1 className="mt-4 font-titre text-4xl font-bold leading-tight">
        Paiement reçu. Merci.
      </h1>
      <p className="mt-4 text-lg">
        Ton paiement a bien été enregistré. Tu peux lancer ton audit tout de
        suite.
      </p>
      <Link
        href="/outil"
        className="mt-8 inline-block min-h-14 rounded-xl bg-encre px-6 py-4 text-center text-lg font-bold text-creme"
      >
        Lancer mon audit
      </Link>
    </main>
  );
}
