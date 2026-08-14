"use client";

import Image from "next/image";
import { Reveal } from "./primitives";

export default function Privacy() {
  return (
    <section className="bg-lumen px-5 pb-28 md:pb-36">
      <Reveal className="mx-auto max-w-[1240px]">
        {/* the live site's .switch_wrap: lumen-dark card, 32px radius,
            three columns — heading | copy | certification badges */}
        <div className="grid gap-10 rounded-[32px] bg-lumen-dark px-8 py-12 md:grid-cols-[349px_296px_1fr] md:items-center md:gap-12 md:px-12 md:py-16">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,4vw,3rem)] leading-[0.95] font-normal text-balance">
            Your voice stays yours.
          </h2>

          <div>
            <p className="text-[16px] leading-[1.3] font-semibold text-dark-70">
              Privacy Mode means zero dictation stored on our servers. Never
              sold, never shared. SOC 2 Type II, HIPAA and ISO 27001 certified.
            </p>
            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 text-[16px] font-semibold text-vast transition-opacity hover:opacity-70"
            >
              Learn more
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="md:justify-self-end">
            <Image
              src="/img/badges.svg"
              alt="SOC 2 Type II, HIPAA, ISO 27001 and GDPR certified"
              width={349}
              height={109}
              className="h-auto w-full max-w-[349px]"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
