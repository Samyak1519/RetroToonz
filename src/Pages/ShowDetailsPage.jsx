// src/Pages/ShowDetailsPage.jsx
import { useParams } from "react-router-dom";
import showsData from "../Data/Shows.json";

function ShowDetailsPage() {
  const { title } = useParams();
  const show = showsData.allShows.find(
    (s) => s.title.toLowerCase().replace(/\s+/g, "-") === title
  );

  if (!show) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        <p>Show not found 😢</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-2">{show.title}</h1>
      <p className="text-lg mb-4">Year: {show.year}</p>
      <img
        src={`/Assets/${show.thumbnail}`}
        alt={show.title}
        className="rounded-lg max-w-md shadow-lg"
      />
      <p className="mt-6 text-gray-300">
        This is a placeholder for episode list or player.
      </p>
    </div>
  );
}

export default ShowDetailsPage;
