import About from "@/components/portfolio/About";
import CareerTimeline from "@/components/portfolio/CareerTimeline";
import ContactSection from "@/components/portfolio/ContactSection";
import ExpertiseTrack from "@/components/portfolio/ExpertiseTrack";
import FeaturedWork from "@/components/portfolio/FeaturedWork";
import PortfolioFooter from "@/components/portfolio/PortfolioFooter";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioNav from "@/components/portfolio/PortfolioNav";
import Products from "@/components/portfolio/Products";
import ProjectsGrid from "@/components/portfolio/ProjectsGrid";
import ServicesTabs from "@/components/portfolio/ServicesTabs";
import TechMarquee from "@/components/portfolio/TechMarquee";

export default function Home() {
  return (
    <>
      <PortfolioNav />
      <main>
        <PortfolioHero />
        <TechMarquee />
        <FeaturedWork />
        <ServicesTabs />
        <ProjectsGrid />
        <ExpertiseTrack />
        <CareerTimeline />
        <Products />
        <About />
        <ContactSection />
      </main>
      <PortfolioFooter />
    </>
  );
}
