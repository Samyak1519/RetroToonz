// src/pages/user/UserProfilePage.jsx

import {
  AddCircleIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  DashboardSquare01Icon,
  Cancel01Icon,
  Edit02Icon,
  Home02Icon,
  PlayIcon,
  PlayListAddIcon,
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

      <main className="flex-grow">
        <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-10 max-w-[1800px] mx-auto">
          
          {/* HEADER */}
          <section className="mb-10">
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => navigate(-1)}
                className="bg-white/5 hover:bg-white/10 p-2.5 rounded-full border border-white/10 transition"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
              </button>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/90">
                My Account
              </h1>
            </div>

            {/* PROFILE CARD */}
            <div
              className="relative flex flex-col md:flex-row items-center justify-between gap-8 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white/5 via-white/5 to-transparent border border-white/10 backdrop-blur-xl shadow-xl"
            >
              {/* LEFT */}
              <div className="flex items-center gap-6 md:gap-8 w-full">
                {/* Avatar */}
                <div className="relative">
                  <div
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full 
        bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 
        flex items-center justify-center shadow-lg"
                  >
                    <HugeiconsIcon icon={UserIcon} size={42} />
                  </div>

                  {/* Admin Badge */}
                  <span
                    className="absolute -bottom-1 -right-1 px-2 py-[2px] text-[10px] rounded-full 
        bg-yellow-400/20 text-yellow-300 border border-yellow-400/30"
                  >
                    ADMIN
                  </span>
                </div>

                {/* Text */}
                <div className="flex flex-col">
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    Samyak Nimsarkar
                  </h2>

                  <p className="text-cyan-300 text-sm mt-1">@samyak005</p>

                  <p className="text-xs text-gray-400 mt-2">
                    Managing RetroToonz Platform • Content & System Control
                  </p>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-3">
                {/* BUTTON GROUP */}
                <div className="flex items-center gap-3">
                  {/* PRIMARY */}
                  <button
                    onClick={() => navigate("/admin")}
                    className="flex items-center justify-center gap-2 
    h-10 px-5 min-w-[140px]
    rounded-xl text-sm font-medium

    bg-gradient-to-r from-yellow-400/25 to-yellow-300/10 
    border border-yellow-400/30 text-yellow-300

    backdrop-blur-md shadow-md
    hover:from-yellow-400/35 hover:to-yellow-300/20
    hover:scale-[1.03]

    whitespace-nowrap
    transition-all duration-200"
                  >
                    <HugeiconsIcon icon={DashboardSquare01Icon} size={16} />
                    Dashboard
                  </button>

                  {/* SECONDARY */}
                  <button
                    className="flex items-center justify-center gap-2 
    h-10 px-5 min-w-[140px]
    rounded-xl text-sm font-medium

    bg-white/5 border border-white/10
    backdrop-blur-md

    hover:bg-white/10
    hover:scale-[1.02]

    whitespace-nowrap
    transition-all duration-200"
                  >
                    <HugeiconsIcon icon={Edit02Icon} size={16} />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* 🔥 ADMIN OVERVIEW */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { label: "Shows", value: allShows.length },
                { label: "Episodes", value: 136 },
                { label: "Users", value: "12.4K" },
                { label: "Health", value: "Good" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="group p-4 rounded-xl 
      bg-white/5 border border-white/10 backdrop-blur-md 
      hover:bg-white/10 hover:border-white/20 
      transition-all duration-200"
                >
                  <p className="text-[11px] uppercase tracking-wider text-gray-400">
                    {item.label}
                  </p>

                  <p className="text-xl font-semibold mt-1 group-hover:scale-[1.02] transition">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* 🔥 QUICK ACTIONS */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              {/* PRIMARY ACTION */}
              <button
                onClick={() => navigate("/admin/shows")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-indigo-500/30 to-indigo-400/10 border border-indigo-400/30 backdrop-blur-md shadow-md hover:from-indigo-500/40 hover:to-indigo-400/20 hover:scale-[1.03] transition-all duration-200"
              >
                <HugeiconsIcon icon={AddCircleIcon} size={16} />
                Add Show
              </button>

              {/* SECONDARY */}
              <button
                onClick={() => navigate("/admin/episodes")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-[1.02] transition-all duration-200"
              >
                <HugeiconsIcon icon={PlayListAddIcon} size={16} />
                Add Episode
              </button>

              {/* SECONDARY */}
              <button
                onClick={() => navigate("/admin/homepage-section")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-[1.02]  transition-all duration-200"
              >
                <HugeiconsIcon icon={Home02Icon} size={16} />
                Homepage
              </button>
            </div>
          </section>

          {/* 🔥 DIVIDER */}
          <div className="mt-14 mb-6 flex items-center gap-4">
            <div className="flex-1 h-[1px] bg-white/10" />
            <p className="text-sm text-gray-400 uppercase tracking-widest">
              Your Activity
            </p>
            <div className="flex-1 h-[1px] bg-white/10" />
          </div>

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
      <h3 className="text-xl sm:text-2xl font-bold text-yellow-400">{title}</h3>
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
