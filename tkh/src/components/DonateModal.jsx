import { useState, useEffect } from 'react';
import {
  CreditCard,
  Landmark,
  CheckCircle2,
  Copy,
  X,
  ArrowRight,
  Check,
  BookOpen,
  MessageCircle,
  Mail,
  ShieldCheck,
  AlertTriangle
} from './Icons';
import { useData } from '../context/DataContext';

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

// Preset donation amount tiers - clean amount display (just the amount)
const tiersNGN = [
  {
    id: '10k',
    amount: '10,000',
    numeric: 10000,
    formattedAmount: '₦10,000',
  },
  {
    id: '25k',
    amount: '25,000',
    numeric: 25000,
    formattedAmount: '₦25,000',
  },
  {
    id: '50k',
    amount: '50,000',
    numeric: 50000,
    formattedAmount: '₦50,000',
  },
  {
    id: '100k',
    amount: '100,000',
    numeric: 100000,
    formattedAmount: '₦100,000',
  },
];

const tiersUSD = [
  {
    id: '25',
    amount: '25',
    numeric: 25,
    formattedAmount: '$25',
  },
  {
    id: '50',
    amount: '50',
    numeric: 50,
    formattedAmount: '$50',
  },
  {
    id: '100',
    amount: '100',
    numeric: 100,
    formattedAmount: '$100',
  },
  {
    id: '250',
    amount: '250',
    numeric: 250,
    formattedAmount: '$250',
  },
];

export default function DonateModal({ isOpen, onClose, initialAmount }) {
  const { addInquiry } = useData();

  // DEFAULT TO BANK TRANSFER AS REQUESTED IN AUDIT (Card is Coming Soon)
  const [paymentMode, setPaymentMode] = useState('transfer'); // 'transfer' | 'card'
  const [currency, setCurrency] = useState('NGN');
  const [selectedTierId, setSelectedTierId] = useState('50k');
  const [customAmount, setCustomAmount] = useState('');
  const [cause, setCause] = useState('Where Most Needed (General Impact Fund)');
  const [frequency, setFrequency] = useState('one-time');
  const [copiedBank, setCopiedBank] = useState(false);

  // Sync initialAmount from caller (e.g. Impact Simulator slider)
  useEffect(() => {
    if (initialAmount) {
      const num = Number(initialAmount);
      const match = tiersNGN.find((t) => t.numeric === num);
      if (match) {
        setSelectedTierId(match.id);
        setCustomAmount('');
      } else {
        setCustomAmount(String(num));
        setSelectedTierId('');
      }
    }
  }, [initialAmount, isOpen]);

  // Bank Transfer Notification Form
  const [showNotifyForm, setShowNotifyForm] = useState(false);
  const [transferNotify, setTransferNotify] = useState({ name: '', email: '', phone: '', refNote: '' });
  const [isNotifying, setIsNotifying] = useState(false);
  const [notifySuccess, setNotifySuccess] = useState(false);
  const [notifyResult, setNotifyResult] = useState(null);

  // Card & Online / Paystack integration state
  const paystackKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_PAYSTACK_PUBLIC_KEY) || '';
  const [cardDonor, setCardDonor] = useState({ name: '', email: '' });
  const [cardError, setCardError] = useState('');
  const [isProcessingCard, setIsProcessingCard] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  // Card waitlist notification
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentTiers = currency === 'NGN' ? tiersNGN : tiersUSD;
  const currentTier = currentTiers.find((t) => t.id === selectedTierId);

  const formattedCustom = customAmount && !isNaN(Number(customAmount))
    ? Number(customAmount).toLocaleString()
    : customAmount;

  const displayAmountText = customAmount
    ? `${currency === 'NGN' ? '₦' : '$'}${formattedCustom}${frequency === 'monthly' ? ' / Month' : ''}`
    : `${currentTier ? currentTier.formattedAmount : (currency === 'NGN' ? '₦50,000' : '$35')}${frequency === 'monthly' ? ' / Month' : ''}`;

  const currentNumericAmount = customAmount
    ? parseInt(String(customAmount).replace(/[^0-9]/g, ''), 10) || 0
    : (currentTier ? currentTier.numeric : 50000);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('1309157309');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  // Submit Bank Transfer notification to secretariat
  const handleTransferNotification = async (e) => {
    e.preventDefault();
    setIsNotifying(true);
    let res = null;
    if (addInquiry) {
      res = await addInquiry({
        name: transferNotify.name,
        email: transferNotify.email,
        phone: transferNotify.phone,
        category: 'Bank Transfer Donation',
        message: `Direct Bank Transfer Donation of ${displayAmountText} designated to: "${cause}". Narration/Bank Reference: ${transferNotify.refNote || 'N/A'}. Target Account: Providus Bank (1309157309).`,
        source: 'Donate Modal (Transfer Notification)'
      });
    }
    setIsNotifying(false);
    setNotifyResult(res);
    setNotifySuccess(true);
  };

  // Paystack Online Payment (When VITE_PAYSTACK_PUBLIC_KEY is configured)
  const handlePaystackPay = (e) => {
    e.preventDefault();
    setCardError('');

    if (!cardDonor.email) {
      setCardError('Please enter your email address to receive your official donation receipt.');
      return;
    }

    if (!window.PaystackPop) {
      // Dynamically load Paystack
      setIsProcessingCard(true);
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => {
        setIsProcessingCard(false);
        launchPaystackPopup();
      };
      script.onerror = () => {
        setIsProcessingCard(false);
        setCardError('Unable to connect to Paystack payment gateway. Please use Direct Bank Transfer below.');
      };
      document.body.appendChild(script);
    } else {
      launchPaystackPopup();
    }
  };

  const launchPaystackPopup = () => {
    try {
      const amountInKobo = Math.round(currentNumericAmount * 100);
      const handler = window.PaystackPop.setup({
        key: paystackKey,
        email: cardDonor.email,
        amount: amountInKobo,
        currency: 'NGN',
        ref: `TKH-DON-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        metadata: {
          custom_fields: [
            { display_name: "Donor Name", variable_name: "donor_name", value: cardDonor.name || 'Anonymous' },
            { display_name: "Cause", variable_name: "cause", value: cause }
          ]
        },
        callback: (response) => {
          if (addInquiry) {
            addInquiry({
              name: cardDonor.name || 'Online Donor',
              email: cardDonor.email,
              phone: '',
              category: 'Online Card Donation (Paystack)',
              message: `Card Donation of ${displayAmountText} received via Paystack. Reference: ${response.reference}. Designated: "${cause}".`,
              source: 'Paystack Payment'
            });
          }
          setPaymentSuccess({
            reference: response.reference,
            amount: displayAmountText,
            cause: cause
          });
        },
        onClose: () => {
          setCardError('Payment was cancelled or closed. Your card has not been charged.');
        }
      });
      handler.openIframe();
    } catch (err) {
      setCardError('Failed to initiate card payment: ' + (err.message || 'Please use Bank Transfer.'));
    }
  };

  // Waitlist email for card payments
  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    if (addInquiry) {
      await addInquiry({
        name: 'Card Payment Waitlist Subscriber',
        email: waitlistEmail,
        phone: '',
        category: 'Card Gateway Waitlist',
        message: `Donor requested notification when automated Paystack/Flutterwave card processing goes live for: ${displayAmountText}.`,
        source: 'Card Tab Waitlist'
      });
    }
    setWaitlistSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-5 sm:p-7 md:p-8 border border-gray-100 my-6 sm:my-8 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center cursor-pointer transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
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
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#801426] tracking-wider uppercase block">
              DIRECT IMPACT FUND
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
              100% Direct Giving
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-1 leading-tight">
            Make a direct contribution.
          </h2>
          <p className="text-xs sm:text-[13px] text-gray-600 mt-1.5 leading-relaxed">
            Your gift provides solar classrooms, student scholarships, and free medical treatments across Nigeria.
          </p>
        </div>

        {/* Successful Card Payment Confirmation */}
        {paymentSuccess ? (
          <div className="text-center py-8 flex flex-col items-center gap-4 animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <CheckCircle2 className="w-8 h-8 text-emerald-700" />
            </div>
            <h3 className="editorial-title text-2xl font-bold text-ink">
              Thank you for your generous gift.
            </h3>
            <p className="text-xs sm:text-sm text-ink-light max-w-sm leading-relaxed">
              Your donation of <strong>{paymentSuccess.amount}</strong> has been allocated to <em>{paymentSuccess.cause}</em>.
            </p>
            <div className="p-3 bg-sand rounded-xl border border-[#e7e2d8] text-xs font-mono text-ink-muted">
              Paystack Reference: {paymentSuccess.reference}
            </div>
            <p className="text-[11px] text-ink-muted">
              An official receipt and GPS allocation confirmation will be dispatched to your email.
            </p>
            <button
              onClick={onClose}
              className="btn-primary text-xs px-6 py-2.5 font-heading font-semibold mt-2"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            {/* Payment Method Selector: Bank Transfer is First & Recommended */}
            <div className="flex gap-2 p-1 rounded-2xl bg-gray-100/90 mb-5 border border-gray-200/60">
              <button
                type="button"
                onClick={() => setPaymentMode('transfer')}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  paymentMode === 'transfer'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Landmark className="w-4 h-4 text-forest" />
                <span>Bank Transfer</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded-md font-semibold ml-1">
                  Active
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMode('card')}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  paymentMode === 'card'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <CreditCard className="w-4 h-4 text-gray-700" />
                <span>Card / Online</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded-md font-semibold ml-1">
                  {paystackKey ? 'Paystack' : 'Coming Soon'}
                </span>
              </button>
            </div>

            {/* TAB 1: BANK TRANSFER (Instant, Verified & Active Path) */}
            {paymentMode === 'transfer' && (
              <div className="space-y-4 animate-fade-in">
                {/* Official Bank Account Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#faf8f4] border-2 border-[#801426]/20 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-[#e7e2d8]">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#801426] text-white flex items-center justify-center font-bold text-xs">
                        PB
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-bold">Official Bank</span>
                        <strong className="text-sm text-ink font-heading font-bold">Providus Bank</strong>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                      Zero Fees • 100% Direct
                    </span>
                  </div>

                  <div className="py-3 border-b border-[#e7e2d8] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-bold">Account Name &amp; Legal Reg</span>
                      <span className="text-xs sm:text-sm font-bold text-ink font-heading">Ten Kind Hands Foundation</span>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-forest bg-forest/10 px-2 py-0.5 rounded-md border border-forest/20">
                      RC: 7015705
                    </span>
                  </div>

                  <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-bold">Naira Account (NGN)</span>
                      <span className="font-mono text-xl sm:text-2xl font-black text-[#801426] tracking-tight">1309157309</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyAccount}
                      className="px-4 py-2 rounded-xl bg-[#801426] hover:bg-[#681423] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors self-start sm:self-center"
                    >
                      {copiedBank ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedBank ? 'Account Number Copied!' : 'Copy Account Number'}</span>
                    </button>
                  </div>
                </div>

                {/* Preset Sponsorship Levels */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-bold text-gray-600 tracking-wider uppercase block">
                      SELECT DONATION AMOUNT
                    </label>
                    <span className="text-xs font-mono font-bold text-[#801426] bg-[#801426]/10 px-2 py-0.5 rounded-md">
                      Selected: {displayAmountText}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {tiersNGN.map((tier) => {
                      const isSelected = selectedTierId === tier.id && !customAmount;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => {
                            setSelectedTierId(tier.id);
                            setCustomAmount('');
                          }}
                          className={`py-3 px-2 rounded-xl text-center transition-all cursor-pointer border flex items-center justify-center font-mono font-bold text-sm sm:text-base ${
                            isSelected
                              ? 'border-[#801426] bg-[#801426] text-white shadow-xs'
                              : 'border-gray-200 bg-white text-ink hover:border-[#801426]/50 hover:bg-sand/40'
                          }`}
                        >
                          <span>{tier.formattedAmount}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Amount input (supports slider and custom entries) */}
                  <div className="mt-2.5 flex items-center rounded-xl bg-gray-50 border border-gray-200 px-3 py-2 text-xs">
                    <span className="font-bold text-gray-500 mr-2 shrink-0">Custom Amount (₦):</span>
                    <input
                      type="number"
                      placeholder="Enter custom amount..."
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedTierId('');
                      }}
                      className="w-full bg-transparent font-mono font-bold text-gray-900 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Designated Cause */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600 tracking-wider uppercase block">
                    DESIGNATE TRANSFER TO
                  </label>
                  <div className="relative flex items-center rounded-xl bg-gray-50 border border-gray-200 px-3 py-2">
                    <TargetIcon className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
                    <select
                      value={cause}
                      onChange={(e) => setCause(e.target.value)}
                      className="w-full bg-transparent text-xs text-gray-800 font-medium focus:outline-none cursor-pointer pr-2"
                    >
                      <option value="Where Most Needed (General Impact Fund)">Where Most Needed (General Impact Fund)</option>
                      <option value="Education & Scholarships">Education &amp; Scholarships</option>
                      <option value="Healthcare & Medical Outreaches">Healthcare &amp; Medical Outreaches</option>
                      <option value="Mosquito Nets & Malaria Prevention">Mosquito Nets &amp; Malaria Prevention</option>
                      <option value="Maternal Care & Essential Support">Maternal Care &amp; Essential Support</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons: WhatsApp Confirmation & Secretariat Notification */}
                <div className="space-y-2 pt-1">
                  <a
                    href={`https://wa.me/2348180994301?text=${encodeURIComponent(
                      `Hello Ten Kind Hands Secretariat,\n\nI have completed a direct bank transfer of ${displayAmountText} for "${cause}" to your Providus Bank account (1309157309).\n\nPlease confirm receipt and issue my official donation record.\n\nThank you!`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors font-heading shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirm Transfer via WhatsApp Desk (+234 818 099 4301)</span>
                  </a>

                  {!showNotifyForm ? (
                    <button
                      type="button"
                      onClick={() => setShowNotifyForm(true)}
                      className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-ink text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-gray-600" />
                      <span>Notify Secretariat by Email / Web Form</span>
                    </button>
                  ) : (
                    <div className="p-4 rounded-2xl bg-sand border border-[#e7e2d8] animate-fade-in space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-ink font-heading">Submit Transfer Details for Formal Receipt</h4>
                        <button
                          type="button"
                          onClick={() => setShowNotifyForm(false)}
                          className="text-gray-400 hover:text-gray-600 text-xs"
                        >
                          ✕
                        </button>
                      </div>

                      {notifySuccess ? (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                          <CheckCircle2 className="w-5 h-5 text-emerald-700 mx-auto mb-1" />
                          <p className="text-xs font-bold text-emerald-900">Transfer Notification Logged</p>
                          <p className="text-[11px] text-emerald-800 mt-0.5">
                            Reference #{notifyResult?.inquiry?.id || 'TKH-TRF'}. Our finance team will reconcile and issue your receipt to {transferNotify.email}.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleTransferNotification} className="space-y-2.5">
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              required
                              placeholder="Your Full Name *"
                              value={transferNotify.name}
                              onChange={(e) => setTransferNotify({ ...transferNotify, name: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-white border border-[#e7e2d8] text-xs focus:outline-none focus:border-primary"
                            />
                            <input
                              type="email"
                              required
                              placeholder="Email for Receipt *"
                              value={transferNotify.email}
                              onChange={(e) => setTransferNotify({ ...transferNotify, email: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-white border border-[#e7e2d8] text-xs focus:outline-none focus:border-primary"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="tel"
                              placeholder="Phone / WhatsApp"
                              value={transferNotify.phone}
                              onChange={(e) => setTransferNotify({ ...transferNotify, phone: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-white border border-[#e7e2d8] text-xs focus:outline-none focus:border-primary"
                            />
                            <input
                              type="text"
                              placeholder="Bank Narration / Sender Name"
                              value={transferNotify.refNote}
                              onChange={(e) => setTransferNotify({ ...transferNotify, refNote: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-white border border-[#e7e2d8] text-xs focus:outline-none focus:border-primary"
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={isNotifying}
                            className="btn-primary w-full py-2 text-xs font-heading font-semibold cursor-pointer disabled:opacity-60"
                          >
                            <span>{isNotifying ? 'Submitting Transfer Record...' : `Submit Notification for ${displayAmountText}`}</span>
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </div>

                <p className="text-[11px] text-gray-500 text-center leading-relaxed pt-1">
                  For international wire transfers (USD / GBP / EUR) or institutional grants, email{' '}
                  <a href="mailto:finance@tenkindhands.org" className="text-primary font-semibold underline">
                    finance@tenkindhands.org
                  </a>.
                </p>
              </div>
            )}

            {/* TAB 2: CARD / ONLINE (Transparent Gateway Status & Paystack Flow) */}
            {paymentMode === 'card' && (
              <div className="space-y-4 animate-fade-in">
                {paystackKey ? (
                  /* Live Paystack Integration available when key is set */
                  <form onSubmit={handlePaystackPay} className="space-y-4">
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3 text-xs text-emerald-900">
                      <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>Secure Online Payment via Paystack</strong>
                        <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                          Supports Nigerian Debit Cards (Mastercard, Visa, Verve), Bank Transfer &amp; USSD.
                        </p>
                      </div>
                    </div>

                    {cardError && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                        <span>{cardError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-gray-600 block mb-1">Your Full Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Amina Bello"
                          value={cardDonor.name}
                          onChange={(e) => setCardDonor({ ...cardDonor, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-gray-600 block mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="donor@example.com"
                          value={cardDonor.email}
                          onChange={(e) => setCardDonor({ ...cardDonor, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessingCard}
                      className="w-full py-3.5 rounded-2xl bg-[#801426] hover:bg-[#681423] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                    >
                      <span>{isProcessingCard ? 'Connecting to Paystack...' : `Pay ${displayAmountText} with Paystack`}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  /* Honest, Transparent Status when Card Gateway is not yet wired */
                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/80 text-center space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mx-auto">
                        <CreditCard className="w-6 h-6 text-amber-800" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold block mb-1">
                          Integration Underway
                        </span>
                        <h4 className="text-base font-heading font-bold text-ink">
                          Online Card Payments — Coming Soon
                        </h4>
                        <p className="text-xs text-ink-light leading-relaxed mt-2 max-w-sm mx-auto">
                          We are currently completing merchant activation with <strong>Paystack</strong> and <strong>Flutterwave</strong> to enable automated card, USSD, and Apple Pay checkouts.
                        </p>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-amber-200 text-left text-xs text-ink-light space-y-1.5">
                        <div className="flex items-center gap-2 font-bold text-ink">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>How to donate immediately:</span>
                        </div>
                        <p className="text-[11px] leading-relaxed pl-5">
                          Please use direct <strong>Providus Bank Transfer</strong>. 100% of your transfer is received immediately with zero processing fees.
                        </p>
                      </div>

                      {/* Primary Action: Switch to Bank Transfer */}
                      <button
                        type="button"
                        onClick={() => {
                          setPaymentMode('transfer');
                          handleCopyAccount();
                        }}
                        className="w-full py-3 rounded-xl bg-[#801426] hover:bg-[#681423] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors font-heading"
                      >
                        <Landmark className="w-4 h-4" />
                        <span>Switch to Bank Transfer (Copy Providus Account)</span>
                      </button>
                    </div>

                    {/* Waitlist / Notification Form */}
                    <div className="p-4 rounded-2xl bg-sand border border-[#e7e2d8]">
                      {waitlistSubmitted ? (
                        <div className="text-center py-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-700 mx-auto mb-1" />
                          <p className="text-xs font-bold text-emerald-900">You are on the notification list!</p>
                          <p className="text-[11px] text-emerald-800">
                            We will send you an email the moment online card payments go live.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleWaitlistSubmit} className="space-y-2">
                          <span className="text-[11px] font-bold text-gray-700 block font-heading">
                            Get notified when Card Payments launch:
                          </span>
                          <div className="flex gap-2">
                            <input
                              type="email"
                              required
                              placeholder="Enter your email address"
                              value={waitlistEmail}
                              onChange={(e) => setWaitlistEmail(e.target.value)}
                              className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#e7e2d8] text-xs focus:outline-none focus:border-primary"
                            />
                            <button
                              type="submit"
                              className="px-4 py-2 rounded-xl bg-ink text-white font-bold text-xs cursor-pointer hover:bg-black transition-colors"
                            >
                              Notify Me
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
