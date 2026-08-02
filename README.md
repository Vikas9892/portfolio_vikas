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
│  ├─ globals.css       design tokens, photo treatment, keyframes, print + reduced-motion
│  ├─ not-found.tsx     styled 404
│  ├─ error.tsx         route-level error boundary
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

## Hero photo panel

The hero is a two-column split — 55% text, 45% photo — with the photo bleeding to the
top, right and bottom edges. It has no card, border, radius or shadow: the hard vertical
edge where the text column meets the image is the composition.

The supplied photo has a busy lantern-lit background, and the lanterns are in sharp
focus, so no colour treatment can push them back. They are **cropped out** instead. The
source file in `public/` is untouched; everything happens in `.hero-photo-img`:

```
filter: saturate(0.94) contrast(1.05) brightness(1.02);  /* grading only, no hue shift */
transform: scale(1.40);                                   /* 1.30 below 1024px */
transform-origin: center 32%;
```

**`transform-origin` is what crops vertically here, not `object-position`.** At the
desktop panel's aspect ratio the image covers with horizontal overflow only — measured at
72px across and 0px vertically at 1440, 212px and 0px at 1024 — so the Y term of
`object-position` has nothing to slide against. Only the mobile panel (48px of vertical
overflow) responds to it. Origin at 32% lifts the top lantern row out of frame while
leaving the head roughly 30px of clearance.

The lanterns immediately flanking the head cannot be removed by cropping without cutting
the head — they sit in the same vertical band. What remains reads as ambient background.

Four overlays finish the panel: three edge gradients resolving to the page background
(top 80px, bottom 180px, left 140px — desktop only) so the panel dissolves into the page,
and one radial focus overlay at 0.42 that darkens the edges without touching colour.

## Motion

Every animation is gated on `prefers-reduced-motion`:

- CSS animations (marquee, accent wipe, diagram flows) are neutralised by a global
  `@media (prefers-reduced-motion: reduce)` rule.
- Framer Motion components read `useReducedMotion()` and collapse their transitions to
  zero duration rather than unmounting, so reduced-motion users still get the content —
  it just appears without movement.

The hero carries exactly two animations: the photo panel scales 1.06 → 1 over 1200ms on
load, and the headline staggers in three lines 60ms apart with the accent wiping into
"measure". There is no tilt, parallax, orbit or rotating ring — structure does not wobble.

## Keyboard

- `⌘K` / `Ctrl+K` opens the command palette from anywhere — jump to a section, open any
  project repo, copy the email address, or download the résumé.
- Arrow keys move between gallery slides, including inside the lightbox.
- Both the lightbox and the project dialogs are state-controlled rather than opened by a
  `DialogTrigger`, so they restore focus to their opener explicitly via `onCloseAutoFocus`.

## Print

`@media print` rebinds the design tokens to black-on-white, drops the nav, footer,
gradients and carousel controls, forces any mid-flight scroll animation to full opacity,
and appends `href` values after external links. The page prints legibly on A4 without
colour.

## Verified

Measured against a production build (`next start`), Lighthouse desktop, median of 3 runs:

| Category       | Score |
| -------------- | ----- |
| Performance    | 100   |
| Accessibility  | 100   |
| Best Practices | 100   |
| SEO            | 100   |

- LCP 0.7 s · CLS 0
- axe-core: 0 WCAG 2.1 A/AA violations, in both dark and light themes
- No horizontal overflow at 390, 768, 1440 or 2560 px
- No console errors, no runtime errors, no hydration warnings

## Analytics

`@vercel/analytics` is rendered only when `process.env.VERCEL` is set. The insights
endpoint exists solely on Vercel's edge, so loading the script anywhere else would be a
guaranteed 404 in the console — which is exactly what it was before the gate.

## Deploying

Push to GitHub and import the repo on Vercel. No environment variables, no build
configuration — the defaults are correct.
