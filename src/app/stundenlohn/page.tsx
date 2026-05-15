"use client";

import React, { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import { fmtEUR } from "@/lib/calc";

export default function StundenlohnPage() {
  const [brutto, setBrutto] = useState<number>(3500);
  const [stundenWoche, setStundenWoche] = useState<number>(40);

  const res = useMemo(() => {
    const b = Number(brutto) || 0;
    const h = Number(stundenWoche) || 0;
    if (b <= 0 || h <= 0) return null;

    // Ø 4.3333 Wochen pro Monat in Deutschland
    const stundenMonat = h * 4.333333;
    const stundenlohn = b / stundenMonat;
    const tageslohn = stundenlohn * (h / 5); // bei 5-Tage-Woche
    const jahreslohn = b * 12;

    return { stundenlohn, tageslohn, monatslohn: b, jahreslohn, stundenMonat };
  }, [brutto, stundenWoche]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wie berechnet man den Stundenlohn aus dem Monatsgehalt?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Da ein Monat im Durchschnitt aus 4,33 Wochen besteht, multipliziert man die wöchentliche Arbeitszeit mit 4,33. Das Bruttomonatsgehalt wird anschließend durch diese monatliche Stundenzahl geteilt."
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="page-hero">
        <div className="page-wrap">
          <h1>Stundenlohnrechner</h1>
          <p>Berechnen Sie exakt Ihren Stundenlohn aus dem monatlichen Bruttogehalt.</p>
        </div>
      </div>

      <div className="page-wrap">
        <div className="content-area">
          <main>
            <div className="calc-card">
              <div className="calc-card-title">Stundenlohn &amp; Gehalt Umrechnung</div>
              <div className="calc-panels">
                
                {/* Inputs */}
                <div className="calc-inputs">
                  <div className="section-label">Ihre Arbeitsdaten</div>

                  <div className="form-row full">
                    <div className="form-field">
                      <label htmlFor="brutto" className="field-label">Bruttogehalt pro Monat (€)</label>
                      <input type="number" id="brutto" className="form-input"
                        value={brutto} min={0} step={100}
                        onChange={(e) => setBrutto(Math.max(0, parseFloat(e.target.value) || 0))} />
                    </div>
                  </div>

                  <div className="form-row full">
                    <div className="form-field">
                      <label htmlFor="stundenWoche" className="field-label">Wochenarbeitszeit (Stunden)</label>
                      <input type="number" id="stundenWoche" className="form-input"
                        value={stundenWoche} min={1} max={80} step={0.5}
                        onChange={(e) => setStundenWoche(Math.max(0, parseFloat(e.target.value) || 0))} />
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="calc-results">
                  <div className="section-label">Ergebnis</div>

                  {res ? (
                    <div className="results-content">
                      <div className="result-hero">
                        <div className="result-hero-label">Ihr Stundenlohn</div>
                        <div className="result-hero-amount" style={{ color: "var(--accent)" }}>
                          {fmtEUR(res.stundenlohn)}
                        </div>
                        <div className="result-hero-sub">Brutto pro Stunde</div>
                      </div>

                      <table className="breakdown-table">
                        <tbody>
                          <tr>
                            <td className="td-label">Arbeitsstunden / Monat</td>
                            <td className="td-value-neutral">{res.stundenMonat.toFixed(1)} Std.</td>
                          </tr>
                          <tr>
                            <td className="td-label">Tageslohn (Ø 5-Tage-Woche)</td>
                            <td className="td-value-neutral">{fmtEUR(res.tageslohn)}</td>
                          </tr>
                          <tr>
                            <td className="td-label">Monatsgehalt</td>
                            <td className="td-value-neutral">{fmtEUR(res.monatslohn)}</td>
                          </tr>
                          <tr className="row-total">
                            <td>Jahresgehalt</td>
                            <td className="td-value-pos">{fmtEUR(res.jahreslohn)}</td>
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
              <h2>Stundenlohn berechnen: Vom Monatsgehalt zum exakten Stundenlohn</h2>
              <p>
                Fast jeder Arbeitnehmer in Deutschland kennt sein monatliches Bruttogehalt — aber kaum jemand weiß spontan, was er oder sie eigentlich pro Stunde verdient. Dabei ist der <strong>Stundenlohn</strong> eine der aufschlussreichsten Kennzahlen, wenn es um faire Vergütung, Nebenjob-Entscheidungen, Freiberufler-Kalkulation oder einfach den Vergleich mit Kolleginnen und Kollegen geht. Unser <strong>Stundenlohnrechner</strong> macht die Umrechnung in Sekunden — transparent, nachvollziehbar und auf den Cent genau.
              </p>

              <h3>Wie rechnet man ein Monatsgehalt in einen Stundenlohn um?</h3>
              <p>
                Die Berechnung klingt einfach, hat aber eine oft übersehene Feinheit: Ein Monat hat nicht immer 4 Wochen. Genauer gesagt hat ein Jahr 52 Wochen, die sich auf 12 Monate verteilen — das ergibt im Durchschnitt <strong>4,333 Wochen pro Monat</strong>. Diese Zahl wird oft auf 4,35 gerundet. Unser Rechner verwendet die präzisere Variante 4,333.
              </p>
              <p>Die Formel lautet:</p>
              <ul>
                <li><strong>Monatliche Arbeitsstunden</strong> = Wochenstunden × 4,333</li>
                <li><strong>Stundenlohn (brutto)</strong> = Monatsbrutto ÷ monatliche Arbeitsstunden</li>
              </ul>
              <p>
                Beispiel: Bei einem Monatsgehalt von 3.500 € brutto und einer 40-Stunden-Woche ergibt sich: 40 × 4,333 = 173,3 Stunden pro Monat. Stundenlohn = 3.500 € ÷ 173,3 = <strong>ca. 20,20 € brutto pro Stunde</strong>.
              </p>

              <h3>Der gesetzliche Mindestlohn in Deutschland</h3>
              <p>
                Der gesetzliche Mindestlohn ist in Deutschland die absolute Untergrenze für die Vergütung von Arbeitnehmern. Seit dem 1. Januar 2025 gilt ein Mindestlohn von <strong>12,82 Euro brutto pro Stunde</strong>. Für 2026 und 2027 wird eine weitere Anhebung durch die Mindestlohnkommission erwartet. Unabhängig davon, ob Sie Vollzeit, Teilzeit oder als Minijobber arbeiten — der Mindestlohn muss eingehalten werden.
              </p>
              <p>
                Ob Ihr monatliches Festgehalt den Mindestlohn einhält, können Sie ganz einfach mit diesem Rechner prüfen. Teilen Sie einfach Ihr Monatsgehalt durch Ihre monatlichen Arbeitsstunden. Liegt das Ergebnis unter 12,82 €, haben Sie Anspruch auf eine Nachzahlung.
              </p>

              <h3>Stundenlohn-Vergleichstabelle nach Jahresgehalt</h3>
              <div className="table-wrap">
                <table className="seo-table">
                  <thead>
                    <tr><th>Jahresgehalt (brutto)</th><th>Monatsgehalt (brutto)</th><th>Stundenlohn (40h-Woche)</th><th>Stundenlohn (35h-Woche)</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>24.000 €</td><td>2.000 €</td><td>ca. 11,54 €</td><td>ca. 13,19 €</td></tr>
                    <tr><td>36.000 €</td><td>3.000 €</td><td>ca. 17,31 €</td><td>ca. 19,78 €</td></tr>
                    <tr><td>48.000 €</td><td>4.000 €</td><td>ca. 23,08 €</td><td>ca. 26,37 €</td></tr>
                    <tr><td>60.000 €</td><td>5.000 €</td><td>ca. 28,85 €</td><td>ca. 32,97 €</td></tr>
                    <tr><td>80.000 €</td><td>6.667 €</td><td>ca. 38,47 €</td><td>ca. 43,96 €</td></tr>
                  </tbody>
                </table>
              </div>

              <h3>Warum ist die Wochenarbeitszeit so entscheidend?</h3>
              <p>
                Das Monatsgehalt allein sagt wenig über die tatsächliche Vergütung aus. Ein Gehalt von 4.000 € brutto bei einer 40-Stunden-Woche entspricht einem Stundenlohn von 23,08 €. Dieselbe Person, die für denselben Lohn 45 Stunden pro Woche arbeitet, kommt auf gerade einmal 20,51 € die Stunde. Das ist eine Differenz von fast 12 Prozent — bei gleichem Gehalt!
              </p>
              <p>
                Besonders relevant ist das beim Vergleich von Jobangeboten. Ein vermeintlich besseres Angebot mit 200 € mehr Gehalt kann sich als schlechtere Wahl entpuppen, wenn gleichzeitig 5 Stunden mehr Wochenarbeit gefordert werden. Der Stundenlohn ist hier die objektive Vergleichsgröße.
              </p>

              <h3>Stundenlohn für Freelancer und Selbstständige korrekt kalkulieren</h3>
              <p>
                Für Freiberufler und Selbstständige ist die Stundenlohnkalkulation noch wichtiger und gleichzeitig komplexer. Als Angestellter zahlt Ihr Arbeitgeber nochmal ca. 20–21% Ihres Bruttogehalts zusätzlich an die Sozialkassen (Arbeitgeberanteile). Als Selbstständiger müssen Sie diese Beträge selbst tragen. Das bedeutet: Ihr Stundensatz als Freiberufler muss deutlich höher sein als der Brutto-Stundenlohn eines vergleichbaren Angestellten, um dasselbe Nettoeinkommen zu erzielen.
              </p>
              <p>
                Als Faustregel gilt: Multiplizieren Sie Ihren gewünschten Angestellten-Bruttostundenlohn mit einem Faktor von 1,5 bis 2,0, um Ihren Freelancer-Stundensatz zu ermitteln. Dies berücksichtigt Sozialabgaben, Steuervorauszahlungen, Urlaubs- und Krankheitstage sowie unproduktive Akquise-Zeit.
              </p>

              <h3>FAQ: Häufige Fragen zum Stundenlohnrechner</h3>
              <div className="faq-item">
                <h3>Wie viele Stunden arbeitet man in Deutschland im Monat durchschnittlich?</h3>
                <p>Bei der in Deutschland üblichen 40-Stunden-Woche ergeben sich im Jahresschnitt rund 173 bezahlte Arbeitsstunden pro Monat. Das berücksichtigt noch nicht Urlaubstage oder gesetzliche Feiertage. Tatsächlich gearbeitete Stunden nach Abzug von Urlaub und Feiertagen liegen je nach Bundesland bei etwa 155–162 Stunden pro Monat.</p>
              </div>
              <div className="faq-item">
                <h3>Was ist der Unterschied zwischen Zeitlohn und Akkordlohn?</h3>
                <p>Beim Zeitlohn (dem in Deutschland häufigsten Modell) wird die geleistete Arbeitszeit vergütet, unabhängig von der Menge des Outputs. Beim Akkordlohn richtet sich die Vergütung nach der produzierten Stückzahl. Unser Rechner basiert ausschließlich auf dem Zeitlohnmodell und rechnet das vereinbarte Monatsgehalt auf Stundenbasis um.</p>
              </div>
              <div className="faq-item">
                <h3>Werden Überstunden beim Stundenlohn berücksichtigt?</h3>
                <p>Nein, unser Rechner berechnet den vertraglichen Stundenlohn basierend auf der vertraglich vereinbarten Wochenarbeitszeit. Überstunden können je nach Arbeitsvertrag als Freizeitausgleich abgegolten oder zusätzlich vergütet werden. Manche Arbeitsverträge sehen pauschal eine gewisse Anzahl von Überstunden als "mit dem Gehalt abgegolten" vor — das ist rechtlich zulässig, solange der Mindestlohn eingehalten wird.</p>
              </div>
              <div className="faq-item">
                <h3>Wie berechne ich den Stundenlohn bei Teilzeit?</h3>
                <p>Das Prinzip ist identisch: Monatsbrutto geteilt durch (Wochenstunden × 4,333). Wenn Sie z.B. 20 Stunden pro Woche arbeiten und 1.800 € brutto verdienen, dann sind das 20 × 4,333 = 86,6 Stunden pro Monat. Ihr Stundenlohn beträgt dann 1.800 ÷ 86,6 = ca. 20,78 € brutto.</p>
              </div>
            </div>
          </main>

          <Sidebar />
        </div>
      </div>
    </>
  );
}
