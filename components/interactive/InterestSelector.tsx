"use client";

import React, { useState } from "react";

const INTERESTS = [
  "SRE & Reliability",
  "Kubernetes / Platform",
  "Observability",
  "GitOps / Automation",
  "Cloud Architecture",
  "Other",
];

interface InterestSelectorProps {
  name?: string;
}

export function InterestSelector({ name = "interest" }: InterestSelectorProps) {
  const [selected, setSelected] = useState("");

  return (
    <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
      <legend
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "var(--text-tertiary)",
          marginBottom: 8,
          letterSpacing: "0.02em",
        }}
      >
        Area of interest
      </legend>
      {/* Hidden input carries the value for native form submission */}
      <input type="hidden" name={name} value={selected} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {INTERESTS.map((interest) => {
          const active = selected === interest;
          return (
            <button
              key={interest}
              type="button"
              aria-pressed={active}
              onClick={() => setSelected((v) => (v === interest ? "" : interest))}
              style={{
                padding: "5px 13px",
                borderRadius: 999,
                fontSize: "0.75rem",
                fontWeight: 500,
                border: "1px solid",
                borderColor: active ? "var(--border-strong)" : "var(--border-faint)",
                background:  active ? "rgba(124,92,191,0.18)" : "var(--bg-raised)",
                color:       active ? "var(--violet-200)"     : "var(--text-tertiary)",
                cursor: "pointer",
                transition: "all 150ms ease",
              }}
            >
              {interest}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
