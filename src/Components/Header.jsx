import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom"; // ✅ import useLocation
import SearchBar from "./SearchBar";

function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSearchMobile, setShowSearchMobile] = useState(false);

  const location = useLocation(); // ✅ Get current location
  const isWatchlistActive = location.pathname === "/watchlist"; // ✅ Check if watchlist page

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowHeader(currentY < 50 || currentY < lastScrollY);
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div
        className={`fixed w-full top-0 z-50 transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        } bg-gradient-to-r from-black/80 to-gray-900/70 backdrop-blur-md backdrop-saturate-150 shadow-md text-white`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold">
            RetroToonz
          </Link>

          {/* Desktop Search */}
          <div className="hidden sm:flex flex-1 justify-center">
            <div className="mx-5 w-full max-w-xl">
              <SearchBar />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Icon - Mobile */}
            <button
              onClick={() => setShowSearchMobile((prev) => !prev)}
              title="Search"
              className="text-white p-2 rounded-full hover:bg-gray-700 transition sm:hidden"
            >
              <FiSearch size={20} />
            </button>

            {/* ✅ Watchlist Icon */}
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

            {/* Profile Icon */}
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

        {/* SearchBar for Mobile */}
        {showSearchMobile && (
          <div className="w-full sm:hidden px-4 pb-3">
            <SearchBar />
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
