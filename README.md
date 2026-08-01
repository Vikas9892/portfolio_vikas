# Vikas Tiwari — Portfolio

Personal portfolio site. Next.js 15 App Router, TypeScript, Tailwind v4, Framer Motion.
Static — no backend, no database, no API routes.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint
```

## Layout

```
src/
├─ app/
│  ├─ layout.tsx        metadata, OpenGraph, JSON-LD Person schema, fonts, theme provider
│  ├─ page.tsx          section composition; below-fold sections are dynamically imported
│  ├─ globals.css       semantic design tokens, utilities, keyframes, reduced-motion contract
│  ├─ sitemap.ts        generated from siteConfig.url
│  ├─ robots.ts         generated from siteConfig.url
│  ├─ icon.tsx          favicon — VT monogram
│  └─ apple-icon.tsx    home-screen icon
├─ components/
│  ├─ ui/               button, badge, dialog (shadcn-style primitives)
│  └─ site/             page sections, gallery, diagrams, motion primitives
├─ hooks/
│  └─ use-active-section.ts
└─ lib/
   ├─ site.ts           canonical URL, contact details, social links, nav sections
   ├─ data.ts           all page content — projects, metrics, skills, platforms
   └─ utils.ts
```

## Changing the domain

`src/lib/site.ts` holds the canonical URL in one place. `metadataBase`, canonical
links, OpenGraph URLs, `sitemap.xml` and `robots.txt` all derive from it — edit
`siteConfig.url` and nothing else needs touching.

## Editing content

All copy and data lives in `src/lib/data.ts` and `src/lib/site.ts`. Components read
from those; none of them hardcode content.

Screenshots are in `public/screenshots/`. To add one, drop the file in and add an
entry (with `alt` and `caption`) to the relevant project's `screenshots` array.

## Design tokens

Colours are semantic CSS custom properties defined in `globals.css` — `--background`,
`--foreground`, `--card`, `--muted`, `--border`, `--accent` and friends — with a dark
and a light set. Components reference `bg-card`, `text-muted-foreground`, `border-accent`
and so on. No component contains a raw hex value.

## Motion

Every animation is gated on `prefers-reduced-motion`:

- CSS animations are neutralised by a global `@media (prefers-reduced-motion: reduce)` rule.
- Framer Motion components read `useReducedMotion()` and collapse their transitions to
  zero duration rather than unmounting, so reduced-motion users still get the content —
  it just appears without movement.

## Verified

Measured against a production build (`next start`), Lighthouse desktop, median of 3 runs:

| Category       | Score |
| -------------- | ----- |
| Performance    | 96    |
| Accessibility  | 100   |
| Best Practices | 100   |
| SEO            | 100   |

- axe-core: 0 WCAG 2.1 A/AA violations, in both dark and light themes
- No horizontal overflow at 390, 820, 1440 or 2560 px
- No console or runtime errors

## Deploying

Push to GitHub and import the repo on Vercel. No environment variables, no build
configuration — the defaults are correct.
