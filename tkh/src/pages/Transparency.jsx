import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ShieldCheck, FileText, Download, CheckCircle2, Award, Heart, TrendingUp } from '../components/Icons';
import CurvedWaveBackground from '../components/CurvedWaveBackground';

export default function Transparency({ onOpenDonate }) {
  const { allocations: dynamicAllocations, documents: dynamicDocuments } = useData();
  const [downloadingDoc, setDownloadingDoc] = useState(null);

  const defaultAllocations = [
    { label: 'Frontline Programs & Field Deliverables', pct: 88.4, color: 'bg-primary', desc: 'Classroom construction, textbook printing, solar installations, pharmaceutical procurement, and student scholarships.' },
    { label: 'Field Monitoring & Third-Party Engineering Audits', pct: 11.6, color: 'bg-forest', desc: 'GPS site mapping, structural integrity checks, clinical cold-chain verification, and outcome tracking.' },
    { label: 'Administrative & Executive Overhead', pct: 0.0, color: 'bg-ink-muted', desc: '100% covered privately by Trustee Endowment. Zero kobo is deducted from public donor contributions.' }
  ];

  const defaultDocuments = [
    { title: '2025 Audited Financial Statement (PDF)', size: '2.4 MB', date: 'Published June 2026', auditor: 'Bakare & Co. Chartered Accountants' },
    { title: '2024 Audited Financial Statement (PDF)', size: '2.1 MB', date: 'Published June 2025', auditor: 'Bakare & Co. Chartered Accountants' },
    { title: 'CAC Certificate of Incorporation (IT/NO: 148920)', size: '1.2 MB', date: 'Incorporated Nigeria', auditor: 'Corporate Affairs Commission' },
    { title: 'SCUML Anti-Money Laundering Compliance Certificate', size: '950 KB', date: 'Certified', auditor: 'Special Control Unit Against Money Laundering (EFCC)' },
    { title: 'Ten Kind Hands Child Protection & Safeguarding Policy', size: '1.8 MB', date: 'Revised 2026', auditor: 'Ethics & Legal Review Committee' }
  ];

  const activeAllocations = dynamicAllocations && dynamicAllocations.length > 0 ? dynamicAllocations : defaultAllocations;
  const activeDocuments = dynamicDocuments && dynamicDocuments.length > 0 ? dynamicDocuments : defaultDocuments;

  const handleDownload = (docTitle) => {
    setDownloadingDoc(docTitle);
    setTimeout(() => {
      setDownloadingDoc(null);
      alert(`Downloaded document: ${docTitle}`);
    }, 1000);
  };

  return (
    <div className="pt-24 md:pt-28 animate-fade-in bg-white pb-20">
      {/* Header with Ambient Wave */}
      <section className="relative py-12 md:py-16 px-4 md:px-8 max-w-5xl mx-auto text-center overflow-hidden">
        <CurvedWaveBackground side="right" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand text-primary font-bold text-xs uppercase tracking-widest mb-4 border border-[#e7e2d8] font-heading">
            <ShieldCheck className="w-4 h-4" />
            <span>Radical Accountability</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-ink max-w-3xl mx-auto mb-6 tracking-tight">
            Open Books. Pure Trust. <br />
            <span className="text-primary">100% Direct Giving.</span>
          </h1>

          <p className="text-base sm:text-lg text-ink-light max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            We operate on a zero-overhead public donation model: 100% of your gift goes to frontline deliverables. Trustee endowments privately fund all admin and operational costs.
          </p>
        </div>
      </section>

      {/* Financial Breakdown Section with Mirrored Wave */}
      <section className="relative py-12 px-4 md:px-8 max-w-5xl mx-auto overflow-hidden">
        <CurvedWaveBackground side="left" />

        <div className="relative z-10 bg-white/95 backdrop-blur-xs p-8 sm:p-12 rounded-3xl border border-[#e7e2d8] shadow-xs mb-12">
          <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
            Fund Allocation Breakdown
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-ink mb-6">
            Where Every Naira &amp; Dollar Goes
          </h2>

          <div className="w-full h-4 rounded-full bg-[#ded8cc] flex overflow-hidden mb-6">
            {activeAllocations.map((a, i) => (
              <div
                key={a.id || i}
                className={`${a.color} h-full transition-all duration-300`}
                style={{ width: `${Math.min(100, Math.max(0, a.pct))}%` }}
                title={`${a.pct}% ${a.label}`}
              />
            ))}
          </div>

          <div className="space-y-4 mb-8">
            {activeAllocations.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-sand/90 border border-[#e7e2d8] flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div className="flex items-start gap-3">
                  <span className={`w-3.5 h-3.5 rounded-full ${item.color} mt-1 shrink-0`} />
                  <div>
                    <h4 className="text-sm font-heading font-bold text-ink">{item.label}</h4>
                    <p className="text-xs text-ink-light mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                <span className="font-mono text-xl font-bold text-ink shrink-0 pl-6 sm:pl-0">
                  {item.pct.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 leading-relaxed flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>
              <strong>The 100% Promise:</strong> Public donations are never routed to salaries, office leases, or fundraising agencies.
            </span>
          </div>
        </div>

        {/* Public Audit Repository */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#e7e2d8] shadow-xs">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-widest text-primary font-bold block mb-1 font-heading">
              Official Document Repository
            </span>
            <h3 className="text-2xl font-heading font-bold text-ink">
              Certificates, Charters &amp; Audit Downloads
            </h3>
          </div>

          <div className="space-y-4">
            {activeDocuments.map((doc, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-sand/90 hover:bg-sand transition-colors border border-[#e7e2d8] flex flex-col sm:flex-row justify-between sm:items-center gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#e7e2d8] flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-heading font-bold text-ink">{doc.title}</h4>
                    <p className="text-xs text-ink-muted">{doc.auditor} • {doc.date} ({doc.size})</p>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(doc.title)}
                  className="btn-secondary text-xs px-5 py-2 flex items-center gap-2 cursor-pointer self-start sm:self-auto font-heading font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloadingDoc === doc.title ? 'Downloading...' : 'Download File'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-16">
          <button
            onClick={onOpenDonate}
            className="btn-primary text-sm px-8 py-3.5 inline-flex items-center gap-2 cursor-pointer shadow-md font-heading font-semibold"
          >
            <span>Back Our Direct Giving Mission</span>
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
