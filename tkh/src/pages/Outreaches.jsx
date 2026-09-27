import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Calendar, MapPin, Heart, CheckCircle2, Users, BookOpen, Stethoscope, Laptop, Sparkles, ChevronDown, ChevronUp, X, ArrowRight, HandHeart } from '../components/Icons';
import CurvedWaveBackground from '../components/CurvedWaveBackground';

const defaultMonthlyOutreaches = [
  {
    id: 'outreach-aug-2026',
    month: 'August 2026',
    date: 'August 1 – 24, 2026',
    status: 'completed',
    title: 'Youth Skills, Digital Literacy & Academic Outreach',
    pillar: 'Education & Skills',
    theme: 'Youth Skills Empowerment • Education • Community Development',
    location: 'Lagos, Plateau, Benue & FCT Abuja',
    beneficiariesTarget: '345 Youths & Students Reached',
    description: 'A comprehensive multi-state empowerment campaign delivering a 5-week youth digital tech lab in Ikorodu, academic speech day scholarships in Jos, primary school learning kits, shoe-making apprenticeships in Bwari, and vocational hairdressing tools in Makurdi.',
    image: '/images/IMG_0294.JPG',
    focusAreas: ['Digital Literacy Bootcamps', 'Merit Scholarships & Book Packs', 'Vocational Trade Toolkits', 'Youth Mentorship'],
    deployments: [
      {
        state: 'Lagos State',
        location: 'JAMBELLS School, Ikorodu',
        date: 'August 5, 2026',
        beneficiaries: '30 Youths (27 Active)',
        activity: 'Launched 5-week Youth Digital Skills Empowerment Programme in a dedicated computer lab covering Computer Fundamentals, Microsoft Word, Excel, PowerPoint, AI tools, and Graphic Design.'
      },
      {
        state: 'Plateau State',
        location: 'Beckwin International School, Jos',
        date: 'July 24, 2026',
        beneficiaries: '102 Pupils',
        activity: 'Speech & Prize Giving Day: awarded 100% full scholarships to 5 Best Overall pupils, 50% scholarships to 5 Second Best Overall pupils, and distributed exercise books, water bottles, and hygiene kits.'
      },
      {
        state: 'Plateau State',
        location: 'Deeper Life Church, Abattoir, Jos',
        date: 'August 1, 2026',
        beneficiaries: '200 School Children',
        activity: 'Distributed exercise books and complete pencil packs (2 biros, 1 crayon, 1 sharpener, 1 eraser) to support multi-denominational learning.'
      },
      {
        state: 'Benue State',
        location: 'Kanshio, Makurdi',
        date: 'August 24, 2026',
        beneficiaries: '10 Young Women',
        activity: 'Hairdressing vocational empowerment: distributed dummy mannequin heads, hair attachments, professional styling scissors, and combs for self-reliance.'
      },
      {
        state: 'FCT Abuja',
        location: 'Dutse PE Community, Bwari Area Council',
        date: 'June 25, 2026',
        beneficiaries: '3 Youths (Joshua, Angela, Muhammed)',
        activity: 'Enrolled in an intensive 6-month shoe-making training program with complete artisanal starter toolkits and parental consent.'
      }
    ],
    feedback: '"We continue to combine immediate educational support with practical empowerment opportunities designed to strengthen pathways toward economic independence."',
    partners: 'JAMBELLS School, EDAB360 & Local Community Councils'
  },
  {
    id: 'outreach-jul-2026',
    month: 'July 2026',
    date: 'July 4 – 20, 2026',
    status: 'completed',
    title: 'Empower 1 Initiative: Sustainable Youth Entrepreneurship',
    pillar: 'Youth Empowerment',
    theme: 'Fostering Sustainable Youth Entrepreneurship & Micro-Business Ownership',
    location: 'Plateau (Jos) & Benue (Makurdi)',
    beneficiariesTarget: '2 Youths Established with Full Barbershops',
    description: 'Transitioned trained youths from 2025 vocational apprenticeships into full commercial barbershop business ownership with shop rentals, interior setup, electrical wiring, and commercial-grade barber tools in Jos and Makurdi.',
    image: '/images/IMG_0300.JPG',
    focusAreas: ['Apprenticeship-to-Ownership Transition', 'Complete Shop Setup & Leases', 'Professional Hairdressing Tools', 'Sustainable Income'],
    deployments: [
      {
        state: 'Plateau State',
        location: 'Angwan Kuruma, Jos',
        date: 'July 4, 2026',
        beneficiaries: 'Promise Jacob (Barbershop Owner)',
        activity: 'Successfully established with a fully equipped barbershop. Infrastructure: shop lease covered, interior painting, 4ft × 3ft mirror console with drawer, 2 professional barbing chairs, waiting chair, electrical setup. Tools: 2 high-performance clippers, 3 covers, cleaning brushes, clipper oil.'
      },
      {
        state: 'Benue State',
        location: 'Makurdi',
        date: 'July 20, 2026',
        beneficiaries: 'Samuel (Barbershop Owner)',
        activity: 'Transitioned from 2025 barbing apprenticeship to full business ownership: official presentation of keys and shop handover, full equipment presentation, and live demonstration haircut for first client.'
      }
    ],
    feedback: '"The initiative provides a sustainable source of income and a brighter economic future for Promise Jacob and Samuel."',
    partners: 'Local Village Elders, Community Leaders & Artisan Mentors'
  },
  {
    id: 'outreach-jun-2026',
    month: 'June 2026',
    date: 'June 2 – 21, 2026',
    status: 'completed',
    title: 'Widows Empowerment Outreach: Sustainable Cooking & Welfare',
    pillar: 'Women Empowerment',
    theme: 'Empowering Widows through Sustainable Solutions & Clean Energy',
    location: 'Abuja, Benue, Oyo & Lagos (4 States)',
    beneficiariesTarget: '80 Vulnerable Widows (20 per State)',
    description: 'Transitioned 80 widows from hazardous firewood smoke to modernized, fuel-efficient coal pots across 4 states, providing live safety demonstrations, domestic respiratory health orientations, and direct cash grants in Benue.',
    image: '/images/IMG_0995.JPG',
    focusAreas: ['Clean Household Energy', 'Firewood Smoke Hazard Elimination', 'Cooking Fuel Expense Relief', 'Widow Social Inclusion'],
    deployments: [
      {
        state: 'FCT Abuja',
        location: 'Dafara Community, Kuje',
        date: 'June 2, 2026',
        beneficiaries: '20 Widows',
        activity: 'Distributed 20 modernized coal pots with physical usage and safety demonstrations, plus domestic health and economic orientation.'
      },
      {
        state: 'Benue State',
        location: 'Otukpa Community, Ogbadibo LGA',
        date: 'June 8, 2026',
        beneficiaries: '20 Widows',
        activity: 'Distributed 20 modernized coal pots and ₦2,000 cash grant per beneficiary courtesy of the LGA Chairman partnership to ease daily living costs.'
      },
      {
        state: 'Oyo State',
        location: 'Amuloko Idi-Ose, Ibadan',
        date: 'June 12, 2026',
        beneficiaries: '20 Widows',
        activity: 'Empowered widows with energy-efficient stoves to counteract gas price spikes and eliminate domestic firewood smoke hazards.'
      },
      {
        state: 'Lagos State',
        location: 'Araromi Community',
        date: 'June 21, 2026',
        beneficiaries: '20 Widows',
        activity: 'Supplied modernized coal stoves to alleviate household cooking expenses, supported by practical demonstrations and community testimonials.'
      }
    ],
    feedback: '"The women were so happy and it was written on their faces. The coal pots and financial assistance ease heavy daily living expenses."',
    partners: 'Ogbadibo LGA Council, Traditional Ward Leaders & Community Groups'
  },
  {
    id: 'outreach-may-2026',
    month: 'May 2026',
    date: 'April 27 – May 12, 2026',
    status: 'completed',
    title: 'Child Empowerment Program: Academic Materials & Student Retention',
    pillar: 'Education',
    theme: 'Educational Equity, Learning Resource Distribution & Motivation',
    location: 'Benue, Lagos, Plateau & Oyo (4 States)',
    beneficiariesTarget: '300 Primary & Secondary Pupils',
    description: 'Supplied 300 students across 4 diverse states with curriculum-aligned notebooks, writing packs, water bottles, and stationery kits, removing immediate classroom resource barriers for the full academic term.',
    image: '/images/IMG_0294.JPG',
    focusAreas: ['Classroom Tool Provision', 'Student Motivation & Retention', 'Writing & Creative Kits', 'School Community Trust'],
    deployments: [
      {
        state: 'Benue State',
        location: 'UBE Northbank, Makurdi',
        date: 'April 27, 2026',
        beneficiaries: '94 Students Reached',
        activity: 'Distributed 94 comprehensive writing packs (2 pencils, 5 biros, 1 pack of crayons, eraser, ruler, sharpener) solving learning material shortages.'
      },
      {
        state: 'Oyo State',
        location: 'Oluode Community Primary School, Oke-Alaro, Apata, Ibadan',
        date: 'May 4, 2026',
        beneficiaries: '50 Pupils (Primary 5 & 6)',
        activity: 'Equipped 50 pupils with full educational kits: 5 exercise books, 5 pens, 5 pencils, erasers, sharpeners, ruler, and pencil case.'
      },
      {
        state: 'Lagos State',
        location: 'Jambells Schools, Ikorodu',
        date: 'May 11, 2026',
        beneficiaries: '86 Students',
        activity: 'Delivered notebooks, writing packs, water bottles, biros, rulers, and crayons to support primary and secondary learners.'
      },
      {
        state: 'Plateau State',
        location: 'LEA Kunga Targwong, Bauchi Road, Jos',
        date: 'May 12, 2026',
        beneficiaries: '70 Pupils',
        activity: 'Supplied 70 writing material packs, 70 packs of exercise books, and 70 durable water bottles to enhance classroom participation.'
      }
    ],
    feedback: '"Beneficiaries expressed gratitude through songs and appreciation messages. The intervention equipped pupils with the exact tools needed for the term."',
    partners: 'School Headteachers, SUBEB Teachers & Community Parents'
  },
  {
    id: 'outreach-apr-2026',
    month: 'April 2026',
    date: 'April 4 – 20, 2026',
    status: 'completed',
    title: 'Malaria Eradication Campaign: Frontline Prevention & Health Education',
    pillar: 'Healthcare',
    theme: 'Malaria Prevention • Maternal & Child Health • Local Language Education',
    location: 'Lagos, Plateau & FCT Abuja (3 Regions)',
    beneficiariesTarget: '130 High-Risk Individuals',
    description: 'Targeted frontline campaign prioritizing pregnant and nursing mothers, providing long-lasting treated mosquito nets, insecticides, sprayers, and Vitamin C, backed by bilingual health education in English and Hausa.',
    image: '/images/11222.jpeg',
    focusAreas: ['Insecticide-Treated Nets (LLINs)', 'Maternal & Nursing Mother Care', 'Hausa & English Health Education', 'Vector Control Sprayers'],
    deployments: [
      {
        state: 'Lagos State',
        location: 'Abata, Orile, Surulere',
        date: 'April 4, 2026',
        beneficiaries: '30 Pregnant & Nursing Mothers',
        activity: 'Supplied mosquito treated nets, insecticides, and Vitamin C supplements accompanied by an interactive maternal malaria prevention orientation.'
      },
      {
        state: 'FCT Abuja',
        location: 'Idu Karimo Community',
        date: 'April 8, 2026',
        beneficiaries: '50 Individuals',
        activity: 'Community awareness campaign educating women on malaria transmission causes and preventive sanitation, with educational flyers and digital advocacy.'
      },
      {
        state: 'Plateau State',
        location: 'Rinze Community, Jos East LGA',
        date: 'April 20, 2026',
        beneficiaries: '50 Women',
        activity: 'Delivered health education in Hausa for clear grassroots understanding; distributed 50 mosquito treated nets, 50 BNC sprayers, and 50 Vitamin C packs.'
      }
    ],
    feedback: '"The village chief and beneficiaries expressed sincere gratitude for the nets and sprayers. Delivering health education in Hausa made the safety practices clear to all."',
    partners: 'Primary Healthcare Workers, Traditional Village Chiefs & Women Advocates'
  },
  {
    id: 'outreach-oct-2026',
    month: 'October 2026',
    date: 'October 17–19, 2026',
    status: 'upcoming',
    title: 'Q4 2026 Primary School Book & Uniform Distribution Drive',
    pillar: 'Education',
    theme: 'School Uniforms • Textbooks & Desks • Rural Classrooms',
    location: 'Ikwerre & Emohua Districts, Rivers State',
    beneficiariesTarget: '1,200 Primary Pupils Target',
    description: 'Delivering full uniform sets, branded exercise books, mathematics geometry sets, and 30 dual-seater desks across four rural community schools.',
    needs: 'Volunteer teachers, logistics drivers, packing assistants.',
    image: '/images/IMG_0303.JPG',
    focusAreas: ['Classroom Infrastructure', 'Uniform Tailoring', 'Curriculum Materials', 'Desk Distribution']
  },
  {
    id: 'outreach-nov-2026',
    month: 'November 2026',
    date: 'November 6–8, 2026',
    status: 'upcoming',
    title: 'Rural Maternal Health & Malaria Screening Mission',
    pillar: 'Healthcare',
    theme: 'Antenatal Care • Malaria Diagnostics • Infant Care',
    location: 'Kajuru & Kachia Hamlets, Southern Kaduna',
    beneficiariesTarget: '800+ Mothers & Infants Target',
    description: 'Free rapid malaria testing, antenatal checks, distribution of 300 Mama Kits (sterile birth packs), and pediatric deworming treatments.',
    needs: 'Volunteer doctors, registered nurses, pharmacist assistants.',
    image: '/images/IMG_0995.JPG',
    focusAreas: ['Antenatal Triage', 'Mama Kits (Sterile Birth Packs)', 'Rapid Malaria Diagnostics', 'Pediatric Deworming']
  }
];

export default function Outreaches({ onOpenDonate }) {
  const { outreaches: dynamicOutreaches } = useData();
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedOutreachId, setExpandedOutreachId] = useState(null);
  const [modalOutreach, setModalOutreach] = useState(null);

  const rawOutreaches = dynamicOutreaches && dynamicOutreaches.length > 0 ? dynamicOutreaches : defaultMonthlyOutreaches;

  const currentOutreaches = rawOutreaches.map((o) => {
    // Merge full deployment data from default list if missing in dynamic cache
    const match = defaultMonthlyOutreaches.find((def) => def.id === o.id);
    return {
      ...o,
      month: o.month || match?.month || '2026',
      deployments: o.deployments || match?.deployments || [],
      focusAreas: o.focusAreas || match?.focusAreas || [],
      feedback: o.feedback || match?.feedback || '',
      partners: o.partners || match?.partners || '',
      theme: o.theme || match?.theme || ''
    };
  });

  const monthOptions = [
    { label: 'All Missions', value: 'all' },
    { label: 'August 2026', value: 'August 2026' },
    { label: 'July 2026', value: 'July 2026' },
    { label: 'June 2026', value: 'June 2026' },
    { label: 'May 2026', value: 'May 2026' },
    { label: 'April 2026', value: 'April 2026' },
    { label: 'Upcoming', value: 'upcoming' }
  ];

  const filteredOutreaches = currentOutreaches.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (selectedMonth === 'all') return true;
    if (selectedMonth === 'upcoming') return o.status === 'upcoming';
    return o.month === selectedMonth;
  });

  const toggleExpand = (id) => {
    setExpandedOutreachId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="pt-24 md:pt-28 animate-fade-in bg-white pb-24">
      {/* Header with Ambient Wave */}
      <section className="relative py-12 md:py-16 px-4 md:px-8 max-w-5xl mx-auto text-center overflow-hidden">
        <CurvedWaveBackground side="right" />

        <div className="relative z-10">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-3 font-heading">
            Field Operations &amp; Monthly Impact Reports
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-ink max-w-4xl mx-auto mb-5 tracking-tight leading-tight">
            Grassroots Missions &amp;{' '}
            <span className="text-primary">Monthly Field Reports.</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-light max-w-3xl mx-auto mb-8 leading-relaxed font-normal">
            Track our verified month-by-month outreach reports across Nigerian communities, inspecting actual deliverables, educational kits, vocational tools, and health distributions delivered directly on the ground.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10 p-4 rounded-2xl bg-sand/80 border border-[#e7e2d8] text-center">
            <div className="border-r border-[#e7e2d8] last:border-none px-2">
              <span className="font-mono text-2xl font-bold text-primary block">850+</span>
              <span className="text-[11px] text-ink-muted">Direct Beneficiaries Reached</span>
            </div>
            <div className="border-r border-[#e7e2d8] last:border-none px-2">
              <span className="font-mono text-2xl font-bold text-forest block">6</span>
              <span className="text-[11px] text-ink-muted">Nigerian States Covered</span>
            </div>
            <div className="border-r border-[#e7e2d8] last:border-none px-2">
              <span className="font-mono text-2xl font-bold text-ink block">5 Months</span>
              <span className="text-[11px] text-ink-muted">Verified Field Missions</span>
            </div>
            <div className="px-2">
              <span className="font-mono text-2xl font-bold text-emerald-700 block">100%</span>
              <span className="text-[11px] text-ink-muted">Direct Grassroots Delivery</span>
            </div>
          </div>

          {/* Month Selector Pills */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-3">
            {monthOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedMonth(opt.value)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${
                  selectedMonth === opt.value
                    ? 'bg-ink text-white shadow-xs'
                    : 'bg-sand text-ink-light hover:text-ink border border-[#e7e2d8]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Status Quick Filter */}
          <div className="flex justify-center items-center gap-2 text-xs text-ink-muted font-heading mt-2">
            <span>Filter by Status:</span>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-0.5 rounded-full cursor-pointer transition-colors ${
                statusFilter === 'all' ? 'bg-primary/10 text-primary font-bold' : 'hover:text-ink'
              }`}
            >
              All
            </button>
            <span>•</span>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-2.5 py-0.5 rounded-full cursor-pointer transition-colors ${
                statusFilter === 'completed' ? 'bg-forest/10 text-forest font-bold' : 'hover:text-ink'
              }`}
            >
              Verified Completed (5)
            </button>
            <span>•</span>
            <button
              onClick={() => setStatusFilter('upcoming')}
              className={`px-2.5 py-0.5 rounded-full cursor-pointer transition-colors ${
                statusFilter === 'upcoming' ? 'bg-primary/10 text-primary font-bold' : 'hover:text-ink'
              }`}
            >
              Upcoming (2)
            </button>
          </div>
        </div>
      </section>

      {/* Outreaches Cards Grid */}
      <section className="relative px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        <CurvedWaveBackground side="left" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-8">
          {filteredOutreaches.map((outreach) => {
            const isExpanded = expandedOutreachId === outreach.id;

            return (
              <div
                key={outreach.id}
                className="paper-card rounded-3xl overflow-hidden flex flex-col justify-between bg-white/95 backdrop-blur-xs border border-[#e7e2d8] shadow-xs hover:shadow-md transition-all"
              >
                <div>
                  {/* Card Image Banner */}
                  <div className="h-64 sm:h-72 overflow-hidden relative group">
                    <img
                      src={outreach.image}
                      alt={outreach.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Floating Badges */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex flex-wrap justify-between items-center gap-2">
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-heading font-bold shadow-xs ${
                            outreach.status === 'upcoming'
                              ? 'bg-primary text-white'
                              : 'bg-forest text-white'
                          }`}
                        >
                          {outreach.status === 'upcoming' ? 'Upcoming Mission' : 'Verified Report'}
                        </span>
                        <span className="bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-heading font-bold text-ink shadow-xs">
                          {outreach.pillar}
                        </span>
                      </div>

                      {outreach.month && (
                        <span className="bg-sand/90 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-heading font-semibold text-ink border border-[#e7e2d8]">
                          {outreach.month}
                        </span>
                      )}
                    </div>

                    {/* Bottom Floating Title Bar on Image */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[11px] font-medium tracking-wide text-white/80 block uppercase font-heading">
                        {outreach.theme}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-ink-muted mb-3 font-heading">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>{outreach.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        <span>{outreach.location}</span>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-ink mb-3 leading-snug">
                      {outreach.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-ink-light leading-relaxed mb-5 font-normal">
                      {outreach.description}
                    </p>

                    {/* Beneficiaries Target Badge */}
                    <div className="p-3.5 rounded-2xl bg-sand/80 border border-[#e7e2d8] flex items-center justify-between gap-3 mb-5">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-xs font-heading font-bold text-ink">Total Direct Reach:</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-primary">
                        {outreach.beneficiariesTarget}
                      </span>
                    </div>

                    {/* Strategic Focus Tags */}
                    {outreach.focusAreas && outreach.focusAreas.length > 0 && (
                      <div className="mb-5">
                        <span className="text-[10px] uppercase font-bold text-ink-muted block font-heading mb-2">
                          Core Strategic Focus Areas
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {outreach.focusAreas.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] bg-sand border border-[#e7e2d8] text-ink px-2.5 py-1 rounded-lg font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Community Deployments Accordion / Teaser */}
                    {outreach.deployments && outreach.deployments.length > 0 && (
                      <div className="mb-4">
                        <button
                          onClick={() => toggleExpand(outreach.id)}
                          className="w-full flex items-center justify-between p-3 rounded-xl bg-sand/60 hover:bg-sand border border-[#e7e2d8] text-xs font-heading font-bold text-ink transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-forest" />
                            <span>
                              {outreach.deployments.length} Community Field Deployments
                            </span>
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-ink-muted" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-ink-muted" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="mt-3 space-y-2.5 animate-fade-in">
                            {outreach.deployments.map((dep, dIdx) => (
                              <div
                                key={dIdx}
                                className="p-3.5 rounded-xl bg-white border border-[#e7e2d8] text-xs space-y-1 shadow-2xs"
                              >
                                <div className="flex flex-wrap items-center justify-between gap-1">
                                  <span className="font-heading font-bold text-primary">
                                    {dep.state}: {dep.location}
                                  </span>
                                  <span className="font-mono text-[11px] font-semibold text-forest bg-forest/10 px-2 py-0.5 rounded-md">
                                    {dep.beneficiaries}
                                  </span>
                                </div>
                                <p className="text-ink-light text-xs leading-relaxed">
                                  {dep.activity}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Authentic Community Quote */}
                    {outreach.feedback && (
                      <div className="p-3.5 rounded-xl bg-sand/40 border-l-3 border-primary text-xs italic text-ink-light mb-2">
                        {outreach.feedback}
                      </div>
                    )}

                    {outreach.needs && (
                      <div className="text-[11px] text-ink-muted mt-2">
                        <span className="font-semibold text-ink">Volunteer &amp; Resource Needs:</span>{' '}
                        {outreach.needs}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-6 sm:px-7 pb-6 pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#f0ece8]">
                  <button
                    onClick={() => setModalOutreach(outreach)}
                    className="text-xs font-heading font-bold text-ink hover:text-primary flex items-center gap-1.5 cursor-pointer py-1.5 transition-colors"
                  >
                    <span>View Full Field Report</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={onOpenDonate}
                    className="btn-primary text-xs px-5 py-2.5 flex items-center justify-center gap-2 cursor-pointer shadow-xs font-heading font-semibold"
                  >
                    <span>Support This Mission</span>
                    <Heart className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Detailed Modal for Complete Field Report */}
      {modalOutreach && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#e7e2d8] shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setModalOutreach(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-sand text-ink-muted hover:text-ink cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full mb-3 inline-block">
              {modalOutreach.month} • {modalOutreach.pillar}
            </span>

            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-ink mb-2">
              {modalOutreach.title}
            </h3>

            <p className="text-xs text-primary font-semibold mb-4">
              {modalOutreach.theme}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted mb-6 pb-4 border-b border-[#e7e2d8] font-heading">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{modalOutreach.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{modalOutreach.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-forest" />
                <span>{modalOutreach.beneficiariesTarget}</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xs uppercase font-bold text-ink mb-2 font-heading">
                Outreach Overview &amp; Executive Summary
              </h4>
              <p className="text-xs sm:text-sm text-ink-light leading-relaxed">
                {modalOutreach.description}
              </p>
            </div>

            {/* Strategic Focus Areas */}
            {modalOutreach.focusAreas && modalOutreach.focusAreas.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs uppercase font-bold text-ink mb-2 font-heading">
                  Strategic Focus Areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {modalOutreach.focusAreas.map((f, i) => (
                    <span
                      key={i}
                      className="text-xs bg-sand border border-[#e7e2d8] text-ink px-3 py-1 rounded-lg font-medium"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Community Deployments */}
            {modalOutreach.deployments && modalOutreach.deployments.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs uppercase font-bold text-ink mb-3 font-heading">
                  Community Breakdown &amp; Deliverables
                </h4>
                <div className="space-y-3">
                  {modalOutreach.deployments.map((dep, i) => (
                    <div key={i} className="p-4 rounded-xl bg-sand/60 border border-[#e7e2d8]">
                      <div className="flex justify-between items-start gap-2 mb-1.5">
                        <span className="font-heading font-bold text-xs text-ink">
                          {dep.state} — {dep.location}
                        </span>
                        <span className="font-mono text-xs font-bold text-primary shrink-0">
                          {dep.beneficiaries}
                        </span>
                      </div>
                      <p className="text-xs text-ink-light leading-relaxed">
                        {dep.activity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Community Feedback Quote */}
            {modalOutreach.feedback && (
              <div className="p-4 rounded-2xl bg-sand border border-[#e7e2d8] mb-6 text-xs italic text-ink leading-relaxed">
                {modalOutreach.feedback}
              </div>
            )}

            {modalOutreach.partners && (
              <p className="text-[11px] text-ink-muted mb-6">
                <span className="font-semibold text-ink font-heading">Implementation Partners:</span>{' '}
                {modalOutreach.partners}
              </p>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-[#e7e2d8]">
              <button
                onClick={() => setModalOutreach(null)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-ink-light hover:text-ink bg-sand cursor-pointer font-heading"
              >
                Close Report
              </button>
              <button
                onClick={() => {
                  setModalOutreach(null);
                  onOpenDonate();
                }}
                className="btn-primary text-xs px-6 py-2.5 rounded-full font-semibold font-heading cursor-pointer shadow-xs"
              >
                Support This Cause
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
