export const profile = {
  name: "Rosdeb Koch",
  initials: "RK",
  avatar: "/profile.jpeg",
  title: "Senior Mobile & Cross-Platform Software Engineer",
  shortTitle: "Senior Mobile Engineer",
  email: "rosdevkoch@gmail.com",
  github: "https://github.com/Rosdeb",
  linkedin: "https://linkedin.com/in/rosdev-koch-260005324/",
  status: "Available for select mobile and full-stack contracts",
  summary:
    "Rosdeb Koch builds production mobile apps and the tooling around them. The work spans Flutter, native iOS (Swift/SwiftUI), Android (Kotlin/Java), and Next.js — from real-time chat and payments to hardware links such as BLE.",
  goals:
    "Select contract work on mobile products that need to ship: cross-platform apps, store releases, and the developer tools that keep those apps moving.",
  numbers: [
    { label: "Projects", value: "19" },
    { label: "SparkTech roles", value: "4" },
    { label: "Stacks", value: "Flutter · iOS · Android" },
  ],
};

export type ProjectLink = {
  label: string;
  url: string;
  type: "appstore" | "playstore" | "web" | "github";
};

export type Project = {
  id: string;
  name: string;
  year: string;
  earlier?: boolean;
  categories: string[];
  folder: "Mobile Apps" | "Developer Tools" | "Web & Culture";
  tags: string[];
  summary: string;
  features: string[];
  links: ProjectLink[];
  screenshots?: string[];
};

export const projects: Project[] = [
  {
    id: "simulation-tray",
    name: "Simulation Tray",
    year: "2025–2026",
    categories: ["Tools"],
    folder: "Developer Tools",
    tags: ["tooling", "mobile", "devtools"],
    summary: "A developer tool for exercising mobile flows without a full device lab.",
    features: ["Local simulation of app flows", "Built as part of the developer-tooling practice"],
    links: [],
    screenshots: ["/tray_screen_1.png", "/tray_screen_2.png", "/tray_screen_3.png", "/tray_screen_4.png"],
  },
  {
    id: "givano",
    name: "Givano",
    year: "November 2026",
    categories: ["Flutter", "iOS & Android"],
    folder: "Mobile Apps",
    tags: ["flutter", "getx", "socket.io", "firebase", "chat", "real-time"],
    summary:
      "Community peer-to-peer item sharing and giveaway app connecting donors with local recipients.",
    features: ["Discovery feed", "Multi-image listings", "Real-time socket chat", "Pickup coordination"],
    links: [
      { label: "App Store", url: "https://apps.apple.com/us/app/givano/id6816919732", type: "appstore" },
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.givano.application", type: "playstore" },
    ],
    screenshots: ["/givano_1.webp", "/givano_2.webp", "/givano_3.webp", "/givano_4.webp"],
  },
  {
    id: "ayudame",
    name: "Ayudame Service Provider",
    year: "2025–2026",
    categories: ["Flutter", "iOS & Android"],
    folder: "Mobile Apps",
    tags: ["flutter", "marketplace", "services"],
    summary: "A service-provider app for people who need local help and the pros who offer it.",
    features: ["Provider-side workflows", "Mobile client for iOS and Android"],
    links: [],
    screenshots: ["/device_connection.jpeg", "/coin_mangement.jpeg"],
  },
  {
    id: "appicon-studio",
    name: "AppIcon Studio",
    year: "2025–2026",
    categories: ["Tools", "Web"],
    folder: "Developer Tools",
    tags: ["icons", "app store", "tooling", "next.js"],
    summary: "A studio for generating and checking app icons before they go to the stores.",
    features: ["Icon production workflow", "Public site at appicon.site"],
    links: [{ label: "Website", url: "https://appicon.site", type: "web" }],
    screenshots: ["/appicon_preview.png"],
  },
  {
    id: "korot",
    name: "Korot",
    year: "2025–2026",
    categories: ["Web"],
    folder: "Web & Culture",
    tags: ["web", "next.js"],
    summary: "A live web product at korot.site.",
    features: ["Public website"],
    links: [{ label: "Website", url: "https://korot.site", type: "web" }],
    screenshots: ["/korot_logo.png"],
  },
  {
    id: "wuffoos",
    name: "Wuffoos",
    year: "2025–2026",
    categories: ["Flutter", "iOS & Android"],
    folder: "Mobile Apps",
    tags: ["flutter", "pets"],
    summary: "A consumer mobile product with a public site at wuffoos.com.",
    features: ["Mobile app", "Public website"],
    links: [{ label: "Website", url: "https://wuffoos.com", type: "web" }],
    screenshots: ["/petcare_7.jpeg", "/petcare_2.jpeg", "/petcare_1.jpeg", "/petcare_4.jpeg", "/petcare_5.jpeg", "/petcare_6.jpeg"],
  },
  {
    id: "titra",
    name: "Titra",
    year: "2025–2026",
    categories: ["Flutter", "iOS & Android"],
    folder: "Mobile Apps",
    tags: ["flutter", "mobile"],
    summary: "A mobile product in the SparkTech catalog.",
    features: ["Cross-platform mobile client"],
    links: [],
    screenshots: ["/device_connect_screen.jpeg"],
  },
  {
    id: "tradelmt",
    name: "TradeLMT",
    year: "2025–2026",
    categories: ["Web"],
    folder: "Web & Culture",
    tags: ["web", "trading"],
    summary: "A web product in the trade space.",
    features: ["Web client"],
    links: [],
    screenshots: ["/tradelmt_hero.webp"],
  },
  {
    id: "saferadar",
    name: "SafeRadar",
    year: "2025–2026",
    categories: ["Flutter", "iOS & Android"],
    folder: "Mobile Apps",
    tags: ["flutter", "maps", "safety"],
    summary: "A safety-oriented product with a public site at saferadar.net.",
    features: ["Mobile experience", "Public website"],
    links: [{ label: "Website", url: "https://saferadar.net", type: "web" }],
    screenshots: ["/saferadar-splash.png", "/saferadar-welcome.png", "/saferadar-home.png", "/saferadar-map.png", "/saferadar-location.png"],
  },
  {
    id: "koko",
    name: "Koko App",
    year: "2025–2026",
    categories: ["Flutter", "iOS & Android"],
    folder: "Mobile Apps",
    tags: ["flutter", "ble", "hardware", "iot"],
    summary: "A mobile app with hardware-adjacent work (BLE and device tooling show up in this practice).",
    features: ["Mobile client", "Public site at kokocreates.com"],
    links: [{ label: "Website", url: "https://kokocreates.com", type: "web" }],
    screenshots: ["/koko_dashboard.jpeg", "/koko_light_controll.jpeg", "/koko_story_generation.jpeg", "/koko_settings.jpeg", "/koko_profile_update.jpeg", "/koko_1.jpeg"],
  },
  {
    id: "parkelo",
    name: "Parkelo",
    year: "2025–2026",
    categories: ["Flutter", "iOS & Android"],
    folder: "Mobile Apps",
    tags: ["flutter", "maps", "parking"],
    summary: "A parking-related mobile product.",
    features: ["Location-aware mobile flows"],
    links: [],
    screenshots: ["/device_connection.jpeg"],
  },
  {
    id: "shopreal",
    name: "Shopreal",
    year: "2025–2026",
    categories: ["Flutter", "iOS & Android"],
    folder: "Mobile Apps",
    tags: ["flutter", "commerce", "payments"],
    summary: "A commerce mobile product.",
    features: ["Shopping flows on mobile"],
    links: [],
    screenshots: ["/home_screen.jpeg", "/product_details.jpeg", "/card.jpeg", "/profile.jpeg"],
  },
  {
    id: "koukoutsa",
    name: "Koukoutsa",
    year: "2025–2026",
    categories: ["Flutter", "iOS & Android"],
    folder: "Mobile Apps",
    tags: ["flutter", "mobile"],
    summary: "A mobile app in the shipped catalog.",
    features: ["Cross-platform client"],
    links: [],
    screenshots: ["/Onboarding.png", "/Sign Up.png", "/Home.png", "/All Classes.png", "/Class Details.png", "/Class Details (1).png", "/My Profile.png"],
  },
  {
    id: "wellbyn",
    name: "Wellbyn",
    year: "2025–2026",
    categories: ["Flutter", "iOS & Android", "Web"],
    folder: "Mobile Apps",
    tags: ["flutter", "health", "web"],
    summary: "A wellness product with a public site at wellbyn.ai.",
    features: ["Mobile product", "Public website"],
    links: [{ label: "Website", url: "https://wellbyn.ai", type: "web" }],
    screenshots: ["/patecare_3.jpeg"],
  },
  {
    id: "koch-heritage",
    name: "Koch Heritage",
    year: "2025–2026",
    categories: ["Web"],
    folder: "Web & Culture",
    tags: ["web", "culture"],
    summary: "A culture and heritage web project.",
    features: ["Editorial web experience"],
    links: [],
    screenshots: ["/placeholder.jpg"],
  },
  {
    id: "legier",
    name: "LEG!ER Global News",
    year: "2025–2026",
    categories: ["Flutter", "iOS & Android"],
    folder: "Mobile Apps",
    tags: ["flutter", "news", "media"],
    summary: "A global news mobile product.",
    features: ["News reading experience"],
    links: [],
    screenshots: ["/legier-home.webp", "/legier-video.webp", "/legier-newspapers.png", "/legier-news-details.png", "/legier-more.png"],
  },
  {
    id: "riptide",
    name: "Riptide Rentals",
    year: "2025–2026",
    categories: ["Flutter", "iOS & Android", "Web"],
    folder: "Mobile Apps",
    tags: ["flutter", "rentals", "maps"],
    summary: "A rentals product with a public site at riptiderentals.com.",
    features: ["Rental booking flows", "Public website"],
    links: [{ label: "Website", url: "https://riptiderentals.com", type: "web" }],
    screenshots: ["/riptide-rentals-map.webp", "/riptide-rentals-points.webp", "/0x0ss.png"],
  },
  {
    id: "rentalvate",
    name: "Rentalvate",
    year: "2022",
    earlier: true,
    categories: ["iOS & Android"],
    folder: "Mobile Apps",
    tags: ["rentals", "personal", "earlier"],
    summary: "Earlier personal work, dated 2022 — before the SparkTech timeline that starts in June 2025.",
    features: ["Personal / earlier project", "Kept separate from the agency timeline"],
    links: [],
    screenshots: ["/device_connection.jpeg"],
  },
  {
    id: "mom-app",
    name: "The Mom App",
    year: "2022",
    earlier: true,
    categories: ["iOS & Android", "Web"],
    folder: "Mobile Apps",
    tags: ["personal", "earlier", "family"],
    summary: "Earlier personal work (2022) with a public site at themom.app. Not part of the June 2025 agency start.",
    features: ["Personal / earlier project", "Public website"],
    links: [{ label: "Website", url: "https://themom.app", type: "web" }],
    screenshots: ["/Onboarding.png", "/Home.png"],
  },
];

export const experience = [
  {
    id: "senior",
    role: "Senior Mobile App Developer",
    org: "SparkTech Agency",
    dates: "Jul 2026 – Present",
    summary: "Leads mobile delivery across Flutter and native clients, store releases, and the tooling that supports them.",
  },
  {
    id: "mobile",
    role: "Mobile App Developer",
    org: "SparkTech Agency",
    dates: "Jan 2026 – Jul 2026",
    summary: "Shipped mobile features end to end: client UI, APIs, and release work on App Store Connect and Play Console.",
  },
  {
    id: "junior",
    role: "Junior Flutter Developer",
    org: "SparkTech Agency",
    dates: "Aug 2025 – Jan 2026",
    summary: "Built Flutter features with GetX and Riverpod, including real-time and Firebase-backed flows.",
  },
  {
    id: "trainee",
    role: "Trainee Flutter Developer",
    org: "SparkTech Agency",
    dates: "Jun 2025 – Aug 2025",
    summary: "Started the agency timeline. Learned the product codebase and shipped first Flutter changes.",
  },
];

export const skillGroups = [
  {
    id: "flutter",
    name: "Flutter & Dart",
    items: ["Flutter", "Dart", "GetX", "Riverpod"],
  },
  {
    id: "ios",
    name: "iOS (Swift / SwiftUI)",
    items: ["Swift", "SwiftUI", "StoreKit", "App Store Connect"],
  },
  {
    id: "android",
    name: "Android (Kotlin / Java)",
    items: ["Kotlin", "Java", "Play Console", "Google Play Billing"],
  },
  {
    id: "realtime",
    name: "Real-time & Cloud",
    items: ["Firebase", "Socket.io", "WebRTC", "REST", "JWT"],
  },
  {
    id: "payments",
    name: "Payments",
    items: ["RevenueCat", "Stripe", "StoreKit", "Google Play Billing"],
  },
  {
    id: "hardware",
    name: "Hardware & IoT",
    items: ["BLE", "Wi-Fi FTP", "scrcpy", "ADB"],
  },
  {
    id: "tooling",
    name: "Tooling & DevOps",
    items: ["CI/CD", "Next.js", "Mapbox", "Google Maps", "ARCore"],
  },
];

export const sites = [
  { name: "Korot", url: "https://korot.site" },
  { name: "AppIcon Studio", url: "https://appicon.site" },
  { name: "Wuffoos", url: "https://wuffoos.com" },
  { name: "SafeRadar", url: "https://saferadar.net" },
  { name: "Koko", url: "https://kokocreates.com" },
  { name: "Wellbyn", url: "https://wellbyn.ai" },
  { name: "The Mom App", url: "https://themom.app" },
  { name: "Riptide Rentals", url: "https://riptiderentals.com" },
];

export type FsNode =
  | { type: "folder"; id: string; name: string; children: FsNode[] }
  | { type: "file"; id: string; name: string; kind: "project" | "note" | "experience" | "skill"; ref: string };

export const fsRoot: FsNode = {
  type: "folder",
  id: "root",
  name: "Rosdeb OS",
  children: [
    {
      type: "folder",
      id: "about",
      name: "About Me",
      children: [
        { type: "file", id: "profile", name: "Personal Profile", kind: "note", ref: "profile" },
        { type: "file", id: "summary", name: "Professional Summary", kind: "note", ref: "summary" },
        { type: "file", id: "goals", name: "Career Goals", kind: "note", ref: "goals" },
        { type: "file", id: "readme", name: "README.md", kind: "note", ref: "readme" },
      ],
    },
    {
      type: "folder",
      id: "experience",
      name: "Experience",
      children: [
        { type: "file", id: "spark", name: "SparkTech Agency", kind: "note", ref: "spark" },
        ...experience.map((e) => ({
          type: "file" as const,
          id: e.id,
          name: `${e.role}`,
          kind: "experience" as const,
          ref: e.id,
        })),
      ],
    },
    {
      type: "folder",
      id: "projects",
      name: "Projects",
      children: [
        {
          type: "folder",
          id: "mobile-apps",
          name: "Mobile Apps",
          children: projects
            .filter((p) => p.folder === "Mobile Apps")
            .map((p) => ({ type: "file" as const, id: p.id, name: p.name, kind: "project" as const, ref: p.id })),
        },
        {
          type: "folder",
          id: "dev-tools",
          name: "Developer Tools",
          children: projects
            .filter((p) => p.folder === "Developer Tools")
            .map((p) => ({ type: "file" as const, id: p.id, name: p.name, kind: "project" as const, ref: p.id })),
        },
        {
          type: "folder",
          id: "web-culture",
          name: "Web & Culture",
          children: projects
            .filter((p) => p.folder === "Web & Culture")
            .map((p) => ({ type: "file" as const, id: p.id, name: p.name, kind: "project" as const, ref: p.id })),
        },
      ],
    },
    {
      type: "folder",
      id: "skills",
      name: "Skills",
      children: skillGroups.map((g) => ({
        type: "file" as const,
        id: g.id,
        name: g.name,
        kind: "skill" as const,
        ref: g.id,
      })),
    },
    {
      type: "folder",
      id: "education",
      name: "Education",
      children: [
        { type: "file", id: "edu-note", name: "Credentials", kind: "note", ref: "education" },
      ],
    },
    {
      type: "folder",
      id: "documents",
      name: "Documents",
      children: [{ type: "file", id: "cv", name: "Rosdeb_Koch_CV", kind: "note", ref: "cv" }],
    },
    {
      type: "folder",
      id: "contact",
      name: "Contact",
      children: [
        { type: "file", id: "email", name: "Email", kind: "note", ref: "email" },
        { type: "file", id: "linkedin", name: "LinkedIn", kind: "note", ref: "linkedin" },
        { type: "file", id: "github", name: "GitHub", kind: "note", ref: "github" },
      ],
    },
  ],
};

export function findFolder(path: string[]): FsNode | undefined {
  let node: FsNode = fsRoot;
  for (const part of path) {
    if (node.type !== "folder") return undefined;
    const next = node.children.find((c) => c.name === part);
    if (!next) return undefined;
    node = next;
  }
  return node;
}

export function notes(ref: string): { title: string; body: string } {
  const map: Record<string, { title: string; body: string }> = {
    profile: {
      title: "Personal Profile",
      body: `${profile.name}\n${profile.title}\n\n${profile.status}\n\nEmail: ${profile.email}\nGitHub: github.com/Rosdeb\nLinkedIn: linkedin.com/in/rosdev-koch-260005324/`,
    },
    summary: { title: "Professional Summary", body: profile.summary },
    goals: { title: "Career Goals", body: profile.goals },
    readme: {
      title: "README.md",
      body: "Welcome to Rosdeb OS.\n\nThis desktop is a portfolio. Double-click a folder to look around. Press Ctrl or Cmd + K to search. The dock opens Finder, Safari, Terminal, Mail, and Settings.\n\nRecruiters: the Welcome window has the role, the numbers, and a way to write.",
    },
    spark: {
      title: "SparkTech Agency",
      body: "Agency timeline starts June 2025.\n\nTrainee Flutter Developer (Jun–Aug 2025)\nJunior Flutter Developer (Aug 2025–Jan 2026)\nMobile App Developer (Jan–Jul 2026)\nSenior Mobile App Developer (Jul 2026–Present)\n\nRentalvate and The Mom App are earlier personal work from 2022 and are labeled that way.",
    },
    education: {
      title: "Credentials",
      body: "Formal education is not listed here until the institution and years are confirmed. Ask Rosdeb directly — do not treat any diploma line from older drafts as fact.",
    },
    cv: {
      title: "Rosdeb Koch — CV",
      body: `${profile.name}\n${profile.title}\n${profile.email}\n\nExperience — SparkTech Agency, from June 2025 to present (trainee → senior).\n\nProjects — 19, spanning mobile apps, developer tools, and web. Two of them (Rentalvate, The Mom App) are earlier personal work from 2022.\n\nSkills — Flutter/Dart, Swift/SwiftUI, Kotlin/Java, Firebase, Socket.io, WebRTC, payments (RevenueCat, Stripe, StoreKit), BLE, Next.js.\n\nA printable file can be requested by email.`,
    },
    email: { title: "Email", body: profile.email },
    linkedin: { title: "LinkedIn", body: profile.linkedin },
    github: { title: "GitHub", body: profile.github },
  };
  return map[ref] ?? { title: ref, body: "No note on file." };
}

export type SearchHit = {
  id: string;
  kind: string;
  title: string;
  subtitle: string;
  keywords: string;
  action: "project" | "experience" | "skill" | "mail" | "finder" | "safari" | "terminal" | "settings" | "note" | "url";
  ref: string;
};

export function searchIndex(): SearchHit[] {
  const hits: SearchHit[] = [
    { id: "about", kind: "Answer", title: "Who is Rosdeb", subtitle: profile.title, keywords: "who about bio rosdeb hire", action: "note", ref: "profile" },
    { id: "mail", kind: "App", title: "Contact", subtitle: profile.email, keywords: "contact email hire mail", action: "mail", ref: "" },
    { id: "finder", kind: "App", title: "Finder", subtitle: "Browse the disk", keywords: "finder files folders", action: "finder", ref: "" },
    { id: "term", kind: "App", title: "Terminal", subtitle: "Text commands", keywords: "terminal shell", action: "terminal", ref: "" },
    { id: "safari", kind: "App", title: "Safari", subtitle: "Live sites", keywords: "safari browser sites", action: "safari", ref: "" },
    { id: "settings", kind: "App", title: "Settings", subtitle: "Theme and motion", keywords: "settings theme dark", action: "settings", ref: "" },
    { id: "cv", kind: "Document", title: "CV", subtitle: "Resume summary", keywords: "cv resume pdf", action: "note", ref: "cv" },
    { id: "gh", kind: "Link", title: "GitHub", subtitle: "github.com/Rosdeb", keywords: "github code", action: "url", ref: profile.github },
    { id: "li", kind: "Link", title: "LinkedIn", subtitle: "Rosdeb Koch", keywords: "linkedin", action: "url", ref: profile.linkedin },
    { id: "expf", kind: "Folder", title: "Experience", subtitle: "SparkTech timeline", keywords: "experience work job sparktech", action: "finder", ref: "Experience" },
    { id: "projf", kind: "Folder", title: "Projects", subtitle: "19 projects", keywords: "projects apps portfolio", action: "finder", ref: "Projects" },
    { id: "live", kind: "Folder", title: "Live sites", subtitle: "Open Safari", keywords: "published live apps websites", action: "safari", ref: "" },
    { id: "flutter", kind: "Folder", title: "Flutter projects", subtitle: "Mobile Apps folder", keywords: "flutter dart projects", action: "finder", ref: "Projects/Mobile Apps" },
  ];
  for (const p of projects) {
    hits.push({
      id: p.id,
      kind: "Project",
      title: p.name,
      subtitle: `${p.year} · ${p.folder}`,
      keywords: `${p.name} ${p.tags.join(" ")} ${p.summary}`,
      action: "project",
      ref: p.id,
    });
  }
  for (const e of experience) {
    hits.push({
      id: e.id,
      kind: "Experience",
      title: e.role,
      subtitle: e.dates,
      keywords: `${e.role} ${e.org} experience work`,
      action: "experience",
      ref: e.id,
    });
  }
  for (const g of skillGroups) {
    hits.push({
      id: g.id,
      kind: "Skill",
      title: g.name,
      subtitle: g.items.join(", "),
      keywords: `${g.name} ${g.items.join(" ")} skills payments ble iot stripe`,
      action: "skill",
      ref: g.id,
    });
  }
  return hits;
}
