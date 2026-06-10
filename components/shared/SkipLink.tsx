"use client";
import React from "react";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{
        position: "absolute",
        top: -100,
        left: 8,
        zIndex: 9999,
        padding: "8px 16px",
        borderRadius: 6,
        background: "var(--violet-500)",
        color: "#fff",
        fontSize: "0.875rem",
        fontWeight: 600,
        textDecoration: "none",
        transition: "top 150ms ease",
      }}
      onFocus={(e) => ((e.currentTarget as HTMLElement).style.top = "8px")}
      onBlur={(e)  => ((e.currentTarget as HTMLElement).style.top = "-100px")}
    >
      Ir para o conteúdo principal
    </a>
  );
}
