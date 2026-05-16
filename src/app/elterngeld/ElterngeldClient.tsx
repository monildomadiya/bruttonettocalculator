"use client";
import React, { useState, useMemo } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) + " €";

export default function ElterngeldClient() {
  const [nettoVorGeburt, setNettoVorGeburt]     = useState<number>(2500);
  const [type, setType]                         = useState<"basis" | "plus">("basis");
  const [geschwister, setGeschwister]           = useState<boolean>(false);
  const [mehrlinge, setMehrlinge]               = useState<boolean>(false);

  const calc = useMemo(() => {
    const netto = Math.max(0, Number(nettoVorGeburt) || 0);

    // Ersatzrate: 67% bei Netto ≤ 1.200 €, gleitend bis 65% bei Netto ≥ 1.200 €
    let rate = 0.67;
    if (netto > 1200) {
      // Gleitend: 67% → 65% zwischen 1.200 € und 1.800 €
      rate = Math.max(0.65, 0.67 - ((netto - 1200) / 600) * 0.02);
    }
    // Geringverdiener: bis 1.000 € Netto → bis 100% (Bonus)
    if (netto <= 1000) rate = Math.min(1.0, 0.67 + ((1000 - netto) / 1000) * 0.33);

    let betrag = netto * rate;

    // Min/Max Basiselterngeld
    betrag = Math.max(300, Math.min(1800, betrag));

    // ElterngeldPlus: max. halber Basiselterngeld-Betrag
    const plusBetrag = type === "plus" ? Math.min(betrag / 2, 900) : betrag;

    // Geschwisterbonus: +10% (min. 75 €)
    const geschwisterBonus = geschwister ? Math.max(75, plusBetrag * 0.1) : 0;
    const mehrlingZuschlag = mehrlinge  ? 300 : 0; // pauschal je weiteres Kind

    const gesamt = plusBetrag + geschwisterBonus + mehrlingZuschlag;

    // Monate
    const basisMonate = 14;   // inkl. Partnermonate
    const plusMonate  = 28;   // doppelte Laufzeit
    const gesamtMonate = type === "basis" ? basisMonate : plusMonate;

    return { netto, rate, betrag, plusBetrag, geschwisterBonus, mehrlingZuschlag, gesamt, gesamtMonate, type };
  }, [nettoVorGeburt, type, geschwister, mehrlinge]);

  return (
    <div className="calc-card">
      <div className="calc-card-title">Elterngeld Rechner</div>
      <div className="calc-panels">
        {/* INPUTS */}
        <div className="calc-inputs">
          <div className="section-label">Ihre Angaben</div>

          <div className="form-row full">
            <div className="form-field">
              <label htmlFor="eg-netto" className="field-label">Durchschn. Nettoeinkommen vor Geburt (€)</label>
              <input type="number" id="eg-netto" className="form-input"
                value={nettoVorGeburt} min={0} step={100}
                onChange={(e) => setNettoVorGeburt(Math.max(0, parseFloat(e.target.value) || 0))} />
              <span style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
                Basierend auf den letzten 12 Monaten vor dem Monat der Geburt
              </span>
            </div>
          </div>

          <hr className="field-divider" />
          <div className="section-label">Elterngeld-Variante</div>
          <div className="unit-tabs" role="tablist" style={{ marginBottom: "16px" }}>
            <button role="tab" aria-selected={type === "basis"}
              className={`unit-tab${type === "basis" ? " active" : ""}`}
              onClick={() => setType("basis")}>
              <span className="tab-name">Basiselterngeld</span>
              <span className="tab-sub">bis 14 Monate</span>
            </button>
            <button role="tab" aria-selected={type === "plus"}
              className={`unit-tab${type === "plus" ? " active" : ""}`}
              onClick={() => setType("plus")}>
              <span className="tab-name">ElterngeldPlus</span>
              <span className="tab-sub">bis 28 Monate</span>
            </button>
          </div>

          <div className="toggle-field">
            <span className="field-label">Geschwisterbonus (+10%)</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={geschwister} onChange={(e) => setGeschwister(e.target.checked)} />
              <span className="toggle-track" />
            </label>
          </div>
          <div className="toggle-field">
            <span className="field-label">Mehrlingszuschlag (+ 300 € je weiterem Kind)</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={mehrlinge} onChange={(e) => setMehrlinge(e.target.checked)} />
              <span className="toggle-track" />
            </label>
          </div>
        </div>

        {/* RESULTS */}
        <div className="calc-results">
          <div className="section-label">Ihr Elterngeld</div>
          <div className="results-content">
            <div className="result-hero">
              <div className="result-hero-label">Monatliches Elterngeld</div>
              <div className="result-hero-amount">{fmt(calc.gesamt)}</div>
              <div className="result-hero-sub">für bis zu {calc.gesamtMonate} Monate</div>
            </div>
            <table className="breakdown-table">
              <tbody>
                <tr><td className="td-label">Nettoeinkommen (Bemessung)</td><td className="td-value-neutral">{fmt(calc.netto)}</td></tr>
                <tr><td className="td-label">Ersatzrate</td><td className="td-value-neutral">{(calc.rate * 100).toFixed(0)} %</td></tr>
                <tr><td className="td-label">{calc.type === "basis" ? "Basiselterngeld" : "ElterngeldPlus"} (Basisbetrag)</td><td className="td-value-pos">{fmt(calc.plusBetrag)}</td></tr>
                {calc.geschwisterBonus > 0 && <tr><td className="td-label">Geschwisterbonus</td><td className="td-value-pos">+ {fmt(calc.geschwisterBonus)}</td></tr>}
                {calc.mehrlingZuschlag > 0 && <tr><td className="td-label">Mehrlingszuschlag</td><td className="td-value-pos">+ {fmt(calc.mehrlingZuschlag)}</td></tr>}
                <tr className="row-total"><td>Gesamtes Elterngeld / Monat</td><td className="td-value-pos">{fmt(calc.gesamt)}</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "12px", lineHeight: 1.6 }}>
              Hinweis: Diese Berechnung ist eine Schätzung. Der genaue Betrag wird vom Elterngeldstelle festgesetzt. Minimum: 300 €/Monat, Maximum: 1.800 €/Monat (Basis).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
