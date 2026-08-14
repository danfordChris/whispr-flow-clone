"use client";

import Image from "next/image";

/**
 * Placeholder wordmarks standing in for the real brand SVGs, at the exact
 * dimensions the live site renders them.
 */
const LOGOS = [
  { name: "Microsoft", src: "/img/logo-microsoft.svg", w: 129, h: 28 },
  { name: "amazon", src: "/img/logo-amazon.svg", w: 104, h: 31 },
  { name: "Notion", src: "/img/logo-notion.svg", w: 108, h: 31 },
  { name: "Klarna", src: "/img/logo-klarna.svg", w: 78, h: 19 },
  { name: "Groupon", src: "/img/logo-groupon.svg", w: 117, h: 19 },
  { name: "Rivian", src: "/img/logo-rivian.svg", w: 125, h: 18 },
  { name: "Vercel", src: "/img/logo-vercel.svg", w: 103, h: 21 },
  { name: "Mercury", src: "/img/logo-mercury.svg", w: 141, h: 33 },
];

export default function LogoMarquee() {
  return (
    <section className="rounded-section-t bg-vast pt-[104px] pb-20 text-lumen">
      <p className="eyebrow mb-[72px] text-center text-lumen">
        Used by professionals at
      </p>

      <div className="mask-fade-x overflow-hidden">
        <div className="marquee-track" style={{ ["--speed" as string]: "44s" }}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {LOGOS.map((logo) => (
                <span
                  key={`${copy}-${logo.name}`}
                  className="mx-[30px] flex shrink-0 items-center md:mx-[42px]"
                >
                  <Image
                    src={logo.src}
                    alt={copy === 0 ? logo.name : ""}
                    aria-hidden={copy === 1}
                    width={logo.w}
                    height={logo.h}
                    className="h-auto opacity-80"
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
