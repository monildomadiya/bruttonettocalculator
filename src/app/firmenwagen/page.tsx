"use client";

import React, { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import { fmtEUR } from "@/lib/calc";

export default function FirmenwagenPage() {
  const [listenpreis, setListenpreis] = useState<number>(45000);
  const [typ, setTyp] = useState<number>(0.01); // 1% Verbrenner, 0.5% Hybrid, 0.25% Elektro
  const [km, setKm] = useState<number>(15);

  const res = useMemo(() => {
    const p = Number(listenpreis) || 0;
    const distance = Number(km) || 0;
    if (p <= 0) return null;

    // Basis-Prozentsatz (1%, 0.5% oder 0.25%)
    const vorteilBasis = p * typ;
    
    // Fahrten Wohnung-Arbeit: 0.03% des Listenpreises pro Entfernungskilometer
    // Bei Elektro/Hybrid wird oft auch die Bemessungsgrundlage (Listenpreis) geviertelt/halbiert
    // Der Einfachheit halber wenden wir den reduzierten Satz direkt auf den Gesamtvorteil an
    const vorteilKm = p * 0.0003 * distance;
    const vorteilKmReduziert = vorteilKm * (typ / 0.01);

    const monatlich = vorteilBasis + vorteilKmReduziert;
    const jaehrlich = monatlich * 12;

    return { vorteilBasis, vorteilKm: vorteilKmReduziert, monatlich, jaehrlich };
  }, [listenpreis, typ, km]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wie wird ein Firmenwagen versteuert (Geldwerter Vorteil)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die private Nutzung eines Dienstwagens wird pauschal nach der 1%-Regelung versteuert. Für reine Elektrofahrzeuge gilt ein reduzierter Satz von 0,25%, für Plug-in-Hybride 0,5% des Bruttolistenpreises."
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="page-hero">
        <div className="page-wrap">
          <h1>Firmenwagenrechner</h1>
          <p>Berechnen Sie den geldwerten Vorteil Ihres Dienstwagens nach der 1%-Regelung.</p>
        </div>
      </div>

      <div className="page-wrap">
        <div className="content-area">
          <main>
            <div className="calc-card">
              <div className="calc-card-title">Geldwerter Vorteil (Dienstwagen)</div>
              <div className="calc-panels">
                
                {/* Inputs */}
                <div className="calc-inputs">
                  <div className="section-label">Fahrzeugdaten</div>

                  <div className="form-row full">
                    <div className="form-field">
                      <label htmlFor="listenpreis" className="field-label">Bruttolistenpreis (Neupreis in €)</label>
                      <input type="number" id="listenpreis" className="form-input"
                        value={listenpreis} min={0} step={1000}
                        onChange={(e) => setListenpreis(Math.max(0, parseFloat(e.target.value) || 0))} />
                    </div>
                  </div>

                  <div className="form-row full">
                    <div className="form-field">
                      <label htmlFor="typ" className="field-label">Antriebsart (Versteuerung)</label>
                      <select id="typ" className="form-select"
                        value={typ} onChange={(e) => setTyp(parseFloat(e.target.value))}>
                        <option value="0.01">Verbrenner / allgemein (1%-Regelung)</option>
                        <option value="0.005">Plug-in-Hybrid (0,5%-Regelung)</option>
                        <option value="0.0025">Reines Elektroauto (0,25%-Regelung)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row full">
                    <div className="form-field">
                      <label htmlFor="km" className="field-label">Einfache Fahrt zur Arbeit (km)</label>
                      <input type="number" id="km" className="form-input"
                        value={km} min={0} step={1}
                        onChange={(e) => setKm(Math.max(0, parseFloat(e.target.value) || 0))} />
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="calc-results">
                  <div className="section-label">Zu versteuernder Betrag</div>

                  {res ? (
                    <div className="results-content">
                      <div className="result-hero">
                        <div className="result-hero-label">Geldwerter Vorteil</div>
                        <div className="result-hero-amount" style={{ color: "var(--accent)" }}>
                          {fmtEUR(res.monatlich)}
                        </div>
                        <div className="result-hero-sub">pro Monat</div>
                      </div>

                      <table className="breakdown-table">
                        <tbody>
                          <tr>
                            <td className="td-label">Pauschalnutzung (Privat)</td>
                            <td className="td-value-neutral">{fmtEUR(res.vorteilBasis)}</td>
                          </tr>
                          <tr>
                            <td className="td-label">Fahrten zur Arbeitsstätte</td>
                            <td className="td-value-neutral">{fmtEUR(res.vorteilKm)}</td>
                          </tr>
                          <tr className="row-total">
                            <td>Vorteil / Jahr gesamt</td>
                            <td className="td-value-pos">{fmtEUR(res.jaehrlich)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>

              </div>
            </div>

            {/* SEO Article */}
            <div className="seo-section">
              <h2>Firmenwagen versteuern: Alles zur 1%-Regelung und zum geldwerten Vorteil</h2>
              <p>
                Ein Firmenwagen ist für viele Arbeitnehmer in Deutschland ein besonders begehrter Gehaltsbestandteil — schließlich spart man sich die Kosten für Kauf, Wartung und Versicherung eines eigenen Fahrzeugs. Aber Vorsicht: Die private Nutzung des Dienstwagens ist in Deutschland steuerpflichtig. Das Finanzamt wertet sie als sogenannten <strong>geldwerten Vorteil</strong>, der Ihrem Bruttogehalt hinzugerechnet wird und damit Ihre Steuer- und Sozialabgabenlast erhöht. Unser <strong>Firmenwagenrechner</strong> zeigt Ihnen transparent, wie hoch dieser Vorteil wirklich ist — und was er Sie unterm Strich kostet.
              </p>

              <h3>Die 1%-Regelung: Das steckt dahinter</h3>
              <p>
                Die gängigste Methode zur Versteuerung des Firmenwagens ist die <strong>1%-Regelung</strong> (auch pauschale Methode genannt). Das Prinzip ist einfach: Jeden Monat werden 1% des inländischen Bruttolistenpreises des Fahrzeugs (zum Zeitpunkt der Erstzulassung, inklusive Sonderausstattung) als geldwerter Vorteil angesetzt und Ihrem Bruttolohn hinzugerechnet.
              </p>
              <p>
                Für die Fahrten zwischen Wohnung und erster Tätigkeitsstätte kommt noch ein weiterer Betrag hinzu: 0,03% des Bruttolistenpreises pro Entfernungskilometer und Monat. Wer also 20 Kilometer zur Arbeit pendelt und einen Wagen mit einem Listenpreis von 40.000 Euro fährt, zahlt zusätzlich: 40.000 × 0,03% × 20 km = <strong>240 Euro pro Monat</strong> als zusätzlichen geldwerten Vorteil.
              </p>

              <h3>Reduzierte Regelungen für Elektro- und Hybridfahrzeuge</h3>
              <p>
                Als Anreiz zur Förderung klimafreundlicher Mobilität gelten für elektrische und hybride Fahrzeuge deutlich günstigere Steuersätze:
              </p>
              <div className="table-wrap">
                <table className="seo-table">
                  <thead>
                    <tr><th>Fahrzeugtyp</th><th>Steuersatz</th><th>Voraussetzung</th><th>Ersparnis vs. Verbrenner</th></tr>
                  </thead>
                  <tbody>
                    <tr><td><strong>Reines Elektroauto (BEV)</strong></td><td>0,25%</td><td>Bruttolistenpreis max. 70.000 €</td><td>75% Steuerersparnis</td></tr>
                    <tr><td><strong>Plug-in-Hybrid (PHEV)</strong></td><td>0,50%</td><td>Mindest-E-Reichweite 60 km (ab 2025)</td><td>50% Steuerersparnis</td></tr>
                    <tr><td><strong>Verbrenner / konventionell</strong></td><td>1,00%</td><td>Standard</td><td>—</td></tr>
                  </tbody>
                </table>
              </div>
              <p>
                Bei einem Elektroauto mit einem Listenpreis von 50.000 Euro beträgt der monatliche geldwerte Vorteil nur 125 Euro statt 500 Euro. Das ist ein massiver Unterschied — sowohl für die monatliche Steuerlast des Arbeitnehmers als auch für die Gesamtkosten des Arbeitgebers.
              </p>

              <h3>Pauschale vs. Fahrtenbuch: Wann lohnt sich welche Methode?</h3>
              <p>
                Alternativ zur 1%-Regelung können Sie den tatsächlichen privaten Nutzungsanteil per <strong>Fahrtenbuch</strong> nachweisen. Dabei müssen alle Fahrten (Datum, Ziel, Zweck, Kilometerstand) lückenlos dokumentiert werden. Das Finanzamt erkennt nur ordnungsgemäß geführte Fahrtenbücher an.
              </p>
              <p>
                Das Fahrtenbuch lohnt sich, wenn Sie den Firmenwagen selten privat nutzen (z.B. unter 20% der Gesamtkilometer). In diesem Fall kann die tatsächlich zu versteuernde Nutzung deutlich unter dem pauschalen 1%-Ansatz liegen. Fahren Sie den Firmenwagen jedoch häufig privat, ist die 1%-Regelung einfacher und oft sogar günstiger.
              </p>

              <h3>Geldwerter Vorteil: Was bleibt netto davon übrig?</h3>
              <p>
                Viele Arbeitnehmer unterschätzen die tatsächlichen Kosten des Firmenwagens. Der geldwerte Vorteil wird nicht 1:1 besteuert — er erhöht Ihr steuerpflichtiges Einkommen, und auf diesen zusätzlichen Betrag fallen dann Ihr persönlicher Grenzsteuersatz (z.B. 30–45%) sowie anteilige Sozialabgaben an.
              </p>
              <p>
                Konkret: Bei einem Monatsgehalt von 4.000 € brutto (Steuerklasse I) und einem Firmenwagen-Listenpreis von 40.000 € ergibt sich ein geldwerter Vorteil von 400 € monatlich. Dieser wird dem Gehalt hinzugerechnet (effektives Brutto = 4.400 €), die Steuer und SV berechnet, und anschließend der geldwerte Vorteil vom Auszahlungsbetrag wieder abgezogen. Der Arbeitnehmer zahlt dadurch tatsächlich mehr Steuern, erhält aber die Autonutzung als Sachleistung.
              </p>

              <h3>FAQ: Häufige Fragen zum Firmenwagenrechner</h3>
              <div className="faq-item">
                <h3>Gilt die 1%-Regelung auch für gebrauchte Firmenwagen?</h3>
                <p>Ja, aber es gilt immer der ursprüngliche Bruttolistenpreis des Fahrzeugs zum Zeitpunkt der Erstzulassung — nicht der aktuelle Gebrauchtwagenpreis. Das bedeutet: Auch ein älterer Firmenwagen, der ursprünglich 45.000 € kostete und jetzt nur noch 15.000 € wert ist, wird mit 1% von 45.000 € = 450 € monatlich als geldwerter Vorteil angesetzt.</p>
              </div>
              <div className="faq-item">
                <h3>Was passiert, wenn ich den Firmenwagen nur gelegentlich privat nutze?</h3>
                <p>Die 1%-Regelung gilt pauschal für jeden Monat, in dem das Fahrzeug theoretisch privat genutzt werden könnte — unabhängig davon, ob Sie das tatsächlich tun. Wenn Sie nachweisen möchten, dass Sie das Fahrzeug gar nicht oder kaum privat nutzen, müssen Sie ein lückenloses Fahrtenbuch führen und dies dem Finanzamt vorlegen.</p>
              </div>
              <div className="faq-item">
                <h3>Zahlt der Arbeitgeber auch Steuern auf den geldwerten Vorteil?</h3>
                <p>Der Arbeitgeber zahlt die Arbeitgeberanteile zur Sozialversicherung ebenfalls auf das erhöhte Brutto (inkl. geldwerter Vorteil). Das erhöht die Personalkosten für den Arbeitgeber. Manche Arbeitgeber pauschalversteuern den Dienstwagenanteil, um dem Arbeitnehmer die monatliche Belastung zu ersparen — das ist aber die Ausnahme.</p>
              </div>
              <div className="faq-item">
                <h3>Lohnt sich ein Firmenwagen finanziell überhaupt?</h3>
                <p>Das hängt stark vom Fahrzeugtyp, der Nutzungsintensität und Ihrem persönlichen Steuersatz ab. Als grobe Faustregel gilt: Wer monatlich 700 € oder mehr für ein eigenes Fahrzeug inklusive aller Kosten ausgeben würde, für den kann ein Firmenwagen trotz der Steuerbelastung günstiger sein. Besonders attraktiv sind Elektro-Dienstwagen dank des 0,25%-Satzes. Ein direkter Vergleich mit und ohne Firmenwagen über unseren Brutto-Netto-Rechner schafft schnell Klarheit.</p>
              </div>
            </div>
          </main>

          <Sidebar />
        </div>
      </div>
    </>
  );
}
