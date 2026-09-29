import { Heart, MessageSquare } from './Icons';

export default function Footer({ setCurrentPage, onSelectLegalTab, onSelectProgram }) {
  const handleNav = (pageId, subId = null) => {
    if (pageId === 'legal' && subId && onSelectLegalTab) {
      onSelectLegalTab(subId);
    }
    if (pageId === 'programs' && onSelectProgram) {
      onSelectProgram(subId);
    }
    setCurrentPage(pageId);
    window.location.hash = subId ? `${pageId}/${subId}` : pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-sand w-full pt-16 pb-12 border-t border-[#e7e2d8]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

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
                  Initiative • Africa
                </span>
              </div>
            </button>

            <p className="text-xs text-ink-light leading-relaxed max-w-sm">
              Restoring human dignity through sustainable equal access to education and frontline healthcare in underserved Nigerian communities.
            </p>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-ink-muted">
              <span className="text-forest font-semibold">100% Direct Giving</span>
            </div>
          </div>

          {/* Core Initiatives */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs uppercase tracking-wider text-ink font-bold mb-1">
              Core Initiatives
            </h4>
            <button onClick={() => handleNav('programs', 'women-widows')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Women
            </button>
            <button onClick={() => handleNav('programs', 'orphanage-outreaches')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Children
            </button>
            <button onClick={() => handleNav('programs', 'scholarship')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Education
            </button>
            <button onClick={() => handleNav('programs', 'medical-outreaches')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Health
            </button>
            <button onClick={() => handleNav('programs', 'school-donations')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Community support
            </button>
            <button onClick={() => handleNav('programs', 'youth-empowerment')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Empowerment
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
              Outreach Videos (YouTube)
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



          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs uppercase tracking-wider text-ink font-bold mb-1">
              Address
            </h4>
            <button onClick={() => handleNav('contact')} className="text-left text-xs text-ink-light hover:text-primary transition-colors cursor-pointer">
              Danglo plaza 204, 6th Avenue Gwarinpa, Abuja - Nigeria
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <p>© {new Date().getFullYear()} Ten Kind Hands Initiative • Africa. All rights reserved.</p>
          <div className="flex items-center gap-5 flex-wrap justify-center">
            <button onClick={() => handleNav('legal', 'privacy')} className="hover:text-ink transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => handleNav('legal', 'terms')} className="hover:text-ink transition-colors cursor-pointer">
              Terms of Service
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
