import React from "react";
import Link from "next/link";
import { YEAR } from "@/lib/seo";

const FOOTER_COLS = [
  {
    title: "Lohnrechner",
    links: [
      { href: "/", label: "Brutto-Netto-Rechner" },
      { href: "/netto-brutto", label: "Netto-Brutto-Rechner" },
      { href: "/stundenlohn", label: "Stundenlohnrechner" },
      { href: "/arbeitgeber", label: "Arbeitgeberrechner" },
    ],
  },
  {
    title: "Steuer & Recht",
    links: [
      { href: "/firmenwagen", label: "Firmenwagenrechner" },
      { href: "/pendlerpauschale", label: "Pendlerpauschale" },
      { href: "/schenkungssteuer", label: "Schenkungssteuer" },
    ],
  },
  {
    title: "Sozialleistungen",
    links: [
      { href: "/kurzarbeitergeld", label: "Kurzarbeitergeld" },
      { href: "/arbeitslosengeld", label: "Arbeitslosengeld I" },
      { href: "/urlaubsgeld", label: "Urlaubsgeld" },
    ],
  },
  {
    title: "Rente & Vorsorge",
    links: [
      { href: "/rente", label: "Rentenrechner" },
      { href: "/rentenpunkte", label: "Rentenpunkte" },
    ],
  },
  {
    title: "Über uns",
    links: [
      { href: "/ueber-uns", label: "Über bruttonettocalculator" },
      { href: "/kontakt", label: "Kontakt" },
      { href: "/nutzungsbedingungen", label: "Nutzungsbedingungen" },
      { href: "/datenschutz", label: "Datenschutz" },
      { href: "/impressum", label: "Impressum" },
      { href: "https://tdee.tech", label: "Partner: TDEE.TECH" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-wrap">

        {/* Top grid */}
        <div className="footer-grid">

          {/* Brand column */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo" style={{ textDecoration: "none" }}>
              <div className="footer-logo-icon">€</div>
              <span className="footer-logo-text">bruttonettocalculator</span>
            </Link>
            <p className="footer-tagline">
              Präzise Gehalts- und Steuerrechner für Deutschland. Kostenlos, ohne Anmeldung, immer aktuell.
            </p>
            <div className="footer-badges">
              <span className="footer-badge">🇩🇪 Deutschland</span>
              <span className="footer-badge">✓ Kostenlos</span>
              <span className="footer-badge">🔒 Datenschutz</span>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.title} className="footer-col">
              <div className="footer-col-title">{col.title}</div>
              <ul className="footer-link-list">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span>© {YEAR} bruttonettocalculator. Alle Rechte vorbehalten.</span>
            <span className="footer-disclaimer">
              Alle Angaben ohne Gewähr. Keine Steuerberatung. Stand: {YEAR}.
            </span>
          </div>
          <div className="footer-legal-links">
            <Link href="/ueber-uns" className="footer-legal-link">Über uns</Link>
            <Link href="/kontakt" className="footer-legal-link">Kontakt</Link>
            <Link href="/nutzungsbedingungen" className="footer-legal-link">Nutzungsbedingungen</Link>
            <Link href="/datenschutz" className="footer-legal-link">Datenschutz</Link>
            <Link href="/impressum" className="footer-legal-link">Impressum</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
