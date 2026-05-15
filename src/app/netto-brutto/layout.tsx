import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Netto-Brutto-Rechner 2026 | Wunsch-Netto zu Brutto umrechnen",
  description: "Netto-Brutto-Rechner 2026: Welches Bruttogehalt brauchen Sie für Ihr Wunsch-Netto? Kostenlose Rückrechnung mit Steuerklasse & Sozialabgaben.",
  keywords: "Netto Brutto Rechner, Bruttogehalt berechnen, Wunsch Netto, Rückrechnung Gehalt 2026",
  alternates: { canonical: "https://bruttonettocalculator.com/netto-brutto" },
  openGraph: {
    title: "Netto-Brutto-Rechner 2026 | Wunsch-Netto zu Brutto umrechnen",
    description: "Netto-Brutto-Rechner 2026: Welches Bruttogehalt brauchen Sie für Ihr Wunsch-Netto? Kostenlose Rückrechnung mit Steuerklasse & Sozialabgaben.",
    url: "https://bruttonettocalculator.com/netto-brutto",
    locale: "de_DE",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Netto-Brutto-Rechner 2026 | Wunsch-Netto zu Brutto umrechnen", description: "Netto-Brutto-Rechner 2026: Welches Bruttogehalt brauchen Sie für Ihr Wunsch-Netto? Kostenlose Rückrechnung mit Steuerklasse & Sozialabgaben." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Netto-Brutto-Rechner 2026 | Wunsch-Netto zu Brutto umrechnen",
  "url": "https://bruttonettocalculator.com/netto-brutto",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "Netto-Brutto-Rechner 2026: Welches Bruttogehalt brauchen Sie für Ihr Wunsch-Netto? Kostenlose Rückrechnung mit Steuerklasse & Sozialabgaben.",
  "inLanguage": "de-DE"
};
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
