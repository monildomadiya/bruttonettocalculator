"use client";

import React, { useState, useMemo } from "react";

const formatEUR = (n: number) =>
  new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) + " €";

export default function CalculatorClient() {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const [brutto, setBrutto] = useState<number>(4000);
  const [steuerklasse, setSteuerklasse] = useState<number>(1);
  const [bundesland, setBundesland] = useState<string>("west");
  const [geburtsjahr, setGeburtsjahr] = useState<number>(1990);
  const [kirchensteuer, setKirchensteuer] = useState<boolean>(false);
  const [pkv, setPkv] = useState<boolean>(false);
  const [kvZusatz, setKvZusatz] = useState<number>(1.6);
  const [kinderanzahl, setKinderanzahl] = useState<number>(0);

  const calc = useMemo(() => {
    const bruttoInput = Number(brutto) || 0;
    const bruttoMonat = period === "monthly" ? bruttoInput : bruttoInput / 12;
    const bruttoYear = bruttoMonat * 12;
    const alter = 2024 - (Number(geburtsjahr) || 1990);
    const isEast = bundesland === "east";

    const bbgKV = Math.min(bruttoYear, 62100);
    const bbgRV = isEast ? Math.min(bruttoYear, 89400) : Math.min(bruttoYear, 90600);

    const zusatzSatz = (Number(kvZusatz) || 0) / 100;
    const kvYear = pkv ? 0 : bbgKV * (0.073 + zusatzSatz / 2);
    const rvYear = bbgRV * 0.093;
    const avYear = Math.min(bruttoYear, 90600) * 0.013;
    const pvZuschlag = alter >= 23 && kinderanzahl === 0 ? 0.006 : 0;
    const pvYear = Math.min(bruttoYear, 62100) * (0.017 + pvZuschlag);
    const svYear = kvYear + rvYear + avYear + pvYear;

    const zvE = Math.max(0, bruttoYear - svYear - Math.min(1230, bruttoYear * 0.05) - 36);

    const calcLst = (z: number, klasse: number): number => {
      const zAdj = Math.max(0, z - kinderanzahl * 6384);
      const formula = (x: number): number => {
        if (x <= 11604) return 0;
        if (x <= 17005) { const y = (x - 11604) / 10000; return (979.18 * y + 1400) * y; }
        if (x <= 66760) { const y = (x - 17005) / 10000; return (192.59 * y + 2397) * y + 966.53; }
        if (x <= 277825) return 0.42 * x - 10602.13;
        return 0.45 * x - 18936.88;
      };
      if (klasse === 3) return Math.max(0, Math.round(formula(zAdj / 2) * 2));
      let st = formula(zAdj);
      if (klasse === 5) st = Math.max(0, st * 1.4);
      if (klasse === 6) st = Math.max(0, zAdj * 0.42);
      return Math.max(0, Math.round(st));
    };

    const lstYear = calcLst(zvE, steuerklasse);
    const soliYear = lstYear <= 18130 ? 0 : lstYear <= 31386 ? (lstYear - 18130) * 0.119 : lstYear * 0.055;
    const kistYear = kirchensteuer ? lstYear * (bundesland === "bavaria" || bundesland === "bw" ? 0.08 : 0.09) : 0;
    const nettoYear = bruttoYear - lstYear - soliYear - kistYear - kvYear - rvYear - avYear - pvYear;

    const div = period === "monthly" ? 12 : 1;
    const total = bruttoYear || 1;

    const segs = [
      { id: "netto", label: "Netto", color: "#10b981", w: nettoYear / total },
      { id: "lst",   label: "Lohnsteuer", color: "#ef4444", w: lstYear / total },
      soliYear > 0 ? { id: "soli", label: "Soli", color: "#f97316", w: soliYear / total } : null,
      kirchensteuer && kistYear > 0 ? { id: "kist", label: "KiSt", color: "#6366f1", w: kistYear / total } : null,
      kvYear > 0 ? { id: "kv", label: "KV", color: "#3b82f6", w: kvYear / total } : null,
      { id: "rv", label: "RV", color: "#8b5cf6", w: rvYear / total },
      { id: "av", label: "AV", color: "#ec4899", w: avYear / total },
      { id: "pv", label: "PV", color: "#f59e0b", w: pvYear / total },
    ].filter((s): s is NonNullable<typeof s> => s !== null && s.w > 0);

    return {
      brutto: bruttoYear / div, lst: lstYear / div, soli: soliYear / div,
      kist: kistYear / div, kv: kvYear / div, rv: rvYear / div,
      av: avYear / div, pv: pvYear / div, netto: nettoYear / div,
      segs,
      periodLabel: period === "monthly" ? "pro Monat" : "pro Jahr",
    };
  }, [period, brutto, steuerklasse, bundesland, geburtsjahr, kirchensteuer, pkv, kvZusatz, kinderanzahl]);

  return (
    <div className="calc-card">
      <div className="calc-card-title">Brutto-Netto-Rechner</div>
      <div className="calc-panels">

        {/* ── INPUTS ── */}
        <div className="calc-inputs">
          <div className="section-label">Ihre Angaben</div>

          <div className="unit-tabs" role="tablist">
            <button role="tab" aria-selected={period === "monthly"}
              className={`unit-tab${period === "monthly" ? " active" : ""}`}
              onClick={() => setPeriod("monthly")}>
              <span className="tab-name">Monatlich</span>
              <span className="tab-sub">pro Monat</span>
            </button>
            <button role="tab" aria-selected={period === "yearly"}
              className={`unit-tab${period === "yearly" ? " active" : ""}`}
              onClick={() => setPeriod("yearly")}>
              <span className="tab-name">Jährlich</span>
              <span className="tab-sub">pro Jahr</span>
            </button>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="brutto" className="field-label">Bruttogehalt (€)</label>
              <input type="number" id="brutto" className="form-input"
                value={brutto} min={0} step={100}
                onChange={(e) => setBrutto(Math.max(0, parseFloat(e.target.value) || 0))} />
            </div>
            <div className="form-field">
              <label htmlFor="steuerklasse" className="field-label">Steuerklasse</label>
              <select id="steuerklasse" className="form-select"
                value={steuerklasse} onChange={(e) => setSteuerklasse(parseInt(e.target.value))}>
                <option value="1">Klasse I – Ledig</option>
                <option value="2">Klasse II – Alleinerziehend</option>
                <option value="3">Klasse III – Verheiratet (höher)</option>
                <option value="4">Klasse IV – Verheiratet (gleich)</option>
                <option value="5">Klasse V – Verheiratet (niedriger)</option>
                <option value="6">Klasse VI – Zweitjob</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="bundesland" className="field-label">Bundesland</label>
              <select id="bundesland" className="form-select"
                value={bundesland} onChange={(e) => setBundesland(e.target.value)}>
                <option value="west">Westdeutschland</option>
                <option value="east">Ostdeutschland</option>
                <option value="bavaria">Bayern</option>
                <option value="bw">Baden-Württemberg</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="geburtsjahr" className="field-label">Geburtsjahr</label>
              <input type="number" id="geburtsjahr" className="form-input"
                value={geburtsjahr} min={1940} max={2008}
                onChange={(e) => setGeburtsjahr(parseInt(e.target.value) || 1990)} />
            </div>
          </div>

          <div className="form-row full">
            <div className="form-field">
              <label htmlFor="kinderanzahl" className="field-label">Kinderfreibetrag</label>
              <select id="kinderanzahl" className="form-select"
                value={kinderanzahl} onChange={(e) => setKinderanzahl(parseFloat(e.target.value))}>
                <option value="0">0 Kinder</option>
                <option value="0.5">0,5 (geteilt)</option>
                <option value="1">1 Kind</option>
                <option value="1.5">1,5 Kinder</option>
                <option value="2">2 Kinder</option>
                <option value="2.5">2,5 Kinder</option>
                <option value="3">3+ Kinder</option>
              </select>
            </div>
          </div>

          <hr className="field-divider" />

          <div className="form-row full" style={{ opacity: pkv ? 0.45 : 1, transition: "opacity 0.2s" }}>
            <div className="form-field">
              <label htmlFor="kvZusatz" className="field-label">KV-Zusatzbeitrag (%)</label>
              <input type="number" id="kvZusatz" className="form-input"
                value={kvZusatz} min={0} max={5} step={0.1} disabled={pkv}
                onChange={(e) => setKvZusatz(parseFloat(e.target.value) || 0)} />
            </div>
          </div>

          <div className="toggle-field">
            <span className="field-label">Kirchensteuerpflichtig</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={kirchensteuer}
                onChange={(e) => setKirchensteuer(e.target.checked)} />
              <span className="toggle-track" />
            </label>
          </div>

          <div className="toggle-field">
            <span className="field-label">Privat versichert (PKV)</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={pkv}
                onChange={(e) => setPkv(e.target.checked)} />
              <span className="toggle-track" />
            </label>
          </div>
        </div>

        {/* ── RESULTS ── */}
        <div className="calc-results">
          <div className="section-label">Ihr Ergebnis</div>
          <div className="results-content">
            <div className="result-hero">
              <div className="result-hero-label">Nettolohn</div>
              <div className="result-hero-amount">{formatEUR(calc.netto)}</div>
              <div className="result-hero-sub">{calc.periodLabel}</div>
            </div>

            <div>
              <div className="progress-bar-wrap">
                {calc.segs.map((seg) => (
                  <div key={seg.id} className="progress-segment"
                    style={{ width: `${Math.max(0.5, seg.w * 100).toFixed(2)}%`, background: seg.color }}
                    title={`${seg.label}: ${formatEUR(seg.w * calc.brutto)}`} />
                ))}
              </div>
              <div className="progress-legend">
                {calc.segs.map((seg) => (
                  <div key={seg.id} className="legend-item">
                    <span className="legend-dot" style={{ background: seg.color }} />
                    {seg.label}
                  </div>
                ))}
              </div>
            </div>

            <table className="breakdown-table">
              <tbody>
                <tr>
                  <td className="td-label">Bruttogehalt</td>
                  <td className="td-value-neutral">{formatEUR(calc.brutto)}</td>
                </tr>
                {calc.lst > 0 && <tr><td className="td-label">Lohnsteuer</td><td className="td-value-neg">− {formatEUR(calc.lst)}</td></tr>}
                {calc.soli > 0 && <tr><td className="td-label">Solidaritätszuschlag</td><td className="td-value-neg">− {formatEUR(calc.soli)}</td></tr>}
                {calc.kist > 0 && <tr><td className="td-label">Kirchensteuer</td><td className="td-value-neg">− {formatEUR(calc.kist)}</td></tr>}
                {calc.kv > 0 && <tr><td className="td-label">Krankenversicherung</td><td className="td-value-neg">− {formatEUR(calc.kv)}</td></tr>}
                <tr><td className="td-label">Rentenversicherung</td><td className="td-value-neg">− {formatEUR(calc.rv)}</td></tr>
                <tr><td className="td-label">Arbeitslosenversicherung</td><td className="td-value-neg">− {formatEUR(calc.av)}</td></tr>
                <tr><td className="td-label">Pflegeversicherung</td><td className="td-value-neg">− {formatEUR(calc.pv)}</td></tr>
                <tr className="row-total">
                  <td>Nettogehalt</td>
                  <td className="td-value-pos">{formatEUR(calc.netto)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
