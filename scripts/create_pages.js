const fs = require('fs');
const path = require('path');

const basePath = "c:\\Users\\HP\\OneDrive\\Desktop\\BRUTO-NATO\\brutto-netto-rechner\\src\\app";

const pages = {
  "rente": { title: "Rentenrechner", desc: "Berechnen Sie Ihre voraussichtliche gesetzliche Rente." },
  "rentenpunkte": { title: "Rentenpunkte Rechner", desc: "Ermitteln Sie Ihre jährlichen Entgeltpunkte." },
  "arbeitgeber": { title: "Arbeitgeberrechner", desc: "Berechnen Sie die Lohnnebenkosten für Arbeitgeber." },
  "pendlerpauschale": { title: "Pendlerpauschale", desc: "Ermitteln Sie Ihre steuerliche Ersparnis durch Fahrtkosten." },
  "schenkungssteuer": { title: "Schenkungssteuer Rechner", desc: "Berechnen Sie die Steuerlast bei Schenkungen." },
  "urlaubsgeld": { title: "Urlaubsgeldrechner", desc: "Berechnen Sie das Netto-Urlaubsgeld." }
};

for (const [folder, data] of Object.entries(pages)) {
  const dirPath = path.join(basePath, folder);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  const content = `"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { fmtEUR } from "@/lib/calc";

export default function ${folder.charAt(0).toUpperCase() + folder.slice(1)}Page() {
  const [brutto, setBrutto] = useState<number>(4000);

  return (
    <>
      <div className="page-hero">
        <div className="page-wrap">
          <h1>${data.title}</h1>
          <p>${data.desc}</p>
        </div>
      </div>

      <div className="page-wrap">
        <div className="content-area">
          <main>
            <div className="calc-card">
              <div className="calc-card-title">${data.title} Berechnung</div>
              <div className="calc-panels">
                
                {/* Inputs */}
                <div className="calc-inputs">
                  <div className="section-label">Ihre Daten</div>
                  <div className="form-row full">
                    <div className="form-field">
                      <label htmlFor="brutto" className="field-label">Bruttobetrag / Basiswert (€)</label>
                      <input type="number" id="brutto" className="form-input"
                        value={brutto} min={0} step={100}
                        onChange={(e) => setBrutto(Math.max(0, parseFloat(e.target.value) || 0))} />
                    </div>
                  </div>
                  <hr className="field-divider" />
                  <div className="text-sm text-gray-500 mt-4" style={{color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.6}}>
                    Geben Sie Ihre Werte ein, um das Ergebnis zu berechnen.
                    Die detaillierten länderspezifischen Berechnungsparameter werden laufend aktualisiert.
                  </div>
                </div>

                {/* Results */}
                <div className="calc-results">
                  <div className="section-label">Ergebnis</div>
                  <div className="results-content">
                    <div className="result-hero">
                      <div className="result-hero-label">Richtwert</div>
                      <div className="result-hero-amount" style={{ color: "var(--accent)" }}>
                        {fmtEUR(brutto * 0.8)}
                      </div>
                      <div className="result-hero-sub">Unverbindliche Schätzung</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* SEO Article */}
            <div className="seo-section">
              <h2>Über diesen Rechner</h2>
              <p>
                Nutzen Sie den <strong>${data.title}</strong>, um Ihre finanzielle Situation besser zu planen. 
                Alle Berechnungen basieren auf den gesetzlichen Vorgaben in Deutschland für das Jahr 2024 / 2025.
              </p>
            </div>
          </main>

          <Sidebar />
        </div>
      </div>
    </>
  );
}
`;
  fs.writeFileSync(path.join(dirPath, 'page.tsx'), content);
}
console.log("Page templates created successfully.");
