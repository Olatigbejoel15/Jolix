import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrackingResult from "@/components/TrackingResult";

export default async function TrackingResultPage({
  params,
}: {
  params: Promise<{ trackingId: string }>;
}) {
  const { trackingId } = await params;

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-cloud">
        <div className="bg-ink pt-16 pb-24 px-6 text-center">
          <p className="font-mono text-beacon text-sm tracking-widest uppercase mb-2">
            Tracking
          </p>
          <h1 className="font-display font-semibold text-2xl md:text-3xl text-white">
            Here&apos;s where your package is
          </h1>
        </div>
        <div className="px-6 pb-24">
          <TrackingResult trackingId={trackingId} />
        </div>
      </main>
      <Footer />
    </>
  );
}