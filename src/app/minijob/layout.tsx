import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, YEAR, NEXT_YEAR } from "@/lib/seo";

const title       = `Minijob Rechner ${YEAR} | Verdienstgrenze & Abgaben sofort berechnen`;
const description = `Minijob Rechner ${YEAR}: Liegt Ihr Gehalt unter der 556-€-Grenze? Arbeitnehmer- & Arbeitgeberbeiträge, Rentenversicherungsoption und Netto sofort ermitteln. Kostenlos & ohne Anmeldung.`;
const url         = `${SITE_URL}/minijob`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Minijob Rechner", "Minijob berechnen", `Minijob ${YEAR}`,
    "Minijob Verdienstgrenze", "450 Euro Job", "520 Euro Job", "556 Euro Grenze",
    "Minijob Abgaben", "Minijob Rentenversicherung", "geringfügige Beschäftigung",
  ].join(", "),
  alternates: { canonical: "/minijob", languages: { "de": "/minijob", "de-DE": "/minijob", "x-default": "/minijob" } },
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
    name: title,
    url,
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
      { "@type": "ListItem", position: 2, name: `Minijob Rechner ${YEAR}`, item: url },
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
