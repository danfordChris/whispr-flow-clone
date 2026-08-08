/**
 * Portfolio content.
 *
 * Extracted verbatim from the previous portfolio at
 * ~/projects/starterpacks/zogo-portfolio (read-only; nothing there was changed).
 */

export const profile = {
  firstName: "Danford",
  lastName: "Chriss",
  location: "Dar es Salaam, Tanzania",
  roles: [
    "Mobile Engineer",
    "Flutter Developer",
    "Full Stack Developer",
    "DevOps Engineer",
  ],
  bio: "Passionate about building scalable applications and solving complex problems with innovative solutions. I work across Flutter, React, TypeScript, Python, and DevOps to help teams launch reliable digital products.",
  site: "https://danfordchris.dev/",
  cv: "https://drive.google.com/file/d/1HjBL1jao2V9kvAxCrA8fAXlWl1e-jied/view?usp=sharing",
  seoTitle:
    "Danford Chriss — Full Stack, DevOps & Mobile Engineer | danfordchris",
  seoDescription:
    "Danford Chriss is a Full Stack Developer, DevOps Engineer, and Flutter Mobile Engineer building scalable web and mobile apps. Explore projects, products like ContentLab, and get in touch.",
  keywords: [
    "Danford Chriss",
    "Full Stack Developer",
    "DevOps Engineer",
    "Mobile Engineer",
    "Flutter Developer",
    "React Developer",
    "Tanzania software engineer",
    "ContentLab",
    "portfolio",
  ],
} as const;

export const socials = [
  { label: "GitHub", handle: "danfordChris", url: "https://github.com/danfordChris/" },
  {
    label: "LinkedIn",
    handle: "danford-chriss",
    url: "https://www.linkedin.com/in/danford-chriss-438364240",
  },
  { label: "Twitter", handle: "@Co24669", url: "https://x.com/Co24669" },
  {
    label: "Instagram",
    handle: "royz_chriss",
    url: "https://www.instagram.com/royz_chriss/",
  },
] as const;

/* ------------------------------------------------------------------ */

export type Expertise = {
  id: string;
  title: string;
  body: string;
  stack: string[];
};

export const expertise: Expertise[] = [
  {
    id: "fullstack",
    title: "Full Stack Web Development",
    body: "I build full-stack web applications with React, Next.js, Django, and TypeScript, covering product architecture, frontend systems, backend APIs, and delivery workflows for growing businesses.",
    stack: [
      "React",
      "Nextjs",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "SASS",
      "Flask",
      "Django",
      "Python",
      "Java",
      "SQL",
      "PostgreSQL",
      "Postman",
      "Firebase",
      "Flutter",
    ],
  },
  {
    id: "devops",
    title: "DevOps & Automation",
    body: "I help teams move from development to production with CI/CD pipelines, cloud deployment, release automation, testing workflows, and operational support for stable launches.",
    stack: [
      "Git",
      "GitHub Actions",
      "Docker",
      "AWS",
      "Azure",
      "Digital Ocean",
      "Linux",
      "Pandas",
      "Jenkins",
      "Snyk",
      "Vercel",
      "Kubernetes",
    ],
  },
  {
    id: "ai",
    title: "Mobile Engineering, GenAI & ML",
    body: "I work on cross-platform mobile apps with Flutter and also integrate AI capabilities where they add real business value, from automation to data-informed product experiences.",
    /**
     * The source portfolio listed only the four AI entries here, so the
     * "Mobile Engineering" half of the title had nothing behind it — Flutter
     * appeared under Full Stack instead. The mobile tools added here are the
     * ones that actually appear across the projects: Flutter and Dart in six
     * of them, React Native in MealGro, SQLite in IPF OS.
     */
    stack: [
      "Flutter",
      "Dart",
      "React Native",
      "SQLite",
      "OpenAI",
      "pandas",
      "TensorFlow",
      "Python Libraries",
    ],
  },
];

export const services = [
  {
    title: "Custom Software Development",
    description:
      "I build tailored web platforms, internal tools, and product systems designed around business workflows, performance, and long-term maintainability.",
  },
  {
    title: "Mobile App Development",
    description:
      "I develop cross-platform mobile apps with Flutter, from user flows and API integration to offline-first experiences and production delivery.",
  },
  {
    title: "AI Solutions & Automation",
    description:
      "I integrate practical AI features and workflow automation where they create real value, including assistants, content tooling, and smart product capabilities.",
  },
  {
    title: "ContentLab",
    description:
      "ContentLab is my AI-powered content service and product offering for teams that need faster content workflows, idea generation, and content operations support.",
  },
  {
    title: "DevOps & Cloud Deployment",
    description:
      "I help teams ship reliably with CI/CD, cloud deployment, release automation, environment setup, and operational improvements for stable launches.",
  },
];

export const products = [
  {
    title: "ContentLab",
    eyebrow: "AI Product",
    description:
      "An AI-powered content workflow product for faster ideation, content generation, reuse, and publishing support.",
    href: "https://contentlab.danfordchris.dev/login",
    cta: "Get Started",
  },
  {
    title: "Blog",
    eyebrow: "Writing & Insights",
    description:
      "A dedicated place for engineering notes, product thinking, mobile development insights, and experiments worth sharing.",
    href: "/blog/",
    cta: "Visit Blog",
  },
];

/* ------------------------------------------------------------------ */

export type Role = {
  period: string;
  title: string;
  company: string;
  points: string[];
};

export const career: Role[] = [
  {
    period: "2025 — Present",
    title: "Mobile Engineer",
    company: "IPF Software",
    points: [
      "Contributed to the development of cross-platform mobile applications using Flutter.",
      "Collaborated with the UI/UX team to implement intuitive user flows.",
      "Integrated REST APIs for seamless communication with backend systems.",
    ],
  },
  {
    period: "2023 — Present",
    title: "Mobile Engineer, Quality Assurance",
    company: "Freelancing",
    points: [
      "Developed and maintained cross-platform mobile applications using Flutter for Android and iOS.",
      "Participated in code reviews to maintain clean, scalable, and maintainable codebases.",
      "Improved application performance and user experience.",
    ],
  },
  {
    period: "2023 — 2025",
    title: "Flutter Developer",
    company: "Ocean Tech Startup",
    points: [
      "Developed an e-commerce application using Flutter.",
      "Integrated Firebase for authentication, real-time database, and cloud storage.",
      "Improved application performance and user experience.",
    ],
  },
  {
    period: "2022 — 2023",
    title: "Backend Developer & DevOps Engineer",
    company: "Trilabs Limited",
    points: [
      "Developed custom web solutions and integrated AI-assisted capabilities.",
      "Integrated payment systems into an online transport booking platform.",
      "Built REST APIs to support a smooth booking experience across applications.",
      "Managed continuous integration and deployment workflows for faster delivery.",
    ],
  },
  {
    period: "2022 — 2024",
    title: "Web Designer",
    company: "Finhub Community",
    points: [
      "Developed custom web design solutions.",
      "Collaborated with organizations to build strong web experiences.",
      "Designed an e-commerce web app.",
    ],
  },
  {
    period: "2020 — 2021",
    title: "Web Developer & UI/UX Designer",
    company: "Software Development Club",
    points: [
      "Developed custom web design solutions.",
      "Designed an e-commerce web app.",
    ],
  },
];

/* ------------------------------------------------------------------ */

export type Category = "mobile" | "web" | "game";

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  category: Category[];
  /** shots shown in the detail view */
  shots: { id: string; title: string }[];
  featured?: boolean;
  /** card image — real screenshots recovered from the previous portfolio */
  image: string;
};

/** IPF OS modules, each with its web and mobile screen. */
export const ipfModules = [
  {
    id: "dashboard",
    name: "Dashboard",
    detail: "Operational visibility across every team",
    web: "/img/work/ipf-os/dashboard-web.jpg",
    mobile: "/img/work/ipf-os/dashboard-mobile.png",
  },
  {
    id: "meals",
    name: "Meals",
    detail: "Planning and daily catering workflows",
    web: "/img/work/ipf-os/meals-web.jpg",
    mobile: "/img/work/ipf-os/meals-mobile.png",
  },
  {
    id: "tasks",
    name: "Tasks",
    detail: "Assignment, tracking and completion states",
    web: "/img/work/ipf-os/tasks-web.jpg",
    mobile: "/img/work/ipf-os/tasks-mobile.png",
  },
  {
    id: "pmo",
    name: "PMO",
    detail: "Programme governance and process control",
    web: "/img/work/ipf-os/pmo-web.jpg",
    mobile: "/img/work/ipf-os/pmo-mobile.png",
  },
  {
    id: "users",
    name: "Users",
    detail: "Roles, permissions and access management",
    web: "/img/work/ipf-os/users-web.jpg",
    mobile: "/img/work/ipf-os/users-mobile.png",
  },
];

export const projects: Project[] = [
  {
    id: "ipf-os",
    image: "/img/work/ipf-os.png",
    title: "IPF OS (Enterprise Platform)",
    description:
      "A cross-platform enterprise operations system (web & mobile) designed for an InTech construction company to centralize core business functions. It manages meal planning, task management, user roles, and PMO workflows within a unified digital ecosystem. The platform improves operational visibility, coordination, and process control across teams through modular and scalable architecture.",
    tech: [
      "Flutter",
      "Dart",
      "Tanstack",
      "TypeScript",
      "Firebase",
      "SQLite",
      "REST API",
      "Server-Sent Events",
    ],
    category: ["web", "mobile"],
    featured: true,
    shots: [
      { id: "1", title: "Web Dashboard" },
      { id: "2", title: "Mobile Dashboard" },
      { id: "3", title: "Meals Mobile" },
      { id: "4", title: "Meals Web" },
      { id: "5", title: "Tasks Mobile" },
      { id: "6", title: "Tasks Web" },
      { id: "7", title: "PMO Mobile" },
      { id: "8", title: "PMO Web" },
      { id: "9", title: "User Management Mobile" },
      { id: "10", title: "User Management Web" },
    ],
  },
  {
    id: "bantu-soko",
    image: "/img/work/bantu-soko.jpg",
    title: "Bantu Soko App",
    description:
      "A mobile app that collects all important services like transport, event planning, and marketplace in one place, making it easier for users to access and use these services without the need to download multiple apps.",
    tech: ["Flutter", "Dart", "Firebase", "REST API"],
    link: "https://play.google.com/store/apps/details?id=tz.bantu.soko.android&pcampaignid=web_share",
    category: ["mobile"],
    shots: [{ id: "1", title: "Main Screen" }],
  },
  {
    id: "mealgro",
    image: "/img/work/mealgro.jpg",
    title: "MealGro App",
    description:
      "A mobile application that helps users plan their meals, create shopping lists, and reduce food waste by suggesting recipes based on available ingredients.",
    tech: ["React Native", "Firebase", "Nutrition API"],
    link: "https://drive.google.com/file/d/1uIJ9cKkGrLQGfLyRvkH__FP1HSAd1WMJ/view?usp=drive_link",
    category: ["mobile"],
    shots: [
      { id: "1", title: "Splash Screen" },
      { id: "2", title: "Feeds" },
      { id: "3", title: "Filters" },
      { id: "4", title: "Notifications" },
      { id: "5", title: "Settings" },
    ],
  },
  {
    id: "tumafast",
    image: "/img/work/tumafast.jpg",
    title: "Tumafast App",
    description:
      "A mobile application that connects users with local delivery services for quick and efficient package delivery within their city and outside their city at affordable rates.",
    tech: ["Flutter", "Dart", "Firebase", "Google Maps API"],
    link: "https://drive.google.com/file/d/1nMWR8w6lo4q1DkGNT3nwoGUBaWEirjPc/view?usp=drive_link",
    category: ["mobile"],
    shots: [{ id: "1", title: "Delivery Tracking" }],
  },
  {
    id: "ocean-ecommerce",
    image: "/img/work/ocean-ecommerce.jpg",
    title: "Ocean E-commerce",
    description:
      "An e-commerce app that links the manufacturer of the products down to the end-user, simplifying the marketing process.",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
    link: "https://play.google.com/store/apps/details?id=com.oceangroup.ocean&pcampaignid=web_share",
    category: ["web"],
    shots: [{ id: "1", title: "Store" }],
  },
  {
    id: "changisha",
    image: "/img/work/changisha.jpg",
    title: "Changisha App",
    description:
      "Changisha App is a crowdfunding platform designed to help individuals and groups raise money for various causes, such as medical expenses, education, community projects, and personal emergencies. It simplifies the fundraising process by allowing users to create campaigns, share them with potential donors, and receive contributions seamlessly through mobile money and digital payment methods.",
    tech: ["React", "Firebase", "Stripe", "Node.js"],
    link: "https://drive.google.com/file/d/1zeVK1_V666EJtbpkTck7kTSISwKu3Ocd/view?usp=drive_link",
    category: ["web"],
    shots: [{ id: "1", title: "Campaign View" }],
  },
  {
    id: "code-challenge",
    image: "/img/work/code-challenge.png",
    title: "Code Challenge App",
    description:
      "A Trello-like application that allows users to create boards, lists, and cards to organize their tasks and projects. The app provides a user-friendly interface for managing and collaborating on tasks, making it easier for teams to stay organized and productive.",
    tech: ["React", "Node.js", "MongoDB", "REST API"],
    category: ["web"],
    shots: [{ id: "1", title: "Board View" }],
  },
  {
    id: "nasafiri",
    image: "/img/work/nasafiri.png",
    title: "Nasafiri",
    description:
      "A web application aimed at reducing the hassle of transport booking, saving time for passengers, and offering insurance options.",
    tech: ["React", "Node.js", "Google Maps API", "Payment Gateway"],
    category: ["web"],
    shots: [{ id: "1", title: "Booking System" }],
  },
  {
    id: "cypherz",
    image: "/img/work/cypherz.jpg",
    title: "Cypherz",
    description:
      "An agriculture platform that eliminates the middleman in agricultural products, linking sellers and buyers directly.",
    tech: ["React", "Node.js", "PostgreSQL", "AWS"],
    category: ["web"],
    shots: [{ id: "1", title: "Marketplace" }],
  },
  {
    id: "stock-management",
    image: "/img/work/stock-management.jpg",
    title: "Stock Management",
    description:
      "A mobile application designed to manage inventory, notify the owner about stock levels, and suggest products to increase annual gains.",
    tech: ["Flutter", "Dart", "Firebase", "Notifications"],
    category: ["mobile"],
    shots: [{ id: "1", title: "Inventory Dashboard" }],
  },
  {
    id: "vikoba-plus",
    image: "/img/work/vikoba-plus.jpg",
    title: "Vikoba+",
    description:
      "A mobile app that simplifies money management for small-scale groups (Vikoba), making it easy to track expenses and income.",
    tech: ["Flutter", "Dart", "Firebase", "Charts"],
    category: ["mobile"],
    shots: [{ id: "1", title: "Finance Dashboard" }],
  },
  {
    id: "tetris-game",
    image: "/img/work/tetris-game.jpg",
    title: "Tetris Game",
    description:
      "A classic Tetris game built with the Flutter framework for mobile devices. The game features smooth controls, colorful graphics, and increasing difficulty levels to keep players engaged.",
    tech: ["Flutter", "Dart", "Game Development"],
    link: "https://drive.google.com/file/d/1nMWR8w6lo4q1DkGNT3nwoGUBaWEirjPc/view?usp=drive_link",
    category: ["game"],
    shots: [{ id: "1", title: "Gameplay" }],
  },
];

export const activities = [
  "Playing Games",
  "Learning new things in Technology",
  "Travelling",
  "Watching Movies",
  "Teaching people about technology",
];

export const contact = {
  heading: "Let's build it.",
  body: "Got a project waiting to be realized? Let's collaborate and make it happen!",
  fields: {
    name: { label: "Your Name", placeholder: "What's your name?" },
    email: { label: "Email / Phone", placeholder: "How can I reach you?" },
    message: {
      label: "Message",
      placeholder: "Send me any inquiries or questions",
    },
  },
};

/* derived ---------------------------------------------------------- */

export const stats = [
  { value: `${projects.length}+`, label: "shipped\nprojects" },
  { value: "5", label: "years\nbuilding" },
  { value: "6", label: "teams\nworked with" },
  { value: "3", label: "apps live in\nstores" },
];

/** every tech mentioned anywhere, de-duplicated — drives the marquee */
export const allTech = Array.from(
  new Set([...expertise.flatMap((e) => e.stack), ...projects.flatMap((p) => p.tech)]),
);
