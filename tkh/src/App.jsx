import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [selectedGetInvolvedTab, setSelectedGetInvolvedTab] = useState('donate');
  const [selectedLegalTab, setSelectedLegalTab] = useState('privacy');
  const [isDonateOpen, setIsDonateOpen] = useState(false);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) {
        setCurrentPage('home');
        return;
      }

      if (hash.startsWith('programs/')) {
        const progId = hash.replace('programs/', '');
        setCurrentPage('programs');
        setSelectedProgramId(progId);
      } else if (hash.startsWith('get-involved/')) {
        const tab = hash.replace('get-involved/', '');
        setCurrentPage('get-involved');
        setSelectedGetInvolvedTab(tab);
      } else if (hash.startsWith('legal/')) {
        const tab = hash.replace('legal/', '');
        setCurrentPage('legal');
        setSelectedLegalTab(tab);
      } else {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onOpenDonate={() => setIsDonateOpen(true)} setCurrentPage={setCurrentPage} />;
      case 'our-story':
        return <OurStory onOpenDonate={() => setIsDonateOpen(true)} setCurrentPage={setCurrentPage} />;
      case 'programs':
        return (
          <Programs
            onOpenDonate={() => setIsDonateOpen(true)}
            setCurrentPage={setCurrentPage}
            initialProgramId={selectedProgramId}
          />
        );
      case 'impact':
        return <Impact onOpenDonate={() => setIsDonateOpen(true)} />;
      case 'get-involved':
        return (
          <GetInvolved
            onOpenDonate={() => setIsDonateOpen(true)}
            initialTab={selectedGetInvolvedTab}
          />
        );
      case 'news':
        return <News setCurrentPage={setCurrentPage} />;
      case 'outreaches':
        return (
          <Outreaches
            setCurrentPage={setCurrentPage}
            onOpenDonate={() => setIsDonateOpen(true)}
          />
        );
      case 'testimonials':
        return <Testimonials onOpenDonate={() => setIsDonateOpen(true)} />;
      case 'transparency':
        return <Transparency onOpenDonate={() => setIsDonateOpen(true)} />;
      case 'contact':
        return <Contact />;
      case 'legal':
        return <Legal initialTab={selectedLegalTab} />;
      case 'admin':
        return <Admin setCurrentPage={setCurrentPage} />;
      default:
        return <Home onOpenDonate={() => setIsDonateOpen(true)} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <DataProvider>
      <div className="min-h-screen flex flex-col bg-white text-[#1e1a1a] antialiased">
        {/* Global Navbar (Hidden on Admin page for dedicated enterprise app shell) */}
        {currentPage !== 'admin' && (
          <Navbar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onOpenDonate={() => setIsDonateOpen(true)}
            onSelectProgram={(progId) => setSelectedProgramId(progId)}
            onSelectGetInvolvedTab={(tab) => setSelectedGetInvolvedTab(tab)}
          />
        )}

        {/* Main Active Page Component */}
        <main className="flex-grow bg-white">
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
          onClose={() => setIsDonateOpen(false)}
        />

        {/* Global Footer (Hidden on Admin page for a focused dashboard experience) */}
        {currentPage !== 'admin' && (
          <Footer
            setCurrentPage={setCurrentPage}
            onOpenDonate={() => setIsDonateOpen(true)}
            onSelectLegalTab={(tab) => setSelectedLegalTab(tab)}
          />
        )}
      </div>
    </DataProvider>
  );
}
