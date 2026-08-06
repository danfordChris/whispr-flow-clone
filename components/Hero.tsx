"use client";

import { AppleIcon, PathMarquee, RollText, Waveform } from "./primitives";

const MESSY =
  "Umm, hope your week has started well…I was talking to Cheyene earlier but reception was really bad and I think their going to handle the first part of the project, but I'm not totally sure. Also, I told the team the the new timeline should be ready by Friday, although it's probably going to slip. There's been a lot of back and forth and honestly the the whole thing's been kind of chaotic, like nobody really knows what's going on so can you check in with them and see if the notes from yesterday's meeting were sent out. ";

const CLEAN =
  "Hope your week is off to a good start. I was talking to Cheyene earlier, but the reception was really bad. I think they're going to handle the first part of the project, but I'm not totally sure. I also told the team the new timeline should be ready by Friday — although it might slip. There's been a lot of back and forth, and honestly, the whole thing has been a bit chaotic. It feels like nobody really knows what's going on. Can you check in with them and see if the notes from yesterday's meeting were sent out, or if they're still waiting? ";

/* The two hero curves, taken verbatim from the live site's inline SVGs. */
const CURVE_LEFT =
  "M0.597656 50.924805 C17.4612 143.2965 61.94 299.86 398.60 360.27 C594.00 395.31 772.77 285.92 668.74 149.27 C564.71 12.62 340.74 270.96 667.04 470.42 C719.69 506.55 817.468 561.26 1046.43 565.235";

const CURVE_RIGHT =
  "M2.04309 563.872C111.592 558.268 316.491 554.016 517.963 490.064C703.017 431.323 875.319 444.531 1021.88 453.216";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pt-[160px] pb-[80px] md:pt-[168px] md:pb-[120px]"
    >
      {/* the two curved marquees sit in a 2100px flex row centred on the page,
          matching the live site's .hero_animation-wrapper-v2 */}
      <div
        className="pointer-events-none absolute top-[186px] left-1/2 hidden w-[2100px] -translate-x-1/2 select-none md:flex"
        aria-hidden="true"
      >
        <PathMarquee
          id="hero-curve-left"
          d={CURVE_LEFT}
          viewBox="0 0 1048 594"
          width={1050}
          height={595}
          text={MESSY}
          speed={26}
          fontSize={18}
          fill="#1a1a1a"
          opacity={0.25}
        />
        <PathMarquee
          id="hero-curve-right"
          d={CURVE_RIGHT}
          viewBox="0 0 1024 620"
          width={1050}
          height={636}
          text={CLEAN}
          speed={34}
          fontSize={18}
          fill="#ffffeb"
          stroke="#1A1A1A"
          strokeWidth={30}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[992px] text-center">
        <p className="eyebrow text-dark-70">Wispr Flow Dictation</p>

        <h1 className="hd-display mt-6">
          Don&rsquo;t type,
          <br />
          <em>just speak.</em>
        </h1>

        <p className="mx-auto mt-12 max-w-[480px] text-[18px] leading-[1.3] font-medium text-balance md:text-[20px]">
          The voice-to-text AI that turns speech into clear, polished writing in
          every app.
        </p>

        <div className="mt-6 flex justify-center">
          <a href="#" className="btn roll-parent">
            <AppleIcon />
            <RollText text="Get started on macOS" />
          </a>
        </div>

        <p className="mt-5 text-[15px] text-dark-70">
          Available on Mac, Windows, iPhone, and Android
        </p>
      </div>

      {/* mic pill */}
      <div className="relative z-10 mt-16 flex justify-center md:mt-24">
        <div className="relative flex h-[74px] w-[150px] items-center justify-center rounded-[26px] border-2 border-vast bg-lumen">
          <Waveform height={30} bars={22} color="#1a1a1a" />
        </div>
      </div>
    </section>
  );
}
