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

## Hero photo card

The photo sits in a rounded card on the right of the hero, behind an animated conic
gradient ring clipped to a 2px border. The source file in `public/` is untouched — the
treatment is two CSS rules in `.photo-natural`:

```
filter: saturate(0.94) contrast(1.05);   /* grading only — no hue shift, no duotone */
transform: scale(1.12);
transform-origin: center 20%;
```

The photo's warmth is its strongest asset, so the grading is deliberately almost nothing.
The busy lantern background is handled by framing instead: a modest zoom trims roughly 5%
off each side and 2% off the top, clipping the outermost lanterns while leaving about 9%
of clear space above the head. The card's `overflow: hidden` does the clipping.

**`transform-origin` carries the 20% here, not `object-position`.** The `<img>` is sized
`h-auto w-full`, so its box matches the source's 4:5 aspect exactly — `object-fit` has no
overflow to slide against and `object-position` would be inert. Scaling about a point 20%
down biases the crop toward the top, which is where the lanterns are.

A radial vignette over the card darkens the outer frame so the face stays the brightest
point.

## Motion

Every animation is gated on `prefers-reduced-motion`:

- CSS animations (marquee, gradient mesh, orbs, conic ring, accent wipe, diagram flows)
  are neutralised by a global `@media (prefers-reduced-motion: reduce)` rule.
- Framer Motion components read `useReducedMotion()` and collapse their transitions to
  zero duration rather than unmounting, so reduced-motion users still get the content —
  it just appears without movement.
- The hero photo's pointer tilt and cursor glow are gated on both reduced motion and
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
