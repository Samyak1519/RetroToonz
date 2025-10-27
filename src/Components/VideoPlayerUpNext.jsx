// src/Components/VideoPlayerUpNext.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

const DEFAULT_POSTER = "/media/extras/default.jpg";

/**
 * Clean up path:
 *  - remove duplicate slashes
 *  - ensure leading slash
 */
function cleanPath(p) {
    if (!p) return null;
    // Replace multiple slashes with single slash
    const s = p.replace(/\/{2,}/g, "/");
    // Ensure leading slash
    return s.startsWith("/") ? s : `/${s}`;
}

/**
 * Build the desktop/mobile poster urls.
 * Priority:
 *  1) Use value from JSON (if it looks like a /media/... path)
 *  2) Otherwise fall back to convention using show.id:
 *     Desktop -> /media/posters-desktop/${show.id}-poster-desktop.jpg
 *     Mobile  -> /media/posters-mobile/${show.id}-poster-mobile.jpeg
 */
function getPosterUrls(show = {}) {
    const rawDesktop = show.thumbnail || show.poster || null;
    const rawMobile = show.thumbnailMobile || show.posterMobile || null;

    const jsonDesktop = cleanPath(rawDesktop);
    const jsonMobile = cleanPath(rawMobile);

    const looksLikeMedia = (p) => !!p && p.startsWith("/media/");

    // Fallback (use show.id, sanitized)
    const id = (show.id || "").toString().trim();
    // sanitize id to be safe for file name (replace spaces with -, lowercase)
    const slug = id ? id.replace(/\s+/g, "-").toLowerCase() : null;

    const guessedDesktop = slug ? `/media/posters-desktop/${slug}-poster-desktop.jpg` : null;
    const guessedMobile = slug ? `/media/posters-mobile/${slug}-poster-mobile.jpeg` : null;

    const desktop = (looksLikeMedia(jsonDesktop) ? jsonDesktop : guessedDesktop) || DEFAULT_POSTER;
    const mobile = (looksLikeMedia(jsonMobile) ? jsonMobile : guessedMobile) || desktop || DEFAULT_POSTER;

    return {
        desktop: desktop,
        mobile: mobile,
    };
}

export default function VideoPlayerUpNext({ allShows = [], currentIndex = 0 }) {
    const scrollerRef = useRef(null);

    if (!Array.isArray(allShows) || allShows.length === 0) return null;

    const scrollByCards = (count) => {
        if (!scrollerRef.current) return;
        const firstCard = scrollerRef.current.querySelector("[data-upnext-card]");
        const cardWidth = firstCard ? firstCard.offsetWidth : 220;
        scrollerRef.current.scrollBy({ left: cardWidth * count, behavior: "smooth" });
    };

    // Next shows (exclude currentIndex)
    const upcoming = [];
    for (let i = 1; i <= Math.min(12, allShows.length - 1); i++) {
        upcoming.push(allShows[(currentIndex + i) % allShows.length]);
    }

    return (
        <section className="pb-10">
            <h2 className="text-xl font-semibold mb-3">Up Next</h2>
            <div className="relative">
                <button
                    onClick={() => scrollByCards(-1)}
                    aria-label="Scroll left"
                    className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 p-2 rounded-full"
                >
                    <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                <div
                    ref={scrollerRef}
                    className="overflow-x-auto scrollbar-hide scroll-smooth"
                    style={{ WebkitOverflowScrolling: "touch" }}
                >
                    <div
                        className="flex gap-4 items-stretch"
                        style={{ scrollSnapType: "x mandatory", paddingBottom: 8 }}
                    >
                        {upcoming.map((show, i) => {
                            const { desktop, mobile } = getPosterUrls(show);

                            return (
                                <Link
                                    key={show.id || i}
                                    to={`/watch/${show.id}`}
                                    data-upnext-card
                                    className="block bg-white/5 hover:bg-white/10 rounded-lg overflow-hidden transition flex-shrink-0"
                                    style={{
                                        flex: "0 0 calc(100% / 2.5)", // mobile: about 2.5 cards
                                        scrollSnapAlign: "start",
                                    }}
                                >
                                    <div className="pt-[150%] sm:pt-[56.25%] relative bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                                        <picture>
                                            <source srcSet={desktop || DEFAULT_POSTER} media="(min-width:640px)" />
                                            <img
                                                src={mobile || desktop || DEFAULT_POSTER}
                                                alt={show.title || ""}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                onError={(e) => {
                                                    // fallback to default if the requested image 404s
                                                    e.target.onerror = null;
                                                    e.target.src = DEFAULT_POSTER;
                                                }}
                                            />
                                        </picture>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <button
                    onClick={() => scrollByCards(1)}
                    aria-label="Scroll right"
                    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 p-2 rounded-full"
                >
                    <ChevronRight className="w-5 h-5 text-white" />
                </button>
            </div>

            <style>{`
        @media (min-width: 640px) {
          a[data-upnext-card] {
            flex: 0 0 calc(100% / 4) !important; /* 4 cards tablet */
          }
        }
        @media (min-width: 1024px) {
          a[data-upnext-card] {
            flex: 0 0 calc(100% / 5.5) !important; /* 5.5 cards desktop */
          }
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </section>
    );
}
