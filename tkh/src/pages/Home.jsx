import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Heart, ArrowRight, Check, MapPin, Quote } from '../components/Icons';

export default function Home({ onOpenDonate, setCurrentPage }) {
  const { metrics, outreaches, homeContent } = useData();
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);

  const defaultHeroSlides = [
    {
      img: '/images/hero-orphanage-food-educational-support.webp',
      caption: 'Food relief & school supplies donation · Oyiza Orphanage',
      state: 'FCT Abuja'
    },
    {
      img: '/images/hero-debate-competition-makurdi.webp',
      caption: 'Inter-Secondary School Debate Competition & Cash Prizes',
      state: 'Makurdi, Benue State'
    },
    {
      img: '/images/hero-digital-literacy-computer-lab.webp',
      caption: '9-Computer Laboratory Commissioning · Beckwin International',
      state: 'Plateau State'
    },
    {
      img: '/images/hero-widows-clean-cooking-stoves.webp',
      caption: 'Widows Clean Energy & Eco-Cooking Stove Distribution',
      state: 'Dafara Community'
    },
    {
      img: '/images/hero-maternal-health-malaria-prevention.webp',
      caption: 'Maternal Healthcare, Mosquito Nets & Malaria Screening',
      state: 'Lagos State'
    },
    {
      img: '/images/hero-jambells-school-outreach.webp',
      caption: 'Educational Materials & Stationery Distribution',
      state: 'JAMBELLS School, Lagos'
    },
    {
      img: '/images/hero-youth-vocational-shoemaking.webp',
      caption: 'Youth Vocational Skills & Shoemaking Apprenticeship',
      state: 'Abuja'
    },
    {
      img: '/images/11222.webp',
      caption: 'Pediatric Healthcare Support & Clinical Aid',
      state: 'Abuja Teaching Hospital'
    }
  ];

  const heroSlides =
    homeContent?.heroSlides && homeContent.heroSlides.length > 0
      ? homeContent.heroSlides
      : defaultHeroSlides;
  const heroHeadline =
    homeContent?.heroHeadline || 'Keeping Nigerian children in school and families healthy.';
  const heroSubtitle =
    homeContent?.heroSubtitle ||
    'We fund scholarships, school supplies and community health outreaches for vulnerable children, women and widows across Nigeria — and publish a field report after every one.';
  const registeredBadge =
    homeContent?.registeredBadge || 'Registered non-profit · CAC RC 7015705 · Abuja';

  // Auto-cycle through real field photos every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIdx((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleNav = (pageId, hash = '') => {
    setCurrentPage(pageId);
    window.location.hash = hash || pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#fdfbf7] text-[#1c1c1a] overflow-x-hidden">

      {/* 1. Hero Section */}
      <section className="relative pt-8 sm:pt-14 lg:pt-16 3xl:pt-20 4xl:pt-24 pb-12 sm:pb-16 lg:pb-20 3xl:pb-24 4xl:pb-32 max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16 overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 3xl:gap-16 4xl:gap-24 items-center">

          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 3xl:col-span-6 flex flex-col items-start gap-4 sm:gap-5 3xl:gap-7">
            {/* Registered Non-Profit Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 3xl:px-4 3xl:py-2 rounded-full bg-white border border-[#e5e0d8] text-[11px] sm:text-xs 3xl:text-sm text-[#4a4a46] font-medium shadow-xs max-w-full">
              <span className="w-2 h-2 rounded-full bg-forest animate-pulse shrink-0" />
              <span className="truncate">{registeredBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-bold text-2xl xs:text-3xl sm:text-4xl lg:text-5xl 2xl:text-[54px] 3xl:text-6xl 4xl:text-7xl uw:text-8xl leading-[1.12] tracking-tight text-[#1c1c1a]">
              {heroHeadline}
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base lg:text-lg 3xl:text-xl 4xl:text-2xl text-[#4a4a46] leading-relaxed max-w-xl 3xl:max-w-2xl 4xl:max-w-3xl">
              {heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 3xl:gap-4 pt-2 w-full sm:w-auto">
              <button
                onClick={() => onOpenDonate()}
                className="btn-primary w-full sm:w-auto px-6 sm:px-7 3xl:px-8 4xl:px-10 py-3.5 3xl:py-4 4xl:py-5 text-sm sm:text-base 3xl:text-lg shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Donate now</span>
                <ArrowRight className="w-4 h-4 3xl:w-5 3xl:h-5" />
              </button>
              <button
                onClick={() => handleNav('outreaches')}
                className="btn-secondary w-full sm:w-auto px-6 sm:px-7 3xl:px-8 4xl:px-10 py-3.5 3xl:py-4 4xl:py-5 text-sm sm:text-base 3xl:text-lg text-center cursor-pointer"
              >
                See our field reports
              </button>
            </div>
          </div>

          {/* Right Column: Real Outreach Photo Showcase with Slide Controls */}
          <div className="lg:col-span-5 3xl:col-span-6 w-full">
            <div className="relative rounded-3xl 3xl:rounded-4xl overflow-hidden border border-[#e5e0d8] shadow-md bg-white group">
              {/* Photo Display */}
              <div className="relative w-full h-[260px] xs:h-[300px] sm:h-[380px] lg:h-[400px] 3xl:h-[520px] 4xl:h-[620px] uw:h-[720px] overflow-hidden bg-sand">
                {heroSlides.map((slide, idx) => (
                  <img
                    key={idx}
                    src={slide.img}
                    alt={slide.caption}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-in-out ${idx === heroSlideIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                      }`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/IMG_0303.JPG';
                    }}
                  />
                ))}
              </div>

              {/* Bottom Caption Pill & Location */}
              <div className="absolute inset-x-0 bottom-0 p-4 3xl:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="px-3 py-1.5 3xl:px-4 3xl:py-2 rounded-full bg-white/95 backdrop-blur-sm border border-white/40 text-xs 3xl:text-sm font-semibold text-[#1c1c1a] shadow-sm truncate">
                    {heroSlides[heroSlideIdx]?.caption || 'Ten Kind Hands Field Outreach'}
                  </div>
                  <span className="shrink-0 px-2.5 py-1 3xl:px-3 3xl:py-1.5 rounded-full bg-black/60 text-white/90 text-[11px] 3xl:text-xs font-medium border border-white/20 backdrop-blur-sm flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#f7c899]" />
                    {heroSlides[heroSlideIdx]?.state || 'Field Mission'}
                  </span>
                </div>

                {/* Slide Indicator Dots */}
                <div className="flex items-center gap-1.5 pt-1">
                  {heroSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setHeroSlideIdx(i)}
                      aria-label={`Go to photo ${i + 1}`}
                      className={`h-1.5 3xl:h-2 rounded-full transition-all duration-300 cursor-pointer ${i === heroSlideIdx ? 'w-6 3xl:w-8 bg-white shadow-xs' : 'w-2 3xl:w-3 bg-white/40 hover:bg-white/70'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Full-Width Deep Forest Stats Banner */}
      <section className="bg-forest !text-white py-10 sm:py-14 3xl:py-16 4xl:py-20 border-y border-forest-dark" style={{ color: '#ffffff' }}>
        <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 3xl:gap-12 4xl:gap-16 !text-white" style={{ color: '#ffffff' }}>
            <div>
              <div className="font-heading font-bold text-3xl sm:text-4xl 3xl:text-5xl 4xl:text-6xl !text-white tracking-tight" style={{ color: '#ffffff' }}>
                {metrics?.totalBeneficiaries && metrics.totalBeneficiaries > 3500 ? `${metrics.totalBeneficiaries.toLocaleString()}+` : '3,500+'}
              </div>
              <div className="text-sm sm:text-base 3xl:text-lg 4xl:text-xl !text-white/90 font-normal mt-1 leading-snug" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
                children &amp; young people reached
              </div>
            </div>

            <div>
              <div className="font-heading font-bold text-3xl sm:text-4xl 3xl:text-5xl 4xl:text-6xl !text-white tracking-tight" style={{ color: '#ffffff' }}>
                200+
              </div>
              <div className="text-sm sm:text-base 3xl:text-lg 4xl:text-xl !text-white/90 font-normal mt-1 leading-snug" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
                Scholarships awarded
              </div>
            </div>

            <div>
              <div className="font-heading font-bold text-3xl sm:text-4xl 3xl:text-5xl 4xl:text-6xl !text-white tracking-tight" style={{ color: '#ffffff' }}>
                2,500+
              </div>
              <div className="text-sm sm:text-base 3xl:text-lg 4xl:text-xl !text-white/90 font-normal mt-1 leading-snug" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
                Women &amp; girls supported
              </div>
            </div>

            <div>
              <div className="font-heading font-bold text-3xl sm:text-4xl 3xl:text-5xl 4xl:text-6xl !text-white tracking-tight" style={{ color: '#ffffff' }}>
                7 States
              </div>
              <div className="text-sm sm:text-base 3xl:text-lg 4xl:text-xl !text-white/90 font-normal mt-1 leading-snug" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
                (FCT, Benue, Katsina, Plateau, Lagos, Oyo, Enugu)
              </div>
            </div>
          </div>

          <div className="mt-8 3xl:mt-10 pt-6 3xl:pt-8 border-t border-white/15 flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs sm:text-sm 3xl:text-base !text-white/80" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              Totals since founding, as reported by Ten Kind Hands.
            </span>
            <button
              onClick={() => handleNav('transparency')}
              className="text-xs sm:text-sm 3xl:text-base !text-white underline hover:opacity-80 transition-opacity cursor-pointer"
              style={{ color: '#ffffff' }}
            >
              How we count and spend →
            </button>
          </div>
        </div>
      </section>

      {/* 3. THIS MONTH IN THE FIELD: Side-by-Side Latest Report + Next Outreach */}
      <section className="py-14 sm:py-20 3xl:py-24 4xl:py-32 max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 3xl:mb-12">
          <div>
            <div className="text-xs 3xl:text-sm uppercase font-bold tracking-widest text-maroon mb-1.5">
              THIS MONTH IN THE FIELD
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl 3xl:text-4xl 4xl:text-5xl text-[#1c1c1a]">
              Every outreach gets a public report
            </h2>
          </div>
          <button
            onClick={() => handleNav('outreaches')}
            className="text-sm 3xl:text-base font-semibold text-maroon hover:text-maroon-dark transition-colors inline-flex items-center gap-1.5"
          >
            <span>All field reports</span>
            <ArrowRight className="w-4 h-4 3xl:w-5 3xl:h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 3xl:gap-12 items-stretch">

          {/* Latest Outreach Card (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl 3xl:rounded-4xl border border-[#e5e0d8] overflow-hidden shadow-sm hover:border-[#cfc7b9] transition-all flex flex-col justify-between">
            <div className="relative h-60 sm:h-72 overflow-hidden bg-gray-100">
              <img
                src="/images/IMG_0294.webp"
                alt="Youth skills and computer lab training"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/hero-digital-literacy-computer-lab.webp';
                }}
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-forest-tint text-forest font-semibold text-xs border border-forest/20 shadow-sm">
                  Report published
                </span>
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#1c1c1a] font-medium text-xs shadow-sm">
                  August 2026
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#1c1c1a] mb-2">
                  Youth skills, digital literacy &amp; academic outreach
                </h3>
                <p className="text-sm text-[#4a4a46] leading-relaxed mb-6">
                  A 5-week youth tech lab in Ikorodu, speech-day scholarships in Jos, primary school learning kits, and shoemaking and hairdressing toolkits.
                </p>
              </div>

              <div className="pt-4 border-t border-[#e5e0d8] flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-5 text-sm text-[#4a4a46]">
                  <div>
                    <span className="font-heading font-bold text-[#1c1c1a] text-lg block leading-none">345</span>
                    <span className="text-xs text-[#706e68]">youths &amp; students</span>
                  </div>
                  <div className="h-6 w-px bg-[#e5e0d8]" />
                  <div>
                    <span className="font-heading font-bold text-[#1c1c1a] text-lg block leading-none">4</span>
                    <span className="text-xs text-[#706e68]">states reached</span>
                  </div>
                </div>

                <button
                  onClick={() => handleNav('outreaches', 'outreaches/outreach-aug-2026')}
                  className="font-semibold text-sm text-maroon hover:text-maroon-dark transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Read the report</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Next Outreach Dark Card (5 Cols) */}
          <div className="lg:col-span-5 bg-[#1c1c1a] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold uppercase tracking-wider mb-4">
                NEXT OUTREACH
              </div>
              <h3 className="font-heading font-bold text-2xl text-white mb-3 leading-snug">
                November 2026 Outreach — Medical Aid Outreach
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Medical aid outreach across rural communities in Plateau, Katsina, Lagos, Oyo, and Enugu States, providing essential healthcare services, medical support, and health education to underserved individuals and families with limited access to quality healthcare.
              </p>
            </div>

            <div className="pt-8 flex flex-col gap-3">
              <button
                onClick={() => handleNav('get-involved', 'get-involved/volunteer')}
                className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-[#f5f1e8] text-[#1c1c1a] font-semibold text-sm transition-all cursor-pointer text-center"
              >
                Volunteer on this outreach
              </button>
              <button
                onClick={() => onOpenDonate()}
                className="w-full py-3 px-6 rounded-full border border-white/30 hover:border-white text-white font-medium text-sm transition-all cursor-pointer text-center hover:bg-white/5"
              >
                Fund this outreach
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. OUR WORK: Children who learn. Mothers who stay healthy. Families who earn. */}
      <section className="py-14 sm:py-20 3xl:py-24 4xl:py-32 bg-[#f5f1e8] border-y border-[#e5e0d8]">
        <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16">
          <div className="mb-10 sm:mb-12 3xl:mb-16">
            <div className="text-xs 3xl:text-sm uppercase font-bold tracking-widest text-maroon mb-1.5">
              OUR WORK
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-4xl 3xl:text-5xl 4xl:text-6xl text-[#1c1c1a]">
              Children who learn. Mothers who stay healthy. Families who earn.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:gap-10 4xl:gap-14 gap-6 lg:gap-8">
            {/* Education Card */}
            <div className="bg-white rounded-3xl 3xl:rounded-4xl border border-[#e5e0d8] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="h-52 3xl:h-64 4xl:h-76 overflow-hidden bg-gray-100">
                <img
                  src="/images/pillar1-education-scholarship.webp"
                  alt="Education and Scholarships"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/hero-debate-competition-makurdi.webp';
                  }}
                />
              </div>
              <div className="p-6 3xl:p-8 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-xs 3xl:text-sm font-bold uppercase tracking-wider text-maroon block mb-1">
                    Education
                  </span>
                  <h3 className="font-heading font-bold text-lg 3xl:text-xl 4xl:text-2xl text-[#1c1c1a] mb-2">
                    Scholarships, school supplies &amp; computer labs
                  </h3>
                  <p className="text-xs 3xl:text-sm 4xl:text-base text-[#4a4a46] leading-relaxed mb-4">
                    School fees, uniforms, stationery kits, and digital literacy labs to ensure children stay in school.
                  </p>
                </div>
                <button
                  onClick={() => handleNav('programs')}
                  className="text-xs 3xl:text-sm font-semibold text-maroon hover:text-maroon-dark inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>3 programmes →</span>
                </button>
              </div>
            </div>

            {/* Health Card */}
            <div className="bg-white rounded-3xl 3xl:rounded-4xl border border-[#e5e0d8] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="h-52 3xl:h-64 4xl:h-76 overflow-hidden bg-gray-100">
                <img
                  src="/images/pillar2-health-outreach.webp"
                  alt="Medical outreaches and malaria prevention"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/hero-maternal-health-malaria-prevention.webp';
                  }}
                />
              </div>
              <div className="p-6 3xl:p-8 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-xs 3xl:text-sm font-bold uppercase tracking-wider text-forest block mb-1">
                    Health
                  </span>
                  <h3 className="font-heading font-bold text-lg 3xl:text-xl 4xl:text-2xl text-[#1c1c1a] mb-2">
                    Medical outreaches &amp; malaria prevention
                  </h3>
                  <p className="text-xs 3xl:text-sm 4xl:text-base text-[#4a4a46] leading-relaxed mb-4">
                    Treated mosquito nets, rapid tests, maternal health packs, and health education in rural areas.
                  </p>
                </div>
                <button
                  onClick={() => handleNav('programs')}
                  className="text-xs 3xl:text-sm font-semibold text-forest hover:text-forest-dark inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>1 programme →</span>
                </button>
              </div>
            </div>

            {/* Livelihoods Card */}
            <div className="bg-white rounded-3xl 3xl:rounded-4xl border border-[#e5e0d8] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="h-52 3xl:h-64 4xl:h-76 overflow-hidden bg-gray-100">
                <img
                  src="/images/hero-widows-clean-cooking-stoves.webp"
                  alt="Support for widows and young people"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/hero-community-empowerment.webp';
                  }}
                />
              </div>
              <div className="p-6 3xl:p-8 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-xs 3xl:text-sm font-bold uppercase tracking-wider text-ochre block mb-1">
                    Livelihoods
                  </span>
                  <h3 className="font-heading font-bold text-lg 3xl:text-xl 4xl:text-2xl text-[#1c1c1a] mb-2">
                    Support for widows, women &amp; young people
                  </h3>
                  <p className="text-xs 3xl:text-sm 4xl:text-base text-[#4a4a46] leading-relaxed mb-4">
                    Eco-efficient cooking pots, micro-grants for widows, and vocational trade toolkits for youth.
                  </p>
                </div>
                <button
                  onClick={() => handleNav('programs')}
                  className="text-xs 3xl:text-sm font-semibold text-ochre hover:text-[#915610] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>2 programmes →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          LOWER FLOW: COMMUNITY VOICES & GIVING SIMULATOR
      ========================================================= */}
      <div className="relative overflow-hidden">
        {/* 5. Section: In their words (Testimonials with Real Field Photos) */}
        <section className="relative z-10 py-14 sm:py-20 3xl:py-24 4xl:py-32 max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16">
          <div className="mb-8 sm:mb-10 3xl:mb-14">
            <span className="text-xs 3xl:text-sm uppercase font-bold tracking-widest text-maroon block mb-1">
              COMMUNITY VOICES
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl 3xl:text-4xl 4xl:text-5xl text-[#1c1c1a]">
              In their words
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 3xl:gap-10 4xl:gap-14">
            {/* Testimonial 1 with Beckwin School Photo */}
            <div className="bg-[#f5f1e8] rounded-3xl 3xl:rounded-4xl p-6 sm:p-8 3xl:p-10 border border-[#e5e0d8] flex flex-col justify-between shadow-xs">
              <div className="flex flex-col sm:flex-row gap-4 3xl:gap-6 items-start mb-6">
                <div className="w-full sm:w-32 3xl:w-40 4xl:w-48 h-24 3xl:h-30 4xl:h-36 shrink-0 rounded-2xl overflow-hidden bg-sand border border-[#e5e0d8]">
                  <img
                    src="/images/hero-digital-literacy-computer-lab.webp"
                    alt="Beckwin School Computer Lab setup"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <p className="text-sm sm:text-base 3xl:text-lg 4xl:text-xl text-[#1c1c1a] italic leading-relaxed font-serif">
                  "...a well-equipped computer laboratory with nine computers... our children can now gain the digital skills they need to compete in today's world."
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#e5e0d8]">
                <div className="w-11 h-11 3xl:w-13 3xl:h-13 rounded-full bg-maroon-tint text-maroon font-bold flex items-center justify-center font-heading text-sm 3xl:text-base shrink-0">
                  BO
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm 3xl:text-base 4xl:text-lg text-[#1c1c1a]">
                    Mrs. Becky Omagbogu
                  </h4>
                  <p className="text-xs 3xl:text-sm text-[#706e68]">
                    Proprietor, Beckwin International School · Plateau
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 with Healthcare Outreach Photo */}
            <div className="bg-[#f5f1e8] rounded-3xl 3xl:rounded-4xl p-6 sm:p-8 3xl:p-10 border border-[#e5e0d8] flex flex-col justify-between shadow-xs">
              <div className="flex flex-col sm:flex-row gap-4 3xl:gap-6 items-start mb-6">
                <div className="w-full sm:w-32 3xl:w-40 4xl:w-48 h-24 3xl:h-30 4xl:h-36 shrink-0 rounded-2xl overflow-hidden bg-sand border border-[#e5e0d8]">
                  <img
                    src="/images/hero-maternal-health-malaria-prevention.webp"
                    alt="Abata community healthcare outreach"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <p className="text-sm sm:text-base 3xl:text-lg 4xl:text-xl text-[#1c1c1a] italic leading-relaxed font-serif">
                  "We truly appreciate and love you for coming to our community to educate us about malaria, how to prevent it, and how to take better care of ourselves."
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#e5e0d8]">
                <div className="w-11 h-11 3xl:w-13 3xl:h-13 rounded-full bg-forest-tint text-forest font-bold flex items-center justify-center font-heading text-sm 3xl:text-base shrink-0">
                  AC
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm 3xl:text-base 4xl:text-lg text-[#1c1c1a]">
                    Nursing mothers, Abata Community
                  </h4>
                  <p className="text-xs 3xl:text-sm text-[#706e68]">
                    Lagos State
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* 6. Maroon Banner: Give monthly. Plan outreaches with us. */}
        <section className="relative z-10 bg-maroon text-white py-12 sm:py-16 3xl:py-20 4xl:py-24 mt-10 sm:mt-12">
          <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 sm:gap-8 3xl:gap-12">
            <div className="max-w-xl 3xl:max-w-3xl 4xl:max-w-4xl">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl 3xl:text-4xl 4xl:text-5xl text-white mb-2 3xl:mb-4">
                Give monthly. Plan outreaches with us.
              </h2>
              <p className="text-sm sm:text-base 3xl:text-lg 4xl:text-xl text-white/90 leading-relaxed">
                Regular gifts let us plan each month's outreach in advance. ₦5,000 a month buys three pupils a full learning kit every term.
              </p>
            </div>

            <button
              onClick={() => onOpenDonate()}
              className="w-full md:w-auto px-8 3xl:px-10 py-4 3xl:py-5 rounded-full bg-white text-maroon font-heading font-bold text-sm sm:text-base 3xl:text-lg hover:bg-[#f5f1e8] transition-colors shadow-md cursor-pointer shrink-0 text-center"
            >
              Start a monthly gift
            </button>
          </div>
        </section>

      </div>

      {/* 7. Partner Strip */}
      <section className="py-10 sm:py-12 3xl:py-16 4xl:py-20 bg-white border-b border-[#e5e0d8]">
        <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16 text-center">
          <div className="text-xs 3xl:text-sm uppercase font-bold tracking-wider text-[#706e68] mb-6 3xl:mb-8">
            SCHOOLS, HOMES AND HOSPITALS WE HAVE WORKED WITH
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-x-8 sm:gap-y-4 3xl:gap-x-10 3xl:gap-y-6 text-sm 3xl:text-base 4xl:text-lg font-heading font-semibold text-[#4a4a46] leading-relaxed max-w-5xl 3xl:max-w-7xl mx-auto">
            <span className="hover:text-maroon transition-colors">Beckwin International School</span>
            <span className="text-[#d0c8bb]">•</span>
            <span className="hover:text-maroon transition-colors">Karvron Montessori School</span>
            <span className="text-[#d0c8bb]">•</span>
            <span className="hover:text-maroon transition-colors">Jambells School</span>
            <span className="text-[#d0c8bb]">•</span>
            <span className="hover:text-maroon transition-colors">Oyiza Orphanage</span>
            <span className="text-[#d0c8bb]">•</span>
            <span className="hover:text-maroon transition-colors">Abuja Teaching Hospital</span>
            <span className="text-[#d0c8bb]">•</span>
            <span className="hover:text-maroon transition-colors">ABBA FATHER RICH ORPHANAGE HOME</span>
            <span className="text-[#d0c8bb]">•</span>
            <span className="hover:text-maroon transition-colors">Compassionate Heart Orphanage</span>
            <span className="text-[#d0c8bb]">•</span>
            <span className="hover:text-maroon transition-colors">OLUODE Community Primary School Oke-Alaro, Apata Ibadan</span>
            <span className="text-[#d0c8bb]">•</span>
            <span className="hover:text-maroon transition-colors">Deeper Life Church, Abattoir</span>
          </div>
        </div>
      </section>

    </div>
  );
}

