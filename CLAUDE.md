# CLAUDE.md -- Instructions for Claude sessions on this repo

## Project identity

This is **regul8dcaffein8d.com**, the website for the Regul8d Caffein8d watch content brand. Read `context.md` for the full architecture and current state.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build (run before committing to verify)
npm run lint         # ESLint check
npm run db:push      # Apply db/schema.sql to Neon (needs DATABASE_URL)
```

Always run `npm run build` and `npm run lint` before declaring work done. Both must pass clean.

## Code style rules

- **No TypeScript.** All files are `.js` or `.jsx`. Do not add `.ts` or `.tsx` files.
- **No em dashes.** Never use the em dash character in any text, comments, or content. Use commas, periods, or parentheses instead.
- **No Tailwind, no CSS modules.** All styles go in `app/globals.css`. Use descriptive class names (`.review-card`, `.glossary-section`). No BEM, no utility classes.
- **Import aliases.** Use `@/` for project root imports (e.g., `import { SOCIAL } from '@/lib/site'`).
- **Server components by default.** Only add `'use client'` when a component needs hooks, event handlers, or browser APIs.
- **Poppins font only.** The font is loaded in `layout.js` via `next/font/google`. Do not add other fonts.

## File organization

- Pages go in `app/<route>/page.js`. If the page needs client interactivity, extract the interactive part to `app/<route>/<Name>Content.jsx` with `'use client'` and keep the page.js as a thin server wrapper.
- Shared components go in `components/`.
- Data helpers and utilities go in `lib/`.
- Database schema changes go in `db/schema.sql` and are applied with `npm run db:push`.

## SEO requirements

Every new page MUST:
1. Export `metadata` using `createPageMetadata()` from `@/lib/seo`.
2. Be added to `PUBLIC_ROUTES` in `lib/site.js` (unless intentionally hidden from sitemap).
3. Use a descriptive `title` and `description`.
4. Wrap content in `<main id="main-content">` for the skip link.

## Accessibility requirements (WCAG 2.2 AA)

These are already implemented and must be maintained:
- Every page wraps its content in `<main id="main-content">`.
- Interactive elements have visible `:focus-visible` styles.
- External links use the `ExternalLink` component (announces new-tab behavior).
- Images have meaningful `alt` text (or `alt=""` for decorative images inside a link with text).
- Color contrast meets AA ratio (4.5:1 for text, 3:1 for large text/UI).
- Animations/transitions respect `prefers-reduced-motion`.
- The mobile nav uses `inert` when closed and supports `Escape` to dismiss.

Do not remove or weaken any of these. When adding new interactive components, follow the same patterns.

## Database patterns

- `lib/db.js` exports `getSql()` which returns `null` when `DATABASE_URL` is not set.
- All DB query functions (`listWatches`, `listReviews`, `listProducts`) handle the null case and return empty arrays.
- Pages that read from the database must render gracefully when no rows exist (use `PlaceholderPage` component).
- Mark database-backed pages with `export const dynamic = 'force-dynamic'`.

## Environment

- `DATABASE_URL` and `NEXT_PUBLIC_SITE_URL` are the only env vars.
- Never commit `.env.local` or real credentials. `.env.example` shows the format.
- `NEXT_PUBLIC_SITE_URL` controls all canonical URLs, OG tags, sitemap, and robots.txt. It must match the production domain.

## Git conventions

- Commit messages: lowercase, imperative mood, prefixed with type (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`).
- One logical change per commit.
- Run build + lint before committing.

## Brand voice (for any copy or content)

- Anti-gatekeeping. No elitism, no hype.
- Approachable but credible. 28 years of collecting experience backs the content.
- "Tinkerers already know." is the tagline.
- Audience: beginners to intermediate collectors who feel intimidated or priced out.

## What NOT to do

- Do not install Tailwind, styled-components, or any CSS framework.
- Do not convert to TypeScript.
- Do not add a CMS or headless CMS. Content that needs dynamic data uses Neon directly.
- Do not change the brand colors or font without explicit instruction.
- Do not remove the `readme/` directory (historical reference).
- Do not use em dashes anywhere.
