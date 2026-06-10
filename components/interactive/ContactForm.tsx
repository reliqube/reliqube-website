"use client";

import React, { useState, useId } from "react";
import { InterestSelector } from "./InterestSelector";

const INPUT_BASE: React.CSSProperties = {
  width: "100%",
  padding: "10px 13px",
  borderRadius: "var(--radius-md)",
  background: "var(--bg-raised)",
  border: "1px solid",
  color: "var(--text-primary)",
  fontSize: "0.875rem",
  fontFamily: "var(--font-geist-sans)",
  lineHeight: 1.5,
  outline: "none",
  transition: "border-color 150ms ease, box-shadow 150ms ease",
};

function FocusInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [f, setF] = useState(false);
  return (
    <input
      {...props}
      style={{
        ...INPUT_BASE,
        borderColor: f ? "var(--border-focus)" : "var(--border-faint)",
        boxShadow:   f ? "0 0 0 3px rgba(142,99,245,0.10)" : "none",
        ...props.style,
      }}
      onFocus={(e) => { setF(true);  props.onFocus?.(e); }}
      onBlur={(e)  => { setF(false); props.onBlur?.(e);  }}
    />
  );
}

function FocusTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [f, setF] = useState(false);
  return (
    <textarea
      {...props}
      style={{
        ...INPUT_BASE,
        resize: "vertical",
        minHeight: 108,
        ...props.style,
        borderColor: f ? "var(--border-focus)" : "var(--border-faint)",
        boxShadow:   f ? "0 0 0 3px rgba(142,99,245,0.10)" : "none",
      }}
      onFocus={(e) => { setF(true);  props.onFocus?.(e); }}
      onBlur={(e)  => { setF(false); props.onBlur?.(e);  }}
    />
  );
}

function FieldLabel({ label, id, required }: { label: string; id: string; required?: boolean }) {
  return (
    <label htmlFor={id} style={{
      display: "block", fontSize: "0.75rem", fontWeight: 600,
      color: "var(--text-tertiary)", marginBottom: 6, letterSpacing: "0.02em",
    }}>
      {label}
      {required && <span aria-hidden="true" style={{ color: "var(--violet-400)", marginLeft: 2 }}>*</span>}
    </label>
  );
}

export function ContactForm() {
  const uid = useId();
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    // Substitua pelo seu endpoint real (Resend, Formspree, etc.)
    await new Promise((r) => setTimeout(r, 1300));
    setStatus("done");
  };

  if (status === "done") {
    return (
      <div role="status" aria-live="polite" aria-atomic="true" style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        minHeight: 380, gap: 16, textAlign: "center",
        padding: "40px 32px",
        borderRadius: "var(--radius-xl)",
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
      }}>
        <div role="img" aria-label="Mensagem enviada com sucesso" style={{
          width: 52, height: 52, borderRadius: "50%",
          background: "rgba(142,99,245,0.14)",
          border: "1px solid var(--border-strong)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"
            stroke="var(--violet-400)" strokeWidth={2.2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text-primary)" }}>
          Mensagem recebida
        </h3>
        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", maxWidth: 280 }}>
          Vamos analisar e retornar em até um dia útil.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Formulário de contato" style={{
      padding: "28px 28px 32px",
      borderRadius: "var(--radius-xl)",
      background: "var(--bg-surface)",
      border: "1px solid var(--border-faint)",
      display: "flex", flexDirection: "column", gap: 16,
    }}>
      {/* Nome + E-mail */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: 12,
      }}>
        <div>
          <FieldLabel label="Nome" id={`${uid}-name`} required />
          <FocusInput id={`${uid}-name`} name="name"
            type="text" required autoComplete="name"
            placeholder="Seu nome" />
        </div>
        <div>
          <FieldLabel label="E-mail" id={`${uid}-email`} required />
          <FocusInput id={`${uid}-email`} name="email"
            type="email" required autoComplete="email"
            placeholder="voce@empresa.com" />
        </div>
      </div>

      {/* Empresa */}
      <div>
        <FieldLabel label="Empresa" id={`${uid}-company`} />
        <FocusInput id={`${uid}-company`} name="company"
          type="text" autoComplete="organization"
          placeholder="Sua empresa" />
      </div>

      {/* Área de interesse */}
      <InterestSelector name="interest" />

      {/* Mensagem */}
      <div>
        <FieldLabel label="Mensagem" id={`${uid}-message`} required />
        <FocusTextarea id={`${uid}-message`} name="message" required
          placeholder="Conte-nos sobre os desafios da sua infraestrutura ou o que você quer alcançar…" />
      </div>

      <button
        type="submit"
        disabled={true}
        // disabled={status === "loading"}
        className="btn-primary"
        aria-disabled={status === "loading"}
        style={{
          width: "100%", justifyContent: "center",
          padding: "12px", marginTop: 4,
          opacity: status === "loading" ? 0.72 : 1,
          cursor: status === "loading" ? "wait" : "pointer",
        }}
      >
        {status === "loading" ? (
          <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"
              style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}>
              <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2.5"
                strokeDasharray="36 20" />
            </svg>
            <span>Enviando…</span>
          </>
        ) : (
          <>
            Enviar mensagem
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4-4 4M21 12H3" />
            </svg>
          </>
        )}
      </button>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}
