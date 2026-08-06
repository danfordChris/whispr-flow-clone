"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------
   Per-character hover roll — the live nav splits every link into
   individual character divs and rolls them on hover.
   ------------------------------------------------------------------ */
export function RollText({ text }: { text: string }) {
  const words = text.split(" ");
  let index = 0;
  return (
    <span className="roll" aria-label={text}>
      {words.map((word, w) => (
        <span key={w} className="roll-word" aria-hidden="true">
          {word.split("").map((char, c) => {
            const delay = `${index++ * 18}ms`;
            return (
              <span key={c} className="roll-slot">
                <span
                  className="roll-char"
                  data-ghost="false"
                  style={{ transitionDelay: delay }}
                >
                  {char}
                </span>
                <span
                  className="roll-char"
                  data-ghost="true"
                  style={{ transitionDelay: delay }}
                >
                  {char}
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------
   Scroll reveal
   ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   Progress of an element through the viewport, 0 → 1.
   Drives the scroll-linked sections.
   ------------------------------------------------------------------ */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        setProgress(rect.top <= 0 ? 1 : 0);
        return;
      }
      const value = Math.min(Math.max(-rect.top / total, 0), 1);
      setProgress(value);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress };
}

/* ------------------------------------------------------------------
   Animated waveform — the mic pill in the hero and the Flow bar
   ------------------------------------------------------------------ */
const BAR_HEIGHTS = [
  8, 14, 22, 11, 26, 17, 30, 13, 24, 9, 19, 28, 12, 21, 15, 27, 10, 23, 16, 29,
  12, 20, 25, 11, 18, 14, 22, 9,
];

export function Waveform({
  active = true,
  color = "currentColor",
  height = 32,
  bars = BAR_HEIGHTS.length,
  className = "",
}: {
  active?: boolean;
  color?: string;
  height?: number;
  bars?: number;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center gap-[3px] ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      {Array.from({ length: bars }).map((_, i) => {
        const base = BAR_HEIGHTS[i % BAR_HEIGHTS.length];
        return (
          <span
            key={i}
            className={active ? "wave-bar" : ""}
            style={
              {
                display: "block",
                width: 2,
                borderRadius: 2,
                height: `${Math.min(base, height)}px`,
                background: color,
                animationDelay: `${(i % 9) * 0.09}s`,
                animationDuration: `${0.8 + ((i * 7) % 5) * 0.12}s`,
                transform: active ? undefined : "scaleY(0.3)",
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------
   Text marching along an SVG path.

   The live site drives these by animating the `x` of the <text> node; here
   we advance `startOffset` and wrap it at the measured width of a single
   repetition so the loop is seamless at any speed.
   ------------------------------------------------------------------ */
const PATH_REPEATS = 4;

export function PathMarquee({
  id,
  d,
  viewBox,
  width,
  height,
  text,
  speed,
  fontSize,
  fontWeight = 400,
  fill,
  opacity = 1,
  stroke,
  strokeWidth = 0,
  className = "",
}: {
  id: string;
  d: string;
  viewBox: string;
  width: number;
  height: number;
  text: string;
  /** user units per second */
  speed: number;
  fontSize: number;
  fontWeight?: number;
  fill: string;
  opacity?: number;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
}) {
  const textPathRef = useRef<SVGTextPathElement>(null);
  const [unit, setUnit] = useState(0);

  // measure one repetition so the wrap point is exact
  useEffect(() => {
    const el = textPathRef.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      const total = el.getComputedTextLength();
      if (total > 0) setUnit(total / PATH_REPEATS);
      else raf = requestAnimationFrame(measure);
    };
    measure();
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const el = textPathRef.current;
    if (!el || !unit) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let offset = 0;
    let last = performance.now();

    const tick = (now: number) => {
      offset -= ((now - last) / 1000) * speed;
      last = now;
      if (offset <= -unit) offset += unit;
      el.setAttribute("startOffset", String(offset));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [unit, speed]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      className={`shrink-0 overflow-visible ${className}`}
      aria-hidden="true"
    >
      <path
        id={id}
        d={d}
        fill="none"
        stroke={stroke ?? "none"}
        strokeWidth={strokeWidth}
      />
      <text
        fontFamily="var(--font-body)"
        fontSize={fontSize}
        fontWeight={fontWeight}
        fill={fill}
        opacity={opacity}
      >
        <textPath ref={textPathRef} href={`#${id}`} startOffset="0">
          {text.repeat(PATH_REPEATS)}
        </textPath>
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------
   Apple glyph used on every "Get started on macOS" button
   ------------------------------------------------------------------ */
export function AppleIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.18}
      viewBox="0 0 17 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M14.09 10.62c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.62-1.7-3.19-1.72-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.87-.76-1.48.02-2.84.86-3.6 2.18-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.25 2.74 2.2 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.7.71 2.87.69 1.18-.02 1.93-1.08 2.65-2.14.84-1.23 1.18-2.42 1.2-2.48-.03-.01-2.28-.88-2.3-3.5ZM11.9 3.9c.6-.74 1.02-1.76.9-2.78-.87.04-1.94.59-2.57 1.32-.56.65-1.06 1.7-.93 2.7.98.08 1.98-.5 2.6-1.24Z" />
    </svg>
  );
}

/* Wispr Flow wordmark — bars + "Flow" */
export function FlowLogo({ dark = false }: { dark?: boolean }) {
  const color = dark ? "#ffffeb" : "#1a1a1a";
  return (
    <span className="inline-flex items-center gap-[7px]" aria-label="Wispr Flow">
      <svg width="22" height="20" viewBox="0 0 22 20" aria-hidden="true">
        {[
          { x: 0, h: 9 },
          { x: 5, h: 16 },
          { x: 10, h: 20 },
          { x: 15, h: 12 },
          { x: 20, h: 6 },
        ].map((b, i) => (
          <rect
            key={i}
            x={b.x}
            y={(20 - b.h) / 2}
            width="2.6"
            height={b.h}
            rx="1.3"
            fill={color}
          />
        ))}
      </svg>
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          fontSize: 22,
          letterSpacing: "-0.02em",
          color,
        }}
      >
        Flow
      </span>
    </span>
  );
}
