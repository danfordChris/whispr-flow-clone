import { FlowLogo } from "./primitives";

const COLUMNS: { title: string; links: string[] }[] = [
  {
    title: "Get started",
    links: [
      "Pricing",
      "Privacy & Security",
      "Web demo",
      "Why Flow over built-in voice-to-text",
      "Microphone guide",
    ],
  },
  {
    title: "Professionals",
    links: [
      "Leaders",
      "Developers",
      "Creators",
      "Customer Support",
      "Students",
      "Lawyers",
      "Accessibility",
      "Sales",
    ],
  },
  {
    title: "Resources",
    links: [
      "Case studies",
      "Blog",
      "Use cases",
      "Web demo",
      "AI prompting guide",
      "Workflows",
      "Vibe coding",
      "Talk to support",
      "Talk to sales",
      "Help center",
    ],
  },
  {
    title: "Company",
    links: [
      "About",
      "Careers",
      "Trust center",
      "Become an affiliate",
      "Media kit",
      "What's new",
    ],
  },
];

const PRODUCTS = [
  {
    name: "Wispr Flow Dictation",
    badge: null as string | null,
    body: "The voice-to-text AI that turns speech into clear, polished writing in every app.",
  },
  {
    name: "Wispr Flow Notetaker",
    badge: "New",
    body: "Meeting notes that are accurate enough to action on. Works in all meetings.",
  },
];

export default function Footer() {
  return (
    <footer className="bg-lumen px-5 pt-24 pb-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,340px)_1fr]">
          {/* products */}
          <div>
            <p className="eyebrow mb-6 text-dark-50">Products</p>
            <div className="space-y-7">
              {PRODUCTS.map((p) => (
                <div key={p.name}>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[17px] font-semibold">{p.name}</h3>
                    {p.badge && (
                      <span className="rounded-full border border-vast bg-dawn px-2 py-0.5 text-[11px] font-semibold">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 max-w-[320px] text-[15px] leading-[1.45] text-dark-70">
                    {p.body}
                  </p>
                  <a
                    href="#"
                    className="mt-3 inline-block border-b border-vast text-[14px] font-semibold transition-opacity hover:opacity-70"
                  >
                    Download free
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* link columns */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="eyebrow mb-5 text-dark-50">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[16px] leading-[1.35] font-medium text-vast transition-opacity hover:opacity-60"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col-reverse items-start justify-between gap-6 border-t border-dark-15 pt-8 md:flex-row md:items-center">
          <div className="flex items-center gap-6">
            <FlowLogo />
            <span className="text-[14px] text-dark-50">
              © Wispr Flow {new Date().getFullYear()}
            </span>
          </div>
          <nav className="flex flex-wrap gap-6">
            {["Terms", "Privacy", "Data Controls"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-[14px] text-dark-70 transition-colors hover:text-vast"
              >
                {l}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
