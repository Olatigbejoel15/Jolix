"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SuperAdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const isActive = pathname === "/super-admin";

  return (
    <div className="flex flex-col h-full bg-ink text-white p-5">
      <Link href="/" className="flex items-center gap-2 font-display font-semibold text-lg mb-2 px-2">
        <i className="bi bi-truck text-beacon text-xl"></i>
        Jolix
      </Link>
      {/* Distinct badge — visually marks this as a different, higher-privilege portal */}
      <span className="text-beacon text-[11px] font-medium uppercase tracking-widest px-2 mb-8">
        Super Admin
      </span>

      <nav className="flex-1 space-y-1">
        <Link
          href="/super-admin"
          onClick={onNavigate}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
            isActive ? "bg-beacon text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
          }`}
        >
          <i className="bi bi-people-fill"></i>
          Manage Admins
        </Link>
      </nav>

      {/* Jump into the regular Admin dashboard for day-to-day operations —
          not duplicated here, just linked to */}
      <Link
        href="/admin"
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors border border-white/10 mb-2"
      >
        <i className="bi bi-grid-fill"></i>
        Go to Admin Dashboard
      </Link>

      <Link
        href="/login"
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
      >
        <i className="bi bi-box-arrow-right"></i>
        Log out
      </Link>
    </div>
  );
}