import { ArrowLeft, Globe, ShieldCheck } from '../components/Icons';
import CurvedWaveBackground from '../components/CurvedWaveBackground';

export default function NotFound({ setCurrentPage }) {
  const handleGoHome = (e) => {
    if (e) e.preventDefault();
    if (setCurrentPage) setCurrentPage('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-28 md:pt-36 pb-24 px-4 min-h-[75vh] flex items-center justify-center bg-sand relative overflow-hidden animate-fade-in">
      <CurvedWaveBackground side="right" />

      <div className="max-w-xl mx-auto text-center relative z-10 bg-white/95 backdrop-blur-xs p-8 sm:p-12 rounded-3xl border border-[#e7e2d8] shadow-sm">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-primary/20">
          <Globe className="w-3.5 h-3.5" />
          <span>Error 404 • Page Not Found</span>
        </span>

        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-ink mb-3 tracking-tight">
          Lost your way on the field?
        </h1>

        <p className="text-xs sm:text-sm text-ink-light leading-relaxed max-w-md mx-auto mb-8">
          The link or page address you entered does not exist or has been moved. Explore our core initiatives below or return to the main dashboard.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#"
            onClick={handleGoHome}
            className="btn-primary w-full sm:w-auto text-xs px-6 py-3 flex items-center justify-center gap-2 font-heading font-semibold shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </a>

          <a
            href="#transparency"
            onClick={(e) => {
              if (setCurrentPage) setCurrentPage('transparency');
            }}
            className="btn-secondary w-full sm:w-auto text-xs px-6 py-3 flex items-center justify-center gap-2 font-heading font-semibold shadow-xs cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Financial Transparency</span>
          </a>
        </div>
      </div>
    </div>
  );
}
