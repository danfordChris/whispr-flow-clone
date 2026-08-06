"use client";

import Image from "next/image";
import { Reveal } from "../primitives";
import { activities, profile, socials } from "@/lib/portfolio";

export default function About() {
  return (
    <section id="about" className="rounded-t-[80px] bg-vast text-lumen">
      <div className="px-5 py-28 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1240px]">
          <Reveal className="text-center">
            <p className="eyebrow text-lumen">About</p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.4vw,4.6875rem)] leading-[1] font-normal text-balance">
              Engineer first, <em className="italic">product-minded always.</em>
            </h2>
          </Reveal>

          <Reveal className="mt-20" delay={80}>
            <div className="grid gap-10 rounded-[var(--radius-section-regular)] border border-lumen/20 bg-lumen/5 p-8 md:grid-cols-[280px_1fr] md:items-center md:gap-14 md:p-14">
              <div className="relative overflow-hidden rounded-[24px]">
                <Image
                  src="/img/avatar.jpg"
                  alt={`${profile.firstName} ${profile.lastName}`}
                  width={640}
                  height={640}
                  className="h-[240px] w-full object-cover md:h-[300px]"
                />
              </div>

              <div className="max-w-[620px]">
                <p className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.25] text-lumen">
                  {profile.bio}
                </p>
                <p className="mt-6 text-[16px] leading-[1.55] text-lumen/60">
                  Based in {profile.location}. I work end to end — architecture,
                  interface, API, pipeline — and care most about the part users
                  actually feel.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-lumen/30 px-4 py-2 text-[14px] font-medium text-lumen/85 transition-colors hover:border-lumen hover:text-lumen"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* activities */}
          <Reveal className="mt-6">
            <div className="rounded-[var(--radius-section-tiny)] border border-lumen/20 bg-lumen/5 p-8 md:p-12">
              <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.2] text-lumen">
                Apart from coding, some other things I love
              </h3>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {activities.map((a) => (
                  <li
                    key={a}
                    className="rounded-full border border-lumen/25 px-4 py-2 text-[15px] text-lumen/80"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
