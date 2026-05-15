"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { fmtEUR } from "@/lib/calc";

export default function PendlerpauschalePage() {
  const [km, setKm] = useState<number>(30);
  const [tage, setTage] = useState<number>(220);

  // Berechnung: 0,30 EUR für die ersten 20 km, 0,38 EUR ab dem 21. km
  const pauschale = (Math.min(km, 20) * 0.3 + Math.max(0, km - 20) * 0.38) * tage;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
      { "@type": "Question", "name": "Wie hoch ist die Pendlerpauschale 2024?", "acceptedAnswer": { "@type": "Answer", "text": "Für die ersten 20 km gibt es 30 Cent. Ab dem 21. Kilometer steigt die Entfernungspauschale auf 38 Cent pro Kilometer." } },
      { "@type": "Question", "name": "Werden Hin- und Rückfahrt berechnet?", "acceptedAnswer": { "@type": "Answer", "text": "Nein, die Pendlerpauschale gilt als Entfernungspauschale und wird nur für die einfache Wegstrecke (Hinweg) einmal pro Arbeitstag gewährt." } }
    ]
      }) }} />
<div className="page-hero">
        <div className="page-wrap">
          <h1>Pendlerpauschale Rechner</h1>
          <p>Ermitteln Sie Ihre steuerliche Ersparnis durch Fahrtkosten.</p>
        </div>
      </div>

      <div className="page-wrap">
        <div className="content-area">
          <main>
            <div className="calc-card">
              <div className="calc-card-title">Pendlerpauschale Berechnung</div>
              <div className="calc-panels">
                <div className="calc-inputs">
                  <div className="section-label">Fahrtstrecke</div>
                  <div className="form-row full">
                    <div className="form-field">
                      <label htmlFor="km" className="field-label">Einfache Strecke zur Arbeit (km)</label>
                      <input type="number" id="km" className="form-input"
                        value={km} min={0} step={1}
                        onChange={(e) => setKm(Math.max(0, parseFloat(e.target.value) || 0))} />
                    </div>
                  </div>
                  <div className="form-row full">
                    <div className="form-field">
                      <label htmlFor="tage" className="field-label">Arbeitstage pro Jahr</label>
                      <input type="number" id="tage" className="form-input"
                        value={tage} min={0} max={365} step={1}
                        onChange={(e) => setTage(Math.max(0, parseFloat(e.target.value) || 0))} />
                    </div>
                  </div>
                </div>

                <div className="calc-results">
                  <div className="section-label">Werbungskosten</div>
                  <div className="results-content">
                    <div className="result-hero">
                      <div className="result-hero-label">Entfernungspauschale</div>
                      <div className="result-hero-amount" style={{ color: "var(--accent)" }}>
                        {fmtEUR(pauschale)}
                      </div>
                      <div className="result-hero-sub">Absetzbarer Betrag / Jahr</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="seo-section">
              <h2>Wie wird die Pendlerpauschale berechnet?</h2>
              <p>Für die ersten 20 km der einfachen Wegstrecke zur ersten Tätigkeitsstätte erhalten Sie 30 Cent pro Kilometer. Ab dem 21. Kilometer erhöht sich die Pauschale auf 38 Cent.</p>
            </div>
          </main>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
