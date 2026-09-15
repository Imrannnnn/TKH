import { useState } from 'react';
import { CheckCircle2, Heart, MessageSquare } from './Icons';

export default function Footer({ setCurrentPage, onSelectLegalTab }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNav = (pageId, subId = null) => {
    if (pageId === 'legal' && subId && onSelectLegalTab) {
      onSelectLegalTab(subId);
    }
    setCurrentPage(pageId);
    window.location.hash = subId ? `${pageId}/${subId}` : pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3500);
    }
  };

  return (
    <footer className="bg-sand w-full pt-16 pb-12 border-t border-[#e7e2d8]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Top Newsletter Card */}
        <div className="bg-white p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl mb-10 sm:mb-14 flex flex-col lg:flex-row items-center justify-between gap-6 border border-[#e7e2d8]">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1">
              Field Dispatch &amp; Transparency
            </span>
            <h3 className="editorial-title text-xl sm:text-2xl md:text-3xl text-ink">
              Receive quarterly audited reports &amp; field stories.
            </h3>
            <p className="text-xs sm:text-sm text-ink-light mt-2 leading-relaxed">
              Every 3 months, we send transparent project receipts, photographic updates, and community testimonies directly to our supporters.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="px-5 sm:px-6 py-3 rounded-2xl bg-sand text-ink text-xs font-semibold flex items-center gap-2 border border-[#e7e2d8]">
                <CheckCircle2 className="w-4 h-4 text-forest shrink-0" />
                <span>Thank you. You are subscribed to our quarterly field audit.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 sm:gap-2 w-full max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 rounded-full bg-sand text-xs border border-[#e7e2d8] text-ink focus:outline-none focus:border-primary flex-grow w-full"
                />
                <button
                  type="submit"
                  className="btn-primary text-xs px-6 py-3 cursor-pointer whitespace-nowrap w-full sm:w-auto justify-center"
                >
                  Join Dispatch
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 5 Columns Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#e7e2d8]">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 text-left cursor-pointer w-fit"
            >
              <div className="w-9 h-9 rounded-xl bg-white border border-[#e7e2d8] flex items-center justify-center p-1">
                <img
                  alt="Ten Kind Hands Logo"
                  className="w-full h-full object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmbaMRmoVzqGDmSGEoX0XoPFIdN6UYrwile-1Gt1d37VzrQ2PeaP9G7MITiOYlV5Mlma8OlajwkWA3r7O1u4I69Sez16xvET1fYSAP8dl7zhMj1M0gMuXfZYOCWyuePctpR97q8v72-LHjIYFUf8CgqilRAMMM-D-G-S-sJToMqi-nhfADpBN1MUQEsECDNokFRkKAoeuKy8OqR7LAReSeIGPvsSwv08HUP9RVs-2uxRF2z55chm270O5kDJRiqFAmMg"
                />
              </div>
              <div>
                <span className="editorial-title text-2xl text-ink block leading-none">
                  Ten Kind Hands
                </span>
                <span className="text-[10px] uppercase tracking-widest text-ink-muted mt-0.5 block">
                  Registered Non-Profit NGO 148920
                </span>
              </div>
            </button>

            <p className="text-xs text-ink-light leading-relaxed max-w-sm">
              Restoring human dignity through sustainable equal access to education and frontline healthcare in underserved Nigerian communities.
            </p>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-ink-muted">
              <span>CAC/IT/NO: 148920</span>
              <span>•</span>
              <span className="text-forest font-semibold">100% Direct Giving</span>
            </div>
          </div>

          {/* 6 Programs */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs uppercase tracking-wider text-ink font-bold mb-1">
              Core Initiatives
            </h4>
            <button onClick={() => handleNav('programs')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Scholarships
            </button>
            <button onClick={() => handleNav('programs')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Youth Development
            </button>
            <button onClick={() => handleNav('programs')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Orphanages &amp; Outreaches
            </button>
            <button onClick={() => handleNav('programs')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              School Donations
            </button>
            <button onClick={() => handleNav('programs')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Medical Outreaches
            </button>
            <button onClick={() => handleNav('programs')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Women &amp; Widows Impact
            </button>
          </div>

          {/* Organization */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs uppercase tracking-wider text-ink font-bold mb-1">
              Organization
            </h4>
            <button onClick={() => handleNav('home')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Home
            </button>
            <button onClick={() => handleNav('our-story')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Our Story &amp; Origin
            </button>
            <button onClick={() => handleNav('impact')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Audited Impact Metrics
            </button>
            <button onClick={() => handleNav('testimonials')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Community Letters
            </button>
            <button onClick={() => handleNav('transparency')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Financial Transparency
            </button>
            <button onClick={() => handleNav('news')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Field Dispatches &amp; News
            </button>
            <button onClick={() => handleNav('outreaches')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Outreach Log
            </button>
          </div>

          {/* Get Involved */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs uppercase tracking-wider text-ink font-bold mb-1">
              Get Involved
            </h4>
            <button onClick={() => handleNav('get-involved', 'donate')} className="text-left text-xs text-primary font-bold hover:underline cursor-pointer flex items-center gap-1">
              <span>Donate (Impact Tiers)</span>
              <Heart className="w-3 h-3" />
            </button>
            <button onClick={() => handleNav('get-involved', 'volunteer')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Volunteer Opportunities
            </button>
            <button onClick={() => handleNav('get-involved', 'partnership')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              CSR &amp; Partnerships
            </button>
            <button onClick={() => handleNav('contact')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Contact &amp; FAQ
            </button>

            <div className="pt-2">
              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white text-[11px] font-semibold transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>



          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs uppercase tracking-wider text-ink font-bold mb-1">
              Address
            </h4>
            <button onClick={() => handleNav('contact')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Abuja Liaison Office:
              Plot 402, Constitution Avenue, Central Business District, Abuja, FCT, Nigeria
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <p>© {new Date().getFullYear()} Ten Kind Hands Initiative. CAC/IT/NO: 148920.</p>
          <div className="flex items-center gap-5 flex-wrap justify-center">
            <button onClick={() => handleNav('legal', 'privacy')} className="hover:text-ink transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => handleNav('legal', 'terms')} className="hover:text-ink transition-colors cursor-pointer">
              Terms of Service
            </button>
            <button onClick={() => handleNav('legal', 'donor-rights')} className="hover:text-ink transition-colors cursor-pointer">
              Donor Bill of Rights
            </button>
            <button onClick={() => handleNav('admin')} className="hover:text-primary text-ink-light font-semibold transition-colors cursor-pointer flex items-center gap-1">
              <span>Staff / Admin</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
