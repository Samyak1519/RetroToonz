import { useEffect, useMemo, useRef, useState } from "react";

export default function VideoPlayerEpisodes({
  seasons,
  onSelectEpisode,
  posterDesktop,
  defaultPoster = "/media/posters-desktop/default-poster.jpg",
}) {
  const normalizedSeasons = useMemo(() => {
    if (Array.isArray(seasons) && seasons.length) return seasons;
    return [
      {
        seasonNumber: 1,
        episodes: Array.from({ length: 8 }).map((_, i) => ({
          id: `ep-${i + 1}`,
          episodeNumber: i + 1,
          title: `Episode ${i + 1} Title`,
          description: "Short episode description goes here...",
          thumbnail: null,
        })),
      },
    ];
  }, [seasons]);

  const [activeSeason, setActiveSeason] = useState(0);
  const season = normalizedSeasons[activeSeason] || { episodes: [] };
  const scrollerRef = useRef(null);

  useEffect(() => {
    if (scrollerRef.current)
      scrollerRef.current.scrollTo({ left: 0, behavior: "smooth" });
  }, [activeSeason]);

  const normalizePath = (p) => (p ? (p.startsWith("/") ? p : `/${p}`) : null);
  const getThumb = (ep) =>
    posterDesktop
      ? normalizePath(posterDesktop)
      : ep?.thumbnail
      ? normalizePath(ep.thumbnail)
      : defaultPoster;

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = defaultPoster;
  };

  return (
    <section aria-labelledby="episodes-title" className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h2 id="episodes-title" className="text-xl font-semibold">
          Episodes
        </h2>

        {/* Season Tabs - visible on all sizes and horizontally scrollable on small screens */}
        {normalizedSeasons.length > 1 ? (
          <div className="flex gap-2 items-center overflow-x-auto scrollbar-hide py-1">
            {normalizedSeasons.map((s, i) => (
              <button
                key={s.seasonNumber ?? i}
                type="button"
                onClick={() => setActiveSeason(i)}
                aria-pressed={i === activeSeason}
                className={`flex-shrink-0 text-sm px-3 py-1 rounded-full transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/20 ${
                  i === activeSeason
                    ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                    : "bg-white/5 text-gray-200 hover:bg-white/5"
                }`}
              >
                Season {s.seasonNumber ?? i + 1}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* Mobile horizontal scroller (default) -> grid on md+ */}
      <div className="relative">
        <div
          ref={scrollerRef}
          className="overflow-x-auto scrollbar-hide touch-pan-x"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div
            className="flex gap-3 items-stretch md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
            style={{
              scrollSnapType: "x mandatory",
              paddingBottom: 8,
            }}
          >
            {season.episodes.map((ep) => {
              const num =
                ep.episodeNumber ??
                (ep.id
                  ? parseInt(String(ep.id).replace(/\D/g, ""), 10) || 0
                  : 0);
              const prefix = `E${String(num).padStart(2, "0")}`;
              const thumb = getThumb(ep);

              return (
                <article
                  key={ep.id ?? ep.episodeNumber}
                  onClick={() =>
                    onSelectEpisode?.(ep.episodeId ?? ep.episodeNumber ?? ep.id)
                  }
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      onSelectEpisode?.(
                        ep.episodeId ?? ep.episodeNumber ?? ep.id
                      );
                  }}
                  className="group vt-card flex-shrink-0 rounded-lg overflow-hidden cursor-pointer"
                  style={{
                    flex: "0 0 calc(100% / 2.5)",
                    minWidth: 160,
                    maxWidth: 320,
                    scrollSnapAlign: "start",
                  }}
                >
                  <div className="relative rounded-md overflow-hidden shadow-[0_6px_18px_rgba(0,0,0,0.25)]">
                    {/* Poster area */}
                    <div
                      style={{ paddingTop: "56.25%" }}
                      className="relative bg-zinc-800"
                    >
                      <img
                        src={thumb}
                        alt={ep.title || `Episode ${num}`}
                        onError={handleImgError}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />

                      {/* permanent dark layer over poster */}
                      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

                      {/* top-left episode badge */}
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-xs font-semibold bg-black/60 text-white">
                        {prefix}
                      </div>

                      {/* Play overlay - ALWAYS visible, slightly blurred */}
                      <div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        aria-hidden="true"
                      >
                        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-transform duration-150 group-hover:scale-110">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden
                            className="sm:w-5 sm:h-5"
                          >
                            <path d="M5 3v18l15-9L5 3z" fill="white" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Title area: semi-transparent 10% black (as requested earlier) */}
                    <div className="p-2 py-2.5 bg-black/10">
                      <h3 className="text-xs sm:text-sm pl-0.5 font-medium text-white truncate">
                        {prefix} - {ep.title || `Episode ${num}`}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-gray-300 truncate mt-1 hidden sm:block">
                        {ep.description || ""}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* ensure grid layout on md+ uses normal flow (so flex-basis doesn't apply) */
        @media (min-width: 768px) {
          .vt-card {
            flex: 1 1 auto !important;
            min-width: 0 !important;
            max-width: none !important;
          }
        }
      `}</style>
    </section>
  );
}
