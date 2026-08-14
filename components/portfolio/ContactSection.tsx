"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal, RollText } from "../primitives";
import { Prompt } from "./TerminalPill";
import { contact, profile, socials } from "@/lib/portfolio";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export default function ContactSection() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof values) => (v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please enter your name";
    if (!values.email.trim())
      next.email = "Please enter your email or phone number";
    if (!values.message.trim()) next.message = "Please enter the message";
    setErrors(next);
    if (Object.keys(next).length) return;

    // No mail transport is wired up in this build — hand off to the user's
    // mail client so the message still reaches its destination.
    const body = encodeURIComponent(
      `${values.message}\n\n— ${values.name} (${values.email})`,
    );
    window.location.href = `mailto:?subject=${encodeURIComponent(
      `Project enquiry from ${values.name}`,
    )}&body=${body}`;
    setSent(true);
  };

  const field =
    "w-full rounded-xl border-2 border-lumen/25 bg-vast/30 px-4 py-3 text-[15px] text-lumen placeholder:text-lumen/40 outline-none transition-colors focus:border-lumen";

  return (
    <section id="contact" className="bg-lumen">
      <Reveal>
        <div className="rounded-section relative overflow-hidden bg-fathom px-5 pt-24 pb-16 text-lumen md:pt-[100px]">
          <Image
            src="/img/cta-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-fathom/85 via-fathom/75 to-fathom/95"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
            style={{ background: "#ffa946" }}
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-[1160px]">
            <div className="text-center">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(3rem,8.6vw,7.5rem)] leading-[0.85] font-normal">
                Let&rsquo;s <em className="italic">build it.</em>
              </h2>
              <p className="mx-auto mt-7 max-w-[520px] text-[20px] leading-[1.3] font-medium text-lumen">
                {contact.body}
              </p>
            </div>

            {/* form */}
            <form
              onSubmit={submit}
              noValidate
              className="mx-auto mt-12 max-w-[720px] rounded-[var(--radius-section-tiny)] border border-lumen/20 bg-vast/25 p-6 backdrop-blur-sm md:p-8"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="c-name"
                    className="mb-2 block text-[13px] font-semibold text-lumen/70"
                  >
                    {contact.fields.name.label}
                  </label>
                  <input
                    id="c-name"
                    className={field}
                    placeholder={contact.fields.name.placeholder}
                    value={values.name}
                    onChange={(e) => set("name")(e.target.value)}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-[12px] text-glow">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="c-email"
                    className="mb-2 block text-[13px] font-semibold text-lumen/70"
                  >
                    {contact.fields.email.label}
                  </label>
                  <input
                    id="c-email"
                    className={field}
                    placeholder={contact.fields.email.placeholder}
                    value={values.email}
                    onChange={(e) => set("email")(e.target.value)}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-[12px] text-glow">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="c-message"
                  className="mb-2 block text-[13px] font-semibold text-lumen/70"
                >
                  {contact.fields.message.label}
                </label>
                <textarea
                  id="c-message"
                  rows={6}
                  className={`${field} resize-y`}
                  placeholder={contact.fields.message.placeholder}
                  value={values.message}
                  onChange={(e) => set("message")(e.target.value)}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="mt-1.5 text-[12px] text-glow">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button type="submit" className="btn roll-parent px-6 py-4">
                  <RollText text="Send message" />
                </button>
                <a
                  href={profile.cv}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-light roll-parent px-6 py-4"
                >
                  <RollText text="Download CV" />
                </a>
                {sent && (
                  <span
                    role="status"
                    className="rounded-full bg-success px-3 py-1.5 text-[12px] font-semibold text-vast"
                  >
                    Opening your mail app…
                  </span>
                )}
              </div>
            </form>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[14px] font-medium text-lumen/60 transition-colors hover:text-lumen"
                >
                  {s.label} <span className="opacity-60">{s.handle}</span>
                </a>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <div className="flex h-[64px] items-center justify-center ">
                <Prompt path="~/danford" dark size={15} />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
