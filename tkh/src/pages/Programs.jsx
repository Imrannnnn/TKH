import { useState, useEffect } from 'react';
import { School, Stethoscope, BookOpen, Users, Laptop, HandHeart, ArrowRight, ArrowLeft, Heart, Quote, MapPin, CheckCircle2 } from '../components/Icons';
import CurvedWaveBackground from '../components/CurvedWaveBackground';

const programsData = [
  {
    id: 'scholarship',
    aliases: ['scholarships'],
    number: '01',
    pillar: 'Education',
    badge: 'Education Pillar',
    title: 'Scholarship',
    tagline: 'Keeping eager learners in school, erasing financial barriers, and securing a bright future for all.',
    states: 'FCT Abuja, Oyo, Lagos, Plateau, and Benue.',
    leadStat: '340+ Students on Active Scholarship',
    budgetGoal: '₦45,000 / Student / Term',
    fundedPercent: 84,
    icon: School,
    color: 'text-primary',
    whatThisAccomplishes: 'Removing the cost of staying in school. Equipping underprivileged children with everything they need to succeed: complete tuition, official exam registration, and custom school uniforms.',
    whoWeReachAndEmpower: 'Students at risk of dropping out. We champion primary and secondary students at severe risk of leaving school due to financial strain, giving vulnerable children the safety net they deserve.',
    howWeBringThisToLife: [
      {
        step: '01',
        title: 'Finding the Right Partners',
        desc: 'We team up with community leaders and school heads to find the children who need us most.'
      },
      {
        step: '02',
        title: 'Verifying Real Needs',
        desc: 'We visit homes to verify needs firsthand and set a baseline for academic tracking.'
      },
      {
        step: '03',
        title: 'Direct Disbursement',
        desc: 'We handle school fees, uniform fittings, and material costs directly through the institution.'
      },
      {
        step: '04',
        title: 'Regular Check-ins & Audits',
        desc: 'We run regular check-ins, tracking report cards and attendance to keep students thriving term after term.'
      }
    ],
    realStory: {
      name: 'Halima Yusuf (Age 11)',
      location: 'Zaria Rural, Kaduna',
      story: 'Halima lost her father in 2022 and was out of school for two terms helping her mother sell groundnuts. In 2023, she received a TKH full scholarship. Today, she consistently ranks 1st in her primary 5 class and dreams of becoming a pediatric doctor.'
    },
    stats: [
      { label: 'Scholarships Awarded', val: '340+' },
      { label: 'Term Retention Rate', val: '98.5%' },
      { label: 'Partner Schools Enrolled', val: '24' }
    ],
    ctaText: 'Sponsor a Child\'s Scholarship',
    testimonials: [
      {
        quote: "Without Ten Kind Hands paying my son's fees, he would have stopped at Primary 4. Today he is preparing for his secondary entrance exams with flying colors.",
        author: 'Musa Ibrahim',
        role: 'Father & Subsistence Farmer, Kaduna'
      }
    ]
  },
  {
    id: 'youth-empowerment',
    aliases: ['youth-development'],
    number: '02',
    pillar: 'Education',
    badge: 'Vocational & Tech Pillar',
    title: 'Youth Empowerment',
    tagline: 'Equipping young minds with digital and practical vocational skills to shape their futures.',
    states: 'FCT Abuja, Lagos, Ogun, and Rural Grassroots Settlements.',
    leadStat: '1,100+ Youth Certified & Mentored',
    budgetGoal: '₦1,800,000 / Tech Pod',
    fundedPercent: 72,
    icon: Laptop,
    color: 'text-primary',
    whatThisAccomplishes: 'Turning idle time into earning power. Keeping brilliant minds off the streets, giving them a head start with hands-on skills and dedicated mentorship.',
    whoWeReachAndEmpower: 'Rural teenagers and young school leavers. We focus on adolescents in underserved communities who lack access to opportunities, technology, and technical training, equipping them with the tools to thrive and build sustainable careers.',
    howWeBringThisToLife: [
      {
        step: '01',
        title: 'Community Identification',
        desc: 'Teaming up with local youth leaders and schools to spot adolescents eager to learn digital and vocational skills.'
      },
      {
        step: '02',
        title: 'Environment & Interest Mapping',
        desc: "Identifying each young person's interests and understanding which vocational tracks actually work in their local environment."
      },
      {
        step: '03',
        title: 'Readiness Assessment',
        desc: 'Evaluating local needs and setting up practical training tracks tailored to real-world market demand.'
      },
      {
        step: '04',
        title: 'Direct Skills Deployment',
        desc: 'Providing hands-on classes, equipment access, and expert instructors straight to the grassroots level, with no barriers.'
      },
      {
        step: '05',
        title: 'Ongoing Progress & Mentorship',
        desc: 'Tracking skill growth, project milestones, and career pathways to ensure long-term independence and success.'
      },
      {
        step: '06',
        title: 'Startup & Tool Support',
        desc: 'Equipping outstanding graduates with essential startup tools and workspace resources once they have mastered their skills.'
      }
    ],
    realStory: {
      name: 'Emmanuel Chinedu (Age 17)',
      location: 'Karmo Satellite, Abuja',
      story: 'Emmanuel had never touched a physical laptop before attending TKH Youth Digital Bootcamps. Within six months, he learned data entry and graphic basics, and now freelances locally to support his tertiary polytechnic application.'
    },
    stats: [
      { label: 'Youth Certified', val: '1,100+' },
      { label: 'Vocational Tracks', val: '6 Tracks' },
      { label: 'Startup Toolkits Awarded', val: '180+' }
    ],
    ctaText: 'Fund Youth Skills & Startup Tools',
    testimonials: [
      {
        quote: "The practical classes and tool grants opened a whole new future for our young people. They now build trade businesses with genuine pride.",
        author: 'Pastor Samuel Udoh',
        role: 'Youth Leader, Community Outreach'
      }
    ]
  },
  {
    id: 'orphanage-outreaches',
    aliases: ['orphanages-outreaches'],
    number: '03',
    pillar: 'Healthcare',
    badge: 'Community & Care Pillar',
    title: 'Orphanage Outreaches',
    tagline: 'Food items, school supplies, and heartfelt connection. Providing reliable nutrition, learning materials, craft workshops, and lasting memories for Nigerian children\'s homes.',
    states: 'Enugu, Kaduna, FCT Abuja, and Registered Homes Nationwide.',
    leadStat: '18 Children\'s Homes Supported',
    budgetGoal: '₦600,000 / Home / Quarter',
    fundedPercent: 91,
    icon: HandHeart,
    color: 'text-forest',
    whatThisAccomplishes: 'Nurturing growth and creating memories. Delivering food items, school supplies, and hands-on workshops that prepare children for a brighter school year while building deep personal connections.',
    whoWeReachAndEmpower: 'Vulnerable children in care. Reaching registered children\'s homes across Nigeria to ensure every child gets essential care, learning resources, and encouragement.',
    howWeBringThisToLife: [
      {
        step: '01',
        title: 'Home Identification',
        desc: 'Partnering with registered homes to assess immediate needs for nutrition, hygiene, and education.'
      },
      {
        step: '02',
        title: 'Supply Mobilization',
        desc: 'Gathering food packages, school bags, writing materials, and hygiene essentials.'
      },
      {
        step: '03',
        title: 'Direct Delivery & Engagement',
        desc: 'Bringing supplies directly to the homes while spending quality time connecting with the children.'
      },
      {
        step: '04',
        title: 'Workshops & Memories',
        desc: 'Hosting craft sessions such as bead-making to spark joy, build talents, and create lasting memories.'
      },
      {
        step: '05',
        title: 'Ongoing Follow-Up',
        desc: 'Maintaining regular touchpoints with care home management to sustain long-term support.'
      }
    ],
    realStory: {
      name: 'Hope Sanctuary Children\'s Home',
      location: 'Enugu State',
      story: 'Home to 42 children, Hope Sanctuary faced severe food shortages during soaring inflation. TKH stepped in with quarterly food consignments and medical screenings, eliminating childhood malnutrition in the sanctuary.'
    },
    stats: [
      { label: 'Care Homes Supported', val: '18' },
      { label: 'Food Consignments Delivered', val: '72+' },
      { label: 'Children Reached', val: '680+' }
    ],
    ctaText: 'Sponsor an Orphanage Outreach Package',
    testimonials: [
      {
        quote: "Ten Kind Hands supplies are the most consistent blessing our sanctuary has ever had. Their staff come with genuine love, not for photo stunts.",
        author: 'Sister Mary Theresa',
        role: 'Director, Little Angels Orphanage, Enugu'
      }
    ]
  },
  {
    id: 'school-donations',
    aliases: ['school-donation'],
    number: '04',
    pillar: 'Education',
    badge: 'Infrastructure Pillar',
    title: 'School Donations',
    tagline: 'Equipping rural schools for success. Upgrading classrooms with durable infrastructure, modern teaching tools, and essential learning materials to give rural students the best foundation to learn and thrive.',
    states: 'Kaduna, Niger, Benue, and Plateau Rural Districts.',
    leadStat: '45 Classrooms Equipped & Upgraded',
    budgetGoal: '₦4,500,000 / School Block',
    fundedPercent: 88,
    icon: BookOpen,
    color: 'text-primary',
    whatThisAccomplishes: 'Building better learning environments. Delivering classroom essentials and educational materials that empower teachers and inspire students to excel.',
    whoWeReachAndEmpower: 'Students in underserved areas. Focusing on under-resourced rural schools across Nigeria to ensure every child has a safe, well-equipped place to learn.',
    howWeBringThisToLife: [
      {
        step: '01',
        title: 'School Assessment',
        desc: 'Identifying under-resourced schools and evaluating critical infrastructure and material needs.'
      },
      {
        step: '02',
        title: 'Resource Mobilization',
        desc: 'Gathering classroom furniture, teaching aids, books, and learning supplies.'
      },
      {
        step: '03',
        title: 'Delivery & Setup',
        desc: 'Transporting and installing donations on-site to upgrade learning spaces instantly.'
      },
      {
        step: '04',
        title: 'Tool Integration',
        desc: 'Helping teachers and students use new resources effectively for maximum engagement.'
      },
      {
        step: '05',
        title: 'Ongoing Monitoring',
        desc: 'Maintaining touchpoints with school leaders to ensure long-term sustainability.'
      }
    ],
    realStory: {
      name: 'L.E.A. Primary School, Kufana',
      location: 'Kaduna State',
      story: 'Pupils previously sat on raw mud blocks under cracked asbestos sheets. TKH rebuilt a 3-classroom block with solar roof lighting, modern desks, and a 500-book reading box. Pupil enrollment increased by 65% in one academic year.'
    },
    stats: [
      { label: 'Classroom Blocks Upgraded', val: '45' },
      { label: 'Books & Toolkits Donated', val: '1,000+' },
      { label: 'Desks Handcrafted', val: '1,850' }
    ],
    ctaText: 'Fund a School Classroom Upgrade',
    testimonials: [
      {
        quote: "Before this donation, teachers had no textbooks to teach from. Today every pupil shares a modern reader and sits comfortably on a desk.",
        author: 'Mallam Bello Abdullahi',
        role: 'School Proprietor & Education Secretary'
      }
    ]
  },
  {
    id: 'medical-outreaches',
    aliases: ['medical-outreach'],
    number: '05',
    pillar: 'Healthcare',
    badge: 'Frontline Healthcare',
    title: 'Medical Outreaches',
    tagline: 'Bringing healthcare to remote villages. Providing free medical checks, prescribed drugs, mosquito nets, and health education to villages with little or no hospital access.',
    states: 'Kaduna, Enugu, Ogun, and Benue Remote Hamlets.',
    leadStat: '8,200+ Patients Treated at Zero Cost',
    budgetGoal: '₦1,200,000 / Medical Mission',
    fundedPercent: 94,
    icon: Stethoscope,
    color: 'text-forest',
    whatThisAccomplishes: 'Healing and health education. Delivering doctors, diagnostic tests, and pharmaceuticals directly to underserved communities while teaching them how to prevent illness in their environment.',
    whoWeReachAndEmpower: 'Remote and vulnerable communities. Reaching rural villages across Nigeria with little to no access to medical facilities, ensuring families receive life-saving care and health education.',
    howWeBringThisToLife: [
      {
        step: '01',
        title: 'Community Scouting',
        desc: 'Identifying remote villages with restricted or no hospital access to plan targeted healthcare interventions.'
      },
      {
        step: '02',
        title: 'Medical Team Mobilization',
        desc: 'Assembling volunteer doctors, nurses, and specialists equipped with diagnostic tools and essential pharmaceuticals.'
      },
      {
        step: '03',
        title: 'Triage & Diagnostics',
        desc: 'Conducting vital signs checks and rapid malaria or blood sugar testing on-site by certified nurses.'
      },
      {
        step: '04',
        title: 'Doctor Consultation & Pharmacy',
        desc: 'Providing one-on-one medical examinations and free dispensing of prescribed drugs.'
      },
      {
        step: '05',
        title: 'Preventive Distributions',
        desc: 'Handing out protective health essentials such as mosquito nets and sanitation supplies to households.'
      },
      {
        step: '06',
        title: 'Health Education',
        desc: 'Teaching communities about wellness, hygiene, and how to identify and prevent local environmental causes of illness.'
      },
      {
        step: '07',
        title: 'Referral & Emergency Support',
        desc: 'Providing emergency transport vouchers and support for patients requiring specialized hospital care.'
      }
    ],
    realStory: {
      name: 'Mama Rachael Obi',
      location: 'Oji River District, Enugu',
      story: 'Suffering from severe undiagnosed hypertension for two years, Mama Rachael collapsed during farming. The TKH mobile clinic stabilized her, provided three months of monitored antihypertensive therapy, and educated her family on preventative health.'
    },
    stats: [
      { label: 'Patients Treated', val: '8,200+' },
      { label: 'Mobile Missions Conducted', val: '38' },
      { label: 'Malaria Tests Administered', val: '6,400+' }
    ],
    ctaText: 'Sponsor a Mobile Medical Clinic',
    testimonials: [
      {
        quote: "The doctors came right to our village square. I received eye checks and medicine for my arthritis without paying a single kobo.",
        author: 'Pa Gabriel Nwosu (Age 68)',
        role: 'Community Elder, Enugu'
      }
    ]
  },
  {
    id: 'women-widows',
    aliases: ['women-and-widows', 'women-widows-impact'],
    number: '06',
    pillar: 'Healthcare',
    badge: 'Women Empowerment',
    title: 'Women & Widows Impact',
    tagline: 'Dignity, livelihoods, and household relief. Equipping vulnerable widows and women with practical skills, startup resources, and safer household solutions such as modern coal stoves to build steady livelihoods.',
    states: 'Ogun, Enugu, Kano, and Plateau States.',
    leadStat: '3,400 Mothers & Widows Supported',
    budgetGoal: '₦35,000 / Micro-Grant & Pack',
    fundedPercent: 82,
    icon: Users,
    color: 'text-forest',
    whatThisAccomplishes: 'Lessening the daily burdens on women and widows. Providing economic empowerment, safe maternal healthcare access, and eco-friendly household alternatives to help women build stable, independent homes.',
    whoWeReachAndEmpower: 'Hardworking women and widows. Reaching mothers and widows who are willing and able to work but lack the financial agency, tools, or opportunities to support their families independently.',
    howWeBringThisToLife: [
      {
        step: '01',
        title: 'Community Identification',
        desc: 'Partnering with local leaders to identify vulnerable widows and women who need economic and livelihood support.'
      },
      {
        step: '02',
        title: 'Skills Training',
        desc: 'Providing practical vocational training tailored to each participant\'s interests and local market viability.'
      },
      {
        step: '03',
        title: 'Startup & Tool Support',
        desc: 'Equipping women with the essential tools and resources needed to launch independent ventures.'
      },
      {
        step: '04',
        title: 'Safe Household Solutions',
        desc: 'Distributing economical, modern alternatives such as improved coal stoves to ease daily living and reduce household burdens.'
      },
      {
        step: '05',
        title: 'Maternal Health & Support',
        desc: 'Connecting women with safe maternal healthcare resources and community support networks for long-term well-being.'
      }
    ],
    realStory: {
      name: 'Comfort Adeleke',
      location: 'Abeokuta Rural, Ogun State',
      story: 'After losing her husband, Comfort had no capital to sustain her four young children. Through the TKH Widows Empowerment Grant of ₦35,000, she started a cassava processing micro-business and now pays her children’s school levies comfortably.'
    },
    stats: [
      { label: 'Mothers & Widows Empowered', val: '3,400+' },
      { label: 'Micro-Grants Disbursed', val: '450+' },
      { label: 'Improved Stoves & Packs Distributed', val: '2,200+' }
    ],
    ctaText: 'Fund a Widow\'s Enterprise & Stoves',
    testimonials: [
      {
        quote: "Ten Kind Hands didn't just give me fish; they taught me how to fish and gave me the net. I can now feed my children with dignity.",
        author: 'Mrs. Folashade Bakare',
        role: 'Micro-Grant Beneficiary & Cassava Trader'
      }
    ]
  }
];

export default function Programs({ onOpenDonate, initialProgramId = null }) {
  const [selectedProgramId, setSelectedProgramId] = useState(initialProgramId);
  const [prevProgramId, setPrevProgramId] = useState(initialProgramId);
  const [pillarFilter, setPillarFilter] = useState('all');

  if (prevProgramId !== initialProgramId) {
    setPrevProgramId(initialProgramId);
    setSelectedProgramId(initialProgramId);
  }

  useEffect(() => {
    if (initialProgramId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [initialProgramId]);

  // Support both exact ID and aliases
  const activeProgram = programsData.find(
    (p) =>
      p.id === selectedProgramId ||
      (p.aliases && p.aliases.includes(selectedProgramId)) ||
      (selectedProgramId === 'scholarships' && p.id === 'scholarship') ||
      (selectedProgramId === 'youth-development' && p.id === 'youth-empowerment') ||
      (selectedProgramId === 'orphanages-outreaches' && p.id === 'orphanage-outreaches')
  );

  const filteredPrograms =
    pillarFilter === 'all'
      ? programsData
      : programsData.filter((p) => p.pillar.toLowerCase().includes(pillarFilter.toLowerCase()));

  // =========================================================
  // PROGRAM DETAIL VIEW
  // =========================================================
  if (activeProgram) {
    const IconComponent = activeProgram.icon;

    return (
      <div className="pt-24 md:pt-28 animate-fade-in bg-white pb-20">
        <div className="relative max-w-4xl mx-auto px-4 md:px-8 py-6 overflow-hidden">
          <CurvedWaveBackground side="right" />

          <div className="relative z-10">
            {/* Back button */}
            <button
              onClick={() => {
                setSelectedProgramId(null);
                window.location.hash = 'programs';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-ink-light hover:text-ink mb-8 cursor-pointer font-heading group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to All Programmes</span>
            </button>

            {/* Program Header */}
            <div className="border-b border-[#e7e2d8] pb-10 mb-10">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-[11px] uppercase tracking-widest text-primary font-bold font-heading bg-primary/10 px-3 py-1 rounded-full">
                  Programme {activeProgram.number} • {activeProgram.badge}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-ink tracking-tight">
                  {activeProgram.title}
                </h1>
                <div className="w-12 h-12 rounded-2xl bg-sand flex items-center justify-center text-primary shrink-0 border border-[#e7e2d8]">
                  <IconComponent className="w-6 h-6" />
                </div>
              </div>

              <p className="text-base sm:text-lg text-ink font-medium leading-relaxed mb-6">
                {activeProgram.tagline}
              </p>

              {/* State Coverage Pill */}
              <div className="flex items-start sm:items-center gap-2.5 p-3.5 sm:p-4 rounded-xl bg-sand/80 border border-[#e7e2d8] mb-8 text-xs text-ink font-medium">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5 sm:mt-0" />
                <div>
                  <span className="font-bold text-ink-muted uppercase tracking-wider text-[11px] mr-1.5 font-heading">
                    Active States:
                  </span>
                  <span className="text-ink font-semibold">{activeProgram.states}</span>
                </div>
              </div>

              {/* Program Milestone Bar */}
              <div className="p-4 sm:p-6 rounded-2xl bg-sand/90 backdrop-blur-xs border border-[#e7e2d8] shadow-xs">
                <div className="flex justify-between text-xs font-bold mb-2 font-heading">
                  <span className="text-ink">2025–2026 Initiative Deployment</span>
                  <span className="text-primary">{activeProgram.fundedPercent}% Goal Reached</span>
                </div>
                <div className="w-full h-2.5 bg-[#ded8cc] rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-700"
                    style={{ width: `${activeProgram.fundedPercent}%` }}
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-between text-[11px] text-ink-muted gap-1">
                  <span>Benchmark: {activeProgram.budgetGoal}</span>
                  <span className="text-forest font-semibold">Active Field Deployment</span>
                </div>
              </div>
            </div>

            {/* Two-Column Overview */}
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12">
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#e7e2d8] shadow-xs hover:border-primary/40 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-xs uppercase tracking-wider font-bold text-primary font-heading">
                    What This Initiative Accomplishes
                  </span>
                </div>
                <p className="text-sm text-ink-light leading-relaxed font-normal">
                  {activeProgram.whatThisAccomplishes}
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#e7e2d8] shadow-xs hover:border-forest/40 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-forest"></span>
                  <span className="text-xs uppercase tracking-wider font-bold text-forest font-heading">
                    Who We Reach &amp; Empower
                  </span>
                </div>
                <p className="text-sm text-ink-light leading-relaxed font-normal">
                  {activeProgram.whoWeReachAndEmpower}
                </p>
              </div>
            </div>

            {/* How We Bring This To Life (Stepper) */}
            <div className="mb-14">
              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
                  Theory of Action &amp; Execution
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-ink">
                  How We Bring This to Life
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {activeProgram.howWeBringThisToLife.map((step) => (
                  <div
                    key={step.step}
                    className="p-5 sm:p-6 rounded-2xl bg-sand/90 backdrop-blur-xs border border-[#e7e2d8] flex flex-col justify-between hover:bg-sand transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white border border-[#e7e2d8] text-primary">
                          {step.step}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-forest/70" />
                      </div>
                      <h4 className="text-sm font-heading font-bold text-ink mb-1.5">
                        {step.title}
                      </h4>
                      <p className="text-xs text-ink-light leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real Field Case Study & Key Metrics */}
            <div className="grid md:grid-cols-12 gap-6 sm:gap-8 mb-12 items-start">
              <div className="md:col-span-7 p-6 sm:p-8 rounded-2xl bg-sand/90 backdrop-blur-xs border border-[#e7e2d8]">
                <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-2 font-heading">
                  Field Case Study
                </span>
                <h4 className="text-xl sm:text-2xl font-heading font-bold text-ink mb-1">
                  {activeProgram.realStory.name}
                </h4>
                <span className="text-xs text-ink-muted block mb-3">
                  {activeProgram.realStory.location}
                </span>
                <p className="text-xs sm:text-sm text-ink-light italic leading-relaxed">
                  "{activeProgram.realStory.story}"
                </p>
              </div>

              <div className="md:col-span-5 p-6 sm:p-8 rounded-2xl bg-white border border-[#e7e2d8] shadow-xs">
                <span className="text-xs uppercase tracking-widest text-ink font-bold block mb-4 font-heading">
                  KEY STATS
                </span>
                <div className="space-y-4">
                  {activeProgram.stats.map((st, i) => (
                    <div key={i} className="border-b border-[#f0ece8] pb-3 last:border-none">
                      <span className="font-mono text-2xl font-bold text-primary block">
                        {st.val}
                      </span>
                      <span className="text-xs text-ink-muted">{st.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            {activeProgram.testimonials.length > 0 && (
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#e7e2d8] mb-12 shadow-xs">
                <Quote className="w-6 h-6 text-primary/30 mb-3" />
                <p className="text-sm text-ink-light italic leading-relaxed mb-4">
                  "{activeProgram.testimonials[0].quote}"
                </p>
                <div className="text-xs font-bold text-ink">
                  {activeProgram.testimonials[0].author} •{' '}
                  <span className="font-normal text-ink-muted">
                    {activeProgram.testimonials[0].role}
                  </span>
                </div>
              </div>
            )}

            {/* Dedicated Support CTA */}
            <div className="p-6 sm:p-10 rounded-3xl bg-sand/90 backdrop-blur-xs border border-[#e7e2d8] text-center">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-ink mb-2">
                Support the {activeProgram.title} Initiative
              </h3>
              <p className="text-xs sm:text-sm text-ink-light max-w-md mx-auto mb-6 leading-relaxed">
                Your donation directly funds {activeProgram.title.toLowerCase()} with 100% transparent audit reporting.
              </p>
              <button
                onClick={onOpenDonate}
                className="btn-primary w-full sm:w-auto text-xs sm:text-sm px-7 sm:px-9 py-3.5 inline-flex items-center justify-center gap-2 cursor-pointer shadow-md font-heading font-semibold"
              >
                <span>{activeProgram.ctaText}</span>
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // PROGRAMMES HUB (MAIN VIEW)
  // =========================================================
  return (
    <div className="pt-24 md:pt-28 animate-fade-in bg-white pb-20">
      {/* Header with Ambient Wave */}
      <section className="relative py-12 md:py-16 px-4 md:px-8 max-w-5xl mx-auto text-center overflow-hidden">
        <CurvedWaveBackground side="right" />

        <div className="relative z-10">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-3 font-heading">
            TenKindHands • Programmes &amp; Initiatives
          </span>

          {/* Headline Option B */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-ink max-w-4xl mx-auto mb-5 tracking-tight leading-tight">
            Bridging Gaps in Health and Education{' '}
            <span className="text-primary">for a Brighter Tomorrow.</span>
          </h1>

          {/* Sub-headline (Option A) */}
          <p className="text-base sm:text-lg text-ink-light max-w-3xl mx-auto mb-8 leading-relaxed font-normal">
            Real impact, real stories. Browse our active programmes across education and healthcare to see how your support changes lives every single day.
          </p>

          {/* Pillar Filter Pills */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setPillarFilter('all')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${
                pillarFilter === 'all'
                  ? 'bg-ink text-white shadow-xs'
                  : 'bg-sand text-ink-light hover:text-ink border border-[#e7e2d8]'
              }`}
            >
              All 6 Programmes
            </button>
            <button
              onClick={() => setPillarFilter('education')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${
                pillarFilter === 'education'
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-sand text-ink-light hover:text-ink border border-[#e7e2d8]'
              }`}
            >
              Education (3)
            </button>
            <button
              onClick={() => setPillarFilter('healthcare')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer font-heading ${
                pillarFilter === 'healthcare'
                  ? 'bg-forest text-white shadow-xs'
                  : 'bg-sand text-ink-light hover:text-ink border border-[#e7e2d8]'
              }`}
            >
              Healthcare &amp; Community (3)
            </button>
          </div>
        </div>
      </section>

      {/* 6 Program Cards Grid with Mirrored Wave */}
      <section className="relative px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        <CurvedWaveBackground side="left" />

        <div className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPrograms.map((prog) => {
            const IconComponent = prog.icon;
            return (
              <div
                key={prog.id}
                className="paper-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between bg-white/95 backdrop-blur-xs border border-[#e7e2d8] shadow-xs hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div>
                  {/* Card Header & Badges */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-primary font-heading bg-primary/10 px-2.5 py-0.5 rounded-full">
                      {prog.badge}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-ink-muted">
                      {prog.number}
                    </span>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-ink">
                      {prog.title}
                    </h3>
                    <div className="w-9 h-9 rounded-xl bg-sand flex items-center justify-center text-primary shrink-0 border border-[#e7e2d8]">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-xs text-ink-light leading-relaxed mb-4 font-normal">
                    {prog.tagline}
                  </p>

                  {/* States / Locations */}
                  <div className="flex items-center gap-1.5 text-[11px] text-ink-muted mb-5 bg-sand/70 px-3 py-1.5 rounded-lg border border-[#e7e2d8]">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="truncate">{prog.states}</span>
                  </div>

                  {/* Accomplishment & Beneficiary Highlights */}
                  <div className="space-y-3 mb-6">
                    <div className="p-3.5 rounded-xl bg-white border border-[#e7e2d8]">
                      <span className="text-[10px] uppercase font-bold text-primary block font-heading mb-1">
                        What This Accomplishes
                      </span>
                      <p className="text-xs text-ink-light line-clamp-2 leading-relaxed">
                        {prog.whatThisAccomplishes}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-[#e7e2d8]">
                      <span className="text-[10px] uppercase font-bold text-forest block font-heading mb-1">
                        Who We Reach &amp; Empower
                      </span>
                      <p className="text-xs text-ink-light line-clamp-2 leading-relaxed">
                        {prog.whoWeReachAndEmpower}
                      </p>
                    </div>
                  </div>

                  {/* Delivery Stepper Count */}
                  <div className="flex items-center gap-2 text-[11px] text-ink-muted font-medium pb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                    <span>{prog.howWeBringThisToLife.length} Structured Field Execution Steps</span>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 mt-2 border-t border-[#f0ece8] flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedProgramId(prog.id);
                      window.location.hash = `programs/${prog.id}`;
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-heading font-bold text-ink hover:text-primary flex items-center gap-1.5 cursor-pointer py-1.5 transition-colors"
                  >
                    <span>View Detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={onOpenDonate}
                    className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5 cursor-pointer font-heading font-semibold shadow-xs"
                  >
                    <span>Donate</span>
                    <Heart className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
