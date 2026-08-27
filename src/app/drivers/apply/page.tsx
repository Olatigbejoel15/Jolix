"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  vehicleType: "motorcycle",
  plateNumber: "",
  licenseNumber: "",
};

export default function DriverApplyPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Real submission to Laravel happens here later. For now, we just
    // flip `submitted` to true so we can show a confirmation state.
    console.log(form);
    setSubmitted(true);
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-cloud">
        <div className="bg-ink pt-16 pb-24 px-6 text-center">
          <p className="font-mono text-beacon text-sm tracking-widest uppercase mb-2">
            Driver application
          </p>
          <h1 className="font-display font-semibold text-2xl md:text-3xl text-white">
            Let&apos;s get you on the road
          </h1>
        </div>

        <div className="max-w-xl mx-auto -mt-10 relative z-10 px-6 pb-24">
          <div className="bg-white rounded-2xl shadow-xl border border-ink/5 p-6 md:p-8">
            {submitted ? (
              // Confirmation state — replaces the form entirely once submitted
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-signal/10 flex items-center justify-center mx-auto mb-5">
                  <i className="bi bi-check-circle-fill text-signal text-2xl"></i>
                </div>
                <h2 className="font-display font-semibold text-xl text-ink mb-2">
                  Application received
                </h2>
                <p className="text-slate text-sm max-w-xs mx-auto">
                  We&apos;ll review your details and reach out within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal info group */}
                <div>
                  <p className="text-sm font-semibold text-ink mb-3">Personal information</p>
                  <div className="space-y-4">
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={form.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="tel"
                        required
                        placeholder="Phone number"
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
                      />
                      <input
                        type="text"
                        required
                        placeholder="City"
                        value={form.city}
                        onChange={(e) => updateField("city", e.target.value)}
                        className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
                      />
                    </div>
                  </div>
                </div>

                {/* Vehicle info group */}
                <div>
                  <p className="text-sm font-semibold text-ink mb-3">Vehicle information</p>
                  <div className="space-y-4">
                    <select
                      value={form.vehicleType}
                      onChange={(e) => updateField("vehicleType", e.target.value)}
                      className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon bg-white"
                    >
                      <option value="motorcycle">Motorcycle</option>
                      <option value="car">Car</option>
                      <option value="van">Van</option>
                    </select>
                    <input
                      type="text"
                      required
                      placeholder="Vehicle plate number"
                      value={form.plateNumber}
                      onChange={(e) => updateField("plateNumber", e.target.value)}
                      className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Driver's license number"
                      value={form.licenseNumber}
                      onChange={(e) => updateField("licenseNumber", e.target.value)}
                      className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-beacon hover:bg-beacon-2 transition-colors text-white font-medium py-3 rounded-lg"
                >
                  Submit application
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}