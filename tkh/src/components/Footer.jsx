import { useState } from 'react';
import { Heart, Instagram, Facebook, Youtube } from './Icons';

export default function Footer({ setCurrentPage, onSelectLegalTab, onSelectProgram, onSelectGetInvolvedTab }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNav = (e, pageId, subId = null) => {
    if (e) e.preventDefault();
    if (pageId === 'legal' && subId && onSelectLegalTab) {
      onSelectLegalTab(subId);
    }
    if (pageId === 'programs' && onSelectProgram) {
      onSelectProgram(subId);
    }
    if (pageId === 'get-involved' && subId && onSelectGetInvolvedTab) {
      onSelectGetInvolvedTab(subId);
    }
    setCurrentPage(pageId);
    window.location.hash = subId ? `${pageId}/${subId}` : (pageId === 'home' ? '' : pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="w-full bg-[#fdfbf7] border-t border-[#e5e0d8] pt-12 pb-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* 1. Newsletter Band (from redesign spec) */}
        <div className="bg-[#f5f1e8] rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-14 border border-[#e5e0d8] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-md">
            <h3 className="font-heading font-bold text-lg sm:text-xl text-[#1c1c1a]">
              One email a month: the latest field report.
            </h3>
            <p className="text-sm text-[#4a4a46] mt-1">
              Photos, numbers and what is next. No spam.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {subscribed ? (
              <div className="px-5 py-3 rounded-full bg-forest-tint text-forest font-medium text-sm">
                ✓ Thank you for subscribing to our monthly field dispatch!
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full sm:w-72 px-4 py-3 rounded-full bg-white border border-[#e5e0d8] text-[#1c1c1a] placeholder:text-[#88857f] text-sm focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#1c1c1a] hover:bg-[#333330] text-white font-medium text-sm transition-colors cursor-pointer shrink-0"
                >
                  Subscribe
                </button>
              </>
            )}
          </form>
        </div>

        {/* 2. Four Columns Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#e5e0d8]">
          {/* Brand Info */}
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-2.5 text-[#1c1c1a]">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#e5e0d8] flex items-center justify-center p-1 shadow-xs">
                <img
                  alt="Ten Kind Hands Logo"
                  className="w-full h-full object-contain"
                  src="/logo.png"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuDmbaMRmoVzqGDmSGEoX0XoPFIdN6UYrwile-1Gt1d37VzrQ2PeaP9G7MITiOYlV5Mlma8OlajwkWA3r7O1u4I69Sez16xvET1fYSAP8dl7zhMj1M0gMuXfZYOCWyuePctpR97q8v72-LHjIYFUf8CgqilRAMMM-D-G-S-sJToMqi-nhfADpBN1MUQEsECDNokFRkKAoeuKy8OqR7LAReSeIGPvsSwv08HUP9RVs-2uxRF2z55chm270O5kDJRiqFAmMg";
                  }}
                />
              </div>
              <div>
                <span className="font-heading font-bold text-lg text-[#1c1c1a] block leading-none">
                  Ten Kind Hands
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#706e68] font-medium block mt-0.5">
                  Initiative • Africa
                </span>
              </div>
            </div>
            <p className="text-sm text-[#4a4a46] leading-relaxed">
              Education and healthcare for vulnerable children, women and families across Nigeria.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2 text-[#4a4a46]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#e5e0d8] bg-white flex items-center justify-center hover:text-maroon hover:border-maroon transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#e5e0d8] bg-white flex items-center justify-center hover:text-maroon hover:border-maroon transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#e5e0d8] bg-white flex items-center justify-center hover:text-maroon hover:border-maroon transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#1c1c1a] mb-1">
              Explore
            </h4>
            <a href="#" onClick={(e) => handleNav(e, 'home')} className="text-sm text-[#4a4a46] hover:text-maroon transition-colors">
              Home
            </a>
            <a href="#our-story" onClick={(e) => handleNav(e, 'our-story')} className="text-sm text-[#4a4a46] hover:text-maroon transition-colors">
              About us
            </a>
            <a href="#programs" onClick={(e) => handleNav(e, 'programs')} className="text-sm text-[#4a4a46] hover:text-maroon transition-colors">
              Our work
            </a>
            <a href="#outreaches" onClick={(e) => handleNav(e, 'outreaches')} className="text-sm text-[#4a4a46] hover:text-maroon transition-colors">
              Field reports
            </a>
            <a href="#transparency" onClick={(e) => handleNav(e, 'transparency')} className="text-sm text-[#4a4a46] hover:text-maroon transition-colors">
              Where the money goes
            </a>
          </div>

          {/* Get involved */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#1c1c1a] mb-1">
              Get involved
            </h4>
            <a href="#get-involved/donate" onClick={(e) => handleNav(e, 'get-involved', 'donate')} className="text-sm text-[#4a4a46] hover:text-maroon transition-colors">
              Donate
            </a>
            <a href="#get-involved/donate" onClick={(e) => handleNav(e, 'get-involved', 'donate')} className="text-sm text-[#4a4a46] hover:text-maroon transition-colors">
              Give monthly
            </a>
            <a href="#get-involved/volunteer" onClick={(e) => handleNav(e, 'get-involved', 'volunteer')} className="text-sm text-[#4a4a46] hover:text-maroon transition-colors">
              Volunteer
            </a>
            <a href="#get-involved/partner" onClick={(e) => handleNav(e, 'get-involved', 'partner')} className="text-sm text-[#4a4a46] hover:text-maroon transition-colors">
              Partner with us
            </a>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#1c1c1a] mb-1">
              Contact
            </h4>
            <a href="mailto:info@tenkindhands.org" className="text-sm text-[#4a4a46] hover:text-maroon transition-colors">
              info@tenkindhands.org
            </a>
            <a href="https://wa.me/2348180994301" target="_blank" rel="noreferrer" className="text-sm text-[#4a4a46] hover:text-maroon transition-colors">
              +234 818 099 4301 (WhatsApp)
            </a>
            <p className="text-sm text-[#4a4a46] leading-snug">
              Danglo Plaza 204, 6th Avenue, Gwarinpa, Abuja
            </p>
          </div>
        </div>

        {/* 3. Bottom Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#706e68]">
          <div>
            © 2026 Ten Kind Hands Initiative · CAC RC 7015705
          </div>
          <div className="flex items-center gap-6">
            <a href="#legal/safeguarding" onClick={(e) => handleNav(e, 'legal', 'safeguarding')} className="hover:text-maroon transition-colors">
              Safeguarding
            </a>
            <a href="#legal/privacy" onClick={(e) => handleNav(e, 'legal', 'privacy')} className="hover:text-maroon transition-colors">
              Privacy
            </a>
            <a href="#legal/terms" onClick={(e) => handleNav(e, 'legal', 'terms')} className="hover:text-maroon transition-colors">
              Terms of giving
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
