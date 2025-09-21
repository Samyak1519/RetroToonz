import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

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

  return (
    <div className="relative w-full overflow-hidden text-white">
      {/* MOBILE: 3:4, TABLET: ~15:9, DESKTOP: 21:9 */}
      <div className="relative w-full aspect-[3/4] sm:aspect-[15/9] lg:aspect-[21/9]">
        {/* Background image with slide transitions */}
        <div
          key={show.id}
          className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out transform ${slideIn ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
        >
          <img src={show.thumbnail} alt={show.title} className="w-full h-full object-cover" />
        </div>

        {/* subtle responsive tint: stronger on small screens */}
        <div className="absolute inset-0 z-10 bg-black/30 sm:bg-black/20" />

        {/* gradient fade at bottom */}
        <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-t from-[#0F0A24] via-[#0F0A24]/70 to-transparent" />
          <div className="absolute bottom-0 w-full h-6 bg-[#0F0A24]" />
        </div>

        {/* content - sized for mobile readability */}
        <div className="absolute inset-0 flex flex-col justify-end items-start px-4 sm:px-6 md:px-8 pb-6 sm:pb-10 md:pb-12 z-30 transition-all duration-500">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-3">
            Watch {show.title} Now
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 mb-3 sm:mb-4">
            Still iconic. Still unforgettable. Since {show.year}.
          </p>

          <button
            onClick={handleStartWatching}
            className="group relative inline-flex items-center gap-2 text-white px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 shadow-md transition-all duration-300 text-sm sm:text-base"
          >
            <span className="absolute inline-flex h-10 w-10 rounded-full bg-cyan-400 opacity-20 group-hover:animate-ping -z-10" />
            <FaPlay className="text-sm sm:text-base" />
            <span className="font-medium">Start Watching</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
