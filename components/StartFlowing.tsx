"use client";

import Image from "next/image";
import { AppleIcon, Reveal, RollText, Waveform } from "./primitives";

export default function StartFlowing() {
  return (
    <section className="bg-lumen">
      <Reveal>
        <div className="rounded-section relative overflow-hidden bg-fathom px-5 pt-24 pb-8 text-center text-lumen md:pt-[100px]">
          {/* full-bleed backdrop, as on the live site */}
          <Image
            src="/img/cta-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-fathom/80 via-fathom/70 to-fathom/90"
            aria-hidden="true"
          />

          {/* soft glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
            style={{ background: "#ffa946" }}
            aria-hidden="true"
          />

          <div className="relative">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(3rem,8.6vw,7.5rem)] leading-[0.85] font-normal">
              Start <em className="italic">flowing</em>
            </h2>
            <p className="mx-auto mt-7 max-w-[480px] text-[20px] leading-[1.3] font-medium text-lumen">
              Effortless voice dictation in every application.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a href="#" className="btn roll-parent px-6 py-4">
                <AppleIcon />
                <RollText text="Get started on macOS" />
              </a>
              <a href="#" className="btn btn-light roll-parent px-6 py-4">
                <RollText text="Try Flow" />
              </a>
            </div>

            <p className="mt-6 text-[15px] text-lumen/60">
              Available on Mac, Windows, iPhone, and Android.
              <br />
              Free for 14 days.
            </p>

            <div className="mt-14 flex justify-center">
              <div className="flex h-[64px] w-[136px] items-center justify-center rounded-[22px] border-2 border-lumen/40">
                <Waveform height={26} bars={20} color="#ffffeb" />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
