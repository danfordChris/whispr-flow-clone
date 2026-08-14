"use client";

import Image from "next/image";
import { Reveal } from "./primitives";

/**
 * Quote cards. Each either carries a publication wordmark or a portrait,
 * mirroring the mix on the live site.
 */
const QUOTES = [
  {
    quote:
      "If you find it tiring to write long emails, or just need something quick to note down an idea in the heat of the moment — but typing it all feels like a drag — this app is a Godsend for you.",
    name: "Slash Gear",
    role: null,
    logo: { src: "/img/pub-slashgear.svg", w: 79, h: 46 },
    photo: null,
  },
  {
    quote:
      "Wispr Flow is a top 3 favorite AI tool for me. I literally do not use my fingers to type anymore.",
    name: "Alex Lieberman",
    role: "Co-founder of Morning Brew",
    logo: null,
    photo: { src: "/img/quote-alex.jpg", w: 584, h: 236 },
  },
  {
    quote:
      "I feel like I have no time to type anymore. So I just talk to my phone and my laptop all the time.",
    name: "Elena Verna",
    role: "Head of Growth at Lovable",
    logo: null,
    photo: { src: "/img/quote-elena.jpg", w: 649, h: 201 },
  },
  {
    quote:
      "Wispr Flow just gets it right. It is consistently so much better than the standard voice input, it'll blow your mind.",
    name: "Fast Company",
    role: null,
    logo: { src: "/img/pub-fastcompany.svg", w: 122, h: 29 },
    photo: null,
  },
];

function CaseStudy({
  logo,
  quote,
  stats,
  photo,
  reverse = false,
}: {
  logo: { src: string; w: number; h: number };
  quote: string;
  stats: { value: string; label: string }[];
  photo: { src: string; w: number; h: number; alt: string };
  reverse?: boolean;
}) {
  return (
    <div className="rounded-section overflow-hidden border border-lumen/20 bg-lumen/5">
      <div
        className={`grid gap-10 p-8 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-12 md:p-14 ${
          reverse ? "md:[&>*:first-child]:order-3" : ""
        }`}
      >
        <div className="relative shrink-0 overflow-hidden rounded-[24px] md:w-[280px]">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.w}
            height={photo.h}
            className="h-[200px] w-full object-cover md:h-[300px]"
          />
        </div>

        <div className="max-w-[560px]">
          <Image
            src={logo.src}
            alt=""
            width={logo.w}
            height={logo.h}
            className="mb-6 h-auto opacity-80"
          />
          <p className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.2] text-lumen">
            &ldquo;{quote}&rdquo;
          </p>
          <a
            href="#"
            className="mt-8 inline-flex items-center gap-2 border-b-2 border-lumen pb-0.5 text-[15px] font-semibold text-lumen transition-opacity hover:opacity-70"
          >
            Read case study <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="flex gap-10 md:flex-col md:gap-8">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,3.6vw,3.2rem)] leading-none text-lumen">
                {s.value}
              </div>
              <div className="mt-2 max-w-[170px] text-[14px] leading-[1.35] whitespace-pre-line text-lumen/60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    // full-bleed dark band with a rounded top, as on the live site
    <section className="rounded-section-t bg-vast text-lumen">
      <div className="px-5 py-28 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="text-center">
            <p className="eyebrow text-lumen">Early access, real results</p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.4vw,4.6875rem)] leading-[1] font-normal text-balance">
              From the first <em className="italic">people to use it.</em>
            </h2>
          </Reveal>

          <Reveal className="mt-20" delay={80}>
            <CaseStudy
              logo={{ src: "/img/pub-sb.svg", w: 188, h: 30 }}
              photo={{
                src: "/img/case-steven.jpg",
                w: 322,
                h: 428,
                alt: "Steven, early Wispr Flow user",
              }}
              quote="The thought I have becomes my explanation. The gap between my thought and my delivery of my idea collapses."
              stats={[
                { value: "90%", label: "faster message\noutput" },
                { value: "2", label: "extra productive\nhours/day" },
              ]}
            />
          </Reveal>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {QUOTES.map((q, i) => (
              <Reveal key={q.name} delay={i * 70}>
                <figure className="flex h-full flex-col overflow-hidden rounded-[var(--radius-section-tiny)] border border-lumen/20 bg-lumen/5">
                  {q.photo && (
                    <Image
                      src={q.photo.src}
                      alt={q.name}
                      width={q.photo.w}
                      height={q.photo.h}
                      className="h-[150px] w-full object-cover"
                    />
                  )}
                  <div className="flex flex-1 flex-col justify-between p-8">
                    {q.logo && (
                      <Image
                        src={q.logo.src}
                        alt=""
                        width={q.logo.w}
                        height={q.logo.h}
                        className="mb-5 h-auto opacity-75"
                      />
                    )}
                    <blockquote className="text-[18px] leading-[1.45] text-lumen/90">
                      &ldquo;{q.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-8">
                      <div className="text-[15px] font-semibold text-lumen">
                        {q.name}
                      </div>
                      {q.role && (
                        <div className="mt-0.5 text-[14px] text-lumen/55">
                          {q.role}
                        </div>
                      )}
                    </figcaption>
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-6">
            <CaseStudy
              reverse
              logo={{ src: "/img/pub-clay.svg", w: 137, h: 16 }}
              photo={{
                src: "/img/case-clay.jpg",
                w: 780,
                h: 201,
                alt: "Clay sales team using Wispr Flow",
              }}
              quote="Wispr Flow is a top 3 favorite AI tool for me. I literally do not use my fingers to type anymore."
              stats={[
                { value: "20%", label: "more customer calls per day" },
                { value: "$3.08m", label: "estimated cost savings per year" },
              ]}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
