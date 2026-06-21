// src/components/VideoBottomBar.jsx

import {
  ArrowShrinkIcon,
  Backward01Icon,
  Forward01Icon,
  FullscreenIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function VideoBottomBar({
  currentTime,
  duration,
  dragSeekTime,
  setDragSeekTime,
  onSeek,
  formatTime,
  progressBackground,
  goToNextEpisode,
  goToPreviousEpisode,
  toggleFullscreen,
  isFullscreen,
}) {
  const value = dragSeekTime ?? currentTime ?? 0;
  const pct =
    duration && duration > 0 ? Math.min(100, (value / duration) * 100) : 0;

  const handleSeekEnd = (val) => {
    const t = parseFloat(val) || 0;
    if (typeof onSeek === "function") onSeek(t);
    setDragSeekTime(null);
  };

  const bg =
    progressBackground ??
    `linear-gradient(90deg, #06b6d4 ${pct}%, rgba(255,255,255,0.12) ${pct}%)`;

  return (
    <div
      data-controls
      className="absolute left-0 right-0 bottom-0 z-30 px-4 sm:px-8 md:px-12 pb-3 sm:pb-4 md:pb-6 pt-3 bg-gradient-to-t from-black/80 to-transparent pointer-events-auto"
    >
      {/* progress row */}
      <div className="flex items-center gap-2 mb-3 sm:mb-4 lg:mb-6 px-1">
        <span className="text-meta text-white w-12 text-left select-none">
          {formatTime(value)}
        </span>

        <input
          aria-label="Seek"
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={value}
          onChange={(e) => setDragSeekTime(parseFloat(e.target.value))}
          onMouseUp={(e) => handleSeekEnd(e.target.value)}
          onTouchEnd={(e) => handleSeekEnd(e.target.value)}
          className="flex-1 cursor-pointer appearance-none"
          style={{ background: bg }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        />

        <span className="text-meta text-white w-12 text-right select-none">
          {formatTime(duration)}
        </span>
      </div>

      {/* control row */}
      <div className="flex items-center justify-between px-1 pr-0">
        <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full overflow-hidden border border-white/10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (typeof goToPreviousEpisode === "function")
                goToPreviousEpisode();
            }}
            aria-label="Previous episode"
            className="flex items-center gap-2 px-4 py-2 text-label hover:bg-white/20 transition"
          >
            <HugeiconsIcon icon={Backward01Icon} size={20} />
            <span className="hidden sm:inline text-label">Prev</span>
          </button>

          <div className="w-px bg-white/20 self-stretch" />

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (typeof goToNextEpisode === "function") goToNextEpisode();
            }}
            aria-label="Next episode"
            className="flex items-center gap-2 px-4 py-2 text-label hover:bg-white/20 transition"
          >
            <span className="hidden sm:inline text-label">Next</span>
            <HugeiconsIcon icon={Forward01Icon} size={20} />
          </button>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFullscreen && toggleFullscreen(e);
          }}
          aria-label="Toggle fullscreen"
          title="Toggle fullscreen (F)"
          className="p-2 rounded-full hover:bg-white/10 transition"
        >
          {isFullscreen ? (
            <HugeiconsIcon icon={ArrowShrinkIcon} size={20} />
          ) : (
            <HugeiconsIcon icon={FullscreenIcon} size={20} />
          )}
        </button>
      </div>

      {/* styles unchanged */}
      <style jsx>{`
        input[type="range"] {
          --track-h: 5px;
          --thumb-mobile: 12px;
          --thumb-desktop: 14px;
          --thumb-size: var(--thumb-mobile);
          width: 100%;
          height: var(--track-h);
          background: transparent;
          border-radius: 999px;
          padding: 0;
          margin: 0;
          display: block;
        }

        @media (min-width: 640px) {
          input[type="range"] {
            --thumb-size: var(--thumb-desktop);
          }
        }

        input[type="range"]::-webkit-slider-runnable-track {
          height: var(--track-h);
          border-radius: 999px;
          background: transparent;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: var(--thumb-size);
          width: var(--thumb-size);
          border-radius: 999px;
          background: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 6px rgba(34, 211, 238, 0.1);
          cursor: pointer;
          transform: translateY(calc((var(--track-h) - var(--thumb-size)) / 2));
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          transform: translateY(calc((var(--track-h) - var(--thumb-size)) / 2))
            scale(1.06);
          box-shadow: 0 0 0 8px rgba(34, 211, 238, 0.1);
        }

        input[type="range"]::-moz-range-track {
          height: var(--track-h);
          border-radius: 999px;
          background: transparent;
        }

        input[type="range"]::-moz-range-progress {
          height: var(--track-h);
          border-radius: 999px;
          background: #06b6d4;
        }

        input[type="range"]::-moz-range-thumb {
          height: var(--thumb-size);
          width: var(--thumb-size);
          border-radius: 999px;
          background: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          transform: translateY(calc((var(--track-h) - var(--thumb-size)) / 2));
        }

        input[type="range"]::-ms-track {
          height: var(--track-h);
          background: transparent;
          border-color: transparent;
          color: transparent;
        }

        input[type="range"]::-ms-fill-lower {
          background: #06b6d4;
          border-radius: 999px;
        }

        input[type="range"]::-ms-fill-upper {
          background: rgba(255, 255, 255, 0.12);
          border-radius: 999px;
        }

        input[type="range"]::-ms-thumb {
          height: var(--thumb-size);
          width: var(--thumb-size);
          border-radius: 999px;
          background: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transform: translateY(calc((var(--track-h) - var(--thumb-size)) / 2));
        }

        input[type="range"] {
          line-height: 0;
        }
      `}</style>
    </div>
  );
}
