"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      {/* Background photo — fills the entire viewport, behind everything */}
      <Image
        src="/images/auth-bg.jpg"
        alt="Jolix delivery truck"
        fill
        priority
        className="object-cover"
      />

      {/* Dark tint over the photo, so the card reads clearly against it
          regardless of how bright the photo itself is */}
      <div className="absolute inset-0 bg-ink/50" />

      {/* The form card, centered, floating above the photo + tint */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8"
      >
        <Link href="/" className="flex items-center gap-2 text-ink font-display font-semibold text-lg mb-8">
          <i className="bi bi-truck text-beacon text-xl"></i>
          Jolix
        </Link>

        <h1 className="font-display font-semibold text-2xl text-ink mb-2">{title}</h1>
        <p className="text-slate text-sm mb-8">{subtitle}</p>

        {children}
      </motion.div>
    </div>
  );
}