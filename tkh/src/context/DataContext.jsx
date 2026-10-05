import { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'tkh_platform_data_v3';

const initialNewsArticles = [
  {
    id: 'gidan-solar-commissioned',
    title: 'Commissioning of the 45th Solar Classroom in Gidan Community',
    date: 'August 14, 2026',
    category: 'Field Milestone',
    author: 'Field Engineering Team',
    excerpt: 'After four months of construction alongside local village craftsmen, Gidan Community Primary School officially switched on clean solar lighting and opened its 500-book reading box.',
    image: '/images/IMG_0303.JPG',
    body: `On Thursday, August 14, 2026, village elders, teachers, and pupils of Gidan Community in Kaduna State gathered to cut the ribbon on a brand new 3-classroom block powered entirely by rooftop solar arrays.\n\nBefore this intervention, children studied on compacted dirt floors inside a mud-walled shelter that had to be evacuated whenever rain clouds gathered. Today, the classrooms feature weather-insulated zinc roofing, ceiling ventilation fans, dual-seater wooden desks built by local carpenters, and an attached clean water borehole.\n\n"Our pupils no longer fear the rain or the dark," said Headmistress Mrs. Amina Danjuma during the opening ceremony. "Attendance has already jumped by 40% in our first week."\n\nThis project was 100% funded through individual donor contributions, with zero cuts taken for administrative expenses.`
  },
  {
    id: 'mobile-health-enugu-outreach',
    title: 'Q3 Mobile Medical Outreach Treats Over 650 Patients in Enugu Rural',
    date: 'July 28, 2026',
    category: 'Medical Mission',
    author: 'Dr. Zainab Aliyu, Lead Physician',
    excerpt: 'A four-day clinical mission deployed across three remote hamlets in Oji River District, providing free malaria triage, maternal health packs, and essential hypertension management.',
    image: '/images/food-distribution.jpg',
    body: `From July 24–27, 2026, Ten Kind Hands deployed two 4x4 mobile clinic vehicles staffed by seven volunteer doctors, nurses, and pharmacists deep into the rural farming settlements of Oji River, Enugu State.\n\nOver four days of dawn-to-dusk clinics:\n• 654 patients received one-on-one medical consultations.\n• 412 rapid malaria diagnostic tests were administered, with 100% of positive cases receiving full free courses of Artemisinin-based combination therapy (ACT).\n• 85 expectant mothers received sterile delivery packs (Mama Kits) and prenatal multivitamin courses.\n• 12 emergency hospital transport vouchers were issued for patients requiring urgent specialized surgical intervention.\n\n"For many elderly patients in these hamlets, this was their first encounter with a licensed medical practitioner in over two years," noted Dr. Zainab Aliyu.`
  },
  {
    id: 'annual-audit-2025-released',
    title: 'Ten Kind Hands Releases 2025 Full Financial & Field Impact Audit',
    date: 'June 30, 2026',
    category: 'Transparency',
    author: 'Board of Trustees',
    excerpt: 'Demonstrating 100% direct giving: 88.4% of all institutional funds directed to frontline deliverables, with trustee endowments covering all overhead and banking fees.',
    image: '/images/IMG_0300.JPG',
    body: `In accordance with our founding charter of radical transparency, Ten Kind Hands has published its complete 2025 Audited Financial Statement and Independent Field Review.\n\nKey Highlights:\n• Total donor funds raised in 2025: ₦142,600,000 (~$185,000 USD).\n• 88.4% deployed directly to classroom construction, student tuition scholarships, and pharmaceutical supplies.\n• 11.6% allocated to field monitoring, GPS tracking verification, and certified engineering audits.\n• 0.0% deducted for administrative overhead — 100% of executive salaries and office expenses are covered under a separate trustee endowment.\n\nThe full 38-page audit report with itemized vendor receipts is available for free download on our Transparency page.`
  }
];

const initialOutreaches = [
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
    description: 'A five-stage empowerment intervention spanning four states: 5-week youth digital tech lab in Ikorodu, academic speech day scholarships in Jos, primary school learning kits, shoe-making apprenticeships, and vocational hairdressing tools.',
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
    description: 'Transitioned trained youths from 2025 vocational apprenticeships to full commercial barbershop business ownership with shop rentals, interior setup, electrical wiring, and commercial-grade barber tools in Jos and Makurdi.',
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

const initialMetrics = [
  {
    id: 'students',
    category: 'transparency',
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
    iconName: 'Sparkles',
    label: 'Children & Youths Reached',
    stat: '3,312+',
    description: 'Children & Youths Reached',
    growth: '+1,300',
    color: 'text-primary',
    detail: 'Children and young people supported through education, skills development, healthcare, and empowerment initiative...'
  }
];

const initialAllocations = [
  {
    id: 'frontline',
    label: 'Frontline Programs & Field Deliverables',
    pct: 88.4,
    color: 'bg-primary',
    desc: 'Classroom construction, textbook printing, solar installations, pharmaceutical procurement, and student scholarships.'
  },
  {
    id: 'audits',
    label: 'Field Monitoring & Third-Party Engineering Audits',
    pct: 11.6,
    color: 'bg-forest',
    desc: 'GPS site mapping, structural integrity checks, clinical cold-chain verification, and outcome tracking.'
  },
  {
    id: 'overhead',
    label: 'Administrative & Executive Overhead',
    pct: 0.0,
    color: 'bg-ink-muted',
    desc: '100% covered privately by Trustee Endowment. Zero kobo is deducted from public donor contributions.'
  }
];

const initialDocuments = [];

const initialAnnouncement = 'Commissioning new solar classrooms in Kaduna & mobile health clinic in Enugu';

const initialInquiries = [
  {
    id: 'inq-1',
    name: 'Dr. Kelechi Nnamani',
    email: 'k.nnamani@unth.edu.ng',
    phone: '+234 803 123 4567',
    category: 'Medical Volunteer',
    message: 'I am a consultant pediatrician based in Enugu interested in volunteering on your upcoming Q4 rural outreach missions.',
    date: '2026-09-02',
    status: 'Unread'
  },
  {
    id: 'inq-2',
    name: 'Amina Bello',
    email: 'amina.bello@impactafrica.org',
    phone: '+234 809 987 6543',
    category: 'Partnership Inquiry',
    message: 'We represent an African rural clean water grant program and would love to co-sponsor 5 solar boreholes in Kaduna state with Ten Kind Hands.',
    date: '2026-09-05',
    status: 'Reviewed'
  }
];

const initialHomeContent = {
  heroHeadline: 'Empowering the lives of African Women and Children through Healthcare & Educational initiatives.',
  heroSubtitle: 'Every act of kindness shapes a brighter future.',
  registeredBadge: 'Registered Non-Profit • CAC RC: 7015705',
  heroSlides: [
    {
      img: "/images/hero-debate-competition-makurdi.webp",
      caption: "Inter-Secondary School Debate Competition (₦50,000 • ₦30,000 • ₦20,000 Awards) • Makurdi"
    },
    {
      img: "/images/hero-digital-literacy-computer-lab.webp",
      caption: "Youth Digital Literacy & Computer Lab Setup • Plateau State"
    },
    {
      img: "/images/hero-orphanage-food-educational-support.webp",
      caption: "Food Relief & Educational Supplies Donation • Oyiza Orphanage"
    },
    {
      img: "/images/hero-widows-clean-cooking-stoves.webp",
      caption: "Widows Clean Energy & Eco-Cooking Stove Distribution • Dafara"
    },
    {
      img: "/images/hero-jambells-school-outreach.webp",
      caption: "Educational Materials & School Supplies Distribution • JAMBELLS School, Lagos"
    },
    {
      img: "/images/hero-maternal-health-malaria-prevention.webp",
      caption: "Maternal Healthcare & Malaria Prevention Outreach • Lagos"
    },
    {
      img: "/images/hero-youth-vocational-shoemaking.webp",
      caption: "Youth Vocational Skills & Shoemaking Apprenticeship • Abuja"
    },
    {
      img: "/images/hero-visually-impaired-education.webp",
      caption: "Special Education & Inclusive Learning for Visually Impaired Students"
    },
    {
      img: "/images/hero-digital-skills-youth-training.webp",
      caption: "Youth Digital Skills & Computer Training Lab • Lagos"
    },
    {
      img: "/images/hero-community-empowerment.webp",
      caption: "Sustainable Community Livelihood & Family Empowerment Outreach"
    },
    {
      img: "/images/IMG_0294.webp",
      caption: "Child empowerment Program • Makurdi"
    },
    {
      img: "/images/11222.webp",
      caption: "Medical outreach to children at Abuja Teaching Hospital"
    },
    {
      img: "/images/IMG_0995.webp",
      caption: "Women Empowerment Outreach • Dafara"
    }
  ],
  fieldReality: {
    stat: 'Over 10M',
    label: 'Children currently out of primary school in Nigeria (UNESCO)',
    paragraph1: 'When poverty forces families to choose between putting food on the table and paying school expenses, a child’s education is often the first sacrifice. Without books, learning materials, scholarships, and the support needed to stay in school, many children risk falling behind or abandoning their education altogether. At the same time, vulnerable communities continue to face preventable health challenges, while women and widows struggle to access the skills and opportunities needed to achieve financial independence.',
    paragraph2: 'Ten Kind Hands Foundation bridges these gaps by investing in children’s education through scholarships, educational materials, school donations, learning support, and youth development initiatives, while also extending healthcare interventions and women’s empowerment programmes to vulnerable communities. By meeting immediate needs and creating pathways to opportunity, we help children learn, women thrive, and communities build a stronger and more hopeful future.'
  }
};

const initialStoryContent = {
  visionTitle: 'Mission • Vision • Values',
  visionHeadline: 'A seed planted in hope. A forest grown in dignity.',
  visionStatement: 'A world where every child has access to quality education, and every woman and child has access to comprehensive healthcare. We strive to break the cycle of poverty and increase the overall well-being of communities by empowering children through education and promoting the health and well-being of women and children.',
  leadership: [
    {
      name: 'Suotonye Augustine Arthur',
      role: 'Country Head',
      badge: 'Country Leadership',
      initials: 'SA',
      image: '/images/Suotonye Augustine Arthur - Country Head.jpeg',
      description: 'Oversees country-wide program execution, institutional donor relations, and high-impact partnerships across state governments and communities.'
    },
    {
      name: 'Ibrahim Favour Adoba',
      role: 'Project Manager',
      badge: 'Field Operations',
      initials: 'IF',
      image: '/images/Ibrahim Favour Adoba - Project Manager.jpeg',
      description: 'Leads frontline project deployment, monitoring school solar renovations, clean water drilling, and rural clinic logistics on the ground.'
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
    }
  ],
  stateCoordinators: [
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
  ]
};

const initialTestimonialsList = [
  {
    id: 't-1',
    category: 'beneficiaries',
    quote: "Before Ten Kind Hands brought solar power and desks, our pupils learned on bare floors and had to go home whenever rain clouds gathered. Today, attendance has soared to over 98% and our children read aloud with pride.",
    author: "Mrs. Amina Danjuma",
    role: "Headmistress",
    institution: "Gidan Community Primary School, Kaduna State"
  },
  {
    id: 't-2',
    category: 'beneficiaries',
    quote: "The mobile health clinic detected my child's severe pneumonia in time and provided all treatments free of charge. Having caring medical staff reach our remote hamlet is a blessing I will never forget.",
    author: "Grace Adebayo",
    role: "Mother of 3 & Community Health Advocate",
    institution: "Rural Women's Forum, Ogun State"
  },
  {
    id: 't-3',
    category: 'beneficiaries',
    quote: "Ten Kind Hands does not dictate to us; they sit with village elders and ask what our youth need most. This is genuine dignity, respect for our culture, and true partnership.",
    author: "Chief Emeka Okafor",
    role: "Community Elder & Development Secretary",
    institution: "Oji River Council, Enugu State"
  },
  {
    id: 't-4',
    category: 'volunteers',
    quote: "Serving as a volunteer doctor on the Kaduna medical mission was the most grounding experience of my clinical career. Seeing 100% of donated drugs reach patients directly restored my faith in grassroots charity.",
    author: "Dr. Chinedu Eze",
    role: "Volunteer Pediatrician",
    institution: "Lagos University Teaching Hospital"
  },
  {
    id: 't-5',
    category: 'donors',
    quote: "What sets TKH apart is their radical financial honesty. Getting an email with GPS coordinates and photos of the exact classroom block my monthly contribution helped build was deeply moving.",
    author: "Farida Mohammed",
    role: "Monthly Impact Sustainer",
    institution: "Abuja, Nigeria"
  },
  {
    id: 't-6',
    category: 'partners',
    quote: "Our diaspora foundation has partnered with Ten Kind Hands across three Nigerian states. Their operational discipline and flawless accounting make them our most trusted on-ground implementation partner.",
    author: "Dr. Anthony Nwankwo",
    role: "Director of International Giving",
    institution: "UK-Nigeria Diaspora Health Trust"
  }
];

const initialContactInfo = {
  headquarters: 'Danglo plaza 204, 6th Avenue Gwarinpa, Abuja - Nigeria',
  rcNumber: 'RC: 7015705',
  cacStatus: 'CAC RC: 7015705 (Incorporated Non-Profit)',
  email: 'contact@tenkindhands.org',
  partnershipsEmail: 'partners@tenkindhands.org',
  phone: '+234 818 099 4301',
  whatsapp: '+234 818 099 4301',
  emergencyDesk: '+234 818 099 4301',
  visitingHours: 'Monday – Friday: 9:00 AM – 5:00 PM WAT'
};

const defaultData = {
  news: initialNewsArticles,
  outreaches: initialOutreaches,
  metrics: initialMetrics,
  allocations: initialAllocations,
  documents: initialDocuments,
  announcement: initialAnnouncement,
  inquiries: initialInquiries,
  homeContent: initialHomeContent,
  storyContent: initialStoryContent,
  testimonialsList: initialTestimonialsList,
  contactInfo: initialContactInfo
};

export const getApiBase = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined') {
    const { hostname } = window.location;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5000/api';
    }
    return '/api';
  }
  return 'http://localhost:5000/api';
};

const API_BASE = getApiBase();
const DataContext = createContext(null);

const sanitizeData = (raw) => {
  if (!raw) return raw;
  const cleaned = { ...raw };
  if (cleaned.homeContent?.registeredBadge) {
    if (cleaned.homeContent.registeredBadge.includes('Registered Non-Profit NGO in Nigeria')) {
      cleaned.homeContent = {
        ...cleaned.homeContent,
        registeredBadge: ''
      };
    } else {
      cleaned.homeContent = {
        ...cleaned.homeContent,
        registeredBadge: cleaned.homeContent.registeredBadge
          .replace(/ • CAC\/IT\/NO: 148920/g, '')
          .replace(/CAC\/IT\/NO: 148920\.?/g, '')
          .trim()
      };
    }
  }
  if (cleaned.homeContent) {
    const slides = cleaned.homeContent.heroSlides;
    const hasBatch2 = Array.isArray(slides) && slides.some((s) => s.img && s.img.includes('hero-orphanage'));
    const hasDebateAwards = Array.isArray(slides) && slides.some((s) => s.caption && s.caption.includes('₦50,000'));
    if (!hasBatch2 || !hasDebateAwards) {
      cleaned.homeContent = {
        ...cleaned.homeContent,
        heroSlides: initialHomeContent.heroSlides
      };
    }
  }
  if (Array.isArray(cleaned.documents)) {
    cleaned.documents = cleaned.documents.map((d) => ({
      ...d,
      title: (d.title || '').replace(' (RC: 7015705)', '').replace('RC: 7015705', '').trim()
    }));
  }
  if (cleaned.contactInfo) {
    if (!cleaned.contactInfo.headquarters || cleaned.contactInfo.headquarters.includes('Plot 402') || cleaned.contactInfo.headquarters === 'Abuja, Federal Capital Territory, Nigeria') {
      cleaned.contactInfo = {
        ...cleaned.contactInfo,
        headquarters: 'Danglo plaza 204, 6th Avenue Gwarinpa, Abuja - Nigeria'
      };
    }
  }
  if (Array.isArray(cleaned.metrics)) {
    const hasLegacy = cleaned.metrics.some(
      (m) =>
        m.stat === '12,500+' ||
        m.stat === '12,500' ||
        m.stat === '8,200+' ||
        m.stat === '8,200' ||
        m.stat === '45' ||
        m.stat === '12' ||
        m.stat === '28' ||
        m.id === 'water' ||
        m.description === 'Students Supplied' ||
        m.label === 'Students Supplied' ||
        m.description === 'Solar Classrooms' ||
        m.label === 'Solar Classrooms' ||
        m.description === 'Patients Treated' ||
        m.label === 'Patients Treated' ||
        m.description === 'Community Health Posts' ||
        m.label === 'Frontline Healthcare' ||
        m.description === 'Solar Deep Boreholes' ||
        m.label === 'Clean Water'
    );
    const exactOrder = ['students', 'schools', 'patients', 'giving-model', 'clinics', 'metric-1790695260926'];
    const exactStats = {
      'students': '5,500+',
      'schools': '150+',
      'patients': '2,100+',
      'giving-model': '100%',
      'clinics': '130+',
      'metric-1790695260926': '3,312+'
    };
    const matchesOrder =
      cleaned.metrics.length === 6 &&
      cleaned.metrics.every((m, idx) => m.id === exactOrder[idx]);
    const matchesStats =
      matchesOrder &&
      cleaned.metrics.every((m) => exactStats[m.id] && m.stat === exactStats[m.id]);

    if (hasLegacy || !matchesOrder || !matchesStats) {
      cleaned.metrics = initialMetrics;
    }
  } else {
    cleaned.metrics = initialMetrics;
  }
  return cleaned;
};

export function DataProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const rawParsed = JSON.parse(saved);
        const parsed = sanitizeData(rawParsed);
        let loadedMetrics = parsed.metrics;
        const exactOrder = ['students', 'schools', 'patients', 'giving-model', 'clinics', 'metric-1790695260926'];
        if (
          !loadedMetrics ||
          loadedMetrics.length !== 6 ||
          !loadedMetrics.every((m, idx) => m.id === exactOrder[idx])
        ) {
          loadedMetrics = initialMetrics;
        }

        const stateObj = {
          news: parsed.news || defaultData.news,
          outreaches: parsed.outreaches || defaultData.outreaches,
          metrics: loadedMetrics,
          allocations: parsed.allocations || defaultData.allocations,
          documents: parsed.documents || defaultData.documents,
          announcement: parsed.announcement ?? defaultData.announcement,
          inquiries: parsed.inquiries || defaultData.inquiries,
          homeContent: parsed.homeContent || defaultData.homeContent,
          storyContent: parsed.storyContent || defaultData.storyContent,
          testimonialsList: parsed.testimonialsList || defaultData.testimonialsList,
          contactInfo: parsed.contactInfo || defaultData.contactInfo
        };

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(stateObj));
        } catch (_) { }

        return stateObj;
      }
    } catch (err) {
      console.warn('Failed to parse localStorage data:', err);
    }
    return defaultData;
  });

  // Fetch initial data from backend server on mount
  useEffect(() => {
    let isMounted = true;
    fetch(`${API_BASE}/data`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP status ${res.status}`);
        return res.json();
      })
      .then((rawRemoteData) => {
        const remoteData = sanitizeData(rawRemoteData);
        if (isMounted && remoteData && Array.isArray(remoteData.news)) {
          let remoteMetrics = remoteData.metrics;
          const exactOrder = ['students', 'schools', 'patients', 'giving-model', 'clinics', 'metric-1790695260926'];
          if (
            !remoteMetrics ||
            remoteMetrics.length !== 6 ||
            !remoteMetrics.every((m, idx) => m.id === exactOrder[idx])
          ) {
            remoteMetrics = initialMetrics;
          }
          const mergedRemote = { ...remoteData, metrics: remoteMetrics };
          setData(mergedRemote);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedRemote));
        }
      })
      .catch((err) => {
        console.info('Backend API connection deferred (using local cache):', err.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  }, [data]);

  // News CRUD
  const addNews = (article) => {
    const newArticle = {
      ...article,
      id: article.id || `news-${Date.now()}`
    };
    setData((prev) => ({ ...prev, news: [newArticle, ...prev.news] }));

    fetch(`${API_BASE}/news`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newArticle)
    }).catch((err) => console.warn('Sync news to backend:', err.message));

    return newArticle;
  };

  const updateNews = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      news: prev.news.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    }));

    fetch(`${API_BASE}/news/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields)
    }).catch((err) => console.warn('Sync updateNews to backend:', err.message));
  };

  const deleteNews = (id) => {
    setData((prev) => ({
      ...prev,
      news: prev.news.filter((item) => item.id !== id)
    }));

    fetch(`${API_BASE}/news/${id}`, {
      method: 'DELETE'
    }).catch((err) => console.warn('Sync deleteNews to backend:', err.message));
  };

  // Outreach CRUD
  const addOutreach = (outreach) => {
    const newOutreach = {
      ...outreach,
      id: outreach.id || `outreach-${Date.now()}`
    };
    setData((prev) => ({ ...prev, outreaches: [newOutreach, ...prev.outreaches] }));

    fetch(`${API_BASE}/outreaches`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOutreach)
    }).catch((err) => console.warn('Sync outreach to backend:', err.message));

    return newOutreach;
  };

  const updateOutreach = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      outreaches: prev.outreaches.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    }));

    fetch(`${API_BASE}/outreaches/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields)
    }).catch((err) => console.warn('Sync updateOutreach to backend:', err.message));
  };

  const deleteOutreach = (id) => {
    setData((prev) => ({
      ...prev,
      outreaches: prev.outreaches.filter((item) => item.id !== id)
    }));

    fetch(`${API_BASE}/outreaches/${id}`, {
      method: 'DELETE'
    }).catch((err) => console.warn('Sync deleteOutreach to backend:', err.message));
  };

  // Impact Metrics CRUD
  const updateMetric = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      metrics: prev.metrics.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    }));

    fetch(`${API_BASE}/metrics/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields)
    }).catch((err) => console.warn('Sync updateMetric to backend:', err.message));
  };

  const addMetric = (metric) => {
    const newMetric = {
      ...metric,
      id: metric.id || `metric-${Date.now()}`
    };
    setData((prev) => ({ ...prev, metrics: [...prev.metrics, newMetric] }));

    fetch(`${API_BASE}/metrics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMetric)
    }).catch((err) => console.warn('Sync addMetric to backend:', err.message));

    return newMetric;
  };

  const deleteMetric = (id) => {
    setData((prev) => ({
      ...prev,
      metrics: prev.metrics.filter((item) => item.id !== id)
    }));

    fetch(`${API_BASE}/metrics/${id}`, {
      method: 'DELETE'
    }).catch((err) => console.warn('Sync deleteMetric to backend:', err.message));
  };

  // Transparency Allocations & Documents
  const updateAllocations = (newAllocations) => {
    setData((prev) => ({ ...prev, allocations: newAllocations }));

    fetch(`${API_BASE}/transparency/allocations`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAllocations)
    }).catch((err) => console.warn('Sync allocations to backend:', err.message));
  };

  const addDocument = (doc) => {
    const newDoc = {
      ...doc,
      id: doc.id || `doc-${Date.now()}`
    };
    setData((prev) => ({ ...prev, documents: [newDoc, ...prev.documents] }));

    fetch(`${API_BASE}/transparency/documents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDoc)
    }).catch((err) => console.warn('Sync document to backend:', err.message));

    return newDoc;
  };

  const deleteDocument = (idOrTitle) => {
    setData((prev) => ({
      ...prev,
      documents: prev.documents.filter((doc) => (doc.id ? doc.id !== idOrTitle : doc.title !== idOrTitle))
    }));

    fetch(`${API_BASE}/transparency/documents/${encodeURIComponent(idOrTitle)}`, {
      method: 'DELETE'
    }).catch((err) => console.warn('Sync deleteDocument to backend:', err.message));
  };

  // Announcement bar
  const updateAnnouncement = (announcementText) => {
    setData((prev) => ({ ...prev, announcement: announcementText }));

    fetch(`${API_BASE}/announcement`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ announcement: announcementText })
    }).catch((err) => console.warn('Sync announcement to backend:', err.message));
  };

  // Inquiries / Leads from forms
  const addInquiry = async (inquiry) => {
    const newInquiry = {
      ...inquiry,
      id: inquiry.id || `inq-${Date.now()}`,
      date: inquiry.date || new Date().toISOString().split('T')[0],
      status: inquiry.status || 'New'
    };
    // Always persist to local state and localStorage immediately
    setData((prev) => ({ ...prev, inquiries: [newInquiry, ...(prev.inquiries || [])] }));

    let serverSynced = false;
    let syncError = null;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(`${getApiBase()}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInquiry),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        serverSynced = true;
      } else {
        syncError = `Server responded with ${res.status}`;
      }
    } catch (err) {
      syncError = err.message || 'Network request failed';
      console.warn('Sync inquiry to backend:', syncError);
    }

    return {
      success: true,
      serverSynced,
      inquiry: newInquiry,
      error: syncError
    };
  };

  const updateInquiryStatus = (id, status) => {
    setData((prev) => ({
      ...prev,
      inquiries: prev.inquiries.map((item) => (item.id === id ? { ...item, status } : item))
    }));

    fetch(`${API_BASE}/inquiries/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }).catch((err) => console.warn('Sync inquiry status to backend:', err.message));
  };

  const deleteInquiry = (id) => {
    setData((prev) => ({
      ...prev,
      inquiries: prev.inquiries.filter((item) => item.id !== id)
    }));

    fetch(`${API_BASE}/inquiries/${id}`, {
      method: 'DELETE'
    }).catch((err) => console.warn('Sync deleteInquiry to backend:', err.message));
  };

  // Page Content Updaters
  const updateHomeContent = (updatedFields) => {
    setData((prev) => ({
      ...prev,
      homeContent: { ...prev.homeContent, ...updatedFields }
    }));
  };

  const updateStoryContent = (updatedFields) => {
    setData((prev) => ({
      ...prev,
      storyContent: { ...prev.storyContent, ...updatedFields }
    }));
  };

  const updateStoryCoordinators = (coordinators) => {
    setData((prev) => ({
      ...prev,
      storyContent: { ...prev.storyContent, stateCoordinators: coordinators }
    }));
  };

  const updateStoryLeadership = (leadership) => {
    setData((prev) => ({
      ...prev,
      storyContent: { ...prev.storyContent, leadership }
    }));
  };

  const updateTestimonials = (testimonials) => {
    setData((prev) => ({
      ...prev,
      testimonialsList: testimonials
    }));
  };

  const addTestimonial = (item) => {
    const newItem = { ...item, id: item.id || `t-${Date.now()}` };
    setData((prev) => ({
      ...prev,
      testimonialsList: [newItem, ...prev.testimonialsList]
    }));
    return newItem;
  };

  const deleteTestimonial = (id) => {
    setData((prev) => ({
      ...prev,
      testimonialsList: prev.testimonialsList.filter((t) => t.id !== id)
    }));
  };

  const updateContactInfo = (updatedFields) => {
    setData((prev) => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, ...updatedFields }
    }));
  };

  // Platform Reset & Backup
  const resetToDefaults = () => {
    setData(defaultData);
    localStorage.removeItem(STORAGE_KEY);

    fetch(`${API_BASE}/data/reset`, { method: 'POST' })
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setData(res.data);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(res.data));
        }
      })
      .catch((err) => console.warn('Sync reset to backend:', err.message));
  };

  const exportDataBackup = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ten-kind-hands-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importDataBackup = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      const newDataset = {
        news: parsed.news || defaultData.news,
        outreaches: parsed.outreaches || defaultData.outreaches,
        metrics: parsed.metrics || defaultData.metrics,
        allocations: parsed.allocations || defaultData.allocations,
        documents: parsed.documents || defaultData.documents,
        announcement: parsed.announcement ?? defaultData.announcement,
        inquiries: parsed.inquiries || defaultData.inquiries,
        homeContent: parsed.homeContent || defaultData.homeContent,
        storyContent: parsed.storyContent || defaultData.storyContent,
        testimonialsList: parsed.testimonialsList || defaultData.testimonialsList,
        contactInfo: parsed.contactInfo || defaultData.contactInfo
      };
      setData(newDataset);

      fetch(`${API_BASE}/data/import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDataset)
      }).catch((err) => console.warn('Sync import to backend:', err.message));

      return true;
    } catch (err) {
      console.error('Failed to import backup:', err);
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        ...data,
        addNews,
        updateNews,
        deleteNews,
        addOutreach,
        updateOutreach,
        deleteOutreach,
        updateMetric,
        addMetric,
        deleteMetric,
        updateAllocations,
        addDocument,
        deleteDocument,
        updateAnnouncement,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        updateHomeContent,
        updateStoryContent,
        updateStoryCoordinators,
        updateStoryLeadership,
        updateTestimonials,
        addTestimonial,
        deleteTestimonial,
        updateContactInfo,
        resetToDefaults,
        exportDataBackup,
        importDataBackup
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
