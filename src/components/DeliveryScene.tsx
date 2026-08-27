"use client";

import { motion } from "framer-motion";

// One full loop, in seconds: van drives in, drives to the house, pauses
// (package delivered), then fades out and resets to drive in again.
const CYCLE = 6;

// "times" below are fractions of that 6-second cycle (0 = start, 1 = end).
// Framer Motion reads left/opacity together at each of these checkpoints
// and smoothly animates between them — like keyframes in a video edit.
const TIMES = [0, 0.08, 0.55, 0.8, 0.9, 1];

export default function DeliveryScene() {
  return (
    <div className="relative h-44 rounded-xl bg-ink-2 overflow-hidden">
      {/* Pickup point marker */}
      <div className="absolute left-[6%] bottom-3 flex flex-col items-center text-white/70">
        <i className="bi bi-box-seam-fill text-lg"></i>
        <span className="text-[10px] mt-1">Pickup</span>
      </div>

      {/* Destination house */}
      <div className="absolute left-[88%] bottom-3 flex flex-col items-center text-white/70">
        <i className="bi bi-house-door-fill text-lg"></i>
        <span className="text-[10px] mt-1">Address</span>
      </div>

      {/* "Delivered" badge — pops in only while the van is parked at the house */}
      <motion.div
        className="absolute left-[88%] bottom-14 -translate-x-1/2 flex items-center gap-1 bg-signal text-white text-[11px] font-medium px-2 py-1 rounded-full"
        animate={{
          opacity: [0, 0, 1, 1, 0, 0],
          scale: [0.6, 0.6, 1, 1, 0.8, 0.6],
        }}
        transition={{ duration: CYCLE, repeat: Infinity, times: TIMES }}
      >
        <i className="bi bi-check-circle-fill"></i> Delivered
      </motion.div>

      {/* The road */}
      <div className="absolute left-0 right-0 bottom-2 h-1 bg-white/15" />

      {/* The van itself — outer motion.div controls horizontal travel + fade,
          inner motion.div controls the small up-down bounce, independently */}
      <motion.div
        className="absolute bottom-2 -translate-x-1/2"
        animate={{ left: ["6%", "6%", "84%", "84%", "84%", "6%"], opacity: [0, 1, 1, 1, 0, 0] }}
        transition={{ duration: CYCLE, repeat: Infinity, times: TIMES, ease: "easeInOut" }}
      >
        <motion.svg
          width="52"
          height="28"
          viewBox="0 0 52 28"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
        >
          {/* cargo box */}
          <rect x="2" y="4" width="30" height="16" rx="2" fill="white" />
          {/* cab */}
          <path d="M32 8 H44 L48 14 V20 H32 Z" fill="var(--beacon)" />
          {/* windshield */}
          <path d="M34 10 H41 L44 14 H34 Z" fill="var(--ink-2)" />
          {/* wheels */}
          <circle cx="12" cy="22" r="4" fill="var(--ink)" stroke="white" strokeWidth="1.5" />
          <circle cx="38" cy="22" r="4" fill="var(--ink)" stroke="white" strokeWidth="1.5" />
        </motion.svg>
      </motion.div>
    </div>
  );
}