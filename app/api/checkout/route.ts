import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return new NextResponse("Configuration de paiement manquante.", {
      status: 500,
    });
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;
  const stripe = new Stripe(secretKey);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: 1900,
            product_data: {
              name: "Fantômes — Audit complet",
              description:
                "Détection des abonnements oubliés, lettres de résiliation, total économisé.",
            },
          },
        },
      ],
      success_url: `${origin}/merci`,
      cancel_url: `${origin}/?paiement=annule`,
    });

    if (!session.url) {
      return new NextResponse("Session de paiement introuvable.", {
        status: 500,
      });
    }

    return NextResponse.redirect(session.url, 303);
  } catch {
    return new NextResponse("Le paiement n'a pas pu démarrer. Réessaie.", {
      status: 500,
    });
  }
}
