import { useState, useEffect } from 'react';
import { School, Stethoscope, BookOpen, Users, Laptop, HandHeart, ArrowRight, ArrowLeft, Heart, Quote } from '../components/Icons';
import CurvedWaveBackground from '../components/CurvedWaveBackground';

const programsData = [
  {
    id: 'scholarships',
    pillar: 'Education',
    badge: 'Education Pillar',
    title: 'Scholarships',
    subtitle: 'Full-Tuition, Exam Fees & Uniform Coverage for Vulnerable Children',
    tagline: 'Ensuring financial poverty never forces an eager child out of primary or secondary schooling.',
    locations: 'Kaduna, Niger & Ogun States',
    leadStat: '340+ Students on Active Scholarship',
    budgetGoal: '₦45,000 / Student / Term',
    fundedPercent: 84,
    icon: School,
    color: 'text-primary',
    whatItDoes: 'Our Scholarship Initiative covers 100% of compulsory tuition fees, national examination registrations, custom school uniforms, and mandatory stationery packs for underprivileged orphans and children of low-income rural households.',
    whoItServes: 'Primary and junior secondary students who are either out of school or at severe risk of dropping out due to unpaid term levies, with a priority focus on girl-child education in rural farming communities.',
    realStory: {
      name: 'Halima Yusuf (Age 11)',
      location: 'Zaria Rural, Kaduna',
      story: 'Halima lost her father in 2022 and was out of school for two terms helping her mother sell groundnuts. In 2023, she received a TKH full scholarship. Today, she consistently ranks 1st in her primary 5 class and dreams of becoming a pediatric doctor.'
    },
    howItWorks: [
      { step: 1, title: 'Community Identification', desc: 'Partnering with village heads and headmistresses to identify out-of-school or at-risk children.' },
      { step: 2, title: 'Household Assessment', desc: 'Home visits to verify vulnerability and establish an academic benchmark.' },
      { step: 3, title: 'Direct School Disbursement', desc: 'Tuition, uniform tailoring, and term learning materials disbursed directly to the school.' },
      { step: 4, title: 'Termly Outcome Audits', desc: 'Report card monitoring, attendance tracking, and parent-teacher mentoring.' }
    ],
    stats: [
      { label: 'Scholarships Awarded', val: '340+' },
      { label: 'Term Retention Rate', val: '98.5%' },
      { label: 'Partner Schools Enrolled', val: '24' }
    ],
    ctaText: 'Sponsor a Child\'s Scholarship',
    testimonials: [
      {
        quote: "Without Ten Kind Hands paying my son's fees, he would have stopped at Primary 4. Today he is preparing for his secondary entrance exams with flying colors.",
        author: "Musa Ibrahim",
        role: "Father & Subsistence Farmer, Kaduna"
      }
    ]
  },
  {
    id: 'youth-development',
    pillar: 'Education',
    badge: 'Education Pillar',
    title: 'Youth Development',
    subtitle: 'Digital Literacy, STEM Labs & Vocational Mentorship for Teens',
    tagline: 'Bridging the digital divide for rural adolescents with practical vocational and digital skills.',
    locations: 'Abuja & Lagos Satellite Communities',
    leadStat: '1,100+ Youth Certified',
    budgetGoal: '₦1,800,000 / Tech Pod',
    fundedPercent: 72,
    icon: Laptop,
    color: 'text-primary',
    whatItDoes: 'Sets up solar-powered computer labs with offline encyclopedias and coding bootcamps. Provides adolescents with hands-on computer basics, spreadsheets, digital literacy, and entrepreneurship coaching.',
    whoItServes: 'Teens and young school-leavers aged 13–19 in peri-urban and rural Nigerian settlements who lack home electricity or computer access.',
    realStory: {
      name: 'Emmanuel Chinedu (Age 17)',
      location: 'Karmo Satellite, Abuja',
      story: 'Emmanuel had never touched a physical laptop before attending TKH Youth Digital Bootcamps. Within six months, he learned data entry and graphic basics, and now freelances locally to support his tertiary polytechnic application.'
    },
    howItWorks: [
      { step: 1, title: 'Solar Tech Pod Setup', desc: 'Installing refurbished laptop workstations with solar inverters in community halls.' },
      { step: 2, title: '12-Week Practical Cohort', desc: 'Structured curriculum in typing, software literacy, spreadsheets, and digital research.' },
      { step: 3, title: 'Professional Mentoring', desc: 'Pairing students with Nigerian tech professionals for career guidance.' },
      { step: 4, title: 'Certification & Placement', desc: 'Practical capstone project presentation and certificate award.' }
    ],
    stats: [
      { label: 'Youth Certified', val: '1,100+' },
      { label: 'Digital Labs Deployed', val: '6' },
      { label: 'Vocational Placements', val: '180+' }
    ],
    ctaText: 'Fund a Teen Digital Pod',
    testimonials: [
      {
        quote: "The coding and typing classes opened a new world for our village youth. They now see opportunities far beyond manual labor.",
        author: "Pastor Samuel Udoh",
        role: "Youth Leader, Lagos Outreach"
      }
    ]
  },
  {
    id: 'orphanages-outreaches',
    pillar: 'Healthcare',
    badge: 'Community Pillar',
    title: 'Orphanages & Outreaches',
    subtitle: 'Direct Food Security, Hygiene Supplies & Care Home Support',
    tagline: 'Providing reliable nutrition, bedding, and medical checks for registered Nigerian children\'s homes.',
    locations: 'Enugu, Kaduna & FCT Abuja',
    leadStat: '18 Orphanage Homes Supported',
    budgetGoal: '₦600,000 / Home / Quarter',
    fundedPercent: 91,
    icon: HandHeart,
    color: 'text-forest',
    whatItDoes: 'Conducts quarterly provisioning visits to registered children\'s homes, delivering high-protein foodstuffs (beans, rice, fortified milk), hygiene essentials (soaps, antiseptics, sanitary pads), clean bedding, and pediatric nurse health visits.',
    whoItServes: 'Orphaned, abandoned, and displaced infants and young children residing in verified non-governmental care homes across Nigeria.',
    realStory: {
      name: 'Hope Sanctuary Children\'s Home',
      location: 'Enugu State',
      story: 'Home to 42 children, Hope Sanctuary faced severe food shortages during soaring inflation. TKH stepped in with quarterly food consignments and medical screenings, eliminating childhood malnutrition in the sanctuary.'
    },
    howItWorks: [
      { step: 1, title: 'Sanctuary Needs Audit', desc: 'Visiting homes to inspect pantry stocks, sanitary facilities, and pediatric health records.' },
      { step: 2, title: 'Bulk Direct Procurement', desc: 'Direct sourcing of grain bags, fortified nutrients, and pharmacy packs at wholesale rates.' },
      { step: 3, title: 'Delivery & Clinical Check', desc: 'Consignments delivered with on-site pediatric clinical checks and developmental play.' },
      { step: 4, title: 'Quarterly Re-Assessment', desc: 'Monitoring weight charts and nutritional recovery of all residing children.' }
    ],
    stats: [
      { label: 'Care Homes Supported', val: '18' },
      { label: 'Food Consignments Delivered', val: '72+' },
      { label: 'Children Reached', val: '680+' }
    ],
    ctaText: 'Sponsor an Orphanage Food Pack',
    testimonials: [
      {
        quote: "Ten Kind Hands supplies are the most consistent blessing our sanctuary has ever had. Their staff come with genuine love, not for photo stunts.",
        author: "Sister Mary Theresa",
        role: "Director, Little Angels Orphanage, Enugu"
      }
    ]
  },
  {
    id: 'school-donations',
    pillar: 'Education',
    badge: 'Education Pillar',
    title: 'School Donations',
    subtitle: 'Classroom Construction, Solar Power & Textbooks',
    tagline: 'Equipping rural schools with durable infrastructure and modern teaching tools.',
    locations: '45 Schools across 5 States',
    leadStat: '45 Classrooms Built / Equipped',
    budgetGoal: '₦4,500,000 / School Block',
    fundedPercent: 88,
    icon: BookOpen,
    color: 'text-primary',
    whatItDoes: 'Renovates and builds weather-proof classroom blocks, supplies dual-seater student desks, builds modern blackboards, and donates library boxes filled with curriculum-aligned textbooks and teacher guides.',
    whoItServes: 'Public rural community schools that suffer from dilapidated infrastructure, lack of seating, and zero reading books.',
    realStory: {
      name: 'L.E.A. Primary School, Kufana',
      location: 'Kaduna State',
      story: 'Pupils previously sat on raw mud blocks under cracked asbestos sheets. TKH rebuilt a 3-classroom block with solar roof lighting, modern desks, and a 500-book reading box. Pupil enrollment increased by 65% in one academic year.'
    },
    howItWorks: [
      { step: 1, title: 'Structural Assessment', desc: 'Engineering audit of damaged school blocks and baseline student enrollment.' },
      { step: 2, title: 'Local Artisan Labor', desc: 'Hiring local village artisans and carpenters to build desks and lay blocks.' },
      { step: 3, title: 'Solar & Reading Kits', desc: 'Installing roof solar lighting, ceiling fans, and stocking classroom reading chests.' },
      { step: 4, title: 'Community Handover', desc: 'Handing over maintenance custody to the Parent-Teacher Association.' }
    ],
    stats: [
      { label: 'Classroom Blocks Built', val: '45' },
      { label: 'Books & Toolkits Donated', val: '1,000+' },
      { label: 'Desks Handcrafted', val: '1,850' }
    ],
    ctaText: 'Fund a Classroom Block',
    testimonials: [
      {
        quote: "Before this donation, teachers had no textbooks to teach from. Today every pupil shares a modern reader and sits comfortably on a desk.",
        author: "Mallam Bello Abdullahi",
        role: "School Proprietor & Education Secretary"
      }
    ]
  },
  {
    id: 'medical-outreaches',
    pillar: 'Healthcare',
    badge: 'Healthcare Pillar',
    title: 'Medical Outreaches',
    subtitle: 'Mobile Clinics, Malaria Screenings & Free Treatments',
    tagline: 'Bringing doctors, diagnostic tests, and pharmaceuticals to villages with zero hospital access.',
    locations: 'Kaduna, Enugu & Ogun Rural Districts',
    leadStat: '8,200+ Patients Treated',
    budgetGoal: '₦1,200,000 / Medical Mission',
    fundedPercent: 94,
    icon: Stethoscope,
    color: 'text-forest',
    whatItDoes: 'Deploys 4x4 mobile clinics staffed by volunteer medical doctors, nurses, and pharmacists to conduct free rapid diagnostic tests (Malaria, Typhoid, Diabetes, Blood Pressure), provide full treatment courses, and distribute pediatric deworming medication.',
    whoItServes: 'Rural farming families, elderly villagers, and children who live hours away from primary healthcare centers and cannot afford consultation fees or prescription medications.',
    realStory: {
      name: 'Mama Rachael Obi',
      location: 'Oji River District, Enugu',
      story: 'Suffering from severe undiagnosed hypertension for two years, Mama Rachael collapsed during farming. The TKH mobile clinic stabilized her, provided three months of monitored antihypertensive therapy, and educated her family on preventative health.'
    },
    howItWorks: [
      { step: 1, title: 'Community Entry & Notice', desc: 'Coordinating dates with traditional chiefs and securing village health hall clinics.' },
      { step: 2, title: 'Triage & Diagnostics', desc: 'Vital signs checks, rapid malaria/blood sugar testing by certified nurses.' },
      { step: 3, title: 'Doctor Consultation', desc: 'One-on-one medical examinations and free pharmacy drug dispensing.' },
      { step: 4, title: 'Referral & Emergency Fund', desc: 'Emergency transport vouchers for patients requiring specialized hospital surgery.' }
    ],
    stats: [
      { label: 'Patients Treated', val: '8,200+' },
      { label: 'Mobile Missions Conducted', val: '38' },
      { label: 'Malaria Tests Administered', val: '6,400+' }
    ],
    ctaText: 'Sponsor a Mobile Medical Clinic',
    testimonials: [
      {
        quote: "The doctors came right to our village square. I received eye checks and medicine for my arthritis without paying a single kobo.",
        author: "Pa Gabriel Nwosu (Age 68)",
        role: "Community Elder, Enugu"
      }
    ]
  },
  {
    id: 'women-widows',
    pillar: 'Healthcare',
    badge: 'Women Empowerment',
    title: 'Women & Widows Impact',
    subtitle: 'Micro-Enterprise Grants, Maternal Packs & Vocational Training',
    tagline: 'Equipping vulnerable widows and mothers with financial agency and safe maternal healthcare.',
    locations: 'Ogun, Enugu & Kano States',
    leadStat: '3,400 Mothers & Widows Supported',
    budgetGoal: '₦35,000 / Micro-Grant & Pack',
    fundedPercent: 82,
    icon: Users,
    color: 'text-forest',
    whatItDoes: 'Provides pregnant mothers with sterile safe-delivery kits (Mama Kits) and prenatal vitamins. Equips vulnerable widows with seed capital micro-grants, soap-making/tailoring vocational training, and cooperative savings mentoring.',
    whoItServes: 'Bereaved widows with dependent children and low-income pregnant women in underserved communities.',
    realStory: {
      name: 'Comfort Adeleke',
      location: 'Abeokuta Rural, Ogun State',
      story: 'After losing her husband, Comfort had no capital to sustain her four young children. Through the TKH Widows Empowerment Grant of ₦35,000, she started a cassava processing micro-business and now pays her children’s school levies comfortably.'
    },
    howItWorks: [
      { step: 1, title: 'Household Profiling', desc: 'Women\'s fellowship meetings to identify widows with dependent school-age children.' },
      { step: 2, title: 'Trade & Financial Training', desc: '3-day practical training on basic bookkeeping, savings, and trade skills.' },
      { step: 3, title: 'Seed Grant Disbursement', desc: 'Direct non-repayable seed capital micro-grants and trade toolkits.' },
      { step: 4, title: 'Peer Mentorship Guild', desc: 'Monthly cooperative check-ins to ensure trade sustainability and peer support.' }
    ],
    stats: [
      { label: 'Mothers & Widows Empowered', val: '3,400+' },
      { label: 'Micro-Grants Disbursed', val: '450+' },
      { label: 'Safe Delivery Packs Distributed', val: '2,200+' }
    ],
    ctaText: 'Fund a Widow\'s Enterprise Grant',
    testimonials: [
      {
        quote: "Ten Kind Hands didn't just give me fish; they taught me how to fish and gave me the net. I can now feed my children with dignity.",
        author: "Mrs. Folashade Bakare",
        role: "Micro-Grant Beneficiary & Cassava Trader"
      }
    ]
  }
];

export default function Programs({ onOpenDonate, initialProgramId = null }) {
  const [selectedProgramId, setSelectedProgramId] = useState(initialProgramId);
  const [prevProgramId, setPrevProgramId] = useState(initialProgramId);
  const [pillarFilter, setPillarFilter] = useState('all');

  if (prevProgramId !== initialProgramId) {
    setPrevProgramId(initialProgramId);
    setSelectedProgramId(initialProgramId);
  }

  useEffect(() => {
    if (initialProgramId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [initialProgramId]);

  const activeProgram = programsData.find((p) => p.id === selectedProgramId);

  const filteredPrograms = pillarFilter === 'all'
    ? programsData
    : programsData.filter((p) => p.pillar.toLowerCase().includes(pillarFilter.toLowerCase()));

  // Render Program Detail Page
  if (activeProgram) {
    return (
      <div className="pt-24 md:pt-28 animate-fade-in bg-white pb-20">
        <div className="relative max-w-4xl mx-auto px-4 md:px-8 py-6 overflow-hidden">
          <CurvedWaveBackground side="right" />

          <div className="relative z-10">
            {/* Back button */}
            <button
              onClick={() => {
                setSelectedProgramId(null);
                window.location.hash = 'programs';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-ink-light hover:text-ink mb-8 cursor-pointer font-heading"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Programs</span>
            </button>

            {/* Program Header */}
            <div className="border-b border-[#e7e2d8] pb-10 mb-10">
              <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
                {activeProgram.badge} • {activeProgram.locations}
              </span>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-heading font-extrabold text-ink mb-3 tracking-tight">
                {activeProgram.title}
              </h1>

              <p className="text-sm sm:text-lg text-primary font-semibold mb-4">
                {activeProgram.subtitle}
              </p>

              <p className="text-sm sm:text-base text-ink-light leading-relaxed">
                {activeProgram.tagline}
              </p>

              {/* Program Milestone Bar */}
              <div className="mt-8 p-4 sm:p-6 rounded-2xl bg-sand/90 backdrop-blur-xs border border-[#e7e2d8] shadow-xs">
                <div className="flex justify-between text-xs font-bold mb-2 font-heading">
                  <span className="text-ink">2025–2026 Initiative Deployment</span>
                  <span className="text-primary">{activeProgram.fundedPercent}% Goal Reached</span>
                </div>
                <div className="w-full h-2.5 bg-[#ded8cc] rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${activeProgram.fundedPercent}%` }}
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-between text-[11px] text-ink-muted gap-1">
                  <span>Benchmark: {activeProgram.budgetGoal}</span>
                  <span className="text-forest font-semibold">Active Field Deployment</span>
                </div>
              </div>
            </div>

            {/* Two-Column Overview */}
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12">
              <div className="p-5 sm:p-8 rounded-2xl bg-white border border-[#e7e2d8] shadow-xs">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-ink mb-3">What this initiative accomplishes</h3>
                <p className="text-xs sm:text-sm text-ink-light leading-relaxed">
                  {activeProgram.whatItDoes}
                </p>
              </div>

              <div className="p-5 sm:p-8 rounded-2xl bg-white border border-[#e7e2d8] shadow-xs">
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-ink mb-3">Who is reached &amp; empowered</h3>
                <p className="text-xs sm:text-sm text-ink-light leading-relaxed">
                  {activeProgram.whoItServes}
                </p>
              </div>
            </div>

            {/* How It Works Flow */}
            <div className="mb-12">
              <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
                Theory of Action
              </span>
              <h3 className="text-3xl font-heading font-bold text-ink mb-6">
                How we execute this initiative on the ground
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {activeProgram.howItWorks.map((step) => (
                  <div key={step.step} className="p-5 rounded-xl bg-sand/90 backdrop-blur-xs border border-[#e7e2d8]">
                    <span className="font-mono text-sm font-bold text-primary block mb-1">0{step.step}.</span>
                    <h4 className="text-sm font-heading font-bold text-ink mb-1">{step.title}</h4>
                    <p className="text-xs text-ink-light leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Real Consented Story & Key Metrics */}
            <div className="grid md:grid-cols-12 gap-6 sm:gap-8 mb-12 items-start">
              <div className="md:col-span-7 p-5 sm:p-8 rounded-2xl bg-sand/90 backdrop-blur-xs border border-[#e7e2d8]">
                <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
                  Field Case Study
                </span>
                <h4 className="text-xl sm:text-2xl font-heading font-bold text-ink mb-1">
                  {activeProgram.realStory.name}
                </h4>
                <span className="text-xs text-ink-muted block mb-3">
                  {activeProgram.realStory.location}
                </span>
                <p className="text-xs sm:text-sm text-ink-light italic leading-relaxed">
                  "{activeProgram.realStory.story}"
                </p>
              </div>

              <div className="md:col-span-5 p-5 sm:p-8 rounded-2xl bg-white border border-[#e7e2d8] shadow-xs">
                <span className="text-xs uppercase tracking-widest text-ink font-bold block mb-4 font-heading">
                  Key Stats
                </span>
                <div className="space-y-4">
                  {activeProgram.stats.map((st, i) => (
                    <div key={i} className="border-b border-[#f0ece8] pb-3 last:border-none">
                      <span className="font-mono text-2xl font-bold text-primary block">
                        {st.val}
                      </span>
                      <span className="text-xs text-ink-muted">{st.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            {activeProgram.testimonials.length > 0 && (
              <div className="p-8 rounded-2xl bg-white border border-[#e7e2d8] mb-12 shadow-xs">
                <Quote className="w-6 h-6 text-primary/30 mb-3" />
                <p className="text-sm text-ink-light italic leading-relaxed mb-4">
                  "{activeProgram.testimonials[0].quote}"
                </p>
                <div className="text-xs font-bold text-ink">
                  {activeProgram.testimonials[0].author} • <span className="font-normal text-ink-muted">{activeProgram.testimonials[0].role}</span>
                </div>
              </div>
            )}

            {/* Dedicated CTA */}
            <div className="p-6 sm:p-10 rounded-3xl bg-sand/90 backdrop-blur-xs border border-[#e7e2d8] text-center">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-ink mb-2">
                Support the {activeProgram.title} Initiative
              </h3>
              <p className="text-xs sm:text-sm text-ink-light max-w-md mx-auto mb-6 leading-relaxed">
                Your donation directly funds {activeProgram.title.toLowerCase()} with 100% transparent audit reporting.
              </p>
              <button
                onClick={onOpenDonate}
                className="btn-primary w-full sm:w-auto text-xs sm:text-sm px-6 sm:px-8 py-3.5 inline-flex items-center justify-center gap-2 cursor-pointer shadow-md font-heading font-semibold"
              >
                <span>{activeProgram.ctaText}</span>
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // PROGRAMS HUB VIEW
  // =========================================================
  return (
    <div className="pt-24 md:pt-28 animate-fade-in bg-white pb-20">
      {/* Header with Ambient Wave */}
      <section className="relative py-12 md:py-16 px-4 md:px-8 max-w-5xl mx-auto text-center overflow-hidden">
        <CurvedWaveBackground side="right" />

        <div className="relative z-10">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
            Grassroots Programs
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-ink max-w-3xl mx-auto mb-6 tracking-tight">
            Programs designed for agency, <br />
            <span className="text-primary">built for generational impact.</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-light max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            Explore all six active initiatives across Education and Healthcare. Click any program to see transparent delivery models and real community stories.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setPillarFilter('all')}
              className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${
                pillarFilter === 'all'
                  ? 'bg-ink text-white'
                  : 'bg-sand text-ink-light hover:text-ink'
              }`}
            >
              All 6 Programs
            </button>
            <button
              onClick={() => setPillarFilter('education')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${
                pillarFilter === 'education'
                  ? 'bg-primary text-white'
                  : 'bg-sand text-ink-light hover:text-ink'
              }`}
            >
              Education (3)
            </button>
            <button
              onClick={() => setPillarFilter('healthcare')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${
                pillarFilter === 'healthcare'
                  ? 'bg-forest text-white'
                  : 'bg-sand text-ink-light hover:text-ink'
              }`}
            >
              Healthcare (3)
            </button>
          </div>
        </div>
      </section>

      {/* 6 Program Cards Grid with Mirrored Wave */}
      <section className="relative px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        <CurvedWaveBackground side="left" />

        <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPrograms.map((prog) => {
            return (
              <div
                key={prog.id}
                className="paper-card rounded-3xl p-5 sm:p-8 flex flex-col justify-between bg-white/95 backdrop-blur-xs shadow-xs"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-primary font-heading">
                      {prog.badge}
                    </span>
                    <span className="text-xs text-ink-muted">{prog.locations}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-ink mb-2">
                    {prog.title}
                  </h3>

                  <p className="text-xs text-ink-light leading-relaxed mb-6">
                    {prog.tagline}
                  </p>

                  <div className="p-4 rounded-xl bg-sand/90 border border-[#e7e2d8] mb-6">
                    <span className="text-[10px] uppercase font-bold text-ink-muted block font-heading">Active Impact</span>
                    <span className="text-sm font-bold text-ink mt-0.5 block">{prog.leadStat}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#f0ece8] flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedProgramId(prog.id);
                      window.location.hash = `programs/${prog.id}`;
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-heading font-bold text-ink hover:text-primary flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={onOpenDonate}
                    className="btn-primary text-xs px-4 py-2 flex items-center gap-1 cursor-pointer font-heading font-semibold"
                  >
                    <span>Donate</span>
                    <Heart className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
