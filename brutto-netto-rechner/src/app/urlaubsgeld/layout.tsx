import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Urlaubsgeldrechner 2026 | Netto-Urlaubsgeld sofort berechnen",
  description: "Urlaubsgeldrechner 2026: Wie viel Netto bleibt vom Urlaubsgeld? Steuer- & SV-Abzüge auf Sonderzahlungen berechnen.",
  keywords: "Urlaubsgeldrechner, Urlaubsgeld Netto 2026, Sonderzahlung versteuern",
  alternates: { 
    canonical: "https://bruttonettocalculator.com/urlaubsgeld",
    languages: {
      "de-DE": "https://bruttonettocalculator.com/urlaubsgeld",
      "de": "https://bruttonettocalculator.com/urlaubsgeld"
    }
  },
  openGraph: {
    title: "Urlaubsgeldrechner 2026 | Netto-Urlaubsgeld sofort berechnen",
    description: "Urlaubsgeldrechner 2026: Wie viel Netto bleibt vom Urlaubsgeld? Steuer- & SV-Abzüge auf Sonderzahlungen berechnen.",
    url: "https://bruttonettocalculator.com/urlaubsgeld",
    locale: "de_DE",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Urlaubsgeldrechner 2026 | Netto-Urlaubsgeld sofort berechnen", description: "Urlaubsgeldrechner 2026: Wie viel Netto bleibt vom Urlaubsgeld? Steuer- & SV-Abzüge auf Sonderzahlungen berechnen." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Urlaubsgeldrechner 2026 | Netto-Urlaubsgeld sofort berechnen",
  "url": "https://bruttonettocalculator.com/urlaubsgeld",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "Urlaubsgeldrechner 2026: Wie viel Netto bleibt vom Urlaubsgeld? Steuer- & SV-Abzüge auf Sonderzahlungen berechnen.",
  "inLanguage": "de-DE"
};
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
