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
  'not-found': {
    title: '404 - Page Not Found | Ten Kind Hands',
    description: 'The requested page could not be found on Ten Kind Hands Foundation.'
  }
};

// Aliases for clean URL paths
PAGE_METADATA['about'] = PAGE_METADATA['our-story'];
PAGE_METADATA['about-us'] = PAGE_METADATA['our-story'];
PAGE_METADATA['donate'] = PAGE_METADATA['get-involved'];
PAGE_METADATA['volunteer'] = PAGE_METADATA['get-involved'];
PAGE_METADATA['field-reports'] = PAGE_METADATA['outreaches'];
PAGE_METADATA['our-work'] = PAGE_METADATA['programs'];
PAGE_METADATA['programmes'] = PAGE_METADATA['programs'];

const VALID_PAGES = new Set([
  'home',
  'about',
  'about-us',
  'our-story',
  'story',
  'programs',
  'programmes',
  'our-work',
  'impact',
  'metrics',
  'audits',
  'get-involved',
  'donate',
  'give',
  'volunteer',
  'volunteering',
  'partner',
  'partners',
  'news',
  'videos',
  'dispatches',
  'outreaches',
  'reports',
  'report',
  'field-reports',
  'field-report',
  'testimonials',
  'transparency',
  'contact',
  'legal'
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

  // Sync pathname and hash routing so /about, /donate, /field-reports etc. work seamlessly
  useEffect(() => {
    const handleRouteChange = () => {
      // 1. Check hash first (e.g. #/about, #about, #donate)
      const rawHash = (window.location.hash || '').replace(/^#\/?/, '').replace(/\/+$/, '').trim().toLowerCase();
      
      // 2. Check pathname (e.g. /about, /donate, /field-reports)
      let rawPath = (window.location.pathname || '').replace(/^\/+|\/+$/g, '').trim().toLowerCase();
      if (rawPath === 'index.html' || rawPath === 'index') {
        rawPath = '';
      }

      // Hash takes priority if present, otherwise path
      const route = rawHash || rawPath || 'home';

      // Check for anchor scroll target (e.g. education, health, livelihoods)
      const fullUrl = (window.location.href || '').toLowerCase();
      const anchorMatch = fullUrl.match(/#(?:education|health|livelihoods)/i);
      const targetAnchor = anchorMatch ? anchorMatch[0].replace('#', '').toLowerCase() : null;

      if (targetAnchor) {
        setCurrentPage('programs');
        setSelectedProgramId(null);
        setTimeout(() => {
          const el = document.getElementById(targetAnchor);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
        return;
      }

      if (!route || route === 'home') {
        setCurrentPage('home');
        setSelectedProgramId(null);
        setSelectedOutreachId(null);
      } else if (route === 'about' || route === 'about-us' || route === 'our-story' || route === 'story') {
        setCurrentPage('our-story');
      } else if (
        route === 'our-work' ||
        route === 'programs' ||
        route === 'programmes'
      ) {
        setCurrentPage('programs');
        setSelectedProgramId(null);
      } else if (
        route.startsWith('programs/') ||
        route.startsWith('our-work/') ||
        route.startsWith('programmes/')
      ) {
        const parts = route.split('/');
        setCurrentPage('programs');
        setSelectedProgramId(parts[1] || null);
      } else if (
        route === 'field-reports' ||
        route === 'field-report' ||
        route === 'outreaches' ||
        route === 'reports' ||
        route === 'report'
      ) {
        setCurrentPage('outreaches');
        setSelectedOutreachId(null);
      } else if (
        route.startsWith('field-reports/') ||
        route.startsWith('field-report/') ||
        route.startsWith('outreaches/') ||
        route.startsWith('reports/') ||
        route.startsWith('report/')
      ) {
        const parts = route.split('/');
        setCurrentPage('outreaches');
        setSelectedOutreachId(parts[1] || null);
      } else if (route === 'donate' || route === 'give') {
        setCurrentPage('get-involved');
        setSelectedGetInvolvedTab('donate');
        setIsDonateOpen(true);
      } else if (route === 'volunteer' || route === 'volunteering') {
        setCurrentPage('get-involved');
        setSelectedGetInvolvedTab('volunteer');
      } else if (route === 'partner' || route === 'partners' || route === 'partnership') {
        setCurrentPage('get-involved');
        setSelectedGetInvolvedTab('partner');
      } else if (route.startsWith('get-involved/')) {
        const parts = route.split('/');
        setCurrentPage('get-involved');
        setSelectedGetInvolvedTab(parts[1] || 'donate');
      } else if (route === 'get-involved') {
        setCurrentPage('get-involved');
        setSelectedGetInvolvedTab('donate');
      } else if (route === 'impact' || route === 'metrics' || route === 'audits') {
        setCurrentPage('impact');
      } else if (route === 'transparency' || route === 'financials') {
        setCurrentPage('transparency');
      } else if (route === 'news' || route === 'videos' || route === 'dispatches') {
        setCurrentPage('news');
      } else if (route === 'testimonials' || route === 'letters' || route === 'stories') {
        setCurrentPage('testimonials');
      } else if (route === 'contact' || route === 'contact-us') {
        setCurrentPage('contact');
      } else if (route.startsWith('legal/')) {
        const parts = route.split('/');
        setCurrentPage('legal');
        setSelectedLegalTab(parts[1] || 'privacy');
      } else if (route === 'legal' || route === 'privacy' || route === 'terms') {
        setCurrentPage('legal');
        setSelectedLegalTab(route === 'terms' ? 'terms' : 'privacy');
      } else if (VALID_PAGES.has(route)) {
        setCurrentPage(route);
      } else {
        // Unknown route -> 404
        setCurrentPage('not-found');
      }

      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    handleRouteChange();
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
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
      case 'about':
      case 'about-us':
      case 'story':
        return <OurStory onOpenDonate={handleOpenDonate} setCurrentPage={setCurrentPage} />;
      case 'programs':
      case 'programmes':
      case 'our-work':
        return (
          <Programs
            onOpenDonate={handleOpenDonate}
            setCurrentPage={setCurrentPage}
            selectedProgramId={selectedProgramId}
            onSelectProgram={(progId) => setSelectedProgramId(progId)}
          />
        );
      case 'impact':
      case 'metrics':
      case 'audits':
        return <Impact onOpenDonate={handleOpenDonate} />;
      case 'get-involved':
      case 'donate':
      case 'volunteer':
      case 'volunteering':
      case 'partner':
      case 'partners':
      case 'partnership':
        return (
          <GetInvolved
            onOpenDonate={handleOpenDonate}
            initialTab={selectedGetInvolvedTab}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'news':
      case 'videos':
      case 'dispatches':
        return <News setCurrentPage={setCurrentPage} onOpenDonate={handleOpenDonate} />;
      case 'outreaches':
      case 'field-reports':
      case 'field-report':
      case 'reports':
      case 'report':
        return (
          <Outreaches
            setCurrentPage={setCurrentPage}
            onOpenDonate={handleOpenDonate}
            selectedOutreachId={selectedOutreachId}
            onSelectOutreach={(id) => setSelectedOutreachId(id)}
          />
        );
      case 'testimonials':
      case 'letters':
      case 'stories':
        return <Testimonials onOpenDonate={handleOpenDonate} />;
      case 'transparency':
      case 'financials':
        return <Transparency onOpenDonate={handleOpenDonate} setCurrentPage={setCurrentPage} />;
      case 'contact':
      case 'contact-us':
        return <Contact />;
      case 'legal':
      case 'privacy':
      case 'terms':
        return <Legal initialTab={selectedLegalTab} />;
      case 'not-found':
      default:
        return <NotFound setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <DataProvider>
      <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-[#1c1c1a] antialiased">
        {/* Global Navbar */}
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onOpenDonate={() => handleOpenDonate(null)}
          onSelectProgram={(progId) => setSelectedProgramId(progId)}
          onSelectGetInvolvedTab={(tab) => setSelectedGetInvolvedTab(tab)}
        />

        {/* Main Active Page Component */}
        <main className="flex-grow bg-[#fdfbf7]">
          {renderCurrentPage()}
        </main>

        {/* Persistent WhatsApp Floating Widget */}
        <WhatsAppWidget
          currentPage={currentPage}
          selectedProgram={selectedProgramId}
        />

        {/* Global Modal for Multi-Currency Impact Donation */}
        <DonateModal
          isOpen={isDonateOpen}
          initialAmount={donateInitialAmount}
          onClose={() => {
            setIsDonateOpen(false);
            setDonateInitialAmount(null);
          }}
        />

        {/* Global Footer */}
        <Footer
          setCurrentPage={setCurrentPage}
          onOpenDonate={() => handleOpenDonate(null)}
          onSelectLegalTab={(tab) => setSelectedLegalTab(tab)}
          onSelectProgram={(progId) => setSelectedProgramId(progId)}
          onSelectGetInvolvedTab={(tab) => setSelectedGetInvolvedTab(tab)}
        />
      </div>
    </DataProvider>
  );
}
