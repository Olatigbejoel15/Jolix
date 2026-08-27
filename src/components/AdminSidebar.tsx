"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", icon: "bi-grid-fill", label: "Overview" },
  { href: "/admin/shipments", icon: "bi-box-seam-fill", label: "Shipments" },
  { href: "/admin/drivers", icon: "bi-person-badge-fill", label: "Drivers" },
  { href: "/admin/fleet", icon: "bi-truck", label: "Fleet" },
  { href: "/admin/analytics", icon: "bi-bar-chart-fill", label: "Analytics" },
];

export default function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-ink text-white p-5">
      <Link href="/" className="flex items-center gap-2 font-display font-semibold text-lg mb-10 px-2">
        <i className="bi bi-truck text-beacon text-xl"></i>
        Jolix <span className="text-white/40 text-xs font-normal ml-1">Admin</span>
      </Link>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive ? "bg-beacon text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <i className={`bi ${item.icon}`}></i>
              {item.label}
            </Link>
          );
        })}
      </nav>

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