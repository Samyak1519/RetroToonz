import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

const defaultPoster = "/media/extras/default.jpg";
const normalizePath = (p) => {
    if (!p) return null;
    return p.startsWith("/") ? p : `/Assets/${p}`;
};

export default function VideoPlayerUpNext({ allShows, currentIndex }) {
    const scrollerRef = useRef(null);

    if (!allShows || allShows.length === 0) return null;

    const scrollByCards = (count) => {
        if (!scrollerRef.current) return;
        const firstCard = scrollerRef.current.querySelector("[data-upnext-card]");
        const cardWidth = firstCard ? firstCard.offsetWidth : 200;
        scrollerRef.current.scrollBy({ left: cardWidth * count, behavior: "smooth" });
    };

    // Next 10 shows (wrap around)
    const upcoming = [];
    for (let i = 1; i <= Math.min(10, allShows.length - 1); i++) {
        upcoming.push(allShows[(currentIndex + i) % allShows.length]);
    }

    return (
        <section className="pb-10">
            <h2 className="text-xl font-semibold mb-4">Up Next</h2>

            <div className="relative">
                {/* Left arrow (desktop only) */}
                <button
                    onClick={() => scrollByCards(-1)}
                    aria-label="Scroll left"
                    className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 p-2 rounded-full"
                >
                    <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                {/* Horizontal scroller */}
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
                            const desktopSrc = normalizePath(show.thumbnail) || "";
                            const mobileSrc = normalizePath(show.thumbnailMobile) || "";
                            return (
                                <Link
                                    key={show.id || i}
                                    to={`/watch/${show.id}`}
                                    data-upnext-card
                                    className="block bg-white/5 hover:bg-white/10 rounded-lg overflow-hidden transition flex-shrink-0"
                                    style={{
                                        flex: "0 0 calc(100% / 2.5)", // mobile: 2.5 cards
                                        scrollSnapAlign: "start",
                                    }}
                                >
                                    {/* 2:3 aspect on mobile (pt-[150%]), 16:9 on sm+ (sm:pt-[56.25%]) */}
                                    <div className="pt-[150%] sm:pt-[56.25%] relative bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                                        <picture>
                                            <source
                                                srcSet={desktopSrc || mobileSrc || defaultPoster}
                                                media="(min-width:640px)"
                                            />
                                            <img
                                                src={mobileSrc || desktopSrc || defaultPoster}
                                                alt={show.title || ""}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = defaultPoster;
                                                }}
                                            />
                                        </picture>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Right arrow (desktop only) */}
                <button
                    onClick={() => scrollByCards(1)}
                    aria-label="Scroll right"
                    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 p-2 rounded-full"
                >
                    <ChevronRight className="w-5 h-5 text-white" />
                </button>
            </div>

            <style jsx>{`
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
      `}</style>
        </section>
    );
}
