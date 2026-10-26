import { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  HeartPulse, 
  Wrench, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  X, 
  Quote 
} from '../components/Icons';
import { useData } from '../context/DataContext';

export const PROGRAMMES = [
  {
    id: 'scholarships',
    pillar: 'education',
    title: 'Scholarships',
    shortDesc: 'School fees, exam registration and uniforms for primary and secondary pupils at risk of dropping out.',
    image: '/images/hero-debate-competition-makurdi.webp',
    unitCost: '₦45,000',
    unitCostLabel: 'One term costs',
    statBeneficiaries: '200+',
    statBeneficiariesLabel: 'Scholars supported',
    statesActive: '7 states',
    statesList: 'FCT, Benue, Katsina, Plateau, Lagos, Oyo and Enugu',
    monthlySuggested: 15000,
    termSuggested: 45000,
    fundedCount: 48,
    targetCount: 60,
    whoItsFor: 'Primary and secondary pupils at serious risk of dropping out because of money — often after a parent dies or loses their income. Active across 7 states in Nigeria.',
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
    image: '/images/hero-jambells-school-outreach.webp',
    unitCost: '₦5,000',
    unitCostLabel: 'One kit costs',
    statBeneficiaries: '2,400+',
    statBeneficiariesLabel: 'Pupils equipped',
    statesActive: '7 states',
    statesList: 'FCT, Benue, Katsina, Plateau, Lagos, Oyo and Enugu',
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
    image: '/images/hero-orphanage-food-educational-support.webp',
    unitCost: '₦25,000',
    unitCostLabel: 'Monthly food basket',
    statBeneficiaries: '4 homes',
    statBeneficiariesLabel: 'Homes supported',
    statesActive: '3 states',
    statesList: 'FCT Abuja, Benue and Plateau',
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
      location: 'Abba Father Rich Orphanage Home'
    }
  },
  {
    id: 'medical-outreaches',
    pillar: 'health',
    title: 'Medical outreaches & malaria prevention',
    shortDesc: 'Treated mosquito nets, rapid tests and supplements for pregnant and nursing mothers, with health education in English and Hausa.',
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
    shortDesc: 'Digital literacy bootcamps and apprenticeships that end in a toolkit, and a shop of their own.',
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

export function getProgramLatestOutreach(progId, outreaches = []) {
  const completed = (outreaches || []).filter((o) => o.status === 'completed');

  if (progId === 'orphanage-outreaches') {
    const match = completed.find(
      (o) =>
        o.id.includes('orphanage') ||
        o.title?.toLowerCase().includes('orphanage') ||
        o.theme?.toLowerCase().includes('orphan')
    );
    if (match) {
      return {
        dateLabel: 'SEP 2026',
        summary: 'Abba Father Rich Orphanage Home, Plateau State'
      };
    }
  }

  if (progId === 'scholarships') {
    const match = completed.find(
      (o) =>
        o.title?.toLowerCase().includes('scholarship') ||
        o.deployments?.some((d) => d.activity?.toLowerCase().includes('scholarship'))
    );
    if (match) {
      return {
        dateLabel: 'AUG 2026',
        summary: 'Speech-day scholarships, Jos'
      };
    }
  }

  if (progId === 'school-supplies') {
    const match = completed.find(
      (o) =>
        o.title?.toLowerCase().includes('academic materials') ||
        o.theme?.toLowerCase().includes('learning resource') ||
        o.deployments?.some((d) => d.activity?.toLowerCase().includes('exercise books'))
    );
    if (match) {
      return {
        dateLabel: 'MAY 2026',
        summary: '300 pupils across 4 states'
      };
    }
  }

  if (progId === 'medical-outreaches') {
    const match = completed.find(
      (o) =>
        o.title?.toLowerCase().includes('malaria') ||
        o.theme?.toLowerCase().includes('malaria') ||
        o.pillar?.toLowerCase().includes('health')
    );
    if (match) {
      return {
        dateLabel: 'APR 2026',
        summary: '130 high-risk mothers, 3 states'
      };
    }
  }

  if (progId === 'widows-empowerment') {
    const match = completed.find(
      (o) =>
        o.title?.toLowerCase().includes('widow') ||
        o.pillar?.toLowerCase().includes('women')
    );
    if (match) {
      return {
        dateLabel: 'JUN 2026',
        summary: '80 widows, 20 in each of 4 states'
      };
    }
  }

  if (progId === 'youth-skills') {
    const match = completed.find(
      (o) =>
        o.title?.toLowerCase().includes('entrepreneurship') ||
        o.theme?.toLowerCase().includes('barbershop') ||
        o.title?.toLowerCase().includes('youth skills')
    );
    if (match) {
      return {
        dateLabel: 'JUL 2026',
        summary: '2 trained barbers set up with their own shops'
      };
    }
  }

  return {
    dateLabel: 'RECENT',
    summary: 'Direct field delivery'
  };
}

export default function Programs({ selectedProgramId, onSelectProgram, onOpenDonate, setCurrentPage }) {
  const { outreaches } = useData();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeModalProgram, setActiveModalProgram] = useState(null);

  useEffect(() => {
    if (selectedProgramId) {
      const match = PROGRAMMES.find((p) => p.id === selectedProgramId);
      if (match) {
        setActiveModalProgram(match);
      }
    }
  }, [selectedProgramId]);

  const handleFilterSelect = (filterKey) => {
    setActiveFilter(filterKey);
    setTimeout(() => {
      const el = document.getElementById('programmes-grid');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleOpenDetail = (progId) => {
    const prog = PROGRAMMES.find((p) => p.id === progId);
    if (prog) {
      setActiveModalProgram(prog);
      if (onSelectProgram) onSelectProgram(progId);
      window.location.hash = `programs/${progId}`;
    }
  };

  const handleCloseDetail = () => {
    setActiveModalProgram(null);
    if (onSelectProgram) onSelectProgram(null);
    window.location.hash = 'programs';
  };

  const handleNav = (pageId) => {
    if (setCurrentPage) setCurrentPage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProgrammes = PROGRAMMES.filter((p) => {
    if (activeFilter === 'all') return true;
    return p.pillar === activeFilter;
  });

  return (
    <div className="relative w-full bg-[#fdfbf7] text-[#1c1c1a] overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="pt-10 sm:pt-16 pb-12 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Text, CTAs, Stats */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7a1b1b] mb-3 sm:mb-4">
              OUR WORK
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-stone-900 tracking-tight leading-[1.1] mb-5">
              Where your gift goes to work.
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed mb-8 max-w-xl">
              Six programmes across education, health and livelihoods. Each one is delivered in person by our state coordinators and reported publicly after every outreach.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-10 sm:mb-12">
              <button
                onClick={() => {
                  const el = document.getElementById('programmes-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="bg-[#7a1b1b] hover:bg-[#621616] text-white text-sm sm:text-base font-semibold px-6 py-3.5 rounded-full transition-colors shadow-sm cursor-pointer"
              >
                Explore the programmes
              </button>
              <button
                onClick={() => handleNav('outreaches')}
                className="border border-stone-300 hover:border-stone-400 bg-white hover:bg-stone-50 text-stone-800 text-sm sm:text-base font-semibold px-6 py-3.5 rounded-full transition-colors shadow-sm cursor-pointer"
              >
                Read field reports
              </button>
            </div>

            {/* Simple Facts Row */}
            <div className="grid grid-cols-3 gap-6 sm:gap-10 border-t border-stone-200/80 pt-8 w-full max-w-md">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-stone-900">3</div>
                <div className="text-xs sm:text-sm text-stone-500 font-medium mt-1">focus areas</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-stone-900">6</div>
                <div className="text-xs sm:text-sm text-stone-500 font-medium mt-1">programmes</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-stone-900">7</div>
                <div className="text-xs sm:text-sm text-stone-500 font-medium mt-1">states reached</div>
              </div>
            </div>
          </div>

          {/* Right Column: Three-photo collage */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5 sm:gap-4 h-[380px] sm:h-[450px]">
            {/* Left Tall Photo: Education */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-full shadow-sm bg-stone-100">
              <img
                src="/images/hero-debate-competition-makurdi.webp"
                alt="Education programme: debate competition Makurdi"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/IMG_0294.JPG';
                }}
              />
            </div>
            {/* Right Stacked Photos: Health (top) and Livelihoods (bottom) */}
            <div className="grid grid-rows-2 gap-3.5 sm:gap-4 h-full">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm bg-stone-100">
                <img
                  src="/images/hero-maternal-health-malaria-prevention.webp"
                  alt="Health programme: maternal health and malaria prevention"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/11222.jpeg';
                  }}
                />
              </div>
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm bg-stone-100">
                <img
                  src="/images/hero-widows-clean-cooking-stoves.webp"
                  alt="Livelihoods programme: widows eco-cooking stoves"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/IMG_0995.JPG';
                  }}
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THREE FOCUS AREAS SECTION */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-200/60">
        <div className="mb-8 sm:mb-10">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7a1b1b] mb-2 block">
            THREE FOCUS AREAS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Children who learn. Mothers who stay healthy. Families who earn.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Panel 1: Education (Maroon) */}
          <div
            onClick={() => handleFilterSelect('education')}
            className="bg-[#7a1b1b] hover:bg-[#6f1818] rounded-3xl p-7 sm:p-8 text-white flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-md transition-all group min-h-[300px]"
          >
            <div>
              <div className="bg-white/15 p-3 rounded-2xl w-fit mb-6">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Education</h3>
              <p className="text-white/90 text-sm leading-relaxed mb-6">
                Getting children into school and keeping them there.
              </p>
            </div>
            <div>
              <div className="border-t border-white/20 pt-4 mb-4">
                <p className="text-white/80 text-xs leading-relaxed">
                  Scholarships · School supplies &amp; learning kits · Orphanage outreaches
                </p>
              </div>
              <span className="text-white text-sm font-semibold underline underline-offset-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                See education programmes →
              </span>
            </div>
          </div>

          {/* Panel 2: Health (Green) */}
          <div
            onClick={() => handleFilterSelect('health')}
            className="bg-[#1b4d3e] hover:bg-[#164033] rounded-3xl p-7 sm:p-8 text-white flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-md transition-all group min-h-[300px]"
          >
            <div>
              <div className="bg-white/15 p-3 rounded-2xl w-fit mb-6">
                <HeartPulse className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Health</h3>
              <p className="text-white/90 text-sm leading-relaxed mb-6">
                Healthy mothers, and children well enough to stay in school.
              </p>
            </div>
            <div>
              <div className="border-t border-white/20 pt-4 mb-4">
                <p className="text-white/80 text-xs leading-relaxed">
                  Medical outreaches &amp; malaria prevention
                </p>
              </div>
              <span className="text-white text-sm font-semibold underline underline-offset-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                See health programmes →
              </span>
            </div>
          </div>

          {/* Panel 3: Livelihoods (Amber) */}
          <div
            onClick={() => handleFilterSelect('livelihoods')}
            className="bg-[#8c5310] hover:bg-[#7b490e] rounded-3xl p-7 sm:p-8 text-white flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-md transition-all group min-h-[300px]"
          >
            <div>
              <div className="bg-white/15 p-3 rounded-2xl w-fit mb-6">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Livelihoods</h3>
              <p className="text-white/90 text-sm leading-relaxed mb-6">
                Skills and tools so families can earn a living.
              </p>
            </div>
            <div>
              <div className="border-t border-white/20 pt-4 mb-4">
                <p className="text-white/80 text-xs leading-relaxed">
                  Widows &amp; women empowerment · Youth skills &amp; empowerment
                </p>
              </div>
              <span className="text-white text-sm font-semibold underline underline-offset-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                See livelihoods programmes →
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. PROGRAMMES GRID SECTION */}
      <section id="programmes-grid" className="scroll-mt-24 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-200/60">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7a1b1b] mb-2 block">
              OUR PROGRAMMES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Choose a programme to support
            </h2>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'education', label: 'Education' },
              { id: 'health', label: 'Health' },
              { id: 'livelihoods', label: 'Livelihoods' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? tab.id === 'education'
                      ? 'bg-[#7a1b1b] text-white shadow-sm'
                      : tab.id === 'health'
                      ? 'bg-[#1b4d3e] text-white shadow-sm'
                      : tab.id === 'livelihoods'
                      ? 'bg-[#8c5310] text-white shadow-sm'
                      : 'bg-[#7a1b1b] text-white shadow-sm'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200/70'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Identical Cards in an Even Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProgrammes.map((prog) => {
            const latest = getProgramLatestOutreach(prog.id, outreaches);
            const badgeColor =
              prog.pillar === 'education'
                ? 'bg-[#7a1b1b]'
                : prog.pillar === 'health'
                ? 'bg-[#1b4d3e]'
                : 'bg-[#8c5310]';

            return (
              <div
                key={prog.id}
                className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Photo with Pillar Badge */}
                <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-stone-100">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/IMG_0294.JPG';
                    }}
                  />
                  <span
                    className={`absolute top-4 left-4 ${badgeColor} text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm`}
                  >
                    {prog.pillar.toUpperCase()}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 mb-2.5 leading-snug">
                      {prog.title}
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed mb-6">
                      {prog.shortDesc}
                    </p>
                  </div>

                  <div>
                    {/* Latest Outreach Box */}
                    <div className="bg-[#f7f5f0] rounded-2xl p-4 mb-6 border border-stone-200/60">
                      <div className="text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-1">
                        LATEST OUTREACH · {latest.dateLabel}
                      </div>
                      <div className="text-stone-900 text-sm font-medium">
                        {latest.summary}
                      </div>
                    </div>

                    {/* Action Buttons: identical on every card */}
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <button
                        onClick={() => handleOpenDetail(prog.id)}
                        className="text-sm font-semibold text-[#7a1b1b] hover:text-[#5a1313] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>See how it works</span>
                        <span>→</span>
                      </button>
                      <button
                        onClick={() => onOpenDonate(prog.termSuggested || null)}
                        className="bg-[#1c1c1a] hover:bg-black text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors cursor-pointer shadow-sm"
                      >
                        Fund this
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. CLOSING BAND */}
      <section className="py-8 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#7a1b1b] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 shadow-sm">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
              Not sure which to support?
            </h3>
            <p className="text-white/90 text-sm sm:text-base max-w-xl leading-relaxed">
              Give to "where it's needed most" and we'll put it into the next planned outreach. You'll see exactly where it went in the field report.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenDonate()}
              className="bg-white hover:bg-stone-100 text-stone-900 font-semibold px-6 py-3.5 rounded-full transition-colors shadow-sm text-sm sm:text-base whitespace-nowrap cursor-pointer"
            >
              Give where it's needed most
            </button>
            <button
              onClick={() => onOpenDonate(null, 'monthly')}
              className="border border-white/60 hover:bg-white/10 text-white font-semibold px-6 py-3.5 rounded-full transition-colors shadow-sm text-sm sm:text-base whitespace-nowrap cursor-pointer"
            >
              Give monthly
            </button>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE DETAIL MODAL ("See how it works") */}
      {activeModalProgram && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in"
          onClick={handleCloseDetail}
        >
          <div
            className="bg-[#fdfbf7] text-[#1c1c1a] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#fdfbf7]/95 backdrop-blur-md z-10 px-6 sm:px-8 py-5 border-b border-stone-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white ${
                    activeModalProgram.pillar === 'education'
                      ? 'bg-[#7a1b1b]'
                      : activeModalProgram.pillar === 'health'
                      ? 'bg-[#1b4d3e]'
                      : 'bg-[#8c5310]'
                  }`}
                >
                  {activeModalProgram.pillar.toUpperCase()} PROGRAMME
                </span>
                <span className="text-xs text-stone-500 font-medium hidden sm:inline">
                  Active in {activeModalProgram.statesActive}
                </span>
              </div>
              <button
                onClick={handleCloseDetail}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8">
              
              {/* Title & Short Description */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
                  {activeModalProgram.title}
                </h2>
                <p className="text-stone-600 text-base leading-relaxed">
                  {activeModalProgram.shortDesc}
                </p>
              </div>

              {/* Stats Chips */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm text-center">
                  <div className="text-lg sm:text-xl font-bold text-[#7a1b1b]">
                    {activeModalProgram.unitCost}
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    {activeModalProgram.unitCostLabel}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm text-center">
                  <div className="text-lg sm:text-xl font-bold text-stone-900">
                    {activeModalProgram.statBeneficiaries}
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    {activeModalProgram.statBeneficiariesLabel}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm text-center">
                  <div className="text-lg sm:text-xl font-bold text-stone-900">
                    {activeModalProgram.statesActive}
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    Active coverage
                  </div>
                </div>
              </div>

              {/* Photo */}
              <div className="rounded-2xl overflow-hidden h-56 sm:h-64 bg-stone-100 border border-stone-200">
                <img
                  src={activeModalProgram.image}
                  alt={activeModalProgram.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Who it's for & What it covers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="bg-white rounded-2xl p-5 border border-stone-200">
                  <h4 className="font-bold text-stone-900 text-base mb-2">
                    Who it's for
                  </h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {activeModalProgram.whoItsFor}
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-stone-200">
                  <h4 className="font-bold text-stone-900 text-base mb-3">
                    What it covers
                  </h4>
                  <ul className="space-y-2">
                    {activeModalProgram.covers.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-stone-700">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* How it works (4 steps) */}
              <div>
                <h4 className="font-bold text-stone-900 text-lg mb-4">
                  How this programme works
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {activeModalProgram.howItWorks.map((st, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-4 border border-stone-200">
                      <span className="text-[11px] uppercase font-bold tracking-wider text-[#7a1b1b] block mb-1">
                        {st.step}
                      </span>
                      <h5 className="font-bold text-sm text-stone-900 mb-1">
                        {st.title}
                      </h5>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {st.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Beneficiary Story */}
              <div className="bg-[#f5f1e8] rounded-2xl p-6 border border-stone-200">
                <span className="text-[11px] uppercase font-bold tracking-widest text-[#7a1b1b] block mb-2">
                  A BENEFICIARY'S STORY
                </span>
                <p className="text-stone-800 italic text-sm sm:text-base leading-relaxed mb-4">
                  "{activeModalProgram.story.quote}"
                </p>
                <div className="flex items-center justify-between text-xs text-stone-600 pt-2 border-t border-stone-300/60">
                  <div>
                    <span className="font-bold text-stone-900">{activeModalProgram.story.name}</span> · {activeModalProgram.story.location}
                  </div>
                  <span className="italic text-[11px] text-stone-500">
                    Shared with guardian consent
                  </span>
                </div>
              </div>

              {/* Modal CTA Buttons */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  onClick={() => {
                    handleCloseDetail();
                    onOpenDonate(activeModalProgram.termSuggested || null);
                  }}
                  className="bg-[#7a1b1b] hover:bg-[#621616] text-white font-semibold px-6 py-3.5 rounded-full transition-colors text-center shadow-sm cursor-pointer"
                >
                  Fund this programme ({activeModalProgram.unitCost})
                </button>
                <button
                  onClick={() => {
                    handleCloseDetail();
                    handleNav('outreaches');
                  }}
                  className="text-sm font-semibold text-stone-700 hover:text-stone-900 hover:underline text-center cursor-pointer py-2"
                >
                  View field reports for this programme →
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
