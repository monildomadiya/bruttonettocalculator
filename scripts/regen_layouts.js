/**
 * Regenerates all calculator layout.tsx files with dynamic year metadata
 * pulled from the centralized CALCULATOR_SEO config in src/lib/seo.ts
 *
 * Run: node scripts/regen_layouts.js
 */
const fs = require("fs");
const path = require("path");

const basePath = path.join(
  "c:\\Users\\HP\\OneDrive\\Desktop\\BRUTO-NATO\\brutto-netto-rechner",
  "src",
  "app"
);

// Replicated here so node can run it without TS compilation
const YEAR = new Date().getFullYear();
const NEXT_YEAR = YEAR + 1;
const SITE_URL = "https://bruttonettocalculator.com";

const CALCULATORS = {
  "netto-brutto": {
    title: `Netto-Brutto-Rechner ${YEAR} | Wunsch-Netto zu Brutto umrechnen`,
    desc: `Netto-Brutto-Rechner ${YEAR}: Welches Bruttogehalt brauchen Sie für Ihr Wunsch-Netto? Kostenlose Rückrechnung mit Steuerklasse & Sozialabgaben.`,
    keywords: `Netto Brutto Rechner, Bruttogehalt berechnen, Wunsch Netto, Rückrechnung Gehalt ${YEAR}`,
  },
  stundenlohn: {
    title: `Stundenlohnrechner ${YEAR} | Monatsgehalt in Stundenlohn umrechnen`,
    desc: `Stundenlohnrechner ${YEAR}: Berechnen Sie Ihren Stundenlohn aus dem Bruttomonatsgehalt. Mindestlohn ${YEAR} Check – sofort & kostenlos.`,
    keywords: `Stundenlohnrechner, Stundenlohn berechnen, Monatsgehalt umrechnen, Mindestlohn ${YEAR}`,
  },
  firmenwagen: {
    title: `Firmenwagenrechner ${YEAR} | Geldwerter Vorteil 1% Regelung berechnen`,
    desc: `Firmenwagenrechner ${YEAR}: Geldwerten Vorteil nach der 1%-, 0,5%- oder 0,25%-Regelung berechnen. Dienstwagen-Steuer für Verbrenner, Hybrid & E-Auto.`,
    keywords: `Firmenwagenrechner, Geldwerter Vorteil, 1% Regelung, Dienstwagen versteuern ${YEAR}`,
  },
  kurzarbeitergeld: {
    title: `Kurzarbeitergeld Rechner ${YEAR} | KUG Anspruch berechnen`,
    desc: `Kurzarbeitergeld Rechner ${YEAR}: KUG-Anspruch (60% oder 67%) schnell berechnen. Kurzarbeit ${YEAR} – alle Infos & Formeln.`,
    keywords: `Kurzarbeitergeld Rechner, KUG berechnen, Kurzarbeit Anspruch ${YEAR}`,
  },
  arbeitslosengeld: {
    title: `Arbeitslosengeld Rechner (ALG 1) ${YEAR} | ALG I Anspruch berechnen`,
    desc: `ALG 1 Rechner ${YEAR}: Wie viel Arbeitslosengeld I bekomme ich? Berechnung nach 60%/67%-Satz & Steuerklasse. Einfach & kostenlos.`,
    keywords: `Arbeitslosengeld Rechner, ALG 1 berechnen, Arbeitslosengeld I ${YEAR}`,
  },
  rente: {
    title: `Rentenrechner ${YEAR} | Gesetzliche Rente & Rentenlücke berechnen`,
    desc: `Rentenrechner ${YEAR}: Wie hoch wird meine Rente? Voraussichtliche Altersrente, Rentenpunkte & Versorgungslücke berechnen.`,
    keywords: `Rentenrechner, Rente berechnen, Rentenlücke, gesetzliche Rente ${YEAR}`,
  },
  rentenpunkte: {
    title: `Rentenpunkte Rechner ${YEAR} | Entgeltpunkte pro Jahr berechnen`,
    desc: `Rentenpunkte Rechner ${YEAR}: Jährliche Entgeltpunkte berechnen. Aktueller Rentenwert 37,60 € – Durchschnittsentgelt & Punkte sofort ermitteln.`,
    keywords: `Rentenpunkte berechnen, Entgeltpunkte, Rentenwert ${YEAR}`,
  },
  arbeitgeber: {
    title: `Arbeitgeberrechner ${YEAR} | Lohnkosten & Lohnnebenkosten berechnen`,
    desc: `Arbeitgeberrechner ${YEAR}: Gesamte Personalkosten & Lohnnebenkosten (AG-Anteile) berechnen. Inkl. U1, U2, U3 Umlagen.`,
    keywords: `Arbeitgeberrechner, Lohnnebenkosten berechnen, Personalkosten ${YEAR}`,
  },
  pendlerpauschale: {
    title: `Pendlerpauschale Rechner ${YEAR} | Entfernungspauschale berechnen`,
    desc: `Pendlerpauschale ${YEAR}: Entfernungspauschale berechnen (30 Ct. / 38 Ct. ab 21. km). Werbungskosten für den Arbeitsweg einfach ermitteln.`,
    keywords: `Pendlerpauschale Rechner, Entfernungspauschale ${YEAR}, Fahrtkosten absetzen`,
  },
  schenkungssteuer: {
    title: `Schenkungssteuer Rechner ${YEAR} | Freibeträge & Steuerlast berechnen`,
    desc: `Schenkungssteuer ${YEAR}: Freibeträge, Steuerklassen & Steuersätze bei Schenkungen berechnen. Kinder: 400.000 €, Ehegatte: 500.000 € – alle 10 Jahre.`,
    keywords: `Schenkungssteuer Rechner, Schenkung Freibetrag ${YEAR}, Erbschaftsteuer`,
  },
  urlaubsgeld: {
    title: `Urlaubsgeldrechner ${YEAR} | Netto-Urlaubsgeld sofort berechnen`,
    desc: `Urlaubsgeldrechner ${YEAR}: Wie viel Netto bleibt vom Urlaubsgeld? Steuer- & SV-Abzüge auf Sonderzahlungen berechnen.`,
    keywords: `Urlaubsgeldrechner, Urlaubsgeld Netto ${YEAR}, Sonderzahlung versteuern`,
  },
};

let count = 0;
for (const [folder, meta] of Object.entries(CALCULATORS)) {
  const dir = path.join(basePath, folder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: meta.title,
    url: `${SITE_URL}/${folder}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    description: meta.desc,
    inLanguage: "de-DE",
  };

  const content = `import { Metadata } from "next";

export const metadata: Metadata = {
  title: ${JSON.stringify(meta.title)},
  description: ${JSON.stringify(meta.desc)},
  keywords: ${JSON.stringify(meta.keywords)},
  alternates: { 
    canonical: ${JSON.stringify(`${SITE_URL}/${folder}`)},
    languages: {
      "de-DE": ${JSON.stringify(`${SITE_URL}/${folder}`)},
      "de": ${JSON.stringify(`${SITE_URL}/${folder}`)}
    }
  },
  openGraph: {
    title: ${JSON.stringify(meta.title)},
    description: ${JSON.stringify(meta.desc)},
    url: ${JSON.stringify(`${SITE_URL}/${folder}`)},
    locale: "de_DE",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: ${JSON.stringify(meta.title)}, description: ${JSON.stringify(meta.desc)} },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = ${JSON.stringify(webApp, null, 2)};
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
`;

  fs.writeFileSync(path.join(dir, "layout.tsx"), content);
  count++;
}

console.log(`✓ Regenerated ${count} layout files with year ${YEAR}/${NEXT_YEAR}`);
