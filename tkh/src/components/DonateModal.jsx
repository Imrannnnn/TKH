import { useState } from 'react';
import { CreditCard, Landmark, CheckCircle2, Copy, X, ArrowRight, Check, ChevronDown, BookOpen } from './Icons';

// SVG Icons matching the visual design
function FoundationLogo({ className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 36 36" fill="currentColor" className={className}>
      {/* Central Heart */}
      <path d="M18 7.2c-1.3-2-3.7-2.8-5.9-2-2.5 1-3.7 3.8-2.8 6.4.8 2.3 3.2 4.7 6.3 7.4 1.1 1 1.8 1.6 2.4 2.2.6-.6 1.3-1.2 2.4-2.2 3.1-2.7 5.5-5.1 6.3-7.4.9-2.6-.3-5.4-2.8-6.4-2.2-.8-4.6 0-5.9 2z" />
      {/* Left Cupped Hand */}
      <path d="M6 14.5c0-.6.4-1 1-1s1 .4 1 1c0 5 3.5 9.2 8.2 10.4v2.1C10.2 25.7 6 20.6 6 14.5zm3 4c0-.6.4-1 1-1s1 .4 1 1c0 3.2 2.2 6 5.2 6.8v2.1C11.5 27.5 9 23.3 9 18.5z" />
      {/* Right Cupped Hand */}
      <path d="M30 14.5c0-.6-.4-1-1-1s-1 .4-1 1c0 5-3.5 9.2-8.2 10.4v2.1c6-1.3 10.2-6.4 10.2-12.5zm-3 4c0-.6-.4-1-1-1s-1 .4-1 1c0 3.2-2.2 6-5.2 6.8v2.1c4.7-.9 7.2-5.1 7.2-9.9z" />
    </svg>
  );
}

function GraduationCapIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12.5v4.5c3 3 9 3 12 0v-4.5" />
    </svg>
  );
}

function MosquitoIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 7v10" />
      <ellipse cx="12" cy="12" rx="2" ry="4" />
      <path d="m10 9-5-4" />
      <path d="m14 9 5-4" />
      <path d="m10 12-6 2" />
      <path d="m14 12 6 2" />
      <path d="m10 15-5 5" />
      <path d="m14 15 5 5" />
      <path d="m11 7-2-4" />
      <path d="m13 7 2-4" />
    </svg>
  );
}

function MaternalIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="6" r="3" />
      <path d="M8 20v-3a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v3" />
      <circle cx="16" cy="14" r="2" />
      <path d="M18 19a2 2 0 0 0-2-2h-1" />
      <path d="M12 11c.7-.7 1.5-.7 2 0 .5.5 0 1.2-.6 1.6l-1.4 1.2-1.4-1.2c-.6-.4-1.1-1.1-.6-1.6.5-.7 1.3-.7 2 0z" fill="currentColor" />
    </svg>
  );
}

function TargetIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2" />
    </svg>
  );
}

export default function DonateModal({ isOpen, onClose }) {
  const [currency, setCurrency] = useState('NGN');
  const [paymentMode, setPaymentMode] = useState('card'); // 'card' | 'transfer'
  const [selectedTierId, setSelectedTierId] = useState('books'); // Matches screenshot (Card 2 selected by default)
  const [customAmount, setCustomAmount] = useState('');
  const [cause, setCause] = useState('Where Most Needed (General Impact Fund)');
  const [frequency, setFrequency] = useState('one-time');
  const [copiedBank, setCopiedBank] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const tiersNGN = [
    {
      id: 'fees',
      amount: '50,000',
      formattedAmount: '₦50,000',
      title: 'School fees support for one child',
      icon: GraduationCapIcon,
    },
    {
      id: 'books',
      amount: '50,000',
      formattedAmount: '₦50,000',
      title: 'Books, school bag & writing pack',
      icon: BookOpen,
    },
    {
      id: 'nets',
      amount: '25,000',
      formattedAmount: '₦25,000',
      title: 'Mosquito nets & insecticide support',
      icon: MosquitoIcon,
    },
    {
      id: 'maternal',
      amount: '100,000',
      formattedAmount: '₦100,000',
      title: 'Maternal care & essential support',
      icon: MaternalIcon,
    },
  ];

  const tiersUSD = [
    {
      id: 'fees',
      amount: '35',
      formattedAmount: '$35',
      title: 'School fees support for one child',
      icon: GraduationCapIcon,
    },
    {
      id: 'books',
      amount: '35',
      formattedAmount: '$35',
      title: 'Books, school bag & writing pack',
      icon: BookOpen,
    },
    {
      id: 'nets',
      amount: '20',
      formattedAmount: '$20',
      title: 'Mosquito nets & insecticide support',
      icon: MosquitoIcon,
    },
    {
      id: 'maternal',
      amount: '70',
      formattedAmount: '$70',
      title: 'Maternal care & essential support',
      icon: MaternalIcon,
    },
  ];

  const currentTiers = currency === 'NGN' ? tiersNGN : tiersUSD;
  const currentTier = currentTiers.find((t) => t.id === selectedTierId);

  const displayAmountText = customAmount
    ? `${currency === 'NGN' ? '₦' : '$'}${customAmount}${frequency === 'monthly' ? ' / Month' : ''}`
    : `${currentTier ? currentTier.formattedAmount : (currency === 'NGN' ? '₦50,000' : '$35')}${frequency === 'monthly' ? ' / Month' : ''}`;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('1309157309');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-5 sm:p-7 md:p-8 border border-gray-100 my-6 sm:my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center cursor-pointer transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-10 flex flex-col items-center gap-4 animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-[#f9ecee] text-[#801426] flex items-center justify-center border border-[#801426]/20">
              <CheckCircle2 className="w-8 h-8 text-[#801426]" />
            </div>
            <h3 className="editorial-title text-3xl text-ink">
              Thank you for your generosity.
            </h3>
            <p className="text-xs sm:text-sm text-ink-light max-w-sm leading-relaxed">
              Your donation has been earmarked for frontline operations in Nigeria. A formal receipt and allocation confirmation have been sent to your email.
            </p>
            <div className="mt-2 px-4 py-2 rounded-full bg-sand text-ink text-xs font-semibold border border-[#e7e2d8]">
              100% Direct Impact Allocation
            </div>
          </div>
        ) : (
          <div>
            {/* Modal Header & Brand Lockup */}
            <div className="mb-5 sm:mb-6 pr-6">
              <div className="flex items-center gap-2.5 mb-3.5">
                <FoundationLogo className="w-7 h-7 text-[#801426] shrink-0" />
                <div>
                  <span className="block text-xs font-black tracking-wider text-[#801426] uppercase leading-tight font-heading">
                    TEN KIND HANDS
                  </span>
                  <span className="block text-[9px] font-semibold tracking-[0.28em] text-[#801426] uppercase leading-tight font-sans">
                    FOUNDATION
                  </span>
                </div>
              </div>

              <div className="w-7 h-[2.5px] bg-[#801426] mb-1.5 rounded-full"></div>
              <span className="text-[11px] font-bold text-[#801426] tracking-wider uppercase block">
                DIRECT IMPACT FUND
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-1 leading-tight">
                Make a direct contribution.
              </h2>
              <p className="text-xs sm:text-[13px] text-gray-600 mt-1.5 leading-relaxed">
                Your support helps provide education and essential healthcare to vulnerable children, women, and communities across Nigeria.
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="flex gap-2 p-1 rounded-2xl bg-gray-100/90 mb-5 border border-gray-200/60">
              <button
                type="button"
                onClick={() => setPaymentMode('card')}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  paymentMode === 'card'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <CreditCard className="w-4 h-4 text-gray-700" />
                <span>Card / Online</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMode('transfer')}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  paymentMode === 'transfer'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Landmark className="w-4 h-4 text-gray-700" />
                <span>Bank Transfer</span>
              </button>
            </div>

            {paymentMode === 'transfer' ? (
              <div className="space-y-3 bg-sand p-5 rounded-2xl border border-[#e7e2d8] animate-fade-in">
                <div className="flex items-center justify-between border-b border-[#e7e2d8] pb-2.5">
                  <span className="text-xs text-ink-light">Bank Name</span>
                  <span className="text-xs font-bold text-ink">Providus Bank</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#e7e2d8] pb-2.5">
                  <span className="text-xs text-ink-light">Account Name</span>
                  <span className="text-xs font-bold text-ink">Ten Kind Hands Foundation</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#e7e2d8] pb-2.5">
                  <span className="text-xs text-ink-light">Naira Account (NGN)</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-primary">1309157309</span>
                    <button
                      type="button"
                      onClick={handleCopyAccount}
                      className="px-2 py-1 rounded bg-white border border-[#e7e2d8] text-[10px] font-bold text-ink flex items-center gap-1 cursor-pointer"
                    >
                      {copiedBank ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedBank ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-ink-light pt-1 leading-relaxed">
                  For international wire routing (USD / GBP / EUR) or in-kind donations, please email{' '}
                  <a href="mailto:finance@tenkindhands.org" className="text-primary font-bold underline">
                    finance@tenkindhands.org
                  </a>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Currency & Frequency Toggle */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex p-1 rounded-xl bg-gray-100/90 border border-gray-200/60">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrency('NGN');
                        setCustomAmount('');
                      }}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        currency === 'NGN' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      NGN (₦)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrency('USD');
                        setCustomAmount('');
                      }}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        currency === 'USD' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      USD ($)
                    </button>
                  </div>

                  <div className="flex p-1 rounded-xl bg-gray-100/90 border border-gray-200/60">
                    <button
                      type="button"
                      onClick={() => setFrequency('one-time')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        frequency === 'one-time'
                          ? 'bg-[#801426] text-white shadow-xs'
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      One-Time
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('monthly')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        frequency === 'monthly'
                          ? 'bg-[#801426] text-white shadow-xs'
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                {/* Preset Support Levels */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-500 tracking-wider uppercase block">
                    CHOOSE SUPPORT LEVEL
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentTiers.map((tier) => {
                      const isSelected = selectedTierId === tier.id && !customAmount;
                      const IconComponent = tier.icon;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => {
                            setSelectedTierId(tier.id);
                            setCustomAmount('');
                          }}
                          className={`relative p-3.5 rounded-2xl text-left transition-all cursor-pointer flex items-center gap-3.5 bg-white ${
                            isSelected
                              ? 'border-2 border-[#801426] shadow-sm'
                              : 'border border-gray-200/90 hover:border-gray-400'
                          }`}
                        >
                          {/* Selected Checkmark Badge */}
                          {isSelected && (
                            <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#801426] flex items-center justify-center text-white shadow-xs">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}

                          {/* Tinted Circular Icon Badge */}
                          <div className="w-10 h-10 rounded-full bg-[#f9ecee] text-[#801426] flex items-center justify-center shrink-0">
                            <IconComponent className="w-5 h-5 text-[#801426]" />
                          </div>

                          {/* Amount and Title */}
                          <div className="pr-4">
                            <div className="text-base sm:text-lg font-extrabold text-[#801426] tracking-tight leading-tight">
                              {tier.formattedAmount}
                            </div>
                            <p className="text-[11px] text-gray-600 font-normal leading-snug mt-0.5">
                              {tier.title}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Amount Input */}
                  <div className="relative flex items-center rounded-xl bg-gray-50 border border-gray-200/90 px-3.5 py-1.5 focus-within:border-[#801426] focus-within:bg-white transition-all">
                    <div className="w-5 h-5 rounded-full border border-gray-400/80 flex items-center justify-center text-[11px] font-bold text-gray-500 shrink-0 select-none mr-2.5">
                      {currency === 'NGN' ? '₦' : '$'}
                    </div>
                    <input
                      type="text"
                      placeholder={
                        currency === 'NGN'
                          ? 'Or Enter Custom Amount in Naira (₦)'
                          : 'Or Enter Custom Amount in Dollars ($)'
                      }
                      value={customAmount}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        const formatted = val ? Number(val).toLocaleString() : '';
                        setCustomAmount(formatted);
                        if (formatted) setSelectedTierId(null);
                      }}
                      className="w-full bg-transparent text-xs text-gray-800 placeholder:text-gray-400 font-medium focus:outline-none py-1.5"
                    />
                  </div>
                </div>

                {/* Program / Cause Designation */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 tracking-wider uppercase block">
                    DESIGNATE SUPPORT TO
                  </label>
                  <div className="relative flex items-center rounded-xl bg-gray-50 border border-gray-200/90 px-3.5 py-2.5 focus-within:border-[#801426] transition-all">
                    <TargetIcon className="w-4 h-4 text-gray-500 shrink-0 mr-2.5" />
                    <select
                      value={cause}
                      onChange={(e) => setCause(e.target.value)}
                      className="w-full bg-transparent text-xs text-gray-800 font-medium focus:outline-none cursor-pointer pr-6 appearance-none"
                    >
                      <option value="Where Most Needed (General Impact Fund)">
                        Where Most Needed (General Impact Fund)
                      </option>
                      <option value="Education & Scholarships">
                        Education &amp; Scholarships
                      </option>
                      <option value="Healthcare & Medical Outreaches">
                        Healthcare &amp; Medical Outreaches
                      </option>
                      <option value="Mosquito Nets & Malaria Prevention">
                        Mosquito Nets &amp; Malaria Prevention
                      </option>
                      <option value="Maternal Care & Essential Support">
                        Maternal Care &amp; Essential Support
                      </option>
                      <option value="Women & Widows Empowerment">
                        Women &amp; Widows Empowerment
                      </option>
                      <option value="Orphanage Relief & Food Packs">
                        Orphanage Relief &amp; Food Packs
                      </option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-500 pointer-events-none absolute right-3.5" />
                  </div>
                </div>

                {/* Submit / Proceed Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 sm:py-4 rounded-2xl bg-[#801426] hover:bg-[#681423] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer mt-4"
                >
                  <span>
                    Proceed with {displayAmountText}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
