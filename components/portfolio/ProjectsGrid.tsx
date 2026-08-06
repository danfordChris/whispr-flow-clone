"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Reveal } from "../primitives";
import { projects, type Category } from "@/lib/portfolio";

const FILTERS: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "mobile", label: "Mobile" },
  { id: "web", label: "Web" },
  { id: "game", label: "Game" },
];

export default function ProjectsGrid() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [open, setOpen] = useState<string | null>(null);

  const shown = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.category.includes(filter)),
    [filter],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length };
    (["mobile", "web", "game"] as Category[]).forEach((cat) => {
      c[cat] = projects.filter((p) => p.category.includes(cat)).length;
    });
    return c;
  }, []);

  return (
    <section id="projects" className="bg-lumen px-5 py-28 md:py-36">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="text-center">
          <p className="eyebrow text-dark-70">Selected projects</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.4vw,4.6875rem)] leading-[1] font-normal text-balance">
            Things I&rsquo;ve <em className="italic">shipped.</em>
          </h2>
        </Reveal>

        {/* filters */}
        <Reveal delay={80} className="mt-12 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => {
            const on = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={on}
                className={`rounded-full border-2 px-5 py-2 text-[15px] font-semibold transition-all duration-300 ${
                  on
                    ? "border-vast bg-dawn"
                    : "border-dark-15 text-dark-70 hover:border-vast hover:text-vast"
                }`}
              >
                {f.label}
                <span className="ml-2 text-[13px] opacity-60">
                  {counts[f.id]}
                </span>
              </button>
            );
          })}
        </Reveal>

        {/* grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => {
            const isOpen = open === p.id;
            return (
              <Reveal key={p.id} delay={(i % 3) * 70}>
                <article
                  className="flex h-full flex-col overflow-hidden rounded-[var(--radius-section-tiny)] border-2 border-vast bg-white transition-transform duration-300 hover:-translate-y-1"
                  style={{
                    boxShadow: isOpen ? "6px 6px 0 0 #1a1a1a" : undefined,
                  }}
                >
                  <div className="relative aspect-[8/5] overflow-hidden border-b-2 border-vast">
                    <Image
                      src={`/img/work/${p.id}.jpg`}
                      alt={p.title}
                      fill
                      sizes="(min-width:1024px) 380px, (min-width:768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {p.category.map((c) => (
                        <span
                          key={c}
                          className="rounded-full border border-vast bg-lumen px-2.5 py-1 text-[11px] font-semibold capitalize"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                    {p.featured && (
                      <span className="absolute top-3 right-3 rounded-full border border-vast bg-glow px-2.5 py-1 text-[11px] font-semibold">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-[family-name:var(--font-display)] text-[26px] leading-[1.1]">
                      {p.title}
                    </h3>

                    <p
                      className="mt-3 text-[15px] leading-[1.5] text-dark-70"
                      style={
                        isOpen
                          ? undefined
                          : {
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }
                      }
                    >
                      {p.description}
                    </p>

                    {/* screens, revealed when expanded */}
                    <div
                      className="grid overflow-hidden transition-[grid-template-rows] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="min-h-0">
                        <p className="mt-4 text-[12px] font-semibold tracking-[0.08em] text-dark-50 uppercase">
                          Screens
                        </p>
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {p.shots.map((s) => (
                            <li
                              key={s.id}
                              className="rounded-md bg-lumen-dark px-2 py-1 text-[12px]"
                            >
                              {s.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-dark-15 px-2.5 py-1 text-[12px] font-medium text-dark-70"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex items-center gap-4 pt-6">
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : p.id)}
                        aria-expanded={isOpen}
                        className="border-b-2 border-vast pb-0.5 text-[14px] font-semibold transition-opacity hover:opacity-70"
                      >
                        {isOpen ? "Show less" : "Details"}
                      </button>
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 border-b-2 border-flare pb-0.5 text-[14px] font-semibold text-flare transition-opacity hover:opacity-70"
                        >
                          Visit <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
