# AGENTS.md -- Multi-agent configuration for Regul8d x Caffein8d

## Overview

This file defines agent roles and handoff conventions for AI-assisted development on this repo. Every agent session must read `CLAUDE.md` first for project rules and `context.md` for architecture.

---

## Agents

### frontend

**Scope:** UI components, pages, styling, client-side interactivity.

**Owns:**
- `app/` (all page.js and *Content.jsx files)
- `components/`
- `app/globals.css`

**Rules:**
- Follow the server-first component model. Only add `'use client'` when hooks or browser APIs are required.
- All styles go in `globals.css`. No CSS modules, no inline style objects (except minor dynamic values).
- Every new page needs `createPageMetadata()` and `<main id="main-content">`.
- External links must use the `ExternalLink` component.
- Test: `npm run build && npm run lint` must pass.

**Handoff to backend:** When a page needs new data from the database (new table, new query), describe the shape of the data needed and hand off to the backend agent.

---

### backend

**Scope:** Database schema, data access layer, API routes, server-side logic.

**Owns:**
- `lib/db.js`
- `db/schema.sql`
- `scripts/db-push.js`
- `app/api/`

**Rules:**
- All query functions go in `lib/db.js` and must handle `getSql()` returning `null`.
- Schema changes go in `db/schema.sql`. The file must remain idempotent (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`).
- New API routes go in `app/api/<name>/route.js`. Use `export const dynamic = 'force-dynamic'` for anything that reads from the database.
- Never expose raw SQL errors to the client. Catch and return structured JSON.
- Test: `npm run build` must pass. If `DATABASE_URL` is available, verify queries return expected shapes.

**Handoff to frontend:** After adding a new query function or API endpoint, describe the return shape and hand off to the frontend agent to wire up the UI.

---

### seo

**Scope:** Search engine optimization, structured data, metadata, sitemap, robots, Open Graph, performance.

**Owns:**
- `lib/seo.js`
- `lib/site.js` (PUBLIC_ROUTES, SITE_URL, OG_IMAGE, SOCIAL)
- `app/sitemap.js`
- `app/robots.js`
- `app/manifest.js`
- Metadata exports in all `page.js` files (review only, not full ownership)

**Rules:**
- Every public page must be in `PUBLIC_ROUTES` with appropriate `priority` and `changeFrequency`.
- `NEXT_PUBLIC_SITE_URL` must be set correctly for production. All canonical URLs, OG images, and sitemap entries depend on it.
- JSON-LD in `layout.js` must stay valid. Validate changes at https://search.google.com/test/rich-results.
- OG images must be 1200x630.

**Handoff:** Flag any page that is missing metadata or has duplicate titles/descriptions. The frontend agent fixes the page; the seo agent verifies after.

---

### accessibility

**Scope:** WCAG 2.2 AA compliance, keyboard navigation, screen reader experience, color contrast, motion preferences.

**Rules:**
- Audit with axe DevTools or Lighthouse before declaring work complete.
- Verify: skip link works, all interactive elements are keyboard-reachable, focus order is logical, no focus traps, color contrast meets AA, `prefers-reduced-motion` is respected.
- The mobile nav must remain `inert` when closed, support `Escape` to dismiss, and return focus to the hamburger button.
- New images need `alt` text (or `alt=""` if decorative inside a linked context).
- New forms need associated labels, error messages, and `aria-describedby` where appropriate.

**Handoff:** File issues with specific element selectors and WCAG criteria. The frontend agent implements; the accessibility agent re-audits.

---

## Handoff protocol

1. **Before handing off:** Commit your changes. Build and lint must pass.
2. **Handoff message format:**
   ```
   HANDOFF TO: <agent>
   WHAT: <one-line summary>
   FILES CHANGED: <list>
   WHAT'S NEEDED: <specific ask for the receiving agent>
   BLOCKERS: <anything the receiving agent should know>
   ```
3. **Receiving agent:** Read `CLAUDE.md`, pull latest, review the handoff, then proceed.
4. **After completing:** Run build + lint, commit, and either hand off to the next agent or mark the task done.

## Task scoping

- Keep tasks small. One feature, one fix, one page at a time.
- If a task touches more than one agent's scope, break it into sub-tasks and hand off between agents.
- The owner of the entry-point file decides who leads. A new page = frontend leads. A new API + page = backend leads, hands off to frontend.
