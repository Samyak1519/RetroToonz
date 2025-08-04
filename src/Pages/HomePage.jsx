import Footer from "../Components/Footer";
import Header from "../Components/Header";
import HeroBanner from "../Components/HeroBanner";
import PageWrapper from "../Components/PageWrapper";
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
    <PageWrapper>
      <div className="min-h-screen flex flex-col bg-[#0F0A24] text-white">
        <Header />

        {/* Main content grows to push footer down if short */}
        <main className="flex-grow">
          <HeroBanner shows={allShows} />

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
        </main>

        <Footer />
      </div>
    </PageWrapper>
  );
}

export default HomePage;
