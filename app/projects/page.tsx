import Link from "next/link";
import type { Metadata } from "next";
import PortfolioFooter from "@/components/portfolio/PortfolioFooter";
import PortfolioNav from "@/components/portfolio/PortfolioNav";
import ProjectsGrid from "@/components/portfolio/ProjectsGrid";
import { profile, projects } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: `All projects · ${profile.firstName} ${profile.lastName}`,
  description: `Every project shipped by ${profile.firstName} ${profile.lastName} — ${projects.length} across mobile, web, and games. Filter by category and browse the full gallery.`,
};

export default function AllProjectsPage() {
  return (
    <>
      <PortfolioNav />
      <main>
        <section className="bg-lumen px-5 pt-[calc(var(--nav-h)+72px)] pb-4 md:px-10 md:pt-[calc(var(--nav-h)+96px)]">
          <div className="mx-auto max-w-[1240px]">
            <Link
              href="/#projects"
              className="eyebrow text-dark-70 transition-colors hover:text-vast"
            >
              ← Back to overview
            </Link>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.4vw,4.6875rem)] leading-[1] font-normal text-balance">
              Every project, <em className="italic">in one place.</em>
            </h1>
            <p className="mt-4 max-w-[560px] text-[16px] leading-[1.5] text-dark-70">
              {projects.length} shipped projects across mobile, web, and games.
              Filter by lane below.
            </p>
          </div>
        </section>
        <ProjectsGrid />
      </main>
      <PortfolioFooter />
    </>
  );
}
