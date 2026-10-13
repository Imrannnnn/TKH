import { useData } from '../context/DataContext';
import { Heart, ArrowRight, ShieldCheck, Check } from '../components/Icons';

export default function OurStory({ onOpenDonate, setCurrentPage }) {
  const { storyContent } = useData() || {};

  const handleNav = (pageId, hash = '') => {
    if (setCurrentPage) setCurrentPage(pageId);
    window.location.hash = hash || pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const defaultTeam = [
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

  const leadership =
    storyContent?.leadership && storyContent.leadership.length > 0
      ? storyContent.leadership
      : defaultTeam.slice(0, 5);
  const stateCoordinators =
    storyContent?.stateCoordinators && storyContent.stateCoordinators.length > 0
      ? storyContent.stateCoordinators
      : defaultTeam.slice(5);
  const team = [...leadership, ...stateCoordinators];

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
      title: '7-State Coordination Network',
      detail: 'Monthly outreaches supported by on-the-ground state coordinators across 7 States (FCT, Benue, Katsina, Plateau, Lagos, Oyo, and Enugu).',
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

      {/* 1. Hero */}
      <section className="relative pt-8 sm:pt-14 lg:pt-16 3xl:pt-20 4xl:pt-24 pb-12 sm:pb-16 3xl:pb-20 max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16 overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 3xl:gap-16 items-center">
          <div className="lg:col-span-7 flex flex-col items-start gap-4 3xl:gap-6">
            <span className="text-xs 3xl:text-sm uppercase font-bold tracking-widest text-maroon">
              ABOUT US
            </span>
            <h1 className="font-heading font-bold text-2xl xs:text-3xl sm:text-4xl lg:text-5xl 3xl:text-6xl 4xl:text-7xl leading-[1.12] text-[#1c1c1a]">
              Every child should be able to learn and stay healthy, whatever their family can afford.
            </h1>
            <p className="text-sm sm:text-base lg:text-lg 3xl:text-xl 4xl:text-2xl text-[#4a4a46] leading-relaxed max-w-xl 3xl:max-w-2xl 4xl:max-w-3xl">
              Ten Kind Hands is a Nigerian non-profit working with schools, communities and volunteers to help disadvantaged children, women and families break the cycle of poverty.
            </p>
          </div>

          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-3xl 3xl:rounded-4xl overflow-hidden border border-[#e5e0d8] shadow-md bg-white group">
              <img
                src="/images/food-distribution.jpg"
                alt="Ten Kind Hands team and community families"
                className="w-full h-[260px] xs:h-[320px] sm:h-[380px] 3xl:h-[480px] 4xl:h-[580px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/IMG_0303.JPG';
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-4 3xl:p-6 bg-gradient-to-t from-black/75 via-black/30 to-transparent">
                <span className="text-xs 3xl:text-sm text-white font-medium px-3 py-1 3xl:px-4 3xl:py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 inline-block">
                  Community distribution · On-the-ground team
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Mission & Vision */}
      <section className="py-8 sm:py-10 3xl:py-14 max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 3xl:gap-12">
          {/* Mission: Deep Forest Card */}
          <div className="bg-forest text-white rounded-3xl 3xl:rounded-4xl p-6 sm:p-8 lg:p-10 3xl:p-12 4xl:p-16 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs 3xl:text-sm uppercase tracking-widest text-[#a8d5c4] font-bold block mb-3 3xl:mb-4">
                OUR MISSION
              </span>
              <p className="font-heading font-semibold text-xl sm:text-2xl 3xl:text-3xl 4xl:text-4xl leading-snug">
                To improve the lives of women and children by providing educational opportunities and healthcare services that promote better health outcomes and a brighter future.
              </p>
            </div>
            <div className="pt-6 3xl:pt-8 mt-6 3xl:mt-8 border-t border-white/20 text-xs 3xl:text-sm text-white/80">
              Grassroots Delivery · Direct Giving Model
            </div>
          </div>

          {/* Vision: Clean Light Card */}
          <div className="bg-white border border-[#e5e0d8] rounded-3xl 3xl:rounded-4xl p-6 sm:p-8 lg:p-10 3xl:p-12 4xl:p-16 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs 3xl:text-sm uppercase tracking-widest text-maroon font-bold block mb-3 3xl:mb-4">
                OUR VISION
              </span>
              <p className="font-heading font-semibold text-xl sm:text-2xl 3xl:text-3xl 4xl:text-4xl leading-snug text-[#1c1c1a]">
                A world where every child has access to quality education, and every woman and child has access to comprehensive healthcare.
              </p>
            </div>
            <div className="pt-6 3xl:pt-8 mt-6 3xl:mt-8 border-t border-[#e5e0d8] text-xs 3xl:text-sm text-[#706e68]">
              Dignity · Equity · Sustainable Progress
            </div>
          </div>
        </div>
      </section>

      {/* 3. How We Started (Story + Timeline with Documentary Photos) */}
      <section className="py-14 sm:py-20 3xl:py-24 4xl:py-32 bg-[#f5f1e8] border-y border-[#e5e0d8]">
        <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 3xl:gap-16">
            
            {/* Left Story Column */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl 3xl:text-4xl 4xl:text-5xl text-[#1c1c1a] mb-4 3xl:mb-6">
                  How we started
                </h2>
                <div className="text-sm sm:text-base 3xl:text-lg text-[#4a4a46] space-y-4 3xl:space-y-6 leading-relaxed mb-6 3xl:mb-8">
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
              <div className="rounded-2xl 3xl:rounded-3xl overflow-hidden border border-[#e5e0d8] bg-white shadow-xs">
                <img
                  src="/images/hero-widows-clean-cooking-stoves.webp"
                  alt="Ten Kind Hands field outreach in Dafara"
                  className="w-full h-48 3xl:h-60 4xl:h-72 object-cover object-center"
                />
                <div className="p-3 3xl:p-4 bg-white text-xs 3xl:text-sm text-[#706e68]">
                  Community outreach &amp; eco-clean cookstove distribution in Dafara
                </div>
              </div>
            </div>

            {/* Right Timeline Column with Field Images */}
            <div className="lg:col-span-7 flex flex-col gap-6 3xl:gap-8">
              {timeline.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl 3xl:rounded-3xl p-5 sm:p-6 3xl:p-8 border border-[#e5e0d8] shadow-sm flex flex-col sm:flex-row items-start gap-4 3xl:gap-6">
                  <div className="w-full sm:w-36 3xl:w-44 4xl:w-52 h-28 3xl:h-34 4xl:h-40 shrink-0 rounded-xl 3xl:rounded-2xl overflow-hidden bg-sand border border-[#e5e0d8]">
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
                    <div className="flex items-center gap-2 mb-1 3xl:mb-2">
                      <span className="font-heading font-bold text-maroon text-base 3xl:text-lg">
                        {item.year}
                      </span>
                      <span className="text-[#d0c8bb]">•</span>
                      <h3 className="font-heading font-bold text-base 3xl:text-lg 4xl:text-xl text-[#1c1c1a]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm 3xl:text-base text-[#4a4a46] leading-relaxed mb-2 3xl:mb-3">
                      {item.detail}
                    </p>
                    <span className="text-[11px] 3xl:text-xs text-[#706e68] font-medium block">
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
      <section className="py-14 sm:py-20 3xl:py-24 4xl:py-32 max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16">
        <div className="max-w-2xl 3xl:max-w-4xl mb-12 3xl:mb-16">
          <div className="text-xs 3xl:text-sm uppercase font-bold tracking-widest text-maroon mb-1.5">
            HOW WE WORK
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl 3xl:text-4xl 4xl:text-5xl text-[#1c1c1a]">
            Local people choose who we help. We pay schools and suppliers directly.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 3xl:gap-8 4xl:gap-10">
          {steps.map((st) => (
            <div key={st.number} className="bg-white rounded-2xl 3xl:rounded-3xl p-6 3xl:p-8 border border-[#e5e0d8] shadow-sm flex flex-col justify-between">
              <div>
                <span className="font-heading font-bold text-2xl 3xl:text-3xl text-maroon block mb-3">
                  {st.number}
                </span>
                <h3 className="font-heading font-bold text-lg 3xl:text-xl text-[#1c1c1a] mb-2">
                  {st.title}
                </h3>
                <p className="text-sm 3xl:text-base text-[#4a4a46] leading-relaxed">
                  {st.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Team Grid: The people behind every outreach */}
      <section className="relative py-14 sm:py-20 3xl:py-24 4xl:py-32 bg-[#f5f1e8] border-t border-[#e5e0d8] overflow-hidden">
        <div className="relative z-10 max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 3xl:mb-14">
            <div>
              <div className="text-xs 3xl:text-sm uppercase font-bold tracking-widest text-maroon mb-1.5">
                OUR TEAM
              </div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl 3xl:text-4xl 4xl:text-5xl text-[#1c1c1a]">
                The people behind every outreach
              </h2>
            </div>
            <button
              onClick={() => handleNav('get-involved', 'get-involved/volunteer')}
              className="text-sm 3xl:text-base font-semibold text-maroon hover:text-maroon-dark transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Join as a volunteer</span>
              <ArrowRight className="w-4 h-4 3xl:w-5 3xl:h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 3xl:grid-cols-6 4xl:grid-cols-7 uw:grid-cols-8 gap-3 sm:gap-5 lg:gap-6 3xl:gap-7 4xl:gap-8">
            {team.map((m, idx) => (
              <div key={idx} className="bg-white rounded-2xl 3xl:rounded-3xl p-3 sm:p-5 3xl:p-6 border border-[#e5e0d8] text-center flex flex-col items-center shadow-xs hover:shadow-md hover:border-[#cfc7b9] transition-all">
                {/* Real Team Photo Avatar */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 3xl:w-28 3xl:h-28 rounded-full overflow-hidden mb-2.5 sm:mb-3 3xl:mb-4 border-2 border-white shadow-sm bg-sand relative shrink-0">
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
                    className="w-full h-full bg-sand text-maroon font-heading font-bold text-lg 3xl:text-xl flex items-center justify-center"
                    style={{ display: m.image ? 'none' : 'flex' }}
                  >
                    {m.initials}
                  </div>
                </div>

                <h4 className="font-heading font-bold text-xs sm:text-sm 3xl:text-base text-[#1c1c1a] leading-snug mb-1">
                  {m.name}
                </h4>
                <p className="text-[11px] sm:text-xs 3xl:text-sm text-[#706e68] leading-tight">
                  {m.role}
                </p>
                {m.badge && (
                  <span className="mt-2 text-[10px] 3xl:text-xs uppercase font-semibold tracking-wider text-forest bg-forest-tint px-2 py-0.5 rounded-full">
                    {m.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Board of Trustees & Registration Box */}
      <section className="py-12 sm:py-16 3xl:py-20 max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16">
        <div className="bg-white rounded-3xl 3xl:rounded-4xl p-6 sm:p-8 lg:p-10 3xl:p-12 4xl:p-16 border border-[#e5e0d8] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 3xl:gap-12">
          <div className="max-w-xl 3xl:max-w-2xl">
            <h3 className="font-heading font-bold text-xl 3xl:text-2xl 4xl:text-3xl text-[#1c1c1a] mb-2 3xl:mb-3">
              Board of Trustees &amp; Governance
            </h3>
            <p className="text-sm 3xl:text-base 4xl:text-lg text-[#4a4a46] leading-relaxed">
              Trustees personally fund all operational overhead and administration, ensuring 100% of public contributions reach beneficiaries directly.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 3xl:gap-3 text-sm 3xl:text-base text-[#4a4a46]">
            <div><strong className="text-[#1c1c1a]">Registered name:</strong> Ten Kind Hands Initiative</div>
            <div><strong className="text-[#1c1c1a]">CAC registration:</strong> RC 7015705</div>
            <div><strong className="text-[#1c1c1a]">Office:</strong> Danglo Plaza 204, 6th Avenue, Gwarinpa, Abuja</div>
            <button
              onClick={() => handleNav('transparency')}
              className="mt-2 text-sm 3xl:text-base font-semibold text-maroon hover:underline cursor-pointer"
            >
              See our documents and accounts →
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

