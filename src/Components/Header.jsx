import { CircleStar } from 'lucide-react';
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  FaChevronDown,
  FaHeart,
  FaList,
  FaSearch,
  FaSignInAlt,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";


const PORTAL_ROOT_ID = "retrotoonz-profile-portal-root";

if (typeof window !== "undefined") {
  try {
    if (!document.getElementById(PORTAL_ROOT_ID)) {
      const root = document.createElement("div");
      root.id = PORTAL_ROOT_ID;
      document.body.appendChild(root);
    }
  } catch (err) {
    // ignore
  }
}

export default function Header() {
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0); // 🥚 Easter Egg click counter
  const [showEasterEgg, setShowEasterEgg] = useState(false); // modal

  const profileBtnRef = useRef(null);
  const firstItemRef = useRef(null);
  const [portalPos, setPortalPos] = useState({ top: 0, left: 0, caretLeft: 0 });

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  // Header bg on scroll
  useEffect(() => {
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
    setIsScrolled(window.scrollY > 0);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on outside click / Escape
  useEffect(() => {
    function onDocClick(e) {
      const btn = profileBtnRef.current;
      const portalRoot = document.getElementById(PORTAL_ROOT_ID);
      if (btn && btn.contains(e.target)) return;
      if (portalRoot && portalRoot.contains(e.target)) return;
      setProfileOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setProfileOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // position portal function
  const positionPortal = () => {
    const btn = profileBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const menuWidth = 224;
    const caretWidth = 12;
    const viewportW = window.innerWidth || document.documentElement.clientWidth;

    let left = rect.right - menuWidth;
    const minLeft = 8;
    const maxLeft = Math.max(minLeft, viewportW - menuWidth - 8);
    left = Math.min(Math.max(left, minLeft), maxLeft);

    const top = rect.bottom + 8 + window.scrollY;
    const btnCenter = rect.left + rect.width / 2;
    let caretLeft = btnCenter - left - caretWidth / 2;
    caretLeft = Math.max(12, Math.min(menuWidth - 12 - caretWidth, caretLeft));

    setPortalPos({ top, left, caretLeft });
  };

  useEffect(() => {
    if (profileOpen) {
      positionPortal();
      const t = setTimeout(() => firstItemRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [profileOpen]);

  useEffect(() => {
    function recalc() {
      if (profileOpen) positionPortal();
    }
    window.addEventListener("resize", recalc);
    window.addEventListener("scroll", recalc, { passive: true });
    return () => {
      window.removeEventListener("resize", recalc);
      window.removeEventListener("scroll", recalc);
    };
  }, [profileOpen]);

  useEffect(() => {
    setProfileOpen(false);
  }, [location.pathname]);

  const navigateAndClose = (path) => {
    setProfileOpen(false);
    navigate(path);
  };

  const headerHeightClasses = "h-16 sm:h-20";
  const spacerClasses = "h-16 sm:h-20";

  const portalRoot = typeof document !== "undefined" ? document.getElementById(PORTAL_ROOT_ID) : null;

  // 🥚 Easter Egg Trigger Logic
  useEffect(() => {
    if (clickCount === 13) {
      const event = new CustomEvent("retrotoonz:easteregg");
      window.dispatchEvent(event);
      setClickCount(0);
    }
  }, [clickCount]);

  // 🥚 Example listener for showing the Easter Egg overlay
  useEffect(() => {
    const onEasterEgg = () => setShowEasterEgg(true);
    window.addEventListener("retrotoonz:easteregg", onEasterEgg);
    return () => window.removeEventListener("retrotoonz:easteregg", onEasterEgg);
  }, []);

  return (
    <>
      <header
        className={`px-3 sm:px-7 fixed w-full top-0 left-0 z-50 ${headerHeightClasses}`}
        aria-label="Main header"
      >
        {/* background */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ease-out ${isScrolled ? "opacity-100" : "opacity-0"}`}
          aria-hidden="true"
        >
          <div className="w-full h-full bg-gradient-to-r from-black/80 to-gray-900/70 backdrop-blur-md shadow-md" />
        </div>

        {/* row */}
        <div className="relative z-20 flex items-center justify-between px-3 sm:px-7 pt-6 pb-5 sm:py-5 h-full text-white">
          {/* 🥚 Logo with Easter Egg Counter */}
          <div
            onClick={() => {
              setClickCount((prev) => prev + 1);
              navigate("/");
            }}
            className="text-3xl sm:text-3xl font-bold cursor-pointer select-none"
            role="button"
            aria-label="RetroToonz home"
          >
            RetroToonz
          </div>

          <div className="hidden sm:flex flex-1 justify-center">
            <div className="mx-3 w-full max-w-lg" aria-hidden="true" />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search desktop */}
            <button
              onClick={() => {
                setSearchOpen((s) => !s);
                setShowSearchMobile(false);
              }}
              title="Search"
              aria-expanded={searchOpen}
              className={`hidden sm:inline-flex items-center justify-center w-11 h-11 rounded-full transition ${isScrolled
                ? "hover:bg-gray-700"
                : "bg-white/20 hover:bg-black/10 ring-1 ring-white/10"
                }`}
            >
              <FaSearch size={16} />
            </button>

            {/* Search mobile */}
            <button
              onClick={() => {
                setShowSearchMobile((prev) => !prev);
                setSearchOpen(false);
              }}
              title="Search"
              className={`sm:hidden inline-flex items-center justify-center w-11 h-11 rounded-full transition ${isScrolled
                ? "hover:bg-gray-700"
                : "bg-white/20 hover:bg-black/10 ring-1 ring-white/10"
                }`}
            >
              <FaSearch size={16} />
            </button>

            {/* Profile */}
            <button
              ref={profileBtnRef}
              onClick={() => setProfileOpen((p) => !p)}
              aria-haspopup="menu"
              aria-expanded={profileOpen}
              title="Profile"
              aria-label="Open profile menu"
              className={`inline-flex items-center gap-2 h-11 rounded-full px-3 transition ${isScrolled
                ? "hover:bg-gray-700"
                : "bg-white/20 hover:bg-black/10 ring-1 ring-white/10"
                }`}
            >
              <FaUserCircle size={20} />
              <span className="hidden lg:block font-semibold text-sm sm:text-base">Samyak</span>
              <FaChevronDown
                size={12}
                aria-hidden="true"
                className={`block transform transition-transform duration-200 ${profileOpen ? "rotate-180" : "rotate-0"
                  }`}
              />
            </button>
          </div>
        </div>

        {/* desktop search overlay */}
        {searchOpen && (
          <div className="hidden sm:flex absolute inset-0 z-40 pointer-events-none">
            <div className="w-full flex items-center justify-center mt-3">
              <div className="pointer-events-auto w-full max-w-2xl px-4">
                <SearchBar />
              </div>
            </div>
          </div>
        )}

        {/* mobile expanded search */}
        {showSearchMobile && (
          <div className="w-full sm:hidden px-3 mt-1.5 pb-3 relative z-20">
            <SearchBar />
          </div>
        )}
      </header>

      {!isHome && <div className={spacerClasses} aria-hidden="true" />}

      {profileOpen &&
        portalRoot &&
        createPortal(
          <div
            id="retrotoonz-profile-portal"
            style={{
              position: "absolute",
              top: `${portalPos.top}px`,
              left: `${portalPos.left}px`,
              zIndex: 9999,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -8,
                left: portalPos.caretLeft,
                width: 16,
                height: 16,
                transform: "rotate(45deg)",
                background:
                  "linear-gradient(135deg, rgba(0,0,0,0.7), rgba(17,24,39,0.7))",
                borderLeft: "1px solid rgba(255,255,255,0.1)",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 2,
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
              }}
            />
            <div
              role="menu"
              aria-label="Profile menu"
              className="w-56 rounded-2xl bg-gradient-to-b from-black/40 to-black/70 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden transform origin-top-right"
              style={{
                animation: "rtFadeInScale 200ms cubic-bezier(.2,.9,.2,1) forwards",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <MenuItems
                firstItemRef={firstItemRef}
                onNavigate={navigateAndClose}
                onClose={() => setProfileOpen(false)}
              />
            </div>
          </div>,
          portalRoot
        )}

      {/* 🥚 Easter Egg Overlay */}
      {showEasterEgg && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowEasterEgg(false)}
        >
          <img
            src="/media/extras/easter-egg.gif"
            alt="Easter Egg"
            className="max-w-xs sm:max-w-md rounded-2xl shadow-2xl border border-white/10"
          />
        </div>
      )}

      <style>{`
        @keyframes rtFadeInScale {
          0% { opacity: 0; transform: translateY(-8px) scale(.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}

function MenuItems({ firstItemRef, onNavigate }) {
  const location = useLocation();
  const activePath = location.pathname;
  const isActive = (path) => activePath === path;

  const itemBase =
    "flex items-center gap-3 px-5 py-3 text-sm sm:text-base transition focus:outline-none hover:bg-white/10 focus:bg-white/10 text-white";

  return (
    <div className="py-2">
      <button
        ref={firstItemRef}
        onClick={() => onNavigate("/profile")}
        role="menuitem"
        className={`${itemBase} ${isActive("/profile") ? "bg-white/10" : ""} w-full text-left`}
      >
        <FaUser className="text-cyan-300" />
        <span>My Account</span>
      </button>

      <button
        onClick={() => onNavigate("/all-shows")}
        role="menuitem"
        className={`${itemBase} ${isActive("/all-shows") ? "bg-white/10" : ""} w-full text-left`}
      >
        <FaList className="text-cyan-300" />
        <span>All Shows</span>
      </button>

      <button
        onClick={() => onNavigate("/watchlist")}
        role="menuitem"
        className={`${itemBase} ${isActive("/watchlist") ? "bg-white/10" : ""} w-full text-left`}
      >
        <FaHeart className="text-cyan-300" />
        <span>Wishlist</span>
      </button>


      <button
        onClick={() => onNavigate("/about-us")}
        role="menuitem"
        className={`${itemBase} ${isActive("/about-us") ? "bg-white/10" : ""} w-full text-left`}
      >
        <CircleStar className="text-cyan-300" />
        <span>About Us</span>
      </button>

      <div className="h-px bg-white/10 my-1" />

      <button
        role="menuitem"
        className={itemBase + " w-full text-left"}
        onClick={() => onNavigate("/login")}
      >
        <FaSignInAlt className="text-cyan-300" />
        <span>Sign In</span>
      </button>
    </div>
  );
}
