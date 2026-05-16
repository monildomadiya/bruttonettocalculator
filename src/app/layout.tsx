import type { Metadata } from "next";
import Script from "next/script";
import { Nunito_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CALCULATOR_SEO, SITE_NAME, SITE_URL, YEAR, NEXT_YEAR, GLOBAL_KEYWORDS } from "@/lib/seo";
import "./globals.css";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-nunito",
});

const s = CALCULATOR_SEO.hub;

// ── Viewport: REQUIRED for correct mobile rendering ──
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)",  color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: s.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: s.description,
  keywords: [...GLOBAL_KEYWORDS, ...s.keywords].join(", "),
  authors:   [{ name: SITE_NAME, url: SITE_URL }],
  creator:   SITE_NAME,
  publisher: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" }
    ],
    shortcut: ["/favicon.png"],
    apple: [
      { url: "/favicon.png", type: "image/png" }
    ],
  },
  alternates: {

    canonical: "/",
    languages: {
      "de-DE": "/",
      "de":    "/",
    },
  },

  openGraph: {
    title:       s.title,
    description: s.description,
    url:         SITE_URL,
    siteName:    SITE_NAME,
    locale:      "de_DE",
    type:        "website",
    images: [{
      url:    `${SITE_URL}/og-image.png`,
      width:  1200,
      height: 630,
      alt:    `${SITE_NAME} – Brutto-Netto-Rechner & Finanztools Deutschland ${YEAR}`,
    }],
  },

  twitter: {
    card:        "summary_large_image",
    title:       s.title,
    description: s.description,
    images:      [`${SITE_URL}/og-image.png`],
  },

  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:  true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },

  other: {
    "geo.region":     "DE",
    "geo.placename":  "Deutschland",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  /* ── Structured Data: WebSite (enables Sitelinks Searchbox) ── */
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": SITE_URL,
    "description": `Kostenlose Gehalts- und Lohnrechner für Deutschland ${YEAR}/${NEXT_YEAR}. Brutto-Netto, Stundenlohn, Rente, Firmenwagen & mehr.`,
    "inLanguage": "de-DE",
    "potentialAction": {
      "@type": "SearchAction",
      "target": { "@type": "EntryPoint", "urlTemplate": `${SITE_URL}/?s={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  /* ── Structured Data: Organization (trust signal) ── */
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_URL}/logo.png`,
      "width": 512,
      "height": 512,
    },
    "description": `Kostenlose Brutto-Netto-Rechner & Finanztools für Deutschland – präzise, aktuell, ohne Anmeldung.`,
    "foundingDate": "2024",
    "areaServed": { "@type": "Country", "name": "Germany" },
    "inLanguage": "de-DE",
    "sameAs": [
      "https://tdee.tech",
    ],
  };

  /* ── Structured Data: CollectionPage (Hub) ── */
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Kostenlose Finanz- & Gehaltsrechner ${YEAR}`,
    "url": SITE_URL,
    "description": `Alle kostenlosen Finanz-Rechner für Deutschland ${YEAR}: Brutto-Netto, Stundenlohn, Firmenwagen, Rente & mehr.`,
    "inLanguage": "de-DE",
    "hasPart": [
      { "@type": "WebApplication", "name": "Brutto-Netto-Rechner",   "url": `${SITE_URL}/brutto-netto-rechner` },
      { "@type": "WebApplication", "name": "Netto-Brutto-Rechner",   "url": `${SITE_URL}/netto-brutto` },
      { "@type": "WebApplication", "name": "Stundenlohnrechner",     "url": `${SITE_URL}/stundenlohn` },
      { "@type": "WebApplication", "name": "Arbeitgeberrechner",     "url": `${SITE_URL}/arbeitgeber` },
      { "@type": "WebApplication", "name": "Minijob Rechner",        "url": `${SITE_URL}/minijob` },
      { "@type": "WebApplication", "name": "Firmenwagenrechner",     "url": `${SITE_URL}/firmenwagen` },
      { "@type": "WebApplication", "name": "Pendlerpauschale",       "url": `${SITE_URL}/pendlerpauschale` },
      { "@type": "WebApplication", "name": "Abfindungsrechner",      "url": `${SITE_URL}/abfindung` },
      { "@type": "WebApplication", "name": "Schenkungssteuer",       "url": `${SITE_URL}/schenkungssteuer` },
      { "@type": "WebApplication", "name": "Kurzarbeitergeld",       "url": `${SITE_URL}/kurzarbeitergeld` },
      { "@type": "WebApplication", "name": "Arbeitslosengeld I",     "url": `${SITE_URL}/arbeitslosengeld` },
      { "@type": "WebApplication", "name": "Krankengeldrechner",     "url": `${SITE_URL}/krankengeld` },
      { "@type": "WebApplication", "name": "Urlaubsgeldrechner",     "url": `${SITE_URL}/urlaubsgeld` },
      { "@type": "WebApplication", "name": "Weihnachtsgeld Rechner", "url": `${SITE_URL}/weihnachtsgeld` },
      { "@type": "WebApplication", "name": "Elterngeld Rechner",     "url": `${SITE_URL}/elterngeld` },
      { "@type": "WebApplication", "name": "Rentenrechner",          "url": `${SITE_URL}/rente` },
      { "@type": "WebApplication", "name": "Rentenpunkte Rechner",   "url": `${SITE_URL}/rentenpunkte` },
    ],
  };

  return (
    <html lang="de-DE" className={nunito.variable} data-theme="light" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var s=localStorage.getItem('theme');if(s)document.documentElement.setAttribute('data-theme',s);else document.documentElement.setAttribute('data-theme','light');}catch(e){}})();` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-FY0K5KT32H" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FY0K5KT32H');
          `}
        </Script>
      </head>
      <body>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
