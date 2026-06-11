"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

function useGeometricCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf: number;
    let w = 0, h = 0;
    const NODES = 40, DIST = 150;
    const nodes: { x: number; y: number; vx: number; vy: number; r: number; pulse: number }[] = [];

    function init() {
      w = canvas!.width = canvas!.offsetWidth;
      h = canvas!.height = canvas!.offsetHeight;
      nodes.length = 0;
      for (let i = 0; i < NODES; i++) {
        nodes.push({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.20,
          vy: (Math.random() - 0.5) * 0.20,
          r: Math.random() * 1.4 + 0.6,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        n.pulse += 0.018;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < DIST) {
            const a = ((DIST - d) / DIST) * 0.09;
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(142, 99, 245, ${a})`;
            ctx!.lineWidth = 0.7;
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
        const glow = 0.22 + Math.sin(nodes[i].pulse) * 0.08;
        ctx!.beginPath();
        ctx!.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(142, 99, 245, ${glow})`;
        ctx!.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    init(); draw();
    const ro = new ResizeObserver(init);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return ref;
}

function HeroBrandMark() {
  return (
    <div
      aria-hidden="true"
      className="hidden lg:flex"
      style={{
        position: "absolute",
        right: "clamp(-80px, -2vw, 40px)",
        top: "50%", transform: "translateY(-52%)",
        width: "clamp(442px, 47vw, 624px)",
        aspectRatio: "1/1", pointerEvents: "none",
        alignItems: "center", justifyContent: "center",
      }}
    >
      <div style={{
        position: "absolute", inset: "10%", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(142,99,245,0.10) 0%, transparent 65%)",
        filter: "blur(32px)",
      }} />
      <Image src="/logo.png" alt="" width={420} height={420} style={{
        width: "100%", height: "auto",
        opacity: 0.09, filter: "brightness(1.4) saturate(1.2)", mixBlendMode: "screen",
      }} priority />
    </div>
  );
}

export function HeroSection() {
  const canvasRef = useGeometricCanvas();

  return (
    <section
      id="hero"
      aria-label="Início"
      style={{
        position: "relative", minHeight: "100svh",
        display: "flex", alignItems: "center",
        overflow: "hidden", background: "var(--bg-base)",
      }}
    >
      <canvas ref={canvasRef} aria-hidden="true" style={{
        position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 1,
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(129,88,249,0.08) 0%, transparent 70%)",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 200,
        background: "linear-gradient(to top, var(--bg-base) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />
      <HeroBrandMark />

      <div style={{
        position: "relative", zIndex: 10, width: "100%",
        maxWidth: 1280, margin: "0 auto",
        padding: "clamp(96px, 17vh, 148px) 20px clamp(64px, 10vh, 112px)",
      }}>
        <div style={{ maxWidth: 620 }}>

          {/* Badge */}
          <div className="badge" style={{ display: "inline-flex", marginBottom: 28 }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "var(--violet-400)",
              boxShadow: "0 0 8px var(--violet-400)", flexShrink: 0,
            }} aria-hidden="true" />
            SRE · Platform Engineering · Cloud Native
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(2.5rem, 5.8vw, 4.5rem)",
            fontWeight: 800, lineHeight: 1.05,
            letterSpacing: "-0.04em", color: "var(--text-primary)", marginBottom: 20,
          }}>
            Engenharia de{" "}
            <span className="gradient-text">confiabilidade</span>
            <br />
            na sua plataforma.
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: "clamp(1rem, 1.8vw, 1.125rem)",
            lineHeight: 1.75, color: "var(--text-secondary)",
            marginBottom: 14, maxWidth: 500,
          }}>
            Projetamos e operamos plataformas cloud-native de alta confiabilidade —
            da arquitetura Kubernetes à observabilidade full-stack.
          </p>

          {/* Slogan — kept in English per brief */}
          <p style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.75rem", letterSpacing: "0.10em",
            textTransform: "uppercase", color: "var(--violet-400)",
            marginBottom: 40, opacity: 0.85,
          }}>
            Building reliability, block by block.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 56 }}>
            <a
              href="#contact"
              className="btn-primary"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              Iniciar uma conversa
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4-4 4M21 12H3" />
              </svg>
            </a>
            <a
              href="#services"
              className="btn-ghost"
              onClick={(e) => { e.preventDefault(); document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              Ver serviços
            </a>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: "20px 40px",
            paddingTop: 28, borderTop: "1px solid var(--border-faint)",
          }}>
            {[
              { value: "99,9%",      label: "Atingimento de SLO"      },
              { value: "K8s-native", label: "Arquitetura de plataforma" },
              { value: "Full-stack", label: "Observabilidade"           },
            ].map((s) => (
              <div key={s.label}>
                <div style={{
                  fontSize: "1.25rem", fontWeight: 700,
                  letterSpacing: "-0.025em", color: "var(--violet-200)", lineHeight: 1.2,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize: "0.6875rem", color: "var(--text-tertiary)",
                  marginTop: 3, fontFamily: "var(--font-geist-mono)", letterSpacing: "0.03em",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
