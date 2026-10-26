import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { ArrowRight, ArrowLeft, Check, Calendar, MapPin, Users, Heart, Mail } from '../components/Icons';

export const ALL_FIELD_REPORTS = [
  {
    id: 'outreach-sep-2026-pad-bank',
    pillar: 'health',
    month: 'September 2026',
    dateRange: '20 September 2026',
    title: 'Pad A Girl Child Outreach & Pad Bank Launch',
    location: 'GGSS Dutse Alhaji, Abuja',
    beneficiaries: '384 students reached · 72 pads in pad bank',
    beneficiariesCount: '384',
    totalCost: '₦1,274,000',
    image: '/images/pad-a-girl-child-outreach-abuja.jpg',
    summary: 'The FCT team carried out the Pad A Girl Child outreach and mounted the permanent “PAD BANK” in the school clinic, educated students on menstrual hygiene, and distributed 384 sanitary pads with 72 reserved in the dispensary.',
    whyWeDidIt: 'Period poverty and inadequate menstrual hygiene education severely undermine the dignity, health, and academic consistency of young girls across Nigerian secondary schools. Many students are forced to stay home during their menstrual cycles or resort to unhygienic alternatives. By distributing sanitary pads directly, establishing a monitored emergency "PAD BANK" in the school clinic under the care of the Health mistress, and conducting an open educational workshop, we empower girls to stay healthy, confident, and in class.',
    deliverables: [
      { title: '384 Sanitary Pads Reached', desc: 'Direct distribution of quality sanitary pads to 384 female students across secondary classes.' },
      { title: 'School Clinic "PAD BANK" Mounted', desc: 'Installed a permanent emergency sanitary pad dispensary in the school clinic, managed by the Health mistress.' },
      { title: '72 Reserve Emergency Pads', desc: 'Reserved 72 pieces in the Pad Bank inventory to guarantee immediate access whenever sudden cycles begin during school hours.' },
      { title: 'Menstrual Hygiene Education', desc: 'Interactive workshop educating students on menstrual hygiene and reproductive health, with a comprehensive Q&A section.' }
    ],
    costBreakdown: [
      { item: 'Sanitary pads procurement (456 units: 384 direct + 72 pad bank)', qty: '456 packs', cost: '₦684,000' },
      { item: 'School clinic PAD BANK cabinet, mounting & dispensary lockup', qty: '1 unit', cost: '₦250,000' },
      { item: 'Menstrual hygiene visual charts, flyers & educational literature', qty: '400 copies', cost: '₦160,000' },
      { item: 'FCT volunteer field coordination, school logistics & refreshments', qty: 'FCT team', cost: '₦180,000' }
    ],
    totalSpent: '₦1,274,000'
  },
  {
    id: 'outreach-sep-2026-orphanage',
    pillar: 'education',
    month: 'September 2026',
    dateRange: '15 September 2026',
    title: 'Abba Father Rich Orphanage Home Outreach: Welfare & Educational Support',
    location: 'Plateau State',
    beneficiaries: '100+ children & orphans',
    beneficiariesCount: '100+',
    totalCost: '₦2,100,000',
    image: '/images/abba-father-orphanage-sep-2026.jpg',
    summary: 'Outreach visit to Abba Father Rich Orphanage Home in Plateau State to provide essential materials for the children\'s welfare and education alongside nutritional food supplies.',
    whyWeDidIt: 'Orphaned and vulnerable children living in residential care homes often experience acute gaps in nutritional provisions, educational supplies, and emotional mentorship. Without steady external support, homes struggle to sustain basic welfare and schooling needs simultaneously. Our outreach visit was carried out to demonstrate unconditional love and provide essential materials supporting both daily well-being and academic pursuits.',
    deliverables: [
      { title: 'Educational Materials & Stationery', desc: 'Distributed exercise books, writing pads, pens, pencils, sharpeners, and learning packs to equip the children for the school term.' },
      { title: 'Nutritional Food Provisions', desc: 'Donated essential food relief including rice, semovita, noodles, cooking oil, seasonings, and beverages for resident meals.' },
      { title: 'Children Welfare & Hygiene Kits', desc: 'Provided personal care items, bathing soaps, toothpaste, detergents, and everyday clothing essentials for resident orphans.' },
      { title: 'Mentorship & Fellowship Session', desc: 'Engaged the children with encouraging words, academic counseling, interactive fellowship, and games.' }
    ],
    costBreakdown: [
      { item: 'Bulk food relief provisions & nutritional staples', qty: 'Bulk provisions', cost: '₦850,000' },
      { item: 'Educational materials, school notebooks & stationery kits', qty: '100+ kits', cost: '₦650,000' },
      { item: 'Children clothing essentials, toiletries & welfare supplies', qty: '100+ sets', cost: '₦420,000' },
      { item: 'Interstate logistics, vehicle transit & distribution setup', qty: 'Plateau mission', cost: '₦180,000' }
    ],
    totalSpent: '₦2,100,000'
  },
  {
    id: 'outreach-aug-2026',
    pillar: 'education',
    month: 'August 2026',
    dateRange: '1–24 August 2026',
    title: 'Youth Skills, Digital Literacy & Academic Outreach',
    location: 'Lagos, Plateau, Benue & FCT Abuja',
    beneficiaries: '345 youths & students',
    beneficiariesCount: '345',
    totalCost: '₦4,850,000',
    image: '/images/IMG_0294.JPG',
    summary: 'A 5-week youth tech lab in Ikorodu, speech-day scholarships in Jos, primary school learning kits, and shoemaking and hairdressing starter toolkits.',
    whyWeDidIt: 'Youth unemployment and educational attrition compound rapidly when secondary school leavers lack digital fluency and vocational trade skills. By providing direct tuition scholarships and hands-on vocational toolkits simultaneously, we open sustainable pathways to economic independence.',
    deliverables: [
      { title: '30 Tech Lab Students', desc: '5-week intensive computer literacy bootcamp in Ikorodu with certified instructors.' },
      { title: '102 Primary Scholars', desc: 'Tuition scholarships and academic prize packs awarded at Beckwin International School, Jos.' },
      { title: '200 Learning Packs', desc: 'Exercise books, pencils, and mathematical sets placed directly in students\' hands in Plateau.' },
      { title: '13 Trade Apprentices', desc: 'Shoemaking and hairdressing toolkits provided for young adults entering self-reliant enterprise.' }
    ],
    costBreakdown: [
      { item: 'Computer lab workstation licensing & setup', qty: '1 lab', cost: '₦1,450,000' },
      { item: 'Speech-day tuition scholarships (Beckwin Jos)', qty: '10 scholars', cost: '₦900,000' },
      { item: 'Exercise books & stationery learning packs', qty: '200 packs', cost: '₦1,100,000' },
      { item: 'Vocational trade kits (shoemaking & hairdressing)', qty: '13 sets', cost: '₦850,000' },
      { item: 'Interstate logistics & field coordinator transport', qty: '4 states', cost: '₦550,000' }
    ],
    totalSpent: '₦4,850,000'
  },
  {
    id: 'outreach-jul-2026',
    pillar: 'livelihoods',
    month: 'July 2026',
    dateRange: '4–20 July 2026',
    title: 'From Apprentice to Owner: Two Barbershops Opened',
    location: 'Jos & Makurdi (Plateau & Benue)',
    beneficiaries: '2 young people in business',
    beneficiariesCount: '2',
    totalCost: '₦1,920,000',
    image: '/images/hero-youth-vocational-shoemaking.webp',
    summary: 'Two young people trained in 2025 now run their own shops — rent, commercial fit-out, wiring and professional tools all covered.',
    whyWeDidIt: 'Completing a vocational apprenticeship often ends in disappointment if the young craftsman lacks capital to purchase clippers or rent a salon cubicle. This outreach bridged the crucial capital gap, transitioning apprentices into autonomous business owners.',
    deliverables: [
      { title: '2 Barbershops Fitted', desc: '12-month commercial premises leases fully paid in Jos and Makurdi commercial districts.' },
      { title: 'Professional Equipment', desc: 'Cordless heavy-duty hair clippers, sterilizing cabinets, salon chairs, and mirrors.' },
      { title: 'Solar Inverter Power', desc: 'Clean backup battery power installed to ensure unhindered operations during grid outages.' },
      { title: 'Financial Mentorship', desc: 'Basic bookkeeping ledger and opening inventory supplies provided.' }
    ],
    costBreakdown: [
      { item: 'Commercial shop annual leases (Jos & Makurdi)', qty: '2 shops', cost: '₦960,000' },
      { item: 'Professional barbering gear & sterilizers', qty: '2 sets', cost: '₦480,000' },
      { item: 'Solar backup battery power pack', qty: '2 units', cost: '₦320,000' },
      { item: 'Signage & field verification', qty: '2 sites', cost: '₦160,000' }
    ],
    totalSpent: '₦1,920,000'
  },
  {
    id: 'outreach-jun-2026',
    pillar: 'livelihoods',
    month: 'June 2026',
    dateRange: '2–21 June 2026',
    title: 'Clean Cooking and Welfare Support for 80 Widows',
    location: 'Abuja, Benue, Oyo & Lagos (4 States)',
    beneficiaries: '80 widows (20 per state)',
    beneficiariesCount: '80',
    totalCost: '₦3,850,000',
    image: '/images/hero-widows-clean-cooking-stoves.webp',
    summary: 'Fuel-efficient coal pots to replace smoky firewood, household safety demonstrations, and direct cash grants in Benue.',
    whyWeDidIt: 'Many widows in the communities we serve cook over open firewood every day. The smoke harms their lungs and their children\'s, and buying firewood eats into very small incomes. This outreach moved 80 widows to fuel-efficient coal pots and gave extra welfare support where it was needed most.',
    deliverables: [
      { title: '80 Fuel-Efficient Coal Pots', desc: 'One per widow, replacing open firewood and cutting fuel expenses by over 60%.' },
      { title: 'Live Safety Demonstrations', desc: 'Hands-on instruction on how to use and maintain the pots safely in home courtyards.' },
      { title: 'Smoke & Breathing Health Talk', desc: 'Community health worker sessions on why eliminating indoor smoke protects children\'s lungs.' },
      { title: 'Cash Grants in Benue', desc: 'Direct enterprise seed capital provided to 20 vulnerable widows to stock market goods.' }
    ],
    costBreakdown: [
      { item: 'Fuel-efficient eco coal pots', qty: '80 units', cost: '₦1,600,000' },
      { item: 'Livelihood micro-grants (Benue)', qty: '20 widows', cost: '₦1,000,000' },
      { item: 'Inter-state road transport & distribution', qty: '4 states', cost: '₦750,000' },
      { item: 'Nutritional food welfare parcels', qty: '80 packs', cost: '₦500,000' }
    ],
    totalSpent: '₦3,850,000'
  },
  {
    id: 'outreach-may-2026',
    pillar: 'education',
    month: 'May 2026',
    dateRange: '10–28 May 2026',
    title: 'Child Empowerment: Learning Materials & Student Retention',
    location: 'Benue, Lagos, Plateau & Oyo (4 States)',
    beneficiaries: '300 primary & secondary pupils',
    beneficiariesCount: '300',
    totalCost: '₦2,450,000',
    image: '/images/hero-debate-competition-makurdi.webp',
    summary: 'Exercise books, writing packs, water bottles and stationery for primary and secondary pupils across four partner community schools.',
    whyWeDidIt: 'Children who show up to school without books or pens face public embarrassment and quickly fall behind in literacy milestones. Supplying comprehensive term kits restores their enthusiasm and school attendance.',
    deliverables: [
      { title: '3,000 Exercise Books', desc: 'Standard 60-leaf and 80-leaf ruled exercise books delivered across 6 partner schools.' },
      { title: '300 Pencil Packs', desc: 'Ballpoint pens, pencils, erasers, rulers and sharpeners in durable zip cases.' },
      { title: 'Water Flasks', desc: 'Hygienic personal water bottles ensuring clean hydration throughout the school day.' },
      { title: 'Teacher Supply Kits', desc: 'Chalk packs and lesson plan notebooks provided to volunteer teaching faculties.' }
    ],
    costBreakdown: [
      { item: 'Exercise books printed wholesale', qty: '3,000 books', cost: '₦1,200,000' },
      { item: 'Writing accessories & zip cases', qty: '300 kits', cost: '₦600,000' },
      { item: 'Hydration flasks', qty: '300 units', cost: '₦350,000' },
      { item: 'Field freight & school distribution', qty: '4 states', cost: '₦300,000' }
    ],
    totalSpent: '₦2,450,000'
  },
  {
    id: 'outreach-apr-2026',
    pillar: 'health',
    month: 'April 2026',
    dateRange: '12–25 April 2026',
    title: 'Maternal Healthcare & Malaria Prevention',
    location: 'Lagos, Plateau & FCT Abuja (3 States)',
    beneficiaries: '130 high-risk mothers',
    beneficiariesCount: '130',
    totalCost: '₦2,380,000',
    image: '/images/hero-maternal-health-malaria-prevention.webp',
    summary: 'Treated mosquito nets, rapid tests and prenatal supplements for pregnant and nursing mothers, with bilingual health education in English and Hausa.',
    whyWeDidIt: 'Malaria remains one of the top causes of maternal and infant mortality across sub-Saharan Africa. Timely distribution of long-lasting nets paired with rapid triage prevents acute complications and reduces hospitalization costs for impoverished families.',
    deliverables: [
      { title: '130 Insecticide Nets (LLINs)', desc: 'WHO-approved treated nets distributed directly to pregnant and postpartum mothers.' },
      { title: 'Malaria Rapid Diagnostic Tests', desc: 'On-site clinical screening with zero waiting times by licensed volunteer nurses.' },
      { title: 'Prenatal Multivitamins', desc: 'Iron, folic acid, and essential supplements provided for mother and child wellbeing.' },
      { title: 'Bilingual Health Talks', desc: 'Practical guidance in English and Hausa on sanitation, breastfeeding, and net maintenance.' }
    ],
    costBreakdown: [
      { item: 'Long-lasting insecticide-treated nets', qty: '130 nets', cost: '₦780,000' },
      { item: 'Rapid malaria tests & medications (ACT)', qty: '130 kits', cost: '₦850,000' },
      { item: 'Maternal vitamin supplements', qty: '130 packs', cost: '₦450,000' },
      { item: 'Nurse stipends & rural transport', qty: '3 centers', cost: '₦300,000' }
    ],
    totalSpent: '₦2,380,000'
  },
  {
    id: 'outreach-mar-2026',
    pillar: 'livelihoods',
    month: 'March 2026',
    dateRange: '5–22 March 2026',
    title: 'Women Empowerment & Small Livelihoods Grants',
    location: 'Abuja, Jos, Lagos, Oyo & Makurdi',
    beneficiaries: '179 women supported',
    beneficiariesCount: '179',
    totalCost: '₦1,645,900',
    image: '/images/IMG_0995.JPG',
    summary: 'Direct micro-grants, trading stock, and basic enterprise bookkeeping guidance for low-income women traders across 5 major hubs.',
    whyWeDidIt: 'Small grants provided to mothers running petty trade produce direct, immediate returns for children’s nutrition and school fees.',
    deliverables: [
      { title: 'Micro-Trading Grants', desc: 'Seed funding to restock market provisions and grocery kiosks.' },
      { title: 'Enterprise Mentorship', desc: 'Basic pricing, sales, and saving orientation.' }
    ],
    costBreakdown: [
      { item: 'Direct livelihood seed grants', qty: '179 women', cost: '₦1,250,000' },
      { item: 'Field coordination & monitoring', qty: '5 states', cost: '₦395,900' }
    ],
    totalSpent: '₦1,645,900'
  },
  {
    id: 'outreach-feb-2026',
    pillar: 'education',
    month: 'February 2026',
    dateRange: '8–18 February 2026',
    title: 'Academic Outreach: Inter-School Quiz & Debate',
    location: 'Abuja, Jos, Makurdi & Ibadan',
    beneficiaries: '37 student prize-winners',
    beneficiariesCount: '37',
    totalCost: '₦1,061,000',
    image: '/images/hero-debate-competition-makurdi.webp',
    summary: 'Inter-school academic debate tournaments and school fee awards celebrating intellectual achievement in underserved secondary schools.',
    whyWeDidIt: 'Inspiring healthy intellectual curiosity and public speaking builds confidence in public school students who rarely get inter-school platforms.',
    deliverables: [
      { title: 'Debate Trophies & Book Awards', desc: 'Comprehensive textbooks and school supplies for winning debate squads.' },
      { title: 'Term Tuition Grants', desc: 'Merit scholarship awards for outstanding student debaters.' }
    ],
    costBreakdown: [
      { item: 'Scholarship checks to participating schools', qty: '12 scholars', cost: '₦620,000' },
      { item: 'Curriculum textbooks & prize sets', qty: '37 sets', cost: '₦441,000' }
    ],
    totalSpent: '₦1,061,000'
  },
  {
    id: 'outreach-jan-2026',
    pillar: 'livelihoods',
    month: 'January 2026',
    dateRange: '10–18 January 2026',
    title: 'Less Privileged & Widows Winter Outreach',
    location: 'Abuja & Makurdi',
    beneficiaries: '33 vulnerable individuals',
    beneficiariesCount: '33',
    totalCost: '₦626,000',
    image: '/images/IMG_0300.JPG',
    summary: 'New Year food packages, blankets, and essential domestic welfare packs distributed directly to destitute families.',
    whyWeDidIt: 'The post-holiday January period is often the hardest season for low-income widows facing delayed wages and winter cold.',
    deliverables: [
      { title: 'Food Welfare Baskets', desc: 'Rice, beans, yams and cooking condiments for 33 households.' },
      { title: 'Warmth & Bedding Supplies', desc: 'Blankets and basic living supplies.' }
    ],
    costBreakdown: [
      { item: 'Food provisions and essential staples', qty: '33 parcels', cost: '₦450,000' },
      { item: 'Local transport & dispatch logistics', qty: '2 hubs', cost: '₦176,000' }
    ],
    totalSpent: '₦626,000'
  }
];

export default function Outreaches({ onOpenDonate, setCurrentPage, selectedOutreachId, onSelectOutreach }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedReportId, setSelectedReportId] = useState(selectedOutreachId || null);
  const [showOlderReports, setShowOlderReports] = useState(false);
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState('');

  useEffect(() => {
    setSelectedReportId(selectedOutreachId || null);
  }, [selectedOutreachId]);

  const selectedReport = ALL_FIELD_REPORTS.find((r) => r.id === selectedReportId);

  // Latest report is the very first one (Sep 2026 Pad A Girl Child)
  const latestReport = ALL_FIELD_REPORTS[0];

  // Earlier reports (from index 1 onward)
  const earlierReports = ALL_FIELD_REPORTS.slice(1);

  const filteredReports = earlierReports.filter((r) => {
    if (activeFilter === 'all') return true;
    return r.pillar === activeFilter;
  });

  // Limit initially to 4 earlier reports unless "Show older reports" is clicked
  const displayedReports = showOlderReports ? filteredReports : filteredReports.slice(0, 4);

  const handleOpenReport = (id) => {
    setSelectedReportId(id);
    if (onSelectOutreach) onSelectOutreach(id);
    window.location.hash = `outreaches/${id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedReportId(null);
    if (onSelectOutreach) onSelectOutreach(null);
    window.location.hash = 'outreaches';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (subscriberEmail) {
      setEmailSubscribed(true);
    }
  };

  // DETAIL VIEW
  if (selectedReport) {
    return (
      <div className="w-full bg-[#fdfbf7] text-[#1c1c1a] py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 mb-6 sm:mb-8">
            <button
              onClick={handleBackToList}
              className="hover:text-[#7a1b1b] transition-colors cursor-pointer flex items-center gap-1.5 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Field reports</span>
            </button>
            <span>/</span>
            <span className="text-stone-900 font-medium truncate max-w-[200px] sm:max-w-none">
              {selectedReport.month}
            </span>
          </div>

          {/* Header Badges & Title */}
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span
                className={`px-3 py-1 rounded-full text-white text-[11px] font-bold uppercase tracking-wider ${
                  selectedReport.pillar === 'education'
                    ? 'bg-[#7a1b1b]'
                    : selectedReport.pillar === 'health'
                    ? 'bg-[#1b4d3e]'
                    : 'bg-[#8c5310]'
                }`}
              >
                {selectedReport.pillar.toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 font-medium text-xs border border-stone-200/60">
                Published {selectedReport.month}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight mb-4">
              {selectedReport.title}
            </h1>
          </div>

          {/* Key Facts Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 sm:p-6 bg-white rounded-3xl border border-stone-200/80 shadow-sm mb-8 sm:mb-12">
            <div>
              <span className="text-xs uppercase font-bold text-stone-400 block mb-0.5 tracking-wider">When</span>
              <span className="font-semibold text-sm sm:text-base text-stone-900">{selectedReport.dateRange}</span>
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-stone-400 block mb-0.5 tracking-wider">Where</span>
              <span className="font-semibold text-sm sm:text-base text-stone-900">{selectedReport.location}</span>
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-stone-400 block mb-0.5 tracking-wider">Reached</span>
              <span className="font-semibold text-sm sm:text-base text-stone-900">{selectedReport.beneficiaries}</span>
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-stone-400 block mb-0.5 tracking-wider">Total cost</span>
              <span className="font-bold text-sm sm:text-base text-[#7a1b1b]">{selectedReport.totalCost}</span>
            </div>
          </div>

          {/* Full Banner Photo */}
          <div className="rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm mb-10 sm:mb-14 bg-stone-100">
            <img
              src={selectedReport.image}
              alt={selectedReport.title}
              className="w-full h-[260px] sm:h-[420px] lg:h-[500px] object-cover object-center"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/IMG_0303.JPG';
              }}
            />
          </div>

          {/* Why We Did It */}
          <div className="max-w-3xl mb-10 sm:mb-14">
            <h2 className="text-2xl font-bold text-stone-900 mb-3 tracking-tight">
              Why we did it
            </h2>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
              {selectedReport.whyWeDidIt}
            </p>
          </div>

          {/* What We Delivered */}
          <div className="mb-10 sm:mb-14">
            <h2 className="text-2xl font-bold text-stone-900 mb-6 tracking-tight">
              What we delivered
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {selectedReport.deliverables.map((d, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-stone-900 mb-1.5">
                      {d.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {d.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Where the money went (Audit Table) */}
          <div className="mb-12 sm:mb-16">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
                Where the money went
              </h2>
              <p className="text-sm text-stone-500 mt-1">
                Verified against bank receipts and itemized supplier invoices. 100% direct delivery.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-stone-50 text-stone-900 font-semibold border-b border-stone-200">
                      <th className="py-3.5 px-5 sm:px-6">Item</th>
                      <th className="py-3.5 px-4 sm:px-6">Qty</th>
                      <th className="py-3.5 px-5 sm:px-6 text-right">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-stone-700">
                    {selectedReport.costBreakdown.map((row, idx) => (
                      <tr key={idx} className="hover:bg-stone-50/50 transition-colors">
                        <td className="py-3.5 px-5 sm:px-6 font-medium text-stone-900">{row.item}</td>
                        <td className="py-3.5 px-4 sm:px-6 text-stone-500">{row.qty}</td>
                        <td className="py-3.5 px-5 sm:px-6 text-right font-medium text-stone-900 whitespace-nowrap">{row.cost}</td>
                      </tr>
                    ))}
                    <tr className="bg-stone-50/80 font-bold text-stone-900">
                      <td colSpan="2" className="py-4 px-5 sm:px-6 text-sm sm:text-base">Total Delivered</td>
                      <td className="py-4 px-5 sm:px-6 text-right text-sm sm:text-base text-[#7a1b1b] whitespace-nowrap">{selectedReport.totalSpent}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <button
              onClick={handleBackToList}
              className="px-6 py-3 rounded-full border border-stone-300 hover:bg-stone-50 text-stone-800 text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all field reports</span>
            </button>

            <button
              onClick={() => onOpenDonate()}
              className="px-7 py-3 rounded-full bg-[#7a1b1b] hover:bg-[#621616] text-white text-sm font-semibold shadow-sm text-center cursor-pointer transition-colors"
            >
              Fund an outreach like this
            </button>
          </div>

        </div>
      </div>
    );
  }

  // LIST VIEW
  return (
    <div className="w-full bg-[#fdfbf7] text-[#1c1c1a] py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 1. Header */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7a1b1b] block mb-2">
            FIELD REPORTS
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-stone-900 mb-3 tracking-tight leading-tight">
            Every outreach, reported in public.
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            What we delivered, where, for whom and what it cost — with photos from the day. A new report is published within two weeks of each outreach.
          </p>
        </div>

        {/* 2. Headline Figures in One Green Panel */}
        <div className="bg-[#1b4d3e] text-white rounded-3xl p-6 sm:p-8 mb-12 sm:mb-16 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                1,690+
              </div>
              <div className="text-xs sm:text-sm text-white/80 font-normal mt-1">
                people reached, Jan–Sep 2026
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                10
              </div>
              <div className="text-xs sm:text-sm text-white/80 font-normal mt-1">
                outreaches reported
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                7
              </div>
              <div className="text-xs sm:text-sm text-white/80 font-normal mt-1">
                states active
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#f7c899] tracking-tight">
                ₦16,971,575
              </div>
              <div className="text-xs sm:text-sm text-white/80 font-normal mt-1">
                delivered directly (100%)
              </div>
            </div>
          </div>
        </div>

        {/* 3. Latest Report Large Card at Top */}
        <div className="mb-14 sm:mb-20">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              LATEST FIELD REPORT
            </span>
            <span className="text-xs text-stone-500 font-medium">
              Published {latestReport.month}
            </span>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Photo on left */}
            <div className="lg:col-span-6 h-64 sm:h-80 lg:h-auto overflow-hidden bg-stone-100 relative">
              <img
                src={latestReport.image}
                alt={latestReport.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/IMG_0303.JPG';
                }}
              />
              <span className="absolute top-4 left-4 bg-[#1b4d3e] text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                HEALTH &amp; HYGIENE
              </span>
            </div>

            {/* Content on right */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="text-xs text-stone-500 font-medium mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{latestReport.location}</span>
                  <span>·</span>
                  <span>{latestReport.dateRange}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3 tracking-tight">
                  {latestReport.title}
                </h2>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
                  {latestReport.summary}
                </p>

                {/* Key numbers */}
                <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-stone-50 border border-stone-200/60">
                  <div>
                    <div className="text-xl font-bold text-stone-900">384 students</div>
                    <div className="text-xs text-stone-500">+ 72 in pad bank</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#7a1b1b]">{latestReport.totalCost}</div>
                    <div className="text-xs text-stone-500">100% direct cost</div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleOpenReport(latestReport.id)}
                  className="bg-[#7a1b1b] hover:bg-[#621616] text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer shadow-sm"
                >
                  Read the full report
                </button>
                <button
                  onClick={() => onOpenDonate()}
                  className="border border-stone-300 hover:bg-stone-50 text-stone-800 text-sm font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer"
                >
                  Fund the next one
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Earlier Reports Section */}
        <div className="mb-14 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7a1b1b] block mb-1">
                PREVIOUS MISSIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Earlier 2026 field reports
              </h2>
            </div>

            {/* Filter Pills */}
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
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeFilter === tab.id
                      ? tab.id === 'education'
                        ? 'bg-[#7a1b1b] text-white shadow-sm'
                        : tab.id === 'health'
                        ? 'bg-[#1b4d3e] text-white shadow-sm'
                        : tab.id === 'livelihoods'
                        ? 'bg-[#8c5310] text-white shadow-sm'
                        : 'bg-stone-900 text-white shadow-sm'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200/70'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Even Grid of Identical Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {displayedReports.map((report) => {
              const badgeBg =
                report.pillar === 'education'
                  ? 'bg-[#7a1b1b]'
                  : report.pillar === 'health'
                  ? 'bg-[#1b4d3e]'
                  : 'bg-[#8c5310]';

              return (
                <div
                  key={report.id}
                  className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  {/* Photo with Badge */}
                  <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-stone-100">
                    <img
                      src={report.image}
                      alt={report.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/IMG_0303.JPG';
                      }}
                    />
                    <span
                      className={`absolute top-4 left-4 ${badgeBg} text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm`}
                    >
                      {report.pillar.toUpperCase()}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded-full font-medium">
                      {report.month}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                    <div>
                      <div className="text-xs text-stone-500 font-medium mb-1.5 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>{report.location}</span>
                      </div>
                      <h3 className="text-xl font-bold text-stone-900 mb-2 leading-snug">
                        {report.title}
                      </h3>
                      <p className="text-stone-600 text-sm leading-relaxed mb-5">
                        {report.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold text-stone-900 bg-stone-100 px-3 py-1 rounded-full">
                        {report.beneficiaries}
                      </span>
                      <button
                        onClick={() => handleOpenReport(report.id)}
                        className="text-xs sm:text-sm font-semibold text-[#7a1b1b] hover:text-[#5a1313] hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Read the report</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Show Older Reports Button */}
          {filteredReports.length > 4 && (
            <div className="text-center pt-2">
              <button
                onClick={() => setShowOlderReports(!showOlderReports)}
                className="px-6 py-3 rounded-full border border-stone-300 hover:bg-stone-50 text-stone-800 text-sm font-semibold transition-colors cursor-pointer shadow-sm"
              >
                {showOlderReports ? 'Show fewer reports' : `Show all ${filteredReports.length} reports`}
              </button>
            </div>
          )}
        </div>

        {/* 5. Next Outreach & Email Sign-up (Side by Side) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-6 border-t border-stone-200/60">
          
          {/* Next Planned Outreach Card */}
          <div className="bg-[#f5f1e8] rounded-3xl p-6 sm:p-8 border border-stone-200/80 flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7a1b1b] block mb-2">
                UPCOMING MISSION
              </span>
              <h3 className="text-2xl font-bold text-stone-900 mb-2 tracking-tight">
                Medical Aid Outreach
              </h3>
              <div className="text-xs text-stone-500 font-semibold mb-3">
                November 2026 · Plateau, Katsina, Lagos, Oyo &amp; Enugu
              </div>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                Mobile clinical screenings, essential maternal kits, and malaria treatment therapies delivered directly to rural hamlets with limited primary healthcare access.
              </p>
            </div>
            <button
              onClick={() => onOpenDonate()}
              className="bg-[#7a1b1b] hover:bg-[#621616] text-white text-sm font-semibold px-6 py-3.5 rounded-full transition-colors w-full sm:w-auto self-start cursor-pointer shadow-sm"
            >
              Support this outreach
            </button>
          </div>

          {/* Field Report Dispatch Sign-up */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">
                STAY INFORMED
              </span>
              <h3 className="text-2xl font-bold text-stone-900 mb-2 tracking-tight">
                Receive field reports in your inbox
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                Get full itemized expenditure summaries, receipt audits, and photo dispatches sent directly to you as each mission concludes.
              </p>
            </div>

            {emailSubscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-sm font-medium flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Thank you! You're subscribed to receive field dispatches.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  required
                  value={subscriberEmail}
                  onChange={(e) => setSubscriberEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-[#fdfbf7] rounded-full border border-stone-200 text-sm focus:outline-none focus:border-[#7a1b1b]"
                />
                <button
                  type="submit"
                  className="bg-stone-900 hover:bg-black text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer shadow-sm shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
