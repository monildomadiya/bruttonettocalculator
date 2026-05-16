import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, YEAR } from "@/lib/seo";

const title       = `Weihnachtsgeld Rechner ${YEAR} | Netto-Weihnachtsgeld sofort berechnen`;
const description = `Weihnachtsgeld Rechner ${YEAR}: Wie viel Netto bleibt vom Weihnachtsgeld? Lohnsteuer & Sozialabgaben auf Ihre Sonderzahlung nach Steuerklasse sofort berechnen – kostenlos.`;
const url         = `${SITE_URL}/weihnachtsgeld`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Weihnachtsgeld Rechner", `Weihnachtsgeld ${YEAR}`, "Weihnachtsgeld Netto",
    "Weihnachtsgeld berechnen", "Weihnachtsgeld Steuer", "Sonderzahlung Netto",
    "13. Monatsgehalt", "Weihnachtsgeld Abzüge", "Weihnachtsgeld Steuerklasse",
  ].join(", "),
  alternates: { canonical: "/weihnachtsgeld", languages: { "de": "/weihnachtsgeld", "de-DE": "/weihnachtsgeld", "x-default": "/weihnachtsgeld" } },
  openGraph: {
    title, description, url,
    siteName: SITE_NAME, locale: "de_DE", type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og-image.png`] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title, url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    inLanguage: "de-DE",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    description,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "bruttonettocalculator", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: `Weihnachtsgeld Rechner ${YEAR}`, item: url },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  );
}
