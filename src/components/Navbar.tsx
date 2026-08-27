"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  // This holds whether the mobile menu is currently open or closed.
  // Starts closed (false). Every time the hamburger is tapped, we'll flip it.
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white font-display font-semibold text-lg">
          <i className="bi bi-truck text-beacon text-xl"></i>
          Jolix
        </Link>

        {/* Desktop links — unchanged, still hidden below the md breakpoint */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
          <Link href="/track" className="hover:text-white transition-colors">Track a shipment</Link>
          <Link href="/drivers" className="hover:text-white transition-colors">Drive with Jolix</Link>
          <Link href="/login" className="hover:text-white transition-colors">Log in</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/signup"
            className="hidden sm:inline-block bg-beacon hover:bg-beacon-2 transition-colors text-white text-sm font-medium px-4 py-2 rounded-full"
          >
            Get started
          </Link>

          {/* Hamburger button — only visible below the md breakpoint,
              exact mirror image of the nav links above it */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="md:hidden text-white text-2xl p-1"
          >
            <i className={isOpen ? "bi bi-x-lg" : "bi bi-list"}></i>
          </button>
        </div>
      </div>

      {/* Mobile menu panel — only rendered at all when isOpen is true */}
      {isOpen && (
        <nav className="md:hidden bg-ink border-t border-white/10 px-6 py-4 flex flex-col gap-4 text-white/90 text-sm">
          <Link href="/track" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">
            Track a shipment
          </Link>
          <Link href="/drivers" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">
            Drive with Jolix
          </Link>
          <Link href="/login" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">
            Log in
          </Link>
          <Link
            href="/signup"
            onClick={() => setIsOpen(false)}
            className="bg-beacon text-white text-center font-medium px-4 py-2 rounded-full"
          >
            Get started
          </Link>
        </nav>
      )}
    </header>
  );
}