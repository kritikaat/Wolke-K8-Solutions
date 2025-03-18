"use client";

import {useRef} from "react";
import dynamic from 'next/dynamic';

import AnimatedSection from './ui/AnimatedSection';
import TrustedBySection from './sections/TrustedBySection';
import OurJourneySection from './sections/OurJourneySection';
import OurMissionSection from './sections/OurMissionSection';
import WhatWeDoSection from './sections/WhatWeDoSection';
import OurCommitmentSection from './sections/OurCommitmentSection';
import NewsletterSection from './sections/NewsletterSection';
import CallToActionSection from './sections/CallToActionSection';

// Import styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/parallax";

// Dynamic import for AnimatedParticles
const AnimatedParticles = dynamic(() => import('./ui/AnimatedParticles'), { 
  ssr: false 
});

const CompanyTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="py-24 relative overflow-hidden" ref={containerRef}>
      {/* Modern Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-grid-white/[0.025] -z-10"></div>
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent -z-10"></div>
      </div>
      
      {/* Accent lines */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-20"></div>
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-indigo-500 to-transparent opacity-10"></div>
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-indigo-500 to-transparent opacity-10"></div>
      
      {/* Trusted By Section */}
      <AnimatedSection delay={0.2}>
        <TrustedBySection />
      </AnimatedSection>
      
      {/* Our Journey Section */}
      <AnimatedSection delay={0.3}>
        <OurJourneySection />
      </AnimatedSection>

      {/* Our Mission Section */}
      <AnimatedSection delay={0.3}>
        <OurMissionSection />
      </AnimatedSection>
      
      {/* What We Do Section */}
      <AnimatedSection delay={0.3}>
        <WhatWeDoSection />
      </AnimatedSection>
    
      {/* Our Commitment Section */}
      <AnimatedSection delay={0.4}>
        <OurCommitmentSection />
      </AnimatedSection>

      {/* Newsletter Subscription Section */}
      <AnimatedSection delay={0.5}>
        <NewsletterSection />
      </AnimatedSection>

      {/* Call to Action Section */}
      <AnimatedSection delay={0.6}>
        <CallToActionSection />
      </AnimatedSection>
      
      {/* Animated particles for footer - moved above footer and higher z-index */}
      <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden z-20 opacity-30">
        <AnimatedParticles />
      </div>
    </div>
  );
};

export default CompanyTimeline;