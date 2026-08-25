import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Display font — headlines only. Confident and a little unusual, so Jolix
// doesn't look like every other generic SaaS landing page.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

// Body font — used for everything people actually read: paragraphs,
// labels, buttons. Chosen for clarity, not personality.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Mono font — reserved for tracking numbers and prices, so they read like
// real data (e.g. ST-2026-84921), the way an airway bill number would.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jolix — Track every delivery, live",
  description:
    "Jolix is a logistics platform for creating shipments, dispatching drivers, and tracking every delivery in real time.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}