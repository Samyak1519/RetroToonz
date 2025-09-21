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

  // whether we're on the homepage (exact path '/')
  const isHome = location.pathname === "/";

  // Scroll Hide Header + track last scroll position
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowHeader(currentY < 50 || currentY < lastScrollY);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Easter Egg + logo redirect
  const handleLogoClick = () => {
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);

    if (clickTimer) clearTimeout(clickTimer);
    setClickTimer(setTimeout(() => setLogoClickCount(0), 5000));

    if (newCount === 13) {
      setShowEasterEgg(true);
      setLogoClickCount(0);
      setTimeout(() => setShowEasterEgg(false), 5000);
    } else if (newCount === 1) {
      navigate("/");
    }
  };

  const closeEasterEgg = () => setShowEasterEgg(false);

  // Taller on mobile for breathing space
  const headerHeightClasses = "h-14 sm:h-16";
  // Useful: corresponding spacer classes to push content down (same sizes)
  const spacerClasses = "h-14 sm:h-16";

  return (
    <>
      {/* Header wrapper (fixed) */}
      <header
        className={`fixed w-full top-0 left-0 z-50 ${headerHeightClasses} pointer-events-auto transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"
          }`}
        aria-label="Main header"
      >
        {/* Gradient bg fades in on scroll */}
        <div
          className="absolute inset-0 transition-opacity duration-400 pointer-events-none"
          style={{ opacity: lastScrollY > 0 ? 1 : 0 }}
        >
          <div className="w-full h-full bg-gradient-to-r from-black/80 to-gray-900/70 backdrop-blur-md backdrop-saturate-150 shadow-md" />
        </div>

        {/* Content row */}
        <div className="relative z-20 flex items-center justify-between px-5 sm:px-7 py-4 sm:py-4 h-full text-white">
          {/* Logo */}
          <div
            onClick={handleLogoClick}
            className="text-3xl sm:text-3xl font-bold cursor-pointer select-none"
            role="button"
            aria-label="RetroToonz home"
          >
            RetroToonz
          </div>

          {/* Desktop search bar */}
          <div className="hidden sm:flex flex-1 justify-center">
            <div className="mx-3 w-full max-w-lg">
              <SearchBar />
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile search toggle */}
            <button
              onClick={() => setShowSearchMobile((prev) => !prev)}
              title="Search"
              className="text-white p-2 rounded-full hover:bg-gray-700 transition sm:hidden"
            >
              <FiSearch size={18} />
            </button>

            {/* Watchlist */}
            <Link
              to="/watchlist"
              title="Watchlist"
              className="text-white hover:text-cyan-400"
            >
              {isWatchlistActive ? (
                <FaHeart size={18} className="text-cyan-400" />
              ) : (
                <FaRegHeart size={18} />
              )}
            </Link>

            {/* Profile */}
            <Link
              to="/profile"
              title="Profile"
              className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-700 transition"
            >
              <FaUserCircle size={22} />
              <span className="hidden lg:block font-semibold text-sm sm:text-base">
                Samyak
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile expanded search */}
        {showSearchMobile && (
          <div className="w-full sm:hidden px-4 pb-3 relative z-20 bg-transparent">
            <SearchBar />
          </div>
        )}
      </header>


      {!isHome && <div className={spacerClasses} aria-hidden="true" />}

      {/* Easter Egg */}
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
