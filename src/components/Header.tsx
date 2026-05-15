"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "./ThemeProvider";

/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */
const NAV_GROUPS = [
  {
    label: "Lohnrechner",
    items: [
      { href: "/brutto-netto-rechner", label: "Brutto-Netto-Rechner",  desc: "Nettogehalt berechnen",      tag: "brutto netto gehalt lohn" },
      { href: "/netto-brutto",         label: "Netto-Brutto-Rechner",  desc: "Brutto aus Wunsch-Netto",   tag: "netto brutto wunsch" },
      { href: "/stundenlohn",          label: "Stundenlohnrechner",    desc: "Gehalt auf Stundenbasis",    tag: "stunde stundenlohn" },
      { href: "/arbeitgeber",          label: "Arbeitgeberrechner",    desc: "Gesamte Lohnkosten",         tag: "arbeitgeber kosten" },
    ],
  },
  {
    label: "Steuer & Recht",
    items: [
      { href: "/firmenwagen",      label: "Firmenwagenrechner", desc: "Geldwerter Vorteil (1%)",  tag: "firmenwagen auto steuer" },
      { href: "/pendlerpauschale", label: "Pendlerpauschale",   desc: "Fahrtkosten absetzen",     tag: "pendler fahrtkosten steuer" },
      { href: "/schenkungssteuer", label: "Schenkungssteuer",   desc: "Steuern bei Schenkungen",  tag: "schenkung erbschaft steuer" },
    ],
  },
  {
    label: "Sozialleistungen",
    items: [
      { href: "/kurzarbeitergeld", label: "Kurzarbeitergeld",   desc: "KUG Anspruch berechnen",  tag: "kurzarbeit kug" },
      { href: "/arbeitslosengeld", label: "Arbeitslosengeld I", desc: "ALG I Anspruch",           tag: "arbeitslos alg" },
      { href: "/urlaubsgeld",      label: "Urlaubsgeldrechner", desc: "Netto-Urlaubsgeld",        tag: "urlaub urlaubsgeld" },
    ],
  },
  {
    label: "Rente & Vorsorge",
    items: [
      { href: "/rente",        label: "Rentenrechner",        desc: "Gesetzliche Rente schätzen", tag: "rente altersrente" },
      { href: "/rentenpunkte", label: "Rentenpunkte Rechner", desc: "Entgeltpunkte ermitteln",    tag: "rentenpunkte entgelt" },
    ],
  },
];

// Flat list for search
const ALL_ITEMS = NAV_GROUPS.flatMap((g) =>
  g.items.map((item) => ({ ...item, group: g.label }))
);

/* ═══════════════════════════════════════
   SVG ICONS
═══════════════════════════════════════ */
const ChevronDown = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);
const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);
const SearchIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const HamburgerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ═══════════════════════════════════════
   SEARCH MODAL
═══════════════════════════════════════ */
function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = query.trim()
    ? ALL_ITEMS.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.label.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          item.tag.toLowerCase().includes(q) ||
          item.group.toLowerCase().includes(q)
        );
      })
    : ALL_ITEMS;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  const navigate = useCallback((href: string) => {
    router.push(href);
    onClose();
  }, [router, onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, results.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
      if (e.key === "Enter" && results[activeIdx]) { navigate(results[activeIdx].href); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [results, activeIdx, navigate, onClose]);

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Rechner suchen" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        {/* Input row */}
        <div className="search-input-row">
          <span className="search-input-icon"><SearchIcon size={16} /></span>
          <input
            ref={inputRef}
            className="search-input"
            type="text"
            placeholder="Rechner suchen … z.B. „Brutto" oder „Rente""
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
          <button className="search-close-btn" onClick={onClose} aria-label="Schließen">
            <span className="search-esc-badge">ESC</span>
          </button>
        </div>

        {/* Results */}
        <div className="search-results">
          {results.length === 0 ? (
            <div className="search-empty">
              <SearchIcon size={28} />
              <p>Kein Rechner für „{query}" gefunden</p>
            </div>
          ) : (
            <>
              {!query && (
                <div className="search-section-label">Alle Rechner</div>
              )}
              {query && results.length > 0 && (
                <div className="search-section-label">{results.length} Ergebnis{results.length !== 1 ? "se" : ""}</div>
              )}
              <ul className="search-list" role="listbox">
                {results.map((item, i) => (
                  <li key={item.href} role="option" aria-selected={i === activeIdx}>
                    <button
                      className={`search-result-item${i === activeIdx ? " active" : ""}`}
                      onClick={() => navigate(item.href)}
                      onMouseEnter={() => setActiveIdx(i)}
                    >
                      <div className="search-result-left">
                        <span className="search-result-tag">{item.group}</span>
                        <span className="search-result-label">{item.label}</span>
                        <span className="search-result-desc">{item.desc}</span>
                      </div>
                      <span className="search-result-arrow"><ArrowRightIcon /></span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Footer hints */}
        <div className="search-footer">
          <span className="search-hint"><kbd>↑</kbd><kbd>↓</kbd> Navigieren</span>
          <span className="search-hint"><kbd>↵</kbd> Öffnen</span>
          <span className="search-hint"><kbd>ESC</kbd> Schließen</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   DROPDOWN MENU
═══════════════════════════════════════ */
function DropdownMenu({ group, isOpen, onClose }: {
  group: typeof NAV_GROUPS[0];
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;
  return (
    <div className="nav-dropdown" role="menu">
      <div className="nav-dropdown-title">{group.label}</div>
      {group.items.map((item) => (
        <Link key={item.href} href={item.href} className="nav-dropdown-item" onClick={onClose} role="menuitem">
          <span className="nav-dropdown-label">{item.label}</span>
          <span className="nav-dropdown-desc">{item.desc}</span>
        </Link>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════
   HEADER
═══════════════════════════════════════ */
export default function Header() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const [openGroup, setOpenGroup]         = useState<string | null>(null);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchOpen, setSearchOpen]       = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Lock body scroll when mobile drawer open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* "/" keyboard shortcut opens search */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && !searchOpen &&
          !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [searchOpen]);

  const closeAll = () => {
    setOpenGroup(null);
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  return (
    <>
      {/* ── Search Modal ── */}
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}

      <header className="site-header" ref={headerRef}>
        <div className="page-wrap header-inner-wrap">
          <div className="site-header-inner">

            {/* ── Logo ── */}
            <Link href="/" className="logo" onClick={closeAll} aria-label="Startseite">
              <div className="logo-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <text x="1" y="19" fontSize="21" fontWeight="900" fontFamily="Arial, sans-serif">€</text>
                </svg>
              </div>
              <span className="logo-text">bruttonettocalculator</span>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="header-nav" aria-label="Hauptnavigation">
              {NAV_GROUPS.map((group) => (
                <div
                  key={group.label}
                  className="nav-group"
                  onMouseEnter={() => setOpenGroup(group.label)}
                  onMouseLeave={() => setOpenGroup(null)}
                >
                  <button
                    className={`nav-link${openGroup === group.label ? " nav-link-active" : ""}`}
                    aria-expanded={openGroup === group.label}
                    aria-haspopup="true"
                  >
                    {group.label}
                    <span className={`nav-chevron${openGroup === group.label ? " open" : ""}`}>
                      <ChevronDown />
                    </span>
                  </button>
                  <DropdownMenu
                    group={group}
                    isOpen={openGroup === group.label}
                    onClose={() => setOpenGroup(null)}
                  />
                </div>
              ))}
            </nav>

            {/* ── Right Actions ── */}
            <div className="header-actions">

              {/* Search button — opens spotlight modal */}
              <button
                id="header-search-btn"
                className="header-search-pill"
                onClick={() => setSearchOpen(true)}
                aria-label="Rechner suchen"
                title="Rechner suchen (drücke /)"
              >
                <SearchIcon size={13} />
                <span className="search-pill-text">Suchen…</span>
                <kbd className="search-pill-kbd">/</kbd>
              </button>

              {/* Dark mode */}
              <button
                className="h-icon-btn"
                onClick={toggle}
                aria-label={isDark ? "Hellmodus" : "Dunkelmodus"}
                title={isDark ? "Hellmodus" : "Dunkelmodus"}
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
              </button>

              {/* Mobile hamburger */}
              <button
                className="h-icon-btn mobile-menu-btn"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menü öffnen"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        {mobileOpen && (
          <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation">
            {/* Mobile search */}
            <div className="mobile-search-row">
              <button
                className="mobile-search-trigger"
                onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
              >
                <SearchIcon size={14} />
                <span>Rechner suchen…</span>
              </button>
            </div>

            <div className="mobile-menu-inner">
              {NAV_GROUPS.map((group) => (
                <div key={group.label} className="mobile-group">
                  <button
                    className="mobile-group-title"
                    onClick={() => setMobileExpanded(mobileExpanded === group.label ? null : group.label)}
                    aria-expanded={mobileExpanded === group.label}
                  >
                    {group.label}
                    <span className={`nav-chevron${mobileExpanded === group.label ? " open" : ""}`}>
                      <ChevronDown />
                    </span>
                  </button>
                  {mobileExpanded === group.label && (
                    <div className="mobile-group-items">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="mobile-menu-item"
                          onClick={closeAll}
                        >
                          <span className="mobile-item-label">{item.label}</span>
                          <span className="mobile-item-desc">{item.desc}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
