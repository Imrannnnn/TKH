import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Calendar, MapPin, Heart } from '../components/Icons';
import CurvedWaveBackground from '../components/CurvedWaveBackground';

export default function Outreaches({ onOpenDonate }) {
  const { outreaches: dynamicOutreaches } = useData();
  const [filter, setFilter] = useState('all');

  const defaultOutreaches = [
    {
      id: 'outreach-1',
      status: 'upcoming',
      title: 'Q4 2026 Primary School Book & Uniform Distribution Drive',
      location: 'Ikwerre & Emohua Districts, Rivers State',
      date: 'October 17–19, 2026',
      pillar: 'Education',
      beneficiariesTarget: '1,200 Primary Pupils',
      description: 'Delivering full uniform sets, branded exercise books, mathematics geometry sets, and 30 dual-seater desks across four rural community schools.',
      needs: 'Volunteer teachers, logistics drivers, packing assistants.',
      image: '/images/IMG_0294.JPG'
    },
    {
      id: 'outreach-2',
      status: 'upcoming',
      title: 'Rural Maternal Health & Malaria Screening Mission',
      location: 'Kajuru & Kachia Hamlets, Southern Kaduna',
      date: 'November 6–8, 2026',
      pillar: 'Healthcare',
      beneficiariesTarget: '800+ Mothers & Infants',
      description: 'Free rapid malaria testing, antenatal checks, distribution of 300 Mama Kits (sterile birth packs), and pediatric deworming treatments.',
      needs: 'Volunteer doctors, registered nurses, pharmacist assistants.',
      image: '/images/IMG_0995.JPG'
    },
    {
      id: 'outreach-3',
      status: 'completed',
      title: 'Solar Deep Aquifer Borehole Commissioning',
      location: 'Ijebu North Hamlets, Ogun State',
      date: 'August 8, 2026',
      pillar: 'Infrastructure',
      beneficiariesTarget: '2,500 Community Residents',
      description: 'Completed drilling of a 95-meter deep solar-powered borehole with an 8-spigot distribution station and local water management committee training.',
      needs: 'Project fully delivered and handed over to village council.',
      image: '/images/food-distribution.jpg'
    },
    {
      id: 'outreach-4',
      status: 'completed',
      title: 'Enugu Rural Mobile Health Mission',
      location: 'Oji River District, Enugu State',
      date: 'July 24–27, 2026',
      pillar: 'Healthcare',
      beneficiariesTarget: '654 Patients Treated',
      description: 'Conducted comprehensive outpatient clinic, malaria diagnostics, and dispensed 1,200+ prescription medications at zero cost to patients.',
      needs: 'Project fully delivered.',
      image: '/images/IMG_0300.JPG'
    }
  ];

  const currentOutreaches = dynamicOutreaches && dynamicOutreaches.length > 0 ? dynamicOutreaches : defaultOutreaches;

  const filteredOutreaches = filter === 'all'
    ? currentOutreaches
    : currentOutreaches.filter((o) => o.status === filter);

  return (
    <div className="pt-24 md:pt-28 animate-fade-in bg-white pb-20">
      {/* Header with Ambient Wave */}
      <section className="relative py-12 md:py-16 px-4 md:px-8 max-w-5xl mx-auto text-center overflow-hidden">
        <CurvedWaveBackground side="right" />

        <div className="relative z-10">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
            Field Operations
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-ink max-w-3xl mx-auto mb-6 tracking-tight">
            Upcoming &amp; Completed <br />
            <span className="text-primary">Community Missions.</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-light max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            Track our scheduled field deployments, register to volunteer on the ground, or inspect post-mission outcome reports.
          </p>

          {/* Filter Pills */}
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${
                filter === 'all'
                  ? 'bg-ink text-white'
                  : 'bg-sand text-ink-light hover:text-ink'
              }`}
            >
              All Missions
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${
                filter === 'upcoming'
                  ? 'bg-primary text-white'
                  : 'bg-sand text-ink-light hover:text-ink'
              }`}
            >
              Upcoming (2)
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${
                filter === 'completed'
                  ? 'bg-forest text-white'
                  : 'bg-sand text-ink-light hover:text-ink'
              }`}
            >
              Completed (2)
            </button>
          </div>
        </div>
      </section>

      {/* Outreaches Cards with Mirrored Wave */}
      <section className="relative px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        <CurvedWaveBackground side="left" />

        <div className="relative z-10 grid md:grid-cols-2 gap-8">
          {filteredOutreaches.map((outreach) => (
            <div
              key={outreach.id}
              className="paper-card rounded-3xl overflow-hidden flex flex-col justify-between bg-white/95 backdrop-blur-xs shadow-xs"
            >
              <div>
                <div className="h-60 overflow-hidden relative">
                  <img
                    src={outreach.image}
                    alt={outreach.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-heading font-bold shadow-xs ${
                      outreach.status === 'upcoming'
                        ? 'bg-primary text-white'
                        : 'bg-forest text-white'
                    }`}>
                      {outreach.status === 'upcoming' ? 'Upcoming Mission' : 'Verified Completed'}
                    </span>
                    <span className="bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] font-heading font-bold text-ink shadow-xs">
                      {outreach.pillar}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted mb-3 font-heading">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>{outreach.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span>{outreach.location}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-ink mb-3 leading-snug">
                    {outreach.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-ink-light leading-relaxed mb-6">
                    {outreach.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-sand/90 border border-[#e7e2d8] space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-heading font-bold text-ink">Beneficiaries Target:</span>
                      <span className="font-mono font-bold text-primary">{outreach.beneficiariesTarget}</span>
                    </div>
                    <div className="text-[11px] text-ink-muted">
                      <span className="font-semibold text-ink">Volunteer / Resource Need:</span> {outreach.needs}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-8 pb-8 pt-2 flex items-center justify-between border-t border-[#f0ece8]">
                <button
                  onClick={onOpenDonate}
                  className="btn-primary text-xs px-6 py-2.5 flex items-center gap-2 cursor-pointer shadow-xs font-heading font-semibold"
                >
                  <span>Support This Mission</span>
                  <Heart className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
