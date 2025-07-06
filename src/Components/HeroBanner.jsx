function HeroBanner({ shows = [] }) {
  if (!shows.length) return null;

  const randomIndex = Math.floor(Math.random() * shows.length);
  const show = shows[randomIndex];

  return (
    <div className="relative w-full overflow-hidden bg-black text-white">
      {/* Aspect Ratio 25:9 (36%) */}
      <div className="relative w-full pt-[36%]">
        {/* Background Image */}
        <img
          src={show.thumbnail}
          alt={show.title}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />

        {/* Overlay Content - Bottom Left */}
        <div className="absolute inset-0 flex flex-col justify-end items-start px-4 sm:px-6 md:px-12 pb-8 z-10">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2">
            Watch {show.title} Now
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-4">
            Aired in {show.year}. Dive into the nostalgia!
          </p>
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-5 py-2 md:px-6 md:py-3 rounded-lg transition-all">
            Start Watching
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
