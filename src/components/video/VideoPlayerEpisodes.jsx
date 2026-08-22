import { PlayIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useMemo, useState } from "react";

const DEFAULT_THUMBNAIL = "/media/extras/default.jpg";

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

// New: handles runtime load failures, not just missing fields
const handleThumbnailError = (event, showBackdrop) => {
  const img = event.currentTarget;
  const stage = img.dataset.fallbackStage || "primary";
  const fallbackBackdrop = normalizePath(showBackdrop);

  if (
    stage === "primary" &&
    fallbackBackdrop &&
    img.src !== window.location.origin + fallbackBackdrop
  ) {
    // primary thumbnail failed to load -> try the show's backdrop
    img.dataset.fallbackStage = "backdrop";
    img.src = fallbackBackdrop;
    return;
  }

  // backdrop also failed (or there wasn't one) -> final fallback
  img.onerror = null;
  img.src = DEFAULT_THUMBNAIL;
};

export default function VideoPlayerEpisodes({
  seasons,
  showBackdrop,
  activeEpisodeId,
  onSelectEpisode,
}) {
  const normalizedSeasons = useMemo(() => {
    if (Array.isArray(seasons) && seasons.length) {
      return seasons;
    }

    return [
      {
        seasonNumber: 1,
        episodes: [],
      },
    ];
  }, [seasons]);

  const [activeSeason, setActiveSeason] = useState(0);
  const [activeEpisode, setActiveEpisode] = useState(activeEpisodeId ?? null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setActiveEpisode(activeEpisodeId ?? null);
  }, [activeEpisodeId]);

  useEffect(() => {
    setShowAll(false);
  }, [activeSeason]);

  const season = normalizedSeasons[activeSeason] || {
    episodes: [],
  };

  const episodes = Array.isArray(season.episodes) ? season.episodes : [];

  const visibleCount = 10;

  const visibleEpisodes = showAll ? episodes : episodes.slice(0, visibleCount);

  const handleSelectEpisode = (episode) => {
    const episodeId = episode.episodeId ?? episode.id ?? episode.episodeNumber;

    if (!episodeId) return;

    setActiveEpisode(episodeId);
    onSelectEpisode?.(episodeId);
  };

  return (
    <section className="mb-8 w-full">
      {/* Header */}
      <div className="mb-4">
        <h2 className="mb-3 px-1 text-xl font-semibold text-yellow-300 md:text-2xl">
          Episodes
        </h2>

        {/* Season selector */}
        {normalizedSeasons.length > 1 && (
          <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
            {normalizedSeasons.map((seasonItem, index) => {
              const isActive = index === activeSeason;

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
                      isActive
                        ? "border-white/20 bg-white/20 text-white shadow-sm"
                        : "border-transparent bg-white/10 text-white/70 backdrop-blur-md hover:border-white/10 hover:bg-white/15 hover:text-white"
                    }
                  `}
                >
                  Season {seasonItem.seasonNumber ?? index + 1}
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

          const episodeId = episode.episodeId ?? episode.id ?? episodeNumber;
          const thumbnail = getEpisodeThumbnail(episode, showBackdrop);
          const isActive = activeEpisode === episodeId;

          return (
            <button
              key={episodeId}
              type="button"
              onClick={() => handleSelectEpisode(episode)}
              className={`
                group
                flex
                min-w-0
                flex-col
                overflow-hidden
                rounded-xl
                border
                bg-white/[0.045]
                p-2
                text-left
                transition-all
                duration-200
                ${
                  isActive
                    ? "border-cyan-300/50 bg-cyan-300/[0.06] ring-1 ring-cyan-300/50"
                    : "border-white/10 hover:border-white/20 hover:bg-white/[0.07] hover:ring-1 hover:ring-sky-300/30"
                }
              `}
            >
              {/* 16:9 thumbnail */}
              <div
                className="
                  relative
                  aspect-video
                  w-full
                  overflow-hidden
                  rounded-lg
                  bg-black/30
                "
              >
                <img
                  src={thumbnail}
                  alt={episode.title || `Episode ${episodeNumber}`}
                  loading="lazy"
                  data-fallback-stage="primary"
                  onError={(event) => handleThumbnailError(event, showBackdrop)}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />

                {/* Bottom gradient */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/65
                    via-black/5
                    to-transparent
                  "
                />

                {/* Episode number */}
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

                {/* Play overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    bg-black/25
                    opacity-100
                    transition-all
                    duration-200
                    sm:opacity-0
                    sm:group-hover:bg-black/35
                    sm:group-hover:opacity-100
                  "
                >
                  <span
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/20
                      bg-black/55
                      text-white
                      shadow-lg
                      backdrop-blur-md
                      transition-transform
                      duration-200
                      group-hover:scale-110
                    "
                  >
                    <HugeiconsIcon icon={PlayIcon} size={19} />
                  </span>
                </div>
              </div>

              {/* Episode title */}
              <div className="px-1 pt-1">
                <h4
                  className="
                    truncate
                    text-sm
                    font-medium
                    leading-5
                    text-white
                  "
                >
                  {episode.title || `Episode ${episodeNumber}`}
                </h4>
              </div>
            </button>
          );
        })}
      </div>

      {/* Show More / Show Less */}
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
    </section>
  );
}
