import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Heart, Check, Copy, ArrowRight, MessageCircle, ShieldCheck } from '../components/Icons';

export default function GetInvolved({ onOpenDonate, initialTab = 'donate' }) {
  const { addInquiry } = useData();
  const [activeTab, setActiveTab] = useState(initialTab || 'donate');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Donate Tab State (Artboard 05 Donate)
  const [frequency, setFrequency] = useState('once');
  const [selectedAmount, setSelectedAmount] = useState(15000);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [designation, setDesignation] = useState('Where it\'s needed most');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [donateSuccess, setDonateSuccess] = useState(false);
  const [isDonating, setIsDonating] = useState(false);

  // Volunteer Tab State (Artboard 06 Get Involved)
  const [volForm, setVolForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Education tutor & mentor',
    state: 'FCT Abuja',
    skills: ''
  });
  const [volSuccess, setVolSuccess] = useState(false);
  const [isVolSubmitting, setIsVolSubmitting] = useState(false);

  // Partner Tab State
  const [partForm, setPartForm] = useState({
    orgName: '',
    contactName: '',
    email: '',
    phone: '',
    type: 'Corporate CSR Sponsorship',
    notes: ''
  });
  const [partSuccess, setPartSuccess] = useState(false);
  const [isPartSubmitting, setIsPartSubmitting] = useState(false);

  const currentAmount = isCustom ? (Number(customAmount.replace(/[^0-9]/g, '')) || 0) : selectedAmount;

  const getImpactText = (amt) => {
    if (amt >= 150000) return '✓ Fully funds three scholars with uniforms, books and fees for a full term';
    if (amt >= 45000) return '✓ Covers full tuition, exams and school uniform for one scholar for a whole term';
    if (amt >= 15000) return '✓ Buys complete learning kits for three pupils';
    return '✓ Buys a complete learning kit for one pupil';
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('1309157309');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleDonateSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsDonating(true);
    if (addInquiry) {
      await addInquiry({
        name: fullName || 'Anonymous Donor',
        email,
        phone: '',
        type: 'donation-pledge',
        amount: currentAmount,
        frequency,
        designation,
        method: paymentMethod,
        isAnonymous,
        date: new Date().toISOString()
      });
    }

    if (paymentMethod === 'card') {
      const paystackKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_PAYSTACK_PUBLIC_KEY) || '';
      if (window.PaystackPop && paystackKey) {
        const handler = window.PaystackPop.setup({
          key: paystackKey,
          email: email,
          amount: currentAmount * 100,
          currency: 'NGN',
          callback: function () {
            setIsDonating(false);
            setDonateSuccess(true);
          },
          onClose: function () {
            setIsDonating(false);
          }
        });
        handler.openIframe();
        return;
      }
    }

    setTimeout(() => {
      setIsDonating(false);
      setDonateSuccess(true);
    }, 600);
  };

  const handleVolSubmit = async (e) => {
    e.preventDefault();
    setIsVolSubmitting(true);
    if (addInquiry) {
      await addInquiry({
        ...volForm,
        type: 'volunteer-application',
        date: new Date().toISOString()
      });
    }
    setTimeout(() => {
      setIsVolSubmitting(false);
      setVolSuccess(true);
    }, 600);
  };

  const handlePartSubmit = async (e) => {
    e.preventDefault();
    setIsPartSubmitting(true);
    if (addInquiry) {
      await addInquiry({
        ...partForm,
        type: 'partner-inquiry',
        date: new Date().toISOString()
      });
    }
    setTimeout(() => {
      setIsPartSubmitting(false);
      setPartSuccess(true);
    }, 600);
  };

  const faqs = [
    {
      q: 'Will I get a receipt?',
      a: 'Yes. As soon as your contribution is confirmed, an official email receipt is issued with our CAC registration details (RC 7015705).'
    },
    {
      q: 'Can I give from outside Nigeria?',
      a: 'Yes. Paystack accepts Visa, Mastercard, American Express and international bank cards in USD, GBP, and EUR.'
    },
    {
      q: 'Can I stop a monthly gift?',
      a: 'Yes. You can pause or cancel your recurring pledge at any time with a single click from your receipt or by contacting us on WhatsApp.'
    },
    {
      q: 'Can my company give or match gifts?',
      a: 'Yes. We issue corporate CSR verification letters and itemized field deliverable audits for organizational partnerships.'
    }
  ];

  return (
    <div className="w-full bg-[#fdfbf7] text-[#1c1c1a] py-10 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Page Tag & Main Tabs */}
        <div className="max-w-3xl mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-maroon block mb-2">
            GET INVOLVED
          </span>
          <h1 className="font-heading font-bold text-3xl sm:text-5xl text-[#1c1c1a] mb-3">
            Give time, skills or goods — not just money.
          </h1>
          <p className="text-base sm:text-lg text-[#4a4a46] leading-relaxed">
            Our outreaches are powered by community members, volunteer teachers, medical staff and partner schools working together.
          </p>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-6">
            <button
              onClick={() => setActiveTab('donate')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'donate'
                  ? 'bg-maroon text-white shadow-sm'
                  : 'bg-white border border-[#e5e0d8] text-[#4a4a46] hover:bg-[#f5f1e8]'
              }`}
            >
              Donate &amp; Pledge
            </button>
            <button
              onClick={() => setActiveTab('volunteer')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'volunteer'
                  ? 'bg-maroon text-white shadow-sm'
                  : 'bg-white border border-[#e5e0d8] text-[#4a4a46] hover:bg-[#f5f1e8]'
              }`}
            >
              Volunteer with us
            </button>
            <button
              onClick={() => setActiveTab('partner')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'partner'
                  ? 'bg-maroon text-white shadow-sm'
                  : 'bg-white border border-[#e5e0d8] text-[#4a4a46] hover:bg-[#f5f1e8]'
              }`}
            >
              Corporate &amp; CSR Partner
            </button>
          </div>
        </div>

        {/* 1. DONATE TAB (Artboard 05 Donate) */}
        {activeTab === 'donate' && (
          <div className="pt-4">
            {donateSuccess ? (
              <div className="bg-white rounded-3xl p-10 sm:p-14 border border-[#e5e0d8] shadow-sm text-center max-w-xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-forest-tint text-forest flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-[#1c1c1a] mb-2">
                  Thank you for your generous gift!
                </h3>
                <p className="text-sm text-[#4a4a46] leading-relaxed mb-6">
                  Your gift of <strong>₦{currentAmount.toLocaleString()}</strong> has been recorded. An official receipt has been emailed to <strong>{email}</strong>. 100% goes directly to frontline beneficiaries.
                </p>
                <button
                  onClick={() => setDonateSuccess(false)}
                  className="btn-secondary px-6 py-2.5 text-sm"
                >
                  Make another contribution
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Left Column: Form Widget */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#e5e0d8] shadow-sm flex flex-col gap-5">
                  <div>
                    <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1c1c1a] mb-1 leading-snug">
                      Give a child the tools to stay in school.
                    </h2>
                    <p className="text-xs sm:text-sm text-[#4a4a46] leading-relaxed">
                      100% of public donations go to programmes. You get an email receipt, and a field report shows what your gift bought.
                    </p>
                  </div>

                  {/* Frequency Toggle */}
                  <div className="flex bg-[#f5f1e8] p-1 rounded-full border border-[#e5e0d8] max-w-xs">
                    <button
                      type="button"
                      onClick={() => setFrequency('once')}
                      className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer ${
                        frequency === 'once'
                          ? 'bg-white text-[#1c1c1a] shadow-sm'
                          : 'text-[#706e68] hover:text-[#1c1c1a]'
                      }`}
                    >
                      Give once
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('monthly')}
                      className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer ${
                        frequency === 'monthly'
                          ? 'bg-white text-[#1c1c1a] shadow-sm'
                          : 'text-[#706e68] hover:text-[#1c1c1a]'
                      }`}
                    >
                      Give monthly
                    </button>
                  </div>

                  {/* Amount Selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#706e68] mb-2">
                      Choose an amount
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                      {[5000, 15000, 50000, 150000].map((amt) => {
                        const active = !isCustom && selectedAmount === amt;
                        return (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => {
                              setSelectedAmount(amt);
                              setIsCustom(false);
                              setCustomAmount('');
                            }}
                            className={`py-3 px-2 rounded-2xl font-heading font-bold text-sm text-center transition-all cursor-pointer border ${
                              active
                                ? 'bg-maroon text-white border-maroon shadow-sm'
                                : 'bg-[#fdfbf7] text-[#1c1c1a] border-[#e5e0d8] hover:bg-[#f5f1e8]'
                            }`}
                          >
                            ₦{amt.toLocaleString()}
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Amount */}
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#706e68]">
                        ₦
                      </span>
                      <input
                        type="text"
                        placeholder="Other amount"
                        value={customAmount}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, '');
                          setCustomAmount(val);
                          setIsCustom(true);
                        }}
                        className={`w-full pl-8 pr-4 py-3 bg-[#fdfbf7] rounded-2xl border text-sm font-medium focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon ${
                          isCustom ? 'border-maroon ring-1 ring-maroon' : 'border-[#e5e0d8]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Impact Line */}
                  <div className="px-4 py-3 rounded-2xl bg-forest-tint text-forest border border-forest/20 text-xs sm:text-sm font-medium flex items-center gap-2">
                    <span>{getImpactText(currentAmount)}</span>
                  </div>

                  {/* Where should it go? */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#706e68] mb-1.5">
                      Where should it go?
                    </label>
                    <select
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="w-full px-4 py-3 bg-[#fdfbf7] rounded-2xl border border-[#e5e0d8] text-sm text-[#1c1c1a] focus:outline-none focus:border-maroon"
                    >
                      <option value="Where it's needed most">Where it's needed most</option>
                      <option value="Scholarships">Scholarships</option>
                      <option value="School supplies & learning kits">School supplies &amp; learning kits</option>
                      <option value="Medical outreaches & malaria prevention">Medical outreaches &amp; malaria prevention</option>
                      <option value="Widows & women empowerment">Widows &amp; women empowerment</option>
                      <option value="Youth skills & apprenticeships">Youth skills &amp; apprenticeships</option>
                    </select>
                  </div>

                  {/* Payment Method Toggle */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#706e68] mb-1.5">
                      How would you like to pay?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                          paymentMethod === 'card'
                            ? 'bg-[#fdfbf7] text-maroon border-maroon shadow-sm'
                            : 'bg-[#f5f1e8] text-[#706e68] border-[#e5e0d8]'
                        }`}
                      >
                        Card, USSD or bank app
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('transfer')}
                        className={`py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                          paymentMethod === 'transfer'
                            ? 'bg-[#fdfbf7] text-maroon border-maroon shadow-sm'
                            : 'bg-[#f5f1e8] text-[#706e68] border-[#e5e0d8]'
                        }`}
                      >
                        Direct bank transfer
                      </button>
                    </div>
                  </div>

                  {paymentMethod === 'transfer' && (
                    <div className="p-4 bg-[#fdfbf7] rounded-2xl border border-[#e5e0d8] text-xs space-y-2">
                      <div className="font-heading font-bold text-sm text-[#1c1c1a]">
                        Official Donation Bank Account:
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#706e68]">Bank:</span>
                        <span className="font-semibold text-[#1c1c1a]">Guaranty Trust Bank (GTBank)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#706e68]">Account Name:</span>
                        <span className="font-semibold text-[#1c1c1a]">Ten Kind Hands Initiative</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#706e68]">Account Number:</span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-sm text-maroon">1309157309</span>
                          <button
                            type="button"
                            onClick={handleCopyAccount}
                            className="p-1 text-[#706e68] hover:text-maroon transition-colors cursor-pointer"
                            title="Copy account number"
                          >
                            {copiedBank ? <Check className="w-3.5 h-3.5 text-forest" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Donor Details */}
                  <form onSubmit={handleDonateSubmit} className="flex flex-col gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 bg-[#fdfbf7] rounded-2xl border border-[#e5e0d8] text-sm text-[#1c1c1a] focus:outline-none focus:border-maroon"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email (for your receipt)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-[#fdfbf7] rounded-2xl border border-[#e5e0d8] text-sm text-[#1c1c1a] focus:outline-none focus:border-maroon"
                      />
                    </div>

                    <label className="flex items-center gap-2 text-xs text-[#706e68] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded border-[#e5e0d8] text-maroon focus:ring-maroon"
                      />
                      <span>Keep my name off the public donor list</span>
                    </label>

                    <button
                      type="submit"
                      disabled={isDonating}
                      className="btn-primary w-full py-4 text-base font-semibold shadow-md mt-2 flex items-center justify-center gap-2"
                    >
                      {isDonating ? (
                        <span>Processing...</span>
                      ) : (
                        <>
                          <span>Give ₦{currentAmount.toLocaleString()} {frequency === 'monthly' ? '/ month' : 'now'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <div className="text-center text-[11px] text-[#706e68] mt-1">
                      🔒 Secure payment by Paystack · NGN, USD or GBP cards
                    </div>
                  </form>
                </div>

                {/* Right Column: Reassurance & FAQ */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <div className="rounded-2xl overflow-hidden border border-[#e5e0d8] shadow-sm bg-white">
                    <img
                      src="/images/hero-debate-competition-makurdi.webp"
                      alt="Children in school uniform"
                      className="w-full h-44 object-cover object-center"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/IMG_0294.JPG';
                      }}
                    />
                  </div>

                  <div className="bg-white rounded-3xl p-6 border border-[#e5e0d8] shadow-sm">
                    <h4 className="font-heading font-bold text-sm text-[#1c1c1a] mb-3">
                      Why give through Ten Kind Hands
                    </h4>
                    <ul className="space-y-3 text-xs text-[#4a4a46]">
                      <li className="flex items-start gap-2.5">
                        <span className="text-forest text-sm font-bold mt-0.5">⬡</span>
                        <span><strong>Registered with CAC (RC 7015705).</strong> Fully accountable Nigerian charitable trust.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-forest text-sm font-bold mt-0.5">⬡</span>
                        <span><strong>100% to programmes.</strong> Trustees privately fund administrative and office costs.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-forest text-sm font-bold mt-0.5">⬡</span>
                        <span><strong>A field report every month.</strong> Itemized budgets and photos published after each mission.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-3xl p-6 border border-[#e5e0d8] shadow-sm">
                    <h4 className="font-heading font-bold text-sm text-[#1c1c1a] mb-3">
                      Questions
                    </h4>
                    <div className="divide-y divide-[#e5e0d8]">
                      {faqs.map((faq, idx) => (
                        <div key={idx} className="py-2.5">
                          <button
                            type="button"
                            onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                            className="w-full flex items-center justify-between text-left text-xs font-semibold text-[#1c1c1a] hover:text-maroon transition-colors cursor-pointer"
                          >
                            <span>{faq.q}</span>
                            <span className="text-xs text-[#706e68] ml-2">{faqOpen === idx ? '−' : '+'}</span>
                          </button>
                          {faqOpen === idx && (
                            <p className="text-xs text-[#4a4a46] mt-2 leading-relaxed animate-fade-in">
                              {faq.a}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#e5e0d8] text-xs text-[#4a4a46] flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-forest shrink-0" />
                      <span>
                        Prefer to talk first?{' '}
                        <a
                          href="https://wa.me/2348180994301"
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-forest hover:underline"
                        >
                          WhatsApp +234 818 099 4301
                        </a>
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* 2. VOLUNTEER TAB (Artboard 06 Get involved) */}
        {activeTab === 'volunteer' && (
          <div className="pt-4 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Volunteer Roles & Application Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#e5e0d8] shadow-sm">
              <h2 className="font-heading font-bold text-2xl text-[#1c1c1a] mb-2">
                Join our nationwide volunteer team
              </h2>
              <p className="text-sm text-[#4a4a46] leading-relaxed mb-6">
                We organize on-the-ground outreaches in schools, clinics, and villages across FCT Abuja, Benue, Lagos, Oyo, and Plateau.
              </p>

              {volSuccess ? (
                <div className="p-6 rounded-2xl bg-forest-tint text-forest">
                  <h4 className="font-heading font-bold text-base mb-1">
                    ✓ Application Received!
                  </h4>
                  <p className="text-xs sm:text-sm">
                    Thank you, {volForm.name}. A state coordinator from your region will reach out on WhatsApp within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleVolSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#706e68] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={volForm.name}
                      onChange={(e) => setVolForm({ ...volForm, name: e.target.value })}
                      placeholder="e.g. Samuel Adekunle"
                      className="w-full px-4 py-3 bg-[#fdfbf7] rounded-2xl border border-[#e5e0d8] text-sm text-[#1c1c1a] focus:outline-none focus:border-maroon"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#706e68] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={volForm.email}
                        onChange={(e) => setVolForm({ ...volForm, email: e.target.value })}
                        placeholder="samuel@example.com"
                        className="w-full px-4 py-3 bg-[#fdfbf7] rounded-2xl border border-[#e5e0d8] text-sm text-[#1c1c1a] focus:outline-none focus:border-maroon"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#706e68] mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        value={volForm.phone}
                        onChange={(e) => setVolForm({ ...volForm, phone: e.target.value })}
                        placeholder="+234 800 000 0000"
                        className="w-full px-4 py-3 bg-[#fdfbf7] rounded-2xl border border-[#e5e0d8] text-sm text-[#1c1c1a] focus:outline-none focus:border-maroon"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#706e68] mb-1">
                        Volunteer Role
                      </label>
                      <select
                        value={volForm.role}
                        onChange={(e) => setVolForm({ ...volForm, role: e.target.value })}
                        className="w-full px-4 py-3 bg-[#fdfbf7] rounded-2xl border border-[#e5e0d8] text-sm text-[#1c1c1a] focus:outline-none focus:border-maroon"
                      >
                        <option value="Education tutor & mentor">Education tutor &amp; mentor</option>
                        <option value="Healthcare team / Nurse / Doctor">Healthcare team / Nurse / Doctor</option>
                        <option value="Media, photography & video">Media, photography &amp; video</option>
                        <option value="Logistics & packing assistant">Logistics &amp; packing assistant</option>
                        <option value="State coordinator desk">State coordinator desk</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#706e68] mb-1">
                        Primary Location
                      </label>
                      <select
                        value={volForm.state}
                        onChange={(e) => setVolForm({ ...volForm, state: e.target.value })}
                        className="w-full px-4 py-3 bg-[#fdfbf7] rounded-2xl border border-[#e5e0d8] text-sm text-[#1c1c1a] focus:outline-none focus:border-maroon"
                      >
                        <option value="FCT Abuja">FCT Abuja</option>
                        <option value="Benue State">Benue State</option>
                        <option value="Lagos State">Lagos State</option>
                        <option value="Oyo State">Oyo State</option>
                        <option value="Plateau State">Plateau State</option>
                        <option value="Other State">Other State</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#706e68] mb-1">
                      Skills &amp; Experience (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={volForm.skills}
                      onChange={(e) => setVolForm({ ...volForm, skills: e.target.value })}
                      placeholder="Tell us briefly about your background or why you'd like to volunteer..."
                      className="w-full px-4 py-3 bg-[#fdfbf7] rounded-2xl border border-[#e5e0d8] text-sm text-[#1c1c1a] focus:outline-none focus:border-maroon"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isVolSubmitting}
                    className="btn-primary w-full py-4 text-base font-semibold shadow-md mt-2"
                  >
                    {isVolSubmitting ? 'Submitting application...' : 'Submit volunteer application'}
                  </button>
                </form>
              )}
            </div>

            {/* Right: In-kind Wishlist */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-[#f5f1e8] rounded-3xl p-6 sm:p-8 border border-[#e5e0d8]">
                <h3 className="font-heading font-bold text-xl text-[#1c1c1a] mb-2">
                  In-kind supplies wishlist
                </h3>
                <p className="text-xs sm:text-sm text-[#4a4a46] leading-relaxed mb-4">
                  We accept new and gently-used items directly from individuals, schools, and corporate sponsors:
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-[#4a4a46]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-forest font-bold">✓</span>
                    <span><strong>School stationery:</strong> Exercise books, biros, pencils, math sets.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-forest font-bold">✓</span>
                    <span><strong>Tech equipment:</strong> Working laptops, tablets, computer lab peripherals.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-forest font-bold">✓</span>
                    <span><strong>Medical provisions:</strong> First-aid supplies, treated mosquito nets, vitamins.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-forest font-bold">✓</span>
                    <span><strong>Food provisions:</strong> Rice, beans, garri sacks for orphanage partners.</span>
                  </li>
                </ul>

                <div className="mt-6 pt-4 border-t border-[#e5e0d8] text-xs text-[#706e68]">
                  Delivery to National Secretariat: Danglo Plaza 204, Gwarinpa, Abuja.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. PARTNER TAB */}
        {activeTab === 'partner' && (
          <div className="pt-4 max-w-2xl bg-white rounded-3xl p-6 sm:p-10 border border-[#e5e0d8] shadow-sm">
            <h2 className="font-heading font-bold text-2xl text-[#1c1c1a] mb-2">
              Partner with Ten Kind Hands
            </h2>
            <p className="text-sm text-[#4a4a46] leading-relaxed mb-6">
              Corporate CSR programs, faith-based institutions, and diaspora associations partner with us for 100% direct-delivery humanitarian missions with audited photo dispatches.
            </p>

            {partSuccess ? (
              <div className="p-6 rounded-2xl bg-forest-tint text-forest">
                <h4 className="font-heading font-bold text-base mb-1">
                  ✓ Partnership Inquiry Received!
                </h4>
                <p className="text-xs sm:text-sm">
                  Thank you, {partForm.contactName}. Our partnerships team will review and respond with tailored outreach proposals within 2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePartSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#706e68] mb-1">
                    Organization / Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={partForm.orgName}
                    onChange={(e) => setPartForm({ ...partForm, orgName: e.target.value })}
                    placeholder="e.g. Apex Energy Ltd"
                    className="w-full px-4 py-3 bg-[#fdfbf7] rounded-2xl border border-[#e5e0d8] text-sm text-[#1c1c1a] focus:outline-none focus:border-maroon"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#706e68] mb-1">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      required
                      value={partForm.contactName}
                      onChange={(e) => setPartForm({ ...partForm, contactName: e.target.value })}
                      placeholder="e.g. Dr. Ngozi Okafor"
                      className="w-full px-4 py-3 bg-[#fdfbf7] rounded-2xl border border-[#e5e0d8] text-sm text-[#1c1c1a] focus:outline-none focus:border-maroon"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#706e68] mb-1">
                      Official Email
                    </label>
                    <input
                      type="email"
                      required
                      value={partForm.email}
                      onChange={(e) => setPartForm({ ...partForm, email: e.target.value })}
                      placeholder="csr@apexenergy.com"
                      className="w-full px-4 py-3 bg-[#fdfbf7] rounded-2xl border border-[#e5e0d8] text-sm text-[#1c1c1a] focus:outline-none focus:border-maroon"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#706e68] mb-1">
                    Partnership Focus
                  </label>
                  <select
                    value={partForm.type}
                    onChange={(e) => setPartForm({ ...partForm, type: e.target.value })}
                    className="w-full px-4 py-3 bg-[#fdfbf7] rounded-2xl border border-[#e5e0d8] text-sm text-[#1c1c1a] focus:outline-none focus:border-maroon"
                  >
                    <option value="Corporate CSR Sponsorship">Corporate CSR Sponsorship</option>
                    <option value="School Computer Lab Commissioning">School Computer Lab Commissioning</option>
                    <option value="Maternal Healthcare & Net Campaign">Maternal Healthcare &amp; Net Campaign</option>
                    <option value="Diaspora Giving & Endowment">Diaspora Giving &amp; Endowment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#706e68] mb-1">
                    Notes or Scope
                  </label>
                  <textarea
                    rows={3}
                    value={partForm.notes}
                    onChange={(e) => setPartForm({ ...partForm, notes: e.target.value })}
                    placeholder="Briefly state intended states, budget scope, or specific goals..."
                    className="w-full px-4 py-3 bg-[#fdfbf7] rounded-2xl border border-[#e5e0d8] text-sm text-[#1c1c1a] focus:outline-none focus:border-maroon"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPartSubmitting}
                  className="btn-primary w-full py-4 text-base font-semibold shadow-md mt-2"
                >
                  {isPartSubmitting ? 'Submitting proposal...' : 'Submit partnership inquiry'}
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
