// src/Pages/HomePage.jsx

import Footer from "../Components/Footer";
import Header from "../Components/Header";
import HeroBanner from "../Components/HeroBanner";
import RandomPlayButton from "../Components/RandomPlayButton";
import ShowSection from "../Components/ShowSection";

// JSON Data
import showsData from "../Data/Shows.json";

// Automatically map thumbnails from public/Assets with fallback
const enrich = (arr) =>
  arr.map((show) => ({
    ...show,
    thumbnail: show.thumbnail
      ? `/Assets/${show.thumbnail}`
      : "/Assets/default.jpg",
  }));

const allShows = enrich(showsData.allShows);

// Sections
const trendingShows = enrich([
  showsData.allShows.find((s) => s.id === "shinchan"),
  showsData.allShows.find((s) => s.id === "pokemon"),
  showsData.allShows.find((s) => s.id === "tom-and-jerry"),
  showsData.allShows.find((s) => s.id === "doraemon"),
  showsData.allShows.find((s) => s.id === "courage"),
  showsData.allShows.find((s) => s.id === "chhota-bheem"),
]);

const continueWatching = enrich([
  showsData.allShows.find((s) => s.id === "perman"),
  showsData.allShows.find((s) => s.id === "ninja-hattori"),
  showsData.allShows.find((s) => s.id === "oswald"),
  showsData.allShows.find((s) => s.id === "oggy"),
  showsData.allShows.find((s) => s.id === "motu-patlu"),
  showsData.allShows.find((s) => s.id === "roll-no-21"),
]);

const becauseYouWatched = enrich([
  showsData.allShows.find((s) => s.id === "tom-and-jerry"),
  showsData.allShows.find((s) => s.id === "oswald"),
  showsData.allShows.find((s) => s.id === "ninja-hattori"),
  showsData.allShows.find((s) => s.id === "chhota-bheem"),
  showsData.allShows.find((s) => s.id === "doraemon"),
  showsData.allShows.find((s) => s.id === "roll-no-21"),
]);

const newlyAdded = enrich([
  showsData.allShows.find((s) => s.id === "pokemon"),
  showsData.allShows.find((s) => s.id === "ninja-hattori"),
  showsData.allShows.find((s) => s.id === "oggy"),
  showsData.allShows.find((s) => s.id === "courage"),
  showsData.allShows.find((s) => s.id === "shinchan"),
]);

function HomePage() {
  return (
    <div className="min-h-screen bg-[#0F0A24] text-white">
      <Header />

      {/* 🔄 All Shows used in rotating HeroBanner */}
      <HeroBanner shows={allShows} />

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
      <ShowSection
        sectionTitle="Newly Added"
        shows={newlyAdded}
        bgColor="#0F0A24"
      />

      <RandomPlayButton shows={allShows} />
      <Footer />
    </div>
  );
}

export default HomePage;
