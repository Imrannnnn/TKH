import { useState } from 'react';
import { useData } from '../context/DataContext';
import { School, Stethoscope, Droplets, BookOpen, TrendingUp, ShieldCheck, Globe, Heart, MapPin, HandHeart, Users, Building2, Sparkles } from '../components/Icons';
import CurvedWaveBackground from '../components/CurvedWaveBackground';

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
      stat: '150+',
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
      label: 'Women & Girls Reached',
      stat: '2,100+',
      description: 'Women & Girls Reached',
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
      label: 'Children & Youths Reached',
      stat: '3,312+',
      description: 'Children & Youths Reached',
      growth: '+1,300',
      color: 'text-primary',
      detail: 'Children and young people supported through education, skills development, healthcare, and empowerment initiative...'
    },
  ];

  const regionalReach = [
    { state: 'Abuja', education: 18, health: 6, women: 12, children: 16, orphanage: 4 },
    { state: 'Benue', education: 14, health: 4, women: 10, children: 12, orphanage: 3 },
    { state: 'Plateau', education: 12, health: 3, women: 8, children: 11, orphanage: 3 },
    { state: 'Oyo', education: 10, health: 5, women: 9, children: 10, orphanage: 4 },
    { state: 'Lagos', education: 16, health: 7, women: 14, children: 18, orphanage: 4 },
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
    <div className="pt-24 md:pt-28 animate-fade-in bg-white pb-20">
      {/* Hero Section with Ambient Wave */}
      <section className="relative py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        <CurvedWaveBackground side="right" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand text-primary font-bold text-xs uppercase tracking-widest w-fit border border-[#e7e2d8] font-heading">
              <ShieldCheck className="w-4 h-4" />
              <span>Accountability in Action</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-ink leading-[1.15] tracking-tight">
              Transparency in Practice. <br />
              <span className="text-primary">Measurable Impact.</span>
            </h1>

            <p className="text-base sm:text-lg text-ink-light leading-relaxed font-normal">
              Every naira donated and every volunteer hour supports measurable, verifiable outcomes for children, women, and vulnerable communities. Explore our impact metrics across Nigeria below.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={onOpenDonate}
                className="btn-primary w-full sm:w-auto text-xs md:text-sm px-6 sm:px-8 py-3.5 flex items-center justify-center gap-2 cursor-pointer shadow-md font-heading font-semibold"
              >
                <span>Back Our Next Milestone</span>
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-[340px] sm:h-[400px] rounded-3xl overflow-hidden bg-white p-2 border border-[#e7e2d8] shadow-xs">
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

      {/* Metrics Bento Section with Mirrored Wave */}
      <section className="relative py-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        <CurvedWaveBackground side="left" />

        <div className="relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
              Proven Performance
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink">
              Core Headline Indicators
            </h2>

            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded-2xl sm:rounded-full bg-sand border border-[#e7e2d8] max-w-lg mx-auto mt-6">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${activeTab === 'all' ? 'bg-ink text-white shadow-xs' : 'text-ink-light hover:text-ink'
                  }`}
              >
                All Metrics
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${activeTab === 'education' ? 'bg-primary text-white shadow-xs' : 'text-ink-light hover:text-ink'
                  }`}
              >
                Education
              </button>
              <button
                onClick={() => setActiveTab('healthcare')}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${activeTab === 'healthcare' ? 'bg-forest text-white shadow-xs' : 'text-ink-light hover:text-ink'
                  }`}
              >
                Healthcare
              </button>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className="p-5 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-xs border border-[#e7e2d8] shadow-xs flex flex-col justify-between group hover:border-primary/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-sand border border-[#e7e2d8] flex items-center justify-center">
                        <IconComponent className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-sand border border-[#e7e2d8] text-[11px] font-bold text-emerald-800 flex items-center gap-1 font-heading">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
                        {item.growth}
                      </span>
                    </div>

                    <span className="text-[11px] uppercase tracking-wider text-ink-muted font-bold block mb-1 font-heading">
                      {item.label}
                    </span>

                    <div className="font-mono text-4xl font-bold text-primary mb-1">
                      {item.stat}
                    </div>

                    <h3 className="text-base font-heading font-bold text-ink mb-2">
                      {item.description}
                    </h3>

                    <p className="text-xs text-ink-light leading-relaxed">
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
      <section className="py-10 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-white p-5 sm:p-8 md:p-10 rounded-3xl border border-[#e7e2d8] shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
                Geographic Reach
              </span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-ink">
                Impact by Nigerian Region
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-primary mt-1 font-heading">
                STATES: Abuja | Benue | Plateau | Oyo | Lagos
              </p>
            </div>
            <span className="px-4 py-2 rounded-xl bg-sand text-xs font-bold text-forest flex items-center gap-1.5 border border-[#e7e2d8] font-heading">
              <Globe className="w-4 h-4" />
              over 200 communities reached
            </span>
          </div>

          <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full text-left text-sm min-w-[680px]">
              <thead>
                <tr className="border-b border-[#e7e2d8] text-xs font-heading text-ink-muted uppercase">
                  <th className="pb-3 px-3">STATE</th>
                  <th className="pb-3 px-3">EDUCATION</th>
                  <th className="pb-3 px-3">HEALTH</th>
                  <th className="pb-3 px-3">WOMEN</th>
                  <th className="pb-3 px-3">CHILDREN</th>
                  <th className="pb-3 px-3">ORPHANAGE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f8f6f2]">
                {regionalReach.map((r, i) => (
                  <tr key={i} className="hover:bg-sand transition-colors">
                    <td className="py-3.5 px-3 font-bold text-ink flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary shrink-0" />
                      <span>{r.state}</span>
                    </td>
                    <td className="py-3.5 px-3 text-ink-light font-medium">{r.education}</td>
                    <td className="py-3.5 px-3 text-ink-light font-medium">{r.health}</td>
                    <td className="py-3.5 px-3 text-ink-light font-medium">{r.women}</td>
                    <td className="py-3.5 px-3 text-ink-light font-medium">{r.children}</td>
                    <td className="py-3.5 px-3 font-bold text-primary font-mono">{r.orphanage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
}
