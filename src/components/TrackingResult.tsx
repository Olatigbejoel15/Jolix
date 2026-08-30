"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DeliveryScene from "./DeliveryScene";

const progressSteps = [
  { icon: "bi-box-seam-fill", label: "Created" },
  { icon: "bi-person-check-fill", label: "Picked up" },
  { icon: "bi-truck", label: "In transit" },
  { icon: "bi-check-circle-fill", label: "Delivered" },
];

// Set to 3 (the last step, "Delivered") so you can see the rating section
// below — in a real app this comes from the actual shipment's status.
const currentStep = 2;

const history = [
  { time: "Today, 9:12 AM", text: "Package picked up in Lagos" },
  { time: "Today, 9:45 AM", text: "Departed Lagos dispatch hub" },
  { time: "Today, 1:20 PM", text: "In transit toward Abuja" },
  { time: "Today, 3:52 PM", text: "Delivered and signed for" },
];

function DriverRating() {
  // `rating` is the actual selected star count (persists after clicking).
  // `hovered` is a temporary preview — which star the mouse is currently
  // over, before anything is actually clicked. Two separate pieces of
  // state because they serve two different jobs.
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="bg-signal/5 rounded-xl p-5 text-center">
        <i className="bi bi-check-circle-fill text-signal text-xl mb-2 block"></i>
        <p className="text-sm text-ink font-medium">Thanks for rating David!</p>
      </div>
    );
  }

  return (
    <div className="bg-cloud rounded-xl p-5">
      <p className="text-sm font-semibold text-ink mb-1">Rate your driver</p>
      <p className="text-slate text-xs mb-4">How was your delivery with David O.?</p>

      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="text-2xl leading-none"
          >
            <i
              className={`bi ${
                star <= (hovered || rating) ? "bi-star-fill text-beacon" : "bi-star text-ink/20"
              }`}
            ></i>
          </button>
        ))}
      </div>

      <button
        onClick={() => rating > 0 && setSubmitted(true)}
        disabled={rating === 0}
        className="bg-beacon hover:bg-beacon-2 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-white text-sm font-medium px-5 py-2 rounded-lg"
      >
        Submit rating
      </button>
    </div>
  );
}

export default function TrackingResult({ trackingId }: { trackingId: string }) {
  const isDelivered = currentStep === progressSteps.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-2xl mx-auto -mt-10 relative z-10"
    >
      <div className="bg-white rounded-2xl shadow-xl border border-ink/5 p-6 md:p-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <p className="text-slate text-xs mb-1">Tracking number</p>
            <p className="font-mono font-semibold text-ink">{trackingId}</p>
          </div>
          <span
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${
              isDelivered ? "bg-signal/10 text-signal" : "bg-beacon/10 text-beacon"
            }`}
          >
            <i className={`bi ${isDelivered ? "bi-check-circle-fill" : "bi-truck"}`}></i>
            {isDelivered ? "Delivered" : "In Transit"}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-ink mb-6">
          <span className="flex items-center gap-1.5">
            <i className="bi bi-geo-alt-fill text-slate"></i> Lagos
          </span>
          <i className="bi bi-arrow-right text-slate"></i>
          <span className="flex items-center gap-1.5">
            <i className="bi bi-geo-alt-fill text-signal"></i> Abuja
          </span>
        </div>

        <div className="bg-ink rounded-xl p-5 mb-6">
          <DeliveryScene />
        </div>

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

        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <div className="bg-cloud rounded-xl p-4">
            <p className="text-xs text-slate mb-1">
              {isDelivered ? "Delivered at" : "Estimated arrival"}
            </p>
            <p className="font-semibold text-ink text-sm">
              {isDelivered ? "Today, 3:52 PM" : "Tomorrow, 4:00 PM"}
            </p>
          </div>
          <div className="bg-cloud rounded-xl p-4">
            <p className="text-xs text-slate mb-1">Driver</p>
            <p className="font-semibold text-ink text-sm">David O. · Toyota Hiace</p>
          </div>
        </div>

        {/* Rating section — only shown once the shipment is delivered */}
        {isDelivered && (
          <div className="mb-6">
            <DriverRating />
          </div>
        )}

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