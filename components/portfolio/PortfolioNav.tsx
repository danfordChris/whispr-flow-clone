"use client";

import { useEffect, useState } from "react";
import { RollText } from "../primitives";
import Logo from "./Logo";
import { profile } from "@/lib/portfolio";

const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
] as const;

const TABS = ["Work", "About"] as const;

export default function PortfolioNav() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Work");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-4 md:px-4">
      <div
        className={`pointer-events-auto mx-auto flex h-[54px] max-w-[912px] items-center justify-between gap-4 rounded-[10px] border-2 border-lumen-dark bg-lumen pr-2 pl-4 transition-shadow duration-300 md:h-[69px] md:pl-5 ${
          scrolled ? "shadow-[0_6px_18px_-10px_#1a1a1a40]" : ""
        }`}
      >
        <div className="flex items-center gap-4 md:gap-7">
          <a href="#top" className="shrink-0">
            <Logo size={26} />
          </a>

          <div className="relative hidden items-center rounded-full bg-lumen-dark p-[2px] sm:flex">
            <span
              className="absolute top-[2px] bottom-[2px] rounded-full bg-[#fffdf9] shadow-[0_1px_2px_#1a1a1a1f] transition-all duration-[420ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
              style={{
                left: tab === "Work" ? 2 : "50%",
                width: "calc(50% - 2px)",
              }}
              aria-hidden="true"
            />
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTab(t);
                  jump(t.toLowerCase());
                }}
                aria-pressed={tab === t}
                className={`relative z-10 rounded-full px-4 py-2 text-[16px] leading-none font-semibold transition-colors duration-200 ${
                  tab === t ? "text-vast" : "text-dark-70 hover:text-vast"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-5 md:gap-7">
          <nav className="hidden items-center gap-6 md:flex">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => jump(s.id)}
                className="text-[16px] font-semibold text-vast"
              >
                <RollText text={s.label} />
              </button>
            ))}
          </nav>

          <a
            href={profile.cv}
            target="_blank"
            rel="noreferrer"
            className="btn roll-parent hidden px-[14px] text-[16px] sm:inline-flex"
          >
            <RollText text="Download CV" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-lg border-2 border-vast md:hidden"
          >
            <span
              className={`block h-[2px] w-4 bg-vast transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-4 bg-vast transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* mobile sheet */}
      <div
        className={`pointer-events-auto mx-auto mt-2 max-w-[912px] overflow-hidden rounded-[10px] border-2 border-lumen-dark bg-lumen transition-all duration-300 md:hidden ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 p-4">
          {[...SECTIONS, { id: "contact", label: "Contact" }].map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => jump(s.id)}
              className="rounded-lg px-2 py-3 text-left text-[17px] font-medium hover:bg-dark-10"
            >
              {s.label}
            </button>
          ))}
          <a
            href={profile.cv}
            target="_blank"
            rel="noreferrer"
            className="btn mt-2 w-full"
          >
            Download CV
          </a>
        </div>
      </div>
    </header>
  );
}
