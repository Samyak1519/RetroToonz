// src/Pages/HomePage.jsx

import Footer from "../Components/Footer";
import Header from "../Components/Header";
import HeroBanner from "../Components/HeroBanner";
import RandomPlayButton from "../Components/RandomPlayButton";
import ShowSection from "../Components/ShowSection";

// JSON Data
import showsData from "../Data/Shows.json";

// --- media dirs (match your public/media layout) ---
const posterDesktopDir = "/media/posters-desktop";
const posterMobileDir = "/media/posters-mobile";
const extrasDir = "/media/extras";

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

// Utility: random shuffle
function shuffle(arr) {
  return [...arr].sort(() => 0.5 - Math.random());
}

// Utility: pick shows with soft uniqueness (max 2 appearances)
function pickShows(pool, usedCounts, count) {
  const available = shuffle(pool).filter(
    (show) => (usedCounts[show.id] || 0) < 2
  );
  const selected = available.slice(0, count);
  selected.forEach((s) => {
    usedCounts[s.id] = (usedCounts[s.id] || 0) + 1;
  });
  return selected;
}

// Enriched shows
const allShows = enrich(showsData.allShows);

// ================= HERO SELECTION =================

// use featured shows if available
const featuredPool = allShows.filter((s) => s.featured);
const heroSource = featuredPool.length ? featuredPool : allShows;

// pick 4 hero shows (stable per load)
const heroShows = shuffle(heroSource).slice(0, 4);

// Track usage across rows
const usedCounts = {};

// reserve hero shows so they don’t repeat immediately
heroShows.forEach((s) => {
  usedCounts[s.id] = (usedCounts[s.id] || 0) + 2;
});

// ================= ROWS =================

// Specific "Newly Added" curated titles
const newlyAddedTitles = [
  "Jake and the Never Land Pirates",
  "Kick Buttowski",
  "Kid vs Kat",
  "Kiteretsu",
  "Mickey Mouse Clubhouse",
  "Mr. Bean",
  "Phineas and Ferb",
  "Ben 10",
  "Shaun the Sheep",
  "SpongeBob Square Pants",
];

const trendingShows = pickShows(allShows, usedCounts, 8);

const newlyAdded = allShows
  .filter((show) => newlyAddedTitles.includes(show.title))
  .slice(0, 6);
newlyAdded.forEach((s) => (usedCounts[s.id] = (usedCounts[s.id] || 0) + 1));

const retroClassics = allShows
  .filter((show) => show.year && parseInt(show.year) < 2000)
  .slice(0, 6);
retroClassics.forEach((s) => (usedCounts[s.id] = (usedCounts[s.id] || 0) + 1));

const cartoonComedy = pickShows(
  allShows.filter((show) => show.tags?.includes("Comedy")),
  usedCounts,
  6
);

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0F0A24] text-white">
      <Header />

      <main className="flex-grow">
        <div className="-mt-10 sm:-mt-14">
          <HeroBanner shows={heroShows} />
        </div>

        <div className="pb-5 sm:px-5">
          <ShowSection
            sectionTitle="Trending Now"
            shows={trendingShows}
            bgColor="#0F0A24"
          />
          <ShowSection
            sectionTitle="Newly Added"
            shows={newlyAdded}
            bgColor="#0F0A24"
          />
          <ShowSection
            sectionTitle="Retro Classics"
            shows={retroClassics}
            bgColor="#0F0A24"
          />
          <ShowSection
            sectionTitle="Cartoon Comedy"
            shows={cartoonComedy}
            bgColor="#0F0A24"
          />
        </div>

        <RandomPlayButton shows={allShows} />
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
