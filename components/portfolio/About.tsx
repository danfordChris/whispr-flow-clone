"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Reveal, useScrollProgress } from "../primitives";
import {
  activities,
  career,
  allTech,
  profile,
  projects,
  socials,
} from "@/lib/portfolio";

/* ------------------------------------------------------------------
   A scattered field of cards. As the section scrolls the field drifts
   up, each card at its own rate, so they pass the viewport at
   different speeds.

   It sits on the page's own cream surface rather than a dark band —
   About lands after a long run of cream sections, and dropping to
   black there reads as arriving somewhere else. The colour comes from
   the cards, in the same bordered / hard-shadow language as the
   project and product cards.
   ------------------------------------------------------------------ */

type Tone =
  | "white"
  | "mint"
  | "glow"
  | "flare"
  | "dawn"
  | "signal"
  | "deep"
  | "ink";

/** Card fills. `deep` and `ink` are the two dark accents that give the field
    punch without turning the whole section into a dark band. */
const TONE: Record<Tone, { bg: string; fg: string }> = {
  white: { bg: "#ffffff", fg: "#1a1a1a" },
  mint: { bg: "#cef5ca", fg: "#1a1a1a" },
  glow: { bg: "#ffa946", fg: "#1a1a1a" },
  flare: { bg: "#ff6c4c", fg: "#1a1a1a" },
  dawn: { bg: "#f0d7ff", fg: "#1a1a1a" },
  signal: { bg: "#ffbcf2", fg: "#1a1a1a" },
  deep: { bg: "#034f46", fg: "#ffffeb" },
  ink: { bg: "#1a1a1a", fg: "#ffffeb" },
};

type Card = {
  id: string;
  tone: Tone;
  /** left offset as a % of the field width */
  x: number;
  /** top offset in px within the field */
  y: number;
  w: number;
  rotate: number;
  /** how far this card drifts across the whole scroll, in px */
  drift: number;
  body: ReactNode;
};

const yearsBuilding =
  new Date().getFullYear() - 2020 > 0 ? new Date().getFullYear() - 2020 : 5;

function Quote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <>
      <p className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,1.6vw,1.75rem)] leading-[1.2]">
        {children}
      </p>
      {cite && (
        <p className="mt-6 text-[13px] font-semibold opacity-70">{cite}</p>
      )}
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <>
      <div className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,4vw,3.6rem)] leading-none">
        {value}
      </div>
      <div className="mt-2 text-[13px] leading-[1.35] whitespace-pre-line opacity-70">
        {label}
      </div>
    </>
  );
}

const CARDS: Card[] = [
  {
    id: "bio",
    tone: "white",
    x: 4,
    y: 60,
    w: 400,
    rotate: -2.5,
    drift: -760,
    body: <Quote cite={`${profile.firstName} ${profile.lastName}`}>{profile.bio}</Quote>,
  },
  {
    id: "portrait",
    tone: "mint",
    x: 42,
    y: 150,
    w: 520,
    rotate: 1.5,
    drift: -1080,
    body: (
      <div className="flex gap-5">
        <div className="relative h-[190px] w-[150px] shrink-0 overflow-hidden rounded-[16px]">
          <Image
            src="/img/avatar.jpg"
            alt={`${profile.firstName} ${profile.lastName}`}
            fill
            sizes="150px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between">
          <p className="font-[family-name:var(--font-display)] text-[22px] leading-[1.15]">
            Building from {profile.location}.
          </p>
          <div>
            <p className="text-[14px] font-semibold">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="mt-0.5 text-[13px] opacity-70">{profile.roles[0]}</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "projects",
    tone: "flare",
    x: 78,
    y: 380,
    w: 300,
    rotate: 3,
    drift: -820,
    body: <Stat value={`${projects.length}`} label={"projects\nshipped"} />,
  },
  {
    id: "roles",
    tone: "dawn",
    x: 14,
    y: 560,
    w: 340,
    rotate: 2,
    drift: -1120,
    body: (
      <>
        <p className="mb-4 text-[12px] font-semibold tracking-[0.08em] uppercase opacity-60">
          What I answer to
        </p>
        <ul className="space-y-2">
          {profile.roles.map((r) => (
            <li key={r} className="text-[17px] leading-[1.25] font-medium">
              {r}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "years",
    tone: "glow",
    x: 62,
    y: 700,
    w: 280,
    rotate: -3,
    drift: -820,
    body: <Stat value={`${yearsBuilding}`} label={"years\nbuilding"} />,
  },
  {
    id: "activities",
    tone: "white",
    x: 34,
    y: 900,
    w: 420,
    rotate: -1.5,
    drift: -1050,
    body: (
      <>
        <p className="mb-4 text-[12px] font-semibold tracking-[0.08em] uppercase opacity-60">
          Apart from coding
        </p>
        <ul className="flex flex-wrap gap-2">
          {activities.map((a) => (
            <li
              key={a}
              className="rounded-full border border-vast/20 px-3 py-1.5 text-[14px]"
            >
              {a}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "teams",
    tone: "signal",
    x: 3,
    y: 1090,
    w: 280,
    rotate: 2.5,
    drift: -780,
    body: <Stat value={`${career.length}`} label={"teams\nworked with"} />,
  },
  {
    id: "stack",
    tone: "deep",
    x: 70,
    y: 1180,
    w: 360,
    rotate: -2,
    drift: -980,
    body: (
      <>
        <Stat value={`${allTech.length}`} label={"tools in\nrotation"} />
        <p className="mt-4 text-[13px] leading-[1.45] opacity-70">
          Flutter and React day to day, Python and Node behind them, Docker and
          CI carrying it to production.
        </p>
      </>
    ),
  },
  {
    id: "socials",
    tone: "ink",
    x: 40,
    y: 1420,
    w: 380,
    rotate: 1.5,
    /* Increased from -700 so the card's final resting spot leaves room
       for the Instagram row above About's sticky-container clip line. */
    drift: -920,
    body: (
      <>
        <p className="mb-4 text-[12px] font-semibold tracking-[0.08em] uppercase opacity-60">
          Find me
        </p>
        <ul className="space-y-2">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-baseline justify-between gap-4 text-[16px] font-medium transition-opacity hover:opacity-60"
              >
                {s.label}
                <span className="text-[13px] opacity-50">{s.handle}</span>
              </a>
            </li>
          ))}
        </ul>
      </>
    ),
  },
];

function ScatterCard({
  card,
  progress,
}: {
  card: Card;
  progress: number;
}) {
  const t = TONE[card.tone];
  const style: CSSProperties = {
    left: `${card.x}%`,
    top: card.y,
    width: card.w,
    background: t.bg,
    color: t.fg,
    transform: `translate3d(0, ${progress * card.drift}px, 0) rotate(${card.rotate}deg)`,
    willChange: "transform",
  };

  return (
    <div
      className="absolute rounded-[24px] border-2 border-vast p-7 shadow-[6px_6px_0_0_#1a1a1a]"
      style={style}
    >
      {card.body}
    </div>
  );
}

export default function About() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  return (
    <section id="about" className="bg-lumen">
      <div className="px-5 pt-28 md:px-10 md:pt-36">
        <Reveal className="mx-auto max-w-[1240px] text-center">
          <p className="eyebrow text-dark-70">About</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.4vw,4.6875rem)] leading-[1] font-normal text-balance">
            Engineer first, <em className="italic">product-minded always.</em>
          </h2>
        </Reveal>
      </div>

      {/* desktop: drifting scatter field */}
      <div ref={ref} className="relative hidden h-[300vh] md:block">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="relative mx-auto h-full max-w-[1600px]">
            {CARDS.map((c) => (
              <ScatterCard key={c.id} card={c} progress={progress} />
            ))}
          </div>
        </div>
      </div>

      {/* mobile: the same cards, stacked and readable */}
      <div className="flex flex-col gap-4 px-5 py-16 md:hidden">
        {CARDS.map((c) => {
          const t = TONE[c.tone];
          return (
            <div
              key={c.id}
              className="rounded-[24px] border-2 border-vast p-6"
              style={{ background: t.bg, color: t.fg }}
            >
              {c.body}
            </div>
          );
        })}
      </div>
    </section>
  );
}
