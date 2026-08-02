// src/layout/Header.jsx

import {
  ArrowDown01Icon,
  Cancel01Icon,
  FavouriteIcon,
  Login01Icon,
  Menu01Icon,
  Search01Icon,
  StarIcon,
  UserCircleIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../common/SearchBar.jsx";

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
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

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
      if (e.key === "Escape") {
        setProfileOpen(false);
        setSearchOpen(false);
        setShowEasterEgg(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

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
    setSearchOpen(false);
  }, [location.pathname]);

  const navigateAndClose = (path) => {
    setProfileOpen(false);
    setSearchOpen(false);
    navigate(path);
  };

  const headerHeightClasses = "h-16";
  const spacerClasses = "h-16";

  const portalRoot =
    typeof document !== "undefined"
      ? document.getElementById(PORTAL_ROOT_ID)
      : null;

  useEffect(() => {
    if (clickCount === 13) {
      const event = new CustomEvent("retrotoonz:easteregg");
      window.dispatchEvent(event);
      setClickCount(0);
    }
  }, [clickCount]);

  useEffect(() => {
    const onEasterEgg = () => setShowEasterEgg(true);
    window.addEventListener("retrotoonz:easteregg", onEasterEgg);
    return () =>
      window.removeEventListener("retrotoonz:easteregg", onEasterEgg);
  }, []);

  return (
    <>
      <header
        className={`fixed w-full top-0 left-0 z-100 ${headerHeightClasses}`}
        aria-label="Main header"
      >
        {/* background */}
        <div
          className={`
    absolute inset-0
    transition-opacity duration-300
    ${isScrolled ? "opacity-100" : "opacity-0"}
  `}
          aria-hidden="true"
        >
          <div className="h-full w-full bg-[#070318]/85 backdrop-blur-md border-b border-white/5" />
        </div>

        {/* row */}
        <div
          className="relative z-20 flex items-center justify-between px-4 sm:px-6 lg:px-10 text-white"
          style={{
            height: "calc(64px + env(safe-area-inset-top, 0px))",
            paddingTop: "env(safe-area-inset-top, 0px)",
          }}
        >
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <div
              role="button"
              aria-label="RetroToonz home"
              onClick={() => {
                if (typeof setClickCount === "function") {
                  setClickCount((prev) => prev + 1);
                }
                navigate("/");
              }}
              className="text-display font-royal font-bold cursor-pointer select-none text-white/80 scale-95 transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#8f84c0] hover:via-[#eba550] hover:to-[#b7ce88]"
            >
              RetroToonz
            </div>
          </div>

          {/* Desktop Inline Search (Conditional Toggle) */}
          <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4 ml-4">
            {searchOpen && (
              <div className="hidden sm:block w-full max-w-md animate-in fade-in slide-in-from-right-4 duration-300 mr-4">
                <SearchBar />
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {/* Search Icon (Toggles Desktop Search or Mobile Overlay) */}
            <button
              onClick={() => {
                if (window.innerWidth >= 640) {
                  setSearchOpen((prev) => !prev);
                } else {
                  setShowSearchMobile((prev) => !prev);
                }
              }}
              title="Search"
              className={`inline-flex items-center justify-center w-10 h-10 rounded-full transition ${
                isScrolled
                  ? "hover:bg-gray-700"
                  : "bg-black/20 backdrop-blur-lg hover:bg-black/50 ring-1 ring-white/10"
              } ${searchOpen ? "bg-white/20" : ""}`}
            >
              <HugeiconsIcon
                icon={searchOpen ? Cancel01Icon : Search01Icon}
                size={18}
              />
            </button>

            {/* Profile */}
            <button
              ref={profileBtnRef}
              onClick={() => setProfileOpen((p) => !p)}
              className={`inline-flex items-center gap-2 h-10 rounded-full px-3.5 transition ${
                isScrolled
                  ? "hover:bg-gray-700"
                  : "bg-black/20 backdrop-blur-lg hover:bg-black/50 ring-1 ring-white/10"
              }`}
            >
              <HugeiconsIcon icon={UserCircleIcon} size={20} />
              <span className="hidden lg:block text-label text-white/90">
                Samyak
              </span>
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={12}
                className={`transform transition-transform duration-200 ${profileOpen ? "rotate-180" : "rotate-0"}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile expanded search */}
        {showSearchMobile && (
          <div className="w-full sm:hidden px-3 pt-1 pb-3 relative z-20">
            <SearchBar />
          </div>
        )}
      </header>

      {!isHome && <div className={spacerClasses} aria-hidden="true" />}

      {/* Profile Menu Portal */}
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
              }}
            />
            <div
              role="menu"
              className="w-56 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden transform origin-top-right"
              style={{
                animation:
                  "rtFadeInScale 200ms cubic-bezier(.2,.9,.2,1) forwards",
              }}
            >
              <MenuItems
                firstItemRef={firstItemRef}
                onNavigate={navigateAndClose}
              />
            </div>
          </div>,
          portalRoot,
        )}

      {/* Easter Egg Overlay */}
      {showEasterEgg && (
        <div
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={() => setShowEasterEgg(false)}
        >
          <button
            onClick={() => setShowEasterEgg(false)}
            className="absolute top-6 right-6 bg-white/10 hover:bg-red-500 text-white p-3 rounded-full"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={28} />
          </button>
          <img
            src="/media/extras/easter-egg.gif"
            alt="Easter Egg"
            className="max-w-[85vw] max-h-[75vh] object-contain"
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
  const isActive = (path) => location.pathname === path;
  const itemBase =
    "flex items-center gap-3 px-5 py-3 text-label transition hover:bg-white/10 text-white w-full text-left";

  return (
    <div className="py-2">
      {/* ADMIN PROFILE */}
      <button
        onClick={() => onNavigate("/admin-profile")}
        className={`${itemBase} ${
          isActive("/admin-profile") ? "bg-white/10" : ""
        }`}
      >
        <HugeiconsIcon
          icon={UserCircleIcon}
          className="text-yellow-300"
          size={18}
        />
        <span>Admin Profile</span>
      </button>
      <button
        ref={firstItemRef}
        onClick={() => onNavigate("/profile")}
        className={`${itemBase} ${isActive("/profile") ? "bg-white/10" : ""}`}
      >
        <HugeiconsIcon icon={UserIcon} className="text-cyan-300" size={18} />
        <span>My Account</span>
      </button>
      <button
        onClick={() => onNavigate("/all-shows")}
        className={`${itemBase} ${isActive("/all-shows") ? "bg-white/10" : ""}`}
      >
        <HugeiconsIcon icon={Menu01Icon} className="text-cyan-300" size={18} />
        <span>All Shows</span>
      </button>
      <button
        onClick={() => onNavigate("/watchlist")}
        className={`${itemBase} ${isActive("/watchlist") ? "bg-white/10" : ""}`}
      >
        <HugeiconsIcon
          icon={FavouriteIcon}
          className="text-cyan-300"
          size={18}
        />
        <span>Wishlist</span>
      </button>
      <button
        onClick={() => onNavigate("/about-us")}
        className={`${itemBase} ${isActive("/about-us") ? "bg-white/10" : ""}`}
      >
        <HugeiconsIcon icon={StarIcon} className="text-cyan-300" size={18} />
        <span>About Us</span>
      </button>
      <div className="h-px bg-white/10 my-2" />
      <button onClick={() => onNavigate("/login")} className={itemBase}>
        <HugeiconsIcon icon={Login01Icon} className="text-cyan-300" size={18} />
        <span>Sign In</span>
      </button>
    </div>
  );
}
