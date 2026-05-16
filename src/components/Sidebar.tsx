import React from "react";
import Link from "next/link";

const TOOLS = [
  { href: "/brutto-netto-rechner", label: "Brutto-Netto-Rechner", desc: "Nettogehalt berechnen" },
  { href: "/netto-brutto", label: "Netto-Brutto-Rechner", desc: "Bruttogehalt aus Netto" },
  { href: "/stundenlohn", label: "Stundenlohnrechner", desc: "Gehalt auf Stundenbasis" },
  { href: "/firmenwagen", label: "Firmenwagenrechner", desc: "Geldwerter Vorteil" },
  { href: "/kurzarbeitergeld", label: "Kurzarbeitergeld", desc: "KUG berechnen" },
  { href: "/arbeitslosengeld", label: "Arbeitslosengeld I", desc: "ALG I Anspruch" },
  { href: "/krankengeld", label: "Krankengeldrechner", desc: "Krankengeld berechnen" },
  { href: "/weihnachtsgeld", label: "Weihnachtsgeld", desc: "Netto-Weihnachtsgeld" },
  { href: "/urlaubsgeld", label: "Urlaubsgeldrechner", desc: "Urlaubsgeld netto" },
  { href: "/elterngeld", label: "Elterngeld Rechner", desc: "Elterngeld berechnen" },
  { href: "/minijob", label: "Minijob Rechner", desc: "556-€-Grenze prüfen" },
  { href: "/rente", label: "Rentenrechner", desc: "Voraussichtliche Rente" },
  { href: "/rentenpunkte", label: "Rentenpunkte", desc: "Punkte berechnen" },
  { href: "/arbeitgeber", label: "Arbeitgeberrechner", desc: "Gesamtlohnkosten" },
  { href: "/pendlerpauschale", label: "Pendlerpauschale", desc: "Fahrtkosten absetzen" },
  { href: "/abfindung", label: "Abfindungsrechner", desc: "Abfindung berechnen" },
  { href: "/schenkungssteuer", label: "Schenkungssteuer", desc: "Steuer bei Schenkung" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Related Tools Card */}
      <div className="sidebar-card">
        <div className="sidebar-card-title">Alle Rechner</div>
        <div className="sidebar-category-links">
          {TOOLS.map((t) => (
            <Link key={t.href} href={t.href} className="sidebar-link">
              <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ fontSize: "13px", color: "var(--text-heading)", fontWeight: 600 }}>{t.label}</span>
                <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{t.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Tip Card */}
      <div className="sidebar-card" style={{ padding: "16px", background: "var(--bg-tag)" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          💡 Tipp
        </div>
        <p style={{ fontSize: "13px", color: "var(--text-body)", lineHeight: 1.6 }}>
          Verheiratete Paare können durch den Wechsel von Steuerklasse IV/IV auf III/V 
          sofort mehr Nettogehalt erhalten.
        </p>
      </div>

      {/* Partner Card */}
      <div className="sidebar-card" style={{ padding: "16px" }}>
        <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          🤝 Partnerprojekt
        </div>
        <p style={{ fontSize: "13px", color: "var(--text-body)", lineHeight: 1.6, marginBottom: "8px" }}>
          Berechne deinen exakten Kalorienbedarf (TDEE) für Muskelaufbau oder Gewichtsverlust.
        </p>
        <a href="https://tdee.tech" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", fontSize: "13px", fontWeight: 600, color: "var(--accent)", textDecoration: "none" }}>
          → tdee.tech besuchen
        </a>
      </div>
    </aside>
  );
}
