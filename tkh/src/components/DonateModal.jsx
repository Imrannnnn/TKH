import { useState } from 'react';
import { CreditCard, Landmark, CheckCircle2, Copy, X, ArrowRight, Check } from './Icons';

export default function DonateModal({ isOpen, onClose }) {
  const [currency, setCurrency] = useState('NGN');
  const [paymentMode, setPaymentMode] = useState('card'); // 'card' | 'transfer'
  const [selectedAmount, setSelectedAmount] = useState('15,000');
  const [customAmount, setCustomAmount] = useState('');
  const [cause, setCause] = useState('General Fund');
  const [frequency, setFrequency] = useState('one-time');
  const [copiedBank, setCopiedBank] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const presetAmountsNGN = [
    { value: '5,000', label: '₦5,000', impact: 'Basic student toolkit + vitamins' },
    { value: '15,000', label: '₦15,000', impact: 'Full term tuition, books & health check' },
    { value: '50,000', label: '₦50,000', impact: 'Mobile clinic visits for 40 villagers' },
    { value: '100,000', label: '₦100,000', impact: 'Solar classroom desk & power set' }
  ];

  const presetAmountsUSD = [
    { value: '15', label: '$15', impact: 'Nutritional therapy for 3 infants' },
    { value: '35', label: '$35', impact: 'Full term tuition & learning materials' },
    { value: '100', label: '$100', impact: 'Mobile medical diagnostics kit' },
    { value: '250', label: '$250', impact: 'Clean water borehole maintenance' }
  ];

  const currentPresets = currency === 'NGN' ? presetAmountsNGN : presetAmountsUSD;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('0123456789');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-[#e7e2d8] my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-ink-muted hover:text-ink p-2 rounded-full bg-sand cursor-pointer transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-10 flex flex-col items-center gap-4 animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-sand text-primary flex items-center justify-center border border-[#e7e2d8]">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="editorial-title text-3xl text-ink">
              Thank you for your generosity.
            </h3>
            <p className="text-xs sm:text-sm text-ink-light max-w-sm leading-relaxed">
              Your donation has been earmarked for frontline operations in Nigeria. A formal receipt and allocation confirmation have been sent to your email.
            </p>
            <div className="mt-2 px-4 py-2 rounded-full bg-sand text-ink text-xs font-semibold border border-[#e7e2d8]">
              100% Tax-Deductible Non-Profit Receipt
            </div>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold block mb-1">
                Direct Dignity Fund
              </span>
              <h2 className="editorial-title text-3xl text-ink">
                Make a direct contribution.
              </h2>
              <p className="text-xs text-ink-light mt-1">
                Zero cuts taken for overhead. 100% directly funds frontline education and clinics.
              </p>
            </div>

            {/* Payment Method Selector */}
            <div className="flex gap-2 p-1 rounded-xl bg-sand mb-5 border border-[#e7e2d8]">
              <button
                type="button"
                onClick={() => setPaymentMode('card')}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  paymentMode === 'card'
                    ? 'bg-white text-ink shadow-xs'
                    : 'text-ink-light hover:text-ink'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Card / Online</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMode('transfer')}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  paymentMode === 'transfer'
                    ? 'bg-white text-ink shadow-xs'
                    : 'text-ink-light hover:text-ink'
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>Bank Transfer</span>
              </button>
            </div>

            {paymentMode === 'transfer' ? (
              <div className="space-y-3 bg-sand p-5 rounded-2xl border border-[#e7e2d8] animate-fade-in">
                <div className="flex items-center justify-between border-b border-[#e7e2d8] pb-2.5">
                  <span className="text-xs text-ink-light">Bank Name</span>
                  <span className="text-xs font-bold text-ink">Guaranty Trust Bank (GTBank)</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#e7e2d8] pb-2.5">
                  <span className="text-xs text-ink-light">Account Name</span>
                  <span className="text-xs font-bold text-ink">Ten Kind Hands Initiative</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#e7e2d8] pb-2.5">
                  <span className="text-xs text-ink-light">Naira Account (NGN)</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-primary">0123456789</span>
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
                  <div className="flex p-1 rounded-xl bg-sand border border-[#e7e2d8]">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrency('NGN');
                        setSelectedAmount('15,000');
                        setCustomAmount('');
                      }}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        currency === 'NGN' ? 'bg-white text-ink shadow-xs' : 'text-ink-muted'
                      }`}
                    >
                      NGN (₦)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrency('USD');
                        setSelectedAmount('35');
                        setCustomAmount('');
                      }}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        currency === 'USD' ? 'bg-white text-ink shadow-xs' : 'text-ink-muted'
                      }`}
                    >
                      USD ($)
                    </button>
                  </div>

                  <div className="flex p-1 rounded-xl bg-sand border border-[#e7e2d8]">
                    <button
                      type="button"
                      onClick={() => setFrequency('one-time')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        frequency === 'one-time' ? 'bg-ink text-white shadow-xs' : 'text-ink-muted'
                      }`}
                    >
                      One-Time
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('monthly')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        frequency === 'monthly' ? 'bg-ink text-white shadow-xs' : 'text-ink-muted'
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                {/* Preset Amount Tiles */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-ink-muted tracking-wider block">
                    Choose Support Level
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {currentPresets.map((tier) => {
                      const isSelected = selectedAmount === tier.value && !customAmount;
                      return (
                        <button
                          key={tier.value}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(tier.value);
                            setCustomAmount('');
                          }}
                          className={`p-3 rounded-2xl text-left transition-all cursor-pointer border ${
                            isSelected
                              ? 'bg-sand border-primary shadow-xs'
                              : 'bg-white border-[#e7e2d8] hover:border-ink'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-bold ${isSelected ? 'text-primary' : 'text-ink'}`}>
                              {tier.label}
                            </span>
                            {isSelected && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                            )}
                          </div>
                          <p className="text-[10px] text-ink-light mt-0.5 line-clamp-1">
                            {tier.impact}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                  <input
                    type="number"
                    placeholder={currency === 'NGN' ? 'Or Enter Custom Amount in Naira (₦)' : 'Or Enter Custom Amount in Dollars ($)'}
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount('');
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-sand border border-[#e7e2d8] text-xs focus:outline-none focus:border-primary placeholder:text-ink-muted"
                  />
                </div>

                {/* Program Selector */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-ink-muted tracking-wider block">
                    Designate Support To
                  </label>
                  <select
                    value={cause}
                    onChange={(e) => setCause(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-sand border border-[#e7e2d8] text-xs text-ink focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="General Fund">Where Urgent Need Arises (General Field Fund)</option>
                    <option value="Education">Primary School Desks, Solar Power &amp; Books</option>
                    <option value="Healthcare">Mobile Primary Clinics &amp; Malaria Treatments</option>
                    <option value="Water">Clean Solar Water Boreholes</option>
                    <option value="Teacher Training">Teacher Fellowship &amp; Educator Grants</option>
                  </select>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-primary w-full py-3.5 text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md mt-2"
                >
                  <span>
                    Proceed with {currency === 'NGN' ? '₦' : '$'}{customAmount ? customAmount : selectedAmount} {frequency === 'monthly' ? '/ Month' : ''}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
