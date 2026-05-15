"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

const NAV_GROUPS = [
  {
    label: "Lohnrechner",
    items: [
      { href: "/brutto-netto-rechner", label: "Brutto-Netto-Rechner", desc: "Nettogehalt berechnen" },
      { href: "/netto-brutto", label: "Netto-Brutto-Rechner", desc: "Brutto aus Wunsch-Netto" },
      { href: "/stundenlohn", label: "Stundenlohnrechner", desc: "Gehalt auf Stundenbasis" },
      { href: "/arbeitgeber", label: "Arbeitgeberrechner", desc: "Gesamte Lohnkosten" },
    ],
  },
  {
    label: "Steuer & Recht",
    items: [
      { href: "/firmenwagen", label: "Firmenwagenrechner", desc: "Geldwerter Vorteil (1%)" },
      { href: "/pendlerpauschale", label: "Pendlerpauschale", desc: "Fahrtkosten absetzen" },
      { href: "/schenkungssteuer", label: "Schenkungssteuer", desc: "Steuern bei Schenkungen" },
    ],
  },
  {
    label: "Sozialleistungen",
    items: [
      { href: "/kurzarbeitergeld", label: "Kurzarbeitergeld", desc: "KUG Anspruch berechnen" },
      { href: "/arbeitslosengeld", label: "Arbeitslosengeld I", desc: "ALG I Anspruch" },
      { href: "/urlaubsgeld", label: "Urlaubsgeldrechner", desc: "Netto-Urlaubsgeld" },
    ],
  },
  {
    label: "Rente & Vorsorge",
    items: [
      { href: "/rente", label: "Rentenrechner", desc: "Gesetzliche Rente schätzen" },
      { href: "/rentenpunkte", label: "Rentenpunkte Rechner", desc: "Entgeltpunkte ermitteln" },
    ],
  },
];

function DropdownMenu({ group, isOpen, onClose }: {
  group: typeof NAV_GROUPS[0];
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;
  return (
    <div className="nav-dropdown">
      <div className="nav-dropdown-title">{group.label}</div>
      {group.items.map((item) => (
        <Link key={item.href} href={item.href} className="nav-dropdown-item" onClick={onClose}>
          <span className="nav-dropdown-label">{item.label}</span>
          <span className="nav-dropdown-desc">{item.desc}</span>
        </Link>
      ))}
    </div>
  );
}

export default function Header() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleGroupClick = (label: string) => {
    setOpenGroup(openGroup === label ? null : label);
  };

  return (
    <header className="site-header" ref={headerRef}>
      <div className="page-wrap" style={{ width: "100%" }}>
        <div className="site-header-inner">

          {/* Logo */}
          <Link href="/" className="logo" onClick={() => { setOpenGroup(null); setMobileOpen(false); }}>
            <div className="logo-icon">€</div>
            <span className="logo-text">
              bruttonettocalculator
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="header-nav" aria-label="Hauptnavigation">
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="nav-group" style={{ position: "relative" }}>
                <button
                  className={`nav-link${openGroup === group.label ? " nav-link-active" : ""}`}
                  onClick={() => handleGroupClick(group.label)}
                  aria-expanded={openGroup === group.label}
                  aria-haspopup="true"
                >
                  {group.label}
                  <svg
                    width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    style={{
                      transition: "transform 0.2s",
                      transform: openGroup === group.label ? "rotate(180deg)" : "rotate(0deg)"
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <DropdownMenu
                  group={group}
                  isOpen={openGroup === group.label}
                  onClose={() => setOpenGroup(null)}
                />
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="header-actions">
            {/* Dark Mode */}
            <button
              className="icon-btn"
              onClick={toggle}
              aria-label={isDark ? "Hellmodus" : "Dunkelmodus"}
              title={isDark ? "Hellmodus aktivieren" : "Dunkelmodus aktivieren"}
            >
              {isDark ? (
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="5" strokeWidth={2} />
                  <line x1="12" y1="1" x2="12" y2="3" strokeWidth={2} strokeLinecap="round" />
                  <line x1="12" y1="21" x2="12" y2="23" strokeWidth={2} strokeLinecap="round" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeWidth={2} strokeLinecap="round" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeWidth={2} strokeLinecap="round" />
                  <line x1="1" y1="12" x2="3" y2="12" strokeWidth={2} strokeLinecap="round" />
                  <line x1="21" y1="12" x2="23" y2="12" strokeWidth={2} strokeLinecap="round" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeWidth={2} strokeLinecap="round" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeWidth={2} strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              className="icon-btn mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menü öffnen"
            >
              {mobileOpen ? (
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="mobile-menu">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="mobile-group">
              <div className="mobile-group-title">{group.label}</div>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="mobile-menu-item"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="mobile-item-label">{item.label}</span>
                  <span className="mobile-item-desc">{item.desc}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
