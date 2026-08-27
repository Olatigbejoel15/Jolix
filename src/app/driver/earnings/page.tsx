"use client";

import { motion } from "framer-motion";

// Mock data — will come from the real Laravel API later, calculated from
// this driver's actual completed deliveries.
const summary = [
  { label: "Today", value: 12400 },
  { label: "This week", value: 68200 },
  { label: "This month", value: 241500 },
];

const completedDeliveries = [
  { id: "ST-2026-82887", route: "Surulere → Ikoyi", date: "Today, 2:15 PM", amount: 4200 },
  { id: "ST-2026-82860", route: "Yaba → Lekki", date: "Today, 11:40 AM", amount: 5100 },
  { id: "ST-2026-82810", route: "Ikeja → Ajah", date: "Yesterday, 4:50 PM", amount: 6800 },
  { id: "ST-2026-82790", route: "Apapa → Festac", date: "Yesterday, 1:10 PM", amount: 3900 },
];

export default function EarningsPage() {
  return (
    <div>
      <h1 className="font-display font-semibold text-2xl text-ink mb-1">Earnings</h1>
      <p className="text-slate text-sm mb-8">Track what you&apos;ve made from completed deliveries.</p>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {summary.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-white rounded-xl p-5 border border-ink/5 shadow-sm"
          >
            <p className="text-slate text-xs mb-1">{item.label}</p>
            <p className="font-display font-semibold text-ink text-2xl">
              ₦{item.value.toLocaleString()}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Breakdown by delivery */}
      <div className="bg-white rounded-xl border border-ink/5 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-ink/5">
          <p className="font-semibold text-ink text-sm">Recent completed deliveries</p>
        </div>
        <ul>
          {completedDeliveries.map((d) => (
            <li
              key={d.id}
              className="flex items-center justify-between px-5 py-4 border-b border-ink/5 last:border-0"
            >
              <div>
                <p className="font-mono text-sm text-ink">{d.id}</p>
                <p className="text-slate text-xs mt-0.5">
                  {d.route} · {d.date}
                </p>
              </div>
              <span className="text-signal font-semibold text-sm">
                +₦{d.amount.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}