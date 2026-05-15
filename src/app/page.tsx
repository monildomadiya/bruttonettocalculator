"use client";

import React from "react";
import Link from "next/link";
import { YEAR } from "@/lib/seo";

const GROUPS = [
  {
    label: "LOHNRECHNER",
    items: [
      { href: "/brutto-netto-rechner", label: "Brutto-Netto-Rechner", desc: "Nettogehalt exakt berechnen für jedes Jahr." },
      { href: "/netto-brutto", label: "Netto-Brutto-Rechner", desc: "Welches Brutto für dein Wunsch-Netto?" },
      { href: "/stundenlohn", label: "Stundenlohnrechner", desc: "Monatsgehalt auf Stundenbasis umlegen." },
      { href: "/arbeitgeber", label: "Arbeitgeberrechner", desc: "Gesamte Lohnkosten & Nebenkosten." },
    ],
  },
  {
    label: "STEUER & RECHT",
    items: [
      { href: "/firmenwagen", label: "Firmenwagenrechner", desc: "Geldwerten Vorteil (1% Regel) berechnen." },
      { href: "/pendlerpauschale", label: "Pendlerpauschale", desc: "Fahrtkosten für Arbeitsweg absetzen." },
      { href: "/schenkungssteuer", label: "Schenkungssteuer", desc: "Steuern bei Schenkung & Erbschaft." },
    ],
  },
  {
    label: "SOZIALLEISTUNGEN",
    items: [
      { href: "/kurzarbeitergeld", label: "Kurzarbeitergeld", desc: "KUG Anspruch & Auszahlung berechnen." },
      { href: "/arbeitslosengeld", label: "Arbeitslosengeld I", desc: "Voraussichtlichen ALG I Anspruch ermitteln." },
      { href: "/urlaubsgeld", label: "Urlaubsgeldrechner", desc: "Netto vom Urlaubsgeld berechnen." },
    ],
  },
  {
    label: "RENTE & VORSORGE",
    items: [
      { href: "/rente", label: "Rentenrechner", desc: "Gesetzliche Altersrente voraussagen." },
      { href: "/rentenpunkte", label: "Rentenpunkte Rechner", desc: "Entgeltpunkte pro Jahr ermitteln." },
    ],
  },
];

export default function HubPage() {
  return (
    <>
      <div className="hub-hero">
        <div className="page-wrap">
          <h1>Kostenlose Finanz- & Gehaltsrechner</h1>
          <p>
            Akkurate, sofortige und komplett kostenlose Rechner. Berechne dein Nettogehalt, 
            Steuern, Sozialabgaben und Ansprüche ohne Anmeldung.
          </p>
          <Link href="/brutto-netto-rechner" className="hub-hero-btn">
            Brutto-Netto-Rechner starten ➔
          </Link>
        </div>
      </div>

      <div className="page-wrap hub-content">
        <div className="hub-seo-intro">
          <p>
            Willkommen bei bruttonettocalculator.com! Unsere Rechner verwenden die offiziellen 
            Berechnungsformeln des Bundesministeriums der Finanzen ({YEAR}) und garantieren 
            höchste Präzision. Deine Daten werden lokal verarbeitet und niemals gespeichert.
          </p>
        </div>

        {GROUPS.map((group) => (
          <div key={group.label} className="hub-section">
            <div className="hub-section-header">
              <h2>{group.label}</h2>
              <span className="hub-section-count">{group.items.length} TOOLS</span>
            </div>
            <div className="hub-grid">
              {group.items.map((item) => (
                <Link key={item.href} href={item.href} className="hub-card">
                  <div className="hub-card-title">{item.label}</div>
                  <div className="hub-card-desc">{item.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
