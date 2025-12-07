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
      className="relative flex w-full max-w-lg mx-auto"
    >
      {/* Lucide Icon inside input */}
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 
                   text-cyan-400 
                   w-5 h-5 md:w-4 md:h-4
                   pointer-events-none"
      />

      {/* Input field */}
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search your favourite cartoon..."
        aria-label="Search cartoons"
        className="w-full rounded-3xl pl-10 pr-24 
                   py-2.5 md:py-1.5
                   text-sm md:text-base
                   bg-gray-900/70 border border-cyan-700 
                   text-white placeholder-cyan-400/70
                   outline-none transition-all duration-200
                   focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
                   hover:bg-gray-900"
      />

      {/* Gradient Search button */}
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 
                   px-4 py-1.5 md:py-1 
                   text-sm font-semibold
                   rounded-2xl text-white
                   bg-gradient-to-r from-cyan-500 to-blue-600
                   hover:from-blue-600 hover:to-cyan-500
                   shadow-md transition-all duration-300"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
