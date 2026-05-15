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

export const metadata: Metadata = {
  title: {
    default: s.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: s.description,
  keywords: [...GLOBAL_KEYWORDS, ...s.keywords].join(", "),
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    languages: {
      "de-DE": "/",
      "de": "/",
    },
  },

  openGraph: {
    title: s.title,
    description: s.description,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "de_DE",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: s.title,
    description: s.description,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  other: {
    "dc.title": s.title,
    "dc.description": s.description,
    "dc.language": "de",
    "dc.subject": `Gehaltsrechner, Lohnrechner, Steuer ${YEAR}, Deutschland`,
    "revisit-after": "3 days",
    "geo.region": "DE",
    "geo.placename": "Deutschland",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": SITE_URL,
    "description": `Kostenlose Gehalts- und Lohnrechner für Deutschland ${YEAR}/${NEXT_YEAR}`,
    "inLanguage": "de-DE",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "sameAs": [],
    "areaServed": {
      "@type": "Country",
      "name": "Germany"
    }
  };

  return (
    <html lang="de-DE" className={nunito.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
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
