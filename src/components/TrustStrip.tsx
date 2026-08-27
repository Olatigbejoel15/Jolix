"use client";

import { motion } from "framer-motion";

// Each stat: an icon, a short bold label, and a one-line description.
// Kept honest — no invented numbers before Jolix has real ones.
const stats = [
  { icon: "bi-broadcast", label: "Live", desc: "GPS tracking on every delivery" },
  { icon: "bi-clock-history", label: "24/7", desc: "Dispatch, always on" },
  { icon: "bi-shield-check", label: "Verified", desc: "Every driver checked and rated" },
  { icon: "bi-geo-alt", label: "Nationwide", desc: "Lagos, Abuja, and beyond" },
];

export default function TrustStrip() {
  return (
    <section className="bg-white border-b border-ink/10">
      <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex items-center gap-3"
          >
            <i className={`bi ${stat.icon} text-2xl text-beacon`}></i>
            <div>
              <p className="font-display font-semibold text-ink leading-none">{stat.label}</p>
              <p className="text-slate text-xs mt-1">{stat.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}