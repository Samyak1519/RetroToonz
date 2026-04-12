import {
  ArrowLeft01Icon,
  FavouriteIcon,
  PlayIcon,
  StarIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Footer from "../../components/layout/Footer.jsx";
import Header from "../../components/layout/Header.jsx";
import EpisodeSection from "../../components/show/EpisodeSection.jsx";
import showsData from "../../data/Shows.json";

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

  const toggleShortlist = () => setIsShortlisted((prev) => !prev);

  if (!show) {
    return <p className="text-white p-4">Show not found.</p>;
  }

  const posterDesktop = show.thumbnail?.startsWith("/media")
    ? show.thumbnail
    : getPosterUrl(show.id, "desktop");

  const posterMobile = show.thumbnailMobile?.startsWith("/media")
    ? show.thumbnailMobile
    : getPosterUrl(show.id, "mobile");

  const defaultPoster = "/media/posters-desktop/default-poster.jpg";
  const firstEpisodeId = show.seasons?.[0]?.episodes?.[0]?.episodeId;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />

      <main className="flex-grow">
        <div className="px-4 sm:px-7 md:px-10 lg:px-16 py-4 max-w-[1800px] mx-auto">
          {/* 🎬 POSTER */}
          <div className="relative w-full aspect-[3/3] sm:aspect-auto sm:h-60 md:h-72 lg:h-[400px] overflow-hidden rounded-xl mb-4">
            {/* 🔥 BACK BUTTON (OVER POSTER, ALIGNED) */}
            <button
              onClick={() => navigate(-1)}
              className="
                absolute z-20
                top-3 left-3
                sm:top-4 sm:left-4
                lg:top-5 lg:left-6
                bg-black/40 backdrop-blur-md
                hover:bg-black/60
                p-2.5 rounded-full
                border border-white/10
                transition
              "
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={22} />
            </button>

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
          </div>

          {/* 🎯 CONTENT */}
          <div className="pb-10">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                {/* ✅ TITLE */}
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  {show.title}
                </h1>

                {/* ⭐ Rating */}
                <div className="flex items-center gap-2 text-yellow-400 mt-1">
                  <HugeiconsIcon icon={StarIcon} size={18} />
                  <span>{show.rating || "9.1"}</span>
                  <span className="text-xs text-gray-400">
                    ({show.views || "35k"} views)
                  </span>
                </div>

                {/* 📄 Meta */}
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  {show.duration || "2 hr"} | {show.language || "Hindi"} |{" "}
                  {show.year}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-4">
                {/* ❤️ Wishlist */}
                <button onClick={toggleShortlist}>
                  <HugeiconsIcon
                    icon={FavouriteIcon}
                    className={`
                      text-3xl sm:text-4xl transition-all duration-200
                      ${
                        isShortlisted
                          ? "text-red-500 scale-110"
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
                  className="bg-purple-600 hover:bg-purple-700 p-3 sm:p-4 rounded-full shadow-md transition"
                >
                  <HugeiconsIcon icon={PlayIcon} size={20} />
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
            <p className="text-sm sm:text-base text-gray-200 mb-6">
              {show.description ||
                "Add something meaningful here about characters, story or nostalgia!"}
            </p>

            {/* EPISODES */}
            <EpisodeSection
              posterDesktop={posterDesktop}
              posterMobile={posterMobile}
              show={show}
              defaultPoster={defaultPoster}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ShowDetailsPage;
