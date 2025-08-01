<<<<<<< HEAD
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
        className="flex-grow border placeholder-opacity-50 placeholder-cyan-500 pl-5 border-cyan-700 rounded-l-3xl p-3 bg-transparent text-white outline-none"
      />
      <button
        onClick={handleSearch}
        className="p-2 px-4 text-cyan-500 border border-l-0 border-cyan-700 rounded-r-3xl hover:bg-gray-700"
      >
=======
function SearchBar() {
  return (
    <div className="flex w-full">
      <input
        placeholder="Search your favourite cartoon here..."
        className="flex-grow border placeholder-opacity-50 placeholder-cyan-500 pl-5 border-cyan-700 rounded-l-3xl p-3 bg-transparent text-white outline-none"
      />
      <button className="p-2 px-4 text-cyan-500 border border-l-0 border-cyan-700 rounded-r-3xl hover:bg-gray-700">
>>>>>>> 3ea8f468a04a22cbae3c34b1da6d24830d81c8ba
        Search
      </button>
    </div>
  );
}

export default SearchBar;
