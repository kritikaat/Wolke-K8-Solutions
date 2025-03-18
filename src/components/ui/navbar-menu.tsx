"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

const transition = {
    type: "spring",
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
};

export const MenuItem = ({
    setActive,
    active,
    item,
    children,
}: {
    setActive: (item: string | null) => void;
    active: string | null;
    item: string;
    children?: React.ReactNode;
}) => {
    // Add local hover state that's separate from the active prop
    const [isHovering, setIsHovering] = React.useState(false);
    
    // Only show dropdown when hovering, regardless of active state
    const showDropdown = isHovering && children;
    
    return (
        <div 
            onMouseEnter={() => {
                setIsHovering(true);
                setActive(item);
            }} 
            onMouseLeave={() => {
                setIsHovering(false);
                setActive(null);
            }}
            className="relative"
        >
            <motion.p
                transition={{ duration: 0.3 }}
                className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
            >
                {item}
            </motion.p>
            {showDropdown && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={transition}
                >
                    <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
                        <motion.div
                            transition={transition}
                            layoutId="active" 
                            className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
                        >
                            <motion.div
                                layout
                                className="w-max h-full p-4"
                            >
                                {children}
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export const Menu = ({
    setActive,
    children,
}: {
    setActive: (item: string | null) => void;
    children: React.ReactNode;
}) => {
    return (
        <nav
            onMouseLeave={() => setActive(null)} // resets the state
            className="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6 "
        >
            {children}
        </nav>
    );
};

export const ProductItem = ({
    title,
    description,
    src,
}: {
    title: string;
    description: string;
    src: string;
}) => {
    const isVideo = src.endsWith(".mp4");
    return (
        <div className="flex flex-col space-y-2 items-center">
            {isVideo ? (
                <video
                    autoPlay
                    loop
                    muted
                    width={60}
                    height={30}
                    className="shrink-0 rounded-md shadow-md"
                >
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <Image
                    src={src}
                    width={60}
                    height={30}
                    alt={title}
                    className="shrink-0 rounded-md shadow-md"
                />
            )}
            <div className="text-center">
                <h4 className="text-xs font-bold mb-0.5 text-black dark:text-white">
                    {title}
                </h4>
                <p className="text-neutral-700 text-xs dark:text-neutral-300">
                    {description}
                </p>
            </div>
        </div>
    );
};
  
  export function HoveredLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
      <motion.a
        href={href}
        className="relative text-white hover:text-purple-400 transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
      >
        {children}
      </motion.a>
    );
  }

export function SparkleWrapper({ children }: { children: React.ReactNode }) {
    return (
      <div className="relative flex flex-col space-y-4 p-4 rounded-lg overflow-hidden bg-black text-white">
        {/* Background with Collision Effect */}
        <BackgroundBeamsWithCollision className="absolute inset-0 z-0" children  />
  
        {/* Animated Wrapper */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </div>
    );
  }