"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LiveTrackingShowcase() {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        {/* Left: heading, copy, CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-beacon text-sm tracking-widest uppercase mb-3">
            Live tracking
          </p>
          <h2 className="font-display font-semibold text-3xl md:text-4xl mb-5">
            Not a status label. An actual live location.
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-md">
            Every Jolix delivery reports its real position as it moves ; so
            &quot;in transit&quot; means you can see exactly where it is, not just
            take our word for it.
          </p>
          <Link
            href="/track"
            className="inline-flex items-center gap-2 bg-beacon hover:bg-beacon-2 transition-colors text-white font-medium px-6 py-3 rounded-full"
          >
            Track a shipment <i className="bi bi-arrow-right"></i>
          </Link>
        </motion.div>

        
      </div>
    </section>
  );
}