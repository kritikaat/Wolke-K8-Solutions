"use client";

import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-gradient-to-br from-gray-50 to-white dark:from-neutral-950 dark:to-black py-16 font-sans"
      ref={containerRef}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Journey</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            From humble beginnings to industry leadership in Kubernetes solutions
          </p>
        </div>

        <div ref={ref} className="relative mx-auto">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row pb-16 md:pb-24"
            >
              <div className="sticky flex flex-col md:flex-row items-start top-24 self-start md:w-1/3 pr-6">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="h-10 w-10 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center shadow-lg z-20">
                    <div className="h-4 w-4 rounded-full bg-white" />
                  </div>
                  <div className="ml-4 md:hidden">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <h3 className="hidden md:block text-3xl md:text-4xl font-bold ml-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {item.title}
                </h3>
              </div>

              <div className="relative md:w-2/3 pl-10 md:pl-16 border-l-2 border-gray-200 dark:border-gray-800">
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-800">
                  {item.content}
                </div>
                {index !== data.length - 1 && (
                  <div className="absolute h-16 w-px bg-gradient-to-b from-gray-200 to-transparent dark:from-gray-800 left-[-1px] bottom-[-64px]" />
                )}
              </div>
            </div>
          ))}

          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute left-0 top-0 w-0.5 md:w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-600 rounded-full z-10"
          />
        </div>
      </div>
    </div>
  );
};