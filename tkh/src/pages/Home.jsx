import React, { useState, useEffect } from 'react';
import { School, Stethoscope, Droplets, BookOpen, Heart, HandHeart, ArrowRight, TrendingUp, Sun, Quote, Users, ShieldCheck, MapPin, CheckCircle2, Award } from '../components/Icons';
import CurvedWaveBackground from '../components/CurvedWaveBackground';

export default function Home({ onOpenDonate, setCurrentPage }) {
  const [calcAmount, setCalcAmount] = useState(15000);
  const [heroImageIdx, setHeroImageIdx] = useState(0);

  const heroSlides = [
    {
      img: "/images/IMG_0294.JPG",
      caption: "Primary School Uniform & Book Distribution Drive • Rivers State"
    },
    {
      img: "/images/IMG_0303.JPG",
      caption: "Gidan Community Primary School • Solar Classroom & Desks"
    },
    {
      img: "/images/IMG_0995.JPG",
      caption: "Women & Community Empowerment • Clean Energy & Household Support"
    }
  ];

  // Auto-cycle background images smoothly every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIdx((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const calculateImpacts = (amt) => {
    const students = Math.max(1, Math.floor(amt / 5000));
    const clinicVisits = Math.max(1, Math.floor(amt / 1250));
    const booksSupplied = Math.max(2, Math.floor(amt / 1000));
    const safeWaterDays = Math.max(10, Math.floor(amt / 250));
    return { students, clinicVisits, booksSupplied, safeWaterDays };
  };

  const currentImpact = calculateImpacts(calcAmount);

  const testimonials = [
    {
      quote: "Before Ten Kind Hands brought solar power and desks, our pupils learned on bare floors and had to go home whenever rain clouds gathered. Today, attendance has soared to over 98%.",
      author: "Mrs. Amina Danjuma",
      role: "Headmistress",
      institution: "Gidan Community Primary School",
      location: "Kaduna State"
    },
    {
      quote: "The mobile health clinic detected my child's severe pneumonia in time and provided all treatments free of charge. Having caring medical staff reach our remote hamlet is a blessing.",
      author: "Grace Adebayo",
      role: "Mother of 3 & Community Health Advocate",
      institution: "Rural Women's Forum",
      location: "Ogun State"
    },
    {
      quote: "Ten Kind Hands does not dictate to us; they sit with village elders and ask what our youth need most. This is genuine dignity and true partnership.",
      author: "Chief Emeka Okafor",
      role: "Community Elder & Development Secretary",
      institution: "Oji River Council",
      location: "Enugu State"
    }
  ];

  return (
    <div className="animate-fade-in bg-white">
      {/* =========================================================
          HERO: GENEROUSLY SPACED DOCUMENTARY CANVAS
      ========================================================= */}
      <section className="relative w-full min-h-[90vh] md:min-h-[94vh] flex items-center justify-center overflow-hidden px-4 md:px-8 pt-36 sm:pt-40 md:pt-48 pb-24 bg-black">
        {/* Cross-fading Background Slides */}
        {heroSlides.map((slide, index) => {
          const isActive = index === heroImageIdx;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-[1800ms] ease-in-out ${
                isActive ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.img}
                alt={slide.caption}
                className={`w-full h-full object-cover object-center transition-transform duration-[7000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-semibold tracking-wide border border-white/35 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span className="leading-none">Registered Non-Profit NGO in Nigeria • CAC/IT/NO: 148920</span>
          </div>

          {/* Clean & Proportional Poppins Headline */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[46px] font-heading font-extrabold text-white max-w-3xl tracking-tight leading-[1.2]">
            Restoring dignity through equal access to{' '}
            <span className="text-[#f7c899]">education &amp; healthcare.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl leading-relaxed font-normal">
            We construct solar-powered rural classrooms, train local educators, and deploy mobile medical clinics directly into underserved communities across Nigeria.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={onOpenDonate}
              className="btn-primary text-xs sm:text-sm px-7 py-3 sm:px-8 sm:py-3.5 flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 font-heading font-semibold"
            >
              <span>Donate to Direct Impact</span>
              <Heart className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setCurrentPage('our-story');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-secondary text-xs sm:text-sm px-7 py-3 sm:px-8 sm:py-3.5 flex items-center gap-2 cursor-pointer shadow-md active:scale-95 font-heading font-semibold"
            >
              <span>Read Our Story</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dynamic Image Caption & Carousel Dots */}
          <div className="flex flex-col items-center gap-2 pt-4">
            <div className="flex items-center gap-1.5 text-white/80 text-[11px] font-medium transition-all duration-700">
              <MapPin className="w-3.5 h-3.5 text-[#f7c899]" />
              <span>{heroSlides[heroImageIdx].caption}</span>
            </div>

            {/* Slide Indicator Dots */}
            <div className="flex items-center gap-2 mt-1">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroImageIdx(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    i === heroImageIdx ? 'w-6 bg-white shadow-xs' : 'w-2 bg-white/40 hover:bg-white/70'
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
                Over 10M
              </span>
              <span className="text-xs text-ink-muted mt-1.5 block">
                Children currently out of primary school in Nigeria (UNESCO)
              </span>
            </div>

            <div className="md:col-span-8 space-y-3">
              <p className="text-base sm:text-lg text-ink-light leading-relaxed">
                When poverty forces a family to choose between meal security and school levies, education is the first thing sacrificed. When malaria strikes, remote villages are hours from the nearest dispensary.
              </p>
              <p className="text-base sm:text-lg text-ink font-semibold leading-relaxed">
                Ten Kind Hands bridges this divide by delivering permanent solar learning hubs and mobile medical clinics with 100% community ownership.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: MEASURED FIELD IMPACT */}
        <section className="relative z-10 py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-[#e7e2d8]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
                Field Accounting • August 2026
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink">
                Verified outcomes, community by community.
              </h2>
            </div>
            <button
              onClick={() => {
                setCurrentPage('impact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer font-heading"
            >
              <span>Explore all audited metrics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-xs border border-[#e7e2d8] shadow-xs">
              <span className="font-mono text-3xl sm:text-4xl font-bold text-primary block mb-1">
                12,500+
              </span>
              <h3 className="text-xs uppercase font-heading font-bold text-ink mb-1">Students Supplied</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Full uniforms, textbooks, and tuition scholarships across 24 partner schools.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-xs border border-[#e7e2d8] shadow-xs">
              <span className="font-mono text-3xl sm:text-4xl font-bold text-ink block mb-1">
                45
              </span>
              <h3 className="text-xs uppercase font-heading font-bold text-ink mb-1">Solar Classrooms</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Weather-proof, solar-lit learning blocks built in Kaduna, Niger &amp; Ogun.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-xs border border-[#e7e2d8] shadow-xs">
              <span className="font-mono text-3xl sm:text-4xl font-bold text-forest block mb-1">
                8,200+
              </span>
              <h3 className="text-xs uppercase font-heading font-bold text-ink mb-1">Patients Treated</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Free mobile clinical triage, malaria testing, and prescription drugs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-xs border border-[#e7e2d8] shadow-xs">
              <span className="font-mono text-3xl sm:text-4xl font-bold text-emerald-800 block mb-1">
                100%
              </span>
              <h3 className="text-xs uppercase font-heading font-bold text-ink mb-1">Direct Giving Model</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Zero cuts from public gifts; admin is funded privately by trustee endowment.
              </p>
            </div>
          </div>
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
            Education fosters agency. Healthcare protects life.
          </h2>
          <p className="text-sm text-ink-light mt-2 leading-relaxed">
            We do not treat symptoms in isolation. A sick child cannot learn, and an uneducated youth cannot build economic resilience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Education Pillar Card */}
          <div className="paper-card rounded-3xl overflow-hidden flex flex-col justify-between">
            <div className="h-64 overflow-hidden relative">
              <img
                src="/images/IMG_0296.JPG"
                alt="Pupils receiving school supplies in Nigeria"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-heading font-bold text-primary shadow-xs">
                Pillar 01 • Education
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-heading font-bold text-ink mb-3">
                Solar Classrooms, Scholarships &amp; Teacher Support
              </h3>
              <p className="text-sm text-ink-light leading-relaxed mb-6">
                Constructing insulated classroom blocks, providing full tuition and uniform coverage for orphans, and supplying reading libraries to rural primary schools.
              </p>

              <button
                onClick={() => {
                  setCurrentPage('programs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-heading font-bold text-primary hover:text-primary-dark flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Education Initiatives</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Healthcare Pillar Card */}
          <div className="paper-card rounded-3xl overflow-hidden flex flex-col justify-between">
            <div className="h-64 overflow-hidden relative">
              <img
                src="/images/food-distribution.jpg"
                alt="Community and family relief outreach in Nigeria"
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-heading font-bold text-forest shadow-xs">
                Pillar 02 • Community &amp; Care
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-heading font-bold text-ink mb-3">
                Mobile Clinics, Maternal Care &amp; Clean Water
              </h3>
              <p className="text-sm text-ink-light leading-relaxed mb-6">
                Bringing licensed doctors directly into remote villages for malaria diagnosis, free antibiotics, sterile birth kits (Mama Kits), and solar deep water boreholes.
              </p>

              <button
                onClick={() => {
                  setCurrentPage('programs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-heading font-bold text-forest hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Healthcare Initiatives</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
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
                  <h4 className="text-sm font-heading font-bold text-ink">{t.author}</h4>
                  <p className="text-xs text-ink-muted">{t.role} • {t.institution}</p>
                  <span className="text-xs text-primary font-medium block mt-0.5">{t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: DIRECT GIVING SIMULATOR */}
        <section className="relative z-10 py-24 px-4 md:px-8 max-w-4xl mx-auto">
          <div className="paper-card rounded-3xl p-8 sm:p-12 bg-white/95 backdrop-blur-xs">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
                Direct Impact Simulator
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink">
                See what your contribution creates.
              </h2>
              <p className="text-xs text-ink-muted mt-1">
                Adjust the slider to calculate the frontline deliverables funded by your gift.
              </p>
            </div>

            <div className="bg-sand p-6 rounded-2xl border border-[#e7e2d8] mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-ink uppercase tracking-wide font-heading">Donation Amount:</span>
                <span className="font-mono text-2xl sm:text-3xl font-bold text-primary">
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

              <div className="flex justify-between text-[11px] text-ink-muted font-medium mt-2">
                <span>₦5,000</span>
                <span>₦25,000</span>
                <span>₦50,000</span>
                <span>₦75,000</span>
                <span>₦100,000</span>
              </div>
            </div>

            {/* Generated Deliverables */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-sand border border-[#e7e2d8] text-center">
                <span className="font-mono text-2xl font-bold text-primary block mb-0.5">
                  {currentImpact.students}
                </span>
                <span className="text-xs text-ink-muted">Students Funded</span>
              </div>

              <div className="p-4 rounded-xl bg-sand border border-[#e7e2d8] text-center">
                <span className="font-mono text-2xl font-bold text-forest block mb-0.5">
                  {currentImpact.clinicVisits}
                </span>
                <span className="text-xs text-ink-muted">Clinic Consults</span>
              </div>

              <div className="p-4 rounded-xl bg-sand border border-[#e7e2d8] text-center">
                <span className="font-mono text-2xl font-bold text-clay block mb-0.5">
                  {currentImpact.booksSupplied}
                </span>
                <span className="text-xs text-ink-muted">Textbook Sets</span>
              </div>

              <div className="p-4 rounded-xl bg-sand border border-[#e7e2d8] text-center">
                <span className="font-mono text-2xl font-bold text-emerald-800 block mb-0.5">
                  {currentImpact.safeWaterDays}
                </span>
                <span className="text-xs text-ink-muted">Days Clean Water</span>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={onOpenDonate}
                className="btn-primary text-sm px-8 py-3.5 inline-flex items-center gap-2 cursor-pointer shadow-md font-heading font-semibold"
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
