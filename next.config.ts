import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Compiler ──────────────────────────────────────────────
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // ── Images ────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128],
    minimumCacheTTL: 31536000, // 1 year
  },

  // ── Security + performance headers ────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff"                        },
          { key: "X-Frame-Options",           value: "DENY"                           },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin"},
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-XSS-Protection",          value: "1; mode=block"                  },
        ],
      },
      {
        source: "/(.*)\\.(ico|png|jpg|jpeg|svg|webp|avif|woff|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  // ── Redirects ─────────────────────────────────────────────
  async redirects() {
    return [
      {
        source:      "/:path*",
        has:         [{ type: "host", value: "www.reliqube.com" }],
        destination: "https://reliqube.com/:path*",
        permanent:   true,
      },
    ];
  },

  poweredByHeader: false,
};

export default nextConfig;
