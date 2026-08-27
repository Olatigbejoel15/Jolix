import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import BuiltForEveryone from "@/components/BuiltForEveryone";
import LiveTrackingShowcase from "@/components/LiveTrackingShowcase";
import DriveWithJolix from "@/components/DriveWithJolix";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <HowItWorks />
        <Services />
        <BuiltForEveryone />
        <LiveTrackingShowcase />
        <DriveWithJolix />
        <FinalCta />
        <Footer />
      </main>
    </>
  );
}