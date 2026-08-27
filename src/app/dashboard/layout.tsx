"use client";

import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-cloud">
      {/* Desktop sidebar — permanent, always visible from md up */}
      <aside className="hidden md:block w-64 shrink-0">
        <DashboardSidebar />
      </aside>

      {/* Mobile sidebar — a drawer that slides in, only rendered when open */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Dark backdrop — clicking it closes the drawer */}
          <div className="fixed inset-0 bg-ink/60" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 h-full">
            <DashboardSidebar onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main content column */}
      <div className="flex-1 min-w-0">
        {/* Mobile top bar — only visible below md, holds the menu button */}
        <div className="md:hidden flex items-center justify-between bg-ink text-white px-5 h-14">
          <span className="font-display font-semibold">Jolix</span>
          <button onClick={() => setMobileOpen(true)} className="text-xl">
            <i className="bi bi-list"></i>
          </button>
        </div>

        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}