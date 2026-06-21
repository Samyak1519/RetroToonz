import {
  ArrowLeft01Icon,
  FavouriteIcon,
  FilterMailIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/layout/Footer.jsx";
import Header from "../../components/layout/Header.jsx";

import showsDataRaw from "../../data/Shows.json";

// --- Media Directories ---
const posterDesktopDir = "/media/posters-desktop";
const posterMobileDir = "/media/posters-mobile";
const extrasDir = "/media/extras";

// --- Data Normalization ---
const normalizePosterPath = (value, preferMobile = false) => {
  if (!value) return null;
  if (typeof value === "string" && value.startsWith("/media/")) return value;
  const cleaned = value.replace(/^\/+/, "");
  const parts = cleaned.split("/");
  const fileName = parts[parts.length - 1];
  const targetDir = preferMobile ? posterMobileDir : posterDesktopDir;
  return `${targetDir}/${fileName}`;
};

const normalizeShows = (arr) =>
  (arr || []).map((s) => {
    const desktopThumb = s.thumbnail
      ? s.thumbnail.startsWith("/media/")
        ? s.thumbnail
        : normalizePosterPath(s.thumbnail, false)
      : null;

    let mobileThumb = null;
    if (s.thumbnailMobile) {
      mobileThumb = s.thumbnailMobile.startsWith("/media/")
        ? s.thumbnailMobile
        : normalizePosterPath(s.thumbnailMobile, true);
    } else if (desktopThumb) {
      const filename = desktopThumb.split("/").pop();
      mobileThumb = `${posterMobileDir}/${filename}`;
    }

    return {
      ...s,
      title: s.title || "Untitled",
      thumbnail: desktopThumb || `${extrasDir}/default.jpg`,
      thumbnailMobile: mobileThumb || `${extrasDir}/default.jpg`,
    };
  });

const allShows = normalizeShows(showsDataRaw.allShows || []);

function firstLetterKey(title) {
  if (!title) return "#";
  const ch = title.trim().charAt(0).toUpperCase();
  return /[A-Z]/.test(ch) ? ch : "#";
}

/* ---------------- CARD COMPONENT ---------------- */
function Card({ show, navigate }) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const handleWatchlist = (e) => {
    e.stopPropagation();
    setIsInWatchlist((prev) => !prev);
  };

  return (
    <div
      onClick={() => navigate(`/show/${show.id}`)}
      className="relative cursor-pointer
           bg-white/5 p-1 sm:p-2 rounded-2xl
                 border border-white/10 
                 overflow-hidden
                 transition-all duration-200

                 hover:border-sky-400/60
                 hover:ring-1 hover:ring-sky-300/60
                 hover:shadow-[0_12px_35px_rgba(0,0,0,0.6)]"
    >
      {/* WATCHLIST BUTTON */}
      <button
        onClick={handleWatchlist}
        className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center 
                   rounded-full 
                   bg-gradient-to-b from-white/20 to-white/5 
                   bg-black/50 backdrop-blur-lg backdrop-saturate-150
                   border border-white/10 
                   shadow-[0_6px_24px_rgba(0,0,0,0.7)] 
                   text-white/70 hover:text-white 
                   hover:bg-black/60 hover:scale-110
                   transition-all duration-200"
      >
        <HugeiconsIcon
          icon={isInWatchlist ? Tick02Icon : FavouriteIcon}
          size={16}
        />
      </button>

      {/* IMAGE */}
      <div className="relative w-full aspect-[2/3] sm:aspect-video rounded-xl overflow-hidden group">
        <picture>
          {/* Mobile Poster */}
          <source media="(max-width: 640px)" srcSet={show.thumbnailMobile} />

          {/* Default (Desktop) */}
          <img
            src={show.thumbnail}
            alt={show.title}
            className="w-full h-full object-cover transition-transform "
          />
        </picture>
      </div>

      {/* CONTENT */}
      <div className="mt-1.5 sm:mt-2 px-1.5 sm:px-0">
        <h4 className="text-sm font-medium truncate">{show.title}</h4>

        {/* YEAR (instead of description) */}
        <p className="text-xs text-gray-400 mt-1">{show.year || "—"}</p>
      </div>
    </div>
  );
}

/* ---------------- PAGE ---------------- */
export default function AllShowsPage() {
  const navigate = useNavigate();
  const [activeTag, setActiveTag] = useState("All");
  const [sortBy, setSortBy] = useState("title-asc");
  const [sortOpen, setSortOpen] = useState(false);

  const tags = useMemo(() => {
    const s = new Set();
    allShows.forEach((sh) => {
      if (Array.isArray(sh.tags)) sh.tags.forEach((t) => s.add(t));
    });
    return ["All", ...Array.from(s).sort()];
  }, []);

  const filtered = useMemo(() => {
    const list = allShows.filter((show) => {
      if (
        activeTag !== "All" &&
        (!Array.isArray(show.tags) || !show.tags.includes(activeTag))
      ) {
        return false;
      }
      return true;
    });

    return [...list].sort((a, b) => {
      switch (sortBy) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "year-asc":
          return (parseInt(a.year) || 0) - (parseInt(b.year) || 0);
        case "year-desc":
          return (parseInt(b.year) || 0) - (parseInt(a.year) || 0);
        default:
          return 0;
      }
    });
  }, [activeTag, sortBy]);

  const grouped = useMemo(() => {
    const map = {};
    for (const s of filtered) {
      const key = firstLetterKey(s.title);
      if (!map[key]) map[key] = [];
      map[key].push(s);
    }
    const keys = Object.keys(map).sort((a, b) => {
      if (a === "#") return 1;
      if (b === "#") return -1;
      return a.localeCompare(b);
    });
    return keys.map((k) => ({ letter: k, shows: map[k] }));
  }, [filtered]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTag, sortBy]);

  const sortOptions = [
    { value: "title-asc", label: "Title (A → Z)" },
    { value: "title-desc", label: "Title (Z → A)" },
    { value: "year-desc", label: "Newest First" },
    { value: "year-asc", label: "Oldest First" },
  ];

  const selectedSort =
    sortOptions.find((option) => option.value === sortBy)?.label || "Sort";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#05060b] to-[#0f0a24] text-white font-nunito selection:bg-cyan-500/30">
      <Header />

      <main className="flex-grow relative">
        <div className="px-4 sm:px-7 md:px-10 lg:px-16 py-6 sm:py-8 max-w-[2000px] mx-auto relative">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="bg-white/5 hover:bg-white/10 p-2.5 rounded-full border border-white/10 text-white"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
            </button>

            {/* Title */}
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/90">
                All Shows
              </h1>

              <p className="text-sm text-gray-400 mt-1">
                {filtered.length} Shows
              </p>
            </div>

            <div className="flex-1" />

            <div className="hidden md:block relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className=" flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-sm text-white hover:bg-white/10 transition-all"
              >
                <span>Sort</span>
                <HugeiconsIcon icon={FilterMailIcon} size={18} />
              </button>

              {sortOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#111827] backdrop-blur-xl shadow-2xl z-50">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setSortOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-white/5 transition"
                    >
                      <span>{option.label}</span>

                      {sortBy === option.value && (
                        <HugeiconsIcon icon={Tick02Icon} size={16} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <div className="flex items-center overflow-x-auto hide-scrollbar gap-2 pb-4">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTag(t)}
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                    activeTag === t
                      ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black border-transparent"
                      : "bg-white/5 text-gray-300 border-white/5"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* GRID */}
          <div className="space-y-16 mb-24">
            {grouped.map(({ letter, shows }) => (
              <section key={letter}>
                <div className="flex items-center gap-6 mb-5">
                  <h3 className="text-2xl sm:text-2xl font-semibold text-yellow-300">
                    {letter}
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
                  <div className="text-xs font-bold text-gray-600 bg-white/5 px-3 py-1 rounded-md">
                    {shows.length} SHOWS
                  </div>
                </div>

                <div className="px-0 sm:px-0">
                  <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-2 sm:gap-x-5 md:grid-cols-3 md:gap-x-6 md:gap-y-8 lg:grid-cols-4 lg:gap-x-6 xl:grid-cols-4 2xl:grid-cols-5">
                    {shows.map((s) => (
                      <div
                        key={s.id}
                        className="transition-transform duration-300 hover:scale-[1.03]"
                      >
                        <Card show={s} navigate={navigate} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
