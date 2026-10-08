import { Heart, ArrowRight, ShieldCheck, Check } from '../components/Icons';
import CurvedWaveBackground from '../components/CurvedWaveBackground';

export default function OurStory({ onOpenDonate, setCurrentPage }) {
  const handleNav = (pageId, hash = '') => {
    if (setCurrentPage) setCurrentPage(pageId);
    window.location.hash = hash || pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const team = [
    {
      initials: 'SA',
      name: 'Suotonye Augustine Arthur',
      role: 'Country Head',
      image: '/images/Suotonye Augustine Arthur - Country Head.jpeg',
      badge: 'Country Leadership'
    },
    {
      initials: 'IF',
      name: 'Ibrahim Favour Adoba',
      role: 'Project Manager',
      image: '/images/Ibrahim Favour Adoba - Project Manager.jpeg',
      badge: 'Field Operations'
    },
    {
      initials: 'AK',
      name: 'Ahange Kumawuese Keziah',
      role: 'Finance Manager',
      image: '/images/Ahange Kumawuese Keziah  Finance Manager..jpeg',
      badge: 'Finance & Accounts'
    },
    {
      initials: 'AM',
      name: 'Abubakar Muhammed',
      role: 'Accountant',
      image: '/images/Abubakar Muhammed Accountant.jpeg',
      badge: 'Financial Audit'
    },
    {
      initials: 'AD',
      name: 'Anedo Deborah',
      role: 'Human Resources',
      image: '/images/Anedo Deborah Human resource.jpeg',
      badge: 'People & Culture'
    },
    {
      initials: 'IN',
      name: 'Ibrahim Nzoyu Vivian',
      role: 'Coordinator, FCT Abuja',
      image: '/images/FCT coordinator IBRAHIM NZOYU VIVIAN.jpeg',
      badge: 'FCT Abuja'
    },
    {
      initials: 'JO',
      name: 'Job Orokpo Agada',
      role: 'Coordinator, Benue',
      image: '/images/Job orokpo Agada Benue state coordinator.jpeg',
      badge: 'Benue State'
    },
    {
      initials: 'HH',
      name: 'Hassan Habeeb Adebayo',
      role: 'Coordinator, Lagos',
      image: '/images/lagos State Project Cordinator Hassan Habeeb Adebayo.jpeg',
      badge: 'Lagos State'
    },
    {
      initials: 'TO',
      name: 'Talabi Oluwaseyi Hannah',
      role: 'Coordinator, Oyo',
      image: '/images/Talabi Oluwaseyi Hannah Oyo State Project Coordinator.jpeg',
      badge: 'Oyo State'
    },
    {
      initials: 'OT',
      name: 'Oluwadiya Tobi Elijah',
      role: 'Coordinator, Plateau',
      image: '/images/Oluwadiya Tobi Elijah Plateau State Coordinator.jpeg',
      badge: 'Plateau State'
    },
  ];

  const timeline = [
    {
      year: '2023',
      title: 'First grassroots outreach',
      detail: 'Initiated direct school fee coverage and nutritional relief packs for vulnerable children and widows in rural communities.',
      image: '/images/IMG_0294.webp',
      caption: 'Initial educational and nutritional distribution outreach'
    },
    {
      year: '2023',
      title: 'Registered with Corporate Affairs Commission',
      detail: 'Formally incorporated as a non-profit foundation under Nigerian law (CAC RC: 7015705).',
      image: '/images/food-distribution.jpg',
      caption: 'CAC RC: 7015705 incorporation & community field deployment'
    },
    {
      year: '2026',
      title: '5-State Coordination Network',
      detail: 'Monthly outreaches supported by on-the-ground state coordinators across FCT Abuja, Benue, Lagos, Oyo, and Plateau.',
      image: '/images/hero-debate-competition-makurdi.webp',
      caption: 'Makurdi Inter-Secondary debate & scholarship prizes'
    },
    {
      year: '2026',
      title: 'Nine-computer lab commissioned',
      detail: 'Full digital laboratory and learning equipment donated to Beckwin International School, Plateau State.',
      image: '/images/hero-digital-literacy-computer-lab.webp',
      caption: 'Beckwin International School 9-system computer laboratory'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Find the need',
      detail: 'State coordinators work with community leaders and school heads to identify the children and families who need help most.'
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
    <div className="w-full bg-[#fdfbf7] text-[#1c1c1a]">

      {/* 1. Hero with Curved Wave Background */}
      <section className="relative pt-10 sm:pt-16 pb-14 max-w-[1200px] mx-auto px-4 sm:px-6 overflow-hidden">
        <CurvedWaveBackground side="right" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 flex flex-col items-start gap-4">
            <span className="text-xs uppercase font-bold tracking-widest text-maroon">
              ABOUT US
            </span>
            <h1 className="font-heading font-bold text-3xl sm:text-5xl leading-[1.15] text-[#1c1c1a]">
              Every child should be able to learn and stay healthy, whatever their family can afford.
            </h1>
            <p className="text-base sm:text-lg text-[#4a4a46] leading-relaxed max-w-xl">
              Ten Kind Hands is a Nigerian non-profit working with schools, communities and volunteers to help disadvantaged children, women and families break the cycle of poverty.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-[#e5e0d8] shadow-md bg-white group">
              <img
                src="/images/food-distribution.jpg"
                alt="Ten Kind Hands team and community families"
                className="w-full h-[320px] sm:h-[380px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/IMG_0303.JPG';
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/75 via-black/30 to-transparent">
                <span className="text-xs text-white font-medium px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 inline-block">
                  Community distribution · On-the-ground team
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section className="py-10 max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Mission: Deep Forest Card */}
          <div className="bg-forest text-white rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#a8d5c4] font-bold block mb-3">
                OUR MISSION
              </span>
              <p className="font-heading font-semibold text-xl sm:text-2xl leading-snug">
                To improve the lives of women and children by providing educational opportunities and healthcare services that promote better health outcomes and a brighter future.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/20 text-xs text-white/80">
              Grassroots Delivery · Direct Giving Model
            </div>
          </div>

          {/* Vision: Clean Light Card */}
          <div className="bg-white border border-[#e5e0d8] rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-maroon font-bold block mb-3">
                OUR VISION
              </span>
              <p className="font-heading font-semibold text-xl sm:text-2xl leading-snug text-[#1c1c1a]">
                A world where every child has access to quality education, and every woman and child has access to comprehensive healthcare.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#e5e0d8] text-xs text-[#706e68]">
              Dignity · Equity · Sustainable Progress
            </div>
          </div>
        </div>
      </section>

      {/* 3. How We Started (Story + Timeline with Documentary Photos) */}
      <section className="py-16 sm:py-20 bg-[#f5f1e8] border-y border-[#e5e0d8]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Story Column */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1c1c1a] mb-4">
                  How we started
                </h2>
                <div className="text-sm sm:text-base text-[#4a4a46] space-y-4 leading-relaxed mb-6">
                  <p>
                    Ten Kind Hands was founded with a straightforward conviction: that no child should be locked out of classroom doors because their parents fell on hard times, and no mother should suffer preventable illnesses because basic care was out of reach.
                  </p>
                  <p>
                    We saw that traditional charity models often swallowed donor gifts in excessive overhead. We chose a different path: <strong className="text-[#1c1c1a]">100% of public gifts go directly into frontline school fees, learning kits, and medications</strong>, while our founders and trustees personally underwrite operating costs.
                  </p>
                  <p>
                    Today, what began as modest outreach has expanded into a nationwide team of state coordinators across five Nigerian states.
                  </p>
                </div>
              </div>

              {/* Supporting Documentary Photo */}
              <div className="rounded-2xl overflow-hidden border border-[#e5e0d8] bg-white shadow-xs">
                <img
                  src="/images/hero-widows-clean-cooking-stoves.webp"
                  alt="Ten Kind Hands field outreach in Dafara"
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-3 bg-white text-xs text-[#706e68]">
                  Community outreach &amp; eco-clean cookstove distribution in Dafara
                </div>
              </div>
            </div>

            {/* Right Timeline Column with Field Images */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {timeline.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 sm:p-6 border border-[#e5e0d8] shadow-sm flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-full sm:w-36 h-28 shrink-0 rounded-xl overflow-hidden bg-sand border border-[#e5e0d8]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/IMG_0300.webp';
                      }}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-heading font-bold text-maroon text-base">
                        {item.year}
                      </span>
                      <span className="text-[#d0c8bb]">•</span>
                      <h3 className="font-heading font-bold text-base text-[#1c1c1a]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4a4a46] leading-relaxed mb-2">
                      {item.detail}
                    </p>
                    <span className="text-[11px] text-[#706e68] font-medium block">
                      {item.caption}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 4. How We Work (4-Step Way of Working) */}
      <section className="py-16 sm:py-20 max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase font-bold tracking-widest text-maroon mb-1.5">
            HOW WE WORK
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1c1c1a]">
            Local people choose who we help. We pay schools and suppliers directly.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => (
            <div key={st.number} className="bg-white rounded-2xl p-6 border border-[#e5e0d8] shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-heading font-bold text-2xl text-maroon block mb-3">
                  {st.number}
                </span>
                <h3 className="font-heading font-bold text-lg text-[#1c1c1a] mb-2">
                  {st.title}
                </h3>
                <p className="text-sm text-[#4a4a46] leading-relaxed">
                  {st.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Team Grid: The people behind every outreach (WITH REAL HEADSHOTS) */}
      <section className="relative py-16 sm:py-20 bg-[#f5f1e8] border-t border-[#e5e0d8] overflow-hidden">
        <CurvedWaveBackground side="left" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs uppercase font-bold tracking-widest text-maroon mb-1.5">
                OUR TEAM
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1c1c1a]">
                The people behind every outreach
              </h2>
            </div>
            <button
              onClick={() => handleNav('get-involved', 'get-involved/volunteer')}
              className="text-sm font-semibold text-maroon hover:text-maroon-dark transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Join as a volunteer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
            {team.map((m, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e5e0d8] text-center flex flex-col items-center shadow-xs hover:shadow-md hover:border-[#cfc7b9] transition-all">
                {/* Real Team Photo Avatar */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 border-2 border-white shadow-sm bg-sand relative shrink-0">
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
                    className="w-full h-full bg-sand text-maroon font-heading font-bold text-lg flex items-center justify-center"
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
                {m.badge && (
                  <span className="mt-2 text-[10px] uppercase font-semibold tracking-wider text-forest bg-forest-tint px-2 py-0.5 rounded-full">
                    {m.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Board of Trustees & Registration Box */}
      <section className="py-14 max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#e5e0d8] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="font-heading font-bold text-xl text-[#1c1c1a] mb-2">
              Board of Trustees &amp; Governance
            </h3>
            <p className="text-sm text-[#4a4a46] leading-relaxed">
              Trustees personally fund all operational overhead and administration, ensuring 100% of public contributions reach beneficiaries directly.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 text-sm text-[#4a4a46]">
            <div><strong className="text-[#1c1c1a]">Registered name:</strong> Ten Kind Hands Initiative</div>
            <div><strong className="text-[#1c1c1a]">CAC registration:</strong> RC 7015705</div>
            <div><strong className="text-[#1c1c1a]">Office:</strong> Danglo Plaza 204, 6th Avenue, Gwarinpa, Abuja</div>
            <button
              onClick={() => handleNav('transparency')}
              className="mt-2 text-sm font-semibold text-maroon hover:underline cursor-pointer"
            >
              See our documents and accounts →
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

