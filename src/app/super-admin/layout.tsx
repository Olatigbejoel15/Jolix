"use client";

import { useState } from "react";
import SuperAdminSidebar from "@/components/SuperAdminSidebar";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-cloud">
      <aside className="hidden md:block w-64 shrink-0">
        <SuperAdminSidebar />
      </aside>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-ink/60" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 h-full">
            <SuperAdminSidebar onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="md:hidden flex items-center justify-between bg-ink text-white px-5 h-14">
          <span className="font-display font-semibold">Jolix Super Admin</span>
          <button onClick={() => setMobileOpen(true)} className="text-xl">
            <i className="bi bi-list"></i>
          </button>
        </div>

        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}