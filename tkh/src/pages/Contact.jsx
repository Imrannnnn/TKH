import { useState } from 'react';
import { useData } from '../context/DataContext';
import { MessageCircle, Mail, MapPin, ArrowRight, Check, Instagram, Facebook, Youtube, TikTok } from '../components/Icons';

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
    <div className="w-full bg-[#fdfbf7] text-[#1c1c1a] py-8 sm:py-16 3xl:py-20 4xl:py-24">
      <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16 uw:px-20">

        {/* Header */}
        <div className="max-w-3xl 3xl:max-w-4xl 4xl:max-w-5xl mb-8 sm:mb-12 3xl:mb-16">
          <span className="text-xs 3xl:text-sm uppercase font-bold tracking-widest text-maroon block mb-2">
            CONTACT
          </span>
          <h1 className="font-heading font-bold text-2xl xs:text-3xl sm:text-4xl lg:text-5xl 3xl:text-6xl text-[#1c1c1a] mb-3 leading-tight">
            Talk to a real person.
          </h1>
          <p className="text-sm sm:text-base lg:text-lg 3xl:text-xl text-[#4a4a46] leading-relaxed">
            WhatsApp first, our official email, our national office in Abuja, and one short form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 3xl:gap-16 4xl:gap-20 items-start">
          
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 flex flex-col gap-6 3xl:gap-8">
            
            {/* WhatsApp Featured Box */}
            <div className="bg-forest text-white rounded-3xl p-5 sm:p-8 3xl:p-10 shadow-sm">
              <div className="flex items-center gap-3 3xl:gap-4 mb-3 3xl:mb-4">
                <div className="w-10 h-10 3xl:w-12 3xl:h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <MessageCircle className="w-5 h-5 3xl:w-6 3xl:h-6 fill-current" />
                </div>
                <div>
                  <span className="text-xs 3xl:text-sm uppercase font-bold tracking-widest text-[#a8d5c4] block">
                    FASTEST RESPONSE
                  </span>
                  <h3 className="font-heading font-bold text-base sm:text-lg 3xl:text-xl text-white">
                    WhatsApp Desk
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm 3xl:text-base text-white/80 leading-relaxed mb-6 3xl:mb-8">
                Our operations team answers messages directly. Ideal for quick questions, donor receipts, or volunteering queries.
              </p>

              <a
                href="https://wa.me/2348180994301"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 3xl:py-4 px-5 sm:px-6 3xl:px-8 rounded-full bg-white text-forest font-heading font-bold text-xs sm:text-sm 3xl:text-base hover:bg-[#f5f1e8] transition-colors flex items-center justify-center gap-2 text-center min-h-[44px]"
              >
                <span>Chat on WhatsApp (+234 818 099 4301)</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>
            </div>

            {/* Email Channels Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-8 3xl:p-10 border border-[#e5e0d8] shadow-sm flex flex-col gap-4 3xl:gap-5">
              <h3 className="font-heading font-bold text-base 3xl:text-lg text-[#1c1c1a]">
                Official Email
              </h3>

              <div className="flex items-start gap-3 3xl:gap-4">
                <div className="w-8 h-8 3xl:w-10 3xl:h-10 rounded-full bg-maroon-tint text-maroon flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 3xl:w-5 3xl:h-5" />
                </div>
                <div>
                  <div className="text-xs 3xl:text-sm text-[#706e68]">General Inquiries, Partnerships &amp; Support</div>
                  <a
                    href="mailto:info@tenkindhands.org"
                    className="font-heading font-semibold text-xs sm:text-sm 3xl:text-base text-[#1c1c1a] hover:text-maroon transition-colors break-all"
                  >
                    info@tenkindhands.org
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Channels Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-8 3xl:p-10 border border-[#e5e0d8] shadow-sm flex flex-col gap-4 3xl:gap-5">
              <h3 className="font-heading font-bold text-base 3xl:text-lg text-[#1c1c1a]">
                Connect on Social Media
              </h3>
              <p className="text-xs 3xl:text-sm text-[#706e68]">
                Follow our official accounts for regular field dispatches and stories:
              </p>
              <div className="flex items-center gap-3 3xl:gap-4 pt-1 text-[#4a4a46]">
                <a
                  href="https://www.instagram.com/tenkindhands"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 3xl:w-12 3xl:h-12 rounded-full border border-[#e5e0d8] bg-[#fdfbf7] flex items-center justify-center hover:text-maroon hover:border-maroon transition-colors min-h-[40px] min-w-[40px]"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 3xl:w-5 3xl:h-5" />
                </a>
                <a
                  href="https://web.facebook.com/tenkindhandss/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 3xl:w-12 3xl:h-12 rounded-full border border-[#e5e0d8] bg-[#fdfbf7] flex items-center justify-center hover:text-maroon hover:border-maroon transition-colors min-h-[40px] min-w-[40px]"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 3xl:w-5 3xl:h-5" />
                </a>
                <a
                  href="https://www.youtube.com/@TenkindhandsFoundation"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 3xl:w-12 3xl:h-12 rounded-full border border-[#e5e0d8] bg-[#fdfbf7] flex items-center justify-center hover:text-maroon hover:border-maroon transition-colors min-h-[40px] min-w-[40px]"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4 3xl:w-5 3xl:h-5" />
                </a>
                <a
                  href="https://www.tiktok.com/@tenkindhandsfoundation"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 3xl:w-12 3xl:h-12 rounded-full border border-[#e5e0d8] bg-[#fdfbf7] flex items-center justify-center hover:text-maroon hover:border-maroon transition-colors min-h-[40px] min-w-[40px]"
                  aria-label="TikTok"
                >
                  <TikTok className="w-4 h-4 3xl:w-5 3xl:h-5" />
                </a>
              </div>
            </div>

            {/* National Secretariat Office Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-8 3xl:p-10 border border-[#e5e0d8] shadow-sm">
              <div className="flex items-start gap-3 3xl:gap-4">
                <div className="w-8 h-8 3xl:w-10 3xl:h-10 rounded-full bg-sand text-[#1c1c1a] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 3xl:w-5 3xl:h-5" />
                </div>
                <div>
                  <div className="text-xs 3xl:text-sm uppercase font-bold tracking-wider text-[#706e68] mb-1">
                    National Secretariat
                  </div>
                  <p className="text-xs sm:text-sm 3xl:text-base font-heading font-semibold text-[#1c1c1a] leading-snug">
                    Danglo Plaza 204, 6th Avenue, Gwarinpa, Abuja, Nigeria
                  </p>
                  <p className="text-xs 3xl:text-sm text-[#706e68] mt-2">
                    Hours: Monday – Friday, 9:00 AM – 5:00 PM (WAT)
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: One Short Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-8 lg:p-10 3xl:p-14 border border-[#e5e0d8] shadow-sm">
            <h2 className="font-heading font-bold text-xl sm:text-2xl 3xl:text-3xl text-[#1c1c1a] mb-2">
              Send us a direct message
            </h2>
            <p className="text-xs sm:text-sm 3xl:text-base text-[#4a4a46] leading-relaxed mb-6 3xl:mb-8">
              Fill in your details below and a team coordinator will respond within 24 hours.
            </p>

            {submitted ? (
              <div className="p-8 3xl:p-12 rounded-2xl bg-forest-tint text-forest text-center">
                <div className="w-12 h-12 3xl:w-16 3xl:h-16 rounded-full bg-white text-forest flex items-center justify-center mx-auto mb-3 shadow-xs">
                  <Check className="w-6 h-6 3xl:w-8 3xl:h-8 stroke-[2.5]" />
                </div>
                <h3 className="font-heading font-bold text-lg sm:text-xl 3xl:text-2xl mb-1">
                  Message Sent!
                </h3>
                <p className="text-xs sm:text-sm 3xl:text-base">
                  Thank you, {form.name}. We have received your message and will reply to {form.email} promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 3xl:space-y-6">
                <div>
                  <label className="block text-xs 3xl:text-sm font-bold uppercase tracking-wider text-[#706e68] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Maryam Bello"
                    className="w-full px-4 py-3 3xl:py-4 bg-[#fdfbf7] rounded-2xl border border-[#e5e0d8] text-sm 3xl:text-base text-[#1c1c1a] focus:outline-none focus:border-maroon min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs 3xl:text-sm font-bold uppercase tracking-wider text-[#706e68] mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="yourname@domain.com"
                    className="w-full px-4 py-3 3xl:py-4 bg-[#fdfbf7] rounded-2xl border border-[#e5e0d8] text-sm 3xl:text-base text-[#1c1c1a] focus:outline-none focus:border-maroon min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs 3xl:text-sm font-bold uppercase tracking-wider text-[#706e68] mb-1">
                    Topic
                  </label>
                  <select
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="w-full px-4 py-3 3xl:py-4 bg-[#fdfbf7] rounded-2xl border border-[#e5e0d8] text-sm 3xl:text-base text-[#1c1c1a] focus:outline-none focus:border-maroon min-h-[44px]"
                  >
                    <option value="General Question">General Question</option>
                    <option value="Donation or Receipt Inquiry">Donation or Receipt Inquiry</option>
                    <option value="Volunteering with State Coordinator">Volunteering with State Coordinator</option>
                    <option value="CSR / Institutional Partnership">CSR / Institutional Partnership</option>
                    <option value="School Outreach Referral">School Outreach Referral</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs 3xl:text-sm font-bold uppercase tracking-wider text-[#706e68] mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 3xl:py-4 bg-[#fdfbf7] rounded-2xl border border-[#e5e0d8] text-sm 3xl:text-base text-[#1c1c1a] focus:outline-none focus:border-maroon"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 3xl:py-5 text-sm sm:text-base 3xl:text-lg font-semibold shadow-md mt-2 flex items-center justify-center gap-2 min-h-[48px]"
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
