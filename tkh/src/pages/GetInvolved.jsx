import { useState } from 'react';
import { useData } from '../context/DataContext';
import { HandHeart, Heart, Users, Briefcase, CheckCircle2, ArrowRight, Copy, Check, Clock } from '../components/Icons';
import CurvedWaveBackground from '../components/CurvedWaveBackground';

export default function GetInvolved({ onOpenDonate, initialTab = 'donate' }) {
  const { addInquiry } = useData();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [prevInitialTab, setPrevInitialTab] = useState(initialTab);

  if (prevInitialTab !== initialTab) {
    setPrevInitialTab(initialTab);
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }

  // Volunteer form state
  const [volForm, setVolForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'outreach-support',
    availability: 'weekends',
    location: 'Nigeria (On-ground)',
    skills: ''
  });
  const [volSubmitted, setVolSubmitted] = useState(false);

  // Partnership form state
  const [partForm, setPartForm] = useState({
    orgName: '',
    contactName: '',
    email: '',
    partnerType: 'financial-sponsorship',
    message: ''
  });
  const [partSubmitted, setPartSubmitted] = useState(false);

  const [copiedBank, setCopiedBank] = useState(false);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('0123456789');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleVolSubmit = (e) => {
    e.preventDefault();
    if (addInquiry) {
      addInquiry({
        name: volForm.name,
        email: volForm.email,
        phone: volForm.phone,
        category: `Volunteer (${volForm.role})`,
        message: `Availability: ${volForm.availability}, Location: ${volForm.location}. Skills: ${volForm.skills}`,
        source: 'Volunteer Form'
      });
    }
    setVolSubmitted(true);
  };

  const handlePartSubmit = (e) => {
    e.preventDefault();
    if (addInquiry) {
      addInquiry({
        name: `${partForm.contactName} (${partForm.orgName})`,
        email: partForm.email,
        phone: '',
        category: `Partnership (${partForm.partnerType})`,
        message: partForm.message,
        source: 'Partner Form'
      });
    }
    setPartSubmitted(true);
  };

  return (
    <div className="pt-24 md:pt-28 animate-fade-in bg-white pb-20">
      {/* Header with Ambient Wave */}
      <section className="relative py-12 md:py-16 px-4 md:px-8 max-w-5xl mx-auto text-center overflow-hidden">
        <CurvedWaveBackground side="right" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand text-primary font-bold text-xs uppercase tracking-widest mb-4 border border-[#e7e2d8] font-heading">
            <HandHeart className="w-4 h-4" />
            <span>Take Action Today</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-heading font-extrabold text-ink leading-[1.15] max-w-3xl mx-auto mb-6 tracking-tight">
            Every Hand Moves <br />
            <span className="text-primary">A Community Forward.</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-light max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            Whether through financial giving, professional field volunteering, or institutional partnership, your contribution creates tangible human flourishing.
          </p>

          {/* 3 Main Action Tabs */}
          <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-full bg-sand border border-[#e7e2d8] max-w-lg mx-auto">
            <button
              onClick={() => setActiveTab('donate')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 font-heading ${
                activeTab === 'donate' ? 'bg-primary text-white shadow-xs' : 'text-ink-light hover:text-ink'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>1. Donate</span>
            </button>
            <button
              onClick={() => setActiveTab('volunteer')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 font-heading ${
                activeTab === 'volunteer' ? 'bg-forest text-white shadow-xs' : 'text-ink-light hover:text-ink'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>2. Volunteer</span>
            </button>
            <button
              onClick={() => setActiveTab('partnership')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 font-heading ${
                activeTab === 'partnership' ? 'bg-ink text-white shadow-xs' : 'text-ink-light hover:text-ink'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>3. Partner</span>
            </button>
          </div>
        </div>
      </section>

      {/* TAB 1: DONATE */}
      {activeTab === 'donate' && (
        <section className="relative max-w-4xl mx-auto px-4 md:px-8 overflow-hidden">
          <CurvedWaveBackground side="left" />

          <div className="relative z-10 bg-white/95 backdrop-blur-xs p-8 md:p-12 rounded-3xl border border-[#e7e2d8] shadow-xs mb-8">
            <div className="max-w-2xl mx-auto text-center mb-8">
              <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
                Tangible Giving
              </span>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                What Your Donation Accomplishes
              </h2>
              <p className="text-xs md:text-sm text-ink-light mt-1.5 leading-relaxed">
                100% of individual public donations directly fund frontline classrooms, desks, teacher stipends, and mobile medical missions.
              </p>
            </div>

            {/* Giving Tiers */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-sand/90 p-6 rounded-2xl border border-[#e7e2d8] flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-forest uppercase tracking-wider block mb-1 font-heading">Tuition &amp; Books</span>
                  <span className="font-mono text-2xl font-bold text-primary block">₦15,000 / $25</span>
                  <p className="text-xs text-ink-light mt-2 leading-relaxed">
                    Provides one vulnerable student with full term tuition, custom tailored uniform, and complete textbook pack.
                  </p>
                </div>
                <button
                  onClick={onOpenDonate}
                  className="mt-4 w-full py-2.5 rounded-xl bg-white border border-[#e7e2d8] hover:border-primary text-xs font-bold text-ink hover:text-primary transition-colors cursor-pointer font-heading"
                >
                  Select ₦15,000 Tier
                </button>
              </div>

              <div className="bg-sand/90 p-6 rounded-2xl border border-[#e7e2d8] flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-forest uppercase tracking-wider block mb-1 font-heading">Mobile Medical Kit</span>
                  <span className="font-mono text-2xl font-bold text-forest block">₦50,000 / $65</span>
                  <p className="text-xs text-ink-light mt-2 leading-relaxed">
                    Equips a rural mobile clinic with malaria rapid diagnostics, pediatric antibiotics, and deworming for 40 patients.
                  </p>
                </div>
                <button
                  onClick={onOpenDonate}
                  className="mt-4 w-full py-2.5 rounded-xl bg-white border border-[#e7e2d8] hover:border-primary text-xs font-bold text-ink hover:text-primary transition-colors cursor-pointer font-heading"
                >
                  Select ₦50,000 Tier
                </button>
              </div>

              <div className="bg-sand/90 p-6 rounded-2xl border border-[#e7e2d8] flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-forest uppercase tracking-wider block mb-1 font-heading">Full Scholarship Year</span>
                  <span className="font-mono text-2xl font-bold text-primary block">₦100,000 / $130</span>
                  <p className="text-xs text-ink-light mt-2 leading-relaxed">
                    Sponsors an entire academic year of schooling, term exam registrations, daily nutrition, and health checks for one child.
                  </p>
                </div>
                <button
                  onClick={onOpenDonate}
                  className="mt-4 w-full py-2.5 rounded-xl bg-white border border-[#e7e2d8] hover:border-primary text-xs font-bold text-ink hover:text-primary transition-colors cursor-pointer font-heading"
                >
                  Select ₦100,000 Tier
                </button>
              </div>

              <div className="bg-sand/90 p-6 rounded-2xl border border-[#e7e2d8] flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-forest uppercase tracking-wider block mb-1 font-heading">Solar Classroom Desk Block</span>
                  <span className="font-mono text-2xl font-bold text-clay block">₦250,000 / $320</span>
                  <p className="text-xs text-ink-light mt-2 leading-relaxed">
                    Handcrafts 10 durable dual-seater wooden student desks and installs solar roof lighting for a rural classroom block.
                  </p>
                </div>
                <button
                  onClick={onOpenDonate}
                  className="mt-4 w-full py-2.5 rounded-xl bg-white border border-[#e7e2d8] hover:border-primary text-xs font-bold text-ink hover:text-primary transition-colors cursor-pointer font-heading"
                >
                  Select ₦250,000 Tier
                </button>
              </div>
            </div>

            {/* Direct Instant Action */}
            <div className="text-center pt-2">
              <button
                onClick={onOpenDonate}
                className="btn-primary text-xs md:text-sm px-10 py-4 flex items-center gap-2 cursor-pointer shadow-md font-heading font-semibold mx-auto"
              >
                <span>Open Instant Secure Donation Flow</span>
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Nigerian Bank Transfer Card */}
          <div className="relative z-10 bg-white p-7 md:p-8 rounded-3xl border border-[#e7e2d8] shadow-xs">
            <h3 className="text-lg font-heading font-bold text-ink mb-3">
              Direct Nigerian Bank Account Details (GTBank)
            </h3>
            <div className="grid sm:grid-cols-3 gap-4 text-xs bg-sand p-4 rounded-2xl border border-[#e7e2d8] mb-3">
              <div>
                <span className="text-ink-muted block">Bank Name:</span>
                <span className="font-bold text-ink">Guaranty Trust Bank (GTBank)</span>
              </div>
              <div>
                <span className="text-ink-muted block">Account Name:</span>
                <span className="font-bold text-ink">Ten Kind Hands Initiative</span>
              </div>
              <div>
                <span className="text-ink-muted block">Naira Account:</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-base font-bold text-primary">0123456789</span>
                  <button
                    onClick={handleCopyAccount}
                    className="p-1 rounded bg-white border border-[#e7e2d8] text-[10px] font-bold text-primary cursor-pointer flex items-center gap-1"
                  >
                    {copiedBank ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedBank ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-ink-muted">
              For international wire routing (USD / GBP / EUR) or in-kind donations, please email{' '}
              <a href="mailto:finance@tenkindhands.org" className="text-primary font-bold underline">finance@tenkindhands.org</a>.
            </p>
          </div>
        </section>
      )}

      {/* TAB 2: VOLUNTEER */}
      {activeTab === 'volunteer' && (
        <section className="relative max-w-4xl mx-auto px-4 md:px-8 animate-fade-in overflow-hidden">
          <CurvedWaveBackground side="left" />

          <div className="relative z-10 bg-white/95 backdrop-blur-xs p-8 md:p-12 rounded-3xl border border-[#e7e2d8] shadow-xs mb-8">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
                Concrete Opportunities
              </span>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                Join Our Volunteer Field &amp; Remote Corps
              </h2>
              <p className="text-xs md:text-sm text-ink-light mt-1.5 leading-relaxed">
                We believe in structured roles, clear time commitments, and thorough onboarding so your energy creates maximal community value.
              </p>
            </div>

            {/* 4 Concrete Roles */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <div className="p-5 rounded-2xl bg-sand/90 border border-[#e7e2d8]">
                <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1 font-heading">Field Role</span>
                <h4 className="text-base font-heading font-bold text-ink mb-1">Outreach Logistics &amp; Distribution</h4>
                <p className="text-xs text-ink-light leading-relaxed mb-2">
                  Packing textbook consignments, coordinating community hall setups, and managing crowd flow during village outreach days.
                </p>
                <span className="text-[11px] text-forest font-semibold block">Commitment: 1 Saturday / Month (On-Site)</span>
              </div>

              <div className="p-5 rounded-2xl bg-sand/90 border border-[#e7e2d8]">
                <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1 font-heading">Education Role</span>
                <h4 className="text-base font-heading font-bold text-ink mb-1">Teaching &amp; Literacy Tutoring</h4>
                <p className="text-xs text-ink-light leading-relaxed mb-2">
                  Assisting primary school teachers with remedial reading circles, basic mathematics tutoring, and student mentorship.
                </p>
                <span className="text-[11px] text-forest font-semibold block">Commitment: 3–4 Hours / Week</span>
              </div>

              <div className="p-5 rounded-2xl bg-sand/90 border border-[#e7e2d8]">
                <span className="text-xs font-bold text-forest uppercase tracking-wider block mb-1 font-heading">Clinical Role</span>
                <h4 className="text-base font-heading font-bold text-ink mb-1">Medical Outreach Support</h4>
                <p className="text-xs text-ink-light leading-relaxed mb-2">
                  Open to certified doctors, nurses, and pharmacy technicians to administer tests and triage patients during mobile missions.
                </p>
                <span className="text-[11px] text-forest font-semibold block">Commitment: Per Scheduled Mission</span>
              </div>

              <div className="p-5 rounded-2xl bg-sand/90 border border-[#e7e2d8]">
                <span className="text-xs font-bold text-forest uppercase tracking-wider block mb-1 font-heading">Remote Role</span>
                <h4 className="text-base font-heading font-bold text-ink mb-1">Digital &amp; Design Skills Support</h4>
                <p className="text-xs text-ink-light leading-relaxed mb-2">
                  Supporting our reporting team with photo editing, grant research, quarterly report layouts, and social documentation.
                </p>
                <span className="text-[11px] text-forest font-semibold block">Commitment: Fully Remote • Flexible</span>
              </div>
            </div>

            {/* Application Form */}
            {volSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto mb-3" />
                <h3 className="text-xl font-heading font-bold text-emerald-900 mb-2">
                  Volunteer Application Received
                </h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed mb-4">
                  Thank you for stepping forward, {volForm.name}. Our Volunteer Coordination desk will review your details and contact you via email ({volForm.email}) within <strong>5 business days</strong> for orientation.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-white px-4 py-2 rounded-full border border-emerald-200 font-heading">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Next Step: Virtual 20-Minute Onboarding Call</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleVolSubmit} className="space-y-4 max-w-xl mx-auto">
                <h3 className="text-lg font-heading font-bold text-ink text-center mb-4">
                  Volunteer Application Form
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-ink block mb-1 font-heading">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Zainab Aliyu"
                      value={volForm.name}
                      onChange={(e) => setVolForm({ ...volForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-sand border border-[#e7e2d8] text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-ink block mb-1 font-heading">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={volForm.email}
                      onChange={(e) => setVolForm({ ...volForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-sand border border-[#e7e2d8] text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-ink block mb-1 font-heading">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="080 1234 5678"
                      value={volForm.phone}
                      onChange={(e) => setVolForm({ ...volForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-sand border border-[#e7e2d8] text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-ink block mb-1 font-heading">Role Interest *</label>
                    <select
                      value={volForm.role}
                      onChange={(e) => setVolForm({ ...volForm, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-sand border border-[#e7e2d8] text-xs focus:outline-none focus:border-primary cursor-pointer font-heading"
                    >
                      <option value="outreach-support">Outreach Logistics &amp; Field Distribution</option>
                      <option value="teaching">Teaching &amp; Remedial Tutoring</option>
                      <option value="medical">Medical / Clinical Practitioner</option>
                      <option value="remote-digital">Remote Graphic Design / Media</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-ink block mb-1 font-heading">Relevant Skills or Background</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us briefly about your experience, profession, or why you want to serve..."
                    value={volForm.skills}
                    onChange={(e) => setVolForm({ ...volForm, skills: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-sand border border-[#e7e2d8] text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3.5 text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm font-heading font-semibold"
                >
                  <span>Submit Volunteer Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </section>
      )}

      {/* TAB 3: PARTNERSHIP */}
      {activeTab === 'partnership' && (
        <section className="relative max-w-4xl mx-auto px-4 md:px-8 animate-fade-in overflow-hidden">
          <CurvedWaveBackground side="left" />

          <div className="relative z-10 bg-white/95 backdrop-blur-xs p-8 md:p-12 rounded-3xl border border-[#e7e2d8] shadow-xs mb-8">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
                Institutional Collaboration
              </span>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                Partner With Ten Kind Hands
              </h2>
              <p className="text-xs md:text-sm text-ink-light mt-1.5 leading-relaxed">
                We partner with corporate foundations, diaspora associations, schools, and institutional trusts to execute verifiable, high-impact field projects.
              </p>
            </div>

            {/* 4 Partnership Types */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <div className="p-5 rounded-2xl bg-sand/90 border border-[#e7e2d8]">
                <h4 className="text-sm font-heading font-bold text-primary mb-1">1. CSR &amp; Corporate Sponsorship</h4>
                <p className="text-xs text-ink-light leading-relaxed">
                  Sponsor full classroom construction blocks, solar power kits, or regional mobile clinics with dedicated auditable milestone reporting.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-sand/90 border border-[#e7e2d8]">
                <h4 className="text-sm font-heading font-bold text-primary mb-1">2. In-Kind Material Consignments</h4>
                <p className="text-xs text-ink-light leading-relaxed">
                  Bulk donations of certified pharmaceuticals, textbooks, refurbished laptops, or building materials directly delivered to verified sites.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-sand/90 border border-[#e7e2d8]">
                <h4 className="text-sm font-heading font-bold text-primary mb-1">3. Co-Hosted Community Outreaches</h4>
                <p className="text-xs text-ink-light leading-relaxed">
                  Collaborate with our logistical team to co-host comprehensive health screening and book donation drives under joint co-branding.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-sand/90 border border-[#e7e2d8]">
                <h4 className="text-sm font-heading font-bold text-primary mb-1">4. Institutional Grants &amp; Research</h4>
                <p className="text-xs text-ink-light leading-relaxed">
                  Partner on baseline needs assessments, educational retention tracking, and maternal health pilot studies in rural Nigeria.
                </p>
              </div>
            </div>

            {/* Partnership Form */}
            {partSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto mb-3" />
                <h3 className="text-xl font-heading font-bold text-emerald-900 mb-2">
                  Partnership Inquiry Submitted
                </h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed mb-4">
                  Thank you, {partForm.contactName} representing {partForm.orgName}. Our Executive &amp; Partnerships Desk will review your proposal and reply within <strong>2 business days</strong>.
                </p>
                <span className="text-xs font-semibold text-emerald-800 font-heading">
                  Direct Desk: partnerships@tenkindhands.org
                </span>
              </div>
            ) : (
              <form onSubmit={handlePartSubmit} className="space-y-4 max-w-xl mx-auto">
                <h3 className="text-lg font-heading font-bold text-ink text-center mb-4">
                  Institutional Partnership Inquiry
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-ink block mb-1 font-heading">Organization Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Energy Ltd / Lagos Diaspora Group"
                      value={partForm.orgName}
                      onChange={(e) => setPartForm({ ...partForm, orgName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-sand border border-[#e7e2d8] text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-ink block mb-1 font-heading">Contact Person *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Olumide Johnson"
                      value={partForm.contactName}
                      onChange={(e) => setPartForm({ ...partForm, contactName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-sand border border-[#e7e2d8] text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-ink block mb-1 font-heading">Official Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="partner@organization.org"
                      value={partForm.email}
                      onChange={(e) => setPartForm({ ...partForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-sand border border-[#e7e2d8] text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-ink block mb-1 font-heading">Partnership Interest *</label>
                    <select
                      value={partForm.partnerType}
                      onChange={(e) => setPartForm({ ...partForm, partnerType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-sand border border-[#e7e2d8] text-xs focus:outline-none focus:border-primary cursor-pointer font-heading"
                    >
                      <option value="financial-sponsorship">CSR Project Sponsorship (School/Clinic)</option>
                      <option value="in-kind">In-Kind Consignments (Books/Laptops/Medicine)</option>
                      <option value="co-hosted">Co-Hosted Outreach Collaboration</option>
                      <option value="institutional-grant">Institutional Grant / Foundation Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-ink block mb-1 font-heading">Partnership Overview</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your intended scope, timeline, or preferred Nigerian state..."
                    value={partForm.message}
                    onChange={(e) => setPartForm({ ...partForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-sand border border-[#e7e2d8] text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3.5 text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm font-heading font-semibold"
                >
                  <span>Submit Partnership Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
