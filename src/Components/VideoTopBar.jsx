import { FaArrowLeft, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

export default function VideoTopBar({
  currentShow,
  currentEpisode,
  navigate,
  isMuted,
  volume,
  toggleMute,
  resetControlsTimer,
  isFullscreen,
}) {
  const showTitle =
    currentShow?.title || currentShow?.name || currentShow?.id || "Show";

  const episodeNumber =
    currentEpisode?.episodeNumber !== undefined &&
    currentEpisode?.episodeNumber !== null
      ? String(currentEpisode.episodeNumber).padStart(2, "0")
      : currentEpisode?.episodeId ?? null;

  const episodeTitle = currentEpisode?.title || "";

  const containerClasses = [
    "absolute top-0 left-0 right-0 z-40",
    "bg-gradient-to-b from-black/70 to-transparent",
    "px-5 py-2 sm:py-3",
    "flex items-center justify-between",
    isFullscreen ? "sm:pt-6 lg:pt-8" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div data-controls className={containerClasses}>
      <div className="flex items-center min-w-0 sm:px-0 md:px-6">
        {/* Back button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (currentShow?.id) {
              navigate(`/show/${currentShow.id}`);
            } else {
              navigate(-1);
            }
          }}
          className="p-2 sm:p-3  mr-2 rounded-full hover:bg-white/10 transition flex items-center"
          aria-label="Back to show"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <FaArrowLeft className="text-xl sm:text-xl" />
        </button>

        {isFullscreen && (
          <div className="flex items-center gap-2 truncate min-w-0">
            {/* Main label — plain inline text (no background) */}
            <div className="text-sm sm:text-lg text-white truncate min-w-0">
              <span className="font-semibold">{showTitle}</span>
              {episodeNumber && (
                <span className="text-white/90">
                  {" "}
                  : E{episodeNumber}
                  {episodeTitle ? ` "${episodeTitle}"` : ""}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center relative">
        {/* volume button: only mute/unmute now */}
        <div className="relative mr-2 sm:mr-10 ">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMute(e);
              resetControlsTimer();
            }}
            className="p-2 sm:pr-1 rounded-full hover:bg-white/10 transition"
            title={isMuted ? "Unmute" : "Mute"}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? (
              <FaVolumeMute className="text-xl sm:text-xl" />
            ) : (
              <FaVolumeUp className="text-xl sm:text-xl" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
