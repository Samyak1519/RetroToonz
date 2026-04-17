// src/pages/ErrorPage.jsx

import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Home01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/layout/Footer.jsx";
import Header from "../../components/layout/Header.jsx";
import showsData from "../../data/Shows.json";

/* -------------------- DATA -------------------- */
const enrich = (arr) =>
  (arr || []).map((show) => ({
    ...show,
    thumbnail: show.thumbnail || "/media/extras/default.jpg",
  }));

const allShows = enrich(showsData.allShows || []);

function pickRandom(arr, n) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

/* -------------------- PAGE -------------------- */
export default function ErrorPage() {
  const navigate = useNavigate();
  const recommended = useMemo(() => pickRandom(allShows, 12), []);

  const scrollRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const SCROLL_STEP = 400;

  const scrollBy = (offset) => {
    if (!scrollRef.current) return;

    const el = scrollRef.current;
    const maxScroll = el.scrollWidth - el.clientWidth;

    let newScroll = el.scrollLeft + offset;

    if (newScroll < 0) newScroll = 0;
    if (newScroll > maxScroll) newScroll = maxScroll;

    el.scrollTo({
      left: newScroll,
      behavior: "smooth",
    });
  };

  /* Keyboard */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") scrollBy(SCROLL_STEP);
      if (e.key === "ArrowLeft") scrollBy(-SCROLL_STEP);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Auto Scroll */
  useEffect(() => {
    if (isHovering) return;

    const id = setInterval(() => {
      if (!scrollRef.current) return;

      const el = scrollRef.current;
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxScroll) return;

      scrollBy(SCROLL_STEP);
    }, 4000);

    return () => clearInterval(id);
  }, [isHovering]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#050b14] via-[#0a1528] to-[#04080f] text-white">
      <Header />

      {/* 🔥 HERO */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] top-10 left-1/2 -translate-x-1/2 rounded-full" />
          <div className="absolute w-[300px] h-[300px] bg-blue-600/10 blur-[100px] bottom-10 right-1/4 rounded-full" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <h1 className="text-7xl sm:text-8xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            404
          </h1>

          <p className="text-gray-200 text-xl mt-3 font-semibold">
            Lost in nostalgia?
          </p>

          <p className="text-gray-400 mt-3 text-sm sm:text-base">
            The page you’re looking for doesn’t exist or has been moved.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-2xl font-semibold shadow-[0_0_25px_rgba(34,211,238,0.3)] transition hover:-translate-y-1"
            >
              <HugeiconsIcon icon={Home01Icon} size={20} />
              Go Home
            </button>
          </div>
        </div>
      </main>

      {/* 🎬 RECOMMENDED */}
      <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 pb-12">
        <div className="max-w-[1800px] mx-auto relative">
          {/* Header */}
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-yellow-400">
              Recommended Shows
            </h3>
            <p className="text-gray-400 text-sm">
              Since you're lost... maybe explore these 🙂
            </p>
          </div>

          <div className="relative group">
            {/* LEFT */}
            <button
              onClick={() => scrollBy(-SCROLL_STEP)}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
            </button>

            {/* SCROLLER */}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {recommended.map((show) => (
                <RecommendedCard key={show.id} show={show} />
              ))}
            </div>

            {/* RIGHT */}
            <button
              onClick={() => scrollBy(SCROLL_STEP)}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* -------------------- CARD -------------------- */
function RecommendedCard({ show }) {
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
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <img
          src={show.thumbnail}
          alt={show.title}
          className="w-full h-full object-cover"
        />

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-black/50 backdrop-blur-lg border border-white/10 p-3 rounded-full text-white">
            ▶
          </div>
        </div>

        {/* Title */}
        <div className="absolute bottom-2 left-3 right-3">
          <h4 className="text-sm font-semibold truncate">
            {show.title}
          </h4>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-2 line-clamp-2">
        {show.description || "No description available."}
      </p>
    </div>
  );
}