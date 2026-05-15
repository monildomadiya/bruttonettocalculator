import React from "react";
import Sidebar from "@/components/Sidebar";
import CalculatorClient from "./CalculatorClient";
import { YEAR, NEXT_YEAR } from "@/lib/seo";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: `Wie berechnet sich das Nettogehalt ${YEAR}?`, acceptedAnswer: { "@type": "Answer", text: "Vom Bruttogehalt werden Lohnsteuer, Solidaritätszuschlag, ggf. Kirchensteuer sowie Kranken-, Renten-, Arbeitslosen- und Pflegeversicherungsbeiträge abgezogen. Der verbleibende Betrag ist das Nettoeinkommen." } },
    { "@type": "Question", name: "Was ist der Unterschied zwischen Brutto und Netto?", acceptedAnswer: { "@type": "Answer", text: "Brutto ist das vereinbarte Gehalt vor allen Abzügen. Netto ist der tatsächlich auf das Konto ausgezahlte Betrag nach Lohnsteuer und Sozialabgaben." } },
    { "@type": "Question", name: "Wie hoch ist der Grundfreibetrag?", acceptedAnswer: { "@type": "Answer", text: `Der steuerliche Grundfreibetrag beträgt ${YEAR} für Alleinstehende 11.604 Euro und für Verheiratete 23.208 Euro. Einkommen bis zu dieser Höhe bleibt steuerfrei.` } },
    { "@type": "Question", name: "Wie unterscheiden sich die Steuerklassen?", acceptedAnswer: { "@type": "Answer", text: "Steuerklasse 1 gilt für Ledige, Klasse 3 für Verheiratete mit höherem Gehalt und Klasse 6 für Zweitjobs. Die Wahl der Steuerklasse beeinflusst direkt die monatliche Lohnsteuer." } },
    { "@type": "Question", name: `Welche Sozialabgaben fallen ${YEAR} an?`, acceptedAnswer: { "@type": "Answer", text: `In ${YEAR} zahlen Arbeitnehmer Beiträge zur Kranken- (7,3%+), Renten- (9,3%), Arbeitslosen- (1,3%) und Pflegeversicherung (1,7-2,3%). Insgesamt sind das ca. 20-21% des Bruttogehalts.` } },
  ],
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: `Brutto-Netto-Rechner ${YEAR}/${NEXT_YEAR}`,
  url: "https://bruttonettocalculator.com/brutto-netto-rechner",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  inLanguage: "de-DE",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description: `Kostenloser Brutto-Netto-Rechner ${YEAR}. Nettogehalt, Lohnsteuer und Sozialabgaben für alle Steuerklassen in Deutschland sofort berechnen.`,
  areaServed: { "@type": "Country", name: "Germany" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "bruttonettocalculator", item: "https://bruttonettocalculator.com/" },
    { "@type": "ListItem", position: 2, name: `Brutto-Netto-Rechner ${YEAR}`, item: "https://bruttonettocalculator.com/brutto-netto-rechner" },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero — rendered as static HTML on the server */}
      <div className="page-hero">
        <div className="page-wrap">
          <h1>Brutto-Netto-Rechner {YEAR}/{NEXT_YEAR}</h1>
          <p>Nettogehalt für {YEAR}/{NEXT_YEAR} sofort berechnen — alle Steuerklassen, aktuellste Sozialabgaben, kostenlos &amp; ohne Anmeldung.</p>
        </div>
      </div>

      <div className="page-wrap">
        <div className="content-area">
          <main>
            {/* Interactive calculator loads as a client island */}
            <CalculatorClient />

            {/* SEO Article — server-rendered static HTML */}
            <div className="seo-section">
              <h2>Brutto-Netto-Rechner {YEAR}: Berechnen Sie Ihr exaktes Nettogehalt</h2>
              <p>
                Mit unserem <strong>Brutto-Netto-Rechner {YEAR}</strong> erfahren Sie in Sekundenschnelle, wie viel von Ihrem hart erarbeiteten
                Bruttogehalt am Ende des Monats tatsächlich auf Ihrem Bankkonto landet. Die Berechnung des Nettogehalts ist in Deutschland ein
                hochkomplexer Vorgang, der von unzähligen individuellen Faktoren wie Ihrer Steuerklasse, dem Bundesland, dem Alter und der Anzahl
                Ihrer Kinder abhängt. Unser <strong>Gehaltsrechner</strong> greift auf die aktuellsten gesetzlichen Vorgaben, Beitragsbemessungsgrenzen
                und Freibeträge des Jahres {YEAR} (und perspektivisch {NEXT_YEAR}) zurück, um Ihnen eine auf den Cent genaue Auswertung zu liefern.
              </p>

              <h3>Warum ist die Unterscheidung zwischen Brutto und Netto so wichtig?</h3>
              <p>
                In deutschen Arbeitsverträgen und bei Gehaltsverhandlungen wird ausnahmslos das <strong>Bruttogehalt</strong> verhandelt und
                festgehalten. Dieses Gehalt spiegelt jedoch nicht Ihre tatsächliche Kaufkraft wider. Der Arbeitgeber behält automatisch die
                gesetzlich vorgeschriebene Lohnsteuer (inklusive Solidaritätszuschlag und gegebenenfalls Kirchensteuer) sowie Ihren Anteil an den
                Sozialversicherungen ein und führt diese direkt an das Finanzamt beziehungsweise die Krankenkasse ab. Erst nach diesem sogenannten
                &quot;Quellenabzug&quot; entsteht das <strong>Nettogehalt</strong>, welches Ihnen zur freien Verfügung steht.
              </p>

              <h3>Wie setzt sich der Steuerabzug im Jahr {YEAR} zusammen?</h3>
              <p>Der Abzug vom Bruttogehalt erfolgt in zwei großen Blöcken: den Steuern und den Sozialabgaben.</p>
              <ul>
                <li><strong>Lohnsteuer:</strong> Die Höhe der Lohnsteuer richtet sich nach einem progressiven Steuertarif. Der steuerliche Grundfreibetrag liegt {YEAR} bei 11.604 Euro pro Jahr.</li>
                <li><strong>Solidaritätszuschlag (Soli):</strong> Der Soli fällt im Jahr {YEAR} erst an, wenn Ihre jährliche Lohnsteuer einen Freibetrag von 18.130 Euro überschreitet.</li>
                <li><strong>Kirchensteuer:</strong> In Bayern und Baden-Württemberg beträgt diese 8%, in allen anderen deutschen Bundesländern 9% der berechneten Lohnsteuer.</li>
              </ul>

              <h3>Beitragssätze der Sozialversicherung im Detail ({YEAR})</h3>
              <div className="table-wrap">
                <table className="seo-table">
                  <thead>
                    <tr><th>Versicherungsart</th><th>Gesamtbeitrag</th><th>Arbeitnehmeranteil ({YEAR})</th><th>BBG West (p.a.)</th></tr>
                  </thead>
                  <tbody>
                    <tr><td><strong>Krankenversicherung (GKV)</strong></td><td>14,6% + Zusatzbeitrag</td><td>7,3% + ½ individueller Zusatzbeitrag</td><td>62.100 €</td></tr>
                    <tr><td><strong>Rentenversicherung (RV)</strong></td><td>18,6%</td><td>9,3%</td><td>90.600 €</td></tr>
                    <tr><td><strong>Arbeitslosenversicherung (AV)</strong></td><td>2,6%</td><td>1,3%</td><td>90.600 €</td></tr>
                    <tr><td><strong>Pflegeversicherung (PV)</strong></td><td>3,4% - 4,0%</td><td>1,7% - 2,3% (kinderlos, ab 23 J. höher)</td><td>62.100 €</td></tr>
                  </tbody>
                </table>
              </div>

              <h3>Welche Rolle spielt die Steuerklasse bei der Nettoberechnung?</h3>
              <ul>
                <li><strong>Steuerklasse 1:</strong> Für alleinstehende, ledige, geschiedene oder verwitwete Arbeitnehmer ohne Kinder.</li>
                <li><strong>Steuerklasse 2:</strong> Ausschließlich für Alleinerziehende. Beinhaltet den Entlastungsbetrag für Alleinerziehende.</li>
                <li><strong>Steuerklasse 3:</strong> Für Verheiratete, bei denen ein Partner deutlich mehr verdient (Kombination 3 und 5).</li>
                <li><strong>Steuerklasse 4:</strong> Der Standard für Verheiratete. Beide Partner verdienen ähnlich viel.</li>
                <li><strong>Steuerklasse 5:</strong> Das Pendant zu Klasse 3. Geringverdiener in einer Ehe mit extrem hohen monatlichen Abzügen.</li>
                <li><strong>Steuerklasse 6:</strong> Wird zwingend für einen zweiten oder jeden weiteren Nebenjob benötigt.</li>
              </ul>

              <h3>Umfassendes FAQ: Ihre Fragen zum Brutto-Netto-Rechner beantwortet</h3>
              <div className="faq-item">
                <h3>Wie hoch ist das durchschnittliche Nettogehalt in Deutschland?</h3>
                <p>Das Durchschnittsgehalt in Deutschland für Vollzeitbeschäftigte lag zuletzt bei rund 4.100 Euro brutto im Monat. In Steuerklasse 1 entspricht dies einem Nettogehalt von etwa 2.650 Euro.</p>
              </div>
              <div className="faq-item">
                <h3>Was ändert sich {NEXT_YEAR} bei der Gehaltsabrechnung?</h3>
                <p>Der Gesetzgeber passt die Beitragsbemessungsgrenzen und steuerlichen Freibeträge jährlich an die Einkommensentwicklung und Inflation an. Erfahrungsgemäß steigen der Grundfreibetrag sowie die Kinderfreibeträge.</p>
              </div>
              <div className="faq-item">
                <h3>Wird der Firmenwagen auf mein Netto angerechnet?</h3>
                <p>Ja, wenn Sie einen Dienstwagen auch privat nutzen, entsteht Ihnen ein sogenannter geldwerter Vorteil. Berechnen können Sie diesen exakt in unserem <a href="/firmenwagen" style={{color: "var(--accent)", textDecoration: "none"}}>Firmenwagenrechner</a>.</p>
              </div>
              <div className="faq-item">
                <h3>Sollte ich als Student Steuern zahlen?</h3>
                <p>Studenten profitieren wie alle anderen Arbeitnehmer vom steuerlichen Grundfreibetrag (11.604 Euro im Jahr {YEAR}). Bleiben Ihre Einkünfte aus Nebenjobs unter dieser Grenze, fallen keine Einkommensteuern an.</p>
              </div>
            </div>
          </main>

          <Sidebar />
        </div>
      </div>
    </>
  );
}
