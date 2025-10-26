// src/Pages/AllShowsPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ShowCard from "../Components/ShowCard";
import showsDataRaw from "../Data/Shows.json"; // ensure path/casing matches

// --- media dirs (match your public/media layout) ---
const posterDesktopDir = "/media/posters-desktop";
const posterMobileDir = "/media/posters-mobile";
const extrasDir = "/media/extras";


const normalizePosterPath = (value, preferMobile = false) => {
  if (!value) return null;
  if (typeof value === "string" && value.startsWith("/media/")) return value;

  // strip leading slashes and get filename
  const cleaned = value.replace(/^\/+/, "");
  const parts = cleaned.split("/");
  const fileName = parts[parts.length - 1];

  const targetDir = preferMobile ? posterMobileDir : posterDesktopDir;
  return `${targetDir}/${fileName}`;
};

// normalize show data (keeps other fields intact)
const normalizeShows = (arr) =>
  (arr || []).map((s) => {
    const desktopThumb = s.thumbnail
      ? s.thumbnail.startsWith("/media/")
        ? s.thumbnail
        : normalizePosterPath(s.thumbnail, false)
      : null;

    // mobile prefers explicit thumbnailMobile, else derive from desktop filename
    let mobileThumb = null;
    if (s.thumbnailMobile) {
      mobileThumb = s.thumbnailMobile.startsWith("/media/")
        ? s.thumbnailMobile
        : normalizePosterPath(s.thumbnailMobile, true);
    } else if (desktopThumb) {
      // derive mobile name from desktop file name
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

  // derive tags
  const tags = useMemo(() => {
    const s = new Set();
    allShows.forEach((sh) => {
      if (Array.isArray(sh.tags)) sh.tags.forEach((t) => s.add(t));
    });
    return ["All", ...Array.from(s).sort()];
  }, []);

  // filter + sort
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

    const sorted = [...list].sort((a, b) => {
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

    return sorted;
  }, [activeTag, sortBy]);

  // grouped alphabetically
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#05060b] to-[#0f0a24] text-white font-nunito">
      <Header />

      <main className="flex-grow relative">
        {/* 
          Changed padding:
            - small/medium: keep previous comfortable paddings
            - large (lg) and xl: increase left/right padding so content sits under back arrow
        */}
        <div className="px-4 sm:px-7 md:px-8 lg:px-20 xl:px-30 py-6 max-w-screen-2xl mx-auto relative">

          <div className="flex items-center gap-3 mb-3 sm:mb-6">
            <button
              onClick={() => navigate(-1)}
              className="bg-black/70 hover:bg-black/90 p-2 rounded-full text-white text-lg transition z-20"
              aria-label="Go back"
            >
              <FaArrowLeft />
            </button>

            <h1 className="text-2xl sm:text-3xl font-extrabold">All Shows</h1>

            <div className="flex-1" />

            <div className="hidden sm:block">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent border border-cyan-500/20 text-white text-sm px-4 py-2 rounded-full pr-10 min-w-[170px] focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                  aria-label="Sort shows desktop"
                >
                  <option value="title-asc">Title (A → Z)</option>
                  <option value="title-desc">Title (Z → A)</option>
                  <option value="year-desc">Newest</option>
                  <option value="year-asc">Oldest</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-300">
                  <FaChevronDown />
                </div>
              </div>
            </div>
          </div>

          <div className="sm:pl-7 md:pl-5 lg:pl-12 xl:pl-30" >


            {/* description respects container padding now */}
            <div className="text-gray-400 mb-4 text-sm sm:text-base">
              <div>Browse the full catalog by tag or sort.</div>
              <div>Grouped alphabetically.</div>
            </div>

            <div className="mb-3  ">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 overflow-x-auto hide-scrollbar">
                  <div className="flex gap-2 pb-2 w-max">
                    {tags.map((t) => (
                      <button
                        key={t}
                        onClick={() => setActiveTag(t)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${activeTag === t
                          ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-lg"
                          : "bg-white/6 text-gray-200 hover:bg-white/10"
                          }`}
                        aria-pressed={activeTag === t}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
                <div className="text-sm text-gray-400">
                  Showing{" "}
                  <span className="text-white font-medium">{total}</span> of{" "}
                  <span className="text-white font-medium">{allShows.length}</span> shows
                </div>

                <div className="sm:hidden">
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-transparent border border-cyan-500/20 text-white text-sm px-3 py-1.5 rounded-full pr-8 min-w-[150px] focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                      aria-label="Sort shows mobile"
                    >
                      <option value="title-asc">Title (A → Z)</option>
                      <option value="title-desc">Title (Z → A)</option>
                      <option value="year-desc">Newest</option>
                      <option value="year-asc">Oldest</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-300">
                      <FaChevronDown />
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block text-gray-400">
                  {activeTag !== "All" && (
                    <>· tag: <span className="text-cyan-300">{activeTag}</span></>
                  )}
                </div>
              </div>

              {activeTag !== "All" && (
                <div className="mt-2 sm:mt-1 text-sm text-cyan-300">
                  Tag: <span className="font-medium">{activeTag}</span>
                </div>
              )}
            </div>

            {/* Removed inner px so blocks align with container padding */}
            <div className="space-y-10 mb-16">
              {grouped.length === 0 && (
                <div className="py-12 text-center text-gray-400">No shows match your filters.</div>
              )}

              {grouped.map(({ letter, shows }) => (
                <section
                  key={letter}
                  className="pb-6 border-b border-white/5 last:border-b-0"
                >
                  <div className="flex items-center gap-5 mb-4">
                    <div className="text-2xl font-bold text-cyan-300">{letter}</div>
                    <div className="h-px flex-1 bg-white/10" />
                    <div className="text-sm text-gray-400">{shows.length}</div>
                  </div>


                  <div
                    className="grid grid-cols-2 gap-x-4 gap-y-5
             sm:grid-cols-3 sm:gap-x-5 sm:gap-y-6
             md:grid-cols-4 md:gap-x-6 md:gap-y-8
             lg:grid-cols-5 xl:grid-cols-5"
                  >


                    {shows.map((s) => (
                      <div
                        key={s.id}
                        className="transform transition hover:-translate-y-1"
                      >
                        <ShowCard {...s} />
                      </div>
                    ))}
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

        select { background-clip: padding-box; }

        @media (max-width: 640px) {
          .card-wrapper, .grid > div > * { margin: 0; }
        }
      `}</style>
    </div>
  );
}
