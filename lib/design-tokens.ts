/**
 * JobLiberty Premium Design Tokens
 * Author: Abdulwahab Abdulyekeen — 3MTT NextGen Fellow
 * Brand: Empowering Every Career Journey with AI
 */

export const colors = {
  brand: {
    royal: "#2563EB",
    royalDark: "#1D4ED8",
    emerald: "#10B981",
    emeraldDark: "#059669",
    indigo: "#7C3AED",
    indigoDark: "#6D28D9",
  },
  semantic: {
    warning: "#F59E0B",
    error: "#EF4444",
    success: "#22C55E",
    info: "#0EA5E9",
  },
  light: {
    background: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceMuted: "#F1F5F9",
    border: "#E2E8F0",
    borderStrong: "#CBD5E1",
    text: "#0F172A",
    textMuted: "#64748B",
  },
  dark: {
    background: "#0F172A",
    surface: "#1E293B",
    card: "#111827",
    border: "#1E293B",
    borderStrong: "#334155",
    text: "#F1F5F9",
    textMuted: "#94A3B8",
  },
} as const;

export const gradients = {
  primary: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 45%, #4F46E5 100%)",
  emerald: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
  indigo: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
  mesh: "radial-gradient(at 0% 0%, rgba(37,99,235,0.12) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(16,185,129,0.12) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(124,58,237,0.10) 0, transparent 50%)",
  hero: "linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 50%, #F8FAFC 100%)",
  darkHero: "linear-gradient(180deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
} as const;

export const shadows = {
  xs: "0 1px 2px 0 rgb(15 23 42 / 0.04)",
  sm: "0 1px 3px 0 rgb(15 23 42 / 0.06), 0 1px 2px -1px rgb(15 23 42 / 0.06)",
  md: "0 4px 6px -1px rgb(15 23 42 / 0.06), 0 2px 4px -2px rgb(15 23 42 / 0.06)",
  lg: "0 10px 15px -3px rgb(15 23 42 / 0.06), 0 4px 6px -4px rgb(15 23 42 / 0.06)",
  xl: "0 20px 25px -5px rgb(15 23 42 / 0.08), 0 8px 10px -6px rgb(15 23 42 / 0.08)",
  brand: "0 10px 20px -3px rgb(37 99 235 / 0.25), 0 4px 10px -4px rgb(37 99 235 / 0.15)",
  emerald: "0 10px 20px -3px rgb(16 185 129 / 0.25)",
} as const;

export const radii = {
  xs: "6px",
  sm: "10px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  "2xl": "24px",
  full: "9999px",
} as const;

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px",
} as const;

export const typography = {
  fontSans: '"Plus Jakarta Sans", "Inter", ui-sans-serif, system-ui, sans-serif',
  fontMono: '"JetBrains Mono", ui-monospace, monospace',
  sizes: {
    xs: "11px",
    sm: "13px",
    base: "14px",
    lg: "16px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "60px",
  },
} as const;

export const animation = {
  ease: {
    default: "cubic-bezier(0.16, 1, 0.3, 1)",
    spring: "cubic-bezier(0.23, 1, 0.32, 1)",
    smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  duration: {
    fast: "150ms",
    normal: "250ms",
    slow: "350ms",
    slower: "500ms",
  },
} as const;

export const workModeConfig = {
  remote: {
    label: "Remote",
    color: "#10B981",
    bg: "#ECFDF5",
    darkBg: "#064E3B",
    icon: "🌍",
  },
  hybrid: {
    label: "Hybrid",
    color: "#F59E0B",
    bg: "#FFFBEB",
    darkBg: "#78350F",
    icon: "🏢",
  },
  onsite: {
    label: "On-site",
    color: "#2563EB",
    bg: "#EFF6FF",
    darkBg: "#1E3A8A",
    icon: "📍",
  },
} as const;
