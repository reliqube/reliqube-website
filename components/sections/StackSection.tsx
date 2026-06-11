// Server Component
import React from "react";
import { Reveal } from "@/components/interactive/Reveal";

const CATEGORIES = [
  { label: "Orquestração de Contêineres", items: [
    { name: "Kubernetes",  abbr: "K8s",  desc: "Orquestração de contêineres" },
    { name: "AKS",         abbr: "AKS",  desc: "Azure Kubernetes Service"    },
    { name: "EKS",         abbr: "EKS",  desc: "Elastic Kubernetes"          },
    { name: "Helm",        abbr: "HELM", desc: "Gestão de pacotes"           },
  ]},
  { label: "GitOps & Automação", items: [
    { name: "FluxCD",         abbr: "FLUX", desc: "GitOps para Kubernetes"   },
    { name: "Argo CD",        abbr: "ARGO", desc: "GitOps declarativo"       },
    { name: "Terraform",      abbr: "TF",   desc: "Infrastructure as Code"   },
    { name: "GitHub Actions", abbr: "GHA",  desc: "Pipelines de CI/CD"       },
  ]},
  { label: "Service Mesh & Redes", items: [
    { name: "Istio",   abbr: "ISTIO", desc: "Service mesh"       },
    { name: "Cilium",  abbr: "CLM",   desc: "Redes eBPF"         },
    { name: "Linkerd", abbr: "LNK",   desc: "Mesh leve"          },
    { name: "Envoy",   abbr: "ENV",   desc: "Proxy L7"            },
  ]},
  { label: "Observabilidade", items: [
    { name: "OpenTelemetry", abbr: "OTEL", desc: "Telemetria unificada"  },
    { name: "Grafana",       abbr: "GRF",  desc: "Visualização"          },
    { name: "Prometheus",    abbr: "PROM", desc: "Métricas & alertas"    },
    { name: "Loki",          abbr: "LOKI", desc: "Agregação de logs"     },
  ]},
  { label: "Segurança & Políticas", items: [
    { name: "OPA / Gatekeeper", abbr: "OPA", desc: "Policy as Code"      },
    { name: "Vault",             abbr: "VLT", desc: "Gestão de secrets"   },
    { name: "Falco",             abbr: "FLC", desc: "Segurança em runtime" },
    { name: "Trivy",             abbr: "TRV", desc: "Scan de vulnerabilidades" },
  ]},
  { label: "Plataformas Cloud", items: [
    { name: "Azure",      abbr: "AZ",  desc: "Microsoft cloud" },
    { name: "AWS",        abbr: "AWS", desc: "Amazon cloud"    },
    { name: "GCP",        abbr: "GCP", desc: "Google cloud"    },
    { name: "Cloudflare", abbr: "CF",  desc: "Edge & segurança" },
  ]},
];

export function StackSection() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      style={{
        background: "var(--bg-base)",
        padding: "clamp(64px,10vw,120px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="dot-grid" aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.38,
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", left: -80, top: "35%",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(142,99,245,0.07) 0%, transparent 70%)",
        filter: "blur(52px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", position: "relative" }}>
        <Reveal style={{ marginBottom: 52 }}>
          <p className="section-label" style={{ marginBottom: 12 }}>Tecnologias</p>
          <h2 id="stack-heading" className="section-heading" style={{ marginBottom: 14, maxWidth: 480 }}>
            Cloud-native{" "}
            <span className="gradient-text">do início ao fim.</span>
          </h2>
          <p className="section-body" style={{ maxWidth: 460 }}>
            Trabalhamos com as ferramentas que definem o Platform Engineering moderno —
            battle-tested, alinhadas ao CNCF e integradas por design.
          </p>
        </Reveal>

        <Reveal delay={2} style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
          gap: 16,
          minWidth: 0,
        }}>
          {CATEGORIES.map((cat) => (
            <div key={cat.label} style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-faint)",
              borderRadius: "var(--radius-lg)",
              padding: "20px 20px 18px",
              minWidth: 0,
              maxWidth: "100%",
              overflow: "hidden",
            }}>
              <p style={{
                fontSize: "0.6875rem", fontWeight: 700,
                letterSpacing: "0.09em", textTransform: "uppercase",
                color: "var(--violet-500)", marginBottom: 14,
              }}>{cat.label}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
                {cat.items.map((item) => (
                  <div key={item.name} className="tool-chip">
                    <div className="tool-abbr">{item.abbr.slice(0, 5)}</div>
                    <div style={{ minWidth: 0, maxWidth: "100%" }}>
                      <div className="tool-name">{item.name}</div>
                      <div className="tool-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Reveal>

        <p style={{
          marginTop: 24, fontSize: "0.75rem", color: "var(--text-tertiary)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span aria-hidden="true" style={{
            width: 5, height: 5, borderRadius: "50%",
            background: "var(--violet-600)", flexShrink: 0,
          }} />
          Principalmente alinhadas com projetos do ecossistema CNCF e serviços gerenciados dos principais cloud providers.
        </p>
      </div>
    </section>
  );
}
