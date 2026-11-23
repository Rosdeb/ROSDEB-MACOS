import { create } from "zustand";

export type AppId =
  | "finder"
  | "preview"
  | "terminal"
  | "safari"
  | "mail"
  | "settings"
  | "welcome"
  | "skills";

export type Payload =
  | { kind: "path"; path: string }
  | { kind: "project"; id: string }
  | { kind: "note"; id: string }
  | { kind: "experience"; id: string }
  | { kind: "skill"; id: string }
  | { kind: "url"; url: string; title?: string };

export type WindowState = {
  id: string;
  app: AppId;
  title: string;
  payload?: Payload;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
  prev?: { x: number; y: number; w: number; h: number };
};

type Phase = "boot" | "login" | "desktop";

type DesktopState = {
  phase: Phase;
  windows: WindowState[];
  focusedId: string | null;
  nextZ: number;
  theme: "light" | "dark";
  reduceMotion: boolean;
  spotlightOpen: boolean;
  toast: string | null;
  bouncing: AppId | null;
  setPhase: (p: Phase) => void;
  openWindow: (app: AppId, title: string, payload?: Payload) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, w: number, h: number, x?: number, y?: number) => void;
  setSpotlight: (open: boolean) => void;
  setTheme: (t: "light" | "dark") => void;
  setReduceMotion: (v: boolean) => void;
  setToast: (t: string | null) => void;
  setBouncing: (a: AppId | null) => void;
};

const uid = () => Math.random().toString(36).slice(2, 9);

const samePayload = (a?: Payload, b?: Payload) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);

export const useOs = create<DesktopState>((set, get) => ({
  phase: "boot",
  windows: [],
  focusedId: null,
  nextZ: 10,
  theme: "light",
  reduceMotion: false,
  spotlightOpen: false,
  toast: null,
  bouncing: null,
  setPhase: (phase) => set({ phase }),
  openWindow: (app, title, payload) => {
    const { windows, nextZ } = get();
    if (app !== "finder") {
      const existing = windows.find((w) => w.app === app && samePayload(w.payload, payload));
      if (existing) {
        get().restoreWindow(existing.id);
        get().focusWindow(existing.id);
        return;
      }
    }
    const offset = (windows.filter((w) => !w.minimized).length % 8) * 26;
    const win: WindowState = {
      id: uid(),
      app,
      title,
      payload,
      x: 72 + offset,
      y: 52 + offset,
      w: app === "finder" || app === "safari" ? 1020 : app === "welcome" ? 600 : 860,
      h: app === "finder" || app === "safari" ? 620 : app === "welcome" ? 480 : 540,
      z: nextZ,
      minimized: false,
      maximized: false,
    };
    set({ windows: [...get().windows, win], focusedId: win.id, nextZ: nextZ + 1, bouncing: app });
    window.setTimeout(() => {
      if (get().bouncing === app) set({ bouncing: null });
    }, 500);
  },
  closeWindow: (id) =>
    set((s) => ({
      windows: s.windows.filter((w) => w.id !== id),
      focusedId: s.focusedId === id ? null : s.focusedId,
    })),
  focusWindow: (id) =>
    set((s) => ({
      focusedId: id,
      nextZ: s.nextZ + 1,
      windows: s.windows.map((w) => (w.id === id ? { ...w, z: s.nextZ } : w)),
    })),
  minimizeWindow: (id) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
      focusedId: s.focusedId === id ? null : s.focusedId,
    })),
  restoreWindow: (id) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, minimized: false } : w)),
      focusedId: id,
    })),
  toggleMaximize: (id) =>
    set((s) => ({
      windows: s.windows.map((w) => {
        if (w.id !== id) return w;
        if (w.maximized && w.prev) return { ...w, ...w.prev, maximized: false, prev: undefined };
        const dock = 86;
        return {
          ...w,
          maximized: true,
          prev: { x: w.x, y: w.y, w: w.w, h: w.h },
          x: 8,
          y: 36,
          w: Math.max(420, window.innerWidth - 16),
          h: Math.max(280, window.innerHeight - 36 - dock),
        };
      }),
    })),
  moveWindow: (id, x, y) =>
    set((s) => ({
      windows: s.windows.map((w) => {
        if (w.id !== id || w.maximized) return w;
        const maxX = Math.max(40, window.innerWidth - 140);
        return {
          ...w,
          x: Math.max(-w.w + 160, Math.min(x, maxX)),
          y: Math.max(32, Math.min(y, window.innerHeight - 80)),
        };
      }),
    })),
  resizeWindow: (id, w, h, x, y) =>
    set((s) => ({
      windows: s.windows.map((win) =>
        win.id === id
          ? {
              ...win,
              w: Math.max(380, w),
              h: Math.max(260, h),
              x: x ?? win.x,
              y: y ?? win.y,
              maximized: false,
            }
          : win,
      ),
    })),
  setSpotlight: (spotlightOpen) => set({ spotlightOpen }),
  setTheme: (theme) => {
    set({ theme });
    try {
      localStorage.setItem("rosdeb-theme", theme);
    } catch {
      /* ignore */
    }
    document.documentElement.dataset.theme = theme;
  },
  setReduceMotion: (reduceMotion) => {
    set({ reduceMotion });
    document.documentElement.dataset.motion = reduceMotion ? "reduce" : "full";
  },
  setToast: (toast) => set({ toast }),
  setBouncing: (bouncing) => set({ bouncing }),
}));
