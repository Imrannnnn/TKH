import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Heart, Check, Copy, ArrowRight, MessageCircle, ShieldCheck, Lock } from '../components/Icons';

export default function GetInvolved({ onOpenDonate, initialTab = 'donate', setCurrentPage }) {
  const { addInquiry } = useData();
  const [activeTab, setActiveTab] = useState(initialTab || 'donate');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Donate Form State
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
  const [openFaq, setOpenFaq] = useState(null);
  const [donateSuccess, setDonateSuccess] = useState(false);
  const [isDonating, setIsDonating] = useState(false);

  // Volunteer Form State
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

  // Partner Form State
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

  const currentAmount = isCustom ? Number(customAmount.replace(/[^0-9]/g, '')) || 0 : selectedAmount;

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
        name: volForm.name,
        email: volForm.email,
        phone: volForm.phone,
        type: 'volunteer-application',
        role: volForm.role,
        state: volForm.state,
        skills: volForm.skills,
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
        name: partForm.contactName,
        email: partForm.email,
        phone: partForm.phone,
        type: 'partner-inquiry',
        orgName: partForm.orgName,
        partnershipType: partForm.type,
        notes: partForm.notes,
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
      q: 'How does the 100% model work in practice?',
      a: 'Every single naira donated by the public goes directly to children, mothers and families in our frontline programmes. Our trustees and founders cover all organizational overhead, office administration, travel, card processing fees, and staff logistics through a private endowment.'
    },
    {
      q: 'Can I stop a monthly gift?',
      a: 'Yes, anytime with one click. When you set up a monthly gift, you receive a personal donor link by email where you can pause, adjust, or cancel your recurring contribution at any moment. You can also send a quick WhatsApp message to our desk at +234 818 099 4301 and we will pause or cancel it immediately for you.'
    },
    {
      q: 'Where will my donation receipt be sent?',
      a: 'You will receive an automated official donor confirmation immediately by email, accompanied by your transaction reference. As soon as the field mission you supported is executed, you will also receive the published field report showing exactly how and where the funds were delivered.'
    },
    {
      q: 'Can I designate my gift to a specific focus area or child?',
      a: 'Yes. You can select your preferred programme from the dropdown menu (Scholarships, School Supplies, Orphanage Outreaches, Medical Outreaches, Widows Empowerment, or Youth Skills). For individual student scholarship tracking, our team provides student report cards each academic term.'
    },
    {
      q: 'How do I volunteer in my state?',
      a: 'Select the "Volunteer" tab on this page, enter your contact information, state, and skills. Our state coordinator in your area will connect with you via WhatsApp or phone ahead of the next planned community deployment.'
    }
  ];

  return (
    <div className="w-full bg-[#fdfbf7] text-[#1c1c1a] py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 1. Header */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7a1b1b] block mb-2">
            GET INVOLVED
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-stone-900 mb-3 tracking-tight leading-tight">
            Three ways to make a difference.
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            Fund a child's school term, volunteer your skills on the ground, or partner with us through institutional CSR.
          </p>
        </div>

        {/* 2. Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 sm:mb-12 border-b border-stone-200/80 pb-4">
          {[
            { id: 'donate', label: 'Donate' },
            { id: 'volunteer', label: 'Volunteer' },
            { id: 'partner', label: 'Partner with us' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#7a1b1b] text-white shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3. Main Form Panel & Side Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16 sm:mb-24">
          
          {/* Left Column: Form Panel */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-sm">
            
            {/* TAB 1: DONATE */}
            {activeTab === 'donate' && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2 tracking-tight">
                  Support a programme
                </h2>
                <p className="text-stone-600 text-sm mb-6 leading-relaxed">
                  100% of your gift delivers school kits, tuition, medicines, or enterprise tools directly to beneficiaries.
                </p>

                {donateSuccess ? (
                  <div className="p-8 rounded-2xl bg-emerald-50 text-emerald-900 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto font-bold text-xl">
                      ✓
                    </div>
                    <h3 className="text-xl font-bold">Thank you for your generosity!</h3>
                    <p className="text-sm text-stone-600 max-w-md mx-auto">
                      Your gift of ₦{currentAmount.toLocaleString()} will be deployed directly to {designation}. An official receipt has been dispatched to your email.
                    </p>
                    <button
                      onClick={() => setDonateSuccess(false)}
                      className="mt-4 px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold cursor-pointer"
                    >
                      Make another contribution
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleDonateSubmit} className="space-y-6">
                    {/* Frequency Toggle */}
                    <div className="flex p-1 bg-stone-100 rounded-full max-w-xs">
                      <button
                        type="button"
                        onClick={() => setFrequency('once')}
                        className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                          frequency === 'once' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        Give once
                      </button>
                      <button
                        type="button"
                        onClick={() => setFrequency('monthly')}
                        className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                          frequency === 'monthly' ? 'bg-[#7a1b1b] text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        Give monthly
                      </button>
                    </div>

                    {/* Amount Presets */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                        Select Amount (NGN)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {[5000, 15000, 45000, 150000].map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => {
                              setSelectedAmount(amt);
                              setIsCustom(false);
                            }}
                            className={`py-3 px-3 rounded-2xl text-sm font-bold border transition-all cursor-pointer ${
                              !isCustom && selectedAmount === amt
                                ? 'bg-[#7a1b1b] text-white border-[#7a1b1b] shadow-sm'
                                : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            ₦{amt.toLocaleString()}
                          </button>
                        ))}
                      </div>

                      {/* Custom Amount Field */}
                      <div className="mt-3">
                        <input
                          type="text"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setIsCustom(true);
                          }}
                          placeholder="Or enter custom amount in ₦"
                          className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:border-[#7a1b1b]"
                        />
                      </div>

                      {/* Impact Tagline */}
                      <div className="mt-3 text-xs text-[#1b4d3e] font-semibold bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100">
                        {getImpactText(currentAmount)}
                      </div>
                    </div>

                    {/* Where Should It Go? (With Orphanage outreaches included) */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                        Where should it go?
                      </label>
                      <select
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm text-stone-800 focus:outline-none focus:border-[#7a1b1b]"
                      >
                        <option value="Where it's needed most">Where it's needed most</option>
                        <option value="Scholarships (School fees & uniforms)">Scholarships (School fees &amp; uniforms)</option>
                        <option value="School supplies & learning kits">School supplies &amp; learning kits</option>
                        <option value="Orphanage outreaches (Food & learning relief)">Orphanage outreaches (Food &amp; learning relief)</option>
                        <option value="Medical outreaches & malaria prevention">Medical outreaches &amp; malaria prevention</option>
                        <option value="Widows & women empowerment">Widows &amp; women empowerment</option>
                        <option value="Youth skills & trade apprenticeships">Youth skills &amp; trade apprenticeships</option>
                      </select>
                    </div>

                    {/* Payment Method Toggle */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                        Payment Method
                      </label>
                      <div className="grid grid-cols-2 gap-2.5 mb-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('card')}
                          className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                            paymentMethod === 'card'
                              ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          Debit / Credit Card (Paystack)
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('transfer')}
                          className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                            paymentMethod === 'transfer'
                              ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          Direct Bank Transfer
                        </button>
                      </div>

                      {paymentMethod === 'transfer' && (
                        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-700 space-y-2">
                          <div className="font-semibold text-stone-900">Direct Bank Transfer Details:</div>
                          <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-stone-200">
                            <div>
                              <div className="text-[11px] text-stone-500">Bank &amp; Account Number</div>
                              <div className="font-bold text-sm text-stone-900">Zenith Bank · 1309157309</div>
                              <div className="text-[11px] text-stone-500">Ten Kind Hands Initiative</div>
                            </div>
                            <button
                              type="button"
                              onClick={handleCopyAccount}
                              className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold cursor-pointer transition-colors"
                            >
                              {copiedBank ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                          <p className="text-[11px] text-stone-500 leading-normal">
                            Please use your name as payment description, or send a transfer screenshot to our WhatsApp desk (+234 818 099 4301) for instant confirmation.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Donor Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Ibrahim Danjuma"
                          className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:border-[#7a1b1b]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="For receipt delivery"
                          className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:border-[#7a1b1b]"
                        />
                      </div>
                    </div>

                    {/* One Clear Give Button */}
                    <button
                      type="submit"
                      disabled={isDonating}
                      className="w-full py-4 rounded-full bg-[#7a1b1b] hover:bg-[#621616] text-white font-bold text-base sm:text-lg transition-colors shadow-sm cursor-pointer min-h-[48px]"
                    >
                      {isDonating ? 'Processing...' : `Give ₦${currentAmount.toLocaleString()} ${frequency === 'monthly' ? 'monthly' : 'now'}`}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB 2: VOLUNTEER */}
            {activeTab === 'volunteer' && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2 tracking-tight">
                  Volunteer on the ground
                </h2>
                <p className="text-stone-600 text-sm mb-6 leading-relaxed">
                  Join our state coordinators for upcoming field missions in education, maternal triage, or skills mentorship.
                </p>

                {volSuccess ? (
                  <div className="p-8 rounded-2xl bg-emerald-50 text-emerald-900 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto font-bold text-xl">
                      ✓
                    </div>
                    <h3 className="text-xl font-bold">Application Received!</h3>
                    <p className="text-sm text-stone-600 max-w-md mx-auto">
                      Thank you, {volForm.name}. Our state coordinator for {volForm.state} will reach out via WhatsApp or phone ahead of the next planned mission.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleVolSubmit} className="space-y-4 sm:space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={volForm.name}
                        onChange={(e) => setVolForm({ ...volForm, name: e.target.value })}
                        placeholder="e.g. Grace Adebayo"
                        className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:border-[#7a1b1b]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={volForm.email}
                          onChange={(e) => setVolForm({ ...volForm, email: e.target.value })}
                          placeholder="yourname@domain.com"
                          className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:border-[#7a1b1b]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={volForm.phone}
                          onChange={(e) => setVolForm({ ...volForm, phone: e.target.value })}
                          placeholder="e.g. 08012345678"
                          className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:border-[#7a1b1b]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                          Preferred Role
                        </label>
                        <select
                          value={volForm.role}
                          onChange={(e) => setVolForm({ ...volForm, role: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm text-stone-800 focus:outline-none focus:border-[#7a1b1b]"
                        >
                          <option value="Education tutor & mentor">Education tutor &amp; mentor</option>
                          <option value="Medical outreach volunteer (Nurse / Doctor)">Medical outreach volunteer (Nurse / Doctor)</option>
                          <option value="Packing & field logistics">Packing &amp; field logistics</option>
                          <option value="Photography & field reporting">Photography &amp; field reporting</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                          Active State
                        </label>
                        <select
                          value={volForm.state}
                          onChange={(e) => setVolForm({ ...volForm, state: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm text-stone-800 focus:outline-none focus:border-[#7a1b1b]"
                        >
                          <option value="FCT Abuja">FCT Abuja</option>
                          <option value="Plateau State">Plateau State</option>
                          <option value="Benue State">Benue State</option>
                          <option value="Lagos State">Lagos State</option>
                          <option value="Oyo State">Oyo State</option>
                          <option value="Katsina State">Katsina State</option>
                          <option value="Enugu State">Enugu State</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Relevant Skills &amp; Availability
                      </label>
                      <textarea
                        rows={3}
                        value={volForm.skills}
                        onChange={(e) => setVolForm({ ...volForm, skills: e.target.value })}
                        placeholder="Tell us briefly about your professional background or days available..."
                        className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:border-[#7a1b1b]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isVolSubmitting}
                      className="w-full py-4 rounded-full bg-stone-900 hover:bg-black text-white font-bold text-sm sm:text-base transition-colors shadow-sm cursor-pointer"
                    >
                      {isVolSubmitting ? 'Submitting...' : 'Sign up as a volunteer'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB 3: PARTNER */}
            {activeTab === 'partner' && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2 tracking-tight">
                  Institutional &amp; CSR Partnerships
                </h2>
                <p className="text-stone-600 text-sm mb-6 leading-relaxed">
                  Collaborate on community healthcare drives, solar computer labs, or targeted educational sponsorship.
                </p>

                {partSuccess ? (
                  <div className="p-8 rounded-2xl bg-emerald-50 text-emerald-900 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto font-bold text-xl">
                      ✓
                    </div>
                    <h3 className="text-xl font-bold">Partnership Inquiry Received</h3>
                    <p className="text-sm text-stone-600 max-w-md mx-auto">
                      Thank you. Our partnership director will review your proposal and respond within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handlePartSubmit} className="space-y-4 sm:space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Organization / Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={partForm.orgName}
                        onChange={(e) => setPartForm({ ...partForm, orgName: e.target.value })}
                        placeholder="e.g. Zenith Tech Ltd"
                        className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:border-[#7a1b1b]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                          Contact Person *
                        </label>
                        <input
                          type="text"
                          required
                          value={partForm.contactName}
                          onChange={(e) => setPartForm({ ...partForm, contactName: e.target.value })}
                          placeholder="Your full name"
                          className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:border-[#7a1b1b]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={partForm.email}
                          onChange={(e) => setPartForm({ ...partForm, email: e.target.value })}
                          placeholder="contact@company.com"
                          className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:border-[#7a1b1b]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Partnership Type
                      </label>
                      <select
                        value={partForm.type}
                        onChange={(e) => setPartForm({ ...partForm, type: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm text-stone-800 focus:outline-none focus:border-[#7a1b1b]"
                      >
                        <option value="Corporate CSR Sponsorship">Corporate CSR Sponsorship</option>
                        <option value="In-kind Equipment or Supplies Grant">In-kind Equipment or Supplies Grant</option>
                        <option value="Community Healthcare Collaboration">Community Healthcare Collaboration</option>
                        <option value="School Rehabilitation">School Rehabilitation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Partnership Proposal Summary
                      </label>
                      <textarea
                        rows={3}
                        value={partForm.notes}
                        onChange={(e) => setPartForm({ ...partForm, notes: e.target.value })}
                        placeholder="Briefly describe your objectives or regions of interest..."
                        className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:border-[#7a1b1b]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isPartSubmitting}
                      className="w-full py-4 rounded-full bg-stone-900 hover:bg-black text-white font-bold text-sm sm:text-base transition-colors shadow-sm cursor-pointer"
                    >
                      {isPartSubmitting ? 'Submitting...' : 'Send partnership inquiry'}
                    </button>
                  </form>
                )}
              </div>
            )}

          </div>

          {/* Right Column: "Why give through us" and Photo */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Why give through us card */}
            <div className="bg-[#1b4d3e] text-white rounded-3xl p-6 sm:p-8 shadow-sm">
              <span className="text-xs uppercase font-bold tracking-wider text-[#a8d5c4] block mb-2">
                RADICAL INTEGRITY
              </span>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">
                Why give through us
              </h3>
              <ul className="space-y-4 text-xs sm:text-sm text-white/90">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </span>
                  <div>
                    <strong className="text-white block">100% to Frontline Programmes:</strong>
                    Every kobo you contribute pays tuition, kits, or supplies. We never deduct administration cuts.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </span>
                  <div>
                    <strong className="text-white block">Public Field Reports Within Two Weeks:</strong>
                    Detailed receipts, vendor invoices, and photo dispatches are published after every single mission.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    ✓
                  </span>
                  <div>
                    <strong className="text-white block">Direct In-Person Delivery Across 7 States:</strong>
                    Delivered straight into children's and mothers' hands by trusted local coordinators.
                  </div>
                </li>
              </ul>
            </div>

            {/* Photo Beside It */}
            <div className="rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm h-64 sm:h-72 bg-stone-100">
              <img
                src="/images/hero-debate-competition-makurdi.webp"
                alt="Ten Kind Hands scholars and educators"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/IMG_0300.JPG';
                }}
              />
            </div>

          </div>

        </div>

        {/* 4. Questions in a Simple Expandable List */}
        <div className="max-w-3xl mx-auto pt-6 border-t border-stone-200/80">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7a1b1b] block mb-1">
              QUESTIONS &amp; ANSWERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-bold text-base sm:text-lg text-stone-900">
                      {faq.q}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center font-bold text-base shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-stone-600 leading-relaxed border-t border-stone-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
