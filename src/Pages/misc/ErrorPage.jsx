// src/pages/ErrorPage.jsx

import { useMemo, useRef, useEffect, useState } from "react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Home01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/layout/Footer.jsx";
import Header from "../../components/layout/Header.jsx";
import ShowCard from "../../components/show/ShowCard";
import showsData from "../../data/Shows.json";

// ✅ Media fix
const enrich = (arr) =>
  (arr || []).map((show) => ({
    ...show,
    thumbnail: show.thumbnail || "/media/extras/default.jpg",
    thumbnailMobile: show.thumbnailMobile || "/media/extras/default.jpg",
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

export default function ErrorPage() {
  const navigate = useNavigate();
  const recommended = useMemo(() => pickRandom(allShows, 12), []);
  const scrollRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const SCROLL_STEP = 280;

  // ✅ FIX: Prevent over-scrolling
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

  // Keyboard support
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") scrollBy(SCROLL_STEP);
      if (e.key === "ArrowLeft") scrollBy(-SCROLL_STEP);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Autoplay (stops at end automatically now)
  useEffect(() => {
    if (isHovering) return;

    const id = setInterval(() => {
      if (!scrollRef.current) return;

      const el = scrollRef.current;
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxScroll) return; // ✅ STOP at end

      scrollBy(SCROLL_STEP);
    }, 4000);

    return () => clearInterval(id);
  }, [isHovering]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0F0A24] text-white font-inter">
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
      <section className="w-full px-4 sm:px-7 md:px-10 lg:px-16 pb-12">
        <div className="max-w-[1800px] mx-auto relative">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6">
            Recommended for you
          </h2>

          <div className="relative group">
            {/* LEFT */}
            <button
              onClick={() => scrollBy(-SCROLL_STEP)}
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
            </button>

            {/* SCROLLER */}
            <div
              ref={scrollRef}
              className="flex gap-6 sm:gap-3 md:gap-4 overflow-x-auto no-scrollbar scroll-smooth"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {recommended.map((s) => (
                <div
                  key={s.id}
                  className="error-card flex-shrink-0 transition-transform duration-300 hover:scale-[1.08]"
                >
                  <ShowCard {...s} />
                </div>
              ))}
            </div>

            {/* RIGHT */}
            <button
              onClick={() => scrollBy(SCROLL_STEP)}
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* ✅ Responsive sizing + no scrollbar */}
      <style>{`
        .error-card {
          width: 140px;
        }

        @media (min-width: 640px) {
          .error-card {
            width: 170px;
          }
        }

        @media (min-width: 1024px) {
          .error-card {
            width: 230px;
          }
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
