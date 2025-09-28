// src/Components/Header.jsx
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

function Header() {
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [clickTimer, setClickTimer] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isWatchlistActive = location.pathname === "/watchlist";
  const isHome = location.pathname === "/";

  useEffect(() => {
    // throttle-ish scroll handler using requestAnimationFrame for smoothness
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // set initial state (in case page loads scrolled)
    setIsScrolled(window.scrollY > 0);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const headerHeightClasses = "h-16 sm:h-20";
  const spacerClasses = "h-16 sm:h-20";

  return (
    <>
      <header
        className={`px-3 sm:px-7 fixed w-full top-0 left-0 z-50 ${headerHeightClasses} pointer-events-auto`}
        aria-label="Main header"
      >
        {/* Background: transparent at top, blurred gradient when scrolled.
            Smooth transitions: opacity + subtle transform on inner content for polish. */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ease-out pointer-events-none ${isScrolled ? "opacity-100" : "opacity-0"}`}
          aria-hidden="true"
        >
          <div
            className="w-full h-full bg-gradient-to-r from-black/80 to-gray-900/70 backdrop-blur-md backdrop-saturate-150 shadow-md transition-all duration-500 ease-out"
          />
        </div>

        {/* Content row - apply a tiny translate on scroll to emphasize transition */}
        <div
          className={`relative z-20 flex items-center justify-between px-3 sm:px-7 pt-6 pb-5 sm:py-5 h-full text-white transition-transform duration-400 ease-out ${isScrolled ? "translate-y-0" : "translate-y-0"}`}
        >
          {/* Logo */}
          <div
            onClick={handleLogoClick}
            className="text-3xl sm:text-3xl font-bold cursor-pointer select-none"
            role="button"
            aria-label="RetroToonz home"
          >
            RetroToonz
          </div>

          {/* Center placeholder (keeps layout centered) */}
          <div className="hidden sm:flex flex-1 justify-center">
            <div className="mx-3 w-full max-w-lg" aria-hidden="true" />
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop search icon */}
            <button
              onClick={() => {
                setSearchOpen((s) => !s);
                setShowSearchMobile(false);
              }}
              title="Search"
              aria-expanded={searchOpen}
              className={`hidden sm:inline-flex items-center justify-center w-11 h-11 rounded-full transition ${isScrolled ? "hover:bg-gray-700" : "bg-white/20 hover:bg-black/10 ring-1 ring-white/10"}`}
            >
              <FiSearch size={18} />
            </button>

            {/* Mobile search icon */}
            <button
              onClick={() => {
                setShowSearchMobile((prev) => !prev);
                setSearchOpen(false);
              }}
              title="Search"
              className={`sm:hidden inline-flex items-center justify-center w-11 h-11 rounded-full transition ${isScrolled ? "hover:bg-gray-700" : "bg-white/20 hover:bg-black/10 ring-1 ring-white/10"}`}
            >
              <FiSearch size={18} />
            </button>

            {/* Watchlist */}
            <Link
              to="/watchlist"
              title="Watchlist"
              className={`inline-flex items-center justify-center w-11 h-11 rounded-full transition ${isScrolled ? "hover:bg-gray-700" : "bg-white/20 hover:bg-black/10 ring-1 ring-white/10"}`}
            >
              {isWatchlistActive ? (
                <FaHeart size={18} className="text-cyan-400" />
              ) : (
                <FaRegHeart size={18} />
              )}
            </Link>

            {/* Profile (pill) */}
            <Link
              to="/profile"
              title="Profile"
              className={`inline-flex items-center gap-2 h-11 rounded-full px-3 transition ${isScrolled ? "hover:bg-gray-700" : "bg-white/20 hover:bg-black/10 ring-1 ring-white/10"}`}
            >
              <FaUserCircle size={20} />
              <span className="hidden lg:block font-semibold text-sm sm:text-base">
                Samyak
              </span>
            </Link>
          </div>
        </div>

        {/* Desktop overlayed search */}
        {searchOpen && (
          <div className="hidden sm:flex absolute inset-0 z-40 pointer-events-none">
            <div className="w-full flex items-center justify-center mt-3">
              <div className="pointer-events-auto w-full max-w-2xl px-4 transition ease-out duration-200 transform scale-100 opacity-100">
                <div className="bg-transparent rounded-full p-1">
                  <SearchBar />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile expanded search */}
        {showSearchMobile && (
          <div className="w-full sm:hidden px-3 mt-1.5 sm:mt-0 pb-3 relative z-20 bg-transparent">
            <SearchBar />
          </div>
        )}
      </header>

      {/* spacer to push content below fixed header (only when not on home) */}
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
