import { useState, useRef, useEffect } from 'react';
import { useData } from '../context/DataContext';
import {
  Heart,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Lock,
  BookOpen,
  TrendingUp,
  ShieldCheck,
  FileText,
  School,
  Stethoscope,
  HandHeart,
  Sparkles,
  MapPin,
  Youtube,
  Users,
  Building2,
} from './Icons';

export default function Navbar({
  currentPage,
  setCurrentPage,
  onOpenDonate,
  onSelectProgram,
  onSelectGetInvolvedTab,
}) {
  const { announcement } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Marquee announcement state
  const [marqueeCycles, setMarqueeCycles] = useState(0);
  const [marqueeDismissed, setMarqueeDismissed] = useState(false);
  const [marqueeFading, setMarqueeFading] = useState(false);
  const leaveTimeoutRef = useRef(null);

  // Reset marquee ticker state whenever announcement text changes
  const [prevAnnouncement, setPrevAnnouncement] = useState(announcement);
  if (prevAnnouncement !== announcement) {
    setPrevAnnouncement(announcement);
    if (announcement) {
      setMarqueeCycles(0);
      setMarqueeFading(false);
      setMarqueeDismissed(false);
    }
  }

  const handleDismissMarquee = () => {
    setMarqueeFading(true);
    setTimeout(() => {
      setMarqueeDismissed(true);
    }, 700);
  };

  const handleMarqueeIteration = () => {
    setMarqueeCycles((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        handleDismissMarquee();
      }
      return next;
    });
  };

  // Scroll detection for subtle shadow elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clean up timeouts and handle outside clicks / escape key
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.nav-dropdown-wrapper')) {
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (itemId) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setActiveDropdown(itemId);
  };

  const handleMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleToggleDropdown = (e, itemId) => {
    e.stopPropagation();
    setActiveDropdown((prev) => (prev === itemId ? null : itemId));
  };

  // Core navigation configuration organized into clean, intuitive sections
  const navConfig = [
    {
      id: 'home',
      label: 'Home',
      type: 'link',
      pageId: 'home',
    },
    {
      id: 'about',
      label: 'About Us',
      type: 'dropdown',
      activePages: ['our-story', 'impact', 'transparency', 'testimonials'],
      dropdownWidth: 'w-80',
      headerLabel: 'Who We Are & Our Work',
      items: [
        {
          id: 'our-story',
          pageId: 'our-story',
          label: 'Our Story & Mission',
          desc: 'Founding vision, values & human dignity',
          icon: BookOpen,
        },
        {
          id: 'impact',
          pageId: 'impact',
          label: 'Impact & Results',
          desc: 'Verified metrics & community outcomes',
          icon: TrendingUp,
        },
        {
          id: 'transparency',
          pageId: 'transparency',
          label: 'Financial Transparency',
          desc: '100% direct-giving model & governance',
          icon: ShieldCheck,
        },
        {
          id: 'testimonials',
          pageId: 'testimonials',
          label: 'Community Letters',
          desc: 'Appreciation & letters from beneficiaries',
          icon: FileText,
        },
      ],
    },
    {
      id: 'programs',
      label: 'Programs',
      type: 'dropdown',
      pageId: 'programs',
      activePages: ['programs'],
      dropdownWidth: 'w-[520px]',
      isGrid: true,
      overviewLink: {
        label: 'All 6 Core Programs Overview',
        desc: 'Comprehensive roadmap of all sustainable initiatives',
      },
      items: [
        {
          id: 'scholarship',
          pageId: 'programs',
          subId: 'scholarship',
          label: 'Scholarship Initiative',
          desc: 'Tuition grants & academic sponsorships',
          icon: BookOpen,
        },
        {
          id: 'youth-empowerment',
          pageId: 'programs',
          subId: 'youth-empowerment',
          label: 'Youth Empowerment',
          desc: 'Tech bootcamps & artisanal starter kits',
          icon: Sparkles,
        },
        {
          id: 'orphanage-outreaches',
          pageId: 'programs',
          subId: 'orphanage-outreaches',
          label: 'Orphanage Outreaches',
          desc: 'Nutritional care & warm clothing support',
          icon: Heart,
        },
        {
          id: 'school-donations',
          pageId: 'programs',
          subId: 'school-donations',
          label: 'School Donations',
          desc: 'Desks, computer labs & textbooks',
          icon: School,
        },
        {
          id: 'medical-outreaches',
          pageId: 'programs',
          subId: 'medical-outreaches',
          label: 'Medical Outreaches',
          desc: 'Free health clinics & vital medication',
          icon: Stethoscope,
        },
        {
          id: 'women-widows',
          pageId: 'programs',
          subId: 'women-widows',
          label: 'Women & Widows Impact',
          desc: 'Micro-enterprise grants & trade skills',
          icon: HandHeart,
        },
      ],
    },
    {
      id: 'outreaches',
      label: 'Outreaches',
      type: 'dropdown',
      activePages: ['outreaches', 'news'],
      dropdownWidth: 'w-80',
      headerLabel: 'Field Work & Multimedia',
      items: [
        {
          id: 'field-outreaches',
          pageId: 'outreaches',
          label: 'Field Outreaches',
          desc: 'Monthly missions, dates & field logs',
          icon: MapPin,
        },
        {
          id: 'outreach-videos',
          pageId: 'news',
          label: 'Outreach Videos',
          desc: 'YouTube video documentary showcase',
          icon: Youtube,
        },
      ],
    },
    {
      id: 'get-involved',
      label: 'Get Involved',
      type: 'dropdown',
      pageId: 'get-involved',
      activePages: ['get-involved'],
      dropdownWidth: 'w-84',
      dropdownAlign: 'right',
      headerLabel: 'Join the Movement',
      items: [
        {
          id: 'donate',
          action: 'donate',
          label: 'Donate to Cause',
          desc: 'Directly fund medical care & education',
          icon: Heart,
          badge: '100% Direct',
        },
        {
          id: 'volunteer',
          pageId: 'get-involved',
          subId: 'volunteer',
          label: 'Volunteer with Us',
          desc: 'Deploy your skills in Nigerian communities',
          icon: Users,
        },
        {
          id: 'partnership',
          pageId: 'get-involved',
          subId: 'partnership',
          label: 'Partner with Us',
          desc: 'Corporate, diaspora & NGO alliances',
          icon: Building2,
        },
      ],
    },
    {
      id: 'contact',
      label: 'Contact',
      type: 'link',
      pageId: 'contact',
    },
  ];

  const handleNavClick = (pageId, subId = null) => {
    if (pageId === 'programs') {
      if (onSelectProgram) onSelectProgram(subId || null);
      setCurrentPage('programs');
      window.location.hash = subId ? `programs/${subId}` : 'programs';
    } else if (pageId === 'get-involved') {
      if (onSelectGetInvolvedTab) onSelectGetInvolvedTab(subId || 'donate');
      setCurrentPage('get-involved');
      window.location.hash = subId ? `get-involved/${subId}` : 'get-involved';
    } else {
      if (pageId === 'programs' && onSelectProgram) onSelectProgram(null);
      setCurrentPage(pageId);
      window.location.hash = pageId === 'home' ? '' : pageId;
    }

    setMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemClick = (item) => {
    if (item.action === 'donate') {
      onOpenDonate();
      setMobileMenuOpen(false);
      setActiveDropdown(null);
      return;
    }
    handleNavClick(item.pageId, item.subId || null);
  };

  const showMarquee = currentPage === 'home' && announcement && !marqueeDismissed;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-200 border-b ${
        isScrolled ? 'border-[#ded7cb] shadow-md shadow-ink/5' : 'border-[#e7e2d8]'
      }`}
    >
      {/* Global Live Marquee Broadcast Ticker (Shows on Home page for 5 cycles before going off) */}
      {showMarquee && (
        <aside
          aria-label="Live Announcement Ribbon"
          className={`w-full bg-[#142722] text-white border-b border-[#1f3b34] overflow-hidden transition-all duration-700 ease-in-out flex items-center shadow-inner ${
            marqueeFading
              ? 'max-h-0 opacity-0 py-0 border-transparent -translate-y-2 pointer-events-none'
              : 'max-h-12 opacity-100 py-1.5'
          }`}
        >
          {/* Live Ticker Anchor Badge */}
          <div className="shrink-0 flex items-center gap-2 pl-3 sm:pl-6 pr-3 py-0.5 bg-[#142722] z-10 border-r border-[#1f3b34]">
            <span className="w-2 h-2 rounded-full bg-[#f7c899] animate-pulse"></span>
            <span className="text-[10px] sm:text-[11px] font-heading font-extrabold text-[#f7c899] tracking-wider uppercase whitespace-nowrap">
              LIVE TICKER
            </span>
          </div>

          {/* Marquee Continuous Scrolling Content */}
          <div className="flex-1 overflow-hidden relative flex items-center mx-2 group">
            <div
              className="animate-marquee flex items-center gap-8 sm:gap-12 whitespace-nowrap will-change-transform cursor-pointer"
              onAnimationIteration={handleMarqueeIteration}
              title="Hover to pause announcement"
            >
              {[...Array(4)].map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-8 sm:gap-12 text-xs sm:text-[13px] text-white/95 font-medium"
                >
                  <span>{announcement}</span>
                  <span className="text-[#f7c899]/60 text-xs select-none">✦</span>
                </div>
              ))}
            </div>
          </div>

          {/* Controls: Loop Count & Dismiss Button */}
          <div className="shrink-0 flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 pr-3 sm:pr-6 py-0.5 bg-[#142722] z-10 border-l border-[#1f3b34]">
            <span className="text-[10px] font-mono font-medium text-[#f7c899]/85 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 hidden sm:inline-block">
              Loop {Math.min(marqueeCycles + 1, 5)}/5
            </span>
            <button
              onClick={handleDismissMarquee}
              className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              title="Dismiss announcement"
              aria-label="Dismiss live ticker"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center gap-4">
          {/* Bespoke Logo Lockup */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sand border border-[#e7e2d8] flex items-center justify-center p-1 group-hover:border-primary transition-colors">
              <img
                alt="Ten Kind Hands Logo"
                className="w-full h-full object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmbaMRmoVzqGDmSGEoX0XoPFIdN6UYrwile-1Gt1d37VzrQ2PeaP9G7MITiOYlV5Mlma8OlajwkWA3r7O1u4I69Sez16xvET1fYSAP8dl7zhMj1M0gMuXfZYOCWyuePctpR97q8v72-LHjIYFUf8CgqilRAMMM-D-G-S-sJToMqi-nhfADpBN1MUQEsECDNokFRkKAoeuKy8OqR7LAReSeIGPvsSwv08HUP9RVs-2uxRF2z55chm270O5kDJRiqFAmMg"
              />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-heading font-bold text-ink tracking-tight block leading-none group-hover:text-primary transition-colors">
                Ten Kind Hands
              </span>
              <span className="text-[10px] uppercase tracking-widest text-ink-muted font-medium mt-0.5 block">
                Initiative • Africa
              </span>
            </div>
          </button>

          {/* Desktop Nav Items (Well-Organized 6 Items with Balanced Spacing) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navConfig.map((item) => {
              if (item.type === 'dropdown') {
                const isOpen = activeDropdown === item.id;
                const isParentActive = item.activePages?.includes(currentPage);

                return (
                  <div
                    key={item.id}
                    className="relative nav-dropdown-wrapper py-1"
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      onClick={(e) => handleToggleDropdown(e, item.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 select-none ${
                        isParentActive
                          ? 'bg-primary/10 text-primary font-bold shadow-xs'
                          : isOpen
                          ? 'text-primary bg-sand/80'
                          : 'text-ink-light hover:text-ink hover:bg-sand/70'
                      }`}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-primary' : 'opacity-60'
                        }`}
                      />
                    </button>

                    {/* Submenu Dropdown Card */}
                    {isOpen && (
                      <div
                        className={`absolute top-full ${
                          item.dropdownAlign === 'right' ? 'right-0' : 'left-0'
                        } pt-2 z-50`}
                        onMouseEnter={() => handleMouseEnter(item.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div
                          className={`${
                            item.dropdownWidth || 'w-80'
                          } bg-white rounded-2xl shadow-2xl shadow-ink/10 border border-[#e7e2d8] p-3 animate-fade-in relative before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']`}
                        >
                          {/* Programs Specific 2-Column Grid Layout */}
                          {item.isGrid ? (
                            <div>
                              {item.overviewLink && (
                                <>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleNavClick(item.pageId, null);
                                    }}
                                    className="w-full text-left p-2.5 rounded-xl bg-sand/70 hover:bg-sand border border-[#e7e2d8]/60 transition-all flex items-center justify-between group cursor-pointer mb-2"
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        <Sparkles className="w-3.5 h-3.5" />
                                      </div>
                                      <div>
                                        <span className="text-xs font-bold text-primary block leading-tight">
                                          {item.overviewLink.label}
                                        </span>
                                        <span className="text-[10px] text-ink-muted block mt-0.5">
                                          {item.overviewLink.desc}
                                        </span>
                                      </div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-primary opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                                  </button>
                                  <div className="h-px bg-[#f0ece8] mb-2"></div>
                                </>
                              )}

                              <div className="grid grid-cols-2 gap-1.5">
                                {item.items.map((sub) => {
                                  const SubIcon = sub.icon;
                                  return (
                                    <button
                                      key={sub.id}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleItemClick(sub);
                                      }}
                                      className="text-left p-2 rounded-xl hover:bg-sand/70 transition-all cursor-pointer flex items-start gap-2.5 group"
                                    >
                                      <div className="w-7 h-7 rounded-lg bg-sand group-hover:bg-primary/10 text-ink-muted group-hover:text-primary flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                                        <SubIcon className="w-3.5 h-3.5" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <span className="text-xs font-semibold text-ink group-hover:text-primary transition-colors block leading-tight">
                                          {sub.label}
                                        </span>
                                        <span className="text-[10px] text-ink-muted line-clamp-1 block mt-0.5 leading-snug">
                                          {sub.desc}
                                        </span>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ) : (
                            /* Standard Clean Vertical List with Rich Details */
                            <div>
                              {item.headerLabel && (
                                <div className="px-2.5 pt-1 pb-1.5 text-[10px] font-heading font-bold uppercase tracking-wider text-ink-muted">
                                  {item.headerLabel}
                                </div>
                              )}
                              <div className="flex flex-col gap-1">
                                {item.items.map((sub) => {
                                  const SubIcon = sub.icon;
                                  return (
                                    <button
                                      key={sub.id}
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleItemClick(sub);
                                      }}
                                      className="text-left p-2.5 rounded-xl hover:bg-sand/70 transition-all cursor-pointer flex items-center gap-3 group"
                                    >
                                      <div className="w-8 h-8 rounded-lg bg-sand group-hover:bg-primary/10 text-ink-muted group-hover:text-primary flex items-center justify-center shrink-0 transition-colors">
                                        <SubIcon className="w-4 h-4" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                          <span className="text-xs font-semibold text-ink group-hover:text-primary transition-colors leading-tight">
                                            {sub.label}
                                          </span>
                                          {sub.badge && (
                                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                              {sub.badge}
                                            </span>
                                          )}
                                        </div>
                                        <span className="text-[11px] text-ink-muted line-clamp-1 block mt-0.5 leading-tight">
                                          {sub.desc}
                                        </span>
                                      </div>
                                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 group-hover:translate-x-0.5 transition-all text-ink-muted shrink-0" />
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = currentPage === item.pageId;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.pageId)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer select-none ${
                    isActive
                      ? 'bg-primary/10 text-primary font-bold shadow-xs'
                      : 'text-ink-light hover:text-ink hover:bg-sand/70'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTA: Staff Portal, Donate Button & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Staff / Admin Portal link (discreet pill on wide screens) */}
            <button
              onClick={() => handleNavClick('admin')}
              className="hidden xl:flex items-center gap-1.5 text-xs text-ink-muted hover:text-primary transition-colors cursor-pointer px-3 py-1.5 rounded-full hover:bg-sand font-medium border border-transparent hover:border-[#e7e2d8]"
              title="Staff / Admin Portal"
            >
              <Lock className="w-3.5 h-3.5 text-primary" />
              <span>Staff Portal</span>
            </button>

            {/* High-Impact Donate CTA Button */}
            <button
              onClick={() => onOpenDonate()}
              className="btn-primary text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 flex items-center gap-1.5 cursor-pointer font-heading font-semibold shadow-sm hover:shadow-md transition-all shrink-0"
            >
              <span>Donate</span>
              <Heart className="w-3.5 h-3.5 fill-white/20" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden text-ink p-2 rounded-xl bg-sand border border-[#e7e2d8] cursor-pointer hover:bg-sand-dark transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Accordion Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#e7e2d8] flex flex-col gap-1.5 animate-fade-in max-h-[78vh] overflow-y-auto pb-4">
            {navConfig.map((item) => {
              if (item.type === 'dropdown') {
                const isAccordionOpen = mobileAccordionOpen === item.id;
                const isParentActive = item.activePages?.includes(currentPage);

                return (
                  <div key={item.id} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() =>
                        setMobileAccordionOpen((prev) => (prev === item.id ? null : item.id))
                      }
                      className={`w-full text-left font-medium text-sm py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        isParentActive
                          ? 'bg-sand text-primary font-bold'
                          : 'text-ink hover:bg-sand/60'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{item.label}</span>
                        {isParentActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                        )}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-ink-muted transition-transform duration-200 ${
                          isAccordionOpen ? 'rotate-180 text-primary' : ''
                        }`}
                      />
                    </button>

                    {/* Accordion Sub-Items */}
                    {isAccordionOpen && (
                      <div className="pl-3 pr-1 py-1.5 flex flex-col gap-1 border-l-2 border-primary/20 ml-4 my-1 animate-fade-in">
                        {item.overviewLink && (
                          <button
                            type="button"
                            onClick={() => handleNavClick(item.pageId, null)}
                            className="text-left text-xs font-bold text-primary p-2 rounded-lg bg-sand/80 hover:bg-sand flex items-center justify-between cursor-pointer"
                          >
                            <span>{item.overviewLink.label}</span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-70" />
                          </button>
                        )}

                        {item.items.map((sub) => {
                          const SubIcon = sub.icon;
                          return (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => handleItemClick(sub)}
                              className="text-left py-2 px-2.5 rounded-lg hover:bg-sand transition-colors cursor-pointer flex items-center gap-2.5 group"
                            >
                              {SubIcon && (
                                <div className="w-6 h-6 rounded-md bg-sand group-hover:bg-primary/10 text-ink-muted group-hover:text-primary flex items-center justify-center shrink-0">
                                  <SubIcon className="w-3.5 h-3.5" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-medium text-ink group-hover:text-primary truncate">
                                    {sub.label}
                                  </span>
                                  {sub.badge && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                      {sub.badge}
                                    </span>
                                  )}
                                </div>
                                {sub.desc && (
                                  <span className="text-[10px] text-ink-muted line-clamp-1 block">
                                    {sub.desc}
                                  </span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = currentPage === item.pageId;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.pageId)}
                  className={`w-full text-left font-medium text-sm py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                    isActive ? 'bg-sand text-primary font-bold' : 'text-ink hover:bg-sand/60'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </button>
              );
            })}

            {/* Quick Actions at bottom of mobile drawer */}
            <div className="pt-3 mt-2 border-t border-[#e7e2d8] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDonate();
                }}
                className="w-full btn-primary py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-heading font-semibold text-xs sm:text-sm cursor-pointer shadow-sm"
              >
                <span>Donate to Ten Kind Hands</span>
                <Heart className="w-3.5 h-3.5 fill-white/20" />
              </button>

              <button
                onClick={() => handleNavClick('admin')}
                className="w-full text-left font-medium text-xs py-2 px-3 rounded-xl bg-sand/60 hover:bg-sand text-ink-light flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-primary" />
                  <span>Staff &amp; Admin Console</span>
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
