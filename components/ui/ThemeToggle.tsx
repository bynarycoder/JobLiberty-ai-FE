"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSyncExternalStore } from "react";

/* SSR-safe mount detection without setState-in-effect */
const emptySubscribe = () => () => undefined;

export function ThemeToggle({ size = "default" as "default" | "sm" }) {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!mounted) {
    return (
      <Button variant="ghost" size={size === "sm" ? "icon-sm" : "icon"} aria-label="Toggle theme" className="rounded-full">
        <span className="h-4 w-4" />
      </Button>
    );
  }

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";

  return (
    <Button
      variant="ghost"
      size={size === "sm" ? "icon-sm" : "icon"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative rounded-full overflow-hidden group hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-transparent hover:border-slate-200 dark:hover:border-white/[0.08] transition-all"
    >
      <span className="relative flex items-center justify-center">
        <Sun className="h-[18px] w-[18px] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
      </span>
      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Button>
  );
}
