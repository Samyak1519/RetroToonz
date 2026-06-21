import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft02Icon,
  VolumeMuteIcon,
  VolumeHighIcon,
} from "@hugeicons/core-free-icons";

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
      : (currentEpisode?.episodeId ?? null);

  const episodeTitle = currentEpisode?.title || "";

  // ✅ Handle Back Button Logic
  const handleBack = (e) => {
    e.stopPropagation();

    if (isFullscreen) {
      // ✅ Exit Fullscreen mode instead of navigating
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      // ✅ Standard navigation if not in fullscreen
      if (currentShow?.id) {
        navigate(`/show/${currentShow.id}`);
      } else {
        navigate(-1);
      }
    }
  };

  const containerClasses = [
    "absolute top-0 left-0 right-0 z-40",
    "bg-gradient-to-b from-black/70 to-transparent",
    "px-4 sm:px-8 md:px-12 py-3",
    "flex items-center justify-between",
    isFullscreen ? "sm:pt-4 lg:pt-4" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div data-controls className={containerClasses}>
      {/* LEFT SIDE */}
      <div className="flex items-center min-w-0">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="p-2 sm:p-3 mr-e rounded-full hover:bg-white/40 transition flex items-center"
          aria-label={isFullscreen ? "Exit Fullscreen" : "Back to show"}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} size={20} />
        </button>

        {/* Info Overlay (Visible in Fullscreen or Mobile) */}
        <div className="flex items-center gap-5 truncate min-w-0">
          <div className="text-heading text-white truncate min-w-0">
            <span>{showTitle}</span>
            {episodeNumber && (
              <span className="text-white/80 text-body">
                <br />E{episodeNumber} :{episodeTitle ? ` ${episodeTitle}` : ""}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center">
        <div className="relative mr-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMute(e);
              resetControlsTimer();
            }}
            className="p-2 rounded-full hover:bg-white/10 transition"
            title={isMuted ? "Unmute" : "Mute"}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? (
              <HugeiconsIcon icon={VolumeMuteIcon} size={20} />
            ) : (
              <HugeiconsIcon icon={VolumeHighIcon} size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
