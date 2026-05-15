"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { fmtEUR } from "@/lib/calc";

export default function RentePage() {
  const [brutto, setBrutto] = useState<number>(4000);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
      { "@type": "Question", "name": "Wie hoch wird meine Rente sein?", "acceptedAnswer": { "@type": "Answer", "text": "Die Rente berechnet sich aus den gesammelten Entgeltpunkten, dem Zugangsfaktor, dem aktuellen Rentenwert und dem Rentenartfaktor." } },
      { "@type": "Question", "name": "Wann kann ich abschlagsfrei in Rente gehen?", "acceptedAnswer": { "@type": "Answer", "text": "Die Regelaltersgrenze wird schrittweise auf 67 Jahre angehoben. Wer 45 Jahre Beiträge eingezahlt hat, kann früher abschlagsfrei in Rente gehen (Rente mit 63/65)." } },
      { "@type": "Question", "name": "Was ist die Rentenlücke?", "acceptedAnswer": { "@type": "Answer", "text": "Die Rentenlücke ist die Differenz zwischen Ihrem letzten Nettoeinkommen und der voraussichtlichen Nettorente. Sie zeigt, wie viel private Vorsorge nötig ist." } }
    ]
      }) }} />
<div className="page-hero">
        <div className="page-wrap">
          <h1>Rentenrechner</h1>
          <p>Berechnen Sie Ihre voraussichtliche gesetzliche Rente.</p>
        </div>
      </div>

      <div className="page-wrap">
        <div className="content-area">
          <main>
            <div className="calc-card">
              <div className="calc-card-title">Rentenrechner Berechnung</div>
              <div className="calc-panels">
                <div className="calc-inputs">
                  <div className="section-label">Ihre Daten</div>
                  <div className="form-row full">
                    <div className="form-field">
                      <label htmlFor="brutto" className="field-label">Aktuelles Monatsbrutto (€)</label>
                      <input type="number" id="brutto" className="form-input"
                        value={brutto} min={0} step={100}
                        onChange={(e) => setBrutto(Math.max(0, parseFloat(e.target.value) || 0))} />
                    </div>
                  </div>
                  <hr className="field-divider" />
                  <div style={{color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.6}}>
                    Dies ist ein Basis-Richtwert. Die tatsächliche Rente hängt von Ihren exakten Entgeltpunkten und Beitragsjahren ab.
                  </div>
                </div>

                <div className="calc-results">
                  <div className="section-label">Ergebnis</div>
                  <div className="results-content">
                    <div className="result-hero">
                      <div className="result-hero-label">Voraussichtliche Rente</div>
                      <div className="result-hero-amount" style={{ color: "var(--accent)" }}>
                        {fmtEUR(brutto * 0.48)}
                      </div>
                      <div className="result-hero-sub">Brutto-Rente (geschätzt)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="seo-section">
              <h2>Über den Rentenrechner</h2>
              <p>Nutzen Sie den Rentenrechner, um Ihre gesetzliche Rente nach aktuellem Rentenwert in Deutschland zu schätzen.</p>
            </div>
          </main>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
