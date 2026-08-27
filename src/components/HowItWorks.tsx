"use client";

import { motion } from "framer-motion";
import DeliveryScene from "./DeliveryScene";

const steps = [
  {
    icon: "bi-box-seam-fill",
    title: "Create a shipment",
    desc: "Enter pickup and dropoff, package type and weight — get an instant price.",
  },
  {
    icon: "bi-person-check-fill",
    title: "We assign a driver",
    desc: "A verified driver near your pickup point is matched to your delivery.",
  },
  {
    icon: "bi-broadcast",
    title: "Track it live",
    desc: "Watch your package move in real time, from pickup to your door.",
  },
  {
    icon: "bi-check-circle-fill",
    title: "Signed and delivered",
    desc: "Get notified the moment it arrives, with proof of delivery attached.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-cloud">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-beacon text-sm tracking-widest uppercase mb-3">
            How it works
          </p>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-ink">
            From pickup to your door, in four steps
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: the delivery scene, same card treatment as the hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-ink text-white rounded-2xl p-6 shadow-xl shadow-ink/20"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-sm text-white/60">ST-2026-84921</span>
              <span className="flex items-center gap-1.5 bg-beacon/20 text-beacon text-xs font-medium px-3 py-1 rounded-full">
                <i className="bi bi-truck"></i> In Transit
              </span>
            </div>

            <DeliveryScene />
          </motion.div>

          {/* Right: the four steps, stacked vertically */}
          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex items-start gap-4"
              >
                <div className="shrink-0 w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center font-display font-semibold text-sm">
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <i className={`bi ${step.icon} text-beacon`}></i>
                    <h3 className="font-display font-semibold text-ink">{step.title}</h3>
                  </div>
                  <p className="text-slate text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}