import { ArrowDown01Icon, ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../Components/Footer.jsx";
import Header from "../Components/Header.jsx";
import ShowCard from "../Components/ShowCard.jsx";
import showsDataRaw from "../Data/Shows.json";

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

export default function AllShowsPage() {
  const navigate = useNavigate();
  const [activeTag, setActiveTag] = useState("All");
  const [sortBy, setSortBy] = useState("title-asc");

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

  const total = filtered.length;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#05060b] to-[#0f0a24] text-white font-nunito selection:bg-cyan-500/30">
      <Header />

      <main className="flex-grow relative">
        <div className="px-4 sm:px-7 md:px-10 lg:px-16 py-6 max-w-[1800px] mx-auto relative">
          {/* Header Section */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="bg-white/5 hover:bg-white/10 p-2.5 rounded-full text-white transition-all border border-white/10"
              aria-label="Go back"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={24} />
            </button>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              All Shows
            </h1>
            <div className="flex-1" />
            <div className="hidden md:block">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white/5 border border-white/10 text-white text-sm px-5 py-2.5 rounded-full pr-12 min-w-[180px] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition cursor-pointer"
                >
                  <option value="title-asc">Title (A → Z)</option>
                  <option value="title-desc">Title (Z → A)</option>
                  <option value="year-desc">Newest First</option>
                  <option value="year-asc">Oldest First</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                  <HugeiconsIcon icon={ArrowDown01Icon} size={18} />
                </div>
              </div>
            </div>
          </div>

          <div className="md:pl-2">
            <div className="text-gray-400 mb-6 text-sm sm:text-base leading-relaxed">
              <p>
                Browse our full vault of nostalgia. Filter by genre or sort by
                era.
              </p>
              <p className="text-cyan-400/60 font-medium">
                Grouped alphabetically.
              </p>
            </div>

            {/* Tags section */}
            <div className="mb-8">
              <div className="flex items-center overflow-x-auto hide-scrollbar gap-2 pb-4">
                {tags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTag(t)}
                    className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
                      activeTag === t
                        ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black border-transparent shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                        : "bg-white/5 text-gray-300 border-white/5 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid Content */}
            <div className="space-y-16 mb-24">
              {grouped.map(({ letter, shows }) => (
                <section key={letter} className="group">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="text-3xl font-black text-white group-hover:text-cyan-400 transition-colors">
                      {letter}
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
                    <div className="text-xs font-bold text-gray-600 bg-white/5 px-3 py-1 rounded-md">
                      {shows.length} SHOWS
                    </div>
                  </div>

                  {/* FIX: px-6 on mobile for more space.
                    lg:grid-cols-4 for Image 1.
                    xl:grid-cols-5 for Image 2.
                  */}
                  <div className="px-6 sm:px-0">
                    <div
                      className="grid grid-cols-2 gap-x-4 gap-y-6 
                                    sm:grid-cols-2 sm:gap-x-6 
                                    md:grid-cols-3 md:gap-x-6 md:gap-y-10 
                                    lg:grid-cols-4 lg:gap-x-8   
                                    xl:grid-cols-5"
                    >
                      {shows.map((s) => (
                        <div
                          key={s.id}
                          className="transition-transform duration-300 hover:scale-[1.03]"
                        >
                          {/* We apply cinematic aspect ratio classes here */}
                          <div className="aspect-[2/3] lg:aspect-video overflow-hidden rounded-xl border border-white/10 shadow-lg group">
                            <ShowCard
                              {...s}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              ))}
            </div>
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
        
        select option {
          background-color: #05060b;
          color: white;
        }
      `}</style>
    </div>
  );
}
