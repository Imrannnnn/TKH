import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle, Clock } from '../components/Icons';
import CurvedWaveBackground from '../components/CurvedWaveBackground';

export default function Contact() {
  const { addInquiry } = useData();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addInquiry) {
      addInquiry({
        name: form.name,
        email: form.email,
        phone: form.phone,
        category: form.category === 'general' ? 'General Inquiry' : form.category,
        message: form.message,
        source: 'Contact Page'
      });
    }
    setSubmitted(true);
  };

  return (
    <div className="pt-24 md:pt-28 animate-fade-in bg-white pb-20">
      {/* Header with Ambient Wave */}
      <section className="relative py-12 md:py-16 px-4 md:px-8 max-w-5xl mx-auto text-center overflow-hidden">
        <CurvedWaveBackground side="right" />

        <div className="relative z-10">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
            Direct Communication
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-ink max-w-3xl mx-auto mb-6 tracking-tight">
            We are here to listen, <br />
            <span className="text-primary">answer &amp; collaborate.</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-light max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            Reach our field coordination desk in Abuja or connect directly with our partnerships, volunteer, and donor relations teams.
          </p>
        </div>
      </section>

      {/* Main Grid with Mirrored Wave */}
      <section className="relative px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        <CurvedWaveBackground side="left" />

        <div className="relative z-10 grid md:grid-cols-12 gap-8 items-start">
          {/* Contact Information Column */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white/95 backdrop-blur-xs p-5 sm:p-8 rounded-3xl border border-[#e7e2d8] shadow-xs">
              <h3 className="text-2xl font-heading font-bold text-ink mb-6">
                National Secretariat
              </h3>

              <div className="space-y-5 text-xs text-ink-light">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ink block font-heading">Abuja Liaison Office:</strong>
                    <span>Plot 402, Constitution Avenue, Central Business District, Abuja, FCT, Nigeria.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ink block font-heading">Phone &amp; Hotline:</strong>
                    <span>+234 803 000 1234 / +234 809 111 5678</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-clay shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ink block font-heading">Email Desks:</strong>
                    <span className="block break-all sm:break-normal">General: <a href="mailto:info@tenkindhands.org" className="text-primary hover:underline">info@tenkindhands.org</a></span>
                    <span className="block break-all sm:break-normal">Partnerships: <a href="mailto:partnerships@tenkindhands.org" className="text-primary hover:underline">partnerships@tenkindhands.org</a></span>
                    <span className="block break-all sm:break-normal">Volunteers: <a href="mailto:volunteer@tenkindhands.org" className="text-primary hover:underline">volunteer@tenkindhands.org</a></span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-ink block font-heading">Desk Hours:</strong>
                    <span>Monday – Friday: 8:30 AM – 5:00 PM (WAT)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instant WhatsApp Card */}
            <div className="bg-sand/90 p-5 sm:p-6 rounded-3xl border border-[#e7e2d8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-heading font-bold text-ink">WhatsApp Desk</h4>
                  <span className="text-[11px] text-ink-muted">Quick responses within 2 hours</span>
                </div>
              </div>
              <a
                href="https://wa.me/2348030001234?text=Hello%20Ten%20Kind%20Hands,%20I%20would%20like%20to%20inquire%20about..."
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto text-center px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors font-heading"
              >
                Chat Now
              </a>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="md:col-span-7 bg-white/95 backdrop-blur-xs p-5 sm:p-8 md:p-12 rounded-3xl border border-[#e7e2d8] shadow-xs">
            {submitted ? (
              <div className="py-12 text-center animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto mb-4" />
                <h3 className="text-2xl font-heading font-bold text-emerald-900 mb-2">
                  Message Sent Successfully
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed mb-6">
                  Thank you, {form.name}. Your inquiry has been routed to the relevant desk. Our coordination team will respond to <strong>{form.email}</strong> within 1 business day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary text-xs px-6 py-2.5 font-heading font-semibold cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-2xl font-heading font-bold text-ink mb-1">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-ink-light mb-6">
                  Fill in the fields below and our communications desk will get back to you promptly.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-ink block mb-1 font-heading">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amina Bello"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-sand border border-[#e7e2d8] text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-ink block mb-1 font-heading">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-sand border border-[#e7e2d8] text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-ink block mb-1 font-heading">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="080 1234 5678"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-sand border border-[#e7e2d8] text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-ink block mb-1 font-heading">Topic / Department *</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-sand border border-[#e7e2d8] text-xs focus:outline-none focus:border-primary cursor-pointer font-heading"
                    >
                      <option value="general">General Inquiries</option>
                      <option value="donation">Donations &amp; Wire Transfers</option>
                      <option value="partnership">Corporate &amp; Institutional Partnership</option>
                      <option value="volunteer">Volunteering &amp; Medical Missions</option>
                      <option value="media">Media &amp; Press Relations</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-ink block mb-1 font-heading">Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Type your message or inquiry here..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-sand border border-[#e7e2d8] text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3.5 text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm font-heading font-semibold"
                >
                  <span>Submit Direct Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
