import { Spotlight } from "./ui/Spotlight.";
import { Button } from "./ui/moving-border";
import GithubGlobe from './ui/githubglobe';
import { useEffect, useState } from 'react';

function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on initial load
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      // Update URL without full page reload
      window.history.pushState({}, '', `/#${sectionId}`);
    }
  };

  return (
    <div
      className="h-auto min-h-[60vh] md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0 bg-black-600"
    >
      {!isMobile && (
        <div className="absolute right-0 bottom-0 w-full h-full overflow-visible">
          <div className="relative w-full h-full">
            <div className="absolute right-0 bottom-0 w-1/2 h-1/2">
              <GithubGlobe />
            </div>
          </div>
        </div>
      )}
      
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="p-4 relative z-10 w-full text-center px-4 md:px-0">
        <h1
          className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
        >
          Wolke K8 Solutions
        </h1>
        <p
          className="mt-4 font-normal text-sm md:text-lg text-neutral-300 max-w-lg mx-auto px-2 md:px-0"
        >
          Want to deploy Kubernetes and worried about the monitoring and cost? We provide you real-time cost visibility and insights for teams using Kubernetes, helping you continuously reduce your cloud costs.
        </p>
        <div className="mt-8 md:mt-10">
          <Button
            onClick={() => scrollToSection('features')}
            borderRadius="1.75rem"
            className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800 cursor-pointer text-sm md:text-base py-2 px-4 md:py-3 md:px-6"
          >
            Get Started!
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;