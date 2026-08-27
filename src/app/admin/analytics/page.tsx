"use client";

import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer,
} from "recharts";

// Mock data — will come from the real Laravel API later, aggregated from
// actual shipments and payments in the database.
const monthlyRevenue = [
  { month: "Mar", revenue: 9800000 },
  { month: "Apr", revenue: 11200000 },
  { month: "May", revenue: 10500000 },
  { month: "Jun", revenue: 13800000 },
  { month: "Jul", revenue: 15200000 },
  { month: "Aug", revenue: 16900000 },
];

const monthlyShipments = [
  { month: "Mar", shipments: 1620 },
  { month: "Apr", shipments: 1840 },
  { month: "May", shipments: 1750 },
  { month: "Jun", shipments: 2210 },
  { month: "Jul", shipments: 2480 },
  { month: "Aug", shipments: 2690 },
];

const statusBreakdown = [
  { name: "Delivered", value: 10421, color: "#1fae64" },
  { name: "In Transit", value: 1832, color: "#ff6a3d" },
  { name: "Pending", value: 421, color: "#2f6fed" },
  { name: "Cancelled", value: 587, color: "#0c1b3350" },
];

export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="font-display font-semibold text-2xl text-ink mb-1">Analytics</h1>
      <p className="text-slate text-sm mb-8">Delivery performance and revenue, over time.</p>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue — bar chart */}
        <div className="bg-white rounded-xl border border-ink/5 shadow-sm p-6">
          <p className="font-semibold text-ink text-sm mb-1">Monthly revenue</p>
          <p className="text-slate text-xs mb-6">Last 6 months, in Naira.</p>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0c1b3312" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#5b6478" }} axisLine={{ stroke: "#0c1b3320" }} />
              <YAxis
                tick={{ fontSize: 12, fill: "#5b6478" }}
                axisLine={{ stroke: "#0c1b3320" }}
                tickFormatter={(value) => `₦${(value / 1000000).toFixed(0)}M`}
              />
              <Tooltip
                formatter={(value) => value ? `₦${(value as number).toLocaleString()}` : ""}
                contentStyle={{ borderRadius: 8, border: "1px solid #0c1b3315", fontSize: 13 }}
              />
              <Bar dataKey="revenue" fill="#ff6a3d" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Shipment volume — line chart */}
        <div className="bg-white rounded-xl border border-ink/5 shadow-sm p-6">
          <p className="font-semibold text-ink text-sm mb-1">Shipment volume</p>
          <p className="text-slate text-xs mb-6">Total shipments per month.</p>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthlyShipments}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0c1b3312" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#5b6478" }} axisLine={{ stroke: "#0c1b3320" }} />
              <YAxis tick={{ fontSize: 12, fill: "#5b6478" }} axisLine={{ stroke: "#0c1b3320" }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #0c1b3315", fontSize: 13 }} />
              <Line
                type="monotone"
                dataKey="shipments"
                stroke="#2f6fed"
                strokeWidth={2.5}
                dot={{ fill: "#2f6fed", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status breakdown — pie chart */}
      <div className="bg-white rounded-xl border border-ink/5 shadow-sm p-6">
        <p className="font-semibold text-ink text-sm mb-1">Delivery status breakdown</p>
        <p className="text-slate text-xs mb-6">All-time shipment outcomes.</p>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusBreakdown}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={2}
            >
              {statusBreakdown.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => value !== undefined ? (value as number).toLocaleString() : ""}
              contentStyle={{ borderRadius: 8, border: "1px solid #0c1b3315", fontSize: 13 }}
            />
            <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 13 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}