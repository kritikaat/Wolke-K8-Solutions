import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    
    if (email) {
      console.log("Subscribing email:", email);
      setSubscribed(true);
      setEmail("");
      
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto relative z-10 mt-24 mb-16 md:mb-24">
      <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 relative overflow-hidden">
        {/* Subtle accents */}
        <div className="absolute top-0 left-0 w-full h-px bg-white/10"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/5"></div>
        <div className="absolute top-0 left-0 h-full w-px bg-white/10"></div>
        <div className="absolute top-0 right-0 h-full w-px bg-white/5"></div>
        
        <div className="text-center relative z-10">
          <div className="inline-block mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-indigo-400">
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold mb-4 text-white">Stay Updated</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest updates on Kubernetes best practices, industry news, and exclusive offers.
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-grow px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-indigo-500 text-white font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
          
          <AnimatePresence>
            {subscribed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 text-green-400"
              >
                Thank you for subscribing!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;