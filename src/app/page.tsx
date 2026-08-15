import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { ProblemsSection } from "@/components/ProblemsSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { WhatInsideSection } from "@/components/WhatInsideSection";
import { ComparisonSection } from "@/components/ComparisonSection";
import { CalculatorSection } from "@/components/CalculatorSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CtaSection } from "@/components/CtaSection";
import { PricingSection } from "@/components/PricingSection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ProblemsSection />
        <HowItWorksSection />
        <WhatInsideSection />
        <ComparisonSection />
        <CalculatorSection />
        <TestimonialsSection />
        <CtaSection />
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
