import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pendlerpauschale Rechner 2026 | Entfernungspauschale berechnen",
  description: "Pendlerpauschale 2026: Entfernungspauschale berechnen (30 Ct. / 38 Ct. ab 21. km). Werbungskosten für den Arbeitsweg einfach ermitteln.",
  keywords: "Pendlerpauschale Rechner, Entfernungspauschale 2026, Fahrtkosten absetzen",
  alternates: { canonical: "https://bruttonettocalculator.com/pendlerpauschale" },
  openGraph: {
    title: "Pendlerpauschale Rechner 2026 | Entfernungspauschale berechnen",
    description: "Pendlerpauschale 2026: Entfernungspauschale berechnen (30 Ct. / 38 Ct. ab 21. km). Werbungskosten für den Arbeitsweg einfach ermitteln.",
    url: "https://bruttonettocalculator.com/pendlerpauschale",
    locale: "de_DE",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Pendlerpauschale Rechner 2026 | Entfernungspauschale berechnen", description: "Pendlerpauschale 2026: Entfernungspauschale berechnen (30 Ct. / 38 Ct. ab 21. km). Werbungskosten für den Arbeitsweg einfach ermitteln." },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Pendlerpauschale Rechner 2026 | Entfernungspauschale berechnen",
  "url": "https://bruttonettocalculator.com/pendlerpauschale",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "Pendlerpauschale 2026: Entfernungspauschale berechnen (30 Ct. / 38 Ct. ab 21. km). Werbungskosten für den Arbeitsweg einfach ermitteln.",
  "inLanguage": "de-DE"
};
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
