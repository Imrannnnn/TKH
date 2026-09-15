import { useState } from 'react';
import { useData } from '../context/DataContext';
import { School, Stethoscope, Droplets, BookOpen, TrendingUp, Download, FileText, ShieldCheck, Globe, Heart, MapPin, HandHeart } from '../components/Icons';
import CurvedWaveBackground from '../components/CurvedWaveBackground';

const iconMap = {
  School,
  BookOpen,
  Stethoscope,
  Droplets,
  HandHeart,
  TrendingUp,
  ShieldCheck
};

export default function Impact({ onOpenDonate }) {
  const { metrics: dynamicMetrics } = useData();
  const [activeTab, setActiveTab] = useState('all');
  const [downloadingReport, setDownloadingReport] = useState(null);

  const defaultMetricCards = [
    {
      id: 'students',
      category: 'education',
      icon: School,
      label: 'Education Impact',
      stat: '12,500',
      description: 'Students Enrolled & Supplied',
      growth: '+32% YoY',
      color: 'text-primary',
      detail: 'Provided free uniforms, textbooks, solar classroom seating, and daily sanitary supplies across 45 schools.'
    },
    {
      id: 'schools',
      category: 'education',
      icon: BookOpen,
      label: 'Infrastructure',
      stat: '45',
      description: 'Solar Classrooms Built',
      growth: '+14 New in 2024',
      color: 'text-tertiary',
      detail: 'Equipped with solar power generation, weatherproof roofing, ventilated windows, and modern desks.'
    },
    {
      id: 'patients',
      category: 'healthcare',
      icon: Stethoscope,
      label: 'Clinical Outreach',
      stat: '8,200',
      description: 'Free Medical Consultations',
      growth: '+45% YoY',
      color: 'text-forest',
      detail: 'Malaria screening, antibiotic courses, hypertension monitoring, and routine infant vaccinations.'
    },
    {
      id: 'clinics',
      category: 'healthcare',
      icon: Stethoscope,
      label: 'Frontline Healthcare',
      stat: '12',
      description: 'Community Health Posts',
      growth: '100% Operational',
      color: 'text-forest',
      detail: 'Permanent village posts staffed by qualified nurse practitioners and community health volunteers.'
    },
    {
      id: 'water',
      category: 'infrastructure',
      icon: Droplets,
      label: 'Clean Water',
      stat: '28',
      description: 'Solar Deep Boreholes',
      growth: 'Zero Waterborne Disease',
      color: 'text-emerald-800',
      detail: 'Delivering continuous safe drinking water directly within school premises and local hamlets.'
    },
    {
      id: 'mothers',
      category: 'healthcare',
      icon: HandHeart,
      label: 'Maternal Care',
      stat: '3,400',
      description: 'Safe Birth Kits Delivered',
      growth: '+28% YoY',
      color: 'text-primary',
      detail: 'Sterile delivery supplies and prenatal nutrition packs distributed to rural expectant mothers.'
    },
  ];

  const regionalReach = [
    { state: 'Kaduna State', schools: 18, clinics: 4, boreholes: 10, reach: '5,800+ lives' },
    { state: 'Enugu State', schools: 12, clinics: 3, boreholes: 7, reach: '4,200+ lives' },
    { state: 'Ogun State', schools: 8, clinics: 2, boreholes: 5, reach: '3,100+ lives' },
    { state: 'Niger State', schools: 4, clinics: 2, boreholes: 4, reach: '2,400+ lives' },
    { state: 'Kano Outreach', schools: 3, clinics: 1, boreholes: 2, reach: '1,500+ lives' },
  ];

  const currentMetrics = dynamicMetrics && dynamicMetrics.length > 0 ? dynamicMetrics : defaultMetricCards;

  const filteredMetrics = activeTab === 'all'
    ? currentMetrics
    : currentMetrics.filter((m) => m.category === activeTab);

  const handleDownloadReport = (year) => {
    setDownloadingReport(year);
    setTimeout(() => {
      setDownloadingReport(null);
      alert(`Ten Kind Hands ${year} Annual Audited Financial & Impact Report opened.`);
    }, 1000);
  };

  return (
    <div className="pt-24 md:pt-28 animate-fade-in bg-white pb-20">
      {/* Hero Section with Ambient Wave */}
      <section className="relative py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        <CurvedWaveBackground side="right" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand text-primary font-bold text-xs uppercase tracking-widest w-fit border border-[#e7e2d8] font-heading">
              <ShieldCheck className="w-4 h-4" />
              <span>Radical Accountability</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-ink leading-[1.15] tracking-tight">
              Transparency in Action. <br />
              <span className="text-primary">Measurable Flourishing.</span>
            </h1>

            <p className="text-base sm:text-lg text-ink-light leading-relaxed font-normal">
              Every naira donated and every volunteer hour is tied to audited, verifiable human outcomes. Explore our audited performance metrics across Nigeria below.
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
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${
                  activeTab === 'all' ? 'bg-ink text-white shadow-xs' : 'text-ink-light hover:text-ink'
                }`}
              >
                All Metrics
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${
                  activeTab === 'education' ? 'bg-primary text-white shadow-xs' : 'text-ink-light hover:text-ink'
                }`}
              >
                Education
              </button>
              <button
                onClick={() => setActiveTab('healthcare')}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${
                  activeTab === 'healthcare' ? 'bg-forest text-white shadow-xs' : 'text-ink-light hover:text-ink'
                }`}
              >
                Healthcare
              </button>
              <button
                onClick={() => setActiveTab('infrastructure')}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${
                  activeTab === 'infrastructure' ? 'bg-clay text-white shadow-xs' : 'text-ink-light hover:text-ink'
                }`}
              >
                Water &amp; Solar
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
            </div>
            <span className="px-4 py-2 rounded-xl bg-sand text-xs font-bold text-forest flex items-center gap-1.5 border border-[#e7e2d8] font-heading">
              <Globe className="w-4 h-4" />
              5 Active Geopolitical Zones
            </span>
          </div>

          <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full text-left text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-[#e7e2d8] text-xs font-heading text-ink-muted uppercase">
                  <th className="pb-3 px-3">State &amp; Region</th>
                  <th className="pb-3 px-3">Solar Schools</th>
                  <th className="pb-3 px-3">Health Posts</th>
                  <th className="pb-3 px-3">Water Boreholes</th>
                  <th className="pb-3 px-3">Direct Beneficiaries</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f8f6f2]">
                {regionalReach.map((r, i) => (
                  <tr key={i} className="hover:bg-sand transition-colors">
                    <td className="py-3.5 px-3 font-bold text-ink flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{r.state}</span>
                    </td>
                    <td className="py-3.5 px-3 text-ink-light font-medium">{r.schools}</td>
                    <td className="py-3.5 px-3 text-ink-light font-medium">{r.clinics}</td>
                    <td className="py-3.5 px-3 text-ink-light font-medium">{r.boreholes}</td>
                    <td className="py-3.5 px-3 font-bold text-primary font-mono">{r.reach}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Downloadable Annual Audit Reports */}
      <section className="py-14 px-4 md:px-8 max-w-7xl mx-auto mb-12">
        <div className="bg-white p-5 sm:p-8 md:p-12 rounded-3xl border border-[#e7e2d8] shadow-xs text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
            Public Audits &amp; Financials
          </span>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-ink mb-3">
            Download Our Independent Annual Reports
          </h3>
          <p className="text-sm text-ink-light mb-8 leading-relaxed max-w-lg mx-auto">
            Review detailed balance sheets, expenditure breakdowns, vendor receipts, and photographic third-party project audits.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {['2024 Audit Report (PDF)', '2023 Audit Report (PDF)', '2022 Financials (PDF)'].map((report, idx) => (
              <button
                key={idx}
                onClick={() => handleDownloadReport(report)}
                className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-full bg-sand hover:bg-white border border-[#e7e2d8] text-xs font-bold text-ink hover:text-primary transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-xs font-heading"
              >
                <FileText className="w-4 h-4" />
                <span>{downloadingReport === report ? 'Opening PDF...' : report}</span>
                <Download className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
