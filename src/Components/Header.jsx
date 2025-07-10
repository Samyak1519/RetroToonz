import { useEffect, useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSearchMobile, setShowSearchMobile] = useState(false);

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
    <>
      <div
        className={`fixed w-full top-0 z-50 transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        } bg-gradient-to-r from-black/80 to-gray-900/70 backdrop-blur-md backdrop-saturate-150 shadow-md text-white`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          {/* Brand Logo */}
          <Link to="/" className="text-3xl font-bold cursor-pointer">
            RetroToonz
          </Link>

          {/* Search Bar - Desktop/Tablet */}
          <div className="hidden sm:flex flex-1 justify-center">
            <div className="mx-5 w-full max-w-xl">
              <SearchBar />
            </div>
          </div>

          {/* Right - Profile and Mobile Search */}
          <div className="flex items-center gap-3">
            <button
              className="sm:hidden text-white"
              onClick={() => setShowSearchMobile((prev) => !prev)}
              title="Search"
            >
              <FaSearch size={18} />
            </button>

            <Link
              to="/profile"
              className="flex items-center gap-2 p-2 px-3 rounded-full hover:bg-gray-700 cursor-pointer"
            >
              <FaUserCircle className="text-2xl sm:text-3xl" />
              <span className="text-sm sm:text-base font-semibold hidden lg:block">
                Samyak
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile SearchBar */}
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
