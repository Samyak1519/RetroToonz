import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const location = useLocation();
  const isWatchlistActive = location.pathname === "/watchlist";

  // Scroll Hide Header
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowHeader(currentY < 50 || currentY < lastScrollY);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Easter Egg logic
  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    if (newCount === 13) {
      setShowEasterEgg(true);
      setLogoClickCount(0);
      setTimeout(() => {
        setShowEasterEgg(false);
      }, 5000); // auto-hide after 5s
    } else {
      setLogoClickCount(newCount);
    }
  };

  const closeEasterEgg = () => {
    setShowEasterEgg(false);
  };

  return (
    <>
      {/* Header Bar */}
      <div
        className={`fixed w-full top-0 z-50 transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        } bg-gradient-to-r from-black/80 to-gray-900/70 backdrop-blur-md backdrop-saturate-150 shadow-md text-white`}
      >
        <div className="flex items-center justify-between px-5 py-3 cursor-pointer">
          {/* Logo with easter egg click */}
          <div
            onClick={handleLogoClick}
            className="text-3xl font-bold cursor-pointer"
          >
            RetroToonz
          </div>

          {/* Desktop Search */}
          <div className="hidden sm:flex flex-1 justify-center">
            <div className="mx-5 w-full max-w-xl">
              <SearchBar />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Search */}
            <button
              onClick={() => setShowSearchMobile((prev) => !prev)}
              title="Search"
              className="text-white p-2 rounded-full hover:bg-gray-700 transition sm:hidden"
            >
              <FiSearch size={20} />
            </button>

            {/* Watchlist Icon */}
            <Link
              to="/watchlist"
              title="Watchlist"
              className="text-white hover:text-cyan-400"
            >
              {isWatchlistActive ? (
                <FaHeart size={20} className="text-cyan-400" />
              ) : (
                <FaRegHeart size={20} />
              )}
            </Link>

            {/* Profile */}
            <Link
              to="/profile"
              title="Profile"
              className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-700 transition"
            >
              <FaUserCircle size={24} />
              <span className="hidden lg:block font-semibold text-sm sm:text-base">
                Samyak
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Search Expanded */}
        {showSearchMobile && (
          <div className="w-full sm:hidden px-4 pb-3">
            <SearchBar />
          </div>
        )}
      </div>

      {/* Easter Egg Overlay */}
      {showEasterEgg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <img
            src="/Assets/easteregg.gif"
            alt="Easter Egg Chicken"
            className="w-[90%] max-w-md rounded-xl shadow-lg"
          />
          <button
            onClick={closeEasterEgg}
            className="absolute top-4 right-4 bg-white/10 text-white hover:bg-white/20 px-4 py-1 rounded-full text-sm font-semibold"
          >
            ✖
          </button>
        </div>
      )}
    </>
  );
}

export default Header;
