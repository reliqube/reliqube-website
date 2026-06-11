// Server Component
import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/interactive/Reveal";

const VALUES = [
  {
    title: "Apenas engenheiros sênior",
    body:  "Cada projeto é liderado por engenheiros sênior. Sem juniores aprendendo na sua infraestrutura.",
  },
  {
    title: "Opinativo, não dogmático",
    body:  "Trazemos um ponto de vista sólido de engenharia — e o adaptamos às suas restrições e contexto.",
  },
  {
    title: "Transferência, não dependência",
    body:  "Deixamos seus times mais capazes do que os encontramos. Transferência de conhecimento é uma entrega.",
  },
  {
    title: "Precisão acima de velocidade",
    body:  "Confiabilidade significa acertar a arquitetura na primeira vez.",
  },
];

function ModularGrid() {
  const cells = Array.from({ length: 8 }, (_, r) =>
    Array.from({ length: 6 }, (_, c) => {
      const ox = c * 56 + (r % 2) * 28;
      const oy = r * 32 + 8;
      const shade = ((r + c) % 3) * 0.012;
      return (
        <polygon key={`${r}-${c}`}
          points={`${ox+28},${oy} ${ox+56},${oy+16} ${ox+28},${oy+32} ${ox},${oy+16}`}
          stroke={`rgba(142,99,245,${0.06 + shade})`} strokeWidth="0.7" fill="none" />
      );
    })
  );
  return (
    <svg viewBox="0 0 360 280" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
      aria-hidden="true">
      <defs>
        <radialGradient id="abGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(142,99,245,0.12)" />
          <stop offset="100%" stopColor="rgba(142,99,245,0)" />
        </radialGradient>
      </defs>
      {cells}
      <polygon points="180,80  220,102 220,146 180,124" fill="rgba(114,72,224,0.55)" />
      <polygon points="140,102 140,146 180,168 180,124" fill="rgba(142,99,245,0.55)" />
      <polygon points="140,102 180,80  220,102 180,124" fill="rgba(171,135,255,0.45)" />
      <path d="M148,118 L160,118 L160,128 L152,128 L152,138 L166,138"
        stroke="#d4b8ff" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.55" />
      <polygon points="248,54 276,68 276,96 248,82"  fill="rgba(114,72,224,0.45)" />
      <polygon points="220,68 220,96 248,110 248,82" fill="rgba(142,99,245,0.45)" />
      <polygon points="220,68 248,54 276,68 248,82"  fill="rgba(171,135,255,0.38)" />
      <polygon points="112,148 140,162 140,190 112,176" fill="rgba(114,72,224,0.35)" />
      <polygon points="84,162  84,190 112,204 112,176" fill="rgba(142,99,245,0.35)" />
      <polygon points="84,162  112,148 140,162 112,176" fill="rgba(171,135,255,0.28)" />
      <line x1="220" y1="68" x2="180" y2="80"  stroke="rgba(142,99,245,0.20)" strokeWidth="1" strokeDasharray="4 3" />
      <line x1="140" y1="146" x2="112" y2="148" stroke="rgba(142,99,245,0.16)" strokeWidth="1" strokeDasharray="4 3" />
      {([[180,168],[248,110],[112,204]] as [number,number][]).map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5"
          fill="rgba(142,99,245,0.30)" stroke="rgba(171,135,255,0.6)" strokeWidth="1" />
      ))}
      <rect width="360" height="280" fill="url(#abGlow)" />
    </svg>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      style={{
        background: "var(--bg-surface)",
        padding: "clamp(64px,10vw,120px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="line-grid" aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.65,
      }} />
      <div className="section-divider" aria-hidden="true" />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", position: "relative" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "center",
        }}>
          {/* Illustration */}
          <Reveal>
            <div style={{
              position: "relative", borderRadius: "var(--radius-xl)",
              background: "var(--bg-raised)", border: "1px solid var(--border-subtle)",
              overflow: "hidden", aspectRatio: "4/3", maxWidth: 440, margin: "0 auto",
            }}>
              <ModularGrid />
              <div style={{
                position: "absolute", inset: 0, display: "flex",
                alignItems: "center", justifyContent: "center", pointerEvents: "none",
              }}>
                <Image src="/logo.png" alt="" width={120} height={120} aria-hidden="true"
                  style={{ opacity: 0.12, filter: "brightness(1.5) saturate(1.3)", mixBlendMode: "screen" }} />
              </div>
              <p style={{
                position: "absolute", bottom: 14, left: 16, right: 16,
                fontFamily: "var(--font-geist-mono)", fontSize: "0.6875rem",
                color: "var(--text-tertiary)", letterSpacing: "0.04em", margin: 0,
              }}>
                <span style={{ color: "var(--violet-400)" }}>confiabilidade</span>
                .arquitetura.modular
              </p>
            </div>
          </Reveal>

          {/* Content */}
          <Reveal delay={2}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <Image src="/logo.png" alt="" width={28} height={28}
                aria-hidden="true" style={{ opacity: 0.75 }} />
              <p className="section-label">Sobre</p>
            </div>

            <h2 id="about-heading" className="section-heading" style={{ marginBottom: 20 }}>
              Construída em{" "}
              <span className="gradient-text">primeiros princípios.</span>
            </h2>

            <p className="section-body" style={{ marginBottom: 14 }}>
              A Reliqube foi fundada por engenheiros que passaram anos construindo e operando
              plataformas cloud-native em larga escala. Cansamos de ver organizações lutando
              contra os mesmos problemas resolvíveis — deploys instáveis, infraestrutura
              opaca e times que não conseguem avançar com confiança.
            </p>
            <p className="section-body" style={{ marginBottom: 32 }}>
              Focamos em um conjunto restrito de disciplinas e vamos fundo. Nossos projetos
              melhoram o sistema{" "}
              <em style={{ color: "var(--violet-200)", fontStyle: "normal" }}>e</em>{" "}
              o time — para que, quando saímos, sua plataforma seja mais confiável
              do que quando chegamos.
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))",
              gap: 10,
            }}>
              {VALUES.map((v) => (
                <div key={v.title} className="value-card">
                  <div className="value-bar" aria-hidden="true" />
                  <h3 className="value-title">{v.title}</h3>
                  <p style={{
                    fontSize: "0.75rem", lineHeight: 1.58,
                    color: "var(--text-tertiary)", margin: 0,
                  }}>{v.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
