// Central SEO utility — year auto-updates every January 1st
// Server-side: import { YEAR, siteTitle, seoMeta } from "@/lib/seo"

export const YEAR = new Date().getFullYear();
export const NEXT_YEAR = YEAR + 1;

export const SITE_NAME = "bruttonettocalculator";
export const SITE_URL = "https://bruttonettocalculator.com";

// Reusable canonical builder
export const canonical = (path: string) => `${SITE_URL}${path}`;

// Keyword-rich title builder with auto year
export function seoTitle(name: string, keywords?: string) {
  return `${name} ${YEAR}/${NEXT_YEAR} | ${keywords ? keywords + " – " : ""}${SITE_NAME}`;
}

// Common German payroll keywords
export const GLOBAL_KEYWORDS = [
  "Brutto Netto Rechner",
  `Gehaltsrechner ${YEAR}`,
  "Nettolohn berechnen",
  "Lohnsteuer",
  "Sozialabgaben",
  `Gehalt ${YEAR}`,
  "Deutschland",
  "kostenlos online",
];

// Per-calculator SEO config
export const CALCULATOR_SEO: Record<string, {
  title: string;
  description: string;
  keywords: string[];
  path: string;
}> = {
  home: {
    title: `Brutto-Netto-Rechner ${YEAR}/${NEXT_YEAR} | Nettogehalt sofort berechnen – kostenlos`,
    description: `✓ Brutto-Netto-Rechner ${YEAR}: Nettogehalt sekundenschnell berechnen. Lohnsteuer, alle 6 Steuerklassen, Sozialabgaben ${YEAR}/${NEXT_YEAR}. Keine Anmeldung nötig.`,
    keywords: ["Brutto Netto Rechner", "Nettogehalt berechnen", "Gehaltsrechner", `Lohnsteuer ${YEAR}`, "Steuerklassen", "Sozialabgaben"],
    path: "/",
  },
  "netto-brutto": {
    title: `Netto-Brutto-Rechner ${YEAR} | Wunsch-Netto zu Brutto umrechnen`,
    description: `Netto-Brutto-Rechner ${YEAR}: Welches Bruttogehalt brauchen Sie für Ihr Wunsch-Netto? Kostenlose Rückrechnung mit Steuerklasse & Sozialabgaben.`,
    keywords: ["Netto Brutto Rechner", "Bruttogehalt berechnen", "Wunsch Netto", "Rückrechnung Gehalt"],
    path: "/netto-brutto",
  },
  stundenlohn: {
    title: `Stundenlohnrechner ${YEAR} | Monatsgehalt in Stundenlohn umrechnen`,
    description: `Stundenlohnrechner ${YEAR}: Berechnen Sie Ihren Stundenlohn aus dem Bruttomonatsgehalt. Mindestlohn ${YEAR} Check inklusive – sofort & kostenlos.`,
    keywords: ["Stundenlohnrechner", "Stundenlohn berechnen", "Monatsgehalt umrechnen", `Mindestlohn ${YEAR}`],
    path: "/stundenlohn",
  },
  firmenwagen: {
    title: `Firmenwagenrechner ${YEAR} | Geldwerter Vorteil 1% Regelung berechnen`,
    description: `Firmenwagenrechner ${YEAR}: Geldwerten Vorteil nach der 1%-, 0,5%- oder 0,25%-Regelung berechnen. Dienstwagen-Steuer für Verbrenner, Hybrid & E-Auto.`,
    keywords: ["Firmenwagenrechner", "Geldwerter Vorteil", "1% Regelung", "Dienstwagen versteuern", "Elektroauto Firmenwagen"],
    path: "/firmenwagen",
  },
  kurzarbeitergeld: {
    title: `Kurzarbeitergeld Rechner ${YEAR} | KUG Anspruch berechnen`,
    description: `Kurzarbeitergeld Rechner ${YEAR}: Berechnen Sie Ihren KUG-Anspruch (60% oder 67%) schnell und einfach. Kurzarbeit ${YEAR} – Alle Infos & Formeln.`,
    keywords: ["Kurzarbeitergeld Rechner", "KUG berechnen", "Kurzarbeit Anspruch", `Kurzarbeitergeld ${YEAR}`],
    path: "/kurzarbeitergeld",
  },
  arbeitslosengeld: {
    title: `Arbeitslosengeld Rechner (ALG 1) ${YEAR} | ALG I Anspruch berechnen`,
    description: `ALG 1 Rechner ${YEAR}: Wie viel Arbeitslosengeld I bekomme ich? Berechnung nach 60% / 67%-Satz & Steuerklasse. Einfach & kostenlos online.`,
    keywords: ["Arbeitslosengeld Rechner", "ALG 1 berechnen", "Arbeitslosengeld I", `ALG Anspruch ${YEAR}`],
    path: "/arbeitslosengeld",
  },
  rente: {
    title: `Rentenrechner ${YEAR} | Gesetzliche Rente & Rentenlücke berechnen`,
    description: `Rentenrechner ${YEAR}: Wie hoch wird meine Rente? Berechnen Sie Ihre voraussichtliche gesetzliche Altersrente, Rentenpunkte & Versorgungslücke.`,
    keywords: ["Rentenrechner", "Rente berechnen", "Rentenlücke", "gesetzliche Rente", `Rentenpunkte ${YEAR}`],
    path: "/rente",
  },
  rentenpunkte: {
    title: `Rentenpunkte Rechner ${YEAR} | Entgeltpunkte pro Jahr berechnen`,
    description: `Rentenpunkte Rechner ${YEAR}: Berechnen Sie Ihre jährlichen Entgeltpunkte. Aktueller Rentenwert ${YEAR}: 37,60 €. Durchschnittsentgelt & Punkte sofort ermitteln.`,
    keywords: ["Rentenpunkte berechnen", "Entgeltpunkte", `Rentenwert ${YEAR}`, "Rentenpunkte Rechner"],
    path: "/rentenpunkte",
  },
  arbeitgeber: {
    title: `Arbeitgeberrechner ${YEAR} | Lohnkosten & Lohnnebenkosten berechnen`,
    description: `Arbeitgeberrechner ${YEAR}: Gesamte Personalkosten & Lohnnebenkosten (AG-Anteile) berechnen. Wie viel kostet ein Mitarbeiter wirklich? Inkl. U1, U2, U3.`,
    keywords: ["Arbeitgeberrechner", "Lohnnebenkosten berechnen", "Personalkosten", `Arbeitgeberanteil ${YEAR}`],
    path: "/arbeitgeber",
  },
  pendlerpauschale: {
    title: `Pendlerpauschale Rechner ${YEAR} | Entfernungspauschale berechnen`,
    description: `Pendlerpauschale ${YEAR}: Berechnen Sie Ihre Entfernungspauschale (30 Ct. / 38 Ct. ab 21. km). Werbungskosten für den Arbeitsweg einfach ermitteln.`,
    keywords: ["Pendlerpauschale Rechner", "Entfernungspauschale berechnen", "Fahrtkosten absetzen", `Pendlerpauschale ${YEAR}`],
    path: "/pendlerpauschale",
  },
  schenkungssteuer: {
    title: `Schenkungssteuer Rechner ${YEAR} | Freibeträge & Steuerlast berechnen`,
    description: `Schenkungssteuer ${YEAR}: Steuerfreibeträge, Steuerklassen & Steuersätze bei Schenkungen berechnen. Kinder: 400.000 €, Ehegatte: 500.000 € – alle 10 Jahre.`,
    keywords: ["Schenkungssteuer Rechner", "Schenkung Freibetrag", "Schenkungssteuer berechnen", "Erbschaftsteuer"],
    path: "/schenkungssteuer",
  },
  urlaubsgeld: {
    title: `Urlaubsgeldrechner ${YEAR} | Netto-Urlaubsgeld sofort berechnen`,
    description: `Urlaubsgeldrechner ${YEAR}: Wie viel Netto bleibt vom Urlaubsgeld? Berechnen Sie die genauen Steuer- & SV-Abzüge auf Ihre Sonderzahlung.`,
    keywords: ["Urlaubsgeldrechner", "Urlaubsgeld Netto", "Sonderzahlung versteuern", `Urlaubsgeld ${YEAR}`],
    path: "/urlaubsgeld",
  },
};
