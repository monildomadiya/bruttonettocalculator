const fs = require('fs');
const path = require('path');

const basePath = "c:\\Users\\HP\\OneDrive\\Desktop\\BRUTO-NATO\\brutto-netto-rechner\\src\\app";

const metas = {
  "netto-brutto": {
    title: "Netto-Brutto-Rechner 2024 | Wunsch-Netto zu Brutto umrechnen",
    desc: "Errechnen Sie Ihr notwendiges Bruttogehalt für Ihr Wunsch-Netto. Netto-Brutto-Rechner mit allen Abzügen."
  },
  "stundenlohn": {
    title: "Stundenlohnrechner 2024 | Gehalt auf Stunden umrechnen",
    desc: "Berechnen Sie exakt Ihren Stundenlohn aus Ihrem Bruttomonatsgehalt. Mit Mindestlohn-Check."
  },
  "firmenwagen": {
    title: "Firmenwagenrechner 2024 | Geldwerter Vorteil (1% Regelung)",
    desc: "Berechnen Sie den geldwerten Vorteil und die Netto-Belastung durch einen Dienstwagen nach der 1% oder 0,25% Regelung."
  },
  "kurzarbeitergeld": {
    title: "Kurzarbeitergeld Rechner 2024 | KUG Anspruch online berechnen",
    desc: "Ermitteln Sie Ihren Anspruch auf Kurzarbeitergeld bei Arbeitsausfall. Rechner für 60% oder 67% Satz."
  },
  "arbeitslosengeld": {
    title: "Arbeitslosengeld Rechner (ALG 1) | Anspruch berechnen",
    desc: "Berechnen Sie Ihr voraussichtliches Arbeitslosengeld I basierend auf Ihrem bisherigen Nettoeinkommen."
  },
  "rente": {
    title: "Rentenrechner 2024 | Gesetzliche Rente & Altersvorsorge berechnen",
    desc: "Ermitteln Sie Ihre voraussichtliche gesetzliche Rente und prüfen Sie Ihre Rentenlücke."
  },
  "rentenpunkte": {
    title: "Rentenpunkte Rechner | Entgeltpunkte berechnen",
    desc: "Wie viele Rentenpunkte erhalten Sie für Ihr Gehalt? Berechnen Sie Ihre Entgeltpunkte online."
  },
  "arbeitgeber": {
    title: "Arbeitgeberrechner 2024 | Lohnnebenkosten berechnen",
    desc: "Berechnen Sie als Arbeitgeber die gesamten Lohnkosten und Lohnnebenkosten (AG-Anteile) für Ihre Mitarbeiter."
  },
  "pendlerpauschale": {
    title: "Pendlerpauschale Rechner 2024 | Entfernungspauschale berechnen",
    desc: "Berechnen Sie Ihre Pendlerpauschale und ermitteln Sie, wie viel Steuern Sie durch Fahrtkosten sparen."
  },
  "schenkungssteuer": {
    title: "Schenkungssteuer Rechner | Freibeträge & Steuer berechnen",
    desc: "Schenkungssteuer berechnen: Freibeträge, Steuerklassen und anfallende Steuern bei Schenkungen."
  },
  "urlaubsgeld": {
    title: "Urlaubsgeldrechner | Netto vom Urlaubsgeld berechnen",
    desc: "Wie viel bleibt vom Urlaubsgeld übrig? Berechnen Sie die genauen Abzüge und Ihr Netto-Urlaubsgeld."
  }
};

for (const [folder, data] of Object.entries(metas)) {
  const dirPath = path.join(basePath, folder);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  const content = `import { Metadata } from "next";

export const metadata: Metadata = {
  title: "${data.title}",
  description: "${data.desc}",
  alternates: { canonical: "https://bruttonettocalculator.com/${folder}" }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
`;
  fs.writeFileSync(path.join(dirPath, 'layout.tsx'), content);
}
console.log("Layout metadata files created successfully.");
