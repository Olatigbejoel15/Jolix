"use client";

import { motion } from "framer-motion";

const services = [
  {
    icon: "bi-lightning-charge-fill",
    title: "Same-day delivery",
    desc: "Within-city drop-offs, picked up and delivered the same day.",
  },
  {
    icon: "bi-signpost-split-fill",
    title: "Interstate delivery",
    desc: "Lagos to Abuja and every state in between, tracked door to door.",
  },
  {
    icon: "bi-globe-americas",
    title: "International delivery",
    desc: "Shipping to the UK, Europe, African countries, and Canada.",
  },
  {
    icon: "bi-building-fill",
    title: "Bulk & business shipping",
    desc: "Recurring or high-volume shipments for growing businesses.",
  },
];

export default function Services() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-beacon text-sm tracking-widest uppercase mb-3">
            Services
          </p>
          <h2 className="font-display font-semibold text-3xl md:text-4xl text-ink">
            Wherever it&apos;s going, we&apos;ll get it there
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-cloud rounded-xl p-6 border border-ink/10 shadow-sm hover:border-beacon hover:shadow-lg hover:scale-105 transition-all duration-500 ease-out"
            >
              <div className="w-11 h-11 rounded-lg bg-beacon/10 flex items-center justify-center mb-4">
                <i className={`bi ${service.icon} text-beacon text-lg`}></i>
              </div>
              <h3 className="font-display font-semibold text-ink mb-2">{service.title}</h3>
              <p className="text-slate text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}