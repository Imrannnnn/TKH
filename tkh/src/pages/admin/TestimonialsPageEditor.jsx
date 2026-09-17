import { useState } from 'react';
import {
  Quote,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Eye,
  X,
  Filter
} from '../../components/Icons';

export default function TestimonialsPageEditor({
  testimonialsList,
  addTestimonial,
  updateTestimonials,
  deleteTestimonial,
  setCurrentPage,
  showToast
}) {
  const [activeCategory, setActiveCategory] = useState('all');

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    category: 'beneficiaries',
    quote: '',
    author: '',
    role: '',
    institution: '',
    avatar: '/images/IMG_0300.JPG'
  });

  const categories = [
    { id: 'all', label: 'All Voices', desc: 'All community & partner testimonials' },
    { id: 'beneficiaries', label: 'Beneficiaries', desc: 'Pupils, headmistresses & mothers' },
    { id: 'volunteers', label: 'Volunteers', desc: 'Doctors, nurses & teachers' },
    { id: 'donors', label: 'Donors & Sustainers', desc: 'Individual monthly givers' },
    { id: 'partners', label: 'Partners', desc: 'Foundations & institutions' }
  ];

  const filtered =
    activeCategory === 'all'
      ? testimonialsList
      : testimonialsList.filter((t) => t.category === activeCategory);

  const handleOpenNew = () => {
    setEditingItem(null);
    setFormData({
      category: activeCategory !== 'all' ? activeCategory : 'beneficiaries',
      quote: '',
      author: '',
      role: '',
      institution: '',
      avatar: '/images/IMG_0300.JPG'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      category: item.category || 'beneficiaries',
      quote: item.quote || '',
      author: item.author || '',
      role: item.role || '',
      institution: item.institution || '',
      avatar: item.avatar || '/images/IMG_0300.JPG'
    });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingItem) {
      const updated = testimonialsList.map((t) =>
        t.id === editingItem.id ? { ...t, ...formData } : t
      );
      updateTestimonials(updated);
      showToast(`Updated testimonial from "${formData.author || 'Anonymous'}"`);
    } else {
      addTestimonial(formData);
      showToast(`Added new testimonial from "${formData.author || 'Anonymous'}"`);
    }
    setModalOpen(false);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Delete testimonial from "${item.author || 'Anonymous'}"?`)) {
      deleteTestimonial(item.id);
      showToast('Testimonial removed');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#e7e2d8] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider bg-clay/15 text-clay border border-clay/25">
              Page Editor
            </span>
            <span className="text-xs font-semibold text-ink-muted">• Public Route: /#testimonials</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-ink">
            Testimonials &amp; Voices Manager
          </h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Curate real beneficiary stories, teacher remarks, and volunteer doctor reviews.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleOpenNew}
            className="py-2 px-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Testimonial</span>
          </button>

          <button
            onClick={() => {
              if (setCurrentPage) setCurrentPage('testimonials');
              window.location.hash = 'testimonials';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-3.5 py-2 rounded-xl bg-sand hover:bg-sand-dark text-ink text-xs font-heading font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors border border-[#e7e2d8] shrink-0"
          >
            <Eye className="w-4 h-4 text-primary" />
            <span className="hidden sm:inline">Preview Live</span>
            <ExternalLink className="w-3 h-3 text-ink-muted" />
          </button>
        </div>
      </div>

      {/* Section Navigation Pills (Category Filter) */}
      <div className="bg-white p-2 rounded-2xl border border-[#e7e2d8] shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
          {categories.map((cat) => {
            const count =
              cat.id === 'all'
                ? testimonialsList.length
                : testimonialsList.filter((t) => t.category === cat.id).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`py-2 px-3 rounded-xl text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-clay text-white shadow-xs font-bold'
                    : 'bg-sand/40 hover:bg-sand text-ink hover:text-ink'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="block text-xs font-heading font-bold truncate">
                    {cat.label}
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white text-ink-muted'
                    }`}
                  >
                    {count}
                  </span>
                </div>
                <span
                  className={`text-[10px] block truncate mt-0.5 ${
                    isActive ? 'text-white/80' : 'text-ink-muted'
                  }`}
                >
                  {cat.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-[#e7e2d8] p-8">
            <Quote className="w-8 h-8 text-ink-muted mx-auto mb-2 opacity-40" />
            <p className="text-sm font-heading font-bold text-ink">No testimonials found</p>
            <p className="text-xs text-ink-muted mt-1">
              Add your first quote in the "{activeCategory}" category.
            </p>
            <button
              onClick={handleOpenNew}
              className="mt-4 px-4 py-2 rounded-xl bg-primary text-white text-xs font-heading font-semibold"
            >
              + Add Testimonial
            </button>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-[#e7e2d8] p-6 shadow-xs flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider font-heading bg-sand text-primary border border-[#e7e2d8]">
                    {item.category}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded-lg text-ink-muted hover:text-primary hover:bg-primary/10 cursor-pointer transition-colors"
                      title="Edit Testimonial"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-1.5 rounded-lg text-ink-muted hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                      title="Delete Testimonial"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-ink-light leading-relaxed italic mb-5 line-clamp-4">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#e7e2d8] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-sand shrink-0 border border-[#e7e2d8]">
                  {item.avatar ? (
                    <img
                      src={encodeURI(item.avatar)}
                      alt={item.author}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-xs text-primary bg-primary/10">
                      {item.author?.[0] || 'T'}
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <h4 className="text-xs font-heading font-bold text-ink truncate">
                    {item.author || 'Anonymous'}
                  </h4>
                  <p className="text-[11px] text-primary font-medium truncate">
                    {item.role}
                  </p>
                  <p className="text-[10px] text-ink-muted truncate">
                    {item.institution}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal: Add / Edit Testimonial */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#e7e2d8]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e7e2d8]">
              <h2 className="text-lg font-heading font-bold text-ink">
                {editingItem ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-sand"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                >
                  <option value="beneficiaries">Beneficiaries (Pupils, Mothers, Elders)</option>
                  <option value="volunteers">Volunteers (Doctors, Nurses, Teachers)</option>
                  <option value="donors">Donors (Monthly Sustainers)</option>
                  <option value="partners">Partners (Institutions &amp; Foundations)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold text-ink mb-1">
                  Testimonial Quote
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="Before Ten Kind Hands brought solar power and desks..."
                  className="w-full p-3 rounded-xl border border-[#e7e2d8] bg-sand/30 text-xs text-ink focus:outline-none focus:border-primary leading-relaxed"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Mrs. Amina Danjuma"
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Headmistress"
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">
                    Institution / Community
                  </label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="Gidan Community School, Kaduna"
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold text-ink mb-1">
                    Photo Avatar Path
                  </label>
                  <input
                    type="text"
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    placeholder="/images/IMG_0300.JPG"
                    className="w-full px-3 py-2 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-primary font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#e7e2d8] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-[#e7e2d8] text-xs font-heading font-semibold text-ink-light hover:bg-sand cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-heading font-semibold cursor-pointer shadow-xs transition-colors"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
