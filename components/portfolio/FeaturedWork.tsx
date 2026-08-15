"use client";

import Image from "next/image";
import { PathMarquee, Reveal, useScrollProgress } from "../primitives";
import { ipfModules, projects, stats } from "@/lib/portfolio";

const CURVE_FAST =
  "M0 74.7977 L70.055 74.7977C253.23 74.7977 310.275 0.534007 467.005 0.797575C622.426 1.05894 621.28 74.7977 858.005 74.7977 L928 74.7977";

const featured = projects.find((p) => p.featured)!;
const TECH_TRAIL = featured.tech.join("  ·  ") + "  ·  ";

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);
const range = (p: number, from: number, to: number) =>
  clamp01((p - from) / (to - from));

const MODULES = ipfModules;

/**
 * The real web + mobile screens for a module, cross-fading as you scroll.
 * Both frames match their source aspect ratio (web ≈ 16:9, mobile 736:1600)
 * so nothing gets cropped.
 */
function ModuleShots({ active }: { active: number }) {
  return (
    <div className="relative flex h-full items-center">
      <div className="relative w-full">
        {/* browser */}
        <div className="overflow-hidden rounded-[14px] border-2 border-vast bg-vast shadow-[0_20px_50px_-24px_#000000cc]">
          <div className="flex h-[26px] items-center gap-1.5 border-b-2 border-vast bg-lumen-dark px-2.5">
            <span className="h-2 w-2 rounded-full bg-vast" />
            <span className="h-2 w-2 rounded-full bg-stone" />
            <span className="h-2 w-2 rounded-full bg-fog" />
            <span className="ml-1.5 truncate text-[10px] font-medium text-dark-70">
              ipf-os · {MODULES[active].name.toLowerCase()}
            </span>
          </div>
          <div className="relative aspect-[16/9] w-full">
            {MODULES.map((m, i) => (
              <Image
                key={m.id}
                src={m.web}
                alt={`IPF OS ${m.name} — web`}
                fill
                sizes="400px"
                className="object-cover object-top transition-opacity duration-500"
                style={{ opacity: i === active ? 1 : 0 }}
              />
            ))}
          </div>
        </div>

        {/* phone, overlapping the lower-left corner */}
        <div className="absolute -bottom-14 -left-7 w-[88px] overflow-hidden rounded-[14px] border-2 border-vast bg-vast shadow-[0_16px_36px_-18px_#000000cc]">
          <div className="relative aspect-[736/1600] w-full">
            {MODULES.map((m, i) => (
              <Image
                key={m.id}
                src={m.mobile}
                alt={`IPF OS ${m.name} — mobile`}
                fill
                sizes="88px"
                className="object-cover object-top transition-opacity duration-500"
                style={{ opacity: i === active ? 1 : 0 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ModulePanel({ p }: { p: number }) {
  const active = Math.min(
    MODULES.length - 1,
    Math.floor(range(p, 0.3, 1) * MODULES.length * 0.999),
  );

  return (
    <div className="grid h-full grid-cols-[1fr_384px] items-center gap-8 p-9">
      {/* copy column */}
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.1em] text-dark-50 uppercase">
            {featured.category.join(" + ")} · enterprise
          </p>
          <h3 className="mt-2.5 font-[family-name:var(--font-display)] text-[40px] leading-[1]">
            IPF OS
          </h3>
        </div>

        {/* module switcher — same chip language as the project filters */}
        <div className="flex flex-wrap gap-1.5">
          {MODULES.map((m, i) => (
            <span
              key={m.id}
              className={`rounded-full border-2 px-2.5 py-1 text-[11.5px] font-semibold whitespace-nowrap transition-colors duration-300 ${
                i === active
                  ? "border-vast bg-vast text-lumen"
                  : "border-dark-15 text-dark-70"
              }`}
            >
              {m.name}
            </span>
          ))}
        </div>

        {/* active module, with a coral rule tying it to the chip above */}
        <div className="relative min-h-[78px] rounded-xl border-l-[3px] border-vast bg-lumen-dark py-3 pr-4 pl-4">
          {MODULES.map((m, i) => (
            <div
              key={m.id}
              className="transition-all duration-400"
              style={{
                opacity: i === active ? 1 : 0,
                position: i === 0 ? "relative" : "absolute",
                inset: i === 0 ? undefined : "12px 16px",
              }}
            >
              <p className="text-[15px] font-semibold">{m.name}</p>
              <p className="mt-1 text-[13px] leading-[1.45] text-dark-70">
                {m.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 border-t border-dark-15 pt-5">
          {featured.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-dark-15 px-2.5 py-1 text-[11px] font-medium text-dark-70"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* the actual product */}
      <ModuleShots active={active} />
    </div>
  );
}

type Module = (typeof MODULES)[number];

/** The plain, one-shot mobile figure — used when a track has ≤ 3 items
    and the sticky walkthrough would be overkill. */
function MobileModuleFigure({ module: m }: { module: Module }) {
  return (
    <figure>
      <div className="flex gap-3">
        <div className="relative aspect-[16/10] flex-1 overflow-hidden rounded-[14px] border-2 border-vast bg-vast">
          <Image
            src={m.web}
            alt={`IPF OS ${m.name} — web`}
            fill
            sizes="70vw"
            className="object-cover object-top"
          />
        </div>
        <div className="relative w-[64px] shrink-0 overflow-hidden rounded-[12px] border-2 border-vast bg-vast">
          <Image
            src={m.mobile}
            alt={`IPF OS ${m.name} — mobile`}
            fill
            sizes="64px"
            className="object-cover object-top"
          />
        </div>
      </div>
      <figcaption className="mt-2">
        <span className="text-[15px] font-semibold text-lumen">{m.name}</span>
        <span className="ml-2 text-[13px] text-lumen/60">{m.detail}</span>
      </figcaption>
    </figure>
  );
}

/** Scroll-linked, one-module-at-a-time card.

    Two design rules to keep it tight:
      1. All five web images share ONE aspect-16/10 box — layered, faded
         between via opacity. The card's height is then image + caption,
         nothing else.
      2. The phone screenshot is positioned against that image box (not
         against a stretched flex container), so it sits on the image's
         corner instead of floating in dead space.

    Result: the card hugs its content, the layout has no phantom
    vertical gap, and one module reads cleanly at a time. */
function MobileModuleWalkthrough() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const active = Math.min(
    MODULES.length - 1,
    Math.floor(progress * MODULES.length * 0.999),
  );

  // Snappy track — ~26vh per module keeps the whole cycle inside a
  // single tap-scroll's worth of motion, so the "still-scrolling
  // after the last image" tail feels like a flick, not a wait.
  return (
    <div
      ref={ref}
      className="relative mt-4"
      style={{ height: `${26 * MODULES.length}vh` }}
    >
      {/* The whole sticky viewport = walkthrough card + stats card,
          stacked. Both stay pinned together while the user scrolls.
          Only the module inside the card fades between frames — the
          stats never move. */}
      <div className="sticky top-[calc(var(--nav-h)+16px)] space-y-3">
        <div className="rounded-[24px] border-2 border-vast bg-lumen-dark p-4 pb-5 shadow-[6px_6px_0_0_#1a1a1a]">
        {/* header + progress */}
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-[11px] font-semibold tracking-[0.14em] text-dark-70 uppercase">
            Modules
          </span>
          <span className="font-mono text-[11px] text-dark-50">
            {String(active + 1).padStart(2, "0")} / {String(MODULES.length).padStart(2, "0")}
          </span>
        </div>
        <div className="mb-4 flex gap-1.5">
          {MODULES.map((m, i) => (
            <span
              key={m.id}
              className="h-1.5 flex-1 rounded-full transition-colors duration-300"
              style={{
                background: i === active ? "#1a1a1a" : "#1a1a1a26",
              }}
            />
          ))}
        </div>

        {/* image + phone — one shared aspect-ratio box; only opacity moves */}
        <div className="relative">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] border-2 border-vast bg-vast shadow-[0_16px_40px_-24px_#000000cc]">
            {MODULES.map((m, i) => (
              <Image
                key={m.id}
                src={m.web}
                alt={`IPF OS ${m.name} — web`}
                fill
                sizes="88vw"
                /* First module renders eagerly so the default view
                   (progress=0, active=0) is already paint-ready. */
                priority={i === 0}
                className="object-cover object-top transition-opacity duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                style={{ opacity: i === active ? 1 : 0 }}
                aria-hidden={i !== active}
              />
            ))}
          </div>
          {/* phone anchored to the image's lower-left corner */}
          <div className="absolute -bottom-6 left-4 w-[68px] overflow-hidden rounded-[12px] border-2 border-vast bg-vast shadow-[0_10px_24px_-14px_#000000cc]">
            <div className="relative aspect-[736/1600] w-full">
              {MODULES.map((m, i) => (
                <Image
                  key={m.id}
                  src={m.mobile}
                  alt={`IPF OS ${m.name} — mobile`}
                  fill
                  sizes="68px"
                  priority={i === 0}
                  className="object-cover object-top transition-opacity duration-500"
                  style={{ opacity: i === active ? 1 : 0 }}
                  aria-hidden={i !== active}
                />
              ))}
            </div>
          </div>
        </div>

        {/* caption — cleared past the overlapping phone */}
        <div className="relative mt-8 min-h-[60px] pl-1">
          {MODULES.map((m, i) => (
            <div
              key={m.id}
              className="absolute inset-0 transition-opacity duration-500"
              style={{ opacity: i === active ? 1 : 0 }}
              aria-hidden={i !== active}
            >
              <p className="font-[family-name:var(--font-display)] text-[22px] leading-[1.05]">
                {m.name}
              </p>
              <p className="mt-1.5 text-[13.5px] leading-[1.45] text-dark-70">
                {m.detail}
              </p>
            </div>
          ))}
        </div>
        </div>
        {/* stats — original visual language (big serif numbers on the
            section's vast ground, hairline divider). Kept inside the
            sticky so they stay locked to the walkthrough card. */}
        <div className="grid grid-cols-2 gap-6 border-t border-lumen/15 pt-6">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-[family-name:var(--font-display)] text-[clamp(2rem,7vw,2.6rem)] leading-none text-lumen">
                {s.value}
              </div>
              <div className="mt-1.5 text-[13px] leading-[1.35] whitespace-pre-line text-lumen/60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedWork() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  return (
    <section id="work" className="bg-vast px-4 pb-4">
      <div className="rounded-section bg-vast px-5 pt-16 pb-4 md:px-10 md:pt-28">
        <div className="mx-auto max-w-[1160px]">
          <Reveal className="text-center text-lumen">
            <p className="eyebrow text-lumen/60">Featured work</p>
            <h2 className="hd-1 mt-4">
              Enterprise scale, <em>shipped.</em>
            </h2>
            <p className="mx-auto mt-8 max-w-[720px] text-[20px] leading-[1.35] text-lumen/85 text-balance">
              {featured.description}
            </p>
          </Reveal>
        </div>

        {/* pinned track: stat card left, module walkthrough right */}
        <div ref={ref} className="relative hidden h-[340vh] md:block">
          <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-8">
            <div className="relative mx-auto h-[501px] w-full max-w-[1160px] overflow-hidden">
              {/* Both cards are solid, bordered and hard-shadowed — the same
                  language as every other card on the site. They used to be
                  translucent fills with faint borders and backdrop blur,
                  which read as a different design entirely. */}

              {/* left — the numbers */}
              <div className="absolute top-0 left-0 z-10 flex h-[495px] w-[325px] flex-col justify-center gap-7 rounded-[32px] border-2 border-vast bg-lumen-dark p-9 shadow-[6px_6px_0_0_#1a1a1a]">
                <p className="text-[12px] font-semibold tracking-[0.1em] text-dark-50 uppercase">
                  At a glance
                </p>

                <div className="flex flex-col gap-6">
                  {[
                    { value: MODULES.length, label: "Modules" },
                    { value: 2, label: "Platforms" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-baseline gap-4">
                      <span className="font-[family-name:var(--font-display)] text-[58px] leading-[0.8] tabular-nums">
                        {s.value}
                      </span>
                      <span className="text-[15px] font-semibold text-dark-70">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="border-t border-dark-15 pt-5 text-[13px] leading-[1.45] text-dark-70">
                  Web and mobile, one codebase family
                </p>
              </div>

              {/* right — the platform card. Rendered from the first frame:
                  it used to fade in at 22% scroll, so arriving at the pinned
                  section showed an empty card. */}
              <div className="absolute top-0 left-[345px] z-10 h-[495px] w-[809px] overflow-hidden rounded-[32px] border-2 border-vast bg-lumen shadow-[6px_6px_0_0_#1a1a1a]">
                <ModulePanel p={progress} />
              </div>
            </div>

            {/* The marquee sat behind the cards — fine while they were
                translucent, invisible once they were not. It runs as its own
                band below them now.

                It was also clipping its own text. The curve runs y 0.5..74.8
                inside a 76-unit box, so the ascenders at its peak sat above the
                frame and the descenders at its trough fell below it. Padding
                the viewBox 28 units top and bottom — at a matching height, so
                the scale stays uniform — leaves ~9px either side. */}
            <div className="mask-fade-x pointer-events-none w-full max-w-[1160px] overflow-hidden">
              <PathMarquee
                id="pf-work-fast"
                d={CURVE_FAST}
                viewBox="0 -28 928 116"
                width={1160}
                height={145}
                text={TECH_TRAIL}
                speed={62}
                fontSize={22}
                fontWeight={600}
                fill="rgba(255,255,235,0.6)"
              />
            </div>
          </div>
        </div>

        {/* mobile — a sticky, scroll-driven walkthrough of the modules.
            Kicks in above three items so short lists still render statically
            (no phantom scroll on a two-module product). Each module fades
            in over ~60vh of scroll; the caption and phone inset swap with
            the web shot in one motion, and the progress dots make the run
            legible. Mirrors the ServicesTabs desktop feel. */}
        <div className="mx-auto mt-8 max-w-[1160px] md:hidden">
          <div className="rounded-[24px] border-2 border-vast bg-lumen-dark p-5 shadow-[6px_6px_0_0_#1a1a1a]">
            <p className="text-[12px] font-semibold tracking-[0.08em] text-dark-50 uppercase">
              {featured.category.join(" + ")} · enterprise
            </p>
            <h3 className="mt-1.5 font-[family-name:var(--font-display)] text-[30px] leading-[1]">
              IPF OS
            </h3>
            <div className="mt-4 flex gap-8">
              <div>
                <div className="font-[family-name:var(--font-display)] text-[30px] leading-none">
                  {MODULES.length}
                </div>
                <div className="text-[12px] text-dark-70">modules</div>
              </div>
              <div>
                <div className="font-[family-name:var(--font-display)] text-[30px] leading-none">
                  2
                </div>
                <div className="text-[12px] text-dark-70">platforms</div>
              </div>
            </div>
          </div>

          {MODULES.length > 3 ? (
            <MobileModuleWalkthrough />
          ) : (
            <div className="mt-4 flex flex-col gap-5">
              {MODULES.map((m) => (
                <MobileModuleFigure key={m.id} module={m} />
              ))}
            </div>
          )}
        </div>

        {/* stat row — desktop only; mobile renders stats inside the
            sticky walkthrough so they're always visible with the card */}
        <Reveal className="mx-auto hidden max-w-[1160px] md:mt-16 md:block md:pb-20">
          <div className="grid grid-cols-2 gap-8 border-t border-lumen/15 md:grid-cols-4 md:pt-12">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,4vw,3.4rem)] leading-none text-lumen">
                  {s.value}
                </div>
                <div className="mt-2 text-[14px] leading-[1.35] whitespace-pre-line text-lumen/60">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
