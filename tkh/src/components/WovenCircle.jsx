
export default function WovenCircle({ size = 120, className = '' }) {
  return (
    <div
      className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer Woven Wave Ring (Terracotta Primary) */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full animate-spin-slow opacity-80"
        fill="none"
      >
        <path
          d="M 100, 20
             C 145, 20 180, 55 180, 100
             C 180, 145 145, 180 100, 180
             C 55, 180 20, 145 20, 100
             C 20, 55 55, 20 100, 20 Z"
          stroke="#8f2830"
          strokeWidth="1.5"
          strokeDasharray="8 6"
        />
        {/* Orbital Atom 1 */}
        <circle cx="180" cy="100" r="3.5" fill="#8f2830" />
        <circle cx="180" cy="100" r="6" stroke="#8f2830" strokeWidth="0.8" opacity="0.6" />
      </svg>

      {/* Middle Undulating Wave Ring (Deep Forest Green) */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full animate-spin-reverse opacity-75"
        fill="none"
      >
        <path
          d="M 100, 35
             C 135, 25 165, 65 165, 100
             C 165, 135 135, 165 100, 165
             C 65, 165 35, 135 35, 100
             C 35, 65 65, 35 100, 35 Z"
          stroke="#1f3b34"
          strokeWidth="1.5"
        />
        {/* Orbital Atom 2 */}
        <circle cx="35" cy="100" r="3" fill="#1f3b34" />
      </svg>

      {/* Inner Harmonic Wave Ring (Warm Clay / Amber) */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full animate-spin-slow opacity-70"
        fill="none"
      >
        <path
          d="M 100, 50
             C 125, 45 150, 75 150, 100
             C 150, 125 125, 150 100, 150
             C 75, 150 50, 125 50, 100
             C 50, 75 75, 50 100, 50 Z"
          stroke="#c27d38"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        {/* Orbital Atom 3 */}
        <circle cx="100" cy="50" r="2.5" fill="#c27d38" />
      </svg>

      {/* Central Gentle Pulsing Atom (Slate Blue) */}
      <div className="w-4 h-4 rounded-full bg-[#284d57] shadow-[0_0_10px_rgba(40,77,87,0.4)] animate-pulse-gentle flex items-center justify-center z-10">
        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
      </div>
    </div>
  );
}
