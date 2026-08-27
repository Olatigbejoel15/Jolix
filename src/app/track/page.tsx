"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TrackSearchPage() {
  const [trackingId, setTrackingId] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (trackingId.trim()) {
      router.push(`/track/${trackingId.trim()}`);
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-ink text-white flex items-center justify-center px-6 py-24">
        <div className="max-w-md w-full text-center">
          <p className="font-mono text-beacon text-sm tracking-widest uppercase mb-3">
            Track a shipment
          </p>
          <h1 className="font-display font-semibold text-3xl mb-3">
            Where&apos;s your package?
          </h1>
          <p className="text-white/70 mb-8">
            Enter your tracking number to see its live status.
          </p>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              required
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="ST-2026-84921"
              className="flex-1 rounded-full bg-white/10 border border-white/20 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-beacon/50"
            />
            <button
              type="submit"
              className="bg-beacon hover:bg-beacon-2 transition-colors text-white font-medium px-6 py-3 rounded-full whitespace-nowrap"
            >
              Track
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}