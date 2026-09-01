import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-16 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand column */}
        <div>
          <Link href="/" className="flex items-center gap-2 text-white font-display font-semibold text-lg mb-3">
            <i className="bi bi-truck text-beacon text-xl"></i>
            Jolix
          </Link>
          <p className="text-sm leading-relaxed">
            Track every delivery, live — from pickup to your door.
          </p>
        </div>

        {/* Product links */}
        <div>
          <p className="text-white text-sm font-semibold mb-4">Product</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/track" className="hover:text-beacon transition-colors">Track a shipment</Link></li>
            <li><Link href="/drivers" className="hover:text-beacon transition-colors">Drive with Jolix</Link></li>
            <li><Link href="/ship" className="hover:text-beacon transition-colors">Create a shipment</Link></li>
          </ul>
        </div>

        {/* Company links */}
        <div>
          <p className="text-white text-sm font-semibold mb-4">Company</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/about" className="hover:text-beacon transition-colors">About us</Link></li>
            <li><Link href="/services" className="hover:text-beacon transition-colors">Services</Link></li>
            <li><Link href="/contact" className="hover:text-beacon transition-colors">Contact us</Link></li>
          </ul>
        </div>

        {/* Legal + socials */}
        <div>
          <p className="text-white text-sm font-semibold mb-4">Legal</p>
          <ul className="space-y-2.5 text-sm mb-6">
            <li><Link href="/terms" className="hover:text-beacon transition-colors">Terms of service</Link></li>
            <li><Link href="/privacy" className="hover:text-beacon transition-colors">Privacy policy</Link></li>
          </ul>
          <div className="flex gap-4 text-lg">
            <a href="#" aria-label="Twitter / X" className="hover:text-beacon transition-colors">
              <i className="bi bi-twitter-x"></i>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-beacon transition-colors">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-beacon transition-colors">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Giant wordmark section — its own space, below the links, above
          the copyright bar. Not layered behind anything. */}
      <div className="overflow-hidden border-t border-white/10 py-6">
        <div
          aria-hidden="true"
          className="pointer-events-none select-none flex items-center justify-center gap-[2vw] whitespace-nowrap"
        >
          <p className="font-display font-semibold text-white/[0.08] leading-none text-[22vw]">
            JOLIX
          </p>
          <i className="bi bi-truck text-white/[0.08] text-[10vw]"></i>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Jolix. All rights reserved.</p>
          <p>Made in Lagos, Nigeria 🇳🇬</p>
        </div>
      </div>
    </footer>
  );
}