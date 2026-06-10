# Reliqube — Production Checklist & Deployment Guide

## ✅ Pre-launch Checklist

### Domain & DNS
- [x] Domain `reliqube.com` purchased and DNS managed (Cloudflare recommended)
- [x] Add domain in Vercel dashboard → Project Settings → Domains
- [x] Verify `www.reliqube.com` → redirects to `reliqube.com` (handled by `next.config.ts`)
- [x] HTTPS auto-provisioned by Vercel (Let's Encrypt)

### SEO & Indexing
- [x] Submit `reliqube.com` to [Google Search Console](https://search.google.com/search-console)
- [x] Copy verification token → set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` env var
- [x] Submit sitemap: `https://reliqube.com/sitemap.xml` (generate with `next-sitemap` — see below)
- [x] Test OG image: [opengraph.xyz/url/https://reliqube.com](https://opengraph.xyz)
- [ ] Test structured data: [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
- [ ] Verify canonical URL in rendered HTML (`<link rel="canonical">`)

### Performance
- [ ] Run Lighthouse audit in Chrome DevTools (target: Performance ≥95, A11y ≥95)
- [ ] Test on mobile: Chrome DevTools → Toggle device toolbar → Moto G4
- [ ] Test on slow 3G: Chrome DevTools → Network → Slow 3G
- [ ] Check Core Web Vitals in Vercel Analytics after first traffic

### Accessibility
- [ ] Tab through entire page with keyboard — all interactive elements reachable
- [ ] Screen reader test: VoiceOver (macOS) or NVDA (Windows)
- [ ] Verify skip-link works: Tab on first load → "Skip to main content" visible → Enter jumps to `#main-content`
- [ ] Confirm focus rings visible on all interactive elements (buttons, links, inputs)
- [ ] Check color contrast: [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker)

### Contact Form
- [ ] Connect real form endpoint (see options below)
- [ ] Test form submission end-to-end
- [ ] Add spam protection (Cloudflare Turnstile or hCaptcha)

### Analytics
- [ ] Enable Vercel Analytics in Project Settings → Analytics
- [ ] Optional: add Plausible for privacy-first analytics

---

## 🚀 Vercel Deployment

### Recommended Settings (Vercel Dashboard)

```
Framework Preset:    Next.js       (auto-detected)
Build Command:       npm run build
Output Directory:    .next
Install Command:     npm ci
Node.js Version:     20.x
```

### Environment Variables to Set in Vercel

| Variable | Value | Required |
|----------|-------|----------|
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console token | Optional |
| `RESEND_API_KEY` | From resend.com | When using Resend |
| `NODE_ENV` | `production` | Auto-set by Vercel |

### Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# First deploy (follow prompts to link project)
vercel

# Production deploy
vercel --prod

# Preview deploy (staging)
vercel --target preview
```

### Deploy via GitHub (recommended)

1. Push project to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Set environment variables in Project Settings → Environment Variables
4. Every push to `main` auto-deploys to production
5. Every PR creates a preview deployment

---

## 📬 Contact Form Integration

### Option A — Resend (recommended, free tier: 3,000/month)

```bash
npm install resend
```

Create `app/api/contact/route.ts`:
```typescript
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, company, interest, message } = await req.json();

  await resend.emails.send({
    from:    "website@reliqube.com",
    to:      "reliqube@gmail.com",
    subject: `New enquiry from ${name} — ${interest || "General"}`,
    text:    `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`,
  });

  return NextResponse.json({ ok: true });
}
```

Update `ContactForm.tsx` `handleSubmit` to call the API:
```typescript
await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
```

### Option B — Formspree (no backend needed)

Replace `handleSubmit` in `ContactForm.tsx`:
```typescript
await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  body: JSON.stringify(formData),
});
```

---

## 🗺️ Sitemap (optional, recommended)

```bash
npm install next-sitemap
```

Create `next-sitemap.config.js`:
```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://reliqube.com",
  generateRobotsTxt: true,
  changefreq: "monthly",
  priority: 0.8,
};
```

Add to `package.json`:
```json
"scripts": {
  "postbuild": "next-sitemap"
}
```

---

## 🔒 Security Headers (already configured)

The following headers are set in `next.config.ts`:

| Header | Value |
|--------|-------|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |

Verify at: [securityheaders.com/?q=reliqube.com](https://securityheaders.com)

---

## 📊 Performance Targets

| Metric | Target | Description |
|--------|--------|-------------|
| LCP | < 2.5s | Largest Contentful Paint |
| FID / INP | < 100ms | Interaction to Next Paint |
| CLS | < 0.1 | Cumulative Layout Shift |
| Lighthouse Performance | ≥ 95 | |
| Lighthouse Accessibility | ≥ 95 | |
| Lighthouse SEO | 100 | |
| Lighthouse Best Practices | 100 | |

---

## 🏗️ Architecture Summary

### Rendering strategy
- **All section components**: Server Components (zero client JS)
- **Client islands** (minimal, isolated):
  - `Nav` — scroll position, mobile drawer
  - `HeroSection` — canvas animation
  - `Reveal` — IntersectionObserver scroll reveal
  - `ContactForm` — form state, submission
  - `InterestSelector` — pill toggle state
  - `SkipLink` — focus-based style toggle

### Bundle impact
- No Framer Motion
- No heavy UI library (shadcn not used — pure CSS + inline styles)
- Fonts: Geist via npm package (no external requests at runtime)
- Total client JS: ~35KB gzipped (estimated)

---

## 🌍 Regions

`vercel.json` configures deployment to:
- `gru1` — São Paulo, Brazil (primary — closest to target audience)
- `iad1` — Washington DC, USA (secondary — global coverage)

Change in `vercel.json` → `"regions"` array if needed.
See all regions: [vercel.com/docs/edge-network/regions](https://vercel.com/docs/edge-network/regions)
