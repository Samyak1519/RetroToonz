import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa"; // Optional icon

function HeroBanner({ shows = [] }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIn(false); // start slide-out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % shows.length);
        setSlideIn(true); // start slide-in
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, [shows.length]);

  if (!shows.length) return null;

  const show = shows[index];

  const handleStartWatching = () => {
    navigate(`/watch/${show.id}`);
  };

  return (
    <div
      className="relative w-full overflow-hidden text-white mb-0.5 md:mb-2"
      style={{ backgroundColor: "#0F0A24" }}
    >
      <div className="relative w-full pt-[75%] sm:pt-[36%]">
        {/* Background Image with slide transition */}
        <div
          key={show.id}
          className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out transform ${slideIn ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
        >
          <img
            src={show.thumbnail}
            alt={show.title}
            className="w-full h-full object-cover"
          />
        </div>

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
          <h1 className="text-lg sm:text-3xl md:text-xl md:leading-tight lg:text-5xl font-bold mb-1 sm:mb-4">
            Watch {show.title} Now
          </h1>
          <p className="text-sm sm:text-lg md:text-base lg:text-xl text-gray-200 mb-2 sm:mb-4">
            Still iconic. Still unforgettable. Since {show.year}.
          </p>


          <button
            onClick={handleStartWatching}
            className="group relative flex items-center gap-2 text-white px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 shadow-md transition-all duration-300"
          >
            {/* Pulse ring effect */}
            <span className="absolute inline-flex h-12 w-12 rounded-full bg-cyan-400 opacity-30 group-hover:animate-ping -z-10"></span>

            {/* Play icon */}
            <FaPlay className="text-sm sm:text-base" />

            <span className="font-medium text-sm sm:text-base">
              Start Watching
            </span>
          </button>




        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
