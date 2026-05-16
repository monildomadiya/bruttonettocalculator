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
      { href: "/brutto-netto-rechner", label: "Brutto-Netto-Rechner",  desc: "Nettogehalt berechnen",     tag: "brutto netto gehalt lohn" },
      { href: "/netto-brutto",         label: "Netto-Brutto-Rechner",  desc: "Brutto aus Wunsch-Netto",  tag: "netto brutto wunsch" },
      { href: "/stundenlohn",          label: "Stundenlohnrechner",    desc: "Gehalt auf Stundenbasis",   tag: "stunde stundenlohn" },
      { href: "/arbeitgeber",          label: "Arbeitgeberrechner",    desc: "Gesamte Lohnkosten",        tag: "arbeitgeber kosten" },
      { href: "/minijob",             label: "Minijob Rechner",        desc: "556-€-Grenze prüfen",       tag: "minijob geringfügig" },
    ],
  },
  {
    label: "Steuer & Recht",
    items: [
      { href: "/firmenwagen",      label: "Firmenwagen",      desc: "1% Regelung",             tag: "firmenwagen auto steuer" },
      { href: "/pendlerpauschale", label: "Pendlerpauschale", desc: "Fahrtkosten",             tag: "pendler fahrtkosten steuer" },
      { href: "/abfindung",        label: "Abfindungsrechner",desc: "Fünftelregelung",         tag: "abfindung steuer recht" },
      { href: "/schenkungssteuer", label: "Schenkungssteuer", desc: "Freibeträge prüfen",      tag: "schenkung erbschaft steuer" },
    ],
  },
  {
    label: "Sozialleistungen",
    items: [
      { href: "/kurzarbeitergeld", label: "Kurzarbeitergeld",   desc: "KUG-Anspruch",          tag: "kurzarbeit kug" },
      { href: "/arbeitslosengeld", label: "Arbeitslosengeld I", desc: "ALG 1 Höhe",            tag: "arbeitslos alg" },
      { href: "/krankengeld",      label: "Krankengeldrechner", desc: "Netto nach 6 Wochen",   tag: "krankengeld krankheit" },
      { href: "/urlaubsgeld",      label: "Urlaubsgeld",        desc: "Netto-Sonderzahlung",   tag: "urlaub urlaubsgeld" },
      { href: "/weihnachtsgeld",   label: "Weihnachtsgeld",     desc: "Netto-13. Gehalt",      tag: "weihnachtsgeld sonderzahlung" },
      { href: "/elterngeld",       label: "Elterngeld Rechner", desc: "Elterngeld berechnen",  tag: "elterngeld elternzeit" },
    ],
  },
  {
    label: "Rente & Vorsorge",
    items: [
      { href: "/rente",        label: "Rentenrechner",        desc: "Gesetzliche Rente schätzen", tag: "rente altersrente" },
      { href: "/rentenpunkte", label: "Rentenpunkte Rechner", desc: "Entgeltpunkte ermitteln",     tag: "rentenpunkte entgelt" },
    ],
  },
];

const ALL_ITEMS = NAV_GROUPS.flatMap((g) =>
  g.items.map((item) => ({ ...item, group: g.label }))
);

/* ═══════════════════════════════════════
   ICONS  (pure SVG paths — no <text> tag, fully SSR-safe)
═══════════════════════════════════════ */
const ChevronDown = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);
const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
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
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const HamburgerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
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
  const [query, setQuery]         = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef  = useRef<HTMLUListElement>(null);
  const router   = useRouter();

  const results = query.trim()
    ? ALL_ITEMS.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.label.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q)  ||
          item.tag.toLowerCase().includes(q)   ||
          item.group.toLowerCase().includes(q)
        );
      })
    : ALL_ITEMS;

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { setActiveIdx(0); }, [query]);

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${activeIdx}"]`) as HTMLElement | null;
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  const navigate = useCallback((href: string) => {
    router.push(href);
    onClose();
  }, [router, onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")    { onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, results.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
      if (e.key === "Enter" && results[activeIdx]) { navigate(results[activeIdx].href); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [results, activeIdx, navigate, onClose]);

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>

        {/* Input */}
        <div className="search-modal-header">
          <SearchIcon size={16} />
          <input
            ref={inputRef}
            className="search-modal-input"
            type="text"
            placeholder="Rechner suchen ... z.B. Brutto oder Rente"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
          <button className="search-modal-close" onClick={onClose} aria-label="Schliessen">
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Results */}
        <div className="search-results">
          {results.length === 0 ? (
            <div className="search-empty">
              <p>Kein Ergebnis für &ldquo;{query}&rdquo;</p>
            </div>
          ) : (
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }} role="listbox" ref={listRef}>
              {results.map((item, i) => (
                <li key={item.href} role="option" aria-selected={i === activeIdx}>
                  <button
                    data-idx={i}
                    className="search-result-item"
                    style={{ width: "100%", textAlign: "left", background: i === activeIdx ? "var(--bg-tag)" : "transparent", border: "none", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
                    onClick={() => navigate(item.href)}
                    onMouseEnter={() => setActiveIdx(i)}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.group}</span>
                      <span className="search-result-name">{item.label}</span>
                      <span className="search-result-desc">{item.desc}</span>
                    </div>
                    <ArrowRightIcon />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   HEADER
═══════════════════════════════════════ */
export default function Header() {
  const { theme, toggle }                   = useTheme();
  const isDark                              = theme === "dark";
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchOpen, setSearchOpen]         = useState(false);

  // Lock scroll when mobile open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // "/" shortcut to open search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key === "/" && !searchOpen &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [searchOpen]);

  const closeAll = () => { setMobileOpen(false); setMobileExpanded(null); };

  return (
    <>
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}

      <header className="site-header">
        <div className="header-inner-wrap">
          <div className="site-header-inner">

            {/* ── Logo ── */}
            <Link href="/" className="logo" onClick={closeAll} aria-label="Startseite">
              <span className="logo-icon-bg"><span className="logo-icon-text">&#8364;</span></span>
              <span className="logo-name">bruttonettocalculator</span>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="header-nav" aria-label="Hauptnavigation">
              {NAV_GROUPS.map((group) => (
                <div key={group.label} className="nav-item">
                  <button className="nav-item-btn">
                    {group.label}
                    <ChevronDown />
                  </button>
                  <div className="nav-dropdown" role="menu">
                    {group.items.map((item) => (
                      <Link key={item.href} href={item.href} className="nav-dropdown-item" role="menuitem" onClick={closeAll}>
                        <span className="nav-dropdown-label">{item.label}</span>
                        <span className="nav-dropdown-desc">{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            {/* ── Right actions ── */}
            <div className="header-actions">
              <button className="header-search-pill" onClick={() => setSearchOpen(true)} aria-label="Suchen">
                <SearchIcon size={14} />
                <span className="search-pill-text">Suchen...</span>
                <kbd style={{ marginLeft: "6px", fontSize: "10px", opacity: 0.6 }}>/</kbd>
              </button>
              <button className="header-icon-btn" onClick={toggle} aria-label={isDark ? "Hellmodus" : "Dunkelmodus"}>
                {isDark ? <SunIcon /> : <MoonIcon />}
              </button>
              <button className="header-icon-btn mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
                {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        <div className={`mobile-menu ${mobileOpen ? "open" : ""}`} role="dialog" aria-modal="true">
          <div className="mobile-menu-inner">
            <button 
              onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
              style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", padding: "12px", background: "var(--bg-tag)", border: "none", borderRadius: "6px", color: "var(--text)", fontSize: "14px", marginBottom: "20px" }}
            >
              <SearchIcon size={16} /> Rechner suchen...
            </button>
            
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="mobile-menu-section">
                <div className="mobile-menu-title">{group.label}</div>
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href} className="mobile-menu-link" onClick={closeAll}>
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}
