import React from "react";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Impressum | bruttonettocalculator.com",
  description: "Impressum und rechtliche Angaben für den Gehaltsrechnerdienst bruttonettocalculator.com gemäß § 5 TMG.",
  robots: "noindex, follow",
};

export default function ImpressumPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-wrap">
          <h1>Impressum</h1>
          <p>Gesetzliche Anbieterkennung und rechtliche Hinweise.</p>
        </div>
      </div>
      
      <div className="page-wrap">
        <div className="content-area">
          <main>
            <div className="calc-card seo-section">
              <section>
                <h2>Angaben gemäß § 5 TMG</h2>
                <p>
                  bruttonettocalculator.com Informationsportal<br />
                  Musterstraße 12<br />
                  10115 Berlin<br />
                  Deutschland
                </p>
              </section>

              <section>
                <h2>Vertreten durch</h2>
                <p>Dr. Finanz Muster (Geschäftsführung)</p>
              </section>

              <section>
                <h2>Kontakt</h2>
                <p>
                  Telefon: +49 (0) 30 12345678<br />
                  E-Mail: kontakt@bruttonettocalculator.com<br />
                  Web: https://bruttonettocalculator.com
                </p>
              </section>

              <section>
                <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
                <p>
                  Dr. Finanz Muster<br />
                  Musterstraße 12<br />
                  10115 Berlin
                </p>
              </section>

              <section>
                <h2>Haftungsausschluss (Disclaimer)</h2>
                <p>
                  <strong>Haftung für Inhalte:</strong> Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
                <p>
                  <strong>Keine steuerliche oder rechtliche Beratung:</strong> Die auf dieser Website bereitgestellten Rechner und Informationen basieren auf allgemeinen Formeln und Erlassen. Sie stellen keine verbindliche rechtliche oder steuerliche Beratung dar und können eine fachkundige Beratung durch einen Steuerberater oder Rechtsanwalt nicht ersetzen.
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
