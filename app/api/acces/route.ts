import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id") ?? "";
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) {
    return NextResponse.redirect(new URL("/", url.origin));
  }

  try {
    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return NextResponse.redirect(new URL("/", url.origin));
    }
  } catch {
    return NextResponse.redirect(new URL("/", url.origin));
  }

  const reponse = NextResponse.redirect(new URL("/merci", url.origin));
  reponse.cookies.set({
    name: "fantomes_acces",
    value: sessionId,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return reponse;
}
