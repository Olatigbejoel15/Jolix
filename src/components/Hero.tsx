"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import DeliveryScene from "./DeliveryScene";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[640px] flex items-center">
      {/* Background photo — fills the entire section behind everything else */}
      <Image
        src="/images/hero-bg.jpg"
        alt="Jolix delivery truck on the road"
        fill
        priority
        className="object-cover"
      />

      {/* Dark navy gradient on top of the photo, so white text stays readable.
          Strongest on the left (where the headline sits), fading out to the
          right (where more of the photo should show through). */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/30" />

      {/* Actual content sits on z-10, above both the photo and the overlay */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        {/* Left side: headline and buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="font-mono text-beacon text-sm tracking-widest uppercase mb-4">
            Lagos → Abuja → Everywhere
          </p>
          <h1 className="font-display font-semibold text-4xl md:text-5xl leading-tight mb-6 text-white">
            Track every delivery,
            <br />
            live.
          </h1>
          <p className="text-white/80 text-lg mb-8 max-w-md">
            Jolix connects customers, drivers, and dispatchers on one
            platform, from the moment a shipment is created to the second
            it&apos;s signed for.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/ship"
              className="bg-beacon hover:bg-beacon-2 transition-colors text-white font-medium px-6 py-3 rounded-full"
            >
              Create a shipment
            </Link>
            <Link
              href="/drivers"
              className="border border-white/30 hover:border-white/50 transition-colors text-white font-medium px-6 py-3 rounded-full"
            >
              I&apos;m a driver
            </Link>
          </div>
        </motion.div>

        {/* Right side: glass panel floating over the photo, containing our
            animated delivery scene */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="relative bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-sm text-white/70">ST-2026-84921</span>
            <span className="flex items-center gap-1.5 bg-beacon/20 text-beacon text-xs font-medium px-3 py-1 rounded-full">
              <i className="bi bi-truck"></i> In Transit
            </span>
          </div>

          <div className="mb-6">
            <DeliveryScene />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Estimated arrival</span>
            <span className="text-white font-medium">Tomorrow, 4:00 PM</span>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}