import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arbeitgeberrechner 2026 | Lohnkosten & Lohnnebenkosten berechnen",
  description: "Arbeitgeberrechner 2026: Gesamte Personalkosten & Lohnnebenkosten (AG-Anteile) berechnen. Inkl. U1, U2, U3 Umlagen.",
  keywords: "Arbeitgeberrechner, Lohnnebenkosten berechnen, Personalkosten 2026",
  alternates: { 
    canonical: "https://bruttonettocalculator.com/arbeitgeber",
    languages: {
      "de-DE": "https://bruttonettocalculator.com/arbeitgeber",
      "de": "https://bruttonettocalculator.com/arbeitgeber"
    }
  },
  openGraph: {
    title: "Arbeitgeberrechner 2026 | Lohnkosten & Lohnnebenkosten berechnen",
    description: "Arbeitgeberrechner 2026: Gesamte Personalkosten & Lohnnebenkosten (AG-Anteile) berechnen. Inkl. U1, U2, U3 Umlagen.",
    url: "https://bruttonettocalculator.com/arbeitgeber",
    locale: "de_DE",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Arbeitgeberrechner 2026 | Lohnkosten & Lohnnebenkosten berechnen", description: "Arbeitgeberrechner 2026: Gesamte Personalkosten & Lohnnebenkosten (AG-Anteile) berechnen. Inkl. U1, U2, U3 Umlagen." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Arbeitgeberrechner 2026 | Lohnkosten & Lohnnebenkosten berechnen",
  "url": "https://bruttonettocalculator.com/arbeitgeber",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "Arbeitgeberrechner 2026: Gesamte Personalkosten & Lohnnebenkosten (AG-Anteile) berechnen. Inkl. U1, U2, U3 Umlagen.",
  "inLanguage": "de-DE"
};
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
