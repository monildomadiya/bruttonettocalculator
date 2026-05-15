"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function RentenpunktePage() {
  const [brutto, setBrutto] = useState<number>(45000);

  // Durchschnittsentgelt 2024: 45.358 Euro
  const durch = 45358;
  const punkte = brutto / durch;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
      { "@type": "Question", "name": "Wie berechnet man Rentenpunkte?", "acceptedAnswer": { "@type": "Answer", "text": "Ein Rentenpunkt entspricht dem Durchschnittsverdienst aller Versicherten in einem Jahr. Teilen Sie Ihr Jahresbrutto durch dieses Durchschnittsentgelt (z.B. 45.358 € in 2024), um Ihre Punkte zu erhalten." } },
      { "@type": "Question", "name": "Wie viel ist ein Rentenpunkt 2024 wert?", "acceptedAnswer": { "@type": "Answer", "text": "Seit Juli 2023 ist der Rentenwert in West und Ost angeglichen und beträgt bundeseinheitlich 37,60 Euro pro Monat." } }
    ]
      }) }} />
<div className="page-hero">
        <div className="page-wrap">
          <h1>Rentenpunkte Rechner</h1>
          <p>Ermitteln Sie Ihre jährlichen Entgeltpunkte.</p>
        </div>
      </div>

      <div className="page-wrap">
        <div className="content-area">
          <main>
            <div className="calc-card">
              <div className="calc-card-title">Rentenpunkte Rechner</div>
              <div className="calc-panels">
                <div className="calc-inputs">
                  <div className="section-label">Jahresgehalt</div>
                  <div className="form-row full">
                    <div className="form-field">
                      <label htmlFor="brutto" className="field-label">Jahresbrutto (€)</label>
                      <input type="number" id="brutto" className="form-input"
                        value={brutto} min={0} step={1000}
                        onChange={(e) => setBrutto(Math.max(0, parseFloat(e.target.value) || 0))} />
                    </div>
                  </div>
                  <hr className="field-divider" />
                  <div style={{color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.6}}>
                    Durchschnittsentgelt in Deutschland für das Jahr 2024 (vorläufig): 45.358 €
                  </div>
                </div>

                <div className="calc-results">
                  <div className="section-label">Ergebnis</div>
                  <div className="results-content">
                    <div className="result-hero">
                      <div className="result-hero-label">Entgeltpunkte</div>
                      <div className="result-hero-amount" style={{ color: "var(--accent)" }}>
                        {punkte.toFixed(4)}
                      </div>
                      <div className="result-hero-sub">Punkte / Jahr</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="seo-section">
              <h2>Wie berechnen sich Rentenpunkte?</h2>
              <p>Rentenpunkte (Entgeltpunkte) erhalten Sie, wenn Ihr Gehalt dem deutschen Durchschnittsgehalt entspricht (genau 1,0 Punkt). Liegt Ihr Gehalt darüber oder darunter, wird der Wert entsprechend anteilig berechnet.</p>
            </div>
          </main>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
