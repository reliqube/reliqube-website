// Server Component
import React from "react";
import Image from "next/image";
import { SocialLinks } from "./SocialLinks";

const LINKS = [
  { label: "Serviços",         href: "#services" },
  { label: "Por que Reliqube", href: "#why"      },
  { label: "Tecnologias",      href: "#stack"    },
  { label: "Sobre",            href: "#about"    },
  { label: "Contato",          href: "#contact"  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: "var(--bg-surface)",
      borderTop: "1px solid var(--border-faint)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div className="dot-grid" aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.20,
      }} />
      <hr className="hr-glow" aria-hidden="true" style={{
        position: "absolute", top: 0, left: "6%", right: "6%", border: "none",
      }} />

      {/* ── Faixa CTA ──────────────────────────────────── */}
      <div style={{
        borderBottom: "1px solid var(--border-faint)",
        padding: "clamp(44px,7vw,72px) 0",
        position: "relative",
      }}>
        <div aria-hidden="true" style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 600, height: 240,
          background: "radial-gradient(ellipse, rgba(142,99,245,0.07) 0%, transparent 70%)",
          pointerEvents: "none", filter: "blur(24px)",
        }} />

        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: "0 20px",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 14,
          textAlign: "center", position: "relative",
        }}>
          <Image src="/logo.png" alt="" width={44} height={44}
            aria-hidden="true" style={{ opacity: 0.65, marginBottom: 4 }} />

          <h2 style={{
            fontSize: "clamp(1.375rem, 3vw, 2rem)",
            fontWeight: 800, letterSpacing: "-0.035em",
            color: "var(--text-primary)", lineHeight: 1.15, margin: 0,
          }}>
            Pronto para construir{" "}
            <span className="gradient-text">confiabilidade</span>?
          </h2>

          <p className="slogan">
            <strong>Building reliability,</strong> block by block.
          </p>

          <p style={{
            fontSize: "0.875rem", color: "var(--text-secondary)",
            maxWidth: 400, lineHeight: 1.65, margin: 0,
          }}>
            Vamos projetar uma plataforma que escala, observa e sustenta
            pressão. Respondemos normalmente em um dia útil.
          </p>

          <div style={{
            display: "flex", flexWrap: "wrap", gap: 10,
            justifyContent: "center", marginTop: 6,
          }}>
            <a href="#contact" className="btn-primary">
              Iniciar uma conversa
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4-4 4M21 12H3" />
              </svg>
            </a>
            <a href="mailto:reliqube@gmail.com" className="btn-ghost">
              reliqube@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* ── Rodapé principal ─────────────────────────────── */}
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "36px 20px 28px", position: "relative",
      }}>
        <div style={{
          display: "flex", flexWrap: "wrap",
          gap: "28px 48px",
          justifyContent: "space-between", alignItems: "flex-start",
          marginBottom: 22,
        }}>
          {/* Marca */}
          <div>
            <div style={{
              display: "flex", alignItems: "center", gap: 10, marginBottom: 10,
            }}>
              <Image src="/logo.png" alt="Reliqube" width={28} height={28} />
              <span style={{
                fontSize: "0.9375rem", fontWeight: 700,
                letterSpacing: "-0.025em", color: "var(--text-primary)",
              }}>
                Reli<span style={{ color: "var(--violet-400)" }}>qube</span>
              </span>
            </div>
            <p style={{
              fontSize: "0.75rem", lineHeight: 1.65,
              color: "var(--text-tertiary)", maxWidth: 200, margin: 0,
            }}>
              Confiabilidade. Escalabilidade.
              <br />Plataformas que sustentam o futuro.
            </p>
          </div>

          {/* Navegação */}
          <nav aria-label="Navegação do rodapé">
            <ul role="list" style={{
              display: "flex", flexWrap: "wrap", gap: "4px 20px",
              listStyle: "none", margin: 0, padding: 0,
            }}>
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="footer-link">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Redes sociais */}
          <SocialLinks />
        </div>

        <hr className="hr-glow" style={{ border: "none", marginBottom: 18 }} aria-hidden="true" />

        <div style={{
          display: "flex", flexWrap: "wrap",
          justifyContent: "space-between", alignItems: "center",
          gap: "6px 24px",
        }}>
          <p style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)", margin: 0 }}>
            © {year} Reliqube. Todos os direitos reservados.
          </p>
          <p className="slogan" style={{ margin: 0 }}>
            <strong>Building reliability,</strong> block by block.
          </p>
        </div>
      </div>
    </footer>
  );
}
