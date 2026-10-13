import { useState, useMemo } from 'react';
import { useData, getApiBase } from '../context/DataContext';
import HomePageEditor from './admin/HomePageEditor';
import StoryPageEditor from './admin/StoryPageEditor';
import TestimonialsPageEditor from './admin/TestimonialsPageEditor';
import ContactPageEditor from './admin/ContactPageEditor';
import {
  Lock,
  Unlock,
  Plus,
  Trash2,
  Edit3,
  LogOut,
  RefreshCw,
  Layers,
  Search,
  AlertTriangle,
  Save,
  CheckCircle2,
  Calendar,
  MapPin,
  Users,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  ShieldCheck,
  Globe,
  Mail,
  Eye,
  X,
  Menu,
  Database,
  ChevronRight,
  ExternalLink,
  Download,
  Check,
  Quote
} from '../components/Icons';

export default function Admin({ setCurrentPage }) {
  const {
    news,
    addNews,
    updateNews,
    deleteNews,
    outreaches,
    addOutreach,
    updateOutreach,
    deleteOutreach,
    metrics,
    updateMetric,
    addMetric,
    deleteMetric,
    allocations,
    updateAllocations,
    announcement,
    updateAnnouncement,
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    homeContent,
    updateHomeContent,
    storyContent,
    updateStoryContent,
    updateStoryCoordinators,
    updateStoryLeadership,
    testimonialsList,
    updateTestimonials,
    addTestimonial,
    deleteTestimonial,
    contactInfo,
    updateContactInfo,
    resetToDefaults,
    exportDataBackup
  } = useData();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('tkh_admin_auth') === 'true';
  });
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('tkh_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Super Admin Password Update state
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState({ type: '', message: '' });

  // Active admin tab (Organized by Website Page)
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Sub-section filters for pages with list data
  const [newsSearch, setNewsSearch] = useState('');
  const [newsCategoryFilter, setNewsCategoryFilter] = useState('All');
  const [outreachSearch, setOutreachSearch] = useState('');
  const [outreachStatusFilter, setOutreachStatusFilter] = useState('All');

  // Toast notification state
  const [toastMessage, setToastMessage] = useState(null);

  // Modals state
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [newsFormData, setNewsFormData] = useState({
    title: '',
    category: 'Field Milestone',
    author: 'Field Operations Desk',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    excerpt: '',
    image: '/images/IMG_0303.JPG',
    body: ''
  });

  const [outreachModalOpen, setOutreachModalOpen] = useState(false);
  const [editingOutreach, setEditingOutreach] = useState(null);
  const [outreachFormData, setOutreachFormData] = useState({
    title: '',
    status: 'upcoming',
    pillar: 'Education',
    location: '',
    date: '',
    beneficiariesTarget: '',
    description: '',
    needs: '',
    image: '/images/IMG_0294.JPG'
  });

  const [metricModalOpen, setMetricModalOpen] = useState(false);
  const [editingMetric, setEditingMetric] = useState(null);
  const [metricFormData, setMetricFormData] = useState({
    id: '',
    label: '',
    stat: '',
    description: '',
    growth: '',
    detail: '',
    category: 'education'
  });

  // Local allocations state for sliders
  const [localAllocations, setLocalAllocations] = useState(allocations);
  const [prevAlloc, setPrevAlloc] = useState(allocations);
  if (prevAlloc !== allocations) {
    setPrevAlloc(allocations);
    setLocalAllocations(allocations);
  }

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch(`${getApiBase()}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPass })
      });

      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        sessionStorage.setItem('tkh_admin_auth', 'true');
        localStorage.setItem('tkh_admin_custom_password', loginPass);
        if (data.user) {
          setAdminUser(data.user);
          sessionStorage.setItem('tkh_admin_user', JSON.stringify(data.user));
        }
        if (data.token) {
          sessionStorage.setItem('tkh_admin_token', data.token);
        }
        setIsLoggingIn(false);
        showToast(`Welcome back, ${data.user?.name || 'Super Admin'}`);
        return;
      }
    } catch {
      // Defer to offline local credentials
    }

    const localCustomPass = localStorage.getItem('tkh_admin_custom_password');
    const envDefaultPass = import.meta.env.VITE_ADMIN_DEFAULT_PASSWORD;
    const isValidPass =
      (localCustomPass && loginPass === localCustomPass) ||
      (envDefaultPass && loginPass === envDefaultPass);

    if (
      (loginEmail.trim().toLowerCase() === 'admin@tenkindhands.org' || !loginEmail) &&
      isValidPass
    ) {
      localStorage.setItem('tkh_admin_custom_password', loginPass);
      const fallbackUser = {
        name: 'Ten Kind Hands Super Admin',
        email: 'admin@tenkindhands.org',
        role: 'superadmin'
      };
      setIsAuthenticated(true);
      setAdminUser(fallbackUser);
      sessionStorage.setItem('tkh_admin_auth', 'true');
      sessionStorage.setItem('tkh_admin_user', JSON.stringify(fallbackUser));
      setIsLoggingIn(false);
      showToast('Welcome back, Super Admin');
    } else {
      setIsLoggingIn(false);
      setLoginError('Invalid Administrator credentials. Please verify your email and password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    sessionStorage.removeItem('tkh_admin_auth');
    sessionStorage.removeItem('tkh_admin_user');
    sessionStorage.removeItem('tkh_admin_token');
    showToast('Securely signed out of Super Admin Console');
  };

  // Password update handler
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordFeedback({ type: '', message: '' });

    if (!newPasswordInput || newPasswordInput.trim().length < 4) {
      setPasswordFeedback({ type: 'error', message: 'New password must be at least 4 characters long.' });
      return;
    }

    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordFeedback({ type: 'error', message: 'New password and confirmation do not match.' });
      return;
    }

    setIsUpdatingPassword(true);

    try {
      const res = await fetch(`${getApiBase()}/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: adminUser?.email || 'admin@tenkindhands.org',
          currentPassword: currentPasswordInput,
          newPassword: newPasswordInput
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('tkh_admin_custom_password', newPasswordInput);
        setPasswordFeedback({ type: 'success', message: 'Admin password updated successfully across database and local storage!' });
        showToast('Password updated successfully');
        setCurrentPasswordInput('');
        setNewPasswordInput('');
        setConfirmPasswordInput('');
        setIsUpdatingPassword(false);
        return;
      } else {
        setPasswordFeedback({ type: 'error', message: data.message || 'Failed to update password.' });
        setIsUpdatingPassword(false);
        return;
      }
    } catch {
      // Offline fallback
      localStorage.setItem('tkh_admin_custom_password', newPasswordInput);
      setPasswordFeedback({ type: 'success', message: 'Password updated locally (Offline Resilience Mode). Sync will persist across sessions.' });
      showToast('Password updated locally');
      setCurrentPasswordInput('');
      setNewPasswordInput('');
      setConfirmPasswordInput('');
      setIsUpdatingPassword(false);
    }
  };

  // News Handlers
  const handleOpenNewNews = () => {
    setEditingNews(null);
    setNewsFormData({
      title: '',
      category: 'Field Milestone',
      author: adminUser?.name || 'Field Operations Desk',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      excerpt: '',
      image: '/images/IMG_0303.JPG',
      body: ''
    });
    setNewsModalOpen(true);
  };

  const handleOpenEditNews = (item) => {
    setEditingNews(item);
    setNewsFormData({
      title: item.title,
      category: item.category,
      author: item.author,
      date: item.date,
      excerpt: item.excerpt,
      image: item.image,
      body: item.body
    });
    setNewsModalOpen(true);
  };

  const handleSaveNews = (e) => {
    e.preventDefault();
    if (editingNews) {
      updateNews(editingNews.id, newsFormData);
      showToast(`Updated dispatch: "${newsFormData.title.slice(0, 30)}..."`);
    } else {
      addNews(newsFormData);
      showToast(`Published dispatch: "${newsFormData.title.slice(0, 30)}..."`);
    }
    setNewsModalOpen(false);
  };

  const handleDeleteNews = (item) => {
    if (window.confirm(`Are you sure you want to delete dispatch "${item.title}"?`)) {
      deleteNews(item.id);
      showToast('Dispatch deleted permanently');
    }
  };

  // Outreach Handlers
  const handleOpenNewOutreach = () => {
    setEditingOutreach(null);
    setOutreachFormData({
      title: '',
      status: 'upcoming',
      pillar: 'Education',
      location: '',
      date: '',
      beneficiariesTarget: '',
      description: '',
      needs: '',
      image: '/images/IMG_0294.JPG'
    });
    setOutreachModalOpen(true);
  };

  const handleOpenEditOutreach = (item) => {
    setEditingOutreach(item);
    setOutreachFormData({
      title: item.title,
      status: item.status,
      pillar: item.pillar,
      location: item.location,
      date: item.date,
      beneficiariesTarget: item.beneficiariesTarget,
      description: item.description,
      needs: item.needs,
      image: item.image
    });
    setOutreachModalOpen(true);
  };

  const handleSaveOutreach = (e) => {
    e.preventDefault();
    if (editingOutreach) {
      updateOutreach(editingOutreach.id, outreachFormData);
      showToast(`Updated mission: "${outreachFormData.title.slice(0, 30)}..."`);
    } else {
      addOutreach(outreachFormData);
      showToast(`Scheduled mission: "${outreachFormData.title.slice(0, 30)}..."`);
    }
    setOutreachModalOpen(false);
  };

  const handleToggleOutreachStatus = (item) => {
    const newStatus = item.status === 'upcoming' ? 'completed' : 'upcoming';
    updateOutreach(item.id, { status: newStatus });
    showToast(`Mission marked as ${newStatus}`);
  };

  const handleDeleteOutreach = (item) => {
    if (window.confirm(`Delete outreach mission "${item.title}"?`)) {
      deleteOutreach(item.id);
      showToast('Mission deleted permanently');
    }
  };

  // Metric Handlers
  const handleOpenNewMetric = () => {
    setEditingMetric(null);
    setMetricFormData({
      id: `metric-${Date.now()}`,
      label: '',
      stat: '0',
      description: '',
      growth: '+10% YoY',
      detail: '',
      category: 'education'
    });
    setMetricModalOpen(true);
  };

  const handleOpenEditMetric = (m) => {
    setEditingMetric(m);
    setMetricFormData({
      id: m.id,
      label: m.label,
      stat: m.stat,
      description: m.description,
      growth: m.growth,
      detail: m.detail,
      category: m.category || 'education'
    });
    setMetricModalOpen(true);
  };

  const handleSaveMetric = (e) => {
    e.preventDefault();
    if (editingMetric) {
      updateMetric(editingMetric.id, metricFormData);
      showToast(`Updated impact metric: ${metricFormData.label}`);
    } else {
      addMetric(metricFormData);
      showToast(`Added impact counter: ${metricFormData.label}`);
    }
    setMetricModalOpen(false);
  };

  const handleDeleteMetric = (m) => {
    if (window.confirm(`Delete impact counter "${m.label}"?`)) {
      deleteMetric(m.id);
      showToast('Impact figure deleted');
    }
  };

  // Allocations Handlers
  const handleAllocationPctChange = (index, value) => {
    const num = parseFloat(value) || 0;
    const updated = [...localAllocations];
    updated[index] = { ...updated[index], pct: num };
    setLocalAllocations(updated);
  };

  const totalAllocPct = useMemo(() => {
    return localAllocations.reduce((acc, curr) => acc + (curr.pct || 0), 0);
  }, [localAllocations]);

  const isTotalAlloc100 = Math.abs(totalAllocPct - 100) < 0.05;

  const handleSaveAllocations = () => {
    updateAllocations(localAllocations);
    showToast('Direct giving allocations updated successfully');
  };

  // Filtered news
  const filteredNews = news.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(newsSearch.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(newsSearch.toLowerCase()) ||
      item.author.toLowerCase().includes(newsSearch.toLowerCase());
    const matchesCat = newsCategoryFilter === 'All' || item.category === newsCategoryFilter;
    return matchesSearch && matchesCat;
  });

  // Filtered outreaches
  const filteredOutreaches = outreaches.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(outreachSearch.toLowerCase()) ||
      item.location.toLowerCase().includes(outreachSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(outreachSearch.toLowerCase());
    const matchesStatus =
      outreachStatusFilter === 'All' || item.status === outreachStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // =========================================================================
  // VIEW A: UNAUTHENTICATED SUPER ADMIN LOGIN SCREEN
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#142722] text-[#f8f6f2] flex items-center justify-center p-3 sm:p-6 relative overflow-hidden antialiased">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-forest/30 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-md 3xl:max-w-lg 4xl:max-w-xl w-full relative z-10">
          <div className="bg-[#1a332c]/90 backdrop-blur-xl border border-[#2a4d44] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 3xl:p-12 4xl:p-14 shadow-2xl">
            <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#1f3b34] border border-[#2e564c] p-2 flex items-center justify-center shadow-inner mb-3.5 sm:mb-4">
                <img
                  alt="Ten Kind Hands Official Logo"
                  className="w-full h-full object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmbaMRmoVzqGDmSGEoX0XoPFIdN6UYrwile-1Gt1d37VzrQ2PeaP9G7MITiOYlV5Mlma8OlajwkWA3r7O1u4I69Sez16xvET1fYSAP8dl7zhMj1M0gMuXfZYOCWyuePctpR97q8v72-LHjIYFUf8CgqilRAMMM-D-G-S-sJToMqi-nhfADpBN1MUQEsECDNokFRkKAoeuKy8OqR7LAReSeIGPvsSwv08HUP9RVs-2uxRF2z55chm270O5kDJRiqFAmMg"
                />
              </div>

              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-[#f7c899] font-heading mb-1">
                Ten Kind Hands Foundation
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-extrabold text-white tracking-tight">
                Super Admin Console
              </h1>
              <p className="text-xs text-[#d4cdc3] mt-2 leading-relaxed">
                Centralized management system organized by website page. Authorized personnel only.
              </p>
            </div>

            {loginError && (
              <div className="mb-6 p-3.5 rounded-2xl bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-heading font-semibold text-[#f8f6f2] mb-1.5">
                  Administrator Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#829992] absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@tenkindhands.org"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#2a4d44] bg-[#142722]/80 text-[#f8f6f2] text-xs focus:outline-none focus:border-primary placeholder:text-stone-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-[#f8f6f2] mb-1.5">
                  Security Passphrase
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#829992] absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#2a4d44] bg-[#142722]/80 text-[#f8f6f2] text-xs focus:outline-none focus:border-primary placeholder:text-stone-500 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full min-h-[44px] py-3 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-heading font-bold text-xs shadow-lg shadow-primary/30 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Session...</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>Authenticate &amp; Open Console</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#2a4d44]/60 text-center">
              <button
                onClick={() => {
                  if (setCurrentPage) setCurrentPage('home');
                  window.location.hash = 'home';
                }}
                className="text-xs text-[#f7c899] hover:underline font-heading font-semibold flex items-center justify-center gap-1.5 mx-auto cursor-pointer min-h-[36px]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Website</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW B: AUTHENTICATED SUPER ADMIN COMMAND CENTER (ORGANIZED BY PAGE)
  // =========================================================================
  const navigationGroups = [
    {
      group: 'EXECUTIVE OVERVIEW',
      items: [
        { id: 'overview', label: 'Dashboard Overview', icon: Layers, badge: null, pageName: 'Executive Center' }
      ]
    },
    {
      group: 'PAGE CONTENT EDITORS',
      items: [
        { id: 'page-home', label: 'Home Page', icon: Globe, badge: '4 Sec', pageName: 'Home' },
        { id: 'page-story', label: 'Our Story Page', icon: Users, badge: `${storyContent?.stateCoordinators?.length || 5} Coor`, pageName: 'Our Story' },
        { id: 'page-outreaches', label: 'Missions & Outreaches', icon: MapPin, badge: outreaches.length, pageName: 'Missions & Outreaches' },
        { id: 'page-news', label: 'News & Dispatches', icon: BookOpen, badge: news.length, pageName: 'News' },
        { id: 'page-transparency', label: 'Financial Transparency', icon: ShieldCheck, badge: '100%', pageName: 'Transparency' },
        { id: 'page-testimonials', label: 'Testimonials Page', icon: Quote, badge: testimonialsList?.length || 6, pageName: 'Testimonials' },
        { id: 'page-contact', label: 'Contact & Inquiries', icon: Mail, badge: inquiries.length, pageName: 'Contact' }
      ]
    },
    {
      group: 'SYSTEM & INTEGRITY',
      items: [
        { id: 'system-security', label: 'Security & Password', icon: Lock, badge: null, pageName: 'Security' },
        { id: 'system-backup', label: 'Cloud Backup & Reset', icon: Database, badge: null, pageName: 'System' }
      ]
    }
  ];

  const getActiveTabTitle = () => {
    for (const grp of navigationGroups) {
      const match = grp.items.find((i) => i.id === activeTab);
      if (match) return match.label;
    }
    return activeTab;
  };

  const getActivePreviewRoute = () => {
    switch (activeTab) {
      case 'page-home': return 'home';
      case 'page-story': return 'our-story';
      case 'page-outreaches': return 'outreaches';
      case 'page-news': return 'news';
      case 'page-transparency': return 'transparency';
      case 'page-testimonials': return 'testimonials';
      case 'page-contact': return 'contact';
      default: return 'home';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] text-ink flex flex-col lg:flex-row antialiased font-sans selection:bg-primary/20 selection:text-primary">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 animate-bounce-short bg-[#142722] text-white px-4 py-3 rounded-2xl shadow-2xl border border-[#1f3b34] flex items-center gap-3 text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-[#f7c899] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =====================================================================
          SIDEBAR NAVIGATION (DESKTOP & MOBILE DRAWER)
      ===================================================================== */}
      {/* Mobile Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-ink/60 backdrop-blur-xs z-40 lg:hidden"
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 3xl:w-80 4xl:w-96 max-w-[85vw] bg-[#142722] text-[#d4cdc3] flex flex-col border-r border-[#1f3b34] transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 shrink-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="px-5 sm:px-6 3xl:px-7 py-4 sm:py-5 3xl:py-6 border-b border-[#1f3b34] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1f3b34] border border-[#2a4d44] p-1 flex items-center justify-center shrink-0">
              <img
                alt="Ten Kind Hands Logo"
                className="w-full h-full object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmbaMRmoVzqGDmSGEoX0XoPFIdN6UYrwile-1Gt1d37VzrQ2PeaP9G7MITiOYlV5Mlma8OlajwkWA3r7O1u4I69Sez16xvET1fYSAP8dl7zhMj1M0gMuXfZYOCWyuePctpR97q8v72-LHjIYFUf8CgqilRAMMM-D-G-S-sJToMqi-nhfADpBN1MUQEsECDNokFRkKAoeuKy8OqR7LAReSeIGPvsSwv08HUP9RVs-2uxRF2z55chm270O5kDJRiqFAmMg"
              />
            </div>
            <div className="min-w-0">
              <span className="font-heading text-sm sm:text-base font-bold text-white tracking-tight block leading-tight truncate">
                Ten Kind Hands
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#f7c899] font-bold block font-heading truncate">
                Super Admin Console
              </span>
            </div>
          </div>

          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
            aria-label="Close admin menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items Groups */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 scrollbar-none">
          {navigationGroups.map((group) => (
            <div key={group.group}>
              <h3 className="px-3 text-[10px] font-heading font-bold uppercase tracking-wider text-[#7a958e] mb-1.5">
                {group.group}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full min-h-[40px] flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-primary text-white shadow-md shadow-primary/30 font-bold'
                          : 'text-[#d4cdc3] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? 'text-white' : 'text-[#a2b5b0]'
                          }`}
                        />
                        <span className="font-heading truncate">{item.label}</span>
                      </div>
                      {item.badge !== null && (
                        <span
                          className={`px-1.5 py-0.5 text-[10px] font-bold rounded-md shrink-0 ml-1.5 ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-[#1f3b34] text-[#f7c899] border border-[#2a4d44]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer: Super Admin Profile & Quick Links */}
        <div className="p-4 border-t border-[#1f3b34] space-y-3 bg-[#11201c]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-xs font-heading shrink-0">
                SA
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-heading font-bold text-white truncate">
                  {adminUser?.name || 'Super Admin'}
                </span>
                <span className="block text-[10px] text-[#829992] truncate">
                  {adminUser?.email || 'admin@tenkindhands.org'}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors cursor-pointer shrink-0"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => {
              const route = getActivePreviewRoute();
              if (setCurrentPage) setCurrentPage(route);
              window.location.hash = route;
            }}
            className="w-full min-h-[38px] py-2 px-3 rounded-xl bg-[#1f3b34] hover:bg-[#25443c] text-[#f8f6f2] hover:text-white text-xs font-heading font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all border border-[#2a4d44]"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#f7c899]" />
            <span>Preview Live Site</span>
          </button>
        </div>
      </aside>

      {/* =====================================================================
          MAIN WORKSPACE CANVAS
      ===================================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden relative">

        {/* Top Application Header */}
        <header className="h-16 3xl:h-20 bg-white/95 backdrop-blur-md border-b border-[#e7e2d8] px-3 sm:px-6 lg:px-8 3xl:px-12 4xl:px-16 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-ink-light hover:bg-sand cursor-pointer shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs min-w-0">
              <span className="text-ink-muted font-medium hidden xs:inline">Console</span>
              <ChevronRight className="w-3 h-3 text-[#d4cdc3] hidden xs:inline shrink-0" />
              <span className="font-heading font-bold text-ink truncate">
                {getActiveTabTitle()}
              </span>
            </div>
          </div>

          {/* Right Header Quick Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {activeTab === 'page-news' && (
              <button
                onClick={handleOpenNewNews}
                className="px-3 sm:px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all min-h-[36px]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Dispatch</span>
              </button>
            )}

            {activeTab === 'page-outreaches' && (
              <button
                onClick={handleOpenNewOutreach}
                className="px-3 sm:px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all min-h-[36px]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Schedule Mission</span>
              </button>
            )}

            {/* Export Backup shortcut */}
            <button
              onClick={exportDataBackup}
              title="Download backup JSON"
              className="p-2 rounded-xl text-ink-light hover:text-ink hover:bg-sand border border-[#e7e2d8] text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors min-h-[36px]"
            >
              <Download className="w-3.5 h-3.5 text-ink-muted" />
              <span className="hidden md:inline">Export JSON</span>
            </button>

            {/* Preview Live Site for active page */}
            <button
              onClick={() => {
                const route = getActivePreviewRoute();
                if (setCurrentPage) setCurrentPage(route);
                window.location.hash = route;
              }}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-sand hover:bg-sand-dark text-ink text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer transition-colors border border-[#e7e2d8] min-h-[36px]"
            >
              <Eye className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline">Preview Page</span>
            </button>
          </div>
        </header>

        {/* Dynamic Tab Body */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 3xl:p-12 4xl:p-16 max-w-7xl 2xl:max-w-[1440px] 3xl:max-w-[1840px] 4xl:max-w-[2440px] uw:max-w-[3100px] suw:max-w-[4200px] w-full mx-auto space-y-6 sm:space-y-8 3xl:space-y-10 relative z-10">
          {/* =================================================================
              1. DASHBOARD OVERVIEW
          ================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6 sm:space-y-8 animate-fade-in">
              <div className="bg-gradient-to-br from-[#142722] via-[#1f3b34] to-[#25473e] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm relative overflow-hidden border border-[#2a4d44]">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-clay/15 rounded-full blur-3xl pointer-events-none"></div>
                <div className="max-w-2xl relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-[#f7c899] border border-white/20 text-[11px] sm:text-xs font-semibold mb-3 font-heading">
                    <span className="w-2 h-2 rounded-full bg-[#f7c899] animate-pulse"></span>
                    <span>Operational Desk Active &amp; Page-Organized</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-extrabold tracking-tight">
                    Welcome to the <span className="text-[#f7c899]">Super Admin Console</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-white/85 mt-2 leading-relaxed font-normal">
                    Manage and organize all public website content by page: Home, Our Story, Missions &amp; Outreaches, News Dispatches, Financial Transparency, Testimonials, and Contact Leads.
                  </p>
                </div>
              </div>

              {/* Page-by-Page Quick Cards Grid */}
              <div>
                <h2 className="text-xs font-heading font-bold uppercase tracking-wider text-ink-muted mb-3">
                  Website Page Editors Quick Access
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 3xl:grid-cols-4 4xl:grid-cols-7 uw:grid-cols-7 gap-4 3xl:gap-6">
                  {/* Home Page Card */}
                  <div
                    onClick={() => setActiveTab('page-home')}
                    className="bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs hover:shadow-md hover:border-primary/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-heading font-semibold uppercase tracking-wider text-ink-muted">
                        Landing Page
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <Globe className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-lg font-heading font-bold text-ink">Home Page</div>
                    <p className="text-[11px] text-ink-light mt-1">Hero slides, impact counters &amp; marquee ribbon.</p>
                    <div className="flex items-center justify-between text-[11px] text-primary font-semibold mt-3 pt-2 border-t border-[#e7e2d8]">
                      <span>4 Editable Sections</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Our Story Card */}
                  <div
                    onClick={() => setActiveTab('page-story')}
                    className="bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs hover:shadow-md hover:border-forest/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-heading font-semibold uppercase tracking-wider text-ink-muted">
                        Leadership &amp; Team
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-forest/10 text-forest flex items-center justify-center group-hover:bg-forest group-hover:text-white transition-colors">
                        <Users className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-lg font-heading font-bold text-ink">Our Story Page</div>
                    <p className="text-[11px] text-ink-light mt-1">
                      {storyContent?.stateCoordinators?.length || 5} State Coordinators &amp; Leadership.
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-forest font-semibold mt-3 pt-2 border-t border-[#e7e2d8]">
                      <span>Coordinators Team</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Missions Card */}
                  <div
                    onClick={() => setActiveTab('page-outreaches')}
                    className="bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs hover:shadow-md hover:border-primary/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-heading font-semibold uppercase tracking-wider text-ink-muted">
                        Field Actions
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <MapPin className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-lg font-heading font-bold text-ink">Outreaches Page</div>
                    <p className="text-[11px] text-ink-light mt-1">{outreaches.length} scheduled &amp; completed missions.</p>
                    <div className="flex items-center justify-between text-[11px] text-primary font-semibold mt-3 pt-2 border-t border-[#e7e2d8]">
                      <span>Missions Schedule</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* News Card */}
                  <div
                    onClick={() => setActiveTab('page-news')}
                    className="bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs hover:shadow-md hover:border-forest/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-heading font-semibold uppercase tracking-wider text-ink-muted">
                        Field Journalism
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-forest/10 text-forest flex items-center justify-center group-hover:bg-forest group-hover:text-white transition-colors">
                        <BookOpen className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-lg font-heading font-bold text-ink">News &amp; Dispatches</div>
                    <p className="text-[11px] text-ink-light mt-1">{news.length} published documentary stories.</p>
                    <div className="flex items-center justify-between text-[11px] text-forest font-semibold mt-3 pt-2 border-t border-[#e7e2d8]">
                      <span>Publish &amp; Edit</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Transparency Card */}
                  <div
                    onClick={() => setActiveTab('page-transparency')}
                    className="bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs hover:shadow-md hover:border-clay/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-heading font-semibold uppercase tracking-wider text-ink-muted">
                        Radical Honesty
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-clay/10 text-clay flex items-center justify-center group-hover:bg-clay group-hover:text-white transition-colors">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-lg font-heading font-bold text-ink">Transparency</div>
                    <p className="text-[11px] text-ink-light mt-1">100% direct-giving financial allocation model.</p>
                    <div className="flex items-center justify-between text-[11px] text-clay font-semibold mt-3 pt-2 border-t border-[#e7e2d8]">
                      <span>{allocations.length} Allocation Targets</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Testimonials Card */}
                  <div
                    onClick={() => setActiveTab('page-testimonials')}
                    className="bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs hover:shadow-md hover:border-primary/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-heading font-semibold uppercase tracking-wider text-ink-muted">
                        Community Voices
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <Quote className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-lg font-heading font-bold text-ink">Testimonials</div>
                    <p className="text-[11px] text-ink-light mt-1">{testimonialsList?.length || 6} beneficiary &amp; donor quotes.</p>
                    <div className="flex items-center justify-between text-[11px] text-primary font-semibold mt-3 pt-2 border-t border-[#e7e2d8]">
                      <span>Manage Quotes</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Contact & Inquiries Card */}
                  <div
                    onClick={() => setActiveTab('page-contact')}
                    className="bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs hover:shadow-md hover:border-emerald-800/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-heading font-semibold uppercase tracking-wider text-ink-muted">
                        Inbound Leads
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-emerald-800/10 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-lg font-heading font-bold text-ink">Contact Page</div>
                    <p className="text-[11px] text-ink-light mt-1">{inquiries.length} citizen messages &amp; secretariat info.</p>
                    <div className="flex items-center justify-between text-[11px] text-emerald-800 font-semibold mt-3 pt-2 border-t border-[#e7e2d8]">
                      <span>Inquiries Desk</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Cloud Backup Card */}
                  <div
                    onClick={() => setActiveTab('system-backup')}
                    className="bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs hover:shadow-md hover:border-ink/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-heading font-semibold uppercase tracking-wider text-ink-muted">
                        Database
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-sand-dark text-ink flex items-center justify-center group-hover:bg-ink group-hover:text-white transition-colors">
                        <Database className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="text-lg font-heading font-bold text-ink">Cloud Backup</div>
                    <p className="text-[11px] text-ink-light mt-1">Export full JSON snapshot &amp; platform integrity.</p>
                    <div className="flex items-center justify-between text-[11px] text-ink font-semibold mt-3 pt-2 border-t border-[#e7e2d8]">
                      <span>Export / Reset</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              2. HOME PAGE CONTENT EDITOR
          ================================================================= */}
          {activeTab === 'page-home' && (
            <HomePageEditor
              homeContent={homeContent}
              updateHomeContent={updateHomeContent}
              metrics={metrics}
              handleOpenEditMetric={handleOpenEditMetric}
              handleOpenNewMetric={handleOpenNewMetric}
              handleDeleteMetric={handleDeleteMetric}
              announcement={announcement}
              updateAnnouncement={updateAnnouncement}
              setCurrentPage={setCurrentPage}
              showToast={showToast}
            />
          )}

          {/* =================================================================
              3. OUR STORY CONTENT EDITOR
          ================================================================= */}
          {activeTab === 'page-story' && (
            <StoryPageEditor
              storyContent={storyContent}
              updateStoryContent={updateStoryContent}
              updateStoryCoordinators={updateStoryCoordinators}
              updateStoryLeadership={updateStoryLeadership}
              setCurrentPage={setCurrentPage}
              showToast={showToast}
            />
          )}

          {/* =================================================================
              4. MISSIONS & OUTREACHES PAGE EDITOR
          ================================================================= */}
          {activeTab === 'page-outreaches' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                      Page Editor
                    </span>
                    <span className="text-xs font-semibold text-ink-muted">• Public Route: /#outreaches</span>
                  </div>
                  <h1 className="text-xl font-heading font-bold text-ink">Missions &amp; Outreaches Manager</h1>
                  <p className="text-xs text-ink-muted">
                    Schedule medical triage camps, classroom builds, and clean water borehole projects.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="w-3.5 h-3.5 text-ink-muted absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search missions..."
                      value={outreachSearch}
                      onChange={(e) => setOutreachSearch(e.target.value)}
                      className="pl-9 pr-3 py-1.5 rounded-xl border border-[#e7e2d8] bg-sand/40 text-ink text-xs focus:outline-none focus:border-primary w-full xs:w-48 sm:w-56"
                    />
                  </div>

                  <button
                    onClick={handleOpenNewOutreach}
                    className="py-1.5 px-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Schedule Mission</span>
                  </button>
                </div>
              </div>

              {/* Sub-Section Pills */}
              <div className="bg-white p-2 rounded-2xl border border-[#e7e2d8] shadow-xs">
                <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
                  {[
                    { id: 'All', label: `All Missions (${outreaches.length})` },
                    { id: 'upcoming', label: `Upcoming (${outreaches.filter((o) => o.status === 'upcoming').length})` },
                    { id: 'completed', label: `Completed (${outreaches.filter((o) => o.status === 'completed').length})` }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setOutreachStatusFilter(filter.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-heading font-bold cursor-pointer transition-colors whitespace-nowrap ${
                        outreachStatusFilter === filter.id
                          ? 'bg-primary text-white shadow-xs'
                          : 'bg-sand/40 hover:bg-sand text-ink-muted hover:text-ink'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Outreaches Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4 uw:grid-cols-5 gap-5 3xl:gap-6">
                {filteredOutreaches.map((item) => {
                  const isUpcoming = item.status === 'upcoming';
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-[#e7e2d8] p-5 shadow-xs flex flex-col justify-between hover:border-primary/40 transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-heading uppercase tracking-wider ${
                              isUpcoming
                                ? 'bg-primary/10 text-primary border border-primary/20'
                                : 'bg-forest/10 text-forest border border-forest/20'
                            }`}
                          >
                            {isUpcoming ? 'Upcoming Mission' : 'Mission Completed'}
                          </span>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenEditOutreach(item)}
                              className="p-1.5 rounded-lg text-ink-muted hover:text-primary hover:bg-primary/10 cursor-pointer transition-colors"
                              title="Edit Mission"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteOutreach(item)}
                              className="p-1.5 rounded-lg text-ink-muted hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                              title="Delete Mission"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <h3 className="text-sm font-heading font-bold text-ink mb-2">
                          {item.title}
                        </h3>

                        <div className="space-y-1.5 text-xs text-ink-light mb-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span>{item.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-ink-muted shrink-0" />
                            <span>{item.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 text-ink-muted shrink-0" />
                            <span className="font-semibold text-ink">
                              Target: {item.beneficiariesTarget}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-ink-light line-clamp-2 mb-3">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#e7e2d8] flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                        <div className="text-[11px] text-ink-muted truncate max-w-[200px]">
                          Needs: {item.needs || 'None specified'}
                        </div>

                        <button
                          onClick={() => handleToggleOutreachStatus(item)}
                          className={`px-3 py-1 rounded-lg text-xs font-heading font-semibold cursor-pointer transition-colors shrink-0 ${
                            isUpcoming
                              ? 'bg-sand hover:bg-sand-dark text-ink border border-[#e7e2d8]'
                              : 'bg-forest/10 text-forest hover:bg-forest/20 border border-forest/20'
                          }`}
                        >
                          {isUpcoming ? 'Mark Completed' : 'Reopen as Upcoming'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* =================================================================
              5. NEWS & DISPATCHES PAGE EDITOR
          ================================================================= */}
          {activeTab === 'page-news' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider bg-forest/10 text-forest border border-forest/20">
                      Page Editor
                    </span>
                    <span className="text-xs font-semibold text-ink-muted">• Public Route: /#news</span>
                  </div>
                  <h1 className="text-xl font-heading font-bold text-ink">Field Dispatches &amp; News Manager</h1>
                  <p className="text-xs text-ink-muted">
                    Publish documentary stories, milestone reports, and photographic updates from remote missions.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="w-3.5 h-3.5 text-ink-muted absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search dispatches..."
                      value={newsSearch}
                      onChange={(e) => setNewsSearch(e.target.value)}
                      className="pl-9 pr-3 py-1.5 rounded-xl border border-[#e7e2d8] bg-sand/40 text-ink text-xs focus:outline-none focus:border-primary w-full xs:w-48 sm:w-56"
                    />
                  </div>

                  <button
                    onClick={handleOpenNewNews}
                    className="py-1.5 px-3.5 rounded-xl bg-forest hover:bg-forest/90 text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Dispatch</span>
                  </button>
                </div>
              </div>

              {/* Sub-Section Categories */}
              <div className="bg-white p-2 rounded-2xl border border-[#e7e2d8] shadow-xs">
                <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
                  {['All', 'Field Milestone', 'Medical Mission', 'Transparency'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setNewsCategoryFilter(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-heading font-bold cursor-pointer transition-colors whitespace-nowrap ${
                        newsCategoryFilter === cat
                          ? 'bg-forest text-white shadow-xs'
                          : 'bg-sand/40 hover:bg-sand text-ink-muted hover:text-ink'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dispatches Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 uw:grid-cols-6 gap-5 3xl:gap-6">
                {filteredNews.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-[#e7e2d8] overflow-hidden shadow-xs flex flex-col justify-between hover:border-forest/40 transition-all group"
                  >
                    <div>
                      <div className="h-44 3xl:h-52 4xl:h-60 overflow-hidden relative bg-sand">
                        <img
                          src={encodeURI(item.image)}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider bg-white/95 text-ink shadow-xs">
                          {item.category}
                        </span>
                      </div>

                      <div className="p-5">
                        <span className="text-[10px] text-ink-muted block mb-1">{item.date}</span>
                        <h3 className="text-sm font-heading font-bold text-ink leading-snug mb-2 group-hover:text-forest transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-ink-light line-clamp-3 leading-relaxed">
                          {item.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 py-3 border-t border-[#e7e2d8] bg-sand/20 flex items-center justify-between">
                      <span className="text-[10px] text-ink-muted truncate max-w-[150px]">
                        By {item.author}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditNews(item)}
                          className="p-1.5 rounded-lg text-ink-muted hover:text-forest hover:bg-forest/10 cursor-pointer transition-colors"
                          title="Edit Dispatch"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteNews(item)}
                          className="p-1.5 rounded-lg text-ink-muted hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                          title="Delete Dispatch"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================
              6. FINANCIAL TRANSPARENCY PAGE EDITOR
          ================================================================= */}
          {activeTab === 'page-transparency' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider bg-clay/15 text-clay border border-clay/25">
                      Page Editor
                    </span>
                    <span className="text-xs font-semibold text-ink-muted">• Public Route: /#transparency</span>
                  </div>
                  <h1 className="text-xl font-heading font-bold text-ink">Financial Transparency Manager</h1>
                  <p className="text-xs text-ink-muted">
                    Configure the 100% direct-giving financial allocation model and financial stewardship targets.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#e7e2d8] p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-base font-heading font-bold text-ink">
                      Direct Giving Allocation Sliders
                    </h2>
                    <p className="text-xs text-ink-muted">
                      Must sum to exactly 100.0% to uphold radical transparency commitments.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`px-3 py-1.5 rounded-xl text-xs font-heading font-bold border flex items-center gap-1.5 ${
                        isTotalAlloc100
                          ? 'bg-forest/10 text-forest border-forest/20'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      <span>Sum: {totalAllocPct.toFixed(1)}%</span>
                      {isTotalAlloc100 ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5" />
                      )}
                    </div>

                    <button
                      onClick={handleSaveAllocations}
                      className="py-2 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Percentages</span>
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-4 rounded-full overflow-hidden flex bg-sand-dark border border-[#e7e2d8]">
                  {localAllocations.map((a) => (
                    <div
                      key={a.id}
                      style={{ width: `${a.pct}%` }}
                      className={`${
                        a.id === 'frontline'
                          ? 'bg-forest'
                          : a.id === 'audits'
                          ? 'bg-clay'
                          : 'bg-primary/70'
                      } transition-all duration-300`}
                      title={`${a.label}: ${a.pct}%`}
                    ></div>
                  ))}
                </div>

                {/* Sliders */}
                <div className="space-y-6">
                  {localAllocations.map((alloc, idx) => (
                    <div key={alloc.id} className="p-4 rounded-xl bg-sand/40 border border-[#e7e2d8]">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-heading font-bold text-ink">{alloc.label}</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="100"
                            value={alloc.pct}
                            onChange={(e) => handleAllocationPctChange(idx, e.target.value)}
                            className="w-20 px-2.5 py-1 rounded-lg bg-white border border-[#e7e2d8] text-xs font-mono font-bold text-ink text-right focus:outline-none focus:border-primary"
                          />
                          <span className="text-xs font-bold text-ink-muted">%</span>
                        </div>
                      </div>

                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={alloc.pct}
                        onChange={(e) => handleAllocationPctChange(idx, e.target.value)}
                        className="w-full accent-primary cursor-pointer"
                      />

                      <p className="text-[11px] text-ink-muted mt-1">{alloc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              7. TESTIMONIALS PAGE EDITOR
          ================================================================= */}
          {activeTab === 'page-testimonials' && (
            <TestimonialsPageEditor
              testimonialsList={testimonialsList}
              addTestimonial={addTestimonial}
              updateTestimonials={updateTestimonials}
              deleteTestimonial={deleteTestimonial}
              setCurrentPage={setCurrentPage}
              showToast={showToast}
            />
          )}

          {/* =================================================================
              8. CONTACT & INQUIRIES PAGE EDITOR
          ================================================================= */}
          {activeTab === 'page-contact' && (
            <ContactPageEditor
              inquiries={inquiries}
              updateInquiryStatus={updateInquiryStatus}
              deleteInquiry={deleteInquiry}
              contactInfo={contactInfo}
              updateContactInfo={updateContactInfo}
              setCurrentPage={setCurrentPage}
              showToast={showToast}
            />
          )}

          {/* =================================================================
              9. CLOUD BACKUP & DATABASE SYSTEM
          ================================================================= */}
          {activeTab === 'system-backup' && (
            <div className="space-y-6 animate-fade-in max-w-3xl 3xl:max-w-4xl 4xl:max-w-5xl">
              <div className="bg-white rounded-2xl border border-[#e7e2d8] p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-xl font-heading font-bold text-ink">
                      Cloud Database &amp; Data Resilience
                    </h1>
                    <p className="text-xs text-ink-muted">
                      Manage database synchronizations, export backups, and platform integrity
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-forest/10 text-forest border border-forest/20 text-xs font-heading font-bold">
                    Healthy
                  </span>
                </div>

                {/* Database Connection Card */}
                <div className="p-5 rounded-xl bg-[#142722] text-white mb-6 border border-[#1f3b34]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-[#f7c899]" />
                      <span className="text-sm font-heading font-bold text-white">Cloud Operational Storage</span>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f7c899] animate-pulse"></span>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#d4cdc3]">
                    <div className="flex justify-between">
                      <span className="text-[#829992]">Cluster Status:</span>
                      <span className="font-mono text-[#f7c899]">Connected &amp; Synchronized</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#829992]">Backend Gateway:</span>
                      <span className="font-mono text-white/90">{getApiBase().replace(/\/api$/, '')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#829992]">Super Admin User:</span>
                      <span className="font-mono text-white/90">admin@tenkindhands.org</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#829992]">Live Dispatches:</span>
                      <span className="font-heading font-bold text-white">{news.length} items</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#829992]">Missions &amp; Outreaches:</span>
                      <span className="font-heading font-bold text-white">{outreaches.length} items</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#829992]">State Coordinators:</span>
                      <span className="font-heading font-bold text-white">{storyContent?.stateCoordinators?.length || 5} members</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#829992]">Community Testimonials:</span>
                      <span className="font-heading font-bold text-white">{testimonialsList?.length || 6} quotes</span>
                    </div>
                  </div>
                </div>

                {/* Export & Reset Actions */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-sand/50 border border-[#e7e2d8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div>
                      <strong className="block text-xs font-heading font-bold text-ink">
                        Export Full JSON Snapshot
                      </strong>
                      <span className="text-[11px] text-ink-muted">
                        Download all current pages, dispatches, coordinators, and inquiries.
                      </span>
                    </div>
                    <button
                      onClick={exportDataBackup}
                      className="py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center justify-center gap-1.5 cursor-pointer shrink-0 transition-colors shadow-xs w-full sm:w-auto min-h-[38px]"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download JSON</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div>
                      <strong className="block text-xs font-heading font-bold text-rose-900">
                        Reset Platform to Default Records
                      </strong>
                      <span className="text-[11px] text-rose-700">
                        Restore all seed articles, missions, coordinators, and metrics to default state.
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            'Are you sure you want to restore all website content to default starter records? Any custom dispatches or coordinators will be reset.'
                          )
                        ) {
                          resetToDefaults();
                          showToast('Restored default starter data');
                        }
                      }}
                      className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-heading font-semibold flex items-center justify-center gap-1.5 cursor-pointer shrink-0 transition-colors w-full sm:w-auto min-h-[38px]"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Defaults</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              10. SECURITY & PASSWORD MANAGEMENT
          ================================================================= */}
          {activeTab === 'system-security' && (
            <div className="space-y-6 animate-fade-in max-w-3xl 3xl:max-w-4xl 4xl:max-w-5xl">
              <div className="bg-white rounded-2xl border border-[#e7e2d8] p-5 sm:p-8 shadow-xs">
                {/* Password Change Form */}
                <div className="border border-[#e7e2d8] rounded-xl p-4 sm:p-5 bg-[#faf8f5]/60">
                  <h2 className="text-sm font-heading font-bold text-ink mb-1 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    Change Admin Password
                  </h2>
                  <p className="text-xs text-ink-muted mb-4">
                    Enter your current password and your new password to update your login credentials.
                  </p>

                  {passwordFeedback.message && (
                    <div
                      className={`mb-4 p-3 rounded-xl text-xs flex items-center gap-2.5 ${
                        passwordFeedback.type === 'success'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {passwordFeedback.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      <span>{passwordFeedback.message}</span>
                    </div>
                  )}

                  <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div>
                      <label className="block text-xs font-heading font-semibold text-ink mb-1">
                        Current Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={currentPasswordInput}
                        onChange={(e) => setCurrentPasswordInput(e.target.value)}
                        placeholder="Enter current password"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-white text-ink text-xs focus:outline-none focus:border-primary font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-heading font-semibold text-ink mb-1">
                          New Password
                        </label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={newPasswordInput}
                          onChange={(e) => setNewPasswordInput(e.target.value)}
                          placeholder="Enter at least 4 characters"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-white text-ink text-xs focus:outline-none focus:border-primary font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-heading font-semibold text-ink mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={confirmPasswordInput}
                          onChange={(e) => setConfirmPasswordInput(e.target.value)}
                          placeholder="Re-type new password"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-white text-ink text-xs focus:outline-none focus:border-primary font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-xs text-ink-muted hover:text-ink flex items-center gap-1.5 cursor-pointer select-none py-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{showPassword ? 'Hide password characters' : 'Show password characters'}</span>
                      </button>

                      <button
                        type="submit"
                        disabled={isUpdatingPassword}
                        className="py-2.5 px-5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50 transition-colors w-full sm:w-auto min-h-[40px]"
                      >
                        {isUpdatingPassword ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Updating...</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3.5 h-3.5" />
                            <span>Save New Password</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* CLI Command Alternative Note */}
                <div className="mt-5 p-4 rounded-xl bg-sand/30 border border-[#e7e2d8] text-xs text-ink-muted">
                  <span className="font-heading font-bold text-ink block mb-1">
                    Terminal / Command-Line Administration:
                  </span>
                  You can also change or reset the password directly via terminal inside the <code className="text-forest font-mono">tkh_Backend</code> folder:
                  <div className="mt-2 p-2.5 bg-[#142722] text-[#f7c899] font-mono text-[11px] rounded-lg overflow-x-auto">
                    node scripts/createAdmin.js admin@tenkindhands.org &lt;your-new-password&gt;
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* =====================================================================
          MODAL 1: CREATE / EDIT NEWS DISPATCH
      ===================================================================== */}
      {newsModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl 3xl:max-w-3xl 4xl:max-w-4xl w-full p-4 sm:p-6 md:p-8 3xl:p-10 shadow-2xl border border-[#e7e2d8] max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-[#e7e2d8]">
              <h2 className="text-base sm:text-lg font-heading font-bold text-ink">
                {editingNews ? 'Edit Field Dispatch' : 'Publish New Field Dispatch'}
              </h2>
              <button
                onClick={() => setNewsModalOpen(false)}
                className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-sand cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNews} className="space-y-4">
              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Dispatch Headline / Title
                </label>
                <input
                  type="text"
                  required
                  value={newsFormData.title}
                  onChange={(e) => setNewsFormData({ ...newsFormData, title: e.target.value })}
                  placeholder="e.g. Commissioning of the 46th Solar Classroom in Gidan"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={newsFormData.category}
                    onChange={(e) => setNewsFormData({ ...newsFormData, category: e.target.value })}
                    placeholder="Field Milestone"
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">Author</label>
                  <input
                    type="text"
                    required
                    value={newsFormData.author}
                    onChange={(e) => setNewsFormData({ ...newsFormData, author: e.target.value })}
                    placeholder="Field Engineering Team"
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">Date</label>
                  <input
                    type="text"
                    required
                    value={newsFormData.date}
                    onChange={(e) => setNewsFormData({ ...newsFormData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Feature Image Path
                </label>
                <input
                  type="text"
                  required
                  value={newsFormData.image}
                  onChange={(e) => setNewsFormData({ ...newsFormData, image: e.target.value })}
                  placeholder="/images/IMG_0303.JPG"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Executive Excerpt
                </label>
                <textarea
                  rows="2"
                  required
                  value={newsFormData.excerpt}
                  onChange={(e) => setNewsFormData({ ...newsFormData, excerpt: e.target.value })}
                  placeholder="Summary displayed on homepage cards..."
                  className="w-full p-3 rounded-xl border border-[#e7e2d8] bg-sand/30 text-xs text-ink focus:outline-none focus:border-primary leading-relaxed"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Full Dispatch Body (Markdown &amp; Paragraphs)
                </label>
                <textarea
                  rows="6"
                  required
                  value={newsFormData.body}
                  onChange={(e) => setNewsFormData({ ...newsFormData, body: e.target.value })}
                  placeholder="Complete documentary story..."
                  className="w-full p-3 rounded-xl border border-[#e7e2d8] bg-sand/30 text-xs text-ink focus:outline-none focus:border-primary leading-relaxed font-mono"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-[#e7e2d8] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setNewsModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-[#e7e2d8] text-xs font-heading font-semibold text-ink-light hover:bg-sand cursor-pointer text-center min-h-[40px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-forest hover:bg-forest/90 text-white text-xs font-heading font-semibold cursor-pointer shadow-xs text-center min-h-[40px]"
                >
                  {editingNews ? 'Save Changes' : 'Publish Dispatch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: SCHEDULE / EDIT MISSION & OUTREACH
      ===================================================================== */}
      {outreachModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl 3xl:max-w-3xl 4xl:max-w-4xl w-full p-4 sm:p-6 md:p-8 3xl:p-10 shadow-2xl border border-[#e7e2d8] max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-[#e7e2d8]">
              <h2 className="text-base sm:text-lg font-heading font-bold text-ink">
                {editingOutreach ? 'Edit Outreach Mission' : 'Schedule New Field Mission'}
              </h2>
              <button
                onClick={() => setOutreachModalOpen(false)}
                className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-sand cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOutreach} className="space-y-4">
              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Mission Title
                </label>
                <input
                  type="text"
                  required
                  value={outreachFormData.title}
                  onChange={(e) =>
                    setOutreachFormData({ ...outreachFormData, title: e.target.value })
                  }
                  placeholder="Q4 2026 Primary School Book & Uniform Distribution Drive"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">
                    Location / State
                  </label>
                  <input
                    type="text"
                    required
                    value={outreachFormData.location}
                    onChange={(e) =>
                      setOutreachFormData({ ...outreachFormData, location: e.target.value })
                    }
                    placeholder="Ikwerre & Emohua Districts, Rivers State"
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">
                    Scheduled Dates
                  </label>
                  <input
                    type="text"
                    required
                    value={outreachFormData.date}
                    onChange={(e) =>
                      setOutreachFormData({ ...outreachFormData, date: e.target.value })
                    }
                    placeholder="October 17–19, 2026"
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">Pillar</label>
                  <select
                    value={outreachFormData.pillar}
                    onChange={(e) =>
                      setOutreachFormData({ ...outreachFormData, pillar: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                  >
                    <option value="Education">Education</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Empowerment">Empowerment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">Status</label>
                  <select
                    value={outreachFormData.status}
                    onChange={(e) =>
                      setOutreachFormData({ ...outreachFormData, status: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">
                    Target Beneficiaries
                  </label>
                  <input
                    type="text"
                    required
                    value={outreachFormData.beneficiariesTarget}
                    onChange={(e) =>
                      setOutreachFormData({
                        ...outreachFormData,
                        beneficiariesTarget: e.target.value
                      })
                    }
                    placeholder="1,200 Primary Pupils"
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Field Photo
                </label>
                <input
                  type="text"
                  required
                  value={outreachFormData.image}
                  onChange={(e) =>
                    setOutreachFormData({ ...outreachFormData, image: e.target.value })
                  }
                  placeholder="/images/IMG_0294.JPG"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Scope &amp; Deliverables
                </label>
                <textarea
                  rows="3"
                  required
                  value={outreachFormData.description}
                  onChange={(e) =>
                    setOutreachFormData({ ...outreachFormData, description: e.target.value })
                  }
                  placeholder="Delivering full uniform sets, branded exercise books..."
                  className="w-full p-3 rounded-xl border border-[#e7e2d8] bg-sand/30 text-xs text-ink focus:outline-none focus:border-primary leading-relaxed"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Volunteer &amp; Resource Needs
                </label>
                <input
                  type="text"
                  value={outreachFormData.needs}
                  onChange={(e) =>
                    setOutreachFormData({ ...outreachFormData, needs: e.target.value })
                  }
                  placeholder="Volunteer doctors, logistics drivers, packing assistants"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="pt-4 border-t border-[#e7e2d8] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setOutreachModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-[#e7e2d8] text-xs font-heading font-semibold text-ink-light hover:bg-sand cursor-pointer text-center min-h-[40px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold cursor-pointer shadow-xs text-center min-h-[40px]"
                >
                  {editingOutreach ? 'Save Changes' : 'Schedule Mission'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 3: ADD / EDIT IMPACT FIGURE
      ===================================================================== */}
      {metricModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-md 3xl:max-w-xl 4xl:max-w-2xl w-full p-4 sm:p-6 md:p-8 3xl:p-10 shadow-2xl border border-[#e7e2d8] max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-[#e7e2d8]">
              <h2 className="text-base sm:text-lg font-heading font-bold text-ink">
                {editingMetric ? 'Edit Impact Counter' : 'Add Impact Counter'}
              </h2>
              <button
                onClick={() => setMetricModalOpen(false)}
                className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-sand cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMetric} className="space-y-4">
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">
                    Stat Figure
                  </label>
                  <input
                    type="text"
                    required
                    value={metricFormData.stat}
                    onChange={(e) =>
                      setMetricFormData({ ...metricFormData, stat: e.target.value })
                    }
                    placeholder="12,500+"
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary font-mono font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">
                    Growth Badge
                  </label>
                  <input
                    type="text"
                    required
                    value={metricFormData.growth}
                    onChange={(e) =>
                      setMetricFormData({ ...metricFormData, growth: e.target.value })
                    }
                    placeholder="+32% YoY"
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Card Title
                </label>
                <input
                  type="text"
                  required
                  value={metricFormData.description}
                  onChange={(e) =>
                    setMetricFormData({ ...metricFormData, description: e.target.value, label: e.target.value })
                  }
                  placeholder="Students Supplied"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">Pillar Category</label>
                <select
                  value={metricFormData.category}
                  onChange={(e) =>
                    setMetricFormData({ ...metricFormData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                >
                  <option value="education">Education</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="transparency">Transparency</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Explanatory Detail
                </label>
                <textarea
                  rows="3"
                  required
                  value={metricFormData.detail}
                  onChange={(e) =>
                    setMetricFormData({ ...metricFormData, detail: e.target.value })
                  }
                  placeholder="Full uniforms, textbooks, and tuition scholarships across 24 partner schools."
                  className="w-full p-3 rounded-xl border border-[#e7e2d8] bg-sand/30 text-xs text-ink focus:outline-none focus:border-primary leading-relaxed"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-[#e7e2d8] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setMetricModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-[#e7e2d8] text-xs font-heading font-semibold text-ink-light hover:bg-sand cursor-pointer text-center min-h-[40px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold cursor-pointer shadow-xs text-center min-h-[40px]"
                >
                  Save Figure
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
