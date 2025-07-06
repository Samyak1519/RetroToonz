// src/Pages/HomePage.jsx

import Footer from "../Components/Footer";
import HeroBanner from "../Components/HeroBanner";
import ShowSection from "../Components/ShowSection";
import Header from "../Components/Header";

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
};

// Enrich show data with image imports
const enrich = (arr) =>
  arr.map((show) => ({
    ...show,
    thumbnail: imageMap[show.thumbnail] || "",
  }));

// Categorize shows from JSON
const trendingShows = enrich(showsData.allShows.slice(0, 4));
const continueWatching = enrich(showsData.allShows.slice(4, 8));
const moreLikeThis = enrich(showsData.allShows.slice(8, 12));
const newlyAdded = enrich(showsData.allShows.slice(9, 13)); // or any logic

function HomePage() {
  return (
    <div className="min-h-screen text-white">
      <Header />

      <HeroBanner shows={trendingShows} />

      <ShowSection sectionTitle="All Shows" shows={trendingShows} />
      <ShowSection sectionTitle="Continue Watching" shows={continueWatching} />
      <ShowSection sectionTitle="More Like This" shows={moreLikeThis} />
      <ShowSection sectionTitle="Newly Added" shows={newlyAdded} />
      <Footer />
    </div>
  );
}

export default HomePage;
