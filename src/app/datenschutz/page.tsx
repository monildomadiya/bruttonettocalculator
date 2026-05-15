import React from "react";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Datenschutz | bruttonettocalculator.com",
  description: "Datenschutzerklärung für die Nutzung des Brutto-Netto-Rechners und Informationen über Google AdSense Cookies gemäß DSGVO.",
  robots: "noindex, follow",
};

export default function DatenschutzPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-wrap">
          <h1>Datenschutzerklärung</h1>
          <p>Transparenz über die Verarbeitung Ihrer Daten.</p>
        </div>
      </div>
      
      <div className="page-wrap">
        <div className="content-area">
          <main>
            <div className="calc-card seo-section">
              <section>
                <h2>1. Datenschutz auf einen Blick</h2>
                <p>
                  <strong>Allgemeine Hinweise:</strong> Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
                <p>
                  <strong>Datenerfassung auf dieser Website:</strong> Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Die Nutzung unseres Gehaltsrechners erfolgt grundsätzlich ohne die Speicherung von sensiblen Eingabedaten auf unseren Servern. Alle Berechnungen werden clientseitig (direkt in Ihrem Browser) durchgeführt.
                </p>
              </section>

              <section>
                <h2>2. Einbindung von Google AdSense</h2>
                <p>
                  Wir nutzen auf unserer Website Google AdSense, einen Dienst zum Einbinden von Werbeanzeigen der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland („Google").
                </p>
                <p>
                  Google AdSense verwendet sogenannte „Cookies", Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website ermöglichen. Google AdSense verwendet auch sogenannte Web Beacons (unsichtbare Grafiken). Durch diese Web Beacons können Informationen wie der Besucherverkehr auf diesen Seiten ausgewertet werden.
                </p>
                <p>
                  Die durch Cookies und Web Beacons erzeugten Informationen über die Benutzung dieser Website (einschließlich Ihrer IP-Adresse) und Auslieferung von Werbeformaten werden an einen Server von Google in den USA übertragen und dort gespeichert. Diese Informationen können von Google an Vertragspartner von Google weitergegeben werden.
                </p>
                <p>
                  Sie können die Installation der Cookies durch eine entsprechende Einstellung Ihrer Browser Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich nutzen können.
                </p>
              </section>

              <section>
                <h2>3. Server-Log-Dateien</h2>
                <p>
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul>
                  <li>Browsertyp und Browserversion</li>
                  <li>Verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse (anonymisiert)</li>
                </ul>
              </section>

              <section>
                <h2>4. Ihre Rechte (Auskunft, Löschung, Sperrung)</h2>
                <p>
                  Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an die im Impressum angegebene Adresse wenden.
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
