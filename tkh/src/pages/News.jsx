import { useState, useEffect } from 'react';
import { youtubeChannel, youtubePlaylists } from '../data/youtubeData';
import { Play, Youtube, ExternalLink, X, Search, Heart, ArrowRight } from '../components/Icons';
import CurvedWaveBackground from '../components/CurvedWaveBackground';

export default function News({ onOpenDonate }) {
  const [activePlaylistId, setActivePlaylistId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVideo, setModalVideo] = useState(null);
  const [spotlightVideo, setSpotlightVideo] = useState(
    youtubePlaylists[1]?.videos[0] || youtubePlaylists[0]?.videos[0]
  ); // Defaults to "We are Ten kind hands"

  // Handle escape key to close video modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setModalVideo(null);
      }
    };
    if (modalVideo) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalVideo]);

  // Calculate total video count
  const totalVideosCount = youtubePlaylists.reduce(
    (acc, pl) => acc + pl.videos.length,
    0
  );

  // Filter playlists based on active pill
  const displayedPlaylists = youtubePlaylists
    .filter((pl) => (activePlaylistId === 'all' ? true : pl.id === activePlaylistId))
    .map((pl) => {
      if (!searchQuery.trim()) return pl;
      const q = searchQuery.toLowerCase();
      return {
        ...pl,
        videos: pl.videos.filter(
          (v) =>
            v.title.toLowerCase().includes(q) ||
            pl.title.toLowerCase().includes(q)
        ),
      };
    })
    .filter((pl) => pl.videos.length > 0);

  const handlePlayVideo = (video, playlistTitle) => {
    setModalVideo({ ...video, playlistTitle });
  };

  return (
    <div className="pt-24 md:pt-28 animate-fade-in bg-white pb-20">
      {/* Header with Ambient Wave */}
      <section className="relative py-12 md:py-16 px-4 md:px-8 max-w-6xl mx-auto text-center overflow-hidden">
        <CurvedWaveBackground side="right" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f9ecee] text-[#801426] text-xs font-bold font-heading mb-3 border border-[#801426]/20">
            <Youtube className="w-3.5 h-3.5 text-[#cc0000]" />
            <span>OFFICIAL YOUTUBE FIELD DISPATCHES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-ink max-w-4xl mx-auto mb-5 tracking-tight">
            Outreach Videos from <br />
            <span className="text-primary">the Frontlines of Nigeria.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-ink-light max-w-2xl mx-auto mb-7 leading-relaxed font-normal">
            Watch unfiltered live chronicles from our missions across rural schools, markets, and healthcare settlements. Organized directly by community outreach playlists.
          </p>

          {/* Channel Subscribe / Follow Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={youtubeChannel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#cc0000] hover:bg-[#aa0000] text-white text-xs font-heading font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Youtube className="w-4 h-4 fill-white" />
              <span>Subscribe to @TenkindhandsFoundation</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {onOpenDonate && (
              <button
                onClick={onOpenDonate}
                className="btn-primary text-xs px-5 py-2.5 inline-flex items-center gap-1.5 cursor-pointer font-heading font-semibold shadow-xs"
              >
                <span>Support an Outreach</span>
                <Heart className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Featured Spotlight Theater Screen */}
      {spotlightVideo && (
        <section className="relative px-4 md:px-8 max-w-5xl mx-auto mb-16">
          <div className="bg-[#142722] text-white rounded-3xl p-4 sm:p-7 md:p-8 shadow-2xl border border-[#1f3b34]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[11px] font-heading font-bold text-emerald-300 uppercase tracking-widest">
                  Featured Mission Spotlight
                </span>
              </div>
              <a
                href={spotlightVideo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/70 hover:text-white flex items-center gap-1 font-medium transition-colors"
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded Responsive YouTube Player */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${spotlightVideo.id}?rel=0`}
                title={spotlightVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>

            <div className="mt-4 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-heading font-bold text-white">
                  {spotlightVideo.title}
                </h3>
                <p className="text-xs text-white/60 mt-0.5">
                  Direct Field Video • Ten Kind Hands Foundation
                </p>
              </div>
              <a
                href={spotlightVideo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors shrink-0"
              >
                <Youtube className="w-3.5 h-3.5 text-[#ff4e45]" />
                <span>Open in YouTube App</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Playlist Filter Pills & Search */}
      <section className="relative px-4 md:px-8 max-w-6xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-[#e7e2d8]">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2">
            <button
              onClick={() => setActivePlaylistId('all')}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-heading font-semibold transition-all cursor-pointer ${
                activePlaylistId === 'all'
                  ? 'bg-ink text-white shadow-xs'
                  : 'bg-sand text-ink-light hover:text-ink border border-[#e7e2d8]'
              }`}
            >
              All Playlists ({totalVideosCount})
            </button>

            {youtubePlaylists.map((pl) => {
              const isActive = activePlaylistId === pl.id;
              return (
                <button
                  key={pl.id}
                  onClick={() => setActivePlaylistId(pl.id)}
                  className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-heading font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-sand text-ink-light hover:text-ink border border-[#e7e2d8]'
                  }`}
                >
                  <span>{pl.title}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white text-ink-muted'
                    }`}
                  >
                    {pl.videos.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="w-full md:w-64 relative">
            <Search className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search outreach videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-sand border border-[#e7e2d8] text-xs focus:outline-none focus:border-primary text-ink placeholder:text-ink-muted"
            />
          </div>
        </div>
      </section>

      {/* Categorized Video Playlists Sections */}
      <section className="relative px-4 md:px-8 max-w-6xl mx-auto space-y-16">
        {displayedPlaylists.length === 0 ? (
          <div className="text-center py-16 bg-sand/60 rounded-3xl border border-[#e7e2d8]">
            <p className="text-sm text-ink-light">No videos matched your search query.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActivePlaylistId('all');
              }}
              className="mt-3 text-xs font-bold text-primary hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          displayedPlaylists.map((pl) => (
            <div key={pl.id} id={pl.id} className="scroll-mt-32">
              {/* Category Playlist Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-4 border-b border-[#e7e2d8]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-heading font-bold text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-0.5 rounded-full">
                      {pl.badge}
                    </span>
                    <span className="text-xs text-ink-muted font-mono font-medium">
                      {pl.videos.length} Videos
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-ink">
                    {pl.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-ink-light max-w-2xl mt-1 leading-relaxed">
                    {pl.description}
                  </p>
                </div>

                <a
                  href={pl.playlistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-[#cc0000] hover:text-[#990000] shrink-0 group transition-colors py-1"
                >
                  <Youtube className="w-4 h-4 fill-current" />
                  <span>Open Full Playlist</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>

              {/* Videos Grid for this Playlist */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pl.videos.map((vid) => (
                  <div
                    key={vid.id}
                    className="paper-card rounded-2xl overflow-hidden bg-white border border-[#e7e2d8] shadow-xs hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Video Thumbnail with Hover Play Button */}
                      <div
                        onClick={() => handlePlayVideo(vid, pl.title)}
                        className="relative aspect-video w-full bg-sand cursor-pointer overflow-hidden"
                      >
                        <img
                          src={vid.thumbnail}
                          alt={vid.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/45 transition-colors flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-[#cc0000] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 ml-0.5 fill-white" />
                          </div>
                        </div>

                        {/* YouTube Badge in Corner */}
                        <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                          <Youtube className="w-3 h-3 text-[#ff4e45]" />
                          <span>HD</span>
                        </div>
                      </div>

                      {/* Video Metadata */}
                      <div className="p-4 sm:p-5">
                        <span className="text-[10px] font-heading font-bold text-ink-muted uppercase tracking-wider block mb-1.5">
                          {pl.title}
                        </span>
                        <h4
                          onClick={() => handlePlayVideo(vid, pl.title)}
                          className="text-sm font-heading font-bold text-ink group-hover:text-primary transition-colors line-clamp-2 leading-snug cursor-pointer"
                          title={vid.title}
                        >
                          {vid.title}
                        </h4>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="px-4 sm:px-5 pb-4 pt-1 flex items-center justify-between border-t border-[#f4f0ea]">
                      <button
                        onClick={() => setSpotlightVideo(vid)}
                        className="text-[11px] font-heading font-bold text-ink hover:text-primary flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>Set in Theater</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <a
                        href={vid.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-ink-muted hover:text-[#cc0000] flex items-center gap-1 transition-colors"
                        title="Open on YouTube in new tab"
                      >
                        <span>YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {/* Floating Video Player Modal (Lightbox) */}
      {modalVideo && (
        <div
          onClick={() => setModalVideo(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-[#142722] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10 my-4"
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
              <div className="flex items-center gap-2 pr-6">
                <Youtube className="w-4 h-4 text-[#ff4e45]" />
                <span className="text-xs font-heading font-bold text-white/90 truncate">
                  {modalVideo.playlistTitle || 'Outreach Video'}
                </span>
              </div>
              <button
                onClick={() => setModalVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close video player"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Embedded YouTube Iframe */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${modalVideo.id}?autoplay=1&rel=0`}
                title={modalVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>

            {/* Modal Bottom Metadata */}
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#0d1a17]">
              <div>
                <h3 className="text-sm sm:text-base font-heading font-bold text-white leading-snug">
                  {modalVideo.title}
                </h3>
                <span className="text-xs text-white/60 block mt-0.5">
                  Ten Kind Hands Foundation • Official Field Outreach
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={modalVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#cc0000] hover:bg-[#aa0000] text-white text-xs font-heading font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Youtube className="w-3.5 h-3.5 fill-white" />
                  <span>Open on YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
