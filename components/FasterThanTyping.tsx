"use client";

import Image from "next/image";
import { PathMarquee, Reveal, useScrollProgress, Waveform } from "./primitives";

const PASSAGE =
  "I'm getting started with the project. How would you like to set up the file? I can create a new one from scratch, or pull in something you're already working with. What sounds good? Cool, give me a sec… Alright, got the structure ready. Want to walk me through what you're building, or start with a template? Up to you, I'll follow your lead. ";

/* Both paths are taken verbatim from the live site's inline SVGs. */
const CURVE_STRAIGHT = "M0 44 H2000";
const CURVE_FAST =
  "M0 74.7977 L70.055 74.7977C253.23 74.7977 310.275 0.534007 467.005 0.797575C622.426 1.05894 621.28 74.7977 858.005 74.7977 L928 74.7977";

/* ---------- the dictation clean-up that plays inside the Flow card ---- */

type Kind = "plain" | "filler" | "repetition" | "correction";

const RAW: { t: string; k: Kind }[] = [
  { t: "Hey so ", k: "plain" },
  { t: "um ", k: "filler" },
  { t: "can you ", k: "plain" },
  { t: "actually wait ", k: "correction" },
  { t: "can you tell the team that ", k: "plain" },
  { t: "the the ", k: "repetition" },
  { t: "launch is gonna slip I think to ", k: "plain" },
  { t: "like ", k: "filler" },
  { t: "not Friday the following Monday ", k: "correction" },
  { t: "because we're still waiting on ", k: "plain" },
  { t: "uh ", k: "filler" },
  { t: "legal to sign off on ", k: "plain" },
  { t: "the the ", k: "repetition" },
  { t: "new terms page and ", k: "plain" },
  { t: "uh yeah ", k: "filler" },
  { t: "just let them know we'll have a real timeline by ", k: "plain" },
  { t: "by ", k: "repetition" },
  { t: "end of week ", k: "plain" },
  { t: "sorry end of day Thursday", k: "correction" },
];

const CLEAN =
  "Can you let the team know the launch is slipping to Monday? We're still waiting on legal to sign off on the new terms page. We'll have a firm timeline by end of day Thursday.";

const BADGES: { label: string; kind: Kind; color: string; at: number }[] = [
  { label: "Filler identified", kind: "filler", color: "#ffa946", at: 0 },
  { label: "Correction identified", kind: "correction", color: "#ff6c4c", at: 0.34 },
  { label: "Repetition identified", kind: "repetition", color: "#ffbcf2", at: 0.67 },
];

const TINT: Record<Kind, string> = {
  plain: "transparent",
  filler: "#ffa946",
  repetition: "#ffbcf2",
  correction: "#ff6c4c",
};

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);
const range = (p: number, from: number, to: number) =>
  clamp01((p - from) / (to - from));

/* Cumulative character offsets and flag thresholds are fixed, so resolve them
   once at module scope rather than recomputing (and mutating) each render. */
let runningOffset = 0;
const SEGMENTS = RAW.map((seg) => {
  const start = runningOffset;
  runningOffset += seg.t.length;
  return {
    ...seg,
    start,
    flagAt: BADGES.find((b) => b.kind === seg.k)?.at ?? null,
  };
});
const TOTAL_CHARS = runningOffset;

function CleanupPanel({ p }: { p: number }) {
  const typed = range(p, 0.3, 0.48);
  const flagged = range(p, 0.48, 0.66);
  const cleaning = range(p, 0.66, 0.74);
  const cleaned = range(p, 0.74, 0.85);
  const sent = range(p, 0.85, 1);

  const shown = Math.round(typed * TOTAL_CHARS);

  const parts = SEGMENTS.map((seg, i) => {
    const visible = clamp01((shown - seg.start) / seg.t.length);
    const lit = seg.flagAt !== null && flagged > seg.flagAt;
    return { ...seg, i, visible, lit };
  });

  return (
    <div className="flex h-full flex-col justify-end gap-3 p-6">
      {/* sent messages */}
      <div className="flex flex-col items-end gap-2">
        <div
          className="self-start rounded-2xl rounded-bl-md bg-lumen/15 px-3.5 py-2 text-[13px] text-lumen transition-all duration-500"
          style={{
            opacity: sent > 0.15 ? 1 : 0,
            transform: `translateY(${(1 - clamp01(sent / 0.15)) * 8}px)`,
          }}
        >
          Hi Marcus
        </div>
        <div
          className="max-w-[78%] rounded-2xl rounded-br-md bg-dawn px-4 py-2.5 text-[13px] leading-[1.45] text-vast transition-all duration-500"
          style={{
            opacity: sent > 0.4 ? 1 : 0,
            transform: `translateY(${(1 - clamp01((sent - 0.4) / 0.3)) * 10}px)`,
          }}
        >
          {CLEAN}
        </div>
      </div>

      {/* composer */}
      <div className="relative min-h-[84px] rounded-xl border border-lumen/20 bg-vast/40 px-3.5 py-2.5 backdrop-blur-sm">
        <p
          className="text-[13px] leading-[1.5] text-lumen transition-opacity duration-300"
          style={{
            opacity: cleaned > 0.35 ? 0 : 1,
            display: sent > 0.4 ? "none" : undefined,
          }}
        >
          {shown === 0 && <span className="text-lumen/40">Message…</span>}
          {parts.map((s) => (
            <span
              key={s.i}
              style={{
                opacity: s.visible,
                backgroundColor: s.lit ? TINT[s.k] : "transparent",
                color: s.lit ? "#1a1a1a" : undefined,
                borderRadius: 4,
                padding: s.lit ? "1px 2px" : 0,
                textDecorationLine:
                  s.lit && s.k !== "plain" ? "line-through" : "none",
                transition: "background-color .35s ease, opacity .2s linear",
              }}
            >
              {s.t}
            </span>
          ))}
        </p>

        <p
          className="absolute inset-0 px-3.5 py-2.5 text-[13px] leading-[1.5] text-lumen transition-opacity duration-500"
          style={{
            opacity: cleaned > 0.35 && sent < 0.4 ? 1 : 0,
            pointerEvents: "none",
          }}
        >
          {CLEAN}
          <span className="caret ml-0.5" />
        </p>
      </div>

      {/* status row */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex h-[34px] items-center gap-2 rounded-full border border-lumen/25 bg-vast/70 px-3">
          <span className="h-1.5 w-1.5 rounded-full bg-flare" />
          <Waveform
            height={16}
            bars={14}
            color="#ffffeb"
            active={typed > 0 && cleaning < 1}
          />
        </div>

        <span
          className="rounded-full bg-lumen px-3 py-1.5 text-[11px] font-semibold text-vast transition-opacity duration-300"
          style={{ opacity: cleaning > 0.1 && cleaned < 0.8 ? 1 : 0 }}
        >
          Cleaning up…
        </span>

        {BADGES.map((b) => {
          const on = flagged > b.at && sent < 0.25;
          return (
            <span
              key={b.label}
              className="rounded-full px-3 py-1.5 text-[11px] font-semibold text-vast transition-all duration-300"
              style={{
                backgroundColor: b.color,
                opacity: on ? 1 : 0,
                transform: `translateY(${on ? 0 : 6}px)`,
              }}
            >
              {b.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- section --------------------------------------------------- */

export default function FasterThanTyping() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  // the wpm comparison holds, then hands over to the clean-up animation
  const marqueeOut = range(progress, 0.18, 0.3);
  const chatIn = range(progress, 0.22, 0.34);

  return (
    <section className="bg-vast px-4 pb-4">
      <div className="rounded-[var(--radius-section-medium)] bg-fathom px-5 pt-24 pb-4 md:px-10 md:pt-28">
        <div className="mx-auto max-w-[1160px]">
          <Reveal className="text-center text-lumen">
            <h2 className="hd-1">
              4x faster <em>than typing</em>
            </h2>
            <p className="mx-auto mt-8 max-w-[720px] text-[20px] leading-[1.35] text-lumen/85 text-balance">
              Voice that finally works is here. Flow lets you create, code,
              message, and write at the speed of thought, 4x faster than your
              keyboard.
            </p>
          </Reveal>
        </div>

        {/* pinned track — the Flow card plays the clean-up as you scroll,
            matching the live site where this animation lives inside the card */}
        <div ref={ref} className="relative hidden h-[360vh] md:block">
          <div className="sticky top-0 flex h-screen items-center">
            <div className="relative mx-auto h-[501px] w-full max-w-[1160px] overflow-hidden">
              {/* left card — Keyboard */}
              <div className="absolute inset-y-0 left-0 w-[325px] rounded-[40px] border-4 border-lumen/10" />

              {/* right card — Flow */}
              <div className="absolute inset-y-0 left-[325px] w-[835px] overflow-hidden rounded-[40px]">
                <Image
                  src="/img/flow-card.jpg"
                  alt=""
                  fill
                  sizes="835px"
                  className="object-cover opacity-35"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-fathom/85 via-fathom/70 to-vast/60" />

                {/* the clean-up animation lives here */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ opacity: chatIn, pointerEvents: chatIn > 0.5 ? "auto" : "none" }}
                >
                  <CleanupPanel p={progress} />
                </div>
              </div>

              {/* headings */}
              <div className="absolute top-[49px] left-[32px] w-[261px]">
                <div className="text-[15px] font-semibold text-lumen/60">
                  Keyboard
                </div>
                <div className="mt-1 font-[family-name:var(--font-display)] text-[34px] leading-none text-lumen">
                  45 wpm
                </div>
              </div>
              <div
                className="absolute top-[49px] left-[389px] transition-opacity duration-300"
                style={{ opacity: 1 - marqueeOut * 0.85 }}
              >
                <div className="text-[15px] font-semibold text-lumen/60">
                  Flow
                </div>
                <div className="mt-1 font-[family-name:var(--font-display)] text-[34px] leading-none text-lumen">
                  220 wpm
                </div>
              </div>

              {/* slow, straight keyboard marquee */}
              <div className="pointer-events-none absolute top-[244px] left-[4px]">
                <PathMarquee
                  id="wpm-straight"
                  d={CURVE_STRAIGHT}
                  viewBox="0 0 928 76"
                  width={1160}
                  height={95}
                  text={PASSAGE}
                  speed={14}
                  fontSize={24}
                  fontWeight={600}
                  fill="rgba(255,255,235,0.314)"
                />
              </div>

              {/* fast marquee riding the bump curve — fades as the chat starts */}
              <div
                className="pointer-events-none absolute top-[205px] left-[162px] transition-opacity duration-300"
                style={{ opacity: 1 - marqueeOut }}
              >
                <PathMarquee
                  id="wpm-fast"
                  d={CURVE_FAST}
                  viewBox="0 0 928 76"
                  width={1160}
                  height={95}
                  text={PASSAGE}
                  speed={68}
                  fontSize={22}
                  fontWeight={600}
                  fill="#ffffeb"
                />
              </div>
            </div>
          </div>
        </div>

        {/* mobile: static cards, clean-up shown inline */}
        <div className="mx-auto mt-14 flex max-w-[1160px] flex-col gap-4 pb-20 md:hidden">
          <div className="relative h-[190px] overflow-hidden rounded-[28px] border-4 border-lumen/10">
            <div className="px-6 pt-6">
              <div className="text-[14px] font-semibold text-lumen/60">
                Keyboard
              </div>
              <div className="mt-1 font-[family-name:var(--font-display)] text-[30px] leading-none text-lumen">
                45 wpm
              </div>
            </div>
            <div className="pointer-events-none absolute top-[110px] -left-2">
              <PathMarquee
                id="wpm-straight-m"
                d={CURVE_STRAIGHT}
                viewBox="0 0 928 76"
                width={760}
                height={62}
                text={PASSAGE}
                speed={14}
                fontSize={24}
                fontWeight={600}
                fill="rgba(255,255,235,0.314)"
              />
            </div>
          </div>

          <div className="relative h-[210px] overflow-hidden rounded-[28px]">
            <Image
              src="/img/flow-card.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-fathom/85 via-fathom/70 to-vast/60" />
            <div className="relative px-6 pt-6">
              <div className="text-[14px] font-semibold text-lumen/60">Flow</div>
              <div className="mt-1 font-[family-name:var(--font-display)] text-[30px] leading-none text-lumen">
                220 wpm
              </div>
            </div>
            <div className="pointer-events-none absolute top-[112px] -left-2">
              <PathMarquee
                id="wpm-fast-m"
                d={CURVE_FAST}
                viewBox="0 0 928 76"
                width={760}
                height={62}
                text={PASSAGE}
                speed={68}
                fontSize={22}
                fontWeight={600}
                fill="#ffffeb"
              />
            </div>
          </div>

          <div className="relative h-[300px] overflow-hidden rounded-[28px] bg-vast/30">
            <CleanupPanel p={0.95} />
          </div>
        </div>
      </div>
    </section>
  );
}
