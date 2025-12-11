// src/Components/VideoBottomBar.jsx
import { FaBackward, FaCompress, FaExpand, FaForward } from "react-icons/fa";

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
  const pct = duration && duration > 0 ? Math.min(100, (value / duration) * 100) : 0;

  const handleSeekEnd = (val) => {
    const t = parseFloat(val) || 0;
    if (typeof onSeek === "function") onSeek(t);
    setDragSeekTime(null);
  };

  // computed gradient fallback if not provided
  const bg =
    progressBackground ??
    `linear-gradient(90deg, #06b6d4 ${pct}%, rgba(255,255,255,0.12) ${pct}%)`;

  return (
    <div
      data-controls
      className="absolute left-0 right-0 bottom-0 z-30 px-4 sm:px-8 lg:px-12 pb-1.5 sm:pb-5 pt-2 bg-gradient-to-t from-black/80 to-transparent pointer-events-auto"
    >
      {/* progress row */}
      <div className="flex items-center gap-0.5 mb-1.5 sm:mb-5">
        <span className="text-xs text-white w-12 text-left select-none">
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

        <span className="text-xs text-white w-12 text-right select-none">
          {formatTime(duration)}
        </span>
      </div>

      {/* control row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full overflow-hidden border border-white/10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (typeof goToPreviousEpisode === "function") goToPreviousEpisode();
            }}
            aria-label="Previous episode"
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/20 transition"
          >
            <FaBackward size={12} />
            <span className="hidden sm:inline">Prev</span>
          </button>

          <div className="w-px bg-white/20 self-stretch" />

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (typeof goToNextEpisode === "function") goToNextEpisode();
            }}
            aria-label="Next episode"
            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/20 transition"
          >
            <span className="hidden sm:inline">Next</span>
            <FaForward size={12} />
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
          {isFullscreen ? <FaCompress className="text-xl sm:text-xl" /> : <FaExpand className="text-xl sm:text-xl" />}
        </button>
      </div>

      {/* styles: uniform track thickness + transform centering for thumb */}
      <style jsx>{`
        /* variables: track height and thumb sizes */
        input[type="range"] {
          --track-h: 5px;        /* uniform track height for mobile + desktop */
          --thumb-mobile: 12px;  /* thumb on small screens */
          --thumb-desktop: 14px; /* thumb on sm+ */
          --thumb-size: var(--thumb-mobile);
          width: 100%;
          height: var(--track-h);
          background: transparent; /* gradient via inline style */
          border-radius: 999px;
          padding: 0;
          margin: 0;
          display: block;
        }

        /* use larger thumb on sm+ */
        @media (min-width: 640px) {
          input[type="range"] {
            --thumb-size: var(--thumb-desktop);
          }
        }

        /* WebKit track */
        input[type="range"]::-webkit-slider-runnable-track {
          height: var(--track-h);
          border-radius: 999px;
          background: transparent;
        }

        /* WebKit thumb - use transform to vertically center reliably */
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: var(--thumb-size);
          width: var(--thumb-size);
          border-radius: 999px;
          background: #22d3ee;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 6px rgba(34, 211, 238, 0.10);
          cursor: pointer;
          /* center the thumb: move by (track - thumb)/2. transform is more reliable on mobile WebKit */
          transform: translateY(calc((var(--track-h) - var(--thumb-size)) / 2));
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          transform: translateY(calc((var(--track-h) - var(--thumb-size)) / 2)) scale(1.06);
          box-shadow: 0 0 0 8px rgba(34, 211, 238, 0.10);
        }

        /* Firefox track & progress */
        input[type="range"]::-moz-range-track {
          height: var(--track-h);
          border-radius: 999px;
          background: transparent;
        }
        /* firefox's "progress" pseudo works for colored portion */
        input[type="range"]::-moz-range-progress {
          height: var(--track-h);
          border-radius: 999px;
          background: #06b6d4;
        }
        input[type="range"]::-moz-range-thumb {
          height: var(--thumb-size);
          width: var(--thumb-size);
          border-radius: 999px;
          background: #22d3ee;
          border: 1px solid rgba(255,255,255,0.08);
          cursor: pointer;
          /* center via translate as well */
          transform: translateY(calc((var(--track-h) - var(--thumb-size)) / 2));
        }

        /* IE / Edge (old) */
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
          background: rgba(255,255,255,0.12);
          border-radius: 999px;
        }
        input[type="range"]::-ms-thumb {
          height: var(--thumb-size);
          width: var(--thumb-size);
          border-radius: 999px;
          background: #22d3ee;
          border: 1px solid rgba(255,255,255,0.08);
          transform: translateY(calc((var(--track-h) - var(--thumb-size)) / 2));
        }

        /* small visual tweak: ensure no accidental top/bottom spacing for the input element */
        input[type="range"] {
          line-height: 0;
        }
      `}</style>
    </div>
  );
}
