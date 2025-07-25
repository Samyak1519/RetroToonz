import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HeroBanner({ shows = [] }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % shows.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [shows.length]);

  if (!shows.length) return null;

  const show = shows[index];

  const handleStartWatching = () => {
    navigate(`/watch/${show.id}`); // updated to direct play route
  };

  return (
    <div
      className="relative w-full overflow-hidden text-white mb-0.5 md:mb-2 transition-opacity duration-1000"
      style={{ backgroundColor: "#0F0A24" }}
    >
      <div className="relative w-full pt-[75%] sm:pt-[36%]">
        {/* Background Image */}
        <img
          key={show.id}
          src={show.thumbnail}
          alt={show.title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div
            className="w-full h-full bg-gradient-to-b 
              from-transparent 
              via-[#0F0A24]/70 
              via-[55%] 
              to-[#0F0A24] 
              to-[100%]"
          />
        </div>

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col justify-end items-start px-4 sm:px-6 md:px-8 pb-8 sm:pb-10 md:pb-12 z-20 transition-all duration-500">
          <h1
            className="
              text-lg sm:text-3xl 
              md:text-xl md:leading-tight
              lg:text-5xl 
              font-bold mb-1 sm:mb-4
            "
          >
            Watch {show.title} Now
          </h1>
          <p
            className="
              text-sm sm:text-lg 
              md:text-base 
              lg:text-xl 
              text-gray-200 mb-2 sm:mb-4
            "
          >
            Aired in {show.year}. Dive into the nostalgia!
          </p>
          <button
            onClick={handleStartWatching}
            className="
              text-xs sm:text-sm 
              md:text-xs 
              lg:text-base 
              bg-cyan-500 hover:bg-cyan-600 text-white font-semibold 
              px-4 py-2 sm:px-5 sm:py-2.5 md:px-4 md:py-2 lg:px-6 lg:py-3 
              rounded-lg transition-all
            "
          >
            Start Watching
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
