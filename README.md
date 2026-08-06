# whisperflow

A port of the [wisprflow.ai](https://wisprflow.ai) marketing site to Next.js 16 (App Router) + Tailwind v4.

The original is a Webflow build driven by GSAP ScrollTrigger. This port reimplements
the same structure, design system, and interactions with React state, CSS animations,
`IntersectionObserver`, and sticky scroll tracks — no GSAP or Webflow runtime.

```bash
npm run dev
```

## Design system

Tokens in `app/globals.css` are lifted from the live site's Webflow variable collection:

| Token | Value | Use |
| --- | --- | --- |
| `lumen` | `#ffffeb` | page background |
| `lumen-dark` | `#e4e4d0` | segmented control, title bars |
| `vast` | `#1a1a1a` | text, borders, dark sections |
| `dawn` | `#f0d7ff` | primary button, accent panels |
| `fathom` | `#034f46` | teal feature sections |
| `glow` / `flare` / `signal` | `#ffa946` / `#ff6c4c` / `#ffbcf2` | filler / correction / repetition highlights |

Type is the original pairing: **EB Garamond** (display, italic for emphasis) and
**Figtree** (body), loaded via `next/font/google`.

Custom classes live inside `@layer components` so Tailwind utilities always win
over them — without this, `.btn { display: inline-flex }` beats `hidden` and the
nav CTA leaks onto mobile.

## Sections

| Component | What it ports |
| --- | --- |
| `Nav` | Sticky pill bar, Dictation/Notetaker segmented toggle, per-character hover roll on links, mobile sheet |
| `Hero` | Display headline, plus two counter-rotating SVG `textPath` rings (messy transcript in grey, cleaned copy on a black band) sized as huge circles tangent to the mic pill |
| `LogoMarquee` | Dark rounded section with an infinite horizontal logo marquee |
| `FasterThanTyping` | Teal panel comparing Keyboard 45 wpm vs Flow 220 wpm as vertical marquees running at proportional speeds |
| `CleanupDemo` | Scroll-linked demo: raw dictation types in, fillers/corrections/repetitions light up and strike through, "Cleaning up…" resolves to clean text, then sends as chat bubbles |
| `HowItWorks` | Sticky 300vh track where scroll position drives the three-tab rail, indicator, stage visuals, and copy (tabs also clickable) |
| `MakesItEasy` | Four alternating feature rows with live demos: language switching, vocabulary modal, snippet expansion, tone toggle |
| `Privacy` | Privacy Mode switch and certification chips |
| `Testimonials` | Dark section with two case studies and four quote cards |
| `Faq` | Two-pane question list / answer panel on desktop, accordion on mobile |
| `StartFlowing`, `Footer` | Closing CTA and the full footer link map |

## Notes

- Company wordmarks in the logo marquee are set as type rather than hot-linked
  brand SVGs from the original's CDN.
- All motion is gated behind `prefers-reduced-motion`.
- Scroll-linked sections read `getBoundingClientRect()` inside a
  `requestAnimationFrame`-throttled scroll listener; they degrade to their
  first frame if JS is unavailable.
# whispr-flow-clone
