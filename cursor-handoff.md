# Cursor handoff: SEO audit, deploy blockers, and testing infrastructure

> **Note:** The original `cursor-handoff.md` from the Claude session was never written to disk (the file contained a failed `$(cat /home/claude/...)` expansion). This document reconstructs the plan from that commit message and a fresh audit of the current tree (Sept 2026).

**HANDOFF TO:** Cursor agent (frontend + seo + tooling)  
**WHAT:** Fix deploy/SEO blockers, address ranked SEO findings, add Vitest/RTL/axe, Husky, GitHub Actions, Lighthouse, and Playwright  
**BLOCKERS:** No `.env.local` in repo (expected). Production domain should be `https://regul8dcaffein8d.com`. OG image on imgbb returns 403.

---

## Phase 0: Deploy blockers (do first)

1. **`NEXT_PUBLIC_SITE_URL`** must be `https://regul8dcaffein8d.com` in Vercel and locally. Default in `lib/site.js` still falls back to `*.vercel.app`.
2. **OG image is dead.** `OG_IMAGE` points at imgbb (`403 Forbidden`). Host a 1200x630 image under `public/` (e.g. `public/og.jpg`) and point `OG_IMAGE` at `/og.jpg` via `absoluteUrl`.
3. **`public/robots.txt` Sitemap URL** must match production domain (currently hardcodes vercel.app). Prefer generating robots from `app/robots.js` using `SITE_URL`, or keep static and update the Sitemap line whenever the domain changes.
4. **Favicon.** External `fav.farm` icon is fragile. Add a local icon under `public/` and wire it in `layout.js` metadata.
5. **DNS.** Point regul8dcaffein8d.com to Vercel and set `NEXT_PUBLIC_SITE_URL` before submitting Search Console.

---

## Phase 1: SEO findings (15, ranked)

| # | Severity | Finding | Fix |
|---|----------|---------|-----|
| 1 | Critical | OG/Twitter image 403 | Self-host `public/og.jpg`, update `OG_IMAGE` |
| 2 | Critical | SITE_URL default is vercel.app | Default to `https://regul8dcaffein8d.com` |
| 3 | Critical | robots.txt Sitemap host mismatch | Sync with `SITE_URL` (prefer `app/robots.js`) |
| 4 | High | No local favicon/apple icon | Add `public/favicon.ico` or `icon.png` |
| 5 | High | Thin placeholder pages indexed (`/collection`, `/reviews`) | Keep in sitemap only when content exists, or use low priority + clear copy; optional `noindex` until seeded |
| 6 | Medium | context.md references removed `app/robots.js` | Update docs to `public/robots.txt` or restore generator |
| 7 | Medium | Em dashes in package description / copy | CLAUDE.md bans em dashes; scrub |
| 8 | Medium | External hero/OG CDNs (ibb.co) | Prefer `public/` assets |
| 9 | Medium | Missing `logo.png` for nav | Add brand logo to `public/logo.png` |
| 10 | Medium | JSON-LD publisher URLs follow wrong SITE_URL until env set | Same as #2 |
| 11 | Low | `/affiliatelinks` in sitemap but hidden from nav | Keep (SEO value) or drop; document intent |
| 12 | Low | `/repairs` noindex + Disallow | OK; confirm both stay aligned |
| 13 | Low | No `opengraph-image` / `twitter-image` file routes | Optional Next Metadata file API using local og.jpg |
| 14 | Low | Title template may duplicate brand on some pages | `createPageMetadata` already special-cases home |
| 15 | Low | No Search Console verification meta | Add when GSC property exists |

---

## Phase 2: Fix tasks (implementation order)

### A. Domain + assets
- [x] Change `SITE_URL` default to `https://regul8dcaffein8d.com`
- [x] Create `public/og.jpg` (1200x630 from hero or screenshot)
- [x] Set `OG_IMAGE` to absolute `/og.jpg`
- [x] Restore `app/robots.js` (delete static conflict) **or** update static Sitemap line
- [x] Add local favicon; update `layout.js` icons
- [x] Update `context.md` robots path

### B. Metadata hygiene
- [x] Scrub em dashes from package.json / user-facing strings
- [ ] Decide: noindex empty collection/reviews until Neon has rows (optional)
- [x] Verify each page uses `createPageMetadata` + sits in `PUBLIC_ROUTES` when indexable

### C. Testing infrastructure
- [x] Vitest + React Testing Library + jsdom
- [x] axe-core (`vitest-axe` or `jest-axe` equivalent) for a11y unit checks on NavBar / key pages
- [x] Scripts: `test`, `test:watch`
- [x] Husky pre-commit: lint (+ optional test)
- [x] GitHub Actions CI: install, lint, test, build on PR/push to main
- [x] Playwright e2e: smoke routes, skip link, mobile nav Escape/inert
- [ ] Lighthouse CI (optional workflow) on home + glossary

### D. Verify
- [x] `npm run build && npm run lint && npm test`
- [x] Curl `/robots.txt` and `/sitemap.xml` show production host
- [ ] Rich Results / Open Graph debugger with live OG image

---

## Testing stack (target)

| Tool | Role |
|------|------|
| Vitest | Unit / component tests |
| RTL | React component rendering |
| axe-core | Automated a11y assertions |
| Husky | Pre-commit gate |
| GitHub Actions | CI lint + test + build |
| Playwright | e2e smoke + a11y keyboard flows |
| Lighthouse CI | Performance / a11y / SEO scores |

---

## Success criteria

- Production canonicals and sitemap use `regul8dcaffein8d.com`
- Shared OG image loads (HTTP 200) from this origin
- robots.txt Sitemap URL matches production
- CI green on main
- At least smoke Playwright coverage for `/`, skip link, and mobile nav
- Build + lint + tests pass locally

---

## Out of scope for this handoff

- Neon content seeding (watches/reviews copy)
- CMS
- Reintroducing light mode
- Cleaning historical `readme/` assets
