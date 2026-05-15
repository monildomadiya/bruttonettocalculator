"use client";

import React, { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import { YEAR, NEXT_YEAR } from "@/lib/seo";

const formatEUR = (n: number) =>
  new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) + " €";

export default function HomePage() {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");
  const [brutto, setBrutto] = useState<number>(4000);
  const deferredBrutto = brutto;
  const [steuerklasse, setSteuerklasse] = useState<number>(1);
  const [bundesland, setBundesland] = useState<string>("west");
  const [geburtsjahr, setGeburtsjahr] = useState<number>(1990);
  const [kirchensteuer, setKirchensteuer] = useState<boolean>(false);
  const [pkv, setPkv] = useState<boolean>(false);
  const [kvZusatz, setKvZusatz] = useState<number>(1.6);
  const [kinderanzahl, setKinderanzahl] = useState<number>(0);

  const calc = useMemo(() => {
    const bruttoInput = Number(deferredBrutto) || 0;
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
  }, [period, deferredBrutto, steuerklasse, bundesland, geburtsjahr, kirchensteuer, pkv, kvZusatz, kinderanzahl]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: `Wie berechnet sich das Nettogehalt ${YEAR}?`, acceptedAnswer: { "@type": "Answer", text: "Vom Bruttogehalt werden Lohnsteuer, Solidaritätszuschlag, ggf. Kirchensteuer sowie Kranken-, Renten-, Arbeitslosen- und Pflegeversicherungsbeiträge abgezogen. Der verbleibende Betrag ist das Nettoeinkommen." } },
      { "@type": "Question", name: "Was ist der Unterschied zwischen Brutto und Netto?", acceptedAnswer: { "@type": "Answer", text: "Brutto ist das vereinbarte Gehalt vor allen Abzügen. Netto ist der tatsächlich auf das Konto ausgezahlte Betrag nach Lohnsteuer und Sozialabgaben." } },
      { "@type": "Question", name: "Wie hoch ist der Grundfreibetrag?", acceptedAnswer: { "@type": "Answer", text: `Der steuerliche Grundfreibetrag beträgt ${YEAR} für Alleinstehende 11.604 Euro und für Verheiratete 23.208 Euro. Einkommen bis zu dieser Höhe bleibt steuerfrei.` } },
      { "@type": "Question", name: "Wie unterscheiden sich die Steuerklassen?", acceptedAnswer: { "@type": "Answer", text: "Steuerklasse 1 gilt für Ledige, Klasse 3 für Verheiratete mit höherem Gehalt und Klasse 6 für Zweitjobs. Die Wahl der Steuerklasse beeinflusst direkt die monatliche Lohnsteuer." } },
      { "@type": "Question", name: `Welche Sozialabgaben fallen ${YEAR} an?`, acceptedAnswer: { "@type": "Answer", text: `In ${YEAR} zahlen Arbeitnehmer Beiträge zur Kranken- (7,3%+), Renten- (9,3%), Arbeitslosen- (1,3%) und Pflegeversicherung (1,7-2,3%). Insgesamt sind das ca. 20-21% des Bruttogehalts.` } },
    ],
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `Brutto-Netto-Rechner ${YEAR}/${NEXT_YEAR}`,
    url: "https://bruttonettocalculator.com/",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
    inLanguage: "de-DE",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    description: `Kostenloser Brutto-Netto-Rechner ${YEAR}. Nettogehalt, Lohnsteuer und Sozialabgaben für alle Steuerklassen in Deutschland sofort berechnen.`,
    author: {
      "@type": "Organization",
      name: "bruttonettocalculator",
      url: "https://bruttonettocalculator.com",
    },
    areaServed: { "@type": "Country", name: "Germany" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "bruttonettocalculator", item: "https://bruttonettocalculator.com/" },
      { "@type": "ListItem", position: 2, name: `Brutto-Netto-Rechner ${YEAR}`, item: "https://bruttonettocalculator.com/" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />


      {/* Hero */}
      <div className="page-hero">
        <div className="page-wrap">
          <h1>Brutto-Netto-Rechner {YEAR}/{NEXT_YEAR}</h1>
          <p>Nettogehalt für {YEAR}/{NEXT_YEAR} sofort berechnen — alle Steuerklassen, aktuellste Sozialabgaben, kostenlos & ohne Anmeldung.</p>
        </div>
      </div>

      <div className="page-wrap">
        <div className="content-area">

          {/* MAIN: Calculator + SEO */}
          <main>
            <div className="calc-card">
              <div className="calc-card-title">Brutto-Netto-Rechner</div>
              <div className="calc-panels">

                {/* ── INPUTS ── */}
                <div className="calc-inputs">
                  <div className="section-label">Ihre Angaben</div>

                  {/* Period Tabs */}
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

                  {/* Brutto + Steuerklasse */}
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

                  {/* Bundesland + Geburtsjahr */}
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

                  {/* Kinderfreibetrag */}
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

                  {/* KV-Zusatzbeitrag */}
                  <div className="form-row full" style={{ opacity: pkv ? 0.45 : 1, transition: "opacity 0.2s" }}>
                    <div className="form-field">
                      <label htmlFor="kvZusatz" className="field-label">KV-Zusatzbeitrag (%)</label>
                      <input type="number" id="kvZusatz" className="form-input"
                        value={kvZusatz} min={0} max={5} step={0.1} disabled={pkv}
                        onChange={(e) => setKvZusatz(parseFloat(e.target.value) || 0)} />
                    </div>
                  </div>

                  {/* Kirchensteuer Toggle */}
                  <div className="toggle-field">
                    <span className="field-label">Kirchensteuerpflichtig</span>
                    <label className="toggle-switch">
                      <input type="checkbox" checked={kirchensteuer}
                        onChange={(e) => setKirchensteuer(e.target.checked)} />
                      <span className="toggle-track" />
                    </label>
                  </div>

                  {/* PKV Toggle */}
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
                    {/* Hero Amount */}
                    <div className="result-hero">
                      <div className="result-hero-label">Nettolohn</div>
                      <div className="result-hero-amount">{formatEUR(calc.netto)}</div>
                      <div className="result-hero-sub">{calc.periodLabel}</div>
                    </div>

                    {/* Visual Bar */}
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

                    {/* Breakdown Table */}
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

            {/* SEO Article */}
            <div className="seo-section">
              <h2>Brutto-Netto-Rechner {YEAR}: Berechnen Sie Ihr exaktes Nettogehalt</h2>
              <p>
                Mit unserem <strong>Brutto-Netto-Rechner {YEAR}</strong> erfahren Sie in Sekundenschnelle, wie viel von Ihrem hart erarbeiteten 
                Bruttogehalt am Ende des Monats tatsächlich auf Ihrem Bankkonto landet. Die Berechnung des Nettogehalts ist in Deutschland ein 
                hochkomplexer Vorgang, der von unzähligen individuellen Faktoren wie Ihrer Steuerklasse, dem Bundesland, dem Alter und der Anzahl 
                Ihrer Kinder abhängt. Unser <strong>Gehaltsrechner</strong> greift auf die aktuellsten gesetzlichen Vorgaben, Beitragsbemessungsgrenzen 
                und Freibeträge des Jahres {YEAR} (und perspektivisch {NEXT_YEAR}) zurück, um Ihnen eine auf den Cent genaue Auswertung zu liefern.
              </p>

              <h3>Warum ist die Unterscheidung zwischen Brutto und Netto so wichtig?</h3>
              <p>
                In deutschen Arbeitsverträgen und bei Gehaltsverhandlungen wird ausnahmslos das <strong>Bruttogehalt</strong> verhandelt und 
                festgehalten. Dieses Gehalt spiegelt jedoch nicht Ihre tatsächliche Kaufkraft wider. Der Arbeitgeber behält automatisch die 
                gesetzlich vorgeschriebene Lohnsteuer (inklusive Solidaritätszuschlag und gegebenenfalls Kirchensteuer) sowie Ihren Anteil an den 
                Sozialversicherungen ein und führt diese direkt an das Finanzamt beziehungsweise die Krankenkasse ab. Erst nach diesem sogenannten 
                "Quellenabzug" entsteht das <strong>Nettogehalt</strong>, welches Ihnen zur freien Verfügung steht. Für die private Finanzplanung, 
                das Beantragen von Krediten oder die Entscheidung für einen neuen Job ist daher ausschließlich das Nettoeinkommen relevant.
              </p>

              <h3>Wie setzt sich der Steuerabzug im Jahr {YEAR} zusammen?</h3>
              <p>Der Abzug vom Bruttogehalt erfolgt in zwei großen Blöcken: den Steuern und den Sozialabgaben.</p>
              <ul>
                <li><strong>Lohnsteuer:</strong> Die Höhe der Lohnsteuer richtet sich nach einem progressiven Steuertarif. Je mehr Sie verdienen, desto höher ist der prozentuale Steuersatz auf jeden zusätzlich verdienten Euro. Der steuerliche Grundfreibetrag (das Existenzminimum, das komplett steuerfrei bleibt) liegt {YEAR} bei 11.604 Euro pro Jahr.</li>
                <li><strong>Solidaritätszuschlag (Soli):</strong> Der Soli wurde für rund 90% der Steuerzahler abgeschafft. Er fällt im Jahr {YEAR} erst an, wenn Ihre jährliche Lohnsteuer einen Freibetrag von 18.130 Euro (Ledige) bzw. 36.260 Euro (Verheiratete) überschreitet. Das entspricht grob einem monatlichen Bruttogehalt von über 6.500 Euro (in Steuerklasse I).</li>
                <li><strong>Kirchensteuer:</strong> Sind Sie Mitglied einer staatlich anerkannten Religionsgemeinschaft, wird Kirchensteuer fällig. In Bayern und Baden-Württemberg beträgt diese 8%, in allen anderen deutschen Bundesländern 9% der berechneten Lohnsteuer.</li>
              </ul>

              <h3>Beitragssätze der Sozialversicherung im Detail ({YEAR})</h3>
              <p>
                Neben den Steuern machen die Sozialabgaben den zweiten großen Teil der Abzüge aus. Diese Beiträge finanzieren das deutsche 
                Sozialsystem und werden in der Regel hälftig zwischen Arbeitnehmer und Arbeitgeber geteilt. Beachten Sie jedoch, dass die 
                Abzüge nicht endlos steigen, sondern durch die sogenannten Beitragsbemessungsgrenzen (BBG) gedeckelt sind. Einkommen oberhalb 
                dieser Grenze ist beitragsfrei.
              </p>
              
              <div className="table-wrap">
                <table className="seo-table">
                  <thead>
                    <tr><th>Versicherungsart</th><th>Gesamtbeitrag</th><th>Arbeitnehmeranteil ({YEAR})</th><th>BBG West (p.a.)</th></tr>
                  </thead>
                  <tbody>
                    <tr><td><strong>Krankenversicherung (GKV)</strong></td><td>14,6% + Zusatzbeitrag</td><td>7,3% + ½ individueller Zusatzbeitrag</td><td>62.100 €</td></tr>
                    <tr><td><strong>Rentenversicherung (RV)</strong></td><td>18,6%</td><td>9,3%</td><td>90.600 €</td></tr>
                    <tr><td><strong>Arbeitslosenversicherung (AV)</strong></td><td>2,6%</td><td>1,3%</td><td>90.600 €</td></tr>
                    <tr><td><strong>Pflegeversicherung (PV)</strong></td><td>3,4% - 4,0%</td><td>1,7% - 2,3% (kinderlos, ab 23 J. höher)</td><td>62.100 €</td></tr>
                  </tbody>
                </table>
              </div>

              <h3>Welche Rolle spielt die Steuerklasse bei der Nettoberechnung?</h3>
              <p>
                Das deutsche Steuerrecht teilt Arbeitnehmer in sechs Lohnsteuerklassen ein. Die Steuerklasse beeinflusst zwar nicht, wie viel 
                Einkommensteuer Sie auf das gesamte Jahr gesehen zahlen müssen (dies wird erst mit der Steuererklärung endgültig abgerechnet), 
                sie bestimmt aber maßgeblich den monatlichen Steuerabzug und damit die Höhe Ihres Nettogehalts.
              </p>
              <ul>
                <li><strong>Steuerklasse 1:</strong> Für alleinstehende, ledige, geschiedene oder verwitwete Arbeitnehmer ohne Kinder. Keine besonderen Freibeträge.</li>
                <li><strong>Steuerklasse 2:</strong> Ausschließlich für Alleinerziehende. Beinhaltet den wertvollen Entlastungsbetrag für Alleinerziehende, der das monatliche Netto spürbar erhöht.</li>
                <li><strong>Steuerklasse 3:</strong> Für Verheiratete, bei denen ein Partner deutlich mehr verdient (Kombination 3 und 5). Der Besserverdienende erhält Klasse 3 und profitiert von extrem geringen Abzügen, da die Freibeträge beider Partner hier gebündelt werden.</li>
                <li><strong>Steuerklasse 4:</strong> Der Standard für Verheiratete. Beide Partner verdienen ähnlich viel. Entspricht den Abzügen der Steuerklasse 1. Alternativ ist auch die Variante 4 mit Faktor möglich, die Steuernachzahlungen verhindert.</li>
                <li><strong>Steuerklasse 5:</strong> Das Pendant zu Klasse 3. Geringverdiener in einer Ehe haben in Klasse 5 extrem hohe monatliche Abzüge, da der Freibetrag in Klasse 3 des Partners liegt.</li>
                <li><strong>Steuerklasse 6:</strong> Wird zwingend für einen zweiten oder jeden weiteren Nebenjob (sofern es kein 538-Euro-Minijob ist) benötigt. Hier gibt es keinen Grundfreibetrag, weshalb die Steuerabzüge ab dem ersten Euro greifen.</li>
              </ul>

              <h3>7 Experten-Tipps: So maximieren Sie Ihr Nettogehalt in {YEAR}</h3>
              <p>Viele Arbeitnehmer verschenken monatlich bares Geld. Mit den folgenden Strategien können Sie legal Ihr Nettogehalt optimieren und die Steuerlast senken:</p>
              <ol>
                <li><strong>Freibeträge auf der Lohnsteuerkarte eintragen:</strong> Wenn Sie hohe Fahrtkosten (Pendlerpauschale), teure Weiterbildungen oder außergewöhnliche Belastungen haben, können Sie beim Finanzamt einen Freibetrag eintragen lassen. Dadurch steigt Ihr monatliches Netto sofort an.</li>
                <li><strong>Steuerfreie Sachbezüge verhandeln:</strong> Statt einer klassischen Bruttogehaltserhöhung, die stark besteuert wird, bitten Sie um steuerfreie Sachbezüge. Arbeitgeber dürfen Ihnen monatlich bis zu 50 Euro steuer- und sozialabgabenfrei zukommen lassen (z.B. als Tankgutschein, Shopping-Karte oder Fitnessstudio-Abo).</li>
                <li><strong>Jobticket & ÖPNV:</strong> Arbeitgeber können Ihnen ein Jobticket für den öffentlichen Nahverkehr (inklusive Deutschlandticket) komplett steuerfrei überlassen.</li>
                <li><strong>Kinderbetreuungskosten:</strong> Zuschüsse des Arbeitgebers zur Unterbringung von nicht schulpflichtigen Kindern in Kindergärten oder Kitas sind in unbegrenzter Höhe steuer- und sozialversicherungsfrei.</li>
                <li><strong>Betriebliche Altersvorsorge (bAV):</strong> Wandeln Sie einen Teil Ihres Bruttogehalts in eine Direktversicherung um. Dieser Betrag ist bis zu bestimmten Grenzen steuer- und sozialversicherungsfrei (Entgeltumwandlung).</li>
                <li><strong>Erholungsbeihilfe:</strong> Statt regulärem Urlaubsgeld kann der Arbeitgeber jährlich 156 Euro (plus Zuschläge für Ehepartner und Kinder) als Erholungsbeihilfe pauschalversteuert auszahlen.</li>
                <li><strong>Steuerklassenwechsel prüfen:</strong> Verheiratete sollten jährlich prüfen, ob die gewählte Kombination (4/4 oder 3/5) noch zur Einkommenssituation passt. Ein Wechsel kann jederzeit beim Finanzamt beantragt werden.</li>
              </ol>

              <h3>Umfassendes FAQ: Ihre Fragen zum Brutto-Netto-Rechner beantwortet</h3>
              <div className="faq-item">
                <h3>Wie hoch ist das durchschnittliche Nettogehalt in Deutschland?</h3>
                <p>Das Durchschnittsgehalt in Deutschland für Vollzeitbeschäftigte lag zuletzt bei rund 4.100 Euro brutto im Monat. In Steuerklasse 1 entspricht dies nach Abzug aller Steuern und Sozialabgaben einem Nettogehalt von etwa 2.650 Euro. Diese Werte variieren jedoch massiv zwischen den Bundesländern, Branchen und Geschlechtern.</p>
              </div>
              <div className="faq-item">
                <h3>Was ändert sich {NEXT_YEAR} bei der Gehaltsabrechnung?</h3>
                <p>Der Gesetzgeber passt die Beitragsbemessungsgrenzen und steuerlichen Freibeträge jährlich an die Einkommensentwicklung und Inflation an. Erfahrungsgemäß steigen der Grundfreibetrag sowie die Kinderfreibeträge, was zu einer leichten steuerlichen Entlastung führt. Gleichzeitig steigen aber oft auch die Zusatzbeiträge zur Krankenversicherung und die Beitragsbemessungsgrenzen, was für Besserverdiener höhere Abzüge bedeuten kann.</p>
              </div>
              <div className="faq-item">
                <h3>Wird der Firmenwagen auf mein Netto angerechnet?</h3>
                <p>Ja, wenn Sie einen Dienstwagen auch privat nutzen, entsteht Ihnen ein sogenannter geldwerter Vorteil. Dieser wird Ihrem Bruttogehalt fiktiv hinzugerechnet, wodurch Ihre Steuer- und Sozialabgabenlast steigt. Anschließend wird der Betrag vom Auszahlungsbetrag wieder abgezogen. Berechnen können Sie diesen Effekt exakt in unserem <a href="/firmenwagen" style={{color: "var(--accent)", textDecoration: "none"}}>Firmenwagenrechner</a>.</p>
              </div>
              <div className="faq-item">
                <h3>Sollte ich als Student Steuern zahlen?</h3>
                <p>Studenten profitieren wie alle anderen Arbeitnehmer vom steuerlichen Grundfreibetrag (11.604 Euro im Jahr {YEAR}). Bleiben Ihre Einkünfte aus Nebenjobs unter dieser Grenze, fallen keine Einkommensteuern an. Handelt es sich um einen klassischen Werkstudentenjob, sind Sie zudem in der Kranken-, Pflege- und Arbeitslosenversicherung befreit (sofern Sie die 20-Stunden-Regel einhalten) und zahlen lediglich Beiträge zur Rentenversicherung.</p>
              </div>
              <div className="faq-item">
                <h3>Warum liefert mein Lohnzettel ein leicht anderes Ergebnis als der Gehaltsrechner?</h3>
                <p>Unsere Algorithmen sind äußerst präzise, dennoch kann es in der Praxis zu Abweichungen von wenigen Cents oder Euros kommen. Gründe hierfür sind oftmals individuelle krumme Zusatzbeiträge der jeweiligen Krankenkasse, eingetragene Freibeträge, vermögenswirksame Leistungen (VL), steuerfreie Zuschläge für Nacht- und Feiertagsarbeit oder pauschal versteuerte Firmenveranstaltungen. Der Rechner liefert einen generalisierten, standardisierten Wert, der in 99% der Fälle fast exakt dem Lohnzettel entspricht.</p>
              </div>
            </div>
          </main>

          {/* SIDEBAR */}
          <Sidebar />

        </div>
      </div>
    </>
  );
}
