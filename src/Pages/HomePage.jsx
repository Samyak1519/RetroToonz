// src/Pages/HomePage.jsx
import Header from "../Components/Header";
import ShowSection from "../Components/ShowSection";

// Import images from the Assets folder
import pokemonImg from "../Assets/pokemon_poster.jpg";
import doraemonImg from "../Assets/doraemon_poster.jpg";
import tomAndJerryImg from "../Assets/tomAndJerry_poster.jpg";
import shinchanImg from "../Assets/shinchan.jpg";
import chootaBheemImg from "../Assets/chootabheem.jpg";
import ninjaHattoriImg from "../Assets/ninjahattori.png";
import permanImg from "../Assets/perman.jpg";
import oswaldImg from "../Assets/oswald.jpg";
import motuPatluImg from "../Assets/motupatlu.jpg";
import courageImg from "../Assets/courageTheCowardlyDog.jpg";
import rollNo21Img from "../Assets/rollno21.jpg";
import oggyImg from "../Assets/OggyAndTheCockroaches.jpg";

function HomePage() {
  const trendingShows = [
    { title: "Pokemon", year: "2023", thumbnail: pokemonImg },
    { title: "Doraemon", year: "2022", thumbnail: doraemonImg },
    { title: "Tom and Jerry", year: "2021", thumbnail: tomAndJerryImg },
    { title: "Tom and Jerry", year: "2021", thumbnail: tomAndJerryImg },
  ];

  const continueWatching = [
    { title: "Shinchan", year: "2020", thumbnail: shinchanImg },
    { title: "Chhota Bheem", year: "2021", thumbnail: chootaBheemImg },
    { title: "Ninja Hattori", year: "2022", thumbnail: ninjaHattoriImg },
    { title: "Tom and Jerry", year: "2021", thumbnail: tomAndJerryImg },
  ];

  const moreLikeThis = [
    { title: "Perman", year: "2019", thumbnail: permanImg },
    { title: "Oswald", year: "2018", thumbnail: oswaldImg },
    { title: "Motu Patlu", year: "2020", thumbnail: motuPatluImg },
    { title: "Tom and Jerry", year: "2021", thumbnail: tomAndJerryImg },
  ];

  const newlyAdded = [
    { title: "Courage: The Cowardly Dog", year: "2024", thumbnail: courageImg },
    { title: "Roll No 21", year: "2023", thumbnail: rollNo21Img },
    {
      title: "Oggy and the Cockroaches",
      year: "2024",
      thumbnail: oggyImg,
    },
    { title: "Tom and Jerry", year: "2021", thumbnail: tomAndJerryImg },
  ];

  return (
    <div>
      <Header />

      <ShowSection sectionTitle="All Shows" shows={trendingShows} />
      <ShowSection sectionTitle="Continue Watching" shows={continueWatching} />
      <ShowSection sectionTitle="More Like This" shows={moreLikeThis} />
      <ShowSection sectionTitle="Newly Added" shows={newlyAdded} />

      <p className="px-4 text-gray-400 text-sm">
        This is the main content of the home page.
      </p>
      <p className="px-4 text-gray-400 text-sm">
        You can add more components or content here as needed.
      </p>
    </div>
  );
}

export default HomePage;
