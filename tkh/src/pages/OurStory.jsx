import { useData } from '../context/DataContext';
import { ArrowRight } from '../components/Icons';

export default function OurStory({ onOpenDonate, setCurrentPage }) {
  const { storyContent } = useData() || {};

  const handleNav = (pageId, hash = '') => {
    if (setCurrentPage) setCurrentPage(pageId);
    window.location.hash = hash || pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const defaultLeadership = [
    {
      initials: 'SA',
      name: 'Suotonye Augustine Arthur',
      role: 'Country Head',
      image: '/images/Suotonye Augustine Arthur - Country Head.jpeg'
    },
    {
      initials: 'IF',
      name: 'Ibrahim Favour Adoba',
      role: 'Project Manager',
      image: '/images/Ibrahim Favour Adoba - Project Manager.jpeg'
    },
    {
      initials: 'AK',
      name: 'Ahange Kumawuese Keziah',
      role: 'Finance Manager',
      image: '/images/Ahange Kumawuese Keziah  Finance Manager..jpeg'
    },
    {
      initials: 'AD',
      name: 'Anedo Deborah',
      role: 'Human Resources',
      image: '/images/Anedo Deborah Human resource.jpeg'
    },
    {
      initials: 'AM',
      name: 'Abubakar Muhammed',
      role: 'Accountant',
      image: '/images/Abubakar Muhammed Accountant.jpeg'
    }
  ];

  const defaultStateCoordinators = [
    {
      initials: 'IN',
      name: 'Ibrahim Nzoyu Vivian',
      state: 'FCT ABUJA',
      image: '/images/FCT coordinator IBRAHIM NZOYU VIVIAN.jpeg'
    },
    {
      initials: 'JO',
      name: 'Job Orokpo Agada',
      state: 'BENUE',
      image: '/images/Job orokpo Agada Benue state coordinator.jpeg'
    },
    {
      initials: 'HH',
      name: 'Hassan Habeeb Adebayo',
      state: 'LAGOS',
      image: '/images/lagos State Project Cordinator Hassan Habeeb Adebayo.jpeg'
    },
    {
      initials: 'TO',
      name: 'Talabi Oluwaseyi Hannah',
      state: 'OYO',
      image: '/images/Talabi Oluwaseyi Hannah Oyo State Project Coordinator.jpeg'
    },
    {
      initials: 'OT',
      name: 'Oluwadiya Tobi Elijah',
      state: 'PLATEAU',
      image: '/images/Oluwadiya Tobi Elijah Plateau State Coordinator.jpeg'
    }
  ];

  const leadership =
    storyContent?.leadership && storyContent.leadership.length > 0
      ? storyContent.leadership
      : defaultLeadership;

  const stateCoordinators =
    storyContent?.stateCoordinators && storyContent.stateCoordinators.length > 0
      ? storyContent.stateCoordinators
      : defaultStateCoordinators;

  const timelineMilestones = [
    {
      year: '2023',
      title: 'First outreach',
      detail: 'School fees and food packs for vulnerable children and widows in rural communities.'
    },
    {
      year: '2023',
      title: 'Registered as a non-profit',
      detail: 'Formally incorporated as a non-profit foundation under Nigerian law.'
    },
    {
      year: '2026',
      title: 'Coordinators in 7 states',
      detail: 'Monthly outreaches led by state coordinators who know their communities.'
    },
    {
      year: '2026',
      title: 'First computer lab',
      detail: 'A nine-computer lab for Beckwin International School, Plateau State.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Find the need',
      detail: 'State coordinators work with community leaders and school heads to find the children and families who need help most.'
    },
    {
      number: '02',
      title: 'Verify it',
      detail: 'We visit homes and schools to confirm each need first-hand before anything is funded.'
    },
    {
      number: '03',
      title: 'Pay directly',
      detail: 'Fees go straight to schools and materials straight from suppliers. No cash is handed out in the field.'
    },
    {
      number: '04',
      title: 'Report back',
      detail: 'Every outreach gets a public field report with photos, numbers and what it cost.'
    }
  ];

  return (
    <div className="w-full bg-[#fdfbf7] text-[#1c1c1a] overflow-x-hidden">

      {/* 1. Hero */}
      <section className="relative pt-12 sm:pt-16 lg:pt-20 xl:pt-24 pb-14 sm:pb-16 lg:pb-20 max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          <div className="lg:col-span-6 flex flex-col items-start gap-4 sm:gap-5 max-w-xl">
            <span className="text-xs uppercase font-bold tracking-widest text-maroon">
              ABOUT US
            </span>
            <h1 className="font-heading font-bold text-3xl xs:text-4xl sm:text-[44px] lg:text-[46px] xl:text-[50px] leading-[1.18] sm:leading-[1.2] tracking-tight text-[#1c1c1a]">
              Help that goes straight to the people who need it.
            </h1>
            <p className="text-base sm:text-lg lg:text-[17px] xl:text-lg text-[#4a4a46] leading-relaxed">
              Ten Kind Hands is a Nigerian non-profit supporting vulnerable children, youth, women and widows through education, healthcare and livelihoods. Local people choose who we help, and we report on every outreach.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-3 w-full sm:w-auto">
              <button
                onClick={() => onOpenDonate()}
                className="btn-primary w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-semibold shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Donate now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleNav('transparency')}
                className="btn-secondary w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-center cursor-pointer"
              >
                See where the money goes
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 w-full">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#e5e0d8] shadow-md bg-white group">
              <img
                src="/images/food-distribution.jpg"
                alt="Children and families supported by Ten Kind Hands"
                className="w-full h-[280px] xs:h-[320px] sm:h-[380px] lg:h-[420px] xl:h-[460px] object-cover object-center group-hover:scale-102 transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/IMG_0303.JPG';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Story & Single-Row Timeline */}
      <section className="py-14 sm:py-20 lg:py-24 bg-[#f5f1e8] border-y border-[#e5e0d8]">
        <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Two Short Paragraphs + One Photo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center mb-12 sm:mb-16">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="text-xs uppercase font-bold tracking-widest text-maroon mb-2">
                OUR STORY
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1c1c1a] mb-4 sm:mb-5">
                It started with one simple belief.
              </h2>
              <div className="text-base sm:text-lg text-[#4a4a46] space-y-4 leading-relaxed">
                <p>
                  No child should miss school because their parents fell on hard times, and no mother should suffer an illness that basic care could prevent.
                </p>
                <p>
                  We also saw donor money disappear into overheads. So we chose a different path: on-the-ground teams, no public cuts, and total transparency. Today our coordinators lead monthly outreaches in 7 Nigerian states — making sure gifts go straight to school fees, learning kits and medicines.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 w-full">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-[#e5e0d8] bg-white shadow-sm">
                <img
                  src="/images/hero-widows-clean-cooking-stoves.webp"
                  alt="Ten Kind Hands field outreach in Dafara"
                  className="w-full h-[260px] xs:h-[300px] sm:h-[340px] lg:h-[360px] object-cover object-center"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/food-distribution.jpg';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Single-Row Horizontal Timeline of 4 Milestones */}
          <div className="pt-10 sm:pt-12 border-t border-[#e5e0d8] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {timelineMilestones.map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="font-heading font-bold text-maroon text-sm sm:text-base mb-1">
                  {item.year}
                </span>
                <h3 className="font-heading font-bold text-base sm:text-lg text-[#1c1c1a] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4a4a46] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Mission, Vision, Values (Single Green Band with 3 Columns) */}
      <section className="bg-forest !text-white py-12 sm:py-16 lg:py-20 border-y border-forest-dark" style={{ color: '#ffffff' }}>
        <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            
            {/* Mission */}
            <div>
              <span className="text-xs uppercase tracking-widest text-[#a8d5c4] font-bold block mb-3">
                OUR MISSION
              </span>
              <p className="font-heading font-semibold text-lg sm:text-xl lg:text-2xl leading-snug !text-white" style={{ color: '#ffffff' }}>
                To improve the lives of women and children through education and healthcare that lead to better health and a brighter future.
              </p>
            </div>

            {/* Vision */}
            <div>
              <span className="text-xs uppercase tracking-widest text-[#a8d5c4] font-bold block mb-3">
                OUR VISION
              </span>
              <p className="font-heading font-semibold text-lg sm:text-xl lg:text-2xl leading-snug !text-white" style={{ color: '#ffffff' }}>
                A world where every child gets a quality education and every woman and child can get the healthcare they need.
              </p>
            </div>

            {/* Values */}
            <div>
              <span className="text-xs uppercase tracking-widest text-[#a8d5c4] font-bold block mb-3">
                OUR VALUES
              </span>
              <div className="flex flex-col gap-2 font-heading font-semibold text-lg sm:text-xl !text-white" style={{ color: '#ffffff' }}>
                <span>Dignity</span>
                <span>Sustainable progress</span>
                <span>Uncompromising integrity</span>
                <span>Every kobo accounted for</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. How We Work */}
      <section className="py-14 sm:py-20 lg:py-24 max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <span className="text-xs uppercase font-bold tracking-widest text-maroon mb-2 block">
              HOW WE WORK
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1c1c1a] leading-tight">
              Local people choose who we help. We pay schools and suppliers directly.
            </h2>
          </div>

          {/* 100% Callout Card */}
          <div className="bg-maroon-tint/80 border border-maroon/15 rounded-2xl sm:rounded-3xl p-5 sm:p-6 max-w-sm shrink-0">
            <div className="font-heading font-bold text-3xl sm:text-4xl text-maroon mb-1.5">
              100%
            </div>
            <p className="text-xs sm:text-sm text-[#4a4a46] leading-relaxed">
              of public gifts reach the people we serve. Our trustees cover the running costs.
            </p>
          </div>
        </div>

        {/* 4 Steps in Lighter Style with Maroon Accent Line */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((st) => (
            <div key={st.number} className="border-t-2 border-maroon pt-4 flex flex-col">
              <span className="font-heading font-bold text-sm sm:text-base text-maroon mb-2">
                {st.number}
              </span>
              <h3 className="font-heading font-bold text-base sm:text-lg text-[#1c1c1a] mb-2">
                {st.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#4a4a46] leading-relaxed">
                {st.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Team: Leadership & Operations (5) + State Coordinators (5) */}
      <section className="py-14 sm:py-20 lg:py-24 bg-[#f5f1e8] border-t border-[#e5e0d8]">
        <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 sm:mb-10">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-maroon mb-1.5 block">
                OUR TEAM
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1c1c1a]">
                The people behind every outreach
              </h2>
            </div>
            <button
              onClick={() => handleNav('get-involved', 'get-involved/volunteer')}
              className="text-sm sm:text-base font-semibold text-maroon hover:text-maroon-dark transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Join as a volunteer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Group 1: Leadership & Operations (5 Even Columns) */}
          <div className="mb-10 sm:mb-14">
            <h3 className="font-heading font-bold text-lg sm:text-xl text-[#1c1c1a] mb-4 sm:mb-5">
              Leadership &amp; operations
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
              {leadership.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#e5e0d8] text-center flex flex-col items-center justify-between shadow-xs hover:shadow-md hover:border-[#cfc7b9] transition-all"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-full overflow-hidden mb-3 border-2 border-white shadow-sm bg-sand relative shrink-0">
                    {m.image ? (
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      className="w-full h-full bg-sand text-maroon font-heading font-bold text-base sm:text-lg flex items-center justify-center"
                      style={{ display: m.image ? 'none' : 'flex' }}
                    >
                      {m.initials}
                    </div>
                  </div>

                  <h4 className="font-heading font-bold text-xs sm:text-sm text-[#1c1c1a] leading-snug mb-1">
                    {m.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#706e68] leading-tight">
                    {m.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Group 2: State Coordinators (5 Even Columns) */}
          <div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-[#1c1c1a] mb-4 sm:mb-5">
              State coordinators
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
              {stateCoordinators.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#e5e0d8] text-center flex flex-col items-center justify-between shadow-xs hover:shadow-md hover:border-[#cfc7b9] transition-all"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-full overflow-hidden mb-3 border-2 border-white shadow-sm bg-sand relative shrink-0">
                    {m.image ? (
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      className="w-full h-full bg-sand text-maroon font-heading font-bold text-base sm:text-lg flex items-center justify-center"
                      style={{ display: m.image ? 'none' : 'flex' }}
                    >
                      {m.initials}
                    </div>
                  </div>

                  <h4 className="font-heading font-bold text-xs sm:text-sm text-[#1c1c1a] leading-snug mb-2">
                    {m.name}
                  </h4>
                  <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-forest bg-forest-tint px-3 py-0.5 rounded-full uppercase">
                    {(m.state || m.badge || m.role || 'Field Coordinator')
                      .replace(/state coordinator/i, '')
                      .replace(/coordinator/i, '')
                      .replace(/project/i, '')
                      .replace(/state/i, '')
                      .trim()
                      .toUpperCase() || 'COORDINATOR'}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. Closing Band (Board of Trustees & Call to Action) */}
      <section className="py-12 sm:py-16 lg:py-20 max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-maroon text-white rounded-3xl p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12 shadow-sm">
          <div className="max-w-xl">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white mb-3 sm:mb-4">
              Overseen by a Board of Trustees. Open to everyone.
            </h3>
            <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-5">
              Our trustees personally fund all running costs and administration, so every public donation reaches the people we serve. Our documents and accounts are public.
            </p>
            <button
              onClick={() => handleNav('transparency')}
              className="text-sm sm:text-base text-white underline hover:opacity-80 transition-opacity font-medium cursor-pointer"
            >
              See our documents and accounts →
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => onOpenDonate()}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full bg-white text-maroon font-heading font-bold text-sm sm:text-base hover:bg-[#f5f1e8] transition-colors shadow-md cursor-pointer text-center"
            >
              Donate now
            </button>
            <button
              onClick={() => handleNav('get-involved', 'get-involved/volunteer')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-full border border-white/40 text-white font-heading font-semibold text-sm sm:text-base hover:bg-white/10 transition-colors cursor-pointer text-center"
            >
              Volunteer with us
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
