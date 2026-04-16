import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlayIcon, InformationCircleIcon } from "@hugeicons/core-free-icons";

const DEFAULT_POSTER = "/Assets/default.jpg";

const normalizePath = (p) => {
  if (!p) return DEFAULT_POSTER;
  return p.startsWith("/") ? p : `/Assets/${p}`;
};

function HeroBanner({ shows = [] }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [slideIn, setSlideIn] = useState(true);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 640px)").matches
      : false,
  );

  useEffect(() => {
    const m = window.matchMedia("(max-width: 640px)");
    const onChange = (e) => setIsMobile(e.matches);
    m.addEventListener?.("change", onChange);
    if (!m.addEventListener) m.addListener(onChange);
    return () => {
      m.removeEventListener?.("change", onChange);
      if (!m.removeEventListener) m.removeListener(onChange);
    };
  }, []);

  useEffect(() => {
    if (!shows.length) return;
    const interval = setInterval(() => {
      setSlideIn(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % shows.length);
        setSlideIn(true);
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, [shows.length]);

  if (!shows.length) return null;
  const show = shows[index];

  const handleStartWatching = () => navigate(`/watch/${show.id}`);
  const handleMoreInfo = () => navigate(`/show/${show.id}`);

  const formatDescription = (text = "", wordsPerLine = 10, maxLines = 3) => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    const lines = [];

    for (let i = 0; i < maxLines; i++) {
      const start = i * wordsPerLine;
      const end = start + wordsPerLine;
      if (start >= words.length) break;

      let lineWords = words.slice(start, end);

      if (i === maxLines - 1 && words.length > end) {
        const lastIdx = lineWords.length - 1;
        lineWords[lastIdx] = `${lineWords[lastIdx]}...`;
      }

      lines.push(lineWords.join(" "));
    }

    return lines;
  };

  const descriptionLines = isMobile
    ? formatDescription(show.description, 8, 2)
    : formatDescription(show.description, 10, 3);

  return (
    <div className="relative w-full overflow-hidden text-white">
      <div className="relative w-full aspect-[3/4] sm:aspect-[15/9] lg:aspect-[21/9]">
        {/* Background (Right → Left) */}
        <div
          key={show.id}
          className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out transform ${
            slideIn
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          <picture>
            {show.thumbnailMobile && (
              <source
                srcSet={normalizePath(show.thumbnailMobile)}
                media="(max-width: 640px)"
              />
            )}
            <img
              src={normalizePath(show.thumbnail)}
              alt={show.title}
              className="w-full h-full object-cover scale-105 animate-[slowZoom_12s_linear_infinite]"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = DEFAULT_POSTER;
              }}
            />
          </picture>
        </div>

        {/* Reduced Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-20" />

        {/* Bottom fade */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-t from-[#0F0A24] via-[#0F0A24]/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end items-start px-4 sm:px-6 md:px-14 pb-8 sm:pb-8 md:pb-10 z-30">
          {/* Title */}
          <h1 className="mb-3 w-full">
            <div className="flex flex-col gap-1">
              <span className="text-label text-white/80">Watch</span>

              <span className="text-display text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                {show.title}
              </span>
            </div>
          </h1>

          {/* Tags */}
          {show.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {show.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-label bg-white/10 border border-white/20 rounded-full backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          {descriptionLines.length > 0 && (
            <div className="text-body text-white/80 mb-5">
              {descriptionLines.map((line, idx) => (
                <p key={idx} className="m-0">
                  {line}
                </p>
              ))}
            </div>
          )}

          {/* 🔥 PREMIUM BUTTONS (RESTORED) */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleStartWatching}
              className="
                group relative inline-flex items-center gap-2 
                text-white px-4 py-2.5 rounded-full 
                bg-gradient-to-r from-cyan-500 to-blue-600 
                hover:from-blue-600 hover:to-cyan-500
                shadow-md transition-all duration-300 
                hover:scale-105 active:scale-95
                text-label
              "
            >
              <span className="absolute inline-flex h-9 w-9 rounded-full bg-cyan-400 opacity-20 group-hover:animate-ping -z-10" />
              <HugeiconsIcon icon={PlayIcon} size={20} />
              <span>Start Watching</span>
            </button>

            <button
              onClick={handleMoreInfo}
              className="
                flex items-center justify-center 
                w-10 h-10 rounded-full 
                bg-white/20 hover:bg-white/30 
                backdrop-blur-md border border-white/20
                transition-all duration-300
              "
              title="More Info"
            >
              <HugeiconsIcon icon={InformationCircleIcon} size={18} />
            </button>
          </div>

          {/* 🔥 CENTERED INDICATOR */}
          <div className="absolute bottom-1 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-40">
            {shows.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-3 bg-white" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
        @keyframes slowZoom {
          from { transform: scale(1.05); }
          to { transform: scale(1.1); }
        }
        `}
      </style>
    </div>
  );
}

export default HeroBanner;
