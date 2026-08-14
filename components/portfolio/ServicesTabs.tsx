"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "../primitives";
import { Prompt } from "./TerminalPill";
import { services } from "@/lib/portfolio";

/* a small illustrative stage per service, in the port's card language */
function Stage({ index, active }: { index: number; active: boolean }) {
  const common = "transition-all duration-500";

  if (index === 0)
    return (
      <div className="flex h-full flex-col justify-center gap-3">
        {["Architecture", "Frontend systems", "Backend APIs", "Delivery"].map(
          (row, i) => (
            <div
              key={row}
              className={`${common} rounded-xl border-2 border-vast bg-white px-4 py-3 text-[14px] font-medium`}
              style={{
                opacity: active ? 1 : 0.25,
                transform: `translateX(${active ? 0 : -10}px)`,
                transitionDelay: `${i * 90}ms`,
              }}
            >
              {row}
            </div>
          ),
        )}
      </div>
    );

  if (index === 1)
    return (
      <div className="flex h-full items-center justify-center gap-4">
        {["iOS", "Android"].map((os, i) => (
          <div
            key={os}
            className={`${common} flex h-[210px] w-[110px] flex-col items-center justify-between rounded-[22px] border-2 border-vast bg-white p-3`}
            style={{
              opacity: active ? 1 : 0.25,
              transform: `translateY(${active ? 0 : 14}px)`,
              transitionDelay: `${i * 120}ms`,
            }}
          >
            <span className="h-1.5 w-8 rounded-full bg-dark-15" />
            <div className="flex flex-col gap-1.5 self-stretch">
              {[0, 1, 2].map((n) => (
                <span key={n} className="h-2 rounded bg-lumen-dark" />
              ))}
            </div>
            <span className="text-[12px] font-semibold">{os}</span>
          </div>
        ))}
      </div>
    );

  if (index === 2)
    return (
      <div className="flex h-full flex-col justify-center gap-4">
        <div className="rounded-2xl border-2 border-vast bg-white p-4">
          <p className="text-[13px] text-dark-50">prompt</p>
          <p className="mt-1 text-[14px] font-medium">
            Summarise this week&rsquo;s support tickets
            <span className="caret ml-0.5" />
          </p>
        </div>
        <div
          className={`${common} rounded-2xl border-2 border-vast bg-vast p-4 text-lumen`}
          style={{
            opacity: active ? 1 : 0.3,
            transform: `translateY(${active ? 0 : 12}px)`,
            transitionDelay: "300ms",
          }}
        >
          <p className="text-[14px] leading-[1.5] font-medium">
            3 themes · 12 actionable · 2 escalations
          </p>
        </div>
      </div>
    );

  if (index === 3)
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div className="flex h-[86px] items-center justify-center bg-lumen px-7">
          <Prompt path="~/contentlab" size={14} />
        </div>
        <div className="w-full max-w-[290px] space-y-2">
          {["Idea", "Draft", "Publish"].map((step, i) => (
            <div
              key={step}
              className={`${common} flex items-center gap-2 rounded-xl border border-dark-15 bg-white px-3 py-2 text-[13px]`}
              style={{
                opacity: active ? 1 : 0.25,
                transitionDelay: `${i * 110}ms`,
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-vast" />
              {step}
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="flex h-full flex-col justify-center gap-3">
      {["build", "test", "deploy", "monitor"].map((stage, i) => (
        <div
          key={stage}
          className={`${common} flex items-center gap-3`}
          style={{
            opacity: active ? 1 : 0.25,
            transitionDelay: `${i * 100}ms`,
          }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-vast bg-vast text-lumen text-[12px] font-bold">
            ✓
          </span>
          <span className="h-[2px] flex-1 bg-vast/20" />
          <span className="text-[14px] font-medium">{stage}</span>
        </div>
      ))}
    </div>
  );
}

export default function ServicesTabs() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(Math.max(-rect.top / total, 0), 1);
      setIndex(
        Math.min(services.length - 1, Math.floor(p * services.length * 0.999)),
      );
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

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: el.offsetTop + total * ((i + 0.5) / services.length),
      behavior: "smooth",
    });
  };

  return (
    <section id="services" className="bg-lumen">
      <div className="px-5 py-28 text-center md:py-36">
        <Reveal>
          <p className="eyebrow text-dark-70">What I do</p>
          <h2 className="hd-1 mx-auto mt-6 max-w-[768px] text-balance">
            From first commit <em>to production.</em>
          </h2>
        </Reveal>
      </div>

      <div ref={trackRef} className="relative h-[500vh]">
        <div className="sticky top-0 flex h-screen items-center px-5">
          <div className="mx-auto grid w-full max-w-[1184px] items-center gap-10 md:grid-cols-[260px_1fr_320px]">
            {/* rail */}
            <div className="flex gap-5">
              <div className="relative hidden w-[5px] shrink-0 self-stretch rounded-[16px] bg-lumen-dark md:block">
                <span
                  className="absolute left-0 h-[32px] w-[5px] rounded-[16px] bg-vast transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                  style={{ top: `${index * 35 + 1.5}px` }}
                />
              </div>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 md:flex-col md:gap-0">
                {services.map((s, i) => (
                  <li key={s.title} className="md:flex md:h-[35px] md:items-center">
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={i === index}
                      className="text-left text-[15px] leading-none transition-colors duration-300 md:text-[18px]"
                      style={{ color: i === index ? "#1a1a1a" : "#1a1a1a80" }}
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* stage */}
            <div className="relative h-[450px] max-w-[403px] rounded-[16px] p-6">
              {services.map((s, i) => (
                <div
                  key={s.title}
                  className="absolute inset-0 p-6 transition-opacity duration-500"
                  style={{
                    opacity: i === index ? 1 : 0,
                    pointerEvents: i === index ? "auto" : "none",
                  }}
                >
                  <Stage index={i} active={i === index} />
                </div>
              ))}
            </div>

            {/* copy */}
            <div className="relative min-h-[170px]">
              {services.map((s, i) => (
                <div
                  key={s.title}
                  className="transition-all duration-500"
                  style={{
                    opacity: i === index ? 1 : 0,
                    transform: `translateY(${i === index ? 0 : 12}px)`,
                    pointerEvents: i === index ? "auto" : "none",
                    position: i === index ? "relative" : "absolute",
                    insetInline: i === index ? undefined : 0,
                    top: i === index ? undefined : 0,
                  }}
                >
                  <h3 className="font-[family-name:var(--font-display)] text-[32px] leading-[1.05] font-normal">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.35] font-medium text-vast">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
