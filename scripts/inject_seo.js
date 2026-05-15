const fs = require('fs');
const path = require('path');

const basePath = "c:\\Users\\HP\\OneDrive\\Desktop\\BRUTO-NATO\\brutto-netto-rechner\\src\\app";

const seoData = {
  "rente": {
    faq: `[
      { "@type": "Question", "name": "Wie hoch wird meine Rente sein?", "acceptedAnswer": { "@type": "Answer", "text": "Die Rente berechnet sich aus den gesammelten Entgeltpunkten, dem Zugangsfaktor, dem aktuellen Rentenwert und dem Rentenartfaktor." } },
      { "@type": "Question", "name": "Wann kann ich abschlagsfrei in Rente gehen?", "acceptedAnswer": { "@type": "Answer", "text": "Die Regelaltersgrenze wird schrittweise auf 67 Jahre angehoben. Wer 45 Jahre Beiträge eingezahlt hat, kann früher abschlagsfrei in Rente gehen (Rente mit 63/65)." } },
      { "@type": "Question", "name": "Was ist die Rentenlücke?", "acceptedAnswer": { "@type": "Answer", "text": "Die Rentenlücke ist die Differenz zwischen Ihrem letzten Nettoeinkommen und der voraussichtlichen Nettorente. Sie zeigt, wie viel private Vorsorge nötig ist." } }
    ]`,
    html: `
            {/* SEO Article */}
            <div className="seo-section">
              <h2>Rentenrechner 2024: Voraussichtliche Rente berechnen</h2>
              <p>
                Mit unserem <strong>Rentenrechner</strong> können Sie schnell und einfach abschätzen, wie hoch Ihre zukünftige gesetzliche 
                Altersrente ausfallen wird. Die gesetzliche Rentenversicherung in Deutschland basiert auf dem Umlageverfahren, 
                wobei Ihre Beiträge direkt an die heutigen Rentner ausgezahlt werden. Im Gegenzug erwerben Sie Rentenansprüche, 
                die in sogenannten Entgeltpunkten (Rentenpunkten) gemessen werden.
              </p>

              <h3>Wie wird die Rente in Deutschland berechnet?</h3>
              <p>Die Rentenformel der Deutschen Rentenversicherung lautet: <strong>Monatliche Rente = Entgeltpunkte × Zugangsfaktor × Aktueller Rentenwert × Rentenartfaktor</strong>.</p>
              <ul>
                <li><strong>Entgeltpunkte (Rentenpunkte):</strong> Spiegelt Ihr Einkommen im Verhältnis zum Durchschnittseinkommen wider. Verdienen Sie genau den Durchschnitt, erhalten Sie 1,0 Punkte.</li>
                <li><strong>Zugangsfaktor:</strong> Berücksichtigt Zu- und Abschläge. Wer vorzeitig in Rente geht, erhält einen Abschlag von 0,3 % pro Monat. Bei regulärem Renteneintritt ist der Faktor 1,0.</li>
                <li><strong>Aktueller Rentenwert:</strong> Dies ist der Euro-Betrag, den ein Entgeltpunkt wert ist. Er wird jährlich zum 1. Juli an die Lohnentwicklung angepasst (seit Juli 2023 bundeseinheitlich 37,60 €).</li>
                <li><strong>Rentenartfaktor:</strong> Beträgt bei der Altersrente 1,0. Bei Witwen- oder Erwerbsminderungsrenten gelten andere Faktoren.</li>
              </ul>

              <h3>Was ist die Rentenlücke und wie schließe ich sie?</h3>
              <p>
                Die sogenannte <strong>Rentenlücke</strong> beschreibt die Differenz zwischen Ihrem letzten monatlichen Netto-Gehalt 
                und der tatsächlichen Rentenzahlung. Da das Rentenniveau (Sicherungsniveau vor Steuern) kontinuierlich sinkt und aktuell bei ca. 48 % liegt, 
                entsteht bei den meisten Arbeitnehmern eine erhebliche Versorgungslücke im Alter.
              </p>
              <p>Um diese Lücke zu schließen, ist eine <strong>private Altersvorsorge</strong> unerlässlich. Beliebte und staatlich geförderte Optionen sind:</p>
              <ul>
                <li><strong>Betriebliche Altersvorsorge (bAV):</strong> Entgeltumwandlung aus dem Bruttogehalt, oftmals mit Arbeitgeberzuschuss.</li>
                <li><strong>Riester-Rente / Rürup-Rente:</strong> Staatliche Zulagen oder steuerliche Vorteile, besonders für Familien und Besserverdiener.</li>
                <li><strong>Private ETF-Sparpläne:</strong> Flexibler Vermögensaufbau durch langfristige Investitionen am weltweiten Aktienmarkt.</li>
              </ul>
              
              <h3>Bruttorente vs. Nettorente</h3>
              <p>Vergessen Sie nicht: Die gesetzliche Rente wird brutto ausgewiesen. Im Rentenalter fallen Beiträge für die <strong>Kranken- und Pflegeversicherung der Rentner (KVdR)</strong> an. Zudem wird die Rente steuerpflichtig. Der steuerfreie Anteil sinkt für jeden neuen Rentenjahrgang, bis im Jahr 2040 die Rente zu 100 % der Einkommensteuer unterliegt.</p>
            </div>`
  },
  "rentenpunkte": {
    faq: `[
      { "@type": "Question", "name": "Wie berechnet man Rentenpunkte?", "acceptedAnswer": { "@type": "Answer", "text": "Ein Rentenpunkt entspricht dem Durchschnittsverdienst aller Versicherten in einem Jahr. Teilen Sie Ihr Jahresbrutto durch dieses Durchschnittsentgelt (z.B. 45.358 € in 2024), um Ihre Punkte zu erhalten." } },
      { "@type": "Question", "name": "Wie viel ist ein Rentenpunkt 2024 wert?", "acceptedAnswer": { "@type": "Answer", "text": "Seit Juli 2023 ist der Rentenwert in West und Ost angeglichen und beträgt bundeseinheitlich 37,60 Euro pro Monat." } }
    ]`,
    html: `
            {/* SEO Article */}
            <div className="seo-section">
              <h2>Rentenpunkte berechnen: Das System der Entgeltpunkte</h2>
              <p>
                Die gesetzliche Rente in Deutschland basiert auf einem Punktesystem. Jedes Jahr, in dem Sie sozialversicherungspflichtig arbeiten und Beiträge in die gesetzliche Rentenversicherung einzahlen, sammeln Sie <strong>Rentenpunkte</strong> (offiziell: Entgeltpunkte). Unser Rentenpunkte Rechner hilft Ihnen, die jährliche Ausbeute basierend auf Ihrem Bruttoeinkommen exakt zu ermitteln.
              </p>

              <h3>Was ist ein Rentenpunkt wert?</h3>
              <p>
                Ein Rentenpunkt repräsentiert genau das <strong>vorläufige Durchschnittsentgelt</strong> aller gesetzlich Rentenversicherten in einem bestimmten Kalenderjahr. 
                Für das Jahr 2024 wurde das vorläufige Durchschnittsentgelt in Deutschland auf <strong>45.358 Euro</strong> (West) festgelegt.
              </p>
              <ul>
                <li>Verdienen Sie im Jahr 2024 exakt 45.358 € brutto, erhalten Sie exakt <strong>1,0 Rentenpunkte</strong>.</li>
                <li>Verdienen Sie die Hälfte (22.679 €), erhalten Sie <strong>0,5 Rentenpunkte</strong>.</li>
                <li>Verdienen Sie das Doppelte, erhalten Sie <strong>2,0 Rentenpunkte</strong> (allerdings limitiert durch die Beitragsbemessungsgrenze).</li>
              </ul>

              <h3>Der aktuelle Rentenwert</h3>
              <p>
                Der gesammelte Punktwert wird beim Renteneintritt mit dem <strong>aktuellen Rentenwert</strong> multipliziert. Seit der Rentenanpassung im Juli 2023 gibt es keine Unterschiede mehr zwischen Ost- und Westdeutschland. Ein Rentenpunkt bringt aktuell eine monatliche Bruttorente von <strong>37,60 Euro</strong>.
              </p>
              
              <h3>Begrenzung durch die Beitragsbemessungsgrenze (BBG)</h3>
              <p>
                Sie können nicht unendlich viele Rentenpunkte pro Jahr sammeln. Das Einkommen, auf das Rentenversicherungsbeiträge fällig werden, ist durch die <strong>Beitragsbemessungsgrenze</strong> gedeckelt (2024: 90.600 € in den alten, 89.400 € in den neuen Bundesländern). Dadurch liegt das Maximum bei knapp etwas über 2 Entgeltpunkten pro Jahr. Einkommen oberhalb dieser Grenze generieren keine weiteren Rentenansprüche, sind aber auch beitragsfrei.
              </p>
            </div>`
  },
  "arbeitgeber": {
    faq: `[
      { "@type": "Question", "name": "Was kosten Mitarbeiter den Arbeitgeber wirklich?", "acceptedAnswer": { "@type": "Answer", "text": "Arbeitgeber zahlen zusätzlich zum Bruttolohn etwa 20,7% an Lohnnebenkosten (Sozialversicherungsbeiträge und Umlagen)." } },
      { "@type": "Question", "name": "Was gehört zu den Arbeitgeberanteilen?", "acceptedAnswer": { "@type": "Answer", "text": "Kranken-, Renten-, Arbeitslosen- und Pflegeversicherung werden paritätisch geteilt. Zudem trägt der AG die Umlagen U1, U2 und U3 allein." } }
    ]`,
    html: `
            {/* SEO Article */}
            <div className="seo-section">
              <h2>Arbeitgeberrechner 2024: Lohnnebenkosten exakt ermitteln</h2>
              <p>
                Wenn Sie Personal einstellen, ist das Bruttogehalt, das im Arbeitsvertrag steht, nicht identisch mit Ihren tatsächlichen 
                Personalkosten (Arbeitgeberbelastung). Unser <strong>Arbeitgeberrechner</strong> zeigt transparent, wie hoch die 
                gesetzlichen <strong>Lohnnebenkosten</strong> und Arbeitgeberanteile zur Sozialversicherung ausfallen. Im Durchschnitt 
                müssen Arbeitgeber auf das Bruttogehalt etwa 20 bis 21 Prozent an Nebenkosten aufschlagen.
              </p>

              <h3>Zusammensetzung der Arbeitgeberanteile (Lohnnebenkosten)</h3>
              <p>
                Das deutsche Sozialversicherungssystem ist grundsätzlich paritätisch finanziert. Das bedeutet, dass sich Arbeitgeber 
                und Arbeitnehmer die Beiträge zur Sozialversicherung teilen. Für den Arbeitgeber fallen folgende Kosten an (Werte für 2024):
              </p>
              <ul>
                <li><strong>Rentenversicherung (RV):</strong> 9,30 % (die Hälfte vom 18,6 % Gesamtbeitrag)</li>
                <li><strong>Arbeitslosenversicherung (AV):</strong> 1,30 % (die Hälfte vom 2,6 % Gesamtbeitrag)</li>
                <li><strong>Krankenversicherung (KV):</strong> 7,30 % zuzüglich der Hälfte des kassenindividuellen Zusatzbeitrags (durchschnittlich 0,85 %).</li>
                <li><strong>Pflegeversicherung (PV):</strong> 1,70 % (Sonderregelungen gelten in Sachsen).</li>
              </ul>

              <h3>Umlagen: U1, U2 und Insolvenzgeldumlage (U3)</h3>
              <p>
                Zusätzlich zu den klassischen SV-Beiträgen muss der Arbeitgeber Pflichtabgaben leisten, die der Arbeitnehmer nicht auf 
                seiner Lohnabrechnung sieht. Diese Umlagen finanzieren kollektive Risiken:
              </p>
              <ul>
                <li><strong>U1 (Lohnfortzahlung im Krankheitsfall):</strong> Sichert Betriebe bis 30 Mitarbeiter ab. Der Beitragssatz variiert je nach Krankenkasse.</li>
                <li><strong>U2 (Mutterschaftsgeld):</strong> Wird von allen Unternehmen gezahlt und erstattet Aufwendungen nach dem Mutterschutzgesetz.</li>
                <li><strong>U3 (Insolvenzgeldumlage):</strong> Sichert die Löhne der Mitarbeiter ab, falls das Unternehmen insolvent wird (2024: 0,06 %).</li>
              </ul>

              <h3>Beitragsbemessungsgrenzen berücksichtigen</h3>
              <p>
                Lohnnebenkosten steigen nicht unendlich. Verdient ein Mitarbeiter mehr als die Beitragsbemessungsgrenze (z. B. 62.100 € jährlich für die Krankenversicherung), bleibt der absolute Beitrag gedeckelt. Dadurch sinkt prozentual gesehen die Lohnzusatzbelastung bei Besserverdienern leicht ab.
              </p>
            </div>`
  },
  "pendlerpauschale": {
    faq: `[
      { "@type": "Question", "name": "Wie hoch ist die Pendlerpauschale 2024?", "acceptedAnswer": { "@type": "Answer", "text": "Für die ersten 20 km gibt es 30 Cent. Ab dem 21. Kilometer steigt die Entfernungspauschale auf 38 Cent pro Kilometer." } },
      { "@type": "Question", "name": "Werden Hin- und Rückfahrt berechnet?", "acceptedAnswer": { "@type": "Answer", "text": "Nein, die Pendlerpauschale gilt als Entfernungspauschale und wird nur für die einfache Wegstrecke (Hinweg) einmal pro Arbeitstag gewährt." } }
    ]`,
    html: `
            {/* SEO Article */}
            <div className="seo-section">
              <h2>Pendlerpauschale Rechner 2024: Werbungskosten absetzen</h2>
              <p>
                Die <strong>Pendlerpauschale</strong> (offiziell: Entfernungspauschale) ist einer der wichtigsten Hebel in der 
                Einkommensteuererklärung, um Steuern zu sparen. Unser Rechner ermittelt sekundenschnell, welchen Betrag Sie als 
                Werbungskosten für Ihren Arbeitsweg beim Finanzamt geltend machen können.
              </p>

              <h3>Staffelung der Entfernungspauschale 2024/2025</h3>
              <p>
                Der Gesetzgeber hat die Pauschale für Fernpendler aufgrund der gestiegenen Mobilitätskosten (Sprit, CO2-Bepreisung) angehoben:
              </p>
              <ul>
                <li><strong>Kilometer 1 bis 20:</strong> Für die ersten zwanzig Kilometer der einfachen Wegstrecke gelten pauschal <strong>0,30 Euro</strong>.</li>
                <li><strong>Ab dem 21. Kilometer:</strong> Jeder weitere Kilometer wird mit dem erhöhten Satz von <strong>0,38 Euro</strong> berechnet.</li>
              </ul>

              <h3>Wichtige Regeln für die Steuererklärung</h3>
              <p>Um die Pendlerpauschale korrekt in der Anlage N der Steuererklärung einzutragen, gelten klare Regeln:</p>
              <ul>
                <li><strong>Einfache Wegstrecke:</strong> Es zählt immer nur die einfache Strecke (der Hinweg), nicht die Hin- und Rückfahrt zusammen.</li>
                <li><strong>Kürzeste Straßenverbindung:</strong> Das Finanzamt erkennt grundsätzlich nur die kürzeste Straßenverbindung zwischen Wohnung und erster Tätigkeitsstätte an. Eine längere, verkehrsgünstigere Route darf nur angesetzt werden, wenn sie offensichtlich zeitsparender ist.</li>
                <li><strong>Unabhängig vom Verkehrsmittel:</strong> Die Entfernungspauschale ist verkehrsmittelunabhängig. Egal ob Sie mit dem Auto, dem Fahrrad, der Bahn oder zu Fuß zur Arbeit kommen – der Cent-Betrag steht Ihnen zu.</li>
                <li><strong>Homeoffice-Tage abziehen:</strong> Sie dürfen nur die Tage angeben, an denen Sie tatsächlich in die Firma gefahren sind. In der Regel geht das Finanzamt bei einer 5-Tage-Woche von 220 bis 230 Arbeitstagen aus. Tage im Homeoffice, Urlaub oder bei Krankheit sind abzuziehen. Für Homeoffice-Tage können Sie stattdessen die Homeoffice-Pauschale (6 Euro pro Tag) nutzen.</li>
              </ul>

              <h3>Wie viel Geld bekomme ich tatsächlich zurück?</h3>
              <p>
                Die Pendlerpauschale ist keine direkte Gutschrift auf Ihr Konto, sondern <strong>mindert Ihr zu versteuerndes Einkommen</strong>. 
                Errechnen Sie eine Pauschale von 1.500 Euro, wird dieser Betrag von Ihrem Bruttolohn abgezogen. Die Steuerersparnis hängt 
                somit von Ihrem persönlichen Grenzsteuersatz ab. Bei einem Steuersatz von 30 % würden 1.500 Euro Werbungskosten eine 
                Rückerstattung von rund 450 Euro bewirken.
              </p>
            </div>`
  },
  "schenkungssteuer": {
    faq: `[
      { "@type": "Question", "name": "Wann ist eine Schenkung steuerfrei?", "acceptedAnswer": { "@type": "Answer", "text": "Wenn sie unterhalb der gesetzlichen Freibeträge liegt: 500.000 € für Ehepartner, 400.000 € für Kinder und 200.000 € für Enkel. Dieser Freibetrag erneuert sich alle 10 Jahre." } },
      { "@type": "Question", "name": "Was ist der Unterschied zwischen Erbschafts- und Schenkungssteuer?", "acceptedAnswer": { "@type": "Answer", "text": "Es gibt keinen! Die Freibeträge und Steuersätze im Erbschaftsteuer- und Schenkungsteuergesetz (ErbStG) sind identisch. Eine Schenkung ist quasi ein vorweggenommenes Erbe." } }
    ]`,
    html: `
            {/* SEO Article */}
            <div className="seo-section">
              <h2>Schenkungssteuer Rechner: Steuern bei Geld- & Immobilien-Schenkungen</h2>
              <p>
                Wer Vermögen schon zu Lebzeiten an die nächste Generation überträgt, tut dies oft, um spätere Erbschaftssteuern zu vermeiden. 
                Mit unserem <strong>Schenkungssteuer Rechner</strong> berechnen Sie sofort, wie viel Steuer für Geldgeschenke, Wertpapiere 
                oder übertragene Immobilien anfällt. Das deutsche Recht behandelt Schenkungen und Erbschaften steuerlich nahezu identisch 
                (im ErbStG geregelt).
              </p>

              <h3>Die Steuerklassen bei Schenkungen</h3>
              <p>
                Wie viel Steuern anfallen, hängt vom Verwandtschaftsgrad ab. Das Gesetz teilt Empfänger in drei Steuerklassen ein (nicht zu verwechseln mit den Lohnsteuerklassen!):
              </p>
              <ul>
                <li><strong>Steuerklasse I:</strong> Ehegatten, eingetragene Lebenspartner, Kinder, Stiefkinder, Enkel und Urenkel. Hier gelten die höchsten Freibeträge und die niedrigsten Steuersätze (7 % bis 30 %).</li>
                <li><strong>Steuerklasse II:</strong> Eltern, Geschwister, Nichten, Neffen, Schwiegerkinder. Die Freibeträge sind drastisch geringer (20.000 €), der Steuersatz liegt zwischen 15 % und 43 %.</li>
                <li><strong>Steuerklasse III:</strong> Alle übrigen Personen (z.B. Lebensgefährten ohne Trauschein, Freunde). Auch hier gilt nur ein Freibetrag von 20.000 €, die Steuersätze sind extrem hoch (30 % bis 50 %).</li>
              </ul>

              <h3>Freibeträge klug nutzen (Die 10-Jahres-Frist)</h3>
              <p>
                Der wohl größte Vorteil der Schenkung gegenüber der Vererbung ist die <strong>10-Jahres-Frist</strong>. 
                Jeder Freibetrag kann alle 10 Jahre komplett neu in Anspruch genommen werden. So lässt sich durch frühzeitige 
                Planung auch ein sehr großes Millionenvermögen steuerfrei übertragen.
              </p>
              <ul>
                <li><strong>Ehegatten / Lebenspartner:</strong> 500.000 € steuerfrei alle 10 Jahre.</li>
                <li><strong>Kinder (auch Adoptiv- und Stiefkinder):</strong> 400.000 € steuerfrei pro Elternteil (d.h. Mutter und Vater können zusammen 800.000 € schenken).</li>
                <li><strong>Enkelkinder:</strong> 200.000 € steuerfrei.</li>
                <li><strong>Urenkel / Eltern / Großeltern:</strong> 100.000 € steuerfrei.</li>
                <li><strong>Freunde / Geschwister:</strong> 20.000 € steuerfrei.</li>
              </ul>

              <h3>Sonderregelungen für Immobilien</h3>
              <p>
                Die Übertragung des sogenannten "Familienheims" an den Ehepartner ist gänzlich steuerfrei, unabhängig vom Wert, solange 
                die Immobilie zu eigenen Wohnzwecken genutzt wird. Bei Schenkungen unter Vorbehalt des Nießbrauchsrechts (die Eltern verschenken das Haus, behalten aber das Wohn- und Mietrecht) verringert sich der steuerliche Wert der Schenkung massiv, was Steuern spart.
              </p>
            </div>`
  },
  "urlaubsgeld": {
    faq: `[
      { "@type": "Question", "name": "Warum bleibt vom Urlaubsgeld so wenig Netto übrig?", "acceptedAnswer": { "@type": "Answer", "text": "Urlaubsgeld ist ein Einmalbezug. Für die Lohnsteuer wird das Einkommen fiktiv auf das Jahr hochgerechnet, wodurch ein wesentlich höherer Steuersatz greift (Steuerprogression)." } },
      { "@type": "Question", "name": "Gibt es einen gesetzlichen Anspruch auf Urlaubsgeld?", "acceptedAnswer": { "@type": "Answer", "text": "Nein. Urlaubsgeld ist eine freiwillige Sonderzahlung des Arbeitgebers. Ein Anspruch entsteht nur durch Arbeitsvertrag, Tarifvertrag oder betriebliche Übung." } }
    ]`,
    html: `
            {/* SEO Article */}
            <div className="seo-section">
              <h2>Urlaubsgeldrechner: Wie viel Netto bleibt von der Sonderzahlung?</h2>
              <p>
                Das Urlaubsgeld ist eine gern gesehene Sonderzahlung vor der Reisezeit. Doch auf dem Kontoauszug folgt oft die 
                Ernüchterung: Der Abzug durch Steuern und Sozialabgaben ist beim Urlaubsgeld gefühlt deutlich höher als beim 
                normalen Monatsgehalt. Mit unserem <strong>Urlaubsgeldrechner</strong> berechnen Sie vorab exakt, mit welchem 
                Nettobetrag Sie für Ihre Urlaubskasse planen können.
              </p>

              <h3>Warum die Abzüge so hoch sind (Sonderzahlungen & Progression)</h3>
              <p>
                Das deutsche Steuersystem arbeitet mit einer Steuerprogression: Wer mehr verdient, zahlt prozentual mehr Steuern. 
                Urlaubsgeld und Weihnachtsgeld gelten steuerrechtlich als <strong>sonstige Bezüge</strong>. 
                Um die Steuer zu berechnen, wendet das Finanzamt die sogenannte <strong>Jahreslohnsteuertabelle</strong> an.
              </p>
              <p>
                Das Urlaubsgeld wird auf Ihr reguläres Jahresgehalt aufaddiert. Durch diesen Sprung im Jahreseinkommen landen Sie in 
                einer höheren Progressionsstufe. Auf den Betrag des Urlaubsgelds wird also Ihr persönlicher <strong>Grenzsteuersatz</strong> 
                angewendet, der deutlich über Ihrem Durchschnittssteuersatz liegt. Abzüge von 45 % bis über 50 % sind daher keine Seltenheit.
              </p>

              <h3>Sozialabgaben beim Urlaubsgeld (Märzklausel)</h3>
              <p>
                Auch bei den Sozialversicherungen (Kranken-, Pflege-, Renten- und Arbeitslosenversicherung) wird kräftig zugegriffen, 
                sofern Ihr reguläres Gehalt die jeweilige <strong>Beitragsbemessungsgrenze</strong> noch nicht überschritten hat.
              </p>
              <p>
                Eine Besonderheit gibt es für Sonderzahlungen im ersten Quartal (Januar bis März): Hier greift die sogenannte <strong>Märzklausel</strong>. 
                Wird die anteilige Beitragsbemessungsgrenze im aktuellen Jahr durch die Sonderzahlung überschritten, wird die Zahlung dem Vorjahr zugerechnet. 
                Da Urlaubsgeld jedoch zumeist in den Sommermonaten (Mai, Juni, Juli) gezahlt wird, findet die Märzklausel hier in der Regel keine Anwendung.
              </p>

              <h3>Gibt es einen rechtlichen Anspruch auf Urlaubsgeld?</h3>
              <p>
                Ein gesetzlicher Anspruch auf die Zahlung von Urlaubsgeld existiert in Deutschland nicht. Es handelt sich um eine 
                <strong>freiwillige Leistung</strong> des Arbeitgebers. Ein zwingender Anspruch ergibt sich nur in folgenden Fällen:
              </p>
              <ul>
                <li>Es ist explizit in Ihrem <strong>Arbeitsvertrag</strong> vereinbart.</li>
                <li>Es ist in einem geltenden <strong>Tarifvertrag</strong> oder einer Betriebsvereinbarung verankert.</li>
                <li><strong>Betriebliche Übung:</strong> Zahlt der Arbeitgeber drei Jahre in Folge vorbehaltlos Urlaubsgeld, entsteht ein Gewohnheitsrecht für die Zukunft.</li>
              </ul>
            </div>`
  }
};

async function inject() {
  for (const [folder, data] of Object.entries(seoData)) {
    const file = path.join(basePath, folder, 'page.tsx');
    if (!fs.existsSync(file)) continue;

    let content = fs.readFileSync(file, 'utf-8');

    // Remove existing generic SEO section
    content = content.replace(/\{\/\* SEO Article \*\/\}[\s\S]*?<\/div>/, data.html);

    // Add jsonLd script tag block inside the return statement right after <>
    const jsonScript = `\n      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": ${data.faq}
      }) }} />`;

    // Only add if not already present
    if (!content.includes('application/ld+json')) {
      content = content.replace(/return \(\s*<>\s*/, 'return (\n    <>' + jsonScript + '\n');
    } else {
      // If present, replace it with new faq (not typical since we used generic ones)
    }

    fs.writeFileSync(file, content);
  }
  console.log('Successfully injected massive SEO content!');
}

inject();
