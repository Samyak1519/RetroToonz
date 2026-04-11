// src/pages/HomePage.jsx

import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import HeroBanner from "../../components/home/HeroBanner";
import RandomPlayButton from "../../components/home/RandomPlayButton";
import ShowSection from "../../components/home/ShowSection";

import showsData from "../../data/Shows.json";

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

const allShows = enrich(showsData.allShows);

const featuredPool = allShows.filter((s) => s.featured);
const heroSource = featuredPool.length ? featuredPool : allShows;
const heroShows = shuffle(heroSource).slice(0, 4);

const usedCounts = {};
heroShows.forEach((s) => {
  usedCounts[s.id] = (usedCounts[s.id] || 0) + 2;
});

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
  6,
);

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0F0A24] text-white">
      <Header />

      {/* ✅ IMPORTANT CHANGE HERE */}
      <main className="flex-grow relative">
        <div className="-mt-10 sm:-mt-14">
          <HeroBanner shows={heroShows} />
        </div>

        <div className="pb-5 sm:px-5">
          <ShowSection sectionTitle="Trending Now" shows={trendingShows} />
          <ShowSection sectionTitle="Newly Added" shows={newlyAdded} />
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
