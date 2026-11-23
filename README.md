# Rosdeb OS — macOS Desktop Portfolio 

A realistic, interactive macOS desktop portfolio experience built for **Rosdeb Koch** (Senior Mobile & Cross-Platform Engineer).

Built with **React 19**, **TanStack Start**, **Tailwind CSS v4**, and **Zustand**.

---

## ✨ Features

- 🖥️ **Authentic macOS Desktop & Sonoma/Ventura Glass Lock Screen**:
  - Transparent frosted glass login screen with avatar ring, smooth unlock animation, and password/guest entry.
  - Native macOS menu bar with real-time clock, status indicators, Control Center, and <kbd>⌘K</kbd> Spotlight search.
  - Interactive macOS Dock with bouncing dock animations, active indicators, and app launch triggers.
- 📁 **macOS Finder**:
  - Full-featured file browser with sidebar categories (Favorites, Projects, Work, Education, Skills, Contact).
  - Multi-view switching: Icon View with rich project mockups/thumbnails, List View with sortable columns.
  - Expanded spacious layout (1020px default width) with quick-preview inspection pane.
- 🌐 **In-App Safari Browser**:
  - Embedded in-app browser with macOS toolbar controls (Back, Forward, Reload, Share, URL bar, Quick bookmarks).
  - Opens project demos, GitHub repos, and live links within the desktop environment.
  - Graceful fallback cards for frame-restricted external websites.
- 💻 **Interactive Unix Terminal**:
  - Authentic macOS zsh terminal emulator.
  - Working Unix shell commands: `ls`, `ls -la`, `cd`, `pwd`, `cat`, `whoami`, `uname -a`, `date`, `echo`, `mkdir`, `clear`, `help`.
  - Command history navigation (<kbd>↑</kbd> / <kbd>↓</kbd>) and auto-completion (<kbd>Tab</kbd>).
- 🖼️ **Preview App (Quick Look & Media)**:
  - High-res project screenshot gallery carousel with interactive lightbox zoom.
  - Direct PDF resume viewing & download for `rosdeb--cv.pdf`.
- 🔍 **Spotlight Search (<kbd>⌘K</kbd>)**:
  - Global instant search across apps, projects, technical skills, and files.

---

## 🛠️ Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) / [TanStack Router](https://tanstack.com/router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ (recommended Node 22)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Rosdeb/ROSDEB-MACOS.git
cd ROSDEB-MACOS

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

### Building for Production

```bash
# Typecheck
npm run typecheck

# Build for production
npm run build
```

---

## 📄 License

Created by [Rosdeb Koch](https://github.com/Rosdeb).
