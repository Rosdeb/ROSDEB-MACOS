export const profile = {
  name: "Rosdeb Koch",
  initials: "RK",
  avatar: "/profile.jpeg",
  title: "Senior Mobile & Cross-Platform Software Engineer",
  shortTitle: "Senior Mobile Engineer",
  email: "rosdevkoch@gmail.com",
  phone: "+88 01925609656",
  dob: "2007-01-12",
  location: "Dhaka, Bangladesh",
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
    name: "Simulation Tray (Tray)",
    year: "2026",
    categories: ["Tools", "Flutter"],
    folder: "Developer Tools",
    tags: ["flutter-desktop", "macos", "windows", "scrcpy", "devtools", "adb"],
    summary:
      "A lightweight, studio-free Android device & emulator workstation for Windows and macOS. Decouples Android emulation from heavy IDEs, slashing RAM from 6GB+ down to ~85MB with low-latency 60+ FPS scrcpy screen mirroring, live filtered Logcat, and wireless ADB.",
    features: [
      "Low-latency 60+ FPS scrcpy screen mirroring",
      "Real-time filtered Logcat & telemetry sparklines",
      "Wireless ADB & system tray quick controls",
      "Slashing memory footprint from 6GB+ down to ~85MB (<1s startup)",
    ],
    links: [
      { label: "GitHub Releases", url: "https://github.com/Rosdeb/Tray/releases/tag/v1.3.4", type: "github" },
    ],
    screenshots: ["/tray_screen_1.png", "/tray_screen_2.png", "/tray_screen_3.png", "/tray_screen_4.png"],
  },
  {
    id: "givano",
    name: "Givano",
    year: "Nov 2026",
    categories: ["Flutter", "iOS & Android"],
    folder: "Mobile Apps",
    tags: ["flutter", "getx", "socket.io", "firebase", "chat", "community"],
    summary:
      "Community peer-to-peer item sharing and giveaway mobile app built with Flutter and GetX. Connects donors with local recipients via real-time socket chat, interactive discovery feeds, and pickup coordination.",
    features: [
      "Real-time Socket.io chat & pickup coordination",
      "Interactive discovery feed & multi-image listings",
      "GetX reactive architecture & Firebase backend",
      "Published on Google Play and Apple App Store",
    ],
    links: [
      { label: "App Store", url: "https://apps.apple.com/us/app/givano/id6816919732", type: "appstore" },
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.givano.application", type: "playstore" },
    ],
    screenshots: ["/givano_1.webp", "/givano_2.webp", "/givano_3.webp", "/givano_4.webp"],
  },
  {
    id: "ayudame",
    name: "Ayudame Service Provider",
    year: "July 2026",
    categories: ["Flutter", "iOS & Android"],
    folder: "Mobile Apps",
    tags: ["flutter", "arcore", "maps-api", "marketplace", "services"],
    summary:
      "Ayudame Service Provider helps service professionals manage bookings, connect with customers, track jobs, and grow their business efficiently from a single unified mobile app.",
    features: [
      "Service booking management & job tracking",
      "Integrated Maps API & customer messaging",
      "ARCore augmented reality features",
      "Live on Apple App Store & Google Play Store",
    ],
    links: [
      { label: "App Store", url: "https://apps.apple.com/us/app/ayudame/id6772288218", type: "appstore" },
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.lavell.ayudame", type: "playstore" },
      { label: "GitHub", url: "https://github.com/Rosdeb/Ayudame", type: "github" },
    ],
    screenshots: ["/device_connection.jpeg", "/coin_mangement.jpeg"],
  },
  {
    id: "appicon-studio",
    name: "AppIcon Studio",
    year: "2026",
    categories: ["Tools", "Web"],
    folder: "Developer Tools",
    tags: ["next.js", "app-icons", "ios", "android", "design-utility"],
    summary:
      "Free online app icon generator utility for developers and designers. Upload a single 1024x1024 master image to instantly preview, customize, and export all required icon assets and asset catalogs for iOS, Android, macOS, and Windows.",
    features: [
      "Single-upload 1024x1024 generator",
      "Instant iOS, Android, macOS, and Windows asset exports",
      "Live icon corner radius and device mockup preview",
      "Live utility hosted at appicon.site",
    ],
    links: [{ label: "Website", url: "https://www.appicon.site/", type: "web" }],
    screenshots: ["/appicon_preview.png"],
  },
  {
    id: "korot",
    name: "Korot",
    year: "2026",
    categories: ["Web"],
    folder: "Web & Culture",
    tags: ["next.js", "linguistics", "indigenous", "cultural-heritage"],
    summary:
      "An open digital platform dedicated to preserving and exploring Indigenous languages. Features multi-script support, searchable vocabularies, audio pronunciations, and community-driven collections.",
    features: [
      "Multi-script support & searchable vocabularies",
      "Audio pronunciations & community archives",
      "Responsive typography & indigenous language preservation",
      "Live portal hosted at korot.site",
    ],
    links: [{ label: "Website", url: "https://korot.site/", type: "web" }],
    screenshots: ["/korot_logo.png"],
  },
  {
    id: "wuffoos",
    name: "Wuffoos",
    year: "May 2026",
    categories: ["Flutter", "iOS & Android"],
    folder: "Mobile Apps",
    tags: ["flutter", "firebase", "google-maps", "live-tracking", "location-sharing"],
    summary:
      "Wuffoos helps pet owners find available dog or cat sitters near them, and lets animal lovers register as sitters to earn extra income flexibly. Includes live tracking and location sharing so owners can follow along while their pet is in care.",
    features: [
      "Real-time Google Maps live pet GPS tracking",
      "Pet sitter booking, reviews & calendar scheduling",
      "Firebase Auth, Firestore & Cloud Messaging",
      "Published on Apple App Store & Google Play Store",
    ],
    links: [
      { label: "App Store", url: "https://apps.apple.com/us/app/wuffoos/id6761444819", type: "appstore" },
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.wuffoos.app", type: "playstore" },
      { label: "Website", url: "https://wuffoos.com/", type: "web" },
    ],
    screenshots: ["/petcare_7.jpeg", "/petcare_2.jpeg", "/petcare_1.jpeg", "/petcare_4.jpeg", "/petcare_5.jpeg", "/petcare_6.jpeg"],
  },
  {
    id: "titra",
    name: "Titra",
    year: "March 2026",
    categories: ["Flutter", "iOS & Android"],
    folder: "Mobile Apps",
    tags: ["flutter", "webrtc", "video-call", "audio-call", "real-time"],
    summary:
      "Titra is a mobile app for real-time WebRTC audio and video calls. Each user gets a unique 10-digit number, and calls connect peer-to-peer end-to-end using that number.",
    features: [
      "Peer-to-peer WebRTC audio and video streaming",
      "Unique 10-digit calling number allocation",
      "Low-latency call signaling & connection management",
    ],
    links: [],
    screenshots: ["/device_connect_screen.jpeg"],
  },
  {
    id: "tradelmt",
    name: "TradeLMT",
    year: "2025",
    categories: ["Web"],
    folder: "Web & Culture",
    tags: ["next.js", "trading", "fintech", "dark-mode"],
    summary:
      "High-performance trading platform web portal for futures and derivatives trading. Features zero account minimums, broker connectivity, live market telemetry previews, and responsive dark-mode layouts.",
    features: [
      "Live market telemetry & broker connectivity",
      "Dark-mode optimized responsive portal",
      "Interactive onboarding flows",
    ],
    links: [
      { label: "Live Portal", url: "https://trading-platform-landing-page-rose.vercel.app/", type: "web" },
      { label: "GitHub", url: "https://github.com/rosdeb/TradeLMT", type: "github" },
    ],
    screenshots: ["/tradelmt_hero.webp"],
  },
  {
    id: "saferadar",
    name: "SafeRadar",
    year: "2025",
    categories: ["Flutter", "iOS & Android"],
    folder: "Mobile Apps",
    tags: ["ios", "android", "real-time", "emergency", "safety", "maps"],
    summary:
      "SafeRadar is a real-time safety assistance app that connects people who need help with compassionate volunteers ready to provide support, putting an immediate safety network at users' fingertips.",
    features: [
      "One-tap emergency broadcast & location sharing",
      "Volunteer dispatch & live map tracking",
      "Real-time notifications & trusted contact alerts",
      "Live on Apple App Store & Google Play Store",
    ],
    links: [
      { label: "App Store", url: "https://apps.apple.com/us/app/saferadar/id6758638644", type: "appstore" },
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.saferadar.net", type: "playstore" },
      { label: "Website", url: "https://www.saferadar.net/", type: "web" },
    ],
    screenshots: ["/saferadar-splash.png", "/saferadar-welcome.png", "/saferadar-home.png", "/saferadar-map.png", "/saferadar-location.png"],
  },
  {
    id: "koko",
    name: "Koko App",
    year: "2025",
    categories: ["Flutter", "iOS & Android"],
    folder: "Mobile Apps",
    tags: ["android", "ios", "iot", "ble", "wifi-ftp", "hardware-control"],
    summary:
      "Koko App is a mobile device-control project for managing connected hardware from one place, including light control, volume adjustment, alarms, screen lock, sleep timers, Wi-Fi FTP file-system transfer, classic media playback, and BLE-based device communication.",
    features: [
      "Bluetooth Low Energy (BLE) peripheral control",
      "Wi-Fi FTP local filesystem transfers",
      "Smart light control, volume, alarms, and sleep timers",
      "Published on Apple App Store",
    ],
    links: [
      { label: "App Store", url: "https://apps.apple.com/app/koko-creates/id6759178175", type: "appstore" },
      { label: "Website", url: "https://kokocreates.com/", type: "web" },
    ],
    screenshots: ["/koko_dashboard.jpeg", "/koko_light_controll.jpeg", "/koko_story_generation.jpeg", "/koko_settings.jpeg", "/koko_profile_update.jpeg", "/koko_1.jpeg"],
  },
  {
    id: "parkelo",
    name: "Parkelo",
    year: "2025",
    categories: ["Flutter", "iOS & Android"],
    folder: "Mobile Apps",
    tags: ["parking", "flutter", "iot", "location-services"],
    summary:
      "Smart parking management and booking system designed to simplify parking space discovery, real-time slot reservation, ticketless check-in, and automated parking fee management for drivers and parking operators.",
    features: [
      "Real-time parking spot discovery & reservation",
      "Automated fee calculation & ticketless check-in",
      "IoT sensor integration & location services",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/Rosdeb/Parkelo", type: "github" },
    ],
    screenshots: ["/device_connection.jpeg"],
  },
  {
    id: "shopreal",
    name: "Shopreal",
    year: "2025",
    categories: ["Flutter", "iOS & Android"],
    folder: "Mobile Apps",
    tags: ["ai", "e-commerce", "product-validation", "dropshipping"],
    summary:
      "Shopreal helps sellers validate products from an image or product link, checking whether an item looks trustworthy, has strong market potential, and is a good fit for dropshipping before spending time or money promoting it.",
    features: [
      "Image & URL-based product validation",
      "Market feasibility & trust analysis",
      "Dropshipping product scorecard",
    ],
    links: [],
    screenshots: ["/home_screen.jpeg", "/product_details.jpeg", "/card.jpeg", "/profile.jpeg"],
  },
  {
    id: "koukoutsa",
    name: "Koukoutsa",
    year: "July 2025",
    categories: ["Flutter", "iOS & Android"],
    folder: "Mobile Apps",
    tags: ["flutter", "attendance", "sms-alerts", "education"],
    summary:
      "Smart student attendance management app for schools, coaching centers, and training institutes. Simplifies tracking presence, absence, and leave, automatically dispatching SMS notifications to parents when a student is not present.",
    features: [
      "One-tap classroom presence & absence tracking",
      "Automated parent SMS absence dispatch",
      "Attendance reporting & leave management",
      "Live on Google Play Store",
    ],
    links: [
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.niki.koukoutsa", type: "playstore" },
    ],
    screenshots: ["/Onboarding.png", "/Sign Up.png", "/Home.png", "/All Classes.png", "/Class Details.png", "/Class Details (1).png", "/My Profile.png"],
  },
  {
    id: "wellbyn",
    name: "Wellbyn",
    year: "June 2025",
    categories: ["Flutter", "iOS & Android", "Web"],
    folder: "Mobile Apps",
    tags: ["flutter", "websocket", "firebase", "telehealth"],
    summary:
      "Healthcare management platform that enables patients to book appointments, receive medication reminders, securely store medical records, manage insurance, and automatically reschedule appointments while helping doctors streamline patient care.",
    features: [
      "Doctor appointment scheduling & automated reminders",
      "Secure digital medical record & insurance vault",
      "Real-time WebSocket notifications",
      "Public portal at wellbyn.ai",
    ],
    links: [{ label: "Website", url: "https://www.wellbyn.ai/", type: "web" }],
    screenshots: ["/patecare_3.jpeg"],
  },
  {
    id: "koch-heritage",
    name: "Koch Heritage",
    year: "2025",
    categories: ["Web"],
    folder: "Web & Culture",
    tags: ["next.js", "cultural-heritage", "editorial", "responsive"],
    summary:
      "An editorial one-page cultural website dedicated to the history, indigenous traditions, art, and heritage of the Koch people. Built with fluid animations, responsive typography, and archival storytelling.",
    features: [
      "Editorial storytelling & historical archive",
      "Responsive layout & fluid typography",
      "Open-source repository on GitHub",
    ],
    links: [
      { label: "Website", url: "https://koch-people-one-page-website.vercel.app/", type: "web" },
      { label: "GitHub", url: "https://github.com/Rosdeb/Tintekiya_Koch_Website", type: "github" },
    ],
    screenshots: ["/placeholder.jpg"],
  },
  {
    id: "legier",
    name: "LEG!ER Global News",
    year: "2024",
    categories: ["Flutter", "iOS & Android"],
    folder: "Mobile Apps",
    tags: ["flutter", "live-news", "multilingual", "audio-reader"],
    summary:
      "LEG!ER GLOBAL NEWS brings together 115 newspapers from around the world, including 72 live online publications, with breaking headlines, video reports, multilingual content, and article listening in one global news experience.",
    features: [
      "115 international newspaper feeds & 72 live sources",
      "Multilingual translation & audio article listening",
      "Video reports & breaking news push notifications",
      "Published on Apple App Store & Google Play Store",
    ],
    links: [
      { label: "App Store", url: "https://apps.apple.com/au/app/legier-global-news/id6756674261", type: "appstore" },
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.pagedrop.lagier&hl=en", type: "playstore" },
      { label: "Website", url: "https://legiergroup.com/en/", type: "web" },
    ],
    screenshots: ["/legier-home.webp", "/legier-video.webp", "/legier-newspapers.png", "/legier-news-details.png", "/legier-more.png"],
  },
  {
    id: "riptide",
    name: "Riptide Rentals",
    year: "2024",
    categories: ["SwiftUI", "iOS"],
    folder: "Mobile Apps",
    tags: ["swiftui", "ios", "water-navigation", "gps-maps"],
    summary:
      "SwiftUI app for Riptide Jet Ski Rentals in southwest Florida, built to guide riders with easy water navigation to popular spots, landmarks, wildlife areas, islands, and sandbars right from the water.",
    features: [
      "Native SwiftUI GPS waterway navigation",
      "Landmark, wildlife zone, island & sandbar waypoints",
      "Waterproof safety guide & emergency beacon",
      "Available on Apple App Store",
    ],
    links: [
      { label: "App Store", url: "https://apps.apple.com/au/app/riptide-rentals/id6757623532", type: "appstore" },
      { label: "Website", url: "https://www.riptiderentals.com/", type: "web" },
    ],
    screenshots: ["/riptide-rentals-map.webp", "/riptide-rentals-points.webp", "/0x0ss.png"],
  },
  {
    id: "rentalvate",
    name: "Rentalvate",
    year: "2022",
    earlier: true,
    categories: ["iOS", "Swift"],
    folder: "Mobile Apps",
    tags: ["swift", "cloudkit", "ios-sdk"],
    summary:
      "Interactive iOS learning platform with course management, guided lessons, and progress tracking.",
    features: ["Native iOS Swift & CloudKit synchronization", "Guided lessons & progress tracking"],
    links: [],
    screenshots: ["/device_connection.jpeg"],
  },
  {
    id: "mom-app",
    name: "The Mom App",
    year: "2022",
    earlier: true,
    categories: ["Kotlin", "Android", "iOS"],
    folder: "Mobile Apps",
    tags: ["kotlin", "maps-sdk", "django", "family-organizer"],
    summary:
      "The Mom App helps busy moms reclaim time, reduce stress, and stay organized from one AI-powered hub. Handles calendars, meals, chores, reminders, passwords, and grocery lists.",
    features: [
      "Family calendar, chore & meal planner",
      "Smart grocery list & reminder synchronization",
      "Published on Apple App Store & Google Play Store",
    ],
    links: [
      { label: "App Store", url: "https://apps.apple.com/app/id6756739178", type: "appstore" },
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.momapp.family", type: "playstore" },
      { label: "Website", url: "https://themom.app/", type: "web" },
    ],
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
