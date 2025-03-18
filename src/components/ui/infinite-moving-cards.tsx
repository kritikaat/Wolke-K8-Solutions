"use client"

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

// Define our animations in a style tag
const animationCSS = `
@keyframes float-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
@keyframes float-medium {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
@keyframes float-fast {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}
.animate-float-medium {
  animation: float-medium 6s ease-in-out infinite;
}
.animate-float-fast {
  animation: float-fast 4s ease-in-out infinite;
}
@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-50%));
  }
}
.animate-scroll {
  animation: scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite;
}
`;

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    title: string;
    description: string;
    image: string;
    icon?: React.ReactNode;
    color?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <>
      <style>{animationCSS}</style>
      <div
        ref={containerRef}
        className={cn(
          "scroller relative z-20 max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
          className
        )}
      >
        <ul
          ref={scrollerRef}
          className={cn(
            "flex min-w-full shrink-0 gap-6 py-8 w-max flex-nowrap",
            start && "animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
        >
          {items.map((item, idx) => (
            <li
              key={idx}
              className="w-[350px] h-[420px] max-w-full relative rounded-2xl overflow-hidden shrink-0 group"
            >
              {/* Glowing border effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${item.color || 'from-blue-600 to-purple-600'} opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
              
              {/* Card content */}
              <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/95 backdrop-blur-md p-1">
                <div className="h-full flex flex-col rounded-xl border border-slate-700/30 overflow-hidden">
                  {/* Image Section with Cloud Elements */}
                  <div className="w-full h-2/5 bg-gradient-to-b from-slate-800/80 to-slate-900/80 relative overflow-hidden flex items-center justify-center p-6">
                    {/* Animated cloud particles */}
                    <div className="absolute inset-0">
                      <div className="absolute top-2 left-1/4 w-6 h-6 bg-blue-400/20 rounded-full blur-sm animate-float-medium"></div>
                      <div className="absolute top-6 right-1/4 w-4 h-4 bg-indigo-400/20 rounded-full blur-sm animate-float-slow"></div>
                      <div className="absolute bottom-3 left-1/3 w-5 h-5 bg-purple-400/20 rounded-full blur-sm animate-float-fast"></div>
                    </div>
                    
                    {/* Using placeholder with fixed dimensions for image visibility */}
                    <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-24 w-32 object-contain"
                      />
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6 flex flex-col h-3/5 relative">
                    <div className="flex items-start gap-2 mb-3">
                      <div className="text-blue-400">
                        {item.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-white line-clamp-2 relative z-10">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-300 line-clamp-4 leading-relaxed relative z-10">
                      {item.description}
                    </p>
                    <div className="mt-auto pt-3 flex justify-between items-center relative z-10">
                      <span className={`text-xs inline-block py-1 px-3 rounded-full bg-gradient-to-r ${item.color || 'from-blue-500/20 to-purple-500/20'} text-blue-300 font-medium group-hover:shadow-glow transition-all duration-300`}>
                        {item.description.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};