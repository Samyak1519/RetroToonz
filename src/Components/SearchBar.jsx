import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      role="search"
      className="
        relative flex w-full max-w-lg mx-auto
        rounded-3xl

        /* glass container */
        bg-black/30
        backdrop-blur-xl backdrop-saturate-150
        border border-white/10

        px-1 py-1
      "
    >
      {/* Search icon */}
      <Search
        className="
          absolute left-4 top-1/2 -translate-y-1/2
          text-cyan-400
          w-5 h-5 md:w-4 md:h-4
          pointer-events-none
        "
      />

      {/* Input */}
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search your favourite cartoon..."
        aria-label="Search cartoons"
        className="
          w-full rounded-3xl
          pl-11 pr-24
          py-2.5 md:py-1.5
          text-sm md:text-base

          bg-transparent
          text-white
          placeholder-cyan-300/70

          outline-none
          transition-all duration-200

          focus:ring-2 focus:ring-cyan-500/70
          focus:ring-offset-0
        "
      />

      {/* Search button */}
      <button
        type="submit"
        className="
          absolute right-1.5 top-1/2 -translate-y-1/2
          px-4 py-1.5 md:py-1
          text-sm font-semibold
          rounded-2xl text-white

          bg-gradient-to-r from-cyan-500 to-blue-600
          hover:from-blue-600 hover:to-cyan-500

          shadow-md
          transition-all duration-300
        "
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
