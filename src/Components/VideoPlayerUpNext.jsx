// src/Components/VideoPlayerUpNext.jsx
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { useRef } from "react";
import { Link } from "react-router-dom";

const DEFAULT_POSTER = "/media/extras/default.jpg";

function cleanPath(p) {
  if (!p) return null;
  const s = p.replace(/\/{2,}/g, "/");
  return s.startsWith("/") ? s : `/${s}`;
}

function getPosterUrls(show = {}) {
  const rawDesktop = show.thumbnail || show.poster || null;
  const rawMobile = show.thumbnailMobile || show.posterMobile || null;

  const jsonDesktop = cleanPath(rawDesktop);
  const jsonMobile = cleanPath(rawMobile);

  const looksLikeMedia = (p) => !!p && p.startsWith("/media/");

  const id = (show.id || "").toString().trim();
  const slug = id ? id.replace(/\s+/g, "-").toLowerCase() : null;

  const guessedDesktop = slug
    ? `/media/posters-desktop/${slug}-poster-desktop.jpg`
    : null;

  const guessedMobile = slug
    ? `/media/posters-mobile/${slug}-poster-mobile.jpeg`
    : null;

  const desktop =
    (looksLikeMedia(jsonDesktop) ? jsonDesktop : guessedDesktop) ||
    DEFAULT_POSTER;

  const mobile =
    (looksLikeMedia(jsonMobile) ? jsonMobile : guessedMobile) ||
    desktop ||
    DEFAULT_POSTER;

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

  // Next shows
  const upcoming = [];
  for (let i = 1; i <= Math.min(12, allShows.length - 1); i++) {
    upcoming.push(allShows[(currentIndex + i) % allShows.length]);
  }

  return (
    <section className="pb-12">
      {/* 🔥 Title */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 px-1">Up Next</h2>

      <div className="relative group">
        {/* ⬅ LEFT BUTTON */}
        <button
          onClick={() => scrollByCards(-1)}
          className="
            hidden md:flex items-center justify-center
            absolute left-2 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 rounded-full
            bg-black/40 backdrop-blur-md
            hover:bg-black/70
            opacity-0 group-hover:opacity-100
            transition-all duration-300
          "
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
        </button>

        {/* 🎬 SCROLLER */}
        <div
          ref={scrollerRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth"
        >
          <div
            className="flex gap-3 sm:gap-4 items-stretch"
            style={{ scrollSnapType: "x mandatory", paddingBottom: 8 }}
          >
            {upcoming.map((show, i) => {
              const { desktop, mobile } = getPosterUrls(show);

              return (
                <Link
                  key={show.id || i}
                  to={`/watch/${show.id}`}
                  data-upnext-card
                  className="
                    group/card relative flex-shrink-0
                    rounded-xl overflow-hidden
                    transition-all duration-300
                    hover:scale-[1.05]
                    shadow-md hover:shadow-xl
                  "
                  style={{
                    flex: "0 0 43%", // 🔥 2.3 cards on mobile
                    scrollSnapAlign: "start",
                  }}
                >
                  {/* 🎥 IMAGE */}
                  <div
                    className="
                      relative w-full 
                      aspect-[2/3] sm:aspect-video
                      bg-gray-800
                    "
                  >
                    <picture>
                      <source srcSet={desktop} media="(min-width:640px)" />
                      <img
                        src={mobile || desktop}
                        alt={show.title || ""}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = DEFAULT_POSTER;
                        }}
                      />
                    </picture>

                    {/* 🔥 GRADIENT */}
                    <div
                      className="
                        absolute inset-0 
                        bg-gradient-to-t from-black/70 via-black/20 to-transparent
                        opacity-70 group-hover/card:opacity-90
                        transition
                      "
                    />

                    {/* 🎯 TITLE */}
                    <div
                      className="
                        absolute bottom-2 left-3 right-3
                        text-white text-sm font-semibold
                        drop-shadow-md
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

        {/* ➡ RIGHT BUTTON */}
        <button
          onClick={() => scrollByCards(1)}
          className="
            hidden md:flex items-center justify-center
            absolute right-2 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 rounded-full
            bg-black/40 backdrop-blur-md
            hover:bg-black/70
            opacity-0 group-hover:opacity-100
            transition-all duration-300
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
