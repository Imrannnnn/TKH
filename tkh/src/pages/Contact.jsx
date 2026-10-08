import { useState } from 'react';
import { useData } from '../context/DataContext';
import { MessageCircle, Mail, MapPin, ArrowRight, Check } from '../components/Icons';

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
    <div className="w-full bg-[#fdfbf7] text-[#1c1c1a] py-10 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-maroon block mb-2">
            CONTACT
          </span>
          <h1 className="font-heading font-bold text-3xl sm:text-5xl text-[#1c1c1a] mb-4">
            Talk to a real person.
          </h1>
          <p className="text-base sm:text-lg text-[#4a4a46] leading-relaxed">
            WhatsApp first, two dedicated emails, our national office in Abuja, and one short form below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* WhatsApp Featured Box */}
            <div className="bg-forest text-white rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-widest text-[#a8d5c4] block">
                    FASTEST RESPONSE
                  </span>
                  <h3 className="font-heading font-bold text-lg text-white">
                    WhatsApp Desk
                  </h3>
                </div>
              </div>

              <p className="text-sm text-white/80 leading-relaxed mb-6">
                Our operations team answers messages directly. Ideal for quick questions, donor receipts, or volunteering queries.
              </p>

              <a
                href="https://wa.me/2348180994301"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-6 rounded-full bg-white text-forest font-heading font-bold text-sm hover:bg-[#f5f1e8] transition-colors flex items-center justify-center gap-2"
              >
                <span>Chat on WhatsApp (+234 818 099 4301)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Email Channels Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e5e0d8] shadow-sm flex flex-col gap-5">
              <h3 className="font-heading font-bold text-base text-[#1c1c1a]">
                Direct Email Channels
              </h3>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-maroon-tint text-maroon flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#706e68]">General &amp; Donor Support</div>
                  <a
                    href="mailto:info@tenkindhands.org"
                    className="font-heading font-semibold text-sm text-[#1c1c1a] hover:text-maroon transition-colors"
                  >
                    info@tenkindhands.org
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-sand text-[#1c1c1a] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-[#706e68]">Corporate CSR &amp; Partnerships</div>
                  <a
                    href="mailto:partnerships@tenkindhands.org"
                    className="font-heading font-semibold text-sm text-[#1c1c1a] hover:text-maroon transition-colors"
                  >
                    partnerships@tenkindhands.org
                  </a>
                </div>
              </div>
            </div>

            {/* National Secretariat Office Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e5e0d8] shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-sand text-[#1c1c1a] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold tracking-wider text-[#706e68] mb-1">
                    National Secretariat
                  </div>
                  <p className="text-sm font-heading font-semibold text-[#1c1c1a] leading-snug">
                    Danglo Plaza 204, 6th Avenue, Gwarinpa, Abuja, Nigeria
                  </p>
                  <p className="text-xs text-[#706e68] mt-2">
                    Hours: Monday – Friday, 9:00 AM – 5:00 PM (WAT)
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: One Short Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#e5e0d8] shadow-sm">
            <h2 className="font-heading font-bold text-2xl text-[#1c1c1a] mb-2">
              Send us a direct message
            </h2>
            <p className="text-sm text-[#4a4a46] leading-relaxed mb-6">
              Fill in your details below and a team coordinator will respond within 24 hours.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-forest-tint text-forest text-center">
                <div className="w-12 h-12 rounded-full bg-white text-forest flex items-center justify-center mx-auto mb-3 shadow-xs">
                  <Check className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-1">
                  Message Sent!
                </h3>
                <p className="text-sm">
                  Thank you, {form.name}. We have received your message and will reply to {form.email} promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#706e68] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Maryam Bello"
                    className="w-full px-4 py-3 bg-[#fdfbf7] rounded-2xl border border-[#e5e0d8] text-sm text-[#1c1c1a] focus:outline-none focus:border-maroon"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#706e68] mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="maryam@example.com"
                    className="w-full px-4 py-3 bg-[#fdfbf7] rounded-2xl border border-[#e5e0d8] text-sm text-[#1c1c1a] focus:outline-none focus:border-maroon"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#706e68] mb-1">
                    Topic
                  </label>
                  <select
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="w-full px-4 py-3 bg-[#fdfbf7] rounded-2xl border border-[#e5e0d8] text-sm text-[#1c1c1a] focus:outline-none focus:border-maroon"
                  >
                    <option value="General Question">General Question</option>
                    <option value="Donation or Receipt Inquiry">Donation or Receipt Inquiry</option>
                    <option value="Volunteering with State Coordinator">Volunteering with State Coordinator</option>
                    <option value="CSR / Institutional Partnership">CSR / Institutional Partnership</option>
                    <option value="School Outreach Referral">School Outreach Referral</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#706e68] mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 bg-[#fdfbf7] rounded-2xl border border-[#e5e0d8] text-sm text-[#1c1c1a] focus:outline-none focus:border-maroon"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 text-base font-semibold shadow-md mt-2 flex items-center justify-center gap-2"
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
