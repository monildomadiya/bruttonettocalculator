import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Firmenwagenrechner 2026 | Geldwerter Vorteil 1% Regelung berechnen",
  description: "Firmenwagenrechner 2026: Geldwerten Vorteil nach der 1%-, 0,5%- oder 0,25%-Regelung berechnen. Dienstwagen-Steuer für Verbrenner, Hybrid & E-Auto.",
  keywords: "Firmenwagenrechner, Geldwerter Vorteil, 1% Regelung, Dienstwagen versteuern 2026",
  alternates: { 
    canonical: "https://bruttonettocalculator.com/firmenwagen",
    languages: {
      "de-DE": "https://bruttonettocalculator.com/firmenwagen",
      "de": "https://bruttonettocalculator.com/firmenwagen"
    }
  },
  openGraph: {
    title: "Firmenwagenrechner 2026 | Geldwerter Vorteil 1% Regelung berechnen",
    description: "Firmenwagenrechner 2026: Geldwerten Vorteil nach der 1%-, 0,5%- oder 0,25%-Regelung berechnen. Dienstwagen-Steuer für Verbrenner, Hybrid & E-Auto.",
    url: "https://bruttonettocalculator.com/firmenwagen",
    locale: "de_DE",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Firmenwagenrechner 2026 | Geldwerter Vorteil 1% Regelung berechnen", description: "Firmenwagenrechner 2026: Geldwerten Vorteil nach der 1%-, 0,5%- oder 0,25%-Regelung berechnen. Dienstwagen-Steuer für Verbrenner, Hybrid & E-Auto." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Firmenwagenrechner 2026 | Geldwerter Vorteil 1% Regelung berechnen",
  "url": "https://bruttonettocalculator.com/firmenwagen",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "Firmenwagenrechner 2026: Geldwerten Vorteil nach der 1%-, 0,5%- oder 0,25%-Regelung berechnen. Dienstwagen-Steuer für Verbrenner, Hybrid & E-Auto.",
  "inLanguage": "de-DE"
};
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
