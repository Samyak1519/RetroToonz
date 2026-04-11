import {
  GoBackward10SecIcon,
  GoForward10SecIcon,
  PauseIcon,
  PlayIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function VideoCenterControls({
  isPlaying,
  togglePlayPause,
  rewind,
  forward,
  isBuffering,
  showControls,
}) {
  const glassBtn =
    "bg-black/30 backdrop-blur-md border border-white/10 hover:bg-white/20 transition rounded-full text-white flex items-center justify-center";

  return (
    <div
      data-controls
      className={`
        absolute inset-0 z-30 flex items-center justify-center
        pointer-events-none
        transition-opacity duration-300 ease-in-out
        translate-y-[-10px] sm:translate-y-0

        ${showControls ? "opacity-100" : "opacity-0"}
      `}
    >
      {/* Spinner */}
      {isBuffering && (
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
          <div className="yt-spinner-container">
            <div className="yt-spinner" />
          </div>
        </div>
      )}

      <div className="pointer-events-auto flex items-center gap-10 sm:gap-16">
        {/* Rewind */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            rewind?.();
          }}
          className={`${glassBtn} p-2.5 sm:p-3`}
        >
          <HugeiconsIcon icon={GoBackward10SecIcon} size={20} />
        </button>

        {/* Play / Pause */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlayPause?.();
          }}
          className={`${glassBtn} p-3.5 sm:p-4`}
        >
          {isPlaying ? (
            <HugeiconsIcon icon={PauseIcon} size={22} />
          ) : (
            <HugeiconsIcon icon={PlayIcon} size={22} />
          )}
        </button>

        {/* Forward */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            forward?.();
          }}
          className={`${glassBtn} p-2.5 sm:p-3`}
        >
          <HugeiconsIcon icon={GoForward10SecIcon} size={20} />
        </button>
      </div>

      {/* Spinner CSS */}
      <style jsx>{`
        .yt-spinner-container {
          padding: 16px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .yt-spinner {
          width: 40px;
          height: 40px;
          border-radius: 999px;
          border: 3px solid rgba(255, 255, 255, 0.25);
          border-top-color: white;
          animation: yt-spin 0.75s linear infinite;
        }

        @keyframes yt-spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
