import React from "react";
import Link from "next/link";
import { YEAR, NEXT_YEAR, SITE_URL, SITE_NAME } from "@/lib/seo";

/* ─── Structured Data ─────────────────────────────────────────── */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: `Was ist der Unterschied zwischen Brutto und Netto Gehalt ${YEAR}?`,
      acceptedAnswer: { "@type": "Answer", text: "Das Bruttogehalt ist Ihr vertraglich vereinbartes Gehalt vor allen Abzügen. Das Nettogehalt ist der Betrag, der nach Abzug von Lohnsteuer, Solidaritätszuschlag, Kirchensteuer (optional) sowie Kranken-, Renten-, Arbeitslosen- und Pflegeversicherung tatsächlich auf Ihr Konto überwiesen wird." },
    },
    {
      "@type": "Question",
      name: `Wie viel Netto bekomme ich bei 3.000 Euro Brutto ${YEAR}?`,
      acceptedAnswer: { "@type": "Answer", text: `Bei einem Bruttogehalt von 3.000 Euro brutto monatlich erhalten Sie ${YEAR} in Steuerklasse I (West, keine Kirchensteuer, GKV) ungefähr 1.980–2.050 Euro netto. Der genaue Betrag hängt von Steuerklasse, Bundesland, Alter und Krankenversicherungsstatus ab.` },
    },
    {
      "@type": "Question",
      name: "Welche Steuerklasse ist für mich am günstigsten?",
      acceptedAnswer: { "@type": "Answer", text: "Für Alleinstehende gilt Steuerklasse 1. Verheiratete profitieren oft von der Kombination 3 und 5, wenn ein Partner deutlich mehr verdient – der Besserverdiener wählt Klasse 3 (geringe Abzüge), der andere Klasse 5 (hohe Abzüge). Klasse 4 mit Faktor ist ideal bei ähnlichem Einkommen beider Partner." },
    },
    {
      "@type": "Question",
      name: `Wie hoch ist der Mindestlohn ${YEAR} in Deutschland?`,
      acceptedAnswer: { "@type": "Answer", text: `Der gesetzliche Mindestlohn beträgt ${YEAR} in Deutschland 12,82 Euro pro Stunde. Für Minijobber bedeutet das eine Verdienstgrenze von 556 Euro pro Monat (bei max. 43,37 Stunden/Monat). Prüfen Sie Ihren Stundenlohn mit unserem Stundenlohnrechner.` },
    },
    {
      "@type": "Question",
      name: "Wie berechnet man das Elterngeld?",
      acceptedAnswer: { "@type": "Answer", text: "Das Basiselterngeld beträgt 65–67% des durchschnittlichen Nettoeinkommens der letzten 12 Monate vor der Geburt. Minimum ist 300 €, Maximum 1.800 € pro Monat. ElterngeldPlus zahlt den halben Betrag dafür doppelt so lange (bis 28 Monate). Benutzen Sie unseren Elterngeld Rechner für eine genaue Schätzung." },
    },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Kostenlose Finanz- & Gehaltsrechner Deutschland ${YEAR}`,
  description: `Alle kostenlosen Online-Rechner für Gehalt, Steuern und Sozialleistungen in Deutschland ${YEAR}`,
  url: SITE_URL,
  numberOfItems: 17,
  itemListElement: [
    { "@type": "ListItem", position: 1,  name: "Brutto-Netto-Rechner",   url: `${SITE_URL}/brutto-netto-rechner` },
    { "@type": "ListItem", position: 2,  name: "Netto-Brutto-Rechner",   url: `${SITE_URL}/netto-brutto` },
    { "@type": "ListItem", position: 3,  name: "Stundenlohnrechner",     url: `${SITE_URL}/stundenlohn` },
    { "@type": "ListItem", position: 4,  name: "Arbeitgeberrechner",     url: `${SITE_URL}/arbeitgeber` },
    { "@type": "ListItem", position: 5,  name: "Minijob Rechner",        url: `${SITE_URL}/minijob` },
    { "@type": "ListItem", position: 6,  name: "Firmenwagenrechner",     url: `${SITE_URL}/firmenwagen` },
    { "@type": "ListItem", position: 7,  name: "Pendlerpauschale",       url: `${SITE_URL}/pendlerpauschale` },
    { "@type": "ListItem", position: 8,  name: "Abfindungsrechner",      url: `${SITE_URL}/abfindung` },
    { "@type": "ListItem", position: 9,  name: "Schenkungssteuer",       url: `${SITE_URL}/schenkungssteuer` },
    { "@type": "ListItem", position: 10, name: "Kurzarbeitergeld",       url: `${SITE_URL}/kurzarbeitergeld` },
    { "@type": "ListItem", position: 11, name: "Arbeitslosengeld I",     url: `${SITE_URL}/arbeitslosengeld` },
    { "@type": "ListItem", position: 12, name: "Krankengeldrechner",     url: `${SITE_URL}/krankengeld` },
    { "@type": "ListItem", position: 13, name: "Urlaubsgeldrechner",     url: `${SITE_URL}/urlaubsgeld` },
    { "@type": "ListItem", position: 14, name: "Weihnachtsgeld Rechner", url: `${SITE_URL}/weihnachtsgeld` },
    { "@type": "ListItem", position: 15, name: "Elterngeld Rechner",     url: `${SITE_URL}/elterngeld` },
    { "@type": "ListItem", position: 16, name: "Rentenrechner",          url: `${SITE_URL}/rente` },
    { "@type": "ListItem", position: 17, name: "Rentenpunkte Rechner",   url: `${SITE_URL}/rentenpunkte` },
  ],
};

/* ─── Tool groups for hub grid ────────────────────────────────── */
const GROUPS = [
  {
    label: "LOHNRECHNER",
    items: [
      { href: "/brutto-netto-rechner", label: "Brutto-Netto-Rechner", desc: "Nettogehalt exakt berechnen für alle Steuerklassen." },
      { href: "/netto-brutto",         label: "Netto-Brutto-Rechner", desc: "Welches Brutto für Ihr Wunsch-Netto?" },
      { href: "/stundenlohn",          label: "Stundenlohnrechner",   desc: "Monatsgehalt auf Stundenbasis umrechnen." },
      { href: "/arbeitgeber",          label: "Arbeitgeberrechner",   desc: "Gesamte Lohnkosten & Nebenkosten." },
    ],
  },
  {
    label: "STEUER & RECHT",
    items: [
      { href: "/firmenwagen",     label: "Firmenwagenrechner", desc: "Geldwerten Vorteil (1%-Regel) berechnen." },
      { href: "/pendlerpauschale", label: "Pendlerpauschale",  desc: "Fahrtkosten für den Arbeitsweg absetzen." },
      { href: "/abfindung",        label: "Abfindungsrechner", desc: "Steuer auf Abfindung (Fünftelregelung)." },
      { href: "/schenkungssteuer", label: "Schenkungssteuer",  desc: "Steuern bei Schenkung & Erbschaft." },
    ],
  },
  {
    label: "SOZIALLEISTUNGEN & SONDERZAHLUNGEN",
    items: [
      { href: "/kurzarbeitergeld", label: "Kurzarbeitergeld",      desc: "KUG Anspruch & Auszahlung berechnen." },
      { href: "/arbeitslosengeld", label: "Arbeitslosengeld I",    desc: "Voraussichtlichen ALG I Anspruch ermitteln." },
      { href: "/krankengeld",      label: "Krankengeldrechner",    desc: "Netto-Krankengeld nach 6 Wochen Krankheit." },
      { href: "/urlaubsgeld",      label: "Urlaubsgeldrechner",    desc: "Netto vom Urlaubsgeld berechnen." },
      { href: "/weihnachtsgeld",   label: "Weihnachtsgeld Rechner", desc: "Netto-Weihnachtsgeld sofort berechnen." },
      { href: "/elterngeld",       label: "Elterngeld Rechner",   desc: "Basis-Elterngeld & ElterngeldPlus ermitteln." },
    ],
  },
  {
    label: "MINI- & NEBENJOB",
    items: [
      { href: "/minijob", label: "Minijob Rechner", desc: "Verdienstgrenze & Arbeitgeberbeiträge prüfen." },
    ],
  },
  {
    label: "RENTE & VORSORGE",
    items: [
      { href: "/rente",        label: "Rentenrechner",         desc: "Gesetzliche Altersrente voraussagen." },
      { href: "/rentenpunkte", label: "Rentenpunkte Rechner",  desc: "Entgeltpunkte pro Jahr ermitteln." },
    ],
  },
];

/* ─── Page ─────────────────────────────────────────────────────── */
export default function HubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      {/* Hero */}
      <div className="hub-hero">
        <div className="page-wrap">
          <h1>Kostenlose Finanz- &amp; Gehaltsrechner für Deutschland {YEAR}</h1>
          <p>
            Berechnen Sie Ihr Nettogehalt, Lohnsteuer, Sozialabgaben und staatliche Leistungen sofort –
            mit den offiziellen BMF-Formeln {YEAR}/{NEXT_YEAR}. Kostenlos, ohne Anmeldung.
          </p>
          <Link href="/brutto-netto-rechner" className="hub-hero-btn">
            Brutto-Netto-Rechner starten ➔
          </Link>
        </div>
      </div>

      <div className="page-wrap hub-content">

        {/* Tool grid */}
        {GROUPS.map((group) => (
          <div key={group.label} className="hub-section">
            <div className="hub-section-header">
              <h2>{group.label}</h2>
              <span className="hub-section-count">{group.items.length} TOOLS</span>
            </div>
            <div className="hub-grid">
              {group.items.map((item) => (
                <Link key={item.href} href={item.href} className="hub-card">
                  <div className="hub-card-title">{item.label}</div>
                  <div className="hub-card-desc">{item.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* SEO Editorial Content — critical for E-E-A-T & thin-content signal */}
        <div className="seo-section" style={{ marginTop: "32px" }}>
          <h2>Brutto-Netto-Rechner & Finanztools {YEAR} – Ihr kostenloser Gehaltsratgeber</h2>
          <p>
            <strong>bruttonettocalculator.com</strong> ist Deutschlands präziser Online-Rechner für alle Fragen rund um
            Gehalt, Lohnsteuer und Sozialabgaben. Alle {YEAR} Formeln basieren auf den aktuellen Veröffentlichungen
            des <strong>Bundesministeriums der Finanzen (BMF)</strong> und der Deutschen Rentenversicherung –
            damit Sie immer auf dem aktuellen Stand sind.
          </p>

          <h3>Warum ist der Brutto-Netto-Unterschied so wichtig?</h3>
          <p>
            In deutschen Arbeitsverträgen wird stets das <strong>Bruttogehalt</strong> vereinbart. Das ist jedoch
            nicht das Geld, das Sie auf Ihrem Konto sehen. Arbeitgeber sind gesetzlich verpflichtet, Lohnsteuer,
            Solidaritätszuschlag und Sozialversicherungsbeiträge direkt einzubehalten und abzuführen.
            Je nach Steuerklasse, Bundesland und persönlicher Situation können die Abzüge {YEAR} zwischen
            <strong> 25 % und 45 %</strong> Ihres Bruttogehalts ausmachen.
          </p>
          <p>
            Unser <Link href="/brutto-netto-rechner" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>Brutto-Netto-Rechner</Link> berücksichtigt
            alle sechs Steuerklassen, den kassenindividuellen Zusatzbeitrag zur Krankenversicherung, PKV-Option,
            Kirchensteuer und Kinderfreibeträge – für eine Berechnung auf den Cent genau.
          </p>

          <h3>Alle Sozialversicherungsbeiträge {YEAR} im Überblick</h3>
          <div className="table-wrap">
            <table className="seo-table">
              <thead>
                <tr>
                  <th>Versicherung</th>
                  <th>Gesamtbeitrag</th>
                  <th>Arbeitnehmer-Anteil</th>
                  <th>Beitragsbemessungsgrenze/Jahr</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>Krankenversicherung (GKV)</strong></td><td>14,6 % + Zusatz</td><td>7,3 % + ½ Zusatz</td><td>62.100 €</td></tr>
                <tr><td><strong>Rentenversicherung</strong></td><td>18,6 %</td><td>9,3 %</td><td>90.600 € (West)</td></tr>
                <tr><td><strong>Arbeitslosenversicherung</strong></td><td>2,6 %</td><td>1,3 %</td><td>90.600 €</td></tr>
                <tr><td><strong>Pflegeversicherung</strong></td><td>3,4–4,0 %</td><td>1,7–2,3 %</td><td>62.100 €</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Die wichtigsten Steuerklassen auf einen Blick</h3>
          <ul>
            <li><strong>Steuerklasse 1</strong> – Alleinstehende, Ledige, Geschiedene: Standardabzüge.</li>
            <li><strong>Steuerklasse 2</strong> – Alleinerziehende: Entlastungsbetrag von 4.260 € jährlich.</li>
            <li><strong>Steuerklasse 3</strong> – Verheiratete (Besserverdiener): geringste Lohnsteuerbelastung.</li>
            <li><strong>Steuerklasse 4</strong> – Verheiratete mit ähnlichem Gehalt: Standardabzüge für beide.</li>
            <li><strong>Steuerklasse 5</strong> – Pendant zu Klasse 3: hohe Abzüge für den Geringverdiener.</li>
            <li><strong>Steuerklasse 6</strong> – Zweiter oder weiterer Nebenjob: höchste Abzüge ohne Freibetrag.</li>
          </ul>

          <h3>Häufig gestellte Fragen zu Gehalt & Steuern {YEAR}</h3>
          <div className="faq-item">
            <h3>Was ist der Grundfreibetrag {YEAR}?</h3>
            <p>
              Der steuerliche Grundfreibetrag beträgt {YEAR} <strong>11.784 Euro</strong> für Alleinstehende
              und 23.568 Euro für Verheiratete. Einkünfte bis zu dieser Höhe bleiben vollständig steuerfrei.
              Unser <Link href="/brutto-netto-rechner" style={{ color: "var(--accent)", textDecoration: "none" }}>Brutto-Netto-Rechner</Link> berücksichtigt
              diesen Freibetrag automatisch.
            </p>
          </div>
          <div className="faq-item">
            <h3>Lohnt sich ein Minijob neben dem Hauptjob?</h3>
            <p>
              Grundsätzlich ja. Ein <Link href="/minijob" style={{ color: "var(--accent)", textDecoration: "none" }}>Minijob</Link> bis
              556 € monatlich ist für Arbeitnehmer abgabenfrei – Sie erhalten das Bruttogehalt netto ausgezahlt.
              Allerdings werden die Einkünfte bei der Steuerveranlagung berücksichtigt und können Ihren persönlichen
              Steuersatz auf andere Einkünfte erhöhen.
            </p>
          </div>
          <div className="faq-item">
            <h3>Wie berechnet sich das Elterngeld?</h3>
            <p>
              Das <Link href="/elterngeld" style={{ color: "var(--accent)", textDecoration: "none" }}>Elterngeld</Link> beträgt
              65–67 % des durchschnittlichen Nettoeinkommens der letzten 12 Monate vor der Geburt,
              mindestens 300 € und maximal 1.800 € pro Monat. Unser Elterngeld Rechner zeigt Ihnen
              auch den Unterschied zwischen Basiselterngeld (14 Monate) und ElterngeldPlus (28 Monate).
            </p>
          </div>
          <div className="faq-item">
            <h3>Wie viel Weihnachtsgeld bekomme ich netto?</h3>
            <p>
              <Link href="/weihnachtsgeld" style={{ color: "var(--accent)", textDecoration: "none" }}>Weihnachtsgeld</Link> wird
              wie reguläres Gehalt mit Lohnsteuer und allen Sozialabgaben belastet. Bei 2.000 € brutto
              und Steuerklasse 1 bleiben ca. 1.120 € netto. Berechnen Sie Ihr exaktes Netto-Weihnachtsgeld
              mit unserem Rechner – kostenlos und sofort.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
