import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  FaChevronDown,
  FaHeart,
  FaList,
  FaSearch,
  FaSignInAlt,
  FaUserCircle,
  FaTimes, // ✅ added cross icon
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
  } catch {
    /* ignore */
  }
}

export default function Header() {
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const profileBtnRef = useRef(null);
  const firstItemRef = useRef(null);
  const [portalPos, setPortalPos] = useState({ top: 0, left: 0, caretLeft: 0 });

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  // Sticky header background
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    setIsScrolled(window.scrollY > 0);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Outside click / Escape closes profile
  useEffect(() => {
    const onDocClick = (e) => {
      const btn = profileBtnRef.current;
      const portalRoot = document.getElementById(PORTAL_ROOT_ID);
      if (btn?.contains(e.target)) return;
      if (portalRoot?.contains(e.target)) return;
      setProfileOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setProfileOpen(false);
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Position profile portal
  const positionPortal = () => {
    const btn = profileBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const menuWidth = 224;
    const caretWidth = 12;
    const viewportW = window.innerWidth;

    let left = rect.right - menuWidth;
    left = Math.min(Math.max(left, 8), viewportW - menuWidth - 8);
    const top = rect.bottom + 8 + window.scrollY;
    const btnCenter = rect.left + rect.width / 2;
    let caretLeft = btnCenter - left - caretWidth / 2;
    caretLeft = Math.max(12, Math.min(menuWidth - 24, caretLeft));

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
    const recalc = () => profileOpen && positionPortal();
    window.addEventListener("resize", recalc);
    window.addEventListener("scroll", recalc, { passive: true });
    return () => {
      window.removeEventListener("resize", recalc);
      window.removeEventListener("scroll", recalc);
    };
  }, [profileOpen]);

  useEffect(() => setProfileOpen(false), [location.pathname]);

  const navigateAndClose = (path) => {
    setProfileOpen(false);
    navigate(path);
  };

  // Easter Egg trigger
  useEffect(() => {
    if (clickCount === 13) {
      window.dispatchEvent(new CustomEvent("retrotoonz:easteregg"));
      setClickCount(0);
    }
  }, [clickCount]);

  useEffect(() => {
    const onEasterEgg = () => setShowEasterEgg(true);
    window.addEventListener("retrotoonz:easteregg", onEasterEgg);
    return () => window.removeEventListener("retrotoonz:easteregg", onEasterEgg);
  }, []);

  const portalRoot =
    typeof document !== "undefined"
      ? document.getElementById(PORTAL_ROOT_ID)
      : null;

  const headerHeightClasses = "h-16 sm:h-20";
  const spacerClasses = "h-16 sm:h-20";

  return (
    <>
      <header
        className={`px-3 sm:px-7 fixed w-full top-0 left-0 z-50 ${headerHeightClasses}`}
      >
        <div
          className={`absolute inset-0 transition-opacity duration-500 ease-out ${isScrolled ? "opacity-100" : "opacity-0"
            }`}
        >
          <div className="w-full h-full bg-gradient-to-r from-black/80 to-gray-900/70 backdrop-blur-md shadow-md" />
        </div>

        {/* main row */}
        <div className="relative z-20 flex items-center justify-between px-3 sm:px-7 pt-6 pb-5 sm:py-5 h-full text-white">
          <div
            onClick={() => {
              setClickCount((p) => p + 1);
              navigate("/");
            }}
            className="text-3xl font-bold cursor-pointer select-none"
          >
            RetroToonz
          </div>

          {/* Search + Profile */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search desktop */}
            {!searchOpen && (
              <button
                onClick={() => {
                  setSearchOpen(true);
                  setShowSearchMobile(false);
                }}
                className={`hidden sm:inline-flex items-center justify-center w-11 h-11 rounded-full transition ${isScrolled
                    ? "hover:bg-gray-700"
                    : "bg-white/20 hover:bg-black/10 ring-1 ring-white/10"
                  }`}
              >
                <FaSearch size={16} />
              </button>
            )}

            {/* Search mobile */}
            {!showSearchMobile && (
              <button
                onClick={() => {
                  setShowSearchMobile(true);
                  setSearchOpen(false);
                }}
                className={`sm:hidden inline-flex items-center justify-center w-11 h-11 rounded-full transition ${isScrolled
                    ? "hover:bg-gray-700"
                    : "bg-white/20 hover:bg-black/10 ring-1 ring-white/10"
                  }`}
              >
                <FaSearch size={16} />
              </button>
            )}

            {/* Profile */}
            <button
              ref={profileBtnRef}
              onClick={() => setProfileOpen((p) => !p)}
              className={`inline-flex items-center gap-2 h-11 rounded-full px-3 transition ${isScrolled
                  ? "hover:bg-gray-700"
                  : "bg-white/20 hover:bg-black/10 ring-1 ring-white/10"
                }`}
            >
              <FaUserCircle size={20} />
              <span className="hidden lg:block font-semibold text-sm sm:text-base">
                Samyak
              </span>
              <FaChevronDown
                size={12}
                className={`transition-transform ${profileOpen ? "rotate-180" : "rotate-0"
                  }`}
              />
            </button>
          </div>
        </div>

        {/* Desktop search overlay */}
        {searchOpen && (
          <div className="hidden sm:flex absolute inset-0 z-40 items-center justify-center mt-3">
            <div className="w-full max-w-2xl px-4 relative">
              <SearchBar />
              {/* ❌ Close button */}
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute -top-10 right-6 text-white hover:text-cyan-300 transition"
                title="Close search"
              >
                <FaTimes size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Mobile search */}
        {showSearchMobile && (
          <div className="w-full sm:hidden px-3 mt-1.5 pb-3 relative z-20">
            <div className="flex items-center justify-between">
              <SearchBar />
              {/* ❌ Close button */}
              <button
                onClick={() => setShowSearchMobile(false)}
                className="ml-3 text-white hover:text-cyan-300 transition"
                title="Close search"
              >
                <FaTimes size={20} />
              </button>
            </div>
          </div>
        )}
      </header>

      {!isHome && <div className={spacerClasses} />}

      {/* Profile portal */}
      {profileOpen &&
        portalRoot &&
        createPortal(
          <div
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
              }}
            />
            <div className="w-56 rounded-2xl bg-gradient-to-b from-black/40 to-black/70 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden">
              <MenuItems
                firstItemRef={firstItemRef}
                onNavigate={navigateAndClose}
              />
            </div>
          </div>,
          portalRoot
        )}

      {/* Easter egg overlay */}
      {showEasterEgg && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowEasterEgg(false)}
        >
          <img
            src="/media/extras/easter-egg.gif"
            alt="Easter Egg"
            className="max-w-xs sm:max-w-md rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </>
  );
}

function MenuItems({ firstItemRef, onNavigate }) {
  const location = useLocation();
  const activePath = location.pathname;
  const isActive = (path) => activePath === path;
  const itemBase =
    "flex items-center gap-3 px-5 py-3 text-sm sm:text-base transition hover:bg-white/10 text-white";

  return (
    <div className="py-2">
      <button
        ref={firstItemRef}
        onClick={() => onNavigate("/profile")}
        className={`${itemBase} ${isActive("/profile") ? "bg-white/10" : ""}`}
      >
        <FaUserCircle className="text-cyan-300" />
        <span>My Account</span>
      </button>

      <button
        onClick={() => onNavigate("/all-shows")}
        className={`${itemBase} ${isActive("/all-shows") ? "bg-white/10" : ""}`}
      >
        <FaList className="text-cyan-300" />
        <span>All Shows</span>
      </button>

      <button
        onClick={() => onNavigate("/watchlist")}
        className={`${itemBase} ${isActive("/watchlist") ? "bg-white/10" : ""}`}
      >
        <FaHeart className="text-cyan-300" />
        <span>Wishlist</span>
      </button>

      <div className="h-px bg-white/10 my-1" />

      <button
        onClick={() => onNavigate("/login")}
        className={itemBase}
      >
        <FaSignInAlt className="text-cyan-300" />
        <span>Sign In</span>
      </button>
    </div>
  );
}
