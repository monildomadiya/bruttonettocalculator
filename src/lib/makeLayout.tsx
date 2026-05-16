/**
 * Shared layout factory — generates consistent metadata + JSON-LD for every
 * calculator subpage.  Import once, call makeLayout(), done.
 *
 * Usage in any subpage layout.tsx:
 *   import { makeLayout } from "@/lib/makeLayout";
 *   export const { metadata } = makeLayout({ key: "stundenlohn" });
 *   export default makeLayout({ key: "stundenlohn" }).Layout;
 */

import React from "react";
import { CALCULATOR_SEO, SITE_URL, SITE_NAME } from "./seo";

interface MakeLayoutOptions {
  /** Key must match a CALCULATOR_SEO entry */
  key: string;
  /** Extra JSON-LD schemas to inject (e.g. FAQPage from the page file) */
  extraSchemas?: object[];
}

export function makeLayout({ key, extraSchemas = [] }: MakeLayoutOptions) {
  const s = CALCULATOR_SEO[key];
  if (!s) throw new Error(`[makeLayout] Unknown SEO key: "${key}"`);

  const url = `${SITE_URL}${s.path}`;

  // ── Metadata ─────────────────────────────────────────────────────────────
  const metadata = {
    title:       s.title,
    description: s.description,
    keywords:    s.keywords.join(", "),
    alternates: {
      canonical: s.path,
      languages: {
        "de":    s.path,
        "de-DE": s.path,
        "x-default": s.path,
      },
    },
    openGraph: {
      title:       s.title,
      description: s.description,
      url,
      siteName:    SITE_NAME,
      locale:      "de_DE",
      type:        "website" as const,
      images: [{
        url:    `${SITE_URL}/og-image.png`,
        width:  1200,
        height: 630,
        alt:    s.title,
      }],
    },
    twitter: {
      card:        "summary_large_image" as const,
      title:       s.title,
      description: s.description,
      images:      [`${SITE_URL}/og-image.png`],
    },
  };

  // ── JSON-LD ───────────────────────────────────────────────────────────────
  const webAppSchema = {
    "@context":           "https://schema.org",
    "@type":              "WebApplication",
    name:                 s.title,
    url,
    applicationCategory:  "FinanceApplication",
    operatingSystem:      "Web",
    inLanguage:           "de-DE",
    offers:               { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    description:          s.description,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "bruttonettocalculator", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: s.title.split("|")[0].trim(), item: url },
    ],
  };

  const allSchemas = [webAppSchema, breadcrumbSchema, ...extraSchemas];

  // ── Layout component ─────────────────────────────────────────────────────
  function Layout({ children }: { children: React.ReactNode }) {
    return (
      <>
        {allSchemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        {children}
      </>
    );
  }

  return { metadata, Layout };
}
