import { useState } from 'react';
import { useData } from '../context/DataContext';
import { School, Stethoscope, Droplets, BookOpen, TrendingUp, ShieldCheck, Globe, Heart, MapPin, HandHeart, Users, Building2, Sparkles } from '../components/Icons';
import CommunityVoicesSection from '../components/CommunityVoicesSection';

const iconMap = {
  School,
  BookOpen,
  Stethoscope,
  Droplets,
  HandHeart,
  TrendingUp,
  ShieldCheck,
  Users,
  Building2,
  Sparkles,
  MapPin
};

export default function Impact({ onOpenDonate }) {
  const { metrics: dynamicMetrics } = useData();
  const [activeTab, setActiveTab] = useState('all');

  const defaultMetricCards = [
    {
      id: 'students',
      category: 'transparency',
      icon: Users,
      iconName: 'Users',
      label: 'Beneficiaries Reached',
      stat: '5,500+',
      description: 'Beneficiaries Reached',
      growth: '+32% YoY',
      color: 'text-primary',
      detail: 'People reached through education, healthcare, empowerment, and community outreach initiatives...'
    },
    {
      id: 'schools',
      category: 'education',
      icon: School,
      iconName: 'School',
      label: 'Scholarships Awarded',
      stat: '200+',
      description: 'Scholarships Awarded',
      growth: '+40 New in 2026',
      color: 'text-ink',
      detail: 'Children and young people supported with access to education through scholarships and financial assistance.'
    },
    {
      id: 'patients',
      category: 'transparency',
      icon: HandHeart,
      iconName: 'HandHeart',
      label: 'Women & Girls Supported',
      stat: '2,500+',
      description: 'Women & Girls Supported',
      growth: '+45% YoY',
      color: 'text-forest',
      detail: 'Women and girls supported through education, healthcare, empowerment, and community outreach initiatives.'
    },
    {
      id: 'giving-model',
      category: 'transparency',
      icon: ShieldCheck,
      iconName: 'ShieldCheck',
      label: 'Direct Giving Model',
      stat: '100%',
      description: 'Direct Giving Model',
      growth: '100% Direct',
      color: 'text-emerald-800',
      detail: 'Zero cuts from public gifts; admin is funded privately by trustee endowment.'
    },
    {
      id: 'clinics',
      category: 'transparency',
      icon: Building2,
      iconName: 'Building2',
      label: 'Communities Served',
      stat: '130+',
      description: 'Communities Served',
      growth: '100% Operational',
      color: 'text-forest',
      detail: 'Communities reached through education, healthcare, empowerment, and community outreach initiatives.'
    },
    {
      id: 'metric-1790695260926',
      category: 'transparency',
      icon: Sparkles,
      iconName: 'Sparkles',
      label: 'Children & Young People Reached',
      stat: '3,500+',
      description: 'Children & Young People Reached',
      growth: '+1,300',
      color: 'text-primary',
      detail: 'Children and young people supported through education, skills development, healthcare, and empowerment initiative...'
    },
  ];

  const regionalReach = [
    { state: 'Abuja (FCT)', education: 18, health: 6, women: 12, children: 16, orphanage: 4 },
    { state: 'Benue', education: 14, health: 4, women: 10, children: 12, orphanage: 3 },
    { state: 'Plateau', education: 12, health: 3, women: 8, children: 11, orphanage: 3 },
    { state: 'Oyo', education: 10, health: 5, women: 9, children: 10, orphanage: 4 },
    { state: 'Lagos', education: 16, health: 7, women: 14, children: 18, orphanage: 4 },
    { state: 'Katsina', education: 8, health: 4, women: 7, children: 9, orphanage: 2 },
    { state: 'Enugu', education: 10, health: 6, women: 8, children: 11, orphanage: 3 },
  ];

  const currentMetrics = dynamicMetrics && dynamicMetrics.length > 0 ? dynamicMetrics : defaultMetricCards;

  const filteredMetrics = activeTab === 'all'
    ? currentMetrics
    : currentMetrics.filter((m) => {
      const cat = (m.category || '').toLowerCase();
      if (activeTab === 'education') {
        return cat === 'education' || m.id === 'schools' || m.id === 'students' || m.id === 'metric-1790695260926';
      }
      if (activeTab === 'healthcare') {
        return cat === 'healthcare' || m.id === 'patients' || m.id === 'clinics';
      }
      return cat === activeTab.toLowerCase();
    });



  return (
    <div className="pt-8 sm:pt-14 3xl:pt-18 animate-fade-in bg-white pb-16 sm:pb-20 3xl:pb-28">
      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 md:py-16 3xl:py-20 px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16 uw:px-20 max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 3xl:gap-16 4xl:gap-20 items-center">
          <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-5 3xl:gap-7">
            <div className="inline-flex items-center gap-2 px-3.5 3xl:px-5 py-1.5 3xl:py-2 rounded-full bg-sand text-primary font-bold text-xs 3xl:text-sm uppercase tracking-widest w-fit border border-[#e7e2d8] font-heading">
              <ShieldCheck className="w-4 h-4 3xl:w-5 3xl:h-5" />
              <span>Accountability in Action</span>
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl 3xl:text-6xl 4xl:text-7xl font-heading font-extrabold text-ink leading-[1.15] tracking-tight">
              Transparency in Practice. <br />
              <span className="text-primary">Measurable Impact.</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg 3xl:text-xl text-ink-light leading-relaxed font-normal max-w-xl 3xl:max-w-2xl 4xl:max-w-3xl">
              Every naira donated and every volunteer hour supports measurable, verifiable outcomes for children, women, and vulnerable communities. Explore our impact metrics across Nigeria below.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenDonate}
                className="btn-primary w-full sm:w-auto text-xs md:text-sm 3xl:text-base px-6 sm:px-8 3xl:px-10 py-3.5 3xl:py-4 flex items-center justify-center gap-2 cursor-pointer shadow-md font-heading font-semibold min-h-[44px]"
              >
                <span>Back Our Next Milestone</span>
                <Heart className="w-4 h-4 3xl:w-5 3xl:h-5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-[240px] xs:h-[300px] sm:h-[380px] lg:h-[400px] 3xl:h-[500px] 4xl:h-[600px] rounded-3xl overflow-hidden bg-white p-2 border border-[#e7e2d8] shadow-xs">
              <div
                className="w-full h-full rounded-2xl bg-cover bg-center"
                style={{
                  backgroundImage: `url('/images/IMG_0994.JPG')`
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Bento Section */}
      <section className="relative py-10 sm:py-16 3xl:py-20 px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16 uw:px-20 max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto overflow-hidden">
        <div className="relative z-10">
          <div className="text-center max-w-2xl 3xl:max-w-3xl mx-auto mb-8 sm:mb-10 3xl:mb-14">
            <span className="text-xs 3xl:text-sm uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
              Proven Performance
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl 3xl:text-5xl font-heading font-bold text-ink">
              Core Headline Indicators
            </h2>

            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 3xl:gap-3 p-1.5 3xl:p-2 rounded-2xl sm:rounded-full bg-sand border border-[#e7e2d8] max-w-lg 3xl:max-w-xl mx-auto mt-6">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 sm:px-5 3xl:px-6 py-2 3xl:py-2.5 rounded-full text-xs sm:text-sm 3xl:text-base font-semibold transition-all cursor-pointer font-heading min-h-[40px] flex items-center justify-center ${activeTab === 'all' ? 'bg-ink text-white shadow-xs' : 'text-ink-light hover:text-ink'
                  }`}
              >
                All Metrics
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`px-4 sm:px-5 3xl:px-6 py-2 3xl:py-2.5 rounded-full text-xs sm:text-sm 3xl:text-base font-semibold transition-all cursor-pointer font-heading min-h-[40px] flex items-center justify-center ${activeTab === 'education' ? 'bg-primary text-white shadow-xs' : 'text-ink-light hover:text-ink'
                  }`}
              >
                Education
              </button>
              <button
                onClick={() => setActiveTab('healthcare')}
                className={`px-4 sm:px-5 3xl:px-6 py-2 3xl:py-2.5 rounded-full text-xs sm:text-sm 3xl:text-base font-semibold transition-all cursor-pointer font-heading min-h-[40px] flex items-center justify-center ${activeTab === 'healthcare' ? 'bg-forest text-white shadow-xs' : 'text-ink-light hover:text-ink'
                  }`}
              >
                Healthcare
              </button>
            </div>
          </div>

          {/* Bento Grid: expands intelligently on ultra-wide */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-3 4xl:grid-cols-3 uw:grid-cols-6 gap-6 3xl:gap-8 4xl:gap-10">
            {filteredMetrics.map((item) => {
              const IconComponent = typeof item.icon === 'function'
                ? item.icon
                : (item.iconName && iconMap[item.iconName]
                  ? iconMap[item.iconName]
                  : (item.category === 'healthcare'
                    ? Stethoscope
                    : (item.category === 'infrastructure' ? Droplets : School)));
              return (
                <div
                  key={item.id}
                  className="p-5 sm:p-7 3xl:p-8 rounded-3xl bg-white/95 backdrop-blur-xs border border-[#e7e2d8] shadow-xs flex flex-col justify-between group hover:border-primary/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 3xl:w-14 3xl:h-14 rounded-2xl bg-sand border border-[#e7e2d8] flex items-center justify-center">
                        <IconComponent className={`w-5 h-5 3xl:w-7 3xl:h-7 ${item.color}`} />
                      </div>
                      <span className="px-3 py-1 3xl:px-3.5 3xl:py-1.5 rounded-full bg-sand border border-[#e7e2d8] text-[11px] 3xl:text-xs font-bold text-emerald-800 flex items-center gap-1 font-heading">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
                        {item.growth}
                      </span>
                    </div>

                    <span className="text-[11px] 3xl:text-xs uppercase tracking-wider text-ink-muted font-bold block mb-1 font-heading">
                      {item.label}
                    </span>

                    <div className="font-mono text-4xl 3xl:text-5xl font-bold text-primary mb-1">
                      {item.stat}
                    </div>

                    <h3 className="text-base 3xl:text-lg font-heading font-bold text-ink mb-2">
                      {item.description}
                    </h3>

                    <p className="text-xs 3xl:text-sm text-ink-light leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Regional Reach Distribution Table */}
      <section className="py-10 3xl:py-16 px-4 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16 uw:px-20 max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2280px] uw:max-w-[2880px] suw:max-w-[3800px] mx-auto">
        <div className="bg-white p-5 sm:p-8 md:p-10 3xl:p-12 rounded-3xl border border-[#e7e2d8] shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 3xl:mb-8">
            <div>
              <span className="text-xs 3xl:text-sm uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
                Geographic Reach
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl 3xl:text-4xl font-heading font-bold text-ink">
                Impact by Nigerian Region
              </h3>
              <p className="text-xs sm:text-sm 3xl:text-base font-semibold text-primary mt-1 font-heading">
                STATES: Abuja | Benue | Plateau | Oyo | Lagos
              </p>
            </div>
            <span className="px-4 py-2 3xl:px-5 3xl:py-2.5 rounded-xl bg-sand text-xs 3xl:text-sm font-bold text-forest flex items-center gap-1.5 border border-[#e7e2d8] font-heading">
              <Globe className="w-4 h-4 3xl:w-5 3xl:h-5" />
              over 200 communities reached
            </span>
          </div>

          <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full text-left text-sm 3xl:text-base min-w-[680px]">
              <thead>
                <tr className="border-b border-[#e7e2d8] text-xs 3xl:text-sm font-heading text-ink-muted uppercase">
                  <th className="pb-3 3xl:pb-4 px-3 3xl:px-5">STATE</th>
                  <th className="pb-3 3xl:pb-4 px-3 3xl:px-5">EDUCATION</th>
                  <th className="pb-3 3xl:pb-4 px-3 3xl:px-5">HEALTH</th>
                  <th className="pb-3 3xl:pb-4 px-3 3xl:px-5">WOMEN</th>
                  <th className="pb-3 3xl:pb-4 px-3 3xl:px-5">CHILDREN</th>
                  <th className="pb-3 3xl:pb-4 px-3 3xl:px-5">ORPHANAGE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f8f6f2]">
                {regionalReach.map((r, i) => (
                  <tr key={i} className="hover:bg-sand transition-colors">
                    <td className="py-3.5 3xl:py-4 px-3 3xl:px-5 font-bold text-ink flex items-center gap-2">
                      <MapPin className="w-4 h-4 3xl:w-5 3xl:h-5 text-primary shrink-0" />
                      <span>{r.state}</span>
                    </td>
                    <td className="py-3.5 3xl:py-4 px-3 3xl:px-5 text-ink-light font-medium">{r.education}</td>
                    <td className="py-3.5 3xl:py-4 px-3 3xl:px-5 text-ink-light font-medium">{r.health}</td>
                    <td className="py-3.5 3xl:py-4 px-3 3xl:px-5 text-ink-light font-medium">{r.women}</td>
                    <td className="py-3.5 3xl:py-4 px-3 3xl:px-5 text-ink-light font-medium">{r.children}</td>
                    <td className="py-3.5 3xl:py-4 px-3 3xl:px-5 font-bold text-primary font-mono">{r.orphanage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Community Voices: In their words Section */}
      <CommunityVoicesSection onOpenDonate={onOpenDonate} />

    </div>
  );
}
