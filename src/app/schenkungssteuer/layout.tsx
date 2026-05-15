import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schenkungssteuer Rechner 2026 | Freibeträge & Steuerlast berechnen",
  description: "Schenkungssteuer 2026: Freibeträge, Steuerklassen & Steuersätze bei Schenkungen berechnen. Kinder: 400.000 €, Ehegatte: 500.000 € – alle 10 Jahre.",
  keywords: "Schenkungssteuer Rechner, Schenkung Freibetrag 2026, Erbschaftsteuer",
  alternates: { canonical: "https://bruttonettocalculator.com/schenkungssteuer" },
  openGraph: {
    title: "Schenkungssteuer Rechner 2026 | Freibeträge & Steuerlast berechnen",
    description: "Schenkungssteuer 2026: Freibeträge, Steuerklassen & Steuersätze bei Schenkungen berechnen. Kinder: 400.000 €, Ehegatte: 500.000 € – alle 10 Jahre.",
    url: "https://bruttonettocalculator.com/schenkungssteuer",
    locale: "de_DE",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Schenkungssteuer Rechner 2026 | Freibeträge & Steuerlast berechnen", description: "Schenkungssteuer 2026: Freibeträge, Steuerklassen & Steuersätze bei Schenkungen berechnen. Kinder: 400.000 €, Ehegatte: 500.000 € – alle 10 Jahre." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Schenkungssteuer Rechner 2026 | Freibeträge & Steuerlast berechnen",
  "url": "https://bruttonettocalculator.com/schenkungssteuer",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "Schenkungssteuer 2026: Freibeträge, Steuerklassen & Steuersätze bei Schenkungen berechnen. Kinder: 400.000 €, Ehegatte: 500.000 € – alle 10 Jahre.",
  "inLanguage": "de-DE"
};
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
