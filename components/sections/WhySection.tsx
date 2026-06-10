// Server Component
import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/interactive/Reveal";

const PILLARS = [
  {
    n: "01",
    title: "Confiabilidade como disciplina",
    body:  "Confiabilidade não se configura — se engenheira. Incorporamos práticas de SRE como disciplina fundamental: error budgets, burn rates e SLOs se tornam a linguagem comum dos seus times.",
  },
  {
    n: "02",
    title: "Arquitetura modular de plataforma",
    body:  "O Qube no nosso nome não é decorativo. Projetamos sistemas em módulos composáveis e interconectados — primitivos Kubernetes, camadas GitOps, pipelines de observabilidade — cada um confiável sozinho, poderoso em conjunto.",
  },
  {
    n: "03",
    title: "Mentalidade engineering-first",
    body:  "Sem buzzwords, sem apresentações de vendor lock-in. Trazemos julgamento sênior de engenharia para cada projeto — reviews de arquitetura, implementação prática e transferência de conhecimento construída para perdurar além do contrato.",
  },
  {
    n: "04",
    title: "Projetado para escalar desde o início",
    body:  "Escalabilidade é uma propriedade estrutural, não algo adicionado depois. Projetamos para o tráfego, o tamanho de time e a complexidade que você está caminhando — não apenas para onde você está hoje.",
  },
];

export function WhySection() {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      style={{
        background: "var(--bg-surface)",
        padding: "clamp(64px,10vw,120px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="line-grid" aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", right: -100, top: "50%", transform: "translateY(-50%)",
        width: 480, height: 480, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(142,99,245,0.07) 0%, transparent 70%)",
        pointerEvents: "none", filter: "blur(48px)",
      }} />
      <div className="section-divider" aria-hidden="true" />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", position: "relative" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "start",
        }}>
          {/* Left */}
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <Image src="/logo.png" alt="" width={28} height={28}
                aria-hidden="true" style={{ opacity: 0.75 }} />
              <p className="section-label">Por que Reliqube</p>
            </div>

            <h2 id="why-heading" className="section-heading" style={{ marginBottom: 20 }}>
              O nome diz{" "}
              <span className="gradient-text">tudo.</span>
            </h2>
            <p className="section-body" style={{ marginBottom: 28 }}>
              Reliqube une{" "}
              <strong style={{ color: "var(--violet-200)", fontWeight: 600 }}>Reliability</strong>{" "}
              e{" "}
              <strong style={{ color: "var(--violet-200)", fontWeight: 600 }}>Qube</strong>{" "}
              — um cubo que representa sistemas modulares e interconectados. Cada projeto que
              assumimos é construído em torno dessa geometria: composável, mensurável e durável.
            </p>

            <blockquote style={{
              padding: "20px 22px", margin: 0,
              borderRadius: "var(--radius-lg)",
              background: "var(--bg-raised)",
              border: "1px solid var(--border-subtle)",
              borderLeft: "3px solid var(--violet-400)",
            }}>
              <p style={{
                fontSize: "0.6875rem", fontFamily: "var(--font-geist-mono)",
                color: "var(--violet-400)", letterSpacing: "0.08em",
                marginBottom: 10, textTransform: "uppercase", fontWeight: 700,
              }}>Princípio central</p>
              <p style={{
                fontSize: "0.9375rem", lineHeight: 1.70,
                color: "var(--text-secondary)", fontStyle: "italic", margin: 0,
              }}>
                &ldquo;Confiabilidade é uma propriedade do sistema, não de componentes isolados.
                Arquitetamos para estabilidade emergente — do control plane ao último alerta.&rdquo;
              </p>
            </blockquote>
          </Reveal>

          {/* Right: pillars */}
          <Reveal delay={2} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {PILLARS.map((p) => (
              <div key={p.n} className="pillar-row">
                <div className="pillar-number">{p.n}</div>
                <div>
                  <h3 style={{
                    fontSize: "0.9375rem", fontWeight: 620,
                    letterSpacing: "-0.01em", color: "var(--text-primary)", marginBottom: 6,
                  }}>{p.title}</h3>
                  <p style={{
                    fontSize: "0.8125rem", lineHeight: 1.68,
                    color: "var(--text-secondary)", margin: 0,
                  }}>{p.body}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
