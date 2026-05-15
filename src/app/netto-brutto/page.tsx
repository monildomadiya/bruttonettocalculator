"use client";

import React, { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import { calcBruttoNetto, fmtEUR, STEUERKLASSEN, BUNDESLAENDER } from "@/lib/calc";

export default function NettoBruttoPage() {
  const [targetNetto, setTargetNetto] = useState<number>(2500);
  const deferredNetto = targetNetto;
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const [steuerklasse, setSteuerklasse] = useState<number>(1);
  const [bundesland, setBundesland] = useState<string>("west");
  const [kirchensteuer, setKirchensteuer] = useState<boolean>(false);
  const [kinderanzahl, setKinderanzahl] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Iterative approximation for Netto-Brutto
  const result = useMemo(() => {
    const nettoInput = Number(deferredNetto) || 0;
    const targetNettoYear = period === "monthly" ? nettoInput * 12 : nettoInput;
    if (targetNettoYear <= 0) return null;

    let low = targetNettoYear;
    let high = targetNettoYear * 3;
    let bestBrutto = targetNettoYear;
    let finalRes = calcBruttoNetto({
      bruttoYear: bestBrutto,
      steuerklasse,
      bundesland,
      geburtsjahr: 1990,
      kirchensteuer,
      pkv: false,
      kvZusatz: 1.6,
      kinderanzahl,
      period: "yearly",
    });

    // Binary search approximation for matching Netto
    for (let i = 0; i < 40; i++) {
      const mid = (low + high) / 2;
      const res = calcBruttoNetto({
        bruttoYear: mid,
        steuerklasse,
        bundesland,
        geburtsjahr: 1990,
        kirchensteuer,
        pkv: false,
        kvZusatz: 1.6,
        kinderanzahl,
        period: "yearly",
      });

      if (res.netto < targetNettoYear) {
        low = mid;
      } else {
        high = mid;
        bestBrutto = mid;
        finalRes = res;
      }
      if (Math.abs(res.netto - targetNettoYear) < 0.5) break;
    }

    const div = period === "monthly" ? 12 : 1;
    return {
      brutto: bestBrutto / div,
      netto: finalRes.netto / div,
      lst: finalRes.lst / div,
      soli: finalRes.soli / div,
      kist: finalRes.kist / div,
      kv: finalRes.kv / div,
      rv: finalRes.rv / div,
      av: finalRes.av / div,
      pv: finalRes.pv / div,
      periodLabel: period === "monthly" ? "pro Monat" : "pro Jahr",
    };
  }, [deferredNetto, period, steuerklasse, bundesland, kirchensteuer, kinderanzahl]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wie funktioniert der Netto-Brutto-Rechner?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Der Netto-Brutto-Rechner ermittelt durch eine Rückrechnung (iterative Näherung), welches Bruttogehalt notwendig ist, um ein gewünschtes Nettogehalt ausgezahlt zu bekommen."
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="page-hero">
        <div className="page-wrap">
          <h1>Netto-Brutto-Rechner</h1>
          <p>Berechnen Sie das erforderliche Bruttogehalt für Ihr gewünschtes Wunsch-Netto.</p>
        </div>
      </div>

      <div className="page-wrap">
        <div className="content-area">
          <main>
            <div className="calc-card">
              <div className="calc-card-title">Rückrechnung: Netto zu Brutto</div>
              <div className="calc-panels">
                
                {/* Inputs */}
                <div className="calc-inputs">
                  <div className="section-label">Ziel-Netto &amp; Daten</div>

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

                  <div className="form-row full">
                    <div className="form-field">
                      <label htmlFor="targetNetto" className="field-label">Gewünschtes Nettogehalt (€)</label>
                      <input type="number" id="targetNetto" className="form-input"
                        value={targetNetto} min={0} step={50}
                        onChange={(e) => setTargetNetto(Math.max(0, parseFloat(e.target.value) || 0))} />
                    </div>
                  </div>

                  <div className="form-row full">
                    <div className="form-field">
                      <label htmlFor="steuerklasse" className="field-label">Steuerklasse</label>
                      <select id="steuerklasse" className="form-select"
                        value={steuerklasse} onChange={(e) => setSteuerklasse(parseInt(e.target.value))}>
                        {STEUERKLASSEN.map((st) => (
                          <option key={st.value} value={st.value}>{st.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label htmlFor="bundesland" className="field-label">Bundesland</label>
                      <select id="bundesland" className="form-select"
                        value={bundesland} onChange={(e) => setBundesland(e.target.value)}>
                        {BUNDESLAENDER.map((b) => (
                          <option key={b.value} value={b.value}>{b.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-field">
                      <label htmlFor="kinderanzahl" className="field-label">Kinderfreibetrag</label>
                      <select id="kinderanzahl" className="form-select"
                        value={kinderanzahl} onChange={(e) => setKinderanzahl(parseFloat(e.target.value))}>
                        <option value="0">0</option>
                        <option value="0.5">0,5</option>
                        <option value="1">1</option>
                        <option value="1.5">1,5</option>
                        <option value="2">2</option>
                        <option value="3">3+</option>
                      </select>
                    </div>
                  </div>

                  <hr className="field-divider" />

                  <div className="toggle-field">
                    <span className="field-label">Kirchensteuer</span>
                    <label className="toggle-switch">
                      <input type="checkbox" checked={kirchensteuer}
                        onChange={(e) => setKirchensteuer(e.target.checked)} />
                      <span className="toggle-track" />
                    </label>
                  </div>
                </div>

                {/* Results */}
                <div className="calc-results">
                  <div className="section-label">Erforderliches Brutto</div>

                  {result ? (
                    <div className="results-content">
                      <div className="result-hero">
                        <div className="result-hero-label">Bruttogehalt</div>
                        <div className="result-hero-amount" style={{ color: "var(--accent)" }}>
                          {fmtEUR(result.brutto)}
                        </div>
                        <div className="result-hero-sub">{result.periodLabel}</div>
                      </div>

                      <table className="breakdown-table">
                        <tbody>
                          <tr>
                            <td className="td-label">Ziel-Nettogehalt</td>
                            <td className="td-value-neutral">{fmtEUR(result.netto)}</td>
                          </tr>
                          {result.lst > 0 && <tr><td className="td-label">Lohnsteuer</td><td className="td-value-neg">+ {fmtEUR(result.lst)}</td></tr>}
                          {result.soli > 0 && <tr><td className="td-label">Solidaritätszuschlag</td><td className="td-value-neg">+ {fmtEUR(result.soli)}</td></tr>}
                          {result.kist > 0 && <tr><td className="td-label">Kirchensteuer</td><td className="td-value-neg">+ {fmtEUR(result.kist)}</td></tr>}
                          <tr><td className="td-label">Krankenversicherung</td><td className="td-value-neg">+ {fmtEUR(result.kv)}</td></tr>
                          <tr><td className="td-label">Rentenversicherung</td><td className="td-value-neg">+ {fmtEUR(result.rv)}</td></tr>
                          <tr><td className="td-label">Arbeitslosenversicherung</td><td className="td-value-neg">+ {fmtEUR(result.av)}</td></tr>
                          <tr><td className="td-label">Pflegeversicherung</td><td className="td-value-neg">+ {fmtEUR(result.pv)}</td></tr>
                          <tr className="row-total">
                            <td>Notwendiges Brutto</td>
                            <td className="td-value-pos">{fmtEUR(result.brutto)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>

              </div>
            </div>

            {/* SEO Article */}
            <div className="imported-seo-wrap">
              <style dangerouslySetInnerHTML={{__html: `
                .imported-seo-wrap { padding:32px 0; max-width:100%; }
                .imported-seo-wrap h2 { font-size:22px; font-weight:700; color:var(--text-heading); margin-bottom:12px; letter-spacing:-0.01em; }
                .imported-seo-wrap h3 { font-size:16px; font-weight:600; color:var(--text-heading); margin-bottom:8px; }
                .imported-seo-wrap p { font-size:15px; line-height:1.6; color:var(--text-body); margin-bottom:16px; }
                .imported-seo-wrap .section { margin-bottom:40px; }
                .imported-seo-wrap .card-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:16px; margin-bottom:24px; }
                .imported-seo-wrap .card { background:var(--bg-card); border:1px solid var(--border-color); border-radius:0; padding:20px; box-shadow:none; }
                .imported-seo-wrap .card-icon { font-size:24px; color:var(--accent); margin-bottom:12px; }
                .imported-seo-wrap .stat-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:16px; margin-bottom:24px; }
                .imported-seo-wrap .stat { background:var(--bg-result); border:1px solid var(--border-color); border-radius:0; padding:16px; text-align:center; }
                .imported-seo-wrap .stat-label { font-size:11px; color:var(--text-muted); margin-bottom:6px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; }
                .imported-seo-wrap .stat-val { font-size:24px; font-weight:700; color:var(--text-heading); letter-spacing:-0.02em;}
                .imported-seo-wrap .faq-item { border-top:1px solid var(--border-color); overflow:hidden; }
                .imported-seo-wrap .faq-item:last-child { border-bottom:1px solid var(--border-color); }
                .imported-seo-wrap .faq-q { width:100%; background:none; border:none; text-align:left; padding:16px 0; font-size:15px; font-weight:600; color:var(--text-heading); cursor:pointer; display:flex; justify-content:space-between; align-items:center; gap:16px; font-family:var(--font); outline:none; }
                .imported-seo-wrap .faq-q:hover { color:var(--accent); }
                .imported-seo-wrap .faq-q .arrow { font-size:16px; color:var(--text-muted); transition:transform .2s ease; flex-shrink:0; }
                .imported-seo-wrap .faq-a { max-height:0; overflow:hidden; transition:max-height .3s ease,padding .3s ease; }
                .imported-seo-wrap .faq-a p { font-size:14px; padding-bottom:16px; color:var(--text-body); margin:0; }
                .imported-seo-wrap .faq-item.open .arrow { transform:rotate(180deg); color:var(--accent); }
                .imported-seo-wrap .faq-item.open .faq-a { max-height:600px; }
                .imported-seo-wrap .table-wrap { overflow-x:auto; margin-bottom:24px; border:1px solid var(--border-color); border-radius:0; background:var(--bg-card); }
                .imported-seo-wrap table { width:100%; border-collapse:collapse; font-size:14px; }
                .imported-seo-wrap th { text-align:left; padding:12px 16px; color:var(--text-muted); font-weight:700; border-bottom:1px solid var(--border-color); background:var(--bg-result); font-size:12px; text-transform:uppercase; letter-spacing:0.05em; }
                .imported-seo-wrap td { padding:12px 16px; color:var(--text-body); border-bottom:1px solid var(--border-color); }
                .imported-seo-wrap tr:last-child td { border-bottom:none; }
                .imported-seo-wrap .badge { display:inline-block; font-size:11px; font-weight:700; padding:2px 8px; border-radius:0; margin-left:8px; background:var(--bg-tag); color:var(--accent); border:1px solid var(--border-color); }
                .imported-seo-wrap .tip-box { background:var(--bg-result); border-left:3px solid var(--accent); border-radius:0; padding:16px; margin-bottom:24px; }
                .imported-seo-wrap .tip-box p { color:var(--text-heading); margin:0; font-size:14px; font-weight:500; }
                .imported-seo-wrap .steps { counter-reset:step; display:flex; flex-direction:column; gap:20px; margin-bottom:24px; }
                .imported-seo-wrap .step { display:flex; gap:16px; align-items:flex-start; }
                .imported-seo-wrap .step-num { counter-increment:step; width:28px; height:28px; border-radius:0; background:var(--accent); color:#fff; font-size:13px; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:2px; }
                .imported-seo-wrap .step-num::before { content:counter(step); }
                .imported-seo-wrap .step-body h3 { margin-bottom:4px; font-size:15px; }
                .imported-seo-wrap .step-body p { margin-bottom:0; font-size:14px; }
              `}} />


              <div className="section">
                <h2>Wie funktioniert der Netto-Brutto-Rechner?</h2>
                <p>Der Netto-Brutto-Rechner berechnet das notwendige Bruttogehalt, das Sie benötigen, um ein bestimmtes Nettogehalt zu erhalten. Im Gegensatz zum klassischen Brutto-Netto-Rechner erfolgt hier die <strong>Rückrechnung</strong> – ideal für Gehaltsverhandlungen und Jobangebote.</p>

                <div className="steps">
                  <div className="step">
                    <div className="step-num"></div>
                    <div className="step-body">
                      <h3>Wunschnetto eingeben</h3>
                      <p>Geben Sie den monatlichen oder jährlichen Nettobetrag ein, den Sie nach Hause nehmen möchten.</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-num"></div>
                    <div className="step-body">
                      <h3>Persönliche Daten auswählen</h3>
                      <p>Wählen Sie Ihre Steuerklasse, Bundesland, Anzahl der Kinderfreibeträge und ob Kirchensteuer anfällt.</p>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-num"></div>
                    <div className="step-body">
                      <h3>Bruttogehalt ablesen</h3>
                      <p>Der Rechner ermittelt sofort das erforderliche Bruttogehalt inklusive einer detaillierten Aufschlüsselung aller Abzüge.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section">
                <h2>Typische Abzüge beim Bruttolohn 2026</h2>
                <p>Das Nettogehalt ergibt sich aus dem Bruttogehalt abzüglich Lohnsteuer, Solidaritätszuschlag (nur für Besserverdienende), Kirchensteuer (optional) und Sozialversicherungsbeiträge.</p>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr><th>Abzugsart</th><th>Beitragssatz 2026</th><th>Träger</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Krankenversicherung</td><td>14,6 % + Zusatzbeitrag (∅ 1,7 %)</td><td>je 50 % AN / AG</td></tr>
                      <tr><td>Rentenversicherung</td><td>18,6 %</td><td>je 50 % AN / AG</td></tr>
                      <tr><td>Arbeitslosenversicherung</td><td>2,6 %</td><td>je 50 % AN / AG</td></tr>
                      <tr><td>Pflegeversicherung</td><td>3,4 % (+ 0,6 % kinderlos)</td><td>je 50 % AN / AG</td></tr>
                      <tr><td>Lohnsteuer</td><td>progressiv (0–45 %)</td><td>Arbeitnehmer</td></tr>
                      <tr><td>Solidaritätszuschlag</td><td>5,5 % der Lohnsteuer <span className="badge">nur Spitzenverdiener</span></td><td>Arbeitnehmer</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="tip-box">
                  <p>💡 <strong>Hinweis:</strong> Seit 2021 zahlen rund 90 % aller Arbeitnehmer keinen Solidaritätszuschlag mehr. Nur Einkommen oberhalb bestimmter Freigrenzen sind betroffen.</p>
                </div>
              </div>

              <div className="section">
                <h2>Steuerklassen im Überblick</h2>
                <p>Die Steuerklasse hat den größten Einfluss auf Ihr Nettogehalt. Hier sehen Sie, welche Klasse für welche Lebenssituation gilt:</p>
                <div className="card-grid">
                  <div className="card">
                    <div className="card-icon"><i className="ti ti-user" aria-hidden="true"></i></div>
                    <h3>Klasse I</h3>
                    <p style={{fontSize:"13px",margin:0}}>Ledig, geschieden oder verwitwet ohne Kinder. Standardabzüge gelten.</p>
                  </div>
                  <div className="card">
                    <div className="card-icon"><i className="ti ti-users" aria-hidden="true"></i></div>
                    <h3>Klasse III</h3>
                    <p style={{fontSize:"13px",margin:0}}>Verheiratete mit höherem Einkommen. Geringste Steuerbelastung, höchstes Netto.</p>
                  </div>
                  <div className="card">
                    <div className="card-icon"><i className="ti ti-user-check" aria-hidden="true"></i></div>
                    <h3>Klasse IV</h3>
                    <p style={{fontSize:"13px",margin:0}}>Verheiratete mit ähnlichem Einkommen. Beide Partner gleichgestellt.</p>
                  </div>
                  <div className="card">
                    <div className="card-icon"><i className="ti ti-heart" aria-hidden="true"></i></div>
                    <h3>Klasse II</h3>
                    <p style={{fontSize:"13px",margin:0}}>Alleinerziehende. Entlastungsbetrag von 4.260 € jährlich wird angerechnet.</p>
                  </div>
                </div>
              </div>

              <div className="section">
                <h2>Netto-Brutto-Beispiele 2026 (Steuerklasse I, West)</h2>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr><th>Wunsch-Netto / Monat</th><th>Erforderliches Brutto</th><th>Abgabenquote (ca.)</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>1.500 €</td><td>ca. 2.050 €</td><td>~27 %</td></tr>
                      <tr><td>2.000 €</td><td>ca. 2.800 €</td><td>~29 %</td></tr>
                      <tr><td>2.500 €</td><td>ca. 3.770 €</td><td>~34 %</td></tr>
                      <tr><td>3.000 €</td><td>ca. 4.650 €</td><td>~35 %</td></tr>
                      <tr><td>4.000 €</td><td>ca. 6.400 €</td><td>~37 %</td></tr>
                      <tr><td>5.000 €</td><td>ca. 8.200 €</td><td>~39 %</td></tr>
                    </tbody>
                  </table>
                </div>
                <p style={{fontSize:"13px",color:"var(--color-text-secondary)"}}>*Richtwerte ohne Kirchensteuer, ohne Kinderfreibeträge. Stand: 2026.</p>
              </div>

              <div className="section">
                <h2>Häufige Fragen (FAQ)</h2>
                <div id="faq">
                  {[
                    {q: "Was ist der Unterschied zwischen Brutto und Netto?", a: "Das <strong>Bruttogehalt</strong> ist der vereinbarte Lohn vor allen Abzügen. Das <strong>Nettogehalt</strong> ist der Betrag, der tatsächlich auf Ihr Konto überwiesen wird – nach Abzug von Steuern und Sozialversicherungsbeiträgen. In Deutschland beträgt die Differenz je nach Steuerklasse und Einkommen typischerweise 30–45 %."},
                    {q: "Wann ist eine Netto-Brutto-Rechnung sinnvoll?", a: "Immer dann, wenn Sie in Gehaltsverhandlungen ein konkretes Nettobetrag im Kopf haben und wissen möchten, wie hoch das Bruttoangebot mindestens sein muss. Auch bei Jobangeboten aus dem Ausland oder beim Wechsel in die Selbstständigkeit ist die Rückrechnung hilfreich."},
                    {q: "Wie viel Brutto brauche ich für 2.500 € Netto?", a: "Für ein Netto von 2.500 € im Monat benötigen Sie in Steuerklasse I (ledig, Westdeutschland) ein Bruttogehalt von rund <strong>3.770 €</strong>. In Steuerklasse III (verheiratet, Partner ohne Einkommen) reduziert sich das notwendige Brutto deutlich. Nutzen Sie den Rechner für eine genaue Berechnung basierend auf Ihrer persönlichen Situation."},
                    {q: "Zählt der Ost-West-Unterschied noch?", a: "Ja, für die Rentenversicherung existieren noch unterschiedliche Beitragsbemessungsgrenzen in Ost- und Westdeutschland. Ab 2025 werden diese schrittweise angeglichen. Der Rechner berücksichtigt Ihr ausgewähltes Bundesland automatisch."},
                    {q: "Wie wirkt sich die Kirchensteuer aus?", a: "Die Kirchensteuer beträgt 8 % der Einkommensteuer (Bayern, Baden-Württemberg) oder 9 % (alle anderen Bundesländer). Sie senkt das Netto spürbar – bei einem Bruttogehalt von 3.770 € kann sie rund 30–50 € pro Monat ausmachen."},
                    {q: "Was sind Kinderfreibeträge und wie berechne ich sie?", a: "Kinderfreibeträge reduzieren die steuerliche Bemessungsgrundlage. Pro Kind wird ein Freibetrag von 8.952 € (2026) berücksichtigt – bestehend aus dem Kinderfreibetrag und dem Erziehungsfreibetrag. Das Finanzamt prüft automatisch, ob Freibeträge oder Kindergeld günstiger für Sie sind (Günstigerprüfung)."},
                    {q: "Ist dieser Rechner kostenlos und ohne Anmeldung nutzbar?", a: "Ja, der Netto-Brutto-Rechner ist vollständig kostenlos und ohne Registrierung nutzbar. Die Berechnungen erfolgen direkt im Browser – es werden keine persönlichen Daten gespeichert oder übermittelt."}
                  ].map((faq, index) => (
                    <div key={index} className={`faq-item ${openFaq === index ? 'open' : ''}`}>
                      <button className="faq-q" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                        {faq.q}<i className="ti ti-chevron-down arrow" aria-hidden="true"></i>
                      </button>
                      <div className="faq-a"><p dangerouslySetInnerHTML={{__html: faq.a}}></p></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section">
                <h2>Verwandte Rechner</h2>
                <div className="card-grid">
                  <div className="card">
                    <div className="card-icon"><i className="ti ti-calculator" aria-hidden="true"></i></div>
                    <h3>Brutto-Netto-Rechner</h3>
                    <p style={{fontSize:"13px",margin:0}}>Berechnen Sie Ihr Nettogehalt aus einem gegebenen Bruttogehalt.</p>
                  </div>
                  <div className="card">
                    <div className="card-icon"><i className="ti ti-clock" aria-hidden="true"></i></div>
                    <h3>Stundenlohnrechner</h3>
                    <p style={{fontSize:"13px",margin:0}}>Ermitteln Sie Ihr Gehalt auf Stundenbasis.</p>
                  </div>
                  <div className="card">
                    <div className="card-icon"><i className="ti ti-building" aria-hidden="true"></i></div>
                    <h3>Arbeitgeberrechner</h3>
                    <p style={{fontSize:"13px",margin:0}}>Gesamtkosten eines Mitarbeiters für den Arbeitgeber.</p>
                  </div>
                  <div className="card">
                    <div className="card-icon"><i className="ti ti-pig-money" aria-hidden="true"></i></div>
                    <h3>Rentenrechner</h3>
                    <p style={{fontSize:"13px",margin:0}}>Voraussichtliche Rente aus Ihren Rentenpunkten berechnen.</p>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <Sidebar />
        </div>
      </div>
    </>
  );
}
