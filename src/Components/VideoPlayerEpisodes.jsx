// src/Components/VideoPlayerEpisodes.jsx
import React, { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react"; // 👈 install lucide-react if not already

export default function VideoPlayerEpisodes({ seasons, currentShowId }) {
    const normalizedSeasons = useMemo(() => {
        if (Array.isArray(seasons) && seasons.length > 0) return seasons;

        // fallback placeholder
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
        const cardWidth = scrollerRef.current.firstChild?.firstChild?.offsetWidth || 200;
        scrollerRef.current.scrollBy({ left: cardWidth * count, behavior: "smooth" });
    };

    return (
        <section>
            <h2 className="text-xl font-semibold mb-4">Episodes</h2>

            {/* Season Tabs */}
            <div className="flex gap-2 mb-4 flex-wrap">
                {normalizedSeasons.map((s, i) => (
                    <button
                        key={s.seasonNumber}
                        onClick={() => setActiveSeason(i)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-shadow focus:outline-none ${i === activeSeason
                                ? "bg-white/10 ring-1 ring-white/20"
                                : "bg-transparent hover:bg-white/5"
                            }`}
                    >
                        Season {s.seasonNumber}
                    </button>
                ))}
            </div>

            {/* Horizontal scroller with arrows */}
            <div className="relative">
                {/* Left arrow */}
                <button
                    onClick={() => scrollByCards(-1)}
                    className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 p-2 rounded-full"
                >
                    <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                {/* Scroller */}
                <div
                    ref={scrollerRef}
                    className="overflow-x-auto scrollbar-hide scroll-smooth"
                    style={{ WebkitOverflowScrolling: "touch" }}
                >
                    <div
                        className="flex gap-4 items-stretch"
                        style={{ scrollSnapType: "x mandatory", paddingBottom: 8 }}
                    >
                        {season.episodes.map((ep) => (
                            <Link
                                key={ep.id || ep.episodeNumber}
                                to={`/watch/${currentShowId}?ep=${ep.episodeNumber}`}
                                className="block bg-white/5 hover:bg-white/10 rounded-lg overflow-hidden transition flex-shrink-0"
                                style={{
                                    flex: "0 0 calc(100% / 2.5)", // default mobile
                                    scrollSnapAlign: "start",
                                }}
                            >
                                {/* 16:9 thumbnail */}
                                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                                    {ep.thumbnail ? (
                                        <img
                                            src={ep.thumbnail}
                                            alt={ep.title}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm bg-gray-800">
                                            Episode {ep.episodeNumber}
                                        </div>
                                    )}
                                </div>

                                <div className="p-3">
                                    <h3 className="text-sm font-medium">{ep.title}</h3>
                                    {/* one-liner description */}
                                    <p className="text-xs text-gray-300 truncate mt-1">
                                        {ep.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right arrow */}
                <button
                    onClick={() => scrollByCards(1)}
                    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 p-2 rounded-full"
                >
                    <ChevronRight className="w-5 h-5 text-white" />
                </button>
            </div>

            <style jsx>{`
        @media (min-width: 640px) {
          a[style] {
            flex: 0 0 calc(100% / 4) !important; /* 4 cards tablet */
          }
        }
        @media (min-width: 1024px) {
          a[style] {
            flex: 0 0 calc(100% / 5.5) !important; /* 5.5 cards desktop */
          }
        }
      `}</style>
        </section>
    );
}
