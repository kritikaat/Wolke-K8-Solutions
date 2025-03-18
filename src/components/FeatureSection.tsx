"use client"
import featureData from '../data/features.json';
import { FlipWords } from './ui/flip-words';
import { BackgroundGradient } from './ui/background-gradient';
import { Button } from './ui/moving-border';

interface Feature {
    id: number;
    title: string;
    description: string;
}

export function FeatureSection() {
    const words = ["Powerful", "Scalable", "Secure", "Efficient"];
    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
          // Update URL without full page reload
          window.history.pushState({}, '', `/#${sectionId}`);
        }
      };

    return (
        <div className="py-16 bg-gray-900">
            <div className="container mx-auto max-w-screen-xl px-6 lg:px-12">
                <div className="h-[10rem] flex justify-center items-center text-center">
                    <h2 className="text-6xl lg:text-7xl font-normal text-neutral-600 dark:text-neutral-400 leading-tight">
                        Build <FlipWords words={words} /> <br />
                        solutions with Wolke K8.
                    </h2>
                </div>

                <div className="mt-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
                        {featureData.Features.map((feature: Feature) => (
                            <div key={feature.id} className="flex justify-center">
                                <BackgroundGradient className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-md p-6">
                                    <div className="flex flex-col items-center text-center flex-grow">
                                        <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                                            {feature.title}
                                        </p>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow">
                                            {feature.description}
                                        </p>
                                    </div>
                                </BackgroundGradient>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-24 text-center">
                     <Button onClick={() => scrollToSection('about')}
                        className="px-6 py-3 rounded-lg border border-neutral-600 text-neutral-700 bg-white hover:bg-gray-100 transition duration-200 text-lg">
                        Explore More
                  </Button>
                </div>
            </div>
        </div>
    );
}

export default FeatureSection;
