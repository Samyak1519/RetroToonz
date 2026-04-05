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
  const [activeEpisode, setActiveEpisode] = useState(null);

  const season = normalizedSeasons[activeSeason] || { episodes: [] };
  const scrollerRef = useRef(null);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
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
    <section className="w-full mb-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-white">Episodes</h2>

        {normalizedSeasons.length > 1 && (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
            {normalizedSeasons.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveSeason(i)}
                className={`flex-shrink-0 text-sm px-4 py-1.5 rounded-full transition ${
                  i === activeSeason
                    ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                    : "bg-white/10 backdrop-blur-md text-gray-200 hover:bg-white/20"
                }`}
              >
                Season {s.seasonNumber ?? i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* EPISODES */}
      <div className="relative">
        <div
          ref={scrollerRef}
          className="overflow-x-auto scrollbar-hide px-3 md:px-0"
        >
          <div
            className="flex gap-3 md:grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {season.episodes.map((ep) => {
              const parsedId = parseInt(String(ep.id).replace(/\D/g, ""), 10);

              const num =
                ep.episodeNumber !== null && ep.episodeNumber !== undefined
                  ? ep.episodeNumber
                  : parsedId || 0;

              const prefix = `E${String(num).padStart(2, "0")}`;
              const thumb = getThumb(ep);

              const isActive = activeEpisode === (ep.id || ep.episodeNumber);

              return (
                <article
                  key={ep.id ?? num}
                  onClick={() => {
                    setActiveEpisode(ep.id || ep.episodeNumber);
                    onSelectEpisode?.(
                      ep.episodeId ?? ep.episodeNumber ?? ep.id,
                    );
                  }}
                  className={`group relative flex-shrink-0 cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                    isActive
                      ? "ring-2 ring-pink-500 scale-[1.04]"
                      : "hover:scale-[1.03]"
                  }`}
                  style={{
                    flex: "0 0 60%",
                    minWidth: 160,
                    maxWidth: 320,
                    scrollSnapAlign: "start",
                  }}
                >
                  {/* IMAGE */}
                  <div className="relative">
                    <div
                      style={{ paddingTop: "62%" }}
                      className="relative bg-zinc-800"
                    >
                      <img
                        src={thumb}
                        alt={ep.title}
                        onError={handleImgError}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />

                      {/* DARK OVERLAY */}
                      <div className="absolute inset-0 bg-black/30" />

                      {/* GRADIENT */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition" />

                      {/* EP NUMBER */}
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-500 text-white">
                        {prefix}
                      </div>

                      {/* PLAY BUTTON */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-125">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path d="M5 3v18l15-9L5 3z" fill="white" />
                          </svg>
                        </div>
                      </div>

                      {/* TITLE OVERLAY */}
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="text-xs sm:text-sm text-white/80 line-clamp-2">
                          {prefix} - {ep.title || `Episode ${num}`}
                        </h3>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* SCROLLBAR HIDE */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @media (min-width: 768px) {
          article {
            flex: 1 1 auto !important;
            min-width: 0 !important;
            max-width: none !important;
          }
        }
      `}</style>
    </section>
  );
}
