import { useState } from 'react';
import {
  Users,
  Plus,
  Trash2,
  Edit3,
  Save,
  Check,
  ExternalLink,
  Eye,
  MapPin,
  X
} from '../../components/Icons';

export default function StoryPageEditor({
  storyContent,
  updateStoryContent,
  updateStoryCoordinators,
  updateStoryLeadership,
  setCurrentPage,
  showToast
}) {
  const [activeSection, setActiveSection] = useState('coordinators');

  // Coordinators state
  const coordinators = storyContent?.stateCoordinators || [];
  const leadership = storyContent?.leadership || [];

  // Vision state
  const [visionTitle, setVisionTitle] = useState(storyContent?.visionTitle || 'Mission • Vision • Values');
  const [visionHeadline, setVisionHeadline] = useState(
    storyContent?.visionHeadline || 'A seed planted in hope. A forest grown in dignity.'
  );
  const [visionStatement, setVisionStatement] = useState(
    storyContent?.visionStatement ||
      'A world where every child has access to quality education, and every woman and child has access to comprehensive healthcare. We strive to break the cycle of poverty and increase the overall well-being of communities by empowering children through education and promoting the health and well-being of women and children.'
  );

  // Modal / Form state for Coordinator
  const [coordModalOpen, setCoordModalOpen] = useState(false);
  const [editingCoordIdx, setEditingCoordIdx] = useState(null);
  const [coordForm, setCoordForm] = useState({
    name: '',
    role: '',
    badge: '',
    initials: '',
    image: '',
    description: ''
  });

  // Modal / Form state for Leader
  const [leaderModalOpen, setLeaderModalOpen] = useState(false);
  const [editingLeaderIdx, setEditingLeaderIdx] = useState(null);
  const [leaderForm, setLeaderForm] = useState({
    name: '',
    role: '',
    badge: '',
    initials: '',
    image: '',
    description: ''
  });

  // Coordinator handlers
  const handleOpenNewCoord = () => {
    setEditingCoordIdx(null);
    setCoordForm({
      name: '',
      role: 'State Project Coordinator',
      badge: 'State Coordinator',
      initials: 'SC',
      image: '/images/',
      description: 'Coordinates community engagement, education scholarships, and frontline healthcare mission delivery across state communities.'
    });
    setCoordModalOpen(true);
  };

  const handleOpenEditCoord = (coord, index) => {
    setEditingCoordIdx(index);
    setCoordForm({
      name: coord.name || '',
      role: coord.role || '',
      badge: coord.badge || '',
      initials: coord.initials || '',
      image: coord.image || '',
      description: coord.description || ''
    });
    setCoordModalOpen(true);
  };

  const handleSaveCoordinator = (e) => {
    e.preventDefault();
    const updated = [...coordinators];
    const itemData = {
      ...coordForm,
      initials:
        coordForm.initials.trim() ||
        coordForm.name
          .split(' ')
          .map((n) => n[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()
    };

    if (editingCoordIdx !== null) {
      updated[editingCoordIdx] = itemData;
      showToast(`Updated coordinator: ${itemData.name}`);
    } else {
      updated.push(itemData);
      showToast(`Added coordinator: ${itemData.name}`);
    }

    updateStoryCoordinators(updated);
    setCoordModalOpen(false);
  };

  const handleDeleteCoordinator = (index) => {
    const item = coordinators[index];
    if (window.confirm(`Are you sure you want to remove coordinator "${item.name}"?`)) {
      const updated = coordinators.filter((_, i) => i !== index);
      updateStoryCoordinators(updated);
      showToast(`Removed coordinator: ${item.name}`);
    }
  };

  // Leader handlers
  const handleOpenEditLeader = (leader, index) => {
    setEditingLeaderIdx(index);
    setLeaderForm({
      name: leader.name || '',
      role: leader.role || '',
      badge: leader.badge || '',
      initials: leader.initials || '',
      image: leader.image || '',
      description: leader.description || ''
    });
    setLeaderModalOpen(true);
  };

  const handleSaveLeader = (e) => {
    e.preventDefault();
    const updated = [...leadership];
    updated[editingLeaderIdx] = {
      ...leaderForm,
      initials:
        leaderForm.initials.trim() ||
        leaderForm.name
          .split(' ')
          .map((n) => n[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()
    };

    updateStoryLeadership(updated);
    setLeaderModalOpen(false);
    showToast(`Updated leadership member: ${leaderForm.name}`);
  };

  // Vision handler
  const handleSaveVision = (e) => {
    e?.preventDefault();
    updateStoryContent({
      visionTitle,
      visionHeadline,
      visionStatement
    });
    showToast('Mission & Vision statements updated on Our Story');
  };

  const sections = [
    {
      id: 'coordinators',
      label: 'State Coordinators Team',
      desc: `${coordinators.length} regional field coordinators (Benue, Oyo, Lagos, FCT, Plateau...)`
    },
    {
      id: 'leadership',
      label: 'Executive Leadership',
      desc: `${leadership.length} senior governance & operations members`
    },
    {
      id: 'vision',
      label: 'Mission & Vision Statements',
      desc: 'Foundational values & impact commitments'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#e7e2d8] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider bg-forest/10 text-forest border border-forest/20">
              Page Editor
            </span>
            <span className="text-xs font-semibold text-ink-muted">• Public Route: /#our-story</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-ink">
            Our Story Content Manager
          </h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Manage state coordinators, executive leaders, and foundational mission statements.
          </p>
        </div>

        <button
          onClick={() => {
            if (setCurrentPage) setCurrentPage('our-story');
            window.location.hash = 'our-story';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-3.5 py-2 rounded-xl bg-sand hover:bg-sand-dark text-ink text-xs font-heading font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors border border-[#e7e2d8] shrink-0"
        >
          <Eye className="w-4 h-4 text-forest" />
          <span>Preview Live Our Story</span>
          <ExternalLink className="w-3 h-3 text-ink-muted" />
        </button>
      </div>

      {/* Section Navigation Pills */}
      <div className="bg-white p-2 rounded-2xl border border-[#e7e2d8] shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`py-2.5 px-3 rounded-xl text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-forest text-white shadow-xs font-bold'
                    : 'bg-sand/40 hover:bg-sand text-ink hover:text-ink'
                }`}
              >
                <span className="block text-xs font-heading font-bold truncate">
                  {sec.label}
                </span>
                <span
                  className={`text-[10px] block truncate mt-0.5 ${
                    isActive ? 'text-white/80' : 'text-ink-muted'
                  }`}
                >
                  {sec.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          SECTION 1: STATE COORDINATORS TEAM
      ===================================================================== */}
      {activeSection === 'coordinators' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-heading font-bold text-ink">
                State Coordinators Team ({coordinators.length})
              </h2>
              <p className="text-xs text-ink-muted">
                Regional leaders driving ground-level projects across Benue, Oyo, Lagos, FCT Abuja, Plateau State, etc.
              </p>
            </div>

            <button
              onClick={handleOpenNewCoord}
              className="py-2 px-4 rounded-xl bg-forest hover:bg-forest/90 text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add State Coordinator</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coordinators.map((coord, idx) => (
              <div
                key={coord.name + idx}
                className="bg-white rounded-3xl border border-[#e7e2d8] p-5 flex flex-col items-center text-center shadow-xs hover:border-forest/40 hover:shadow-md transition-all group"
              >
                {/* Photo or Initials */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-[#e7e2d8] group-hover:border-forest/40 shadow-xs mb-4 bg-sand relative shrink-0">
                  {coord.image ? (
                    <img
                      src={encodeURI(coord.image)}
                      alt={coord.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-sand text-forest font-heading font-bold text-2xl">
                      {coord.initials || 'SC'}
                    </div>
                  )}
                </div>

                <span className="px-3 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider font-heading mb-1 bg-sand text-forest border border-[#e7e2d8]">
                  {coord.badge || 'State Coordinator'}
                </span>

                <h3 className="text-base font-heading font-bold text-ink mb-0.5 group-hover:text-forest transition-colors">
                  {coord.name}
                </h3>

                <p className="text-xs font-bold text-primary font-heading mb-2">
                  {coord.role}
                </p>

                <p className="text-xs text-ink-light leading-relaxed line-clamp-3 mb-4">
                  {coord.description}
                </p>

                <div className="w-full pt-3 mt-auto border-t border-[#e7e2d8] flex items-center justify-between">
                  <span className="text-[10px] text-ink-muted truncate max-w-[140px]">
                    {coord.image ? coord.image.split('/').pop() : 'No photo uploaded'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditCoord(coord, idx)}
                      className="p-1.5 rounded-lg text-ink-muted hover:text-forest hover:bg-forest/10 cursor-pointer transition-colors"
                      title="Edit Coordinator"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCoordinator(idx)}
                      className="p-1.5 rounded-lg text-ink-muted hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                      title="Delete Coordinator"
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

      {/* =====================================================================
          SECTION 2: EXECUTIVE LEADERSHIP TEAM
      ===================================================================== */}
      {activeSection === 'leadership' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-heading font-bold text-ink">
                Executive Leadership &amp; Governance ({leadership.length})
              </h2>
              <p className="text-xs text-ink-muted">
                Trustees, directors, and operational heads leading nationwide program execution.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadership.map((member, idx) => (
              <div
                key={member.name + idx}
                className="bg-white rounded-3xl border border-[#e7e2d8] p-5 flex flex-col items-center text-center shadow-xs hover:border-forest/40 hover:shadow-md transition-all group"
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-[#e7e2d8] group-hover:border-forest/40 shadow-xs mb-4 bg-sand relative shrink-0">
                  {member.image ? (
                    <img
                      src={encodeURI(member.image)}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-sand text-forest font-heading font-bold text-2xl">
                      {member.initials || 'TKH'}
                    </div>
                  )}
                </div>

                <span className="px-3 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider font-heading mb-1 bg-sand text-primary border border-[#e7e2d8]">
                  {member.badge}
                </span>

                <h3 className="text-base font-heading font-bold text-ink mb-0.5 group-hover:text-forest transition-colors">
                  {member.name}
                </h3>

                <p className="text-xs font-bold text-forest font-heading mb-2">
                  {member.role}
                </p>

                <p className="text-xs text-ink-light leading-relaxed line-clamp-3 mb-4">
                  {member.description}
                </p>

                <div className="w-full pt-3 mt-auto border-t border-[#e7e2d8] flex items-center justify-end">
                  <button
                    onClick={() => handleOpenEditLeader(member, idx)}
                    className="p-1.5 rounded-lg text-ink-muted hover:text-forest hover:bg-forest/10 cursor-pointer transition-colors"
                    title="Edit Leader Details"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 3: MISSION & VISION STATEMENTS
      ===================================================================== */}
      {activeSection === 'vision' && (
        <div className="bg-white rounded-2xl border border-[#e7e2d8] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#e7e2d8]">
            <div>
              <h2 className="text-base font-heading font-bold text-ink">
                Foundational Mission, Vision &amp; Values
              </h2>
              <p className="text-xs text-ink-muted">
                Core narrative displayed at the top of the Our Story page.
              </p>
            </div>
            <button
              onClick={handleSaveVision}
              className="py-2 px-4 rounded-xl bg-forest hover:bg-forest/90 text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>

          <form onSubmit={handleSaveVision} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-heading font-bold text-ink mb-1.5">
                  Section Subheading Tag
                </label>
                <input
                  type="text"
                  value={visionTitle}
                  onChange={(e) => setVisionTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-forest"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold text-ink mb-1.5">
                  Editorial Headline
                </label>
                <input
                  type="text"
                  value={visionHeadline}
                  onChange={(e) => setVisionHeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink font-heading font-bold text-xs focus:outline-none focus:border-forest"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-heading font-bold text-ink mb-1.5">
                Official Vision Statement
              </label>
              <textarea
                rows="5"
                value={visionStatement}
                onChange={(e) => setVisionStatement(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-xs text-ink focus:outline-none focus:border-forest leading-relaxed"
              ></textarea>
            </div>

            <div className="pt-4 border-t border-[#e7e2d8] flex justify-end">
              <button
                type="submit"
                className="py-2.5 px-6 rounded-xl bg-forest hover:bg-forest/90 text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Publish Updates</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* =====================================================================
          MODAL: ADD / EDIT STATE COORDINATOR
      ===================================================================== */}
      {coordModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#e7e2d8]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e7e2d8]">
              <h2 className="text-lg font-heading font-bold text-ink">
                {editingCoordIdx !== null ? 'Edit State Coordinator' : 'Add New State Coordinator'}
              </h2>
              <button
                onClick={() => setCoordModalOpen(false)}
                className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-sand"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCoordinator} className="space-y-4">
              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={coordForm.name}
                  onChange={(e) => setCoordForm({ ...coordForm, name: e.target.value })}
                  placeholder="e.g. Ibrahim Nzoyu Vivian"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-forest"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">
                    Official Role
                  </label>
                  <input
                    type="text"
                    required
                    value={coordForm.role}
                    onChange={(e) => setCoordForm({ ...coordForm, role: e.target.value })}
                    placeholder="e.g. FCT Coordinator"
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">
                    State Badge
                  </label>
                  <input
                    type="text"
                    required
                    value={coordForm.badge}
                    onChange={(e) => setCoordForm({ ...coordForm, badge: e.target.value })}
                    placeholder="e.g. FCT Abuja"
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-forest"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">
                    Image File Path
                  </label>
                  <input
                    type="text"
                    value={coordForm.image}
                    onChange={(e) => setCoordForm({ ...coordForm, image: e.target.value })}
                    placeholder="/images/FCT coordinator IBRAHIM NZOYU VIVIAN.jpeg"
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-forest font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">
                    Initials
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    value={coordForm.initials}
                    onChange={(e) => setCoordForm({ ...coordForm, initials: e.target.value.toUpperCase() })}
                    placeholder="IV"
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-forest uppercase text-center font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Field Responsibilities &amp; Impact Description
                </label>
                <textarea
                  rows="3"
                  required
                  value={coordForm.description}
                  onChange={(e) => setCoordForm({ ...coordForm, description: e.target.value })}
                  placeholder="Directs community outreach, educational support programs, and healthcare mission delivery..."
                  className="w-full p-3 rounded-xl border border-[#e7e2d8] bg-sand/30 text-xs text-ink focus:outline-none focus:border-forest leading-relaxed"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-[#e7e2d8] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setCoordModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-[#e7e2d8] text-xs font-heading font-semibold text-ink-light hover:bg-sand cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-forest hover:bg-forest/90 text-white text-xs font-heading font-semibold cursor-pointer shadow-xs transition-colors"
                >
                  Save Coordinator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: EDIT EXECUTIVE LEADER
      ===================================================================== */}
      {leaderModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#e7e2d8]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e7e2d8]">
              <h2 className="text-lg font-heading font-bold text-ink">Edit Executive Leader</h2>
              <button
                onClick={() => setLeaderModalOpen(false)}
                className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-sand"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLeader} className="space-y-4">
              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={leaderForm.name}
                  onChange={(e) => setLeaderForm({ ...leaderForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-forest"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">Role</label>
                  <input
                    type="text"
                    required
                    value={leaderForm.role}
                    onChange={(e) => setLeaderForm({ ...leaderForm, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">Badge</label>
                  <input
                    type="text"
                    required
                    value={leaderForm.badge}
                    onChange={(e) => setLeaderForm({ ...leaderForm, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-forest"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Photo Path (Optional)
                </label>
                <input
                  type="text"
                  value={leaderForm.image || ''}
                  onChange={(e) => setLeaderForm({ ...leaderForm, image: e.target.value })}
                  placeholder="/images/photo.jpeg"
                  className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-forest font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Biography / Governance Summary
                </label>
                <textarea
                  rows="3"
                  required
                  value={leaderForm.description}
                  onChange={(e) => setLeaderForm({ ...leaderForm, description: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#e7e2d8] bg-sand/30 text-xs text-ink focus:outline-none focus:border-forest leading-relaxed"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-[#e7e2d8] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setLeaderModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-[#e7e2d8] text-xs font-heading font-semibold text-ink-light hover:bg-sand cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-forest hover:bg-forest/90 text-white text-xs font-heading font-semibold cursor-pointer shadow-xs transition-colors"
                >
                  Save Leader
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
