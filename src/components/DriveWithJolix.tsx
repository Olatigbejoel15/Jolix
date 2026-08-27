"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function DriveWithJolix() {
  return (
    <section className="bg-beacon text-white overflow-hidden relative">
      {/* Faint oversized truck icon in the background — decorative only,
          reinforces the theme without competing with the text */}
      <i className="bi bi-truck absolute -right-10 -bottom-10 text-[220px] text-white/10 pointer-events-none"></i>

      <div className="relative mx-auto max-w-6xl px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left"
        >
          <p className="font-mono text-sm tracking-widest uppercase mb-3 text-white/80">
            Drive with Jolix
          </p>
          <h2 className="font-display font-semibold text-3xl md:text-4xl mb-3">
            Turn your vehicle into an income stream
          </h2>
          <p className="text-white/90 max-w-md">
            Set your own hours, get matched to nearby deliveries, and get
            paid weekly. All you need is a valid license and a vehicle.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Link
            href="/drivers"
            className="inline-flex items-center gap-2 bg-ink hover:bg-ink-2 transition-colors text-white font-medium px-7 py-3.5 rounded-full whitespace-nowrap"
          >
            Become a driver <i className="bi bi-arrow-right"></i>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}