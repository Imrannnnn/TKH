import { useState } from 'react';
import { communityVoices } from '../data/communityVoicesData';

export default function CommunityVoicesSection({ setCurrentPage }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // We show 2 cards at a time on desktop, 1 on mobile
  const maxIndex = communityVoices.length - 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Visible pair of cards (wrapping around)
  const firstVoice = communityVoices[currentIndex];
  const secondVoice = communityVoices[(currentIndex + 1) % communityVoices.length];

  return (
    <section className="relative z-10 py-6 sm:py-8 max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Compact Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-maroon block mb-0.5">
            COMMUNITY VOICES
          </span>
          <h2 className="font-heading font-bold text-lg sm:text-xl 3xl:text-2xl text-[#1c1c1a]">
            In their words
          </h2>
        </div>

        {/* Minimal Controls */}
        <div className="flex items-center gap-2">
          {/* Indicator dots */}
          <div className="hidden sm:flex items-center gap-1 mr-2">
            {communityVoices.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  i === currentIndex ? 'w-4 bg-maroon' : 'w-1.5 bg-[#d0c8bb] hover:bg-[#8a8780]'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handlePrev}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-[#e5e0d8] text-body hover:text-maroon hover:border-maroon transition-colors flex items-center justify-center shadow-2xs cursor-pointer"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-[#e5e0d8] text-body hover:text-maroon hover:border-maroon transition-colors flex items-center justify-center shadow-2xs cursor-pointer"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {setCurrentPage && (
            <button
              onClick={() => setCurrentPage('testimonials')}
              className="hidden md:inline-flex text-[11px] font-heading font-semibold text-maroon hover:underline ml-2"
            >
              All stories →
            </button>
          )}
        </div>
      </div>

      {/* Compact 2-Card Slider View (1 on mobile, 2 on md+) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {[firstVoice, secondVoice].map((voice, idx) => (
          <div
            key={`${voice.id}-${idx}`}
            className={`bg-[#f5f1e8] rounded-2xl p-3.5 sm:p-4 border border-[#e5e0d8] flex flex-col justify-between shadow-2xs hover:border-maroon/30 transition-all ${
              idx === 1 ? 'hidden md:flex' : 'flex'
            }`}
          >
            <div className="flex gap-3 items-start mb-2.5">
              {/* Compact Thumbnail */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl overflow-hidden bg-sand border border-[#e5e0d8]">
                <picture>
                  <source srcSet={voice.image} type="image/webp" />
                  <img
                    src={voice.imageFallback}
                    alt={voice.title}
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full object-center ${voice.image?.includes('/partners/') ? 'object-contain p-1.5 bg-white' : 'object-cover'}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = voice.imageFallback;
                    }}
                  />
                </picture>
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-heading font-bold text-maroon uppercase tracking-wide truncate block mb-0.5">
                  {voice.title}
                </span>
                <p className="text-xs text-[#2b2b28] italic leading-snug line-clamp-3 font-serif">
                  "{voice.quote}"
                </p>
              </div>
            </div>

            {/* Author Footer */}
            <div className="flex items-center gap-2.5 pt-2 border-t border-[#e5e0d8]/80">
              <div
                className={`w-7 h-7 rounded-full font-bold flex items-center justify-center font-heading text-[10px] shrink-0 ${
                  voice.accentColor === 'forest'
                    ? 'bg-forest-tint text-forest'
                    : voice.accentColor === 'ochre'
                    ? 'bg-ochre-tint text-ochre'
                    : 'bg-maroon-tint text-maroon'
                }`}
              >
                {voice.initials}
              </div>
              <div className="min-w-0 flex-1 flex items-baseline justify-between gap-2">
                <h4 className="font-heading font-bold text-xs text-[#1c1c1a] truncate">
                  {voice.author}
                </h4>
                <p className="text-[10px] text-[#706e68] truncate text-right">
                  {voice.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
