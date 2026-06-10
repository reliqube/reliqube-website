"use client";

import React, { useState } from "react";

interface HoverCardProps {
  children: (hovered: boolean) => React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
}

export function HoverCard({
  children,
  as: Tag = "div",
  className,
  style,
}: HoverCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Tag
      className={className}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {children(hovered)}
    </Tag>
  );
}
