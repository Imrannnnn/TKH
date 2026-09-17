import { useState } from 'react';
import {
  Globe,
  Plus,
  Trash2,
  Edit3,
  Save,
  Check,
  ExternalLink,
  Eye,
  TrendingUp,
  Sliders,
  Layers
} from '../../components/Icons';

export default function HomePageEditor({
  homeContent,
  updateHomeContent,
  metrics,
  handleOpenEditMetric,
  handleOpenNewMetric,
  handleDeleteMetric,
  announcement,
  updateAnnouncement,
  setCurrentPage,
  showToast
}) {
  const [activeSection, setActiveSection] = useState('hero');

  // Local state for Hero Section
  const [heroHeadline, setHeroHeadline] = useState(
    homeContent?.heroHeadline || 'Empowering the lives of African Women and Children through Healthcare & Educational initiatives.'
  );
  const [heroSubtitle, setHeroSubtitle] = useState(
    homeContent?.heroSubtitle || 'Every act of kindness shapes a brighter future.'
  );
  const [registeredBadge, setRegisteredBadge] = useState(
    homeContent?.registeredBadge || 'Registered Non-Profit NGO in Nigeria • CAC/IT/NO: 148920'
  );
  const [slides, setSlides] = useState(
    homeContent?.heroSlides || [
      { img: '/images/IMG_0294.JPG', caption: 'Child empowerment Program • Makurdi' },
      { img: '/images/11222.jpeg', caption: 'Medical outreach to children at Abuja Teaching Hospital' },
      { img: '/images/IMG_0995.JPG', caption: 'Women Empowerment Outreach • Dafara' }
    ]
  );

  // New slide inline form
  const [newSlideImg, setNewSlideImg] = useState('');
  const [newSlideCaption, setNewSlideCaption] = useState('');
  const [showAddSlide, setShowAddSlide] = useState(false);

  // Local state for Field Reality Section
  const [realityStat, setRealityStat] = useState(homeContent?.fieldReality?.stat || 'Over 10M');
  const [realityLabel, setRealityLabel] = useState(
    homeContent?.fieldReality?.label || 'Children currently out of primary school in Nigeria (UNESCO)'
  );
  const [realityP1, setRealityP1] = useState(
    homeContent?.fieldReality?.paragraph1 ||
      'When poverty forces families to choose between putting food on the table and paying school expenses, a child’s education is often the first sacrifice. Without books, learning materials, scholarships, and the support needed to stay in school, many children risk falling behind or abandoning their education altogether. At the same time, vulnerable communities continue to face preventable health challenges, while women and widows struggle to access the skills and opportunities needed to achieve financial independence.'
  );
  const [realityP2, setRealityP2] = useState(
    homeContent?.fieldReality?.paragraph2 ||
      'Ten Kind Hands Foundation bridges these gaps by investing in children’s education through scholarships, educational materials, school donations, learning support, and youth development initiatives, while also extending healthcare interventions and women’s empowerment programmes to vulnerable communities. By meeting immediate needs and creating pathways to opportunity, we help children learn, women thrive, and communities build a stronger and more hopeful future.'
  );

  // Local state for Marquee
  const [marqueeText, setMarqueeText] = useState(announcement || '');

  // Handlers
  const handleSaveHero = (e) => {
    e?.preventDefault();
    updateHomeContent({
      heroHeadline,
      heroSubtitle,
      registeredBadge,
      heroSlides: slides
    });
    showToast('Hero section updated on Home Page');
  };

  const handleAddSlide = () => {
    if (!newSlideImg.trim()) return;
    const updated = [...slides, { img: newSlideImg.trim(), caption: newSlideCaption.trim() || 'Field Outreach' }];
    setSlides(updated);
    updateHomeContent({ heroSlides: updated });
    setNewSlideImg('');
    setNewSlideCaption('');
    setShowAddSlide(false);
    showToast('New hero slide added');
  };

  const handleRemoveSlide = (index) => {
    const updated = slides.filter((_, i) => i !== index);
    setSlides(updated);
    updateHomeContent({ heroSlides: updated });
    showToast('Slide removed');
  };

  const handleSaveReality = (e) => {
    e?.preventDefault();
    updateHomeContent({
      fieldReality: {
        stat: realityStat,
        label: realityLabel,
        paragraph1: realityP1,
        paragraph2: realityP2
      }
    });
    showToast('Field Reality section updated on Home Page');
  };

  const handleSaveMarquee = (e) => {
    e?.preventDefault();
    updateAnnouncement(marqueeText);
    showToast('Live Marquee Banner updated');
  };

  const sections = [
    { id: 'hero', label: 'Hero & Carousel', desc: 'Headlines, taglines & background slides' },
    { id: 'impact', label: 'Key Impact Counters', desc: 'Homepage live statistics & counters' },
    { id: 'reality', label: 'Field Reality & Stats', desc: 'Out-of-school numbers & narrative' },
    { id: 'marquee', label: 'Live Marquee Ribbon', desc: 'Top broadcast ticker on homepage' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#e7e2d8] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
              Page Editor
            </span>
            <span className="text-xs font-semibold text-ink-muted">• Public Route: /#home</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-ink">
            Home Page Content Manager
          </h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Organized controls for all visible sections on the public landing page.
          </p>
        </div>

        <button
          onClick={() => {
            if (setCurrentPage) setCurrentPage('home');
            window.location.hash = 'home';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-3.5 py-2 rounded-xl bg-sand hover:bg-sand-dark text-ink text-xs font-heading font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors border border-[#e7e2d8] shrink-0"
        >
          <Eye className="w-4 h-4 text-primary" />
          <span>Preview Live Home Page</span>
          <ExternalLink className="w-3 h-3 text-ink-muted" />
        </button>
      </div>

      {/* Section Navigation Pills */}
      <div className="bg-white p-2 rounded-2xl border border-[#e7e2d8] shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`py-2.5 px-3 rounded-xl text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-xs font-bold'
                    : 'bg-sand/40 hover:bg-sand text-ink hover:text-ink'
                }`}
              >
                <span className="block text-xs font-heading font-bold truncate">
                  {sec.label}
                </span>
                <span
                  className={`text-[10px] block truncate mt-0.5 ${
                    isActive ? 'text-white/80' : 'text-ink-muted'
                  }`}
                >
                  {sec.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          SECTION 1: HERO & CAROUSEL
      ===================================================================== */}
      {activeSection === 'hero' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#e7e2d8] p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e7e2d8]">
              <div>
                <h2 className="text-base font-heading font-bold text-ink">
                  Hero Header &amp; Mission Statements
                </h2>
                <p className="text-xs text-ink-muted">
                  First impression text displayed immediately to visitors above the fold.
                </p>
              </div>
              <button
                onClick={handleSaveHero}
                className="py-2 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Hero Changes</span>
              </button>
            </div>

            <form onSubmit={handleSaveHero} className="space-y-4">
              <div>
                <label className="block text-xs font-heading font-bold text-ink mb-1.5">
                  Verified NGO Regulatory Badge
                </label>
                <input
                  type="text"
                  value={registeredBadge}
                  onChange={(e) => setRegisteredBadge(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold text-ink mb-1.5">
                  Main Hero Headline
                </label>
                <textarea
                  rows="2"
                  value={heroHeadline}
                  onChange={(e) => setHeroHeadline(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-xs text-ink focus:outline-none focus:border-primary leading-relaxed font-heading"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-heading font-bold text-ink mb-1.5">
                  Hero Subtitle / Tagline
                </label>
                <input
                  type="text"
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                />
              </div>
            </form>
          </div>

          {/* Hero Slides Manager */}
          <div className="bg-white rounded-2xl border border-[#e7e2d8] p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#e7e2d8]">
              <div>
                <h2 className="text-base font-heading font-bold text-ink">
                  Rotating Hero Background Slides ({slides.length})
                </h2>
                <p className="text-xs text-ink-muted">
                  Full-screen cross-fading photos demonstrating field operations.
                </p>
              </div>
              <button
                onClick={() => setShowAddSlide(!showAddSlide)}
                className="py-1.5 px-3 rounded-xl bg-forest/10 hover:bg-forest/20 text-forest text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer border border-forest/20 transition-colors self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddSlide ? 'Cancel' : 'Add New Slide'}</span>
              </button>
            </div>

            {/* Add Slide Form */}
            {showAddSlide && (
              <div className="mb-6 p-4 rounded-xl bg-sand/50 border border-[#e7e2d8] space-y-3">
                <span className="block text-xs font-heading font-bold text-ink">New Slide Details:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-ink-light mb-1">
                      Image Path or URL
                    </label>
                    <input
                      type="text"
                      placeholder="/images/IMG_0294.JPG"
                      value={newSlideImg}
                      onChange={(e) => setNewSlideImg(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#e7e2d8] bg-white text-xs text-ink focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-ink-light mb-1">
                      Location Caption
                    </label>
                    <input
                      type="text"
                      placeholder="Child empowerment Program • Makurdi"
                      value={newSlideCaption}
                      onChange={(e) => setNewSlideCaption(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#e7e2d8] bg-white text-xs text-ink focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddSlide}
                  className="py-1.5 px-4 rounded-lg bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold cursor-pointer shadow-xs transition-colors"
                >
                  Confirm &amp; Add Slide
                </button>
              </div>
            )}

            {/* Existing Slides Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className="bg-sand/30 rounded-2xl border border-[#e7e2d8] p-3 flex flex-col justify-between overflow-hidden shadow-xs group"
                >
                  <div className="h-32 rounded-xl overflow-hidden mb-3 bg-black relative">
                    <img
                      src={encodeURI(slide.img)}
                      alt={slide.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-bold">
                      Slide #{idx + 1}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-[10px] text-ink-muted uppercase font-bold tracking-wider block">
                        Location / Caption:
                      </span>
                      <input
                        type="text"
                        value={slide.caption}
                        onChange={(e) => {
                          const updated = [...slides];
                          updated[idx].caption = e.target.value;
                          setSlides(updated);
                        }}
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-[#e7e2d8] bg-white text-ink focus:outline-none focus:border-primary mt-0.5"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] text-ink-muted uppercase font-bold tracking-wider block">
                        Image Source:
                      </span>
                      <input
                        type="text"
                        value={slide.img}
                        onChange={(e) => {
                          const updated = [...slides];
                          updated[idx].img = e.target.value;
                          setSlides(updated);
                        }}
                        className="w-full px-2.5 py-1 text-[11px] rounded-lg border border-[#e7e2d8] bg-white text-ink-light font-mono focus:outline-none focus:border-primary mt-0.5 truncate"
                      />
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#e7e2d8] flex items-center justify-between">
                    <span className="text-[10px] text-ink-muted">Auto-cycled: 6s</span>
                    <button
                      onClick={() => handleRemoveSlide(idx)}
                      disabled={slides.length <= 1}
                      className="p-1.5 rounded-lg text-ink-muted hover:text-rose-600 hover:bg-rose-50 disabled:opacity-40 cursor-pointer transition-colors"
                      title={slides.length <= 1 ? 'Minimum 1 slide required' : 'Remove slide'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 mt-6 border-t border-[#e7e2d8] flex justify-end">
              <button
                onClick={handleSaveHero}
                className="py-2 px-5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Slide Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 2: KEY IMPACT COUNTERS
      ===================================================================== */}
      {activeSection === 'impact' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-heading font-bold text-ink">
                Homepage Impact Statistics
              </h2>
              <p className="text-xs text-ink-muted">
                These numbers power the 4 live counter cards displayed under "Measured Field Impact".
              </p>
            </div>

            <button
              onClick={handleOpenNewMetric}
              className="py-2 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Counter Card</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-2xl border border-[#e7e2d8] p-5 shadow-xs flex flex-col justify-between hover:border-primary/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider bg-sand text-ink-light border border-[#e7e2d8] font-heading">
                      {m.category || 'education'}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditMetric(m)}
                        className="p-1 rounded-lg text-ink-muted hover:text-forest hover:bg-forest/10 cursor-pointer transition-colors"
                        title="Edit Metric"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteMetric(m)}
                        className="p-1 rounded-lg text-ink-muted hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                        title="Delete Metric"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-3xl font-heading font-extrabold text-ink mb-1 font-mono">
                    {m.stat}
                  </div>
                  <div className="text-xs font-heading font-bold text-ink mb-1">
                    {m.description || m.label}
                  </div>
                  <div className="inline-block px-2 py-0.5 rounded bg-forest/10 text-forest text-[10px] font-bold mb-2 border border-forest/20 font-heading">
                    {m.growth}
                  </div>
                  <p className="text-[11px] text-ink-light leading-relaxed line-clamp-3">
                    {m.detail}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#e7e2d8] text-[10px] text-ink-muted font-mono">
                  ID: {m.id}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 3: FIELD REALITY & STATS
      ===================================================================== */}
      {activeSection === 'reality' && (
        <div className="bg-white rounded-2xl border border-[#e7e2d8] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#e7e2d8]">
            <div>
              <h2 className="text-base font-heading font-bold text-ink">
                Field Reality: Out-of-School Statistics &amp; Mission Narrative
              </h2>
              <p className="text-xs text-ink-muted">
                Section highlighting the education crisis in Nigeria and TKH's grassroots response.
              </p>
            </div>
            <button
              onClick={handleSaveReality}
              className="py-2 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>

          <form onSubmit={handleSaveReality} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-heading font-bold text-ink mb-1.5">
                  Headline Stat (e.g. Over 10M)
                </label>
                <input
                  type="text"
                  value={realityStat}
                  onChange={(e) => setRealityStat(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink font-heading font-bold text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold text-ink mb-1.5">
                  Stat Attribution / Subtext
                </label>
                <input
                  type="text"
                  value={realityLabel}
                  onChange={(e) => setRealityLabel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-heading font-bold text-ink mb-1.5">
                The Challenge Paragraph
              </label>
              <textarea
                rows="4"
                value={realityP1}
                onChange={(e) => setRealityP1(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-xs text-ink focus:outline-none focus:border-primary leading-relaxed"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-heading font-bold text-ink mb-1.5">
                The Solution Paragraph (TKH Intervention)
              </label>
              <textarea
                rows="4"
                value={realityP2}
                onChange={(e) => setRealityP2(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-xs text-ink focus:outline-none focus:border-primary leading-relaxed"
              ></textarea>
            </div>

            <div className="pt-4 border-t border-[#e7e2d8] flex justify-end">
              <button
                type="submit"
                className="py-2.5 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Publish Updates</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =====================================================================
          SECTION 4: LIVE MARQUEE RIBBON
      ===================================================================== */}
      {activeSection === 'marquee' && (
        <div className="bg-white rounded-2xl border border-[#e7e2d8] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#e7e2d8]">
            <div>
              <h2 className="text-base font-heading font-bold text-ink">
                Global Header Marquee Alert
              </h2>
              <p className="text-xs text-ink-muted">
                Real-time announcement ribbon scrolling across the top of all pages.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-forest/10 text-forest border border-forest/20 text-xs font-heading font-bold">
              Live on Site
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#142722] text-white text-xs leading-relaxed border border-[#1f3b34]">
            <div className="flex items-center gap-2 text-[#f7c899] font-bold mb-1.5 text-[11px] font-heading">
              <span className="w-2 h-2 rounded-full bg-[#f7c899] animate-pulse"></span>
              <span>LIVE TICKER SIMULATION</span>
            </div>
            <p className="text-white/95 font-medium">{marqueeText || '100% Direct Giving'}</p>
          </div>

          <form onSubmit={handleSaveMarquee} className="space-y-4">
            <div>
              <label className="block text-xs font-heading font-bold text-ink mb-1.5">
                Announcement Message
              </label>
              <textarea
                rows="3"
                value={marqueeText}
                onChange={(e) => setMarqueeText(e.target.value)}
                placeholder="e.g. Commissioning new solar classrooms in Kaduna & mobile health clinic in Enugu"
                className="w-full p-3.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-xs text-ink focus:outline-none focus:border-primary leading-relaxed"
              ></textarea>
            </div>

            <div>
              <span className="block text-[11px] font-heading font-bold text-ink-muted uppercase tracking-wider mb-2">
                Quick Presets:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Commissioning new solar classrooms in Kaduna & mobile health clinic in Enugu',
                  '100% Direct Giving: Zero kobo deducted for administrative salaries or office fees',
                  'Q4 2026 Primary School Book & Uniform Distribution Drive scheduled for Rivers State',
                  'Special Report: 2025 Full Financial & Field Impact Audit published'
                ].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setMarqueeText(preset)}
                    className="text-[11px] text-left px-3 py-1.5 rounded-lg bg-sand hover:bg-sand-dark text-ink-light border border-[#e7e2d8] cursor-pointer transition-colors"
                  >
                    "{preset.slice(0, 45)}..."
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#e7e2d8] flex justify-end">
              <button
                type="submit"
                className="py-2.5 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Live Marquee</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
