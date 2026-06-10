# Reliqube — Deployment Guide
## Vercel + Cloudflare + reliqube.com

---

## Pre-flight verification

```bash
# Run all checks locally before pushing
npm run type-check   # TypeScript — must be zero errors
npm run lint         # ESLint — must be zero errors
npm run build        # Production build + sitemap generation
```

Expected output:
- `✓ Compiled successfully`
- `✓ Generating static pages (4/4)`
- `✅ [next-sitemap] Generation completed`

---

## Step 1 — Push to GitHub

```bash
# From your project root
git init
git add .
git commit -m "chore: initial production release"

# Create repo at github.com/new, then:
git remote add origin https://github.com/YOUR_ORG/reliqube.git
git branch -M main
git push -u origin main
```

---

## Step 2 — Deploy on Vercel

### Via CLI (fastest)

```bash
# Install once globally
npm install -g vercel

# Login
vercel login

# First deploy — follow the interactive prompts:
#   Set up and deploy: Y
#   Which scope: your team/account
#   Link to existing project: N
#   Project name: reliqube
#   Directory: ./  (current)
#   Override settings: N
vercel

# Promote to production
vercel --prod
```

### Via GitHub integration (recommended for CI/CD)

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your `reliqube` repo
4. Vercel auto-detects Next.js — no framework config needed
5. Click **"Deploy"**

Every push to `main` will auto-deploy to production.
Every pull request gets an isolated preview URL.

---

## Step 3 — Vercel Project Settings

After first deploy, go to **Project Settings** in the Vercel dashboard:

### Build & Development Settings
| Setting | Value |
|---------|-------|
| Framework Preset | Next.js (auto-detected) |
| Build Command | `npm run build` |
| Output Directory | `.next` (default) |
| Install Command | `npm ci` |
| Development Command | `npm run dev` |
| Node.js Version | **22.x** |

### Environment Variables

Go to **Settings → Environment Variables** and add:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | *(token from Search Console)* | Production |
| `RESEND_API_KEY` | *(from resend.com — when ready)* | Production |

Leave `NODE_ENV` alone — Vercel sets it automatically.

### Regions

Already configured in `vercel.json`:
```json
"regions": ["gru1", "iad1"]
```
- `gru1` = São Paulo (primary — lowest latency for Brazilian visitors)
- `iad1` = Washington DC (secondary — global fallback)

---

## Step 4 — Connect reliqube.com

### In Vercel Dashboard

1. Go to **Project → Settings → Domains**
2. Click **"Add Domain"**
3. Enter: `reliqube.com`
4. Click **"Add"**
5. Also add: `www.reliqube.com`
6. Vercel shows you the DNS records to add — keep this tab open

### In Cloudflare Dashboard

1. Log in to Cloudflare → select `reliqube.com`
2. Go to **DNS → Records**
3. Add these records:

---

## Step 5 — DNS Records (Cloudflare)

### Required Records

| Type | Name | Content | Proxy | TTL |
|------|------|---------|-------|-----|
| `A` | `@` | `76.76.21.21` | **DNS only** (grey cloud ☁) | Auto |
| `CNAME` | `www` | `cname.vercel-dns.com` | **DNS only** (grey cloud ☁) | Auto |

> **Important**: Set both records to **"DNS only"** (grey cloud), NOT proxied.
> Vercel provides its own global edge CDN — double-proxying through Cloudflare
> causes TLS handshake failures and header conflicts. Use Cloudflare only for DNS.

### Optional but Recommended Records

| Type | Name | Content | Purpose |
|------|------|---------|---------|
| `TXT` | `@` | `v=spf1 include:_spf.google.com ~all` | Email SPF (if using Google Workspace) |
| `TXT` | `@` | `google-site-verification=XXXXXX` | Search Console verification |
| `MX` | `@` | `aspmx.l.google.com` (priority 1) | Email (Google Workspace) |
| `CAA` | `@` | `0 issue "letsencrypt.org"` | Restrict SSL issuers to Let's Encrypt |

### SSL/TLS Settings in Cloudflare

Go to **SSL/TLS → Overview** and set mode to:
**Full (strict)** — even with DNS-only records, this is the correct setting.

### Propagation

DNS changes typically propagate in 5–30 minutes.
Verify at: https://dnschecker.org/#A/reliqube.com

---

## Step 6 — Post-deployment Verification

Run these checks after going live:

### 1. HTTPS & redirect
```bash
curl -I http://reliqube.com        # Should: 301 → https://reliqube.com
curl -I http://www.reliqube.com    # Should: 301 → https://reliqube.com
curl -I https://www.reliqube.com   # Should: 301 → https://reliqube.com
curl -I https://reliqube.com       # Should: 200 OK
```

### 2. Security headers
```bash
curl -I https://reliqube.com | grep -E "x-frame|strict-transport|x-content|referrer"
```
Or use: https://securityheaders.com/?q=reliqube.com

### 3. OG image preview
- LinkedIn: paste URL into a new post draft — thumbnail should appear
- Twitter/X: https://cards-dev.twitter.com/validator
- OpenGraph: https://opengraph.xyz/url/https://reliqube.com

### 4. Structured data
https://search.google.com/test/rich-results?url=https://reliqube.com

### 5. Sitemap
https://reliqube.com/sitemap.xml — should return XML with one URL entry

### 6. robots.txt
https://reliqube.com/robots.txt — should allow `*`, disallow `/api/`

### 7. Lighthouse
Chrome DevTools → Lighthouse → run on https://reliqube.com
Targets: Performance ≥ 95, Accessibility ≥ 95, SEO = 100, Best Practices = 100

---

## Step 7 — Google Search Console

1. Go to https://search.google.com/search-console
2. Add property → **URL prefix** → `https://reliqube.com`
3. Verify via **HTML tag** method — copy the `content` value
4. Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel env vars
5. Redeploy: `vercel --prod`
6. Back in Search Console: click **Verify**
7. Go to **Sitemaps** → submit `https://reliqube.com/sitemap.xml`

---

## Production Recommendations

### Immediate (before launch)
- [x] Connect contact form to Resend or Formspree (see `PRODUCTION.md`)
- [x] Set real email in `ContactSection.tsx` (currently `reliqube@gmail.com`)
- [x] Set real LinkedIn URL in `ContactSection.tsx`
- [x] Update `foundingDate` in Organization schema if different from 2024

### First week after launch
- [ ] Enable **Vercel Analytics** (Project Settings → Analytics → Enable)
- [ ] Set up **Vercel Speed Insights** for Core Web Vitals monitoring
- [ ] Submit sitemap to Google Search Console
- [ ] Add Cloudflare **Page Rules** or **Cache Rules** if needed

### Ongoing
- [ ] Monitor Core Web Vitals in Search Console → Experience
- [ ] Check Vercel deployment logs for any runtime errors
- [ ] Review analytics monthly — which sections get most scroll depth?

---

## Rollback

If a deployment breaks production:

```bash
# Via CLI — list and rollback
vercel ls                           # list deployments
vercel rollback [deployment-url]    # instantly rollback

# Via Dashboard
# Vercel Dashboard → Deployments → find last good one → ⋯ → Promote to Production
```

This is instant — no rebuild needed.

---

## Environment Variable Reference

```bash
# .env.local (local dev only — never commit)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=   # Google Search Console HTML tag value
RESEND_API_KEY=                         # From resend.com for contact form emails
```

All other config lives in code (`next.config.ts`, `vercel.json`, `layout.tsx`).
No secrets are required to run or build the site.
