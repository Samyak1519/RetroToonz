

function EpisodeSection() {
  const episodes = Array.from({ length: 13 }, (_, i) => ({
    title: `Episode ${String(i + 1).padStart(2, "0")}`,
    duration: "24 min",
  }));

  return (
    <div className="mt-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">
        Episodes
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {episodes.map((episode, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300"
          >
            {/* Poster Placeholder (static for now) */}
            <div className="relative pt-[56.25%] bg-gray-800">
              <img
                src="/Assets/default.jpg"
                alt={episode.title}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center text-white text-lg font-bold">
                Ep {index + 1}
              </div>
            </div>

            {/* Title & Duration */}
            <div className="p-3 text-white">
              <h3 className="text-sm sm:text-base font-medium truncate">
                {episode.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Duration: {episode.duration}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EpisodeSection;
