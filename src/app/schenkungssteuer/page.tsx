"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { fmtEUR } from "@/lib/calc";

export default function SchenkungssteuerPage() {
  const [wert, setWert] = useState<number>(500000);
  const [freibetrag, setFreibetrag] = useState<number>(400000);

  const zuVersteuern = Math.max(0, wert - freibetrag);
  let steuer = 0;
  
  if (zuVersteuern > 0) {
    if (zuVersteuern <= 75000) steuer = zuVersteuern * 0.07;
    else if (zuVersteuern <= 300000) steuer = zuVersteuern * 0.11;
    else steuer = zuVersteuern * 0.15; // vereinfachte Steuerklasse I
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
      { "@type": "Question", "name": "Wann ist eine Schenkung steuerfrei?", "acceptedAnswer": { "@type": "Answer", "text": "Wenn sie unterhalb der gesetzlichen Freibeträge liegt: 500.000 € für Ehepartner, 400.000 € für Kinder und 200.000 € für Enkel. Dieser Freibetrag erneuert sich alle 10 Jahre." } },
      { "@type": "Question", "name": "Was ist der Unterschied zwischen Erbschafts- und Schenkungssteuer?", "acceptedAnswer": { "@type": "Answer", "text": "Es gibt keinen! Die Freibeträge und Steuersätze im Erbschaftsteuer- und Schenkungsteuergesetz (ErbStG) sind identisch. Eine Schenkung ist quasi ein vorweggenommenes Erbe." } }
    ]
      }) }} />
<div className="page-hero">
        <div className="page-wrap">
          <h1>Schenkungssteuer Rechner</h1>
          <p>Berechnen Sie die Steuerlast bei Schenkungen.</p>
        </div>
      </div>

      <div className="page-wrap">
        <div className="content-area">
          <main>
            <div className="calc-card">
              <div className="calc-card-title">Schenkungssteuer Berechnung</div>
              <div className="calc-panels">
                <div className="calc-inputs">
                  <div className="section-label">Vermögenswert</div>
                  <div className="form-row full">
                    <div className="form-field">
                      <label htmlFor="wert" className="field-label">Wert der Schenkung (€)</label>
                      <input type="number" id="wert" className="form-input"
                        value={wert} min={0} step={10000}
                        onChange={(e) => setWert(Math.max(0, parseFloat(e.target.value) || 0))} />
                    </div>
                  </div>
                  <div className="form-row full">
                    <div className="form-field">
                      <label htmlFor="freibetrag" className="field-label">Freibetrag (€)</label>
                      <select id="freibetrag" className="form-select"
                        value={freibetrag} onChange={(e) => setFreibetrag(parseFloat(e.target.value))}>
                        <option value="500000">500.000 € (Ehegatten)</option>
                        <option value="400000">400.000 € (Kinder)</option>
                        <option value="200000">200.000 € (Enkel)</option>
                        <option value="20000">20.000 € (Sonstige)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="calc-results">
                  <div className="section-label">Steuerlast</div>
                  <div className="results-content">
                    <div className="result-hero">
                      <div className="result-hero-label">Fällige Steuer</div>
                      <div className="result-hero-amount" style={{ color: "var(--accent)" }}>
                        {fmtEUR(steuer)}
                      </div>
                      <div className="result-hero-sub">Schätzwert für Steuerklasse I</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="seo-section">
              <h2>Freibeträge bei Schenkungen</h2>
              <p>Der Freibetrag richtet sich nach dem Verwandtschaftsgrad. Ehepartner haben einen Freibetrag von 500.000 €, Kinder von 400.000 €. Dieser Freibetrag kann alle 10 Jahre erneut in Anspruch genommen werden.</p>
            </div>
          </main>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
