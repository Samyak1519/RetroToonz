import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="flex w-full">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search your favourite cartoon here..."
        className="flex-grow border placeholder-opacity-50 placeholder-cyan-500 pl-3.5 border-cyan-700 rounded-l-3xl p-2 bg-transparent text-white outline-none"
      />
      <button
        onClick={handleSearch}
        className="p-2 px-3 text-cyan-500 border border-l-0 border-cyan-700 rounded-r-3xl hover:bg-gray-700"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
