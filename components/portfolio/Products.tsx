"use client";

import { Reveal, RollText } from "../primitives";
import { products } from "@/lib/portfolio";

export default function Products() {
  return (
    <section id="products" className="bg-lumen px-5 pb-28 md:pb-36">
      <Reveal className="mx-auto max-w-[1240px]">
        <div className="rounded-[32px] bg-lumen-dark px-8 py-12 md:px-12 md:py-16">
          <div className="max-w-[560px]">
            <p className="eyebrow text-dark-50">Products</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.25rem,4vw,3rem)] leading-[0.95] font-normal text-balance">
              Things I run, not just build.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {products.map((p, i) => (
              <a
                key={p.title}
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel={p.href.startsWith("http") ? "noreferrer" : undefined}
                className="roll-parent group flex flex-col justify-between rounded-[var(--radius-section-tiny)] border-2 border-vast bg-lumen p-8 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#1a1a1a]"
              >
                <div>
                  <span
                    className="inline-block rounded-full border border-vast px-3 py-1 text-[11px] font-semibold"
                    style={{ background: i === 0 ? "#f0d7ff" : "#ffbcf2" }}
                  >
                    {p.eyebrow}
                  </span>
                  <h3 className="mt-5 font-[family-name:var(--font-display)] text-[32px] leading-[1]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.5] text-dark-70">
                    {p.description}
                  </p>
                </div>

                <span className="mt-8 inline-flex items-center gap-2 border-b-2 border-vast pb-0.5 self-start text-[15px] font-semibold">
                  <RollText text={p.cta} />
                  <span aria-hidden="true">→</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
