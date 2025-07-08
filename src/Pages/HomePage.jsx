// src/Pages/HomePage.jsx

import Footer from "../Components/Footer";
import HeroBanner from "../Components/HeroBanner";
import ShowSection from "../Components/ShowSection";
import Header from "../Components/Header";
import RandomPlayButton from "../Components/RandomPlayButton";

// JSON Data
import showsData from "../Data/Shows.json";

// Image Assets
import chootaBheemImg from "../Assets/chootabheem.jpg";
import courageImg from "../Assets/courageTheCowardlyDog.jpg";
import doraemonImg from "../Assets/doraemon_poster.jpg";
import motuPatluImg from "../Assets/motupatlu.jpg";
import ninjaHattoriImg from "../Assets/ninjahattori.png";
import oggyImg from "../Assets/OggyAndTheCockroaches.jpg";
import oswaldImg from "../Assets/oswald.jpg";
import permanImg from "../Assets/perman.jpg";
import pokemonImg from "../Assets/pokemon_poster.jpg";
import rollNo21Img from "../Assets/rollno21.jpg";
import shinchanImg from "../Assets/shinchan.jpg";
import tomAndJerryImg from "../Assets/tomAndJerry_poster.jpg";
import spidermanImg from "../Assets/spiderman.jpg";

// Map filenames from JSON to actual imported image modules
const imageMap = {
  "pokemon_poster.jpg": pokemonImg,
  "doraemon_poster.jpg": doraemonImg,
  "tomAndJerry_poster.jpg": tomAndJerryImg,
  "shinchan.jpg": shinchanImg,
  "chootabheem.jpg": chootaBheemImg,
  "ninjahattori.png": ninjaHattoriImg,
  "perman.jpg": permanImg,
  "oswald.jpg": oswaldImg,
  "motupatlu.jpg": motuPatluImg,
  "courageTheCowardlyDog.jpg": courageImg,
  "rollno21.jpg": rollNo21Img,
  "OggyAndTheCockroaches.jpg": oggyImg,
  "spiderman.jpg": spidermanImg,
};

// Enrich show data with image imports
const enrich = (arr) =>
  arr.map((show) => ({
    ...show,
    thumbnail: imageMap[show.thumbnail] || "",
  }));

// Manual selection of unique shows per section (avoid repetition)
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
  showsData.allShows.find((s) => s.id === "spiderman"),
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
  showsData.allShows.find((s) => s.id === "spiderman"),
  showsData.allShows.find((s) => s.id === "oggy"),
  showsData.allShows.find((s) => s.id === "courage"),
  showsData.allShows.find((s) => s.id === "shinchan"),
]);

function HomePage() {
  return (
    <div className="min-h-screen text-white">
      <Header />
      <HeroBanner shows={trendingShows} />

      <ShowSection sectionTitle="Trending Now" shows={trendingShows} />
      <ShowSection sectionTitle="Continue Watching" shows={continueWatching} />
      <ShowSection
        sectionTitle="Because You Watched..."
        shows={becauseYouWatched}
      />
      <ShowSection sectionTitle="Newly Added" shows={newlyAdded} />

      <RandomPlayButton shows={enrich(showsData.allShows)} />
      <Footer />
    </div>
  );
}

export default HomePage;
