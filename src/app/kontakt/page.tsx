"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function KontaktPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [betreff, setBetreff] = useState("Allgemeine Anfrage");
  const [nachricht, setNachricht] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[${betreff}] Nachricht von ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${nachricht}`);
    window.location.href = `mailto:kontakt@bruttonettocalculator.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <>
      <div className="page-hero">
        <div className="page-wrap">
          <h1>Kontakt</h1>
          <p>Haben Sie Fragen, Feedback oder einen Fehler entdeckt? Wir helfen gerne weiter.</p>
        </div>
      </div>
      
      <div className="page-wrap">
        <div className="content-area">
          <main>
            <div className="calc-card seo-section">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "32px" }}>
                {[
                  { icon: "✉️", title: "E-Mail", text: "kontakt@bruttonettocalculator.com" },
                  { icon: "⏱️", title: "Antwortzeit", text: "In der Regel innerhalb von 1–2 Werktagen" },
                  { icon: "🌐", title: "Sprache", text: "Deutsch & Englisch" },
                ].map((item) => (
                  <div key={item.title} style={{ background: "var(--bg-result)", border: "1px solid var(--border-color)", padding: "16px" }}>
                    <div style={{ fontSize: "20px", marginBottom: "8px" }}>{item.icon}</div>
                    <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: "4px" }}>{item.title}</div>
                    <div style={{ fontSize: "14px", color: "var(--text-body)" }}>{item.text}</div>
                  </div>
                ))}
              </div>

              {sent ? (
                <div style={{ background: "var(--bg-result)", border: "1px solid var(--border-color)", borderLeft: "3px solid var(--accent)", padding: "24px", textAlign: "center" as const }}>
                  <div style={{ fontSize: "32px", marginBottom: "12px" }}>✅</div>
                  <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-heading)", marginBottom: "8px" }}>Ihr E-Mail-Programm wurde geöffnet</h2>
                  <p style={{ fontSize: "14px", color: "var(--text-body)" }}>Bitte senden Sie die vorbereitete E-Mail ab. Wir melden uns so schnell wie möglich.</p>
                </div>
              ) : (
                <div style={{ border: "1px solid var(--border-color)", background: "transparent" }}>
                  <div style={{ padding: "16px 20px", fontSize: "15px", fontWeight: 600, color: "var(--text-heading)", borderBottom: "1px solid var(--border-color)", background: "var(--bg-result)" }}>
                    Kontaktformular
                  </div>
                  <form onSubmit={handleSubmit} style={{ padding: "24px", display: "flex", flexDirection: "column" as const, gap: "20px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                      <div className="form-field">
                        <label className="field-label">Ihr Name</label>
                        <input
                          type="text"
                          className="form-input"
                          required
                          placeholder="Max Mustermann"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label className="field-label">E-Mail-Adresse</label>
                        <input
                          type="email"
                          className="form-input"
                          required
                          placeholder="max@beispiel.de"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-field">
                      <label className="field-label">Betreff</label>
                      <select className="form-select" value={betreff} onChange={(e) => setBetreff(e.target.value)}>
                        <option>Allgemeine Anfrage</option>
                        <option>Fehler gemeldet</option>
                        <option>Verbesserungsvorschlag</option>
                        <option>Zusammenarbeit / Kooperation</option>
                        <option>Presse / Medien</option>
                        <option>Sonstiges</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label className="field-label">Ihre Nachricht</label>
                      <textarea
                        className="form-input"
                        required
                        rows={6}
                        placeholder="Bitte beschreiben Sie Ihr Anliegen so genau wie möglich..."
                        value={nachricht}
                        onChange={(e) => setNachricht(e.target.value)}
                        style={{ resize: "vertical", height: "160px" }}
                      />
                    </div>
                    <button type="submit" className="btn-calculate" style={{ marginTop: "8px" }}>
                      Nachricht senden →
                    </button>
                    <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, marginTop: "8px", lineHeight: "1.5" }}>
                      Mit dem Absenden stimmen Sie zu, dass Ihre Angaben zur Beantwortung Ihrer Anfrage verarbeitet werden. Weitere Informationen finden Sie in unserer{" "}
                      <a href="/datenschutz" style={{ color: "var(--accent)", textDecoration: "none" }}>Datenschutzerklärung</a>.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </main>
          <Sidebar />
        </div>
      </div>
    </>
  );
}
