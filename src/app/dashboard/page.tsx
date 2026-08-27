"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Mock data — will come from the real Laravel API later, tied to the
// logged-in customer's actual shipments.
const stats = [
  { icon: "bi-box-seam-fill", label: "Active shipments", value: "2" },
  { icon: "bi-check-circle-fill", label: "Delivered", value: "14" },
  { icon: "bi-currency-exchange", label: "Total spent", value: "₦86,400" },
];

const recentShipments = [
  { id: "ST-2026-84921", route: "Lagos → Abuja", status: "In Transit" },
  { id: "ST-2026-84812", route: "Lagos → Ibadan", status: "Delivered" },
  { id: "ST-2026-84770", route: "Lagos → Port Harcourt", status: "Delivered" },
];

export default function DashboardOverview() {
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="font-display font-semibold text-2xl text-ink mb-1">Welcome back</h1>
          <p className="text-slate text-sm">Here&apos;s what&apos;s happening with your shipments.</p>
        </div>
        <Link
          href="/ship"
          className="inline-flex items-center gap-2 bg-beacon hover:bg-beacon-2 transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-full"
        >
          <i className="bi bi-plus-circle-fill"></i> Create Shipment
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-white rounded-xl p-5 border border-ink/5 shadow-sm"
          >
            <div className="w-10 h-10 rounded-lg bg-beacon/10 flex items-center justify-center mb-3">
              <i className={`bi ${stat.icon} text-beacon`}></i>
            </div>
            <p className="text-2xl font-display font-semibold text-ink">{stat.value}</p>
            <p className="text-slate text-xs mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent shipments */}
      <div className="bg-white rounded-xl border border-ink/5 shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink/5">
          <p className="font-semibold text-ink text-sm">Recent shipments</p>
          <Link href="/dashboard/history" className="text-beacon text-sm font-medium hover:underline">
            View all
          </Link>
        </div>

        <ul>
          {recentShipments.map((shipment) => (
            <li key={shipment.id}>
              <Link
                href={`/track/${shipment.id}`}
                className="flex items-center justify-between px-5 py-4 border-b border-ink/5 last:border-0 hover:bg-cloud transition-colors"
              >
                <div>
                  <p className="font-mono text-sm text-ink">{shipment.id}</p>
                  <p className="text-slate text-xs mt-0.5">{shipment.route}</p>
                </div>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    shipment.status === "Delivered"
                      ? "bg-signal/10 text-signal"
                      : "bg-beacon/10 text-beacon"
                  }`}
                >
                  {shipment.status}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}