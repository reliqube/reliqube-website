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

/**
 * Isometric cube face generator — mirrors the geometry used in the
 * Reliqube logo mark (top / left / right faces sharing one vertex).
 *
 * (cx, cy) is the shared inner vertex of the three faces.
 * dx = horizontal half-width, dy = vertical half-height of the cube.
 */
function cubeFaces(cx: number, cy: number, dx: number, dy: number) {
  const A  = `${cx},${cy - dy}`;          // apex (top)
  const L  = `${cx - dx},${cy - dy / 2}`; // left vertex
  const R  = `${cx + dx},${cy - dy / 2}`; // right vertex
  const P  = `${cx},${cy}`;               // shared center vertex
  const B  = `${cx},${cy + dy}`;          // bottom vertex
  const BL = `${cx - dx},${cy + dy / 2}`; // bottom-left
  const BR = `${cx + dx},${cy + dy / 2}`; // bottom-right
  return {
    top:   `${A} ${R} ${P} ${L}`,
    left:  `${L} ${P} ${B} ${BL}`,
    right: `${R} ${P} ${B} ${BR}`,
    apex:  { x: cx, y: cy - dy },
  };
}

/**
 * CoreArchitecture — a single "core" cube (Reliqube) with five
 * satellite modules connected via short architectural traces, set
 * on a faint blueprint grid. Every position is hand-placed (pentagon
 * arrangement) — nothing is randomized.
 */
function CoreArchitecture() {
  // Core cube — center of the composition
  const core = cubeFaces(220, 160, 42, 45);
  const CORE_CENTER = { x: 220, y: 160 };
  const CORE_PORT_R = 50; // distance from core center to its connection ports

  // Five satellite modules in a pentagon, each mapped to a platform
  // discipline from the Stack section — reinforces "connected,
  // modular, cloud-native ecosystem" without literal icons.
  const SATELLITES = [
    { angleDeg: -90, label: "K8S" },  // top      — orchestration core
    { angleDeg: -18, label: "GTO" },  // upper-right — GitOps
    { angleDeg:  54, label: "OBS" },  // lower-right — Observability
    { angleDeg: 126, label: "SEC" },  // lower-left  — Security
    { angleDeg: 198, label: "CLD" },  // upper-left  — Cloud
  ].map(({ angleDeg, label }) => {
    const rad = (angleDeg * Math.PI) / 180;
    const dirX = Math.cos(rad);
    const dirY = Math.sin(rad);
    const SAT_DISTANCE = 120;
    const center = {
      x: CORE_CENTER.x + SAT_DISTANCE * dirX,
      y: CORE_CENTER.y + SAT_DISTANCE * dirY,
    };
    const cube = cubeFaces(center.x, center.y, 20, 21);
    const corePort = {
      x: CORE_CENTER.x + CORE_PORT_R * dirX,
      y: CORE_CENTER.y + CORE_PORT_R * dirY,
    };
    const satPort = {
      x: center.x - 24 * dirX,
      y: center.y - 24 * dirY,
    };
    return { cube, corePort, satPort, label, apex: cube.apex };
  });

  return (
    <svg
      viewBox="0 0 440 330"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
      aria-hidden="true"
    >
      <defs>
        {/* Fine blueprint grid */}
        <pattern id="bpGrid" width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M 22 0 L 0 0 0 22" stroke="rgba(142,99,245,0.05)" strokeWidth="0.6" fill="none" />
        </pattern>
        {/* Soft glow centered on the core */}
        <radialGradient id="coreGlow" cx="50%" cy="48%" r="55%">
          <stop offset="0%"  stopColor="rgba(142,99,245,0.14)" />
          <stop offset="100%" stopColor="rgba(142,99,245,0)" />
        </radialGradient>
      </defs>

      {/* ── Background: blueprint grid + glow ───────────── */}
      <rect width="440" height="330" fill="url(#bpGrid)" />
      <rect width="440" height="330" fill="url(#coreGlow)" />

      {/* ── Corner crop marks — drafting/blueprint cue ──── */}
      {[
        { x: 16, y: 16, dx: 1, dy: 1 },
        { x: 424, y: 16, dx: -1, dy: 1 },
        { x: 16, y: 314, dx: 1, dy: -1 },
        { x: 424, y: 314, dx: -1, dy: -1 },
      ].map((c, i) => (
        <g key={i} stroke="rgba(142,99,245,0.20)" strokeWidth="1" strokeLinecap="round">
          <line x1={c.x} y1={c.y} x2={c.x + 12 * c.dx} y2={c.y} />
          <line x1={c.x} y1={c.y} x2={c.x} y2={c.y + 12 * c.dy} />
        </g>
      ))}

      {/* ── Connection traces (drawn first, behind cubes) ─ */}
      {SATELLITES.map((s, i) => (
        <g key={`trace-${i}`}>
          <line
            x1={s.corePort.x} y1={s.corePort.y}
            x2={s.satPort.x}  y2={s.satPort.y}
            stroke="rgba(142,99,245,0.22)" strokeWidth="1" strokeDasharray="3 4"
          />
          <circle cx={s.corePort.x} cy={s.corePort.y} r="2"
            fill="rgba(200,178,255,0.55)" stroke="rgba(212,184,255,0.4)" strokeWidth="0.5" />
          <circle cx={s.satPort.x} cy={s.satPort.y} r="2"
            fill="rgba(200,178,255,0.45)" stroke="rgba(212,184,255,0.35)" strokeWidth="0.5" />
        </g>
      ))}

      {/* ── Satellite modules — translucent, secondary ──── */}
      {SATELLITES.map((s, i) => (
        <g key={`sat-${i}`}>
          <polygon points={s.cube.top}   fill="rgba(171,135,255,0.28)" stroke="rgba(212,184,255,0.16)" strokeWidth="0.6" />
          <polygon points={s.cube.left}  fill="rgba(142,99,245,0.30)"  stroke="rgba(212,184,255,0.16)" strokeWidth="0.6" />
          <polygon points={s.cube.right} fill="rgba(114,72,224,0.26)"  stroke="rgba(212,184,255,0.16)" strokeWidth="0.6" />
          <text
            x={s.apex.x} y={s.apex.y - 9}
            textAnchor="middle"
            fontFamily="var(--font-geist-mono)"
            fontSize="7" fontWeight="700" letterSpacing="1.5"
            fill="rgba(200,178,255,0.45)"
          >
            {s.label}
          </text>
        </g>
      ))}

      {/* ── Core cube — the Reliqube center, solid + vivid ─ */}
      <polygon points={core.top}   fill="rgba(171,135,255,0.88)" stroke="rgba(212,184,255,0.38)" strokeWidth="1" />
      <polygon points={core.left}  fill="rgba(142,99,245,0.90)"  stroke="rgba(212,184,255,0.38)" strokeWidth="1" />
      <polygon points={core.right} fill="rgba(114,72,224,0.85)"  stroke="rgba(212,184,255,0.38)" strokeWidth="1" />

      {/* Core "control point" — a single port on the top face */}
      <rect x="215" y="132.75" width="10" height="10" rx="1.5"
        fill="rgba(20,16,35,0.45)" stroke="rgba(212,184,255,0.45)" strokeWidth="0.6" />
      <circle cx="220" cy="137.75" r="2" fill="rgba(212,184,255,0.65)" />

      {/* Core label */}
      <text x="220" y="222" textAnchor="middle"
        fontFamily="var(--font-geist-mono)" fontSize="8" fontWeight="700"
        letterSpacing="3" fill="rgba(212,184,255,0.45)">
        CORE
      </text>
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
              <CoreArchitecture />
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
                  <h4 className="value-title">{v.title}</h4>
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
