import React from 'react';

export default function ThinWaveDivider({ className = '' }) {
  return (
    <div className={`relative w-full h-16 overflow-hidden pointer-events-none ${className}`}>
      {/* Animated Thin Dark Blue Wave Stroke 1 */}
      <svg
        className="absolute top-1/2 -translate-y-1/2 left-0 w-[200%] h-12 opacity-75 animate-wave-1"
        viewBox="0 0 1200 40"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,20 C150,38 350,2 500,20 C650,38 850,2 1000,20 C1150,38 1350,2 1500,20"
          stroke="#1e3a8a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Animated Thin Cyan-Blue Wave Stroke 2 */}
      <svg
        className="absolute top-1/2 -translate-y-1/2 left-0 w-[200%] h-12 opacity-50 animate-wave-2"
        viewBox="0 0 1200 40"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,20 C200,4 400,36 600,20 C800,4 1000,36 1200,20 C1400,4 1600,36 1800,20"
          stroke="#0284c7"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </svg>

      {/* Little Floating Atoms Moving Across */}
      <div className="absolute inset-0 max-w-7xl mx-auto">
        {/* Little Atom 1 */}
        <div className="absolute top-3 left-[15%] w-2.5 h-2.5 rounded-full bg-blue-900 shadow-[0_0_8px_#1e3a8a] animate-atom-1 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
        </div>

        {/* Little Atom 2 */}
        <div className="absolute top-6 left-[42%] w-2 h-2 rounded-full bg-sky-700 shadow-[0_0_6px_#0284c7] animate-atom-2 flex items-center justify-center">
          <div className="w-0.5 h-0.5 rounded-full bg-white"></div>
        </div>

        {/* Little Atom 3 */}
        <div className="absolute top-2 left-[68%] w-3 h-3 rounded-full bg-blue-950 shadow-[0_0_8px_#1e40af] animate-atom-3 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-cyan-300"></div>
          <div className="absolute inset-0 rounded-full border border-cyan-400/40 animate-ping"></div>
        </div>

        {/* Little Atom 4 */}
        <div className="absolute top-7 left-[88%] w-2 h-2 rounded-full bg-blue-800 shadow-[0_0_6px_#1e3a8a] animate-atom-1 flex items-center justify-center">
          <div className="w-0.5 h-0.5 rounded-full bg-white"></div>
        </div>
      </div>
    </div>
  );
}
