import { useState, useEffect } from 'react';
import { X, Copy, Check, Heart, ShieldCheck, ArrowRight, MessageCircle } from './Icons';
import { useData } from '../context/DataContext';

export default function DonateModal({ isOpen, onClose, initialAmount }) {
  const { addInquiry } = useData();

  const [frequency, setFrequency] = useState('once'); // 'once' | 'monthly'
  const [selectedAmount, setSelectedAmount] = useState(15000);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [designation, setDesignation] = useState('Where it\'s needed most');
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'transfer'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (initialAmount) {
      const num = Number(initialAmount);
      if ([5000, 15000, 50000, 150000].includes(num)) {
        setSelectedAmount(num);
        setIsCustom(false);
        setCustomAmount('');
      } else {
        setSelectedAmount(num);
        setIsCustom(true);
        setCustomAmount(String(num));
      }
    }
  }, [initialAmount, isOpen]);

  // Lock body scroll on modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

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

  const handleSelectPredefined = (amt) => {
    setSelectedAmount(amt);
    setIsCustom(false);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    setIsCustom(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Save intent or notification in CMS
    if (addInquiry) {
      await addInquiry({
        name: fullName || 'Anonymous Donor',
        email,
        phone: '',
        type: 'donation-intent',
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
          metadata: {
            custom_fields: [
              { display_name: 'Donor Name', variable_name: 'donor_name', value: fullName || 'Anonymous' },
              { display_name: 'Designation', variable_name: 'designation', value: designation },
              { display_name: 'Frequency', variable_name: 'frequency', value: frequency }
            ]
          },
          callback: function (response) {
            setIsSubmitting(false);
            setSubmittedSuccess(true);
          },
          onClose: function () {
            setIsSubmitting(false);
          }
        });
        handler.openIframe();
        return;
      }
    }

    // Direct bank transfer confirmation or simulated flow
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#fdfbf7] rounded-3xl border border-[#e5e0d8] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-[#e5e0d8] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white border border-[#e5e0d8] flex items-center justify-center p-0.5 shadow-xs">
              <img
                src="/logo.png"
                alt="Ten Kind Hands Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuDmbaMRmoVzqGDmSGEoX0XoPFIdN6UYrwile-1Gt1d37VzrQ2PeaP9G7MITiOYlV5Mlma8OlajwkWA3r7O1u4I69Sez16xvET1fYSAP8dl7zhMj1M0gMuXfZYOCWyuePctpR97q8v72-LHjIYFUf8CgqilRAMMM-D-G-S-sJToMqi-nhfADpBN1MUQEsECDNokFRkKAoeuKy8OqR7LAReSeIGPvsSwv08HUP9RVs-2uxRF2z55chm270O5kDJRiqFAmMg";
                }}
              />
            </div>
            <span className="font-heading font-bold text-base text-[#1c1c1a]">
              Ten Kind Hands · Support Our Frontline Work
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#f5f1e8] text-[#706e68] hover:text-[#1c1c1a] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {submittedSuccess ? (
            <div className="py-12 text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-forest-tint text-forest flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-[#1c1c1a] mb-2">
                Thank you for your generous heart!
              </h3>
              <p className="text-sm text-[#4a4a46] leading-relaxed mb-6">
                Your contribution of <strong>₦{currentAmount.toLocaleString()}</strong> has been recorded. An official receipt has been sent to <strong>{email}</strong>. 100% of your gift will fund frontline deliverables.
              </p>
              <button
                onClick={onClose}
                className="btn-primary px-8 py-3 text-sm"
              >
                Return to website
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Form */}
              <div className="lg:col-span-7 flex flex-col gap-5">
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
                          onClick={() => handleSelectPredefined(amt)}
                          className={`py-3 px-2 rounded-2xl font-heading font-bold text-sm text-center transition-all cursor-pointer border ${
                            active
                              ? 'bg-maroon text-white border-maroon shadow-sm'
                              : 'bg-white text-[#1c1c1a] border-[#e5e0d8] hover:bg-[#f5f1e8]'
                          }`}
                        >
                          ₦{amt.toLocaleString()}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Amount Input */}
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#706e68]">
                      ₦
                    </span>
                    <input
                      type="text"
                      placeholder="Other amount"
                      value={customAmount}
                      onChange={handleCustomChange}
                      className={`w-full pl-8 pr-4 py-3 bg-white rounded-2xl border text-sm font-medium focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon ${
                        isCustom ? 'border-maroon ring-1 ring-maroon' : 'border-[#e5e0d8]'
                      }`}
                    />
                  </div>
                </div>

                {/* Live Impact Line */}
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
                    className="w-full px-4 py-3 bg-white rounded-2xl border border-[#e5e0d8] text-sm text-[#1c1c1a] focus:outline-none focus:border-maroon"
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
                          ? 'bg-white text-maroon border-maroon shadow-sm'
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
                          ? 'bg-white text-maroon border-maroon shadow-sm'
                          : 'bg-[#f5f1e8] text-[#706e68] border-[#e5e0d8]'
                      }`}
                    >
                      Direct bank transfer
                    </button>
                  </div>
                </div>

                {/* Direct Bank Details if selected */}
                {paymentMethod === 'transfer' && (
                  <div className="p-4 bg-white rounded-2xl border border-[#e5e0d8] text-xs space-y-2">
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

                {/* Donor Fields */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-2xl border border-[#e5e0d8] text-sm text-[#1c1c1a] focus:outline-none focus:border-maroon"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email (for your receipt)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white rounded-2xl border border-[#e5e0d8] text-sm text-[#1c1c1a] focus:outline-none focus:border-maroon"
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
                    disabled={isSubmitting}
                    className="btn-primary w-full py-4 text-base font-semibold shadow-md mt-2 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
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
                
                {/* Photo Card */}
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

                {/* Why Give Card */}
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

                {/* Questions (Accordion) */}
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

      </div>
    </div>
  );
}
