"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, Waveform } from "./primitives";

const TABS = [
  {
    id: "speak",
    nav: "Speak naturally",
    heading: "Speak naturally",
    body: "Ramble, pause, or change your mind mid-sentence. Flow understands what you mean, not just what you say.",
  },
  {
    id: "edits",
    nav: "Edits as you speak",
    heading: "Flow edits as you speak",
    body: "Text that reads like you wrote it, not like you spoke it. Flow automatically removes filler words, adds punctuation, and formats your writing.",
  },
  {
    id: "anywhere",
    nav: "Use it anywhere",
    heading: "Use it anywhere",
    body: "Flow works anywhere you can type, with no plugins required. Syncs seamlessly across Mac, Windows, iPhone, and Android.",
  },
];

/* --- per-tab stage visuals ------------------------------------------ */

function StageSpeak({ active }: { active: boolean }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <div className="flex h-[86px] w-[170px] items-center justify-center rounded-[28px] border-2 border-vast bg-lumen">
        <Waveform height={34} bars={24} color="#1a1a1a" active={active} />
      </div>
      <div className="w-full max-w-[300px] space-y-2">
        {["so I was thinking… um", "actually, let's do Tuesday", "yeah — Tuesday works"].map(
          (line, i) => (
            <div
              key={line}
              className="rounded-xl border border-dark-15 bg-white px-3 py-2 text-[13px] text-dark-70 transition-all duration-500"
              style={{
                opacity: active ? 1 : 0.25,
                transform: `translateY(${active ? 0 : 8}px)`,
                transitionDelay: `${i * 110}ms`,
              }}
            >
              {line}
            </div>
          ),
        )}
      </div>
    </div>
  );
}

function StageEdits({ active }: { active: boolean }) {
  const parts = [
    { t: "Let's meet at 5 ", strike: false },
    { t: "um actually ", strike: true },
    { t: "6pm ", strike: false },
    { t: "on on ", strike: true },
    { t: "Thursday.", strike: false },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <div className="rounded-2xl border-2 border-vast bg-white p-4">
        <p className="text-[14px] leading-[1.6]">
          {parts.map((p, i) => (
            <span
              key={i}
              style={{
                background: p.strike && active ? "#ffa946" : "transparent",
                textDecorationLine: p.strike && active ? "line-through" : "none",
                borderRadius: 4,
                padding: p.strike && active ? "1px 3px" : 0,
                transition: "background .4s ease",
                transitionDelay: `${i * 90}ms`,
              }}
            >
              {p.t}
            </span>
          ))}
        </p>
      </div>
      <div
        className="rounded-2xl border-2 border-vast bg-dawn p-4 transition-all duration-500"
        style={{
          opacity: active ? 1 : 0.3,
          transform: `translateY(${active ? 0 : 10}px)`,
          transitionDelay: "320ms",
        }}
      >
        <p className="text-[14px] leading-[1.6] font-medium">
          Let&rsquo;s meet at 6pm on Thursday.
        </p>
      </div>
    </div>
  );
}

function StageAnywhere({ active }: { active: boolean }) {
  const apps = ["Slack", "Gmail", "Notion", "Cursor", "iMessage", "ChatGPT"];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <div className="grid grid-cols-3 gap-2.5">
        {apps.map((app, i) => (
          <div
            key={app}
            className="flex h-[62px] w-[92px] items-center justify-center rounded-xl border-2 border-vast bg-white text-[13px] font-semibold transition-all duration-500"
            style={{
              opacity: active ? 1 : 0.25,
              transform: `scale(${active ? 1 : 0.92})`,
              transitionDelay: `${i * 70}ms`,
            }}
          >
            {app}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-full border-2 border-vast bg-lumen px-4 py-2">
        <Waveform height={18} bars={16} color="#1a1a1a" active={active} />
        <span className="text-[12px] font-medium text-dark-70">
          Mac · Windows · iOS · Android
        </span>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  // scroll position through the track selects the active tab
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
      setIndex(Math.min(TABS.length - 1, Math.floor(p * TABS.length * 0.999)));
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
    const target =
      el.offsetTop + total * ((i + 0.5) / TABS.length);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section className="bg-lumen">
      {/* intro */}
      <div className="px-5 py-28 text-center md:py-36">
        <Reveal>
          <p className="eyebrow text-dark-70">How it works</p>
          <h2 className="hd-1 mx-auto mt-6 max-w-[768px] balance">
            Speak at the speed you think,{" "}
            <em>in every app, on every device.</em>
          </h2>
        </Reveal>
      </div>

      {/* pinned tabs */}
      <div ref={trackRef} className="relative h-[300vh]">
        <div className="sticky top-0 flex h-screen items-center px-5">
          <div className="mx-auto grid w-full max-w-[1184px] items-center gap-10 md:grid-cols-[170px_1fr_300px]">
            {/* nav rail */}
            <div className="flex gap-5">
              {/* 5px track in lumen-dark with a coral active indicator */}
              <div className="relative hidden w-[5px] shrink-0 self-stretch rounded-[16px] bg-lumen-dark md:block">
                <span
                  className="absolute left-0 h-[32px] w-[5px] rounded-[16px] bg-flare transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                  style={{ top: `${index * 35 + 1.5}px` }}
                />
              </div>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 md:flex-col md:gap-0">
                {TABS.map((t, i) => (
                  <li key={t.id} className="md:flex md:h-[35px] md:items-center">
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={i === index}
                      className="text-left text-[17px] leading-none whitespace-nowrap transition-colors duration-300 md:text-[20px]"
                      style={{ color: i === index ? "#1a1a1a" : "#1a1a1a80" }}
                    >
                      {t.nav}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* stage */}
            <div className="relative h-[450px] max-w-[403px] rounded-[16px] p-6">
              {TABS.map((t, i) => (
                <div
                  key={t.id}
                  className="absolute inset-0 p-6 transition-opacity duration-500"
                  style={{
                    opacity: i === index ? 1 : 0,
                    pointerEvents: i === index ? "auto" : "none",
                  }}
                >
                  {t.id === "speak" && <StageSpeak active={i === index} />}
                  {t.id === "edits" && <StageEdits active={i === index} />}
                  {t.id === "anywhere" && <StageAnywhere active={i === index} />}
                </div>
              ))}
            </div>

            {/* copy */}
            <div className="relative min-h-[150px]">
              {TABS.map((t, i) => (
                <div
                  key={t.id}
                  className="transition-all duration-500 md:absolute md:inset-x-0 md:top-0"
                  style={{
                    opacity: i === index ? 1 : 0,
                    transform: `translateY(${i === index ? 0 : 12}px)`,
                    pointerEvents: i === index ? "auto" : "none",
                    position: i === index ? "relative" : "absolute",
                  }}
                >
                  <h3 className="font-[family-name:var(--font-display)] text-[32px] leading-[1.05] font-normal">
                    {t.heading}
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.35] font-medium text-vast">
                    {t.body}
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
