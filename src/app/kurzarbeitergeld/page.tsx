"use client";

import React, { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import { fmtEUR } from "@/lib/calc";

export default function KurzarbeitergeldPage() {
  const [sollBrutto, setSollBrutto] = useState<number>(3500);
  const [istBrutto, setIstBrutto] = useState<number>(1500);
  const [hasKinder, setHasKinder] = useState<boolean>(true);

  const res = useMemo(() => {
    const soll = Number(sollBrutto) || 0;
    const ist = Number(istBrutto) || 0;
    if (soll <= 0 || ist >= soll) return null;

    // Fiktive pauschalierte Netto-Berechnung (ca. 20% pauschaler Abzug für SV + Lohnsteuer)
    // In der echten Arbeitsagentur-Tabelle wird das genaue pauschalierte Netto abgelesen
    const sollNettoPauschal = soll * 0.75;
    const istNettoPauschal = ist * 0.75;
    const nettoDifferenz = Math.max(0, sollNettoPauschal - istNettoPauschal);

    // Leistungssatz: 67% mit Kindern, 60% ohne Kinder
    const faktor = hasKinder ? 0.67 : 0.60;
    const kug = nettoDifferenz * faktor;
    const gesamtNetto = (ist * 0.75) + kug; // Ist-Netto + KUG

    return {
      sollNettoPauschal,
      istNettoPauschal,
      nettoDifferenz,
      kug,
      gesamtNetto,
      ausfallquote: ((soll - ist) / soll) * 100,
    };
  }, [sollBrutto, istBrutto, hasKinder]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wie hoch ist das Kurzarbeitergeld in Deutschland?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Beschäftigte in Kurzarbeit erhalten grundsätzlich 60% des ausgefallenen pauschalierten Nettoentgelts. Lebt mindestens ein Kind mit im Haushalt, erhöht sich das Kurzarbeitergeld auf 67%."
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="page-hero">
        <div className="page-wrap">
          <h1>Kurzarbeitergeld Rechner</h1>
          <p>Berechnen Sie Ihren voraussichtlichen Anspruch auf Kurzarbeitergeld (KUG).</p>
        </div>
      </div>

      <div className="page-wrap">
        <div className="content-area">
          <main>
            <div className="calc-card">
              <div className="calc-card-title">Kurzarbeitergeld (KUG) Berechnung</div>
              <div className="calc-panels">
                
                {/* Inputs */}
                <div className="calc-inputs">
                  <div className="section-label">Gehaltsausfall</div>

                  <div className="form-row full">
                    <div className="form-field">
                      <label htmlFor="sollBrutto" className="field-label">Reguläres Brutto (Soll-Entgelt in €)</label>
                      <input type="number" id="sollBrutto" className="form-input"
                        value={sollBrutto} min={0} step={100}
                        onChange={(e) => setSollBrutto(Math.max(0, parseFloat(e.target.value) || 0))} />
                    </div>
                  </div>

                  <div className="form-row full">
                    <div className="form-field">
                      <label htmlFor="istBrutto" className="field-label">Kurzarbeits-Brutto (Ist-Entgelt in €)</label>
                      <input type="number" id="istBrutto" className="form-input"
                        value={istBrutto} min={0} step={100}
                        onChange={(e) => setIstBrutto(Math.max(0, parseFloat(e.target.value) || 0))} />
                    </div>
                  </div>

                  <hr className="field-divider" />

                  <div className="toggle-field">
                    <span className="field-label">Kinder im Haushalt (0,5 oder mehr Freibeträge)</span>
                    <label className="toggle-switch">
                      <input type="checkbox" checked={hasKinder}
                        onChange={(e) => setHasKinder(e.target.checked)} />
                      <span className="toggle-track" />
                    </label>
                  </div>
                </div>

                {/* Results */}
                <div className="calc-results">
                  <div className="section-label">Ihr Anspruch</div>

                  {res ? (
                    <div className="results-content">
                      <div className="result-hero">
                        <div className="result-hero-label">Kurzarbeitergeld</div>
                        <div className="result-hero-amount" style={{ color: "var(--accent)" }}>
                          {fmtEUR(res.kug)}
                        </div>
                        <div className="result-hero-sub">steuerfreie Auszahlung</div>
                      </div>

                      <table className="breakdown-table">
                        <tbody>
                          <tr>
                            <td className="td-label">Arbeitsausfall</td>
                            <td className="td-value-neutral">{res.ausfallquote.toFixed(0)} %</td>
                          </tr>
                          <tr>
                            <td className="td-label">Pauschaliertes Netto (Soll)</td>
                            <td className="td-value-neutral">{fmtEUR(res.sollNettoPauschal)}</td>
                          </tr>
                          <tr>
                            <td className="td-label">Pauschaliertes Netto (Ist)</td>
                            <td className="td-value-neutral">{fmtEUR(res.istNettoPauschal)}</td>
                          </tr>
                          <tr className="row-total">
                            <td>Verfügbares Gesamt-Netto</td>
                            <td className="td-value-pos">{fmtEUR(res.gesamtNetto)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="results-empty" style={{ padding: "20px", textAlign: "center", fontSize: 13, color: "var(--text-muted)" }}>
                      Das Ist-Entgelt muss geringer sein als das Soll-Entgelt, um Kurzarbeitergeld zu berechnen.
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* SEO Article */}
            <div className="seo-section">
              <h2>Progressionsvorbehalt beachten</h2>
              <p>
                Das ausgezahlte <strong>Kurzarbeitergeld</strong> ist grundsätzlich steuerfrei. Es unterliegt jedoch dem sogenannten 
                Progressionsvorbehalt. Das bedeutet, dass das Kurzarbeitergeld bei der Ermittlung des Steuersatzes für Ihr übriges, 
                regulär versteuertes Einkommen mit herangezogen wird. Arbeitnehmer, die mehr als 410 € Kurzarbeitergeld im Kalenderjahr erhalten, 
                sind daher gesetzlich zur Abgabe einer Einkommensteuererklärung verpflichtet.
              </p>
            </div>
          </main>

          <Sidebar />
        </div>
      </div>
    </>
  );
}
