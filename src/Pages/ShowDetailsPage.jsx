import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft02Icon,
  PlayIcon,
  StarIcon,
  FavouriteIcon,
} from "@hugeicons/core-free-icons";

import EpisodeSection from "../Components/EpisodeSection";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import showsData from "../Data/Shows.json";

const getPosterUrl = (id, device = "desktop") => {
  if (!id) return "";
  const ext = device === "mobile" ? "jpeg" : "jpg";
  return `/media/posters-${device}/${id}-poster-${device}.${ext}`;
};

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

  const posterDesktop =
    show.thumbnail && show.thumbnail.startsWith("/media")
      ? show.thumbnail
      : getPosterUrl(show.id, "desktop");

  const posterMobile =
    show.thumbnailMobile && show.thumbnailMobile.startsWith("/media")
      ? show.thumbnailMobile
      : getPosterUrl(show.id, "mobile");

  const defaultPoster = "/media/posters-desktop/default-poster.jpg";

  const firstEpisodeId = show.seasons?.[0]?.episodes?.[0]?.episodeId;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />

      <main className="flex-grow">
        {/* POSTER */}
        <div className="relative w-full aspect-[3/3] sm:aspect-auto sm:h-72 md:h-80 lg:h-[400px] overflow-hidden">
          <picture>
            <source srcSet={posterMobile} media="(max-width:600px)" />
            <img
              src={posterDesktop}
              alt={`${show.title} poster`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = defaultPoster;
              }}
            />
          </picture>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="
              absolute top-4 left-3.5
              sm:top-5 sm:left-6
              lg:top-6 lg:left-10
              bg-black/70 hover:bg-black/90
              p-3 sm:p-2.5 lg:p-3
              rounded-full
              text-white
              z-20 transition
            "
          >
            <HugeiconsIcon
              icon={ArrowLeft02Icon}
              className="text-lg sm:text-xl lg:text-2xl"
            />
          </button>
        </div>

        {/* CONTENT */}
        <div className="px-4 md:px-20 lg:px-40 lg:pr-48 pb-10 mt-5">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold">
                {show.title}
              </h1>

              {/* RATING */}
              <div className="flex items-center gap-2 text-yellow-400 text-sm sm:text-base mt-1">
                <HugeiconsIcon
                  icon={StarIcon}
                  className="text-base sm:text-lg"
                />
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

            {/* ACTIONS */}
            <div className="flex items-center gap-4 mr-2 sm:mr-5">
              {/* ❤️ Wishlist */}
              <button
                onClick={toggleShortlist}
                className="text-4xl sm:text-5xl transition-transform"
                title={
                  isShortlisted ? "Remove from Watchlist" : "Add to Watchlist"
                }
              >
                <HugeiconsIcon
                  icon={FavouriteIcon}
                  className={`
                    transition-all duration-200
                    ${
                      isShortlisted
                        ? "text-red-500 scale-110 drop-shadow-[0_0_6px_rgba(248,113,113,0.6)]"
                        : "text-white/80 hover:text-white"
                    }
                  `}
                />
              </button>

              {/* ▶️ Play */}
              <button
                onClick={() => {
                  if (firstEpisodeId) {
                    navigate(`/watch/${show.id}?ep=${firstEpisodeId}`);
                  } else {
                    navigate(`/watch/${show.id}`);
                  }
                }}
                className="bg-purple-600 hover:bg-purple-700 p-4 sm:p-5 rounded-full text-white shadow-md transition"
              >
                <HugeiconsIcon icon={PlayIcon} className="text-lg sm:text-xl" />
              </button>
            </div>
          </div>

          {/* TAGS */}
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

          {/* DESCRIPTION */}
          <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-6">
            {show.description ||
              "This is a placeholder description. Add something meaningful here about characters, story or nostalgia!"}
          </p>

          {/* EPISODES */}
          <EpisodeSection
            posterDesktop={posterDesktop}
            posterMobile={posterMobile}
            show={show}
            defaultPoster={defaultPoster}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ShowDetailsPage;
