import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arbeitslosengeld Rechner (ALG 1) 2026 | ALG I Anspruch berechnen",
  description: "ALG 1 Rechner 2026: Wie viel Arbeitslosengeld I bekomme ich? Berechnung nach 60%/67%-Satz & Steuerklasse. Einfach & kostenlos.",
  keywords: "Arbeitslosengeld Rechner, ALG 1 berechnen, Arbeitslosengeld I 2026",
  alternates: { 
    canonical: "https://bruttonettocalculator.com/arbeitslosengeld",
    languages: {
      "de-DE": "https://bruttonettocalculator.com/arbeitslosengeld",
      "de": "https://bruttonettocalculator.com/arbeitslosengeld"
    }
  },
  openGraph: {
    title: "Arbeitslosengeld Rechner (ALG 1) 2026 | ALG I Anspruch berechnen",
    description: "ALG 1 Rechner 2026: Wie viel Arbeitslosengeld I bekomme ich? Berechnung nach 60%/67%-Satz & Steuerklasse. Einfach & kostenlos.",
    url: "https://bruttonettocalculator.com/arbeitslosengeld",
    locale: "de_DE",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Arbeitslosengeld Rechner (ALG 1) 2026 | ALG I Anspruch berechnen", description: "ALG 1 Rechner 2026: Wie viel Arbeitslosengeld I bekomme ich? Berechnung nach 60%/67%-Satz & Steuerklasse. Einfach & kostenlos." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Arbeitslosengeld Rechner (ALG 1) 2026 | ALG I Anspruch berechnen",
  "url": "https://bruttonettocalculator.com/arbeitslosengeld",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "ALG 1 Rechner 2026: Wie viel Arbeitslosengeld I bekomme ich? Berechnung nach 60%/67%-Satz & Steuerklasse. Einfach & kostenlos.",
  "inLanguage": "de-DE"
};
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
