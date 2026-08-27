"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/driver", icon: "bi-grid-fill", label: "Today's Deliveries" },
  { href: "/driver/earnings", icon: "bi-cash-stack", label: "Earnings" },
  { href: "/driver/profile", icon: "bi-person-fill", label: "Profile" },
];

export default function DriverSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-ink text-white p-5">
      <Link href="/" className="flex items-center gap-2 font-display font-semibold text-lg mb-10 px-2">
        <i className="bi bi-truck text-beacon text-xl"></i>
        Jolix <span className="text-white/40 text-xs font-normal ml-1">Driver</span>
      </Link>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/driver" ? pathname === "/driver" : pathname.startsWith(item.href);

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