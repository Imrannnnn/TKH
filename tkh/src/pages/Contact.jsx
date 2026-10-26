import { useState } from 'react';
import { useData } from '../context/DataContext';
import { MessageCircle, Mail, ArrowRight, Check, Instagram, Facebook, Youtube, TikTok } from '../components/Icons';

export default function Contact() {
  const { addInquiry } = useData();
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: 'General Question',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (addInquiry) {
      await addInquiry({
        name: form.name,
        email: form.email,
        phone: '',
        category: form.topic,
        message: form.message,
        source: 'Contact Form',
        date: new Date().toISOString()
      });
    }
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="w-full bg-[#fdfbf7] text-[#1c1c1a] py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 1. Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7a1b1b] block mb-2">
            CONTACT
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-stone-900 mb-3 tracking-tight leading-tight">
            Talk to a real person.
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
            WhatsApp first for immediate responses, our official email, and a direct message form below. No automated call menus.
          </p>
        </div>

        {/* 2. One Screen Layout: Channels on Left, Message Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* WhatsApp Featured Box (Main Option) */}
            <div className="bg-[#1b4d3e] text-white rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center text-white shrink-0">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#a8d5c4] block">
                    FASTEST RESPONSE
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    WhatsApp Desk
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-white/85 leading-relaxed mb-6">
                Our operations coordinators answer messages directly. Ideal for quick questions, donor receipts, or volunteering queries.
              </p>

              <a
                href="https://wa.me/2348180994301"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-6 rounded-full bg-white text-[#1b4d3e] font-bold text-xs sm:text-sm hover:bg-stone-100 transition-colors flex items-center justify-center gap-2 text-center min-h-[44px] shadow-sm cursor-pointer"
              >
                <span>Chat on WhatsApp (+234 818 099 4301)</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>
            </div>

            {/* Email Channel Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#7a1b1b]/10 text-[#7a1b1b] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-stone-400 block">
                    OFFICIAL EMAIL
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-stone-900">
                    General Inquiries &amp; Partnerships
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-1">
                For detailed institutional proposals, audit questions, or general correspondence:
              </p>
              <a
                href="mailto:info@tenkindhands.org"
                className="text-sm sm:text-base font-bold text-[#7a1b1b] hover:underline break-all mt-1"
              >
                info@tenkindhands.org
              </a>
            </div>

            {/* Social Media Channels */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm flex flex-col gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-stone-400 block mb-1">
                  COMMUNITY UPDATES
                </span>
                <h3 className="font-bold text-base sm:text-lg text-stone-900">
                  Follow on Social Media
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-600">
                Live field dispatches, photo stories, and milestone announcements:
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://www.instagram.com/tenkindhands"
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full border border-stone-200 bg-[#fdfbf7] flex items-center justify-center hover:text-[#7a1b1b] hover:border-[#7a1b1b] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://web.facebook.com/tenkindhandss/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full border border-stone-200 bg-[#fdfbf7] flex items-center justify-center hover:text-[#7a1b1b] hover:border-[#7a1b1b] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.youtube.com/@TenkindhandsFoundation"
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full border border-stone-200 bg-[#fdfbf7] flex items-center justify-center hover:text-[#7a1b1b] hover:border-[#7a1b1b] transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://www.tiktok.com/@tenkindhandsfoundation"
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-full border border-stone-200 bg-[#fdfbf7] flex items-center justify-center hover:text-[#7a1b1b] hover:border-[#7a1b1b] transition-colors"
                  aria-label="TikTok"
                >
                  <TikTok className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: One Message Form Beside Direct Channels */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2 tracking-tight">
              Send us a direct message
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 sm:mb-8">
              Fill in your details and a coordinator from our team will respond within 24 hours.
            </p>

            {submitted ? (
              <div className="p-8 sm:p-12 rounded-2xl bg-emerald-50 text-emerald-900 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto font-bold text-xl">
                  ✓
                </div>
                <h3 className="text-xl font-bold">Message Dispatched!</h3>
                <p className="text-sm text-stone-600 max-w-md mx-auto">
                  Thank you, {form.name}. We have received your note and will reply directly to {form.email} promptly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', topic: 'General Question', message: '' });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Maryam Bello"
                    className="w-full px-4 py-3 bg-[#fdfbf7] rounded-2xl border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-[#7a1b1b] min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="yourname@domain.com"
                    className="w-full px-4 py-3 bg-[#fdfbf7] rounded-2xl border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-[#7a1b1b] min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                    Topic
                  </label>
                  <select
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="w-full px-4 py-3 bg-[#fdfbf7] rounded-2xl border border-stone-200 text-sm text-stone-800 focus:outline-none focus:border-[#7a1b1b] min-h-[44px]"
                  >
                    <option value="General Question">General Question</option>
                    <option value="Donation or Receipt Inquiry">Donation or Receipt Inquiry</option>
                    <option value="Volunteering with State Coordinator">Volunteering with State Coordinator</option>
                    <option value="CSR / Institutional Partnership">CSR / Institutional Partnership</option>
                    <option value="School Outreach Referral">School Outreach Referral</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 bg-[#fdfbf7] rounded-2xl border border-stone-200 text-sm text-stone-900 focus:outline-none focus:border-[#7a1b1b]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#7a1b1b] hover:bg-[#621616] text-white font-bold text-sm sm:text-base transition-colors shadow-sm cursor-pointer min-h-[48px] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <span>Send message</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
