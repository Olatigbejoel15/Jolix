"use client";

import { motion } from "framer-motion";
import DeliveryScene from "./DeliveryScene";

// Mock data — this is placeholder until we connect the real Laravel API
// later. Every tracking ID currently shows this same shipment, just with
// its own ID displayed at the top.
const progressSteps = [
  { icon: "bi-box-seam-fill", label: "Created" },
  { icon: "bi-person-check-fill", label: "Picked up" },
  { icon: "bi-truck", label: "In transit" },
  { icon: "bi-check-circle-fill", label: "Delivered" },
];
const currentStep = 2; // 0-indexed — "In transit" is currently active

const history = [
  { time: "Today, 9:12 AM", text: "Package picked up in Lagos" },
  { time: "Today, 9:45 AM", text: "Departed Lagos dispatch hub" },
  { time: "Today, 1:20 PM", text: "In transit toward Abuja" },
];

export default function TrackingResult({ trackingId }: { trackingId: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-2xl mx-auto -mt-10 relative z-10"
    >
      <div className="bg-white rounded-2xl shadow-xl border border-ink/5 p-6 md:p-8">
        {/* Header: tracking ID + status badge */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <p className="text-slate text-xs mb-1">Tracking number</p>
            <p className="font-mono font-semibold text-ink">{trackingId}</p>
          </div>
          <span className="flex items-center gap-1.5 bg-beacon/10 text-beacon text-xs font-medium px-3 py-1.5 rounded-full">
            <i className="bi bi-truck"></i> In Transit
          </span>
        </div>

        {/* Route */}
        <div className="flex items-center justify-between text-sm text-ink mb-6">
          <span className="flex items-center gap-1.5">
            <i className="bi bi-geo-alt-fill text-slate"></i> Lagos
          </span>
          <i className="bi bi-arrow-right text-slate"></i>
          <span className="flex items-center gap-1.5">
            <i className="bi bi-geo-alt-fill text-signal"></i> Abuja
          </span>
        </div>

        {/* Delivery scene */}
        <div className="bg-ink rounded-xl p-5 mb-6">
          <DeliveryScene />
        </div>

        {/* Progress steps */}
        <div className="flex items-center mb-8">
          {progressSteps.map((step, i) => (
            <div key={step.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm ${
                    i <= currentStep ? "bg-beacon text-white" : "bg-ink/10 text-ink/40"
                  }`}
                >
                  <i className={`bi ${step.icon}`}></i>
                </div>
                <span className="text-[11px] text-slate whitespace-nowrap">{step.label}</span>
              </div>
              {i < progressSteps.length - 1 && (
                <div className={`h-0.5 flex-1 mb-5 mx-1 ${i < currentStep ? "bg-beacon" : "bg-ink/10"}`} />
              )}
            </div>
          ))}
        </div>

        {/* ETA + driver */}
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <div className="bg-cloud rounded-xl p-4">
            <p className="text-xs text-slate mb-1">Estimated arrival</p>
            <p className="font-semibold text-ink text-sm">Tomorrow, 4:00 PM</p>
          </div>
          <div className="bg-cloud rounded-xl p-4">
            <p className="text-xs text-slate mb-1">Driver</p>
            <p className="font-semibold text-ink text-sm">David O. · Toyota Hiace</p>
          </div>
        </div>

        {/* History timeline */}
        <div>
          <p className="text-sm font-semibold text-ink mb-3">Delivery history</p>
          <ul className="space-y-3">
            {history.map((event) => (
              <li key={event.text} className="flex gap-3 text-sm">
                <i className="bi bi-check-circle-fill text-signal mt-0.5"></i>
                <div>
                  <p className="text-ink">{event.text}</p>
                  <p className="text-slate text-xs">{event.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}