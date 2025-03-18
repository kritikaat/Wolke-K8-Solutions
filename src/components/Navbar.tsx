'use client';

import React, { useState, useEffect, useRef } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem, SparkleWrapper } from "./ui/navbar-menu";
import { cn } from "../lib/utils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

function Navbar({ className }: { className?: string }) {
    // Only initialize state on the client side to prevent hydration errors
    const [active, setActive] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [currentSection, setCurrentSection] = useState<string | null>(null);
    const router = useRouter();
    const pathname = usePathname();
    
    // Create refs for each section
    const sectionRefs = useRef<{
        home: HTMLElement | null;
        features: HTMLElement | null;
        about: HTMLElement | null;
        'why-choose-us': HTMLElement | null;
    }>({
        home: null,
        features: null,
        about: null,
        'why-choose-us': null
    });
    
    // Use useEffect to set mounted state after initial render
    useEffect(() => {
        setMounted(true);
    }, []);

    // Set up intersection observer for scroll spy
    useEffect(() => {
        if (mounted && pathname === '/') {
            // Get all section elements
            sectionRefs.current = {
                home: document.getElementById('home'), // Add home section
                features: document.getElementById('features'),
                about: document.getElementById('about'),
                'why-choose-us': document.getElementById('why-choose-us')
            };
            
            // Create new intersection observer
           const observerOptions = {
                root: null, // Use viewport as root
                rootMargin: '-60px 0px -40% 0px', // Adjusted margins for better detection
                threshold: 0.1 // Trigger when 10% of the element is visible
            };
            
            
            const observerCallback = (entries: any[]) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        setCurrentSection(sectionId);
                        
                        // Update URL without causing a page reload
                        const newUrl = `${window.location.pathname}#${sectionId}`;
                        window.history.replaceState(null, '', newUrl);
                        
                        // Update active menu item
                        setActive(sectionId === 'why-choose-us' ? 'Why choose wolke?' : 
                                  sectionId.charAt(0).toUpperCase() + sectionId.slice(1));
                    }
                });
            };
            
            const observer = new IntersectionObserver(observerCallback, observerOptions);
            
            // Observe each section
            Object.values(sectionRefs.current).forEach(section => {
                if (section) observer.observe(section);
            });
            
            // Clean up observer on unmount
            return () => {
                Object.values(sectionRefs.current).forEach(section => {
                    if (section) observer.unobserve(section);
                });
            };
        }
    }, [pathname, mounted]);

    // Handle initial hash in URL
    useEffect(() => {
        if (mounted && pathname === '/') {
            const hash = window.location.hash.substring(1);
            if (hash) {
                setTimeout(() => {
                    const section = document.getElementById(hash);
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                        setCurrentSection(hash);
                        setActive(hash === 'why-choose-us' ? 'Why choose wolke?' : 
                                 hash.charAt(0).toUpperCase() + hash.slice(1));
                    }
                }, 100);
            }
        }
    }, [pathname, mounted]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const scrollToSection = (sectionId: string) => {
        setIsMobileMenuOpen(false);
        
        // If we're already on the home page, scroll to the section
        if (pathname === '/') {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                // Update URL without full page reload
                window.history.pushState({}, '', `/#${sectionId}`);
                setCurrentSection(sectionId);
            }
        } else {
            // If we're on a different page, navigate to home with hash
            router.push(`/#${sectionId}`);
        }
    };

    // Early return during SSR or first render to prevent hydration mismatch
    if (!mounted) {
        return (
            <div className={cn("fixed top-0 inset-x-0 z-50", className)}>
                <div className="hidden md:block max-w-2xl mx-auto">
                    <div className="mt-10">
                        {/* Empty placeholder for SSR */}
                    </div>
                </div>
                <div className="md:hidden flex justify-end p-4">
                    {/* Empty placeholder for SSR */}
                </div>
            </div>
        );
    }

    return (
        <div className={cn("fixed top-0 inset-x-0 z-50", className)}>
            {/* Desktop Navigation */}
            <div className="hidden md:block max-w-2xl mx-auto">
                <div className="mt-10">
                    <Menu setActive={setActive}>
                        <Link href={"/"}>
                            <MenuItem setActive={setActive} active={active} item="Home">
                            </MenuItem>
                        </Link>
                        <div onClick={() => scrollToSection('features')}>
                        <MenuItem setActive={setActive} active={active} item="Features">
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
                                <ProductItem
                                    title="Cost Allocation"
                                    src="https://cdn-icons-mp4.flaticon.com/512/10970/10970360.mp4"
                                    description="Breakdown costs by Kubernetes concepts"
                                />
                                <ProductItem
                                    title="Unified Monitoring"
                                    src="https://cdn-icons-mp4.flaticon.com/512/11095/11095504.mp4"
                                    description="Join Kubernetes with cloud service costs"
                                />
                                <ProductItem
                                    title="Optimization"
                                    src="https://cdn-icons-mp4.flaticon.com/512/14447/14447745.mp4"
                                    description="Get recommendations to reduce spend"
                                />
                            </div>
                        </MenuItem>
                        </div>
                        <div onClick={() => scrollToSection('why-choose-us')}>
                        <MenuItem setActive={setActive} active={active} item="Why choose wolke?">
                            <SparkleWrapper>
                                <div className="flex flex-col space-y-3 p-2">
                                    <HoveredLink href="/Features#cost-allocation">Cost Allocation</HoveredLink>
                                    <HoveredLink href="/Features#unified-cost-monitoring">Unified Cost Monitoring</HoveredLink>
                                    <HoveredLink href="/Features#optimization-insights">Optimization Insights</HoveredLink>
                                </div>
                            </SparkleWrapper>
                        </MenuItem>
                        </div>
                        <div onClick={() => scrollToSection('about')}>
                        <MenuItem setActive={setActive} active={active} item="About" />
                        </div>
                    </Menu>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex justify-end p-4">
                {/* Modern, enhanced hamburger menu */}
                <motion.button 
                    className="hamburger-menu rounded-lg p-2 w-12 h-12 flex flex-col justify-center items-center space-y-1.5 shadow-lg"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <motion.div 
                        className="w-6 h-0.5 bg-white rounded-full" 
                        animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                    <motion.div 
                        className="w-6 h-0.5 bg-white rounded-full"
                        animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    />
                    <motion.div 
                        className="w-4 h-0.5 bg-white rounded-full ml-2"
                        animate={isMobileMenuOpen ? { rotate: -45, y: -6, width: "24px", marginLeft: "0px" } : { rotate: 0, y: 0, width: "16px", marginLeft: "8px" }}
                        transition={{ duration: 0.2 }}
                    />
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        className="md:hidden mobile-menu absolute top-20 right-4 w-72 overflow-hidden"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90 overflow-hidden">
                            <div className="p-6 flex flex-col space-y-4">
                                <Link 
                                    href="/" 
                                    className="py-3 px-4 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors font-medium flex items-center space-x-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                    <span>Home</span>
                                </Link>
                                
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                                    <div className="py-2 px-4 text-gray-600 dark:text-gray-300 text-sm font-semibold">FEATURES</div>
                                    <div className="flex flex-col space-y-1">
                                        <div 
                                            onClick={() => scrollToSection('features')}
                                            className="py-3 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors flex items-center space-x-2 cursor-pointer"
                                        >
                                            <div className="w-6 h-6 overflow-hidden rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span>Cost Allocation</span>
                                        </div>
                                        <div 
                                            onClick={() => scrollToSection('features')}
                                            className="py-3 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors flex items-center space-x-2 cursor-pointer"
                                        >
                                            <div className="w-6 h-6 overflow-hidden rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600 dark:text-purple-300" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                                </svg>
                                            </div>
                                            <span>Unified Monitoring</span>
                                        </div>
                                        <div 
                                            onClick={() => scrollToSection('features')}
                                            className="py-3 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors flex items-center space-x-2 cursor-pointer"
                                        >
                                            <div className="w-6 h-6 overflow-hidden rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-300" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span>Optimization</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div
                                    onClick={() => scrollToSection('about')}
                                    className="py-3 px-4 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors font-medium flex items-center space-x-2 cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    <span>About</span>
                                </div>
                                
                                <div onClick={() => scrollToSection('why-choose-us')}>
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                                    <div className="py-2 px-4 text-gray-600 dark:text-gray-300 text-sm font-semibold">WHY CHOOSE WOLKE?</div>
                                    <div className="flex flex-col space-y-1 px-4">
                                        <div className="flex items-center space-x-2 py-1">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                            <span className="text-gray-700 dark:text-gray-300">Cost Allocation</span>
                                        </div>
                                        <div className="flex items-center space-x-2 py-1">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                            <span className="text-gray-700 dark:text-gray-300">Unified Cost Monitoring</span>
                                        </div>
                                        <div className="flex items-center space-x-2 py-1">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                            <span className="text-gray-700 dark:text-gray-300">Optimization Insights</span>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Navbar;