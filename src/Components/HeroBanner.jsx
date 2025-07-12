// src/Components/HeroBanner.jsx

function HeroBanner({ shows = [] }) {
  if (!shows.length) return null;

  const randomIndex = Math.floor(Math.random() * shows.length);
  const show = shows[randomIndex];

  return (
    <div
      className="relative w-full overflow-hidden text-white mb-0.5 md:mb-2"
      style={{ backgroundColor: "#0F0A24" }}
    >
      <div className="relative w-full pt-[75%] sm:pt-[36%]">
        {/* Background Image */}
        <img
          src={show.thumbnail}
          alt={show.title}
          className="absolute inset-0 w-full h-full object-cover"
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
        <div className="absolute inset-0 flex flex-col justify-end items-start px-4 sm:px-6 md:px-12 pb-10 sm:pb-12 md:pb-16 z-20">
          <h1 className="text-lg sm:text-3xl md:text-5xl font-bold mb-1 sm:mb-4">
            Watch {show.title} Now
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-gray-200 mb-2 sm:mb-4">
            Aired in {show.year}. Dive into the nostalgia!
          </p>
          <button className="text-xs sm:text-sm md:text-base bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg transition-all">
            Start Watching
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
