"use client";

import { useState } from "react";
import Link from "next/link";

// Mock data — same situation as Overview: this will come from a real
// Laravel API call, scoped to the logged-in customer, once the backend
// exists. For now, a fuller static list so the page has something real
// to filter and display.
const allShipments = [
  { id: "ST-2026-84921", route: "Lagos → Abuja", date: "Aug 26, 2026", status: "In Transit", price: 9200 },
  { id: "ST-2026-84812", route: "Lagos → Ibadan", date: "Aug 22, 2026", status: "Delivered", price: 4800 },
  { id: "ST-2026-84770", route: "Lagos → Port Harcourt", date: "Aug 18, 2026", status: "Delivered", price: 11500 },
  { id: "ST-2026-84701", route: "Lagos → Enugu", date: "Aug 12, 2026", status: "Delivered", price: 8300 },
  { id: "ST-2026-84650", route: "Lagos → Lagos (same-day)", date: "Aug 9, 2026", status: "Cancelled", price: 2100 },
];

const filters = ["All", "In Transit", "Delivered", "Cancelled"];

const statusStyles: Record<string, string> = {
  "In Transit": "bg-beacon/10 text-beacon",
  Delivered: "bg-signal/10 text-signal",
  Cancelled: "bg-ink/10 text-ink/50",
};

export default function HistoryPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All" ? allShipments : allShipments.filter((s) => s.status === activeFilter);

  return (
    <div>
      <h1 className="font-display font-semibold text-2xl text-ink mb-1">Delivery history</h1>
      <p className="text-slate text-sm mb-6">Every shipment you&apos;ve created, all in one place.</p>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === f
                ? "bg-ink text-white"
                : "bg-white text-slate border border-ink/10 hover:border-ink/25"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Shipment list */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-ink/5 p-10 text-center">
          <i className="bi bi-inbox text-3xl text-ink/20 mb-3 block"></i>
          <p className="text-slate text-sm">No shipments match this filter.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-ink/5 shadow-sm overflow-hidden">
          {filtered.map((shipment) => (
            <Link
              key={shipment.id}
              href={`/track/${shipment.id}`}
              className="flex items-center justify-between px-5 py-4 border-b border-ink/5 last:border-0 hover:bg-cloud transition-colors"
            >
              <div>
                <p className="font-mono text-sm text-ink">{shipment.id}</p>
                <p className="text-slate text-xs mt-0.5">
                  {shipment.route} · {shipment.date}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-ink font-medium hidden sm:block">
                  ₦{shipment.price.toLocaleString()}
                </span>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyles[shipment.status]}`}>
                  {shipment.status}
                </span>
                <i className="bi bi-chevron-right text-ink/30"></i>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}