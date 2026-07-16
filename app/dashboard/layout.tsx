"use client";

import React from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A]">
      {/* Desktop Sidebar */}
      <div className={`${sidebarCollapsed ? "lg:w-[72px]" : "lg:w-[280px]"} hidden lg:block transition-all duration-300 shrink-0`}>
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[300px] bg-white dark:bg-[#0F172A] shadow-2xl">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header trigger */}
        <div className="lg:hidden sticky top-0 z-20 flex h-[64px] items-center gap-3 border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-xl px-4">
          <Button variant="ghost" size="icon-sm" onClick={() => setMobileOpen(true)} className="rounded-full">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-[8px] bg-gradient-to-br from-[#2563EB] to-[#4F46E5] flex items-center justify-center">
              <span className="text-white text-[12px] font-bold">JL</span>
            </div>
            <span className="font-bold tracking-tight">JobLiberty</span>
          </div>
        </div>

        <DashboardTopbar />
        <main className="flex-1 p-5 lg:p-7 max-w-[1600px] w-full mx-auto">
          <div className="animate-[slideUp_0.5s_cubic-bezier(0.16,1,0.3,1)]">{children}</div>
        </main>
      </div>
    </div>
  );
}
