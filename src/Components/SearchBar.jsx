function SearchBar() {
  return (
    <div className="flex w-full">
      <input
        placeholder="Search your favourite cartoon here..."
        className="flex-grow border border-cyan-50 rounded-l-3xl p-2 bg-transparent text-white outline-none"
      />
      <button className="p-2 px-4 text-cyan-50 border border-l-0 border-cyan-50 rounded-r-3xl hover:bg-gray-700">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
