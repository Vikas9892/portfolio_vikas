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

## Hero photo treatment

The supplied photo has a busy multicoloured background that fought the palette. It is
corrected in CSS at render time — the source file in `public/` is untouched:

1. The whole frame is desaturated to 25% (`.photo-muted`).
2. A teal duotone is blended over it in `mix-blend-mode: color`, weighted toward the edges.
3. A second copy of the image, masked to an ellipse over the face, is layered **above**
   the duotone so skin tone stays natural while the surroundings stay muted.
4. A radial vignette darkens the outer frame so the face is the brightest point.

Retuning it means editing those four rules in `globals.css`; no image editing required.

## Motion

Every animation is gated on `prefers-reduced-motion`:

- CSS animations (marquee, gradient mesh, orbs, conic ring, accent wipe) are neutralised
  by a global `@media (prefers-reduced-motion: reduce)` rule.
- Framer Motion components read `useReducedMotion()` and collapse their transitions to
  zero duration rather than unmounting, so reduced-motion users still get the content —
  it just appears without movement.
- The hero photo's pointer tilt and glow are gated on both reduced motion and
  `(hover: hover) and (pointer: fine)`, so they never engage on touch devices.

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

- LCP 0.7 s · CLS 0.002
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
