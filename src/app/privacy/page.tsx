import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <h1 className="font-display font-semibold text-3xl text-ink mb-3">Privacy Policy</h1>
          <p className="text-slate text-sm mb-10">Last updated: August 2026</p>

          <div className="space-y-8 text-sm text-ink/80 leading-relaxed">
            <section>
              <h2 className="font-semibold text-ink text-base mb-2">1. What we collect</h2>
              <p>
                To create and deliver a shipment, Jolix collects names, phone
                numbers, email addresses, and pickup/dropoff locations. This is
                placeholder content, a real privacy policy should be drafted
                with a qualified professional before handling real user data.
              </p>
            </section>
            <section>
              <h2 className="font-semibold text-ink text-base mb-2">2. How it's used</h2>
              <p>
                Shipment details are used to coordinate pickup, delivery, and
                live tracking. Driver location data is only shared with the
                customer for the duration of their active delivery.
              </p>
            </section>
            <section>
              <h2 className="font-semibold text-ink text-base mb-2">3. Contact</h2>
              <p>
                Questions about this policy can be sent to support@jolix.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}