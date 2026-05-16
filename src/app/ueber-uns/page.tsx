import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { SITE_URL, SITE_NAME, YEAR } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Über uns | ${SITE_NAME} – Präzise Gehaltsrechner für Deutschland`,
  description:
    `Erfahren Sie mehr über ${SITE_NAME} – Deutschlands präzise Online-Plattform für Brutto-Netto-Berechnungen, Lohnsteuer und Sozialabgaben. Offizielle BMF-Formeln ${YEAR}.`,
  alternates: { canonical: "/ueber-uns" },
  openGraph: {
    title: `Über uns | ${SITE_NAME}`,
    description: `Wer steckt hinter ${SITE_NAME}? Unsere Mission, Methodik und Werte für präzise Gehaltsrechner.`,
    url: `${SITE_URL}/ueber-uns`,
    locale: "de_DE",
    type: "website",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "bruttonettocalculator Team",
  url: SITE_URL,
  jobTitle: "Finanz- und Steuerrechner-Entwickler",
  description: `Entwickler von präzisen Brutto-Netto- und Steuerrechnern für Deutschland, basierend auf offiziellen BMF-Formeln.`,
  knowsAbout: [
    "Lohnsteuer Deutschland",
    "Brutto-Netto-Berechnung",
    "Sozialversicherungsbeiträge",
    "Steuerklassen",
    "Elterngeld",
    "Rentenversicherung",
  ],
  worksFor: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "bruttonettocalculator", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Über uns", item: `${SITE_URL}/ueber-uns` },
  ],
};

export default function UeberUnsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="page-hero">
        <div className="page-wrap">
          <h1>Über uns – bruttonettocalculator.com</h1>
          <p>Wer steckt hinter dem präzisen Gehaltsrechner für Deutschland?</p>
        </div>
      </div>

      <div className="page-wrap">
        <div className="content-area">
          <main>
            <div className="seo-section">

              <section>
                <h2>Unsere Mission</h2>
                <p>
                  <strong>bruttonettocalculator.com</strong> wurde mit einem einzigen Ziel gegründet: Deutschen Arbeitnehmerinnen
                  und Arbeitnehmern ein zuverlässiges, schnelles und komplett kostenloses Werkzeug zur Hand zu geben,
                  um ihr tatsächliches Nettoeinkommen zu berechnen – ohne Anmeldung, ohne versteckte Kosten, ohne Werbetricks.
                </p>
                <p>
                  Das deutsche Lohnsteuersystem gehört zu den komplexesten der Welt. Steuerklassen,
                  Beitragsbemessungsgrenzen, Solidaritätszuschlag, Kirchensteuer, PKV-Beiträge –
                  für die meisten Menschen ist es nahezu unmöglich, ihr genaues Nettogehalt ohne Hilfsmittel zu ermitteln.
                  Genau hier setzen wir an.
                </p>
              </section>

              <section>
                <h2>Unsere Expertise & Methodik</h2>
                <p>
                  Alle Berechnungsformeln auf dieser Plattform basieren auf den aktuellen, offiziellen Quellen des
                  deutschen Steuer- und Sozialversicherungsrechts:
                </p>
                <ul>
                  <li><strong>Bundesministerium der Finanzen (BMF)</strong> – Lohnsteuertabellen und Programmablaufpläne</li>
                  <li><strong>Deutsche Rentenversicherung Bund</strong> – Beitragssätze und Beitragsbemessungsgrenzen</li>
                  <li><strong>GKV-Spitzenverband</strong> – Kassenzusatzbeiträge und Krankenversicherungsgrenzen</li>
                  <li><strong>Bundesagentur für Arbeit (BA)</strong> – Kurzarbeitergeld und ALG I Berechnungsformeln</li>
                  <li><strong>Bundeselterngeld- und Elternzeitgesetz (BEEG)</strong> – Elterngeld Ersatzraten</li>
                </ul>
                <p>
                  Wir überprüfen und aktualisieren alle Rechner jährlich zu Beginn jedes Steuerjahres sowie
                  bei unterjährigen Gesetzesänderungen (z.B. Mindestlohnanpassungen, Beitragssatzänderungen).
                </p>

                <div style={{ background: "var(--bg-result)", borderLeft: "3px solid var(--accent)", padding: "16px", margin: "16px 0" }}>
                  <strong>Wichtiger Hinweis:</strong> Die Ergebnisse unserer Rechner dienen der Orientierung und
                  ersetzen keine individuelle Steuerberatung. Für verbindliche Auskünfte wenden Sie sich bitte
                  an einen zugelassenen Steuerberater oder Lohnbuchhalter.
                </div>
              </section>

              <section>
                <h2>Was wir anbieten – {YEAR}</h2>
                <p>
                  Unsere Plattform umfasst <strong>15 kostenlose Finanz- und Gehaltsrechner</strong>,
                  die speziell auf das deutsche Steuer- und Sozialversicherungsrecht zugeschnitten sind:
                </p>
                <div className="table-wrap">
                  <table className="seo-table">
                    <thead>
                      <tr><th>Rechner</th><th>Zweck</th><th>Zielgruppe</th></tr>
                    </thead>
                    <tbody>
                      <tr><td><Link href="/brutto-netto-rechner" style={{ color: "var(--accent)", textDecoration: "none" }}>Brutto-Netto-Rechner</Link></td><td>Nettogehalt aus Brutto berechnen</td><td>Alle Arbeitnehmer</td></tr>
                      <tr><td><Link href="/netto-brutto" style={{ color: "var(--accent)", textDecoration: "none" }}>Netto-Brutto-Rechner</Link></td><td>Notwendiges Brutto aus Wunsch-Netto</td><td>Gehaltsverhandlung</td></tr>
                      <tr><td><Link href="/minijob" style={{ color: "var(--accent)", textDecoration: "none" }}>Minijob Rechner</Link></td><td>556-€-Grenze & Arbeitgeberbeiträge</td><td>Minijobber & Arbeitgeber</td></tr>
                      <tr><td><Link href="/elterngeld" style={{ color: "var(--accent)", textDecoration: "none" }}>Elterngeld Rechner</Link></td><td>Basis-Elterngeld & ElterngeldPlus</td><td>Werdende Eltern</td></tr>
                      <tr><td><Link href="/weihnachtsgeld" style={{ color: "var(--accent)", textDecoration: "none" }}>Weihnachtsgeld Rechner</Link></td><td>Netto vom Weihnachtsgeld</td><td>Arbeitnehmer</td></tr>
                      <tr><td><Link href="/rente" style={{ color: "var(--accent)", textDecoration: "none" }}>Rentenrechner</Link></td><td>Voraussichtliche Altersrente</td><td>Alle Beitragszahler</td></tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  Alle weiteren Rechner finden Sie auf unserer <Link href="/" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>Startseite</Link>.
                </p>
              </section>

              <section>
                <h2>Unsere Werte</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginTop: "16px" }}>
                  {[
                    { title: "🔓 Kostenlos & offen", text: "Alle Rechner sind dauerhaft kostenlos nutzbar. Keine Registrierung, kein Abo, keine versteckten Kosten." },
                    { title: "🔒 Datenschutz first", text: "Wir speichern keine persönlichen Eingabedaten. Alle Berechnungen erfolgen lokal im Browser des Nutzers." },
                    { title: "⚡ Geschwindigkeit", text: "Ergebnisse in Echtzeit – ohne Ladezeiten, ohne Wartezeiten. Sofortige Berechnung bei jeder Eingabe." },
                    { title: "🎯 Präzision", text: `Wir verwenden dieselben Programmablaufpläne des BMF, die auch das Finanzamt nutzt – für maximale Genauigkeit ${YEAR}.` },
                  ].map((item) => (
                    <div key={item.title} style={{ background: "var(--bg-result)", border: "1px solid var(--border)", padding: "20px" }}>
                      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-heading)", margin: "0 0 8px 0" }}>{item.title}</h3>
                      <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0, lineHeight: "1.65" }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2>Kontakt & Feedback</h2>
                <p>
                  Haben Sie Fragen, Feedback oder Hinweise auf Fehler in unseren Berechnungen? Wir freuen uns
                  über Ihre Nachricht – insbesondere wenn Ihnen Abweichungen von der offiziellen Lohnabrechnung auffallen.
                  Schreiben Sie uns an:{" "}
                  <a href="mailto:kontakt@bruttonettocalculator.com" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
                    kontakt@bruttonettocalculator.com
                  </a>
                </p>
              </section>

            </div>
          </main>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
