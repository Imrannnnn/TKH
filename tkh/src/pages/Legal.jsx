import React, { useState } from 'react';
import { ShieldCheck, FileText, CheckCircle2 } from '../components/Icons';
import CurvedWaveBackground from '../components/CurvedWaveBackground';

export default function Legal({ initialSection = 'privacy' }) {
  const [activeTab, setActiveTab] = useState(initialSection);

  return (
    <div className="pt-24 md:pt-28 animate-fade-in bg-white pb-20">
      <section className="relative py-12 md:py-16 px-4 md:px-8 max-w-5xl mx-auto text-center overflow-hidden">
        <CurvedWaveBackground side="right" />

        <div className="relative z-10">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
            Governance &amp; Compliance
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-ink max-w-3xl mx-auto mb-6 tracking-tight">
            Legal, Privacy &amp; <br />
            <span className="text-primary">Safeguarding Policies.</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-light max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            Operating with strict adherence to Nigerian Non-Profit laws (CAC/IT/NO: 148920), NDPR data privacy, and UNICEF child safeguarding protocols.
          </p>

          <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-full bg-sand border border-[#e7e2d8] max-w-lg mx-auto">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${
                activeTab === 'privacy' ? 'bg-primary text-white shadow-xs' : 'text-ink-light hover:text-ink'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${
                activeTab === 'terms' ? 'bg-forest text-white shadow-xs' : 'text-ink-light hover:text-ink'
              }`}
            >
              Terms of Giving
            </button>
            <button
              onClick={() => setActiveTab('safeguarding')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${
                activeTab === 'safeguarding' ? 'bg-ink text-white shadow-xs' : 'text-ink-light hover:text-ink'
              }`}
            >
              Child Safeguarding
            </button>
          </div>
        </div>
      </section>

      {/* Content Section with Mirrored Wave */}
      <section className="relative max-w-4xl mx-auto px-4 md:px-8 overflow-hidden">
        <CurvedWaveBackground side="left" />

        <div className="relative z-10 bg-white/95 backdrop-blur-xs p-8 sm:p-12 rounded-3xl border border-[#e7e2d8] shadow-xs">
          {activeTab === 'privacy' && (
            <div className="prose text-xs sm:text-sm text-ink-light leading-relaxed space-y-6">
              <h2 className="text-2xl font-heading font-bold text-ink">Privacy Policy &amp; Data Protection (NDPR Compliance)</h2>
              <p>
                Ten Kind Hands ("TKH", "we", "our") is registered under the Companies and Allied Matters Act of Nigeria (CAC/IT/NO: 148920). We respect your personal privacy and comply strictly with the Nigeria Data Protection Act (NDPA) and Global GDPR standards.
              </p>

              <h3 className="text-lg font-heading font-bold text-ink">1. Information We Collect</h3>
              <p>
                When you donate, apply to volunteer, or submit an inquiry, we collect necessary identifying data including your full name, email address, phone number, and transaction references. <strong>We do not store complete debit/credit card numbers or CVVs</strong> — all payments are tokenized securely through PCI-DSS Level 1 certified gateways.
              </p>

              <h3 className="text-lg font-heading font-bold text-ink">2. How We Use Donor Data</h3>
              <p>
                Your contact details are used strictly for sending tax-deductible donation receipts, audited project milestone updates, and vital emergency announcements. We never rent, barter, or sell donor information to third-party commercial marketing firms.
              </p>

              <h3 className="text-lg font-heading font-bold text-ink">3. Your Data Rights</h3>
              <p>
                You retain the right to request a full copy of your stored records or ask for permanent data erasure at any time by emailing our Data Protection Officer at <a href="mailto:privacy@tenkindhands.org" className="text-primary underline">privacy@tenkindhands.org</a>.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="prose text-xs sm:text-sm text-ink-light leading-relaxed space-y-6">
              <h2 className="text-2xl font-heading font-bold text-ink">Terms of Giving &amp; Financial Governance</h2>

              <h3 className="text-lg font-heading font-bold text-ink">1. Voluntary Philanthropic Giving</h3>
              <p>
                All financial contributions to Ten Kind Hands are voluntary, non-refundable charitable donations. Donations are deployed directly to frontline field programs in accordance with our approved charitable charter.
              </p>

              <h3 className="text-lg font-heading font-bold text-ink">2. Zero-Overhead Commitment</h3>
              <p>
                100% of individual public donations are allocated to direct field deliverables (classroom infrastructure, textbooks, scholarships, mobile clinic supplies). Administrative, marketing, and operational salaries are covered separately through a dedicated Trustee Endowment.
              </p>

              <h3 className="text-lg font-heading font-bold text-ink">3. Project Audits &amp; Reporting</h3>
              <p>
                Donors are provided with verified photo documentation, GPS-tagged project markers, and annual audited financial statements prepared by independent chartered accountants.
              </p>
            </div>
          )}

          {activeTab === 'safeguarding' && (
            <div className="prose text-xs sm:text-sm text-ink-light leading-relaxed space-y-6">
              <h2 className="text-2xl font-heading font-bold text-ink">Child Safeguarding &amp; Beneficiary Dignity Policy</h2>

              <h3 className="text-lg font-heading font-bold text-ink">1. Zero Tolerance for Exploitation</h3>
              <p>
                Ten Kind Hands strictly enforces a zero-tolerance policy regarding child abuse, exploitation, or indignity. All volunteer field staff and medical personnel undergo mandatory background checks, identity verification, and safeguarding training prior to deployment.
              </p>

              <h3 className="text-lg font-heading font-bold text-ink">2. Ethical Photography &amp; Informed Consent</h3>
              <p>
                All photographs and field case studies published on our platforms are captured with prior informed consent from parents, guardians, and village school councils. We never publish sensationalized, degrading, or exploitative imagery for fundraising purposes.
              </p>

              <h3 className="text-lg font-heading font-bold text-ink">3. Reporting Violations</h3>
              <p>
                Any suspected breach of child safeguarding protocols can be reported directly and anonymously to our confidential Ethics Committee at <a href="mailto:safeguarding@tenkindhands.org" className="text-primary underline">safeguarding@tenkindhands.org</a>.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
