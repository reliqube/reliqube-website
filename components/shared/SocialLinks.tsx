"use client";
import React, { useState } from "react";

const LINKS = [
  {
    href: "https://linkedin.com/company/reliqube",
    label: "Reliqube no LinkedIn",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    external: true,
  },
  {
    href: "mailto:reliqube@gmail.com",
    label: "Enviar e-mail para a Reliqube",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    external: false,
  },
];

function IconLink({ href, label, icon, external }: typeof LINKS[0]) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        width: 34, height: 34,
        borderRadius: "var(--radius-md)",
        border: `1px solid ${hov ? "var(--border-subtle)" : "var(--border-faint)"}`,
        background: hov ? "var(--bg-overlay)" : "var(--bg-raised)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: hov ? "var(--violet-300)" : "var(--text-tertiary)",
        textDecoration: "none",
        transition: "all 150ms ease",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {icon}
    </a>
  );
}

export function SocialLinks() {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {LINKS.map((l) => <IconLink key={l.href} {...l} />)}
    </div>
  );
}
