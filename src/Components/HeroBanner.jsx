import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HeroBanner({ shows = [] }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade-out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % shows.length);
        setFade(true); // start fade-in
      }, 400); // fade-out duration
    }, 5000); // 5 seconds interval

    return () => clearInterval(interval);
  }, [shows.length]);

  if (!shows.length) return null;

  const show = shows[index];

  const handleStartWatching = () => {
    navigate(`/watch/${show.id}`);
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
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
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
    relative group inline-flex items-center
    text-white text-sm sm:text-base md:text-base font-medium
    px-6 py-3
    bg-cyan-600 hover:bg-cyan-500
    rounded-full shadow-md shadow-cyan-800/30
    transition-all duration-300 ease-in-out
    focus:outline-none
  "
          >
            <span className="relative z-10">Start Watching</span>
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 
      bg-white/10"
            ></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
