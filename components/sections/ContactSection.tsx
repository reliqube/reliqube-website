// Server Component
import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/interactive/Reveal";
import { ContactForm } from "@/components/interactive/ContactForm";

const CONTACT_LINKS = [
  {
    label: "Enviar e-mail",
    value: "reliqube@gmail.com",
    href:  "mailto:reliqube@gmail.com",
    external: false,
    iconPath: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
  },
  {
    label: "Conectar no LinkedIn",
    value: "linkedin.com/company/reliqube",
    href:  "https://linkedin.com/company/reliqube",
    external: true,
    iconPath: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0",
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{
        background: "var(--bg-base)",
        padding: "clamp(64px,10vw,120px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="dot-grid" aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.32,
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(142,99,245,0.06) 0%, transparent 70%)",
      }} />
      <div className="section-divider" aria-hidden="true" />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", position: "relative" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
          gap: "clamp(40px, 6vw, 80px)",
        }}>

          {/* Left: copy */}
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <Image src="/logo.png" alt="" width={32} height={32}
                aria-hidden="true" style={{ opacity: 0.80 }} />
              <span className="section-label">Fale Conosco</span>
            </div>

            <h2 id="contact-heading" className="section-heading" style={{ marginBottom: 14 }}>
              Vamos construir algo{" "}
              <span className="gradient-text">que resiste.</span>
            </h2>

            <p className="slogan" style={{ marginBottom: 20 }}>
              <strong>Building reliability,</strong> block by block.
            </p>

            <p className="section-body" style={{ marginBottom: 32, maxWidth: 420 }}>
              Seja para resolver deploys instáveis, falta de visibilidade ou acelerar
              a sua plataforma — queremos ouvir. Respondemos normalmente em um dia útil.
            </p>

            <nav aria-label="Formas de contato" style={{
              display: "flex", flexDirection: "column", gap: 10,
            }}>
              {CONTACT_LINKS.map((c) => (
                <a key={c.href} href={c.href} aria-label={c.label}
                  className="contact-link"
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                >
                  <span aria-hidden="true" style={{
                    width: 32, height: 32, borderRadius: "var(--radius-sm)",
                    background: "rgba(142,99,245,0.10)",
                    border: "1px solid rgba(142,99,245,0.16)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--violet-400)", flexShrink: 0,
                  }}>
                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={c.iconPath} />
                    </svg>
                  </span>
                  {c.value}
                </a>
              ))}
            </nav>
          </Reveal>

          {/* Right: form (client island) */}
          <Reveal delay={2}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
