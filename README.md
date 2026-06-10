# Reliqube — SRE & Platform Engineering Website

A premium dark-mode website for Reliqube, built with Next.js 16, TypeScript, and TailwindCSS v4.

---

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4 + CSS custom properties
- **Fonts**: Geist Sans + Geist Mono
- **Deployment**: Vercel

---

## Folder Structure

```
reliqube/
├── app/
│   ├── globals.css           # Design tokens, utilities, animations
│   ├── layout.tsx            # Root layout + SEO metadata
│   └── page.tsx              # Main page assembly
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx      # Animated canvas hero
│   │   ├── ServicesSection.tsx  # 5 service cards
│   │   ├── WhySection.tsx       # Brand pillars
│   │   ├── StackSection.tsx     # 24-tool tech stack grid
│   │   ├── AboutSection.tsx     # About + SVG illustration
│   │   └── ContactSection.tsx   # Contact form
│   └── shared/
│       ├── Logo.tsx
│       ├── Nav.tsx
│       └── Footer.tsx
└── vercel.json
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000

# Production build
npm run build && npm start
```

---

## Deploy to Vercel

### Via CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Via GitHub
1. Push to GitHub
2. Import at vercel.com/new
3. Click Deploy — zero config needed

---

## Design System

```css
/* Brand colors */
--purple-primary:  #7c5cbf
--purple-bright:   #9b6edb
--background:      #1a1a1f
--surface-1:       #22222a
--text-secondary:  #b0b0c8
```

Typography: Geist Sans (display + body), Geist Mono (code labels)

Responsive: mobile-first, breakpoints at 768px and 1024px.

---

## SEO

Configured in `app/layout.tsx`. Add your real domain:
```typescript
metadataBase: new URL("https://reliqube.com"),
```

Add OG image at `public/og-image.png` (1200×630px).

---

## Contact Form

Currently simulates submission. Connect to:
- **Resend**: `npm install resend` + API route
- **Formspree**: replace `handleSubmit` fetch URL
- **EmailJS**: client-side, no backend

---

© 2025 Reliqube. All rights reserved.
