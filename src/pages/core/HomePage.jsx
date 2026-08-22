// src/pages/HomePage.jsx

import { useState } from "react";

import ContinueWatchingRow from "../../components/home/ContinueWatchingRow.jsx";
import GenresSection from "../../components/home/GenresSection.jsx";
import HeroBanner from "../../components/home/HeroBanner.jsx";
import RandomPlayButton from "../../components/home/RandomPlayButton.jsx";
import ShowSection from "../../components/home/ShowSection.jsx";

import Footer from "../../components/layout/Footer.jsx";
import Header from "../../components/layout/Header.jsx";

import showsData from "../../data/Shows.json";

const getGenres = (shows) => {
  const count = {};

  shows.forEach((show) => {
    show.tags?.forEach((tag) => {
      count[tag] = (count[tag] || 0) + 1;
    });
  });

  return Object.entries(count)
    .filter(([, value]) => value >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);
};

const normalizeShow = (show) => {
  const parseViews = (value) => {
    if (typeof value === "number") return value;
    if (!value) return 0;

    if (typeof value === "string" && value.toLowerCase().includes("k")) {
      return parseFloat(value) * 1000;
    }

    return parseInt(value, 10) || 0;
  };

  return {
    ...show,

    // Normal portrait poster used by ShowCard
    poster: show.poster || "/media/extras/default.jpg",

    // Wide image used by Hero and other large layouts
    heroPoster: show.backdrop || "/media/extras/default.jpg",

    viewsNum: parseViews(show.views),
    ratingNum: Number(show.rating) || 0,
    yearNum: Number(show.year) || 0,

    addedAt: show.year
      ? new Date(`${show.year}-01-01`)
      : new Date(Date.now() - Math.random() * 10000000000),
  };
};

const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

const pickShows = (pool, usedCounts, count) => {
  const available = shuffle(pool).filter(
    (show) => (usedCounts[show.id] || 0) < 2,
  );

  const selected = available.slice(0, count);

  selected.forEach((show) => {
    usedCounts[show.id] = (usedCounts[show.id] || 0) + 1;
  });

  return selected;
};

const allShows = showsData.allShows.map(normalizeShow);

const usedCounts = {};

const featuredPool = allShows.filter((show) => show.featured);
const heroSource = featuredPool.length ? featuredPool : allShows;
const heroShows = shuffle(heroSource);

heroShows.forEach((show) => {
  usedCounts[show.id] = (usedCounts[show.id] || 0) + 2;
});

const continueWatching = pickShows(allShows, usedCounts, 6);

const allTrendingShows = [...allShows].sort((a, b) => b.viewsNum - a.viewsNum);

const allNewlyAdded = [...allShows].sort(
  (a, b) => new Date(b.addedAt) - new Date(a.addedAt),
);

const allRetroClassics = allShows
  .filter((show) => show.yearNum < 2000)
  .sort((a, b) => b.viewsNum - a.viewsNum);

const allCartoonComedy = allShows
  .filter((show) => show.tags?.includes("Comedy"))
  .sort((a, b) => b.viewsNum - a.viewsNum);

const trendingShows = allTrendingShows.slice(0, 8);
const newlyAdded = allNewlyAdded.slice(0, 6);
const retroClassics = allRetroClassics.slice(0, 6);
const cartoonComedy = allCartoonComedy.slice(0, 6);

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
    <div className="flex min-h-screen flex-col bg-[#0F0A24] text-white">
      <Header />

      <main className="relative flex-grow">
        <div className="-mt-10 sm:-mt-14">
          <HeroBanner shows={heroShows} />
        </div>

        <div className="mt-3 pb-5">
          <ShowSection
            sectionTitle="Trending Now"
            sectionKey="trending"
            shows={trendingShows}
          />

          <ContinueWatchingRow shows={continueWatching} />

          <ShowSection
            sectionTitle="Newly Added"
            sectionKey="newly-added"
            shows={newlyAdded}
          />

          <GenresSection
            genres={genres}
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />

          {selectedGenre && (
            <div className="mx-4 mt-5 rounded-2xl border border-[rgba(255,248,200,0.15)] bg-[rgba(255,248,200,0.06)] p-2 shadow-[0_0_40px_rgba(255,248,200,0.08)] sm:mx-10">
              <ShowSection
                sectionTitle={`${selectedGenre} Shows`}
                shows={filteredShows}
              />
            </div>
          )}

          <ShowSection
            sectionTitle="Retro Classics"
            sectionKey="retro-classics"
            shows={retroClassics}
          />

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
