import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Demo } from "@/components/sections/Demo";
import { Audience } from "@/components/sections/Audience";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

// Set to true to show the testimonials section again.
const SHOW_TESTIMONIALS = false;

export function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoStrip />
        <Features />
        <HowItWorks />
        <Demo />
        <Audience />
        <Pricing />
        {SHOW_TESTIMONIALS && <Testimonials />}
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
