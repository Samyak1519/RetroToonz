import SearchBar from "./SearchBar";

function Header() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-gray-800 text-white">
      {/* Brand Logo */}
      <div
        id="brandLogo"
        className="text-3xl text-white font-bold cursor-pointer"
      >
        RetroToons
      </div>

      {/* Search Bar */}
      <div className="w-full sm:max-w-xl">
        <SearchBar />
      </div>

      {/* Profile Icon */}
      <div
        id="profileIcon"
        className="flex items-center gap-2 border border-cyan-200 p-2 px-4 rounded-full text-sm hover:bg-gray-700 cursor-pointer"
      >
        <div className="rounded-full border w-8 h-8 sm:w-10 sm:h-10"></div>
        <div className="text-sm sm:text-base font-semibold hidden sm:block">
          Samyak Nimsarkar
        </div>
      </div>
    </div>
  );
}

export default Header;
