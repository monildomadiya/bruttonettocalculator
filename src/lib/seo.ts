// Central SEO utility — year auto-updates every January 1st
// Server-side: import { YEAR, siteTitle, seoMeta } from "@/lib/seo"

export const YEAR = new Date().getFullYear();
export const NEXT_YEAR = YEAR + 1;

export const SITE_NAME = "bruttonettocalculator";
export const SITE_URL  = "https://bruttonettocalculator.com";

// Reusable canonical builder
export const canonical = (path: string) => `${SITE_URL}${path}`;

// Keyword-rich title builder with auto year
export function seoTitle(name: string, keywords?: string) {
  return `${name} ${YEAR}/${NEXT_YEAR} | ${keywords ? keywords + " – " : ""}${SITE_NAME}`;
}

// ─── GLOBAL KEYWORD POOL ───────────────────────────────────────────────────
export const GLOBAL_KEYWORDS = [
  "Brutto Netto Rechner",
  `Gehaltsrechner ${YEAR}`,
  "Nettolohn berechnen",
  "Lohnsteuer",
  "Sozialabgaben",
  `Gehalt ${YEAR}`,
  "Deutschland",
  "kostenlos online",
  "Steuerrechner Deutschland",
  "Lohnrechner",
  `Steuer ${YEAR}`,
];

// ─── PER-CALCULATOR SEO CONFIG ─────────────────────────────────────────────
export const CALCULATOR_SEO: Record<string, {
  title:       string;
  description: string;
  keywords:    string[];
  path:        string;
}> = {

  hub: {
    title:       `Kostenlose Finanz- & Gehaltsrechner ${YEAR} | bruttonettocalculator.com`,
    description: `Alle kostenlosen Finanz- & Lohnrechner auf einen Blick: Brutto-Netto, Stundenlohn, Firmenwagen, Rente, Kurzarbeitergeld & mehr. Offizielle Formeln ${YEAR} – keine Anmeldung.`,
    keywords:    ["Finanzrechner", "Gehaltsrechner", "Alle Rechner", "Brutto Netto Hub", "Steuerrechner", "Lohnrechner Deutschland", `Finanztools ${YEAR}`],
    path:        "/",
  },

  home: {
    title:       `Brutto-Netto-Rechner ${YEAR}/${NEXT_YEAR} | Nettogehalt sofort berechnen – kostenlos`,
    description: `Brutto-Netto-Rechner ${YEAR}: Nettogehalt in Sekunden berechnen. Alle 6 Steuerklassen, Lohnsteuer, Solidaritätszuschlag & Sozialabgaben ${YEAR}/${NEXT_YEAR}. Kostenlos & ohne Anmeldung.`,
    keywords:    [
      "Brutto Netto Rechner", "Nettogehalt berechnen", `Gehaltsrechner ${YEAR}`,
      `Lohnsteuer ${YEAR}`, "Steuerklassen", "Sozialabgaben", "Nettolohn berechnen",
      `Brutto Netto ${YEAR}`, "Gehaltsabrechnung", "Lohnabrechnung online",
    ],
    path:        "/brutto-netto-rechner",
  },

  "netto-brutto": {
    title:       `Netto-Brutto-Rechner ${YEAR} | Wunsch-Netto zu Brutto umrechnen`,
    description: `Netto-Brutto-Rechner ${YEAR}: Welches Bruttogehalt brauchen Sie für Ihr Wunsch-Netto? Rückrechnung mit allen Steuerklassen & Sozialabgaben – kostenlos & sofort.`,
    keywords:    ["Netto Brutto Rechner", "Bruttogehalt berechnen", "Wunsch Netto", "Rückrechnung Gehalt", `Netto zu Brutto ${YEAR}`, "Gehalt rückrechnen"],
    path:        "/netto-brutto",
  },

  stundenlohn: {
    title:       `Stundenlohnrechner ${YEAR} | Monatsgehalt in Stundenlohn umrechnen`,
    description: `Stundenlohnrechner ${YEAR}: Ihren Stundenlohn aus Bruttojahresgehalt oder Monatsgehalt berechnen. Mindestlohn ${YEAR} prüfen – einfach, sofort & kostenlos.`,
    keywords:    ["Stundenlohnrechner", "Stundenlohn berechnen", "Monatsgehalt umrechnen", `Mindestlohn ${YEAR}`, "Stundensatz berechnen", "Jahresgehalt in Stundenlohn"],
    path:        "/stundenlohn",
  },

  firmenwagen: {
    title:       `Firmenwagenrechner ${YEAR} | Geldwerter Vorteil 1%-Regel berechnen`,
    description: `Firmenwagenrechner ${YEAR}: Geldwerten Vorteil nach 1%-, 0,5%- & 0,25%-Regelung sofort berechnen. Dienstwagen-Steuer für Verbrenner, Hybrid & Elektroauto ${YEAR}.`,
    keywords:    ["Firmenwagenrechner", "Geldwerter Vorteil", "1% Regelung", "Dienstwagen versteuern", `Firmenwagen Steuer ${YEAR}`, "Elektroauto Firmenwagen", "Fahrtenbuch Rechner"],
    path:        "/firmenwagen",
  },

  kurzarbeitergeld: {
    title:       `Kurzarbeitergeld Rechner ${YEAR} | KUG Anspruch & Höhe berechnen`,
    description: `Kurzarbeitergeld Rechner ${YEAR}: KUG-Anspruch nach 60% oder 67% (mit Kind) sofort berechnen. Offizielle Berechnungsformel der BA – kostenlos & aktuell.`,
    keywords:    ["Kurzarbeitergeld Rechner", "KUG berechnen", "Kurzarbeit Anspruch", `Kurzarbeitergeld ${YEAR}`, "Kurzarbeit Berechnung", "Arbeitsagentur KUG"],
    path:        "/kurzarbeitergeld",
  },

  arbeitslosengeld: {
    title:       `Arbeitslosengeld-Rechner (ALG 1) ${YEAR} | ALG I Anspruch berechnen`,
    description: `ALG 1 Rechner ${YEAR}: Wie viel Arbeitslosengeld I erhalte ich? Berechnung nach 60% / 67%-Satz & Steuerklasse. Leistungsentgelt & Bezugsdauer sofort ermitteln.`,
    keywords:    ["Arbeitslosengeld Rechner", "ALG 1 berechnen", "Arbeitslosengeld I", `ALG Anspruch ${YEAR}`, "ALG 1 Bezugsdauer", "Leistungsentgelt berechnen"],
    path:        "/arbeitslosengeld",
  },

  rente: {
    title:       `Rentenrechner ${YEAR} | Gesetzliche Rente & Rentenlücke berechnen`,
    description: `Rentenrechner ${YEAR}: Wie hoch wird meine gesetzliche Rente? Altersrente, Rentenpunkte & Versorgungslücke kostenlos online ermitteln. Rentenwert ${YEAR}: 37,60 €.`,
    keywords:    ["Rentenrechner", "Rente berechnen", "Rentenlücke", "gesetzliche Rente", `Rentenpunkte ${YEAR}`, "Altersrente berechnen", `Rentenwert ${YEAR}`],
    path:        "/rente",
  },

  rentenpunkte: {
    title:       `Rentenpunkte Rechner ${YEAR} | Entgeltpunkte pro Jahr berechnen`,
    description: `Rentenpunkte Rechner ${YEAR}: Jährliche Entgeltpunkte aus Ihrem Bruttogehalt berechnen. Aktueller Rentenwert ${YEAR}: 37,60 €. Punkte & monatliche Rente sofort ermitteln.`,
    keywords:    ["Rentenpunkte berechnen", "Entgeltpunkte", `Rentenwert ${YEAR}`, "Rentenpunkte Rechner", "Rentenberechnung", "Entgeltpunkte Rechner"],
    path:        "/rentenpunkte",
  },

  arbeitgeber: {
    title:       `Arbeitgeberrechner ${YEAR} | Lohnkosten & Lohnnebenkosten berechnen`,
    description: `Arbeitgeberrechner ${YEAR}: Gesamte Personalkosten & Lohnnebenkosten (AG-Anteile KV, RV, AV, PV, U1, U2) berechnen. Was kostet ein Mitarbeiter wirklich? Sofort & kostenlos.`,
    keywords:    ["Arbeitgeberrechner", "Lohnnebenkosten berechnen", "Personalkosten", `Arbeitgeberanteil ${YEAR}`, "AG Anteil Sozialversicherung", "Mitarbeiterkosten"],
    path:        "/arbeitgeber",
  },

  pendlerpauschale: {
    title:       `Pendlerpauschale Rechner ${YEAR} | Entfernungspauschale berechnen`,
    description: `Pendlerpauschale ${YEAR}: Entfernungspauschale (30 Ct. / 38 Ct. ab 21. km) & jährliche Steuerersparnis sofort berechnen. Werbungskosten für den Arbeitsweg optimal nutzen.`,
    keywords:    ["Pendlerpauschale Rechner", "Entfernungspauschale berechnen", "Fahrtkosten absetzen", `Pendlerpauschale ${YEAR}`, "Werbungskosten Arbeitsweg", "Fahrkostenpauschale"],
    path:        "/pendlerpauschale",
  },

  schenkungssteuer: {
    title:       `Schenkungssteuer Rechner ${YEAR} | Freibeträge & Steuerlast berechnen`,
    description: `Schenkungssteuer ${YEAR}: Alle Freibeträge (Kind: 400.000 €, Ehegatte: 500.000 €), Steuerklassen & Steuersätze bei Schenkungen berechnen. Alle 10 Jahre neu – jetzt ermitteln.`,
    keywords:    ["Schenkungssteuer Rechner", "Schenkung Freibetrag", "Schenkungssteuer berechnen", "Erbschaftsteuer", `Schenkungssteuer ${YEAR}`, "Schenkungsfreibetrag Kinder"],
    path:        "/schenkungssteuer",
  },

  urlaubsgeld: {
    title:       `Urlaubsgeldrechner ${YEAR} | Netto-Urlaubsgeld sofort berechnen`,
    description: `Urlaubsgeldrechner ${YEAR}: Wie viel Netto bleibt vom Urlaubsgeld? Steuer- & SV-Abzüge auf Ihre Sonderzahlung nach Steuerklasse sofort & kostenlos berechnen.`,
    keywords:    ["Urlaubsgeldrechner", "Urlaubsgeld Netto", "Sonderzahlung versteuern", `Urlaubsgeld ${YEAR}`, "Urlaubsgeld Berechnung", "Netto Urlaubsgeld"],
    path:        "/urlaubsgeld",
  },

  minijob: {
    title:       `Minijob Rechner ${YEAR} | Verdienstgrenze & Abgaben sofort berechnen`,
    description: `Minijob Rechner ${YEAR}: Liegt Ihr Gehalt unter der 556-€-Grenze? Arbeitnehmer- & Arbeitgeberbeiträge, Rentenversicherungsoption und Netto sofort ermitteln.`,
    keywords:    ["Minijob Rechner", "Minijob berechnen", `Minijob ${YEAR}`, "Minijob Verdienstgrenze", "556 Euro Grenze", "geringfügige Beschäftigung", "Minijob Abgaben"],
    path:        "/minijob",
  },

  weihnachtsgeld: {
    title:       `Weihnachtsgeld Rechner ${YEAR} | Netto-Weihnachtsgeld sofort berechnen`,
    description: `Weihnachtsgeld Rechner ${YEAR}: Wie viel Netto bleibt vom Weihnachtsgeld? Lohnsteuer & Sozialabgaben auf Ihre Sonderzahlung nach Steuerklasse sofort berechnen.`,
    keywords:    ["Weihnachtsgeld Rechner", `Weihnachtsgeld ${YEAR}`, "Weihnachtsgeld Netto", "Weihnachtsgeld berechnen", "Weihnachtsgeld Steuer", "13. Monatsgehalt"],
    path:        "/weihnachtsgeld",
  },

  krankengeld: {
    title:       `Krankengeldrechner ${YEAR} | Anspruch & Höhe berechnen`,
    description: `Krankengeldrechner ${YEAR}: Wie viel Krankengeld erhalten Sie nach 6 Wochen Krankheit? Netto-Krankengeld Abzüge sofort & kostenlos berechnen.`,
    keywords:    ["Krankengeldrechner", `Krankengeld ${YEAR}`, "Krankengeld berechnen", "Krankengeld Netto", "Krankengeld Abzüge", "6 Wochen krank"],
    path:        "/krankengeld",
  },

  abfindung: {
    title:       `Abfindungsrechner ${YEAR} | Steuer nach Fünftelregelung berechnen`,
    description: `Abfindungsrechner ${YEAR}: Berechnen Sie die Steuern auf Ihre Abfindung. Wie viel Netto bleibt durch die Fünftelregelung? Sofort & kostenlos ermitteln.`,
    keywords:    ["Abfindungsrechner", "Abfindung versteuern", "Fünftelregelung", `Abfindung ${YEAR}`, "Abfindung Netto", "Steuer auf Abfindung", "Kündigung Abfindung"],
    path:        "/abfindung",
  },

  elterngeld: {
    title:       `Elterngeld Rechner ${YEAR} | Elterngeld & ElterngeldPlus berechnen`,
    description: `Elterngeld Rechner ${YEAR}: Basis-Elterngeld & ElterngeldPlus aus Nettoeinkommen berechnen. Anspruchsdauer, Geschwisterbonus & Mehrlingszuschlag – kostenlos & sofort.`,
    keywords:    ["Elterngeld Rechner", `Elterngeld ${YEAR}`, "Elterngeld berechnen", "ElterngeldPlus", "Basiselterngeld", "Elterngeld Höhe", "Elterngeld Anspruch"],
    path:        "/elterngeld",
  },
};
