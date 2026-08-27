"use client";

import { useState } from "react";
import Link from "next/link";

// Mock data — will come from the real Laravel API later, with search and
// filtering handled by the database instead of in the browser.
const initialShipments = [
  { id: "ST-2026-84921", customer: "Amaka Eze", route: "Lagos → Abuja", driver: "David O.", status: "In Transit", date: "2026-08-26" },
  { id: "ST-2026-84812", customer: "Tunde Bello", route: "Lagos → Ibadan", driver: "Chinedu K.", status: "Delivered", date: "2026-08-22" },
  { id: "ST-2026-84770", customer: "Ngozi Umeh", route: "Lagos → Port Harcourt", driver: "Unassigned", status: "Pending", date: "2026-08-18" },
  { id: "ST-2026-84701", customer: "Femi Adeyemi", route: "Lagos → Enugu", driver: "David O.", status: "Delivered", date: "2026-08-12" },
  { id: "ST-2026-84650", customer: "Bisi Alabi", route: "Lagos → Lagos", driver: "Musa I.", status: "Cancelled", date: "2026-08-09" },
  { id: "ST-2026-84600", customer: "Chidi Nwosu", route: "Lagos → Kano", driver: "Unassigned", status: "Pending", date: "2026-08-05" },
];

const drivers = ["Unassigned", "David O.", "Chinedu K.", "Musa I.", "Grace T."];
const statusFilters = ["All", "Pending", "In Transit", "Delivered", "Cancelled"];

const statusStyles: Record<string, string> = {
  Pending: "bg-ink/10 text-ink/60",
  "In Transit": "bg-beacon/10 text-beacon",
  Delivered: "bg-signal/10 text-signal",
  Cancelled: "bg-route/10 text-route",
};

export default function AdminShipmentsPage() {
  const [shipments, setShipments] = useState(initialShipments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  function assignDriver(id: string, driver: string) {
    setShipments((prev) =>
      prev.map((s) => (s.id === id ? { ...s, driver, status: s.status === "Pending" ? "In Transit" : s.status } : s))
    );
  }

  function cancelShipment(id: string) {
    setShipments((prev) => prev.map((s) => (s.id === id ? { ...s, status: "Cancelled" } : s)));
  }

  // Applies both filters together: text search AND status filter must
  // both pass for a shipment to remain visible.
  const filtered = shipments.filter((s) => {
    const matchesSearch = s.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h1 className="font-display font-semibold text-2xl text-ink mb-1">Shipments</h1>
      <p className="text-slate text-sm mb-6">View, filter, and manage every shipment on Jolix.</p>

      {/* Search */}
      <div className="relative mb-4 max-w-sm">
        <i className="bi bi-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate text-sm"></i>
        <input
          type="text"
          placeholder="Search tracking number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-ink/15 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
        />
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {statusFilters.map((f) => (
          <button
            key={f}
            onClick={() => setStatusFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              statusFilter === f
                ? "bg-ink text-white"
                : "bg-white text-slate border border-ink/10 hover:border-ink/25"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-ink/5 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/5 text-left text-xs text-slate uppercase tracking-wide">
              <th className="px-5 py-3 font-medium">Tracking ID</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Route</th>
              <th className="px-5 py-3 font-medium">Driver</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-slate text-sm">
                  No shipments match your search.
                </td>
              </tr>
            ) : (
              filtered.map((s) => (
                <tr key={s.id} className="border-b border-ink/5 last:border-0 hover:bg-cloud transition-colors">
                  <td className="px-5 py-3.5">
                    <Link href={`/track/${s.id}`} className="font-mono text-ink hover:text-beacon transition-colors">
                      {s.id}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-ink">{s.customer}</td>
                  <td className="px-5 py-3.5 text-slate">{s.route}</td>
                  <td className="px-5 py-3.5">
                    <select
                      value={s.driver}
                      onChange={(e) => assignDriver(s.id, e.target.value)}
                      disabled={s.status === "Cancelled" || s.status === "Delivered"}
                      className="text-sm border border-ink/15 rounded-lg px-2 py-1.5 bg-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-beacon/50"
                    >
                      {drivers.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[s.status]}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    {s.status !== "Cancelled" && s.status !== "Delivered" && (
                      <button
                        onClick={() => cancelShipment(s.id)}
                        className="text-route text-xs font-medium hover:underline"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}