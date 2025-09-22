// src/Components/ShowCard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { VscHeart } from "react-icons/vsc";
import { AiFillHeart } from "react-icons/ai";

const defaultPoster = "/Assets/default.jpg";

function ShowCard({ id, title, year, thumbnail, thumbnailMobile, tags = [] }) {
  const [isShortlisted, setIsShortlisted] = useState(false);

  const toggleShortlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShortlisted((s) => !s);
  };

  // ✅ Use thumbnailMobile first, else thumbnail, else default
  const posterSrc = thumbnailMobile || thumbnail || defaultPoster;

  return (
    <Link to={`/show/${id}`} aria-label={`Open ${title}`}>
      <article className="group relative rounded-lg overflow-hidden flex-shrink-0">
        <div className="relative w-[32vw] sm:w-36 md:w-40 lg:w-44 xl:w-48 2xl:w-52">
          <div className="pt-[150%] relative bg-gray-800 rounded-lg overflow-hidden shadow-sm">
            <img
              src={posterSrc}
              alt={title}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultPoster;
              }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* heart overlay */}
            <button
              onClick={toggleShortlist}
              title={isShortlisted ? "Remove from watchlist" : "Add to watchlist"}
              className="absolute top-2 right-2 z-20 w-8 h-8 rounded-full flex items-center justify-center bg-black/40 hover:bg-black/60 text-white transition-transform hover:scale-110"
            >
              {isShortlisted ? <AiFillHeart className="text-red-400" /> : <VscHeart className="text-white" />}
            </button>

            {/* bottom gradient + small meta */}
            <div className="absolute left-0 right-0 bottom-0 px-3 py-2 bg-gradient-to-t from-black/70 to-transparent">
              <div className="text-left">
                
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
