import React from "react";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Über uns | bruttonettocalculator – Ihr kostenloser Gehaltsrechner",
  description:
    "Erfahren Sie mehr über bruttonettocalculator.com – Deutschlands präzise Online-Plattform für Brutto-Netto-Berechnungen, Lohnsteuer und Sozialabgaben.",
};

export default function UeberUnsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-wrap">
          <h1>Über uns</h1>
          <p>Wer steckt hinter bruttonettocalculator.com?</p>
        </div>
      </div>
      
      <div className="page-wrap">
        <div className="content-area">
          <main>
            <div className="calc-card seo-section">
              <section>
                <h2>Unsere Mission</h2>
                <p>
                  <strong>bruttonettocalculator.com</strong> wurde mit einem einzigen Ziel gegründet: Deutschen Arbeitnehmerinnen und Arbeitnehmern ein zuverlässiges, schnelles und komplett kostenloses Werkzeug zur Hand zu geben, um ihr tatsächliches Nettoeinkommen zu berechnen – ohne Anmeldung, ohne versteckte Kosten, ohne Werbetricks.
                </p>
                <p>
                  Das deutsche Lohnsteuersystem gehört zu den komplexesten der Welt. Steuerklassen, Beitragsbemessungsgrenzen, Solidaritätszuschlag, Kirchensteuer, PKV-Beiträge – für die meisten Menschen ist es nahezu unmöglich, ihr genaues Nettogehalt ohne Hilfsmittel zu ermitteln. Genau hier setzen wir an.
                </p>
              </section>

              <section>
                <h2>Was wir anbieten</h2>
                <p>
                  Unsere Plattform umfasst eine vollständige Suite an kostenlosen Finanz- und Gehaltsrechnern, die speziell auf das deutsche Steuer- und Sozialversicherungsrecht zugeschnitten sind:
                </p>
                <ul>
                  <li><strong>Brutto-Netto-Rechner</strong> – für alle 6 Steuerklassen, mit Kirchensteuer und PKV-Option</li>
                  <li><strong>Netto-Brutto-Rechner</strong> – Rückrechnung vom Wunsch-Netto zum notwendigen Brutto</li>
                  <li><strong>Stundenlohnrechner</strong> – Umrechnung von Monatsgehalt auf Stundenbasis</li>
                  <li><strong>Firmenwagenrechner</strong> – Geldwerter Vorteil nach 1%-, 0,5%- und 0,25%-Regelung</li>
                  <li><strong>Arbeitgeberrechner</strong> – Vollkosten eines Mitarbeiters inkl. Lohnnebenkosten</li>
                  <li><strong>Arbeitslosengeld-Rechner</strong> – ALG I Anspruch nach Steuerklasse</li>
                  <li><strong>Kurzarbeitergeld-Rechner</strong> – KUG nach 60% und 67% Satz</li>
                  <li><strong>Rentenrechner & Rentenpunkte-Rechner</strong></li>
                  <li><strong>Pendlerpauschale-Rechner</strong>, <strong>Schenkungssteuer-Rechner</strong>, <strong>Urlaubsgeld-Rechner</strong></li>
                </ul>
              </section>

              <section>
                <h2>Genauigkeit & Aktualität</h2>
                <p>
                  Alle Berechnungsformeln basieren auf den aktuellen gesetzlichen Regelungen und werden jährlich zu Beginn jedes Steuerjahres überprüft und angepasst. Wir orientieren uns dabei an den offiziellen Veröffentlichungen des Bundesministeriums der Finanzen (BMF) sowie der Deutschen Rentenversicherung.
                </p>
                <div style={{ background: "var(--bg-result)", border: "1px solid var(--border-color)", borderLeft: "3px solid var(--accent)", padding: "16px", fontSize: "14px", color: "var(--text-body)" }}>
                  <strong>Hinweis:</strong> Die Ergebnisse unserer Rechner dienen der Orientierung und ersetzen keine individuelle Steuerberatung. Für verbindliche Auskünfte wenden Sie sich bitte an einen zugelassenen Steuerberater.
                </div>
              </section>

              <section>
                <h2>Unsere Werte</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginTop: "16px" }}>
                  {[
                    { title: "🔓 Kostenlos & offen", text: "Alle Rechner sind dauerhaft kostenlos nutzbar. Keine Registrierung, kein Abo, keine versteckten Kosten." },
                    { title: "🔒 Datenschutz first", text: "Wir speichern keine persönlichen Eingabedaten. Alle Berechnungen erfolgen lokal im Browser." },
                    { title: "⚡ Geschwindigkeit", text: "Unsere Rechner liefern Ergebnisse in Echtzeit – ohne Ladezeiten, ohne Wartezeiten." },
                    { title: "🎯 Präzision", text: "Wir verwenden dieselben Formeln, die auch das Finanzamt nutzt – für maximale Genauigkeit." },
                  ].map((item) => (
                    <div key={item.title} style={{ background: "var(--bg-result)", border: "1px solid var(--border-color)", padding: "20px" }}>
                      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-heading)", margin: "0 0 8px 0" }}>{item.title}</h3>
                      <p style={{ fontSize: "14px", color: "var(--text-body)", margin: 0, lineHeight: "1.6" }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2>Kontakt</h2>
                <p>
                  Haben Sie Fragen, Feedback oder Hinweise auf Fehler? Wir freuen uns über Ihre Nachricht. Schreiben Sie uns an:{" "}
                  <a href="mailto:kontakt@bruttonettocalculator.com" style={{ color: "var(--accent)", textDecoration: "none" }}>
                    kontakt@bruttonettocalculator.com
                  </a>
                </p>
              </section>
            </div>
          </main>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
