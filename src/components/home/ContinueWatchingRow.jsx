// src/components/home/ContinueWatchingRow.jsx
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  PlayIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function ContinueWatchingRow({ shows = [] }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  if (!shows.length) return null;

  return (
    <div className=" relative px-4 sm:px-6">
      {/* Header */}
      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-yellow-300">
        Continue Watching
      </h3>
      <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
        Resume where you left off
      </p>

      {/* LEFT ARROW */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-0 top-3/5 -translate-y-1/2 z-20
             w-10 h-10 items-center justify-center
             rounded-full
             bg-black/40 backdrop-blur-md
             border border-white/10
             text-white/70 hover:text-white
             hover:bg-black/60 hover:scale-110
             transition-all duration-200"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-0 top-3/5 -translate-y-1/2 z-20
             w-10 h-10 items-center justify-center
             rounded-full
             bg-black/40 backdrop-blur-md
             border border-white/10
             text-white/70 hover:text-white
             hover:bg-black/60 hover:scale-110
             transition-all duration-200"
      >
        <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
      </button>
      {/* Row */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide"
      >
        {shows.map((show, i) => (
          <Card key={show.id} show={show} index={i} />
        ))}
      </div>
    </div>
  );
}

/* 🔥 CARD (FINAL VERSION) */
function Card({ show, index }) {
  const navigate = useNavigate(); // 👈 ADD THIS
  const progress = Math.floor(Math.random() * 80) + 10;

  const season = 1 + (index % 3);
  const episode = 1 + index * 2;

  // fake duration logic (for now)
  const totalMinutes = 24; // assume cartoon episode
  const timeLeft = Math.round(((100 - progress) / 100) * totalMinutes);

  const handleClick = () => {
    console.log("Clicked:", show.id); // 👈 DEBUG
    navigate(`/watch/${show.id}`); // 👈 NAVIGATE
  };

  return (
    <div
      onClick={handleClick} // 👈 IMPORTANT
      className="relative min-w-[230px] sm:min-w-[300px] lg:min-w-[300px] 
                 bg-white/5 p-2.5 my-1 rounded-2xl 
                 border border-white/10 
                 overflow-hidden
                 transition-all duration-200

                 hover:border-sky-400/60
                 hover:ring-1 hover:ring-sky-300/60
                 hover:shadow-[0_12px_35px_rgba(0,0,0,0.6)]"
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <img
          src={show.thumbnail}
          alt={show.title}
          className="w-full h-full object-cover"
        />

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* PLAY */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="bg-gradient-to-b from-white/20 to-white/10 
                       bg-black/50 backdrop-blur-lg backdrop-saturate-150
                       border border-white/10  
                       p-3 rounded-full cursor-pointer 
                       text-white/80 hover:text-white 
                       hover:bg-black/60 hover:scale-110
                       transition-all duration-200"
          >
            <HugeiconsIcon icon={PlayIcon} size={17} />
          </div>
        </div>

        {/* 🔥 TITLE + META ROW */}
        <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
          <h4 className="text-sm font-semibold text-white truncate max-w-[70%]">
            {show.title}
          </h4>

          <span className="text-[11px] text-gray-300 whitespace-nowrap">
            S{season} • E{episode}
          </span>
        </div>
      </div>

      {/* 🔥 PROGRESS + TIME */}
      <div className="mt-2 flex items-center gap-2">
        <div className="flex-1 h-1 bg-gray-700 rounded">
          <div
            className="h-1 bg-cyan-400 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-[11px] text-gray-400 whitespace-nowrap">
          {timeLeft}m left
        </span>
      </div>
    </div>
  );
}

export default ContinueWatchingRow;
