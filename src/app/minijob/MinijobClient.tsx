"use client";
import React, { useState, useMemo } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) + " €";

export default function MinijobClient() {
  const [brutto, setBrutto]           = useState<number>(556);
  const [rentOpt, setRentOpt]         = useState<boolean>(false); // opt into full RV
  const [arbeitgeber, setArbeitgeber] = useState<boolean>(false); // show AG view

  const calc = useMemo(() => {
    const b = Math.max(0, Number(brutto) || 0);
    const isMini = b <= 556;

    // Arbeitgeber (AG) Pauschalbeiträge
    const agKV   = isMini ? b * 0.13  : b * 0.073; // 13% pauschal GKV or regular
    const agRV   = isMini ? b * 0.15  : b * 0.093; // 15% pauschal RV
    const agU1   = isMini ? b * 0.009 : 0;          // U1 Umlage (pauschal)
    const agU2   = isMini ? b * 0.003 : 0;          // U2 Umlage
    const agInso = isMini ? b * 0.0012: 0;          // Insolvenzumlage
    const agTotal = agKV + agRV + agU1 + agU2 + agInso;

    // Arbeitnehmer (AN) Beiträge
    const anRV   = isMini && rentOpt ? b * (0.186 - 0.15) : 0; // Aufstockung auf 18,6%
    const anNetto = b - anRV;

    const agGesamtkosten = b + agTotal;

    return { b, isMini, agKV, agRV, agU1, agU2, agInso, agTotal, anRV, anNetto, agGesamtkosten };
  }, [brutto, rentOpt]);

  return (
    <div className="calc-card">
      <div className="calc-card-title">Minijob Rechner</div>
      <div className="calc-panels">
        {/* INPUTS */}
        <div className="calc-inputs">
          <div className="section-label">Ihre Angaben</div>

          <div className="form-row full">
            <div className="form-field">
              <label htmlFor="mj-brutto" className="field-label">Monatlicher Verdienst (€)</label>
              <input type="number" id="mj-brutto" className="form-input"
                value={brutto} min={0} max={2000} step={10}
                onChange={(e) => setBrutto(Math.max(0, parseFloat(e.target.value) || 0))} />
              <span style={{ fontSize: "11px", color: calc.isMini ? "var(--success)" : "var(--danger)", marginTop: "4px" }}>
                {calc.isMini ? "✓ Innerhalb der Minijob-Grenze (556 €)" : "✗ Überschreitet Minijob-Grenze — kein Minijob!"}
              </span>
            </div>
          </div>

          <hr className="field-divider" />

          <div className="toggle-field">
            <span className="field-label">Rentenversicherung aufstocken (AN)</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={rentOpt} onChange={(e) => setRentOpt(e.target.checked)} disabled={!calc.isMini} />
              <span className="toggle-track" />
            </label>
          </div>

          <div className="toggle-field">
            <span className="field-label">Arbeitgeber-Ansicht anzeigen</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={arbeitgeber} onChange={(e) => setArbeitgeber(e.target.checked)} />
              <span className="toggle-track" />
            </label>
          </div>
        </div>

        {/* RESULTS */}
        <div className="calc-results">
          <div className="section-label">Ihr Ergebnis</div>
          <div className="results-content">
            <div className="result-hero">
              <div className="result-hero-label">Nettoverdienst</div>
              <div className="result-hero-amount">{fmt(calc.anNetto)}</div>
              <div className="result-hero-sub">pro Monat</div>
            </div>

            <table className="breakdown-table">
              <tbody>
                <tr><td className="td-label">Bruttoverdienst</td><td className="td-value-neutral">{fmt(calc.b)}</td></tr>
                {calc.anRV > 0 && <tr><td className="td-label">AN-Rentenversicherung (Aufstockung)</td><td className="td-value-neg">− {fmt(calc.anRV)}</td></tr>}
                <tr className="row-total"><td>Nettoverdienst</td><td className="td-value-pos">{fmt(calc.anNetto)}</td></tr>
              </tbody>
            </table>

            {arbeitgeber && (
              <>
                <div style={{ borderTop: "2px solid var(--border)", marginTop: "16px", paddingTop: "14px" }}>
                  <div className="section-label">Arbeitgeberkosten</div>
                  <table className="breakdown-table">
                    <tbody>
                      <tr><td className="td-label">Bruttolohn AN</td><td className="td-value-neutral">{fmt(calc.b)}</td></tr>
                      <tr><td className="td-label">AG-Pauschale KV (13%)</td><td className="td-value-neg">+ {fmt(calc.agKV)}</td></tr>
                      <tr><td className="td-label">AG-Pauschale RV (15%)</td><td className="td-value-neg">+ {fmt(calc.agRV)}</td></tr>
                      {calc.agU1 > 0 && <tr><td className="td-label">Umlage U1 (0,9%)</td><td className="td-value-neg">+ {fmt(calc.agU1)}</td></tr>}
                      {calc.agU2 > 0 && <tr><td className="td-label">Umlage U2 (0,3%)</td><td className="td-value-neg">+ {fmt(calc.agU2)}</td></tr>}
                      {calc.agInso > 0 && <tr><td className="td-label">Insolvenzumlage (0,12%)</td><td className="td-value-neg">+ {fmt(calc.agInso)}</td></tr>}
                      <tr className="row-total"><td>AG-Gesamtkosten</td><td className="td-value-neg">{fmt(calc.agGesamtkosten)}</td></tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
