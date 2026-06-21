import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  PlayIcon,
} from "@hugeicons/core-free-icons";
import { useRef } from "react";
import { Link } from "react-router-dom";

const DEFAULT_POSTER = "/media/extras/default.jpg";

/* ✅ CLEAN PATH */
function cleanPath(p) {
  if (!p) return null;
  const s = p.replace(/\/{2,}/g, "/");
  return s.startsWith("/") ? s : `/${s}`;
}

/* ✅ POSTER LOGIC (FIXED) */
function getPosterUrls(show = {}) {
  const rawDesktop = show.thumbnail || show.poster || null;
  const rawMobile = show.thumbnailMobile || show.posterMobile || null;

  const jsonDesktop = cleanPath(rawDesktop);
  const jsonMobile = cleanPath(rawMobile);

  const id = (show.id || "").toString().trim();
  const slug = id ? id.replace(/\s+/g, "-").toLowerCase() : null;

  const guessedDesktop = slug
    ? `/media/posters-desktop/${slug}-poster-desktop.jpg`
    : null;

  const guessedMobile = slug
    ? `/media/posters-mobile/${slug}-poster-mobile.jpg`
    : null;

  const desktop = jsonDesktop || guessedDesktop || DEFAULT_POSTER;
  const mobile = jsonMobile || guessedMobile || desktop || DEFAULT_POSTER;

  return { desktop, mobile };
}

export default function VideoPlayerUpNext({ allShows = [], currentIndex = 0 }) {
  const scrollerRef = useRef(null);

  if (!Array.isArray(allShows) || allShows.length === 0) return null;

  const scrollByCards = (count) => {
    if (!scrollerRef.current) return;

    const firstCard = scrollerRef.current.querySelector("[data-upnext-card]");
    const cardWidth = firstCard ? firstCard.offsetWidth : 220;

    scrollerRef.current.scrollBy({
      left: cardWidth * count,
      behavior: "smooth",
    });
  };

  const upcoming = [];
  for (let i = 1; i <= Math.min(12, allShows.length - 1); i++) {
    upcoming.push(allShows[(currentIndex + i) % allShows.length]);
  }

  return (
    <section className="pb-10">
      {/* TITLE */}
      <h2 className="text-xl sm:text-xl md:text-2xl font-semibold text-yellow-300 mb-2 px-1">
        Up Next
      </h2>

      <div className="relative group/controls">
        {/* LEFT */}
        <button
          onClick={() => scrollByCards(-1)}
          className="
            hidden md:flex items-center justify-center
            absolute left-2 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 rounded-full
            bg-black/40 backdrop-blur-md
            hover:bg-black/70
            opacity-0 group-hover/controls:opacity-100
            transition
          "
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
        </button>

        {/* SCROLLER */}
        <div
          ref={scrollerRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth"
        >
          <div
            className="flex gap-2 items-stretch py-3"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {upcoming.map((show, i) => {
              const { desktop, mobile } = getPosterUrls(show);

              return (
                <Link
                  key={show.id || i}
                  to={`/watch/${show.id}`}
                  data-upnext-card
                  className="
                    group relative flex-shrink-0
                    rounded-xl overflow-hidden
                    bg-black/20 backdrop-blur-sm
                    border border-white/10
                    transition-all duration-300
                    hover:scale-[1.05] hover:border-sky-400/60
                  "
                  style={{
                    flex: "0 0 40%", // 🔥 better mobile width
                    scrollSnapAlign: "start",
                  }}
                >
                  {/* IMAGE */}
                  <div className="relative w-full aspect-2/3 sm:aspect-video bg-zinc-800">
                    <picture>
                      {/* Desktop */}
                      <source srcSet={desktop} media="(min-width: 640px)" />

                      {/* Mobile */}
                      <img
                        src={mobile}
                        alt={show.title || ""}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = DEFAULT_POSTER;
                        }}
                      />
                    </picture>

                    {/* GRADIENT */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* PLAY OVERLAY */}
                    <div
                      className="
                        absolute inset-0 flex items-center justify-center
                        bg-black/40
                        opacity-0 group-hover:opacity-100
                        transition
                      "
                    >
                      <div
                        className="
                          bg-black/50 backdrop-blur-lg border border-white/10
                          p-3 rounded-full
                          flex items-center justify-center
                          transition hover:scale-110
                        "
                      >
                        <HugeiconsIcon icon={PlayIcon} size={20} />
                      </div>
                    </div>

                    {/* TITLE */}
                    <div
                      className="
                        absolute bottom-2 left-3 right-3
                        text-white text-sm sm:text-[15px] font-semibold
                        leading-snug tracking-tight
                        line-clamp-2
                      "
                    >
                      {show.title}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* RIGHT */}
        <button
          onClick={() => scrollByCards(1)}
          className="
            hidden md:flex items-center justify-center
            absolute right-2 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 rounded-full
            bg-black/40 backdrop-blur-md
            hover:bg-black/70
            opacity-0 group-hover/controls:opacity-100
            transition
          "
        >
          <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
        </button>
      </div>

      {/* RESPONSIVE */}
      <style>{`
        @media (min-width: 640px) {
          a[data-upnext-card] {
            flex: 0 0 calc(100% / 3.2) !important;
          }
        }
        @media (min-width: 1024px) {
          a[data-upnext-card] {
            flex: 0 0 calc(100% / 5) !important;
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
