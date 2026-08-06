# whispr-flow-clone

A port of the [wisprflow.ai](https://wisprflow.ai) marketing site to Next.js 16
(App Router) + Tailwind v4.

The original is a Webflow build driven by GSAP ScrollTrigger. This port
reimplements the same structure, design system, and interactions with React
state, CSS animations, `IntersectionObserver`, and sticky scroll tracks — no
GSAP or Webflow runtime.

```bash
npm run dev
```

## How this was built

Layout and styling were derived by reading the live site's **computed styles and
DOM**, not by eye. That distinction mattered: several sections looked plausible
in screenshots while being structurally wrong, and only measurement caught them.
Where the original uses a specific SVG path, the path data is copied verbatim
(see `Hero` and `FasterThanTyping`).

## Design system

Tokens in `app/globals.css` are lifted from the live site's Webflow variable
collection:

| Token | Value | Use |
| --- | --- | --- |
| `lumen` | `#ffffeb` | page background |
| `lumen-dark` | `#e4e4d0` | nav border, cards, FAQ + privacy panels |
| `vast` | `#1a1a1a` | text, borders, dark sections |
| `dawn` | `#f0d7ff` | primary button, accent panels |
| `fathom` | `#034f46` | teal sections, FAQ question panel |
| `glow` / `flare` / `signal` | `#ffa946` / `#ff6c4c` / `#ffbcf2` | filler / correction / repetition highlights; `flare` is also the tab indicator |

Type is the original pairing: **EB Garamond** (display, italic for emphasis) and
**Figtree** (body), loaded via `next/font/google`. Headings cap at 6rem (96px)
and the two `h2-bigger` sections at 4.6875rem (75px), matching the source.

Custom classes live inside `@layer components` so Tailwind utilities always win
over them — without this, `.btn { display: inline-flex }` beats `hidden` and the
nav CTA leaks onto mobile.

## Sections

| Component | What it ports |
| --- | --- |
| `Nav` | 912px pill bar with a `#e4e4d0` border, Dictation/Notetaker segmented toggle, per-character hover roll on links, mobile sheet |
| `Hero` | Display headline over two SVG `textPath` marquees using the site's own `curve1`/`curve2` bezier paths — a grey loop at 0.25 opacity and a 30px black ribbon — in a 2100px flex row |
| `LogoMarquee` | Full-bleed dark band, 80px rounded top, infinite horizontal logo marquee |
| `FasterThanTyping` | Pinned track. Keyboard 45 wpm vs Flow 220 wpm as **horizontal marquees riding SVG paths** (a straight line and a bump curve), then the Flow card cross-fades into the dictation clean-up: raw speech types in, fillers/corrections/repetitions flag and strike through, "Cleaning up…" resolves, message sends |
| `HowItWorks` | Sticky 300vh track; scroll drives the three-tab rail, coral indicator, stage visuals and copy (tabs also clickable) |
| `MakesItEasy` | Sticky scroll-linked track — one 400×233 card cross-fades as four copy blocks scroll past, inactive copy at 0.35 opacity |
| `Privacy` | `#e4e4d0` card, 32px radius, three columns: heading, copy, certification badges |
| `Testimonials` | Full-bleed dark band with two case studies and four quote cards |
| `Faq` | 816px cream card wrapping a dark-teal question panel; answer panel alongside on desktop, accordion on mobile |
| `StartFlowing`, `Footer` | Full-bleed 80px-radius CTA and the full footer link map |

## Images

`public/img/` holds **placeholder assets**, downloaded at the exact dimensions
the original renders. They are stand-ins, not the real brand assets:

- Company wordmarks and certification badges — generated via placehold.co
- Portraits and section backdrops — photos from picsum.photos

Swap these for real assets before any non-demo use.

## Notes

- All motion is gated behind `prefers-reduced-motion`.
- Scroll-linked sections read `getBoundingClientRect()` inside a
  `requestAnimationFrame`-throttled scroll listener; they degrade to their first
  frame if JS is unavailable.
- `PathMarquee` (in `components/primitives.tsx`) advances `startOffset` and
  wraps at the measured width of one text repetition, so the loop is seamless at
  any speed.
- **Gotcha:** using `<Image>` without importing `next/image` does *not* fail
  typecheck — `Image` is a DOM global in `lib.dom`, so `tsc` resolves it to
  `window.Image` and it only breaks at runtime.

### Known gaps

- Three sections are shorter than the original by internal whitespace (logo
  marquee ~68px, privacy ~21px, plus the testimonials/CTA bands). Structure,
  colour, radii and type all match; only vertical rhythm differs. Left as-is
  rather than padded to hit a number without knowing what drives the extra
  height.
- Brand wordmarks and photography are placeholders, as above.
