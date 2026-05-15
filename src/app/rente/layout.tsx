import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rentenrechner 2026 | Gesetzliche Rente & Rentenlücke berechnen",
  description: "Rentenrechner 2026: Wie hoch wird meine Rente? Voraussichtliche Altersrente, Rentenpunkte & Versorgungslücke berechnen.",
  keywords: "Rentenrechner, Rente berechnen, Rentenlücke, gesetzliche Rente 2026",
  alternates: { canonical: "https://bruttonettocalculator.com/rente" },
  openGraph: {
    title: "Rentenrechner 2026 | Gesetzliche Rente & Rentenlücke berechnen",
    description: "Rentenrechner 2026: Wie hoch wird meine Rente? Voraussichtliche Altersrente, Rentenpunkte & Versorgungslücke berechnen.",
    url: "https://bruttonettocalculator.com/rente",
    locale: "de_DE",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Rentenrechner 2026 | Gesetzliche Rente & Rentenlücke berechnen", description: "Rentenrechner 2026: Wie hoch wird meine Rente? Voraussichtliche Altersrente, Rentenpunkte & Versorgungslücke berechnen." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Rentenrechner 2026 | Gesetzliche Rente & Rentenlücke berechnen",
  "url": "https://bruttonettocalculator.com/rente",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "Rentenrechner 2026: Wie hoch wird meine Rente? Voraussichtliche Altersrente, Rentenpunkte & Versorgungslücke berechnen.",
  "inLanguage": "de-DE"
};
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
