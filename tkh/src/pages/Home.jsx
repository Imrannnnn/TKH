import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Heart, ArrowRight, Check, MapPin, Quote } from '../components/Icons';
import CommunityVoicesSection from '../components/CommunityVoicesSection';
import PartnerCarousel from '../components/PartnerCarousel';

export default function Home({ onOpenDonate, setCurrentPage }) {
  const { metrics, outreaches, homeContent } = useData();
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);

  const defaultHeroSlides = [
    {
      img: '/images/pad-a-girl-child-outreach-abuja.jpg',
      caption: 'Pad A Girl Child Outreach & Pad Bank Launch · GGSS Dutse Alhaji',
      state: 'FCT Abuja'
    },
    {
      img: '/images/abba-father-orphanage-sep-2026.jpg',
      caption: 'Welfare & Educational Support · Abba Father Rich Orphanage Home',
      state: 'Plateau State'
    },
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
    (homeContent?.heroHeadline && !homeContent.heroHeadline.includes('Empowering children') && !homeContent.heroHeadline.includes('Keeping Nigerian'))
      ? homeContent.heroHeadline
      : 'Helping Nigerian families learn, heal and thrive.';
  const heroSubtitle =
    (homeContent?.heroSubtitle && !homeContent.heroSubtitle.includes('We provide scholarships') && !homeContent.heroSubtitle.includes('We fund scholarships'))
      ? homeContent.heroSubtitle
      : 'Scholarships, learning materials, medical outreaches and livelihood support for vulnerable children, youth, women and widows across Nigeria — with a public field report after every outreach.';

  const defaultPadGirlOutreach = {
    id: 'outreach-sep-2026-pad-bank',
    month: 'September 2026',
    title: 'Pad A Girl Child Outreach & Pad Bank Launch',
    summary:
      'The FCT team carried out the Pad A Girl Child outreach and mounted the “PAD BANK” in the GGSS Dutse Alhaji clinic. We educated students on menstrual hygiene, reached 384 students with pads, and reserved 72 pieces in the pad bank.',
    description:
      'The FCT team successfully carried out the pad a girl child outreach and mounting the “PAD BANK” in the school clinic which will be well managed and controlled by the Health mistress to avoid abuse of the pad bank. We took few minutes to educate the students on their Menstrual hygiene which majority of them are ignorant of, questions were asked by the students which were all answered, it was indeed an interactive section and we all enjoyed the moment. At the end of the outreach, we were able to reach out to students with 384 sanitary pads and 72 pieces were reserved in the pad bank.',
    beneficiariesTarget: '456 sanitary pads',
    image: '/images/pad-a-girl-child-outreach-abuja.jpg',
    location: 'GGSS Dutse Alhaji, Abuja',
    deployments: [
      { state: 'FCT Abuja', location: 'GGSS Dutse Alhaji, Abuja' }
    ]
  };

  const defaultAbbaFatherOutreach = {
    id: 'outreach-sep-2026-orphanage',
    month: 'September 2026',
    title: 'Abba Father Rich Orphanage Home Outreach',
    summary:
      'Outreach visit to Abba Father Rich Orphanage Home in Plateau State to show love, encourage the children, and provide support with essential materials for their welfare and education.',
    description:
      'On the 15th of September, 2026, our team embarked on an outreach visit to Abba Father Rich Orphanage Home located in Plateau State. The purpose of the outreach was to show love, encourage the children, and provide support with essential materials for their welfare and education.',
    beneficiariesTarget: '100+ children & orphans',
    image: '/images/abba-father-orphanage-sep-2026.jpg',
    location: 'Plateau State',
    deployments: [
      { state: 'Plateau State', location: 'Abba Father Rich Orphanage Home, Plateau State' }
    ]
  };

  const defaultNextOutreach = {
    id: 'outreach-nov-2026',
    month: 'November 2026',
    title: 'Medical Aid Outreach',
    description:
      'Medical aid outreach across rural communities in Plateau, Katsina, Lagos, Oyo, and Enugu States, providing essential healthcare services, medical support, and health education to underserved individuals and families with limited access to quality healthcare.'
  };

  const completedOutreaches = (outreaches || []).filter((o) => o.status === 'completed');
  const upcomingOutreaches = (outreaches || []).filter((o) => o.status === 'upcoming');

  const fallbackPastReports = [
    defaultPadGirlOutreach,
    defaultAbbaFatherOutreach,
    {
      id: 'outreach-aug-2026',
      month: 'August 2026',
      title: 'Youth skills, digital literacy & academic outreach',
      summary:
        'A 5-week youth tech lab in Ikorodu, speech-day scholarships in Jos, primary school learning kits, and shoemaking and hairdressing toolkits.',
      beneficiariesTarget: '345 youths & students',
      image: '/images/IMG_0294.webp',
      location: 'Lagos, Plateau, Benue & FCT Abuja',
      deployments: [
        { state: 'Lagos State' },
        { state: 'Plateau State' },
        { state: 'Benue State' },
        { state: 'FCT Abuja' }
      ]
    },
    {
      id: 'outreach-jul-2026',
      month: 'July 2026',
      title: 'Empower 1 Initiative: Sustainable Youth Entrepreneurship',
      summary:
        'Transitioned trained youths from 2025 vocational apprenticeships to full commercial barbershop business ownership in Jos and Makurdi.',
      beneficiariesTarget: '2 youths in business',
      image: '/images/IMG_0300.webp',
      location: 'Plateau & Benue',
      deployments: [{ state: 'Plateau State' }, { state: 'Benue State' }]
    }
  ];

  const extractBeneficiaries = (item) => {
    if (!item) return { count: '345', label: 'youths & students' };
    const raw = item.beneficiariesTarget || item.beneficiaries || '';
    const match = String(raw).match(/^([\d,+-]+)\s*(.*)$/);
    if (match) {
      const count = match[1];
      const label = match[2].replace(/reached/i, '').replace(/target/i, '').trim() || 'youths & students';
      return { count, label };
    }
    return { count: raw || '345', label: 'youths & students' };
  };

  const extractStatesCount = (item) => {
    if (!item) return 4;
    if (Array.isArray(item.deployments) && item.deployments.length > 0) {
      const uniqueStates = new Set(item.deployments.map((d) => d.state).filter(Boolean));
      if (uniqueStates.size > 0) return uniqueStates.size;
    }
    if (item.location) {
      const parts = item.location.split(/[&,]/);
      return Math.max(1, parts.length);
    }
    return 4;
  };

  const featuredLatest =
    homeContent?.featuredLatestOutreachId &&
    homeContent.featuredLatestOutreachId !== 'auto' &&
    (outreaches || []).find((o) => o.id === homeContent.featuredLatestOutreachId);

  const reportPool = completedOutreaches.length > 0 ? completedOutreaches : fallbackPastReports;

  // Top 3 reports with the latest month placed last (closest to the next outreach card)
  // reportPool is ordered newest first: [PadBank (Sep 20), AbbaFather (Sep 15), August, July]
  // Taking top 3 and reversing so chronological flow leads right into Next Outreach:
  // [August 2026, September 2026 (Abba Father), September 2026 (Pad Bank - Latest)] -> [Next Outreach (Nov)]
  const top3 = (featuredLatest
    ? [featuredLatest, ...reportPool.filter((r) => r.id !== featuredLatest.id)]
    : reportPool
  ).slice(0, 3);
  const lastThreeReports = [...top3].reverse();

  const nextOutreach =
    (homeContent?.featuredNextOutreachId &&
      homeContent.featuredNextOutreachId !== 'auto' &&
      (outreaches || []).find((o) => o.id === homeContent.featuredNextOutreachId)) ||
    (upcomingOutreaches.find((o) => o.id === 'outreach-nov-2026') || upcomingOutreaches[0]) ||
    defaultNextOutreach;

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
    if (hash && hash.includes('#')) {
      const anchorId = hash.split('#').pop();
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#fdfbf7] text-[#1c1c1a] overflow-x-hidden">

      {/* 1. Hero Section */}
      <section className="relative pt-5 sm:pt-7 lg:pt-9 pb-8 sm:pb-10 lg:pb-12 max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start gap-3 sm:gap-4">
            {/* Main Headline */}
            <h1 className="font-heading font-bold text-2xl xs:text-3xl sm:text-4xl lg:text-[40px] 2xl:text-[44px] leading-[1.18] tracking-tight text-[#1c1c1a]">
              {heroHeadline}
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-[#4a4a46] leading-relaxed max-w-xl">
              {heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1.5 w-full sm:w-auto">
              <button
                onClick={() => onOpenDonate()}
                className="btn-primary w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Donate now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleNav('outreaches')}
                className="btn-secondary w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-center cursor-pointer"
              >
                See our field reports
              </button>
            </div>
          </div>

          {/* Right Column: Real Outreach Photo Showcase with Slide Controls */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#e5e0d8] shadow-sm bg-white group">
              {/* Photo Display */}
              <div className="relative w-full h-[210px] xs:h-[240px] sm:h-[270px] lg:h-[300px] xl:h-[320px] overflow-hidden bg-sand">
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
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm border border-white/40 text-xs font-semibold text-[#1c1c1a] shadow-sm truncate">
                    {heroSlides[heroSlideIdx]?.caption || 'Ten Kind Hands Field Outreach'}
                  </div>
                  <span className="shrink-0 px-2.5 py-0.5 rounded-full bg-black/60 text-white/90 text-[11px] font-medium border border-white/20 backdrop-blur-sm flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#f7c899]" />
                    {heroSlides[heroSlideIdx]?.state || 'Field Mission'}
                  </span>
                </div>

                {/* Slide Indicator Dots */}
                <div className="flex items-center gap-1.5 pt-0.5">
                  {heroSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setHeroSlideIdx(i)}
                      aria-label={`Go to photo ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === heroSlideIdx ? 'w-5 bg-white shadow-xs' : 'w-2 bg-white/40 hover:bg-white/70'
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
      <section className="bg-forest !text-white py-6 sm:py-7 lg:py-8 border-y border-forest-dark" style={{ color: '#ffffff' }}>
        <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 !text-white" style={{ color: '#ffffff' }}>
            <div>
              <div className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl !text-white tracking-tight" style={{ color: '#ffffff' }}>
                {metrics?.totalBeneficiaries && metrics.totalBeneficiaries > 3500 ? `${metrics.totalBeneficiaries.toLocaleString()}+` : '3,500+'}
              </div>
              <div className="text-xs sm:text-sm !text-white/90 font-normal mt-0.5 leading-snug" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
                children &amp; young people reached
              </div>
            </div>

            <div>
              <div className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl !text-white tracking-tight" style={{ color: '#ffffff' }}>
                200+
              </div>
              <div className="text-xs sm:text-sm !text-white/90 font-normal mt-0.5 leading-snug" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
                Scholarships awarded
              </div>
            </div>

            <div>
              <div className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl !text-white tracking-tight" style={{ color: '#ffffff' }}>
                2,500+
              </div>
              <div className="text-xs sm:text-sm !text-white/90 font-normal mt-0.5 leading-snug" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
                Women &amp; girls supported
              </div>
            </div>

            <div>
              <div className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl !text-white tracking-tight" style={{ color: '#ffffff' }}>
                7 States
              </div>
              <div className="text-xs sm:text-sm !text-white/90 font-normal mt-0.5 leading-snug" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
                (FCT, Benue, Katsina, Plateau, Lagos, Oyo, Enugu)
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-end flex-wrap gap-2">
            <button
              onClick={() => handleNav('transparency')}
              className="text-xs sm:text-sm !text-white underline hover:opacity-80 transition-opacity cursor-pointer"
              style={{ color: '#ffffff' }}
            >
              How we count and spend →
            </button>
          </div>
        </div>
      </section>

      {/* 3. THIS MONTH IN THE FIELD: 4 Cards (3 Reports + 1 Next Outreach, with latest month closest to next outreach) */}
      <section className="py-10 sm:py-14 lg:py-16 max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 sm:mb-8">
          <div>
            <div className="text-xs uppercase font-bold tracking-widest text-maroon mb-1">
              THIS MONTH IN THE FIELD
            </div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-[#1c1c1a]">
              Every outreach gets a public report
            </h2>
          </div>
          <button
            onClick={() => handleNav('outreaches')}
            className="text-xs sm:text-sm font-semibold text-maroon hover:text-maroon-dark transition-colors inline-flex items-center gap-1.5"
          >
            <span>All field reports</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">

          {/* Last 3 Field Reports — Ordered so the most current month is Card 3 (adjacent to Next Outreach) */}
          {lastThreeReports.map((report, idx) => {
            const ben = extractBeneficiaries(report);
            const states = extractStatesCount(report);
            const isLatest = idx === lastThreeReports.length - 1;

            return (
              <div
                key={report.id || idx}
                className={`bg-white rounded-2xl sm:rounded-3xl border overflow-hidden shadow-sm hover:border-[#cfc7b9] hover:shadow-md transition-all flex flex-col justify-between ${isLatest ? 'border-[#cfc7b9] ring-1 ring-forest/20' : 'border-[#e5e0d8]'
                  }`}
              >
                <div className="relative h-44 sm:h-48 overflow-hidden bg-gray-100 shrink-0">
                  <img
                    src={report.image || '/images/hero-orphanage-food-educational-support.webp'}
                    alt={report.title}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/hero-digital-literacy-computer-lab.webp';
                    }}
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-semibold text-[11px] shadow-xs ${isLatest
                          ? 'bg-forest-tint text-forest border border-forest/20'
                          : 'bg-white/95 text-[#1c1c1a]'
                        }`}
                    >
                      {isLatest ? 'Latest report' : 'Report published'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[#1c1c1a] font-medium text-[11px] shadow-xs">
                      {report.month || 'Field Report'}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-heading font-bold text-base text-[#1c1c1a] mb-2 line-clamp-2 leading-snug">
                      {report.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4a4a46] leading-relaxed line-clamp-3 mb-4">
                      {report.summary || report.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#e5e0d8] flex items-center justify-between flex-wrap gap-2.5 mt-auto">
                    <div className="flex items-center gap-3 text-xs text-[#4a4a46]">
                      <div>
                        <span className="font-heading font-bold text-[#1c1c1a] text-sm block leading-none">
                          {ben.count}
                        </span>
                        <span className="text-[10px] text-[#706e68] capitalize">
                          {ben.label}
                        </span>
                      </div>
                      <div className="h-5 w-px bg-[#e5e0d8]" />
                      <div>
                        <span className="font-heading font-bold text-[#1c1c1a] text-sm block leading-none">
                          {states}
                        </span>
                        <span className="text-[10px] text-[#706e68]">
                          {states === 1 ? 'state' : 'states'}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleNav('outreaches', `outreaches/${report.id}`)}
                      className="font-semibold text-xs text-maroon hover:text-maroon-dark transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read report</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Next Outreach Card (Card 4: Next Outreach - Card only, no image) */}
          <div className="bg-[#faf6f0] rounded-2xl sm:rounded-3xl border-2 border-maroon/20 overflow-hidden shadow-sm hover:shadow-md hover:border-maroon/40 transition-all flex flex-col justify-between p-5 sm:p-6">
            <div>
              <div className="flex items-center gap-2 mb-3.5">
                <span className="px-2.5 py-1 rounded-full bg-maroon text-white font-semibold text-[11px] uppercase tracking-wider shadow-xs">
                  Next outreach
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white text-[#1c1c1a] border border-[#e5e0d8] font-medium text-[11px] shadow-xs">
                  {nextOutreach.month || 'Upcoming'}
                </span>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-widest text-maroon block mb-1">
                UPCOMING OUTREACH
              </span>
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#1c1c1a] mb-2 leading-snug">
                {nextOutreach.title?.includes(nextOutreach.month || '')
                  ? nextOutreach.title
                  : `${nextOutreach.month || 'Upcoming'} Outreach — ${nextOutreach.title}`}
              </h3>
              <p className="text-xs sm:text-sm text-[#4a4a46] leading-relaxed mb-4">
                {nextOutreach.description}
              </p>
            </div>

            <div className="pt-4 border-t border-maroon/15 flex flex-col gap-2.5 mt-auto">
              <button
                onClick={() => handleNav('get-involved', 'get-involved/volunteer')}
                className="w-full py-2.5 px-4 rounded-full bg-maroon hover:bg-maroon-dark text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer text-center shadow-xs"
              >
                Volunteer on this outreach
              </button>
              <button
                onClick={() => onOpenDonate()}
                className="w-full py-2 px-4 rounded-full border border-maroon text-maroon hover:bg-maroon hover:text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer text-center"
              >
                Fund this outreach
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. OUR WORK: Children who learn. Mothers who stay healthy. Families who earn. */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#f5f1e8] border-y border-[#e5e0d8]">
        <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16">
          <div className="mb-8 sm:mb-10">
            <div className="text-xs uppercase font-bold tracking-widest text-maroon mb-1">
              OUR WORK
            </div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-[#1c1c1a]">
              Children who learn. Mothers who stay healthy. Families who earn.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {/* Education Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e0d8] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="h-44 sm:h-48 lg:h-52 overflow-hidden bg-gray-100">
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
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-maroon block mb-1">
                    Education
                  </span>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-[#1c1c1a] mb-1.5">
                    Scholarships, school supplies &amp; computer labs
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4a4a46] leading-relaxed mb-4">
                    School fees, uniforms, stationery kits, and digital literacy labs to ensure children stay in school.
                  </p>
                </div>
                <button
                  onClick={() => handleNav('programs', 'our-work#education')}
                  className="text-xs sm:text-sm font-semibold text-maroon hover:text-maroon-dark inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore programmes →</span>
                </button>
              </div>
            </div>

            {/* Health Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e0d8] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="h-44 sm:h-48 lg:h-52 overflow-hidden bg-gray-100">
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
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-forest block mb-1">
                    Health
                  </span>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-[#1c1c1a] mb-1.5">
                    Medical outreaches &amp; malaria prevention
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4a4a46] leading-relaxed mb-4">
                    Treated mosquito nets, rapid tests, maternal health packs, and health education in rural areas.
                  </p>
                </div>
                <button
                  onClick={() => handleNav('programs', 'our-work#health')}
                  className="text-xs sm:text-sm font-semibold text-forest hover:text-forest-dark inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore programmes →</span>
                </button>
              </div>
            </div>

            {/* Livelihoods Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e0d8] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="h-44 sm:h-48 lg:h-52 overflow-hidden bg-gray-100">
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
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-ochre block mb-1">
                    Livelihoods
                  </span>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-[#1c1c1a] mb-1.5">
                    Support for widows, women &amp; young people
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4a4a46] leading-relaxed mb-4">
                    Eco-efficient cooking pots, micro-grants for widows, and vocational trade toolkits for youth.
                  </p>
                </div>
                <button
                  onClick={() => handleNav('programs', 'our-work#livelihoods')}
                  className="text-xs sm:text-sm font-semibold text-ochre hover:text-[#915610] inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore programmes →</span>
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
        {/* 5. Section: Community Voices - In their words (Testimonials with Real Field Photos) */}
        <CommunityVoicesSection onOpenDonate={onOpenDonate} setCurrentPage={setCurrentPage} />


        {/* 6. Maroon Banner: Give monthly. Plan outreaches with us. */}
        <section className="relative z-10 bg-maroon text-white py-11 sm:py-14 lg:py-16 mt-8 sm:mt-12 lg:mt-14">
          <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 sm:gap-6">
            <div className="max-w-xl 3xl:max-w-3xl 4xl:max-w-4xl">
              <h2 className="font-heading font-bold text-xl sm:text-2xl 3xl:text-3xl text-white">
                Give monthly. Plan outreaches with us.
              </h2>
            </div>

            <button
              onClick={() => onOpenDonate()}
              className="w-full md:w-auto px-6 sm:px-8 py-3.5 rounded-full bg-white text-maroon font-heading font-bold text-sm sm:text-base hover:bg-[#f5f1e8] transition-colors shadow-md cursor-pointer shrink-0 text-center"
            >
              Start a monthly gift
            </button>
          </div>
        </section>

      </div>

      {/* 7. Partner Carousel */}
      <PartnerCarousel onOpenDonate={onOpenDonate} setCurrentPage={setCurrentPage} />

    </div>
  );
}

