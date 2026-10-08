import { ShieldCheck, Check, Heart, ArrowRight } from '../components/Icons';
import CurvedWaveBackground from '../components/CurvedWaveBackground';

export default function Transparency({ onOpenDonate, setCurrentPage }) {
  const outreachesSpent = [
    {
      month: 'August 2026',
      title: 'Youth skills, digital literacy & academic outreach',
      location: 'Lagos, Plateau, Benue & FCT',
      beneficiaries: '345 youths & students',
      spent: '₦4,850,000'
    },
    {
      month: 'July 2026',
      title: 'From apprentice to owner: two barbershops opened',
      location: 'Jos & Makurdi',
      beneficiaries: '2 young people in business',
      spent: '₦1,920,000'
    },
    {
      month: 'June 2026',
      title: 'Clean cooking and welfare support for 80 widows',
      location: 'Abuja, Benue, Oyo & Lagos',
      beneficiaries: '80 widows (20 per state)',
      spent: '₦3,850,000'
    },
    {
      month: 'May 2026',
      title: 'Child empowerment: learning materials & retention',
      location: 'Benue, Lagos, Plateau & Oyo',
      beneficiaries: '300 pupils',
      spent: '₦2,450,000'
    },
    {
      month: 'April 2026',
      title: 'Maternal healthcare & malaria prevention',
      location: 'Abuja, Benue & Lagos',
      beneficiaries: '130 high-risk mothers',
      spent: '₦2,380,000'
    }
  ];

  return (
    <div className="relative w-full bg-[#fdfbf7] text-[#1c1c1a] py-10 sm:py-16 overflow-hidden">
      <CurvedWaveBackground side="right" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-maroon block mb-2">
            FINANCIAL TRANSPARENCY
          </span>
          <h1 className="font-heading font-bold text-3xl sm:text-5xl text-[#1c1c1a] mb-4">
            Where every naira goes.
          </h1>
          <p className="text-base sm:text-lg text-[#4a4a46] leading-relaxed">
            The 100% promise shown with real figures: 100% of public donations fund frontline deliverables. Trustee endowments privately fund all administration and overhead.
          </p>
        </div>

        {/* 3 Large Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-3xl p-8 border border-[#e5e0d8] shadow-sm flex flex-col justify-between">
            <div>
              <div className="font-heading font-bold text-4xl text-forest mb-2">
                100%
              </div>
              <h3 className="font-heading font-bold text-lg text-[#1c1c1a] mb-2">
                To Frontline Programmes
              </h3>
              <p className="text-sm text-[#4a4a46] leading-relaxed">
                Every kobo given by the public pays school fees, buys learning kits, medications, and livelihood tools.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-[#e5e0d8] shadow-sm flex flex-col justify-between">
            <div>
              <div className="font-heading font-bold text-4xl text-[#1c1c1a] mb-2">
                ₦0 (0.0%)
              </div>
              <h3 className="font-heading font-bold text-lg text-[#1c1c1a] mb-2">
                Administrative Overhead
              </h3>
              <p className="text-sm text-[#4a4a46] leading-relaxed">
                Zero cuts taken from public gifts. Trustees and founders privately cover all office rent, transport, and banking fees.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-[#e5e0d8] shadow-sm flex flex-col justify-between">
            <div>
              <div className="font-heading font-bold text-4xl text-maroon mb-2">
                RC 7015705
              </div>
              <h3 className="font-heading font-bold text-lg text-[#1c1c1a] mb-2">
                CAC Registered Non-Profit
              </h3>
              <p className="text-sm text-[#4a4a46] leading-relaxed">
                Fully incorporated under the Companies and Allied Matters Act by the Corporate Affairs Commission of Nigeria.
              </p>
            </div>
          </div>
        </div>

        {/* Spending Per Outreach Table */}
        <div className="mb-16">
          <div className="mb-6">
            <h2 className="font-heading font-bold text-2xl text-[#1c1c1a] mb-1">
              Spending per outreach (2026 Deliverables)
            </h2>
            <p className="text-xs sm:text-sm text-[#706e68]">
              Published within 14 days of every outreach with receipts and photo documentation.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#e5e0d8] overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-[#f5f1e8] text-[#1c1c1a] font-heading font-semibold border-b border-[#e5e0d8]">
                  <th className="py-4 px-6">Outreach &amp; Date</th>
                  <th className="py-4 px-6 hidden sm:table-cell">Locations</th>
                  <th className="py-4 px-6">Deliverables &amp; Beneficiaries</th>
                  <th className="py-4 px-6 text-right">Direct Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e0d8] text-[#4a4a46]">
                {outreachesSpent.map((o, idx) => (
                  <tr key={idx} className="hover:bg-[#fdfbf7] transition-colors">
                    <td className="py-4 px-6 font-medium text-[#1c1c1a]">
                      <div>{o.title}</div>
                      <div className="text-xs text-[#706e68] font-normal">{o.month}</div>
                    </td>
                    <td className="py-4 px-6 hidden sm:table-cell text-xs">{o.location}</td>
                    <td className="py-4 px-6 text-xs">{o.beneficiaries}</td>
                    <td className="py-4 px-6 text-right font-heading font-bold text-maroon">{o.spent}</td>
                  </tr>
                ))}
                <tr className="bg-[#fdfbf7] font-heading font-bold text-[#1c1c1a]">
                  <td colSpan={2} className="py-4 px-6 text-base">Total Delivered (Apr–Aug 2026)</td>
                  <td className="py-4 px-6 text-xs hidden sm:table-cell text-[#706e68]">857 direct beneficiaries</td>
                  <td className="py-4 px-6 text-right text-base text-maroon">₦15,450,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Documents, Controls & Safeguarding */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Controls */}
          <div className="bg-white rounded-3xl p-8 border border-[#e5e0d8] shadow-sm">
            <h3 className="font-heading font-bold text-xl text-[#1c1c1a] mb-4">
              Financial Controls &amp; Direct Payment
            </h3>
            <ul className="space-y-3.5 text-sm text-[#4a4a46]">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-forest-tint text-forest flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span><strong>Direct Institution Payment:</strong> School fees and examination registrations are paid straight into institutional school bank accounts. No raw cash is handed out in the field.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-forest-tint text-forest flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span><strong>Wholesale Material Sourcing:</strong> Uniforms, books, mosquito nets and tools are purchased directly from certified suppliers with itemized audit invoices.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-forest-tint text-forest flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span><strong>Dual Trustee Sign-Off:</strong> All disbursements require formal verification by our finance desk and project manager before release.</span>
              </li>
            </ul>
          </div>

          {/* Child Safeguarding Policy */}
          <div className="bg-white rounded-3xl p-8 border border-[#e5e0d8] shadow-sm">
            <h3 className="font-heading font-bold text-xl text-[#1c1c1a] mb-4">
              Child Safeguarding &amp; Photo Consent
            </h3>
            <div className="text-sm text-[#4a4a46] space-y-3 leading-relaxed">
              <p>
                We prioritize the dignity, safety and emotional wellbeing of every child we encounter.
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm">
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
        <div className="bg-[#f5f1e8] rounded-3xl p-8 sm:p-10 border border-[#e5e0d8] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading font-bold text-xl text-[#1c1c1a] mb-1">
              Have questions about our audits or accounts?
            </h3>
            <p className="text-sm text-[#4a4a46]">
              Reach our national secretariat or review filed documents in person in Abuja.
            </p>
          </div>
          <button
            onClick={() => onOpenDonate()}
            className="btn-primary px-8 py-3.5 text-sm shrink-0"
          >
            Support our mission
          </button>
        </div>

      </div>
    </div>
  );
}
