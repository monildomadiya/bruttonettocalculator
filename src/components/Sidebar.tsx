import React from "react";
import Link from "next/link";

const TOOLS = [
  { href: "/", label: "Brutto-Netto-Rechner", desc: "Nettogehalt berechnen" },
  { href: "/netto-brutto", label: "Netto-Brutto-Rechner", desc: "Bruttogehalt aus Netto" },
  { href: "/stundenlohn", label: "Stundenlohnrechner", desc: "Gehalt auf Stundenbasis" },
  { href: "/firmenwagen", label: "Firmenwagenrechner", desc: "Geldwerter Vorteil" },
  { href: "/kurzarbeitergeld", label: "Kurzarbeitergeld", desc: "KUG berechnen" },
  { href: "/arbeitslosengeld", label: "Arbeitslosengeld I", desc: "ALG I Anspruch" },
  { href: "/rente", label: "Rentenrechner", desc: "Voraussichtliche Rente" },
  { href: "/rentenpunkte", label: "Rentenpunkte", desc: "Punkte berechnen" },
  { href: "/arbeitgeber", label: "Arbeitgeberrechner", desc: "Gesamtlohnkosten" },
  { href: "/pendlerpauschale", label: "Pendlerpauschale", desc: "Fahrtkosten absetzen" },
  { href: "/schenkungssteuer", label: "Schenkungssteuer", desc: "Steuer bei Schenkung" },
  { href: "/urlaubsgeld", label: "Urlaubsgeldrechner", desc: "Urlaubsgeld netto" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Related Tools Card */}
      <div className="sidebar-card">
        <div className="sidebar-section-title">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
          </svg>
          Alle Rechner
        </div>
        <div className="sidebar-link-list">
          {TOOLS.map((t) => (
            <Link key={t.href} href={t.href} className="sidebar-link" style={{ textDecoration: "none" }}>
              <span style={{ flex: 1 }}>
                <span style={{ display: "block", fontSize: 13, color: "var(--text-sidebar-link)", fontWeight: 500 }}>
                  {t.label}
                </span>
                <span style={{ display: "block", fontSize: 11, color: "var(--text-muted)", marginTop: 1 }}>
                  {t.desc}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Tip Card */}
      <div className="sidebar-card" style={{ padding: "16px", background: "var(--accent-light)", border: "1px solid var(--accent)" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent-dark)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          💡 Tipp
        </div>
        <p style={{ fontSize: 12.5, color: "var(--text-body)", lineHeight: 1.6 }}>
          Verheiratete Paare können durch den Wechsel von Steuerklasse IV/IV auf III/V 
          sofort mehr Nettogehalt erhalten.
        </p>
      </div>

      {/* Partner Card */}
      <div className="sidebar-card" style={{ padding: "16px", background: "var(--surface-sunken)", border: "1px solid var(--border-color)", marginTop: "16px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          🤝 Partnerprojekt
        </div>
        <p style={{ fontSize: 12.5, color: "var(--text-body)", lineHeight: 1.6, marginBottom: 8 }}>
          Berechne deinen exakten Kalorienbedarf (TDEE) für Muskelaufbau oder Gewichtsverlust.
        </p>
        <a href="https://tdee.tech" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", fontSize: 12.5, fontWeight: 600, color: "var(--accent)", textDecoration: "none" }}>
          → tdee.tech besuchen
        </a>
      </div>
    </aside>
  );
}
