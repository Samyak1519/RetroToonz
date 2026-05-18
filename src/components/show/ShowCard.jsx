// src/components/show/ShowCard.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { FavouriteIcon, PlayIcon } from "@hugeicons/core-free-icons";

const defaultPoster = "/Assets/default.jpg";

const normalizePath = (p) => {
  if (!p) return null;
  return p.startsWith("/") ? p : `/Assets/${p}`;
};

function ShowCard({ id, title, year, thumbnail, thumbnailMobile }) {
  const [isShortlisted, setIsShortlisted] = useState(false);

  const toggleShortlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShortlisted((s) => !s);
  };

  const desktopPoster = normalizePath(thumbnail) || defaultPoster;
  const mobilePoster = normalizePath(thumbnailMobile) || desktopPoster;

  return (
    <Link to={`/show/${id}`} aria-label={`Open ${title}`}>
      <article className="relative flex-shrink-0">
        <div className="w-[38vw] sm:w-full">
          {/* Hover owner */}
          <div
            className="
              group relative rounded-xl overflow-visible
              transition-all duration-300 ease-out
              hover:z-30 hover:scale-[1.04]
              will-change-transform
            "
          >
            {/* Card surface */}
            <div
              className="
                relative overflow-hidden rounded-xl
                bg-neutral-900
                ring-1 ring-white/10
                transition-all duration-300
                hover:ring-slate-500
                sm:hover:border-sky-400/60
                sm:hover:shadow-[0_12px_35px_rgba(0,0,0,0.6)]
              "
            >
              {/* Aspect ratio */}
              <div className="pt-[150%] sm:pt-[56.25%] relative">
                {/* Poster */}
                <picture>
                  <source media="(min-width:640px)" srcSet={desktopPoster} />
                  <img
                    src={mobilePoster}
                    alt={title}
                    loading="lazy"
                    onError={(e) => (e.target.src = defaultPoster)}
                    className="
                      absolute inset-0 w-full h-full object-cover
                      transition-all duration-300
                      sm:group-hover:scale-105
                    "
                  />
                </picture>

                {/* 🔥 GRADIENT */}
                {/* Mobile = light | Desktop = stronger (Up Next style) */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t from-black/60 via-transparent to-transparent
                    sm:from-black/80 sm:via-black/20
                  "
                />

                {/* 🔥 PLAY BUTTON (Desktop only like Up Next) */}
                <div
                  className="
                    hidden sm:flex
                    absolute inset-0 items-center justify-center
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
                      text-white/90
                      transition-all duration-200
                      hover:scale-110
                    "
                  >
                    <HugeiconsIcon icon={PlayIcon} size={20} />
                  </div>
                </div>

                {/* Wishlist */}
                <button
                  onClick={toggleShortlist}
                  className="
                    absolute top-2 right-2 z-20
                    w-7 h-7 sm:w-8 sm:h-8
                    rounded-full
                    bg-black/30 backdrop-blur-md
                    border border-white/20
                    flex items-center justify-center
                    transition-all duration-200
                    hover:bg-black/40 hover:border-white/30
                  "
                >
                  <HugeiconsIcon
                    icon={FavouriteIcon}
                    className={`
                      w-4 h-4 transition-all duration-200
                      ${
                        isShortlisted
                          ? "text-red-600 scale-110 drop-shadow-[0_0_6px_rgba(248,113,113,0.6)]"
                          : "text-white"
                      }
                    `}
                  />
                </button>

                {/* 🔥 TITLE + YEAR */}
                {/* Mobile = compact | Desktop = Up Next style spacing */}
                <div
                  className="
                    absolute bottom-0 left-0 right-0
                    px-3 py-2
                    bg-gradient-to-t from-black/80 via-black/40 to-transparent
                  "
                >
                  <h3 className="text-xs sm:text-sm font-semibold text-white truncate">
                    {title}
                  </h3>

                  {year && (
                    <p className="text-[10px] sm:text-[12px] text-gray-300">
                      {year}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ShowCard;
