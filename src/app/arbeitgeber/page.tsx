"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { fmtEUR } from "@/lib/calc";

export default function ArbeitgeberPage() {
  const [brutto, setBrutto] = useState<number>(4000);

  const agKosten = brutto * 0.207; // ca. 20,7% AG-Anteil an SV
  const totalKosten = brutto + agKosten;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
      { "@type": "Question", "name": "Was kosten Mitarbeiter den Arbeitgeber wirklich?", "acceptedAnswer": { "@type": "Answer", "text": "Arbeitgeber zahlen zusätzlich zum Bruttolohn etwa 20,7% an Lohnnebenkosten (Sozialversicherungsbeiträge und Umlagen)." } },
      { "@type": "Question", "name": "Was gehört zu den Arbeitgeberanteilen?", "acceptedAnswer": { "@type": "Answer", "text": "Kranken-, Renten-, Arbeitslosen- und Pflegeversicherung werden paritätisch geteilt. Zudem trägt der AG die Umlagen U1, U2 und U3 allein." } }
    ]
      }) }} />
<div className="page-hero">
        <div className="page-wrap">
          <h1>Arbeitgeberrechner</h1>
          <p>Berechnen Sie die Lohnkosten und Nebenkosten für Arbeitgeber.</p>
        </div>
      </div>

      <div className="page-wrap">
        <div className="content-area">
          <main>
            <div className="calc-card">
              <div className="calc-card-title">Arbeitgeberbelastung</div>
              <div className="calc-panels">
                <div className="calc-inputs">
                  <div className="section-label">Mitarbeiter Gehalt</div>
                  <div className="form-row full">
                    <div className="form-field">
                      <label htmlFor="brutto" className="field-label">Bruttogehalt Mitarbeiter (€/Monat)</label>
                      <input type="number" id="brutto" className="form-input"
                        value={brutto} min={0} step={100}
                        onChange={(e) => setBrutto(Math.max(0, parseFloat(e.target.value) || 0))} />
                    </div>
                  </div>
                </div>

                <div className="calc-results">
                  <div className="section-label">Gesamtkosten</div>
                  <div className="results-content">
                    <div className="result-hero">
                      <div className="result-hero-label">Gesamte Lohnkosten</div>
                      <div className="result-hero-amount" style={{ color: "var(--accent)" }}>
                        {fmtEUR(totalKosten)}
                      </div>
                      <div className="result-hero-sub">Brutto inkl. AG-Anteile</div>
                    </div>
                    
                    <table className="breakdown-table">
                        <tbody>
                          <tr>
                            <td className="td-label">Bruttogehalt</td>
                            <td className="td-value-neutral">{fmtEUR(brutto)}</td>
                          </tr>
                          <tr>
                            <td className="td-label">Arbeitgeberanteile (SV, ca. 20.7%)</td>
                            <td className="td-value-neg">+ {fmtEUR(agKosten)}</td>
                          </tr>
                          <tr className="row-total">
                            <td>Belastung Arbeitgeber</td>
                            <td className="td-value-pos">{fmtEUR(totalKosten)}</td>
                          </tr>
                        </tbody>
                      </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="seo-section">
              <h2>Lohnnebenkosten 2024</h2>
              <p>Zusätzlich zum Bruttogehalt trägt der Arbeitgeber rund die Hälfte der Sozialabgaben. Diese umfassen Renten-, Kranken-, Arbeitslosen- und Pflegeversicherung sowie verschiedene Umlagen.</p>
            </div>
          </main>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
