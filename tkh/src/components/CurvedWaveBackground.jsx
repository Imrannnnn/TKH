import React from 'react';

export default function CurvedWaveBackground({ side = 'right', className = '' }) {
  const isLeft = side === 'left';

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className} ${
        isLeft ? 'scale-x-[-1]' : ''
      }`}
      style={{
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 75% 45%, black 25%, transparent 85%)',
        maskImage: 'radial-gradient(ellipse 80% 70% at 75% 45%, black 25%, transparent 85%)'
      }}
    >
      <svg
        className="w-full h-full object-cover opacity-60"
        viewBox="0 0 1440 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Subtle Ambient Radial Tint */}
          <radialGradient id={`cleanGlow-${side}`} cx="75%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          {/* Unified Soft Green-Teal Gradient */}
          <linearGradient id={`unifiedWaveGrad-${side}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1f3b34" stopOpacity="0" />
            <stop offset="30%" stopColor="#10b981" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#0d9488" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>

          {/* Secondary Delicate Line Gradient */}
          <linearGradient id={`unifiedWaveSub-${side}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0d9488" stopOpacity="0" />
            <stop offset="40%" stopColor="#34d399" stopOpacity="0.45" />
            <stop offset="80%" stopColor="#059669" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill={`url(#cleanGlow-${side})`} />

        {/* Unified Sweeping Curve 1 */}
        <path
          d="M 150, 680 C 480, 440 850, 240 1400, 200"
          stroke={`url(#unifiedWaveGrad-${side})`}
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Unified Parallel Harmonic Curve 2 */}
        <path
          d="M 280, 700 C 600, 490 950, 310 1420, 290"
          stroke={`url(#unifiedWaveSub-${side})`}
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Single Intersecting Circular Arc Top-Right */}
        <circle
          cx="1100"
          cy="80"
          r="220"
          stroke="#10b981"
          strokeWidth="1.2"
          strokeOpacity="0.35"
        />

        {/* Small subtle atom dot resting on the arc */}
        <circle cx="920" cy="220" r="3" fill="#0d9488" opacity="0.75" />
        <circle cx="920" cy="220" r="6" stroke="#10b981" strokeWidth="0.8" opacity="0.3" />
      </svg>
    </div>
  );
}
