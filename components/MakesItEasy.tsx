"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./primitives";

/* ---------- demo cards ---------------------------------------------- */

const TONES = [
  {
    label: "Formal",
    text: "Hey, are you free for lunch tomorrow? Let's do 12 if that works for you.",
  },
  {
    label: "Casual",
    text: "Hey are you free for lunch tomorrow? Let's do 12 if that works for you",
  },
  {
    label: "Very casual",
    text: "hey are you free for lunch tomorrow? let's do 12 if that works for you",
  },
];

function ToneCard({ active }: { active: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setI((v) => (v + 1) % TONES.length), 2600);
    return () => clearInterval(id);
  }, [active]);

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-2">
        {TONES.map((t, idx) => (
          <button
            key={t.label}
            type="button"
            onClick={() => setI(idx)}
            className={`rounded-full border px-3 py-1 text-[12px] font-medium transition-all duration-300 ${
              i === idx
                ? "border-vast bg-dawn"
                : "border-dark-15 text-dark-70 hover:border-vast"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="relative min-h-[62px] rounded-lg bg-lumen px-3 py-2.5">
        {TONES.map((t, idx) => (
          <p
            key={t.label}
            className="text-[13px] leading-[1.45] transition-all duration-300"
            style={{
              opacity: i === idx ? 1 : 0,
              position: idx === 0 ? "relative" : "absolute",
              inset: idx === 0 ? undefined : "10px 12px",
            }}
          >
            {t.text}
          </p>
        ))}
      </div>
    </>
  );
}

function SnippetCard({ active }: { active: boolean }) {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setExpanded((v) => !v), 2800);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div className="rounded-lg bg-lumen px-3 py-3 text-[13px] leading-[1.7]">
      If you go to{" "}
      <span
        className="inline-block rounded-md px-1.5 transition-all duration-500"
        style={{
          background: expanded ? "transparent" : "#f0d7ff",
          fontWeight: expanded ? 400 : 600,
        }}
      >
        {expanded ? (
          <span className="break-all text-flare underline decoration-flare/40 underline-offset-2">
            https://www.linkedin.com/in/john-doe-9b0139134/
          </span>
        ) : (
          "“my Linkedin”"
        )}
      </span>{" "}
      you&rsquo;ll see what
      <span className="caret ml-0.5 align-baseline" />
    </div>
  );
}

const NAMES = ["Sarah", "Aditya", "Dillon"];

function VocabularyCard({ active }: { active: boolean }) {
  const [sel, setSel] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setSel((v) => (v + 1) % NAMES.length), 2600);
    return () => clearInterval(id);
  }, [active]);

  return (
    <>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {NAMES.map((n, i) => (
          <button
            key={n}
            type="button"
            onClick={() => setSel(i)}
            className={`rounded-full border px-2.5 py-1 text-[12px] transition-colors duration-300 ${
              sel === i
                ? "border-vast bg-vast text-lumen"
                : "border-dark-15 text-dark-70"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="rounded-lg bg-lumen p-3">
        <p className="mb-2 text-[12px] font-semibold">Add a new word</p>
        <div className="rounded-md border border-dark-15 bg-white px-2.5 py-1.5 text-[13px]">
          {NAMES[sel]}
        </div>
        <div className="mt-2.5 flex justify-end gap-2">
          <span className="rounded-md border border-dark-15 px-2.5 py-1 text-[11px] font-medium text-dark-70">
            Cancel
          </span>
          <span className="rounded-md border-2 border-vast bg-dawn px-2.5 py-1 text-[11px] font-semibold">
            Add word
          </span>
        </div>
      </div>
    </>
  );
}

const LANGS = [
  {
    code: "Deutsch",
    text: "Wie möchten Sie die Datei einrichten? Hier sind ein paar Optionen.",
  },
  {
    code: "हिन्दी",
    text: "प्रोजेक्ट पर काम शुरू हो गया। आप इसे कैसे सेट करना चाहेंगे?",
  },
  { code: "English", text: "I'm getting started with the project." },
  { code: "Español", text: "Estoy empezando con el proyecto." },
];

function LanguageCard({ active }: { active: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setI((v) => (v + 1) % LANGS.length), 2400);
    return () => clearInterval(id);
  }, [active]);

  return (
    <>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[12px] text-dark-50">Language:</span>
        <span className="rounded-full border-2 border-vast bg-dawn px-2.5 py-0.5 text-[12px] font-semibold">
          {LANGS[i].code}
        </span>
      </div>
      <div className="relative min-h-[62px] rounded-lg bg-lumen px-3 py-2.5">
        {LANGS.map((l, idx) => (
          <p
            key={l.code}
            className="text-[13px] leading-[1.5] transition-all duration-400"
            style={{
              opacity: i === idx ? 1 : 0,
              position: idx === 0 ? "relative" : "absolute",
              inset: idx === 0 ? undefined : "10px 12px",
            }}
          >
            {l.text}
          </p>
        ))}
      </div>
    </>
  );
}

/* ---------- section -------------------------------------------------- */

const FEATURES = [
  {
    title: "100+ Languages",
    body: "Flow automatically detects and transcribes the language you're speaking, so you can switch between languages naturally.",
    Card: LanguageCard,
  },
  {
    title: "Flow learns your vocabulary",
    body: "Flow learns your unique words and names automatically, or lets you add them yourself. From client names to company jargon, it gets the details right.",
    Card: VocabularyCard,
  },
  {
    title: "Save your most used text",
    body: "Create snippets for the things you type all the time, like emails, links, addresses, and bios. Speak the shortcut, and Flow expands it instantly.",
    Card: SnippetCard,
  },
  {
    title: "Make Flow sound like you",
    body: "Flow adapts to how you write in different apps. Set a different style for messages, work chats, emails, and more.",
    Card: ToneCard,
  },
];

export default function MakesItEasy() {
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // whichever copy block sits nearest the viewport middle drives the card
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
    <section className="bg-lumen px-5 py-28 md:py-36">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mx-auto max-w-[864px] text-center">
          <p className="eyebrow text-dark-70">Wispr makes it easy</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.4vw,4.6875rem)] leading-[1] font-normal text-balance">
            Built around how <em className="italic">you work,</em> not how we
            think you should.
          </h2>
        </Reveal>

        {/* scroll-linked track: sticky card on the left, copy scrolling right */}
        <div className="mt-20 md:grid md:grid-cols-[400px_1fr] md:gap-[186px]">
          {/* sticky card stack */}
          <div className="hidden md:block">
            <div className="sticky top-1/2 h-[233px] -translate-y-1/2">
              <div className="relative h-[233px] w-[400px]">
                {FEATURES.map((f, i) => (
                  <div
                    key={f.title}
                    className="absolute inset-0 rounded-[16px] bg-lumen-dark px-6 pt-8 transition-opacity duration-500"
                    style={{
                      opacity: i === active ? 1 : 0,
                      pointerEvents: i === active ? "auto" : "none",
                    }}
                  >
                    <f.Card active={i === active} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* copy blocks */}
          <div className="flex flex-col gap-16 md:gap-[184px]">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                ref={(el) => {
                  blockRefs.current[i] = el;
                }}
                className="max-w-[564px] transition-opacity duration-500"
                style={{ opacity: i === active ? 1 : 0.35 }}
              >
                {/* the card appears inline on mobile, above its copy */}
                <div className="mb-6 rounded-[16px] bg-lumen-dark px-6 pt-8 pb-6 md:hidden">
                  <f.Card active={i === active} />
                </div>

                <h3 className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.4vw,3rem)] leading-[0.95] font-normal">
                  {f.title}
                </h3>
                <p className="mt-4 text-[16px] leading-[1.3] font-medium text-vast">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
