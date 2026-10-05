import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Heart, ArrowRight, Quote, MapPin } from '../components/Icons';
import CurvedWaveBackground from '../components/CurvedWaveBackground';

export default function Home({ onOpenDonate, setCurrentPage }) {
  const { metrics, homeContent } = useData();
  const [calcAmount, setCalcAmount] = useState(15000);
  const [heroImageIdx, setHeroImageIdx] = useState(0);

  const heroSlides = homeContent?.heroSlides?.length > 0 ? homeContent.heroSlides : [
    {
      img: "/images/hero-debate-competition-makurdi.webp",
      caption: "Inter-Secondary School Debate Competition (₦50,000 • ₦30,000 • ₦20,000 Awards) • Makurdi"
    },
    {
      img: "/images/hero-digital-literacy-computer-lab.webp",
      caption: "Youth Digital Literacy & Computer Lab Setup • Plateau State"
    },
    {
      img: "/images/hero-orphanage-food-educational-support.webp",
      caption: "Food Relief & Educational Supplies Donation • Oyiza Orphanage"
    },
    {
      img: "/images/hero-widows-clean-cooking-stoves.webp",
      caption: "Widows Clean Energy & Eco-Cooking Stove Distribution • Dafara"
    },
    {
      img: "/images/hero-jambells-school-outreach.webp",
      caption: "Educational Materials & School Supplies Distribution • JAMBELLS School, Lagos"
    },
    {
      img: "/images/hero-maternal-health-malaria-prevention.webp",
      caption: "Maternal Healthcare & Malaria Prevention Outreach • Lagos"
    },
    {
      img: "/images/hero-youth-vocational-shoemaking.webp",
      caption: "Youth Vocational Skills & Shoemaking Apprenticeship • Abuja"
    },
    {
      img: "/images/hero-visually-impaired-education.webp",
      caption: "Special Education & Inclusive Learning for Visually Impaired Students"
    },
    {
      img: "/images/hero-digital-skills-youth-training.webp",
      caption: "Youth Digital Skills & Computer Training Lab • Lagos"
    },
    {
      img: "/images/hero-community-empowerment.webp",
      caption: "Sustainable Community Livelihood & Family Empowerment Outreach"
    },
    {
      img: "/images/IMG_0294.webp",
      caption: "Child empowerment Program • Makurdi"
    },
    {
      img: "/images/11222.webp",
      caption: "Medical outreach to children at Abuja Teaching Hospital"
    },
    {
      img: "/images/IMG_0995.webp",
      caption: "Women Empowerment Outreach • Dafara"
    }
  ];

  const heroHeadline = homeContent?.heroHeadline || 'Empowering the lives of African Women and Children through Healthcare & Educational initiatives.';
  const heroSubtitle = homeContent?.heroSubtitle || 'Every act of kindness shapes a brighter future.';
  const rawBadge = homeContent?.registeredBadge || 'Registered Non-Profit • CAC RC: 7015705';
  const registeredBadge = rawBadge.replace(/ • CAC\/IT\/NO: 148920/g, '').replace(/CAC\/IT\/NO: 148920\.?/g, '').trim();
  const fieldReality = homeContent?.fieldReality || {
    stat: 'Over 10M',
    label: 'Children currently out of primary school in Nigeria (UNESCO)',
    paragraph1: 'When poverty forces families to choose between putting food on the table and paying school expenses, a child’s education is often the first sacrifice. Without books, learning materials, scholarships, and the support needed to stay in school, many children risk falling behind or abandoning their education altogether. At the same time, vulnerable communities continue to face preventable health challenges, while women and widows struggle to access the skills and opportunities needed to achieve financial independence.',
    paragraph2: 'Ten Kind Hands Foundation bridges these gaps by investing in children’s education through scholarships, educational materials, school donations, learning support, and youth development initiatives, while also extending healthcare interventions and women’s empowerment programmes to vulnerable communities. By meeting immediate needs and creating pathways to opportunity, we help children learn, women thrive, and communities build a stronger and more hopeful future.'
  };

  // Auto-cycle background images smoothly every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIdx((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const calculateImpacts = (amt) => {
    const learningKits = Math.max(1, Math.floor(amt / 5000));
    const clinicVisits = Math.max(1, Math.floor(amt / 1250));
    const booksSupplied = Math.max(2, Math.floor(amt / 1000));
    const safeWaterDays = Math.max(10, Math.floor(amt / 250));
    return { learningKits, clinicVisits, booksSupplied, safeWaterDays };
  };

  const currentImpact = calculateImpacts(calcAmount);

  const testimonials = [
    {
      quote: "I sincerely appreciate Ten Kind Hands Foundation for their incredible support. After promising us computer systems during our Speech and Prize-Giving Ceremony in July, they returned and surprised us by setting up a well-equipped computer laboratory with nine computers, cubicles, seating, and an air conditioner. This means so much to us because our children can now gain the digital skills they need to compete in today’s world. Thank you, Ten Kind Hands Foundation. God bless you!",
      author: "Mrs. Becky Omagbogu",
      role: "Proprietor",
      institution: "Beckwin International School",
      location: "Plateau State"
    },
    {
      quote: "We are so grateful to Ten Kind Hands Foundation for remembering and supporting our children with the donation of free notebooks. Some of our pupils did not have writing materials and were struggling to manage with what they had. But today, things are better, and these children now have something to begin with as they prepare for the new school year. We are truly grateful. May God richly bless Ten Kind Hands Foundation. May they never lack, and may this act of kindness reach many more places. Thank you, Ten Kind Hands Foundation. We love you and appreciate you!",
      author: "",
      role: "Proprietor, Karvron Montessori School",
      institution: "Abuja",
      location: "Federal Capital Territory"
    },
    {
      quote: "Thank you, Ten Kind Hands Foundation. We truly appreciate and love you for coming to our community to educate us about malaria, how to prevent it, and how to take better care of ourselves. The mosquito nets, insecticides, supplements, and other medical supplies donated in large quantities have provided meaningful support to our community in the fight against malaria. May God bless you richly for all you are doing.",
      author: "",
      role: "Community Beneficiaries & Nursing Mothers",
      institution: "Abata Community",
      location: "Lagos State"
    }
  ];

  return (
    <div className="animate-fade-in bg-white">
      {/* =========================================================
          HERO: GENEROUSLY SPACED DOCUMENTARY CANVAS
      ========================================================= */}
      <section className="relative w-full h-[100svh] min-h-[580px] max-h-[860px] flex items-center justify-center overflow-hidden px-4 md:px-8 pt-24 sm:pt-28 pb-8 bg-black">
        {/* Cross-fading Background Slides */}
        {heroSlides.map((slide, index) => {
          const isActive = index === heroImageIdx;
          const optimizedSrc = slide.img ? slide.img.replace(/\.(jpe?g|png)$/i, '.webp') : slide.img;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-[1800ms] ease-in-out ${isActive ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'
                }`}
            >
              <img
                src={optimizedSrc}
                alt={slide.caption}
                fetchPriority={index === 0 ? "high" : "auto"}
                className={`w-full h-full object-cover object-center transition-transform duration-[7000ms] ease-out ${isActive ? 'scale-105' : 'scale-100'
                  }`}
              />
            </div>
          );
        })}

        {/* Dual-Tone Dark Contrast Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/45 z-1 pointer-events-none"></div>

        {/* Text Layer (Poppins + Open Sans) with Generous Top Breathing Room */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6 my-auto">
          {/* High-Visibility Verified NGO Badge */}
          {registeredBadge && (
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold tracking-wide border border-white/35 shadow-lg max-w-full text-center">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              <span className="leading-snug">{registeredBadge}</span>
            </div>
          )}

          {/* Clean & Proportional Poppins Headline (compact ~2 lines) */}
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold sm:font-extrabold text-white max-w-4xl tracking-tight leading-snug sm:leading-tight">
            {heroHeadline}
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-base md:text-lg text-white/90 max-w-2xl leading-relaxed font-normal px-2">
            {heroSubtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto pt-2">
            <button
              onClick={onOpenDonate}
              className="btn-primary w-full sm:w-auto text-xs sm:text-sm px-7 py-3 sm:px-8 sm:py-3.5 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 font-heading font-semibold"
            >
              <span>Donate to Direct Impact</span>
              <Heart className="w-4 h-4" />
            </button>

            <a
              href="#our-story"
              onClick={() => {
                window.location.hash = 'our-story';
                setCurrentPage('our-story');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-secondary w-full sm:w-auto text-xs sm:text-sm px-7 py-3 sm:px-8 sm:py-3.5 flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 font-heading font-semibold no-underline"
            >
              <span>Read Our Story</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Dynamic Image Caption & Carousel Dots */}
          <div className="flex flex-col items-center gap-2 pt-4">
            <div className="flex items-center gap-1.5 text-white/80 text-[11px] font-medium transition-all duration-700">
              <MapPin className="w-3.5 h-3.5 text-[#f7c899]" />
              <span>{heroSlides[heroImageIdx]?.caption || ''}</span>
            </div>

            {/* Slide Indicator Dots */}
            <div className="flex items-center gap-2 mt-1">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroImageIdx(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${i === heroImageIdx ? 'w-6 bg-white shadow-xs' : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          UPPER FLOW: THE CHALLENGE & MEASURED IMPACT
          (Right-Side Ambient Wave)
      ========================================================= */}
      <div className="relative overflow-hidden">
        {/* Right-side subtle blended wave */}
        <CurvedWaveBackground side="right" />

        {/* SECTION 1: THE REALITY IN THE FIELD */}
        <section className="relative z-10 py-24 px-4 md:px-8 max-w-5xl mx-auto border-b border-[#e7e2d8]">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4">
              <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
                The Reality in the Field
              </span>
              <span className="text-4xl sm:text-5xl font-heading font-bold text-ink block leading-none">
                {fieldReality.stat}
              </span>
              <span className="text-xs text-ink-muted mt-1.5 block">
                {fieldReality.label}
              </span>
            </div>

            <div className="md:col-span-8 space-y-3">
              <p className="text-base sm:text-lg text-ink-light leading-relaxed">
                {fieldReality.paragraph1}
              </p>
              <p className="text-base sm:text-lg text-ink font-semibold leading-relaxed">
                {fieldReality.paragraph2}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: MEASURED FIELD IMPACT */}
        <section className="relative z-10 py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-[#e7e2d8]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
                Our Impact
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink">
                Verified outcomes, community by community.
              </h2>
            </div>
            <a
              href="#impact"
              onClick={() => {
                window.location.hash = 'impact';
                setCurrentPage('impact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer font-heading"
            >
              <span>Explore impact dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {(() => {
            const defaultHomeMetrics = [
              {
                id: 'students',
                category: 'Transparency',
                stat: '5,500+',
                label: 'Beneficiaries Reached',
                description: 'Beneficiaries Reached',
                growth: '+32% YoY',
                detail: 'People reached through education, healthcare, empowerment, and community outreach initiatives...',
                color: 'text-primary'
              },
              {
                id: 'schools',
                category: 'Education',
                stat: '150+',
                label: 'Scholarships Awarded',
                description: 'Scholarships Awarded',
                growth: '+40 New in 2026',
                detail: 'Children and young people supported with access to education through scholarships and financial assistance.',
                color: 'text-ink'
              },
              {
                id: 'patients',
                category: 'Transparency',
                stat: '2,100+',
                label: 'Women & Girls Reached',
                description: 'Women & Girls Reached',
                growth: '+45% YoY',
                detail: 'Women and girls supported through education, healthcare, empowerment, and community outreach initiatives.',
                color: 'text-forest'
              },
              {
                id: 'giving-model',
                category: 'Transparency',
                stat: '100%',
                label: 'Direct Giving Model',
                description: 'Direct Giving Model',
                growth: '100% Direct',
                detail: 'Zero cuts from public gifts; admin is funded privately by trustee endowment.',
                color: 'text-emerald-800'
              },
              {
                id: 'clinics',
                category: 'Transparency',
                stat: '130+',
                label: 'Communities Served',
                description: 'Communities Served',
                growth: '100% Operational',
                detail: 'Communities reached through education, healthcare, empowerment, and community outreach initiatives.',
                color: 'text-forest'
              },
              {
                id: 'metric-1790695260926',
                category: 'Transparency',
                stat: '3,312+',
                label: 'Children & Youths Reached',
                description: 'Children & Youths Reached',
                growth: '+1,300',
                detail: 'Children and young people supported through education, skills development, healthcare, and empowerment initiative...',
                color: 'text-primary'
              }
            ];

            const displayMetrics = defaultHomeMetrics.map((def) => {
              const live = metrics?.find((m) => m.id === def.id);
              if (!live) return def;
              if (
                live.stat === '12,500+' ||
                live.stat === '12,500' ||
                live.stat === '8,200+' ||
                live.stat === '8,200' ||
                live.stat === '45' ||
                live.stat === '12' ||
                live.stat === '28' ||
                live.description === 'Students Supplied' ||
                live.description === 'Solar Classrooms' ||
                live.description === 'Patients Treated' ||
                live.description === 'Community Health Posts' ||
                live.description === 'Solar Deep Boreholes' ||
                live.label === 'Students Supplied' ||
                live.label === 'Solar Classrooms' ||
                live.label === 'Patients Treated' ||
                live.label === 'Frontline Healthcare' ||
                live.label === 'Clean Water'
              ) {
                return def;
              }
              return { ...def, ...live };
            });

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {displayMetrics.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-xs border border-[#e7e2d8] shadow-xs flex flex-col justify-between hover:border-primary/40 transition-colors"
                  >
                    <div>
                      <div className="mb-3">
                        <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-ink-muted font-bold font-heading px-2.5 py-0.5 rounded-md bg-sand border border-[#e7e2d8]">
                          {item.category || 'Transparency'}
                        </span>
                      </div>

                      <span className={`font-mono text-3xl sm:text-4xl font-bold ${item.color || 'text-ink'} block mb-1`}>
                        {item.stat}
                      </span>
                      <h3 className="text-sm font-heading font-bold text-ink mb-1.5">
                        {item.label || item.description}
                      </h3>
                      {item.growth && (
                        <div className="mb-3">
                          <span className="inline-block px-2 py-0.5 rounded bg-forest/10 text-forest text-[11px] font-bold border border-forest/20 font-heading">
                            {item.growth}
                          </span>
                        </div>
                      )}
                      <p className="text-xs text-ink-muted leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </section>
      </div>

      {/* =========================================================
          SECTION 3: WHAT WE DO: SIDE-BY-SIDE CORE PILLARS
      ========================================================= */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-[#e7e2d8]">
        <div className="max-w-2xl mb-14">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
            Two Interconnected Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink">
            Education builds futures. Healthcare protects potential.
          </h2>
          <p className="text-sm text-ink-light mt-2 leading-relaxed">
            We invest in scholarships, books, and learning opportunities, while advancing healthcare and women’s empowerment to strengthen families and communities across Nigeria.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Education Pillar Card */}
          <div className="paper-card rounded-3xl overflow-hidden flex flex-col justify-between">
            <div className="h-64 sm:h-72 overflow-hidden relative">
              <img
                src="/images/IMG_0296.webp"
                alt="Pupils receiving school supplies in Nigeria"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-heading font-bold text-primary shadow-xs">
                Pillar 01 • Education
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-heading font-bold text-ink mb-3">
                Scholarships, School Materials &amp; Empowerment
              </h3>
              <p className="text-sm text-ink-light leading-relaxed mb-6">
                Providing scholarships, books, school materials, learning support, and practical skills opportunities to help vulnerable children and young people learn, grow, and thrive.
              </p>

              <a
                href="#programs/scholarship"
                onClick={() => {
                  window.location.hash = 'programs/scholarship';
                  setCurrentPage('programs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-heading font-bold text-primary hover:text-primary-dark flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Education Initiatives</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Healthcare Pillar Card */}
          <div className="paper-card rounded-3xl overflow-hidden flex flex-col justify-between">
            <div className="h-64 sm:h-72 overflow-hidden relative">
              <img
                src="/images/pillar2-health-outreach.webp"
                alt="Medical and health outreach at Orthopaedic & Trauma Dept in Nigeria"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-heading font-bold text-forest shadow-xs">
                Pillar 02 • Health
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-heading font-bold text-ink mb-3">
                Medical Outreaches, Malaria Prevention &amp; Maternal Care
              </h3>
              <p className="text-sm text-ink-light leading-relaxed mb-6">
                Bringing essential healthcare, malaria prevention, health education, screenings, and treatment support closer to vulnerable women, children, and underserved communities across Nigeria.
              </p>

              <a
                href="#programs/medical-outreaches"
                onClick={() => {
                  window.location.hash = 'programs/medical-outreaches';
                  setCurrentPage('programs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-heading font-bold text-forest hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Healthcare Initiatives</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          LOWER FLOW: COMMUNITY VOICES & GIVING SIMULATOR
          (Mirrored Left-Side Ambient Wave)
      ========================================================= */}
      <div className="relative overflow-hidden">
        {/* Left-side subtle mirrored wave */}
        <CurvedWaveBackground side="left" />

        {/* SECTION 4: COMMUNITY LETTERS */}
        <section className="relative z-10 py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-[#e7e2d8]">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
              Community Letters
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink">
              Words from the people who live the mission.
            </h2>
          </div>



          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-sand/90 backdrop-blur-xs border border-[#e7e2d8] flex flex-col justify-between">
                <div>
                  <Quote className="w-6 h-6 text-primary/30 mb-4" />
                  <p className="text-sm text-ink-light italic leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#e0d9cc]">
                  {t.author && t.author.trim() !== '.' && (
                    <h4 className="text-sm font-heading font-bold text-ink">{t.author}</h4>
                  )}
                  <p className="text-xs text-ink-muted">
                    {[t.role, t.institution].filter(Boolean).join(' • ')}
                  </p>
                  {t.location && (
                    <span className="text-xs text-primary font-medium block mt-0.5">{t.location}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: DIRECT GIVING SIMULATOR */}
        <section className="relative z-10 py-14 sm:py-24 px-4 md:px-8 max-w-4xl mx-auto">
          <div className="paper-card rounded-3xl p-5 sm:p-8 md:p-12 bg-white/95 backdrop-blur-xs">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
                Direct Impact Simulator
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-ink">
                See what your contribution creates.
              </h2>
              <p className="text-xs text-ink-muted mt-1">
                Adjust the slider to calculate the frontline deliverables funded by your gift.
              </p>
            </div>

            <div className="bg-sand p-4 sm:p-6 rounded-2xl border border-[#e7e2d8] mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-ink uppercase tracking-wide font-heading">Donation Amount:</span>
                <span className="font-mono text-xl sm:text-3xl font-bold text-primary">
                  ₦{calcAmount.toLocaleString()}
                </span>
              </div>

              <input
                type="range"
                min="5000"
                max="100000"
                step="5000"
                value={calcAmount}
                onChange={(e) => setCalcAmount(Number(e.target.value))}
                className="w-full h-2 bg-[#ded8cc] rounded-lg appearance-none cursor-pointer accent-primary"
              />

              <div className="flex justify-between text-[10px] sm:text-[11px] text-ink-muted font-medium mt-2">
                <span>₦5,000</span>
                <span className="hidden sm:inline">₦25,000</span>
                <span>₦50,000</span>
                <span className="hidden sm:inline">₦75,000</span>
                <span>₦100,000</span>
              </div>
            </div>

            {/* Generated Deliverables */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-sand border border-[#e7e2d8] text-center">
                <span className="font-mono text-xl sm:text-2xl font-bold text-primary block mb-0.5">
                  {currentImpact.learningKits}
                </span>
                <span className="text-[11px] sm:text-xs text-ink-muted">Pupil Learning Kits</span>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-sand border border-[#e7e2d8] text-center">
                <span className="font-mono text-xl sm:text-2xl font-bold text-forest block mb-0.5">
                  {currentImpact.clinicVisits}
                </span>
                <span className="text-[11px] sm:text-xs text-ink-muted">Clinic Consults</span>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-sand border border-[#e7e2d8] text-center">
                <span className="font-mono text-xl sm:text-2xl font-bold text-clay block mb-0.5">
                  {currentImpact.booksSupplied}
                </span>
                <span className="text-[11px] sm:text-xs text-ink-muted">Textbook Sets</span>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-sand border border-[#e7e2d8] text-center">
                <span className="font-mono text-xl sm:text-2xl font-bold text-emerald-800 block mb-0.5">
                  {currentImpact.safeWaterDays}
                </span>
                <span className="text-[11px] sm:text-xs text-ink-muted">Days Clean Water</span>
              </div>
            </div>

            <p className="text-[11px] text-ink-muted text-center mb-6">
              ₦5,000 supplies 1 pupil back-to-school learning kit (exercise books, writing materials &amp; supplies) • ₦50,000 sponsors a child's full-term school fees scholarship.
            </p>

            <div className="text-center">
              <button
                onClick={() => onOpenDonate(calcAmount)}
                className="btn-primary w-full sm:w-auto text-xs sm:text-sm px-6 sm:px-8 py-3.5 inline-flex items-center justify-center gap-2 cursor-pointer shadow-md font-heading font-semibold"
              >
                <span>Donate ₦{calcAmount.toLocaleString()} to Direct Impact</span>
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
