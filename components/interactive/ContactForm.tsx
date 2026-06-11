"use client";

import React, { useState, useId, useCallback } from "react";
import { InterestSelector } from "./InterestSelector";
import { Turnstile } from "@marsidev/react-turnstile";

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

const SUBMISSION_TIMEOUT_MS = 30000; // 30 second timeout
const SUCCESS_DISPLAY_DURATION_MS = 5000; // Show success for 5 seconds

export function ContactForm() {
  const uid = useId();
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [isTurnstileExpired, setIsTurnstileExpired] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = React.useRef<HTMLFormElement>(null);
  const successTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Validate form fields
  const validateForm = (formData: Record<string, string>): string | null => {
    if (!formData.name.trim()) {
      return "Nome é obrigatório";
    }
    if (!formData.email.trim()) {
      return "E-mail é obrigatório";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "E-mail inválido";
    }
    if (!formData.message.trim()) {
      return "Mensagem é obrigatória";
    }
    if (!turnstileToken) {
      return "Confirme a validação anti-spam";
    }
    return null;
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrorMessage("");
      setIsTurnstileExpired(false);

      // ✅ Capture form element reference BEFORE any async operations
      // This prevents synthetic event invalidation issues after await
      const formElement = e.currentTarget;
      const form = new FormData(formElement);

      const formData = {
        name: String(form.get("name") || "").trim(),
        email: String(form.get("email") || "").trim(),
        company: String(form.get("company") || "").trim(),
        interest: String(form.get("interest") || ""),
        message: String(form.get("message") || "").trim(),
        turnstileToken,
      };

      // Validate before submission
      const validationError = validateForm(formData);
      if (validationError) {
        setErrorMessage(validationError);
        setStatus("error");
        return;
      }

      try {
        setStatus("loading");

        // Create abort controller with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(
          () => controller.abort(),
          SUBMISSION_TIMEOUT_MS
        );

        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `HTTP ${response.status}: Erro ao enviar`
          );
        }

        setStatus("done");
        // ✅ Use captured reference, safe after async operations
        formElement.reset();
        setTurnstileToken(""); // Reset token after successful submission

        // Auto-reset form after delay
        if (successTimeoutRef.current) {
          clearTimeout(successTimeoutRef.current);
        }
        successTimeoutRef.current = setTimeout(() => {
          setStatus("idle");
        }, SUCCESS_DISPLAY_DURATION_MS);
      } catch (error) {
        let errorMsg = "Não foi possível enviar sua mensagem. Tente novamente.";

        if (error instanceof Error) {
          if (error.name === "AbortError") {
            errorMsg =
              "Requisição expirou. Verifique sua conexão e tente novamente.";
          } else {
            errorMsg = error.message;
          }
        }

        console.error("[ContactForm]", error);
        setErrorMessage(errorMsg);
        setStatus("error");

        // Expire Turnstile token on error so user must re-verify
        setTurnstileToken("");
        setIsTurnstileExpired(true);
      }
    },
    [turnstileToken]
  );

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  // Success state
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
        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--text-tertiary)",
            marginTop: 8,
          }}
        >
          Você será redirecionado em breve...
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label="Formulário de contato" style={{
        padding: "28px 28px 32px",
        borderRadius: "var(--radius-xl)",
        background: "var(--bg-surface)",
        border: "1px solid var(--border-faint)",
        display: "flex", flexDirection: "column", gap: 16,
      }}>
      {/* Error message - positioned at top for visibility */}
      {status === "error" && errorMessage && (
        <div
          role="alert"
          style={{
            padding: "12px 14px",
            borderRadius: "var(--radius-md)",
            background: "rgba(255, 80, 80, 0.08)",
            border: "1px solid rgba(255, 80, 80, 0.18)",
            color: "#ffb4b4",
            fontSize: "0.875rem",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path
              d="M12 8v4m0 4v.01"
              stroke="var(--bg-surface)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

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
            placeholder="Seu nome"
            disabled={status === "loading"}
            aria-describedby={
              status === "error" && errorMessage.includes("Nome")
                ? `${uid}-error`
                : undefined
            }
          />
        </div>
        <div>
          <FieldLabel label="E-mail" id={`${uid}-email`} required />
          <FocusInput id={`${uid}-email`} name="email"
            type="email" required autoComplete="email"
            placeholder="voce@empresa.com"
            disabled={status === "loading"}
            aria-describedby={
              status === "error" && errorMessage.includes("mail")
                ? `${uid}-error`
                : undefined
            }
          />
        </div>
      </div>

      {/* Empresa */}
      <div>
        <FieldLabel label="Empresa" id={`${uid}-company`} />
        <FocusInput id={`${uid}-company`} name="company"
          type="text" autoComplete="organization"
          placeholder="Sua empresa" disabled={status === "loading"} />
      </div>

      {/* Área de interesse */}
      <InterestSelector name="interest" />

      {/* Mensagem */}
      <div>
        <FieldLabel label="Mensagem" id={`${uid}-message`} required />
        <FocusTextarea id={`${uid}-message`} name="message" required
          placeholder="Conte-nos sobre os desafios da sua infraestrutura ou o que você quer alcançar…"
          disabled={status === "loading"}
          aria-describedby={
            status === "error" && errorMessage.includes("Mensagem")
              ? `${uid}-error`
              : undefined
          }
        />
      </div>

      {/* Turnstile */}
      <div>
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={(token) => {
            setTurnstileToken(token);
            setIsTurnstileExpired(false);
          }}
          onExpire={() => {
            setTurnstileToken("");
            setIsTurnstileExpired(true);
          }}
          onError={() => {
            setTurnstileToken("");
            setIsTurnstileExpired(true);
          }}
        />
        {isTurnstileExpired && (
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--text-tertiary)",
              marginTop: -8,
              marginBottom: 4,
            }}
          >
            Verificação expirou. Tente novamente.
          </p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={status === "loading" || !turnstileToken}
        className="btn-primary"
        style={{
          width: "100%", justifyContent: "center",
          padding: "12px", marginTop: 4,
          opacity: status === "loading" || !turnstileToken ? 0.72 : 1,
          cursor: status === "loading" || !turnstileToken ? "not-allowed" : "pointer",
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
