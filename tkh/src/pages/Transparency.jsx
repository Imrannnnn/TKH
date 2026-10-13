import { ShieldCheck, Check, Heart, ArrowRight } from '../components/Icons';

export default function Transparency({ onOpenDonate, setCurrentPage }) {
  const outreachesSpent = [
    {
      month: 'January 2026',
      title: 'Less privilege and widows outreach',
      location: 'Abuja & Makurdi',
      beneficiaries: '33 individuals',
      spent: '₦626,000'
    },
    {
      month: 'February 2026',
      title: 'Academic outreach: Inter-school quiz and debate',
      location: 'Abuja, Jos, Makurdi & Ibadan',
      beneficiaries: '37 students',
      spent: '₦1,061,000'
    },
    {
      month: 'March 2026',
      title: 'Women Empowerment',
      location: 'Abuja, Jos, Lagos, Oyo & Makurdi',
      beneficiaries: '179 women',
      spent: '₦1,645,900'
    },
    {
      month: 'April 2026',
      title: 'Maternal health care and Malaria Prevention',
      location: 'Lagos, Jos & Abuja',
      beneficiaries: '130 individuals',
      spent: '₦1,145,500'
    },
    {
      month: 'May 2026',
      title: 'Child empowerment: Learning materials and retention',
      location: 'Makurdi, Lagos, Jos & Oyo',
      beneficiaries: '300 children',
      spent: '₦1,563,775'
    },
    {
      month: 'June 2026',
      title: 'Clean cooking and welfare support for 80 Widow',
      location: 'Makurdi, Oyo, Abuja & Lagos',
      beneficiaries: '80 widows',
      spent: '₦2,639,900'
    },
    {
      month: 'June 2026',
      title: 'From apprentice to owner: two barber shop opened',
      location: 'Jos & Benue',
      beneficiaries: '2 young people in business',
      spent: '₦943,300'
    },
    {
      month: 'August 2026',
      title: 'Youth skills, Digital literacy, Academic outreach',
      location: 'Lagos, Plateau & Benue',
      beneficiaries: '345 youths and Children',
      spent: '₦2,912,800'
    },
    {
      month: 'September 2026',
      title: 'Orphanage Outreach',
      location: 'Abuja, Oyo, Jos & Lagos',
      beneficiaries: '100 orphans',
      spent: '₦1,059,400'
    }
  ];

  return (
    <div className="relative w-full bg-[#fdfbf7] text-[#1c1c1a] py-8 sm:py-16 3xl:py-20 4xl:py-24 overflow-hidden">

      <div className="relative z-10 max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16 uw:px-20">

        {/* Header */}
        <div className="max-w-3xl 3xl:max-w-4xl 4xl:max-w-5xl mb-8 sm:mb-12 3xl:mb-16">
          <span className="text-xs 3xl:text-sm uppercase font-bold tracking-widest text-maroon block mb-2">
            FINANCIAL TRANSPARENCY
          </span>
          <h1 className="font-heading font-bold text-2xl xs:text-3xl sm:text-4xl lg:text-5xl 3xl:text-6xl text-[#1c1c1a] mb-4 leading-tight">
            Where every naira goes.
          </h1>
          <p className="text-sm sm:text-base lg:text-lg 3xl:text-xl text-[#4a4a46] leading-relaxed">
            The 100% promise shown with real figures: 100% of public donations fund frontline deliverables. Trustee endowments privately fund all administration and overhead.
          </p>
        </div>

        {/* 3 Large Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 3xl:gap-8 4xl:gap-10 mb-8 sm:mb-12 3xl:mb-16">
          <div className="bg-white rounded-3xl p-6 sm:p-8 3xl:p-10 4xl:p-12 border border-[#e5e0d8] shadow-sm flex flex-col justify-between">
            <div>
              <div className="font-heading font-bold text-3xl sm:text-4xl 3xl:text-5xl 4xl:text-6xl text-forest mb-2 3xl:mb-3">
                100%
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg 3xl:text-xl text-[#1c1c1a] mb-2">
                To Frontline Programmes
              </h3>
              <p className="text-xs sm:text-sm 3xl:text-base text-[#4a4a46] leading-relaxed">
                Every kobo given by the public pays school fees, buys learning kits, medications, and livelihood tools.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 3xl:p-10 4xl:p-12 border border-[#e5e0d8] shadow-sm flex flex-col justify-between">
            <div>
              <div className="font-heading font-bold text-3xl sm:text-4xl 3xl:text-5xl 4xl:text-6xl text-[#1c1c1a] mb-2 3xl:mb-3">
                ₦0 (0.0%)
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg 3xl:text-xl text-[#1c1c1a] mb-2">
                Administrative Overhead
              </h3>
              <p className="text-xs sm:text-sm 3xl:text-base text-[#4a4a46] leading-relaxed">
                Zero cuts taken from public gifts. Trustees and founders privately cover all office rent, transport, and banking fees.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 3xl:p-10 4xl:p-12 border border-[#e5e0d8] shadow-sm flex flex-col justify-between">
            <div>
              <div className="font-heading font-bold text-3xl sm:text-4xl 3xl:text-5xl 4xl:text-6xl text-maroon mb-2 3xl:mb-3">
                RC 7015705
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg 3xl:text-xl text-[#1c1c1a] mb-2">
                CAC Registered Non-Profit
              </h3>
              <p className="text-xs sm:text-sm 3xl:text-base text-[#4a4a46] leading-relaxed">
                Fully incorporated under the Companies and Allied Matters Act by the Corporate Affairs Commission of Nigeria.
              </p>
            </div>
          </div>
        </div>

        {/* Spending Per Outreach Table */}
        <div className="mb-12 sm:mb-16 3xl:mb-20">
          <div className="mb-4 sm:mb-6 3xl:mb-8">
            <h2 className="font-heading font-bold text-xl sm:text-2xl 3xl:text-3xl text-[#1c1c1a] mb-1">
              Spending per outreach (2026 Deliverables)
            </h2>
            <p className="text-xs sm:text-sm 3xl:text-base text-[#706e68]">
              Published within 14 days of every outreach with receipts and photo documentation.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#e5e0d8] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left border-collapse text-xs sm:text-sm 3xl:text-base">
                <thead>
                  <tr className="bg-[#f5f1e8] text-[#1c1c1a] font-heading font-semibold border-b border-[#e5e0d8]">
                    <th className="py-3.5 sm:py-4 3xl:py-5 px-4 sm:px-6 3xl:px-8">Outreach &amp; Date</th>
                    <th className="py-3.5 sm:py-4 3xl:py-5 px-3 sm:px-6 3xl:px-8 hidden sm:table-cell">Locations</th>
                    <th className="py-3.5 sm:py-4 3xl:py-5 px-3 sm:px-6 3xl:px-8">Deliverables &amp; Beneficiaries</th>
                    <th className="py-3.5 sm:py-4 3xl:py-5 px-4 sm:px-6 3xl:px-8 text-right">Direct Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5e0d8] text-[#4a4a46]">
                  {outreachesSpent.map((o, idx) => (
                    <tr key={idx} className="hover:bg-[#fdfbf7] transition-colors">
                      <td className="py-3.5 sm:py-4 3xl:py-5 px-4 sm:px-6 3xl:px-8 font-medium text-[#1c1c1a]">
                        <div className="3xl:text-lg">{o.title}</div>
                        <div className="text-xs 3xl:text-sm text-[#706e68] font-normal">{o.month}</div>
                      </td>
                      <td className="py-3.5 sm:py-4 3xl:py-5 px-3 sm:px-6 3xl:px-8 hidden sm:table-cell text-xs 3xl:text-sm">{o.location}</td>
                      <td className="py-3.5 sm:py-4 3xl:py-5 px-3 sm:px-6 3xl:px-8 text-xs 3xl:text-sm">{o.beneficiaries}</td>
                      <td className="py-3.5 sm:py-4 3xl:py-5 px-4 sm:px-6 3xl:px-8 text-right font-heading font-bold text-maroon 3xl:text-lg whitespace-nowrap">{o.spent}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#fdfbf7] font-heading font-bold text-[#1c1c1a]">
                    <td colSpan={2} className="py-3.5 sm:py-4 3xl:py-5 px-4 sm:px-6 3xl:px-8 text-sm sm:text-base 3xl:text-lg">Total Delivered (Jan–Sep 2026)</td>
                    <td className="py-3.5 sm:py-4 3xl:py-5 px-3 sm:px-6 3xl:px-8 text-xs 3xl:text-sm hidden sm:table-cell text-[#706e68]">1,206 direct beneficiaries</td>
                    <td className="py-3.5 sm:py-4 3xl:py-5 px-4 sm:px-6 3xl:px-8 text-right text-sm sm:text-base 3xl:text-lg text-maroon whitespace-nowrap">₦13,597,575</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Documents, Controls & Safeguarding */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 3xl:gap-10 mb-12 sm:mb-16 3xl:mb-20">
          
          {/* Controls */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 3xl:p-10 4xl:p-12 border border-[#e5e0d8] shadow-sm">
            <h3 className="font-heading font-bold text-lg sm:text-xl 3xl:text-2xl text-[#1c1c1a] mb-4 3xl:mb-6">
              Financial Controls &amp; Direct Payment
            </h3>
            <ul className="space-y-3.5 3xl:space-y-4 text-xs sm:text-sm 3xl:text-base text-[#4a4a46]">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 3xl:w-6 3xl:h-6 rounded-full bg-forest-tint text-forest flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span><strong>Direct Institution Payment:</strong> School fees and examination registrations are paid straight into institutional school bank accounts. No raw cash is handed out in the field.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 3xl:w-6 3xl:h-6 rounded-full bg-forest-tint text-forest flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span><strong>Wholesale Material Sourcing:</strong> Uniforms, books, mosquito nets and tools are purchased directly from certified suppliers with itemized audit invoices.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 3xl:w-6 3xl:h-6 rounded-full bg-forest-tint text-forest flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span><strong>Dual Trustee Sign-Off:</strong> All disbursements require formal verification by our finance desk and project manager before release.</span>
              </li>
            </ul>
          </div>

          {/* Child Safeguarding Policy */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 3xl:p-10 4xl:p-12 border border-[#e5e0d8] shadow-sm">
            <h3 className="font-heading font-bold text-lg sm:text-xl 3xl:text-2xl text-[#1c1c1a] mb-4 3xl:mb-6">
              Child Safeguarding &amp; Photo Consent
            </h3>
            <div className="text-xs sm:text-sm 3xl:text-base text-[#4a4a46] space-y-3 3xl:space-y-4 leading-relaxed">
              <p>
                We prioritize the dignity, safety and emotional wellbeing of every child we encounter.
              </p>
              <ul className="space-y-2.5 3xl:space-y-3">
                <li className="flex items-start gap-2.5">
                  <span className="text-forest font-bold">✓</span>
                  <span><strong>Written Guardian Consent:</strong> Guardian and school principal authorization is secured before publishing any photographs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-forest font-bold">✓</span>
                  <span><strong>Zero Exploitative Imagery:</strong> We never use distressing, degrading or staged depictions of poverty. Children are portrayed with dignity and hope.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-forest font-bold">✓</span>
                  <span><strong>Identity Protection:</strong> Specific home addresses and contact points are strictly withheld.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* CTA Strip */}
        <div className="bg-[#f5f1e8] rounded-3xl p-6 sm:p-10 3xl:p-12 4xl:p-16 border border-[#e5e0d8] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 3xl:gap-10">
          <div>
            <h3 className="font-heading font-bold text-lg sm:text-xl 3xl:text-2xl text-[#1c1c1a] mb-1">
              Have questions about our audits or accounts?
            </h3>
            <p className="text-xs sm:text-sm 3xl:text-base text-[#4a4a46]">
              Reach our national secretariat or review filed documents in person in Abuja.
            </p>
          </div>
          <button
            onClick={() => onOpenDonate()}
            className="btn-primary w-full sm:w-auto px-8 3xl:px-10 py-3.5 3xl:py-4 text-sm 3xl:text-base shrink-0 text-center justify-center min-h-[44px]"
          >
            Support our mission
          </button>
        </div>

      </div>
    </div>
  );
}
