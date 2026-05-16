import React from "react";
import KrankengeldClient from "./KrankengeldClient";
import Sidebar from "@/components/Sidebar";

export default function KrankengeldPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-wrap">
          <h1>Krankengeldrechner 2026</h1>
          <p>
            Berechnen Sie kostenlos und sofort Ihr Netto-Krankengeld nach 6 Wochen Arbeitsunfähigkeit.
          </p>
        </div>
      </div>

      <div className="page-wrap">
        <div className="content-area">
          <main>
            <KrankengeldClient />

            <div className="calc-card seo-section">
              <h2>Wie wird das Krankengeld berechnet?</h2>
              <p>
                Wer wegen Krankheit länger als sechs Wochen arbeitsunfähig ist, erhält danach kein reguläres
                Gehalt mehr vom Arbeitgeber (Ende der Entgeltfortzahlung). Stattdessen springt die gesetzliche 
                Krankenkasse ein und zahlt das sogenannte <strong>Krankengeld</strong>.
              </p>
              
              <h3>Höhe des Krankengeldes</h3>
              <p>
                Die gesetzliche Regelung besagt: Das Krankengeld beträgt <strong>70 Prozent des regelmäßigen Bruttoentgelts</strong>, 
                darf aber <strong>90 Prozent des Nettoentgelts</strong> nicht übersteigen. Der niedrigere der beiden Werte 
                ist das Brutto-Krankengeld.
              </p>
              
              <h3>Beitragsbemessungsgrenze & Maximales Krankengeld</h3>
              <p>
                Es gibt eine absolute Obergrenze. Diese richtet sich nach der Beitragsbemessungsgrenze (BBG) der 
                Krankenversicherung. Das Brutto-Krankengeld ist auf 70 Prozent der tagesaktuellen BBG gedeckelt. 
                Somit gibt es ein gesetzliches Maximal-Krankengeld, unabhängig davon, wie hoch Ihr eigentliches 
                Gehalt war.
              </p>

              <h3>Abzüge vom Krankengeld</h3>
              <p>
                Auch vom Krankengeld müssen Sozialversicherungsbeiträge abgeführt werden. Allerdings müssen Sie 
                keine Krankenversicherungsbeiträge mehr zahlen. Abgezogen werden (Arbeitnehmeranteil):
              </p>
              <ul>
                <li><strong>Rentenversicherung:</strong> 9,30 %</li>
                <li><strong>Arbeitslosenversicherung:</strong> 1,30 %</li>
                <li><strong>Pflegeversicherung:</strong> 1,70 % (plus 0,6 % Zuschlag für Kinderlose ab 23 Jahren)</li>
              </ul>
              
              <h3>Muss ich Krankengeld versteuern?</h3>
              <p>
                Das Krankengeld selbst ist <strong>steuerfrei</strong>. Allerdings unterliegt es dem sogenannten 
                <strong>Progressionsvorbehalt</strong>. Das bedeutet: Es erhöht den persönlichen Steuersatz für Ihr 
                übriges Einkommen im selben Kalenderjahr. Wer im Jahr mehr als 410 Euro Lohnersatzleistungen 
                (wie Krankengeld, Kurzarbeitergeld, Elterngeld) bezieht, ist zur Abgabe einer Einkommensteuererklärung verpflichtet.
              </p>
            </div>
          </main>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
