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

  // Format description: 10 words per line, max 3 lines (30 words)
  const formatDescription = (text = "") => {
    const words = text.split(" ");
    const lines = [];

    for (let i = 0; i < 3; i++) {
      const start = i * 10;
      const end = start + 10;
      if (start >= words.length) break;

      let lineWords = words.slice(start, end);

      // If it's the 3rd line and there are still more words, add "..."
      if (i === 2 && words.length > end) {
        lineWords[lineWords.length - 1] += "...";
      }

      lines.push(lineWords.join(" "));
    }

    return lines;
  };

  const descriptionLines = formatDescription(show.description);

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
            <img
              src={show.thumbnail}
              alt={show.title}
              className="w-full h-full object-cover"
            />
          </picture>
        </div>

        {/* Dark overlay for Netflix-style effect */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* bottom gradient */}
        <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-t from-[#0F0A24] via-[#0F0A24]/70 to-transparent" />
          <div className="absolute bottom-0 w-full h-8 bg-[#0F0A24]" />
        </div>

        {/* content */}
        <div className="absolute inset-0 flex flex-col justify-end items-start px-4 sm:px-6 md:px-14 pb-6 sm:pb-10 md:pb-12 z-30 transition-all duration-500">
          {/* Title: Watch / Show Name */}
          <h1 className="font-extrabold mb-2 sm:mb-3 leading-snug">
            <span className="block sm:inline text-lg sm:text-2xl md:text-3xl lg:text-2xl font-semibold tracking-tight">
              Watch
            </span>
            <br />
            <span className="block sm:inline sm:ml-3 text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight">
              {show.title}
            </span>
          </h1>

          {/* Tags / categories */}
          {show.tags && show.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-5 ">
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

          {/* Subtitle / description */}
          {descriptionLines.length > 0 && (
            <div className="text-xs sm:text-sm md:text-base lg:text-base text-gray-200 mb-5 sm:mb-5">
              {descriptionLines.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          )}

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
