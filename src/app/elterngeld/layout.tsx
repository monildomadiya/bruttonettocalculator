import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, YEAR } from "@/lib/seo";

const title       = `Elterngeld Rechner ${YEAR} | Elterngeld & ElterngeldPlus berechnen`;
const description = `Elterngeld Rechner ${YEAR}: Basis-Elterngeld & ElterngeldPlus aus Nettoeinkommen berechnen. Anspruchsdauer, Geschwisterbonus & Mehrlingszuschlag – kostenlos & sofort.`;
const url         = `${SITE_URL}/elterngeld`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Elterngeld Rechner", `Elterngeld ${YEAR}`, "Elterngeld berechnen",
    "ElterngeldPlus", "Basiselterngeld", "Elterngeld Höhe", "Elterngeld Anspruch",
    "Elterngeld Nettoeinkommen", "Geschwisterbonus Elterngeld", "Elterngeld Monate",
  ].join(", "),
  alternates: { canonical: "/elterngeld", languages: { "de": "/elterngeld", "de-DE": "/elterngeld", "x-default": "/elterngeld" } },
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
      { "@type": "ListItem", position: 2, name: `Elterngeld Rechner ${YEAR}`, item: url },
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
