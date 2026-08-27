"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const values = [
  { icon: "bi-shield-check", title: "Reliability", desc: "Every delivery is tracked, verified, and accounted for, start to finish." },
  { icon: "bi-eye-fill", title: "Transparency", desc: "No hidden statuses — you see exactly where your package is, always." },
  { icon: "bi-lightning-charge-fill", title: "Speed", desc: "From pickup to dispatch, we move fast without cutting corners." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="bg-ink text-white">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="font-mono text-beacon text-sm tracking-widest uppercase mb-3">About us</p>
              <h1 className="font-display font-semibold text-4xl md:text-5xl mb-5">Built to move things forward</h1>
              <p className="text-white/70 text-lg max-w-xl mx-auto">
                Jolix exists to make sending something across town — or across
                borders — as easy as watching it happen, live, on your phone.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-2xl px-6 py-24 text-center">
            <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink mb-5">Our mission</h2>
            <p className="text-slate leading-relaxed">
              Too many deliveries still rely on a phone call and a guess. We
              built Jolix to replace that uncertainty with real visibility —
              connecting customers, drivers, and dispatchers on one platform,
              so every shipment is tracked the moment it leaves your hands
              until the moment it&apos;s signed for.
            </p>
          </div>
        </section>

        <section className="bg-route/5">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <h2 className="font-display font-semibold text-3xl text-ink text-center mb-14">What we believe in</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-xl p-7 border border-ink/5 shadow-sm text-center"
                >
                  <div className="w-12 h-12 rounded-lg bg-beacon/10 flex items-center justify-center mx-auto mb-4">
                    <i className={`bi ${v.icon} text-beacon text-xl`}></i>
                  </div>
                  <h3 className="font-display font-semibold text-ink mb-2">{v.title}</h3>
                  <p className="text-slate text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-beacon text-white overflow-hidden relative">
          <i className="bi bi-truck absolute -right-10 -bottom-10 text-[220px] text-white/10 pointer-events-none"></i>
          <div className="relative mx-auto max-w-2xl px-6 py-20 text-center">
            <h2 className="font-display font-semibold text-3xl mb-4">Want to be part of it?</h2>
            <p className="text-white/90 mb-8">Ship with us, or drive with us — either way, welcome.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/ship" className="bg-ink hover:bg-ink-2 transition-colors text-white font-medium px-6 py-3 rounded-full">
                Create a shipment
              </Link>
              <Link href="/drivers" className="border border-white/30 hover:border-white/50 transition-colors text-white font-medium px-6 py-3 rounded-full">
                Drive with Jolix
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}