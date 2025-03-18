import React from 'react';
import { OurMission } from '../../data/companyData.js';

const OurMissionSection = () => {
    return (
      <div className="max-w-6xl mx-auto relative z-10 mb-24">
        <div className="backdrop-blur-lg bg-white/5 rounded-3xl p-8 border border-white/10">
          <div className="flex items-center mb-8">
            <div className="w-1 h-6 bg-blue-400 mr-4"></div>
            <h3 className="text-3xl font-bold text-white">Our Mission</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OurMission.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500/10 text-blue-400 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
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
  
  export default OurMissionSection;