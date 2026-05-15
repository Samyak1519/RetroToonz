// src/pages/HomePage.jsx

import { useState } from "react";

import GenresSection from "../../components/home/GenresSection.jsx";
import HeroBanner from "../../components/home/HeroBanner.jsx";
import RandomPlayButton from "../../components/home/RandomPlayButton.jsx";
import ShowSection from "../../components/home/ShowSection.jsx";

import Footer from "../../components/layout/Footer.jsx";
import Header from "../../components/layout/Header.jsx";

import showsData from "../../data/Shows.json";

const posterDesktopDir = "/media/posters-desktop";
const posterMobileDir = "/media/posters-mobile";
const extrasDir = "/media/extras";

/* ---------------- GENRES ---------------- */

const getGenres = (shows) => {
  const count = {};

  shows.forEach((show) => {
    show.tags?.forEach((tag) => {
      count[tag] = (count[tag] || 0) + 1;
    });
  });

  // 🔥 keep only meaningful genres
  return Object.entries(count)
    .filter(([tag, value]) => value >= 2) // remove weak ones
    .sort((a, b) => b[1] - a[1]) // sort by popularity
    .map(([tag]) => tag);
};

/* ---------------- HELPERS ---------------- */

const normalizePosterPath = (value, preferMobile = false) => {
  if (!value) return null;
  if (typeof value === "string" && value.startsWith("/media/")) return value;

  const cleaned = value.replace(/^\/+/, "");
  const parts = cleaned.split("/");
  const fileName = parts[parts.length - 1];

  const targetDir = preferMobile ? posterMobileDir : posterDesktopDir;
  return `${targetDir}/${fileName}`;
};

const enrich = (arr) =>
  arr.map((show) => {
    let thumbnail = null;
    if (show.thumbnail) {
      thumbnail = show.thumbnail.startsWith("/media/")
        ? show.thumbnail
        : normalizePosterPath(show.thumbnail, false);
    }

    let thumbnailMobile = null;
    if (show.thumbnailMobile) {
      thumbnailMobile = show.thumbnailMobile.startsWith("/media/")
        ? show.thumbnailMobile
        : normalizePosterPath(show.thumbnailMobile, true);
    } else if (thumbnail) {
      const filename = thumbnail.split("/").pop();
      thumbnailMobile = `${posterMobileDir}/${filename}`;
    }

    return {
      ...show,
      thumbnail: thumbnail || `${extrasDir}/default.jpg`,
      thumbnailMobile: thumbnailMobile || `${extrasDir}/default.jpg`,
    };
  });

function shuffle(arr) {
  return [...arr].sort(() => 0.5 - Math.random());
}

function pickShows(pool, usedCounts, count) {
  const available = shuffle(pool).filter(
    (show) => (usedCounts[show.id] || 0) < 2,
  );
  const selected = available.slice(0, count);
  selected.forEach((s) => {
    usedCounts[s.id] = (usedCounts[s.id] || 0) + 1;
  });
  return selected;
}

/* ---------------- DATA ---------------- */

const allShows = enrich(showsData.allShows).map(normalizeShow);

const featuredPool = allShows.filter((s) => s.featured);
const heroSource = featuredPool.length ? featuredPool : allShows;
const heroShows = shuffle(heroSource).slice(0, 4);

const usedCounts = {};
heroShows.forEach((s) => {
  usedCounts[s.id] = (usedCounts[s.id] || 0) + 2;
});

// ---------- Home Page Sections ----------

const normalizeShow = (show) => {
  const parseViews = (v) => {
    if (typeof v === "number") return v;
    if (!v) return 0;

    if (typeof v === "string" && v.toLowerCase().includes("k")) {
      return parseFloat(v) * 1000;
    }

    return parseInt(v) || 0;
  };

  return {
    ...show,
    viewsNum: parseViews(show.views),
    ratingNum: Number(show.rating) || 0,
    yearNum: Number(show.year) || 0,

    // 🔥 smart fallback (based on year)
    addedAt: show.year
      ? new Date(`${show.year}-01-01`)
      : new Date(Date.now() - Math.random() * 10000000000),
  };
};

// 🔥 TRENDING (popular but slightly shuffled)
const trendingShows = shuffle(
  [...allShows].sort((a, b) => b.viewsNum - a.viewsNum).slice(0, 12),
).slice(0, 8);

// 🔥 NEWLY ADDED (based on derived date)
const newlyAdded = [...allShows]
  .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
  .slice(0, 6);

// 🔥 RETRO CLASSICS
const retroClassics = allShows
  .filter((s) => s.yearNum < 2000)
  .sort((a, b) => b.viewsNum - a.viewsNum)
  .slice(0, 6);

// 🔥 COMEDY (best first, not random)
const cartoonComedy = allShows
  .filter((s) => s.tags?.includes("Comedy"))
  .sort((a, b) => b.viewsNum - a.viewsNum)
  .slice(0, 6);

/* ================= COMPONENT ================= */

function HomePage() {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const genres = getGenres(allShows);

  const filteredShows = selectedGenre
    ? allShows.filter((show) =>
        show.tags?.some(
          (tag) => tag.toLowerCase() === selectedGenre.toLowerCase(),
        ),
      )
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#0F0A24] text-white">
      <Header />

      <main className="flex-grow relative">
        {/* HERO */}
        <div className="-mt-10 sm:-mt-14">
          <HeroBanner shows={heroShows} />
        </div>

        <div className="pb-5 mt-3 sm:px-5">
          {/* TRENDING */}
          <ShowSection sectionTitle="Trending Now" shows={trendingShows} />

          <ShowSection sectionTitle="Newly Added" shows={newlyAdded} />

          {/* ✅ GENRES SECTION */}
          <GenresSection
            genres={genres}
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />

          {/* ✅ FILTERED RESULT */}
          {selectedGenre && (
            <div className=" mt-6 mx-4 sm:mx-10 p-2 rounded-2xl bg-[rgba(255,248,200,0.06)] border border-[rgba(255,248,200,0.15)] shadow-[0_0_40px_rgba(255,248,200,0.08)] animate-fadeIn">
              <ShowSection
                sectionTitle={`${selectedGenre} Shows`}
                shows={filteredShows}
              />
            </div>
          )}

          <ShowSection sectionTitle="Retro Classics" shows={retroClassics} />
          <ShowSection sectionTitle="Cartoon Comedy" shows={cartoonComedy} />
        </div>

        <RandomPlayButton />
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
