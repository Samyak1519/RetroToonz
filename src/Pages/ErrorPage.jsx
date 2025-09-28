import { useMemo, useRef, useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaHome,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import ShowCard from "../Components/ShowCard";
import showsData from "../Data/Shows.json";

// Enrich with fallback thumbnails
const enrich = (arr) =>
  (arr || []).map((show) => ({
    ...show,
    thumbnail: show.thumbnail ? `/Assets/${show.thumbnail}` : "/Assets/default.jpg",
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

  const scrollBy = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") scrollBy(SCROLL_STEP);
      if (e.key === "ArrowLeft") scrollBy(-SCROLL_STEP);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isHovering) return;
    const id = setInterval(() => scrollBy(SCROLL_STEP), 4000);
    return () => clearInterval(id);
  }, [isHovering]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0F0A24] text-white font-nunito">
      <Header />

      {/* Hero */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 relative">
        <div className="max-w-4xl w-full text-center relative z-10">
          <div className="flex flex-col items-center gap-6">
            

            <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight mb-0">404</h1>
            <p className="text-gray-300 text-lg mb-2">Page not found</p>
            <p className="text-gray-400 max-w-2xl text-sm sm:text-base">
              The link may be broken or the page removed. Try going back home or
              explore some recommended shows below.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 px-5 py-3 rounded-2xl text-white font-semibold shadow-lg transition transform hover:-translate-y-0.5"
              >
                <FaArrowLeft />
                Go home
              </button>

              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 px-5 py-3 rounded-2xl text-white font-medium transition"
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Recommended */}
      <section className="w-full px-4 sm:px-6 pb-10">
        <div className="max-w-7xl mx-auto relative bg-[#11102A] rounded-2xl p-5 sm:p-6 shadow-inner">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 px-1">
            Recommended for you
          </h2>

          {/* Left arrow */}
          <button
            aria-label="Scroll left"
            onClick={() => scrollBy(-SCROLL_STEP)}
            className="hidden md:flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 shadow-md transition z-20"
          >
            <FaChevronLeft />
          </button>

          {/* Cards scroller */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar py-2 pb-4 snap-x snap-mandatory scroll-smooth"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {recommended.map((s) => (
              <div
                key={s.id}
                className="snap-start transition-transform duration-300 hover:scale-105 hover:-translate-y-1"
                style={{ minWidth: 160, maxWidth: 200 }}
              >
                <ShowCard {...s} />
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            aria-label="Scroll right"
            onClick={() => scrollBy(SCROLL_STEP)}
            className="hidden md:flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 shadow-md transition z-20"
          >
            <FaChevronRight />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
