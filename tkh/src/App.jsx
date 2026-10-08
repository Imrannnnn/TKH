import { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DonateModal from './components/DonateModal';
import WhatsAppWidget from './components/WhatsAppWidget';

import Home from './pages/Home';
import OurStory from './pages/OurStory';
import Programs from './pages/Programs';
import Impact from './pages/Impact';
import GetInvolved from './pages/GetInvolved';
import News from './pages/News';
import Outreaches from './pages/Outreaches';
import Testimonials from './pages/Testimonials';
import Transparency from './pages/Transparency';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

const PAGE_METADATA = {
  home: {
    title: 'Ten Kind Hands | Restoring Dignity Through Education & Healthcare in Nigeria',
    description: 'Ten Kind Hands Initiative is a CAC-registered non-profit foundation (RC: 7015705) operating a 100% direct-giving model for education, healthcare, and women empowerment across Nigeria.'
  },
  'our-story': {
    title: 'Our Story & Origin | Ten Kind Hands Foundation',
    description: 'Learn about the origins, trustees, state coordinators, and mission of Ten Kind Hands Foundation across Nigeria.'
  },
  programs: {
    title: 'Programs & Core Initiatives | Ten Kind Hands',
    description: 'Explore our 6 core sustainable initiatives: education scholarships, medical outreaches, women & widows empowerment, school donations, and youth development.'
  },
  impact: {
    title: 'Audited Impact Metrics | Ten Kind Hands',
    description: 'Verifiable impact: over 3,300+ children and youths reached, 130+ communities served, and 100% direct public donation allocation.'
  },
  'get-involved': {
    title: 'Get Involved - Donate & Volunteer | Ten Kind Hands',
    description: 'Partner with Ten Kind Hands through direct donations, volunteer field missions, and corporate CSR partnerships in Nigeria.'
  },
  news: {
    title: 'News & Outreach Dispatches | Ten Kind Hands',
    description: 'Documentary stories, field reports, and video dispatches from our community outreaches and school commissioning missions.'
  },
  videos: {
    title: 'Outreach Videos & Field Documentaries | Ten Kind Hands',
    description: 'Watch video documentation of our frontline educational and medical outreaches across Nigerian communities.'
  },
  outreaches: {
    title: 'Field Outreaches Log | Ten Kind Hands',
    description: 'Scheduled and completed humanitarian missions with GPS coordinates, beneficiary tallies, and photographic records.'
  },
  testimonials: {
    title: 'Community Letters & Beneficiary Stories | Ten Kind Hands',
    description: 'Letters of appreciation and testimonials from school proprietors, community leaders, and families supported by Ten Kind Hands.'
  },
  transparency: {
    title: 'Financial Transparency & 100% Direct Giving | Ten Kind Hands',
    description: 'Open Books, Pure Trust. 100% of public donations fund frontline deliverables. Trustee endowments privately fund all administration. CAC RC: 7015705.'
  },
  contact: {
    title: 'Contact National Secretariat | Ten Kind Hands',
    description: 'Reach our national secretariat at Danglo Plaza, Gwarinpa, Abuja, or connect directly with our live WhatsApp coordination desk.'
  },
  legal: {
    title: 'Legal, Privacy Policy & Terms | Ten Kind Hands',
    description: 'Privacy policy, terms of service, safeguarding commitments, and non-profit governance charter of Ten Kind Hands Initiative.'
  },
  admin: {
    title: 'Super Admin Command Console | Ten Kind Hands',
    description: 'Secure operational content and field dispatch administration console.'
  },
  'not-found': {
    title: '404 - Page Not Found | Ten Kind Hands',
    description: 'The requested page could not be found on Ten Kind Hands Foundation.'
  }
};

const VALID_PAGES = new Set([
  'home',
  'our-story',
  'programs',
  'impact',
  'get-involved',
  'news',
  'videos',
  'outreaches',
  'testimonials',
  'transparency',
  'contact',
  'legal',
  'admin',
  'reports',
  'report',
  'field-reports',
  'field-report'
]);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [selectedOutreachId, setSelectedOutreachId] = useState(null);
  const [selectedGetInvolvedTab, setSelectedGetInvolvedTab] = useState('donate');
  const [selectedLegalTab, setSelectedLegalTab] = useState('privacy');
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [donateInitialAmount, setDonateInitialAmount] = useState(null);

  const handleOpenDonate = (amount) => {
    setDonateInitialAmount(amount || null);
    setIsDonateOpen(true);
  };

  // Sync hash routing and address bar
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '').trim();
      const hash = rawHash.replace(/^\/+/, '');
      if (!hash) {
        setCurrentPage('home');
        return;
      }

      if (hash.startsWith('programs/')) {
        const progId = hash.replace('programs/', '');
        setCurrentPage('programs');
        setSelectedProgramId(progId);
      } else if (hash.startsWith('outreaches/')) {
        const outreachId = hash.replace('outreaches/', '');
        setCurrentPage('outreaches');
        setSelectedOutreachId(outreachId);
      } else if (
        hash.startsWith('reports/') ||
        hash.startsWith('report/') ||
        hash.startsWith('field-reports/') ||
        hash.startsWith('field-report/')
      ) {
        const parts = hash.split('/');
        const outreachId = parts[1] || null;
        setCurrentPage('outreaches');
        setSelectedOutreachId(outreachId);
      } else if (
        hash === 'reports' ||
        hash === 'report' ||
        hash === 'field-reports' ||
        hash === 'field-report'
      ) {
        setCurrentPage('outreaches');
        setSelectedOutreachId(null);
      } else if (hash === 'about' || hash === 'about-us' || hash === 'story') {
        setCurrentPage('our-story');
      } else if (hash.startsWith('get-involved/')) {
        const tab = hash.replace('get-involved/', '');
        setCurrentPage('get-involved');
        setSelectedGetInvolvedTab(tab);
      } else if (hash === 'donate') {
        setCurrentPage('get-involved');
        setSelectedGetInvolvedTab('donate');
        setIsDonateOpen(true);
      } else if (hash === 'volunteer') {
        setCurrentPage('get-involved');
        setSelectedGetInvolvedTab('volunteer');
      } else if (hash.startsWith('legal/')) {
        const tab = hash.replace('legal/', '');
        setCurrentPage('legal');
        setSelectedLegalTab(tab);
      } else if (VALID_PAGES.has(hash)) {
        if (hash === 'programs') {
          setSelectedProgramId(null);
        }
        if (hash === 'outreaches') {
          setSelectedOutreachId(null);
        }
        setCurrentPage(hash);
      } else {
        // Unknown address -> show 404 page
        setCurrentPage('not-found');
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update document title & metadata dynamically
  useEffect(() => {
    const meta = PAGE_METADATA[currentPage] || PAGE_METADATA['not-found'];
    let pageTitle = meta.title;
    if (currentPage === 'programs' && selectedProgramId) {
      const formattedProg = selectedProgramId
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      pageTitle = `${formattedProg} Initiative | Ten Kind Hands`;
    } else if (currentPage === 'outreaches' && selectedOutreachId) {
      pageTitle = `Field Report | Ten Kind Hands`;
    }
    document.title = pageTitle;

    const descTag = document.querySelector('meta[name="description"]');
    if (descTag && meta.description) {
      descTag.setAttribute('content', meta.description);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', pageTitle);
  }, [currentPage, selectedProgramId]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onOpenDonate={handleOpenDonate} setCurrentPage={setCurrentPage} />;
      case 'our-story':
        return <OurStory onOpenDonate={handleOpenDonate} setCurrentPage={setCurrentPage} />;
      case 'programs':
        return (
          <Programs
            onOpenDonate={handleOpenDonate}
            setCurrentPage={setCurrentPage}
            selectedProgramId={selectedProgramId}
            onSelectProgram={(progId) => setSelectedProgramId(progId)}
          />
        );
      case 'impact':
        return <Impact onOpenDonate={handleOpenDonate} />;
      case 'get-involved':
        return (
          <GetInvolved
            onOpenDonate={handleOpenDonate}
            initialTab={selectedGetInvolvedTab}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'news':
      case 'videos':
        return <News setCurrentPage={setCurrentPage} onOpenDonate={handleOpenDonate} />;
      case 'outreaches':
        return (
          <Outreaches
            setCurrentPage={setCurrentPage}
            onOpenDonate={handleOpenDonate}
            selectedOutreachId={selectedOutreachId}
            onSelectOutreach={(id) => setSelectedOutreachId(id)}
          />
        );
      case 'testimonials':
        return <Testimonials onOpenDonate={handleOpenDonate} />;
      case 'transparency':
        return <Transparency onOpenDonate={handleOpenDonate} setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <Contact />;
      case 'legal':
        return <Legal initialTab={selectedLegalTab} />;
      case 'admin':
        return <Admin setCurrentPage={setCurrentPage} />;
      case 'not-found':
      default:
        return <NotFound setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <DataProvider>
      <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-[#1c1c1a] antialiased">
        {/* Global Navbar (Hidden on Admin page for dedicated enterprise app shell) */}
        {currentPage !== 'admin' && (
          <Navbar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onOpenDonate={() => handleOpenDonate(null)}
            onSelectProgram={(progId) => setSelectedProgramId(progId)}
            onSelectGetInvolvedTab={(tab) => setSelectedGetInvolvedTab(tab)}
          />
        )}

        {/* Main Active Page Component */}
        <main className="flex-grow bg-[#fdfbf7]">
          {renderCurrentPage()}
        </main>

        {/* Persistent WhatsApp Floating Widget (Hidden on Admin page) */}
        {currentPage !== 'admin' && (
          <WhatsAppWidget
            currentPage={currentPage}
            selectedProgram={selectedProgramId}
          />
        )}

        {/* Global Modal for Multi-Currency Impact Donation */}
        <DonateModal
          isOpen={isDonateOpen}
          initialAmount={donateInitialAmount}
          onClose={() => {
            setIsDonateOpen(false);
            setDonateInitialAmount(null);
          }}
        />

        {/* Global Footer (Hidden on Admin page for a focused dashboard experience) */}
        {currentPage !== 'admin' && (
          <Footer
            setCurrentPage={setCurrentPage}
            onOpenDonate={() => handleOpenDonate(null)}
            onSelectLegalTab={(tab) => setSelectedLegalTab(tab)}
            onSelectProgram={(progId) => setSelectedProgramId(progId)}
            onSelectGetInvolvedTab={(tab) => setSelectedGetInvolvedTab(tab)}
          />
        )}
      </div>
    </DataProvider>
  );
}
