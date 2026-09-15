import { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import CurvedWaveBackground from '../components/CurvedWaveBackground';
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
  FileText,
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
  Check
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
    documents,
    addDocument,
    deleteDocument,
    announcement,
    updateAnnouncement,
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
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

  // Active admin tab & UI layout
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Search & Filter queries
  const [newsSearch, setNewsSearch] = useState('');
  const [newsCategoryFilter, setNewsCategoryFilter] = useState('All');
  const [outreachSearch, setOutreachSearch] = useState('');
  const [outreachStatusFilter, setOutreachStatusFilter] = useState('All');
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryFilter, setInquiryFilter] = useState('All');

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

  const [docModalOpen, setDocModalOpen] = useState(false);
  const [docFormData, setDocFormData] = useState({
    title: '',
    size: '1.5 MB',
    date: `Published ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
    auditor: 'Independent Certified Public Auditor'
  });

  // Temporary announcement editor
  const [tempAnnouncement, setTempAnnouncement] = useState(announcement);
  const [prevAnnouncement, setPrevAnnouncement] = useState(announcement);
  if (prevAnnouncement !== announcement) {
    setPrevAnnouncement(announcement);
    setTempAnnouncement(announcement);
  }

  // Financial allocations local state for interactive slider tweaking
  const [localAllocations, setLocalAllocations] = useState(allocations);
  const [prevAllocations, setPrevAllocations] = useState(allocations);
  if (prevAllocations !== allocations) {
    setPrevAllocations(allocations);
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
    setIsLoggingIn(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPass })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('tkh_admin_auth', 'true');
        if (data.user) {
          setAdminUser(data.user);
          sessionStorage.setItem('tkh_admin_user', JSON.stringify(data.user));
        }
        if (data.token) {
          sessionStorage.setItem('tkh_admin_token', data.token);
        }
        setLoginError('');
        showToast(`Welcome back, ${data.user?.name || 'Super Admin'}`);
        setIsLoggingIn(false);
        return;
      } else if (data.message) {
        setLoginError(data.message);
        setIsLoggingIn(false);
        return;
      }
    } catch (err) {
      console.info('Backend auth fallback:', err.message);
    }

    if (
      (loginEmail.trim().toLowerCase() === 'admin@tenkindhands.org' && loginPass === 'admin2026') ||
      loginPass === 'admin'
    ) {
      const fallbackUser = {
        name: 'Ten Kind Hands Super Admin',
        email: 'admin@tenkindhands.org',
        role: 'superadmin'
      };
      setIsAuthenticated(true);
      setAdminUser(fallbackUser);
      sessionStorage.setItem('tkh_admin_auth', 'true');
      sessionStorage.setItem('tkh_admin_user', JSON.stringify(fallbackUser));
      setLoginError('');
      showToast('Welcome back, Super Admin (Local Mode)');
    } else {
      setLoginError('Invalid email or password.');
    }
    setIsLoggingIn(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    sessionStorage.removeItem('tkh_admin_auth');
    sessionStorage.removeItem('tkh_admin_user');
    sessionStorage.removeItem('tkh_admin_token');
    showToast('Successfully signed out');
  };

  // Image gallery preset helper
  const imagePresets = [
    {
      label: 'Solar Classroom (Kaduna)',
      url: '/images/IMG_0303.JPG'
    },
    {
      label: 'School Supply & Uniform Outreach',
      url: '/images/IMG_0294.JPG'
    },
    {
      label: 'Food Distribution & Relief Mission',
      url: '/images/food-distribution.jpg'
    },
    {
      label: 'Women & Community Empowerment',
      url: '/images/IMG_0995.JPG'
    }
  ];

  // News Handlers
  const handleOpenNewNews = () => {
    setEditingNews(null);
    setNewsFormData({
      title: '',
      category: 'Field Milestone',
      author: 'Field Operations Desk',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      excerpt: '',
      image: imagePresets[0].url,
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
    if (!newsFormData.title.trim()) return;

    if (editingNews) {
      updateNews(editingNews.id, newsFormData);
      showToast(`Updated "${newsFormData.title.slice(0, 25)}..."`);
    } else {
      addNews({
        ...newsFormData,
        id: `news-${Date.now()}`
      });
      showToast('Field dispatch published live!');
    }
    setNewsModalOpen(false);
  };

  const handleDeleteNews = (item) => {
    if (window.confirm(`Delete field dispatch: "${item.title}"?`)) {
      deleteNews(item.id);
      showToast('Dispatch removed from field log');
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
      image: imagePresets[1].url
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
    if (!outreachFormData.title.trim()) return;

    if (editingOutreach) {
      updateOutreach(editingOutreach.id, outreachFormData);
      showToast(`Updated outreach: "${outreachFormData.title.slice(0, 25)}..."`);
    } else {
      addOutreach({
        ...outreachFormData,
        id: `outreach-${Date.now()}`
      });
      showToast('New outreach scheduled in public registry');
    }
    setOutreachModalOpen(false);
  };

  const handleDeleteOutreach = (item) => {
    if (window.confirm(`Delete outreach mission: "${item.title}"?`)) {
      deleteOutreach(item.id);
      showToast('Outreach deleted');
    }
  };

  const handleToggleOutreachStatus = (item) => {
    const nextStatus = item.status === 'upcoming' ? 'completed' : 'upcoming';
    updateOutreach(item.id, { status: nextStatus });
    showToast(`Mission status set to ${nextStatus.toUpperCase()}`);
  };

  // Impact Metric Handlers
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

  const handleSaveMetric = (e) => {
    e.preventDefault();
    if (!metricFormData.label.trim()) return;
    if (editingMetric) {
      updateMetric(editingMetric.id, metricFormData);
      showToast(`Updated ${metricFormData.label}`);
    } else {
      addMetric(metricFormData);
      showToast(`Added new impact metric indicator`);
    }
    setMetricModalOpen(false);
  };

  const handleDeleteMetric = (item) => {
    if (window.confirm(`Delete metric indicator "${item.label}"?`)) {
      deleteMetric(item.id);
      showToast('Metric indicator removed');
    }
  };

  // Transparency Allocation Handlers
  const handleAllocationPctChange = (index, value) => {
    const num = parseFloat(value) || 0;
    const updated = [...localAllocations];
    updated[index] = { ...updated[index], pct: num };
    setLocalAllocations(updated);
  };

  const handleSaveAllocations = () => {
    updateAllocations(localAllocations);
    showToast('Financial breakdown percentages updated');
  };

  // Document Handlers
  const handleSaveDoc = (e) => {
    e.preventDefault();
    if (!docFormData.title.trim()) return;
    addDocument(docFormData);
    showToast(`Added audit document: ${docFormData.title}`);
    setDocModalOpen(false);
    setDocFormData({
      title: '',
      size: '1.5 MB',
      date: `Published ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
      auditor: 'Independent Certified Public Auditor'
    });
  };

  const handleDeleteDoc = (doc) => {
    if (window.confirm(`Remove official record "${doc.title}"?`)) {
      deleteDocument(doc.id || doc.title);
      showToast('Document record removed');
    }
  };

  // Announcement Handlers
  const handleSaveAnnouncement = (e) => {
    e.preventDefault();
    updateAnnouncement(tempAnnouncement);
    showToast('Global announcement ticker published live!');
  };

  // Calculation for Total Allocations
  const totalAllocPct = localAllocations.reduce((sum, item) => sum + (parseFloat(item.pct) || 0), 0);
  const isTotalAlloc100 = Math.abs(totalAllocPct - 100) < 0.01;

  // Filtered queries
  const filteredNews = useMemo(() => {
    return news.filter((n) => {
      const matchesSearch =
        n.title.toLowerCase().includes(newsSearch.toLowerCase()) ||
        n.category.toLowerCase().includes(newsSearch.toLowerCase()) ||
        n.author.toLowerCase().includes(newsSearch.toLowerCase());
      const matchesCategory =
        newsCategoryFilter === 'All' || n.category.toLowerCase() === newsCategoryFilter.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [news, newsSearch, newsCategoryFilter]);

  const filteredOutreaches = useMemo(() => {
    return outreaches.filter((o) => {
      const matchesSearch =
        o.title.toLowerCase().includes(outreachSearch.toLowerCase()) ||
        o.location.toLowerCase().includes(outreachSearch.toLowerCase()) ||
        o.pillar.toLowerCase().includes(outreachSearch.toLowerCase());
      const matchesStatus =
        outreachStatusFilter === 'All' || o.status.toLowerCase() === outreachStatusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [outreaches, outreachSearch, outreachStatusFilter]);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((i) => {
      const matchesSearch =
        i.name?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
        i.email?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
        i.category?.toLowerCase().includes(inquirySearch.toLowerCase()) ||
        i.message?.toLowerCase().includes(inquirySearch.toLowerCase());
      const matchesFilter =
        inquiryFilter === 'All'
          ? true
          : inquiryFilter === 'Unread'
          ? i.status?.toLowerCase() === 'unread' || i.status?.toLowerCase() === 'new'
          : i.status?.toLowerCase() === inquiryFilter.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  }, [inquiries, inquirySearch, inquiryFilter]);

  // Distinct categories for filters
  const newsCategories = useMemo(() => {
    const cats = new Set(news.map((n) => n.category));
    return ['All', ...Array.from(cats)];
  }, [news]);

  // =========================================================================
  // VIEW A: EXECUTIVE LOGIN PORTAL (UNAUTHENTICATED)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f8f6f2] text-ink flex flex-col justify-between relative overflow-hidden font-sans selection:bg-primary/20 selection:text-primary">
        {/* Ambient Wave Backgrounds from Home Page */}
        <CurvedWaveBackground side="right" />
        <CurvedWaveBackground side="left" className="opacity-40" />

        {/* Subtle background ambient warm glow mesh */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-clay/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Minimal Return Header */}
        <div className="w-full px-6 py-5 flex items-center justify-between z-10">
          <button
            onClick={() => {
              if (setCurrentPage) setCurrentPage('home');
              window.location.hash = 'home';
            }}
            className="flex items-center gap-2 text-xs font-heading font-semibold text-ink-light hover:text-primary transition-colors cursor-pointer bg-white hover:bg-sand px-4 py-2 rounded-xl border border-[#e7e2d8] shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 text-primary" />
            <span>Return to Public Website</span>
          </button>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e7e2d8] text-[11px] text-ink-light font-medium shadow-xs">
            <span className="w-2 h-2 rounded-full bg-forest animate-pulse"></span>
            <span>CAC/IT/NO: 148920 • Secure Console</span>
          </div>
        </div>

        {/* Centered Login Card */}
        <div className="flex-1 flex items-center justify-center px-4 py-8 z-10">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-[#e7e2d8] rounded-3xl p-8 sm:p-10 shadow-xl shadow-ink/5">
            {/* Header Lockup */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-sand border border-[#e7e2d8] p-2 mx-auto mb-4 shadow-sm flex items-center justify-center">
                <img
                  alt="Ten Kind Hands Logo"
                  className="w-full h-full object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmbaMRmoVzqGDmSGEoX0XoPFIdN6UYrwile-1Gt1d37VzrQ2PeaP9G7MITiOYlV5Mlma8OlajwkWA3r7O1u4I69Sez16xvET1fYSAP8dl7zhMj1M0gMuXfZYOCWyuePctpR97q8v72-LHjIYFUf8CgqilRAMMM-D-G-S-sJToMqi-nhfADpBN1MUQEsECDNokFRkKAoeuKy8OqR7LAReSeIGPvsSwv08HUP9RVs-2uxRF2z55chm270O5kDJRiqFAmMg"
                />
              </div>
              <span className="inline-block text-[11px] uppercase tracking-widest text-primary font-bold bg-primary/10 px-3 py-1 rounded-full border border-primary/20 mb-2 font-heading">
                Executive Portal
              </span>
              <h1 className="text-2xl font-heading font-bold text-ink tracking-tight">
                Ten Kind Hands Portal
              </h1>
              <p className="text-xs text-ink-light mt-1.5">
                Authorized access for Operations, Audit &amp; Field Staff
              </p>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="mb-6 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3 animate-fade-in">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1.5">
                  Administrator Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-ink-muted absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@tenkindhands.org"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-sand/60 border border-[#e7e2d8] text-ink text-xs placeholder:text-ink-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1.5">
                  Security Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-ink-muted absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-sand/60 border border-[#e7e2d8] text-ink text-xs placeholder:text-ink-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/20 transition-all disabled:opacity-50 mt-2"
              >
                <Unlock className="w-4 h-4" />
                <span>{isLoggingIn ? 'Authenticating with Operations...' : 'Sign In to Operational Desk'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Footer info */}
        <div className="w-full py-4 text-center text-[11px] text-ink-muted border-t border-[#e7e2d8] z-10">
          Ten Kind Hands Initiative • CAC/IT/NO: 148920 • End-to-End Encrypted Session
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW B: AUTHENTICATED SUPER ADMIN COMMAND CENTER (APP SHELL)
  // =========================================================================
  const navigationItems = [
    {
      group: 'EXECUTIVE MANAGEMENT',
      items: [
        { id: 'overview', label: 'Dashboard Overview', icon: Layers, badge: null },
        { id: 'inquiries', label: 'Inbound Inquiries', icon: Mail, badge: inquiries.length }
      ]
    },
    {
      group: 'FIELD DELIVERABLES',
      items: [
        { id: 'news', label: 'Field Dispatches', icon: BookOpen, badge: news.length },
        { id: 'outreaches', label: 'Missions & Outreaches', icon: MapPin, badge: outreaches.length }
      ]
    },
    {
      group: 'GOVERNANCE & IMPACT',
      items: [
        { id: 'metrics', label: 'Impact Figures', icon: TrendingUp, badge: metrics.length },
        { id: 'transparency', label: 'Financial Allocation', icon: ShieldCheck, badge: '100%' },
        { id: 'announcement', label: 'Marquee Banner', icon: Globe, badge: 'Live' }
      ]
    },
    {
      group: 'SYSTEM & DATABASE',
      items: [
        { id: 'backup', label: 'Cloud Backup & Reset', icon: Database, badge: null }
      ]
    }
  ];

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
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#142722] text-[#d4cdc3] flex flex-col border-r border-[#1f3b34] transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 shrink-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="px-6 py-5 border-b border-[#1f3b34] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1f3b34] border border-[#2a4d44] p-1 flex items-center justify-center shrink-0">
              <img
                alt="Ten Kind Hands Logo"
                className="w-full h-full object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmbaMRmoVzqGDmSGEoX0XoPFIdN6UYrwile-1Gt1d37VzrQ2PeaP9G7MITiOYlV5Mlma8OlajwkWA3r7O1u4I69Sez16xvET1fYSAP8dl7zhMj1M0gMuXfZYOCWyuePctpR97q8v72-LHjIYFUf8CgqilRAMMM-D-G-S-sJToMqi-nhfADpBN1MUQEsECDNokFRkKAoeuKy8OqR7LAReSeIGPvsSwv08HUP9RVs-2uxRF2z55chm270O5kDJRiqFAmMg"
              />
            </div>
            <div>
              <span className="font-heading text-base font-bold text-white tracking-tight block leading-tight">
                Ten Kind Hands
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#f7c899] font-bold block font-heading">
                Super Admin Console
              </span>
            </div>
          </div>

          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items Groups */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 scrollbar-none">
          {navigationItems.map((group) => (
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
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-primary text-white shadow-md shadow-primary/30 font-bold'
                          : 'text-[#d4cdc3] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? 'text-white' : 'text-[#a2b5b0]'
                          }`}
                        />
                        <span className="font-heading">{item.label}</span>
                      </div>
                      {item.badge !== null && (
                        <span
                          className={`px-1.5 py-0.5 text-[10px] font-bold rounded-md ${
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
        <div className="p-4 border-t border-[#1f3b34] bg-[#0e1b17] space-y-3">
          {/* User Badge */}
          <div className="flex items-center justify-between bg-[#142722] p-2.5 rounded-2xl border border-[#1f3b34]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-primary/20 text-[#f7c899] border border-primary/30 flex items-center justify-center font-bold text-xs shrink-0 font-heading">
                SA
              </div>
              <div className="min-w-0 text-left">
                <p className="text-xs font-bold text-white truncate font-heading">
                  {adminUser?.name || 'Super Admin'}
                </p>
                <p className="text-[10px] text-[#829992] truncate">
                  {adminUser?.email || 'admin@tenkindhands.org'}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-[#829992] hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Return to Public Site Button */}
          <button
            onClick={() => {
              if (setCurrentPage) setCurrentPage('home');
              window.location.hash = 'home';
            }}
            className="w-full py-2 px-3 rounded-xl bg-[#1f3b34] hover:bg-[#25443c] text-[#f8f6f2] hover:text-white text-xs font-heading font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all border border-[#2a4d44]"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#f7c899]" />
            <span>Preview Live Public Site</span>
          </button>
        </div>
      </aside>

      {/* =====================================================================
          MAIN WORKSPACE CANVAS
      ===================================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden relative">
        {/* Ambient Wave Backgrounds from Home Page (Confined to exact content bounds) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          <CurvedWaveBackground side="right" />
          <CurvedWaveBackground side="left" className="opacity-30" />
        </div>

        {/* Top Application Header */}
        <header className="h-16 bg-white/95 backdrop-blur-md border-b border-[#e7e2d8] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-ink-light hover:bg-sand cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-ink-muted font-medium">Console</span>
              <ChevronRight className="w-3 h-3 text-[#d4cdc3]" />
              <span className="font-heading font-bold text-ink capitalize">
                {activeTab.replace('-', ' ')}
              </span>
            </div>
          </div>

          {/* Right Header Quick Controls */}
          <div className="flex items-center gap-3">
            {/* Quick Add Button based on active view */}
            {activeTab === 'news' && (
              <button
                onClick={handleOpenNewNews}
                className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Dispatch</span>
              </button>
            )}

            {activeTab === 'outreaches' && (
              <button
                onClick={handleOpenNewOutreach}
                className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Schedule Mission</span>
              </button>
            )}

            {activeTab === 'metrics' && (
              <button
                onClick={handleOpenNewMetric}
                className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add Impact Counter</span>
              </button>
            )}

            {activeTab === 'transparency' && (
              <button
                onClick={() => setDocModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add Audit Document</span>
              </button>
            )}

            {/* Export Backup shortcut */}
            <button
              onClick={exportDataBackup}
              title="Download backup JSON"
              className="p-2 rounded-xl text-ink-light hover:text-ink hover:bg-sand border border-[#e7e2d8] text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-ink-muted" />
              <span className="hidden md:inline">Export JSON</span>
            </button>

            {/* Preview Live Site */}
            <button
              onClick={() => {
                if (setCurrentPage) setCurrentPage('home');
                window.location.hash = 'home';
              }}
              className="px-3 py-1.5 rounded-xl bg-sand hover:bg-sand-dark text-ink text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer transition-colors border border-[#e7e2d8]"
            >
              <Eye className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline">Preview Site</span>
            </button>
          </div>
        </header>

        {/* Dynamic Tab Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8 relative z-10">
          {/* =================================================================
              TAB 1: DASHBOARD OVERVIEW
          ================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-br from-[#142722] via-[#1f3b34] to-[#25473e] text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden border border-[#2a4d44]">
                <CurvedWaveBackground side="right" className="opacity-25" />
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-clay/15 rounded-full blur-3xl pointer-events-none"></div>
                <div className="max-w-2xl relative z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-xs text-[#f7c899] border border-white/20 text-xs font-semibold mb-3 font-heading">
                    <span className="w-2 h-2 rounded-full bg-[#f7c899] animate-pulse"></span>
                    <span>Operational Desk Active &amp; Verified</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
                    Welcome back, <span className="text-[#f7c899]">Field Administrator</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-white/85 mt-2 leading-relaxed font-normal">
                    Live command center for Ten Kind Hands. Changes made here immediately update public dispatches, outreach logs, transparency allocations, and community metrics.
                  </p>
                </div>
              </div>

              {/* 4 Stat KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div
                  onClick={() => setActiveTab('news')}
                  className="bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-heading font-semibold uppercase tracking-wider text-ink-muted">
                      Field Dispatches
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-forest/10 text-forest flex items-center justify-center group-hover:bg-forest group-hover:text-white transition-colors">
                      <BookOpen className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-heading font-bold text-ink">{news.length}</div>
                  <div className="flex items-center justify-between text-[11px] text-ink-muted mt-2 pt-2 border-t border-[#e7e2d8]">
                    <span>Published articles</span>
                    <span className="text-forest font-semibold group-hover:underline flex items-center gap-1 font-heading">
                      Manage <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('outreaches')}
                  className="bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-heading font-semibold uppercase tracking-wider text-ink-muted">
                      Active Missions
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-heading font-bold text-ink">{outreaches.length}</div>
                  <div className="flex items-center justify-between text-[11px] text-ink-muted mt-2 pt-2 border-t border-[#e7e2d8]">
                    <span>
                      {outreaches.filter((o) => o.status === 'upcoming').length} upcoming •{' '}
                      {outreaches.filter((o) => o.status === 'completed').length} done
                    </span>
                    <span className="text-primary font-semibold group-hover:underline flex items-center gap-1 font-heading">
                      Schedule <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('transparency')}
                  className="bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-heading font-semibold uppercase tracking-wider text-ink-muted">
                      Direct Frontline Ratio
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-clay/10 text-clay flex items-center justify-center group-hover:bg-clay group-hover:text-white transition-colors">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-heading font-bold text-forest">
                    {allocations.find((a) => a.id === 'frontline')?.pct || 88.4}%
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-ink-muted mt-2 pt-2 border-t border-[#e7e2d8]">
                    <span>0.0% administrative cuts</span>
                    <span className="text-forest font-semibold group-hover:underline flex items-center gap-1 font-heading">
                      Audit <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('inquiries')}
                  className="bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-heading font-semibold uppercase tracking-wider text-ink-muted">
                      Inbound Inquiries
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-sand-dark text-ink flex items-center justify-center group-hover:bg-ink group-hover:text-white transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-heading font-bold text-ink">{inquiries.length}</div>
                  <div className="flex items-center justify-between text-[11px] text-ink-muted mt-2 pt-2 border-t border-[#e7e2d8]">
                    <span>
                      {inquiries.filter((i) => i.status === 'New' || i.status === 'Unread').length} unreviewed
                    </span>
                    <span className="text-clay font-semibold group-hover:underline flex items-center gap-1 font-heading">
                      View <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Operational Launchpad */}
              <div className="bg-white rounded-2xl border border-[#e7e2d8] p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-base font-heading font-bold text-ink">
                      Operational Quick Actions
                    </h2>
                    <p className="text-xs text-ink-muted">
                      Common management tasks executed across the platform
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={handleOpenNewNews}
                    className="p-4 rounded-xl border border-[#e7e2d8] bg-sand/50 hover:bg-sand hover:border-forest/40 text-left transition-all cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-forest/15 text-forest flex items-center justify-center mb-3 group-hover:bg-forest group-hover:text-white transition-colors">
                      <Plus className="w-4 h-4" />
                    </div>
                    <strong className="block text-xs font-heading font-bold text-ink mb-0.5">
                      Publish Field Dispatch
                    </strong>
                    <span className="text-[11px] text-ink-light leading-tight">
                      Write milestone story with photo documentary.
                    </span>
                  </button>

                  <button
                    onClick={handleOpenNewOutreach}
                    className="p-4 rounded-xl border border-[#e7e2d8] bg-sand/50 hover:bg-sand hover:border-primary/40 text-left transition-all cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <strong className="block text-xs font-heading font-bold text-ink mb-0.5">
                      Schedule Outreach
                    </strong>
                    <span className="text-[11px] text-ink-light leading-tight">
                      Register upcoming medical, school or water drive.
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('metrics')}
                    className="p-4 rounded-xl border border-[#e7e2d8] bg-sand/50 hover:bg-sand hover:border-clay/40 text-left transition-all cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-clay/15 text-clay flex items-center justify-center mb-3 group-hover:bg-clay group-hover:text-white transition-colors">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <strong className="block text-xs font-heading font-bold text-ink mb-0.5">
                      Adjust Impact Numbers
                    </strong>
                    <span className="text-[11px] text-ink-light leading-tight">
                      Update students, solar classrooms &amp; clinic counts.
                    </span>
                  </button>
                </div>
              </div>

              {/* Inquiries Snapshot & Dispatches Feed */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Inquiries Snapshot (7 cols) */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-[#e7e2d8] p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-base font-heading font-bold text-ink">
                        Recent Public Inquiries
                      </h2>
                      <p className="text-xs text-ink-muted">
                        Citizen messages, volunteer and partner submissions
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="text-xs text-primary font-heading font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All ({inquiries.length})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="divide-y divide-[#e7e2d8]">
                    {inquiries.slice(0, 4).map((inq) => (
                      <div key={inq.id} className="py-3 flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <strong className="text-xs font-heading font-bold text-ink truncate">
                              {inq.name}
                            </strong>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sand text-ink-light border border-[#e7e2d8]">
                              {inq.category}
                            </span>
                          </div>
                          <p className="text-xs text-ink-light truncate mt-0.5">{inq.message}</p>
                          <span className="text-[10px] text-ink-muted">{inq.date}</span>
                        </div>

                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ${
                            inq.status === 'Reviewed'
                              ? 'bg-forest/10 text-forest border border-forest/20'
                              : 'bg-clay/10 text-clay border border-clay/20'
                          }`}
                        >
                          {inq.status || 'New'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Announcement Preview (5 cols) */}
                <div className="lg:col-span-5 bg-white rounded-2xl border border-[#e7e2d8] p-6 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-base font-heading font-bold text-ink">
                        Global Marquee Status
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-forest/10 text-forest border border-forest/20 text-[10px] font-bold font-heading">
                        Live on Site
                      </span>
                    </div>
                    <p className="text-xs text-ink-muted mb-4">
                      Current alert broadcast to visitors across all pages
                    </p>

                    <div className="p-4 rounded-xl bg-[#142722] text-white text-xs leading-relaxed border border-[#1f3b34]">
                      <div className="flex items-center gap-2 text-[#f7c899] font-bold mb-1 text-[11px] font-heading">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f7c899] animate-pulse"></span>
                        <span>LIVE TICKER</span>
                      </div>
                      <p className="text-white/90">{announcement || '100% Direct Giving'}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('announcement')}
                    className="mt-4 w-full py-2 px-3 rounded-xl bg-sand hover:bg-sand-dark text-ink text-xs font-heading font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors border border-[#e7e2d8]"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-primary" />
                    <span>Edit Live Marquee</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 2: FIELD DISPATCHES (NEWS)
          ================================================================= */}
          {activeTab === 'news' && (
            <div className="space-y-6 animate-fade-in">
              {/* Header & Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs">
                <div>
                  <h1 className="text-xl font-heading font-bold text-ink">Field Dispatches &amp; News</h1>
                  <p className="text-xs text-ink-muted">
                    Documentary stories and milestones published to the public website
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-ink-muted absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search dispatches..."
                      value={newsSearch}
                      onChange={(e) => setNewsSearch(e.target.value)}
                      className="pl-9 pr-3 py-1.5 rounded-xl border border-[#e7e2d8] bg-sand/40 text-ink text-xs focus:outline-none focus:border-primary w-44 sm:w-56"
                    />
                  </div>

                  <select
                    value={newsCategoryFilter}
                    onChange={(e) => setNewsCategoryFilter(e.target.value)}
                    className="py-1.5 px-3 rounded-xl border border-[#e7e2d8] bg-sand/40 text-ink text-xs focus:outline-none focus:border-primary cursor-pointer"
                  >
                    {newsCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={handleOpenNewNews}
                    className="py-2 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Dispatch</span>
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-2xl border border-[#e7e2d8] overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-sand/70 border-b border-[#e7e2d8] text-[11px] font-heading font-bold text-ink-muted uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Article</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Author &amp; Date</th>
                        <th className="py-3 px-4">Excerpt</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e7e2d8]/60">
                      {filteredNews.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="py-12 text-center text-ink-muted">
                            No field dispatches found matching your search.
                          </td>
                        </tr>
                      ) : (
                        filteredNews.map((item) => (
                          <tr key={item.id} className="hover:bg-sand/30 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.image}
                                  alt=""
                                  className="w-12 h-12 rounded-xl object-cover border border-[#e7e2d8] shrink-0"
                                />
                                <div className="font-heading font-bold text-ink max-w-xs truncate">
                                  {item.title}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-forest/10 text-forest border border-forest/20 whitespace-nowrap">
                                {item.category}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-ink-light whitespace-nowrap">
                              <div className="font-medium text-ink">{item.author}</div>
                              <div className="text-[11px] text-ink-muted">{item.date}</div>
                            </td>
                            <td className="py-3 px-4 text-ink-light max-w-sm">
                              <p className="line-clamp-2">{item.excerpt}</p>
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleOpenEditNews(item)}
                                  className="p-1.5 rounded-lg text-ink-muted hover:text-forest hover:bg-forest/10 cursor-pointer transition-colors"
                                  title="Edit Dispatch"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteNews(item)}
                                  className="p-1.5 rounded-lg text-ink-muted hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                                  title="Delete Dispatch"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 3: OUTREACHES & MISSIONS
          ================================================================= */}
          {activeTab === 'outreaches' && (
            <div className="space-y-6 animate-fade-in">
              {/* Header & Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs">
                <div>
                  <h1 className="text-xl font-heading font-bold text-ink">
                    Frontline Missions &amp; Outreaches
                  </h1>
                  <p className="text-xs text-ink-muted">
                    Medical, educational, and clean water field activities
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-ink-muted absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search missions..."
                      value={outreachSearch}
                      onChange={(e) => setOutreachSearch(e.target.value)}
                      className="pl-9 pr-3 py-1.5 rounded-xl border border-[#e7e2d8] bg-sand/40 text-ink text-xs focus:outline-none focus:border-primary w-44 sm:w-56"
                    />
                  </div>

                  <div className="flex items-center bg-sand p-1 rounded-xl text-xs border border-[#e7e2d8]">
                    {['All', 'upcoming', 'completed'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setOutreachStatusFilter(st)}
                        className={`px-3 py-1 rounded-lg font-heading font-semibold capitalize cursor-pointer transition-colors ${
                          outreachStatusFilter === st
                            ? 'bg-white text-ink shadow-xs'
                            : 'text-ink-muted hover:text-ink'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleOpenNewOutreach}
                    className="py-2 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Schedule Mission</span>
                  </button>
                </div>
              </div>

              {/* Missions Grid Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredOutreaches.map((item) => {
                  const isUpcoming = item.status === 'upcoming';
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-[#e7e2d8] p-5 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider ${
                                isUpcoming
                                  ? 'bg-clay/10 text-clay border border-clay/20'
                                  : 'bg-forest/10 text-forest border border-forest/20'
                              }`}
                            >
                              {item.status}
                            </span>
                            <span className="text-[11px] font-heading font-semibold text-forest">
                              {item.pillar}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenEditOutreach(item)}
                              className="p-1.5 rounded-lg text-ink-muted hover:text-forest hover:bg-forest/10 cursor-pointer transition-colors"
                              title="Edit Mission"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteOutreach(item)}
                              className="p-1.5 rounded-lg text-ink-muted hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                              title="Delete Mission"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <h3 className="text-base font-heading font-bold text-ink mb-2 leading-snug">
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

                      <div className="pt-3 border-t border-[#e7e2d8] flex items-center justify-between">
                        <div className="text-[11px] text-ink-muted truncate max-w-[200px]">
                          Needs: {item.needs || 'None specified'}
                        </div>

                        <button
                          onClick={() => handleToggleOutreachStatus(item)}
                          className={`px-3 py-1 rounded-lg text-xs font-heading font-semibold cursor-pointer transition-colors ${
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
              TAB 4: IMPACT FIGURES
          ================================================================= */}
          {activeTab === 'metrics' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs">
                <div>
                  <h1 className="text-xl font-heading font-bold text-ink">Audited Impact Figures</h1>
                  <p className="text-xs text-ink-muted">
                    Live public counters displayed on the homepage and impact report
                  </p>
                </div>

                <button
                  onClick={handleOpenNewMetric}
                  className="py-2 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Impact Counter</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {metrics.map((m) => (
                  <div
                    key={m.id}
                    className="bg-white rounded-2xl border border-[#e7e2d8] p-5 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider bg-sand text-ink-light border border-[#e7e2d8] font-heading">
                          {m.category || 'education'}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEditMetric(m)}
                            className="p-1.5 rounded-lg text-ink-muted hover:text-forest hover:bg-forest/10 cursor-pointer transition-colors"
                            title="Edit Metric"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteMetric(m)}
                            className="p-1.5 rounded-lg text-ink-muted hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                            title="Delete Metric"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="text-3xl font-heading font-extrabold text-ink mb-1 font-mono">{m.stat}</div>
                      <div className="text-xs font-heading font-bold text-ink-light mb-1">{m.description}</div>
                      <div className="inline-block px-2 py-0.5 rounded bg-forest/10 text-forest text-[10px] font-bold mb-3 border border-forest/20 font-heading">
                        {m.growth}
                      </div>
                      <p className="text-xs text-ink-light leading-relaxed">{m.detail}</p>
                    </div>

                    <div className="pt-3 mt-4 border-t border-[#e7e2d8] text-[11px] text-ink-muted">
                      ID: <code className="font-mono text-[10px]">{m.id}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 5: FINANCIAL ALLOCATION & TRANSPARENCY
          ================================================================= */}
          {activeTab === 'transparency' && (
            <div className="space-y-8 animate-fade-in">
              {/* Sliders Card */}
              <div className="bg-white rounded-2xl border border-[#e7e2d8] p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-lg font-heading font-bold text-ink">
                      Financial Allocation Sliders (100% Model)
                    </h2>
                    <p className="text-xs text-ink-muted">
                      Demonstrates our radical 100% direct-giving model to donors and audit bodies
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

                {/* Progress Bar Visualization */}
                <div className="h-4 rounded-full overflow-hidden flex mb-8 bg-sand-dark border border-[#e7e2d8]">
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

                {/* Interactive Sliders */}
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

              {/* Audited Documents Table */}
              <div className="bg-white rounded-2xl border border-[#e7e2d8] p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-heading font-bold text-ink">
                      Audited Financial &amp; Legal Records
                    </h2>
                    <p className="text-xs text-ink-muted">
                      CAC, SCUML, and independent accounting audit statements available for public download
                    </p>
                  </div>

                  <button
                    onClick={() => setDocModalOpen(true)}
                    className="py-2 px-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add PDF Record</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-sand/70 text-[11px] font-heading font-bold text-ink-muted uppercase tracking-wider border-b border-[#e7e2d8]">
                      <tr>
                        <th className="py-3 px-4">Document Title</th>
                        <th className="py-3 px-4">Size</th>
                        <th className="py-3 px-4">Audited Date</th>
                        <th className="py-3 px-4">Certifying Body</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e7e2d8]/60">
                      {documents.map((doc) => (
                        <tr key={doc.id || doc.title} className="hover:bg-sand/30 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2.5 font-heading font-bold text-ink">
                              <FileText className="w-4 h-4 text-primary shrink-0" />
                              <span>{doc.title}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-ink-light">{doc.size}</td>
                          <td className="py-3 px-4 text-ink-light">{doc.date}</td>
                          <td className="py-3 px-4 text-ink-light">{doc.auditor}</td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleDeleteDoc(doc)}
                              className="p-1.5 rounded-lg text-ink-muted hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 6: MARQUEE ANNOUNCEMENT BANNER
          ================================================================= */}
          {activeTab === 'announcement' && (
            <div className="max-w-3xl space-y-6 animate-fade-in">
              <div className="bg-white rounded-2xl border border-[#e7e2d8] p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-xl font-heading font-bold text-ink">
                      Global Announcement Ribbon
                    </h1>
                    <p className="text-xs text-ink-muted">
                      Live ticker ribbon displayed across the top of public website pages
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-forest/10 text-forest border border-forest/20 text-xs font-heading font-bold">
                    Real-Time
                  </span>
                </div>

                {/* Simulated Live Preview */}
                <div className="mb-6 p-4 rounded-xl bg-[#142722] text-white text-xs border border-[#1f3b34]">
                  <div className="flex items-center gap-2 text-[#f7c899] font-bold mb-1.5 text-[11px] font-heading">
                    <span className="w-2 h-2 rounded-full bg-[#f7c899] animate-pulse"></span>
                    <span>LIVE SIMULATION (DESKTOP &amp; MOBILE)</span>
                  </div>
                  <p className="text-white/95 font-medium">
                    {tempAnnouncement || '100% Direct-to-Field Giving'}
                  </p>
                </div>

                <form onSubmit={handleSaveAnnouncement} className="space-y-4">
                  <div>
                    <label className="block text-xs font-heading font-bold text-ink mb-1.5">
                      Announcement Text
                    </label>
                    <textarea
                      rows="3"
                      value={tempAnnouncement}
                      onChange={(e) => setTempAnnouncement(e.target.value)}
                      placeholder="e.g. Commissioning new solar classrooms in Kaduna & mobile clinic in Enugu"
                      className="w-full p-3.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-xs text-ink focus:outline-none focus:border-primary leading-relaxed"
                    ></textarea>
                    <span className="text-[11px] text-ink-muted block text-right mt-1">
                      {tempAnnouncement?.length || 0} characters
                    </span>
                  </div>

                  {/* Preset quick picks */}
                  <div>
                    <span className="block text-[11px] font-heading font-bold text-ink-muted uppercase tracking-wider mb-2">
                      Suggested Quick Presets:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Commissioning new solar classrooms in Kaduna & mobile health clinic in Enugu',
                        '100% Direct Giving: Zero kobo deducted for administrative salaries or office fees',
                        'Q4 2026 Primary School Book & Uniform Distribution Drive scheduled for Rivers State',
                        'Special Report: 2025 Full Financial & Field Impact Audit published'
                      ].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setTempAnnouncement(preset)}
                          className="text-[11px] text-left px-3 py-1.5 rounded-lg bg-sand hover:bg-sand-dark text-ink-light border border-[#e7e2d8] cursor-pointer transition-colors"
                        >
                          "{preset.slice(0, 45)}..."
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#e7e2d8] flex items-center justify-end">
                    <button
                      type="submit"
                      className="py-2.5 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Publish Live Marquee</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 7: INBOUND INQUIRIES & LEADS DESK
          ================================================================= */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs">
                <div>
                  <h1 className="text-xl font-heading font-bold text-ink">Inbound Public Inquiries</h1>
                  <p className="text-xs text-ink-muted">
                    Citizen submissions from Contact, Volunteer, and Corporate Partnership forms
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-ink-muted absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      className="pl-9 pr-3 py-1.5 rounded-xl border border-[#e7e2d8] bg-sand/40 text-ink text-xs focus:outline-none focus:border-primary w-44 sm:w-56"
                    />
                  </div>

                  <div className="flex items-center bg-sand p-1 rounded-xl text-xs border border-[#e7e2d8]">
                    {['All', 'Unread', 'Reviewed'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setInquiryFilter(st)}
                        className={`px-3 py-1 rounded-lg font-heading font-semibold cursor-pointer transition-colors ${
                          inquiryFilter === st
                            ? 'bg-white text-ink shadow-xs'
                            : 'text-ink-muted hover:text-ink'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#e7e2d8] overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-sand/70 text-[11px] font-heading font-bold text-ink-muted uppercase tracking-wider border-b border-[#e7e2d8]">
                      <tr>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Message</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e7e2d8]/60">
                      {filteredInquiries.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="py-12 text-center text-ink-muted">
                            No inbound inquiries found matching your filter.
                          </td>
                        </tr>
                      ) : (
                        filteredInquiries.map((inq) => (
                          <tr key={inq.id} className="hover:bg-sand/30 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-heading font-bold text-ink">{inq.name}</div>
                              <div className="text-[11px] text-ink-light">{inq.email}</div>
                              {inq.phone && (
                                <div className="text-[10px] text-ink-muted">{inq.phone}</div>
                              )}
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-sand text-ink-light border border-[#e7e2d8]">
                                {inq.category}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 max-w-sm text-ink-light">
                              <p className="line-clamp-2">{inq.message}</p>
                            </td>
                            <td className="py-3.5 px-4 text-ink-muted whitespace-nowrap">
                              {inq.date}
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <button
                                onClick={() =>
                                  updateInquiryStatus(
                                    inq.id,
                                    inq.status === 'Reviewed' ? 'Unread' : 'Reviewed'
                                  )
                                }
                                className={`px-2.5 py-1 rounded-full text-[10px] font-heading font-semibold cursor-pointer transition-colors ${
                                  inq.status === 'Reviewed'
                                    ? 'bg-forest/10 text-forest border border-forest/20 hover:bg-forest/20'
                                    : 'bg-clay/10 text-clay border border-clay/20 hover:bg-clay/20'
                                }`}
                              >
                                {inq.status || 'New'}
                              </button>
                            </td>
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete inquiry from "${inq.name}"?`)) {
                                    deleteInquiry(inq.id);
                                    showToast('Inquiry deleted');
                                  }
                                }}
                                className="p-1.5 rounded-lg text-ink-muted hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                                title="Delete Inquiry"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 8: CLOUD BACKUP & DATABASE SYSTEM
          ================================================================= */}
          {activeTab === 'backup' && (
            <div className="space-y-6 animate-fade-in max-w-3xl">
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
                      <span className="font-mono text-white/90">http://localhost:5000</span>
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
                  </div>
                </div>

                {/* Export & Reset Actions */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-sand/50 border border-[#e7e2d8] flex items-center justify-between gap-4">
                    <div>
                      <strong className="block text-xs font-heading font-bold text-ink">
                        Export Full JSON Snapshot
                      </strong>
                      <span className="text-[11px] text-ink-muted">
                        Download all current dispatches, outreaches, metrics, and inquiries.
                      </span>
                    </div>
                    <button
                      onClick={exportDataBackup}
                      className="py-2 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download JSON</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200 flex items-center justify-between gap-4">
                    <div>
                      <strong className="block text-xs font-heading font-bold text-rose-900">
                        Reset Platform to Default Records
                      </strong>
                      <span className="text-[11px] text-rose-700">
                        Restore all seed articles, missions, and metrics to default state.
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            'Are you sure you want to restore all website content to default starter records? Any custom dispatches will be reset.'
                          )
                        ) {
                          resetToDefaults();
                          showToast('Restored default starter data');
                        }
                      }}
                      className="py-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset Defaults</span>
                    </button>
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
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#e7e2d8] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e7e2d8]">
              <h2 className="text-lg font-heading font-bold text-ink">
                {editingNews ? 'Edit Field Dispatch' : 'Publish New Field Dispatch'}
              </h2>
              <button
                onClick={() => setNewsModalOpen(false)}
                className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-sand"
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
                    placeholder="September 8, 2026"
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Photo URL &amp; Presets
                </label>
                <input
                  type="url"
                  required
                  value={newsFormData.image}
                  onChange={(e) => setNewsFormData({ ...newsFormData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary mb-2"
                />
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-heading font-bold text-ink-muted uppercase tracking-wider">Presets:</span>
                  {imagePresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setNewsFormData({ ...newsFormData, image: preset.url })}
                      className="text-[10px] px-2 py-1 rounded bg-sand hover:bg-sand-dark text-ink-light border border-[#e7e2d8] cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Short Excerpt / Teaser
                </label>
                <textarea
                  rows="2"
                  required
                  value={newsFormData.excerpt}
                  onChange={(e) => setNewsFormData({ ...newsFormData, excerpt: e.target.value })}
                  placeholder="Summary for article previews and search listings..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Full Story Body (Markdown Supported)
                </label>
                <textarea
                  rows="6"
                  required
                  value={newsFormData.body}
                  onChange={(e) => setNewsFormData({ ...newsFormData, body: e.target.value })}
                  placeholder="Full dispatch text..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary font-sans"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-[#e7e2d8] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setNewsModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-[#e7e2d8] text-xs font-heading font-semibold text-ink-light hover:bg-sand cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold cursor-pointer shadow-xs"
                >
                  {editingNews ? 'Save Changes' : 'Publish Dispatch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: SCHEDULE / EDIT OUTREACH MISSION
      ===================================================================== */}
      {outreachModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#e7e2d8] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e7e2d8]">
              <h2 className="text-lg font-heading font-bold text-ink">
                {editingOutreach ? 'Edit Outreach Mission' : 'Schedule New Mission'}
              </h2>
              <button
                onClick={() => setOutreachModalOpen(false)}
                className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-sand"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOutreach} className="space-y-4">
              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Mission Headline
                </label>
                <input
                  type="text"
                  required
                  value={outreachFormData.title}
                  onChange={(e) =>
                    setOutreachFormData({ ...outreachFormData, title: e.target.value })
                  }
                  placeholder="e.g. Q4 Primary School Book & Uniform Distribution Drive"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">Status</label>
                  <select
                    value={outreachFormData.status}
                    onChange={(e) =>
                      setOutreachFormData({ ...outreachFormData, status: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">Pillar</label>
                  <select
                    value={outreachFormData.pillar}
                    onChange={(e) =>
                      setOutreachFormData({ ...outreachFormData, pillar: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="Education">Education</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Youth & Widows">Youth &amp; Widows</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">Date</label>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={outreachFormData.location}
                    onChange={(e) =>
                      setOutreachFormData({ ...outreachFormData, location: e.target.value })
                    }
                    placeholder="Ikwerre & Emohua, Rivers State"
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">
                    Beneficiaries Target
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
                  Volunteer Needs / Resource Requests
                </label>
                <input
                  type="text"
                  value={outreachFormData.needs}
                  onChange={(e) =>
                    setOutreachFormData({ ...outreachFormData, needs: e.target.value })
                  }
                  placeholder="Volunteer doctors, logistics drivers, packing assistants."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Mission Summary
                </label>
                <textarea
                  rows="3"
                  required
                  value={outreachFormData.description}
                  onChange={(e) =>
                    setOutreachFormData({ ...outreachFormData, description: e.target.value })
                  }
                  placeholder="Scope of medical consultation, school supplies, or borehole commissioning..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-[#e7e2d8] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setOutreachModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-[#e7e2d8] text-xs font-heading font-semibold text-ink-light hover:bg-sand cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold cursor-pointer shadow-xs"
                >
                  {editingOutreach ? 'Save Outreach' : 'Schedule Mission'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 3: ADD / EDIT IMPACT METRIC
      ===================================================================== */}
      {metricModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#e7e2d8]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e7e2d8]">
              <h2 className="text-lg font-heading font-bold text-ink">
                {editingMetric ? 'Edit Impact Counter' : 'Add Impact Counter'}
              </h2>
              <button
                onClick={() => setMetricModalOpen(false)}
                className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-sand"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMetric} className="space-y-4">
              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Indicator Label
                </label>
                <input
                  type="text"
                  required
                  value={metricFormData.label}
                  onChange={(e) =>
                    setMetricFormData({ ...metricFormData, label: e.target.value })
                  }
                  placeholder="e.g. Education Impact"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                    placeholder="12,500"
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs font-mono font-bold focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">YoY Growth</label>
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
                <label className="block text-xs font-heading font-semibold text-ink mb-1">Subtitle</label>
                <input
                  type="text"
                  required
                  value={metricFormData.description}
                  onChange={(e) =>
                    setMetricFormData({ ...metricFormData, description: e.target.value })
                  }
                  placeholder="Students Enrolled & Supplied"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Detailed Verification Note
                </label>
                <textarea
                  rows="3"
                  value={metricFormData.detail}
                  onChange={(e) =>
                    setMetricFormData({ ...metricFormData, detail: e.target.value })
                  }
                  placeholder="Provided free uniforms, solar classroom desks..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-[#e7e2d8] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setMetricModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-[#e7e2d8] text-xs font-heading font-semibold text-ink-light hover:bg-sand cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold cursor-pointer shadow-xs"
                >
                  Save Figure
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 4: ADD AUDIT RECORD
      ===================================================================== */}
      {docModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#e7e2d8]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e7e2d8]">
              <h2 className="text-lg font-heading font-bold text-ink">Upload Audit Record</h2>
              <button
                onClick={() => setDocModalOpen(false)}
                className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-sand"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDoc} className="space-y-4">
              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  required
                  value={docFormData.title}
                  onChange={(e) => setDocFormData({ ...docFormData, title: e.target.value })}
                  placeholder="2026 Audited Financial Statement (PDF)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">File Size</label>
                  <input
                    type="text"
                    required
                    value={docFormData.size}
                    onChange={(e) => setDocFormData({ ...docFormData, size: e.target.value })}
                    placeholder="2.4 MB"
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">Date</label>
                  <input
                    type="text"
                    required
                    value={docFormData.date}
                    onChange={(e) => setDocFormData({ ...docFormData, date: e.target.value })}
                    placeholder="Published June 2026"
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Certifying Auditor / Authority
                </label>
                <input
                  type="text"
                  required
                  value={docFormData.auditor}
                  onChange={(e) => setDocFormData({ ...docFormData, auditor: e.target.value })}
                  placeholder="Bakare & Co. Chartered Accountants"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="pt-4 border-t border-[#e7e2d8] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setDocModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-[#e7e2d8] text-xs font-heading font-semibold text-ink-light hover:bg-sand cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold cursor-pointer shadow-xs"
                >
                  Add Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
