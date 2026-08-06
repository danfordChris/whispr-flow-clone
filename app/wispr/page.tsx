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

export const metadata: Metadata = {
  title: "Wispr Flow — front-end port | Danford Chriss",
  description:
    "A study port of the wisprflow.ai marketing site to Next.js 16 and Tailwind v4, rebuilding its scroll-linked animations without GSAP or Webflow.",
  // a rebuild of someone else's marketing site — keep it out of search results
  robots: { index: false, follow: false },
  openGraph: {
    title: "Wispr Flow — front-end port",
    description:
      "A study port of the wisprflow.ai marketing site to Next.js 16 and Tailwind v4.",
  },
};

export default function WisprClone() {
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
