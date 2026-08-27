"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Real submission (to Laravel, or an email service) plugs in here later.
    console.log(form);
    setSent(true);
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-cloud">
        <div className="bg-ink pt-16 pb-24 px-6 text-center">
          <p className="font-mono text-beacon text-sm tracking-widest uppercase mb-2">Contact us</p>
          <h1 className="font-display font-semibold text-2xl md:text-3xl text-white">We&apos;d love to hear from you</h1>
        </div>

        <div className="max-w-4xl mx-auto -mt-10 relative z-10 px-6 pb-24">
          <div className="bg-white rounded-2xl shadow-xl border border-ink/5 p-6 md:p-8 grid md:grid-cols-5 gap-8">
            {/* Contact info — 2 of 5 columns */}
            <div className="md:col-span-2 space-y-5">
              <div className="flex items-start gap-3">
                <i className="bi bi-envelope-fill text-beacon mt-0.5"></i>
                <div>
                  <p className="text-sm font-semibold text-ink">Email</p>
                  <p className="text-slate text-sm">support@jolix.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="bi bi-telephone-fill text-beacon mt-0.5"></i>
                <div>
                  <p className="text-sm font-semibold text-ink">Phone</p>
                  <p className="text-slate text-sm">+234 800 000 0000</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="bi bi-geo-alt-fill text-beacon mt-0.5"></i>
                <div>
                  <p className="text-sm font-semibold text-ink">Based in</p>
                  <p className="text-slate text-sm">Lagos, Nigeria</p>
                </div>
              </div>
            </div>

            {/* Form — 3 of 5 columns */}
            <div className="md:col-span-3">
              {sent ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-signal/10 flex items-center justify-center mx-auto mb-5">
                    <i className="bi bi-check-circle-fill text-signal text-2xl"></i>
                  </div>
                  <h2 className="font-display font-semibold text-xl text-ink mb-2">Message sent</h2>
                  <p className="text-slate text-sm">We&apos;ll get back to you within 1–2 business days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
                  />
                  <textarea
                    required
                    rows={5}
                    placeholder="Your message"
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    className="w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-beacon/50 focus:border-beacon"
                  />
                  <button
                    type="submit"
                    className="w-full bg-beacon hover:bg-beacon-2 transition-colors text-white font-medium py-2.5 rounded-lg"
                  >
                    Send message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}