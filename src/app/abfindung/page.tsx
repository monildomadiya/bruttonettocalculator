import React from "react";
import AbfindungClient from "./AbfindungClient";
import Sidebar from "@/components/Sidebar";

export default function AbfindungPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-wrap">
          <h1>Abfindungsrechner 2026</h1>
          <p>
            Berechnen Sie die Steuern auf Ihre Abfindung und Ihren finanziellen Vorteil durch die Fünftelregelung.
          </p>
        </div>
      </div>

      <div className="page-wrap">
        <div className="content-area">
          <main>
            <AbfindungClient />

            <div className="calc-card seo-section">
              <h2>Muss ich meine Abfindung versteuern?</h2>
              <p>
                Ja, eine Abfindung bei Kündigung oder Aufhebungsvertrag unterliegt vollständig der 
                <strong> Lohn- und Einkommensteuer</strong>. Im Gegensatz zum normalen Gehalt ist eine 
                "echte" Abfindung (wegen Verlusts des Arbeitsplatzes) jedoch <strong>sozialversicherungsfrei</strong>.
                Sie zahlen darauf also keine Beiträge zur Kranken-, Pflege-, Renten- und Arbeitslosenversicherung.
              </p>
              
              <h3>Die Steuerfalle: Progression</h3>
              <p>
                Da eine Abfindung meist in einer Summe ausgezahlt wird, erhöht sie das Jahreseinkommen in diesem Jahr extrem. 
                Durch die <strong>Steuerprogression</strong> in Deutschland (wer mehr verdient, zahlt prozentual mehr Steuern)
                würde ein Großteil der Abfindung sofort an das Finanzamt fließen. Um diese unfaire Härte zu mildern, 
                gibt es die Fünftelregelung.
              </p>
              
              <h3>Wie funktioniert die Fünftelregelung?</h3>
              <p>
                Bei der Fünftelregelung wird die Abfindung fiktiv auf fünf Jahre verteilt:
              </p>
              <ol>
                <li>Das Finanzamt berechnet die Steuer auf Ihr normales Jahresgehalt.</li>
                <li>Dann wird die Steuer berechnet, die anfallen würde, wenn Sie Ihr normales Gehalt plus <strong>genau ein Fünftel</strong> (20%) der Abfindung erhalten hätten.</li>
                <li>Die Differenz beider Beträge ist die Steuerbelastung für das eine Fünftel.</li>
                <li>Diese Differenz wird dann <strong>mit 5 multipliziert</strong>.</li>
              </ol>
              <p>
                Das Ergebnis: Die Steuerspitze wird gekappt. Sie zahlen weniger Steuern, als wenn die gesamte 
                Abfindung voll auf Ihr Jahresgehalt aufgeschlagen würde.
              </p>

              <h3>Voraussetzungen für die Fünftelregelung</h3>
              <p>
                Die Fünftelregelung wird nicht automatisch gewährt. Es gibt strenge Voraussetzungen:
              </p>
              <ul>
                <li><strong>Zusammenballung von Einkünften:</strong> Sie müssen im Jahr der Auszahlung (inklusive Abfindung) mehr verdienen, als Sie verdient hätten, wenn Sie das ganze Jahr normal weitergearbeitet hätten.</li>
                <li><strong>Einmalige Auszahlung:</strong> Die Abfindung muss grundsätzlich in einem Betrag in einem Kalenderjahr ausgezahlt werden (Teilauszahlungen in verschiedenen Jahren zerstören meist den Anspruch).</li>
                <li><strong>Arbeitgeberveranlassung:</strong> Die Abfindung muss eine Entschädigung für entgangene Einnahmen (Verlust des Arbeitsplatzes) sein.</li>
              </ul>
            </div>
          </main>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
