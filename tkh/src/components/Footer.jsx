import { useState } from 'react';
import { Heart, Instagram, Facebook, Youtube, TikTok } from './Icons';

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
    <footer className="w-full bg-[#fdfbf7] border-t border-[#e5e0d8] pt-10 sm:pt-14 3xl:pt-20 4xl:pt-24 pb-12 3xl:pb-16 4xl:pb-20 safe-bottom">
      <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16">

        {/* 1. Newsletter Band */}
        <div className="bg-[#f5f1e8] rounded-2xl sm:rounded-3xl 3xl:rounded-4xl p-5 sm:p-8 3xl:p-10 4xl:p-12 mb-10 sm:mb-14 3xl:mb-16 4xl:mb-20 border border-[#e5e0d8] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 3xl:gap-10">
          <div className="max-w-md 3xl:max-w-xl 4xl:max-w-2xl">
            <h3 className="font-heading font-bold text-lg sm:text-xl 3xl:text-2xl 4xl:text-3xl text-[#1c1c1a]">
              One email a month: the latest field report.
            </h3>
            <p className="text-sm 3xl:text-base 4xl:text-lg text-[#4a4a46] mt-1">
              Photos, numbers and what is next. No spam.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 3xl:gap-3.5">
            {subscribed ? (
              <div className="px-5 py-3 3xl:px-6 3xl:py-3.5 rounded-full bg-forest-tint text-forest font-medium text-sm 3xl:text-base">
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
                  className="w-full sm:w-72 3xl:w-96 4xl:w-[420px] px-4 3xl:px-6 py-3 3xl:py-3.5 4xl:py-4 rounded-full bg-white border border-[#e5e0d8] text-[#1c1c1a] placeholder:text-[#88857f] text-sm 3xl:text-base 4xl:text-lg focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 3xl:px-8 py-3 3xl:py-3.5 4xl:py-4 rounded-full bg-[#1c1c1a] hover:bg-[#333330] text-white font-medium text-sm 3xl:text-base 4xl:text-lg transition-colors cursor-pointer shrink-0 text-center"
                >
                  Subscribe
                </button>
              </>
            )}
          </form>
        </div>

        {/* 2. Four Columns Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 3xl:gap-14 4xl:gap-20 pb-12 3xl:pb-16 4xl:pb-20 border-b border-[#e5e0d8]">
          {/* Brand Info */}
          <div className="flex flex-col gap-3.5 3xl:gap-4">
            <div className="flex items-center gap-2.5 3xl:gap-3 text-[#1c1c1a]">
              <div className="w-9 h-9 3xl:w-11 3xl:h-11 rounded-xl bg-white border border-[#e5e0d8] flex items-center justify-center p-1 shadow-xs">
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
                <span className="font-heading font-bold text-lg 3xl:text-xl 4xl:text-2xl text-[#1c1c1a] block leading-none">
                  Ten Kind Hands
                </span>
              </div>
            </div>
            <p className="text-sm 3xl:text-base 4xl:text-lg text-[#4a4a46] leading-relaxed">
              Helping Nigerian families learn, heal and thrive.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 3xl:gap-4 pt-2 text-[#4a4a46]">
              <a
                href="https://www.instagram.com/tenkindhands"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 3xl:w-10 3xl:h-10 rounded-full border border-[#e5e0d8] bg-white flex items-center justify-center hover:text-maroon hover:border-maroon transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 3xl:w-5 3xl:h-5" />
              </a>
              <a
                href="https://web.facebook.com/tenkindhandss/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 3xl:w-10 3xl:h-10 rounded-full border border-[#e5e0d8] bg-white flex items-center justify-center hover:text-maroon hover:border-maroon transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 3xl:w-5 3xl:h-5" />
              </a>
              <a
                href="https://www.youtube.com/@TenkindhandsFoundation"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 3xl:w-10 3xl:h-10 rounded-full border border-[#e5e0d8] bg-white flex items-center justify-center hover:text-maroon hover:border-maroon transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4 3xl:w-5 3xl:h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@tenkindhandsfoundation"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 3xl:w-10 3xl:h-10 rounded-full border border-[#e5e0d8] bg-white flex items-center justify-center hover:text-maroon hover:border-maroon transition-colors"
                aria-label="TikTok"
              >
                <TikTok className="w-4 h-4 3xl:w-5 3xl:h-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-2.5 3xl:gap-3.5">
            <h4 className="font-heading font-bold text-xs 3xl:text-sm uppercase tracking-wider text-[#1c1c1a] mb-1">
              Explore
            </h4>
            <a href="#" onClick={(e) => handleNav(e, 'home')} className="text-sm 3xl:text-base 4xl:text-lg text-[#4a4a46] hover:text-maroon transition-colors">
              Home
            </a>
            <a href="#our-story" onClick={(e) => handleNav(e, 'our-story')} className="text-sm 3xl:text-base 4xl:text-lg text-[#4a4a46] hover:text-maroon transition-colors">
              About
            </a>
            <a href="#programs" onClick={(e) => handleNav(e, 'programs')} className="text-sm 3xl:text-base 4xl:text-lg text-[#4a4a46] hover:text-maroon transition-colors">
              Our work
            </a>
            <a href="#outreaches" onClick={(e) => handleNav(e, 'outreaches')} className="text-sm 3xl:text-base 4xl:text-lg text-[#4a4a46] hover:text-maroon transition-colors">
              Field reports
            </a>
            <a href="#transparency" onClick={(e) => handleNav(e, 'transparency')} className="text-sm 3xl:text-base 4xl:text-lg text-[#4a4a46] hover:text-maroon transition-colors">
              Transparency
            </a>
            <a href="#get-involved" onClick={(e) => handleNav(e, 'get-involved')} className="text-sm 3xl:text-base 4xl:text-lg text-[#4a4a46] hover:text-maroon transition-colors">
              Get involved
            </a>
            <a href="#contact" onClick={(e) => handleNav(e, 'contact')} className="text-sm 3xl:text-base 4xl:text-lg text-[#4a4a46] hover:text-maroon transition-colors">
              Contact
            </a>
          </div>

          {/* Get involved */}
          <div className="flex flex-col gap-2.5 3xl:gap-3.5">
            <h4 className="font-heading font-bold text-xs 3xl:text-sm uppercase tracking-wider text-[#1c1c1a] mb-1">
              Get involved
            </h4>
            <a href="#get-involved/donate" onClick={(e) => handleNav(e, 'get-involved', 'donate')} className="text-sm 3xl:text-base 4xl:text-lg text-[#4a4a46] hover:text-maroon transition-colors">
              Donate
            </a>
            <a href="#get-involved/volunteer" onClick={(e) => handleNav(e, 'get-involved', 'volunteer')} className="text-sm 3xl:text-base 4xl:text-lg text-[#4a4a46] hover:text-maroon transition-colors">
              Volunteer
            </a>
            <a href="#get-involved/partner" onClick={(e) => handleNav(e, 'get-involved', 'partner')} className="text-sm 3xl:text-base 4xl:text-lg text-[#4a4a46] hover:text-maroon transition-colors">
              Partner with us
            </a>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2.5 3xl:gap-3.5">
            <h4 className="font-heading font-bold text-xs 3xl:text-sm uppercase tracking-wider text-[#1c1c1a] mb-1">
              Contact
            </h4>
            <a href="mailto:info@tenkindhands.org" className="text-sm 3xl:text-base 4xl:text-lg text-[#4a4a46] hover:text-maroon transition-colors">
              info@tenkindhands.org
            </a>
            <a href="https://wa.me/2348180994301" target="_blank" rel="noreferrer" className="text-sm 3xl:text-base 4xl:text-lg text-[#4a4a46] hover:text-maroon transition-colors">
              +234 818 099 4301 (WhatsApp)
            </a>
          </div>
        </div>

        {/* 3. Bottom Legal Row */}
        <div className="pt-8 3xl:pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs 3xl:text-sm 4xl:text-base text-[#706e68] text-center sm:text-left">
          <div>
            © 2026 Ten Kind Hands Initiative
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 3xl:gap-x-8 gap-y-2">
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
