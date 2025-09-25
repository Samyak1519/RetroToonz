import { useState } from "react";
import { Link } from "react-router-dom";
import { VscHeart } from "react-icons/vsc";
import { AiFillHeart } from "react-icons/ai";

const defaultPoster = "/Assets/default.jpg";

// Normalize paths from JSON
const normalizePath = (p) => {
  if (!p) return null;
  return p.startsWith("/") ? p : `/Assets/${p}`;
};

function ShowCard({ id, title, year, thumbnail, thumbnailMobile, tags = [] }) {
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
      <article className="group relative rounded-lg overflow-hidden flex-shrink-0">
        <div className="w-[35vw] sm:w-full">
          {/* 2:3 aspect on mobile, 16:9 on desktop */}
          <div className="pt-[150%] sm:pt-[56.25%] relative bg-gray-800 rounded-lg overflow-hidden shadow-sm">
            <picture>
              {/* Desktop / tablet (≥640px): use wide poster */}
              <source media="(min-width: 640px)" srcSet={desktopPoster} />
              {/* Mobile fallback: portrait poster */}
              <img
                src={mobilePoster}
                alt={title}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultPoster;
                }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </picture>

            {/* Heart button */}
            <button
              onClick={toggleShortlist}
              title={isShortlisted ? "Remove from watchlist" : "Add to watchlist"}
              className="absolute top-2 right-2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-black/40 hover:bg-black/60 text-white transition-transform hover:scale-110"
            >
              {isShortlisted ? (
                <AiFillHeart className="text-red-400" />
              ) : (
                <VscHeart className="text-white" />
              )}
            </button>

            {/* Bottom gradient + meta */}
            <div className="absolute left-0 right-0 bottom-0 px-2 py-1.5 sm:px-3 sm:py-2 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="text-[11px] sm:text-sm font-semibold text-white truncate">
                {title}
              </h3>
              <div className="text-[10px] sm:text-[11px] text-gray-300 mt-0.5">
                {year}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

ShowCard.defaultProps = {
  id: "",
  title: "Untitled",
  year: "2023",
  thumbnail: "",
  thumbnailMobile: "",
  tags: [],
};

export default ShowCard;
