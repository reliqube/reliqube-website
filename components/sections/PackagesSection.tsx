// Server Component — zero client JS required
import React from "react";
import { Reveal } from "@/components/interactive/Reveal";

const PACKAGES = [
  {
    id:    "assessment",
    group: "Diagnóstico",
    name:  "Reliability Assessment",
    tagline: "Onde estamos. Para onde podemos ir.",
    objective: "Diagnóstico técnico e avaliação de maturidade operacional.",
    hours: ["10h", "20h"],
    iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    includes: [
      "Review de Kubernetes",
      "Análise de CI/CD e GitOps",
      "Avaliação de observabilidade",
      "Mapeamento de riscos operacionais",
      "Roadmap técnico priorizado",
    ],
    deliverables: [
      "Relatório técnico detalhado",
      "Backlog priorizado",
      "Sessão de apresentação dos resultados",
    ],
  },
  {
    id:    "gitops",
    group: "Plataforma",
    name:  "GitOps Enablement",
    tagline: "Automação e entrega contínua padronizada.",
    objective: "Automação e padronização de entrega contínua.",
    hours: ["20h", "40h"],
    iconPath: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    includes: [
      "FluxCD ou ArgoCD",
      "Estratégia GitOps",
      "Pipelines CI/CD",
      "Promoção entre ambientes",
      "Padronização de deploy",
    ],
    deliverables: [
      "Pipelines configurados e funcionando",
      "Estrutura GitOps documentada",
      "Documentação técnica de referência",
    ],
  },
  {
    id:    "observability",
    group: "Plataforma",
    name:  "Observability Accelerator",
    tagline: "Visibilidade completa, desde o dia um.",
    objective: "Implantação de stack moderna de observabilidade.",
    hours: ["20h", "40h", "60h"],
    iconPath: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    includes: [
      "Prometheus",
      "Grafana",
      "OpenTelemetry",
      "Loki / agregação de logs",
      "Dashboards e alertas",
    ],
    deliverables: [
      "Dashboards operacionais configurados",
      "Regras de alertas implementadas",
      "Documentação técnica da stack",
    ],
  },
  {
    id:    "advisory",
    group: "Contínuo",
    name:  "Reliability Advisory",
    tagline: "Parceiro técnico de longo prazo.",
    objective: "Acompanhamento contínuo e suporte estratégico.",
    hours: ["8h/mês", "16h/mês", "24h/mês"],
    iconPath: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
    includes: [
      "Reuniões recorrentes",
      "Revisões arquiteturais",
      "Mentoria técnica",
      "Suporte assíncrono",
      "Discussões estratégicas",
    ],
    deliverables: [
      "Follow-ups documentados",
      "Guidance técnico contínuo",
      "Acompanhamento de evolução",
    ],
  },
];

/* ── Group colors ────────────────────────────────────────── */
const GROUP_META: Record<string, { color: string; bg: string }> = {
  "Diagnóstico": { color: "rgba(200,178,255,0.85)", bg: "rgba(142,99,245,0.12)" },
  "Plataforma":  { color: "rgba(171,135,255,0.80)", bg: "rgba(114,72,224,0.12)" },
  "Contínuo":    { color: "rgba(142,99,245,0.90)",  bg: "rgba(90,53,196,0.13)"  },
};

function PackageCard({ pkg, index }: { pkg: typeof PACKAGES[0]; index: number }) {
  const meta = GROUP_META[pkg.group] ?? GROUP_META["Diagnóstico"];

  return (
    <article
      className="pkg-card"
      aria-labelledby={`pkg-title-${pkg.id}`}
      style={{ padding: "28px 26px 26px" }}
    >
      {/* Top row: icon + group badge + hours */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 18,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="pkg-icon" aria-hidden="true">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth={1.7}>
              <path strokeLinecap="round" strokeLinejoin="round" d={pkg.iconPath} />
            </svg>
          </div>
          {/* Group badge */}
          <span style={{
            display: "inline-flex",
            padding: "3px 9px",
            borderRadius: 999,
            fontSize: "0.625rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: meta.color,
            background: meta.bg,
            border: "1px solid rgba(142,99,245,0.15)",
          }}>
            {pkg.group}
          </span>
        </div>

        {/* Hours range */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          {pkg.hours.map((h, i) => (
            <React.Fragment key={h}>
              {i > 0 && <span style={{ color: "var(--text-tertiary)", fontSize: "0.6875rem" }}>·</span>}
              <span className="pkg-hours">{h}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Name */}
      <h3
        id={`pkg-title-${pkg.id}`}
        style={{
          fontSize: "1rem",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "var(--text-primary)",
          marginBottom: 4,
          lineHeight: 1.25,
        }}
      >
        {pkg.name}
      </h3>

      {/* Tagline */}
      <p style={{
        fontSize: "0.8125rem",
        color: "var(--violet-400)",
        fontStyle: "italic",
        marginBottom: 12,
        lineHeight: 1.4,
      }}>
        {pkg.tagline}
      </p>

      {/* Objective */}
      <p style={{
        fontSize: "0.8125rem",
        lineHeight: 1.65,
        color: "var(--text-secondary)",
        marginBottom: 20,
      }}>
        {pkg.objective}
      </p>

      {/* Separator */}
      <div style={{
        height: 1,
        background: "var(--border-faint)",
        marginBottom: 18,
      }} aria-hidden="true" />

      {/* Two-column layout: scope + deliverables */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0 20px",
      }}>
        {/* Scope */}
        <div>
          <p style={{
            fontSize: "0.625rem",
            fontWeight: 700,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: "var(--text-tertiary)",
            marginBottom: 10,
          }}>
            Escopo
          </p>
          <ul role="list" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
            {pkg.includes.map((item) => (
              <li key={item} className="pkg-deliverable">{item}</li>
            ))}
          </ul>
        </div>

        {/* Deliverables */}
        <div>
          <p style={{
            fontSize: "0.625rem",
            fontWeight: 700,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: "var(--text-tertiary)",
            marginBottom: 10,
          }}>
            Entregáveis
          </p>
          <ul role="list" style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
            {pkg.deliverables.map((item) => (
              <li key={item} className="pkg-deliverable">{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Module index — subtle architectural label */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 14,
          right: 16,
          fontFamily: "var(--font-geist-mono)",
          fontSize: "0.5625rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: "rgba(142,99,245,0.20)",
          userSelect: "none",
        }}
      >
        M-{String(index + 1).padStart(2, "0")}
      </div>
    </article>
  );
}

/* ── Blueprint node: the "combine" visual concept ────────── */
function ModuleSystemDiagram() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
      }}
    >
      {/* Horizontal rail line */}
      <div style={{
        position: "absolute",
        left: "10%", right: "10%",
        height: 1,
        background: "linear-gradient(to right, transparent, rgba(142,99,245,0.18) 20%, rgba(142,99,245,0.18) 80%, transparent)",
      }} />

      {/* Four module dots — one per package */}
      {PACKAGES.map((pkg, i) => (
        <div key={pkg.id} style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          position: "relative",
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "var(--bg-base)",
            border: "1.5px solid rgba(142,99,245,0.45)",
            boxShadow: "0 0 8px rgba(142,99,245,0.20)",
            zIndex: 1,
          }} />
          <span style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.5625rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: "rgba(142,99,245,0.45)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}>
            M-{String(i + 1).padStart(2, "0")}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────── */
export function PackagesSection() {
  return (
    <section
      id="packages"
      aria-labelledby="packages-heading"
      style={{
        background: "var(--bg-surface)",
        padding: "clamp(64px,10vw,120px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Backgrounds */}
      <div className="line-grid" aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 40% at 70% 30%, rgba(142,99,245,0.05) 0%, transparent 70%)",
      }} />
      <div className="section-divider" aria-hidden="true" />

      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 20px",
        position: "relative",
      }}>

        {/* ── Section header ──────────────────────────────── */}
        <Reveal style={{ marginBottom: 12 }}>
          <p className="section-label" style={{ marginBottom: 12 }}>
            Pacotes de Consultoria
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
            gap: "20px 48px",
            alignItems: "end",
            marginBottom: 16,
          }}>
            <h2
              id="packages-heading"
              className="section-heading"
            >
              Módulos de engenharia{" "}
              <span className="gradient-text">sob medida.</span>
            </h2>
            <p className="section-body" style={{ maxWidth: 420 }}>
              Cada pacote é uma unidade modular com escopo definido e entregáveis
              claros. Combine módulos de acordo com os seus desafios técnicos —
              do diagnóstico inicial ao acompanhamento contínuo.
            </p>
          </div>
        </Reveal>

        {/* ── Module system diagram ────────────────────────── */}
        <Reveal delay={1}>
          <ModuleSystemDiagram />
        </Reveal>

        {/* ── Cards grid ──────────────────────────────────── */}
        <Reveal delay={2} style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          gap: 16,
          marginTop: 16,
        }}>
          {PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </Reveal>

        {/* ── Modular combination callout ──────────────────── */}
        <Reveal delay={3}>
          <div style={{
            marginTop: 40,
            padding: "24px 28px",
            borderRadius: "var(--radius-lg)",
            background: "var(--bg-raised)",
            border: "1px solid var(--border-subtle)",
            borderLeft: "3px solid var(--violet-500)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "16px 32px",
          }}>
            <div style={{ flex: "1 1 280px", minWidth: 0 }}>
              <p style={{
                fontSize: "0.6875rem",
                fontFamily: "var(--font-geist-mono)",
                color: "var(--violet-400)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 6,
              }}>
                Combinação modular
              </p>
              <p style={{
                fontSize: "0.9375rem",
                color: "var(--text-secondary)",
                lineHeight: 1.65,
                margin: 0,
              }}>
                Os módulos são projetados para funcionar de forma independente ou em conjunto.
                Um Assessment pode evoluir naturalmente para um GitOps Enablement ou
                Observability Accelerator — com o Reliability Advisory como camada contínua.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, flexShrink: 0 }}>
              {["M-01", "M-02", "M-03", "M-04"].map((m, i) => (
                <React.Fragment key={m}>
                  {i > 0 && (
                    <span style={{
                      alignSelf: "center",
                      color: "rgba(142,99,245,0.35)",
                      fontSize: "0.75rem",
                    }}>+</span>
                  )}
                  <span style={{
                    display: "inline-flex",
                    padding: "5px 10px",
                    borderRadius: "var(--radius-sm)",
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: "var(--violet-300)",
                    background: "rgba(142,99,245,0.10)",
                    border: "1px solid rgba(142,99,245,0.20)",
                  }}>
                    {m}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── CTA ─────────────────────────────────────────── */}
        <Reveal delay={4}>
          <div style={{
            marginTop: 48,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 16,
          }}>
            <p style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "var(--violet-500)",
            }}>
              Remote-first · Escopo definido · Entregáveis claros
            </p>
            <h3 style={{
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              lineHeight: 1.2,
              maxWidth: 520,
              margin: 0,
            }}>
              Monte o seu{" "}
              <span className="gradient-text">engagement</span>{" "}
              personalizado.
            </h3>
            <p style={{
              fontSize: "0.9375rem",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              maxWidth: 460,
              margin: 0,
            }}>
              Cada ambiente tem seus próprios desafios. Vamos conversar sobre os
              seus e definir juntos qual combinação de módulos faz mais sentido.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 4 }}>
              <a href="#contact" className="btn-primary">
                Montar meu engagement
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
        </Reveal>
      </div>
    </section>
  );
}
