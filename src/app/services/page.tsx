"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  { icon: "bi-lightning-charge-fill", title: "Same-day delivery", desc: "Within-city pickup and drop-off, completed the same day — ideal for urgent, local sends." },
  { icon: "bi-signpost-split-fill", title: "Interstate delivery", desc: "Lagos to Abuja and every state in between, tracked door to door on every leg of the journey." },
  { icon: "bi-globe-americas", title: "International delivery", desc: "Shipping to the UK, Europe, African countries, and Canada, with full customs documentation support." },
  { icon: "bi-building-fill", title: "Bulk & business shipping", desc: "Recurring or high-volume shipments for growing businesses, with dedicated dispatch support." },
  { icon: "bi-box-seam", title: "Fragile & special handling", desc: "Extra care packaging and handling instructions for delicate or high-value items." },
  { icon: "bi-file-earmark-text-fill", title: "Document courier", desc: "Fast, trackable delivery for contracts, certificates, and other sensitive paperwork." },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="bg-ink text-white">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="font-mono text-beacon text-sm tracking-widest uppercase mb-3">Services</p>
              <h1 className="font-display font-semibold text-4xl md:text-5xl mb-5">Wherever it&apos;s going, we&apos;ll get it there</h1>
              <p className="text-white/70 text-lg max-w-xl mx-auto">
                From a same-day drop across town to a shipment crossing
                borders — pick the service that fits.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-24 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-cloud rounded-xl p-6 border border-ink/5 shadow-sm hover:shadow-md hover:border-beacon hover:scale-105 transition-all duration-500"
              >
                <div className="w-11 h-11 rounded-lg bg-beacon/10 flex items-center justify-center mb-4">
                  <i className={`bi ${s.icon} text-beacon text-lg`}></i>
                </div>
                <h3 className="font-display font-semibold text-ink mb-2">{s.title}</h3>
                <p className="text-slate text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-beacon text-white overflow-hidden relative">
          <i className="bi bi-truck absolute -right-10 -bottom-10 text-[220px] text-white/10 pointer-events-none"></i>
          <div className="relative mx-auto max-w-2xl px-6 py-20 text-center">
            <h2 className="font-display font-semibold text-3xl mb-4">Ready to ship?</h2>
            <p className="text-white/90 mb-8">Get an instant price — no account required.</p>
            <Link href="/signup" className="inline-flex items-center gap-2 bg-ink hover:bg-ink-2 transition-colors text-white font-medium px-7 py-3.5 rounded-full">
              Create a shipment <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}