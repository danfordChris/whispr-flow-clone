"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "../primitives";
import { expertise } from "@/lib/portfolio";

/** The sticky card shows the active area's stack, cycling a highlight. */
function StackCard({ stack, active }: { stack: string[]; active: boolean }) {
  const [lit, setLit] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setLit((v) => (v + 1) % stack.length), 900);
    return () => clearInterval(id);
  }, [active, stack.length]);

  return (
    <>
      <p className="mb-3 text-[12px] font-semibold tracking-[0.08em] text-dark-50 uppercase">
        Tech stack
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {stack.map((t, i) => (
          <li
            key={t}
            className="rounded-full border px-2.5 py-1 text-[12px] font-medium transition-all duration-300"
            style={{
              borderColor: i === lit && active ? "#1a1a1a" : "#1a1a1a26",
              background: i === lit && active ? "#f0d7ff" : "transparent",
              color: i === lit && active ? "#1a1a1a" : "#1a1a1ab3",
            }}
          >
            {t}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function ExpertiseTrack() {
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      blockRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="expertise" className="bg-lumen px-5 py-28 md:py-36">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mx-auto max-w-[864px] text-center">
          <p className="eyebrow text-dark-70">Expertise</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.4vw,4.6875rem)] leading-[1] font-normal text-balance">
            Three lanes, <em className="italic">one delivery pipeline.</em>
          </h2>
        </Reveal>

        <div className="mt-20 md:grid md:grid-cols-[400px_1fr] md:gap-[186px]">
          {/* sticky stack card */}
          <div className="hidden md:block">
            <div className="sticky top-1/2 h-[260px] -translate-y-1/2">
              <div className="relative h-[260px] w-[400px]">
                {expertise.map((e, i) => (
                  <div
                    key={e.id}
                    className="absolute inset-0 overflow-hidden rounded-[16px] bg-lumen-dark px-6 pt-8 transition-opacity duration-500"
                    style={{
                      opacity: i === active ? 1 : 0,
                      pointerEvents: i === active ? "auto" : "none",
                    }}
                  >
                    <StackCard stack={e.stack} active={i === active} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* copy blocks */}
          <div className="flex flex-col gap-16 md:gap-[184px]">
            {expertise.map((e, i) => (
              <div
                key={e.id}
                ref={(el) => {
                  blockRefs.current[i] = el;
                }}
                className="max-w-[564px] transition-opacity duration-500"
                style={{ opacity: i === active ? 1 : 0.35 }}
              >
                <div className="mb-6 rounded-[16px] bg-lumen-dark px-6 py-8 md:hidden">
                  <StackCard stack={e.stack} active={i === active} />
                </div>

                <span className="font-[family-name:var(--font-display)] text-[20px] text-flare">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(2rem,3.4vw,3rem)] leading-[0.95] font-normal">
                  {e.title}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.35] font-medium text-vast">
                  {e.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
