import React from 'react';
import { motion } from 'framer-motion';
import { trustedBy } from '../../data/companyData.js';

const TrustedBySection = () => {
  return (
    <div className="max-w-6xl mx-auto relative z-10 py-20">
      {/* Glass morphism container with subtle gradient border */}
      <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-12 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Ambient glow effects */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 opacity-20 rounded-full blur-3xl"></div>
        
        {/* 3D-like floating section heading */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <h3 className="text-sm font-medium bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3 uppercase tracking-wider">
              Trusted By
            </h3>
            <h2 className="text-4xl font-bold text-white mb-4">
              Millions of Internet Properties
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>
        </div>

        {/* Dynamic grid with spotlight hover effect */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {trustedBy.map((company, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex items-center justify-center"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-300"></div>
                <div className="w-full h-24 bg-white/8 backdrop-blur-md rounded-2xl flex items-center justify-center p-4 border border-white/10 transition-all duration-300 group-hover:scale-105 relative">
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="w-full h-full object-contain filter group-hover:brightness-110"
                    />
                  ) : (
                    <div className="w-full h-full rounded-xl flex items-center justify-center bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/5">
                      <span className="text-gray-300 font-medium">{company.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedBySection;