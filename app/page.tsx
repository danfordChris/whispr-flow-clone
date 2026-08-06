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

export default function Home() {
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
