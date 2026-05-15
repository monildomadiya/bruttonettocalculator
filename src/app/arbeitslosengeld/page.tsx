"use client";

import React, { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import { fmtEUR, STEUERKLASSEN } from "@/lib/calc";

export default function ArbeitslosengeldPage() {
  const [brutto12, setBrutto12] = useState<number>(3600);
  const [steuerklasse, setSteuerklasse] = useState<number>(1);
  const [hasKinder, setHasKinder] = useState<boolean>(false);

  const res = useMemo(() => {
    const b = Number(brutto12) || 0;
    if (b <= 0) return null;

    // Beitragsbemessungsgrenze Arbeitslosenversicherung 2024 (7550 € / Monat West)
    const bbg = 7550;
    const bruttoGedeckelt = Math.min(b, bbg);

    // Pauschalierter Abzug von ca. 21% für Sozialversicherungen und Steuern
    // In der offiziellen Berechnung wird das tägliche Leistungsentgelt nach Steuerklasse ermittelt
    let pauschalAbzug = 0.21;
    if (steuerklasse === 3) pauschalAbzug = 0.14;
    if (steuerklasse === 5 || steuerklasse === 6) pauschalAbzug = 0.28;

    const nettoPauschal = bruttoGedeckelt * (1 - pauschalAbzug);

    // 60% des Nettoentgelts für Arbeitslose ohne Kinder, 67% mit Kindern
    const faktor = hasKinder ? 0.67 : 0.60;
    const algMonat = nettoPauschal * faktor;
    const algTag = algMonat / 30; // Die Agentur für Arbeit rechnet pauschal mit 30 Tagen/Monat

    return { algMonat, algTag, nettoPauschal, bruttoGedeckelt };
  }, [brutto12, steuerklasse, hasKinder]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wie viel Arbeitslosengeld I (ALG 1) bekommt man?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Das Arbeitslosengeld I beträgt 60% des pauschalierten Nettoentgelts der letzten 12 Monate. Haben Sie oder Ihr Ehepartner mindestens ein Kind mit Freibetrag auf der Lohnsteuerkarte, erhöht sich der Leistungssatz auf 67%."
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="page-hero">
        <div className="page-wrap">
          <h1>Arbeitslosengeld I Rechner</h1>
          <p>Berechnen Sie Ihren voraussichtlichen Anspruch auf Arbeitslosengeld (ALG I).</p>
        </div>
      </div>

      <div className="page-wrap">
        <div className="content-area">
          <main>
            <div className="calc-card">
              <div className="calc-card-title">Arbeitslosengeld I (ALG 1) Berechnung</div>
              <div className="calc-panels">
                
                {/* Inputs */}
                <div className="calc-inputs">
                  <div className="section-label">Bisheriges Einkommen</div>

                  <div className="form-row full">
                    <div className="form-field">
                      <label htmlFor="brutto12" className="field-label">Ø Brutto der letzten 12 Monate (€/Monat)</label>
                      <input type="number" id="brutto12" className="form-input"
                        value={brutto12} min={0} step={100}
                        onChange={(e) => setBrutto12(Math.max(0, parseFloat(e.target.value) || 0))} />
                    </div>
                  </div>

                  <div className="form-row full">
                    <div className="form-field">
                      <label htmlFor="steuerklasse" className="field-label">Steuerklasse (zuletzt überwiegend)</label>
                      <select id="steuerklasse" className="form-select"
                        value={steuerklasse} onChange={(e) => setSteuerklasse(parseInt(e.target.value))}>
                        {STEUERKLASSEN.map((st) => (
                          <option key={st.value} value={st.value}>{st.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <hr className="field-divider" />

                  <div className="toggle-field">
                    <span className="field-label">Kinder im Haushalt (erhöhter Leistungssatz)</span>
                    <label className="toggle-switch">
                      <input type="checkbox" checked={hasKinder}
                        onChange={(e) => setHasKinder(e.target.checked)} />
                      <span className="toggle-track" />
                    </label>
                  </div>
                </div>

                {/* Results */}
                <div className="calc-results">
                  <div className="section-label">Voraussichtliches ALG I</div>

                  {res ? (
                    <div className="results-content">
                      <div className="result-hero">
                        <div className="result-hero-label">Arbeitslosengeld</div>
                        <div className="result-hero-amount" style={{ color: "var(--accent)" }}>
                          {fmtEUR(res.algMonat)}
                        </div>
                        <div className="result-hero-sub">pro Monat (steuerfrei)</div>
                      </div>

                      <table className="breakdown-table">
                        <tbody>
                          <tr>
                            <td className="td-label">Berücksichtigtes Brutto (gedeckelt)</td>
                            <td className="td-value-neutral">{fmtEUR(res.bruttoGedeckelt)}</td>
                          </tr>
                          <tr>
                            <td className="td-label">Leistungsentgelt (Netto pauschal)</td>
                            <td className="td-value-neutral">{fmtEUR(res.nettoPauschal)}</td>
                          </tr>
                          <tr className="row-total">
                            <td>Täglicher Leistungssatz</td>
                            <td className="td-value-pos">{fmtEUR(res.algTag)} / Tag</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>

              </div>
            </div>

            {/* SEO Article */}
            <div className="seo-section">
              <h2>Anspruchsvoraussetzungen für Arbeitslosengeld I</h2>
              <p>
                Um Anspruch auf Arbeitslosengeld I zu haben, müssen Sie in den letzten 30 Monaten vor der Arbeitslosengeldmeldung 
                mindestens 12 Monate in einem versicherungspflichtigen Beschäftigungsverhältnis gestanden haben (Anwartschaftszeit). 
                Zudem müssen Sie sich bei der Agentur für Arbeit persönlich arbeitslos gemeldet haben und der Arbeitsvermittlung 
                zur Verfügung stehen.
              </p>
            </div>
          </main>

          <Sidebar />
        </div>
      </div>
    </>
  );
}
