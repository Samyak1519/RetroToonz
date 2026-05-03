// src/pages/user/UserProfilePage.jsx

import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  Edit02Icon,
  PlayIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";

import showsDataRaw from "../../data/Shows.json";

const UserProfilePage = () => {
  const navigate = useNavigate();

  const allShows = showsDataRaw.allShows || [];

  const [continueWatching, setContinueWatching] = useState(
    allShows.slice(0, 6).map((show, i) => ({
      ...show,
      season: 1 + (i % 3),
      episode: 1 + i * 2,
    })),
  );

  const [watchHistory, setWatchHistory] = useState(allShows.slice(6, 14));
  const recommended = allShows.slice(14, 25);

  const removeFromContinue = (id) => {
    setContinueWatching((prev) => prev.filter((s) => s.id !== id));
  };

  const removeFromHistory = (id) => {
    setWatchHistory((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#050b14] via-[#0a1528] to-[#04080f] text-white">
      <Header />

      <main className="flex-grow relative">
        <div className="px-4 sm:px-7 md:px-10 lg:px-16 py-6 sm:py-8 max-w-[2000px] mx-auto relative">
          {/* HEADER */}
          <section className="mb-10">
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => navigate(-1)}
                className="bg-white/5 hover:bg-white/10 p-2.5 rounded-full border border-white/10 text-white transition-all"
                aria-label="Go back"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
              </button>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/80 tracking-tight">
                My Account
              </h1>
            </div>

            {/* PROFILE CARD */}
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl">
              {/* 🔥 Subtle Gradient Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

              {/* LEFT */}
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 z-10">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <HugeiconsIcon icon={UserIcon} size={42} />
                  </div>

                  {/* Glow Ring */}
                  <div className="absolute inset-0 rounded-full border border-white/20 blur-sm opacity-60" />
                </div>

                {/* Info */}
                <div className="text-center md:text-left space-y-1">
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    Samyak Nimsarkar
                  </h2>

                  <p className="text-sm text-cyan-300 font-medium">
                    @samyak005
                  </p>

                  <p className="text-sm text-gray-400 mt-2 max-w-md">
                    Cartoon lover • Nostalgia mode ON 🎬
                  </p>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-3 z-10">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-400/30 hover:from-cyan-500/30 hover:to-indigo-500/30 transition-all duration-200 shadow-md hover:shadow-lg">
                  <HugeiconsIcon icon={Edit02Icon} size={16} />
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="mt-10 border-t border-white/10" />
          </section>

          {/* CONTINUE WATCHING */}
          <Row
            title="Continue Watching"
            description="Resume where you left off."
          >
            {continueWatching.map((show, i) => (
              <Card
                key={show.id}
                show={show}
                progress={[60, 30, 80, 50, 20, 90][i]}
                onRemove={() => removeFromContinue(show.id)}
              />
            ))}
          </Row>

          {/* WATCH HISTORY */}
          <Row title="Watch History" description="Recently watched shows.">
            {watchHistory.map((show) => (
              <Card
                key={show.id}
                show={show}
                onRemove={() => removeFromHistory(show.id)}
              />
            ))}
          </Row>

          {/* RECOMMENDED */}
          <Row title="Recommended Shows" description="Based on your interests.">
            {recommended.map((show) => (
              <Card key={show.id} show={show} isRecommended showDescription />
            ))}
          </Row>
        </div>
      </main>

      <Footer />
    </div>
  );
};

/* ROW */
function Row({ title, description, children }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  return (
    <div className="mb-10 relative">
      <h3 className="text-xl sm:text-2xl font-semibold text-yellow-300">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>

      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-0 top-6/10 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
      </button>

      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-0 top-6/10 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10"
      >
        <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide"
      >
        {children}
      </div>
    </div>
  );
}

/* CARD */
function Card({ show, progress, onRemove, showDescription, isRecommended }) {
  return (
    <div
      className="relative min-w-[260px] sm:min-w-[300px] lg:min-w-[320px] 
                 bg-white/5 p-2.5 my-1 rounded-2xl 
                 border border-white/10 
                 overflow-hidden
                 transition-all duration-200

                 hover:border-sky-400/60
                 hover:ring-1 hover:ring-sky-300/60
                 hover:shadow-[0_12px_35px_rgba(0,0,0,0.6)]"
    >
      {/* REMOVE */}
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center 
                     rounded-full 
                     bg-gradient-to-b from-white/20 to-white/5 
                     bg-black/50 backdrop-blur-lg backdrop-saturate-150
                     border border-white/10 
                     shadow-[0_6px_24px_rgba(0,0,0,0.7)] 
                     text-white/70 hover:text-white 
                     hover:bg-black/60 hover:scale-110
                     transition-all duration-200"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={16} />
        </button>
      )}

      {/* IMAGE */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <img
          src={show.thumbnail}
          alt={show.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div
            className="bg-gradient-to-b from-white/20 to-white/10 
                       bg-black/50 backdrop-blur-lg backdrop-saturate-150
                       border border-white/10  
                       p-3 rounded-full cursor-pointer 
                       text-white/80 hover:text-white 
                       hover:bg-black/60 hover:scale-110
                       transition-all duration-200"
          >
            <HugeiconsIcon icon={PlayIcon} size={20} />
          </div>
        </div>

        {isRecommended && (
          <div className="absolute bottom-2 left-3 right-3">
            <h4 className="text-sm font-semibold truncate">{show.title}</h4>
          </div>
        )}
      </div>

      {!isRecommended && (
        <div className="mt-2">
          <h4 className="text-sm font-semibold truncate">{show.title}</h4>

          {progress && (
            <p className="text-xs text-gray-400">
              Season {show.season} • Episode {show.episode}
            </p>
          )}
        </div>
      )}

      {showDescription && (
        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
          {show.description || "No description available."}
        </p>
      )}

      {progress && (
        <div className="mt-1.5 h-1 bg-gray-700 rounded">
          <div
            className="h-1 bg-cyan-400 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default UserProfilePage;
