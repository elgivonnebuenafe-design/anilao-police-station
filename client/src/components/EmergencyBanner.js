import React from 'react';
import { Phone, AlertTriangle } from 'lucide-react';

const EmergencyBanner = () => {
  return (
    <div className="bg-red-600 text-white py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 flex-wrap">
        <AlertTriangle className="w-5 h-5 animate-pulse" />
        <span className="font-semibold">EMERGENCY?</span>
        <span className="hidden sm:inline">Call</span>
        <a href="tel:911" className="flex items-center gap-2 bg-white text-red-600 px-4 py-1 rounded-full font-bold hover:bg-red-100 transition-colors">
          <Phone className="w-4 h-4" />
          911
        </a>
        <span className="hidden sm:inline mx-2">or</span>
        <a href="tel:0331234567" className="flex items-center gap-2 bg-red-700 px-4 py-1 rounded-full font-bold hover:bg-red-800 transition-colors">
          <Phone className="w-4 h-4" />
          (033) 123-4567
        </a>
      </div>
    </div>
  );
};

export default EmergencyBanner;
