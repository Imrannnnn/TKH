import React from 'react';
import { BookOpen, Heart, HandHeart, School, Sun, Stethoscope, ShieldCheck, Compass, Users, CheckCircle2, ArrowRight } from '../components/Icons';
import CurvedWaveBackground from '../components/CurvedWaveBackground';

export default function OurStory({ onOpenDonate, setCurrentPage }) {
  const milestones = [
    {
      year: '2015',
      title: 'Under the Neem Tree in Zaria',
      location: 'Kaduna State',
      description: 'Started as a weekend reading circle with 15 children who had never attended formal primary school. Three volunteer teachers pooled allowances for exercise books and pencils.',
      impact: '15 Pupils • 3 Volunteer Teachers'
    },
    {
      year: '2018',
      title: 'First Permanent Solar Classroom Block',
      location: 'Ogun State',
      description: 'Constructed an insulated 3-classroom block with solar roof lighting, durable wooden desks, and an attached clean water borehole so pupils never walked thirsty.',
      impact: '320 Students • 1st Dedicated Learning Post'
    },
    {
      year: '2021',
      title: 'Deploying Off-Road Mobile Clinics',
      location: 'Kaduna & Enugu Rural Hamlets',
      description: 'Acquired 4x4 vehicles equipped with rapid malaria tests, cold-chain infant vaccines, and maternal birth supplies, traveling where roads end.',
      impact: '5,000+ Screenings Conducted'
    },
    {
      year: '2024–Present',
      title: 'A Replicable Model Across Nigeria',
      location: '12 Districts Nationwide',
      description: 'Operating 45 partner schools, 12 clinics, and 28 water boreholes with 100% local community ownership and zero cuts from individual donor funds.',
      impact: 'Over 20,000 Lives Touched'
    }
  ];

  const values = [
    {
      title: 'Agency Over Handouts',
      description: 'We do not arrive with pre-packaged assumptions. We sit with village councils, elders, and mothers to design projects the community owns and sustains.',
      icon: HandHeart,
      color: 'text-primary'
    },
    {
      title: 'Radical Financial Honesty',
      description: 'Every naira and dollar is tracked with itemized public accounting, GPS-tagged project photos, and independent certified audits.',
      icon: ShieldCheck,
      color: 'text-forest'
    },
    {
      title: 'Self-Reliant Infrastructure',
      description: 'We install robust solar electricity and deep water aquifers with local maintenance committees, eliminating reliance on unstable national grids.',
      icon: Sun,
      color: 'text-clay'
    },
    {
      title: 'Unconditional Dignity',
      description: 'Access to safe learning and primary healthcare is a fundamental human right — never a transactional favor or reason to pity.',
      icon: Heart,
      color: 'text-emerald-800'
    }
  ];

  return (
    <div className="pt-24 md:pt-28 animate-fade-in bg-white pb-20">
      {/* Editorial Story Header with Ambient Wave */}
      <section className="relative py-12 md:py-16 px-4 md:px-8 max-w-5xl mx-auto text-center overflow-hidden">
        <CurvedWaveBackground side="right" />

        <div className="relative z-10">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
            Origin &amp; Philosophy
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-ink max-w-3xl mx-auto mb-6 tracking-tight">
            A seed planted in hope. <br />
            <span className="text-primary">A forest grown in dignity.</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-light max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            From three friends teaching under a tree in 2015 to a nationwide grassroots movement bringing solar classrooms and medical care to remote Nigeria.
          </p>

          <div className="w-full h-80 sm:h-[450px] rounded-3xl overflow-hidden relative border border-[#e7e2d8] shadow-xs">
            <img
              className="w-full h-full object-cover"
              alt="Community outreach gathering in Nigeria"
              src="/images/IMG_0294.JPG"
            />
          </div>
        </div>
      </section>

      {/* Genesis Essay */}
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto border-b border-[#e7e2d8]">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-[#e7e2d8] p-2 bg-sand">
              <img
                className="w-full h-80 rounded-xl object-cover"
                alt="Ten Kind Hands Leadership & Outreach Team"
                src="/images/IMG_0300.JPG"
              />
              <div className="pt-2 px-1 text-center">
                <span className="text-xs font-bold text-ink block font-heading">Ten Kind Hands Leadership</span>
                <span className="text-[11px] text-ink-muted">Empowering African Women &amp; Children</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-4">
            <span className="text-xs uppercase tracking-widest text-primary font-bold block font-heading">
              The First Step
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink">
              We stopped waiting for someone else to act.
            </h2>
            <p className="text-sm text-ink-light leading-relaxed">
              In 2015, during a rural medical outreach in Kaduna State, we met children who had never seen a printed book. When rainfall began, open-air classes dissolved. When malaria hit, families walked 14 kilometers carrying sick infants to distant dispensaries.
            </p>
            <p className="text-sm text-ink-light leading-relaxed">
              We did not wait for international bureaucracy. We brought together ten friends, pooled our personal monthly allowances, and built a roof over the children. We chose the name <strong>Ten Kind Hands</strong> as a quiet reminder: sustainable transformation does not require magic — it requires willing, committed human hands.
            </p>
            <div className="p-4 rounded-xl bg-sand border-l-2 border-primary text-xs italic text-ink-light leading-relaxed mt-4">
              "When you build a clean classroom with solar power and bring medicine to a mother's doorstep, you do not just save one life — you awaken the potential of an entire village."
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-[#e7e2d8]">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
            Our Moral Compass
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink">
            Principles that govern every project.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const IconComponent = v.icon;
            return (
              <div key={i} className="p-6 rounded-2xl bg-sand border border-[#e7e2d8] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#e7e2d8] flex items-center justify-center mb-4">
                    <IconComponent className={`w-5 h-5 ${v.color}`} />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-ink mb-2">{v.title}</h3>
                  <p className="text-xs text-ink-light leading-relaxed">{v.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Timeline Journey with Mirrored Wave */}
      <section className="relative py-20 px-4 md:px-8 max-w-4xl mx-auto overflow-hidden">
        <CurvedWaveBackground side="left" />

        <div className="relative z-10">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
              A Decade of Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink">
              Milestones along the way.
            </h2>
          </div>

          <div className="space-y-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="p-6 sm:p-8 rounded-2xl bg-white/95 backdrop-blur-xs border border-[#e7e2d8] flex flex-col sm:flex-row gap-6 items-start justify-between shadow-xs">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-3xl font-bold text-primary">
                    {m.year}
                  </span>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-ink-muted block">{m.location}</span>
                    <h3 className="text-xl font-heading font-bold text-ink">{m.title}</h3>
                  </div>
                </div>
                <div className="sm:max-w-md">
                  <p className="text-xs text-ink-light leading-relaxed mb-3">
                    {m.description}
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full bg-sand text-[11px] font-semibold text-primary border border-[#e7e2d8]">
                    {m.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-16">
            <button
              onClick={onOpenDonate}
              className="btn-primary text-sm px-8 py-3.5 inline-flex items-center gap-2 cursor-pointer shadow-md font-heading font-semibold"
            >
              <span>Partner With Our Mission</span>
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
