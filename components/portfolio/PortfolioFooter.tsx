import Logo from "./Logo";
import { profile, products, services, socials } from "@/lib/portfolio";

const NAV = [
  { title: "Explore", links: [
    { label: "Featured work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Expertise", href: "#expertise" },
    { label: "Career", href: "#career" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ]},
];

export default function PortfolioFooter() {
  return (
    <footer className="bg-lumen px-5 pt-24 pb-10">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,360px)_1fr]">
          {/* identity */}
          <div>
            <p className="eyebrow mb-6 text-dark-50">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="max-w-[320px] text-[16px] leading-[1.5] text-dark-70">
              {profile.roles.join(" · ")}
            </p>
            <p className="mt-3 text-[15px] text-dark-50">{profile.location}</p>
            <a
              href={profile.cv}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block border-b border-vast text-[14px] font-semibold transition-opacity hover:opacity-70"
            >
              Download CV
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {NAV.map((col) => (
              <div key={col.title}>
                <p className="eyebrow mb-5 text-dark-50">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-[16px] leading-[1.35] font-medium text-vast transition-opacity hover:opacity-60"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <p className="eyebrow mb-5 text-dark-50">Services</p>
              <ul className="space-y-2.5">
                {services.map((s) => (
                  <li
                    key={s.title}
                    className="text-[16px] leading-[1.35] font-medium text-vast"
                  >
                    {s.title}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-5 text-dark-50">Products</p>
              <ul className="space-y-2.5">
                {products.map((p) => (
                  <li key={p.title}>
                    <a
                      href={p.href}
                      target={p.href.startsWith("http") ? "_blank" : undefined}
                      rel={p.href.startsWith("http") ? "noreferrer" : undefined}
                      className="text-[16px] leading-[1.35] font-medium text-vast transition-opacity hover:opacity-60"
                    >
                      {p.title}
                    </a>
                  </li>
                ))}
                {/* the Wispr port is local-only — see app/wispr/page.tsx */}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-5 text-dark-50">Elsewhere</p>
              <ul className="space-y-2.5">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[16px] leading-[1.35] font-medium text-vast transition-opacity hover:opacity-60"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* oversized signature watermark — signs off the page */}
        <div
          className="pointer-events-none mt-20 -mb-6 select-none"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1200 220"
            preserveAspectRatio="xMidYMid meet"
            className="block h-auto w-full overflow-visible"
          >
            <text
              x="600"
              y="180"
              textAnchor="middle"
              fontFamily="var(--font-display), 'Times New Roman', serif"
              fontStyle="italic"
              fontWeight={500}
              fontSize={230}
              letterSpacing="-8"
              fill="transparent"
              stroke="#1A1A1A"
              strokeWidth={2}
              opacity={0.35}
              className="signature-drift"
            >
              {`${profile.firstName}${profile.lastName.toLowerCase()}`}
            </text>
          </svg>
        </div>

        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-6 border-t border-dark-15 pt-8 md:flex-row md:items-center">
          <div className="flex items-center gap-6">
            <Logo size={28} />
            <span className="text-[14px] text-dark-50">
              © {profile.firstName} {profile.lastName} {new Date().getFullYear()}
            </span>
          </div>
          <a
            href={profile.site}
            className="text-[14px] text-dark-70 transition-colors hover:text-vast"
          >
            danfordchris.dev
          </a>
        </div>
      </div>
    </footer>
  );
}
