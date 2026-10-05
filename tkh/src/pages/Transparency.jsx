import { useData } from '../context/DataContext';
import { ShieldCheck, CheckCircle2, Heart, Mail } from '../components/Icons';
import CurvedWaveBackground from '../components/CurvedWaveBackground';

export default function Transparency({ onOpenDonate }) {
  const { allocations: dynamicAllocations } = useData();

  const defaultAllocations = [
    { label: 'Frontline Programs & Field Deliverables', pct: 88.4, color: 'bg-primary', desc: 'Classroom construction, textbook printing, solar installations, pharmaceutical procurement, and student scholarships.' },
    { label: 'Field Monitoring & Third-Party Engineering Audits', pct: 11.6, color: 'bg-forest', desc: 'GPS site mapping, structural integrity checks, clinical cold-chain verification, and outcome tracking.' },
    { label: 'Administrative & Executive Overhead', pct: 0.0, color: 'bg-ink-muted', desc: '100% covered privately by Trustee Endowment. Zero kobo is deducted from public donor contributions.' }
  ];

  const activeAllocations = dynamicAllocations && dynamicAllocations.length > 0 ? dynamicAllocations : defaultAllocations;

  return (
    <div className="pt-24 md:pt-28 animate-fade-in bg-white pb-20">
      {/* Header with Ambient Wave */}
      <section className="relative py-12 md:py-16 px-4 md:px-8 max-w-5xl mx-auto text-center overflow-hidden">
        <CurvedWaveBackground side="right" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand text-primary font-bold text-xs uppercase tracking-widest mb-4 border border-[#e7e2d8] font-heading">
            <ShieldCheck className="w-4 h-4" />
            <span>Radical Accountability</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-ink max-w-3xl mx-auto mb-6 tracking-tight">
            Open Books. Pure Trust. <br />
            <span className="text-primary">100% Direct Giving.</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-light max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            We operate on a zero-overhead public donation model: 100% of your gift goes to frontline deliverables. Trustee endowments privately fund all admin and operational costs.
          </p>
        </div>
      </section>

      {/* Financial Breakdown Section with Mirrored Wave */}
      <section className="relative py-12 px-4 md:px-8 max-w-5xl mx-auto overflow-hidden">
        <CurvedWaveBackground side="left" />

        <div className="relative z-10 bg-white/95 backdrop-blur-xs p-5 sm:p-8 md:p-12 rounded-3xl border border-[#e7e2d8] shadow-xs mb-12">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
            Fund Allocation Breakdown
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-ink mb-6">
            Where Every Naira &amp; Dollar Goes
          </h2>

          <div className="w-full h-4 rounded-full bg-[#ded8cc] flex overflow-hidden mb-6">
            {activeAllocations.map((a, i) => (
              <div
                key={a.id || i}
                className={`${a.color} h-full transition-all duration-300`}
                style={{ width: `${Math.min(100, Math.max(0, a.pct))}%` }}
                title={`${a.pct}% ${a.label}`}
              />
            ))}
          </div>

          <div className="space-y-4 mb-8">
            {activeAllocations.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-sand/90 border border-[#e7e2d8] flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div className="flex items-start gap-3">
                  <span className={`w-3.5 h-3.5 rounded-full ${item.color} mt-1 shrink-0`} />
                  <div>
                    <h4 className="text-sm font-heading font-bold text-ink">{item.label}</h4>
                    <p className="text-xs text-ink-light mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                <span className="font-mono text-xl font-bold text-ink shrink-0 pl-6 sm:pl-0">
                  {item.pct.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 leading-relaxed flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>
              <strong>The 100% Promise:</strong> Public donations are never routed to salaries, office leases, or fundraising agencies.
            </span>
          </div>
        </div>

        {/* Legal Status & CAC Incorporation */}
        <div className="bg-sand/90 p-5 sm:p-8 md:p-10 rounded-3xl border border-[#e7e2d8] shadow-xs mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-bold font-heading">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Officially Incorporated in Nigeria</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-ink">
                Corporate Affairs Commission (CAC) Registration
              </h3>
              <p className="text-xs sm:text-sm text-ink-light max-w-2xl leading-relaxed">
                Ten Kind Hands Initiative is a legally incorporated non-profit foundation chartered under the Companies and Allied Matters Act (CAMA) by the Federal Government of Nigeria.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs flex flex-col gap-1 min-w-[240px]">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-ink-muted">
                Official Registration Number
              </span>
              <span className="font-mono text-2xl font-extrabold text-forest">
                RC: 7015705
              </span>
              <span className="text-[11px] text-ink-light">
                Verifiable on the public CAC portal (<a href="https://search.cac.gov.ng" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium">search.cac.gov.ng</a>)
              </span>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-[#e7e2d8] grid sm:grid-cols-2 gap-4 text-xs text-ink-light">
            <div>
              <strong className="block font-heading text-ink text-xs mb-0.5">Corporate Entity:</strong>
              <span>Ten Kind Hands Initiative</span>
            </div>
            <div>
              <strong className="block font-heading text-ink text-xs mb-0.5">Registered Secretariat:</strong>
              <span>Danglo plaza 204, 6th Avenue Gwarinpa, Abuja - Nigeria</span>
            </div>
          </div>
        </div>

        {/* Governance & Fiduciary Safeguards */}
        <div className="bg-white p-5 sm:p-8 md:p-12 rounded-3xl border border-[#e7e2d8] shadow-xs mb-12">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
              Governance Charter
            </span>
            <h3 className="text-2xl font-heading font-bold text-ink">
              Core Principles of Financial Stewardship
            </h3>
            <p className="text-xs sm:text-sm text-ink-light mt-1.5 leading-relaxed">
              How Ten Kind Hands ensures every contribution delivers verifiable frontline impact across Nigeria.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-sand/80 border border-[#e7e2d8] flex flex-col justify-between">
              <div>
                <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary font-bold text-xs flex items-center justify-center mb-3 font-mono">
                  01
                </span>
                <h4 className="text-base font-heading font-bold text-ink mb-1.5">
                  Direct Vendor Settlement
                </h4>
                <p className="text-xs text-ink-light leading-relaxed">
                  Field transactions are conducted electronically directly to verified educational suppliers, pharmaceutical distributors, and registered artisans. Cash handling on the field is prohibited.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-sand/80 border border-[#e7e2d8] flex flex-col justify-between">
              <div>
                <span className="w-8 h-8 rounded-xl bg-forest/10 text-forest font-bold text-xs flex items-center justify-center mb-3 font-mono">
                  02
                </span>
                <h4 className="text-base font-heading font-bold text-ink mb-1.5">
                  Private Trustee Endowment
                </h4>
                <p className="text-xs text-ink-light leading-relaxed">
                  Our Board of Trustees privately funds all office leases, executive allowances, technology infrastructure, and banking transaction fees. Zero kobo is deducted from your public gift.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-sand/80 border border-[#e7e2d8] flex flex-col justify-between">
              <div>
                <span className="w-8 h-8 rounded-xl bg-clay/10 text-clay font-bold text-xs flex items-center justify-center mb-3 font-mono">
                  03
                </span>
                <h4 className="text-base font-heading font-bold text-ink mb-1.5">
                  Open Field Verification
                </h4>
                <p className="text-xs text-ink-light leading-relaxed">
                  Every school renovation, medical mission, and book distribution is documented with GPS coordinates, beneficiary logs, and photographic records published openly on our Dispatches.
                </p>
              </div>
            </div>
          </div>

          {/* Compliance & Due Diligence Desk Callout */}
          <div className="mt-8 p-5 rounded-2xl bg-[#faf8f4] border border-[#e7e2d8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h5 className="text-sm font-heading font-bold text-ink">
                Institutional Due Diligence &amp; Audit Inquiries
              </h5>
              <p className="text-xs text-ink-light mt-0.5 leading-relaxed">
                For corporate CSR partnerships, grant audits, or governance inquiries, connect directly with our Secretariat Desk.
              </p>
            </div>
            <a
              href="mailto:finance@tenkindhands.org?subject=Institutional Due Diligence Inquiry"
              className="btn-secondary text-xs px-5 py-2.5 flex items-center justify-center gap-2 font-heading font-semibold shrink-0 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Finance Desk</span>
            </a>
          </div>
        </div>

        <div className="text-center pt-8">
          <button
            onClick={onOpenDonate}
            className="btn-primary w-full sm:w-auto text-xs sm:text-sm px-6 sm:px-8 py-3.5 inline-flex items-center justify-center gap-2 cursor-pointer shadow-md font-heading font-semibold"
          >
            <span>Back Our Direct Giving Mission</span>
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
