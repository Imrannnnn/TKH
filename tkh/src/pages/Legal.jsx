import { useState } from 'react';

export default function Legal({ initialSection = 'privacy', initialTab }) {
  const [activeTab, setActiveTab] = useState(initialTab || initialSection);
  const [prevInitialTab, setPrevInitialTab] = useState(initialTab);

  if (prevInitialTab !== initialTab) {
    setPrevInitialTab(initialTab);
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }

  return (
    <div className="pt-8 sm:pt-14 3xl:pt-18 animate-fade-in bg-white pb-16 sm:pb-20 3xl:pb-28">
      <section className="relative py-8 sm:py-12 md:py-16 3xl:py-20 px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16 uw:px-20 max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl 4xl:max-w-[1800px] mx-auto text-center overflow-hidden">
        <div className="relative z-10">
          <span className="text-xs 3xl:text-sm uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
            Governance &amp; Compliance
          </span>

          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl 3xl:text-7xl font-heading font-extrabold text-ink max-w-3xl 3xl:max-w-4xl mx-auto mb-4 tracking-tight leading-tight">
            Legal, Privacy &amp; <br />
            <span className="text-primary">Safeguarding Policies.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg 3xl:text-xl text-ink-light max-w-2xl 3xl:max-w-3xl mx-auto mb-6 leading-relaxed font-normal">
            Operating with strict adherence to Nigerian Non-Profit laws, NDPR data privacy, and UNICEF child safeguarding protocols.
          </p>

          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 3xl:gap-3 p-1 sm:p-1.5 3xl:p-2 rounded-2xl sm:rounded-full bg-sand border border-[#e7e2d8] max-w-lg 3xl:max-w-xl mx-auto">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-4 sm:px-5 3xl:px-6 py-2 sm:py-2.5 3xl:py-3 rounded-full text-xs 3xl:text-sm font-semibold transition-all cursor-pointer font-heading min-h-[40px] flex items-center justify-center ${
                activeTab === 'privacy' ? 'bg-primary text-white shadow-xs' : 'text-ink-light hover:text-ink'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`px-4 sm:px-5 3xl:px-6 py-2 sm:py-2.5 3xl:py-3 rounded-full text-xs 3xl:text-sm font-semibold transition-all cursor-pointer font-heading min-h-[40px] flex items-center justify-center ${
                activeTab === 'terms' ? 'bg-forest text-white shadow-xs' : 'text-ink-light hover:text-ink'
              }`}
            >
              Terms of Giving
            </button>
            <button
              onClick={() => setActiveTab('safeguarding')}
              className={`px-4 sm:px-5 3xl:px-6 py-2 sm:py-2.5 3xl:py-3 rounded-full text-xs 3xl:text-sm font-semibold transition-all cursor-pointer font-heading min-h-[40px] flex items-center justify-center ${
                activeTab === 'safeguarding' ? 'bg-ink text-white shadow-xs' : 'text-ink-light hover:text-ink'
              }`}
            >
              Child Safeguarding
            </button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl 4xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16 overflow-hidden">
        <div className="relative z-10 bg-white/95 backdrop-blur-xs p-5 sm:p-8 md:p-12 3xl:p-16 rounded-3xl border border-[#e7e2d8] shadow-xs">
          {activeTab === 'privacy' && (
            <div className="prose text-xs sm:text-sm 3xl:text-base text-ink-light leading-relaxed space-y-6 3xl:space-y-8">
              <h2 className="text-2xl 3xl:text-3xl font-heading font-bold text-ink">Privacy Policy &amp; Data Protection (NDPR Compliance)</h2>
              <p>
                Ten Kind Hands ("TKH", "we", "our") is registered under the Companies and Allied Matters Act of Nigeria. We respect your personal privacy and comply strictly with the Nigeria Data Protection Act (NDPA) and Global GDPR standards.
              </p>

              <h3 className="text-lg 3xl:text-xl font-heading font-bold text-ink">1. Information We Collect</h3>
              <p>
                When you donate, apply to volunteer, or submit an inquiry, we collect necessary identifying data including your full name, email address, phone number, and transaction references. <strong>We do not store complete debit/credit card numbers or CVVs</strong> — all payments are tokenized securely through PCI-DSS Level 1 certified gateways.
              </p>

              <h3 className="text-lg 3xl:text-xl font-heading font-bold text-ink">2. How We Use Donor Data</h3>
              <p>
                Your contact details are used strictly for sending tax-deductible donation receipts, audited project milestone updates, and vital emergency announcements. We never rent, barter, or sell donor information to third-party commercial marketing firms.
              </p>

              <h3 className="text-lg 3xl:text-xl font-heading font-bold text-ink">3. Your Data Rights</h3>
              <p>
                You retain the right to request a full copy of your stored records or ask for permanent data erasure at any time by emailing our Data Protection Officer at <a href="mailto:info@tenkindhands.org" className="text-primary underline">info@tenkindhands.org</a>.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="prose text-xs sm:text-sm 3xl:text-base text-ink-light leading-relaxed space-y-6 3xl:space-y-8">
              <h2 className="text-2xl 3xl:text-3xl font-heading font-bold text-ink">Terms of Giving &amp; Financial Governance</h2>

              <h3 className="text-lg 3xl:text-xl font-heading font-bold text-ink">1. Voluntary Philanthropic Giving</h3>
              <p>
                All financial contributions to Ten Kind Hands are voluntary, non-refundable charitable donations. Donations are deployed directly to frontline field programs in accordance with our approved charitable charter.
              </p>

              <h3 className="text-lg 3xl:text-xl font-heading font-bold text-ink">2. Zero-Overhead Commitment</h3>
              <p>
                100% of individual public donations are allocated to direct field deliverables (classroom infrastructure, textbooks, scholarships, mobile clinic supplies). Administrative, marketing, and operational salaries are covered separately through a dedicated Trustee Endowment.
              </p>

              <h3 className="text-lg 3xl:text-xl font-heading font-bold text-ink">3. Project Audits &amp; Reporting</h3>
              <p>
                Donors are provided with verified photo documentation, GPS-tagged project markers, and annual audited financial statements prepared by independent chartered accountants.
              </p>
            </div>
          )}

          {activeTab === 'safeguarding' && (
            <div className="prose text-xs sm:text-sm 3xl:text-base text-ink-light leading-relaxed space-y-6 3xl:space-y-8">
              <h2 className="text-2xl 3xl:text-3xl font-heading font-bold text-ink">Child Safeguarding &amp; Beneficiary Dignity Policy</h2>

              <h3 className="text-lg 3xl:text-xl font-heading font-bold text-ink">1. Zero Tolerance for Exploitation</h3>
              <p>
                Ten Kind Hands strictly enforces a zero-tolerance policy regarding child abuse, exploitation, or indignity. All volunteer field staff and medical personnel undergo mandatory background checks, identity verification, and safeguarding training prior to deployment.
              </p>

              <h3 className="text-lg 3xl:text-xl font-heading font-bold text-ink">2. Ethical Photography &amp; Informed Consent</h3>
              <p>
                All photographs and field case studies published on our platforms are captured with prior informed consent from parents, guardians, and village school councils. We never publish sensationalized, degrading, or exploitative imagery for fundraising purposes.
              </p>

              <h3 className="text-lg 3xl:text-xl font-heading font-bold text-ink">3. Reporting Violations</h3>
              <p>
                Any suspected breach of child safeguarding protocols can be reported directly and anonymously to our confidential Ethics Committee at <a href="mailto:info@tenkindhands.org" className="text-primary underline">info@tenkindhands.org</a>.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
