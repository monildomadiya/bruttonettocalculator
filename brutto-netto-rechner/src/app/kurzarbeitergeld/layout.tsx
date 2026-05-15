import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kurzarbeitergeld Rechner 2026 | KUG Anspruch berechnen",
  description: "Kurzarbeitergeld Rechner 2026: KUG-Anspruch (60% oder 67%) schnell berechnen. Kurzarbeit 2026 – alle Infos & Formeln.",
  keywords: "Kurzarbeitergeld Rechner, KUG berechnen, Kurzarbeit Anspruch 2026",
  alternates: { 
    canonical: "https://bruttonettocalculator.com/kurzarbeitergeld",
    languages: {
      "de-DE": "https://bruttonettocalculator.com/kurzarbeitergeld",
      "de": "https://bruttonettocalculator.com/kurzarbeitergeld"
    }
  },
  openGraph: {
    title: "Kurzarbeitergeld Rechner 2026 | KUG Anspruch berechnen",
    description: "Kurzarbeitergeld Rechner 2026: KUG-Anspruch (60% oder 67%) schnell berechnen. Kurzarbeit 2026 – alle Infos & Formeln.",
    url: "https://bruttonettocalculator.com/kurzarbeitergeld",
    locale: "de_DE",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Kurzarbeitergeld Rechner 2026 | KUG Anspruch berechnen", description: "Kurzarbeitergeld Rechner 2026: KUG-Anspruch (60% oder 67%) schnell berechnen. Kurzarbeit 2026 – alle Infos & Formeln." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Kurzarbeitergeld Rechner 2026 | KUG Anspruch berechnen",
  "url": "https://bruttonettocalculator.com/kurzarbeitergeld",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "Kurzarbeitergeld Rechner 2026: KUG-Anspruch (60% oder 67%) schnell berechnen. Kurzarbeit 2026 – alle Infos & Formeln.",
  "inLanguage": "de-DE"
};
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
