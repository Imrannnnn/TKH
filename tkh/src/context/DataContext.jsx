import { createContext, useContext, useState, useEffect } from 'react';

/**
 * ==============================================================================
 * TEN KIND HANDS (TKH) - CENTRAL DATA CONTEXT (`DataContext.jsx`)
 * ==============================================================================
 * 
 * QUICK EDITING GUIDE FOR FOUNDERS & ADMINISTRATORS:
 * ------------------------------------------------------------------------------
 * This file is the "Master Control Room" for the entire website's live content.
 * Any data you configure here is shared automatically across all pages:
 *   - Homepage (`Home.jsx`): Hero slides, latest field reports, upcoming outreach card, impact numbers.
 *   - Field Reports (`Outreaches.jsx`): All completed reports, audits, costs, and upcoming mission cards.
 *   - Our Work (`Programs.jsx`): Education, Healthcare, and Livelihoods program tracks and their latest outreach.
 *   - About Us (`OurStory.jsx`): Mission statement, executive leadership, and State Coordinators.
 *   - Transparency (`Transparency.jsx`): Financial allocations (88.4% frontline, 11.6% audits, 0% admin).
 * 
 * HOW TO ADD OR UPDATE AN OUTREACH IN `initialOutreaches`:
 * ------------------------------------------------------------------------------
 * Each outreach is an object in `initialOutreaches` (Section 2 below).
 * 
 * 1. COMPLETED OUTREACH (Field Report):
 *    - Set `status: 'completed'`
 *    - Set `id`: Unique identifier (e.g., 'outreach-nov-2026-medical-aid')
 *    - Set `month`: Display month (e.g., 'November 2026')
 *    - Set `title`: Title of the field report
 *    - Set `pillar`: 'Healthcare', 'Health & Hygiene', 'Education & Skills', or 'Humanitarian Support & Community Welfare'
 *    - Set `beneficiariesTarget`: e.g., '387 Nursing Mothers Across 5 States'
 *    - Set `description`: Overview paragraph explaining what was delivered
 *    - Set `image`: Path to photo inside `public/images/` (e.g., '/images/november-medical-aid-outreach.jpg')
 *    - Set `deployments`: Array of state-by-state locations and activities
 * 
 * 2. UPCOMING OUTREACH (Next Planned Mission):
 *    - Set `status: 'upcoming'`
 *    - This will automatically display in the "Next Planned Outreach" card on the Homepage and Field Reports page.
 *    - Only ONE outreach should typically have `status: 'upcoming'` at any time.
 * 
 * 3. WHY WE HAVE `STORAGE_KEY` & `sanitizeData()`:
 *    - The website saves data into the visitor's browser (`localStorage`) so it loads lightning-fast.
 *    - `STORAGE_KEY`: Incrementing this (e.g. from v5 to v6) forces every visitor's browser to refresh with the latest data.
 *    - `sanitizeData()`: Whenever the app starts, it checks that new code additions (like new months or updated names)
 *      are automatically merged into any existing browser cache so nobody ever sees outdated reports!
 * ==============================================================================
 */

// Bump this key (e.g. v6 -> v7) whenever you want all browser caches to reset cleanly
const STORAGE_KEY = 'tkh_platform_data_v7';

/* ==============================================================================
   SECTION 1: NEWS & FIELD MILESTONES (`initialNewsArticles`)
   Used for press dispatches, engineering milestones, and formal audit releases.
   ============================================================================== */
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

/* ==============================================================================
   SECTION 2: MASTER OUTREACHES LIST (`initialOutreaches`)
   ------------------------------------------------------------------------------
   This is the master database of field reports and missions for:
     1. Homepage ("This Month in the Field" - 3 latest reports + 1 upcoming mission)
     2. Field Reports Page (`Outreaches.jsx`)
     3. Our Work Track Indicators (`Programs.jsx`)

   ORDERING RULE:
   - Keep completed outreaches ordered NEWEST FIRST (e.g. November, October, September...).
   - Keep upcoming missions at the bottom with `status: 'upcoming'`.
   ============================================================================== */
const initialOutreaches = [
  // --- 1. LATEST COMPLETED REPORT: NOVEMBER 2026 (Medical Aid & Maternal Support) ---
  {
    id: 'outreach-nov-2026-medical-aid',
    month: 'November 2026',
    date: 'October – November 2026',
    status: 'completed', // 'completed' = published field report
    title: 'Medical Aid Outreach & Maternal Health Support',
    pillar: 'Healthcare',
    theme: 'Maternal Healthcare • Postnatal Education • Baby-Care Packages',
    location: 'Plateau, Oyo, Katsina, Enugu & Benue States',
    beneficiariesTarget: '387 Nursing Mothers Across 5 States',
    description: 'The November 2026 Medical Aid Outreach delivered essential healthcare support, maternal education and baby-care packages across five Nigerian states. In collaboration with local healthcare professionals and hospitals, Ten Kind Hands reached 387 nursing mothers with practical assistance, postnatal guidance and essential hygiene supplies to strengthen maternal and newborn welfare.',
    image: '/images/november-medical-aid-outreach.jpg',
    focusAreas: ['Postnatal Education', 'Baby-Care Packages', 'Maternal Welfare', 'Hospital Partnerships'],
    deployments: [
      {
        state: 'Plateau State',
        location: 'Jos and environs',
        date: 'November 2026',
        beneficiaries: '100 Nursing Mothers',
        activity: 'Postnatal education, maternal hygiene workshops, and baby-care supplies distribution.'
      },
      {
        state: 'Oyo State',
        location: 'Ibadan healthcare centres',
        date: 'November 2026',
        beneficiaries: '50 Nursing Mothers',
        activity: 'Medical aid outreach, newborn care counseling, and essential maternal care kits.'
      },
      {
        state: 'Katsina State',
        location: 'Primary Health Clinic Jino',
        date: 'November 2026',
        beneficiaries: '62 Nursing Mothers',
        activity: 'Maternal and newborn health education with infant hygiene supplies.'
      },
      {
        state: 'Enugu State',
        location: 'Annunciation Specialist Hospital',
        date: 'November 2026',
        beneficiaries: '75 Nursing Mothers',
        activity: 'Practical support for nursing mothers, clinical guidance, and care packs.'
      },
      {
        state: 'Benue State',
        location: 'BSUTH Annex, Makurdi',
        date: 'November 2026',
        beneficiaries: '100 Beneficiaries',
        activity: 'Safe Mother Initiative: maternal education and essential care supplies.'
      }
    ],
    feedback: '"Reaching nursing mothers with practical care packages and postnatal guidance gives their newborns a healthier, dignified start."',
    partners: 'BSUTH Makurdi, Annunciation Specialist Hospital, Primary Health Clinic Jino & Local Health Workers'
  },

  // --- 2. COMPLETED REPORT: OCTOBER 2026 (Pad A Girl Child & Pad Bank Launch) ---
  {
    id: 'outreach-sep-2026-pad-bank',
    month: 'October 2026',
    date: 'October 20, 2026',
    status: 'completed',
    title: 'Pad A Girl Child Outreach & Pad Bank Launch',
    pillar: 'Health & Hygiene',
    theme: 'Menstrual Hygiene Education • Pad Bank Dispensary • Girl Child Dignity',
    location: 'GGSS Dutse Alhaji, Abuja',
    beneficiariesTarget: '456 Sanitary Pads (384 Reached + 72 in  Pad Bank)',
    description: 'The FCT team successfully carried out the pad a girl child outreach and mounting the “PAD BANK” in the school clinic which will be well managed and controlled by the Health mistress to avoid abuse of the pad bank. We took few minutes to educate the students on their Menstrual hygiene which majority of them are ignorant of, questions were asked by the students which were all answered, it was indeed an interactive section and we all enjoyed the moment. At the end of the outreach, we were able to reach out to students with 384 sanitary pads and 72 pieces were reserved in the pad bank.',
    image: '/images/pad-a-girl-child-outreach-abuja.jpg',
    focusAreas: ['Menstrual Hygiene Education', 'Pad Bank School Dispensary', '384 Sanitary Pads Distributed', 'Health Mistress Stewardship'],
    deployments: [
      {
        state: 'FCT Abuja',
        location: 'GGSS Dutse Alhaji, Abuja',
        date: 'October 20, 2026',
        beneficiaries: '384 Students Reached + 72 Pads Reserved',
        activity: 'Educated female students on menstrual hygiene management, answered questions during interactive Q&A, distributed 384 sanitary pads directly, and mounted a 72-pad permanent emergency Pad Bank in the school clinic managed by the Health mistress.'
      }
    ],
    feedback: '"Mounting the Pad Bank in our school clinic ensures no girl has to miss school or feel embarrassed during her period."',
    partners: 'GGSS Dutse Alhaji School Clinic, Health Mistress & FCT Volunteer Team'
  },
  {
    id: 'outreach-sep-2026-orphanage',
    month: 'September 2026',
    date: 'September 15, 2026',
    status: 'completed',
    title: 'Abba Father Rich Orphanage Home Outreach',
    pillar: 'Child Welfare & Education',
    theme: 'Orphan Care • Welfare Support • Educational Materials',
    location: 'Plateau State',
    beneficiariesTarget: '100+ Children & Orphans',
    description: 'On the 15th of September, 2026, our team embarked on an outreach visit to Abba Father Rich Orphanage Home located in Plateau State. The purpose of the outreach was to show love, encourage the children, and provide support with essential materials for their welfare and education.',
    image: '/images/abba-father-orphanage-sep-2026.jpg',
    focusAreas: ['Orphan Care & Encouragement', 'Scholastic & Educational Supplies', 'Nutritional Provisions', 'Essential Welfare Materials'],
    deployments: [
      {
        state: 'Plateau State',
        location: 'Abba Father Rich Orphanage Home, Plateau State',
        date: 'September 15, 2026',
        beneficiaries: '100+ Resident Children',
        activity: 'Delivered food relief provisions, educational supplies, stationery kits, and clothing essentials, alongside interactive fellowship and encouragement for the children.'
      }
    ],
    feedback: '"Ten Kind Hands visit to Abba Father Rich Orphanage was a wonderfully spent moment with gifts, foodstuffs, and educational materials at a time they are needed most."',
    partners: 'Abba Father Rich Orphanage Home, Caregivers & Plateau Volunteers'
  },
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
  // --- 3. UPCOMING OUTREACH (Displayed on Homepage and Outreaches Next Mission card) ---
  {
    id: 'outreach-dec-2026',
    month: 'December 2026',
    date: 'December 2026',
    status: 'upcoming', // 'upcoming' = next planned mission
    title: 'DECEMBER 2026 OUTLOOK: FOOD RELIEF OUTREACH',
    pillar: 'Humanitarian Support & Community Welfare',
    theme: 'Food Relief • Humanitarian Support • Community Welfare',
    location: 'Vulnerable Households Across Nigeria',
    beneficiariesTarget: 'Vulnerable Households & Individuals',
    description: 'Providing essential food assistance to vulnerable households. Promoting community welfare through humanitarian intervention. Shifting focus to food assistance for vulnerable individuals and households across Nigeria. Tracking items distributed and total reach across communities.',
    needs: 'Food assistance volunteers, distribution logistics, community monitors.',
    image: '/images/hero-orphanage-food-educational-support.webp',
    focusAreas: ['Food Assistance', 'Humanitarian Support', 'Community Welfare', 'Vulnerable Households']
  }
];

/* ==============================================================================
   SECTION 3: IMPACT METRICS & HEADLINE NUMBERS (`initialMetrics`)
   ------------------------------------------------------------------------------
   Used across the Homepage Impact Grid and Transparency dashboard.
   Edit numbers (`stat`), labels (`label`), and descriptions (`detail`) here.
   ============================================================================== */
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
    stat: '200+',
    description: 'Scholarships Awarded',
    growth: '+40 New in 2026',
    color: 'text-ink',
    detail: 'Children and young people supported with access to education through scholarships and financial assistance.'
  },
  {
    id: 'patients',
    category: 'transparency',
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
    label: 'Children & Young People Reached',
    stat: '3,500+',
    description: 'Children & Young People Reached',
    growth: '+1,300',
    color: 'text-primary',
    detail: 'Children and young people supported through education, skills development, healthcare, and empowerment initiative...'
  }
];

/* ==============================================================================
   SECTION 4: FINANCIAL & FRONTLINE ALLOCATIONS (`initialAllocations`)
   ------------------------------------------------------------------------------
   Used on the Transparency and Impact pages to explain our 100% direct giving model:
     - 88.4% Frontline Programs
     - 11.6% Field Monitoring & Independent Engineering Audits
     - 0.0% Administrative Overhead (100% funded privately by Trustee Endowment)
   ============================================================================== */
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

/* ==============================================================================
   SECTION 5: HOMEPAGE CONTENT & HERO CAROUSEL (`initialHomeContent`)
   ------------------------------------------------------------------------------
   Controls the main headline, subtitle, hero photo slideshow, and "Field Reality"
   educational copy displayed on the homepage (`Home.jsx`).
   ============================================================================== */
const initialHomeContent = {
  heroHeadline: 'Helping Nigerian families learn, heal and thrive.',
  heroSubtitle: 'Scholarships, learning materials, medical outreaches and livelihood support for vulnerable children, youth, women and widows across Nigeria — with a public field report after every outreach.',
  registeredBadge: '',
  featuredLatestOutreachId: 'auto',
  featuredNextOutreachId: 'auto',
  heroSlides: [
    {
      img: '/images/november-medical-aid-outreach.jpg',
      caption: 'Medical Aid Outreach & Maternal Health Support · 387 Nursing Mothers',
      state: 'Plateau, Oyo, Katsina, Enugu & Benue'
    },
    {
      img: '/images/pad-a-girl-child-outreach-abuja.jpg',
      caption: 'Pad A Girl Child Outreach & Pad Bank Launch · GGSS Dutse Alhaji',
      state: 'FCT Abuja'
    },
    {
      img: '/images/abba-father-orphanage-sep-2026.jpg',
      caption: 'Welfare & Educational Support · Abba Father Rich Orphanage Home',
      state: 'Plateau State'
    },
    {
      img: '/images/hero-orphanage-food-educational-support.webp',
      caption: 'Food relief & school supplies donation · Oyiza Orphanage',
      state: 'FCT Abuja'
    },
    {
      img: '/images/hero-debate-competition-makurdi.webp',
      caption: 'Inter-Secondary School Debate Competition & Cash Prizes',
      state: 'Makurdi, Benue State'
    },
    {
      img: '/images/hero-digital-literacy-computer-lab.webp',
      caption: '9-Computer Laboratory Commissioning · Beckwin International',
      state: 'Plateau State'
    },
    {
      img: '/images/hero-widows-clean-cooking-stoves.webp',
      caption: 'Widows Clean Energy & Eco-Cooking Stove Distribution',
      state: 'Dafara Community'
    },
    {
      img: '/images/hero-maternal-health-malaria-prevention.webp',
      caption: 'Maternal Healthcare, Mosquito Nets & Malaria Screening',
      state: 'Lagos State'
    },
    {
      img: '/images/hero-jambells-school-outreach.webp',
      caption: 'Educational Materials & Stationery Distribution',
      state: 'JAMBELLS School, Lagos'
    },
    {
      img: '/images/hero-youth-vocational-shoemaking.webp',
      caption: 'Youth Vocational Skills & Shoemaking Apprenticeship',
      state: 'Abuja'
    },
    {
      img: '/images/11222.webp',
      caption: 'Pediatric Healthcare Support & Clinical Aid',
      state: 'Abuja Teaching Hospital'
    }
  ],
  fieldReality: {
    stat: 'Over 10M',
    label: 'Children currently out of primary school in Nigeria (UNESCO)',
    paragraph1: 'When poverty forces families to choose between putting food on the table and paying school expenses, a child’s education is often the first sacrifice. Without books, learning materials, scholarships, and the support needed to stay in school, many children risk falling behind or abandoning their education altogether. At the same time, vulnerable communities continue to face preventable health challenges, while women and widows struggle to access the skills and opportunities needed to achieve financial independence.',
    paragraph2: 'Ten Kind Hands Foundation bridges these gaps by investing in children’s education through scholarships, educational materials, school donations, learning support, and youth development initiatives, while also extending healthcare interventions and women’s empowerment programmes to vulnerable communities. By meeting immediate needs and creating pathways to opportunity, we help children learn, women thrive, and communities build a stronger and more hopeful future.'
  }
};

/* ==============================================================================
   SECTION 6: OUR STORY, LEADERSHIP & STATE COORDINATORS (`initialStoryContent`)
   ------------------------------------------------------------------------------
   Used on the About Us page (`OurStory.jsx`):
     - `visionTitle`, `visionHeadline`, `visionStatement`: Core mission text.
     - `leadership`: National executive team with photos, titles, and bios.
     - `stateCoordinators`: State-by-state field leaders across Nigeria with photos and badges.
   ============================================================================== */
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
    },
    {
      name: 'Lawrence Sunday',
      role: 'Katsina State Coordinator',
      badge: 'Katsina State',
      initials: 'LS',
      image: '/images/coordinator-katsina.jpg',
      description: 'Coordinates community engagement, education scholarships, and frontline healthcare mission delivery across Katsina State.'
    },
    {
      name: 'Kalu Praise',
      role: 'Enugu State Coordinator',
      badge: 'Enugu State',
      initials: 'KP',
      image: '/images/coordinator-enugu.jpg',
      description: 'Leads mobile clinical aid, community outreach, and educational support across rural settlements in Enugu State.'
    }
  ]
};

/* ==============================================================================
   SECTION 7: TESTIMONIALS & BENEFICIARY QUOTES (`initialTestimonialsList`)
   ------------------------------------------------------------------------------
   Used on the Testimonials page (`Testimonials.jsx`) and Partner quotes:
     - Quotes from school principals, traditional community leaders, mothers, and donors.
   ============================================================================== */
const initialTestimonialsList = [
  {
    id: 't-julimak',
    category: 'beneficiaries',
    quote: "We Appreciate TKH’s scholarship support, it eased financial pressure on families and encouraged pupils to remain focused and committed to their education.",
    author: "School Management",
    role: "Beneficiary School Management",
    institution: "Julimak Schools",
    avatar: "/images/partners/julimak-schools.webp"
  },
  {
    id: 't-jambells',
    category: 'beneficiaries',
    quote: "We Appreciate the donation of notebooks, water bottles, and writing materials. The items support students’ learning, academic motivation, and welfare.",
    author: "School Administration",
    role: "Beneficiary School Administration",
    institution: "Jambells Schools, Ikorodu",
    avatar: "/images/partners/jambells-school.webp"
  },
  {
    id: 't-home-of-gods-grace',
    category: 'beneficiaries',
    quote: "we are grateful for the food donations, including rice, semovita, spaghetti, seasoning, and noodles. the support as a source of hope and joy for the children in our care.",
    author: "Care Coordinator",
    role: "Orphans & Widows Home Care Team",
    institution: "Home of God’s Grace for Orphans and Widows",
    avatar: "/images/partners/home-of-gods-grace.webp"
  },
  {
    id: 't-phaozaan',
    category: 'beneficiaries',
    quote: "We thank TKH for its generous donations. the support brought smiles to the children and made a meaningful difference to the scholars and the school community.",
    author: "School Management",
    role: "Beneficiary School Community",
    institution: "Phaozaan Private Schools",
    avatar: "/images/partners/phaozaan-private-school.webp"
  },
  {
    id: 't-beckwin',
    category: 'beneficiaries',
    quote: "We sincerely appreciate Ten Kind Hands Foundation for providing scholarships to our children, supporting our school with a computer lab equipment and additional classrooms, and donating gift items during Children’s Day. Your generosity and commitment to education are making a lasting impact on our children and school. Thank you for being a blessing to us!",
    author: "Becky Omagbogu",
    role: "Proprietor",
    institution: "Beckwin International School, Jos",
    avatar: "/images/beckwin-international-school-scholarships.webp"
  },
  {
    id: 't-gidan-bege',
    category: 'beneficiaries',
    quote: "We express our sincere gratitude and acknowledges the received food items and writing materials to the Orphans/Vulnerable children in our ministry. The ministry will ever remain grateful to you for the love you have shown us. Our heavenly father will reward and bless you bountifully.",
    author: "Rev. Dr. Elisha Akwai",
    role: "Ministry Director",
    institution: "City Ministry of EMS/ECWA (CME) - Gidan Bege Orphanage Home",
    avatar: "/images/gidan-bege-orphanage-outreach.webp"
  },
  {
    id: 't-abba-father',
    category: 'beneficiaries',
    quote: "Ten kind hand foundation indeed is an organization that is really touching life in so many ramifications, the orphans and vulnerable ones in the society. Their visit to Abba father Rich orphanage is really a wonderfully moment spent, with gifts from the organization at a time they are needed, foodstuffs and educational materials etc. Pls keep up with your good work to humanity, Good bless you all.",
    author: "Mr. Kingsley",
    role: "Coordinator (07031160630)",
    institution: "Abba Father Rich Orphanage Home",
    avatar: "/images/abba-father-orphanage-food-distribution.webp"
  },
  {
    id: 't-giring-zawan',
    category: 'beneficiaries',
    quote: "We express our appreciation on behalf of the traditional council in GURA-LOH-GUT GIRING ABATTOIR, JOS for the exceptional community services you have rendered in our community through your empowerment program. We have recognize your efforts in developing our community and we pray that the good Lord will continue to strengthens you more in your activities in Jesus name.",
    author: "Da Stephen Davou",
    role: "Traditional Council Leader (07057558662)",
    institution: "Gura-Loh-Gut Giring Abattoir, Jos",
    avatar: "/images/giring-zawan-empowerment.webp"
  },
  {
    id: 't-house-of-recab',
    category: 'beneficiaries',
    quote: "I write on behalf of Management and Student of House of Recab Ministry International to express our heart felt appreciation for your donation(school materials) and partnership with our organization. Your assistance both now and in the future, will sustain the hope the children we have, and fuel in them the zeal for fulfilled dreams. Thanks for your love, may the good Lord continue to bless and keep you and your members in HIS love.",
    author: "Tony Tonyin",
    role: "Head of Admin/Finance (08035810389)",
    institution: "House of Recab Ministry International",
    avatar: "/images/house-of-recab-outreach.webp"
  },
  {
    id: 't-1',
    category: 'beneficiaries',
    quote: "Before Ten Kind Hands brought solar power and desks, our pupils learned on bare floors and had to go home whenever rain clouds gathered. Today, attendance has soared to over 98% and our children read aloud with pride.",
    author: "Mrs. Amina Danjuma",
    role: "Headmistress",
    institution: "Gidan Community Primary School, Kaduna State",
    avatar: "/images/IMG_0300.JPG"
  },
  {
    id: 't-2',
    category: 'beneficiaries',
    quote: "The mobile health clinic detected my child's severe pneumonia in time and provided all treatments free of charge. Having caring medical staff reach our remote hamlet is a blessing I will never forget.",
    author: "Grace Adebayo",
    role: "Mother of 3 & Community Health Advocate",
    institution: "Rural Women's Forum, Ogun State",
    avatar: "/images/IMG_0995.JPG"
  },
  {
    id: 't-3',
    category: 'beneficiaries',
    quote: "Ten Kind Hands does not dictate to us; they sit with village elders and ask what our youth need most. This is genuine dignity, respect for our culture, and true partnership.",
    author: "Chief Emeka Okafor",
    role: "Community Elder & Development Secretary",
    institution: "Oji River Council, Enugu State",
    avatar: "/images/IMG_0994.JPG"
  },
  {
    id: 't-4',
    category: 'volunteers',
    quote: "Serving as a volunteer doctor on the Kaduna medical mission was the most grounding experience of my clinical career. Seeing 100% of donated drugs reach patients directly restored my faith in grassroots charity.",
    author: "Dr. Chinedu Eze",
    role: "Volunteer Pediatrician",
    institution: "Lagos University Teaching Hospital",
    avatar: "/images/IMG_0294.JPG"
  },
  {
    id: 't-5',
    category: 'donors',
    quote: "What sets TKH apart is their radical financial honesty. Getting an email with GPS coordinates and photos of the exact classroom block my monthly contribution helped build was deeply moving.",
    author: "Farida Mohammed",
    role: "Monthly Impact Sustainer",
    institution: "Abuja, Nigeria",
    avatar: "/images/IMG_0300.JPG"
  },
  {
    id: 't-6',
    category: 'partners',
    quote: "Our diaspora foundation has partnered with Ten Kind Hands across three Nigerian states. Their operational discipline and flawless accounting make them our most trusted on-ground implementation partner.",
    author: "Dr. Anthony Nwankwo",
    role: "Director of International Giving",
    institution: "UK-Nigeria Diaspora Health Trust",
    avatar: "/images/IMG_0994.JPG"
  }
];

/* ==============================================================================
   SECTION 8: CONTACT DETAILS & HEADQUARTERS (`initialContactInfo`)
   ------------------------------------------------------------------------------
   Official corporate and operational contacts:
     - Office address, CAC registration number, phone, email, WhatsApp desk.
   ============================================================================== */
const initialContactInfo = {
  headquarters: 'Danglo plaza 204, 6th Avenue Gwarinpa, Abuja - Nigeria',
  rcNumber: 'RC: 7015705',
  cacStatus: 'CAC RC: 7015705 (Incorporated Non-Profit)',
  email: 'info@tenkindhands.org',
  partnershipsEmail: 'info@tenkindhands.org',
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

/* ==============================================================================
   SECTION 9: DATA SANITIZATION & LOCALSTORAGE CACHE SYNCHRONIZATION (`sanitizeData`)
   ------------------------------------------------------------------------------
   WHY THIS FUNCTION EXISTS:
   Browsers save data in `localStorage` so the website loads instantly.
   When you edit code in `initialOutreaches` (e.g. adding a new field report or
   updating the upcoming mission), this function ensures your live code updates
   are automatically merged into any visitor's existing browser storage!
   ============================================================================== */
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
    if (
      !cleaned.homeContent.heroHeadline ||
      cleaned.homeContent.heroHeadline.includes('Keeping Nigerian children') ||
      cleaned.homeContent.heroHeadline.includes('Empowering children')
    ) {
      cleaned.homeContent = {
        ...cleaned.homeContent,
        heroHeadline: initialHomeContent.heroHeadline
      };
    }
    if (
      !cleaned.homeContent.heroSubtitle ||
      cleaned.homeContent.heroSubtitle.includes('We fund scholarships') ||
      cleaned.homeContent.heroSubtitle.includes('We provide scholarships')
    ) {
      cleaned.homeContent = {
        ...cleaned.homeContent,
        heroSubtitle: initialHomeContent.heroSubtitle
      };
    }
    if (
      cleaned.homeContent.registeredBadge &&
      cleaned.homeContent.registeredBadge.includes('Registered non-profit · CAC RC 7015705 · Abuja')
    ) {
      cleaned.homeContent = {
        ...cleaned.homeContent,
        registeredBadge: ''
      };
    }
    const slides = cleaned.homeContent.heroSlides;
    const hasValidSlides = Array.isArray(slides) && slides.length > 0 && slides.some((s) => s.img && s.img.includes('hero-orphanage'));
    if (!hasValidSlides) {
      cleaned.homeContent = {
        ...cleaned.homeContent,
        heroSlides: initialHomeContent.heroSlides
      };
    }
  }
  if (cleaned.storyContent) {
    if (!Array.isArray(cleaned.storyContent.stateCoordinators) || cleaned.storyContent.stateCoordinators.length < 7) {
      cleaned.storyContent = {
        ...cleaned.storyContent,
        stateCoordinators: initialStoryContent.stateCoordinators
      };
    } else {
      // Ensure coordinator names, photos, and roles are synchronized with latest updates
      cleaned.storyContent.stateCoordinators = cleaned.storyContent.stateCoordinators.map((c) => {
        if (
          c.name === 'Katsina Coordinator' ||
          c.badge?.includes('Katsina') ||
          c.role?.includes('Katsina') ||
          c.state === 'KATSINA'
        ) {
          return {
            ...c,
            name: 'Lawrence Sunday',
            role: 'Katsina State Coordinator',
            badge: 'Katsina State',
            initials: 'LS',
            image: '/images/coordinator-katsina.jpg',
            description:
              'Coordinates community engagement, education scholarships, and frontline healthcare mission delivery across Katsina State.'
          };
        }
        if (
          c.name === 'Enugu Coordinator' ||
          c.badge?.includes('Enugu') ||
          c.role?.includes('Enugu') ||
          c.state === 'ENUGU'
        ) {
          return {
            ...c,
            name: 'Kalu Praise',
            role: 'Enugu State Coordinator',
            badge: 'Enugu State',
            initials: 'KP',
            image: '/images/coordinator-enugu.jpg',
            description:
              'Leads mobile clinical aid, community outreach, and educational support across rural settlements in Enugu State.'
          };
        }
        return c;
      });
    }
  }
  if (Array.isArray(cleaned.outreaches)) {
    // 1. Remove obsolete placeholder missions
    cleaned.outreaches = cleaned.outreaches.filter(
      (o) => o.id !== 'outreach-nov-2026' && o.id !== 'outreach-oct-2026'
    );

    // 2. Ensure November 2026 Medical Aid outreach is present as completed at the top
    if (!cleaned.outreaches.some((o) => o.id === 'outreach-nov-2026-medical-aid')) {
      const novOutreach = initialOutreaches.find((o) => o.id === 'outreach-nov-2026-medical-aid');
      if (novOutreach) {
        cleaned.outreaches = [novOutreach, ...cleaned.outreaches];
      }
    }

    // 3. Ensure Pad A Girl Child reflects October 2026
    cleaned.outreaches = cleaned.outreaches.map((o) => {
      if (o.id === 'outreach-sep-2026-pad-bank') {
        return {
          ...o,
          month: 'October 2026',
          date: 'October 20, 2026'
        };
      }
      return o;
    });

    // 4. Ensure Pad A Girl Child is in the list
    if (!cleaned.outreaches.some((o) => o.id === 'outreach-sep-2026-pad-bank')) {
      const padOutreach = initialOutreaches.find((o) => o.id === 'outreach-sep-2026-pad-bank');
      if (padOutreach) {
        const novIdx = cleaned.outreaches.findIndex((o) => o.id === 'outreach-nov-2026-medical-aid');
        if (novIdx >= 0) {
          cleaned.outreaches.splice(novIdx + 1, 0, padOutreach);
        } else {
          cleaned.outreaches = [padOutreach, ...cleaned.outreaches];
        }
      }
    }

    // 5. Ensure Abba Father Orphanage is in the list
    if (!cleaned.outreaches.some((o) => o.id === 'outreach-sep-2026-orphanage')) {
      const orphanageOutreach = initialOutreaches.find((o) => o.id === 'outreach-sep-2026-orphanage');
      if (orphanageOutreach) {
        const padIdx = cleaned.outreaches.findIndex((o) => o.id === 'outreach-sep-2026-pad-bank');
        if (padIdx >= 0) {
          cleaned.outreaches.splice(padIdx + 1, 0, orphanageOutreach);
        } else {
          cleaned.outreaches = [orphanageOutreach, ...cleaned.outreaches];
        }
      }
    }

    // 6. Ensure upcoming December 2026 Food Relief outreach is updated with latest details
    const decOutreach = initialOutreaches.find((o) => o.id === 'outreach-dec-2026');
    if (decOutreach) {
      const decIdx = cleaned.outreaches.findIndex((o) => o.id === 'outreach-dec-2026' || o.status === 'upcoming');
      if (decIdx >= 0) {
        cleaned.outreaches[decIdx] = decOutreach;
      } else {
        cleaned.outreaches.push(decOutreach);
      }
    }
  } else {
    cleaned.outreaches = initialOutreaches;
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
  if (cleaned.homeContent) {
    if (!cleaned.homeContent.heroHeadline || cleaned.homeContent.heroHeadline.includes('Empowering children')) {
      cleaned.homeContent.heroHeadline = initialHomeContent.heroHeadline;
    }
  }
  if (Array.isArray(cleaned.testimonialsList)) {
    cleaned.testimonialsList = cleaned.testimonialsList.map((t) => {
      if (t.id === 't-jambells' || t.institution?.includes('Jambells')) {
        return {
          ...t,
          avatar: '/images/partners/jambells-school.webp'
        };
      }
      if (t.id === 't-home-of-gods-grace' || t.institution?.includes("God's Grace") || t.institution?.includes("God’s Grace")) {
        return {
          ...t,
          avatar: '/images/partners/home-of-gods-grace.webp'
        };
      }
      return t;
    });
    const existingIds = new Set(cleaned.testimonialsList.map((t) => t.id || t.institution));
    initialTestimonialsList.forEach((it) => {
      if (!existingIds.has(it.id) && !existingIds.has(it.institution)) {
        cleaned.testimonialsList.unshift(it);
      }
    });
  } else {
    cleaned.testimonialsList = initialTestimonialsList;
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
      'schools': '200+',
      'patients': '2,500+',
      'giving-model': '100%',
      'clinics': '130+',
      'metric-1790695260926': '3,500+'
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
