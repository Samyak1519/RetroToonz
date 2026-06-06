import { useEffect, useMemo, useRef, useState } from "react";

import { PlayIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function VideoPlayerEpisodes({
  seasons,
  onSelectEpisode,
  posterDesktop,
  defaultPoster = "/media/posters-desktop/default-poster.jpg",
  currentShow,
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

  // 🔥 NEW
  const [showAll, setShowAll] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 640);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const season = normalizedSeasons[activeSeason] || { episodes: [] };
  const scrollerRef = useRef(null);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
    setShowAll(false); // reset when season changes
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

  // 🔥 CORE LOGIC
  const visibleCount = isDesktop ? 10 : 6;

  const visibleEpisodes = showAll
    ? season.episodes
    : season.episodes.slice(0, visibleCount);

  return (
    <section className="w-full mb-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-title font-semibold tracking-tight text-yellow-300 mb-2 px-1">
          Episodes
        </h2>

        {normalizedSeasons.length > 1 && (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
            {normalizedSeasons.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveSeason(i)}
                className={`flex-shrink-0 text-label px-4 py-1.5 rounded-full transition ${
                  i === activeSeason
                    ? "bg-white/20 border border-white/20 text-white"
                    : "bg-white/10 backdrop-blur-md text-white/70 hover:bg-white/20"
                }`}
              >
                Season {s.seasonNumber ?? i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* EPISODES GRID */}
      <div className="relative">
        <div
          ref={scrollerRef}
          className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 auto-rows-fr"
        >
          {visibleEpisodes.map((ep) => {
            const num =
              ep.episodeNumber ??
              parseInt(String(ep.id).replace(/\D/g, ""), 10) ??
              0;

            const thumb = getThumb(ep);
            const isActive = activeEpisode === (ep.id || ep.episodeNumber);

            return (
              <div
                key={ep.id ?? num}
                onClick={() => {
                  setActiveEpisode(ep.id || ep.episodeNumber);
                  onSelectEpisode?.(ep.episodeId ?? ep.episodeNumber ?? ep.id);
                }}
                className={`group relative w-full bg-white/5 p-2 rounded-xl border border-white/10 overflow-hidden cursor-pointer transition-all duration-300
                  ${
                    isActive
                      ? "ring-1 ring-cyan-300/60 border-cyan-300/40 scale-[1.02]"
                      : "hover:border-sky-400/60 hover:ring-1 hover:ring-sky-300/60 hover:scale-[1.02]"
                  }
                `}
              >
                {/* IMAGE */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <img
                    src={thumb}
                    alt={ep.title}
                    onError={handleImgError}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* GRADIENT */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* PLAY */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
                    <div className="bg-black/50 backdrop-blur-lg border border-white/10 p-3 rounded-full flex items-center justify-center transition hover:scale-110">
                      <HugeiconsIcon icon={PlayIcon} size={20} />
                    </div>
                  </div>

                  {/* EP BADGE */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/50 backdrop-blur-md border border-white/10 text-white">
                    E{num}
                  </div>
                </div>

                {/* TITLE */}
                <div className="mt-2 px-1">
                  <h4 className="text-body text-white truncate leading-tight">
                    {ep.title || `Episode ${num}`}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🔥 SHOW MORE BUTTON */}
      {season.episodes.length > visibleCount && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="
              px-5 py-2 rounded-full
              bg-white/10 backdrop-blur-md
              border border-white/10
              text-sm text-white/80
              hover:bg-white/20 hover:text-white
              transition-all duration-200
            "
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}

      {/* SCROLLBAR HIDE */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
