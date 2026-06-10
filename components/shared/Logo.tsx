// Server Component — uses the real uploaded logo image
import React from "react";
import Image from "next/image";

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 36, showText = true, className = "" }: LogoProps) {
  return (
    <div
      className={className}
      aria-label="Reliqube"
      style={{ display: "flex", alignItems: "center", gap: Math.round(size * 0.28) }}
    >
      <Image
        src="/logo.png"
        alt="Reliqube logo"
        width={size}
        height={size}
        priority
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          flexShrink: 0,
        }}
      />
      {showText && (
        <span
          style={{
            fontSize: Math.round(size * 0.50),
            fontFamily: "var(--font-geist-sans)",
            fontWeight: 700,
            letterSpacing: "-0.028em",
            color: "var(--text-primary)",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          Reli<span style={{ color: "var(--violet-400)" }}>qube</span>
        </span>
      )}
    </div>
  );
}
