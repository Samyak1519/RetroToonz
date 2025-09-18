// src/Components/Header.jsx

import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [clickTimer, setClickTimer] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isWatchlistActive = location.pathname === "/watchlist";

  // Scroll Hide Header + lastScrollY tracking
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowHeader(currentY < 50 || currentY < lastScrollY);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Easter Egg & Home Redirect logic
  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);

    if (clickTimer) clearTimeout(clickTimer);
    setClickTimer(
      setTimeout(() => {
        setLogoClickCount(0);
      }, 5000)
    );

    if (newCount === 13) {
      setShowEasterEgg(true);
      setLogoClickCount(0);
      setTimeout(() => setShowEasterEgg(false), 5000);
    } else if (newCount === 1) {
      navigate("/");
    }
  };

  const closeEasterEgg = () => setShowEasterEgg(false);

  const headerHeightClass = "h-16";

  return (
    <>
      <header
        className={`fixed w-full top-0 left-0 z-50 ${headerHeightClass} pointer-events-auto transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"
          }`}
        aria-label="Main header"
      >
        {/* Gradient background layer (fades in/out via opacity) */}
        <div
          className="absolute inset-0 transition-opacity duration-400 pointer-events-none"
          style={{
            opacity: lastScrollY > 0 ? 1 : 0,
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-black/80 to-gray-900/70 backdrop-blur-md backdrop-saturate-150 shadow-md" />
        </div>

        {/* Content */}
        <div className="relative z-20 flex items-center justify-between px-10 py-10 h-full text-white">
          {/* Logo with Easter Egg click */}
          <div
            onClick={handleLogoClick}
            className="text-4xl font-bold cursor-pointer select-none"
            role="button"
            aria-label="RetroToonz home"
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
          <div className="w-full sm:hidden px-4 pb-3 relative z-20 bg-transparent">
            <SearchBar />
          </div>
        )}
      </header>

      {/* Easter Egg Overlay */}
      {showEasterEgg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <img
            src="/Assets/easteregg.gif"
            alt="Easter Egg"
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
