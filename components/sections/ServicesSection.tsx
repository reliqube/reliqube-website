// Server Component
import React from "react";
import { Reveal } from "@/components/interactive/Reveal";

const SERVICES = [
  {
    iconPath: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "SRE & Engenharia de Confiabilidade",
    sub:   "Sistemas honestos com os seus usuários",
    body:  "Definição de SLOs, alertas de burn-rate, playbooks de incidente, engenharia do caos e gestão de error budget. Operacionalizamos confiabilidade como uma disciplina de engenharia mensurável.",
    tags:  ["SLOs", "Error Budgets", "Chaos Eng.", "Gestão de Incidentes"],
  },
  {
    iconPath: "M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9",
    title: "Kubernetes & Platform Engineering",
    sub:   "Construa a fundação certa",
    body:  "Design completo de plataformas Kubernetes — arquitetura de clusters, multi-tenancy, service mesh, admission controllers e plataformas internas de desenvolvimento que aceleram os seus times.",
    tags:  ["Kubernetes", "AKS/EKS/GKE", "Istio", "Dev Platforms"],
  },
  {
    iconPath: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    title: "Arquitetura de Observabilidade",
    sub:   "Visibilidade total, sem pontos cegos",
    body:  "Observabilidade full-stack com métricas, logs e traces. Instrumentação com OpenTelemetry, design da stack Grafana, padrões de dashboards e filosofia de alertas para ambientes em escala.",
    tags:  ["OpenTelemetry", "Grafana", "Prometheus", "Tracing"],
  },
  {
    iconPath: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99",
    title: "GitOps & Automação",
    sub:   "Tudo como código",
    body:  "Fluxos GitOps com FluxCD e Argo CD, IaC com Terraform, pipelines de CI/CD e policy-as-code. Elimine configuration drift. Automatize tudo o que for repetível.",
    tags:  ["FluxCD", "ArgoCD", "Terraform", "GitHub Actions"],
  },
  {
    iconPath: "M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z",
    title: "Arquitetura Cloud & Migração",
    sub:   "Evolua com segurança",
    body:  "Reviews de arquitetura cloud-native, planejamento de migração, estratégias multi-cloud, avaliações well-architected e otimização de FinOps. Evolua a sua infraestrutura sem interrupções.",
    tags:  ["Azure", "AWS", "GCP", "FinOps"],
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      style={{
        background: "var(--bg-base)",
        padding: "clamp(64px,10vw,120px) 0",
        position: "relative",
      }}
    >
      <div className="dot-grid" aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.45,
      }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", position: "relative" }}>
        <Reveal style={{ marginBottom: 52 }}>
          <p className="section-label" style={{ marginBottom: 12 }}>O Que Fazemos</p>
          <h2 id="services-heading" className="section-heading" style={{ marginBottom: 14, maxWidth: 540 }}>
            Serviços de engenharia{" "}
            <span className="gradient-text">feitos para durar.</span>
          </h2>
          <p className="section-body" style={{ maxWidth: 480 }}>
            Somos especialistas nas disciplinas que fazem plataformas cloud-native
            operarem no padrão que a engenharia moderna exige.
          </p>
        </Reveal>

        <Reveal delay={2} style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          gap: 16,
        }}>
          {SERVICES.map((s) => (
            <article key={s.title} className="service-card">
              <div className="card-icon" aria-hidden="true">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" strokeWidth={1.6}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.iconPath} />
                </svg>
              </div>
              <p style={{
                fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.07em",
                textTransform: "uppercase", color: "var(--violet-500)", marginBottom: 4,
              }}>{s.sub}</p>
              <h3 style={{
                fontSize: "0.9375rem", fontWeight: 650, letterSpacing: "-0.015em",
                color: "var(--text-primary)", lineHeight: 1.3, marginBottom: 12,
              }}>{s.title}</h3>
              <p style={{
                fontSize: "0.8125rem", lineHeight: 1.72,
                color: "var(--text-secondary)", marginBottom: 20, flexGrow: 1,
              }}>{s.body}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {s.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
