"use client";

import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// Mock data — will come from the real Laravel API later, aggregated from
// actual shipments in the database.
const stats = [
  { icon: "bi-box-seam-fill", label: "Total Shipments", value: "12,840" },
  { icon: "bi-check-circle-fill", label: "Completed", value: "10,421", accent: "signal" },
  { icon: "bi-truck", label: "In Transit", value: "1,832", accent: "beacon" },
  { icon: "bi-x-circle-fill", label: "Cancelled", value: "587", accent: "ink" },
  { icon: "bi-cash-stack", label: "Revenue", value: "₦84,200,000", accent: "signal" },
  { icon: "bi-speedometer2", label: "On-time delivery", value: "91%", accent: "route" },
];

const weeklyShipments = [
  { day: "Mon", shipments: 1420 },
  { day: "Tue", shipments: 1680 },
  { day: "Wed", shipments: 1540 },
  { day: "Thu", shipments: 1890 },
  { day: "Fri", shipments: 2210 },
  { day: "Sat", shipments: 1760 },
  { day: "Sun", shipments: 980 },
];

const accentText: Record<string, string> = {
  signal: "text-signal",
  beacon: "text-beacon",
  route: "text-route",
  ink: "text-ink/50",
};

const accentBg: Record<string, string> = {
  signal: "bg-signal/10",
  beacon: "bg-beacon/10",
  route: "bg-route/10",
  ink: "bg-ink/10",
};

export default function AdminOverview() {
  return (
    <div>
      <h1 className="font-display font-semibold text-2xl text-ink mb-1">Overview</h1>
      <p className="text-slate text-sm mb-8">A snapshot of everything happening on Jolix right now.</p>

      {/* Stats grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {stats.map((stat, i) => {
          const accent = stat.accent || "beacon";
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="bg-white rounded-xl p-5 border border-ink/5 shadow-sm"
            >
              <div className={`w-10 h-10 rounded-lg ${accentBg[accent]} flex items-center justify-center mb-3`}>
                <i className={`bi ${stat.icon} ${accentText[accent]}`}></i>
              </div>
              <p className="text-2xl font-display font-semibold text-ink">{stat.value}</p>
              <p className="text-slate text-xs mt-1">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-ink/5 shadow-sm p-6">
        <p className="font-semibold text-ink text-sm mb-1">Shipments this week</p>
        <p className="text-slate text-xs mb-6">Daily shipment volume, Monday through Sunday.</p>

        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={weeklyShipments}>
            <CartesianGrid strokeDasharray="3 3" stroke="#0c1b3312" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#5b6478" }} axisLine={{ stroke: "#0c1b3320" }} />
            <YAxis tick={{ fontSize: 12, fill: "#5b6478" }} axisLine={{ stroke: "#0c1b3320" }} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "1px solid #0c1b3315", fontSize: 13 }}
              labelStyle={{ color: "#0c1b33", fontWeight: 600 }}
            />
            <Line
              type="monotone"
              dataKey="shipments"
              stroke="#ff6a3d"
              strokeWidth={2.5}
              dot={{ fill: "#ff6a3d", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}