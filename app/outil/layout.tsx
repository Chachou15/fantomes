import Stripe from "stripe";
import Link from "next/link";
import { cookies } from "next/headers";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

async function accesValide(): Promise<boolean> {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const jar = await cookies();
  const sessionId = jar.get("fantomes_acces")?.value ?? "";
  if (!secretKey || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) {
    return false;
  }
  try {
    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session.payment_status === "paid";
  } catch {
    return false;
  }
}

export default async function OutilLayout({
  children,
}: {
  children: ReactNode;
}) {
  const autorise = await accesValide();

  if (!autorise) {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-5 py-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-braise">
          Fantômes
        </p>
        <h1 className="mt-4 font-titre text-4xl font-bold leading-tight">
          Accès réservé
        </h1>
        <p className="mt-4 text-lg">
          Cet outil est disponible après l&apos;achat de ton audit. Si tu as
          déjà payé, ouvre le lien reçu à la fin du paiement, dans le même
          navigateur.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block min-h-14 rounded-xl bg-encre px-6 py-4 text-center text-lg font-bold text-creme"
        >
          Retour à l&apos;accueil
        </Link>
      </main>
    );
  }

  return <>{children}</>;
}
