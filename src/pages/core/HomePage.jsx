// src/pages/HomePage.jsx

import { useState } from "react";

import GenresSection from "../../components/home/GenresSection.jsx";
import HeroBanner from "../../components/home/HeroBanner.jsx";
import RandomPlayButton from "../../components/home/RandomPlayButton.jsx";
import ShowSection from "../../components/home/ShowSection.jsx";

import Footer from "../../components/layout/Footer.jsx";
import Header from "../../components/layout/Header.jsx";

import ContinueWatchingRow from "../../components/home/ContinueWatchingRow.jsx";
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

  return Object.entries(count)
    .filter(([tag, value]) => value >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);
};

/* ---------------- HELPERS ---------------- */

const normalizePosterPath = (value, preferMobile = false) => {
  if (!value) return null;
  if (typeof value === "string" && value.startsWith("/media/")) return value;

  const cleaned = value.replace(/^\/+/, "");
  const fileName = cleaned.split("/").pop();

  const targetDir = preferMobile ? posterMobileDir : posterDesktopDir;
  return `${targetDir}/${fileName}`;
};

const enrich = (arr) =>
  arr.map((show) => {
    let thumbnail = show.thumbnail?.startsWith("/media/")
      ? show.thumbnail
      : normalizePosterPath(show.thumbnail, false);

    let thumbnailMobile = show.thumbnailMobile?.startsWith("/media/")
      ? show.thumbnailMobile
      : normalizePosterPath(show.thumbnailMobile, true);

    if (!thumbnailMobile && thumbnail) {
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

/* ---------------- NORMALIZER ---------------- */

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
    addedAt: show.year
      ? new Date(`${show.year}-01-01`)
      : new Date(Date.now() - Math.random() * 10000000000),
  };
};

/* ---------------- DATA ---------------- */

const allShows = enrich(showsData.allShows).map(normalizeShow);

const usedCounts = {}; // ✅ FIXED POSITION

const featuredPool = allShows.filter((s) => s.featured);
const heroSource = featuredPool.length ? featuredPool : allShows;
const heroShows = shuffle(heroSource);

// mark hero as used
heroShows.forEach((s) => {
  usedCounts[s.id] = (usedCounts[s.id] || 0) + 2;
});

// 🔥 CONTINUE WATCHING (mock)
const continueWatching = pickShows(allShows, usedCounts, 6);

// 🔥 TRENDING
const allTrendingShows = [...allShows].sort((a, b) => b.viewsNum - a.viewsNum);

const allNewlyAdded = [...allShows].sort(
  (a, b) => new Date(b.addedAt) - new Date(a.addedAt),
);

const allRetroClassics = allShows
  .filter((s) => s.yearNum < 2000)
  .sort((a, b) => b.viewsNum - a.viewsNum);

const allCartoonComedy = allShows
  .filter((s) => s.tags?.includes("Comedy"))
  .sort((a, b) => b.viewsNum - a.viewsNum);

/* Homepage rows */

const trendingShows = allTrendingShows.slice(0, 8);
const newlyAdded = allNewlyAdded.slice(0, 6);
const retroClassics = allRetroClassics.slice(0, 6);
const cartoonComedy = allCartoonComedy.slice(0, 6);

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

        <div className="pb-5 mt-3">
          {/* 1. TRENDING */}
          <ShowSection
            sectionTitle="Trending Now"
            sectionKey="trending"
            shows={trendingShows}
          />

          {/* 2. CONTINUE WATCHING  */}
          <ContinueWatchingRow shows={continueWatching} />

          {/* 3. Newly Added rows */}
          <ShowSection
            sectionTitle="Newly Added"
            sectionKey="newly-added"
            shows={newlyAdded}
          />

          {/* 4. GENRES Row*/}
          <GenresSection
            genres={genres}
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />

          {selectedGenre && (
            <div className="mt-5 mx-4 sm:mx-10 p-2 rounded-2xl bg-[rgba(255,248,200,0.06)] border border-[rgba(255,248,200,0.15)] shadow-[0_0_40px_rgba(255,248,200,0.08)]">
              <ShowSection
                sectionTitle={`${selectedGenre} Shows`}
                shows={filteredShows}
              />
            </div>
          )}

          {/* 5. Retro Classics Row */}
          <ShowSection
            sectionTitle="Retro Classics"
            sectionKey="retro-classics"
            shows={retroClassics}
          />

          {/* 6. Cartoon Comedy Row */}
          <ShowSection
            sectionTitle="Cartoon Comedy"
            sectionKey="cartoon-comedy"
            shows={cartoonComedy}
          />
        </div>

        <RandomPlayButton />
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
