import { useState } from "react";
import { Link } from "react-router-dom";
import { VscHeart } from "react-icons/vsc";
import { AiFillHeart } from "react-icons/ai"; // for filled heart

const defaultPoster = "/Assets/default.jpg";

function ShowCard({ id, title, year, thumbnail, tags = [] }) {
  const [isShortlisted, setIsShortlisted] = useState(false);

  const toggleShortlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShortlisted((prev) => !prev);
  };

  return (
    <Link to={`/show/${id}`}>
      <div className="relative flex flex-col justify-center w-[42vw] sm:w-44 md:w-48 lg:w-56 xl:w-64 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition duration-300 flex-shrink-0">
        {/* Image */}
        <div className="relative w-full pt-[75%] lg:pt-[56.25%] overflow-hidden rounded-t-lg">
          <img
            src={thumbnail || defaultPoster}
            alt={title}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultPoster;
            }}
          />
        </div>

        {/* Title, Heart Icon, Year, and Tags */}
        <div className="mt-1 pl-2.5 px-2 pb-2 text-black leading-tight">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-xs sm:text-sm truncate">{title}</h3>
            <button
              onClick={toggleShortlist}
              className="text-red-500 text-xl  sm:text-xl hover:scale-110 transition-transform"
              title={
                isShortlisted ? "Remove from Watchlist" : "Add to Watchlist"
              }
            >
              {isShortlisted ? <AiFillHeart /> : <VscHeart />}
            </button>
          </div>

          <p className="text-[10px] sm:text-xs text-gray-600">{year}</p>

          <div className="flex flex-wrap gap-1 mt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  tag === "Comedy"
                    ? "bg-pink-100 text-pink-700"
                    : tag === "Adventure"
                    ? "bg-yellow-100 text-yellow-800"
                    : tag === "Action"
                    ? "bg-red-100 text-red-700"
                    : tag === "Sci-Fi"
                    ? "bg-blue-100 text-blue-700"
                    : tag === "Horror"
                    ? "bg-purple-100 text-purple-700"
                    : tag === "Superhero"
                    ? "bg-indigo-100 text-indigo-700"
                    : tag === "Fantasy"
                    ? "bg-green-100 text-green-700"
                    : tag === "Classic"
                    ? "bg-gray-200 text-gray-700"
                    : tag === "Educational"
                    ? "bg-teal-100 text-teal-700"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

ShowCard.defaultProps = {
  id: "",
  title: "Untitled Show",
  year: "2023",
  thumbnail: "",
  tags: [],
};

export default ShowCard;
