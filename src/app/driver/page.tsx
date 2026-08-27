"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Mock data — will come from the real Laravel API later, scoped to
// whichever driver is actually logged in. Each delivery has its own
// status, which changes as the driver interacts with it below.
const initialDeliveries = [
  {
    id: "ST-2026-82931",
    from: "Ikeja",
    to: "Victoria Island",
    packageType: "Electronics",
    icon: "bi-laptop",
    status: "pending", // pending -> accepted -> in_progress
  },
  {
    id: "ST-2026-82944",
    from: "Yaba",
    to: "Lekki Phase 1",
    packageType: "Document",
    icon: "bi-file-earmark-text-fill",
    status: "pending",
  },
  {
    id: "ST-2026-82887",
    from: "Surulere",
    to: "Ikoyi",
    packageType: "Parcel",
    icon: "bi-box-seam-fill",
    status: "accepted",
  },
];

const statusConfig = {
  pending: { label: "New", style: "bg-ink/10 text-ink/60" },
  accepted: { label: "Accepted", style: "bg-route/10 text-route" },
  in_progress: { label: "In Progress", style: "bg-beacon/10 text-beacon" },
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function DriverHome() {
  const [deliveries, setDeliveries] = useState(initialDeliveries);

  function updateStatus(id: string, newStatus: string) {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    );
  }

  return (
    <div>
      <h1 className="font-display font-semibold text-2xl text-ink mb-1">
        {getGreeting()}, David 👋
      </h1>
      <p className="text-slate text-sm mb-8">
        You have {deliveries.length} deliveries assigned today.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {deliveries.map((delivery, i) => {
          const config = statusConfig[delivery.status as keyof typeof statusConfig];

          return (
            <motion.div
              key={delivery.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-xl border border-ink/5 shadow-sm p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-slate">{delivery.id}</span>
                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${config.style}`}>
                  {config.label}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-ink mb-4">
                <i className="bi bi-geo-alt-fill text-slate"></i>
                {delivery.from}
                <i className="bi bi-arrow-right text-slate"></i>
                {delivery.to}
              </div>

              <div className="flex items-center gap-2 text-sm text-slate mb-5">
                <i className={`bi ${delivery.icon}`}></i>
                {delivery.packageType}
              </div>

              {delivery.status === "pending" && (
                <button
                  onClick={() => updateStatus(delivery.id, "accepted")}
                  className="w-full bg-ink hover:bg-ink-2 transition-colors text-white text-sm font-medium py-2.5 rounded-lg"
                >
                  Accept Delivery
                </button>
              )}

              {delivery.status === "accepted" && (
                <button
                  onClick={() => updateStatus(delivery.id, "in_progress")}
                  className="w-full bg-beacon hover:bg-beacon-2 transition-colors text-white text-sm font-medium py-2.5 rounded-lg"
                >
                  Start Delivery
                </button>
              )}

              {delivery.status === "in_progress" && (
                <Link
                  href={`/driver/deliveries/${delivery.id}`}
                  className="block text-center w-full bg-beacon hover:bg-beacon-2 transition-colors text-white text-sm font-medium py-2.5 rounded-lg"
                >
                  Continue Delivery
                </Link>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}