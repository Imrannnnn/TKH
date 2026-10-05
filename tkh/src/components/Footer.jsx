import { Heart, MessageSquare } from './Icons';

export default function Footer({ setCurrentPage, onSelectLegalTab, onSelectProgram }) {
  const handleNav = (e, pageId, subId = null) => {
    if (e) e.preventDefault();
    if (pageId === 'legal' && subId && onSelectLegalTab) {
      onSelectLegalTab(subId);
    }
    if (pageId === 'programs' && onSelectProgram) {
      onSelectProgram(subId);
    }
    setCurrentPage(pageId);
    window.location.hash = subId ? `${pageId}/${subId}` : (pageId === 'home' ? '' : pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-sand w-full pt-16 pb-12 border-t border-[#e7e2d8]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* 5 Columns Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#e7e2d8]">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <a
              href="#"
              onClick={(e) => handleNav(e, 'home')}
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
                  Initiative • Africa
                </span>
              </div>
            </a>

            <p className="text-xs text-ink-light leading-relaxed max-w-sm">
              Restoring human dignity through sustainable equal access to education and frontline healthcare in underserved Nigerian communities.
            </p>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-ink-muted">
              <span className="text-forest font-semibold">100% Direct Giving</span>
              <span>•</span>
              <span className="font-mono text-ink font-semibold">CAC RC: 7015705</span>
            </div>
          </div>

          {/* Core Initiatives */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs uppercase tracking-wider text-ink font-bold mb-1">
              Core Initiatives
            </h4>
            <a href="#programs/women-widows" onClick={(e) => handleNav(e, 'programs', 'women-widows')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Women
            </a>
            <a href="#programs/orphanage-outreaches" onClick={(e) => handleNav(e, 'programs', 'orphanage-outreaches')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Children
            </a>
            <a href="#programs/scholarship" onClick={(e) => handleNav(e, 'programs', 'scholarship')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Education
            </a>
            <a href="#programs/medical-outreaches" onClick={(e) => handleNav(e, 'programs', 'medical-outreaches')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Health
            </a>
            <a href="#programs/school-donations" onClick={(e) => handleNav(e, 'programs', 'school-donations')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Community support
            </a>
            <a href="#programs/youth-empowerment" onClick={(e) => handleNav(e, 'programs', 'youth-empowerment')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Empowerment
            </a>
          </div>

          {/* Organization */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs uppercase tracking-wider text-ink font-bold mb-1">
              Organization
            </h4>
            <a href="#" onClick={(e) => handleNav(e, 'home')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Home
            </a>
            <a href="#our-story" onClick={(e) => handleNav(e, 'our-story')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Our Story &amp; Origin
            </a>
            <a href="#impact" onClick={(e) => handleNav(e, 'impact')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Audited Impact Metrics
            </a>
            <a href="#testimonials" onClick={(e) => handleNav(e, 'testimonials')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Community Letters
            </a>
            <a href="#transparency" onClick={(e) => handleNav(e, 'transparency')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Financial Transparency
            </a>
            <a href="#news" onClick={(e) => handleNav(e, 'news')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Outreach Videos (YouTube)
            </a>
            <a href="#outreaches" onClick={(e) => handleNav(e, 'outreaches')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Outreach Log
            </a>
          </div>

          {/* Get Involved */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs uppercase tracking-wider text-ink font-bold mb-1">
              Get Involved
            </h4>
            <a href="#get-involved/donate" onClick={(e) => handleNav(e, 'get-involved', 'donate')} className="text-left text-xs text-primary font-bold hover:underline cursor-pointer flex items-center gap-1">
              <span>Donate (Impact Tiers)</span>
              <Heart className="w-3 h-3" />
            </a>
            <a href="#get-involved/volunteer" onClick={(e) => handleNav(e, 'get-involved', 'volunteer')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Volunteer Opportunities
            </a>
            <a href="#get-involved/partnership" onClick={(e) => handleNav(e, 'get-involved', 'partnership')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              CSR &amp; Partnerships
            </a>
            <a href="#contact" onClick={(e) => handleNav(e, 'contact')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Contact &amp; FAQ
            </a>

            <div className="pt-2">
              <a
                href="https://wa.me/2348180994301"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white text-[11px] font-semibold transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Live</span>
              </a>
            </div>
          </div>

          {/* Address & Legal Registration */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs uppercase tracking-wider text-ink font-bold mb-1">
              Address &amp; Registration
            </h4>
            <a href="#contact" onClick={(e) => handleNav(e, 'contact')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer leading-relaxed">
              Danglo plaza 204, 6th Avenue Gwarinpa, Abuja - Nigeria
            </a>
            <div className="pt-2 border-t border-[#e7e2d8] flex flex-col gap-1 text-[11px]">
              <span className="font-heading font-bold text-ink flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-forest shrink-0"></span>
                <span>RC: 7015705</span>
              </span>
              <span className="text-ink-muted text-[10px] leading-tight">
                Corporate Affairs Commission (CAC) Registered Non-Profit
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <p>© {new Date().getFullYear()} Ten Kind Hands Initiative • CAC RC: 7015705. All rights reserved.</p>
          <div className="flex items-center gap-5 flex-wrap justify-center">
            <a href="#legal/privacy" onClick={(e) => handleNav(e, 'legal', 'privacy')} className="hover:text-ink transition-colors cursor-pointer">
              Privacy Policy
            </a>
            <a href="#legal/terms" onClick={(e) => handleNav(e, 'legal', 'terms')} className="hover:text-ink transition-colors cursor-pointer">
              Terms of Service
            </a>
            <a href="#admin" onClick={(e) => handleNav(e, 'admin')} className="hover:text-primary text-ink-light font-semibold transition-colors cursor-pointer flex items-center gap-1">
              <span>Staff / Admin</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
