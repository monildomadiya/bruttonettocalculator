"use client";
import React, { useState, useMemo } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) + " €";

export default function KrankengeldClient() {
  const [brutto, setBrutto] = useState<number>(3500);
  const [netto, setNetto]   = useState<number>(2200);
  const [kinderlos, setKinderlos] = useState<boolean>(false);

  const calc = useMemo(() => {
    const b = Math.max(0, brutto);
    const n = Math.max(0, netto);

    // Schritt 1: Regelentgelt pro Tag (immer 30 Tage pro Monat)
    const bruttoTag = b / 30;
    const nettoTag  = n / 30;

    // Schritt 2: Vergleich 70% Brutto vs. 90% Netto
    const brutto70 = bruttoTag * 0.7;
    const netto90  = nettoTag * 0.9;
    
    // Schritt 3: Brutto-Krankengeld ist der niedrigere Wert
    let bruttoKrankengeldTag = Math.min(brutto70, netto90);

    // Schritt 4: Beitragsbemessungsgrenze (2024: 5.175 € / Monat = 172,50 € / Tag)
    // Max. Krankengeld = 70% von 172,50 = 120,75 €
    const MAX_KRANKENGELD_TAG = 120.75;
    bruttoKrankengeldTag = Math.min(bruttoKrankengeldTag, MAX_KRANKENGELD_TAG);

    // Schritt 5: Sozialversicherungsabzüge (KV entfällt, RV, AV, PV fallen an)
    const rvRate = 0.093; // 9,3%
    const avRate = 0.013; // 1,3%
    const pvRate = kinderlos ? 0.023 : 0.017; // 1,7% + 0,6% (Zuschlag für Kinderlose)

    const abzugRV = bruttoKrankengeldTag * rvRate;
    const abzugAV = bruttoKrankengeldTag * avRate;
    const abzugPV = bruttoKrankengeldTag * pvRate;
    const gesamtAbzug = abzugRV + abzugAV + abzugPV;

    // Schritt 6: Netto-Krankengeld
    const nettoKrankengeldTag = bruttoKrankengeldTag - gesamtAbzug;
    const nettoKrankengeldMonat = nettoKrankengeldTag * 30;

    return {
      bruttoKrankengeldTag,
      abzugRV,
      abzugAV,
      abzugPV,
      nettoKrankengeldTag,
      nettoKrankengeldMonat,
      gap: n - nettoKrankengeldMonat, // Einkommenslücke
    };
  }, [brutto, netto, kinderlos]);

  return (
    <div className="calc-card">
      <div className="calc-card-title">Krankengeldrechner</div>
      <div className="calc-panels">
        
        {/* INPUTS */}
        <div className="calc-inputs">
          <div className="section-label">Ihre Gehaltsdaten (vor der Erkrankung)</div>

          <div className="form-row full">
            <div className="form-field">
              <label htmlFor="kg-brutto" className="field-label">Bruttomonatsgehalt (€)</label>
              <input type="number" id="kg-brutto" className="form-input"
                value={brutto} min={0} step={100}
                onChange={(e) => setBrutto(Math.max(0, parseFloat(e.target.value) || 0))} />
            </div>
          </div>
          <div className="form-row full">
            <div className="form-field">
              <label htmlFor="kg-netto" className="field-label">Nettomonatsgehalt (€)</label>
              <input type="number" id="kg-netto" className="form-input"
                value={netto} min={0} step={100}
                onChange={(e) => setNetto(Math.max(0, parseFloat(e.target.value) || 0))} />
            </div>
          </div>

          <div className="toggle-field" style={{ marginTop: "16px" }}>
            <span className="field-label">Kinderlos (und über 23 Jahre)?</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={kinderlos} onChange={(e) => setKinderlos(e.target.checked)} />
              <span className="toggle-track" />
            </label>
          </div>
        </div>

        {/* RESULTS */}
        <div className="calc-results">
          <div className="section-label">Ihr Krankengeld (ab der 7. Woche)</div>
          <div className="results-content">
            
            <div className="result-hero">
              <div className="result-hero-label">Netto-Krankengeld pro Monat</div>
              <div className="result-hero-amount">{fmt(calc.nettoKrankengeldMonat)}</div>
              <div className="result-hero-sub" style={{ color: "var(--text-muted)" }}>
                Einkommenslücke: {fmt(Math.max(0, calc.gap))}
              </div>
            </div>

            <table className="breakdown-table" style={{ marginTop: "16px" }}>
              <tbody>
                <tr>
                  <td className="td-label">Brutto-Krankengeld (pro Tag)</td>
                  <td className="td-value-neutral">{fmt(calc.bruttoKrankengeldTag)}</td>
                </tr>
                <tr>
                  <td className="td-label">Rentenversicherung</td>
                  <td className="td-value-neg">− {fmt(calc.abzugRV)}</td>
                </tr>
                <tr>
                  <td className="td-label">Arbeitslosenversicherung</td>
                  <td className="td-value-neg">− {fmt(calc.abzugAV)}</td>
                </tr>
                <tr>
                  <td className="td-label">Pflegeversicherung</td>
                  <td className="td-value-neg">− {fmt(calc.abzugPV)}</td>
                </tr>
                <tr className="row-total">
                  <td>Netto-Krankengeld (pro Tag)</td>
                  <td className="td-value-pos">{fmt(calc.nettoKrankengeldTag)}</td>
                </tr>
              </tbody>
            </table>
            
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "16px", lineHeight: "1.5" }}>
              Das Krankengeld wird ab dem 43. Tag der Arbeitsunfähigkeit von der Krankenkasse gezahlt 
              (vorher greift die Lohnfortzahlung durch den Arbeitgeber). Es ist steuerfrei, 
              unterliegt aber dem Progressionsvorbehalt.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
