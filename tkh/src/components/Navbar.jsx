import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Heart, Menu, X, ShieldCheck, ArrowRight, ChevronDown, Lock } from './Icons';

export default function Navbar({ currentPage, setCurrentPage, onOpenDonate, onSelectProgram, onSelectGetInvolvedTab }) {
  const { announcement } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [getInvolvedDropdownOpen, setGetInvolvedDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'our-story', label: 'Our Story' },
    {
      id: 'programs',
      label: 'Programs',
      hasDropdown: true,
      subItems: [
        { id: 'scholarships', label: 'Scholarships' },
        { id: 'youth-development', label: 'Youth Development' },
        { id: 'orphanages-outreaches', label: 'Orphanages & Outreaches' },
        { id: 'school-donations', label: 'School Donations' },
        { id: 'medical-outreaches', label: 'Medical Outreaches' },
        { id: 'women-widows', label: 'Women & Widows Impact' },
      ]
    },
    { id: 'impact', label: 'Impact & Results' },
    {
      id: 'get-involved',
      label: 'Get Involved',
      hasDropdown: true,
      subItems: [
        { id: 'donate', label: 'Donate' },
        { id: 'volunteer', label: 'Volunteer' },
        { id: 'partnership', label: 'Partnership' }
      ]
    },
    { id: 'news', label: 'Field Notes' },
    { id: 'outreaches', label: 'Outreaches' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId, subId = null) => {
    if (pageId === 'programs' && subId) {
      if (onSelectProgram) onSelectProgram(subId);
      setCurrentPage('programs');
      window.location.hash = `programs/${subId}`;
    } else if (pageId === 'get-involved' && subId) {
      if (onSelectGetInvolvedTab) onSelectGetInvolvedTab(subId);
      setCurrentPage('get-involved');
      window.location.hash = `get-involved/${subId}`;
    } else {
      if (pageId === 'programs' && onSelectProgram) onSelectProgram(null);
      setCurrentPage(pageId);
      window.location.hash = pageId;
    }

    setMobileMenuOpen(false);
    setProgramsDropdownOpen(false);
    setGetInvolvedDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e7e2d8] transition-all">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5">
        <div className="flex justify-between items-center">
          {/* Bespoke Logo Lockup */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none cursor-pointer group"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-sand border border-[#e7e2d8] flex items-center justify-center p-1 group-hover:border-primary transition-colors">
              <img
                alt="Ten Kind Hands Logo"
                className="w-full h-full object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmbaMRmoVzqGDmSGEoX0XoPFIdN6UYrwile-1Gt1d37VzrQ2PeaP9G7MITiOYlV5Mlma8OlajwkWA3r7O1u4I69Sez16xvET1fYSAP8dl7zhMj1M0gMuXfZYOCWyuePctpR97q8v72-LHjIYFUf8CgqilRAMMM-D-G-S-sJToMqi-nhfADpBN1MUQEsECDNokFRkKAoeuKy8OqR7LAReSeIGPvsSwv08HUP9RVs-2uxRF2z55chm270O5kDJRiqFAmMg"
              />
            </div>
            <div>
              <span className="text-xl md:text-2xl font-serif text-ink tracking-tight block leading-none">
                Ten Kind Hands
              </span>
              <span className="text-[10px] uppercase tracking-widest text-ink-muted font-medium mt-0.5 block">
                Initiative • Nigeria
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;

              if (item.hasDropdown) {
                const isDropdownOpen = item.id === 'programs' ? programsDropdownOpen : getInvolvedDropdownOpen;
                const setDropdown = item.id === 'programs' ? setProgramsDropdownOpen : setGetInvolvedDropdownOpen;

                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setDropdown(true)}
                    onMouseLeave={() => setDropdown(false)}
                  >
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`text-xs font-semibold tracking-wide transition-colors py-1 cursor-pointer flex items-center gap-1 ${
                        isActive
                          ? 'text-primary'
                          : 'text-ink-light hover:text-ink'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3 h-3 opacity-60" />
                    </button>

                    {/* Submenu Dropdown */}
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-[#e7e2d8] p-2 flex flex-col gap-1 animate-fade-in z-50">
                        <button
                          onClick={() => handleNavClick(item.id)}
                          className="text-left text-xs font-bold text-primary p-2.5 rounded-xl hover:bg-sand transition-colors cursor-pointer"
                        >
                          All {item.label} Overview
                        </button>
                        <div className="h-px bg-[#f2eee8] my-0.5"></div>
                        {item.subItems.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => handleNavClick(item.id, sub.id)}
                            className="text-left text-xs font-medium text-ink-light hover:text-ink p-2.5 rounded-xl hover:bg-sand transition-colors cursor-pointer"
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs font-semibold tracking-wide transition-colors py-1 cursor-pointer ${
                    isActive
                      ? 'text-primary'
                      : 'text-ink-light hover:text-ink'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTA: Donate Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('admin')}
              className="hidden lg:flex items-center gap-1.5 text-xs text-ink-muted hover:text-primary transition-colors cursor-pointer px-3 py-2 rounded-xl hover:bg-sand/80 font-medium"
              title="Staff / Admin Portal"
            >
              <Lock className="w-3.5 h-3.5 text-primary" />
              <span>Staff Portal</span>
            </button>

            <button
              onClick={() => onOpenDonate()}
              className="btn-primary text-xs md:text-sm px-6 py-2.5 flex items-center gap-2 cursor-pointer"
            >
              <span>Donate</span>
              <Heart className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden text-ink p-2 rounded-xl bg-sand border border-[#e7e2d8] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#e7e2d8] flex flex-col gap-1 animate-fade-in max-h-[75vh] overflow-y-auto">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <div key={item.id} className="flex flex-col">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left font-medium text-sm py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-sand text-primary font-bold'
                        : 'text-ink hover:bg-sand/60'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-40" />
                  </button>

                  {item.hasDropdown && (
                    <div className="pl-5 pr-2 py-1 flex flex-col gap-1 border-l border-[#e7e2d8] ml-4 my-1">
                      {item.subItems.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleNavClick(item.id, sub.id)}
                          className="text-left text-xs text-ink-light hover:text-ink py-1.5 px-2 rounded-lg cursor-pointer"
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-3 mt-2 border-t border-[#e7e2d8]">
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full text-left font-semibold text-xs py-2 px-3 rounded-xl bg-sand/60 hover:bg-sand text-ink-light flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-primary" />
                  <span>Staff / Admin Console</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-50" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
