import React from "react";

export type MacFolderVariant = "plain" | "home" | "projects" | "code" | "documents" | "user";

interface MacFolderIconProps {
  size?: number;
  className?: string;
  variant?: MacFolderVariant;
}

/**
 * Authentic Apple macOS Aqua Blue Folder Icon
 * Includes authentic folder tab geometry, two-tone Aqua gradients,
 * realistic front flap curve with top specular highlight,
 * and optional embossed glyphs (like the iconic macOS Home House).
 */
export function MacFolderIcon({ size = 48, className = "", variant = "plain" }: MacFolderIconProps) {
  const id = React.useId();
  const backGradId = `mac-f-bg-${id}`;
  const frontGradId = `mac-f-fg-${id}`;
  const highlightGradId = `mac-f-hl-${id}`;
  const shadowId = `mac-f-sh-${id}`;

  return (
    <svg
      width={size}
      height={(size * 54) / 64}
      viewBox="0 0 64 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm select-none ${className}`}
    >
      <defs>
        {/* Soft shadow for depth */}
        <filter id={shadowId} x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#003566" floodOpacity="0.25" />
        </filter>

        {/* Back tab gradient */}
        <linearGradient id={backGradId} x1="32" y1="6" x2="32" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#45a6f8" />
          <stop offset="100%" stopColor="#126ecf" />
        </linearGradient>

        {/* Front flap Aqua gradient */}
        <linearGradient id={frontGradId} x1="32" y1="17" x2="32" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6dc5fc" />
          <stop offset="18%" stopColor="#42a7f5" />
          <stop offset="85%" stopColor="#1475d6" />
          <stop offset="100%" stopColor="#0b58a8" />
        </linearGradient>

        {/* Top edge specular highlight */}
        <linearGradient id={highlightGradId} x1="4" y1="17" x2="60" y2="17" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(255,255,255,0.75)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.75)" />
        </linearGradient>
      </defs>

      {/* BACK TAB & FLAP */}
      <path
        d="M 7 12 
           C 7 8.5, 9.5 6, 13 6 
           L 24 6 
           C 27 6, 28.5 8, 30.5 10.5 
           L 32 12.5 
           C 33.5 14, 35 15, 38 15 
           L 52 15 
           C 55.5 15, 58 17.5, 58 21 
           L 58 40 
           C 58 44, 55 47, 51 47 
           L 13 47 
           C 9 47, 7 44, 7 40 
           Z"
        fill={`url(#${backGradId})`}
      />

      {/* Dark interior rim */}
      <rect x="10" y="14" width="44" height="6" rx="2" fill="#0c4a8a" opacity="0.4" />

      {/* FRONT MAIN FLAP WITH CURVED CORNERS & SHADOW */}
      <g filter={`url(#${shadowId})`}>
        <path
          d="M 4 21.5 
             C 4 18.5, 6.5 16.5, 9.8 16.5 
             L 54.2 16.5 
             C 57.5 16.5, 60 18.5, 60 21.5 
             L 58.6 44 
             C 58.3 48.5, 54.8 51.5, 50.2 51.5 
             L 13.8 51.5 
             C 9.2 51.5, 5.7 48.5, 5.4 44 
             Z"
          fill={`url(#${frontGradId})`}
        />

        {/* Top Rim Specular Highlight */}
        <path
          d="M 6.5 18 
             C 7.5 17.2, 8.5 17, 10 17 
             L 54 17 
             C 55.5 17, 56.5 17.2, 57.5 18"
          stroke={`url(#${highlightGradId})`}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />

        {/* Subtle horizontal flap lip crease */}
        <path
          d="M 6 22.5 L 58 22.5"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="0.75"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* EMBOSSED GLYPHS */}
      {/* 1. macOS Home Folder Glyph: Iconic House */}
      {(variant === "home" || variant === "user") && (
        <g opacity="0.92">
          {/* Subtle dark emboss shadow */}
          <path
            d="M 32 23 L 22.5 31.5 L 25.5 31.5 L 25.5 42 L 29.5 42 L 29.5 36.5 L 34.5 36.5 L 34.5 42 L 38.5 42 L 38.5 31.5 L 41.5 31.5 Z"
            fill="#06325f"
            opacity="0.35"
            transform="translate(0, 0.8)"
          />
          {/* Main crisp white house glyph */}
          <path
            d="M 32 23 L 22.5 31.5 L 25.5 31.5 L 25.5 42 L 29.5 42 L 29.5 36.5 L 34.5 36.5 L 34.5 42 L 38.5 42 L 38.5 31.5 L 41.5 31.5 Z"
            fill="#ffffff"
          />
          {/* House chimney */}
          <rect x="36.5" y="24" width="2.2" height="4.5" rx="0.5" fill="#ffffff" />
          {/* House door detail */}
          <path d="M 30.5 37.5 H 33.5 V 42 H 30.5 Z" fill="#2078cf" opacity="0.45" />
        </g>
      )}

      {/* 2. Projects Folder Glyph: Modular Grid / Kanban */}
      {variant === "projects" && (
        <g opacity="0.9">
          <rect x="23" y="25" width="8" height="15" rx="2" fill="#ffffff" />
          <rect x="33" y="25" width="8" height="10" rx="2" fill="#ffffff" />
          <rect x="33" y="37" width="8" height="3" rx="1.5" fill="#ffffff" opacity="0.75" />
        </g>
      )}

      {/* 3. Code / Dev Tools Folder Glyph */}
      {variant === "code" && (
        <g opacity="0.92" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 27 30 L 23 34 L 27 38" />
          <path d="M 37 30 L 41 34 L 37 38" />
          <line x1="34" y1="28" x2="30" y2="40" strokeWidth="1.8" opacity="0.8" />
        </g>
      )}

      {/* 4. Documents Folder Glyph */}
      {variant === "documents" && (
        <g opacity="0.92">
          <path
            d="M 26 25 C 25 25, 24 26, 24 27 L 24 41 C 24 42, 25 43, 26 43 L 38 43 C 39 43, 40 42, 40 41 L 40 30 L 35 25 Z"
            fill="#ffffff"
          />
          <path d="M 35 25 L 35 30 L 40 30 Z" fill="#d2e7fc" />
          <line x1="28" y1="33" x2="36" y2="33" stroke="#2575c7" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="28" y1="36" x2="36" y2="36" stroke="#2575c7" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="28" y1="39" x2="33" y2="39" stroke="#2575c7" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}

/**
 * Authentic macOS Finder Dock Icon (The classic smiling split-tone Mac Face)
 */
export function MacFinderIcon({ size = 48, className = "" }: { size?: number; className?: string }) {
  const id = React.useId();
  const bgGradId = `mac-finder-bg-${id}`;
  const specGradId = `mac-finder-spec-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
    >
      <defs>
        <linearGradient id={bgGradId} x1="32" y1="0" x2="32" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5ec0fc" />
          <stop offset="50%" stopColor="#258ced" />
          <stop offset="100%" stopColor="#0d65c4" />
        </linearGradient>
        <linearGradient id={specGradId} x1="32" y1="2" x2="32" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* Rounded squircle tile */}
      <rect width="64" height="64" rx="14" fill={`url(#${bgGradId})`} />

      {/* Top subtle sheen */}
      <rect x="1.5" y="1.5" width="61" height="30" rx="13" fill={`url(#${specGradId})`} />

      {/* Inner subtle glow rim */}
      <rect x="1" y="1" width="62" height="62" rx="13.25" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />

      {/* Left face tone (vibrant light sky blue) */}
      <path
        d="M 11 15 C 11 13 12 12 14.5 12 L 32 12 L 32 52 L 14.5 52 C 12 52 11 51 11 49 Z"
        fill="#8ae2ff"
      />

      {/* Right face tone (deep royal blue) */}
      <path
        d="M 32 12 L 49.5 12 C 52 12 53 13 53 15 L 53 49 C 53 51 52 52 49.5 52 L 32 52 Z"
        fill="#3ca4f6"
      />

      {/* Dividing nose contour */}
      <path
        d="M 32 12 L 32 37 C 32 37.5 32.5 40 36 40 L 39.5 40"
        stroke="#0c3666"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Left Eye */}
      <circle cx="22" cy="27" r="3" fill="#0c3666" />
      <circle cx="21" cy="26" r="0.9" fill="#ffffff" />

      {/* Right Eye */}
      <circle cx="42" cy="27" r="3" fill="#0c3666" />
      <circle cx="41" cy="26" r="0.9" fill="#ffffff" />

      {/* Smiling Mouth */}
      <path
        d="M 20 44 C 26 51, 38 51, 44 44"
        stroke="#0c3666"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/**
 * Authentic macOS Safari Compass Dock Icon
 */
export function MacSafariIcon({ size = 48, className = "" }: { size?: number; className?: string }) {
  const id = React.useId();
  const bgGradId = `safari-bg-${id}`;
  const specGradId = `safari-spec-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
    >
      <defs>
        <radialGradient id={bgGradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2bd5ff" />
          <stop offset="55%" stopColor="#0072ea" />
          <stop offset="100%" stopColor="#0043a8" />
        </radialGradient>
        <linearGradient id={specGradId} x1="32" y1="0" x2="32" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Outer Squircle Container */}
      <rect width="64" height="64" rx="14" fill="#ffffff" />
      <rect x="0.5" y="0.5" width="63" height="63" rx="13.5" stroke="#e0e0e0" strokeWidth="1" />

      {/* Inner Compass Dial Plate */}
      <circle cx="32" cy="32" r="28" fill={`url(#${bgGradId})`} />
      <circle cx="32" cy="32" r="28" fill={`url(#${specGradId})`} />

      {/* Dial Compass Ring */}
      <circle cx="32" cy="32" r="27.2" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
      <circle cx="32" cy="32" r="23" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" strokeDasharray="1.5 2.5" />

      {/* Dial Tick Marks (12 cardinal/sub-cardinal points) */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1="32"
          y1="5.5"
          x2="32"
          y2={deg % 90 === 0 ? "9" : "7.5"}
          stroke="#ffffff"
          strokeWidth={deg % 90 === 0 ? "1.5" : "0.9"}
          strokeLinecap="round"
          transform={`rotate(${deg} 32 32)`}
          opacity={deg % 90 === 0 ? 0.95 : 0.75}
        />
      ))}

      {/* Compass Needle (rotated 45deg pointing to North-East) */}
      <g transform="rotate(45 32 32)">
        {/* Red North Needle (Left lighter, Right darker shadow) */}
        <polygon points="32,7 36,32 32,29.5" fill="#e0291e" />
        <polygon points="32,7 28,32 32,29.5" fill="#ff4d40" />

        {/* White South Needle (Right lighter, Left silver shadow) */}
        <polygon points="32,57 36,32 32,34.5" fill="#d9d9df" />
        <polygon points="32,57 28,32 32,34.5" fill="#ffffff" />

        {/* Needle Drop Shadow */}
        <line x1="32" y1="7" x2="32" y2="57" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />

        {/* Center Pivot Pin */}
        <circle cx="32" cy="32" r="3.2" fill="#e5e5ea" stroke="#8e8e93" strokeWidth="0.6" />
        <circle cx="32" cy="32" r="1.3" fill="#1c1c1e" />
      </g>
    </svg>
  );
}

/**
 * Authentic macOS Terminal Dock Icon
 */
export function MacTerminalIcon({ size = 48, className = "" }: { size?: number; className?: string }) {
  const id = React.useId();
  const bgGradId = `term-bg-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
    >
      <defs>
        <linearGradient id={bgGradId} x1="32" y1="0" x2="32" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#32343b" />
          <stop offset="50%" stopColor="#1f2025" />
          <stop offset="100%" stopColor="#141518" />
        </linearGradient>
      </defs>

      {/* Outer Squircle Chassis */}
      <rect width="64" height="64" rx="14" fill={`url(#${bgGradId})`} />
      <rect x="0.8" y="0.8" width="62.4" height="62.4" rx="13.2" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

      {/* Screen Inset matching Terminal Background #141820 */}
      <rect x="6" y="8" width="52" height="48" rx="8" fill="#141820" />
      <rect x="6.5" y="8.5" width="51" height="47" rx="7.5" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

      {/* Top Header Window Bar */}
      <rect x="6" y="8" width="52" height="10" rx="8" fill="#1c202a" />
      <rect x="6" y="14" width="52" height="4" fill="#1c202a" />

      {/* Traffic light mini dots */}
      <circle cx="11.5" cy="13" r="1.6" fill="#ff5f57" opacity="0.9" />
      <circle cx="16.5" cy="13" r="1.6" fill="#febc2e" opacity="0.9" />
      <circle cx="21.5" cy="13" r="1.6" fill="#28c840" opacity="0.9" />

      {/* Neon Green Prompt Chevron `>` */}
      <path
        d="M 14 26 L 22 32 L 14 38"
        stroke="#30d158"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Blinking White/Green Cursor Block `_` */}
      <rect x="26" y="36" width="10" height="3" rx="1" fill="#30d158" opacity="0.95" />

      {/* Subtle second code line indicator */}
      <rect x="14" y="44" width="20" height="2" rx="1" fill="#4b5563" opacity="0.6" />
    </svg>
  );
}

/**
 * Authentic macOS Mail Dock Icon
 */
export function MacMailIcon({ size = 48, className = "" }: { size?: number; className?: string }) {
  const id = React.useId();
  const bgGradId = `mail-bg-${id}`;
  const specGradId = `mail-spec-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
    >
      <defs>
        <linearGradient id={bgGradId} x1="32" y1="0" x2="32" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#43b6ff" />
          <stop offset="50%" stopColor="#007aff" />
          <stop offset="100%" stopColor="#0051ba" />
        </linearGradient>
        <linearGradient id={specGradId} x1="32" y1="1" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Outer Squircle */}
      <rect width="64" height="64" rx="14" fill={`url(#${bgGradId})`} />
      <rect x="1" y="1" width="62" height="31" rx="13" fill={`url(#${specGradId})`} />
      <rect x="0.8" y="0.8" width="62.4" height="62.4" rx="13.2" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />

      {/* White Postal Envelope Body */}
      <g filter="drop-shadow(0px 3px 4px rgba(0,25,80,0.35))">
        {/* Envelope back/base */}
        <rect x="9" y="16" width="46" height="32" rx="4" fill="#ffffff" />

        {/* Envelope bottom interior folds */}
        <path d="M 9 48 L 27 34" stroke="#d5e2f0" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M 55 48 L 37 34" stroke="#d5e2f0" strokeWidth="1.6" strokeLinecap="round" />

        {/* Envelope Top Flap V-Fold */}
        <path
          d="M 9 17 L 32 34 L 55 17"
          stroke="#b8cee6"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="#f4f8fc"
        />

        {/* Classic Red/Blue Airmail Stamp in top right corner */}
        <rect x="42" y="19" width="10" height="12" rx="1" fill="#ff3b30" />
        <rect x="43" y="20" width="8" height="10" rx="0.5" fill="#ffffff" />
        <circle cx="47" cy="25" r="2.2" fill="#ff3b30" />
      </g>
    </svg>
  );
}

/**
 * Authentic macOS Settings Dock Icon
 */
export function MacSettingsIcon({ size = 48, className = "" }: { size?: number; className?: string }) {
  const id = React.useId();
  const bgGradId = `settings-bg-${id}`;
  const gearGradId = `settings-gear-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
    >
      <defs>
        <linearGradient id={bgGradId} x1="32" y1="0" x2="32" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#63666e" />
          <stop offset="50%" stopColor="#3d3f45" />
          <stop offset="100%" stopColor="#28292e" />
        </linearGradient>
        <linearGradient id={gearGradId} x1="32" y1="12" x2="32" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#d5d5db" />
          <stop offset="100%" stopColor="#8c8d96" />
        </linearGradient>
      </defs>

      {/* Outer Metallic Squircle */}
      <rect width="64" height="64" rx="14" fill={`url(#${bgGradId})`} />
      <rect x="0.8" y="0.8" width="62.4" height="62.4" rx="13.2" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

      {/* Main Large Center Gear Wheel */}
      <g filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.45))">
        {/* Gear Teeth (10 precision mechanical teeth) */}
        {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
          <rect
            key={deg}
            x="29"
            y="12"
            width="6"
            height="7"
            rx="1.2"
            fill={`url(#${gearGradId})`}
            transform={`rotate(${deg} 32 32)`}
          />
        ))}

        {/* Gear Outer Ring */}
        <circle cx="32" cy="32" r="16" fill={`url(#${gearGradId})`} />

        {/* Gear Inner Recess Shadow */}
        <circle cx="32" cy="32" r="10" fill="#2d2f34" />
        <circle cx="32" cy="32" r="10" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />

        {/* Center Axle Spindle */}
        <circle cx="32" cy="32" r="5" fill={`url(#${gearGradId})`} />
        <circle cx="32" cy="32" r="2" fill="#1e1f24" />
      </g>
    </svg>
  );
}

/**
 * Authentic GitHub Dock Icon
 */
export function MacGithubIcon({ size = 48, className = "" }: { size?: number; className?: string }) {
  const id = React.useId();
  const bgGradId = `gh-bg-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
    >
      <defs>
        <linearGradient id={bgGradId} x1="32" y1="0" x2="32" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#30353c" />
          <stop offset="50%" stopColor="#1e2126" />
          <stop offset="100%" stopColor="#101214" />
        </linearGradient>
      </defs>

      {/* Deep Obsidian Squircle */}
      <rect width="64" height="64" rx="14" fill={`url(#${bgGradId})`} />
      <rect x="0.8" y="0.8" width="62.4" height="62.4" rx="13.2" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />

      {/* Pure White GitHub Octocat Mark */}
      <path
        d="M 32 13 C 21.5 13 13 21.5 13 32 C 13 40.4 18.5 47.5 26.1 50 C 27 50.2 27.4 49.6 27.4 49.1 C 27.4 48.7 27.4 47.3 27.4 45.7 C 22.1 46.8 21 43.1 21 43.1 C 20.1 40.9 18.9 40.3 18.9 40.3 C 17.2 39.1 19 39.1 19 39.1 C 20.9 39.2 22 41.1 22 41.1 C 23.7 44 26.5 43.2 27.6 42.7 C 27.8 41.5 28.3 40.6 28.8 40.1 C 24.6 39.6 20.1 38 20.1 30.7 C 20.1 28.6 20.9 26.9 22.1 25.6 C 21.9 25.1 21.2 23.1 22.3 20.5 C 22.3 20.5 23.9 20 27.5 22.5 C 29 22.1 30.6 21.9 32.2 21.9 C 33.8 21.9 35.4 22.1 37 22.5 C 40.6 20 42.2 20.5 42.2 20.5 C 43.3 23.1 42.6 25.1 42.4 25.6 C 43.6 26.9 44.4 28.6 44.4 30.7 C 44.4 38.1 39.9 39.6 35.6 40.1 C 36.3 40.7 36.9 41.9 36.9 43.7 C 36.9 46.3 36.9 48.4 36.9 49.1 C 36.9 49.6 37.3 50.2 38.2 50 C 45.8 47.5 51.3 40.4 51.3 32 C 51.3 21.5 42.8 13 32 13 Z"
        fill="#ffffff"
      />
    </svg>
  );
}

/**
 * Authentic LinkedIn Dock Icon
 */
export function MacLinkedinIcon({ size = 48, className = "" }: { size?: number; className?: string }) {
  const id = React.useId();
  const bgGradId = `in-bg-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
    >
      <defs>
        <linearGradient id={bgGradId} x1="32" y1="0" x2="32" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1b82e8" />
          <stop offset="60%" stopColor="#0a66c2" />
          <stop offset="100%" stopColor="#004791" />
        </linearGradient>
      </defs>

      {/* Official LinkedIn Blue Squircle */}
      <rect width="64" height="64" rx="14" fill={`url(#${bgGradId})`} />
      <rect x="0.8" y="0.8" width="62.4" height="62.4" rx="13.2" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />

      {/* Bold Crisp White "in" Logo */}
      {/* "i" dot */}
      <circle cx="22" cy="20.5" r="3.2" fill="#ffffff" />

      {/* "i" vertical bar */}
      <rect x="18.8" y="26.5" width="6.4" height="18.5" rx="1.5" fill="#ffffff" />

      {/* "n" rounded letterform */}
      <path
        d="M 30.5 26.5 H 36.8 V 29.8 C 38.1 27.6 40.8 26 44.5 26 C 50.5 26 53 29.8 53 36.2 V 45 H 46.6 V 37.2 C 46.6 34 45.5 32.2 42.8 32.2 C 39.8 32.2 37.8 34.3 37.8 38 V 45 H 30.5 V 26.5 Z"
        fill="#ffffff"
      />
    </svg>
  );
}

/**
 * Authentic macOS Trash Dock Icon
 */
export function MacTrashIcon({ size = 48, className = "" }: { size?: number; className?: string }) {
  const id = React.useId();
  const rimGradId = `trash-rim-${id}`;
  const bodyGradId = `trash-body-${id}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
    >
      <defs>
        <linearGradient id={rimGradId} x1="12" y1="18" x2="52" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id={bodyGradId} x1="32" y1="18" x2="32" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="70%" stopColor="rgba(203,213,225,0.25)" />
          <stop offset="100%" stopColor="rgba(148,163,184,0.35)" />
        </linearGradient>
      </defs>

      {/* Waste Paper Crumples visible inside */}
      <g opacity="0.9">
        <path d="M 23 20 L 26 12 L 34 16 L 31 22 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
        <path d="M 32 17 L 41 10 L 45 19 L 36 21 Z" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.8" />
        <path d="M 27 15 L 35 14" stroke="#94a3b8" strokeWidth="0.6" />
      </g>

      {/* Fluted Translucent Wastebasket Body */}
      <path
        d="M 14 20 L 19 50 C 19.5 53 23.5 55 32 55 C 40.5 55 44.5 53 45 50 L 50 20 Z"
        fill={`url(#${bodyGradId})`}
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1.2"
      />

      {/* Fluting Vertical Ribs */}
      {[22, 27, 32, 37, 42].map((x) => (
        <line
          key={x}
          x1={x}
          y1="22"
          x2={32 + (x - 32) * 0.75}
          y2="52"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      ))}

      {/* Shiny Metal Top Rim */}
      <ellipse cx="32" cy="20" rx="18" ry="4.5" fill={`url(#${rimGradId})`} stroke="#64748b" strokeWidth="0.8" />
      <ellipse cx="32" cy="20" rx="15" ry="3.2" fill="#334155" opacity="0.4" />
    </svg>
  );
}

/**
 * Authentic macOS Document / Text file Icon (e.g. README.md, CV)
 */
export function MacDocIcon({
  size = 48,
  className = "",
  badge = "MD",
}: {
  size?: number;
  className?: string;
  badge?: string;
}) {
  return (
    <svg
      width={size}
      height={(size * 54) / 48}
      viewBox="0 0 48 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm select-none ${className}`}
    >
      {/* Soft shadow */}
      <rect x="7" y="5" width="34" height="44" rx="4" fill="#000000" opacity="0.12" />

      {/* White Paper Body */}
      <path
        d="M 8 7 C 8 4.8, 9.8 3, 12 3 L 32 3 L 40 11 L 40 47 C 40 49.2, 38.2 51, 36 51 L 12 51 C 9.8 51, 8 49.2, 8 47 Z"
        fill="#ffffff"
      />

      {/* Paper Border */}
      <path
        d="M 8 7 C 8 4.8, 9.8 3, 12 3 L 32 3 L 40 11 L 40 47 C 40 49.2, 38.2 51, 36 51 L 12 51 C 9.8 51, 8 49.2, 8 47 Z"
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="1"
      />

      {/* Folded Corner */}
      <path d="M 32 3 L 32 11 L 40 11 Z" fill="#d9e6f2" />
      <path d="M 32 3 L 32 11 L 40 11" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />

      {/* Document Text Lines */}
      <rect x="14" y="16" width="16" height="2" rx="1" fill="#94a3b8" />
      <rect x="14" y="21" width="20" height="2" rx="1" fill="#cbd5e1" />
      <rect x="14" y="26" width="18" height="2" rx="1" fill="#cbd5e1" />
      <rect x="14" y="31" width="14" height="2" rx="1" fill="#cbd5e1" />

      {/* Badge at bottom */}
      {badge && (
        <g>
          <rect x="13" y="37" width="22" height="9" rx="2" fill="#0284c7" />
          <text
            x="24"
            y="43.5"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="6"
            fontFamily="-apple-system, system-ui, sans-serif"
            fontWeight="bold"
            letterSpacing="0.5"
          >
            {badge}
          </text>
        </g>
      )}
    </svg>
  );
}
