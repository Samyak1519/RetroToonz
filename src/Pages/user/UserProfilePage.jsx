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
<<<<<<< HEAD
import showsDataRaw from "../../Data/Shows.json";
=======
import showsDataRaw from "../../data/Shows.json";
>>>>>>> e43d0ba959f5b4f67fdbad3036be0fbc2f7bda64

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

      <main className="flex-grow">
        <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-6 max-w-[1800px] mx-auto">
          {/* HEADER */}
          <section className="mb-10">
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => navigate(-1)}
                className="bg-white/5 hover:bg-white/10 p-2.5 rounded-full border border-white/10 transition"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
              </button>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/80">
                My Account
              </h1>
            </div>

            {/* PROFILE CARD */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              {/* LEFT */}
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                {/* AVATAR */}
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.2)]">
                    <HugeiconsIcon icon={UserIcon} size={42} />
                  </div>
                </div>

                {/* TEXT */}
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-semibold">
                    Samyak Nimsarkar
                  </h2>

                  <p className="text-cyan-300 mt-1">@samyak005</p>

                  <p className="text-sm text-gray-400 mt-2">
                    Cartoon lover • Nostalgia mode ON 🎬
                  </p>
                </div>
              </div>

              {/* EDIT BUTTON */}
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-cyan-500/10 border border-cyan-400/30 hover:bg-cyan-500/20 hover:border-cyan-300 transition">
                <HugeiconsIcon icon={Edit02Icon} size={16} />
                Edit Profile
              </button>
            </div>

            {/* DIVIDER */}
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
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  return (
    <div className="mb-10 relative">
      <h3 className="text-xl sm:text-2xl font-bold text-yellow-400">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>

      {/* LEFT */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
      </button>

      {/* RIGHT */}
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition"
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
    <div className="relative min-w-[260px] sm:min-w-[300px] lg:min-w-[320px] bg-white/5 p-2.5 rounded-xl border border-white/10 group">
      {/* REMOVE */}
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:bg-red-500/30 transition"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={16} />
        </button>
      )}

      {/* IMAGE */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
        <img
          src={show.thumbnail}
          alt={show.title}
          className="w-full h-full object-cover"
        />

        {/* PLAY */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
          <div className="bg-white/20 backdrop-blur-md p-3 rounded-full">
            <HugeiconsIcon icon={PlayIcon} size={20} />
          </div>
        </div>

        {/* TITLE OVER IMAGE (RECOMMENDED ONLY) */}
        {isRecommended && (
          <div className="absolute bottom-2 left-3 right-3">
            <h4 className="text-sm font-semibold text-white truncate">
              {show.title}
            </h4>
          </div>
        )}
      </div>

      {/* BELOW IMAGE */}
      {!isRecommended && (
        <div className="mt-2">
          <h4 className="text-sm font-semibold truncate">{show.title}</h4>

          {progress && (
            <p className="text-xs text-gray-400 mt-0.5">
              {show.season
                ? `Season ${show.season} • Episode ${show.episode || 1}`
                : "Continue watching"}
            </p>
          )}
        </div>
      )}

      {/* DESCRIPTION */}
      {showDescription && (
        <p className="text-xs text-gray-400 line-clamp-2 mt-1">
          {show.description || "No description available."}
        </p>
      )}

      {/* PROGRESS */}
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
