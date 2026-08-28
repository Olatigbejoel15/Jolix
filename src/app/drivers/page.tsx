"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const perks = [
  { icon: "bi-clock-fill", title: "Flexible hours", desc: "Drive when it suits you, no fixed shifts." },
  { icon: "bi-cash-stack", title: "Weekly payouts", desc: "Get paid every week, straight to your account." },
  { icon: "bi-geo-alt-fill", title: "Nearby deliveries", desc: "Matched to pickups close to where you already are." },
  { icon: "bi-file-earmark-x-fill", title: "No long contracts", desc: "Start, pause, or stop driving whenever you choose." },
];

const requirements = [
  "Valid driver's license",
  "A vehicle in good working condition",
  "A smartphone with internet access",
  "Minimum age of 21",
];

const steps = [
  { title: "Apply", desc: "Fill out the driver application form." },
  { title: "Verification", desc: "We confirm your license and vehicle details." },
  { title: "Approved", desc: "You're added to the Jolix driver network." },
  { title: "Start driving", desc: "Accept deliveries and start earning." },
];

const faqs = [
  { q: "When do I get paid?", a: "Payouts are processed weekly, directly to the bank account you provide during setup." },
  { q: "What vehicle types are accepted?", a: "Motorcycles, cars, and vans are all accepted, depending on the delivery types available in your city." },
  { q: "Which cities does Jolix operate in?", a: "We're starting in Lagos and Abuja, with more cities added as we grow." },
];

export default function DriversPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-ink text-white">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-mono text-beacon text-sm tracking-widest uppercase mb-3">
                Drive with Jolix
              </p>
              <h1 className="font-display font-semibold text-4xl md:text-5xl mb-5">
                Turn your vehicle into income
              </h1>
              <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
                Set your own hours, get matched to nearby deliveries, and get
                paid weekly. All you need is a valid license and a vehicle.
              </p>
              <Link
                href="/drivers/apply"
                className="inline-flex items-center gap-2 bg-beacon hover:bg-beacon-2 transition-colors text-white font-medium px-7 py-3.5 rounded-full"
              >
                Apply to drive <i className="bi bi-arrow-right"></i>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Why drive with Jolix */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <h2 className="font-display font-semibold text-3xl text-ink text-center mb-14">
              Why drive with Jolix
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {perks.map((perk, i) => (
                <motion.div
                  key={perk.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-cloud rounded-xl p-6 border border-ink/5 shadow-sm hover:shadow-md hover:border-beacon hover:scale-105 transition-all duration-500"
                >
                  <div className="w-11 h-11 rounded-lg bg-beacon/10 flex items-center justify-center mb-4">
                    <i className={`bi ${perk.icon} text-beacon text-lg`}></i>
                  </div>
                  <h3 className="font-display font-semibold text-ink mb-2">{perk.title}</h3>
                  <p className="text-slate text-sm leading-relaxed">{perk.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="bg-route/5">
          <div className="mx-auto max-w-2xl px-6 py-24">
            <h2 className="font-display font-semibold text-3xl text-ink text-center mb-10">
              What you&apos;ll need
            </h2>
            <ul className="space-y-4">
              {requirements.map((req) => (
                <li key={req} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-ink/5">
                  <i className="bi bi-check-circle-fill text-signal text-lg"></i>
                  <span className="text-ink text-sm">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How to get started */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <h2 className="font-display font-semibold text-3xl text-ink text-center mb-16">
              How to get started
            </h2>
            <div className="grid md:grid-cols-4 gap-10">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="text-center"
                >
                  <div className="mx-auto w-12 h-12 rounded-full bg-ink text-white flex items-center justify-center font-display font-semibold mb-5">
                    {i + 1}
                  </div>
                  <h3 className="font-display font-semibold text-ink mb-2">{step.title}</h3>
                  <p className="text-slate text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-cloud">
          <div className="mx-auto max-w-2xl px-6 py-24">
            <h2 className="font-display font-semibold text-3xl text-ink text-center mb-12">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-white rounded-xl p-5 border border-ink/5">
                  <p className="font-semibold text-ink mb-1.5">{faq.q}</p>
                  <p className="text-slate text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-beacon text-white overflow-hidden relative">
          <i className="bi bi-truck absolute -right-10 -bottom-10 text-[220px] text-white/10 pointer-events-none"></i>
          <div className="relative mx-auto max-w-2xl px-6 py-20 text-center">
            <h2 className="font-display font-semibold text-3xl mb-4">
              Ready to start driving?
            </h2>
            <p className="text-white/90 mb-8">
              Applications take less than 5 minutes.
            </p>
            <Link
              href="/drivers/apply"
              className="inline-flex items-center gap-2 bg-ink hover:bg-ink-2 transition-colors text-white font-medium px-7 py-3.5 rounded-full"
            >
              Apply to drive <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}