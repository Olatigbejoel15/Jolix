"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const packageTypes = [
  { id: "document", icon: "bi-file-earmark-text-fill", label: "Document", multiplier: 1 },
  { id: "parcel", icon: "bi-box-seam-fill", label: "Parcel", multiplier: 1.3 },
  { id: "electronics", icon: "bi-laptop", label: "Electronics", multiplier: 1.8 },
  { id: "fragile", icon: "bi-exclamation-triangle-fill", label: "Fragile", multiplier: 2 },
];

const steps = ["Addresses", "Package & Price", "Confirm & Pay"];

function calculatePrice(packageType: string, weight: number) {
  const base = 1500;
  const perKg = 300;
  const type = packageTypes.find((p) => p.id === packageType);
  const multiplier = type ? type.multiplier : 1;
  return Math.round((base + weight * perKg) * multiplier);
}

function generateTrackingId() {
  const random = Math.floor(10000 + Math.random() * 90000);
  return `ST-2026-${random}`;
}

export default function ShipPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    pickup: "",
    dropoff: "",
    packageType: "parcel",
    weight: "",
  });
  const [trackingId, setTrackingId] = useState("");

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const weightNum = parseFloat(form.weight) || 0;
  const price = calculatePrice(form.packageType, weightNum);

  function handlePay() {
    setTrackingId(generateTrackingId());
    setStep(4);
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-cloud">
        <div className="bg-ink pt-16 pb-24 px-6 text-center">
          <p className="font-mono text-beacon text-sm tracking-widest uppercase mb-2">
            Create a shipment
          </p>
          <h1 className="font-display font-semibold text-2xl md:text-3xl text-white">
            {step <= 3 ? "Let's get it moving" : "Your shipment is on its way"}
          </h1>
        </div>

        <div className="max-w-2xl mx-auto -mt-10 relative z-10 px-6 pb-24">
          {step <= 3 && (
            <div className="flex items-center mb-8">
              {steps.map((label, i) => {
                const num = i + 1;
                return (
                  <div key={label} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                          num <= step ? "bg-beacon text-white" : "bg-white text-ink/40 border border-ink/10"
                        }`}
                      >
                        {num}
                      </div>
                      <span className="text-[11px] text-ink/70 whitespace-nowrap">{label}</span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`h-0.5 flex-1 mb-5 mx-2 ${num < step ? "bg-beacon" : "bg-ink/10"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="bg-white rounded-2xl border border-ink/5 shadow-xl p-6 md:p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">Pickup address</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 12 Adeola Odeku St, Victoria Island, Lagos"
                      value={form.pickup}
                      onChange={(e) => updateField("pickup", e.target.value)}
                      className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">Dropoff address</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 5 Gwarinpa Estate, Abuja"
                      value={form.dropoff}
                      onChange={(e) => updateField("dropoff", e.target.value)}
                      className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
                    />
                  </div>
                  <button
                    onClick={() => form.pickup && form.dropoff && setStep(2)}
                    disabled={!form.pickup || !form.dropoff}
                    className="w-full bg-beacon hover:bg-beacon-2 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-white font-medium py-3 rounded-lg mt-2"
                  >
                    Continue
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-ink mb-3">Package type</label>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {packageTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => updateField("packageType", type.id)}
                        className={`flex items-center gap-2.5 rounded-lg border px-4 py-3 text-sm text-left transition-colors ${
                          form.packageType === type.id
                            ? "border-beacon bg-beacon/5 text-ink"
                            : "border-ink/15 text-slate hover:border-ink/30"
                        }`}
                      >
                        <i className={`bi ${type.icon} ${form.packageType === type.id ? "text-beacon" : "text-slate"}`}></i>
                        {type.label}
                      </button>
                    ))}
                  </div>

                  <label className="block text-sm font-medium text-ink mb-1.5">Weight (kg)</label>
                  <input
                    type="number"
                    required
                    min="0.1"
                    step="0.1"
                    placeholder="e.g. 2.5"
                    value={form.weight}
                    onChange={(e) => updateField("weight", e.target.value)}
                    className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
                  />

                  <div className="bg-cloud rounded-lg p-4 flex items-center justify-between mb-5">
                    <span className="text-sm text-slate">Estimated price</span>
                    <span className="font-display font-semibold text-ink text-lg">
                      {weightNum > 0 ? `₦${price.toLocaleString()}` : "—"}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 border border-ink/15 hover:border-ink/30 transition-colors text-ink font-medium py-3 rounded-lg"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => weightNum > 0 && setStep(3)}
                      disabled={weightNum <= 0}
                      className="flex-1 bg-beacon hover:bg-beacon-2 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-white font-medium py-3 rounded-lg"
                    >
                      Continue
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate">Pickup</span>
                      <span className="text-ink text-right max-w-[60%]">{form.pickup}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate">Dropoff</span>
                      <span className="text-ink text-right max-w-[60%]">{form.dropoff}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate">Package type</span>
                      <span className="text-ink capitalize">{form.packageType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate">Weight</span>
                      <span className="text-ink">{form.weight} kg</span>
                    </div>
                    <div className="flex justify-between text-sm pt-3 border-t border-ink/10">
                      <span className="font-semibold text-ink">Total</span>
                      <span className="font-display font-semibold text-ink text-lg">₦{price.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 border border-ink/15 hover:border-ink/30 transition-colors text-ink font-medium py-3 rounded-lg"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePay}
                      className="flex-1 bg-beacon hover:bg-beacon-2 transition-colors text-white font-medium py-3 rounded-lg"
                    >
                      Pay ₦{price.toLocaleString()}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-6"
                >
                  <div className="w-16 h-16 rounded-full bg-signal/10 flex items-center justify-center mx-auto mb-5">
                    <i className="bi bi-check-circle-fill text-signal text-3xl"></i>
                  </div>
                  <h2 className="font-display font-semibold text-xl text-ink mb-2">Shipment created</h2>
                  <p className="text-slate text-sm mb-5">Your tracking number is</p>
                  <p className="font-mono font-semibold text-lg text-ink bg-cloud rounded-lg py-3 mb-6">
                    {trackingId}
                  </p>
                  <div className="flex gap-3">
                    <Link
                      href="/"
                      className="flex-1 border border-ink/15 hover:border-ink/30 transition-colors text-ink font-medium py-3 rounded-lg"
                    >
                      Back home
                    </Link>
                    <Link
                      href={`/track/${trackingId}`}
                      className="flex-1 bg-beacon hover:bg-beacon-2 transition-colors text-white font-medium py-3 rounded-lg"
                    >
                      Track shipment
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}