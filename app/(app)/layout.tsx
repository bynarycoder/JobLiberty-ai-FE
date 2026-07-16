"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { cn } from "@/lib/utils";

/**
 * Unified dashboard shell — mounted once for every app route
 * inside the (app) route group.
 *
 *  • Sidebar + topbar persist across ALL pages (no remount, no reload)
 *  • Navigation uses <Link> everywhere → instant client-side transitions
 *  • Active route highlighted via usePathname inside the Sidebar
 *  • Page content transitions are animated (fade + rise)
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  /* Reset scroll on every route change (drawer closes via Sidebar onNavigate) */
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  /* ⌘K / Ctrl+K shortcut → jobs search */
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const url = pathname.startsWith("/jobs") ? null : "/jobs";
        if (url) window.dispatchEvent(new CustomEvent("jobliberty:cmdk"));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [pathname]);

  return (
    <div className="app-shell flex min-h-dvh">
      {/* ── Desktop sidebar (floating glass panel, collapsible) ── */}
      <div
        className={cn(
          "fixed inset-y-3 left-3 z-40 hidden transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:block",
          collapsed ? "w-[84px]" : "w-[282px]"
        )}
      >
        <Sidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed((c) => !c)} />
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-[#0A1020]/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
              className="absolute inset-y-0 left-0 shadow-2xl"
            >
              <Sidebar variant="mobile" onNavigate={() => setMobileOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Main column ── */}
      <div
        className={cn(
          "app-content flex min-w-0 flex-1 flex-col transition-[padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          collapsed ? "lg:pl-[108px]" : "lg:pl-[306px]"
        )}
      >
        <DashboardTopbar onMenuClick={() => setMobileOpen(true)} />

        <main className="mx-auto w-full max-w-[1680px] flex-1 px-4 pb-10 pt-5 sm:px-5 lg:px-8 lg:pt-7">
          {/* Page transition: keyed remount → buttery fade/rise on every route change */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 14, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.995 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* ── Footer ── */}
        <footer className="mx-auto w-full max-w-[1680px] px-4 pb-6 sm:px-5 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-2 rounded-[16px] border border-border/60 bg-card/50 px-5 py-3 text-[11.5px] text-muted-foreground backdrop-blur-sm sm:flex-row">
            <span className="flex items-center gap-1.5">
              <span className="flex h-4 w-4 items-center justify-center rounded-[5px] bg-gradient-to-br from-[#2563EB] to-[#7C3AED] text-[8px] font-extrabold text-white">JL</span>
              JobLiberty © 2026 — Empowering Every Career Journey with AI
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22C55E]" />
              All systems operational • 3MTT NextGen
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
