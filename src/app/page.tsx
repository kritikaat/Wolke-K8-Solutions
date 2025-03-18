// app/page.tsx
"use client";


import TimelineDemo from "@/components/About";
import FeatureSection from "@/components/FeatureSection";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer"
import Whychooseus from "@/components/whychooseus";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <section id="home">
        <HeroSection />
      </section>
      
      <section id="features">
        <FeatureSection />
      </section>
      
      <section id="why-choose-us">
        <Whychooseus />
      </section>

      <section id="about">
        <TimelineDemo />
      </section>

      <section id="about">
      <Footer/>
      </section>
      
    </main>
  );
}