"use client";
import React, { useState, useMemo } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) + " €";

export default function WeihnachtsgeldClient() {
  const [brutto, setBrutto]         = useState<number>(2000);
  const [steuerklasse, setSteuerklasse] = useState<number>(1);
  const [kirchensteuer, setKirchensteuer] = useState<boolean>(false);
  const [bundesland, setBundesland] = useState<string>("west");

  const calc = useMemo(() => {
    const b = Math.max(0, Number(brutto) || 0);

    // SV-Abgaben auf Sonderzahlung (identisch zum regulären Monatslohn)
    const kv  = b * 0.073;
    const rv  = b * 0.093;
    const av  = b * 0.013;
    const pv  = b * 0.017;
    const sv  = kv + rv + av + pv;

    // Lohnsteuer Sonderzahlung: vereinfachte Jahresberechnung / 12
    const jahreszve = Math.max(0, b * 12 - sv * 12 - 1230 - 36);
    const calcLst = (z: number): number => {
      if (z <= 11604) return 0;
      if (z <= 17005) { const y = (z - 11604) / 10000; return (979.18 * y + 1400) * y; }
      if (z <= 66760) { const y = (z - 17005) / 10000; return (192.59 * y + 2397) * y + 966.53; }
      if (z <= 277825) return 0.42 * z - 10602.13;
      return 0.45 * z - 18936.88;
    };
    let lstJahr = calcLst(jahreszve);
    if (steuerklasse === 3) lstJahr = Math.max(0, calcLst(jahreszve / 2) * 2);
    if (steuerklasse === 5) lstJahr = Math.max(0, lstJahr * 1.4);
    if (steuerklasse === 6) lstJahr = Math.max(0, jahreszve * 0.42);

    const lstMonat = lstJahr / 12;
    const soliMonat = lstMonat <= 18130 / 12 ? 0 : lstMonat <= 31386 / 12 ? (lstMonat - 18130 / 12) * 0.119 : lstMonat * 0.055;
    const kistMonat = kirchensteuer ? lstMonat * ((bundesland === "bavaria" || bundesland === "bw") ? 0.08 : 0.09) : 0;

    const netto = b - lstMonat - soliMonat - kistMonat - sv;
    const steuerGesamt = lstMonat + soliMonat + kistMonat;

    return { b, kv, rv, av, pv, sv, lst: lstMonat, soli: soliMonat, kist: kistMonat, steuerGesamt, netto };
  }, [brutto, steuerklasse, kirchensteuer, bundesland]);

  return (
    <div className="calc-card">
      <div className="calc-card-title">Weihnachtsgeld Rechner</div>
      <div className="calc-panels">
        {/* INPUTS */}
        <div className="calc-inputs">
          <div className="section-label">Ihre Angaben</div>

          <div className="form-row full">
            <div className="form-field">
              <label htmlFor="wg-brutto" className="field-label">Brutto-Weihnachtsgeld (€)</label>
              <input type="number" id="wg-brutto" className="form-input"
                value={brutto} min={0} step={100}
                onChange={(e) => setBrutto(Math.max(0, parseFloat(e.target.value) || 0))} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="wg-klasse" className="field-label">Steuerklasse</label>
              <select id="wg-klasse" className="form-select"
                value={steuerklasse} onChange={(e) => setSteuerklasse(parseInt(e.target.value))}>
                <option value="1">I – Ledig</option>
                <option value="2">II – Alleinerziehend</option>
                <option value="3">III – Verheiratet (höher)</option>
                <option value="4">IV – Verheiratet (gleich)</option>
                <option value="5">V – Verheiratet (niedriger)</option>
                <option value="6">VI – Zweitjob</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="wg-bundesland" className="field-label">Bundesland</label>
              <select id="wg-bundesland" className="form-select"
                value={bundesland} onChange={(e) => setBundesland(e.target.value)}>
                <option value="west">Westdeutschland</option>
                <option value="east">Ostdeutschland</option>
                <option value="bavaria">Bayern</option>
                <option value="bw">Baden-Württemberg</option>
              </select>
            </div>
          </div>

          <div className="toggle-field">
            <span className="field-label">Kirchensteuerpflichtig</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={kirchensteuer} onChange={(e) => setKirchensteuer(e.target.checked)} />
              <span className="toggle-track" />
            </label>
          </div>
        </div>

        {/* RESULTS */}
        <div className="calc-results">
          <div className="section-label">Ihr Netto-Weihnachtsgeld</div>
          <div className="results-content">
            <div className="result-hero">
              <div className="result-hero-label">Netto ausgezahlt</div>
              <div className="result-hero-amount">{fmt(calc.netto)}</div>
              <div className="result-hero-sub">von {fmt(calc.b)} brutto</div>
            </div>
            <table className="breakdown-table">
              <tbody>
                <tr><td className="td-label">Brutto-Weihnachtsgeld</td><td className="td-value-neutral">{fmt(calc.b)}</td></tr>
                <tr><td className="td-label">Lohnsteuer</td><td className="td-value-neg">− {fmt(calc.lst)}</td></tr>
                {calc.soli > 0 && <tr><td className="td-label">Solidaritätszuschlag</td><td className="td-value-neg">− {fmt(calc.soli)}</td></tr>}
                {calc.kist > 0 && <tr><td className="td-label">Kirchensteuer</td><td className="td-value-neg">− {fmt(calc.kist)}</td></tr>}
                <tr><td className="td-label">Krankenversicherung</td><td className="td-value-neg">− {fmt(calc.kv)}</td></tr>
                <tr><td className="td-label">Rentenversicherung</td><td className="td-value-neg">− {fmt(calc.rv)}</td></tr>
                <tr><td className="td-label">Arbeitslosenversicherung</td><td className="td-value-neg">− {fmt(calc.av)}</td></tr>
                <tr><td className="td-label">Pflegeversicherung</td><td className="td-value-neg">− {fmt(calc.pv)}</td></tr>
                <tr className="row-total"><td>Netto-Weihnachtsgeld</td><td className="td-value-pos">{fmt(calc.netto)}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
