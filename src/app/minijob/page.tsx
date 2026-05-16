import React from "react";
import Sidebar from "@/components/Sidebar";
import MinijobClient from "./MinijobClient";
import { YEAR, NEXT_YEAR, SITE_URL } from "@/lib/seo";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: `Wie hoch ist die Minijob-Grenze ${YEAR}?`,
      acceptedAnswer: { "@type": "Answer", text: `Die Minijob-Verdienstgrenze beträgt seit Oktober 2022 dynamisch 556 Euro pro Monat (${YEAR}). Sie ist an den gesetzlichen Mindestlohn gekoppelt und kann sich jährlich anpassen.` },
    },
    {
      "@type": "Question",
      name: "Muss ich als Minijobber Steuern zahlen?",
      acceptedAnswer: { "@type": "Answer", text: "In der Regel nicht. Der Arbeitgeber zahlt eine Pauschsteuer von 2% an die Minijob-Zentrale. Sie als Arbeitnehmer erhalten das Bruttogehalt als Netto ausgezahlt – also ohne Lohnsteuerabzug." },
    },
    {
      "@type": "Question",
      name: "Was zahlt der Arbeitgeber beim Minijob?",
      acceptedAnswer: { "@type": "Answer", text: "Der Arbeitgeber zahlt: 13% Pauschalbeitrag zur Krankenversicherung, 15% zur Rentenversicherung, 2% Pauschsteuer, sowie Umlagen (U1, U2) und Insolvenzgeldumlage. Insgesamt ca. 30-31% des Bruttolohns." },
    },
    {
      "@type": "Question",
      name: "Lohnt sich die Rentenversicherungsoption beim Minijob?",
      acceptedAnswer: { "@type": "Answer", text: "Ja, in den meisten Fällen. Durch den freiwilligen Aufstockungsbeitrag auf 18,6% erwerben Sie vollwertige Rentenpunkte, haben Zugang zu allen Rehabilitationsleistungen und verkürzen die Wartezeit für bestimmte Rentenarten. Der monatliche Eigenanteil beträgt nur wenige Euro." },
    },
    {
      "@type": "Question",
      name: "Kann ich mehrere Minijobs gleichzeitig haben?",
      acceptedAnswer: { "@type": "Answer", text: "Grundsätzlich ja, aber die Verdienste werden addiert. Übersteigt die Summe aller Minijobs 556 Euro pro Monat, wird der gesamte Betrag sozialversicherungspflichtig. Ausnahme: Ein Minijob plus Hauptjob sind in der Regel kombinierbar." },
    },
  ],
};

export default function MinijobPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="page-hero">
        <div className="page-wrap">
          <h1>Minijob Rechner {YEAR} – Verdienstgrenze & Abgaben berechnen</h1>
          <p>Überprüfen Sie Ihr Gehalt gegen die 556-€-Grenze, berechnen Sie Arbeitgeberbeiträge & sehen Sie Ihre Optionen zur Rentenversicherung.</p>
        </div>
      </div>

      <div className="page-wrap">
        <div className="content-area">
          <main>
            <MinijobClient />

            <div className="seo-section">
              <h2>Minijob Rechner {YEAR}: Alles zur geringfügigen Beschäftigung</h2>
              <p>
                Ein <strong>Minijob</strong> – offiziell <em>geringfügige Beschäftigung</em> – ist eine der beliebtesten Beschäftigungsformen in Deutschland.
                Über 7 Millionen Menschen arbeiten {YEAR} als Minijobber. Unser <strong>Minijob Rechner {YEAR}</strong> zeigt Ihnen auf einen Blick,
                ob Ihr Verdienst innerhalb der Grenze liegt, was der Arbeitgeber zahlt und welche Abzüge für Sie anfallen.
              </p>

              <h3>Die Minijob-Verdienstgrenze {YEAR}</h3>
              <p>
                Seit Oktober 2022 ist die Minijob-Grenze dynamisch an den gesetzlichen Mindestlohn gekoppelt.
                Die Formel lautet: <strong>Mindestlohn × 130 Arbeitsstunden/Monat</strong>.
                Bei einem Mindestlohn von 12,82 €/Stunde ({YEAR}) ergibt das eine Grenze von rund <strong>556 Euro pro Monat</strong>.
                Diese Grenze kann sich zum 1. Januar jedes Jahres ändern, wenn der Mindestlohn steigt.
              </p>

              <h3>Was zahlt der Arbeitgeber? (Übersicht {YEAR})</h3>
              <div className="table-wrap">
                <table className="seo-table">
                  <thead>
                    <tr><th>Abgabe</th><th>Satz</th><th>Träger</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Pauschalbeitrag Krankenversicherung</td><td>13,0 %</td><td>Arbeitgeber</td></tr>
                    <tr><td>Pauschalbeitrag Rentenversicherung</td><td>15,0 %</td><td>Arbeitgeber</td></tr>
                    <tr><td>Pauschalsteuer (statt Lohnsteuer)</td><td>2,0 %</td><td>Arbeitgeber</td></tr>
                    <tr><td>Umlage U1 (Krankheit)</td><td>0,9 %</td><td>Arbeitgeber</td></tr>
                    <tr><td>Umlage U2 (Mutterschaft)</td><td>0,3 %</td><td>Arbeitgeber</td></tr>
                    <tr><td>Insolvenzgeldumlage</td><td>0,12 %</td><td>Arbeitgeber</td></tr>
                    <tr><td><strong>Gesamt-Abgabenlast AG</strong></td><td><strong>ca. 31,3 %</strong></td><td>Arbeitgeber</td></tr>
                  </tbody>
                </table>
              </div>

              <h3>Was zahlt der Arbeitnehmer beim Minijob?</h3>
              <p>
                Als Minijobber zahlen Sie in der Regel <strong>keine Kranken-, Arbeitslosen- oder Pflegeversicherungsbeiträge</strong>.
                Bei der Rentenversicherung sind Sie automatisch rentenversicherungspflichtig, können sich aber befreien lassen (Antrag beim Arbeitgeber).
                Alternativ können Sie freiwillig auf den vollen Beitragssatz von 18,6% aufstocken – das lohnt sich langfristig für die Rente.
              </p>

              <h3>Umfassendes FAQ zum Minijob {YEAR}</h3>
              <div className="faq-item">
                <h3>Wie viele Stunden darf ich als Minijobber arbeiten?</h3>
                <p>Eine Stundenbegrenzung gibt es nicht – die 556-€-Grenze gilt für den Verdienst, nicht für die Stunden. Bei Mindestlohn (12,82 €/h) wären das rein rechnerisch ca. 43 Stunden pro Monat.</p>
              </div>
              <div className="faq-item">
                <h3>Verliere ich meinen Minijob-Status, wenn ich einmal mehr verdiene?</h3>
                <p>Nicht sofort. Gelegentliche Überschreitungen (max. 2× im Jahr, unvorhersehbar) sind erlaubt. Dauerhaftes Überschreiten macht den Job sozialversicherungspflichtig.</p>
              </div>
              <div className="faq-item">
                <h3>Muss ich den Minijob beim Finanzamt angeben?</h3>
                <p>Wenn der Arbeitgeber die 2% Pauschsteuer übernimmt: Nein, der Minijob muss nicht in der Steuererklärung angegeben werden. Wird er individuell versteuert, muss er angegeben werden.</p>
              </div>
              <div className="faq-item">
                <h3>Habe ich als Minijobber Anspruch auf Urlaub?</h3>
                <p>Ja! Das Bundesurlaubsgesetz gilt auch für Minijobber. Bei 5 Arbeitstagen/Woche stehen Ihnen mindestens 24 Werktage (4 Wochen) Urlaub pro Jahr zu – anteilig bei weniger Tagen.</p>
              </div>
            </div>
          </main>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
