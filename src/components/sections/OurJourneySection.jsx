import React from 'react';
import { OurJourney } from '../../data/companyData.js';

const OurJourneySection = () => {
  return (
    <div className="max-w-6xl mx-auto relative z-10 mb-24">
      <div className="backdrop-blur-lg bg-white/5 rounded-3xl p-8 border border-white/10">
        <div className="flex items-center mb-8">
          <div className="w-1 h-6 bg-sky-400 mr-4"></div>
          <h3 className="text-3xl font-bold text-white">Our Journey</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {OurJourney.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-sky-500/10 text-sky-400 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
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

export default OurJourneySection;
