"use client";

import { useEffect, useState } from "react";

/**
 * A shell prompt that types its way through the commands this stack actually
 * runs — Flutter, Docker, Next, Kubernetes, git — then starts over.
 *
 * Replaces the audio waveform the pill inherited from the Wispr port, which
 * signalled dictation rather than engineering.
 */
const COMMANDS = [
  "flutter build apk --release",
  "docker compose up -d",
  "next build",
  "kubectl apply -f k8s/",
  "git push origin main",
];

export default function TerminalPill() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cmd = COMMANDS[i % COMMANDS.length];
    const done = !deleting && text === cmd;
    const cleared = deleting && text === "";

    // held longer than a normal typewriter so the command stays readable
    const delay = reduced ? 0 : done ? 1900 : cleared ? 260 : deleting ? 22 : 55;

    const t = setTimeout(() => {
      if (reduced) {
        if (text !== COMMANDS[0]) setText(COMMANDS[0]);
        return;
      }
      if (done) return setDeleting(true);
      if (cleared) {
        setDeleting(false);
        setI((v) => v + 1);
        return;
      }
      setText(
        deleting ? cmd.slice(0, text.length - 1) : cmd.slice(0, text.length + 1),
      );
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, i]);

  return (
    <div
      className="relative flex h-[74px] items-center gap-3 rounded-[26px] border-2 border-vast bg-lumen pr-7 pl-6"
      role="img"
      aria-label="A terminal running build commands"
    >
      {/* running indicator */}
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flare opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-flare" />
      </span>

      <span className="flex items-baseline gap-2 font-mono text-[14px] whitespace-nowrap">
        <span className="text-dark-50 select-none">~/danford</span>
        <span className="font-semibold text-fathom select-none">$</span>
        {/* min-width keeps the pill from resizing as the command types */}
        <span className="inline-block min-w-[228px] text-vast">
          {text}
          {/* .caret carries the blink keyframe; the utilities widen it into
              a terminal block cursor */}
          <span className="caret ml-[2px] h-[15px] w-[7px]" />
        </span>
      </span>
    </div>
  );
}
