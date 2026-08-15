"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { RollText } from "../primitives";
import Logo from "./Logo";
import { profile } from "@/lib/portfolio";

const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
] as const;

/* Sections that live on the home page. Anchors outside this set fall
   back to a client-side lookup — but any nav-driven jump routes
   through here first, so a typo can't silently no-op. */
const HOME_ANCHORS = new Set([
  "top",
  "work",
  "services",
  "projects",
  "expertise",
  "career",
  "products",
  "about",
  "contact",
]);

export default function PortfolioNav() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

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

  /* When we land on the home page carrying a hash (e.g. arriving from
     /projects → /#work), the App Router does not always scroll for us —
     it depends on how the navigation was initiated. Run one deferred
     scroll after mount if a matching hash target exists. */
  useEffect(() => {
    if (!isHome) return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    // rAF twice → wait for layout to settle after route-driven paints
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        document
          .getElementById(hash)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }),
    );
  }, [isHome, pathname]);

  const jump = useCallback(
    (id: string) => {
      setOpen(false);
      if (isHome) {
        if (id === "top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      // Off-home: route back home carrying the anchor.
      const target = HOME_ANCHORS.has(id) ? `/#${id}` : "/";
      router.push(target);
    },
    [isHome, router],
  );

  const goHome = useCallback(
    (e: React.MouseEvent) => {
      if (!isHome) return; // let the Link navigate
      e.preventDefault();
      setOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [isHome],
  );

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-4 md:px-4">
      <div
        className={`pointer-events-auto mx-auto flex h-[54px] max-w-[912px] items-center justify-between gap-4 rounded-[10px] border-2 border-lumen-dark bg-lumen pr-2 pl-4 transition-shadow duration-300 md:h-[69px] md:pl-5 ${
          scrolled ? "shadow-[0_6px_18px_-10px_#1a1a1a40]" : ""
        }`}
      >
        <Link
          href="/"
          onClick={goHome}
          aria-label="Home"
          className="shrink-0"
        >
          <Logo size={26} showMark={false} />
        </Link>

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
