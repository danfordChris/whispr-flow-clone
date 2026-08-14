"use client";

import { allTech } from "@/lib/portfolio";

/** Two counter-scrolling rows of the full tech stack. */
export default function TechMarquee() {
  const half = Math.ceil(allTech.length / 2);
  const rows = [allTech.slice(0, half), allTech.slice(half)];

  return (
    <section className="rounded-section-t bg-vast pt-[104px] pb-20 text-lumen">
      <p className="eyebrow mb-14 text-center text-lumen">
        Tools I build with
      </p>

      <div className="mask-fade-x flex flex-col gap-4 overflow-hidden">
        {rows.map((row, r) => (
          <div
            key={r}
            className="marquee-track"
            style={{
              ["--speed" as string]: r === 0 ? "48s" : "62s",
              animationDirection: r === 1 ? "reverse" : "normal",
            }}
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {row.map((tech) => (
                  <span
                    key={`${copy}-${tech}`}
                    className="mx-2 shrink-0 rounded-full border border-lumen/25 px-5 py-2.5 text-[17px] font-medium whitespace-nowrap text-lumen/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
