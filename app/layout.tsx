import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SkipLink } from "@/components/shared/SkipLink";
import "./globals.css";

/* ─── Viewport ─────────────────────────────────────────── */
export const viewport: Viewport = {
  themeColor:   "#15151a",
  colorScheme:  "dark",
  width:        "device-width",
  initialScale: 1,
  viewportFit:  "cover",
};

/* ─── Metadata ─────────────────────────────────────────── */
const BASE_URL   = "https://reliqube.com";
const TITLE      = "Reliqube — Consultoria em SRE & Platform Engineering";
const DESCRIPTION =
  "A Reliqube é uma consultoria especializada em SRE e Platform Engineering. " +
  "Projetamos e operamos plataformas cloud-native de alta confiabilidade — " +
  "de arquitetura Kubernetes à observabilidade full-stack e automação GitOps.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default:  TITLE,
    template: "%s · Reliqube",
  },
  description: DESCRIPTION,
  applicationName: "Reliqube",

  keywords: [
    "consultoria SRE", "Site Reliability Engineering", "Platform Engineering",
    "consultoria Kubernetes", "GitOps", "arquitetura de observabilidade",
    "Cloud Native", "consultoria DevOps", "AKS", "confiabilidade de sistemas",
    "OpenTelemetry", "Grafana", "Terraform", "FluxCD",
    "engenharia de confiabilidade Brasil",
  ],

  authors:   [{ name: "Reliqube", url: BASE_URL }],
  creator:   "Reliqube",
  publisher: "Reliqube",

  alternates: {
    canonical: BASE_URL,
    languages: { "pt-BR": BASE_URL },
  },

  openGraph: {
    type:        "website",
    locale:      "pt_BR",
    url:         BASE_URL,
    siteName:    "Reliqube",
    title:       TITLE,
    description: DESCRIPTION,
    images: [{
      url:    "/og-image.png",
      width:  1200,
      height: 630,
      alt:    "Reliqube — Consultoria em SRE & Platform Engineering",
      type:   "image/png",
    }],
  },

  twitter: {
    card:        "summary_large_image",
    site:        "@reliqube",
    creator:     "@reliqube",
    title:       TITLE,
    description: DESCRIPTION,
    images:      [{ url: "/og-image.png", alt: "Reliqube" }],
  },

  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:                true,
      follow:               true,
      "max-video-preview":  -1,
      "max-image-preview":  "large",
      "max-snippet":        -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico",  sizes: "any"      },
      { url: "/icon-16.png",  type: "image/png", sizes: "16x16"   },
      { url: "/icon-32.png",  type: "image/png", sizes: "32x32"   },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple:   [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },

  manifest: "/manifest.webmanifest",

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? undefined,
  },

  category: "technology",
};

/* ─── Structured data ──────────────────────────────────── */
const organizationSchema = {
  "@context":   "https://schema.org",
  "@type":      "Organization",
  name:          "Reliqube",
  url:           BASE_URL,
  logo:          `${BASE_URL}/icon-512.png`,
  description:   DESCRIPTION,
  foundingDate:  "2024",
  contactPoint: {
    "@type":           "ContactPoint",
    contactType:       "customer service",
    email:             "reliqube@gmail.com",
    availableLanguage: ["Portuguese", "English"],
  },
  sameAs: [
    "https://linkedin.com/company/reliqube",
    "https://github.com/reliqube",
  ],
  areaServed: "Worldwide",
  knowsAbout: [
    "Site Reliability Engineering", "Platform Engineering",
    "Kubernetes", "Cloud Native", "DevOps", "Observabilidade", "GitOps",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type":    "WebSite",
  name:       "Reliqube",
  url:         BASE_URL,
};

/* ─── Root Layout ──────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      dir="ltr"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
