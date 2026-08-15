"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { MobileWalkthrough, Reveal, useScrollProgress } from "../primitives";
import Gallery from "./Gallery";
import { projects, type Project } from "@/lib/portfolio";

/* ------------------------------------------------------------------
   Selected projects on a moving wave.

   Composition: five curated project cards + one View-all card sit in a
   sticky field. Each card has a linear drift (like About) and a sine
   bob at a per-card phase — the six phases are spread across 2π, so
   the row reads as one wave crossing the section during scroll.

   Behind the cards sits an SVG wave that shifts horizontally with
   scroll progress, giving the metaphor a literal anchor.

   Everything reads from the monochrome tokens in globals.css.
   ------------------------------------------------------------------ */

const FEATURED_IDS = [
  "notify-africa",
  "bantu-soko",
  "nasafiri",
  "ocean-ecommerce",
  "tetris-game",
] as const;

const featured = FEATURED_IDS.map((id) =>
  projects.find((p) => p.id === id),
).filter((p): p is Project => Boolean(p));

const CATEGORY_COUNT = new Set(projects.flatMap((p) => p.category)).size;

type Tone = "paper" | "bone" | "lumen" | "lumen-dark" | "vast" | "void";

const TONE: Record<Tone, { bg: string; fg: string; darkText: boolean }> = {
  paper: { bg: "#ffffff", fg: "#1a1a1a", darkText: true },
  bone: { bg: "#f2f2ec", fg: "#1a1a1a", darkText: true },
  lumen: { bg: "#ffffeb", fg: "#1a1a1a", darkText: true },
  "lumen-dark": { bg: "#e4e4d0", fg: "#1a1a1a", darkText: true },
  vast: { bg: "#1a1a1a", fg: "#ffffeb", darkText: false },
  void: { bg: "#000000", fg: "#ffffeb", darkText: false },
};

type Slot = {
  tone: Tone;
  x: number;
  y: number;
  w: number;
  rotate: number;
  drift: number;
  /** phase for the sine bob, in radians */
  phase: number;
  /** peak-to-peak sine amplitude in px */
  amplitude: number;
};

/* Five project slots plus one hero View-all slot.

   Projects: phases march across ~2π so the row bobs as a single wave.
   Their drifts are tuned to carry them off the top by the end of the
   scroll, clearing the stage for the arrival.

   View-all: starts BELOW the sticky viewport, drifts up to a dominant
   centre-of-frame position at max progress, and has no sine bob — a
   CTA should sit still. It's also visibly larger than the project
   cards so it reads as the arrival, not another peer. */
const SLOTS: Slot[] = [
  { tone: "paper",       x: 3,  y: 90,   w: 380, rotate: -3,   drift: -1040, phase: 0,                 amplitude: 56 },
  { tone: "bone",        x: 40, y: 260,  w: 340, rotate: 2.5,  drift: -1140, phase: Math.PI / 3,       amplitude: 62 },
  { tone: "lumen-dark",  x: 74, y: 110,  w: 360, rotate: -2,   drift: -960,  phase: (2 * Math.PI) / 3, amplitude: 54 },
  { tone: "vast",        x: 5,  y: 520,  w: 340, rotate: 2,    drift: -1080, phase: Math.PI,           amplitude: 58 },
  { tone: "lumen",       x: 42, y: 660,  w: 340, rotate: -1.5, drift: -1020, phase: (4 * Math.PI) / 3, amplitude: 60 },
  /* Same size and rhythm as a project card — starts below the viewport
     and drifts up to a centred, in-view resting spot at max progress
     so the wave hands off cleanly to the CTA. */
  { tone: "void",        x: 32, y: 1220, w: 380, rotate: -1,   drift: -900,  phase: (5 * Math.PI) / 3, amplitude: 44 },
];

const CARD_BASE =
  "block h-full overflow-hidden rounded-[24px] border-2 border-vast shadow-[6px_6px_0_0_#1a1a1a] transition-transform duration-300 hover:-translate-y-1";

/* ------------------------------------------------------------------
   Cards
   ------------------------------------------------------------------ */

function ProjectCard({
  project,
  tone,
  onOpen,
  detailed = false,
}: {
  project: Project;
  tone: Tone;
  onOpen: () => void;
  /** Compact for the desktop scatter (image + title only); detailed
      for the mobile walkthrough (adds description + tech chips). */
  detailed?: boolean;
}) {
  const t = TONE[tone];
  const chipBg = t.darkText ? "#ffffeb" : "#1a1a1a";
  const chipFg = t.darkText ? "#1a1a1a" : "#ffffeb";
  const chipBorder = t.darkText ? "#1a1a1a" : "#ffffeb";
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View ${project.title} screens`}
      className={`${CARD_BASE} group flex w-full cursor-pointer flex-col text-left`}
      style={{ background: t.bg, color: t.fg }}
    >
      <div className={`relative w-full overflow-hidden border-b-2 border-vast ${detailed ? "aspect-[4/3]" : "aspect-[16/10]"}`}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes={detailed ? "92vw" : "440px"}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span
          className="absolute top-3 left-3 rounded-full border-2 px-2.5 py-1 text-[11px] font-semibold capitalize"
          style={{ background: chipBg, color: chipFg, borderColor: chipBorder }}
        >
          {project.category.join(" + ")}
        </span>
      </div>
      <div className={`flex flex-1 flex-col ${detailed ? "gap-3 p-6" : "gap-2 p-5"}`}>
        <h3 className={`font-[family-name:var(--font-display)] leading-[1.05] ${detailed ? "text-[28px]" : "text-[22px]"}`}>
          {project.title}
        </h3>
        {detailed && (
          <>
            <p className="text-[14.5px] leading-[1.5]" style={{ opacity: 0.78 }}>
              {project.description}
            </p>
            <ul className="mt-1 flex flex-wrap gap-1.5">
              {project.tech.slice(0, 6).map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border px-2.5 py-1 text-[11px] font-medium"
                  style={{ borderColor: chipBorder, opacity: 0.75 }}
                >
                  {tech}
                </li>
              ))}
            </ul>
          </>
        )}
        <span
          className={`mt-auto inline-flex items-center gap-1.5 ${detailed ? "pt-3 text-[14px]" : "pt-2 text-[13px]"} font-semibold`}
          style={{ opacity: 0.75 }}
        >
          {project.shots.length}{" "}
          {project.shots.length === 1 ? "screen" : "screens"}
          <span aria-hidden="true">↗</span>
        </span>
      </div>
    </button>
  );
}

function ViewAllCard({ tone }: { tone: Tone }) {
  const t = TONE[tone];
  return (
    <Link
      href="/projects"
      className={`${CARD_BASE} group flex h-full flex-col justify-between gap-6 p-7`}
      style={{ background: t.bg, color: t.fg }}
      aria-label={`View all ${projects.length} projects`}
    >
      <div className="flex flex-col gap-3">
        <span
          className="text-[11px] font-semibold tracking-[0.16em] uppercase"
          style={{ opacity: 0.55 }}
        >
          Selected {featured.length} of {projects.length}
        </span>
        <span className="font-[family-name:var(--font-display)] text-[clamp(1.85rem,2.8vw,2.5rem)] leading-[1.02]">
          See every project I&rsquo;ve <em className="italic">shipped</em>.
        </span>
        <span
          className="text-[13px] leading-[1.5]"
          style={{ opacity: 0.72 }}
        >
          {projects.length} across mobile, web, and games — filterable by
          lane on the next page.
        </span>
      </div>
      <div className="flex items-end justify-between gap-4">
        <span className="text-[15px] font-semibold">View catalogue</span>
        <svg
          width="56"
          height="42"
          viewBox="0 0 56 42"
          fill="none"
          className="shrink-0 transition-transform duration-300 group-hover:translate-x-1.5"
          aria-hidden="true"
        >
          <path
            d="M4 21 H48 M34 7 L48 21 L34 35"
            stroke={t.fg}
            strokeWidth="2.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            fill="none"
          />
        </svg>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------
   Scatter / motion primitives
   ------------------------------------------------------------------ */

function ScatterCard({
  slot,
  progress,
  reducedMotion,
  children,
}: {
  slot: Slot;
  progress: number;
  reducedMotion: boolean;
  children: ReactNode;
}) {
  const bob = reducedMotion
    ? 0
    : Math.sin(progress * Math.PI * 2 + slot.phase) * slot.amplitude;
  const style: CSSProperties = {
    left: `${slot.x}%`,
    top: slot.y,
    width: slot.w,
    transform: `translate3d(0, ${progress * slot.drift + bob}px, 0) rotate(${slot.rotate}deg)`,
    willChange: "transform",
  };
  return (
    <div className="absolute" style={style}>
      {children}
    </div>
  );
}

/** Two horizontal sine paths behind the cards. They shift horizontally
    with scroll progress, so the whole section feels like it's riding a
    wave. Static and cheap — one paint, transform-only updates. */
function WaveBackdrop({ progress }: { progress: number }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 1600 900"
      aria-hidden="true"
    >
      <path
        d="M-400 470 C -100 320, 300 620, 600 470 S 1200 320, 1500 470 S 2100 620, 2400 470"
        stroke="#d6d6d1"
        strokeWidth="1.5"
        fill="none"
        style={{
          transform: `translate3d(${progress * -260}px, 0, 0)`,
          willChange: "transform",
        }}
      />
      <path
        d="M-400 640 C -100 800, 300 500, 600 640 S 1200 800, 1500 640 S 2100 500, 2400 640"
        stroke="#d6d6d1"
        strokeWidth="1"
        fill="none"
        opacity="0.55"
        style={{
          transform: `translate3d(${progress * -180}px, 0, 0)`,
          willChange: "transform",
        }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Section
   ------------------------------------------------------------------ */

export default function FeaturedProjects() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const [gallery, setGallery] = useState<{ project: Project; at: number } | null>(
    null,
  );

  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, []);

  const projectSlots = useMemo(() => SLOTS.slice(0, featured.length), []);
  const viewAllSlot = SLOTS[SLOTS.length - 1];

  return (
    <section id="projects" className="bg-lumen">
      {/* Desktop heading — sits above the sticky wave. On mobile the
          heading lives INSIDE the walkthrough's sticky wrapper so it
          stays visible while the card cycles. */}
      <div className="hidden px-5 pt-28 md:block md:px-10 md:pt-36">
        <Reveal className="mx-auto max-w-[1240px] text-center">
          <p className="eyebrow text-dark-70">Selected projects</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.4vw,4.6875rem)] leading-[1] font-normal text-balance">
            A wave of things I&rsquo;ve <em className="italic">shipped.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-[1.5] text-dark-70">
            {featured.length} picked across {CATEGORY_COUNT} lanes — mobile,
            web, and a game — riding a wave down the section. The last card
            opens the full catalogue.
          </p>
        </Reveal>
      </div>

      {/* desktop — sticky wave field */}
      <div ref={ref} className="relative hidden h-[280vh] md:block">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="relative mx-auto h-full max-w-[1600px]">
            <WaveBackdrop progress={progress} />
            {featured.map((p, i) => (
              <ScatterCard
                key={p.id}
                slot={projectSlots[i]}
                progress={progress}
                reducedMotion={reducedMotion}
              >
                <ProjectCard
                  project={p}
                  tone={projectSlots[i].tone}
                  onOpen={() => setGallery({ project: p, at: 0 })}
                />
              </ScatterCard>
            ))}
            <ScatterCard
              slot={viewAllSlot}
              progress={progress}
              reducedMotion={reducedMotion}
            >
              <ViewAllCard tone={viewAllSlot.tone} />
            </ScatterCard>
          </div>
        </div>
      </div>

      {/* mobile — heading + card together in the sticky wrapper.
          Only the project card fades between items on scroll; the
          heading and description stay pinned above it. */}
      <div className="px-3 pt-6 pb-16 md:hidden">
        <MobileWalkthrough
          vhPerItem={32}
          header={
            <div className="mb-5 px-2 text-center">
              <p className="eyebrow text-dark-70">Selected projects</p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2rem,9vw,3rem)] leading-[1] font-normal text-balance">
                A wave of things I&rsquo;ve{" "}
                <em className="italic">shipped.</em>
              </h2>
              <p className="mx-auto mt-3 max-w-[36ch] text-[14.5px] leading-[1.45] text-dark-70">
                {featured.length} picked across {CATEGORY_COUNT} lanes —
                the last card opens the full catalogue.
              </p>
            </div>
          }
          items={[
            ...featured.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                tone={projectSlots[i].tone}
                onOpen={() => setGallery({ project: p, at: 0 })}
                detailed
              />
            )),
            <ViewAllCard key="view-all" tone={viewAllSlot.tone} />,
          ]}
        />
      </div>

      {gallery && (
        <Gallery
          project={gallery.project}
          startAt={gallery.at}
          onClose={() => setGallery(null)}
        />
      )}
    </section>
  );
}
