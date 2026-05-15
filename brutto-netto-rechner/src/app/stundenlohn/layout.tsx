import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stundenlohnrechner 2026 | Monatsgehalt in Stundenlohn umrechnen",
  description: "Stundenlohnrechner 2026: Berechnen Sie Ihren Stundenlohn aus dem Bruttomonatsgehalt. Mindestlohn 2026 Check – sofort & kostenlos.",
  keywords: "Stundenlohnrechner, Stundenlohn berechnen, Monatsgehalt umrechnen, Mindestlohn 2026",
  alternates: { 
    canonical: "https://bruttonettocalculator.com/stundenlohn",
    languages: {
      "de-DE": "https://bruttonettocalculator.com/stundenlohn",
      "de": "https://bruttonettocalculator.com/stundenlohn"
    }
  },
  openGraph: {
    title: "Stundenlohnrechner 2026 | Monatsgehalt in Stundenlohn umrechnen",
    description: "Stundenlohnrechner 2026: Berechnen Sie Ihren Stundenlohn aus dem Bruttomonatsgehalt. Mindestlohn 2026 Check – sofort & kostenlos.",
    url: "https://bruttonettocalculator.com/stundenlohn",
    locale: "de_DE",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Stundenlohnrechner 2026 | Monatsgehalt in Stundenlohn umrechnen", description: "Stundenlohnrechner 2026: Berechnen Sie Ihren Stundenlohn aus dem Bruttomonatsgehalt. Mindestlohn 2026 Check – sofort & kostenlos." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Stundenlohnrechner 2026 | Monatsgehalt in Stundenlohn umrechnen",
  "url": "https://bruttonettocalculator.com/stundenlohn",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "Stundenlohnrechner 2026: Berechnen Sie Ihren Stundenlohn aus dem Bruttomonatsgehalt. Mindestlohn 2026 Check – sofort & kostenlos.",
  "inLanguage": "de-DE"
};
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
