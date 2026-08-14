"use client";

import { useState } from "react";
import { Reveal } from "../primitives";
import { career } from "@/lib/portfolio";

/**
 * Career history in the port's FAQ language: a cream card wrapping a
 * dark-teal role list, with the selected role's detail alongside.
 */
export default function CareerTimeline() {
  const [active, setActive] = useState(0);

  return (
    <section id="career" className="bg-lumen px-5 py-28 md:py-36">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="text-center">
          <p className="eyebrow text-dark-70">Career history</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.4vw,4.6875rem)] leading-[1] font-normal text-balance">
            Five years, <em className="italic">six teams.</em>
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-12">
          <div className="mx-auto max-w-[960px] rounded-[32px] bg-lumen-dark p-4">
            <div className="grid gap-2 md:grid-cols-[1fr_1fr]">
              {/* roles — dark teal panel */}
              <div className="thin-scroll max-h-[460px] overflow-y-auto rounded-[16px] bg-vast px-3 pt-7 pb-3">
                <p className="mb-4 px-3 font-[family-name:var(--font-display)] text-[20px] leading-none text-lumen">
                  Roles
                </p>
                <ul className="flex flex-col gap-1">
                  {career.map((r, i) => (
                    <li key={`${r.company}-${r.period}`}>
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        aria-expanded={active === i}
                        className="w-full rounded-[4px] p-4 text-left transition-colors duration-300"
                        style={{
                          background:
                            active === i
                              ? "rgba(228,228,208,0.1)"
                              : "transparent",
                        }}
                      >
                        <span className="block text-[11px] font-semibold tracking-[0.06em] text-lumen/50 uppercase">
                          {r.period}
                        </span>
                        <span className="mt-1 block text-[14px] leading-[1.3] font-medium text-lumen">
                          {r.title}
                        </span>
                        <span className="mt-0.5 block text-[13px] text-lumen/60">
                          {r.company}
                        </span>
                      </button>

                      {/* inline detail on mobile */}
                      <div
                        className="grid overflow-hidden transition-[grid-template-rows] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] md:hidden"
                        style={{
                          gridTemplateRows: active === i ? "1fr" : "0fr",
                        }}
                      >
                        <div className="min-h-0">
                          <ul className="space-y-2 px-4 pb-4">
                            {r.points.map((pt, k) => (
                              <li
                                key={k}
                                className="flex gap-2 text-[13px] leading-[1.5] text-lumen/70"
                              >
                                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-lumen/50" />
                                {pt}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* detail pane */}
              <div className="thin-scroll hidden max-h-[460px] overflow-y-auto pt-7 pr-2 pl-6 md:block">
                <p className="mb-4 font-[family-name:var(--font-display)] text-[20px] leading-none">
                  What I did
                </p>
                <span className="text-[11px] font-semibold tracking-[0.06em] text-dark-50 uppercase">
                  {career[active].period}
                </span>
                <h3 className="mt-1 text-[18px] leading-[1.3] font-semibold">
                  {career[active].title}
                </h3>
                <p className="text-[15px] text-dark-70">
                  {career[active].company}
                </p>
                <ul className="mt-5 space-y-3 pb-6">
                  {career[active].points.map((pt, k) => (
                    <li
                      key={k}
                      className="flex gap-2.5 text-[15px] leading-[1.55] text-dark-70"
                    >
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-vast" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
