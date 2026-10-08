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

  const selectedReport = reportsList.find((r) => r.id === selectedReportId);

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
      <div className="w-full bg-[#fdfbf7] text-[#1c1c1a] py-8 sm:py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#706e68] mb-6">
            <button
              onClick={handleBackToList}
              className="hover:text-maroon transition-colors cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Field reports</span>
            </button>
            <span>/</span>
            <span className="text-[#1c1c1a] font-medium">{selectedReport.month}</span>
          </div>

          {/* Header Badges & Title */}
          <div className="max-w-3xl mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-maroon-tint text-maroon font-semibold text-xs uppercase tracking-wide">
                {selectedReport.pillar}
              </span>
              <span className="px-3 py-1 rounded-full bg-forest-tint text-forest font-medium text-xs">
                Report published: {selectedReport.month}
              </span>
            </div>
            <h1 className="font-heading font-bold text-3xl sm:text-5xl text-[#1c1c1a] leading-tight mb-4">
              {selectedReport.title}
            </h1>
          </div>

          {/* Key Facts Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 bg-white rounded-3xl border border-[#e5e0d8] shadow-sm mb-10">
            <div>
              <span className="text-xs uppercase font-bold text-[#706e68] block mb-0.5">When</span>
              <span className="font-heading font-semibold text-sm sm:text-base text-[#1c1c1a]">{selectedReport.dateRange}</span>
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-[#706e68] block mb-0.5">Where</span>
              <span className="font-heading font-semibold text-sm sm:text-base text-[#1c1c1a]">{selectedReport.location}</span>
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-[#706e68] block mb-0.5">Reached</span>
              <span className="font-heading font-semibold text-sm sm:text-base text-[#1c1c1a]">{selectedReport.beneficiaries}</span>
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-[#706e68] block mb-0.5">Total cost</span>
              <span className="font-heading font-bold text-sm sm:text-base text-maroon">{selectedReport.totalCost}</span>
            </div>
          </div>

          {/* Full Banner Photo */}
          <div className="rounded-3xl overflow-hidden border border-[#e5e0d8] shadow-md mb-12 bg-white">
            <img
              src={selectedReport.image}
              alt={selectedReport.title}
              className="w-full h-[360px] sm:h-[480px] object-cover object-center"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/IMG_0303.JPG';
              }}
            />
          </div>

          {/* Why We Did It */}
          <div className="max-w-3xl mb-12">
            <h2 className="font-heading font-bold text-2xl text-[#1c1c1a] mb-3">
              Why we did it
            </h2>
            <p className="text-base text-[#4a4a46] leading-relaxed">
              {selectedReport.whyWeDidIt}
            </p>
          </div>

          {/* What We Delivered */}
          <div className="mb-14">
            <h2 className="font-heading font-bold text-2xl text-[#1c1c1a] mb-6">
              What we delivered
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {selectedReport.deliverables.map((d, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-[#e5e0d8] shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-base text-[#1c1c1a] mb-2">
                      {d.title}
                    </h3>
                    <p className="text-sm text-[#4a4a46] leading-relaxed">
                      {d.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Where the money went (Audit Table) */}
          <div className="mb-16">
            <div className="mb-4">
              <h2 className="font-heading font-bold text-2xl text-[#1c1c1a]">
                Where the money went
              </h2>
              <p className="text-xs sm:text-sm text-[#706e68]">
                Every kobo verified against bank statements and vendor receipts. 100% direct delivery.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#e5e0d8] overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#f5f1e8] text-[#1c1c1a] font-heading font-semibold border-b border-[#e5e0d8]">
                    <th className="py-4 px-6">Item</th>
                    <th className="py-4 px-6">Qty</th>
                    <th className="py-4 px-6 text-right">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e0d8] text-[#4a4a46]">
                  {selectedReport.costBreakdown.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#fdfbf7] transition-colors">
                      <td className="py-4 px-6 font-medium text-[#1c1c1a]">{row.item}</td>
                      <td className="py-4 px-6">{row.qty}</td>
                      <td className="py-4 px-6 text-right font-medium text-[#1c1c1a]">{row.cost}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#fdfbf7] font-heading font-bold text-[#1c1c1a]">
                    <td colSpan="2" className="py-4 px-6 text-base">Total Delivered</td>
                    <td className="py-4 px-6 text-right text-base text-maroon">{selectedReport.totalSpent}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-[#e5e0d8] flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={handleBackToList}
              className="btn-secondary px-6 py-2.5 text-sm inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all field reports</span>
            </button>

            <button
              onClick={() => onOpenDonate()}
              className="btn-primary px-7 py-3 text-sm shadow-sm"
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
    <div className="w-full bg-[#fdfbf7] text-[#1c1c1a] py-10 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="max-w-3xl mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-maroon block mb-2">
            FIELD REPORTS
          </span>
          <h1 className="font-heading font-bold text-3xl sm:text-5xl text-[#1c1c1a] mb-3">
            Every outreach, reported in public.
          </h1>
          <p className="text-base sm:text-lg text-[#4a4a46] leading-relaxed">
            What we delivered, where, for whom and what it cost — with photos from the day. A new report goes up within two weeks of each outreach.
          </p>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-3xl border border-[#e5e0d8] shadow-sm mb-10">
          <div>
            <div className="font-heading font-bold text-2xl sm:text-3xl text-[#1c1c1a]">
              857
            </div>
            <div className="text-xs text-[#706e68] mt-0.5">people reached, Apr–Aug 2026</div>
          </div>
          <div>
            <div className="font-heading font-bold text-2xl sm:text-3xl text-[#1c1c1a]">
              5
            </div>
            <div className="text-xs text-[#706e68] mt-0.5">outreaches reported</div>
          </div>
          <div>
            <div className="font-heading font-bold text-2xl sm:text-3xl text-[#1c1c1a]">
              5
            </div>
            <div className="text-xs text-[#706e68] mt-0.5">states active</div>
          </div>
          <div>
            <div className="font-heading font-bold text-2xl sm:text-3xl text-maroon">
              ₦15,450,000
            </div>
            <div className="text-xs text-[#706e68] mt-0.5">spent on delivery (100% direct)</div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#1c1c1a] text-white shadow-sm'
                : 'bg-white border border-[#e5e0d8] text-[#4a4a46] hover:bg-[#f5f1e8]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('education')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeFilter === 'education'
                ? 'bg-maroon text-white shadow-sm'
                : 'bg-white border border-[#e5e0d8] text-[#4a4a46] hover:bg-[#f5f1e8]'
            }`}
          >
            Education
          </button>
          <button
            onClick={() => setActiveFilter('health')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeFilter === 'health'
                ? 'bg-forest text-white shadow-sm'
                : 'bg-white border border-[#e5e0d8] text-[#4a4a46] hover:bg-[#f5f1e8]'
            }`}
          >
            Health
          </button>
          <button
            onClick={() => setActiveFilter('livelihoods')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeFilter === 'livelihoods'
                ? 'bg-ochre text-white shadow-sm'
                : 'bg-white border border-[#e5e0d8] text-[#4a4a46] hover:bg-[#f5f1e8]'
            }`}
          >
            Livelihoods
          </button>
        </div>

        {/* Report Cards Stack */}
        <div className="flex flex-col gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-3xl border border-[#e5e0d8] overflow-hidden shadow-sm hover:border-[#d0c8bb] hover:shadow-md transition-all flex flex-col md:flex-row items-stretch"
            >
              {/* Photo on left */}
              <div className="md:w-80 h-52 md:h-auto overflow-hidden bg-gray-100 shrink-0">
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
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-maroon-tint text-maroon text-xs font-semibold uppercase tracking-wider">
                      {report.pillar}
                    </span>
                    <span className="text-xs text-[#706e68] font-medium">
                      {report.month}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#1c1c1a] mb-1">
                    {report.title}
                  </h3>
                  <div className="text-xs text-[#706e68] mb-3">
                    {report.location} · {report.dateRange}
                  </div>

                  <p className="text-sm text-[#4a4a46] leading-relaxed mb-4">
                    {report.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#e5e0d8] flex items-center justify-between flex-wrap gap-4">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#1c1c1a]">
                    <span className="w-2 h-2 rounded-full bg-forest" />
                    <span>{report.beneficiaries}</span>
                  </div>

                  <button
                    onClick={() => handleOpenReport(report.id)}
                    className="font-semibold text-sm text-maroon hover:text-maroon-dark transition-colors inline-flex items-center gap-1.5 cursor-pointer"
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
