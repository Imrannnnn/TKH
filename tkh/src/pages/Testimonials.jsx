import React, { useState } from 'react';
import { Quote, Heart, Star, CheckCircle2 } from '../components/Icons';
import CurvedWaveBackground from '../components/CurvedWaveBackground';

export default function Testimonials({ onOpenDonate }) {
  const [filter, setFilter] = useState('all');

  const testimonials = [
    {
      category: 'beneficiaries',
      quote: "Before Ten Kind Hands brought solar power and desks, our pupils learned on bare floors and had to go home whenever rain clouds gathered. Today, attendance has soared to over 98% and our children read aloud with pride.",
      author: "Mrs. Amina Danjuma",
      role: "Headmistress",
      institution: "Gidan Community Primary School, Kaduna State",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQQGWfP843jg9B--X28bH3kY7kmY2rM-RwyKYSDm-bsUnfQbvDXkDy8BMxHUWccg_XEQmcecnxZfOwJoRao8BK1ub_XDpcFmNTpg8zQYcpr-IWNCe7L128bKJ0pd0-uu4bvavOIIp57fytZ9oQHeMYiS12cECI8NhMPdyi6OM2yfgRmIIqt8RjX_s82ReYq5NqXWizUZd2PzTiXcrUt4KWYMR7-goq6Su7eOMdrrXjzbsnQ5jHuh4a"
    },
    {
      category: 'beneficiaries',
      quote: "The mobile health clinic detected my child's severe pneumonia in time and provided all treatments free of charge. Having caring medical staff reach our remote hamlet is a blessing I will never forget.",
      author: "Grace Adebayo",
      role: "Mother of 3 & Community Health Advocate",
      institution: "Rural Women's Forum, Ogun State",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-1rpLxlm1obAePTSxJyaS6Ah86_U-UfW_flTtz9B6wqKSJx9MBYqGNkygy1ShkVhL0zuBP4GrJIxYoBr-i2tZV1Bgx9wXTgKbZY6QA0C_V6anKNI1VmOWKiwbuMBEV6xd5gSC8FcouNmTCOusckHKlpuegl8VjIkrCOK4MK4GMjUrSi3wq2mz19CI1j2STGL9cnYoIczDsPODO-nrtzegMnSdcp16C8GrzDcSZ5_xG-l9vIeYmgb1"
    },
    {
      category: 'beneficiaries',
      quote: "Ten Kind Hands does not dictate to us; they sit with village elders and ask what our youth need most. This is genuine dignity, respect for our culture, and true partnership.",
      author: "Chief Emeka Okafor",
      role: "Community Elder & Development Secretary",
      institution: "Oji River Council, Enugu State",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ7w8cRAa5Cz6-OlJkWBhqvWPoNzq5hWz_IkkVN9KsBBy7YVQt96MmRiLbFiv0xS5s1d-guFIU3QMWDhgmKqAiipwKuQqm-2g4a1Q8hd2HzGbeVOorSAOO5SoSkJLKq1-7S4MbJS58prndFEizAy8Rm3xtqcNWnL5py9pgEFAEXzFO7RxipzxkBJgsa6C_8W036kIhz2BsLQBljemMMIBPS-yT-l6igz1t3N2YQn7qe1HBmqtTGvg"
    },
    {
      category: 'volunteers',
      quote: "Serving as a volunteer doctor on the Kaduna medical mission was the most grounding experience of my clinical career. Seeing 100% of donated drugs reach patients directly restored my faith in grassroots charity.",
      author: "Dr. Chinedu Eze",
      role: "Volunteer Pediatrician",
      institution: "Lagos University Teaching Hospital",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBD47dBTKUN-hSEFSaQDu29FKAW8EszhzB3bekiJa_TiddII_PzNGDo-TqEVpHXSP24gytsxNHSiEhRi9YMHDtotncoZJEVLV4FbBJ-JHDQFb--fmf7R-eTa9haWV_OcebR4Qyk7huQhFgeA_Be27P-vIUKIzzHib7KJpLJbU02XZCKGN_ZJ1s8k413CcVXJSm6xUywnTZJszILEtQj6s5BD3V9XBFKN1dcFRekfoF1qXKkZukTLBm"
    },
    {
      category: 'donors',
      quote: "What sets TKH apart is their radical financial honesty. Getting an email with GPS coordinates and photos of the exact classroom block my monthly contribution helped build was deeply moving.",
      author: "Farida Mohammed",
      role: "Monthly Impact Sustainer",
      institution: "Abuja, Nigeria",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-1rpLxlm1obAePTSxJyaS6Ah86_U-UfW_flTtz9B6wqKSJx9MBYqGNkygy1ShkVhL0zuBP4GrJIxYoBr-i2tZV1Bgx9wXTgKbZY6QA0C_V6anKNI1VmOWKiwbuMBEV6xd5gSC8FcouNmTCOusckHKlpuegl8VjIkrCOK4MK4GMjUrSi3wq2mz19CI1j2STGL9cnYoIczDsPODO-nrtzegMnSdcp16C8GrzDcSZ5_xG-l9vIeYmgb1"
    },
    {
      category: 'partners',
      quote: "Our diaspora foundation has partnered with Ten Kind Hands across three Nigerian states. Their operational discipline and flawless accounting make them our most trusted on-ground implementation partner.",
      author: "Dr. Anthony Nwankwo",
      role: "Director of International Giving",
      institution: "UK-Nigeria Diaspora Health Trust",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQQGWfP843jg9B--X28bH3kY7kmY2rM-RwyKYSDm-bsUnfQbvDXkDy8BMxHUWccg_XEQmcecnxZfOwJoRao8BK1ub_XDpcFmNTpg8zQYcpr-IWNCe7L128bKJ0pd0-uu4bvavOIIp57fytZ9oQHeMYiS12cECI8NhMPdyi6OM2yfgRmIIqt8RjX_s82ReYq5NqXWizUZd2PzTiXcrUt4KWYMR7-goq6Su7eOMdrrXjzbsnQ5jHuh4a"
    }
  ];

  const filtered = filter === 'all'
    ? testimonials
    : testimonials.filter((t) => t.category === filter);

  return (
    <div className="pt-24 md:pt-28 animate-fade-in bg-white pb-20">
      {/* Header with Ambient Wave */}
      <section className="relative py-12 md:py-16 px-4 md:px-8 max-w-5xl mx-auto text-center overflow-hidden">
        <CurvedWaveBackground side="right" />

        <div className="relative z-10">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
            Authentic Voices
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-ink max-w-3xl mx-auto mb-6 tracking-tight">
            Letters &amp; Stories from <br />
            <span className="text-primary">Those Who Live the Impact.</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-light max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            Read unedited testimonials from community headmistresses, mothers, volunteer doctors, and institutional donor partners.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${
                filter === 'all'
                  ? 'bg-ink text-white'
                  : 'bg-sand text-ink-light hover:text-ink'
              }`}
            >
              All Testimonials (6)
            </button>
            <button
              onClick={() => setFilter('beneficiaries')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${
                filter === 'beneficiaries'
                  ? 'bg-primary text-white'
                  : 'bg-sand text-ink-light hover:text-ink'
              }`}
            >
              Community Leaders &amp; Mothers (3)
            </button>
            <button
              onClick={() => setFilter('volunteers')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${
                filter === 'volunteers'
                  ? 'bg-forest text-white'
                  : 'bg-sand text-ink-light hover:text-ink'
              }`}
            >
              Volunteer Doctors (1)
            </button>
            <button
              onClick={() => setFilter('donors')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${
                filter === 'donors'
                  ? 'bg-clay text-white'
                  : 'bg-sand text-ink-light hover:text-ink'
              }`}
            >
              Donors &amp; Partners (2)
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Bento Cards with Mirrored Wave */}
      <section className="relative px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        <CurvedWaveBackground side="left" />

        <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white/95 backdrop-blur-xs border border-[#e7e2d8] flex flex-col justify-between shadow-xs hover:border-primary/40 transition-colors"
            >
              <div>
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-sm text-ink-light italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#f0ece8] flex items-center gap-3.5">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-11 h-11 rounded-full object-cover border border-[#e7e2d8]"
                />
                <div>
                  <h4 className="text-sm font-heading font-bold text-ink">{t.author}</h4>
                  <p className="text-xs text-ink-muted">{t.role}</p>
                  <span className="text-[11px] text-primary font-medium block">{t.institution}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-16">
          <button
            onClick={onOpenDonate}
            className="btn-primary text-sm px-8 py-3.5 inline-flex items-center gap-2 cursor-pointer shadow-md font-heading font-semibold"
          >
            <span>Create a New Story of Dignity</span>
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
