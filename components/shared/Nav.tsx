"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { label: "Serviços",     href: "#services" },
  { label: "Por que Reliqube", href: "#why" },
  { label: "Tecnologias",  href: "#stack"    },
  { label: "Sobre",        href: "#about"    },
];

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Nav() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]         = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = NAV_LINKS.map((l) => l.href.slice(1));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleLink = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollTo(href);
  }, []);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Navegação principal"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          height: 64,
          background: scrolled ? "rgba(19,19,26,0.90)" : "rgba(19,19,26,0.30)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: `1px solid ${scrolled ? "rgba(142,99,245,0.12)" : "transparent"}`,
          transition: "background 280ms ease, border-color 280ms ease",
        }}
      >
        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: "0 20px",
          height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <a
            href="#top"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            aria-label="Reliqube — voltar ao início"
            style={{ textDecoration: "none", flexShrink: 0 }}
          >
            <Logo size={32} />
          </a>

          {/* Desktop links */}
          <ul role="list" style={{ display: "none", gap: 4, listStyle: "none", margin: 0, padding: 0 }} className="md-flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLink(e, link.href)}
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      position: "relative",
                      display: "inline-flex", alignItems: "center",
                      padding: "6px 14px", borderRadius: "var(--radius-md)",
                      fontSize: "0.875rem",
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? "var(--violet-200)" : "var(--text-secondary)",
                      background: isActive ? "rgba(142,99,245,0.10)" : "transparent",
                      textDecoration: "none",
                      transition: "color 150ms ease, background 150ms ease",
                      letterSpacing: "-0.005em",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                        (e.currentTarget as HTMLElement).style.background = "rgba(142,99,245,0.07)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                      }
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <span aria-hidden="true" style={{
                        position: "absolute", bottom: 3, left: "50%",
                        transform: "translateX(-50%)",
                        width: 18, height: 2, borderRadius: 999,
                        background: "var(--violet-400)", opacity: 0.8,
                      }} />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div style={{ display: "none" }} className="md-block">
            <a href="#contact" onClick={(e) => handleLink(e, "#contact")}
              className="btn-primary" style={{ padding: "8px 20px", fontSize: "0.8125rem" }}>
              Fale conosco
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 38, height: 38, borderRadius: "var(--radius-md)",
              border: "1px solid",
              borderColor: mobileOpen ? "rgba(142,99,245,0.28)" : "transparent",
              background: mobileOpen ? "rgba(142,99,245,0.10)" : "transparent",
              color: "var(--text-secondary)", cursor: "pointer",
              transition: "all 150ms ease", padding: 0,
            }}
            className="md-hidden"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <g style={{ transition: "all 200ms ease", transformOrigin: "center" }}>
                <rect x="2" y={mobileOpen ? "8.25" : "3.5"} width="14" height="1.5" rx="0.75"
                  fill="currentColor"
                  style={{ transform: mobileOpen ? "rotate(45deg)" : "none", transformOrigin: "9px 9px", transition: "all 220ms var(--ease-out-expo)" }} />
                <rect x="2" y="8.25" width="14" height="1.5" rx="0.75" fill="currentColor"
                  style={{ opacity: mobileOpen ? 0 : 1, transition: "opacity 150ms ease" }} />
                <rect x="2" y={mobileOpen ? "8.25" : "13"} width="14" height="1.5" rx="0.75"
                  fill="currentColor"
                  style={{ transform: mobileOpen ? "rotate(-45deg)" : "none", transformOrigin: "9px 9px", transition: "all 220ms var(--ease-out-expo)" }} />
              </g>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(10,8,18,0.65)" }}
          onClick={() => setMobileOpen(false)} aria-hidden="true" />
      )}

      {/* Mobile drawer */}
      <div id="mobile-nav" role="dialog" aria-label="Menu de navegação" aria-modal="true"
        style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 49,
          background: "rgba(19,19,26,0.97)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(142,99,245,0.14)",
          padding: "8px 20px 24px",
          transform: mobileOpen ? "translateY(0)" : "translateY(-10px)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "transform 220ms var(--ease-out-expo), opacity 180ms ease",
        }}>
        <ul role="list" style={{ listStyle: "none", margin: "0 0 16px", padding: 0 }}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={(e) => handleLink(e, link.href)} style={{
                display: "block", padding: "12px 4px",
                fontSize: "0.9375rem", fontWeight: 500,
                color: active === link.href.slice(1) ? "var(--violet-200)" : "var(--text-secondary)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(142,99,245,0.07)",
                transition: "color 150ms ease",
              }}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" onClick={(e) => handleLink(e, "#contact")}
          className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
          Fale conosco
        </a>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .md-flex   { display: flex !important; }
          .md-block  { display: block !important; }
          .md-hidden { display: none !important; }
        }
      `}</style>
    </>
  );
}
