import React from 'react';
import { whatWeDo } from '../../data/companyData.js';

const WhatWeDoSection = () => {
  return (
    <div className="max-w-6xl mx-auto relative z-10 mb-24">
      <div className="backdrop-blur-lg bg-white/5 rounded-3xl p-8 border border-white/10">
        <div className="flex items-center mb-8">
          <div className="w-1 h-6 bg-indigo-400 mr-4"></div>
          <h3 className="text-3xl font-bold text-white">What We Do</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whatWeDo.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-300">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeDoSection;