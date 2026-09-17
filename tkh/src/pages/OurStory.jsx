import { useData } from '../context/DataContext';
import { BookOpen, Heart, HandHeart, School, Sun, Stethoscope, ShieldCheck, Users, TrendingUp } from '../components/Icons';
import CurvedWaveBackground from '../components/CurvedWaveBackground';

export default function OurStory({ onOpenDonate }) {
  const { storyContent } = useData();
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
      title: 'Our Foundation & Devotion',
      description: 'Ten Kind Hands is an NGO based in Nigeria, devoted to enhancing the lives of disadvantaged women, children, and families via educational and medical programs.',
      icon: Heart,
      color: 'text-primary'
    },
    {
      title: 'A Fundamental Human Right',
      description: 'We consider access to decent education and medical care for all children, regardless of their socioeconomic situation, a fundamental human right.',
      icon: ShieldCheck,
      color: 'text-forest'
    },
    {
      title: 'Breaking the Poverty Cycle',
      description: 'To assist disadvantaged women and children break the cycle of poverty and build brighter futures, it is our aim to give them access to healthcare and quality education.',
      icon: TrendingUp,
      color: 'text-clay'
    },
    {
      title: 'Realizing Full Potential',
      description: 'We strive to ensure that for as many as we can support, we enable them live healthy, productive lives and realize their full potential.',
      icon: Sun,
      color: 'text-amber-600'
    },
    {
      title: 'Primary Focus on Education',
      description: 'Our primary focus is on education. We work to enroll as many children as possible in schools, especially in isolated and underserved areas where access is difficult.',
      icon: School,
      color: 'text-primary'
    },
    {
      title: 'Scholarships & Learning Facilities',
      description: 'To pay for tuition, transportation, and other associated costs, we provide scholarships, financial aid, and support. Additionally, we collaborate with nearby schools to upgrade their facilities and make studying easier, such as by constructing classrooms, libraries, and computer laboratories.',
      icon: BookOpen,
      color: 'text-forest'
    },
    {
      title: 'Comprehensive Healthcare Access',
      description: 'We also acknowledge that healthcare plays a crucial part in enhancing the well-being of women and children, which is why we provide them access to fundamental medical services like immunizations, prenatal care, maternal health, and child nutrition plans. To give women and families the knowledge they need to make informed health decisions, we also run health awareness campaigns and offer training in family planning, nutrition, and cleanliness.',
      icon: Stethoscope,
      color: 'text-emerald-800'
    },
    {
      title: 'Devoted Volunteers & Community',
      description: 'A group of devoted and enthusiastic volunteers participate in ensuring we grow our impact story by collaborating closely with schools, regional governments, other stakeholders, and local communities to make sure that our mission is carried out.',
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Continuous Review & Donor Trust',
      description: 'We undertake a continuous review of our programs and initiatives to ensure that they continue to impact those who need them the most. We value the support of our kind donors who enable us to realize our objective of improving the lives of women and children across Africa.',
      icon: HandHeart,
      color: 'text-forest'
    }
  ];

  const managementTeam = [
    {
      name: 'John Iyalla',
      role: 'Founder',
      badge: 'Founder',
      initials: 'JI',
      image: null,
      description: 'Visionary behind Ten Kind Hands, championing a radical 100% direct-giving model to bring transformative education and healthcare to vulnerable communities.'
    },
    {
      name: 'Suotonye Augustine Arthur',
      role: 'Country Head',
      badge: 'Country Leadership',
      initials: 'SA',
      image: '/images/Suotonye Augustine Arthur - Country Head.jpeg',
      description: 'Oversees country-wide program execution, institutional donor relations, and high-impact partnerships across state governments and communities.'
    },

    {
      name: 'Ahange Kumawuese Keziah',
      role: 'Finance Manager',
      badge: 'Finance & Accounts',
      initials: 'AK',
      image: '/images/Ahange Kumawuese Keziah  Finance Manager..jpeg',
      description: 'Drives financial stewardship, strict accounting controls, and transparent reporting ensuring 100% of donor funding goes directly to field impact.'
    },
    {
      name: 'Anedo Deborah',
      role: 'Human Resource',
      badge: 'People & Culture',
      initials: 'AD',
      image: '/images/Anedo Deborah Human resource.jpeg',
      description: 'Spearheads talent development, medical volunteer mobilization, and workforce operations supporting our teams across rural missions.'
    },
    {
      name: 'Abubakar Muhammed',
      role: 'Accountant',
      badge: 'Financial Audit',
      initials: 'AM',
      image: '/images/Abubakar Muhammed Accountant.jpeg',
      description: 'Ensures ledger accuracy, audit-readiness, and meticulous disbursement records for all classroom, medical, and community relief initiatives.'
    },

    {
      name: 'Ibrahim Favour Adoba',
      role: 'Project Manager',
      badge: 'Field Operations',
      initials: 'IF',
      image: '/images/Ibrahim Favour Adoba - Project Manager.jpeg',
      description: 'Leads frontline project deployment, monitoring school solar renovations, clean water drilling, and rural clinic logistics on the ground.'
    },
  ];

  const stateCoordinators = [
    {
      name: 'Job Orokpo Agada',
      role: 'Benue State Coordinator',
      badge: 'Benue State',
      initials: 'JA',
      image: '/images/Job orokpo Agada Benue state coordinator.jpeg',
      description: 'Coordinates community engagement, education scholarships, and frontline healthcare mission delivery across Benue State communities.'
    },
    {
      name: 'Talabi Oluwaseyi Hannah',
      role: 'Oyo State Project Coordinator',
      badge: 'Oyo State',
      initials: 'TH',
      image: '/images/Talabi Oluwaseyi Hannah Oyo State Project Coordinator.jpeg',
      description: 'Spearheads grassroots school renovations, solar infrastructure projects, and local stakeholder partnerships in Oyo State.'
    },
    {
      name: 'Hassan Habeeb Adebayo',
      role: 'Lagos State Project Coordinator',
      badge: 'Lagos State',
      initials: 'HA',
      image: '/images/lagos State Project Cordinator Hassan Habeeb Adebayo.jpeg',
      description: 'Leads urban outreach missions, student sponsorship distribution, and volunteer logistics across underserved Lagos communities.'
    },
    {
      name: 'Ibrahim Nzoyu Vivian',
      role: 'FCT Coordinator',
      badge: 'FCT Abuja',
      initials: 'IV',
      image: '/images/FCT coordinator IBRAHIM NZOYU VIVIAN.jpeg',
      description: 'Directs community outreach, educational support programs, and healthcare mission delivery across the Federal Capital Territory.'
    },
    {
      name: 'Oluwadiya Tobi Elijah',
      role: 'Plateau State Coordinator',
      badge: 'Plateau State',
      initials: 'OE',
      image: '/images/Oluwadiya Tobi Elijah Plateau State Coordinator.jpeg',
      description: 'Coordinates grassroots educational initiatives, youth engagement, and community welfare projects throughout Plateau State.'
    }
  ];

  const displayManagementTeam = storyContent?.leadership?.length > 0 ? storyContent.leadership : managementTeam;
  const displayStateCoordinators = storyContent?.stateCoordinators?.length > 0 ? storyContent.stateCoordinators : stateCoordinators;
  const displayVision = storyContent?.visionStatement || 'A world where every child has access to quality education, and every woman and child has access to comprehensive healthcare. We strive to break the cycle of poverty and increase the overall well-being of communities by empowering children through education and promoting the health and well-being of women and children.';

  return (
    <div className="pt-24 md:pt-28 animate-fade-in bg-white pb-20">
      {/* Editorial Story Header with Ambient Wave */}
      <section className="relative py-12 md:py-16 px-4 md:px-8 max-w-5xl mx-auto text-center overflow-hidden">
        <CurvedWaveBackground side="right" />

        <div className="relative z-10">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
            Mission • Vision • Values
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-ink max-w-3xl mx-auto mb-6 tracking-tight">
            A seed planted in hope. <br />
            <span className="text-primary">A forest grown in dignity.</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-light max-w-2xl mx-auto mb-10 leading-relaxed font-normal"> vision </p>


          <p className="text-base sm:text-lg text-ink-light max-w-2xl mx-auto mb-10 leading-relaxed font-normal">{displayVision}
          </p>

          <div className="w-full h-64 sm:h-80 md:h-[450px] rounded-3xl overflow-hidden relative border border-[#e7e2d8] shadow-xs">
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

            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink">
              Mission
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-ink-light leading-relaxed">
              To improve the lives of women and children by providing educational opportunities and healthcare services that promote better health outcomes and a brighter future.
            </p>

            <div className="p-4 rounded-xl bg-sand border-l-2 border-primary text-xs italic text-ink-light leading-relaxed mt-4">
              "When you empower a widow with a livelihood, equip a child with the tools to learn, or give a young person the skills to earn, you do more than meet an immediate need — you create a ripple of hope, dignity, and lasting change across an entire community."
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-[#e7e2d8]">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
            Who we are
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink">
            Principles that govern every project.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => {
            const IconComponent = v.icon;
            return (
              <div key={i} className="p-6 rounded-2xl bg-sand border border-[#e7e2d8] flex flex-col justify-between hover:border-primary/40 hover:shadow-xs transition-all">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#e7e2d8] flex items-center justify-center">
                      <IconComponent className={`w-5 h-5 ${v.color}`} />
                    </div>
                    <span className="font-mono text-xs font-bold text-ink-muted/60 bg-white/70 px-2.5 py-1 rounded-full border border-[#e7e2d8]">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-ink mb-2">{v.title}</h3>
                  <p className="text-xs text-ink-light leading-relaxed">{v.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Leadership & Management Team */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-[#e7e2d8]">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
            Leadership &amp; Governance
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink mb-3">
            The Management Team
          </h2>
          <p className="text-sm text-ink-light leading-relaxed">
            Meet the dedicated leaders and ground coordinators driving our education, healthcare, and community empowerment initiatives across Nigeria.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayManagementTeam.map((member) => (
            <div
              key={member.name}
              className="bg-sand/60 rounded-3xl border border-[#e7e2d8] p-5 sm:p-8 flex flex-col items-center text-center shadow-xs hover:border-primary/40 hover:shadow-md transition-all group"
            >
              {member.image ? (
                <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-[#e7e2d8] group-hover:border-primary/40 shadow-xs mb-5 bg-white shrink-0">
                  <img
                    src={encodeURI(member.image)}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/15 via-sand to-forest/15 flex flex-col items-center justify-center shadow-xs mb-5 shrink-0 group-hover:border-primary/50 transition-all">
                  <span className="font-heading font-extrabold text-3xl sm:text-4xl text-primary mb-1">
                    {member.initials}
                  </span>
                  <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-ink-muted">
                    {member.badge}
                  </span>
                </div>
              )}

              <span className="px-3 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider font-heading mb-2 bg-white text-primary border border-[#e7e2d8]">
                {member.badge}
              </span>

              <h3 className="text-lg font-heading font-bold text-ink mb-1 group-hover:text-primary transition-colors">
                {member.name}
              </h3>

              <p className="text-xs font-bold text-forest font-heading mb-3">
                {member.role}
              </p>

              <p className="text-xs text-ink-light leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* State Coordinators Team */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-[#e7e2d8]">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
            Regional Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink mb-3">
            State Coordinators Team
          </h2>
          <p className="text-sm text-ink-light leading-relaxed">
            Our state coordinators drive ground-level initiatives, maintaining strong community ties and ensuring projects are delivered directly where the need is greatest.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayStateCoordinators.map((coordinator) => (
            <div
              key={coordinator.name}
              className="bg-sand/60 rounded-3xl border border-[#e7e2d8] p-5 sm:p-8 flex flex-col items-center text-center shadow-xs hover:border-primary/40 hover:shadow-md transition-all group"
            >
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-[#e7e2d8] group-hover:border-primary/40 shadow-xs mb-5 bg-white shrink-0">
                <img
                  src={encodeURI(coordinator.image)}
                  alt={coordinator.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <span className="px-3 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider font-heading mb-2 bg-white text-forest border border-[#e7e2d8]">
                {coordinator.badge}
              </span>

              <h3 className="text-lg font-heading font-bold text-ink mb-1 group-hover:text-primary transition-colors">
                {coordinator.name}
              </h3>

              <p className="text-xs font-bold text-primary font-heading mb-3">
                {coordinator.role}
              </p>

              <p className="text-xs text-ink-light leading-relaxed">
                {coordinator.description}
              </p>
            </div>
          ))}
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
              className="btn-primary w-full sm:w-auto text-xs sm:text-sm px-6 sm:px-8 py-3.5 inline-flex items-center justify-center gap-2 cursor-pointer shadow-md font-heading font-semibold"
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
