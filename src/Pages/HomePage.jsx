// src/Pages/HomePage.jsx

import Footer from "../Components/Footer";
import Header from "../Components/Header";
import HeroBanner from "../Components/HeroBanner";
import RandomPlayButton from "../Components/RandomPlayButton";
import ShowSection from "../Components/ShowSection";

// JSON Data
import showsData from "../Data/Shows.json";

// Add full image path if missing
const enrich = (arr) =>
  arr.map((show) => ({
    ...show,
    thumbnail: show.thumbnail
      ? `/Assets/${show.thumbnail}`
      : "/Assets/default.jpg",
  }));

// Utility to get N random shows
function getRandomShows(showList, count) {
  const shuffled = [...showList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Enriched shows
const allShows = enrich(showsData.allShows);

// Randomized Sections
const trendingShows = getRandomShows(allShows, 6);
const continueWatching = getRandomShows(allShows, 5);
const becauseYouWatched = getRandomShows(allShows, 6);
const newlyAdded = getRandomShows(allShows, 4);

function HomePage() {
  return (
    <div className="min-h-screen bg-[#0F0A24] text-white">
      <Header />

      {/* Hero Banner with all shows */}
      <HeroBanner shows={allShows} />

      {/* Randomized Sections */}
      <ShowSection
        sectionTitle="Newly Added"
        shows={newlyAdded}
        bgColor="#0F0A24"
      />
      <ShowSection
        sectionTitle="Trending Now"
        shows={trendingShows}
        bgColor="#0F0A24"
      />
      <ShowSection
        sectionTitle="Continue Watching"
        shows={continueWatching}
        bgColor="#0F0A24"
      />
      <ShowSection
        sectionTitle="Because You Watched..."
        shows={becauseYouWatched}
        bgColor="#0F0A24"
      />

      <RandomPlayButton shows={allShows} />
      <Footer />
    </div>
  );
}

export default HomePage;
