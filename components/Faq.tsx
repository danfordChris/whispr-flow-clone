"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "./primitives";

const FAQS: { q: string; a: string[] }[] = [
  {
    q: "Will Flow work in my messages, notes, email, or AI tools?",
    a: [
      "Yes. Flow types wherever your cursor is, so it works in every app on your computer with no setup or integrations. Gmail, Slack, iMessage, Notion, your terminal, your code editor, and AI tools like ChatGPT, Claude, and Cursor. If you can type there, you can Flow there.",
    ],
  },
  {
    q: "How is Flow different from Siri or Google voice typing?",
    a: [
      'Built-in dictation transcribes what you say, word for word, including every "um," false start, and mid-sentence correction. Then you spend time cleaning it up. Flow uses the most advanced voice technology available to turn what you say into what you meant to write.',
      'Catches your corrections. Say "let\'s meet at 5… actually 6pm" and built-in dictation writes all of it. Flow gives you "Let\'s meet at 6pm."',
      "Formats as you speak. Numbered lists, paragraphs, structured emails. Built-in dictation gives you a wall of text; Flow gives you something ready to send.",
    ],
  },
  {
    q: "Does Flow work in other languages?",
    a: [
      "Yes, Flow supports 100+ languages.",
      "For the best accuracy, select the specific language you're speaking at that moment rather than relying on auto-detect. If you switch between languages during the day, the language picker lives right in the Flow bar, so changing is one click away.",
    ],
  },
  {
    q: "Does it work if I have an accent?",
    a: [
      "Yes. Flow is built to handle a wide range of accents and speaking styles. One tip that makes a real difference: select only the language you're speaking right now, and deselect the others.",
      "If you speak English with a French accent, having both English and French selected can confuse Flow about which language it's hearing. Selecting just English while you're speaking English gives you noticeably better accuracy.",
    ],
  },
  {
    q: "What if I talk fast, speak quietly, or work somewhere noisy?",
    a: [
      "Flow keeps up with fast talkers and can handle speech as quiet as a whisper. The main thing that matters is your microphone setup: your built-in mic works great, and the closer the mic is to your mouth, the quieter you can speak.",
      "We recommend against AirPods and other Bluetooth earbuds for dictation, since they compress audio and can miss the start of what you say.",
    ],
  },
  {
    q: "Do I need a special microphone or extra hardware?",
    a: [
      "No. Your built-in microphone is all you need. If you want to dictate very quietly or in loud environments, a mic closer to your mouth helps.",
      "One note: AirPods and Bluetooth earbuds are the one setup we'd avoid, since they tend to hurt accuracy.",
    ],
  },
  {
    q: "Is my voice data private?",
    a: [
      "We never sell or share your data. Privacy Mode and Private Cloud Sync ensures no dictation is stored on our servers, and Flow is independently certified to the world's top security standards: SOC 2 Type II, ISO 27001, and HIPAA compliance.",
    ],
  },
  {
    q: "Is Flow free?",
    a: [
      "Yes. Flow is free, with no trial countdown or credit card required, for 2,000 words per week.",
      "If you want unlimited dictation, upgrade to Flow Pro.",
    ],
  },
  {
    q: "Can my whole team use it?",
    a: [
      "Yes, and there are two ways to do it.",
      "Flow Pro for Teams gives everyone unlimited dictation under one plan, with centralized billing and an admin portal to manage seats.",
      "Flow Enterprise adds the things larger organizations need: enforced SSO, admin-controlled data retention and privacy policies, audit logs, and bulk pricing.",
    ],
  },
];

export default function Faq() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-lumen px-5 py-28 md:py-36">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="text-center">
          <p className="eyebrow text-dark-70">FAQs</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.4vw,4.6875rem)] leading-[1] font-normal text-balance">
            Good <em className="italic">questions.</em>
          </h2>
        </Reveal>

        {/* the live site's .faq_wrap: an 816px lumen-dark card holding a
            dark-teal question panel beside the answer panel */}
        <Reveal delay={80} className="mt-12">
          <div className="mx-auto max-w-[816px] rounded-[32px] bg-lumen-dark p-4">
            <div className="grid gap-2 md:grid-cols-2 md:gap-2">
              {/* questions — dark teal panel */}
              <div className="thin-scroll max-h-[420px] overflow-y-auto rounded-[16px] bg-fathom px-3 pt-7 pb-3">
                <p className="mb-4 px-3 font-[family-name:var(--font-display)] text-[20px] leading-none text-lumen">
                  Questions
                </p>
                <ul className="flex flex-col gap-1">
                  {FAQS.map((f, i) => (
                    <li key={f.q}>
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        aria-expanded={active === i}
                        className="w-full rounded-[4px] p-4 text-left text-[14px] leading-[1.3] font-medium text-lumen transition-colors duration-300"
                        style={{
                          background:
                            active === i
                              ? "rgba(228,228,208,0.1)"
                              : "transparent",
                        }}
                      >
                        {f.q}
                      </button>

                      {/* inline answer on small screens */}
                      <div
                        className="grid overflow-hidden transition-[grid-template-rows] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] md:hidden"
                        style={{
                          gridTemplateRows: active === i ? "1fr" : "0fr",
                        }}
                      >
                        <div className="min-h-0">
                          <div className="space-y-3 px-4 pb-4 text-[14px] leading-[1.5] text-lumen/70">
                            {f.a.map((p, k) => (
                              <p key={k}>{p}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* answer — on the lumen-dark card itself */}
              <div className="thin-scroll hidden max-h-[436px] overflow-y-auto pt-7 pr-2 pl-6 md:block">
                <div className="mb-4 flex items-center gap-2">
                  <Image
                    src="/img/faq-logo.svg"
                    alt=""
                    width={28}
                    height={28}
                    className="rounded-md"
                  />
                  <p className="font-[family-name:var(--font-display)] text-[20px] leading-none">
                    Answer
                  </p>
                </div>
                <h3 className="text-[16px] leading-[1.35] font-semibold">
                  {FAQS[active].q}
                </h3>
                <div className="mt-4 space-y-4 pb-6 text-[15px] leading-[1.55] text-dark-70">
                  {FAQS[active].a.map((p, k) => (
                    <p key={k}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
