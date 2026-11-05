import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Fantômes — Débusque les abonnements que tu paies sans t'en servir",
  description:
    "Dépose ton relevé bancaire : Fantômes repère les prélèvements oubliés et rédige les lettres de résiliation. Ton relevé ne quitte jamais ton téléphone.",
  openGraph: {
    title: "Fantômes — Débusque les abonnements que tu paies sans t'en servir",
    description:
      "Repère les prélèvements oubliés et résilie-les en un clic. Audit complet : 19 €, une seule fois.",
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
