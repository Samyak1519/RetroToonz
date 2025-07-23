function SearchBar() {
  return (
    <div className="flex w-full">
      <input
        placeholder="Search your favourite cartoon here..."
        className="flex-grow border placeholder-opacity-50 placeholder-cyan-500 pl-5 border-cyan-700 rounded-l-3xl p-3 bg-transparent text-white outline-none"
      />
      <button className="p-2 px-4 text-cyan-500 border border-l-0 border-cyan-700 rounded-r-3xl hover:bg-gray-700">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
