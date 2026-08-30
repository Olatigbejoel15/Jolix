import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <h1 className="font-display font-semibold text-3xl text-ink mb-3">Terms of Service</h1>
          <p className="text-slate text-sm mb-10">Last updated: August 2026</p>

          <div className="space-y-8 text-sm text-ink/80 leading-relaxed">
            <section>
              <h2 className="font-semibold text-ink text-base mb-2">1. Using Jolix</h2>
              <p>
                By creating a shipment, driving with Jolix, or otherwise using this
                platform, you agree to these terms. This is placeholder content, 
                real legal terms should be drafted with a qualified professional
                before Jolix accepts real customers or payments.
              </p>
            </section>
            <section>
              <h2 className="font-semibold text-ink text-base mb-2">2. Shipments</h2>
              <p>
                Customers are responsible for accurately describing package
                contents, weight, and delivery addresses. Jolix reserves the
                right to refuse shipments that violate applicable law.
              </p>
            </section>
            <section>
              <h2 className="font-semibold text-ink text-base mb-2">3. Drivers</h2>
              <p>
                Drivers on the Jolix platform operate as independent contractors
                and are responsible for maintaining a valid license and a
                roadworthy vehicle.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}