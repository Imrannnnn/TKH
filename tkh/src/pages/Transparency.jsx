import { useState } from 'react';
import { Check, ArrowRight, Download, MessageCircle } from '../components/Icons';

export const OUTREACHES_SPENT = [
  {
    month: 'January 2026',
    title: 'Less Privileged & Widows Winter Outreach',
    pillar: 'livelihoods',
    location: 'Abuja & Makurdi',
    beneficiaries: '33 individuals',
    amount: 626000,
    spent: '₦626,000'
  },
  {
    month: 'February 2026',
    title: 'Academic Outreach: Inter-School Quiz & Debate',
    pillar: 'education',
    location: 'Abuja, Jos, Makurdi & Ibadan',
    beneficiaries: '37 student prize-winners',
    amount: 1061000,
    spent: '₦1,061,000'
  },
  {
    month: 'March 2026',
    title: 'Women Empowerment & Small Livelihoods Grants',
    pillar: 'livelihoods',
    location: 'Abuja, Jos, Lagos, Oyo & Makurdi',
    beneficiaries: '179 women traders',
    amount: 1645900,
    spent: '₦1,645,900'
  },
  {
    month: 'April 2026',
    title: 'Maternal Healthcare & Malaria Prevention',
    pillar: 'health',
    location: 'Lagos, Plateau & FCT Abuja',
    beneficiaries: '130 high-risk mothers',
    amount: 2380000,
    spent: '₦2,380,000'
  },
  {
    month: 'May 2026',
    title: 'Child Empowerment: Learning Materials & Retention',
    pillar: 'education',
    location: 'Benue, Lagos, Plateau & Oyo',
    beneficiaries: '300 primary & secondary pupils',
    amount: 2450000,
    spent: '₦2,450,000'
  },
  {
    month: 'June 2026',
    title: 'Clean Cooking & Welfare Support for 80 Widows',
    pillar: 'livelihoods',
    location: 'Abuja, Benue, Oyo & Lagos',
    beneficiaries: '80 widows (20 per state)',
    amount: 3850000,
    spent: '₦3,850,000'
  },
  {
    month: 'July 2026',
    title: 'From Apprentice to Owner: Two Barbershops Opened',
    pillar: 'livelihoods',
    location: 'Jos & Makurdi (Plateau & Benue)',
    beneficiaries: '2 young entrepreneurs in business',
    amount: 1920000,
    spent: '₦1,920,000'
  },
  {
    month: 'August 2026',
    title: 'Youth Skills, Digital Literacy & Academic Outreach',
    pillar: 'education',
    location: 'Lagos, Plateau, Benue & FCT Abuja',
    beneficiaries: '345 youths & students',
    amount: 4850000,
    spent: '₦4,850,000'
  },
  {
    month: 'September 2026',
    title: 'Abba Father Rich Orphanage Home Outreach',
    pillar: 'education',
    location: 'Plateau State',
    beneficiaries: '100+ resident children & orphans',
    amount: 2100000,
    spent: '₦2,100,000'
  },
  {
    month: 'September 2026',
    title: 'Pad A Girl Child Outreach & Pad Bank Launch',
    pillar: 'health',
    location: 'GGSS Dutse Alhaji, Abuja',
    beneficiaries: '384 students reached · 72 pads in pad bank',
    amount: 1274000,
    spent: '₦1,274,000'
  }
];

export default function Transparency({ onOpenDonate, setCurrentPage }) {
  const [downloadMsg, setDownloadMsg] = useState(false);

  const totalDelivered = 16971575;
  const maxAmount = Math.max(...OUTREACHES_SPENT.map((o) => o.amount));

  // Compute breakdown by pillar
  const educationTotal = OUTREACHES_SPENT.filter((o) => o.pillar === 'education').reduce(
    (sum, o) => sum + o.amount,
    0
  );
  const healthTotal = OUTREACHES_SPENT.filter((o) => o.pillar === 'health').reduce(
    (sum, o) => sum + o.amount,
    0
  );
  const livelihoodsTotal = OUTREACHES_SPENT.filter((o) => o.pillar === 'livelihoods').reduce(
    (sum, o) => sum + o.amount,
    0
  );

  const educationPct = ((educationTotal / totalDelivered) * 100).toFixed(1);
  const healthPct = ((healthTotal / totalDelivered) * 100).toFixed(1);
  const livelihoodsPct = ((livelihoodsTotal / totalDelivered) * 100).toFixed(1);

  const handleDownloadPdf = () => {
    setDownloadMsg(true);
    setTimeout(() => {
      window.print();
      setDownloadMsg(false);
    }, 300);
  };

  return (
    <div className="w-full bg-[#fdfbf7] text-[#1c1c1a] py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 1. Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7a1b1b] block mb-2">
            FINANCIAL TRANSPARENCY
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-stone-900 mb-4 tracking-tight leading-tight">
            Where every naira goes.
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            The 100% promise backed by real numbers: 100% of public gifts fund frontline deliverables. Founder and trustee endowments privately fund all operational overhead and administration.
          </p>
        </div>

        {/* 2. Three Promise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div className="bg-white rounded-3xl p-7 sm:p-8 border border-stone-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="font-bold text-4xl sm:text-5xl text-[#1b4d3e] mb-3 tracking-tight">
                100%
              </div>
              <h3 className="font-bold text-lg sm:text-xl text-stone-900 mb-2">
                To frontline programmes
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Every single kobo given by donors pays school fees, buys learning kits, medications, and livelihood starter tools.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-7 sm:p-8 border border-stone-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="font-bold text-4xl sm:text-5xl text-stone-900 mb-3 tracking-tight">
                ₦0 (0.0%)
              </div>
              <h3 className="font-bold text-lg sm:text-xl text-stone-900 mb-2">
                Administrative overhead
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Zero cuts taken from public gifts. Trustees privately cover executive logistics, transport, card processing, and office costs.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-7 sm:p-8 border border-stone-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="font-bold text-3xl sm:text-4xl text-[#7a1b1b] mb-3 tracking-tight">
                ₦16,971,575
              </div>
              <h3 className="font-bold text-lg sm:text-xl text-stone-900 mb-2">
                Total delivered in 2026
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                1,690 direct beneficiaries equipped across 10 completed field missions in 7 Nigerian states with public receipts.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Spending Split Bar by Focus Area */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                Frontline spending split by focus area
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                Distribution of ₦16,971,575 across 10 completed field missions in 2026
              </p>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-stone-700 bg-stone-100 px-3.5 py-1.5 rounded-full self-start sm:self-auto">
              100% Direct Delivery
            </div>
          </div>

          {/* Horizontal Segmented Bar */}
          <div className="w-full h-5 sm:h-6 rounded-full overflow-hidden flex bg-stone-100 mb-6 shadow-inner">
            <div
              style={{ width: `${educationPct}%` }}
              className="bg-[#7a1b1b] transition-all duration-500 relative group"
              title={`Education: ${educationPct}% (₦${educationTotal.toLocaleString()})`}
            />
            <div
              style={{ width: `${healthPct}%` }}
              className="bg-[#1b4d3e] transition-all duration-500 relative group"
              title={`Health: ${healthPct}% (₦${healthTotal.toLocaleString()})`}
            />
            <div
              style={{ width: `${livelihoodsPct}%` }}
              className="bg-[#8c5310] transition-all duration-500 relative group"
              title={`Livelihoods: ${livelihoodsPct}% (₦${livelihoodsTotal.toLocaleString()})`}
            />
          </div>

          {/* Legend */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-[#7a1b1b] shrink-0" />
              <div>
                <div className="text-sm font-bold text-stone-900">
                  Education · {educationPct}%
                </div>
                <div className="text-xs text-stone-500">
                  ₦{educationTotal.toLocaleString()} · 4 outreaches
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-[#1b4d3e] shrink-0" />
              <div>
                <div className="text-sm font-bold text-stone-900">
                  Health · {healthPct}%
                </div>
                <div className="text-xs text-stone-500">
                  ₦{healthTotal.toLocaleString()} · 2 outreaches
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-[#8c5310] shrink-0" />
              <div>
                <div className="text-sm font-bold text-stone-900">
                  Livelihoods · {livelihoodsPct}%
                </div>
                <div className="text-xs text-stone-500">
                  ₦{livelihoodsTotal.toLocaleString()} · 4 outreaches
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Cleaner Spending Table with Cost Bar on Each Row */}
        <div className="mb-14 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Spending per outreach (2026 Deliverables)
              </h2>
              <p className="text-sm text-stone-500 mt-1">
                Published within two weeks of each outreach with receipts, itemized invoices, and photo documentation.
              </p>
            </div>

            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>{downloadMsg ? 'Preparing document...' : 'Download full accounts PDF'}</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-stone-50 text-stone-900 font-semibold border-b border-stone-200">
                    <th className="py-4 px-5 sm:px-6">Outreach &amp; Date</th>
                    <th className="py-4 px-4 sm:px-6">Focus Area</th>
                    <th className="py-4 px-4 sm:px-6 hidden sm:table-cell">Locations</th>
                    <th className="py-4 px-4 sm:px-6">Deliverables &amp; Beneficiaries</th>
                    <th className="py-4 px-5 sm:px-6 text-right">Direct Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-700">
                  {OUTREACHES_SPENT.map((o, idx) => {
                    const badgeBg =
                      o.pillar === 'education'
                        ? 'bg-[#7a1b1b]'
                        : o.pillar === 'health'
                        ? 'bg-[#1b4d3e]'
                        : 'bg-[#8c5310]';

                    const relativeWidth = Math.round((o.amount / maxAmount) * 100);

                    return (
                      <tr key={idx} className="hover:bg-stone-50/60 transition-colors">
                        <td className="py-4 px-5 sm:px-6 font-medium text-stone-900">
                          <div>{o.title}</div>
                          <div className="text-xs text-stone-400 font-normal">{o.month}</div>
                        </td>
                        <td className="py-4 px-4 sm:px-6">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${badgeBg}`}
                          >
                            {o.pillar}
                          </span>
                        </td>
                        <td className="py-4 px-4 sm:px-6 hidden sm:table-cell text-stone-600 text-xs">
                          {o.location}
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-stone-800 text-xs sm:text-sm">
                          {o.beneficiaries}
                        </td>
                        <td className="py-4 px-5 sm:px-6 text-right">
                          <div className="font-bold text-stone-900 text-sm sm:text-base whitespace-nowrap">
                            {o.spent}
                          </div>
                          {/* Cost bar */}
                          <div className="w-24 ml-auto mt-1 h-1.5 rounded-full bg-stone-100 overflow-hidden">
                            <div
                              style={{ width: `${relativeWidth}%` }}
                              className={`h-full rounded-full ${badgeBg}`}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="bg-stone-50/90 font-bold text-stone-900 border-t-2 border-stone-300">
                    <td colSpan="2" className="py-4 px-5 sm:px-6 text-sm sm:text-base">
                      Total Delivered (Jan–Sep 2026)
                    </td>
                    <td colSpan="2" className="py-4 px-4 sm:px-6 text-xs sm:text-sm text-stone-500">
                      1,690 direct beneficiaries · 7 states
                    </td>
                    <td className="py-4 px-5 sm:px-6 text-right text-base sm:text-lg text-[#7a1b1b] whitespace-nowrap">
                      ₦16,971,575
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 5. Financial Controls & Safeguarding (Side by Side) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-14 sm:mb-20">
          
          {/* Controls */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm">
            <h3 className="font-bold text-xl text-stone-900 mb-5">
              Financial controls &amp; direct payment
            </h3>
            <ul className="space-y-4 text-xs sm:text-sm text-stone-600">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </span>
                <span>
                  <strong className="text-stone-900 font-semibold">Direct Institution Payment:</strong> School fees and examination registrations are paid straight into official institutional school accounts. No cash is handed out in the field.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </span>
                <span>
                  <strong className="text-stone-900 font-semibold">Wholesale Material Sourcing:</strong> Uniforms, books, mosquito nets and tools are purchased directly from manufacturers and certified distributors with itemized invoices.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  ✓
                </span>
                <span>
                  <strong className="text-stone-900 font-semibold">Two sign-offs on every payment:</strong> All disbursements require formal dual authorization and co-signature by our finance desk and project manager before any funds are released.
                </span>
              </li>
            </ul>
          </div>

          {/* Child Safeguarding Policy */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm">
            <h3 className="font-bold text-xl text-stone-900 mb-5">
              Child safeguarding &amp; photo consent
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
              <p>
                We prioritize the dignity, safety and emotional wellbeing of every child and mother we encounter across our operational hubs.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-700 font-bold shrink-0 mt-0.5">✓</span>
                  <span>
                    <strong className="text-stone-900 font-semibold">Written Guardian Consent:</strong> Guardian and school principal authorization is secured before publishing any photographs.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-700 font-bold shrink-0 mt-0.5">✓</span>
                  <span>
                    <strong className="text-stone-900 font-semibold">Zero Exploitative Imagery:</strong> We never use distressing, degrading, or staged depictions of hardship. Children are portrayed with dignity and respect.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-700 font-bold shrink-0 mt-0.5">✓</span>
                  <span>
                    <strong className="text-stone-900 font-semibold">Identity &amp; Address Protection:</strong> Specific home coordinates, phone numbers, and identifying personal data are strictly withheld.
                  </span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* 6. Closing Band */}
        <div className="bg-[#7a1b1b] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 shadow-sm">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
              Have questions about our audits or accounts?
            </h3>
            <p className="text-white/90 text-sm sm:text-base max-w-xl leading-relaxed">
              Our coordinator team answers any financial questions directly. Ask on WhatsApp or support our upcoming field missions.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/2348180994301"
              target="_blank"
              rel="noreferrer"
              className="bg-white hover:bg-stone-100 text-stone-900 font-semibold px-6 py-3.5 rounded-full transition-colors shadow-sm text-sm sm:text-base whitespace-nowrap cursor-pointer inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-700 fill-current" />
              <span>Ask on WhatsApp</span>
            </a>
            <button
              onClick={() => onOpenDonate()}
              className="border border-white/60 hover:bg-white/10 text-white font-semibold px-6 py-3.5 rounded-full transition-colors shadow-sm text-sm sm:text-base whitespace-nowrap cursor-pointer"
            >
              Support our mission
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
