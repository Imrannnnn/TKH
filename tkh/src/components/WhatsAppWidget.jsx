import React, { useState } from 'react';
import { MessageSquare, X, ArrowRight, ShieldCheck, Clock } from './Icons';

export default function WhatsAppWidget({ currentPage, selectedProgram }) {
  const [isOpen, setIsOpen] = useState(false);

  const getStarterMessage = () => {
    if (currentPage === 'programs') {
      return selectedProgram
        ? `Hi Ten Kind Hands, I would like to inquire about the ${selectedProgram} program.`
        : `Hi Ten Kind Hands, I would like to inquire about your community programs.`;
    }
    if (currentPage === 'get-involved') {
      return `Hi Ten Kind Hands, I would like to learn more about volunteering / partnering with your mission.`;
    }
    if (currentPage === 'impact') {
      return `Hi Ten Kind Hands, I am reviewing your impact report and would like to connect.`;
    }
    return `Hello Ten Kind Hands, I am reaching out from your website regarding your education and healthcare work.`;
  };

  const handleOpenWhatsApp = () => {
    const phone = "2348000000000"; // Official TKH WhatsApp line
    const text = encodeURIComponent(getStarterMessage());
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-3xl shadow-xl border border-[#ebdcd9] p-5 animate-fade-in text-left">
          <div className="flex items-center justify-between pb-3 border-b border-[#ebdcd9] mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                <MessageSquare className="w-4 h-4 text-emerald-700" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#2a1f1f]">TKH Direct Desk</h4>
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Verified WhatsApp Channel
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-[#635453] hover:text-[#2a1f1f] rounded-full hover:bg-black/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#635453] mb-3 leading-relaxed">
            Need fast assistance, scholarship inquiry, or to confirm project locations? Chat directly with our field coordination desk.
          </p>

          <div className="p-2.5 rounded-xl bg-[#fbf8f7] border border-[#ebdcd9] mb-3 text-[11px] text-[#635453] flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
            <span>Response window: Mon–Sat, 8:00 AM – 6:00 PM WAT</span>
          </div>

          <button
            onClick={handleOpenWhatsApp}
            className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-label-caps text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
          >
            <span>Start WhatsApp Chat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open WhatsApp direct chat"
        className="px-4 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-xs font-bold active:scale-95 cursor-pointer border border-emerald-600"
      >
        <MessageSquare className="w-4 h-4" />
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </button>
    </div>
  );
}
