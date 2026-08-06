# danfordchris.dev

Portfolio for **Danford Chriss** — Mobile Engineer, Flutter Developer, Full Stack
Developer, DevOps Engineer — built on Next.js 16 (App Router) + Tailwind v4.

```bash
npm run dev
```

| Route | What it is |
| --- | --- |
| `/` | The portfolio |
| `/wispr` | A front-end port of [wisprflow.ai](https://wisprflow.ai), kept as the design study the portfolio's visual language came from (`noindex`) |

## Where the design came from

The visual language is lifted from a port of the Wispr Flow marketing site: the
same token set, type pairing, sticky scroll tracks, path-following marquees and
per-character hover rolls, re-pointed at portfolio content.

| Token | Value | Use |
| --- | --- | --- |
| `lumen` | `#ffffeb` | page background |
| `lumen-dark` | `#e4e4d0` | nav border, cards, panels |
| `vast` | `#1a1a1a` | text, borders, dark bands |
| `dawn` | `#f0d7ff` | primary button, accents |
| `fathom` | `#034f46` | teal sections, role list |
| `flare` | `#ff6c4c` | active indicators, bullets |
| `glow` / `signal` | `#ffa946` / `#ffbcf2` | badges, tags |

Type is **EB Garamond** (display, italic for emphasis) + **Figtree** (body).

Custom classes live inside `@layer components` so Tailwind utilities always win
over them — without this, `.btn { display: inline-flex }` beats `hidden`.

## Where the content came from

Everything is extracted from the previous portfolio at `zogo-portfolio`, which
was treated as **read-only** — nothing in it was modified. All copy lives in one
typed module, `lib/portfolio.ts`:

- profile, location, roles, bio, CV link, SEO metadata
- 4 social links
- 3 expertise areas with their full tech stacks
- 5 services
- 2 products (ContentLab, Blog)
- 6 career roles with responsibilities
- 12 projects with descriptions, tech, categories, screen lists and store links
- 5 personal activities, and the contact form's fields and copy

## Sections

| Component | What it does |
| --- | --- |
| `PortfolioNav` | Pill bar, Work/About segmented toggle, per-character hover-roll links, mobile sheet |
| `PortfolioHero` | Name in display serif, typewriter role cycle, and two SVG `textPath` marquees — the tech stack on a grey loop, roles on a black ribbon |
| `TechMarquee` | Dark band, two counter-scrolling rows of the full stack |
| `FeaturedWork` | Pinned scroll track; the IPF OS card walks its five modules as you scroll, over a screen-name marquee, closing on a stat row |
| `ServicesTabs` | Sticky 500vh track; scroll drives a five-item rail, coral indicator, per-service stage and copy (rail is clickable) |
| `ProjectsGrid` | All 12 projects, filterable by mobile/web/game with live counts, each card expanding to reveal its screen list |
| `ExpertiseTrack` | Sticky scroll-linked track — one stack card cross-fades across three expertise areas, cycling a highlight through the chips |
| `CareerTimeline` | Cream card wrapping a dark-teal role list, detail pane alongside on desktop, accordion on mobile |
| `Products` | ContentLab and Blog cards |
| `About` | Dark band with portrait, bio, socials and activities |
| `ContactSection` | Full-bleed CTA with a validated contact form |
| `PortfolioFooter` | Full link map, services, products, socials |

## Images

`public/img/` holds **placeholder assets** — stand-ins, not real work:

- `work/*.jpg` — one per project, from picsum.photos
- `avatar.jpg` — portrait placeholder
- `flow-card.jpg`, `cta-bg.jpg` — section backdrops
- `logo-*.svg`, `pub-*.svg`, `badges.svg` — used by `/wispr` only

**Swap these for real screenshots and a real photo before publishing.**

## Notes

- All motion is gated behind `prefers-reduced-motion`.
- `Reveal` uses an IntersectionObserver, plus a synchronous rect check on mount.
  The un-revealed state is `opacity: 0`, and IO callbacks are suppressed on
  hidden documents (prerender, background tabs, some crawlers) — without the
  mount check, above-the-fold content could stay invisible.
- `PathMarquee` advances `startOffset` and wraps at the measured width of one
  text repetition, so the loop is seamless at any speed.
- The contact form has no mail transport wired up; it validates, then hands off
  to the user's mail client. Point it at a real endpoint (or restore EmailJS)
  before going live.
- **Gotcha:** using `<Image>` without importing `next/image` does *not* fail
  typecheck — `Image` is a DOM global in `lib.dom`, so `tsc` resolves it to
  `window.Image` and it only breaks at runtime.
