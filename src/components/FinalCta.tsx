"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FinalCta() {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display font-semibold text-3xl md:text-4xl mb-5">
            Ready to ship smarter?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Create your first shipment in minutes, no account required to
            get started.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className="bg-beacon hover:bg-beacon-2 transition-colors text-white font-medium px-7 py-3.5 rounded-full"
            >
              Create a shipment
            </Link>
            <Link
              href="/track"
              className="border border-white/25 hover:border-white/50 transition-colors text-white font-medium px-7 py-3.5 rounded-full"
            >
              Track a shipment
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}