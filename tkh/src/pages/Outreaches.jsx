import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { ArrowRight, ArrowLeft, Check, Calendar, MapPin, Users } from '../components/Icons';

export default function Outreaches({ onOpenDonate, setCurrentPage, selectedOutreachId, onSelectOutreach }) {
  const { outreaches: contextOutreaches } = useData();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedReportId, setSelectedReportId] = useState(selectedOutreachId || null);

  useEffect(() => {
    setSelectedReportId(selectedOutreachId || null);
  }, [selectedOutreachId]);

  const reportsList = [
    {
      id: 'outreach-sep-2026-pad-bank',
      pillar: 'health',
      month: 'September 2026',
      dateRange: '20 September 2026',
      title: 'PAD A GIRL CHILD OUTREACH & "PAD BANK" Commissioning',
      location: 'GGSS Dutse Alhaji, Abuja',
      beneficiaries: '384 students reached · 72 pads in pad bank',
      totalCost: '₦1,274,000',
      image: '/images/pad-a-girl-child-outreach-abuja.jpg',
      summary: 'The FCT team successfully carried out the pad a girl child outreach and mounted the permanent “PAD BANK” in the school clinic, educated students on menstrual hygiene, reached 384 students with sanitary pads, and reserved 72 in the pad bank.',
      whyWeDidIt: 'Period poverty and inadequate menstrual hygiene education severely undermine the dignity, health, and academic consistency of young girls across Nigerian secondary schools. Many students are forced to stay home during their menstrual cycles or resort to unhygienic alternatives due to lack of supplies and lingering cultural taboos. By distributing sanitary pads directly, establishing a sustainable and monitored emergency "PAD BANK" in the school clinic under the care of the Health mistress, and conducting an open, interactive education session, we empower girls to stay healthy, confident, and uninterrupted in their classrooms.',
      deliverables: [
        { title: '384 Sanitary Pads Reached', desc: 'Direct distribution of quality sanitary pads to 384 female students across secondary classes.' },
        { title: 'School Clinic "PAD BANK" Mounted', desc: 'Installed a permanent emergency sanitary pad dispensary in the school clinic, managed and controlled by the Health mistress to avoid abuse.' },
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
      totalCost: '₦2,100,000',
      image: '/images/abba-father-orphanage-sep-2026.jpg',
      summary: 'Outreach visit to Abba Father Rich Orphanage Home in Plateau State to show love, encourage the children, and provide essential materials for their welfare and education.',
      whyWeDidIt: 'Orphaned and vulnerable children living in residential care homes often experience acute gaps in nutritional provisions, educational supplies, and emotional mentorship. Without steady external support, these homes struggle to sustain basic welfare and schooling needs simultaneously. Our outreach visit was carried out to demonstrate unconditional love, uplift and encourage the children’s spirits, and provide essential materials that directly support both their daily well-being and academic pursuits.',
      deliverables: [
        { title: 'Educational Materials & Stationery', desc: 'Distributed exercise books, writing pads, pens, pencils, sharpeners, and learning packs to equip the children for the school term.' },
        { title: 'Nutritional Food Provisions', desc: 'Donated essential food relief including rice, semovita, noodles, cooking oil, seasonings, and beverages for resident meals.' },
        { title: 'Children Welfare & Hygiene Kits', desc: 'Provided personal care items, bathing soaps, toothpaste, detergents, and everyday clothing essentials for resident orphans.' },
        { title: 'Mentorship & Fellowship Session', desc: 'Spent quality time engaging the children with encouraging words, academic counseling, interactive fellowship, and games.' }
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
      title: 'Youth skills, digital literacy & academic outreach',
      location: 'Lagos, Plateau, Benue & FCT Abuja',
      beneficiaries: '345 youths & students',
      totalCost: '₦4,850,000',
      image: '/images/IMG_0294.JPG',
      summary: 'A 5-week youth tech lab in Ikorodu, speech-day scholarships in Jos, primary school learning kits, and shoemaking and hairdressing toolkits.',
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
      title: 'From apprentice to owner: two barbershops opened',
      location: 'Jos & Makurdi',
      beneficiaries: '2 young people in business',
      totalCost: '₦1,920,000',
      image: '/images/hero-youth-vocational-shoemaking.webp',
      summary: 'Two young people trained in 2025 now run their own shops — rent, fit-out, wiring and professional tools all covered.',
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
      title: 'Clean cooking and welfare support for 80 widows',
      location: 'Abuja, Benue, Oyo & Lagos',
      beneficiaries: '80 widows (20 per state)',
      totalCost: '₦3,850,000',
      image: '/images/hero-widows-clean-cooking-stoves.webp',
      summary: 'Fuel-efficient coal pots to replace smoky firewood, safety demonstrations, and cash grants in Benue.',
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
      title: 'Child empowerment: learning materials & retention',
      location: 'Benue, Lagos, Plateau & Oyo',
      beneficiaries: '300 pupils',
      totalCost: '₦2,450,000',
      image: '/images/hero-debate-competition-makurdi.webp',
      summary: 'Exercise books, writing packs, water bottles and stationery for primary and secondary pupils.',
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
      title: 'Maternal healthcare & malaria prevention',
      location: 'Abuja, Benue & Lagos',
      beneficiaries: '130 high-risk mothers',
      totalCost: '₦2,380,000',
      image: '/images/hero-maternal-health-malaria-prevention.webp',
      summary: 'Treated mosquito nets, rapid tests and prenatal supplements for pregnant and nursing mothers, with bilingual health education.',
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
    }
  ];

  const selectedReport = reportsList.find(
    (r) =>
      r.id === selectedReportId ||
      (selectedReportId === 'outreach-sep-2026' && r.id === 'outreach-sep-2026-orphanage')
  );

  const filteredReports = reportsList.filter((r) => {
    if (activeFilter === 'all') return true;
    return r.pillar === activeFilter;
  });

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

  // DETAIL VIEW (Artboard 04a Field Report Template)
  if (selectedReport) {
    return (
      <div className="w-full bg-[#fdfbf7] text-[#1c1c1a] py-8 sm:py-12 3xl:py-16 4xl:py-20">
        <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16 uw:px-20">
          
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm 3xl:text-base text-[#706e68] mb-6 3xl:mb-8">
            <button
              onClick={handleBackToList}
              className="hover:text-maroon transition-colors cursor-pointer flex items-center gap-1 min-h-[44px] sm:min-h-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 3xl:w-4 3xl:h-4" />
              <span>Field reports</span>
            </button>
            <span>/</span>
            <span className="text-[#1c1c1a] font-medium truncate max-w-[200px] sm:max-w-none">{selectedReport.month}</span>
          </div>

          {/* Header Badges & Title */}
          <div className="max-w-3xl 3xl:max-w-4xl 4xl:max-w-5xl mb-8 3xl:mb-12">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-maroon-tint text-maroon font-semibold text-xs 3xl:text-sm uppercase tracking-wide">
                {selectedReport.pillar}
              </span>
              <span className="px-3 py-1 rounded-full bg-forest-tint text-forest font-medium text-xs 3xl:text-sm">
                Report published: {selectedReport.month}
              </span>
            </div>
            <h1 className="font-heading font-bold text-2xl xs:text-3xl sm:text-4xl lg:text-5xl 3xl:text-6xl 4xl:text-7xl text-[#1c1c1a] leading-tight mb-4">
              {selectedReport.title}
            </h1>
          </div>

          {/* Key Facts Bar */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6 3xl:p-8 bg-white rounded-3xl border border-[#e5e0d8] shadow-sm mb-8 sm:mb-10 3xl:mb-14">
            <div>
              <span className="text-xs 3xl:text-sm uppercase font-bold text-[#706e68] block mb-0.5">When</span>
              <span className="font-heading font-semibold text-xs sm:text-sm md:text-base 3xl:text-lg text-[#1c1c1a]">{selectedReport.dateRange}</span>
            </div>
            <div>
              <span className="text-xs 3xl:text-sm uppercase font-bold text-[#706e68] block mb-0.5">Where</span>
              <span className="font-heading font-semibold text-xs sm:text-sm md:text-base 3xl:text-lg text-[#1c1c1a]">{selectedReport.location}</span>
            </div>
            <div>
              <span className="text-xs 3xl:text-sm uppercase font-bold text-[#706e68] block mb-0.5">Reached</span>
              <span className="font-heading font-semibold text-xs sm:text-sm md:text-base 3xl:text-lg text-[#1c1c1a]">{selectedReport.beneficiaries}</span>
            </div>
            <div>
              <span className="text-xs 3xl:text-sm uppercase font-bold text-[#706e68] block mb-0.5">Total cost</span>
              <span className="font-heading font-bold text-xs sm:text-sm md:text-base 3xl:text-xl text-maroon">{selectedReport.totalCost}</span>
            </div>
          </div>

          {/* Full Banner Photo */}
          <div className="rounded-3xl overflow-hidden border border-[#e5e0d8] shadow-md mb-8 sm:mb-12 3xl:mb-16 bg-white">
            <img
              src={selectedReport.image}
              alt={selectedReport.title}
              className="w-full h-[220px] xs:h-[280px] sm:h-[380px] lg:h-[480px] 3xl:h-[600px] 4xl:h-[720px] uw:h-[840px] object-cover object-center"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/IMG_0303.JPG';
              }}
            />
          </div>

          {/* Why We Did It */}
          <div className="max-w-3xl 3xl:max-w-4xl 4xl:max-w-5xl mb-8 sm:mb-12 3xl:mb-16">
            <h2 className="font-heading font-bold text-xl sm:text-2xl 3xl:text-3xl text-[#1c1c1a] mb-3 3xl:mb-4">
              Why we did it
            </h2>
            <p className="text-sm sm:text-base 3xl:text-lg text-[#4a4a46] leading-relaxed">
              {selectedReport.whyWeDidIt}
            </p>
          </div>

          {/* What We Delivered */}
          <div className="mb-10 sm:mb-14 3xl:mb-20">
            <h2 className="font-heading font-bold text-xl sm:text-2xl 3xl:text-3xl text-[#1c1c1a] mb-6 3xl:mb-8">
              What we delivered
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 3xl:gap-8">
              {selectedReport.deliverables.map((d, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 sm:p-6 3xl:p-8 border border-[#e5e0d8] shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-base 3xl:text-lg text-[#1c1c1a] mb-2">
                      {d.title}
                    </h3>
                    <p className="text-xs sm:text-sm 3xl:text-base text-[#4a4a46] leading-relaxed">
                      {d.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Where the money went (Audit Table) */}
          <div className="mb-12 sm:mb-16 3xl:mb-20">
            <div className="mb-4 3xl:mb-6">
              <h2 className="font-heading font-bold text-xl sm:text-2xl 3xl:text-3xl text-[#1c1c1a]">
                Where the money went
              </h2>
              <p className="text-xs sm:text-sm 3xl:text-base text-[#706e68]">
                Every kobo verified against bank statements and vendor receipts. 100% direct delivery.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#e5e0d8] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-left border-collapse text-xs sm:text-sm 3xl:text-base">
                  <thead>
                    <tr className="bg-[#f5f1e8] text-[#1c1c1a] font-heading font-semibold border-b border-[#e5e0d8]">
                      <th className="py-3.5 sm:py-4 3xl:py-5 px-4 sm:px-6 3xl:px-8">Item</th>
                      <th className="py-3.5 sm:py-4 3xl:py-5 px-3 sm:px-6 3xl:px-8">Qty</th>
                      <th className="py-3.5 sm:py-4 3xl:py-5 px-4 sm:px-6 3xl:px-8 text-right">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e0d8] text-[#4a4a46]">
                    {selectedReport.costBreakdown.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#fdfbf7] transition-colors">
                        <td className="py-3.5 sm:py-4 3xl:py-5 px-4 sm:px-6 3xl:px-8 font-medium text-[#1c1c1a]">{row.item}</td>
                        <td className="py-3.5 sm:py-4 3xl:py-5 px-3 sm:px-6 3xl:px-8">{row.qty}</td>
                        <td className="py-3.5 sm:py-4 3xl:py-5 px-4 sm:px-6 3xl:px-8 text-right font-medium text-[#1c1c1a] whitespace-nowrap">{row.cost}</td>
                      </tr>
                    ))}
                    <tr className="bg-[#fdfbf7] font-heading font-bold text-[#1c1c1a]">
                      <td colSpan="2" className="py-3.5 sm:py-4 3xl:py-5 px-4 sm:px-6 3xl:px-8 text-sm sm:text-base 3xl:text-lg">Total Delivered</td>
                      <td className="py-3.5 sm:py-4 3xl:py-5 px-4 sm:px-6 3xl:px-8 text-right text-sm sm:text-base 3xl:text-lg text-maroon whitespace-nowrap">{selectedReport.totalSpent}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-[#e5e0d8] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <button
              onClick={handleBackToList}
              className="btn-secondary w-full sm:w-auto px-6 3xl:px-8 py-2.5 3xl:py-3.5 text-sm 3xl:text-base inline-flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all field reports</span>
            </button>

            <button
              onClick={() => onOpenDonate()}
              className="btn-primary w-full sm:w-auto px-7 3xl:px-9 py-3 3xl:py-3.5 text-sm 3xl:text-base shadow-sm text-center justify-center min-h-[44px]"
            >
              Fund an outreach like this
            </button>
          </div>

        </div>
      </div>
    );
  }

  // LIST VIEW (Artboard 04 Field reports)
  return (
    <div className="w-full bg-[#fdfbf7] text-[#1c1c1a] py-8 sm:py-16 3xl:py-20 4xl:py-24">
      <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16 uw:px-20">

        {/* Header */}
        <div className="max-w-3xl 3xl:max-w-4xl 4xl:max-w-5xl mb-8 3xl:mb-12">
          <span className="text-xs 3xl:text-sm uppercase font-bold tracking-widest text-maroon block mb-2">
            FIELD REPORTS
          </span>
          <h1 className="font-heading font-bold text-2xl xs:text-3xl sm:text-4xl lg:text-5xl 3xl:text-6xl text-[#1c1c1a] mb-3 leading-tight">
            Every outreach, reported in public.
          </h1>
          <p className="text-sm sm:text-base lg:text-lg 3xl:text-xl text-[#4a4a46] leading-relaxed">
            What we delivered, where, for whom and what it cost — with photos from the day. A new report goes up within two weeks of each outreach.
          </p>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6 3xl:p-8 bg-white rounded-3xl border border-[#e5e0d8] shadow-sm mb-8 sm:mb-10 3xl:mb-12">
          <div>
            <div className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl 3xl:text-4xl text-[#1c1c1a]">
              1,690+
            </div>
            <div className="text-xs 3xl:text-sm text-[#706e68] mt-0.5">people reached, Jan–Sep 2026</div>
          </div>
          <div>
            <div className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl 3xl:text-4xl text-[#1c1c1a]">
              11
            </div>
            <div className="text-xs 3xl:text-sm text-[#706e68] mt-0.5">outreaches reported</div>
          </div>
          <div>
            <div className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl 3xl:text-4xl text-[#1c1c1a]">
              7
            </div>
            <div className="text-xs 3xl:text-sm text-[#706e68] mt-0.5">states active</div>
          </div>
          <div>
            <div className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl 3xl:text-4xl text-maroon break-words">
              ₦16,971,575
            </div>
            <div className="text-xs 3xl:text-sm text-[#706e68] mt-0.5">spent on delivery (100% direct)</div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 3xl:gap-3 mb-8 3xl:mb-12">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 3xl:px-6 py-2 3xl:py-3 rounded-full text-xs sm:text-sm 3xl:text-base font-semibold transition-all cursor-pointer min-h-[40px] ${
              activeFilter === 'all'
                ? 'bg-[#1c1c1a] text-white shadow-sm'
                : 'bg-white border border-[#e5e0d8] text-[#4a4a46] hover:bg-[#f5f1e8]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('education')}
            className={`px-4 3xl:px-6 py-2 3xl:py-3 rounded-full text-xs sm:text-sm 3xl:text-base font-semibold transition-all cursor-pointer min-h-[40px] ${
              activeFilter === 'education'
                ? 'bg-maroon text-white shadow-sm'
                : 'bg-white border border-[#e5e0d8] text-[#4a4a46] hover:bg-[#f5f1e8]'
            }`}
          >
            Education
          </button>
          <button
            onClick={() => setActiveFilter('health')}
            className={`px-4 3xl:px-6 py-2 3xl:py-3 rounded-full text-xs sm:text-sm 3xl:text-base font-semibold transition-all cursor-pointer min-h-[40px] ${
              activeFilter === 'health'
                ? 'bg-forest text-white shadow-sm'
                : 'bg-white border border-[#e5e0d8] text-[#4a4a46] hover:bg-[#f5f1e8]'
            }`}
          >
            Health
          </button>
          <button
            onClick={() => setActiveFilter('livelihoods')}
            className={`px-4 3xl:px-6 py-2 3xl:py-3 rounded-full text-xs sm:text-sm 3xl:text-base font-semibold transition-all cursor-pointer min-h-[40px] ${
              activeFilter === 'livelihoods'
                ? 'bg-ochre text-white shadow-sm'
                : 'bg-white border border-[#e5e0d8] text-[#4a4a46] hover:bg-[#f5f1e8]'
            }`}
          >
            Livelihoods
          </button>
        </div>

        {/* Report Cards Grid */}
        <div className="grid grid-cols-1 3xl:grid-cols-2 gap-6 3xl:gap-8 4xl:gap-10">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-3xl border border-[#e5e0d8] overflow-hidden shadow-sm hover:border-[#d0c8bb] hover:shadow-md transition-all flex flex-col md:flex-row items-stretch"
            >
              {/* Photo on left */}
              <div className="w-full md:w-80 3xl:w-72 4xl:w-88 h-48 xs:h-56 md:h-auto overflow-hidden bg-gray-100 shrink-0">
                <img
                  src={report.image}
                  alt={report.title}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/IMG_0303.JPG';
                  }}
                />
              </div>

              {/* Content on right */}
              <div className="p-5 sm:p-8 3xl:p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-maroon-tint text-maroon text-xs font-semibold uppercase tracking-wider">
                      {report.pillar}
                    </span>
                    <span className="text-xs text-[#706e68] font-medium">
                      {report.month}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg sm:text-2xl 3xl:text-2xl text-[#1c1c1a] mb-1">
                    {report.title}
                  </h3>
                  <div className="text-xs 3xl:text-sm text-[#706e68] mb-3">
                    {report.location} · {report.dateRange}
                  </div>

                  <p className="text-xs sm:text-sm 3xl:text-base text-[#4a4a46] leading-relaxed mb-4">
                    {report.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#e5e0d8] flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 text-xs sm:text-sm 3xl:text-base font-semibold text-[#1c1c1a]">
                    <span className="w-2 h-2 rounded-full bg-forest shrink-0" />
                    <span>{report.beneficiaries}</span>
                  </div>

                  <button
                    onClick={() => handleOpenReport(report.id)}
                    className="font-semibold text-xs sm:text-sm 3xl:text-base text-maroon hover:text-maroon-dark transition-colors inline-flex items-center gap-1.5 cursor-pointer min-h-[44px] sm:min-h-0"
                  >
                    <span>Read the report</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
