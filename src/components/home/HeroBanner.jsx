import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  InformationCircleIcon,
  PlayIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

    if (!m.addEventListener) {
      m.addListener(onChange);
    }

    return () => {
      m.removeEventListener?.("change", onChange);

      if (!m.removeEventListener) {
        m.removeListener(onChange);
      }
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

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + shows.length) % shows.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % shows.length);
  };

  const descriptionText = show.description || "";

  return (
    <div className="relative w-full overflow-hidden text-white">
      <div className="relative w-full aspect-[3/4] sm:aspect-[15/9] lg:aspect-[21/9]">
        {/* Background */}
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

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent z-20" />

        {/* Bottom Fade */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-t from-[#0F0A24] via-[#0F0A24]/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end items-start px-4 sm:px-6 lg:px-10 pb-10 sm:pb-6 md:pb-8 z-30">
          {/* Title */}
          <h1 className="mb-3 w-full">
            <div className="flex flex-col gap-1">
              <span className="text-label lg:text-base text-white/80">
                Watch
              </span>

              <span className="sm:text-5xl text-2xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                {show.title}
              </span>
            </div>
          </h1>

          {/* Description */}
          {descriptionText && (
            <div className="text-white/80 mb-3">
              <p className=" m-0 leading-relaxed text-sm lg:text-medium max-w-full lg:max-w-[50vw] line-clamp-2 lg:line-clamp-3">
                {descriptionText}
              </p>
            </div>
          )}
          {/* Tags */}
          {show.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {show.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="
                    px-2.5 py-1
                    text-[10px] sm:text-xs
                    font-medium tracking-wide
                    rounded-full
                    border border-white/20
                    bg-white/10 backdrop-blur-md
                    text-white/90
                    shadow-[0_4px_20px_rgba(0,0,0,0.4)]
                    relative
                    before:absolute before:inset-0 before:rounded-full
                    before:bg-white/10 before:blur-md before:opacity-0
                    hover:before:opacity-100
                    transition-all duration-300
                    hover:bg-white/20 hover:border-white/40 hover:scale-105
                  "
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2 lg:gap-4">
            <button
              onClick={handleStartWatching}
              className="group relative inline-flex items-center gap-2 text-white  px-4 py-2.5  lg:px-5 lg:py-3  rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 shadow-md  transition-all duration-300  hover:scale-105 active:scale-95 text-sm lg:text-sm font-medium"
            >
              <span className="absolute inline-flex h-9 w-9 rounded-full bg-cyan-400 opacity-20 group-hover:animate-ping -z-10" />
              <HugeiconsIcon icon={PlayIcon} size={20} />
              <span>Start Watching</span>
            </button>

            <button
              onClick={handleMoreInfo}
              className="
                flex items-center justify-center
                w-11 h-11
                rounded-full
                bg-white/20 hover:bg-white/30
                backdrop-blur-md border border-white/20
                transition-all duration-300
                hover:scale-105
              "
              title="More Info"
            >
              <HugeiconsIcon icon={InformationCircleIcon} size={20} />
            </button>
          </div>

          {/* Desktop Navigation */}
          <button
            onClick={handlePrev}
            className="
              hidden lg:flex
              absolute left-6 top-1/2 -translate-y-1/2
              w-14 h-14
              items-center justify-center
              rounded-full
              bg-black/20
              hover:bg-black/50
              backdrop-blur-sm
              transition-all duration-300
              hover:scale-110
              z-40
            "
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={28} />
          </button>

          <button
            onClick={handleNext}
            className="
              hidden lg:flex
              absolute right-6 top-1/2 -translate-y-1/2
              w-14 h-14
              items-center justify-center
              rounded-full
              bg-black/20
              hover:bg-black/50
              backdrop-blur-sm
              transition-all duration-300
              hover:scale-110
              z-40
            "
          >
            <HugeiconsIcon icon={ArrowRight01Icon} size={28} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-2 lg:bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-40">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === index % 5
                    ? "w-5 h-2 bg-white"
                    : "w-1.5 h-1.5 bg-white/40"
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
            from {
              transform: scale(1.05);
            }
            to {
              transform: scale(1.1);
            }
          }
        `}
      </style>
    </div>
  );
}

export default HeroBanner;
