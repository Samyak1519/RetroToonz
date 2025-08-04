import { useState } from "react";
import { FaArrowLeft, FaPlay, FaStar } from "react-icons/fa";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { useNavigate, useParams } from "react-router-dom";
import EpisodeSection from "../Components/EpisodeSection";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import PageWrapper from "../Components/PageWrapper";
import showsData from "../Data/Shows.json";

function ShowDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const show = showsData.allShows.find((s) => s.id === id);
  const [isShortlisted, setIsShortlisted] = useState(false);

  const toggleShortlist = () => {
    setIsShortlisted((prev) => !prev);
  };

  if (!show) {
    return <p className="text-white p-4">Show not found.</p>;
  }

  return (
    <PageWrapper>

      <div className="flex flex-col min-h-screen bg-black text-white">
        {/* ✅ Sticky Header */}
        <Header />

        {/* ✅ Main Content Area */}
        <main className="flex-grow">
          {/* ✅ Poster with Back Button */}
          <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-[400px] overflow-hidden mt-14 sm:mt-16">
            <img
              src={`/Assets/${show.thumbnail}`}
              alt={show.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* ✅ Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-black/70 hover:bg-black/90 p-2 rounded-full text-white text-xl sm:text-2xl z-20 transition"
            >
              <FaArrowLeft />
            </button>
          </div>

          {/* ✅ Show Info */}
          <div className="px-4 pb-10 mt-5 sm:px-40 sm:pr-48">
            <div className="flex items-start justify-between gap-4 mb-5">
              {/* Left: Info Block */}
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold">
                  {show.title}
                </h1>

                <div className="flex items-center gap-2 text-yellow-400 text-sm sm:text-base mt-1">
                  <FaStar className="text-base sm:text-lg" />
                  <span>{show.rating || "9.1"}</span>
                  <span className="text-xs text-gray-400">
                    ({show.views || "35k"} views)
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  {show.duration || "2 hr"} | {show.language || "Hindi"} |{" "}
                  {show.year}
                </p>
              </div>

              {/* Right: Heart + Play Button */}
              <div className="flex items-center gap-4 mr-2 sm:mr-5">
                <button
                  onClick={toggleShortlist}
                  className="text-4xl sm:text-5xl mr-3 sm:mr-5 hover:scale-110 transition-transform"
                  title={
                    isShortlisted ? "Remove from Watchlist" : "Add to Watchlist"
                  }
                >
                  {isShortlisted ? (
                    <VscHeartFilled className="text-red-600" />
                  ) : (
                    <VscHeart className="text-white" />
                  )}
                </button>

                {/* Navigate to full-screen video page */}
                <button
                  onClick={() => navigate(`/watch/${show.id}`)}
                  className="bg-purple-600 hover:bg-purple-700 p-4 sm:p-5 rounded-full text-white shadow-md transition"
                  title="Watch Now"
                >
                  <FaPlay className="text-lg sm:text-xl" />
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {show.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-white text-black font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-6">
              {show.description ||
                "This is a placeholder description. Add something meaningful here about characters, story or nostalgia!"}
            </p>

            {/* ✅ Episodes */}
            <EpisodeSection poster={`/Assets/${show.thumbnail}`} />
          </div>
        </main>

        {/* ✅ Sticky Footer */}
        <Footer />
      </div>
    </PageWrapper>
  );
}

export default ShowDetailsPage;
