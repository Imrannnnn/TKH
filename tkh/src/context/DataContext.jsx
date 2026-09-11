import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'tkh_platform_data_v2';

export const initialNewsArticles = [
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

export const initialOutreaches = [
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

export const initialMetrics = [
  {
    id: 'students',
    category: 'education',
    iconName: 'School',
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
    iconName: 'BookOpen',
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
    iconName: 'Stethoscope',
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
    iconName: 'Stethoscope',
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
    iconName: 'Droplets',
    label: 'Clean Water',
    stat: '28',
    description: 'Solar Deep Boreholes',
    growth: '+8 This Year',
    color: 'text-primary',
    detail: 'Deep aquifer boreholes supplying over 70,000 liters of safe drinking water daily to rural hamlets.'
  }
];

export const initialAllocations = [
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

export const initialDocuments = [
  {
    id: 'doc-1',
    title: '2025 Audited Financial Statement (PDF)',
    size: '2.4 MB',
    date: 'Published June 2026',
    auditor: 'Bakare & Co. Chartered Accountants'
  },
  {
    id: 'doc-2',
    title: '2024 Audited Financial Statement (PDF)',
    size: '2.1 MB',
    date: 'Published June 2025',
    auditor: 'Bakare & Co. Chartered Accountants'
  },
  {
    id: 'doc-3',
    title: 'CAC Certificate of Incorporation (IT/NO: 148920)',
    size: '1.2 MB',
    date: 'Incorporated Nigeria',
    auditor: 'Corporate Affairs Commission'
  },
  {
    id: 'doc-4',
    title: 'SCUML Anti-Money Laundering Compliance Certificate',
    size: '950 KB',
    date: 'Certified',
    auditor: 'Special Control Unit Against Money Laundering (EFCC)'
  },
  {
    id: 'doc-5',
    title: 'Ten Kind Hands Child Protection & Safeguarding Policy',
    size: '1.8 MB',
    date: 'Revised 2026',
    auditor: 'Ethics & Legal Review Committee'
  }
];

export const initialAnnouncement = 'Commissioning new solar classrooms in Kaduna & mobile health clinic in Enugu';

export const initialInquiries = [
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

const defaultData = {
  news: initialNewsArticles,
  outreaches: initialOutreaches,
  metrics: initialMetrics,
  allocations: initialAllocations,
  documents: initialDocuments,
  announcement: initialAnnouncement,
  inquiries: initialInquiries
};

const API_BASE = 'http://localhost:5000/api';
const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          news: parsed.news || defaultData.news,
          outreaches: parsed.outreaches || defaultData.outreaches,
          metrics: parsed.metrics || defaultData.metrics,
          allocations: parsed.allocations || defaultData.allocations,
          documents: parsed.documents || defaultData.documents,
          announcement: parsed.announcement ?? defaultData.announcement,
          inquiries: parsed.inquiries || defaultData.inquiries
        };
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
      .then((remoteData) => {
        if (isMounted && remoteData && Array.isArray(remoteData.news)) {
          setData(remoteData);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteData));
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
  const addInquiry = (inquiry) => {
    const newInquiry = {
      ...inquiry,
      id: inquiry.id || `inq-${Date.now()}`,
      date: inquiry.date || new Date().toISOString().split('T')[0],
      status: inquiry.status || 'New'
    };
    setData((prev) => ({ ...prev, inquiries: [newInquiry, ...prev.inquiries] }));

    fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInquiry)
    }).catch((err) => console.warn('Sync inquiry to backend:', err.message));

    return newInquiry;
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
        inquiries: parsed.inquiries || defaultData.inquiries
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
