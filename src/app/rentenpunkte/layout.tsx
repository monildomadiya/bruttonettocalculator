import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rentenpunkte Rechner 2026 | Entgeltpunkte pro Jahr berechnen",
  description: "Rentenpunkte Rechner 2026: Jährliche Entgeltpunkte berechnen. Aktueller Rentenwert 37,60 € – Durchschnittsentgelt & Punkte sofort ermitteln.",
  keywords: "Rentenpunkte berechnen, Entgeltpunkte, Rentenwert 2026",
  alternates: { canonical: "https://bruttonettocalculator.com/rentenpunkte" },
  openGraph: {
    title: "Rentenpunkte Rechner 2026 | Entgeltpunkte pro Jahr berechnen",
    description: "Rentenpunkte Rechner 2026: Jährliche Entgeltpunkte berechnen. Aktueller Rentenwert 37,60 € – Durchschnittsentgelt & Punkte sofort ermitteln.",
    url: "https://bruttonettocalculator.com/rentenpunkte",
    locale: "de_DE",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Rentenpunkte Rechner 2026 | Entgeltpunkte pro Jahr berechnen", description: "Rentenpunkte Rechner 2026: Jährliche Entgeltpunkte berechnen. Aktueller Rentenwert 37,60 € – Durchschnittsentgelt & Punkte sofort ermitteln." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Rentenpunkte Rechner 2026 | Entgeltpunkte pro Jahr berechnen",
  "url": "https://bruttonettocalculator.com/rentenpunkte",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "Rentenpunkte Rechner 2026: Jährliche Entgeltpunkte berechnen. Aktueller Rentenwert 37,60 € – Durchschnittsentgelt & Punkte sofort ermitteln.",
  "inLanguage": "de-DE"
};
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
