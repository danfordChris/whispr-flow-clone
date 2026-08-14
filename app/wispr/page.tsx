import Faq from "@/components/Faq";
import FasterThanTyping from "@/components/FasterThanTyping";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import LogoMarquee from "@/components/LogoMarquee";
import MakesItEasy from "@/components/MakesItEasy";
import Nav from "@/components/Nav";
import Privacy from "@/components/Privacy";
import StartFlowing from "@/components/StartFlowing";
import Testimonials from "@/components/Testimonials";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

/**
 * Local-only.
 *
 * This is a rebuild of wisprflow.ai's marketing page, and it still carries
 * their copy, real customer logos (Microsoft, Amazon, Notion, Klarna…),
 * publication marks, and testimonials attributed to real named people —
 * Alex Lieberman, Elena Verna — over placeholder portraits. Served from a
 * public URL that reads as Wispr Flow's own site with invented endorsements,
 * so it 404s unless the flag is set.
 *
 * To view it locally:  NEXT_PUBLIC_ENABLE_WISPR_DEMO=1 npm run dev
 *
 * To make it publishable, the borrowed content has to go — fictional company,
 * fictional quotes, fictional logos. Flipping the flag alone is not enough.
 */
const ENABLED = process.env.NEXT_PUBLIC_ENABLE_WISPR_DEMO === "1";

export const metadata: Metadata = {
  title: "Wispr Flow — front-end port | Danford Chriss",
  description:
    "A study port of the wisprflow.ai marketing site to Next.js 16 and Tailwind v4, rebuilding its scroll-linked animations without GSAP or Webflow.",
  robots: { index: false, follow: false },
};

export default function WisprClone() {
  if (!ENABLED) notFound();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <LogoMarquee />
        <FasterThanTyping />
        <HowItWorks />
        <MakesItEasy />
        <Privacy />
        <Testimonials />
        <Faq />
        <StartFlowing />
      </main>
      <Footer />
    </>
  );
}
