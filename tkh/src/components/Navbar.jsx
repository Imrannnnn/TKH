import { useState, useEffect } from 'react';
import { Heart, Menu, X } from './Icons';

export default function Navbar({
  currentPage,
  setCurrentPage,
  onOpenDonate,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll on mobile drawer open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Home', pageId: 'home', matchPages: ['home'] },
    { label: 'About', pageId: 'our-story', matchPages: ['our-story'] },
    { label: 'Our work', pageId: 'programs', matchPages: ['programs'] },
    { label: 'Field reports', pageId: 'outreaches', matchPages: ['outreaches', 'news', 'videos'] },
    { label: 'Transparency', pageId: 'transparency', matchPages: ['transparency', 'impact'] },
    { label: 'Get involved', pageId: 'get-involved', matchPages: ['get-involved'] },
    { label: 'Contact', pageId: 'contact', matchPages: ['contact'] },
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    window.location.hash = pageId === 'home' ? '' : pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const isItemActive = (item) => {
    return item.matchPages.includes(currentPage);
  };

  return (
    <header className={`sticky top-0 z-50 bg-[#fdfbf7]/95 backdrop-blur-md transition-all duration-200 border-b ${
      isScrolled ? 'border-[#e5e0d8] shadow-sm' : 'border-[#e5e0d8]/70'
    }`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left cursor-pointer transition-transform active:scale-[0.98] shrink-0"
          aria-label="Ten Kind Hands Home"
        >
          <div className="w-10 h-10 rounded-xl bg-white border border-[#e5e0d8] flex items-center justify-center p-1 group-hover:border-maroon transition-colors shadow-xs">
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
            <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-[#1c1c1a] block leading-none group-hover:text-maroon transition-colors">
              Ten Kind Hands
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#706e68] font-medium mt-0.5 block">
              Initiative • Africa
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navItems.map((item) => {
            const active = isItemActive(item);
            return (
              <button
                key={item.pageId}
                onClick={() => handleNavClick(item.pageId)}
                className={`px-3.5 py-1.5 rounded-full text-[14.5px] transition-all cursor-pointer ${
                  active
                    ? 'bg-maroon-tint text-maroon font-semibold'
                    : 'text-[#4a4a46] hover:text-[#1c1c1a] hover:bg-[#f5f1e8] font-medium'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenDonate()}
            className="btn-primary px-5 sm:px-6 py-2.5 text-sm sm:text-[15px] shadow-sm flex items-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Donate</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#1c1c1a] hover:bg-[#f5f1e8] transition-colors"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[72px] bg-[#fdfbf7] border-b border-[#e5e0d8] shadow-2xl animate-fade-in px-4 py-6 max-h-[calc(100vh-72px)] overflow-y-auto">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const active = isItemActive(item);
              return (
                <button
                  key={item.pageId}
                  onClick={() => handleNavClick(item.pageId)}
                  className={`px-4 py-3 rounded-2xl text-left text-base font-medium transition-colors ${
                    active
                      ? 'bg-maroon-tint text-maroon font-semibold'
                      : 'text-[#1c1c1a] hover:bg-[#f5f1e8]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-[#e5e0d8] flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDonate();
                }}
                className="w-full btn-primary py-3.5 text-base flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>Donate Now</span>
              </button>
              <div className="text-center text-xs text-[#706e68] pt-1">
                CAC Registered Non-Profit · RC 7015705
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
