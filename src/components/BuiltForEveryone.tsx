"use client";

import { motion } from "framer-motion";

const audiences = [
  {
    icon: "bi-person-fill",
    title: "For customers",
    desc: "Create shipments, get instant pricing, and track every delivery live.",
    points: ["Create a shipment in minutes", "Live tracking with ETA", "Full delivery history"],
    badgeClass: "bg-beacon/10",
    iconClass: "text-beacon",
    checkClass: "text-beacon",
  },
  {
    icon: "bi-truck",
    title: "For drivers",
    desc: "A dashboard built for the road , assigned deliveries, navigation, and earnings.",
    points: ["See today's deliveries", "Update status on the go", "Track your earnings"],
    badgeClass: "bg-route/10",
    iconClass: "text-route",
    checkClass: "text-route",
  },
  {
    icon: "bi-speedometer2",
    title: "For dispatchers",
    desc: "Manage every shipment, driver, and vehicle from one live dashboard.",
    points: ["Assign drivers instantly", "Revenue & delivery analytics", "Full fleet oversight"],
    badgeClass: "bg-signal/10",
    iconClass: "text-signal",
    checkClass: "text-signal",
  },
];

export default function BuiltForEveryone() {
  return (
    <section className="bg-route/5">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-beacon text-sm tracking-widest uppercase mb-3">
            Built for everyone
          </p>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-ink">
            One platform, three ways to use it
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {audiences.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-2xl p-7 border border-ink/5 shadow-sm hover:shadow-md transition-all duration-500"
            >
              <div className={`w-12 h-12 rounded-lg ${a.badgeClass} flex items-center justify-center mb-5`}>
                <i className={`bi ${a.icon} ${a.iconClass} text-xl`}></i>
              </div>

              <h3 className="font-display font-semibold text-lg text-ink mb-2">{a.title}</h3>
              <p className="text-slate text-sm mb-5 leading-relaxed">{a.desc}</p>

              <ul className="space-y-2">
                {a.points.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-sm text-ink/80">
                    <i className={`bi bi-check-circle-fill ${a.checkClass} text-xs`}></i>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}