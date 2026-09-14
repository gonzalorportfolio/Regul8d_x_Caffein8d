# Regul8d x Caffein8d -- Project Context

## What this is

regul8dcaffein8d.com is the website for **Regul8d Caffein8d**, a watch collecting content brand run by Gonzalo Romero (persona: T1NKER, handle: @regul8dcaffein8d). The brand covers vintage watches, mechanical watch regulation, homage watches, bench work, and honest hobby commentary. Anti-gatekeeping, community-first ethos.

The site serves as the brand's home base: a hub that ties together Instagram, Substack, TikTok, Benable affiliate lists, and original content (glossary, reviews, collection showcase).

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router, React 19) |
| Hosting | Vercel |
| Database | Neon Postgres (serverless driver `@neondatabase/serverless`) |
| Styling | Global CSS (`app/globals.css`), no CSS-in-JS or Tailwind |
| Font | Poppins via `next/font/google` |
| Linting | ESLint 9 flat config with `eslint-config-next` |
| Domain | regul8dcaffein8d.com (Namecheap DNS to Vercel) |

## Architecture

```
app/
  layout.js          Root layout: font, metadata, JSON-LD, NavBar, skip link
  page.js            Home (hero with Instagram + Substack CTAs)
  globals.css        All styles (single file, no modules)
  manifest.js        PWA web app manifest
  robots.js          robots.txt generation
  sitemap.js         Sitemap from PUBLIC_ROUTES in lib/site.js
  robots.js          robots.txt generation (uses SITE_URL)
  about/page.js
  affiliatelinks/    AffiliateLinksContent.jsx (client component) + page.js
  collection/page.js Reads from Neon (watches table), falls back to placeholder
  glossary/          GlossaryContent.jsx (client component) + page.js
  repairs/           RepairsContent.jsx (client component) + page.js
  reviews/page.js    Reads from Neon (reviews table), falls back to placeholder
  start-here/page.js Onboarding hub with card links
  substack/page.js   Substack CTA page
  api/health/route.js  Health check endpoint (app + DB)

components/
  NavBar.jsx         Client component: sticky nav, mobile hamburger, inert menu, Escape key
  ExternalLink.jsx   Wrapper for target="_blank" links with "(opens in a new tab)" hint
  Product.jsx        Product card (affiliate links page)
  PlaceholderPage.jsx  Reusable "coming soon" layout
  AboutContainer.jsx
  AboutMeIntro.jsx
  Connect.jsx        Social link icons (Instagram, Substack, TikTok, Benable)

lib/
  site.js            SITE_URL, SITE_NAME, SOCIAL links, PUBLIC_ROUTES, absoluteUrl()
  seo.js             createPageMetadata() helper for consistent OG/Twitter/canonical
  db.js              Neon SQL client: getSql(), checkDbHealth(), listWatches(), listReviews(), listProducts()

db/
  schema.sql         Postgres schema: watches, reviews, products tables

scripts/
  db-push.js         Applies schema.sql to Neon (CommonJS, reads .env.local)

public/
  hero.jpg           Hero background image
  og.jpg             Open Graph / Twitter share image (1200x630)
  icon.svg           Favicon / app icon
```

## Key conventions

- **No TypeScript.** Plain JS with `jsconfig.json` path aliases (`@/` maps to project root).
- **Server components by default.** Client components only where interactivity is needed (NavBar, GlossaryContent, AffiliateLinksContent, RepairsContent). Marked with `'use client'`.
- **SEO-first.** Every page exports `metadata` via `createPageMetadata()`. Canonical URLs, Open Graph, Twitter cards, and JSON-LD structured data are set up.
- **Graceful DB fallback.** `getSql()` returns `null` when `DATABASE_URL` is missing. Pages that query Neon render placeholder content instead of crashing.
- **Single CSS file.** All styles live in `globals.css`. Class names are descriptive (`.start-here-card`, `.product-card`, `.placeholder-page`). No BEM, no utility classes.
- **Accessibility (WCAG 2.2 AA).** Skip link, landmark regions (`<main id="main-content">`), focus-visible rings, prefers-reduced-motion, inert mobile menu, Escape closes menu and returns focus, aria-current on active nav links, ExternalLink announces new-tab behavior.
- **External images.** Hosted on ibb.co and Amazon media CDN. Allowed in `next.config.mjs` `remotePatterns`.
- **Brand colors.** Coffee Bean (#1C0A05), Floral White, Light Caramel, Burnt Tangerine, Sky Blue. Dark theme is the primary palette.

## Environment variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Neon Postgres pooled connection string |
| `NEXT_PUBLIC_SITE_URL` | Production URL for metadata, canonicals, sitemap |

See `.env.example` for format.

## Routes and their data sources

| Route | Data | Nav visible |
|-------|------|-------------|
| `/` | Static | Yes |
| `/about` | Static | Yes |
| `/glossary` | Client-side (hardcoded terms) | Yes |
| `/collection` | Neon `watches` table | Yes |
| `/reviews` | Neon `reviews` table | Yes |
| `/substack` | Static (CTA) | Yes |
| `/start-here` | Static | Yes |
| `/affiliatelinks` | Client-side (hardcoded products) | No |
| `/repairs` | Client-side (portfolio) | No |
| `/api/health` | Neon health check | N/A |

## Current state (September 2026)

- Migrated from Express/React SPA on Render to Next.js App Router on Vercel
- WCAG 2.2 AA accessibility pass completed (skip link, landmarks, focus management, contrast, reduced motion, inert menu, aria-current, new-tab announcements)
- Domain (regul8dcaffein8d.com) DNS migration from Render to Vercel in progress
- Neon database provisioned; collection and reviews pages are data-driven when seeded
- Build and lint clean
