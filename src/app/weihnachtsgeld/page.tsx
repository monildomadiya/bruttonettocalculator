import React from "react";
import Sidebar from "@/components/Sidebar";
import WeihnachtsgeldClient from "./WeihnachtsgeldClient";
import { YEAR } from "@/lib/seo";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: `Wie wird Weihnachtsgeld ${YEAR} versteuert?`, acceptedAnswer: { "@type": "Answer", text: "Weihnachtsgeld ist eine Sonderzahlung und wird wie reguläres Gehalt versteuert: Lohnsteuer, Soli, ggf. Kirchensteuer sowie alle Sozialabgaben." } },
    { "@type": "Question", name: "Hat jeder Arbeitnehmer Anspruch auf Weihnachtsgeld?", acceptedAnswer: { "@type": "Answer", text: "Nein. Einen gesetzlichen Anspruch gibt es nicht. Er entsteht durch Tarifvertrag, Betriebsvereinbarung, Einzelarbeitsvertrag oder betriebliche Übung (mind. 3 Jahre)." } },
    { "@type": "Question", name: "Wie hoch ist das durchschnittliche Weihnachtsgeld?", acceptedAnswer: { "@type": "Answer", text: "Laut WSI-Tarifarchiv lag das tarifliche Weihnachtsgeld zuletzt bei durchschnittlich 2.630 Euro brutto. Typisch ist ein halbes bis ein volles Monatsgehalt." } },
    { "@type": "Question", name: "Muss ich Weihnachtsgeld zurückzahlen wenn ich kündige?", acceptedAnswer: { "@type": "Answer", text: "Das hängt von der Rückzahlungsklausel im Vertrag ab. Üblich ist eine Rückzahlungspflicht, wenn man bis zum 31. März des Folgejahres kündigt." } },
  ],
};

export default function WeihnachtsgeldPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="page-hero">
        <div className="page-wrap">
          <h1>Weihnachtsgeld Rechner {YEAR} – Netto-Weihnachtsgeld sofort berechnen</h1>
          <p>Wie viel Netto bleibt vom Weihnachtsgeld nach Lohnsteuer und Sozialabgaben? Jetzt für alle Steuerklassen kostenlos berechnen.</p>
        </div>
      </div>

      <div className="page-wrap">
        <div className="content-area">
          <main>
            <WeihnachtsgeldClient />

            <div className="seo-section">
              <h2>Weihnachtsgeld {YEAR}: Steuern, Abzüge & Netto erklärt</h2>
              <p>
                Jedes Jahr fragen sich Millionen Arbeitnehmer: <strong>Wie viel Netto bleibt vom Weihnachtsgeld?</strong>
                Unser <strong>Weihnachtsgeld Rechner {YEAR}</strong> gibt Ihnen die Antwort sofort. Weihnachtsgeld ist eine steuerpflichtige <em>Sonderzahlung</em> und wird wie reguläres Gehalt behandelt.
              </p>

              <h3>Weihnachtsgeld Netto-Tabelle {YEAR} (Steuerklasse I, West)</h3>
              <div className="table-wrap">
                <table className="seo-table">
                  <thead>
                    <tr><th>Brutto</th><th>Lohnsteuer (ca.)</th><th>SV-Abgaben (ca.)</th><th>Netto (ca.)</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>500 €</td><td>~ 65 €</td><td>~ 101 €</td><td>~ 334 €</td></tr>
                    <tr><td>1.000 €</td><td>~ 195 €</td><td>~ 202 €</td><td>~ 603 €</td></tr>
                    <tr><td>2.000 €</td><td>~ 475 €</td><td>~ 404 €</td><td>~ 1.121 €</td></tr>
                    <tr><td>3.000 €</td><td>~ 795 €</td><td>~ 606 €</td><td>~ 1.599 €</td></tr>
                  </tbody>
                </table>
              </div>

              <h3>Weihnachtsgeld nach Steuerklasse</h3>
              <ul>
                <li><strong>Steuerklasse 3:</strong> Geringste Abzüge – das meiste Netto</li>
                <li><strong>Steuerklasse 1 & 4:</strong> Standardabzüge, mittlerer Nettobetrag</li>
                <li><strong>Steuerklasse 5 & 6:</strong> Höchste Abzüge – deutlich weniger Netto</li>
              </ul>

              <h3>Tipp: Fünftelregelung beim Weihnachtsgeld</h3>
              <p>
                Bei hohem Weihnachtsgeld können Sie die <strong>Fünftelregelung</strong> beantragen. Sie verteilt die Sonderzahlung rechnerisch auf fünf Jahre und vermeidet die Steuerprogression – das spart oft mehrere hundert Euro.
              </p>

              <h3>FAQ: Weihnachtsgeld {YEAR}</h3>
              <div className="faq-item">
                <h3>Wann wird Weihnachtsgeld ausgezahlt?</h3>
                <p>Typischerweise mit dem Novembergehalt oder zum 1. Dezember. Der genaue Termin ist im Vertrag oder Tarifvertrag geregelt.</p>
              </div>
              <div className="faq-item">
                <h3>Erhöht Weihnachtsgeld den Rentenanspruch?</h3>
                <p>Ja! Da RV-Beiträge gezahlt werden, erhöht es das beitragspflichtige Jahreseinkommen und damit die Rentenpunkte.</p>
              </div>
              <div className="faq-item">
                <h3>Ist Weihnachtsgeld pfändbar?</h3>
                <p>Ja, beschränkt. Es gilt der normale Pfändungsfreibetrag. Einmalzahlungen werden auf den Monat der Auszahlung angerechnet.</p>
              </div>
            </div>
          </main>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
