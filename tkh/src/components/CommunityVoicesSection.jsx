import { useState, useEffect, useRef } from 'react';
import { communityVoices } from '../data/communityVoicesData';

export default function CommunityVoicesSection({ setCurrentPage }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const total = communityVoices.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  // Auto-advance every 5.5 seconds; pause on hover, tap, or interaction
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  // Touch swipe support for mobile & tablet
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartXRef.current = e.targetTouches[0].clientX;
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  };

  // 4 cards in view on desktop (lg+), 2 on tablet (sm+), 1 on mobile
  const visibleVoices = [
    communityVoices[currentIndex % total],
    communityVoices[(currentIndex + 1) % total],
    communityVoices[(currentIndex + 2) % total],
    communityVoices[(currentIndex + 3) % total]
  ];

  return (
    <section
      className="relative z-10 py-10 sm:py-14 lg:py-16 max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] mx-auto px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header with Title and Carousel Controls */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-maroon block mb-0.5">
            COMMUNITY VOICES
          </span>
          <h2 className="font-heading font-bold text-xl sm:text-2xl 3xl:text-3xl text-[#1c1c1a]">
            In their words
          </h2>
        </div>

        {/* Controls: Dots, Arrows, and All Stories link */}
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
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handlePrev}
            className="w-8 h-8 rounded-full bg-white border border-[#e5e0d8] text-body hover:text-maroon hover:border-maroon transition-colors flex items-center justify-center shadow-2xs cursor-pointer active:scale-95"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="w-8 h-8 rounded-full bg-white border border-[#e5e0d8] text-body hover:text-maroon hover:border-maroon transition-colors flex items-center justify-center shadow-2xs cursor-pointer active:scale-95"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {setCurrentPage && (
            <button
              onClick={() => setCurrentPage('testimonials')}
              className="hidden md:inline-flex text-xs font-heading font-semibold text-maroon hover:underline ml-2"
            >
              All stories →
            </button>
          )}
        </div>
      </div>

      {/* 4 Cards Across on One Line on Desktop (lg+), 2 on Tablet (sm+), 1 on Mobile - WITH FULL UNCLIPPED TEXT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 items-stretch">
        {visibleVoices.map((voice, idx) => (
          <div
            key={`${voice.id}-${idx}-${currentIndex}`}
            className={`bg-[#f5f1e8] rounded-2xl p-4 sm:p-4.5 border border-[#e5e0d8] flex flex-col justify-between shadow-2xs hover:border-maroon/30 hover:shadow-xs transition-all duration-300 ${
              idx === 0
                ? 'flex'
                : idx === 1
                ? 'hidden sm:flex'
                : 'hidden lg:flex'
            }`}
          >
            <div>
              {/* Header: Thumbnail + Category / Title */}
              <div className="flex gap-3 items-start mb-3">
                <div className="w-12 h-12 shrink-0 rounded-xl overflow-hidden bg-white border border-[#e5e0d8] shadow-2xs">
                  <picture>
                    <source srcSet={voice.image} type="image/webp" />
                    <img
                      src={voice.imageFallback}
                      alt={voice.title}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full ${
                        voice.image?.includes('/partners/')
                          ? 'object-contain p-1 bg-white'
                          : 'object-cover object-center'
                      }`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = voice.imageFallback;
                      }}
                    />
                  </picture>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-heading font-bold text-maroon uppercase tracking-wide block leading-tight">
                    {voice.categoryLabel || voice.category || 'COMMUNITY'}
                  </span>
                  <h3 className="font-heading font-bold text-xs text-[#1c1c1a] leading-snug mt-1">
                    {voice.title}
                  </h3>
                  {voice.location && (
                    <span className="text-[10px] text-[#706e68] block mt-0.5">
                      {voice.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Complete Full Quotation text (NO line-clamp) */}
              <p className="text-xs sm:text-[12.5px] text-[#2b2b28] italic leading-relaxed font-serif mb-4">
                "{voice.quote}"
              </p>
            </div>

            {/* Author / Community Leader Footer */}
            <div className="flex items-center gap-2.5 pt-2.5 border-t border-[#e5e0d8]/80 mt-auto">
              <div
                className={`w-7 h-7 rounded-full font-bold flex items-center justify-center font-heading text-[10px] shrink-0 shadow-2xs ${
                  voice.accentColor === 'forest'
                    ? 'bg-forest-tint text-forest'
                    : voice.accentColor === 'ochre'
                    ? 'bg-ochre-tint text-ochre'
                    : 'bg-maroon-tint text-maroon'
                }`}
              >
                {voice.initials}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-heading font-bold text-xs text-[#1c1c1a] truncate leading-tight">
                  {voice.author}
                </h4>
                <p className="text-[10px] text-[#706e68] truncate leading-tight mt-0.5">
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
