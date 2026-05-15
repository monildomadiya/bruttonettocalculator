"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { fmtEUR } from "@/lib/calc";

export default function UrlaubsgeldPage() {
  const [brutto, setBrutto] = useState<number>(3000);
  const [urlaubsgeld, setUrlaubsgeld] = useState<number>(1500);

  // Einfache Überschlagsrechnung (Lohnsteuer + SV für Sonderzahlungen meist ca. 50% Abzug)
  const gesamtBrutto = brutto + urlaubsgeld;
  const abzugQuote = 0.45; 
  const nettoUrlaubsgeld = urlaubsgeld * (1 - abzugQuote);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
      { "@type": "Question", "name": "Warum bleibt vom Urlaubsgeld so wenig Netto übrig?", "acceptedAnswer": { "@type": "Answer", "text": "Urlaubsgeld ist ein Einmalbezug. Für die Lohnsteuer wird das Einkommen fiktiv auf das Jahr hochgerechnet, wodurch ein wesentlich höherer Steuersatz greift (Steuerprogression)." } },
      { "@type": "Question", "name": "Gibt es einen gesetzlichen Anspruch auf Urlaubsgeld?", "acceptedAnswer": { "@type": "Answer", "text": "Nein. Urlaubsgeld ist eine freiwillige Sonderzahlung des Arbeitgebers. Ein Anspruch entsteht nur durch Arbeitsvertrag, Tarifvertrag oder betriebliche Übung." } }
    ]
      }) }} />
<div className="page-hero">
        <div className="page-wrap">
          <h1>Urlaubsgeldrechner</h1>
          <p>Berechnen Sie das Netto-Urlaubsgeld.</p>
        </div>
      </div>

      <div className="page-wrap">
        <div className="content-area">
          <main>
            <div className="calc-card">
              <div className="calc-card-title">Urlaubsgeld Berechnung</div>
              <div className="calc-panels">
                <div className="calc-inputs">
                  <div className="section-label">Gehaltsdaten</div>
                  <div className="form-row full">
                    <div className="form-field">
                      <label htmlFor="brutto" className="field-label">Reguläres Bruttomonatsgehalt (€)</label>
                      <input type="number" id="brutto" className="form-input"
                        value={brutto} min={0} step={100}
                        onChange={(e) => setBrutto(Math.max(0, parseFloat(e.target.value) || 0))} />
                    </div>
                  </div>
                  <div className="form-row full">
                    <div className="form-field">
                      <label htmlFor="urlaubsgeld" className="field-label">Brutto-Urlaubsgeld (€)</label>
                      <input type="number" id="urlaubsgeld" className="form-input"
                        value={urlaubsgeld} min={0} step={100}
                        onChange={(e) => setUrlaubsgeld(Math.max(0, parseFloat(e.target.value) || 0))} />
                    </div>
                  </div>
                </div>

                <div className="calc-results">
                  <div className="section-label">Zusätzliches Netto</div>
                  <div className="results-content">
                    <div className="result-hero">
                      <div className="result-hero-label">Netto-Urlaubsgeld</div>
                      <div className="result-hero-amount" style={{ color: "var(--accent)" }}>
                        {fmtEUR(nettoUrlaubsgeld)}
                      </div>
                      <div className="result-hero-sub">Bleibt vom Urlaubsgeld übrig</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="seo-section">
              <h2>Urlaubsgeld versteuern</h2>
              <p>Urlaubsgeld ist ein sonstiger Bezug (Sonderzahlung). Es wird auf das Jahreseinkommen hochgerechnet, wodurch sich ein höherer Steuersatz als beim normalen Monatsgehalt ergibt. Man spricht von der Jahrestabelle für die Lohnsteuer.</p>
            </div>
          </main>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
