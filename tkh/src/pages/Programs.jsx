import { useState, useEffect } from 'react';
import { School, Stethoscope, BookOpen, Users, Laptop, Heart, ArrowRight, ArrowLeft, Check, Quote } from '../components/Icons';
import CurvedWaveBackground from '../components/CurvedWaveBackground';

const PROGRAMMES = [
  {
    id: 'scholarships',
    pillar: 'education',
    title: 'Scholarships',
    shortDesc: 'School fees, exam registration and uniforms for primary and secondary pupils at risk of dropping out.',
    latestOutreach: 'Aug 2026 · Speech-day scholarships, Jos',
    image: '/images/hero-debate-competition-makurdi.webp',
    unitCost: '₦45,000',
    unitCostLabel: 'One term costs',
    statBeneficiaries: '150+',
    statBeneficiariesLabel: 'Scholars supported',
    statesActive: '5 states',
    statesList: 'FCT Abuja, Benue, Lagos, Oyo and Plateau',
    monthlySuggested: 15000,
    termSuggested: 45000,
    fundedCount: 48,
    targetCount: 60,
    whoItsFor: 'Primary and secondary pupils at serious risk of dropping out because of money — often after a parent dies or loses their income. Active in FCT Abuja, Benue, Lagos, Oyo and Plateau.',
    covers: [
      'Tuition, paid straight to the school',
      'Official exam registration',
      'School uniform',
      'Termly check-ins on attendance and report cards'
    ],
    howItWorks: [
      { step: 'Step 1', title: 'Referral', desc: 'Community leaders and head teachers tell us about children who need help.' },
      { step: 'Step 2', title: 'Home visit', desc: 'We visit the family to confirm the need and record a starting point for the child\'s schoolwork.' },
      { step: 'Step 3', title: 'Direct payment', desc: 'Fees, uniforms and materials are paid directly through the school.' },
      { step: 'Step 4', title: 'Every term', desc: 'We track attendance and report cards to keep each scholar on course.' }
    ],
    story: {
      quote: 'Before Ten Kind Hands stepped in, Amina had missed two consecutive terms after losing her guardian. With full tuition, books and uniform provided, she placed 2nd in her class this July.',
      name: 'Amina (Age 11)',
      location: 'Primary 5 Scholar, Plateau State'
    }
  },
  {
    id: 'school-supplies',
    pillar: 'education',
    title: 'School supplies & learning kits',
    shortDesc: 'Exercise books, writing packs and stationery so no child starts the term empty-handed.',
    latestOutreach: 'May 2026 · 300 pupils across 4 states',
    image: '/images/hero-jambells-school-outreach.webp',
    unitCost: '₦5,000',
    unitCostLabel: 'One kit costs',
    statBeneficiaries: '2,400+',
    statBeneficiariesLabel: 'Pupils equipped',
    statesActive: '5 states',
    statesList: 'FCT Abuja, Benue, Lagos, Oyo and Plateau',
    monthlySuggested: 5000,
    termSuggested: 15000,
    fundedCount: 240,
    targetCount: 300,
    whoItsFor: 'Primary school children in low-income community schools whose parents cannot afford essential stationery, preventing them from participating in daily classwork.',
    covers: [
      'Sets of 10 ruled exercise books',
      'Complete writing pencil cases (biros, pencils, erasers, sharpeners)',
      'Mathematical sets for junior secondary students',
      'School backpacks and water bottles'
    ],
    howItWorks: [
      { step: 'Step 1', title: 'School audit', desc: 'We audit partner community schools before term start to tally unsupplied pupils.' },
      { step: 'Step 2', title: 'Bulk procurement', desc: 'Materials are purchased wholesale straight from manufacturers to maximize donor impact.' },
      { step: 'Step 3', title: 'Assembly', desc: 'Volunteers assemble individualized packs for every registered child.' },
      { step: 'Step 4', title: 'Direct distribution', desc: 'Packs are placed straight into children\'s hands in school assemblies.' }
    ],
    story: {
      quote: 'Having his own exercise books and biros changed Joshua\'s whole demeanor in class. He no longer hides his workbook or hesitates to write notes.',
      name: 'Mr. Emmanuel',
      location: 'Class Teacher, Lagos State'
    }
  },
  {
    id: 'orphanage-outreaches',
    pillar: 'education',
    title: 'Orphanage outreaches',
    shortDesc: 'Food relief, nutritional staples and learning materials for registered children\'s homes.',
    latestOutreach: 'June 2026 · Oyiza Orphanage',
    image: '/images/hero-orphanage-food-educational-support.webp',
    unitCost: '₦25,000',
    unitCostLabel: 'Monthly food basket',
    statBeneficiaries: '4 homes',
    statBeneficiariesLabel: 'Homes supported',
    statesActive: '3 states',
    statesList: 'FCT Abuja, Benue and Lagos',
    monthlySuggested: 25000,
    termSuggested: 75000,
    fundedCount: 32,
    targetCount: 40,
    whoItsFor: 'Vulnerable children living in licensed non-profit orphanage homes that rely on public generosity for daily sustenance and basic schooling.',
    covers: [
      'Essential grains: rice, beans, garri, and cooking oils',
      'Baby formula and pediatric multivitamins',
      'School supplies and exercise books for school-age resident children',
      'Hygiene soap, detergents, and beddings'
    ],
    howItWorks: [
      { step: 'Step 1', title: 'Needs assessment', desc: 'We consult the home administrators for their exact pantry and medical shortages.' },
      { step: 'Step 2', title: 'Food market dispatch', desc: 'Volunteers buy fresh food supplies from local wholesale agricultural markets.' },
      { step: 'Step 3', title: 'Delivery & inspection', desc: 'We deliver all provisions on-site with full delivery receipts.' },
      { step: 'Step 4', title: 'Mentorship hour', desc: 'Our team spends time reading and playing games with the children.' }
    ],
    story: {
      quote: 'Ten Kind Hands has been a dependable rock for our home. The children look forward to every visit with immense gratitude.',
      name: 'Matron Comfort',
      location: 'Oyiza Orphanage'
    }
  },
  {
    id: 'medical-outreaches',
    pillar: 'health',
    title: 'Medical outreaches & malaria prevention',
    shortDesc: 'Treated mosquito nets, rapid tests and supplements for pregnant and nursing mothers, with health education in English and Hausa.',
    latestOutreach: 'Apr 2026 · 130 high-risk mothers, 3 states',
    image: '/images/hero-maternal-health-malaria-prevention.webp',
    unitCost: '₦7,500',
    unitCostLabel: 'Per mother pack',
    statBeneficiaries: '1,200+',
    statBeneficiariesLabel: 'Mothers & infants',
    statesActive: '4 states',
    statesList: 'Abuja, Benue, Lagos, and Plateau',
    monthlySuggested: 7500,
    termSuggested: 22500,
    fundedCount: 110,
    targetCount: 130,
    whoItsFor: 'Expectant mothers, infants, and vulnerable elders in rural settlements without functional primary healthcare centers.',
    covers: [
      'Long-lasting insecticide-treated mosquito nets (LLINs)',
      'Rapid malaria diagnostic testing (RDT) and treatment therapies (ACT)',
      'Prenatal vitamins, iron, and folic acid courses',
      'Health & sanitation workshops in local languages'
    ],
    howItWorks: [
      { step: 'Step 1', title: 'Community mobilization', desc: 'Village criers and nurses invite mothers to the community dispensary.' },
      { step: 'Step 2', title: 'Clinical screening', desc: 'Volunteer nurses run vitals, malaria tests, and health assessments.' },
      { step: 'Step 3', title: 'Prescription & nets', desc: 'Free medication regimens and treated nets distributed on the spot.' },
      { step: 'Step 4', title: 'Follow-up checks', desc: 'Community health workers check back after 30 days.' }
    ],
    story: {
      quote: 'Learning how to properly hang the mosquito net and getting tested on the spot saved my 2-year-old from recurring malaria bouts.',
      name: 'Amina',
      location: 'Nursing Mother, Abata'
    }
  },
  {
    id: 'widows-empowerment',
    pillar: 'livelihoods',
    title: 'Widows & women empowerment',
    shortDesc: 'Fuel-efficient cooking pots, small cash grants and welfare support for widows.',
    latestOutreach: 'Jun 2026 · 80 widows, 20 in each of 4 states',
    image: '/images/hero-widows-clean-cooking-stoves.webp',
    unitCost: '₦20,000',
    unitCostLabel: 'Pot & seed grant',
    statBeneficiaries: '280+',
    statBeneficiariesLabel: 'Widows supported',
    statesActive: '4 states',
    statesList: 'Abuja, Benue, Oyo, and Lagos',
    monthlySuggested: 10000,
    termSuggested: 30000,
    fundedCount: 72,
    targetCount: 80,
    whoItsFor: 'Widows in rural communities caring for children alone, relying on open firewood cooking that harms their lungs and costs precious daily earnings.',
    covers: [
      'Durable, fuel-efficient eco-cooking coal stoves',
      'Direct small livelihood cash grants for micro-trading',
      'Respiratory health and fire-safety home education',
      'Nutritional food welfare bags'
    ],
    howItWorks: [
      { step: 'Step 1', title: 'Women leader referral', desc: 'Local widow welfare associations nominate the most vulnerable families.' },
      { step: 'Step 2', title: 'Home confirmation', desc: 'Our state coordinators visit to confirm domestic situation.' },
      { step: 'Step 3', title: 'Live demonstration', desc: 'Hands-on demonstration on operating and maintaining eco-stoves.' },
      { step: 'Step 4', title: 'Seed disbursement', desc: 'Cash grants provided with clear enterprise targets.' }
    ],
    story: {
      quote: 'I used to spend ₦1,200 every day on wood that filled our room with smoke. The new stove uses one small tin of coal and cooks for two days.',
      name: 'Mama Grace',
      location: 'Widow, Benue State'
    }
  },
  {
    id: 'youth-skills',
    pillar: 'livelihoods',
    title: 'Youth skills & empowerment',
    shortDesc: 'Digital literacy bootcamps and apprenticeships that end in a toolkit — and a shop of their own.',
    latestOutreach: 'Jul 2026 · 2 trained barbers set up with their own shops',
    image: '/images/hero-youth-vocational-shoemaking.webp',
    unitCost: '₦60,000',
    unitCostLabel: 'Training & tool set',
    statBeneficiaries: '345',
    statBeneficiariesLabel: 'Youths trained',
    statesActive: '3 states',
    statesList: 'Lagos, Plateau, and Benue',
    monthlySuggested: 20000,
    termSuggested: 60000,
    fundedCount: 22,
    targetCount: 25,
    whoItsFor: 'Unemployed youths and school leavers without resources for tertiary tuition or trade apprenticeships.',
    covers: [
      'Tuition in 5-week practical bootcamps (Digital skills, shoemaking, barbering, hairdressing)',
      'Starter artisan toolkits (clippers, sewing awls, styling sets)',
      'Business basics and micro-enterprise mentoring',
      'Shop rent support for high-performing graduates'
    ],
    howItWorks: [
      { step: 'Step 1', title: 'Enrollment & vetting', desc: 'Vetting motivated youths with passion for practical enterprise.' },
      { step: 'Step 2', title: 'Hands-on training', desc: 'Intensive practical training led by certified master craftsmen.' },
      { step: 'Step 3', title: 'Toolkit handover', desc: 'Graduates receive brand-new professional equipment.' },
      { step: 'Step 4', title: 'Shop launch', desc: 'We assist with finding and setting up their independent shop space.' }
    ],
    story: {
      quote: 'From being an unpaid apprentice to holding the keys to my own barbershop in Jos — Ten Kind Hands changed my family\'s story forever.',
      name: 'Sunday Peter',
      location: 'Barbershop Owner, Plateau State'
    }
  }
];

export default function Programs({ selectedProgramId, onSelectProgram, onOpenDonate, setCurrentPage }) {
  const [activeTab, setActiveTab] = useState('all');
  const [currentProgId, setCurrentProgId] = useState(selectedProgramId || null);

  useEffect(() => {
    if (selectedProgramId) {
      setCurrentProgId(selectedProgramId);
    }
  }, [selectedProgramId]);

  const selectedProgram = PROGRAMMES.find((p) => p.id === currentProgId);

  const filteredProgrammes = PROGRAMMES.filter((p) => {
    if (activeTab === 'all') return true;
    return p.pillar === activeTab;
  });

  const handleOpenDetail = (id) => {
    setCurrentProgId(id);
    if (onSelectProgram) onSelectProgram(id);
    window.location.hash = `programs/${id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHub = () => {
    setCurrentProgId(null);
    if (onSelectProgram) onSelectProgram(null);
    window.location.hash = 'programs';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (pageId) => {
    if (setCurrentPage) setCurrentPage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // DETAIL VIEW (Artboard 03a Programme Template)
  if (selectedProgram) {
    const fundedPct = Math.min(100, Math.round((selectedProgram.fundedCount / selectedProgram.targetCount) * 100));

    return (
      <div className="relative w-full bg-[#fdfbf7] text-[#1c1c1a] py-8 sm:py-12 overflow-hidden">
        <CurvedWaveBackground side="right" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#706e68] mb-6">
            <button
              onClick={handleBackToHub}
              className="hover:text-maroon transition-colors cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Our work</span>
            </button>
            <span>/</span>
            <span className="text-[#1c1c1a] font-medium">{selectedProgram.title}</span>
          </div>

          {/* Hero Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
            <div className="lg:col-span-7 flex flex-col items-start gap-4">
              <span className="text-xs uppercase font-bold tracking-widest text-maroon">
                {selectedProgram.pillar.toUpperCase()} PROGRAMME
              </span>
              <h1 className="font-heading font-bold text-3xl sm:text-5xl text-[#1c1c1a] leading-tight">
                {selectedProgram.title}
              </h1>
              <p className="text-base sm:text-lg text-[#4a4a46] leading-relaxed max-w-xl">
                {selectedProgram.shortDesc}
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 w-full max-w-md pt-2 pb-2">
                <div className="bg-white rounded-2xl p-4 border border-[#e5e0d8] shadow-sm">
                  <div className="font-heading font-bold text-xl sm:text-2xl text-maroon">
                    {selectedProgram.unitCost}
                  </div>
                  <div className="text-xs text-[#706e68] mt-0.5">{selectedProgram.unitCostLabel}</div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-[#e5e0d8] shadow-sm">
                  <div className="font-heading font-bold text-xl sm:text-2xl text-[#1c1c1a]">
                    {selectedProgram.statBeneficiaries}
                  </div>
                  <div className="text-xs text-[#706e68] mt-0.5">{selectedProgram.statBeneficiariesLabel}</div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-[#e5e0d8] shadow-sm">
                  <div className="font-heading font-bold text-xl sm:text-2xl text-[#1c1c1a]">
                    {selectedProgram.statesActive}
                  </div>
                  <div className="text-xs text-[#706e68] mt-0.5">Active in</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenDonate(selectedProgram.termSuggested)}
                  className="btn-primary px-7 py-3.5 text-base shadow-sm"
                >
                  Sponsor a unit ({selectedProgram.unitCost})
                </button>
                <button
                  onClick={() => onOpenDonate(selectedProgram.monthlySuggested)}
                  className="btn-secondary px-6 py-3.5 text-base"
                >
                  Give ₦{selectedProgram.monthlySuggested.toLocaleString()} a month
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-[#e5e0d8] shadow-md bg-white">
                <img
                  src={selectedProgram.image}
                  alt={selectedProgram.title}
                  className="w-full h-[320px] sm:h-[380px] object-cover object-center"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/IMG_0294.JPG';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Who it's for vs What it covers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 pt-10 border-t border-[#e5e0d8]">
            <div className="bg-white rounded-3xl p-8 border border-[#e5e0d8] shadow-sm">
              <h3 className="font-heading font-bold text-xl text-[#1c1c1a] mb-3">
                Who it's for
              </h3>
              <p className="text-sm sm:text-base text-[#4a4a46] leading-relaxed">
                {selectedProgram.whoItsFor}
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#e5e0d8] shadow-sm">
              <h3 className="font-heading font-bold text-xl text-[#1c1c1a] mb-4">
                What it covers
              </h3>
              <ul className="space-y-3">
                {selectedProgram.covers.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#4a4a46]">
                    <div className="w-5 h-5 rounded-full bg-forest-tint text-forest flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* How it works (4 steps) */}
          <div className="mb-16">
            <h3 className="font-heading font-bold text-2xl text-[#1c1c1a] mb-6">
              How this programme works
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {selectedProgram.howItWorks.map((st, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-[#e5e0d8] shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-maroon block mb-2">
                      {st.step}
                    </span>
                    <h4 className="font-heading font-bold text-base text-[#1c1c1a] mb-2">
                      {st.title}
                    </h4>
                    <p className="text-sm text-[#4a4a46] leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goal Tracker Bar & Scholar Story Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
            {/* Goal Bar Widget (Dark Forest Card) */}
            <div className="lg:col-span-5 bg-forest text-white rounded-3xl p-8 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#a8d5c4] font-bold block mb-2">
                  2026/27 SCHOOL YEAR
                </span>
                <h4 className="font-heading font-bold text-2xl mb-1">
                  {selectedProgram.fundedCount} of {selectedProgram.targetCount} units funded
                </h4>
                <p className="text-xs text-white/80 mb-6">
                  Updated directly by our field operations desk each month.
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-black/30 rounded-full h-3 overflow-hidden mb-2">
                  <div
                    className="bg-[#34d399] h-full rounded-full transition-all duration-700"
                    style={{ width: `${fundedPct}%` }}
                  />
                </div>
                <div className="text-xs text-white/70 text-right font-medium">
                  {fundedPct}% of goal achieved
                </div>
              </div>

              <button
                onClick={() => onOpenDonate()}
                className="mt-6 w-full py-3.5 px-6 rounded-full bg-white text-forest font-heading font-bold text-sm hover:bg-[#f5f1e8] transition-colors cursor-pointer text-center"
              >
                Help fund remaining {selectedProgram.targetCount - selectedProgram.fundedCount} units
              </button>
            </div>

            {/* Real Story Box */}
            <div className="lg:col-span-7 bg-[#f5f1e8] rounded-3xl p-8 border border-[#e5e0d8] flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-maroon font-bold block mb-3">
                  A BENEFICIARY'S STORY
                </span>
                <p className="text-base sm:text-lg text-[#1c1c1a] italic leading-relaxed mb-6 font-serif">
                  "{selectedProgram.story.quote}"
                </p>
              </div>
              <div className="pt-4 border-t border-[#e5e0d8] flex items-center justify-between">
                <div>
                  <h5 className="font-heading font-bold text-sm text-[#1c1c1a]">
                    {selectedProgram.story.name}
                  </h5>
                  <p className="text-xs text-[#706e68]">
                    {selectedProgram.story.location}
                  </p>
                </div>
                <span className="text-[11px] text-[#706e68] italic">
                  Shared with guardian consent
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Back Button */}
          <div className="pt-6 border-t border-[#e5e0d8] flex justify-between items-center">
            <button
              onClick={handleBackToHub}
              className="btn-secondary px-6 py-2.5 text-sm inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all programmes</span>
            </button>
            <button
              onClick={() => handleNav('outreaches')}
              className="text-sm font-semibold text-maroon hover:underline"
            >
              View field reports for this programme →
            </button>
          </div>

        </div>
      </div>
    );
  }

  // HUB VIEW (Artboard 03 · Our work)
  return (
    <div className="relative w-full bg-[#fdfbf7] text-[#1c1c1a] py-10 sm:py-16 overflow-hidden">
      <CurvedWaveBackground side="right" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-maroon block mb-2">
            OUR WORK
          </span>
          <h1 className="font-heading font-bold text-3xl sm:text-5xl text-[#1c1c1a] mb-3">
            Six programmes. Three goals.
          </h1>
          <p className="text-base sm:text-lg text-[#4a4a46] leading-relaxed">
            Children who learn, mothers and children who stay healthy, and families who can earn a living. Each programme lists its most recent outreach, pulled directly from our field dispatches.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-6">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-maroon text-white shadow-sm'
                  : 'bg-white border border-[#e5e0d8] text-[#4a4a46] hover:bg-[#f5f1e8]'
              }`}
            >
              All programmes
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'education'
                  ? 'bg-maroon text-white shadow-sm'
                  : 'bg-white border border-[#e5e0d8] text-[#4a4a46] hover:bg-[#f5f1e8]'
              }`}
            >
              Education
            </button>
            <button
              onClick={() => setActiveTab('health')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'health'
                  ? 'bg-forest text-white shadow-sm'
                  : 'bg-white border border-[#e5e0d8] text-[#4a4a46] hover:bg-[#f5f1e8]'
              }`}
            >
              Health
            </button>
            <button
              onClick={() => setActiveTab('livelihoods')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'livelihoods'
                  ? 'bg-ochre text-white shadow-sm'
                  : 'bg-white border border-[#e5e0d8] text-[#4a4a46] hover:bg-[#f5f1e8]'
              }`}
            >
              Livelihoods
            </button>
          </div>
        </div>

        {/* 1. Education Section */}
        {(activeTab === 'all' || activeTab === 'education') && (
          <div className="mb-14">
            <div className="mb-6">
              <h2 className="font-heading font-bold text-2xl text-[#1c1c1a]">
                Education
              </h2>
              <p className="text-sm text-[#706e68]">
                Getting children into school and keeping them there.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROGRAMMES.filter((p) => p.pillar === 'education').map((prog) => (
                <div
                  key={prog.id}
                  className="bg-white rounded-3xl border border-[#e5e0d8] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/IMG_0294.JPG';
                      }}
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-heading font-bold text-lg text-[#1c1c1a] mb-2">
                        {prog.title}
                      </h3>
                      <p className="text-sm text-[#4a4a46] leading-relaxed mb-4">
                        {prog.shortDesc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#e5e0d8]">
                      <div className="text-xs text-[#706e68] mb-3">
                        <span className="font-semibold text-[#1c1c1a]">LATEST OUTREACH:</span> {prog.latestOutreach}
                      </div>
                      <button
                        onClick={() => handleOpenDetail(prog.id)}
                        className="text-sm font-semibold text-maroon hover:text-maroon-dark inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>See how it works</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Health Section */}
        {(activeTab === 'all' || activeTab === 'health') && (
          <div className="mb-14">
            <div className="mb-6">
              <h2 className="font-heading font-bold text-2xl text-[#1c1c1a]">
                Health
              </h2>
              <p className="text-sm text-[#706e68]">
                Healthy mothers and children who can stay in school.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROGRAMMES.filter((p) => p.pillar === 'health').map((prog) => (
                <div
                  key={prog.id}
                  className="bg-white rounded-3xl border border-[#e5e0d8] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between md:col-span-2"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                    <div className="lg:col-span-7 h-64 sm:h-80 overflow-hidden bg-gray-100">
                      <img
                        src={prog.image}
                        alt={prog.title}
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/11222.webp';
                        }}
                      />
                    </div>
                    <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        <span className="text-xs uppercase font-bold tracking-widest text-forest block mb-2">
                          Maternal &amp; Pediatric Care
                        </span>
                        <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#1c1c1a] mb-3">
                          {prog.title}
                        </h3>
                        <p className="text-sm text-[#4a4a46] leading-relaxed mb-6">
                          {prog.shortDesc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#e5e0d8]">
                        <div className="text-xs text-[#706e68] mb-3">
                          <span className="font-semibold text-[#1c1c1a]">LATEST OUTREACH:</span> {prog.latestOutreach}
                        </div>
                        <button
                          onClick={() => handleOpenDetail(prog.id)}
                          className="btn-primary px-6 py-2.5 text-sm inline-flex items-center gap-1.5"
                        >
                          <span>Explore programme</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Livelihoods Section */}
        {(activeTab === 'all' || activeTab === 'livelihoods') && (
          <div className="mb-14">
            <div className="mb-6">
              <h2 className="font-heading font-bold text-2xl text-[#1c1c1a]">
                Livelihoods
              </h2>
              <p className="text-sm text-[#706e68]">
                Skills and tools so families can earn.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROGRAMMES.filter((p) => p.pillar === 'livelihoods').map((prog) => (
                <div
                  key={prog.id}
                  className="bg-white rounded-3xl border border-[#e5e0d8] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="h-56 overflow-hidden bg-gray-100">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/IMG_0995.webp';
                      }}
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-heading font-bold text-lg text-[#1c1c1a] mb-2">
                        {prog.title}
                      </h3>
                      <p className="text-sm text-[#4a4a46] leading-relaxed mb-4">
                        {prog.shortDesc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#e5e0d8]">
                      <div className="text-xs text-[#706e68] mb-3">
                        <span className="font-semibold text-[#1c1c1a]">LATEST OUTREACH:</span> {prog.latestOutreach}
                      </div>
                      <button
                        onClick={() => handleOpenDetail(prog.id)}
                        className="text-sm font-semibold text-ochre hover:text-[#915610] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>See how it works</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Callout Band: Not sure which to support? */}
        <div className="bg-[#1c1c1a] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-1">
              Not sure which to support?
            </h3>
            <p className="text-sm text-white/70">
              Give to "where it's needed most" and we put it into the next planned outreach.
            </p>
          </div>
          <button
            onClick={() => onOpenDonate()}
            className="px-7 py-3.5 rounded-full bg-white text-[#1c1c1a] font-heading font-bold text-sm hover:bg-[#f5f1e8] transition-colors cursor-pointer shrink-0 shadow-sm"
          >
            Give where it's needed most
          </button>
        </div>

      </div>
    </div>
  );
}
