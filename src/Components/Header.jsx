import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY < 50 || currentY < lastScrollY) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed w-full top-0 z-50 transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      } bg-gray-800/50 backdrop-blur-md backdrop-saturate-150 text-white`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 py-3">
        {/* Brand Logo */}
        <div
          id="brandLogo"
          className="text-3xl pl-5 text-white font-bold cursor-pointer"
        >
          RetroToonz
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
          <img className="rounded-full border w-8 h-8 sm:w-10 sm:h-10" />
          <div className="text-sm sm:text-base font-semibold hidden sm:block">
            Akshika Desai
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
