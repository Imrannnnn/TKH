import { useState, useEffect } from 'react';
import { PARTNERS_DATA } from '../data/partnersData';
import { Heart, MapPin, Quote } from './Icons';

export default function PartnerCarousel({ onOpenDonate, setCurrentPage }) {
  const [activePartner, setActivePartner] = useState(null);

  // Two identical halves guarantee a mathematically seamless, continuous infinite loop at -50%
  const marqueeItems = [...PARTNERS_DATA, ...PARTNERS_DATA];

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActivePartner(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderBadgeOrLogo = (partner) => {
    if (partner.logo) {
      return (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-2 border-[#e5e0d8] group-hover:border-maroon p-2.5 sm:p-3 shadow-2xs group-hover:shadow-md transition-all duration-300 flex items-center justify-center overflow-hidden group-hover:scale-105">
          <img
            src={partner.logo}
            alt={`${partner.name} logo`}
            className="w-full h-full object-contain rounded-full transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              if (partner.logoPng && e.currentTarget.src !== partner.logoPng) {
                e.currentTarget.src = partner.logoPng;
              }
            }}
          />
        </div>
      );
    }

    // Clean text badge for communities, councils, and places without an official logo
    const badgeColorClass =
      partner.badgeColor === 'forest'
        ? 'bg-forest-tint/80 text-forest'
        : partner.badgeColor === 'ochre'
        ? 'bg-ochre-tint/80 text-ochre'
        : 'bg-[#faf6f0] text-maroon';

    return (
      <div
        className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#e5e0d8] group-hover:border-maroon p-2 shadow-2xs group-hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden group-hover:scale-105 ${badgeColorClass}`}
      >
        <span className="font-heading font-extrabold text-sm sm:text-base tracking-wider leading-none">
          {partner.initials || (partner.shortName || partner.name).slice(0, 3).toUpperCase()}
        </span>
        <span className="text-[9px] uppercase font-bold tracking-tight opacity-75 mt-1 leading-none truncate max-w-[85%] text-center">
          {partner.category === 'community'
            ? 'COMMUNITY'
            : partner.category === 'council'
            ? 'COUNCIL'
            : partner.category === 'school'
            ? 'SCHOOL'
            : 'OUTREACH'}
        </span>
      </div>
    );
  };

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-white border-b border-[#e5e0d8] overflow-hidden w-full">
      {/* Header Container */}
      <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] mx-auto px-4 sm:px-6 lg:px-8 mb-5 sm:mb-6 text-center sm:text-left">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-maroon block mb-1">
          Partnerships &amp; beneficiaries
        </span>
        <h2 className="text-xl sm:text-2xl 3xl:text-3xl font-heading font-bold text-ink tracking-tight">
          Where we've made a difference
        </h2>
      </div>

      {/* Full-Width Carousel Track Area (Single Continuous Scrolling Line) */}
      <div className="relative w-full overflow-x-hidden no-scrollbar py-2">
        {/* Subtle Side Fade Vignettes */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Single Row: Scrolling Continuously in Exactly One Line */}
        <div
          className={`flex flex-nowrap items-center gap-6 sm:gap-10 py-2 ${
            activePartner ? 'partner-marquee-paused' : 'animate-partner-marquee'
          }`}
        >
          {marqueeItems.map((partner, idx) => (
            <div
              key={`${partner.id}-${idx}`}
              onClick={() => setActivePartner(partner)}
              className="group flex flex-col items-center shrink-0 w-28 sm:w-36 cursor-pointer select-none text-center"
            >
              {renderBadgeOrLogo(partner)}
              <span className="font-heading font-semibold text-xs text-ink group-hover:text-maroon transition-colors truncate max-w-full leading-tight mt-2 px-1">
                {partner.shortName || partner.name}
              </span>
              <span className="text-[10px] text-[#706e68] truncate max-w-full px-1 mt-0.5">
                {partner.location}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Partner / Community Details Modal */}
      {activePartner && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setActivePartner(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#e5e0d8] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#fdfbf7] p-4 sm:p-5 border-b border-[#e5e0d8] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {activePartner.logo ? (
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-[#e5e0d8] p-2 flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                    <img
                      src={activePartner.logo}
                      alt={activePartner.name}
                      className="w-full h-full object-contain rounded-full"
                      onError={(e) => {
                        if (activePartner.logoPng && e.currentTarget.src !== activePartner.logoPng) {
                          e.currentTarget.src = activePartner.logoPng;
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className={`w-14 h-14 rounded-full border-2 border-[#e5e0d8] flex flex-col items-center justify-center shrink-0 shadow-xs ${
                      activePartner.badgeColor === 'forest'
                        ? 'bg-forest-tint text-forest'
                        : activePartner.badgeColor === 'ochre'
                        ? 'bg-ochre-tint text-ochre'
                        : 'bg-[#faf6f0] text-maroon'
                    }`}
                  >
                    <span className="font-heading font-extrabold text-sm tracking-wider">
                      {activePartner.initials || (activePartner.shortName || activePartner.name).slice(0, 3).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-maroon/10 text-maroon text-[10px] font-bold tracking-tight mb-0.5">
                    {activePartner.categoryLabel}
                  </span>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-ink leading-snug truncate">
                    {activePartner.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-ochre font-medium">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{activePartner.location}</span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setActivePartner(null)}
                className="p-1.5 rounded-full text-[#706e68] hover:text-ink hover:bg-[#e5e0d8]/50 transition-colors cursor-pointer shrink-0"
                aria-label="Close dialog"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-5 max-h-[65vh] overflow-y-auto space-y-3">
              {activePartner.outreachPhoto && (
                <div className="rounded-xl overflow-hidden border border-[#e5e0d8] shadow-xs">
                  <img
                    src={activePartner.outreachPhoto}
                    alt={`Outreach in ${activePartner.name}`}
                    className="w-full h-44 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/hero-community-empowerment.webp';
                    }}
                  />
                </div>
              )}

              <div className="bg-[#f9f7f2] p-3.5 rounded-xl border border-[#ece6dc]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#706e68] mb-1 font-heading">
                  Field Outreach &amp; Impact
                </div>
                <p className="text-xs sm:text-sm text-body font-medium leading-relaxed">
                  {activePartner.impact}
                </p>
              </div>

              {activePartner.quote && (
                <div className="p-3.5 rounded-xl bg-white border border-[#e5e0d8] shadow-xs">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Quote className="w-3.5 h-3.5 text-maroon" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-maroon font-heading">
                      Community Feedback
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm italic text-ink leading-relaxed">
                    "{activePartner.quote}"
                  </p>
                  {activePartner.quoteAuthor && (
                    <div className="mt-2 text-right text-[11px] font-heading font-semibold text-maroon">
                      — {activePartner.quoteAuthor}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="bg-[#fdfbf7] p-3.5 sm:p-4 border-t border-[#e5e0d8] flex items-center justify-between gap-2">
              {setCurrentPage && (
                <button
                  onClick={() => {
                    setActivePartner(null);
                    setCurrentPage('testimonials');
                  }}
                  className="px-3.5 py-1.5 rounded-full border border-[#e5e0d8] bg-white text-xs font-heading font-semibold text-ink hover:border-maroon transition-colors cursor-pointer"
                >
                  View Testimonials
                </button>
              )}
              {onOpenDonate && (
                <button
                  onClick={() => {
                    setActivePartner(null);
                    onOpenDonate();
                  }}
                  className="px-4 py-1.5 rounded-full bg-maroon text-white text-xs font-heading font-semibold hover:bg-maroon-dark transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer ml-auto"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>Support Outreach</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
