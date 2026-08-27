"use client";

import { useState, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const deliverySteps = [
  { key: "picked_up", label: "Picked up", icon: "bi-box-seam-fill" },
  { key: "in_transit", label: "In transit", icon: "bi-truck" },
  { key: "delivered", label: "Delivered", icon: "bi-check-circle-fill" },
];

export default function DeliveryDetailPage({
  params,
}: {
  params: Promise<{ trackingId: string }>;
}) {
  const { trackingId } = use(params);

  const [currentStepIndex, setCurrentStepIndex] = useState(-1); // -1 = not picked up yet
  const [notes, setNotes] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);

  const isDelivered = currentStepIndex === deliverySteps.length - 1;

  function advanceStep() {
    if (currentStepIndex < deliverySteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setProofFile(file);
      // Creates a temporary local URL pointing at the file still sitting
      // on the driver's device, so we can preview it immediately —
      // nothing is actually uploaded anywhere yet.
      setProofPreview(URL.createObjectURL(file));
    }
  }

  return (
    <div className="max-w-xl">
      <Link href="/driver" className="inline-flex items-center gap-1.5 text-slate text-sm mb-6 hover:text-ink transition-colors">
        <i className="bi bi-arrow-left"></i> Back to deliveries
      </Link>

      <div className="bg-white rounded-2xl border border-ink/5 shadow-sm p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-sm text-slate">{trackingId}</span>
          <span className="flex items-center gap-1.5 bg-beacon/10 text-beacon text-xs font-medium px-3 py-1 rounded-full">
            <i className="bi bi-laptop"></i> Electronics
          </span>
        </div>

        <div className="space-y-3 mb-8">
          <div className="flex items-start gap-3">
            <i className="bi bi-geo-alt-fill text-slate mt-0.5"></i>
            <div>
              <p className="text-xs text-slate">Pickup</p>
              <p className="text-sm text-ink">14 Allen Avenue, Ikeja, Lagos</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <i className="bi bi-geo-alt-fill text-signal mt-0.5"></i>
            <div>
              <p className="text-xs text-slate">Dropoff</p>
              <p className="text-sm text-ink">8 Ozumba Mbadiwe Ave, Victoria Island, Lagos</p>
            </div>
          </div>
        </div>

        {/* Status progression */}
        <div className="flex items-center mb-8">
          {deliverySteps.map((step, i) => (
            <div key={step.key} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm ${
                    i <= currentStepIndex ? "bg-beacon text-white" : "bg-ink/10 text-ink/40"
                  }`}
                >
                  <i className={`bi ${step.icon}`}></i>
                </div>
                <span className="text-[11px] text-slate whitespace-nowrap">{step.label}</span>
              </div>
              {i < deliverySteps.length - 1 && (
                <div className={`h-0.5 flex-1 mb-5 mx-1 ${i < currentStepIndex ? "bg-beacon" : "bg-ink/10"}`} />
              )}
            </div>
          ))}
        </div>

        {!isDelivered ? (
          <button
            onClick={advanceStep}
            className="w-full bg-beacon hover:bg-beacon-2 transition-colors text-white font-medium py-3 rounded-lg mb-6"
          >
            Mark as {deliverySteps[currentStepIndex + 1].label}
          </button>
        ) : (
          <>
            {/* Proof of delivery — only shown once the delivered step is reached */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-ink mb-2">Proof of delivery</label>

              {proofPreview ? (
                <div className="relative">
                  <img src={proofPreview} alt="Proof of delivery" className="w-full h-40 object-cover rounded-lg" />
                  <button
                    onClick={() => {
                      setProofFile(null);
                      setProofPreview(null);
                    }}
                    className="absolute top-2 right-2 bg-ink/80 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs"
                  >
                    <i className="bi bi-x"></i>
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-ink/15 rounded-lg py-8 cursor-pointer hover:border-beacon transition-colors">
                  <i className="bi bi-camera-fill text-2xl text-slate"></i>
                  <span className="text-sm text-slate">Tap to take or upload a photo</span>
                  <input type="file" accept="image/*" capture="environment" onChange={handleFileChange} className="hidden" />
                </label>
              )}
            </div>

            {/* Delivery notes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-ink mb-2">Delivery notes (optional)</label>
              <textarea
                rows={3}
                placeholder="e.g. Left with the receptionist"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 bg-signal/10 text-signal text-sm font-medium px-4 py-3 rounded-lg"
            >
              <i className="bi bi-check-circle-fill"></i> Delivery completed
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}