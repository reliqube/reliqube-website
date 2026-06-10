"use client";

import React, { useEffect, useRef } from "react";

const DELAY_MS = { 0: 0, 1: 80, 2: 160, 3: 240, 4: 320 } as const;

interface RevealProps {
  children: React.ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4;
  threshold?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

/**
 * Scroll-triggered fade-up reveal.
 * Always renders a <div> — keeps TypeScript strict and DOM clean.
 * Wrap in a semantic element at the call-site if needed.
 */
export function Reveal({
  children,
  delay = 0,
  threshold = 0.12,
  className = "",
  style,
  id,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("visible");
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      id={id}
      className={`reveal ${className}`.trim()}
      style={{ transitionDelay: `${DELAY_MS[delay]}ms`, ...style }}
    >
      {children}
    </div>
  );
}
