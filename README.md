# HEAD Kore 93 — Scroll Animation Lab

A single-page marketing concept for the HEAD Kore 93 ski, built as a lab for
**scroll-driven storytelling** — every animation, including the pinned
cinematic sequences, runs on native CSS scroll timelines. The site ships
zero JavaScript.

🔗 **Live:** [head-kore-93.vercel.app](https://head-kore-93.vercel.app/)

> This is an independent design/animation experiment. HEAD, Kore, and the
> related product imagery are trademarks of their respective owners and are
> used here purely for a non-commercial demo.

## What's in it

A scroll narrative that walks down the page:

- **Hero** — oversized type, topsheet ski render, a scroll-progress bar and film grain.
- **Showcase** — a pinned, scroll-scrubbed keyframe sequence that tilts the skis flat, splits the pair apart, then flips them from topsheet to base.
- **Statement** — line-by-line word reveal ("Light is not fragile. Light is fast.").
- **Blueprint** — a hand-dimensioned SVG technical drawing (sidecut, rocker, camber) that draws itself on scroll.
- **Construction** — slide-synced copy (Graphene / Karuba core / Topless Tech) against action photography.
- **Traverse** — a horizontal-scroll panel track of ride attributes (sticky + scroll timeline).
- **Spec sheet + CTA** — final specs and a marquee of available lengths.

Motion is gated behind `prefers-reduced-motion` — animations are skipped entirely for users who opt out.

## Tech

- [Vite](https://vitejs.dev/) — HTML + CSS only, no JS bundle
- Native CSS scroll-driven animations: `scroll()` / `view()` timelines, `timeline-scope`, sticky pinning
- [Biome](https://biomejs.dev/) + [Stylelint](https://stylelint.io/) for linting/formatting
- Deployed on [Vercel](https://vercel.com/)

## Develop

```bash
pnpm install
pnpm dev        # start the dev server
pnpm build      # production build to dist/
pnpm preview    # preview the production build
pnpm lint       # biome + stylelint
pnpm lint:fix   # autofix
```
