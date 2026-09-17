import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Search,
  Trash2,
  CheckCircle2,
  Save,
  Eye,
  ExternalLink
} from '../../components/Icons';

export default function ContactPageEditor({
  inquiries,
  updateInquiryStatus,
  deleteInquiry,
  contactInfo,
  updateContactInfo,
  setCurrentPage,
  showToast
}) {
  const [activeSection, setActiveSection] = useState('inquiries');

  // Search & Filter
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Secretariat Info State
  const [headquarters, setHeadquarters] = useState(
    contactInfo?.headquarters || 'Plot 402, Constitution Avenue, Central Business District, Abuja, FCT, Nigeria'
  );
  const [phone, setPhone] = useState(contactInfo?.phone || '+234 818 099 4301 / +234 803 000 1234');
  const [email, setEmail] = useState(contactInfo?.email || 'info@tenkindhands.org');
  const [partnershipsEmail, setPartnershipsEmail] = useState(
    contactInfo?.partnershipsEmail || 'partnerships@tenkindhands.org'
  );
  const [visitingHours, setVisitingHours] = useState(
    contactInfo?.visitingHours || 'Monday – Friday: 8:30 AM – 5:00 PM (WAT)'
  );

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      (inq.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (inq.email || '').toLowerCase().includes(search.toLowerCase()) ||
      (inq.message || '').toLowerCase().includes(search.toLowerCase()) ||
      (inq.category || '').toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'All'
        ? true
        : statusFilter === 'Unread'
        ? inq.status === 'Unread' || inq.status === 'New' || !inq.status
        : inq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleSaveContactInfo = (e) => {
    e?.preventDefault();
    updateContactInfo({
      headquarters,
      phone,
      email,
      partnershipsEmail,
      visitingHours
    });
    showToast('Secretariat contact details updated');
  };

  const sections = [
    {
      id: 'inquiries',
      label: 'Inbound Public Inquiries',
      desc: `${inquiries.length} received citizen & volunteer messages`
    },
    {
      id: 'secretariat',
      label: 'Secretariat Contact Info',
      desc: 'Abuja HQ address, official hotlines & emails'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#e7e2d8] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider bg-emerald-800/10 text-emerald-800 border border-emerald-800/20">
              Page Editor
            </span>
            <span className="text-xs font-semibold text-ink-muted">• Public Route: /#contact</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-ink">
            Contact &amp; Inquiries Manager
          </h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Process incoming public messages and manage official contact channels.
          </p>
        </div>

        <button
          onClick={() => {
            if (setCurrentPage) setCurrentPage('contact');
            window.location.hash = 'contact';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-3.5 py-2 rounded-xl bg-sand hover:bg-sand-dark text-ink text-xs font-heading font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors border border-[#e7e2d8] shrink-0"
        >
          <Eye className="w-4 h-4 text-emerald-800" />
          <span>Preview Live Contact</span>
          <ExternalLink className="w-3 h-3 text-ink-muted" />
        </button>
      </div>

      {/* Section Navigation Pills */}
      <div className="bg-white p-2 rounded-2xl border border-[#e7e2d8] shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`py-2.5 px-3 rounded-xl text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs font-bold'
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
          SECTION 1: INBOUND INQUIRIES DESK
      ===================================================================== */}
      {activeSection === 'inquiries' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#e7e2d8] shadow-xs">
            <div>
              <h2 className="text-lg font-heading font-bold text-ink">
                Inbound Citizen Messages &amp; Leads
              </h2>
              <p className="text-xs text-ink-muted">
                Messages submitted via the contact form and volunteer portals.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-ink-muted absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-3 py-1.5 rounded-xl border border-[#e7e2d8] bg-sand/40 text-ink text-xs focus:outline-none focus:border-primary w-44 sm:w-56"
                />
              </div>

              <div className="flex items-center bg-sand p-1 rounded-xl text-xs border border-[#e7e2d8]">
                {['All', 'Unread', 'Reviewed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg font-heading font-semibold cursor-pointer transition-colors ${
                      statusFilter === st
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
                        No inquiries found matching your filter.
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

      {/* =====================================================================
          SECTION 2: SECRETARIAT CONTACT DETAILS
      ===================================================================== */}
      {activeSection === 'secretariat' && (
        <div className="bg-white rounded-2xl border border-[#e7e2d8] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#e7e2d8]">
            <div>
              <h2 className="text-base font-heading font-bold text-ink">
                National Secretariat Contact Channels
              </h2>
              <p className="text-xs text-ink-muted">
                Official addresses and desks displayed on the contact page.
              </p>
            </div>
            <button
              onClick={handleSaveContactInfo}
              className="py-2 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Contact Info</span>
            </button>
          </div>

          <form onSubmit={handleSaveContactInfo} className="space-y-4">
            <div>
              <label className="block text-xs font-heading font-bold text-ink mb-1.5">
                Headquarters Address (Abuja Liaison Office)
              </label>
              <input
                type="text"
                value={headquarters}
                onChange={(e) => setHeadquarters(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-emerald-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-heading font-bold text-ink mb-1.5">
                  General Inquiry Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-emerald-800 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold text-ink mb-1.5">
                  Partnerships Email
                </label>
                <input
                  type="email"
                  value={partnershipsEmail}
                  onChange={(e) => setPartnershipsEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-emerald-800 font-mono text-[11px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-heading font-bold text-ink mb-1.5">
                  Phone Numbers / Hotlines
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-emerald-800 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold text-ink mb-1.5">
                  Desk Visiting Hours
                </label>
                <input
                  type="text"
                  value={visitingHours}
                  onChange={(e) => setVisitingHours(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e7e2d8] bg-sand/30 text-ink text-xs focus:outline-none focus:border-emerald-800"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#e7e2d8] flex justify-end">
              <button
                type="submit"
                className="py-2.5 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-heading font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
