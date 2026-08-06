"use client";

import Image from "next/image";
import { PathMarquee, Reveal, useScrollProgress, Waveform } from "../primitives";
import { projects, stats } from "@/lib/portfolio";

const CURVE_STRAIGHT = "M0 44 H2000";
const CURVE_FAST =
  "M0 74.7977 L70.055 74.7977C253.23 74.7977 310.275 0.534007 467.005 0.797575C622.426 1.05894 621.28 74.7977 858.005 74.7977 L928 74.7977";

const featured = projects.find((p) => p.featured)!;
const TECH_TRAIL = featured.tech.join("  ·  ") + "  ·  ";
const SHOT_TRAIL = featured.shots.map((s) => s.title).join("  ·  ") + "  ·  ";

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);
const range = (p: number, from: number, to: number) =>
  clamp01((p - from) / (to - from));

/** Walks through the platform's modules as you scroll the pinned card. */
const MODULES = [
  { name: "Dashboard", detail: "Operational visibility across every team" },
  { name: "Meals", detail: "Planning and daily catering workflows" },
  { name: "Tasks", detail: "Assignment, tracking and completion states" },
  { name: "PMO", detail: "Programme governance and process control" },
  { name: "Users", detail: "Roles, permissions and access management" },
];

function ModulePanel({ p }: { p: number }) {
  const active = Math.min(
    MODULES.length - 1,
    Math.floor(range(p, 0.3, 1) * MODULES.length * 0.999),
  );

  return (
    <div className="flex h-full flex-col justify-between p-8">
      <div>
        <p className="text-[13px] font-semibold tracking-[0.08em] text-lumen/50 uppercase">
          {featured.category.join(" + ")} · enterprise
        </p>
        <h3 className="mt-3 font-[family-name:var(--font-display)] text-[38px] leading-[1] text-lumen">
          IPF OS
        </h3>
      </div>

      {/* module switcher */}
      <div className="flex gap-2">
        {MODULES.map((m, i) => (
          <span
            key={m.name}
            className="rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-all duration-400"
            style={{
              borderColor: i === active ? "#ffffeb" : "#ffffeb40",
              background: i === active ? "#ffffeb" : "transparent",
              color: i === active ? "#1a1a1a" : "#ffffeb99",
            }}
          >
            {m.name}
          </span>
        ))}
      </div>

      <div className="relative min-h-[74px] rounded-xl border border-lumen/20 bg-vast/40 px-4 py-3 backdrop-blur-sm">
        {MODULES.map((m, i) => (
          <div
            key={m.name}
            className="transition-all duration-400"
            style={{
              opacity: i === active ? 1 : 0,
              position: i === 0 ? "relative" : "absolute",
              inset: i === 0 ? undefined : "12px 16px",
            }}
          >
            <p className="text-[15px] font-semibold text-lumen">{m.name}</p>
            <p className="mt-1 text-[13px] leading-[1.45] text-lumen/70">
              {m.detail}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex h-[34px] items-center gap-2 rounded-full border border-lumen/25 bg-vast/70 px-3">
          <span className="h-1.5 w-1.5 rounded-full bg-flare" />
          <Waveform height={16} bars={12} color="#ffffeb" />
        </div>
        {featured.tech.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-full bg-lumen/10 px-3 py-1.5 text-[11px] font-semibold text-lumen/80"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function FeaturedWork() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const marqueeOut = range(progress, 0.18, 0.3);
  const panelIn = range(progress, 0.22, 0.34);

  return (
    <section id="work" className="bg-vast px-4 pb-4">
      <div className="rounded-[var(--radius-section-medium)] bg-fathom px-5 pt-24 pb-4 md:px-10 md:pt-28">
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
          <div className="sticky top-0 flex h-screen items-center">
            <div className="relative mx-auto h-[501px] w-full max-w-[1160px] overflow-hidden">
              {/* left — headline stat */}
              <div className="absolute inset-y-0 left-0 flex w-[325px] flex-col justify-between rounded-[40px] border-4 border-lumen/10 p-8">
                <div>
                  <div className="text-[15px] font-semibold text-lumen/60">
                    Modules
                  </div>
                  <div className="mt-1 font-[family-name:var(--font-display)] text-[54px] leading-none text-lumen">
                    {MODULES.length}
                  </div>
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-lumen/60">
                    Platforms
                  </div>
                  <div className="mt-1 font-[family-name:var(--font-display)] text-[54px] leading-none text-lumen">
                    2
                  </div>
                  <p className="mt-2 text-[13px] text-lumen/50">
                    Web and mobile, one codebase family
                  </p>
                </div>
              </div>

              {/* right — the platform card */}
              <div className="absolute inset-y-0 left-[325px] w-[835px] overflow-hidden rounded-[40px]">
                <Image
                  src="/img/flow-card.jpg"
                  alt=""
                  fill
                  sizes="835px"
                  className="object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-fathom/85 via-fathom/70 to-vast/60" />
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    opacity: panelIn,
                    pointerEvents: panelIn > 0.5 ? "auto" : "none",
                  }}
                >
                  <ModulePanel p={progress} />
                </div>
              </div>

              {/* screen-name marquee */}
              <div className="pointer-events-none absolute top-[244px] left-[4px]">
                <PathMarquee
                  id="pf-work-straight"
                  d={CURVE_STRAIGHT}
                  viewBox="0 0 928 76"
                  width={1160}
                  height={95}
                  text={SHOT_TRAIL}
                  speed={16}
                  fontSize={24}
                  fontWeight={600}
                  fill="rgba(255,255,235,0.314)"
                />
              </div>

              {/* tech marquee on the bump curve */}
              <div
                className="pointer-events-none absolute top-[205px] left-[162px] transition-opacity duration-300"
                style={{ opacity: 1 - marqueeOut }}
              >
                <PathMarquee
                  id="pf-work-fast"
                  d={CURVE_FAST}
                  viewBox="0 0 928 76"
                  width={1160}
                  height={95}
                  text={TECH_TRAIL}
                  speed={62}
                  fontSize={22}
                  fontWeight={600}
                  fill="#ffffeb"
                />
              </div>
            </div>
          </div>
        </div>

        {/* mobile */}
        <div className="mx-auto mt-14 max-w-[1160px] md:hidden">
          <div className="relative h-[380px] overflow-hidden rounded-[28px]">
            <Image
              src="/img/flow-card.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-fathom/85 via-fathom/70 to-vast/60" />
            <div className="absolute inset-0">
              <ModulePanel p={0.55} />
            </div>
          </div>
        </div>

        {/* stat row */}
        <Reveal className="mx-auto mt-16 max-w-[1160px] pb-20">
          <div className="grid grid-cols-2 gap-8 border-t border-lumen/15 pt-12 md:grid-cols-4">
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
