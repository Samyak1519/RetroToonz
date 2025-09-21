// src/Components/HeroBanner.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaInfoCircle } from "react-icons/fa";

function HeroBanner({ shows = [] }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    if (!shows.length) return;
    const interval = setInterval(() => {
      setSlideIn(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % shows.length);
        setSlideIn(true);
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, [shows.length]);

  if (!shows.length) return null;
  const show = shows[index];

  const handleStartWatching = () => navigate(`/watch/${show.id}`);
  const handleMoreInfo = () => navigate(`/show/${show.id}`);

  return (
    <div className="relative w-full overflow-hidden text-white">
      {/* Responsive aspect ratios: mobile portrait poster, wider on larger screens */}
      <div className="relative w-full aspect-[3/4] sm:aspect-[15/9] lg:aspect-[21/9]">
        {/* Background image with slide transitions */}
        <div
          key={show.id}
          className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out transform ${slideIn ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
        >
          <picture>
            {show.thumbnailMobile && (
              <source srcSet={show.thumbnailMobile} media="(max-width: 640px)" />
            )}
            <img src={show.thumbnail} alt={show.title} className="w-full h-full object-cover" />
          </picture>
        </div>

        {/* subtle responsive tint */}
        <div className="absolute inset-0 z-10 bg-black/30 sm:bg-black/20" />

        {/* bottom gradient */}
        <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-t from-[#0F0A24] via-[#0F0A24]/70 to-transparent" />
          <div className="absolute bottom-0 w-full h-8 bg-[#0F0A24]" />
        </div>

        {/* content */}
        <div className="absolute inset-0 flex flex-col justify-end items-start px-4 sm:px-6 md:px-8 pb-6 sm:pb-10 md:pb-12 z-30 transition-all duration-500">
          {/* Title: Watch / Show Name */}
          <h1 className="font-extrabold mb-2 sm:mb-3 leading-snug">
            <span className="block sm:inline text-lg sm:text-3xl md:text-4xl lg:text-4xl font-semibold tracking-tight">
              Watch
            </span>

            <span className="block sm:inline sm:ml-3 text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight">
              {show.title}
            </span>
          </h1>

          {/* Tags / categories */}
          {show.tags && show.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-3">
              {show.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-[10px] sm:text-xs md:text-sm font-medium bg-white/10 text-white rounded-full border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 mb-4 sm:mb-4">
            Still iconic. Still unforgettable. Since {show.year}.
          </p>

          {/* Buttons row: More Info circular + Start Watching */}
          <div className="flex items-center gap-3">


            <button
              onClick={handleStartWatching}
              className="group relative inline-flex items-center gap-2 text-white px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 shadow-md transition-all duration-300 text-sm sm:text-base"
            >
              <span className="absolute inline-flex h-10 w-10 rounded-full bg-cyan-400 opacity-20 group-hover:animate-ping -z-10" />
              <FaPlay className="text-sm sm:text-base" />
              <span className="font-medium">Start Watching</span>
            </button>

            <button
              onClick={handleMoreInfo}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 shadow-md"
              title="More Info"
            >
              <FaInfoCircle className="text-white text-lg" />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
