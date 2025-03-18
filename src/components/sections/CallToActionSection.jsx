import React from 'react';
import { motion } from 'framer-motion';

const CallToActionSection = () => {
  return (
    <div className="max-w-4xl mx-auto text-center mt-24 relative z-10">
      <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-12 border border-white/10 relative overflow-hidden">
        {/* Subtle ambient glow */}
        <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="absolute -top-32 left-1/4 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl"></div>
        
        <div className="relative z-10">
          <h3 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Kubernetes Journey?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the growing list of enterprises that trust us to manage their cloud-native infrastructure with expertise and precision.
          </p>
          <motion.button
            className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 rounded-full text-white font-medium text-lg shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Our Team
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CallToActionSection;
