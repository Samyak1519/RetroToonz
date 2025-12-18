import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { VscHeart } from "react-icons/vsc";
import { Link } from "react-router-dom";

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
              relative rounded-xl overflow-visible
              transition-all duration-400 ease-out
              hover:z-30
              hover:scale-[1.03]
              will-change-transform
            "
          >
            {/* Card surface */}
            <div
              className="
                relative overflow-hidden rounded-xl
                bg-neutral-900
                ring-1 ring-white/10
                transition-colors duration-300
                hover:ring-slate-600
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
                      transition-[filter] duration-300
                      hover:brightness-105
                      hover:contrast-105
                    "
                  />
                </picture>

                {/* Cinematic inner shadow */}
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_-48px_64px_rgba(0,0,0,0.75)]" />

                {/* Title footer */}
                <div
                  className="
                    absolute bottom-0 left-0 right-0
                    px-3 py-2
                    bg-gradient-to-t
                    from-black/80 via-black/55 to-transparent
                  "
                >
                  <h3 className="text-[12px] sm:text-sm font-medium text-white truncate">
                    {title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-neutral-300">
                    {year}
                  </p>
                </div>

                {/* Wishlist / Favourite (GLASS) */}
                <button
                  onClick={toggleShortlist}
                  className="
                    absolute top-2 right-2 z-20
                    w-7 h-7 sm:w-8 sm:h-8
                    rounded-full
                    bg-black/30 backdrop-blur-md
                    border border-white/20
                    text-white
                    flex items-center justify-center
                    transition-all duration-200
                    hover:bg-black/40 hover:border-white/30
                  "
                >
                  {isShortlisted ? (
                    <AiFillHeart className="text-red-400" />
                  ) : (
                    <VscHeart />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ShowCard;
