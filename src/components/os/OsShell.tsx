import { useEffect, useMemo, useRef, useState, type PointerEvent as PE } from "react";
import {
  ArrowRight,
  BatteryFull,
  Briefcase,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Folder,
  FolderKanban,
  Github,
  Globe,
  Linkedin,
  Lock,
  Mail,
  RotateCcw,
  Search,
  Settings,
  Sparkles,
  TerminalSquare,
  Trash2,
  UserRound,
  Wifi,
  X,
} from "lucide-react";
import {
  experience,
  findFolder,
  notes,
  profile,
  projects,
  searchIndex,
  sites,
  skillGroups,
  type FsNode,
  type SearchHit,
} from "@/lib/os/data";
import { useOs, type AppId, type Payload, type WindowState } from "@/lib/os/store";

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);
  if (!now) return "—";
  return now.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function useNarrow() {
  const [narrow, setNarrow] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setNarrow(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return narrow;
}

export function OsShell() {
  const phase = useOs((s) => s.phase);
  const setPhase = useOs((s) => s.setPhase);
  const theme = useOs((s) => s.theme);
  const setTheme = useOs((s) => s.setTheme);
  const narrow = useNarrow();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("rosdeb-theme");
      if (saved === "dark" || saved === "light") setTheme(saved);
    } catch {
      /* ignore */
    }
  }, [setTheme]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const os = useOs.getState();
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        os.setSpotlight(!os.spotlightOpen);
      }
      if (e.key === "Escape") os.setSpotlight(false);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "w" && os.focusedId) {
        e.preventDefault();
        os.closeWindow(os.focusedId);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "m" && os.focusedId) {
        e.preventDefault();
        os.minimizeWindow(os.focusedId);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (phase !== "boot") return;
    let skip = false;
    try {
      skip = sessionStorage.getItem("rosdeb-booted") === "1";
    } catch {
      /* ignore */
    }
    if (skip) {
      setPhase("login");
      return;
    }
    const t = window.setTimeout(() => {
      try {
        sessionStorage.setItem("rosdeb-booted", "1");
      } catch {
        /* ignore */
      }
      setPhase("login");
    }, 1800);
    const skipNow = () => {
      window.clearTimeout(t);
      try {
        sessionStorage.setItem("rosdeb-booted", "1");
      } catch {
        /* ignore */
      }
      setPhase("login");
    };
    window.addEventListener("keydown", skipNow);
    window.addEventListener("pointerdown", skipNow);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", skipNow);
      window.removeEventListener("pointerdown", skipNow);
    };
  }, [phase, setPhase]);

  return (
    <div className="os-wallpaper relative h-dvh w-full overflow-hidden text-ink" style={{ backgroundImage: "url('/mac_bg_image.avif')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Crawlable />
      {phase === "boot" && <Boot />}
      {phase === "login" && <Login />}
      {phase === "desktop" && narrow === null && <div className="h-full w-full" />}
      {phase === "desktop" && narrow === false && <Desktop />}
      {phase === "desktop" && narrow === true && <MobileHome />}
      <Spotlight />
      <Toast />
    </div>
  );
}

function Crawlable() {
  return (
    <section className="sr-only">
      <h1>{profile.name}</h1>
      <p>{profile.title}</p>
      <p>{profile.summary}</p>
      <p>{profile.status}</p>
      <p>
        Email {profile.email}. GitHub {profile.github}. LinkedIn {profile.linkedin}.
      </p>
      <h2>Experience at SparkTech Agency</h2>
      <ul>
        {experience.map((e) => (
          <li key={e.id}>
            {e.role}, {e.dates}
          </li>
        ))}
      </ul>
      <h2>Projects</h2>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            {p.name} ({p.year}) — {p.summary}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Boot() {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-canvas text-ink">
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-ink text-2xl font-semibold tracking-tight text-paper">
        RK
      </div>
      <div className="h-1 w-40 overflow-hidden rounded-full bg-line">
        <div className="h-full origin-left bg-accent" style={{ animation: "bootbar 1.6s ease forwards" }} />
      </div>
      <p className="mt-4 text-sm text-muted">Starting Rosdeb OS · click or press any key to skip</p>
    </div>
  );
}

function Login() {
  const setPhase = useOs((s) => s.setPhase);
  const openWindow = useOs((s) => s.openWindow);
  const setToast = useOs((s) => s.setToast);
  const [value, setValue] = useState("");
  const [imgErr, setImgErr] = useState(false);
  const clock = useClock();

  const enter = () => {
    setPhase("desktop");
    openWindow("welcome", "Welcome");
    setToast("Welcome to Rosdeb OS. Press Cmd+K or Ctrl+K to search.");
    window.setTimeout(() => setToast(null), 3200);
  };

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-between bg-black/25 backdrop-blur-md px-6 py-6 text-white select-none">
      {/* Top Status Bar on Lock Screen */}
      <div className="flex items-center justify-between text-xs font-medium text-white/80">
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wider drop-shadow">Rosdeb OS</span>
        </div>
        <div className="flex items-center gap-3">
          <Wifi size={14} className="drop-shadow" />
          <BatteryFull size={14} className="drop-shadow" />
          <span className="drop-shadow">{clock}</span>
        </div>
      </div>

      {/* Center User Profile & Transparent macOS Unlock Form */}
      <div className="flex flex-col items-center justify-center -mt-8">
        <form
          className="flex flex-col items-center text-center"
          onSubmit={(e) => {
            e.preventDefault();
            enter();
          }}
        >
          {/* Avatar with macOS Glass Ring */}
          <div className="relative mb-4 h-28 w-28 overflow-hidden rounded-full ring-4 ring-white/30 shadow-2xl bg-black/30 backdrop-blur-md">
            {!imgErr && profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-full w-full object-cover"
                onError={() => setImgErr(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white/20 text-3xl font-semibold text-white">
                {profile.initials}
              </div>
            )}
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-white drop-shadow-lg">
            Welcome to Rosdeb
          </h1>
          <p className="mt-1 text-sm font-normal text-white/85 drop-shadow-md">
            {profile.title}
          </p>

          {/* Authentic macOS Transparent Pill Password Input */}
          <div className="relative mt-6 flex w-72 items-center rounded-full border border-white/35 bg-white/20 px-4 py-2 backdrop-blur-2xl shadow-inner transition-all focus-within:bg-white/30 focus-within:border-white/60 focus-within:ring-2 focus-within:ring-white/40">
            <input
              id="pw"
              type="password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-transparent text-center text-sm text-white placeholder-white/70 outline-none pr-8"
              placeholder="Enter Password"
              autoFocus
            />
            <button
              type="submit"
              title="Unlock"
              className="absolute right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/30 text-white transition-all hover:bg-white/50 hover:scale-105 active:scale-95 shadow"
            >
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="mt-3 flex items-center gap-3 text-xs text-white/75 drop-shadow-sm">
            <span>Press Enter to unlock</span>
            <span>·</span>
            <button
              type="button"
              className="hover:text-white underline-offset-2 hover:underline"
              onClick={enter}
            >
              Continue as Guest
            </button>
          </div>
        </form>
      </div>

      {/* Bottom Lock Screen Actions */}
      <div className="flex items-center justify-center gap-10 text-xs text-white/80">
        <button
          type="button"
          onClick={enter}
          className="flex flex-col items-center gap-1.5 hover:text-white transition-opacity group"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/20 group-hover:bg-white/25 shadow-md">
            <Compass size={18} />
          </span>
          <span className="drop-shadow">Explore</span>
        </button>
        <button
          type="button"
          onClick={() => {
            try {
              sessionStorage.removeItem("rosdeb-booted");
            } catch {
              /* ignore */
            }
            useOs.setState({ phase: "boot", windows: [], focusedId: null });
          }}
          className="flex flex-col items-center gap-1.5 hover:text-white transition-opacity group"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/20 group-hover:bg-white/25 shadow-md">
            <Settings size={18} />
          </span>
          <span className="drop-shadow">Restart</span>
        </button>
      </div>
    </div>
  );
}

function Desktop() {
  const windows = useOs((s) => s.windows);
  return (
    <div className="relative h-full w-full">
      <MenuBar />
      <DesktopIcons />
      {windows.map((w) => (
        <WindowFrame key={w.id} win={w} />
      ))}
      <Dock />
    </div>
  );
}

function MenuBar() {
  const [open, setOpen] = useState<string | null>(null);
  const clock = useClock();
  const focused = useOs((s) => s.windows.find((w) => w.id === s.focusedId));
  const active = focused ? appLabel(focused.app) : "Finder";

  useEffect(() => {
    const close = () => setOpen(null);
    window.addEventListener("pointerdown", close);
    return () => window.removeEventListener("pointerdown", close);
  }, []);

  const items: { id: string; label: string; entries: { label: string; run: () => void }[] }[] = [
    {
      id: "os",
      label: "Rosdeb OS",
      entries: [
        { label: "About This Portfolio", run: () => useOs.getState().openWindow("settings", "Settings") },
        { label: "System Settings", run: () => useOs.getState().openWindow("settings", "Settings") },
        {
          label: "Restart",
          run: () => {
            try {
              sessionStorage.removeItem("rosdeb-booted");
            } catch {
              /* ignore */
            }
            useOs.setState({ phase: "boot", windows: [], focusedId: null });
          },
        },
        {
          label: "Log Out",
          run: () => useOs.setState({ phase: "login", windows: [], focusedId: null, spotlightOpen: false }),
        },
      ],
    },
    {
      id: "file",
      label: "File",
      entries: [
        { label: "New Finder Window", run: () => useOs.getState().openWindow("finder", "Finder", { kind: "path", path: "Projects" }) },
        {
          label: "Close Window",
          run: () => {
            const id = useOs.getState().focusedId;
            if (id) useOs.getState().closeWindow(id);
          },
        },
        { label: "Download CV note", run: () => useOs.getState().openWindow("preview", "CV", { kind: "note", id: "cv" }) },
      ],
    },
    {
      id: "go",
      label: "Go",
      entries: [
        { label: "Projects", run: () => useOs.getState().openWindow("finder", "Projects", { kind: "path", path: "Projects" }) },
        { label: "Experience", run: () => useOs.getState().openWindow("finder", "Experience", { kind: "path", path: "Experience" }) },
        { label: "Skills", run: () => useOs.getState().openWindow("skills", "Skills") },
        { label: "Contact", run: () => useOs.getState().openWindow("mail", "Mail") },
      ],
    },
    {
      id: "window",
      label: "Window",
      entries: [
        {
          label: "Minimize",
          run: () => {
            const id = useOs.getState().focusedId;
            if (id) useOs.getState().minimizeWindow(id);
          },
        },
        {
          label: "Zoom",
          run: () => {
            const id = useOs.getState().focusedId;
            if (id) useOs.getState().toggleMaximize(id);
          },
        },
      ],
    },
    {
      id: "help",
      label: "Help",
      entries: [
        {
          label: "Keyboard Shortcuts",
          run: () => useOs.getState().setToast("Ctrl/Cmd+K search · Ctrl/Cmd+W close · Ctrl/Cmd+M minimize · Esc closes search"),
        },
        { label: "Search Portfolio", run: () => useOs.getState().setSpotlight(true) },
      ],
    },
  ];

  return (
    <header
      className="absolute inset-x-0 top-0 z-[80] flex h-7 items-center gap-1 border-b border-white/15 px-3 text-xs backdrop-blur-2xl bg-white/20 dark:bg-black/30 text-white drop-shadow-sm select-none"
      onPointerDown={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setOpen(open === "os" ? null : "os")}
        className="mr-1 flex h-6 w-6 items-center justify-center rounded-md hover:bg-white/20 transition-colors font-bold text-sm"
        title="Rosdeb OS"
      >
        
      </button>
      {items.map((m) => (
        <div key={m.id} className="relative">
          <button
            className={`rounded px-2 py-0.5 font-medium transition-colors ${
              open === m.id
                ? "bg-white/30 text-white shadow-sm"
                : "hover:bg-white/15 text-white/90 hover:text-white"
            } ${m.id === "os" ? "font-bold text-white" : ""}`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setOpen(open === m.id ? null : m.id)}
          >
            {m.id === "os" ? "Rosdeb OS" : m.label}
          </button>
          {open === m.id && (
            <div className="absolute left-0 top-7 min-w-52 rounded-xl border border-white/20 bg-paper/95 backdrop-blur-2xl py-1 text-sm text-ink shadow-2xl">
              {m.entries.map((en) => (
                <button
                  key={en.label}
                  className="block w-full px-3 py-1.5 text-left text-xs font-medium hover:bg-accent hover:text-accent-ink transition-colors"
                  onClick={() => {
                    en.run();
                    setOpen(null);
                  }}
                >
                  {en.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
      <span className="ml-2 font-bold text-white/95">{active}</span>
      <div className="ml-auto flex items-center gap-2.5 pr-2 text-white/85">
        <span className="hidden rounded-full bg-emerald-500/25 border border-emerald-400/40 px-2 py-0.5 text-[10px] font-semibold text-emerald-200 sm:inline shadow-sm">
          Available for contracts
        </span>
        <button
          aria-label="Spotlight (⌘K)"
          title="Spotlight Search (⌘K or Ctrl+K)"
          onClick={() => useOs.getState().setSpotlight(true)}
          className="flex items-center gap-1.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/20 px-2 py-0.5 text-xs text-white/90 hover:text-white transition-all shadow-sm"
        >
          <Search size={12} />
          <span className="flex items-center gap-0.5 text-[10px] font-medium tracking-tight text-white/90">
            <kbd className="rounded bg-white/20 px-1 font-mono text-[9px] shadow-xs">⌘K</kbd>
          </span>
        </button>
        <Wifi size={13} />
        <BatteryFull size={14} />
        <time className="font-medium text-xs">{clock}</time>
      </div>
    </header>
  );
}

const deskIcons: { name: string; icon: typeof Folder; run: () => void }[] = [
  { name: "About Me", icon: UserRound, run: () => useOs.getState().openWindow("finder", "About Me", { kind: "path", path: "About Me" }) },
  { name: "Experience", icon: Briefcase, run: () => useOs.getState().openWindow("finder", "Experience", { kind: "path", path: "Experience" }) },
  { name: "Projects", icon: FolderKanban, run: () => useOs.getState().openWindow("finder", "Projects", { kind: "path", path: "Projects" }) },
  { name: "My Skills", icon: Sparkles, run: () => useOs.getState().openWindow("skills", "Skills") },
  { name: "Contact", icon: Mail, run: () => useOs.getState().openWindow("mail", "Mail") },
  { name: "README.md", icon: FileText, run: () => useOs.getState().openWindow("preview", "README.md", { kind: "note", id: "readme" }) },
];

function DesktopIcons() {
  return (
    <div className="absolute left-3 top-12 flex w-24 flex-col gap-3 select-none">
      {deskIcons.map((ic) => (
        <button
          key={ic.name}
          className="group flex flex-col items-center gap-1 rounded-xl p-1.5 text-center transition-all hover:bg-white/15"
          onClick={ic.run}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg group-hover:scale-105 transition-transform">
            <ic.icon size={24} strokeWidth={1.7} className="text-white drop-shadow" />
          </div>
          <span className="rounded px-1.5 py-0.5 text-[10px] font-medium leading-tight text-white drop-shadow-md bg-black/40 backdrop-blur-sm line-clamp-2">
            {ic.name}
          </span>
        </button>
      ))}
    </div>
  );
}

function Dock() {
  const windows = useOs((s) => s.windows);
  const bouncing = useOs((s) => s.bouncing);
  const running = (app: AppId) => windows.some((w) => w.app === app);

  const items: { id: AppId | "github" | "linkedin" | "trash"; label: string; icon: typeof Folder; run: () => void }[] = [
    { id: "finder", label: "Finder", icon: Folder, run: () => useOs.getState().openWindow("finder", "Finder", { kind: "path", path: "Projects" }) },
    { id: "safari", label: "Safari", icon: Compass, run: () => useOs.getState().openWindow("safari", "Safari") },
    { id: "terminal", label: "Terminal", icon: TerminalSquare, run: () => useOs.getState().openWindow("terminal", "Terminal") },
    { id: "mail", label: "Mail", icon: Mail, run: () => useOs.getState().openWindow("mail", "Mail") },
    { id: "settings", label: "Settings", icon: Settings, run: () => useOs.getState().openWindow("settings", "Settings") },
    { id: "github", label: "GitHub", icon: Github, run: () => useOs.getState().openWindow("safari", "GitHub", { kind: "url", url: profile.github, title: "GitHub — Rosdeb" }) },
    { id: "linkedin", label: "LinkedIn", icon: Linkedin, run: () => useOs.getState().openWindow("safari", "LinkedIn", { kind: "url", url: profile.linkedin, title: "LinkedIn — Rosdeb Koch" }) },
    {
      id: "trash",
      label: "Trash",
      icon: Trash2,
      run: () => {
        useOs.getState().setToast("Nothing to see here. All projects are production-ready.");
        window.setTimeout(() => useOs.getState().setToast(null), 2400);
      },
    },
  ];

  return (
    <nav className="absolute bottom-3 left-1/2 z-[70] flex -translate-x-1/2 items-end gap-1.5 rounded-2xl border border-white/25 shadow-2xl px-2.5 py-2 backdrop-blur-3xl bg-white/20 dark:bg-black/35 select-none">
      {items.map((it) => {
        const app = it.id as AppId;
        const dot = it.id !== "github" && it.id !== "linkedin" && it.id !== "trash" && windows.some((w) => w.app === app);
        return (
          <button
            key={it.label}
            title={it.label}
            aria-label={it.label}
            className={`group relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 hover:bg-white/25 border border-white/15 backdrop-blur-md shadow-md hover:scale-110 active:scale-95 transition-all ${
              bouncing === it.id ? "dock-bounce" : ""
            }`}
            onClick={() => {
              const minimized = windows.find((w) => w.app === app && w.minimized);
              if (minimized && it.id !== "finder") {
                useOs.getState().restoreWindow(minimized.id);
                useOs.getState().focusWindow(minimized.id);
                return;
              }
              it.run();
            }}
          >
            <it.icon size={22} strokeWidth={1.6} className="text-white drop-shadow-sm" />
            {dot && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-white shadow" />}
            <span className="pointer-events-none absolute -top-8 hidden rounded-md bg-black/75 backdrop-blur-md px-2 py-0.5 text-[10px] font-medium text-white group-hover:block shadow">
              {it.label}
            </span>
          </button>
        );
      })}
      <span className="sr-only">{running("finder") ? "finder running" : ""}</span>
    </nav>
  );
}

function appLabel(app: AppId) {
  const map: Record<AppId, string> = {
    finder: "Finder",
    preview: "Preview",
    terminal: "Terminal",
    safari: "Safari",
    mail: "Mail",
    settings: "Settings",
    welcome: "Welcome",
    skills: "Skills",
  };
  return map[app];
}

function WindowFrame({ win }: { win: WindowState }) {
  const focus = useOs((s) => s.focusedId === win.id);
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  if (win.minimized) return null;

  const onBar = (e: PE) => {
    if ((e.target as HTMLElement).closest("button")) return;
    useOs.getState().focusWindow(win.id);
    drag.current = { dx: e.clientX - win.x, dy: e.clientY - win.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: PE) => {
    if (!drag.current) return;
    useOs.getState().moveWindow(win.id, e.clientX - drag.current.dx, e.clientY - drag.current.dy);
  };
  const onUp = () => {
    drag.current = null;
  };

  return (
    <section
      role="dialog"
      aria-label={win.title}
      className={`win-shadow absolute flex flex-col overflow-hidden rounded-xl border border-line bg-paper ${focus ? "" : "opacity-95"}`}
      style={{ left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z }}
      onPointerDown={() => useOs.getState().focusWindow(win.id)}
    >
      <header
        className="os-glass flex h-10 shrink-0 items-center gap-2 border-b border-line px-3"
        onPointerDown={onBar}
        onPointerMove={onMove}
        onPointerUp={onUp}
      >
        <Traffic id={win.id} />
        <h2 className="pointer-events-none flex-1 truncate text-center text-xs font-semibold">{win.title}</h2>
        <span className="w-14" />
      </header>
      <div className="os-scroll min-h-0 flex-1 overflow-auto">
        <WindowBody win={win} />
      </div>
      <ResizeHandles win={win} />
    </section>
  );
}

function Traffic({ id }: { id: string }) {
  const btn = "group/btn relative flex h-3 w-3 items-center justify-center rounded-full text-[8px] font-bold transition-all";
  return (
    <div className="group/traffic flex w-14 gap-1.5 items-center">
      <button
        aria-label="Close"
        className={`${btn} bg-danger text-black/70 hover:opacity-90`}
        onClick={() => useOs.getState().closeWindow(id)}
      >
        <span className="opacity-0 group-hover/traffic:opacity-100 transition-opacity leading-none">×</span>
      </button>
      <button
        aria-label="Minimize"
        className={`${btn} bg-warn text-black/70 hover:opacity-90`}
        onClick={() => useOs.getState().minimizeWindow(id)}
      >
        <span className="opacity-0 group-hover/traffic:opacity-100 transition-opacity leading-none">−</span>
      </button>
      <button
        aria-label="Zoom"
        className={`${btn} bg-ok text-black/70 hover:opacity-90`}
        onClick={() => useOs.getState().toggleMaximize(id)}
      >
        <span className="opacity-0 group-hover/traffic:opacity-100 transition-opacity leading-none">+</span>
      </button>
    </div>
  );
}

function ResizeHandles({ win }: { win: WindowState }) {
  const start = useRef<{ x: number; y: number; w: number; h: number; ox: number; oy: number; edge: string } | null>(null);
  const begin = (edge: string) => (e: PE) => {
    e.stopPropagation();
    start.current = { x: e.clientX, y: e.clientY, w: win.w, h: win.h, ox: win.x, oy: win.y, edge };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const move = (e: PE) => {
    const s = start.current;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    let { w, h, ox, oy } = s;
    if (s.edge.includes("e")) w = s.w + dx;
    if (s.edge.includes("s")) h = s.h + dy;
    if (s.edge.includes("w")) {
      w = s.w - dx;
      ox = s.ox + dx;
    }
    if (s.edge.includes("n")) {
      h = s.h - dy;
      oy = s.oy + dy;
    }
    useOs.getState().resizeWindow(win.id, w, h, ox, oy);
  };
  const end = () => {
    start.current = null;
  };
  const spot = (edge: string, className: string) => (
    <div
      key={edge}
      className={`absolute z-10 ${className}`}
      onPointerDown={begin(edge)}
      onPointerMove={move}
      onPointerUp={end}
    />
  );
  return (
    <>
      {spot("e", "right-0 top-3 bottom-3 w-2 cursor-ew-resize")}
      {spot("s", "bottom-0 left-3 right-3 h-2 cursor-ns-resize")}
      {spot("w", "left-0 top-3 bottom-3 w-2 cursor-ew-resize")}
      {spot("n", "top-0 left-12 right-3 h-2 cursor-ns-resize")}
      {spot("se", "bottom-0 right-0 h-3 w-3 cursor-nwse-resize")}
      {spot("sw", "bottom-0 left-0 h-3 w-3 cursor-nesw-resize")}
      {spot("ne", "right-0 top-0 h-3 w-3 cursor-nesw-resize")}
      {spot("nw", "left-0 top-8 h-3 w-3 cursor-nwse-resize")}
    </>
  );
}

function WindowBody({ win }: { win: WindowState }) {
  if (win.app === "welcome") return <Welcome />;
  if (win.app === "finder") return <Finder initial={(win.payload && win.payload.kind === "path" && win.payload.path) || "Projects"} />;
  if (win.app === "preview") return <Preview payload={win.payload} />;
  if (win.app === "skills") return <SkillsBody focus={win.payload?.kind === "skill" ? win.payload.id : undefined} />;
  if (win.app === "terminal") return <TerminalApp />;
  if (win.app === "safari") return <SafariApp payload={win.payload} />;
  if (win.app === "mail") return <MailApp />;
  if (win.app === "settings") return <SettingsApp />;
  return null;
}

function Welcome() {
  return (
    <div className="flex h-full flex-col gap-4 p-6">
      <div className="flex items-center gap-4 border-b border-line pb-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-line bg-canvas/60 shadow">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        </div>
        <div>
          <span className="inline-block rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-accent">
            Rosdeb OS
          </span>
          <h3 className="mt-1 text-2xl font-bold tracking-tight">{profile.name}</h3>
          <p className="text-xs text-muted font-medium">{profile.title}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {profile.numbers.map((n) => (
          <div key={n.label} className="rounded-xl border border-line bg-canvas/30 p-3 shadow-sm">
            <div className="text-xl font-bold text-ink">{n.value}</div>
            <div className="mt-0.5 text-xs text-muted">{n.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-line bg-canvas/20 p-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">Overview</h4>
        <p className="text-sm leading-relaxed text-ink/90">{profile.summary}</p>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-3 border-t border-line">
        <button
          className="flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-accent-ink hover:opacity-90 shadow-sm transition-all"
          onClick={() => useOs.getState().openWindow("preview", "CV", { kind: "note", id: "cv" })}
        >
          <FileText size={15} />
          <span>View CV</span>
        </button>
        <button
          className="flex items-center gap-1.5 rounded-xl border border-line px-4 py-2.5 text-sm font-medium hover:bg-canvas/60 transition-colors"
          onClick={() => useOs.getState().openWindow("finder", "Projects", { kind: "path", path: "Projects" })}
        >
          <FolderKanban size={15} />
          <span>Browse Projects</span>
        </button>
        <button
          className="flex items-center gap-1.5 rounded-xl border border-line px-4 py-2.5 text-sm font-medium hover:bg-canvas/60 transition-colors"
          onClick={() => useOs.getState().openWindow("mail", "Mail")}
        >
          <Mail size={15} />
          <span>Email Me</span>
        </button>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="ml-auto flex items-center gap-1 rounded-xl border border-line px-3 py-2 text-xs font-medium text-muted hover:text-ink hover:bg-canvas/60"
        >
          <Github size={14} />
          <span>GitHub</span>
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 rounded-xl border border-line px-3 py-2 text-xs font-medium text-muted hover:text-ink hover:bg-canvas/60"
        >
          <Linkedin size={14} />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
}

function Finder({ initial }: { initial: string }) {
  const [stack, setStack] = useState<string[]>([initial]);
  const [cursor, setCursor] = useState(0);
  const [mode, setMode] = useState<"icon" | "list">("icon");
  const [q, setQ] = useState("");
  const path = stack[cursor] ?? initial;
  const parts = path.split("/").filter(Boolean);
  const node = findFolder(parts);
  const children = node && node.type === "folder" ? node.children : [];
  const shown = children.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));

  const jump = (abs: string) => {
    setStack([abs]);
    setCursor(0);
    setQ("");
  };

  const go = (next: string) => {
    const base = stack.slice(0, cursor + 1);
    base.push(next);
    setStack(base);
    setCursor(base.length - 1);
    setQ("");
  };

  const openNode = (n: FsNode) => {
    if (n.type === "folder") {
      go(path ? `${path}/${n.name}` : n.name);
      return;
    }
    if (n.kind === "project") useOs.getState().openWindow("preview", n.name, { kind: "project", id: n.ref });
    else if (n.kind === "experience") useOs.getState().openWindow("preview", n.name, { kind: "experience", id: n.ref });
    else if (n.kind === "skill") useOs.getState().openWindow("skills", n.name, { kind: "skill", id: n.ref });
    else if (n.ref === "email" || n.ref === "linkedin" || n.ref === "github") {
      if (n.ref === "email") useOs.getState().openWindow("mail", "Mail");
      if (n.ref === "linkedin") useOs.getState().openWindow("safari", "LinkedIn", { kind: "url", url: profile.linkedin, title: "LinkedIn — Rosdeb Koch" });
      if (n.ref === "github") useOs.getState().openWindow("safari", "GitHub", { kind: "url", url: profile.github, title: "GitHub — Rosdeb" });
    } else useOs.getState().openWindow("preview", n.name, { kind: "note", id: n.ref });
  };

  const favorites = [
    { label: "About Me", icon: UserRound },
    { label: "Experience", icon: Briefcase },
    { label: "Projects", icon: FolderKanban },
    { label: "Skills", icon: Sparkles },
    { label: "Documents", icon: FileText },
  ];

  return (
    <div className="flex h-full min-h-[420px]">
      <aside className="hidden w-52 shrink-0 border-r border-line bg-canvas/35 p-3 text-sm sm:flex sm:flex-col">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted">Favorites</p>
        <div className="space-y-0.5">
          {favorites.map((f) => (
            <button
              key={f.label}
              className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-colors ${
                path === f.label ? "bg-accent text-accent-ink" : "hover:bg-paper"
              }`}
              onClick={() => jump(f.label)}
            >
              <f.icon size={15} />
              <span>{f.label}</span>
            </button>
          ))}
        </div>

        <p className="mb-2 mt-4 text-[10px] font-semibold uppercase tracking-wider text-muted">Projects</p>
        <div className="space-y-0.5">
          <button
            className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-colors ${
              path === "Projects/Mobile Apps" ? "bg-accent text-accent-ink" : "hover:bg-paper"
            }`}
            onClick={() => jump("Projects/Mobile Apps")}
          >
            <Folder size={15} className="text-blue-500" />
            <span>Mobile Apps</span>
          </button>
          <button
            className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-colors ${
              path === "Projects/Developer Tools" ? "bg-accent text-accent-ink" : "hover:bg-paper"
            }`}
            onClick={() => jump("Projects/Developer Tools")}
          >
            <Folder size={15} className="text-amber-500" />
            <span>Developer Tools</span>
          </button>
          <button
            className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-colors ${
              path === "Projects/Web & Culture" ? "bg-accent text-accent-ink" : "hover:bg-paper"
            }`}
            onClick={() => jump("Projects/Web & Culture")}
          >
            <Folder size={15} className="text-purple-500" />
            <span>Web & Culture</span>
          </button>
        </div>

        <p className="mb-2 mt-4 text-[10px] font-semibold uppercase tracking-wider text-muted">Quick Access</p>
        <button
          className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium hover:bg-paper transition-colors"
          onClick={() => useOs.getState().openWindow("safari", "Safari")}
        >
          <Compass size={15} className="text-sky-500" />
          <span>Live Sites</span>
        </button>
        <button
          className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium hover:bg-paper transition-colors"
          onClick={() => useOs.getState().openWindow("mail", "Mail")}
        >
          <Mail size={15} className="text-rose-500" />
          <span>Contact</span>
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Finder Toolbar */}
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5 text-xs bg-paper/50">
          <div className="flex items-center gap-1">
            <button
              className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-canvas disabled:opacity-30 transition-colors"
              disabled={cursor === 0}
              onClick={() => setCursor((c) => Math.max(0, c - 1))}
              title="Back"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-canvas disabled:opacity-30 transition-colors"
              disabled={cursor >= stack.length - 1}
              onClick={() => setCursor((c) => Math.min(stack.length - 1, c + 1))}
              title="Forward"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-1 text-muted text-xs font-medium">
            <Folder size={14} className="text-blue-500" />
            <span>{path || "Rosdeb OS"}</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-2 text-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search"
                className="w-36 rounded-lg border border-line bg-canvas/40 pl-7 pr-2 py-1 text-xs outline-none focus:border-accent"
              />
            </div>
            <div className="flex rounded-lg border border-line bg-canvas/30 p-0.5">
              <button
                className={`rounded px-2 py-0.5 text-xs font-medium transition-colors ${mode === "icon" ? "bg-paper shadow-sm" : "hover:bg-canvas"}`}
                onClick={() => setMode("icon")}
              >
                Icons
              </button>
              <button
                className={`rounded px-2 py-0.5 text-xs font-medium transition-colors ${mode === "list" ? "bg-paper shadow-sm" : "hover:bg-canvas"}`}
                onClick={() => setMode("list")}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="os-scroll flex-1 overflow-auto p-4">
          {mode === "icon" ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {shown.map((n) => {
                const isFile = n.type === "file";
                const proj = isFile && n.kind === "project" ? projects.find((p) => p.id === n.ref) : null;
                const thumb = proj?.screenshots?.[0];
                return (
                  <button
                    key={n.id}
                    className="group flex flex-col items-center rounded-xl border border-transparent p-3 text-center hover:border-line hover:bg-canvas/50 transition-all"
                    onClick={() => openNode(n)}
                  >
                    {thumb ? (
                      <div className="mb-2 h-20 w-full overflow-hidden rounded-lg bg-ink/10 border border-line shadow-sm group-hover:scale-105 transition-transform">
                        <img src={thumb} alt={n.name} className="h-full w-full object-cover" />
                      </div>
                    ) : (
                      <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-canvas/60 text-accent shadow-sm group-hover:scale-105 transition-transform">
                        {n.type === "folder" ? (
                          <Folder size={32} className="text-blue-500 fill-blue-500/20" />
                        ) : n.kind === "project" ? (
                          <FolderKanban size={28} className="text-accent" />
                        ) : n.kind === "experience" ? (
                          <Briefcase size={28} className="text-amber-500" />
                        ) : n.kind === "skill" ? (
                          <Sparkles size={28} className="text-purple-500" />
                        ) : (
                          <FileText size={28} className="text-muted" />
                        )}
                      </div>
                    )}
                    <div className="text-xs font-semibold text-ink line-clamp-1 group-hover:text-accent">
                      {n.name}
                    </div>
                    {proj && <div className="mt-0.5 text-[10px] text-muted">{proj.year}</div>}
                  </button>
                );
              })}
            </div>
          ) : (
            <ul className="divide-y divide-line/60">
              {shown.map((n) => {
                const proj = n.type === "file" && n.kind === "project" ? projects.find((p) => p.id === n.ref) : null;
                return (
                  <li key={n.id}>
                    <button
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs hover:bg-canvas/60 transition-colors"
                      onClick={() => openNode(n)}
                    >
                      {n.type === "folder" ? (
                        <Folder size={16} className="text-blue-500 shrink-0" />
                      ) : (
                        <FileText size={16} className="text-muted shrink-0" />
                      )}
                      <span className="font-medium text-ink flex-1 truncate">{n.name}</span>
                      {proj && (
                        <>
                          <span className="text-[11px] text-muted w-28 truncate">{proj.categories.join(", ")}</span>
                          <span className="text-[11px] text-muted w-20 text-right">{proj.year}</span>
                        </>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          {shown.length === 0 && (
            <div className="flex h-40 flex-col items-center justify-center text-sm text-muted">
              <p>No items found</p>
            </div>
          )}
        </div>
        <div className="border-t border-line px-4 py-1.5 text-[11px] text-muted bg-paper/30">
          {shown.length} {shown.length === 1 ? "item" : "items"}
        </div>
      </div>
    </div>
  );
}

function Preview({ payload }: { payload?: Payload }) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  if (!payload) return <p className="p-6 text-sm">Nothing to preview.</p>;

  if (payload.kind === "project") {
    const p = projects.find((x) => x.id === payload.id);
    if (!p) return <p className="p-6">Missing project.</p>;

    const hasScreenshots = p.screenshots && p.screenshots.length > 0;

    return (
      <article className="space-y-5 p-6">
        <header className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4">
          <div>
            <span className="inline-block rounded-full bg-accent/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
              {p.folder}
            </span>
            <h3 className="mt-1 text-2xl font-bold tracking-tight">{p.name}</h3>
            <p className="text-xs text-muted font-medium mt-0.5">
              {p.year}
              {p.earlier ? " · Personal / earlier work" : ""}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {p.categories.map((c) => (
              <span key={c} className="rounded-full border border-line bg-canvas/30 px-2.5 py-0.5 text-xs font-medium">
                {c}
              </span>
            ))}
          </div>
        </header>

        <p className="leading-relaxed text-sm text-ink/90">{p.summary}</p>

        {/* Real Screenshots Gallery */}
        {hasScreenshots && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">Screenshots & Previews</h4>
            <div className="flex gap-3 overflow-x-auto pb-3 pt-1">
              {p.screenshots!.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  className="group relative shrink-0 overflow-hidden rounded-xl border border-line bg-ink/5 shadow-md transition-all hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  onClick={() => setSelectedImg(src)}
                >
                  <img
                    src={src}
                    alt={`${p.name} screen ${i + 1}`}
                    className="h-60 w-auto max-w-sm rounded-xl object-contain bg-black/5"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-black shadow">
                      Expand
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <div className="space-y-2 rounded-xl border border-line bg-canvas/20 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">Key Highlights & Architecture</h4>
          <ul className="space-y-1.5 text-sm">
            {p.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className="rounded-md bg-canvas/60 px-2 py-1 text-xs font-medium text-muted">
              #{t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-line">
          {p.links.map((l) => (
            <button
              key={l.url}
              className="flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-accent-ink hover:opacity-90 shadow-sm transition-opacity"
              onClick={() => useOs.getState().openWindow("safari", l.label, { kind: "url", url: l.url, title: `${p.name} — ${l.label}` })}
            >
              <span>{l.label}</span>
              <Globe size={13} />
            </button>
          ))}
          {p.links.length === 0 && (
            <p className="text-xs text-muted">Production project delivered under client agreement / agency contract.</p>
          )}
        </div>

        {/* Lightbox Modal */}
        {selectedImg && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setSelectedImg(null)}
          >
            <div className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl shadow-2xl">
              <img src={selectedImg} alt={p.name} className="max-h-[85vh] max-w-[85vw] object-contain" />
              <button
                type="button"
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                onClick={() => setSelectedImg(null)}
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </article>
    );
  }

  if (payload.kind === "experience") {
    const e = experience.find((x) => x.id === payload.id);
    if (!e) return null;
    return (
      <article className="space-y-4 p-6">
        <span className="inline-block rounded-full bg-accent/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
          {e.org}
        </span>
        <h3 className="text-2xl font-bold tracking-tight">{e.role}</h3>
        <p className="text-xs text-muted font-medium">{e.dates}</p>
        <div className="rounded-xl border border-line bg-canvas/30 p-4 text-sm leading-relaxed text-ink/90">
          {e.summary}
        </div>
      </article>
    );
  }

  if (payload.kind === "note") {
    const n = notes(payload.id);
    const isCv = payload.id === "cv";
    return (
      <article className="space-y-4 p-6">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <h3 className="text-xl font-bold tracking-tight">{n.title}</h3>
          {isCv && (
            <a
              href="/rosdeb--cv.pdf"
              download="Rosdeb_Koch_CV.pdf"
              className="flex items-center gap-1.5 rounded-xl bg-accent px-3 py-1.5 text-xs font-medium text-accent-ink hover:opacity-90 transition-opacity shadow"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </a>
          )}
        </div>
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink/90 rounded-xl bg-canvas/20 border border-line p-4">
          {n.body}
        </pre>
      </article>
    );
  }
  return null;
}

function SkillsBody({ focus }: { focus?: string }) {
  return (
    <div className="grid gap-3 p-4 sm:grid-cols-2">
      {skillGroups.map((g) => (
        <section key={g.id} className={`rounded-2xl border border-line p-4 ${focus === g.id ? "ring-2 ring-accent" : ""}`}>
          <h3 className="font-semibold">{g.name}</h3>
          <ul className="mt-2 flex flex-wrap gap-1">
            {g.items.map((it) => (
              <li key={it} className="rounded-md bg-canvas px-2 py-1 text-xs">
                {it}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function TerminalApp() {
  const [lines, setLines] = useState<string[]>([
    "Last login: Mon Nov 23 11:00:00 on ttys001",
    "Rosdeb OS Darwin Kernel Version 24.1.0: Apple ARM64",
    'Type "help" or "man" to see available commands, or explore with ls / cd.',
    "",
  ]);
  const [cwd, setCwd] = useState<string>("/Users/rosdebkoch/Projects");
  const [cmd, setCmd] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const end = useRef<HTMLDivElement>(null);

  // Virtual file system
  const [virtualFs, setVirtualFs] = useState<Record<string, { type: "dir" | "file"; content?: string }>>({
    "/": { type: "dir" },
    "/Users": { type: "dir" },
    "/Users/rosdebkoch": { type: "dir" },
    "/Users/rosdebkoch/Projects": { type: "dir" },
    "/Users/rosdebkoch/Projects/Mobile Apps": { type: "dir" },
    "/Users/rosdebkoch/Projects/Developer Tools": { type: "dir" },
    "/Users/rosdebkoch/Projects/Web & Culture": { type: "dir" },
    "/Users/rosdebkoch/Experience": { type: "dir" },
    "/Users/rosdebkoch/Skills": { type: "dir" },
    "/Users/rosdebkoch/Documents": { type: "dir" },
    "/Users/rosdebkoch/README.md": {
      type: "file",
      content: "Rosdeb OS 1.0\nSenior Mobile & Cross-Platform Software Engineer\nFlutter · iOS (Swift) · Android (Kotlin) · Next.js\nContact: rosdevkoch@gmail.com",
    },
    "/Users/rosdebkoch/profile.txt": {
      type: "file",
      content: `${profile.name} — ${profile.title}\n${profile.summary}\nGitHub: ${profile.github}\nLinkedIn: ${profile.linkedin}`,
    },
    "/Users/rosdebkoch/Documents/Rosdeb_Koch_CV.pdf": {
      type: "file",
      content: "[Binary PDF file: Rosdeb Koch Resume / CV — run 'open cv' to view]",
    },
  });

  useEffect(() => {
    const next = { ...virtualFs };
    projects.forEach((p) => {
      const folderPath =
        p.folder === "Mobile Apps"
          ? "/Users/rosdebkoch/Projects/Mobile Apps"
          : p.folder === "Developer Tools"
          ? "/Users/rosdebkoch/Projects/Developer Tools"
          : "/Users/rosdebkoch/Projects/Web & Culture";
      next[`${folderPath}/${p.name.replace(/\s+/g, "_")}.md`] = {
        type: "file",
        content: `# ${p.name} (${p.year})\n${p.summary}\nCategories: ${p.categories.join(", ")}\nTags: ${p.tags.join(", ")}\nFeatures:\n${p.features.map((f) => `- ${f}`).join("\n")}`,
      };
    });
    setVirtualFs(next);
  }, []);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const shortCwd = cwd.replace("/Users/rosdebkoch", "~");

  const normalizePath = (target: string): string => {
    let clean = target.trim();
    if (!clean || clean === "~") return "/Users/rosdebkoch";
    if (clean.startsWith("~/")) clean = "/Users/rosdebkoch/" + clean.slice(2);
    if (!clean.startsWith("/")) {
      clean = (cwd === "/" ? "" : cwd) + "/" + clean;
    }
    const parts = clean.split("/").filter(Boolean);
    const resolved: string[] = [];
    for (const part of parts) {
      if (part === ".") continue;
      if (part === "..") {
        resolved.pop();
      } else {
        resolved.push(part);
      }
    }
    return "/" + resolved.join("/");
  };

  const run = (raw: string) => {
    const line = raw.trim();
    const promptHeader = `rosdebkoch@MacBook-Pro ${shortCwd} % ${line}`;
    if (!line) {
      setLines((l) => [...l, promptHeader]);
      setCmd("");
      return;
    }

    const out: string[] = [promptHeader];
    const parts = line.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    const head = parts[0]?.toLowerCase() || "";
    const args = parts.slice(1).map((a) => a.replace(/^"|"$/g, ""));

    if (head === "pwd") {
      out.push(cwd);
    } else if (head === "whoami") {
      out.push("rosdebkoch");
    } else if (head === "uname") {
      if (args.includes("-a")) {
        out.push("Darwin Rosdeb-MacBook-Pro.local 24.1.0 Darwin Kernel Version 24.1.0: Mon Nov 23 11:00:00 PST 2026; root:xnu-11215.1.30~1/RELEASE_ARM64_T6000 arm64");
      } else {
        out.push("Darwin");
      }
    } else if (head === "date") {
      out.push(new Date().toString());
    } else if (head === "echo") {
      out.push(args.join(" "));
    } else if (head === "clear") {
      setLines([]);
      setCmd("");
      return;
    } else if (head === "history") {
      hist.forEach((h, i) => out.push(`  ${i + 1}  ${h}`));
    } else if (head === "help" || head === "man") {
      out.push(
        "Rosdeb OS Terminal — Shell Commands Reference:\n" +
          "  ls [-la] [path]    - List directory contents\n" +
          "  cd <dir>           - Change directory (cd .., cd ~, cd Projects, cd /)\n" +
          "  pwd                - Print current working directory\n" +
          "  cat <file>         - Display file contents\n" +
          "  open <target>      - Open target in OS UI (open safari, open finder, open cv)\n" +
          "  mkdir <name>       - Create a virtual directory\n" +
          "  touch <name>       - Create an empty file\n" +
          "  rm <name>          - Remove a file or directory\n" +
          "  whoami             - Display active user\n" +
          "  uname -a           - Print OS kernel release\n" +
          "  date               - Print system date & time\n" +
          "  echo <text>        - Print text\n" +
          "  theme <dark|light> - Change system appearance\n" +
          "  sudo hire rosdeb   - Request contractor clearance\n" +
          "  clear              - Clear terminal screen buffer"
      );
    } else if (head === "ls" || head === "dir") {
      const isLong = args.includes("-l") || args.includes("-la") || args.includes("-al");
      const targetArg = args.find((a) => !a.startsWith("-"));
      const targetPath = targetArg ? normalizePath(targetArg) : cwd;

      const entries: { name: string; isDir: boolean; size?: number }[] = [];
      const prefix = targetPath === "/" ? "/" : targetPath + "/";

      for (const [p, item] of Object.entries(virtualFs)) {
        if (p === targetPath) continue;
        if (p.startsWith(prefix)) {
          const rest = p.slice(prefix.length);
          if (!rest.includes("/")) {
            entries.push({
              name: rest,
              isDir: item.type === "dir",
              size: item.content?.length || 4096,
            });
          }
        }
      }

      if (entries.length === 0) {
        if (!virtualFs[targetPath]) {
          out.push(`ls: ${targetArg || ""}: No such file or directory`);
        }
      } else {
        if (isLong) {
          out.push(`total ${entries.length * 8}`);
          entries.forEach((e) => {
            const perm = e.isDir ? "drwxr-xr-x" : "-rw-r--r--";
            const dateStr = "Nov 23 11:00";
            out.push(`${perm}  staff  ${String(e.size || 512).padStart(6, " ")} ${dateStr} ${e.name}${e.isDir ? "/" : ""}`);
          });
        } else {
          const rendered = entries
            .map((e) => (e.isDir ? `${e.name}/` : e.name))
            .join("    ");
          out.push(rendered);
        }
      }
    } else if (head === "cd") {
      const target = args[0] || "~";
      const resolved = normalizePath(target);
      if (virtualFs[resolved]) {
        if (virtualFs[resolved].type === "dir") {
          setCwd(resolved);
        } else {
          out.push(`cd: not a directory: ${target}`);
        }
      } else {
        out.push(`cd: no such file or directory: ${target}`);
      }
    } else if (head === "cat") {
      if (!args[0]) {
        out.push("usage: cat <filename>");
      } else {
        const resolved = normalizePath(args[0]);
        if (virtualFs[resolved]) {
          if (virtualFs[resolved].type === "file") {
            out.push(virtualFs[resolved].content || "");
          } else {
            out.push(`cat: ${args[0]}: Is a directory`);
          }
        } else {
          out.push(`cat: ${args[0]}: No such file or directory`);
        }
      }
    } else if (head === "mkdir") {
      if (!args[0]) {
        out.push("usage: mkdir <directory_name>");
      } else {
        const resolved = normalizePath(args[0]);
        setVirtualFs((v) => ({ ...v, [resolved]: { type: "dir" } }));
      }
    } else if (head === "touch") {
      if (!args[0]) {
        out.push("usage: touch <filename>");
      } else {
        const resolved = normalizePath(args[0]);
        setVirtualFs((v) => ({ ...v, [resolved]: { type: "file", content: "" } }));
      }
    } else if (head === "rm") {
      const target = args.find((a) => !a.startsWith("-"));
      if (!target) {
        out.push("usage: rm <filename>");
      } else {
        const resolved = normalizePath(target);
        if (virtualFs[resolved]) {
          setVirtualFs((v) => {
            const next = { ...v };
            delete next[resolved];
            return next;
          });
        } else {
          out.push(`rm: ${target}: No such file or directory`);
        }
      }
    } else if (head === "theme") {
      if (args[0] === "dark" || args[0] === "light") {
        useOs.getState().setTheme(args[0]);
        out.push(`System theme changed to ${args[0]}`);
      } else {
        out.push("usage: theme dark|light");
      }
    } else if (line.toLowerCase() === "sudo hire rosdeb") {
      out.push("[sudo] password for rosdebkoch: ********");
      out.push("Access granted: Senior Mobile & Cross-Platform Engineer available.");
      out.push("Opening Mail composer to start conversation...");
      useOs.getState().openWindow("mail", "Mail");
    } else if (head === "open") {
      const target = args.join(" ").toLowerCase();
      if (!target || target === ".") {
        useOs.getState().openWindow("finder", "Finder", { kind: "path", path: shortCwd.replace("~/", "") });
        out.push(`Opened Finder at ${shortCwd}`);
      } else if (target.includes("safari") || target.startsWith("http://") || target.startsWith("https://")) {
        const urlToOpen = target.startsWith("http") ? target : "https://appicon.site";
        useOs.getState().openWindow("safari", "Safari", { kind: "url", url: urlToOpen, title: "Safari" });
        out.push("Opened Safari");
      } else if (target.includes("finder") || target.includes("project")) {
        useOs.getState().openWindow("finder", "Projects", { kind: "path", path: "Projects" });
        out.push("Opened Finder");
      } else if (target.includes("mail") || target.includes("contact")) {
        useOs.getState().openWindow("mail", "Mail");
        out.push("Opened Mail");
      } else if (target.includes("cv") || target.includes("resume")) {
        useOs.getState().openWindow("preview", "CV", { kind: "note", id: "cv" });
        out.push("Opened CV Preview");
      } else {
        const proj = projects.find((p) => p.name.toLowerCase().includes(target) || p.id.toLowerCase() === target);
        if (proj) {
          useOs.getState().openWindow("preview", proj.name, { kind: "project", id: proj.id });
          out.push(`Opened ${proj.name}`);
        } else {
          out.push(`open: cannot open '${target}'`);
        }
      }
    } else {
      out.push(`zsh: command not found: ${head}. Type "help" for a list of commands.`);
    }

    setLines((l) => [...l, ...out]);
    setHist((h) => [...h, line]);
    setHi(-1);
    setCmd("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = hi < 0 ? hist.length - 1 : Math.max(0, hi - 1);
      setHi(next);
      setCmd(hist[next] ?? "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hi >= 0 && hi < hist.length - 1) {
        const next = hi + 1;
        setHi(next);
        setCmd(hist[next] ?? "");
      } else {
        setHi(-1);
        setCmd("");
      }
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const commands = ["ls", "cd", "pwd", "cat", "open", "whoami", "uname", "date", "echo", "mkdir", "touch", "rm", "clear", "help", "theme", "history"];
      const prefix = cwd === "/" ? "/" : cwd + "/";
      const localFiles = Object.keys(virtualFs)
        .filter((p) => p.startsWith(prefix) && !p.slice(prefix.length).includes("/"))
        .map((p) => p.slice(prefix.length));
      const pool = [...commands, ...localFiles];
      const match = pool.find((item) => item.toLowerCase().startsWith(cmd.toLowerCase()));
      if (match) setCmd(match);
    }
  };

  return (
    <div
      className="flex h-full min-h-[300px] flex-col bg-[#141820] p-3.5 font-mono text-xs text-[#d8dee9] select-text"
      style={{ fontFamily: "var(--font-mono)" }}
      onClick={() => document.getElementById("terminal-input")?.focus()}
    >
      <div className="os-scroll flex-1 overflow-auto whitespace-pre-wrap leading-relaxed space-y-1">
        {lines.map((l, i) => (
          <div key={i} className={l.startsWith("rosdebkoch@MacBook-Pro") ? "text-emerald-400 font-semibold" : l.startsWith("zsh:") ? "text-rose-400" : ""}>
            {l}
          </div>
        ))}
        <div ref={end} />
      </div>

      <form
        className="mt-2 flex items-center pt-2 border-t border-white/10"
        onSubmit={(e) => {
          e.preventDefault();
          run(cmd);
        }}
      >
        <span className="text-emerald-400 font-semibold whitespace-nowrap mr-2">
          rosdebkoch@MacBook-Pro {shortCwd} %
        </span>
        <input
          id="terminal-input"
          className="flex-1 bg-transparent text-white outline-none caret-white"
          value={cmd}
          onChange={(e) => setCmd(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Terminal input"
          autoFocus
        />
      </form>
    </div>
  );
}

function SafariApp({ payload }: { payload?: Payload }) {
  const initialUrl = payload && payload.kind === "url" ? payload.url : "https://appicon.site";
  const [url, setUrl] = useState(initialUrl);
  const [inputUrl, setInputUrl] = useState(initialUrl);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([initialUrl]);
  const [histIndex, setHistIndex] = useState(0);

  useEffect(() => {
    if (payload && payload.kind === "url" && payload.url !== url) {
      setUrl(payload.url);
      setInputUrl(payload.url);
      setHistory((h) => [...h.slice(0, histIndex + 1), payload.url]);
      setHistIndex((i) => i + 1);
    }
  }, [payload]);

  const navigateTo = (target: string) => {
    let clean = target.trim();
    if (!clean.startsWith("http://") && !clean.startsWith("https://")) {
      clean = "https://" + clean;
    }
    setUrl(clean);
    setInputUrl(clean);
    setHistory((h) => [...h.slice(0, histIndex + 1), clean]);
    setHistIndex((i) => i + 1);
  };

  const handleBack = () => {
    if (histIndex > 0) {
      const prev = history[histIndex - 1];
      setHistIndex(histIndex - 1);
      setUrl(prev);
      setInputUrl(prev);
    }
  };

  const handleForward = () => {
    if (histIndex < history.length - 1) {
      const next = history[histIndex + 1];
      setHistIndex(histIndex + 1);
      setUrl(next);
      setInputUrl(next);
    }
  };

  const handleReload = () => {
    const cur = url;
    setUrl("");
    setTimeout(() => setUrl(cur), 50);
  };

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const matchedProject = projects.find((p) => p.links.some((l) => l.url === url) || p.name.toLowerCase() === url.toLowerCase());
  const isExternalBlocked = url.includes("apps.apple.com") || url.includes("play.google.com") || url.includes("github.com") || url.includes("linkedin.com");

  return (
    <div className="flex h-full flex-col bg-paper">
      {/* Safari macOS Top Toolbar */}
      <div className="flex items-center gap-2 border-b border-line bg-canvas/30 px-3 py-2 text-xs select-none">
        <div className="flex items-center gap-1">
          <button
            onClick={handleBack}
            disabled={histIndex === 0}
            className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-canvas disabled:opacity-30 transition-colors"
            title="Back"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleForward}
            disabled={histIndex >= history.length - 1}
            className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-canvas disabled:opacity-30 transition-colors"
            title="Forward"
          >
            <ChevronRight size={16} />
          </button>
          <button
            onClick={handleReload}
            className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-canvas transition-colors"
            title="Reload"
          >
            <RotateCcw size={13} />
          </button>
        </div>

        {/* Address Bar */}
        <form
          className="flex flex-1 items-center gap-1.5 rounded-lg border border-line bg-paper px-3 py-1 shadow-inner focus-within:border-accent"
          onSubmit={(e) => {
            e.preventDefault();
            navigateTo(inputUrl);
          }}
        >
          <Lock size={12} className="text-emerald-500 shrink-0" />
          <input
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="w-full bg-transparent text-xs text-ink outline-none"
            placeholder="Search or enter website name"
          />
        </form>

        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-canvas transition-colors text-muted hover:text-ink"
            title="Copy Link"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
          </button>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-canvas transition-colors text-muted hover:text-ink"
            title="Open in External Browser"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Safari Bookmarks Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-line bg-canvas/15 px-3 py-1.5 text-xs select-none">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted mr-1">Favorites:</span>
        {sites.map((s) => (
          <button
            key={s.url}
            onClick={() => navigateTo(s.url)}
            className={`flex items-center gap-1 shrink-0 rounded-md px-2 py-0.5 text-xs font-medium transition-colors ${
              url === s.url ? "bg-accent text-accent-ink" : "hover:bg-canvas/60 text-muted hover:text-ink"
            }`}
          >
            <Globe size={11} />
            <span>{s.name}</span>
          </button>
        ))}
        <button
          onClick={() => navigateTo(profile.github)}
          className={`flex items-center gap-1 shrink-0 rounded-md px-2 py-0.5 text-xs font-medium transition-colors ${
            url === profile.github ? "bg-accent text-accent-ink" : "hover:bg-canvas/60 text-muted hover:text-ink"
          }`}
        >
          <Github size={11} />
          <span>GitHub</span>
        </button>
        <button
          onClick={() => navigateTo(profile.linkedin)}
          className={`flex items-center gap-1 shrink-0 rounded-md px-2 py-0.5 text-xs font-medium transition-colors ${
            url === profile.linkedin ? "bg-accent text-accent-ink" : "hover:bg-canvas/60 text-muted hover:text-ink"
          }`}
        >
          <Linkedin size={11} />
          <span>LinkedIn</span>
        </button>
      </div>

      {/* Main Browser View */}
      <div className="relative flex-1 bg-white">
        {isExternalBlocked ? (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center bg-canvas/30 text-ink">
            <div className="max-w-md space-y-4 rounded-2xl border border-line bg-paper p-6 shadow-xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                <Globe size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-ink">
                  {matchedProject ? matchedProject.name : "Protected External Site"}
                </h3>
                <p className="mt-1 text-xs text-muted truncate">{url}</p>
              </div>
              <p className="text-xs leading-relaxed text-muted">
                {matchedProject
                  ? `${matchedProject.summary} This external service prevents iframe embedding inside web browsers for security reasons.`
                  : "This domain prohibits embedded viewing via security policies (X-Frame-Options / CSP). You can open it directly in a new tab."}
              </p>
              {matchedProject?.screenshots?.[0] && (
                <div className="h-44 w-full overflow-hidden rounded-xl border border-line bg-black/5">
                  <img src={matchedProject.screenshots[0]} alt={matchedProject.name} className="h-full w-full object-cover" />
                </div>
              )}
              <div className="flex items-center justify-center gap-2 pt-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-accent-ink hover:opacity-90 transition-opacity shadow"
                >
                  <span>Open Official Page</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        ) : (
          url && (
            <iframe
              key={url}
              src={url}
              title="Safari Browser"
              className="h-full w-full border-none"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          )
        )}
      </div>
    </div>
  );
}

function MailApp() {
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  return (
    <div className="mx-auto max-w-lg space-y-3 p-5">
      <h3 className="text-xl font-semibold">Write to Rosdeb</h3>
      <p className="text-sm text-muted">{profile.email}</p>
      {sent ? (
        <p className="rounded-xl bg-canvas p-4 text-sm">Your mail app should open with the message. If it did not, copy {profile.email}.</p>
      ) : (
        <form
          className="space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            if (String(fd.get("company") || "")) return;
            const name = String(fd.get("name") || "").trim();
            const email = String(fd.get("email") || "").trim();
            const message = String(fd.get("message") || "").trim();
            if (!name || !email.includes("@") || message.length < 8) {
              setErr("Add your name, a real email, and a short message.");
              return;
            }
            const href = `mailto:${profile.email}?subject=${encodeURIComponent("Portfolio — " + name)}&body=${encodeURIComponent(message + "\n\n— " + name + " (" + email + ")")}`;
            window.location.href = href;
            setSent(true);
          }}
        >
          <input name="company" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
          <input name="name" placeholder="Name" className="w-full rounded-xl border border-line bg-paper px-3 py-3 text-sm" />
          <input name="email" placeholder="Email" className="w-full rounded-xl border border-line bg-paper px-3 py-3 text-sm" />
          <textarea name="message" placeholder="Message" rows={5} className="w-full rounded-xl border border-line bg-paper px-3 py-3 text-sm" />
          {err && <p className="text-sm text-accent">{err}</p>}
          <div className="flex flex-wrap gap-2">
            <button className="rounded-xl bg-accent px-4 py-2 text-sm text-accent-ink" type="submit">
              Send
            </button>
            <button type="button" className="rounded-xl border border-line px-4 py-2 text-sm" onClick={() => useOs.getState().openWindow("preview", "CV", { kind: "note", id: "cv" })}>
              View CV
            </button>
            <button
              type="button"
              className="rounded-xl border border-line px-4 py-2 text-sm hover:bg-canvas transition-colors"
              onClick={() => useOs.getState().openWindow("safari", "LinkedIn", { kind: "url", url: profile.linkedin, title: "LinkedIn — Rosdeb Koch" })}
            >
              LinkedIn
            </button>
            <button
              type="button"
              className="rounded-xl border border-line px-4 py-2 text-sm hover:bg-canvas transition-colors"
              onClick={() => useOs.getState().openWindow("safari", "GitHub", { kind: "url", url: profile.github, title: "GitHub — Rosdeb" })}
            >
              GitHub
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function SettingsApp() {
  const theme = useOs((s) => s.theme);
  const reduce = useOs((s) => s.reduceMotion);
  return (
    <div className="space-y-4 p-5">
      <h3 className="text-xl font-semibold">System Settings</h3>
      <div className="flex items-center justify-between rounded-2xl border border-line p-4">
        <div>
          <div className="font-medium">Appearance</div>
          <div className="text-sm text-muted">Light or dark desktop</div>
        </div>
        <button className="rounded-xl bg-ink px-3 py-2 text-sm text-paper" onClick={() => useOs.getState().setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? "Use dark" : "Use light"}
        </button>
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-line p-4">
        <div>
          <div className="font-medium">Reduce motion</div>
          <div className="text-sm text-muted">Quieter dock bounce</div>
        </div>
        <button className="rounded-xl border border-line px-3 py-2 text-sm" onClick={() => useOs.getState().setReduceMotion(!reduce)}>
          {reduce ? "Motion off" : "Motion on"}
        </button>
      </div>
      <section className="rounded-2xl border border-line p-4 text-sm leading-relaxed">
        <h4 className="font-semibold">About This Portfolio</h4>
        <p className="mt-2 text-muted">Rosdeb OS 1.0 · React · TanStack Start · Tailwind · Zustand. Original wallpaper and marks. Not affiliated with Apple.</p>
      </section>
    </div>
  );
}

function Spotlight() {
  const open = useOs((s) => s.spotlightOpen);
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const index = useMemo(() => searchIndex(), []);
  const hits = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) {
      return index.filter((h) => ["about", "projf", "expf", "mail", "live"].includes(h.id));
    }
    return index
      .map((h) => {
        const blob = (h.title + " " + h.subtitle + " " + h.keywords).toLowerCase();
        const score = blob.includes(query) ? 2 : query.split(/\s+/).filter((t) => blob.includes(t)).length;
        return { h, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((x) => x.h);
  }, [q, index]);

  useEffect(() => setI(0), [q, open]);
  if (!open) return null;

  const run = (h: SearchHit) => {
    const os = useOs.getState();
    os.setSpotlight(false);
    setQ("");
    if (h.action === "project") os.openWindow("preview", h.title, { kind: "project", id: h.ref });
    else if (h.action === "experience") os.openWindow("preview", h.title, { kind: "experience", id: h.ref });
    else if (h.action === "skill") os.openWindow("skills", h.title, { kind: "skill", id: h.ref });
    else if (h.action === "mail") os.openWindow("mail", "Mail");
    else if (h.action === "finder") os.openWindow("finder", h.title, { kind: "path", path: h.ref || "Projects" });
    else if (h.action === "safari") os.openWindow("safari", "Safari");
    else if (h.action === "terminal") os.openWindow("terminal", "Terminal");
    else if (h.action === "settings") os.openWindow("settings", "Settings");
    else if (h.action === "note") os.openWindow("preview", h.title, { kind: "note", id: h.ref });
    else if (h.action === "url") os.openWindow("safari", h.title, { kind: "url", url: h.ref, title: h.title });
  };

  return (
    <div className="absolute inset-0 z-[90] flex items-start justify-center bg-ink/30 px-4 pt-[12vh]" onPointerDown={() => useOs.getState().setSpotlight(false)}>
      <div className="os-glass win-shadow w-full max-w-xl overflow-hidden rounded-2xl border border-line" onPointerDown={(e) => e.stopPropagation()}>
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search projects, skills, experience…"
          className="w-full bg-transparent px-4 py-4 text-lg outline-none"
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setI((n) => Math.min(hits.length - 1, n + 1));
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setI((n) => Math.max(0, n - 1));
            }
            if (e.key === "Enter" && hits[i]) run(hits[i]);
            if (e.key === "Escape") useOs.getState().setSpotlight(false);
          }}
        />
        <ul className="max-h-80 overflow-auto border-t border-line">
          {hits.map((h, idx) => (
            <li key={h.id}>
              <button className={`flex w-full items-center gap-3 px-4 py-3 text-left ${idx === i ? "bg-accent text-accent-ink" : ""}`} onMouseEnter={() => setI(idx)} onClick={() => run(h)}>
                <span className="w-20 shrink-0 text-[11px] uppercase tracking-wide opacity-70">{h.kind}</span>
                <span>
                  <span className="block text-sm font-medium">{h.title}</span>
                  <span className="block text-xs opacity-80">{h.subtitle}</span>
                </span>
              </button>
            </li>
          ))}
          {hits.length === 0 && <li className="px-4 py-6 text-sm text-muted">No matches. Try Flutter, contact, or Givano.</li>}
        </ul>
      </div>
    </div>
  );
}

function Toast() {
  const toast = useOs((s) => s.toast);
  if (!toast) return null;
  return <div className="os-glass absolute left-1/2 top-12 z-[85] max-w-md -translate-x-1/2 rounded-2xl border border-line px-4 py-3 text-sm">{toast}</div>;
}

function MobileHome() {
  const open = (run: () => void) => run();
  const apps = [
    { name: "Projects", icon: FolderKanban, run: () => useOs.getState().openWindow("finder", "Projects", { kind: "path", path: "Projects" }) },
    { name: "Experience", icon: Briefcase, run: () => useOs.getState().openWindow("finder", "Experience", { kind: "path", path: "Experience" }) },
    { name: "Skills", icon: Sparkles, run: () => useOs.getState().openWindow("skills", "Skills") },
    { name: "Contact", icon: Mail, run: () => useOs.getState().openWindow("mail", "Mail") },
    { name: "CV", icon: FileText, run: () => useOs.getState().openWindow("preview", "CV", { kind: "note", id: "cv" }) },
    { name: "Terminal", icon: TerminalSquare, run: () => useOs.getState().openWindow("terminal", "Terminal") },
    { name: "Sites", icon: Compass, run: () => useOs.getState().openWindow("safari", "Safari") },
    { name: "Search", icon: Search, run: () => useOs.getState().setSpotlight(true) },
  ];
  const windows = useOs((s) => s.windows);
  const top = [...windows].reverse().find((w) => !w.minimized);
  return (
    <div className="flex h-full flex-col pt-4">
      <header className="px-5 pb-2">
        <p className="text-xs uppercase tracking-widest text-accent">Rosdeb OS</p>
        <h1 className="text-2xl font-semibold">{profile.name}</h1>
        <p className="text-sm text-muted">{profile.shortTitle}</p>
      </header>
      <div className="grid grid-cols-4 gap-3 px-4 py-4">
        {apps.map((a) => (
          <button key={a.name} className="flex flex-col items-center gap-1" onClick={() => open(a.run)}>
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-paper/80 text-ink shadow">
              <a.icon size={22} />
            </span>
            <span className="text-[11px]">{a.name}</span>
          </button>
        ))}
      </div>
      {top && (
        <div className="absolute inset-0 z-40 flex flex-col bg-paper">
          <header className="flex items-center gap-2 border-b border-line px-3 py-3">
            <button className="rounded-lg px-2 py-2 text-sm text-accent" onClick={() => useOs.getState().closeWindow(top.id)}>
              Close
            </button>
            <h2 className="flex-1 truncate text-center text-sm font-semibold">{top.title}</h2>
            <span className="w-12" />
          </header>
          <div className="os-scroll min-h-0 flex-1 overflow-auto">
            <WindowBody win={top} />
          </div>
        </div>
      )}
    </div>
  );
}
