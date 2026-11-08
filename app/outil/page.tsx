"use client";

import { useState, type ChangeEvent } from "react";

type Charge = {
  nom: string;
  montant: number;
  annuel: number;
  nombre: number;
  derniere: string;
};

const DIACRITIQUES = new RegExp(
  "[" + String.fromCharCode(768) + "-" + String.fromCharCode(879) + "]",
  "g"
);

type Mouvement = { date: Date; montant: number; libelle: string };

function sansAccents(texte: string): string {
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITIQUES, "");
}

function decouper(ligne: string, sep: string): string[] {
  const champs: string[] = [];
  let courant = "";
  let entreGuillemets = false;
  for (let i = 0; i < ligne.length; i++) {
    const c = ligne[i];
    if (c === '"') {
      if (entreGuillemets && ligne[i + 1] === '"') {
        courant += '"';
        i++;
      } else {
        entreGuillemets = !entreGuillemets;
      }
    } else if (c === sep && !entreGuillemets) {
      champs.push(courant.trim());
      courant = "";
    } else {
      courant += c;
    }
  }
  champs.push(courant.trim());
  return champs;
}

function lireNombre(texte: string): number | null {
  let t = texte.replace(/[€\s]/g, "");
  if (!t) return null;
  if (t.includes(",") && t.includes(".")) {
    if (t.lastIndexOf(",") > t.lastIndexOf(".")) {
      t = t.replace(/\./g, "").replace(",", ".");
    } else {
      t = t.replace(/,/g, "");
    }
  } else if (t.includes(",")) {
    t = t.replace(",", ".");
  }
  const n = parseFloat(t);
  return Number.isFinite(n) ? n : null;
}

function lireDate(texte: string): Date | null {
  const t = texte.trim();
  let m = t.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) {
    return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  }
  m = t.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})/);
  if (m) {
    const jour = Number(m[1]);
    const mois = Number(m[2]);
    let annee = Number(m[3]);
    if (annee < 100) annee += 2000;
    if (mois < 1 || mois > 12 || jour < 1 || jour > 31) return null;
    return new Date(annee, mois - 1, jour);
  }
  return null;
}

function cle(libelle: string): string {
  return libelle
    .toUpperCase()
    .normalize("NFD")
    .replace(DIACRITIQUES, "")
    .replace(
      /\b(PRLV|PRELEVEMENT|SEPA|CARTE|CB|PAIEMENT|ACHAT|VIR|VIREMENT|REF|ECH|DU|PAR|FACTURE|FACT|MANDAT)\b/g,
      " "
    )
    .replace(/[0-9*#/_.:,;-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .slice(0, 3)
    .join(" ");
}

function mediane(valeurs: number[]): number {
  const t = [...valeurs].sort((a, b) => a - b);
  const m = Math.floor(t.length / 2);
  return t.length % 2 ? t[m] : (t[m - 1] + t[m]) / 2;
}

function titre(texte: string): string {
  return texte
    .toLowerCase()
    .split(" ")
    .map((mot) => mot.charAt(0).toUpperCase() + mot.slice(1))
    .join(" ");
}

function formatDate(d: Date): string {
  const j = String(d.getDate()).padStart(2, "0");
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return j + "/" + m + "/" + d.getFullYear();
}

function analyser(texte: string): Charge[] | null {
  const lignes = texte
    .split(/\r?\n/)
    .filter((l) => l.trim() !== "");
  if (lignes.length < 2) return null;

  const apercu = lignes.slice(0, 10).join("\n");
  const sep = [";", "\t", ","].reduce(
    (a, b) => (apercu.split(b).length > apercu.split(a).length ? b : a),
    ";"
  );

  const debut = lignes.findIndex((l) =>
    decouper(l, sep).some((c) => /date/i.test(c))
  );
  if (debut === -1) return null;

  const entetes = decouper(lignes[debut], sep).map(sansAccents);
  const iDate = entetes.findIndex((e) => e.includes("date"));
  const iLibelle = entetes.findIndex(
    (e, i) =>
      i !== iDate && /libell|label|description|intitul|detail|objet/.test(e)
  );
  const iMontant = entetes.findIndex((e) => /montant|amount/.test(e));
  const iDebit = entetes.findIndex((e) => e.includes("debit"));
  if (iDate < 0 || iLibelle < 0 || (iMontant < 0 && iDebit < 0)) return null;

  const groupes = new Map<string, Mouvement[]>();
  for (const ligne of lignes.slice(debut + 1)) {
    const c = decouper(ligne, sep);
    const d = lireDate(c[iDate] ?? "");
    if (!d) continue;

    let montant: number | null = null;
    if (iDebit >= 0) {
      const v = lireNombre(c[iDebit] ?? "");
      if (v) montant = Math.abs(v);
    } else {
      const v = lireNombre(c[iMontant] ?? "");
      if (v !== null && v < 0) montant = -v;
    }
    if (!montant) continue;

    const libelle = c[iLibelle] ?? "";
    const k = cle(libelle);
    if (k.length < 3) continue;

    const liste = groupes.get(k);
    if (liste) {
      liste.push({ date: d, montant, libelle });
    } else {
      groupes.set(k, [{ date: d, montant, libelle }]);
    }
  }

  const resultats: Charge[] = [];
  groupes.forEach((items, k) => {
    if (items.length < 2) return;
    const med = mediane(items.map((i) => i.montant));
    const proches = items
      .filter((i) => Math.abs(i.montant - med) <= med * 0.2)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    const mois = new Set(
      proches.map((i) => i.date.getFullYear() * 12 + i.date.getMonth())
    );
    if (proches.length < 2 || mois.size < 2) return;

    const ecarts: number[] = [];
    for (let i = 1; i < proches.length; i++) {
      ecarts.push(
        (proches[i].date.getTime() - proches[i - 1].date.getTime()) / 86400000
      );
    }
    const ecart = mediane(ecarts);
    if (ecart < 20 || ecart > 40) return;

    const montant = mediane(proches.map((i) => i.montant));
    resultats.push({
      nom: titre(k),
      montant,
      annuel: montant * 12,
      nombre: proches.length,
      derniere: formatDate(proches[proches.length - 1].date),
    });
  });

  return resultats.sort((a, b) => b.annuel - a.annuel);
}

function lettre(nom: string): string {
  const aujourdhui = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return [
    "[Ton prénom et ton nom]",
    "[Ton adresse]",
    "[Ton adresse e-mail]",
    "",
    nom,
    "Service résiliation",
    "",
    "Le " + aujourdhui,
    "",
    "Objet : résiliation de mon abonnement",
    "",
    "Madame, Monsieur,",
    "",
    "Par la présente, je vous informe de ma décision de résilier l'abonnement que j'ai souscrit auprès de vos services (identifiant client ou numéro de contrat : [à compléter]).",
    "",
    "Cette résiliation prend effet à la prochaine échéance, ou immédiatement si vos conditions le permettent. Je vous demande de cesser tout prélèvement sur mon compte à compter de cette date.",
    "",
    "Merci de me confirmer cette résiliation par écrit, en m'indiquant la date de fin effective de l'abonnement.",
    "",
    "Dans l'attente de votre confirmation, je vous prie d'agréer, Madame, Monsieur, mes salutations distinguées.",
    "",
    "[Ton prénom et ton nom]",
  ].join("\n");
}

const euro = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export default function Outil() {
  const [charges, setCharges] = useState<Charge[] | null>(null);
  const [erreur, setErreur] = useState("");
  const [choix, setChoix] = useState<string | null>(null);
  const [texteLettre, setTexteLettre] = useState("");
  const [copie, setCopie] = useState(false);
  const [collage, setCollage] = useState("");

  async function lireFichier(e: ChangeEvent<HTMLInputElement>) {
    const fichier = e.target.files?.[0];
    if (!fichier) return;
    setErreur("");
    setCharges(null);
    setChoix(null);
    try {
      const buf = await fichier.arrayBuffer();
      let texte: string;
      try {
        texte = new TextDecoder("utf-8", { fatal: true }).decode(buf);
      } catch {
        texte = new TextDecoder("windows-1252").decode(buf);
      }
      traiter(texte);
    } catch {
      setErreur("Impossible de lire ce fichier. Essaie avec un autre export.");
    }
  }

  function traiter(texte: string) {
    setErreur("");
    setCharges(null);
    setChoix(null);
    const resultat = analyser(texte);
    if (resultat === null) {
      setErreur(
        "Je n'arrive pas à lire ce relevé. Il faut une ligne d'en-tête avec les colonnes date, libellé et montant."
      );
      return;
    }
    setCharges(resultat);
  }

  function choisir(nom: string) {
    setChoix(nom);
    setTexteLettre(lettre(nom));
    setCopie(false);
  }

  async function copier() {
    try {
      await navigator.clipboard.writeText(texteLettre);
      setCopie(true);
      setTimeout(() => setCopie(false), 2000);
    } catch {
      // la copie n'est pas disponible : la personne peut copier à la main
    }
  }

  const total = charges ? charges.reduce((s, c) => s + c.annuel, 0) : 0;

  return (
    <main className="mx-auto min-h-screen max-w-xl px-5 py-10">
      <p className="text-sm font-semibold uppercase tracking-widest text-braise">
        Fantômes
      </p>
      <h1 className="mt-4 font-titre text-4xl font-bold leading-tight">
        Ton audit
      </h1>
      <p className="mt-4 text-lg">
        Exporte ton relevé bancaire au format CSV depuis le site ou
        l&apos;application de ta banque (rubrique « Exporter » ou
        « Télécharger »), puis dépose-le ici.
      </p>
      <p className="mt-2 text-base">
        Rien n&apos;est envoyé : l&apos;analyse se fait sur ton appareil.
      </p>

      <label className="mt-6 block cursor-pointer rounded-xl bg-encre px-6 py-4 text-center text-lg font-bold text-creme">
        Choisir mon relevé (CSV)
        <input
          type="file"
          accept=".csv,.txt,text/csv"
          onChange={lireFichier}
          className="hidden"
        />
      </label>

      <div className="mt-6">
        <p className="text-base">
          Le fichier ne s&apos;ouvre pas ? Colle ici le contenu de ton relevé :
        </p>
        <textarea
          value={collage}
          onChange={(e) => setCollage(e.target.value)}
          rows={6}
          placeholder="Date;Libellé;Montant"
          className="mt-2 w-full rounded-xl border border-black/20 bg-white p-3 text-base"
        />
        <button
          type="button"
          onClick={() => traiter(collage)}
          className="mt-2 min-h-11 rounded-xl border border-black/20 px-5 py-2 text-base font-semibold"
        >
          Analyser le texte collé
        </button>
      </div>

      {erreur && <p className="mt-4 text-base font-semibold">{erreur}</p>}

      {charges && charges.length === 0 && (
        <p className="mt-6 text-lg">
          Je n&apos;ai trouvé aucun prélèvement qui revient chaque mois.
          Vérifie que ton relevé couvre au moins deux ou trois mois.
        </p>
      )}

      {charges && charges.length > 0 && (
        <section className="mt-8">
          <h2 className="font-titre text-2xl font-bold">
            {charges.length} prélèvement{charges.length > 1 ? "s" : ""} qui
            reviennent chaque mois
          </h2>
          <p className="mt-2 text-lg">
            Total par an : <strong>{euro.format(total)}</strong>
          </p>
          <ul className="mt-4 space-y-3">
            {charges.map((c) => (
              <li
                key={c.nom}
                className="rounded-xl border border-black/10 bg-white p-4"
              >
                <p className="text-lg font-bold">{c.nom}</p>
                <p className="mt-1 text-base">
                  {euro.format(c.montant)} par mois, soit{" "}
                  <strong>{euro.format(c.annuel)}</strong> par an
                </p>
                <p className="mt-1 text-sm">
                  Vu {c.nombre} fois, dernier prélèvement le {c.derniere}
                </p>
                <button
                  type="button"
                  onClick={() => choisir(c.nom)}
                  className="mt-3 min-h-11 rounded-lg border border-black/20 px-4 py-2 text-base font-semibold"
                >
                  Préparer la lettre de résiliation
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            Vérifie chaque ligne : l&apos;outil peut se tromper. Ne résilie que
            ce que tu reconnais.
          </p>
        </section>
      )}

      {choix && (
        <section className="mt-8">
          <h2 className="font-titre text-2xl font-bold">
            Lettre pour {choix}
          </h2>
          <p className="mt-2 text-base">
            Complète les passages entre crochets, relis, puis envoie-la.
          </p>
          <textarea
            value={texteLettre}
            onChange={(e) => setTexteLettre(e.target.value)}
            rows={18}
            className="mt-3 w-full rounded-xl border border-black/20 bg-white p-4 text-base"
          />
          <button
            type="button"
            onClick={copier}
            className="mt-3 min-h-11 rounded-xl bg-encre px-6 py-3 text-base font-bold text-creme"
          >
            {copie ? "Lettre copiée" : "Copier la lettre"}
          </button>
        </section>
      )}
    </main>
  );
}
