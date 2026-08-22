import {
  ArrowLeft01Icon,
  FavouriteIcon,
  PlayIcon,
  StarIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Footer from "../../components/layout/Footer.jsx";
import Header from "../../components/layout/Header.jsx";
import showsData from "../../data/Shows.json";

const DEFAULT_THUMBNAIL = "/media/extras/default.jpg";

const getPosterUrl = (id, type = "backdrop") => {
  if (!id) return "";
  return type === "poster"
    ? `/media/poster/portrait/${id}-poster.jpg`
    : `/media/backdrops/landscape/${id}-backdrop.jpg`;
};

const normalizePath = (path) => {
  if (typeof path !== "string") {
    return null;
  }

  const value = path.trim();

  if (!value) {
    return null;
  }

  return value.startsWith("/") ? value : `/${value}`;
};

const getEpisodeThumbnail = (episode, showBackdrop) => {
  const episodeThumbnail = normalizePath(episode?.thumbnail);
  const episodeBackdrop = normalizePath(episode?.backdrop);
  const fallbackBackdrop = normalizePath(showBackdrop);

  return (
    episodeThumbnail || episodeBackdrop || fallbackBackdrop || DEFAULT_THUMBNAIL
  );
};

const handleThumbnailError = (event, showBackdrop) => {
  const img = event.currentTarget;
  const stage = img.dataset.fallbackStage || "primary";
  const fallbackBackdrop = normalizePath(showBackdrop);

  if (
    stage === "primary" &&
    fallbackBackdrop &&
    img.src !== window.location.origin + fallbackBackdrop
  ) {
    img.dataset.fallbackStage = "backdrop";
    img.src = fallbackBackdrop;
    return;
  }

  img.onerror = null;
  img.src = DEFAULT_THUMBNAIL;
};

function ShowDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const show = showsData.allShows.find((s) => s.id === id);
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [activeSeason, setActiveSeason] = useState(0);
  const [activeEpisode, setActiveEpisode] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const toggleShortlist = () => setIsShortlisted((prev) => !prev);

  const seasons = useMemo(() => {
    if (Array.isArray(show?.seasons) && show.seasons.length) {
      return show.seasons;
    }

    return [{ seasonNumber: 1, episodes: [] }];
  }, [show]);

  useEffect(() => {
    setActiveSeason(0);
    setShowAll(false);
  }, [show?.id]);

  useEffect(() => {
    setShowAll(false);
  }, [activeSeason]);

  if (!show) {
    return <p className="text-white p-4">Show not found.</p>;
  }

  const posterMobile = show.poster?.startsWith("/media")
    ? show.poster
    : getPosterUrl(show.id, "poster");

  const posterDesktop = show.backdrop?.startsWith("/media")
    ? show.backdrop
    : getPosterUrl(show.id, "backdrop");

  const defaultPoster = "/media/posters-desktop/default-poster.jpg";
  const firstEpisodeId = show.seasons?.[0]?.episodes?.[0]?.episodeId;
  const showBackdrop = show.backdrop;

  const season = seasons[activeSeason] || { episodes: [] };
  const episodes = Array.isArray(season.episodes) ? season.episodes : [];
  const visibleCount = 10;
  const visibleEpisodes = showAll ? episodes : episodes.slice(0, visibleCount);

  const handleSelectEpisode = (episode) => {
    const episodeId = episode.episodeId ?? episode.id ?? episode.episodeNumber;

    if (!episodeId) return;

    setActiveEpisode(episodeId);
    navigate(`/watch/${show.id}?ep=${episodeId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="flex-grow">
        <div className="px-4 sm:px-7 md:px-10 lg:px-16 py-4 max-w-[1800px] mx-auto">
          <div className="relative w-full aspect-[3/3] sm:aspect-auto sm:h-60 md:h-72 lg:h-[400px] overflow-hidden rounded-xl mb-4">
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
              <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
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

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/30 to-transparent" />
          </div>

          <div className="pb-10">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <h1 className="text-title">{show.title}</h1>

                <div className="flex items-center gap-2 text-yellow-400 mt-1 text-label">
                  <HugeiconsIcon icon={StarIcon} size={18} />
                  <span>{show.rating || "9.1"}</span>
                  <span className="text-meta text-gray-400">
                    ({show.views || "35k"} views)
                  </span>
                </div>

                <p className="text-meta text-gray-400 mt-1">
                  {show.duration || "2 hr"} | {show.language || "Hindi"} |{" "}
                  {show.year}
                </p>
              </div>

              <div className="flex items-center gap-5">
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
                  <HugeiconsIcon icon={PlayIcon} size={26} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {show.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-label rounded-full bg-white/70 text-black"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-body text-gray-400 mb-6">
              {show.description ||
                "Add something meaningful here about characters, story or nostalgia!"}
            </p>

            {/* Episodes header + season selector */}
            <div className="mb-4">
              <h2 className="mb-3 px-1 text-xl font-semibold text-yellow-300 md:text-2xl">
                Episodes
              </h2>

              {seasons.length > 1 && (
                <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
                  {seasons.map((seasonItem, index) => {
                    const isActiveSeason = index === activeSeason;

                    return (
                      <button
                        key={seasonItem.seasonNumber ?? index}
                        type="button"
                        onClick={() => setActiveSeason(index)}
                        className={`
                          flex-shrink-0
                          rounded-full
                          border
                          px-4
                          py-1.5
                          text-sm
                          font-medium
                          transition-all
                          duration-200
                          ${
                            isActiveSeason
                              ? "border-white/20 bg-white/20 text-white shadow-sm"
                              : "border-transparent bg-white/10 text-white/70 backdrop-blur-md hover:border-white/10 hover:bg-white/15 hover:text-white"
                          }
                        `}
                      >
                        {seasonItem.title ||
                          `Season ${seasonItem.seasonNumber ?? index + 1}`}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Episode cards */}
            <div
              className="
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-3
                sm:gap-4
                md:grid-cols-4
                lg:grid-cols-5
              "
            >
              {visibleEpisodes.map((episode, index) => {
                const parsedNumber = parseInt(
                  String(episode.id ?? "").replace(/\D/g, ""),
                  10,
                );

                const episodeNumber =
                  episode.episodeNumber ??
                  (Number.isNaN(parsedNumber) ? index + 1 : parsedNumber);

                const episodeId =
                  episode.episodeId ?? episode.id ?? episodeNumber;
                const thumbnail = getEpisodeThumbnail(episode, showBackdrop);
                const isActive = activeEpisode === episodeId;

                return (
                  <button
                    key={episodeId}
                    type="button"
                    onClick={() => handleSelectEpisode(episode)}
                    className={`
                      relative
                      text-left
                      bg-white/5
                      p-2.5
                      rounded-2xl
                      border
                      overflow-hidden
                      transition-all
                      duration-200
                      ${
                        isActive
                          ? "border-cyan-400/60 ring-1 ring-cyan-300/60"
                          : "border-white/10 hover:border-sky-400/60 hover:ring-1 hover:ring-sky-300/60 hover:shadow-[0_12px_35px_rgba(0,0,0,0.6)]"
                      }
                    `}
                  >
                    {/* IMAGE */}
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/30">
                      <img
                        src={thumbnail}
                        alt={episode.title || `Episode ${episodeNumber}`}
                        loading="lazy"
                        data-fallback-stage="primary"
                        onError={(event) =>
                          handleThumbnailError(event, showBackdrop)
                        }
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div
                          className="
                            bg-gradient-to-b from-white/20 to-white/10
                            bg-black/50 backdrop-blur-lg backdrop-saturate-150
                            border border-white/10
                            p-3 rounded-full
                            text-white/80 hover:text-white
                            hover:bg-black/60 hover:scale-110
                            transition-all duration-200
                          "
                        >
                          <HugeiconsIcon icon={PlayIcon} size={20} />
                        </div>
                      </div>

                      <div
                        className="
                          absolute
                          left-2
                          top-2
                          rounded-md
                          border
                          border-white/15
                          bg-black/60
                          px-2
                          py-0.5
                          text-[10px]
                          font-semibold
                          leading-4
                          text-white
                          backdrop-blur-md
                        "
                      >
                        E{episodeNumber}
                      </div>

                      <div className="absolute bottom-2 left-3 right-3">
                        <h4 className="text-sm font-semibold truncate">
                          {episode.title || `Episode ${episodeNumber}`}
                        </h4>
                      </div>
                    </div>

                    {/* SYNOPSIS */}
                    {episode.synopsis && (
                      <p className="text-xs text-gray-400 mt-1.5 px-0.5 line-clamp-2">
                        {episode.synopsis}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            {episodes.length > visibleCount && (
              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAll((previous) => !previous)}
                  className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/10
                    px-5
                    py-2
                    text-sm
                    font-medium
                    text-white/80
                    backdrop-blur-md
                    transition-all
                    duration-200
                    hover:border-white/20
                    hover:bg-white/15
                    hover:text-white
                  "
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>
              </div>
            )}

            <style>{`
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }

              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ShowDetailsPage;
