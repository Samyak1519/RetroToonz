// src/components/home/GenresSection.jsx

function GenresSection({ genres, onSelectGenre, selectedGenre }) {
  const formatGenre = (tag) => {
    return tag.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div id="genre-section" className="mb-4">
      {/* TITLE */}
      <div className="px-4 sm:px-10 mb-4 flex items-center justify-between">
        <h3 className="text-xl sm:text-2xl font-semibold text-yellow-300">
          Genres
        </h3>

        {selectedGenre && (
          <button
            onClick={() => onSelectGenre(null)}
            className="text-sm text-white/60 hover:text-white transition"
          >
            Clear
          </button>
        )}
      </div>

      {/* ================= MOBILE ================= */}
      <div className="sm:hidden px-4">
        <div
          className="
            flex flex-wrap gap-2
            overflow-hidden
            max-h-[135px]   /* 🎯 tighter → ~4 rows */
          "
        >
          {genres.slice(0, 24).map((genre, index) => {
            const isActive = selectedGenre === genre;

            return (
              <button
                key={index}
                onClick={() => onSelectGenre(genre)}
                className={`
                  px-4 py-2
                  rounded-full
                  text-sm
                  whitespace-nowrap
                  transition-all

                  ${
                    isActive
                      ? "bg-white text-black"
                      : "bg-white/5 border border-white/10 text-white/80"
                  }
                `}
              >
                {formatGenre(genre)}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden sm:block px-4 sm:px-6">
        <div
          className="
            flex flex-wrap gap-3"
        >
          {genres.slice(0, 50).map((genre, index) => {
            const isActive = selectedGenre === genre;

            return (
              <button
                key={index}
                onClick={() => onSelectGenre(genre)}
                className={`
                  px-5 py-2.5
                  rounded-full
                  text-sm
                  transition-all duration-300

                  ${
                    isActive
                      ? "bg-white text-black shadow-md"
                      : "bg-white/5 border border-white/10 text-white/80 hover:bg-white/15"
                  }
                `}
              >
                {formatGenre(genre)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GenresSection;
