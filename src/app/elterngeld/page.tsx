import React from "react";
import Sidebar from "@/components/Sidebar";
import ElterngeldClient from "./ElterngeldClient";
import { YEAR } from "@/lib/seo";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: `Wie hoch ist das Elterngeld ${YEAR}?`, acceptedAnswer: { "@type": "Answer", text: `Das Basiselterngeld beträgt ${YEAR} zwischen 300 Euro (Minimum) und 1.800 Euro (Maximum) pro Monat. Es berechnet sich mit 65–67% des durchschnittlichen Nettoeinkommens der letzten 12 Monate vor der Geburt.` } },
    { "@type": "Question", name: "Was ist der Unterschied zwischen Elterngeld und ElterngeldPlus?", acceptedAnswer: { "@type": "Answer", text: "Basiselterngeld wird maximal 14 Monate (12 + 2 Partnermonate) gezahlt. ElterngeldPlus hat die doppelte Laufzeit (bis 28 Monate), aber nur den halben monatlichen Betrag – ideal für Teilzeit-Rückkehrer." } },
    { "@type": "Question", name: "Welches Einkommen wird für das Elterngeld berücksichtigt?", acceptedAnswer: { "@type": "Answer", text: "Das durchschnittliche Nettoeinkommen der letzten 12 Kalendermonate vor dem Geburtsmonat. Monate mit Mutterschaftsgeld, Kurzarbeitergeld oder Krankengeld werden herausgerechnet und durch frühere Monate ersetzt." } },
    { "@type": "Question", name: "Wann muss ich Elterngeld beantragen?", acceptedAnswer: { "@type": "Answer", text: "Elterngeld kann rückwirkend für bis zu 3 Monate beantragt werden. Es wird empfohlen, den Antrag direkt nach der Geburt zu stellen – am besten innerhalb der ersten 2-3 Monate." } },
    { "@type": "Question", name: "Wird Elterngeld auf ALG II (Bürgergeld) angerechnet?", acceptedAnswer: { "@type": "Answer", text: "Seit 2011 wird Elterngeld grundsätzlich vollständig auf Bürgergeld (früher ALG II) angerechnet. Ausnahme: der Mindestbetrag von 300 Euro sowie Elterngeld von Eltern, die vor der Geburt nicht berufstätig waren." } },
  ],
};

export default function ElterngeldPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="page-hero">
        <div className="page-wrap">
          <h1>Elterngeld Rechner {YEAR} – Basis-Elterngeld & ElterngeldPlus berechnen</h1>
          <p>Berechnen Sie Ihr monatliches Elterngeld aus dem Nettoeinkommen – inklusive ElterngeldPlus, Geschwisterbonus und Mehrlingszuschlag. Kostenlos & sofort.</p>
        </div>
      </div>

      <div className="page-wrap">
        <div className="content-area">
          <main>
            <ElterngeldClient />

            <div className="seo-section">
              <h2>Elterngeld {YEAR}: Alles zu Höhe, Dauer & Berechnung</h2>
              <p>
                Das <strong>Elterngeld</strong> ist eine staatliche Leistung nach dem <em>Bundeselterngeld- und Elternzeitgesetz (BEEG)</em>, die Eltern nach der Geburt eines Kindes finanziell absichert.
                Mit unserem <strong>Elterngeld Rechner {YEAR}</strong> berechnen Sie schnell und einfach Ihren voraussichtlichen monatlichen Anspruch.
              </p>

              <h3>Elterngeld Höhe {YEAR} – Übersicht</h3>
              <div className="table-wrap">
                <table className="seo-table">
                  <thead>
                    <tr><th>Nettoeinkommen</th><th>Ersatzrate</th><th>Monatliches Elterngeld</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>unter 1.000 €</td><td>bis 100 %</td><td>300 € – 1.000 €</td></tr>
                    <tr><td>1.000 – 1.200 €</td><td>67 %</td><td>670 € – 804 €</td></tr>
                    <tr><td>1.200 – 1.800 €</td><td>67 % → 65 % (gleitend)</td><td>804 € – 1.170 €</td></tr>
                    <tr><td>1.800 – 2.770 €</td><td>65 %</td><td>1.170 € – 1.800 €</td></tr>
                    <tr><td>über 2.770 €</td><td>65 % (gedeckelt)</td><td>max. 1.800 €</td></tr>
                  </tbody>
                </table>
              </div>

              <h3>Basiselterngeld vs. ElterngeldPlus – Wann was wählen?</h3>
              <ul>
                <li><strong>Basiselterngeld</strong> eignet sich für Eltern, die ihre Erwerbstätigkeit komplett unterbrechen. Voller Betrag für bis zu 14 Monate.</li>
                <li><strong>ElterngeldPlus</strong> ist ideal, wenn beide Elternteile in Teilzeit zurückkehren wollen. Doppelte Laufzeit (28 Monate), halber Monatsbetrag – aber bei Teilzeitverdienst oft insgesamt mehr Leistung.</li>
                <li><strong>Partnerschaftsbonus:</strong> 4 zusätzliche ElterngeldPlus-Monate, wenn beide Eltern gleichzeitig 25–32 Stunden/Woche arbeiten.</li>
              </ul>

              <h3>Geschwisterbonus & Mehrlingszuschlag</h3>
              <p>
                <strong>Geschwisterbonus (+10%, mind. 75 €):</strong> Wenn im Haushalt ein Kind unter 3 Jahren oder zwei Kinder unter 6 Jahren leben.
                <strong>Mehrlingszuschlag (300 €/Kind):</strong> Ab dem zweiten Mehrlingskind wird ein Zuschlag von 300 Euro pro Monat gezahlt.
              </p>

              <h3>FAQ: Elterngeld {YEAR}</h3>
              <div className="faq-item">
                <h3>Kann ich Elterngeld und Teilzeitarbeit kombinieren?</h3>
                <p>Ja. Beim Basiselterngeld dürfen Sie bis zu 32 Stunden pro Woche arbeiten. Das Einkommen aus Teilzeit wird angerechnet und mindert das Elterngeld entsprechend. ElterngeldPlus ist speziell für diesen Fall konzipiert.</p>
              </div>
              <div className="faq-item">
                <h3>Wie lange wird Elterngeld maximal gezahlt?</h3>
                <p>Basiselterngeld: 12 Monate + 2 Partnermonate = 14 Monate. ElterngeldPlus: bis zu 28 Monate (+ bis zu 8 Monate Partnerschaftsbonus = max. 36 Monate).</p>
              </div>
              <div className="faq-item">
                <h3>Ist Elterngeld steuerpflichtig?</h3>
                <p>Elterngeld selbst ist steuerfrei (§ 3 Nr. 67 EStG), unterliegt aber dem Progressionsvorbehalt. Das bedeutet: Es erhöht den Steuersatz auf Ihre anderen Einkünfte und muss in der Steuererklärung angegeben werden.</p>
              </div>
            </div>
          </main>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
