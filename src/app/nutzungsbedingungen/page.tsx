import React from "react";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Nutzungsbedingungen | bruttonettocalculator",
  description: "Nutzungsbedingungen und rechtliche Hinweise zur Nutzung von bruttonettocalculator.com – Ihrem kostenlosen Gehaltsrechner für Deutschland.",
  robots: "noindex, follow",
};

const YEAR = new Date().getFullYear();

export default function NutzungsbedingungenPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-wrap">
          <h1>Nutzungsbedingungen</h1>
          <p>Stand: Januar {YEAR}</p>
        </div>
      </div>
      
      <div className="page-wrap">
        <div className="content-area">
          <main>
            <div className="calc-card seo-section">
              {[
                {
                  title: "1. Geltungsbereich",
                  content: `Diese Nutzungsbedingungen gelten für die Nutzung der Website bruttonettocalculator.com (nachfolgend „Plattform") und alle damit verbundenen Dienste und Inhalte. Mit dem Zugriff auf die Plattform akzeptieren Sie diese Bedingungen. Wenn Sie mit diesen Bedingungen nicht einverstanden sind, bitten wir Sie, die Plattform nicht zu nutzen.`,
                },
                {
                  title: "2. Leistungsbeschreibung",
                  content: `bruttonettocalculator.com stellt kostenlose Online-Rechner für die Berechnung von Brutto- und Nettogehältern, Lohnsteuer, Sozialabgaben und verwandten Finanzthemen nach deutschem Recht zur Verfügung. Alle Berechnungen sind unverbindlich und dienen ausschließlich der Orientierung.`,
                },
                {
                  title: "3. Kein Ersatz für Fachberatung",
                  content: `Die auf dieser Plattform bereitgestellten Berechnungen, Texte und Informationen stellen keine steuerliche, rechtliche oder finanzielle Beratung dar und ersetzen diese nicht. Für individuelle, verbindliche Auskünfte zu Ihrer persönlichen Steuersituation wenden Sie sich bitte an einen zugelassenen Steuerberater oder Rechtsanwalt. bruttonettocalculator.com übernimmt keine Haftung für Entscheidungen, die auf Basis der bereitgestellten Informationen getroffen werden.`,
                },
                {
                  title: "4. Genauigkeit der Berechnungen",
                  content: `Wir bemühen uns, alle Berechnungsformeln aktuell und korrekt zu halten. Da sich steuerliche Regelungen regelmäßig ändern, können wir jedoch keine Garantie für die vollständige Richtigkeit und Aktualität der Ergebnisse übernehmen. Die Ergebnisse können von den tatsächlichen, durch das Finanzamt ermittelten Werten abweichen.`,
                },
                {
                  title: "5. Datenschutz",
                  content: `Die Nutzung unserer Rechner erfolgt ohne Eingabe persönlicher Daten. Alle Berechnungen werden lokal in Ihrem Browser durchgeführt. Weitere Informationen zu Datenschutz und Cookies finden Sie in unserer Datenschutzerklärung.`,
                },
                {
                  title: "6. Geistiges Eigentum",
                  content: `Alle Inhalte dieser Plattform – einschließlich Texte, Grafiken, Code und Rechnerlogik – sind urheberrechtlich geschützt. Eine Vervielfältigung, Verbreitung oder Bearbeitung ohne ausdrückliche schriftliche Genehmigung von bruttonettocalculator.com ist nicht gestattet. Links auf diese Plattform sind ausdrücklich erlaubt.`,
                },
                {
                  title: "7. Haftungsausschluss",
                  content: `bruttonettocalculator.com haftet nicht für Schäden, die durch die Nutzung oder Nicht-Nutzung der bereitgestellten Informationen entstehen. Die Plattform wird „wie besehen" bereitgestellt, ohne Garantien jeglicher Art. Wir behalten uns das Recht vor, Inhalte jederzeit zu ändern, zu ergänzen oder zu löschen.`,
                },
                {
                  title: "8. Externe Links",
                  content: `Diese Plattform kann Links zu externen Websites Dritter enthalten. Für deren Inhalte und Datenschutzpraktiken übernehmen wir keine Verantwortung. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft; eine permanente inhaltliche Kontrolle ist ohne konkrete Anhaltspunkte nicht zumutbar.`,
                },
                {
                  title: "9. Änderungen der Nutzungsbedingungen",
                  content: `Wir behalten uns das Recht vor, diese Nutzungsbedingungen jederzeit zu ändern. Die jeweils aktuelle Version ist auf dieser Seite abrufbar. Die weitere Nutzung der Plattform nach einer Änderung gilt als Zustimmung zu den geänderten Bedingungen.`,
                },
                {
                  title: "10. Anwendbares Recht und Gerichtsstand",
                  content: `Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich zulässig, Berlin, Deutschland.`,
                },
              ].map((section) => (
                <section key={section.title}>
                  <h2>{section.title}</h2>
                  <p>{section.content}</p>
                </section>
              ))}

              <div style={{ background: "var(--bg-result)", border: "1px solid var(--border-color)", padding: "16px", fontSize: "14px", color: "var(--text-body)", marginTop: "32px" }}>
                Bei Fragen zu diesen Nutzungsbedingungen wenden Sie sich an:{" "}
                <a href="mailto:kontakt@bruttonettocalculator.com" style={{ color: "var(--accent)" }}>
                  kontakt@bruttonettocalculator.com
                </a>
              </div>
            </div>
          </main>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
