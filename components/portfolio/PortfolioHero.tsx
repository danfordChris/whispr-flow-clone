"use client";

import { useEffect, useState } from "react";
import { PathMarquee, RollText, Waveform } from "../primitives";
import { allTech, profile, socials } from "@/lib/portfolio";

/* the hero curves, reused from the Wispr Flow port */
const CURVE_LEFT =
  "M0.597656 50.924805 C17.4612 143.2965 61.94 299.86 398.60 360.27 C594.00 395.31 772.77 285.92 668.74 149.27 C564.71 12.62 340.74 270.96 667.04 470.42 C719.69 506.55 817.468 561.26 1046.43 565.235";
const CURVE_RIGHT =
  "M2.04309 563.872C111.592 558.268 316.491 554.016 517.963 490.064C703.017 431.323 875.319 444.531 1021.88 453.216";

const TECH_TRAIL = allTech.join("  ·  ") + "  ·  ";
const ROLE_TRAIL = profile.roles.join("  ·  ") + "  ·  ";

/** Types a word out, holds, deletes, moves to the next. */
function useTypedRole(words: readonly string[]) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const word = words[i % words.length];
    const done = !deleting && text === word;
    const cleared = deleting && text === "";

    // with reduced motion the first role is written out in one step and left
    const delay = reduced ? 0 : done ? 1600 : cleared ? 220 : deleting ? 45 : 78;

    const t = setTimeout(() => {
      if (reduced) {
        if (text !== words[0]) setText(words[0]);
        return;
      }
      if (done) return setDeleting(true);
      if (cleared) {
        setDeleting(false);
        setI((v) => v + 1);
        return;
      }
      setText(
        deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1),
      );
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, i, words]);

  return text;
}

export default function PortfolioHero() {
  const role = useTypedRole(profile.roles);

  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pt-[160px] pb-[80px] md:pt-[168px] md:pb-[120px]"
    >
      {/* the two curved marquees — tech stack on the grey loop,
          roles on the black ribbon */}
      <div
        className="pointer-events-none absolute top-[186px] left-1/2 hidden w-[2100px] -translate-x-1/2 select-none md:flex"
        aria-hidden="true"
      >
        <PathMarquee
          id="pf-curve-left"
          d={CURVE_LEFT}
          viewBox="0 0 1048 594"
          width={1050}
          height={595}
          text={TECH_TRAIL}
          speed={26}
          fontSize={18}
          fill="#1a1a1a"
          opacity={0.25}
        />
        <PathMarquee
          id="pf-curve-right"
          d={CURVE_RIGHT}
          viewBox="0 0 1024 620"
          width={1050}
          height={636}
          text={ROLE_TRAIL}
          speed={34}
          fontSize={18}
          fontWeight={600}
          fill="#ffffeb"
          stroke="#1A1A1A"
          strokeWidth={30}
          /* the two curves are one continuous line, but the boxes have
             different heights so the join lands 4px right / 12px low —
             pull the ribbon back onto the grey path's end point */
          className="-mt-3 -ml-1"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[992px] text-center">
        <p className="eyebrow text-dark-70">{profile.location}</p>

        <h1 className="hd-display mt-6">
          {profile.firstName}
          <br />
          <em>{profile.lastName}.</em>
        </h1>

        {/* typed role line */}
        <p className="mt-10 text-[22px] leading-none font-semibold md:text-[26px]">
          <span className="text-dark-70">I&rsquo;m a </span>
          <span className="text-vast">{role}</span>
          <span className="caret ml-0.5 align-middle" />
        </p>

        <p className="mx-auto mt-7 max-w-[560px] text-[18px] leading-[1.4] font-medium text-balance md:text-[20px]">
          {profile.bio}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#work"
            className="btn roll-parent"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <RollText text="See the work" />
          </a>
          <a
            href={profile.cv}
            target="_blank"
            rel="noreferrer"
            className="btn btn-light roll-parent"
          >
            <RollText text="Download CV" />
          </a>
        </div>

        {/* socials */}
        <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="text-[14px] font-medium text-dark-50 transition-colors hover:text-vast"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* the "listening" pill from the port, reframed as a build indicator */}
      <div className="relative z-10 mt-16 flex justify-center md:mt-24">
        <div className="relative flex h-[74px] items-center gap-3 rounded-[26px] border-2 border-vast bg-lumen px-6">
          <span className="h-2 w-2 rounded-full bg-flare" />
          <Waveform height={30} bars={18} color="#1a1a1a" />
          <span className="font-[family-name:var(--font-body)] text-[13px] font-medium text-dark-70">
            building
          </span>
        </div>
      </div>
    </section>
  );
}
