"use client";

import React from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";

export default function OpportunityHubLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Sidebar />
      <div className="flex-1 lg:ml-64">
        <DashboardTopbar />
        <main className="p-6 lg:p-8 max-w-[1280px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
