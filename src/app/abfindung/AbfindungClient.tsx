"use client";
import React, { useState, useMemo } from "react";

const fmt = (n: number) =>
  new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) + " €";

export default function AbfindungClient() {
  const [jahresbrutto, setJahresbrutto] = useState<number>(45000);
  const [abfindung, setAbfindung]       = useState<number>(20000);
  const [steuerklasse, setSteuerklasse] = useState<number>(1);
  const [kirchensteuer, setKirchensteuer] = useState<boolean>(false);

  const calc = useMemo(() => {
    const br = Math.max(0, jahresbrutto);
    const abf = Math.max(0, abfindung);

    // 1. Vereinfachtes zu versteuerndes Einkommen (zvE) ermitteln
    // Wir ziehen pauschal 20% für SV-Beiträge und Werbungskosten ab.
    // Abfindungen sind i.d.R. sozialversicherungsfrei!
    const zveOhneAbf = br * 0.8;

    // 2. Lohnsteuer-Näherungsformel (Tarif 2024)
    const calcLst = (z: number): number => {
      if (z <= 11604) return 0;
      if (z <= 17005) { const y = (z - 11604) / 10000; return (979.18 * y + 1400) * y; }
      if (z <= 66760) { const y = (z - 17005) / 10000; return (192.59 * y + 2397) * y + 966.53; }
      if (z <= 277825) return 0.42 * z - 10602.13;
      return 0.45 * z - 18936.88;
    };

    const applyKlasse = (zve: number, klasse: number): number => {
      let steuer = calcLst(zve);
      if (klasse === 3) steuer = Math.max(0, calcLst(zve / 2) * 2);
      if (klasse === 4) steuer = calcLst(zve);
      if (klasse === 5) steuer = Math.max(0, calcLst(zve) * 1.4);
      if (klasse === 6) steuer = Math.max(0, zve * 0.42);
      return steuer;
    };

    // 3. Berechnung OHNE Abfindung
    const steuerOhneAbf = applyKlasse(zveOhneAbf, steuerklasse);

    // 4. Berechnung MIT einem Fünftel der Abfindung
    const zveFuenftel = zveOhneAbf + (abf / 5);
    const steuerFuenftel = applyKlasse(zveFuenftel, steuerklasse);

    // 5. Delta (Unterschied) berechnen und verfünffachen
    const steuerDelta = steuerFuenftel - steuerOhneAbf;
    let abfindungSteuer = steuerDelta * 5;

    // 6. Soli & KiSt nur auf den Abfindungs-Steueranteil
    // (stark vereinfachte isolierte Betrachtung)
    let abfindungSoli = 0;
    if (steuerOhneAbf + abfindungSteuer > 18130) {
       abfindungSoli = abfindungSteuer * 0.055;
    }
    const abfindungKist = kirchensteuer ? abfindungSteuer * 0.09 : 0;

    // 7. Vergleich: Versteuerung OHNE Fünftelregelung (Normalversteuerung)
    const steuerVoll = applyKlasse(zveOhneAbf + abf, steuerklasse);
    const normalSteuerDelta = steuerVoll - steuerOhneAbf;
    const ersparnis = Math.max(0, normalSteuerDelta - abfindungSteuer);

    const gesamtAbzugAbfindung = abfindungSteuer + abfindungSoli + abfindungKist;
    const nettoAbfindung = abf - gesamtAbzugAbfindung;

    return {
      abf,
      abfindungSteuer,
      abfindungSoli,
      abfindungKist,
      gesamtAbzugAbfindung,
      nettoAbfindung,
      ersparnis,
      normalSteuerDelta
    };
  }, [jahresbrutto, abfindung, steuerklasse, kirchensteuer]);

  return (
    <div className="calc-card">
      <div className="calc-card-title">Abfindungsrechner (Fünftelregelung)</div>
      <div className="calc-panels">
        
        {/* INPUTS */}
        <div className="calc-inputs">
          <div className="section-label">Ihre Daten</div>

          <div className="form-row full">
            <div className="form-field">
              <label htmlFor="abf-gehalt" className="field-label">Reguläres Jahresbrutto (ohne Abfindung)</label>
              <input type="number" id="abf-gehalt" className="form-input"
                value={jahresbrutto} min={0} step={1000}
                onChange={(e) => setJahresbrutto(Math.max(0, parseFloat(e.target.value) || 0))} />
            </div>
          </div>
          
          <div className="form-row full">
            <div className="form-field">
              <label htmlFor="abf-summe" className="field-label">Höhe der Abfindung (€)</label>
              <input type="number" id="abf-summe" className="form-input"
                value={abfindung} min={0} step={1000}
                onChange={(e) => setAbfindung(Math.max(0, parseFloat(e.target.value) || 0))} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="abf-klasse" className="field-label">Steuerklasse</label>
              <select id="abf-klasse" className="form-select"
                value={steuerklasse} onChange={(e) => setSteuerklasse(parseInt(e.target.value))}>
                <option value="1">I – Ledig</option>
                <option value="2">II – Alleinerziehend</option>
                <option value="3">III – Verheiratet (höher)</option>
                <option value="4">IV – Verheiratet (gleich)</option>
                <option value="5">V – Verheiratet (niedriger)</option>
                <option value="6">VI – Zweitjob</option>
              </select>
            </div>
          </div>

          <div className="toggle-field" style={{ marginTop: "16px" }}>
            <span className="field-label">Kirchensteuerpflichtig?</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={kirchensteuer} onChange={(e) => setKirchensteuer(e.target.checked)} />
              <span className="toggle-track" />
            </label>
          </div>
        </div>

        {/* RESULTS */}
        <div className="calc-results">
          <div className="section-label">Ihre Netto-Abfindung</div>
          <div className="results-content">
            
            <div className="result-hero">
              <div className="result-hero-label">Auszahlung der Abfindung</div>
              <div className="result-hero-amount">{fmt(calc.nettoAbfindung)}</div>
              <div className="result-hero-sub" style={{ color: "var(--success)" }}>
                Steuerersparnis (Fünftelregelung): + {fmt(calc.ersparnis)}
              </div>
            </div>

            <table className="breakdown-table" style={{ marginTop: "16px" }}>
              <tbody>
                <tr>
                  <td className="td-label">Brutto-Abfindung</td>
                  <td className="td-value-neutral">{fmt(calc.abf)}</td>
                </tr>
                <tr>
                  <td className="td-label">Lohnsteuer (auf Abfindung)</td>
                  <td className="td-value-neg">− {fmt(calc.abfindungSteuer)}</td>
                </tr>
                {calc.abfindungSoli > 0 && (
                  <tr>
                    <td className="td-label">Solidaritätszuschlag</td>
                    <td className="td-value-neg">− {fmt(calc.abfindungSoli)}</td>
                  </tr>
                )}
                {calc.abfindungKist > 0 && (
                  <tr>
                    <td className="td-label">Kirchensteuer</td>
                    <td className="td-value-neg">− {fmt(calc.abfindungKist)}</td>
                  </tr>
                )}
                <tr className="row-total">
                  <td>Netto der Abfindung</td>
                  <td className="td-value-pos">{fmt(calc.nettoAbfindung)}</td>
                </tr>
              </tbody>
            </table>
            
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "16px", lineHeight: "1.5" }}>
              <strong>Hinweis zur Sozialversicherung:</strong> Echte Abfindungen wegen des Verlusts des 
              Arbeitsplatzes sind grundsätzlich sozialversicherungsfrei (keine RV, KV, AV, PV).
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
