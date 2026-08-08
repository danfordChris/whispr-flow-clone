"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/portfolio";

/**
 * Full-screen screen viewer for a project.
 *
 * Only two projects have more than one screen (IPF OS has ten, MealGro five),
 * so callers should offer this where `shots.length > 1` and leave single-shot
 * projects to the card image.
 */
export default function Gallery({
  project,
  startAt = 0,
  onClose,
}: {
  project: Project;
  startAt?: number;
  onClose: () => void;
}) {
  const [i, setI] = useState(startAt);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  const count = project.shots.length;
  const go = useCallback(
    (d: number) => setI((v) => (v + d + count) % count),
    [count],
  );

  // keyboard: escape closes, arrows page
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  // lock the page, take focus, hand it back on close
  useEffect(() => {
    restoreTo.current = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      restoreTo.current?.focus?.();
    };
  }, []);

  const shot = project.shots[i];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} screens`}
    >
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close gallery"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-vast/85 backdrop-blur-sm"
      />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative flex max-h-full w-full max-w-[1100px] flex-col overflow-hidden rounded-[var(--radius-section-tiny)] border-2 border-vast bg-lumen shadow-[8px_8px_0_0_#1a1a1a] outline-none"
      >
        {/* header */}
        <div className="flex items-center justify-between gap-4 border-b-2 border-vast bg-lumen-dark px-5 py-3">
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold">
              {project.title}
            </p>
            <p className="truncate text-[13px] text-dark-70">{shot.title}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="font-mono text-[12px] text-dark-70 tabular-nums">
              {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-vast bg-lumen text-[15px] leading-none font-semibold transition-transform hover:-translate-y-0.5"
            >
              ✕
            </button>
          </div>
        </div>

        {/* stage */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center bg-lumen-dark/40 p-4 md:p-6">
          <div className="relative max-h-[62vh] w-full">
            <Image
              key={shot.src}
              src={shot.src}
              alt={`${project.title} — ${shot.title}`}
              width={1600}
              height={1000}
              sizes="(min-width: 768px) 1000px, 100vw"
              className="mx-auto max-h-[62vh] w-auto rounded-[12px] border-2 border-vast object-contain"
              priority
            />
          </div>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous screen"
                className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-vast bg-lumen text-[16px] font-semibold transition-transform hover:scale-105 md:left-5"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next screen"
                className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-vast bg-lumen text-[16px] font-semibold transition-transform hover:scale-105 md:right-5"
              >
                →
              </button>
            </>
          )}
        </div>

        {/* thumbnails */}
        {count > 1 && (
          <div className="thin-scroll flex gap-2 overflow-x-auto border-t-2 border-vast bg-lumen px-4 py-3">
            {project.shots.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setI(idx)}
                aria-label={s.title}
                aria-current={idx === i}
                className="relative h-[52px] w-[76px] shrink-0 overflow-hidden rounded-md border-2 transition-all"
                style={{
                  borderColor: idx === i ? "#1a1a1a" : "#1a1a1a26",
                  opacity: idx === i ? 1 : 0.55,
                }}
              >
                <Image
                  src={s.src}
                  alt=""
                  fill
                  sizes="76px"
                  className="object-cover object-top"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
