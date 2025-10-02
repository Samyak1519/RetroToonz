import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VideoPlayerEpisodes({
    seasons,
    currentShowId,
    onSelectEpisode, // 👈 passed down from VideoPlayerPage
    posterDesktop,
    defaultPoster = "/media/posters-desktop/default-poster.jpg",
}) {
    const normalizedSeasons = useMemo(() => {
        if (Array.isArray(seasons) && seasons.length > 0) return seasons;
        return [
            {
                seasonNumber: 1,
                episodes: Array.from({ length: 10 }).map((_, i) => ({
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
    const season = normalizedSeasons[activeSeason];
    const scrollerRef = useRef(null);

    useEffect(() => {
        if (scrollerRef.current) {
            scrollerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
    }, [activeSeason]);

    const scrollByCards = (count) => {
        if (!scrollerRef.current) return;
        const cardWidth = scrollerRef.current.firstChild?.firstChild?.offsetWidth || 240;
        scrollerRef.current.scrollBy({ left: cardWidth * count, behavior: "smooth" });
    };

    const normalizePath = (p) => {
        if (!p) return null;
        return p.startsWith("/") ? p : `/${p}`;
    };

    const getThumb = (ep) => {
        if (posterDesktop) return normalizePath(posterDesktop);
        if (ep?.thumbnail) return normalizePath(ep.thumbnail);
        return defaultPoster;
    };

    const handleImgError = (e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = defaultPoster;
    };

    return (
        <section>
            <h2 className="text-xl font-semibold mb-4">Episodes</h2>

            {/* Season Tabs */}
            <div className="flex gap-2 mb-4 flex-wrap">
                {normalizedSeasons.map((s, i) => (
                    <button
                        key={s.seasonNumber ?? i}
                        onClick={() => setActiveSeason(i)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-shadow focus:outline-none ${i === activeSeason ? "bg-white/10 ring-1 ring-white/20" : "bg-transparent hover:bg-white/5"
                            }`}
                        aria-pressed={i === activeSeason}
                    >
                        Season {s.seasonNumber ?? i + 1}
                    </button>
                ))}
            </div>

            {/* Horizontal scroller with arrows */}
            <div className="relative">
                <button
                    onClick={() => scrollByCards(-1)}
                    className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 p-2 rounded-full"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                <div ref={scrollerRef} className="overflow-x-auto scrollbar-hide scroll-smooth" style={{ WebkitOverflowScrolling: "touch" }}>
                    <div className="flex gap-4 items-stretch px-1" style={{ scrollSnapType: "x mandatory", paddingBottom: 8 }}>
                        {season.episodes.map((ep) => {
                            const epNum =
                                ep.episodeNumber ??
                                (ep.id ? parseInt(String(ep.id).replace(/\D/g, ""), 10) || 0 : 0);
                            const epPrefix = `E${String(epNum).padStart(2, "0")}`;
                            const thumb = getThumb(ep);

                            return (
                                <div
                                    key={ep.id ?? ep.episodeNumber}
                                    onClick={() => onSelectEpisode(ep.episodeId ?? ep.episodeNumber ?? ep.id)} // 👈 trigger video switch
                                    className="cursor-pointer block rounded-lg overflow-hidden transition transform hover:scale-105 shadow-lg hover:shadow-2xl flex-shrink-0"
                                    style={{
                                        flex: "0 0 calc(100% / 2.5)",
                                        scrollSnapAlign: "start",
                                    }}
                                >
                                    <div className="bg-gradient-to-b from-[#0f1720]/60 to-[#0b1015]/40 rounded-lg overflow-hidden">
                                        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                                            <img
                                                src={thumb}
                                                alt={ep.title || `Episode ${epNum}`}
                                                onError={handleImgError}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />

                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-lg font-extrabold">
                                                {epPrefix}
                                            </div>

                                            <div className="absolute top-3 left-3 bg-black/40 p-2 rounded-full">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                                                    <path d="M5 3v18l15-9L5 3z" fill="white" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="p-3">
                                            <h3 className="text-sm sm:text-base font-semibold text-white truncate">
                                                {epPrefix} - {ep.title || `Episode ${epNum}`}
                                            </h3>
                                            <p className="text-xs text-gray-300 truncate mt-1">{ep.description || ""}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <button
                    onClick={() => scrollByCards(1)}
                    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 p-2 rounded-full"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-5 h-5 text-white" />
                </button>
            </div>

            <style jsx>{`
        @media (min-width: 640px) {
          div[style] {
            flex: 0 0 calc(100% / 4) !important;
          }
        }
        @media (min-width: 1024px) {
          div[style] {
            flex: 0 0 calc(100% / 5.5) !important;
          }
        }
      `}</style>
        </section>
    );
}
