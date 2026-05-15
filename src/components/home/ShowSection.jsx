// src/components/ShowSection.jsx
import { useEffect, useRef, useState } from "react";
import ShowCard from "../show/ShowCard.jsx";

function ShowSection({ sectionTitle, shows = [], bgColor = "#0F0A24" }) {
  const id = `section-${sectionTitle.replace(/\s+/g, "-").toLowerCase()}`;

  const scrollRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      setIsScrollable(el.scrollWidth > el.clientWidth + 8);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => ro.disconnect();
  }, [shows]);

  const scrollByAmount = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.7, 760);
    el.scrollBy({ left: amount * dir, behavior: "smooth" });
  };

  return (
    <section
      id={id}
      className="relative py-4"
      style={{ backgroundColor: bgColor }}
    >
      {/* SECTION TITLE */}
      <div className="px-4 sm:px-10 mb-2">
        <h3
          id="Section"
          className="text-xl sm:text-2xl font-semibold text-yellow-300"
        >
          {sectionTitle}
        </h3>
      </div>

      {/* MOBILE */}
      <div className="flex gap-3 overflow-x-auto pb-2 sm:hidden px-4">
        {shows.map((s) => (
          <div key={s.id} className="snap-start">
            <ShowCard {...s} />
          </div>
        ))}
      </div>

      {/* DESKTOP */}
      <div
        className="hidden sm:block relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* LEFT FADE */}
        {isScrollable && hovered && (
          <div
            className="
              pointer-events-none
              absolute left-0 top-1/2 -translate-y-1/2
              z-40
              h-44 w-20
              bg-gradient-to-r from-white/5 to-transparent
              rounded-r-2xl
            "
          />
        )}

        {/* RIGHT FADE */}
        {isScrollable && hovered && (
          <div
            className="
              pointer-events-none
              absolute right-0 top-1/2 -translate-y-1/2
              z-40
              h-44 w-20
              bg-gradient-to-l from-white/5 to-transparent
            "
          />
        )}

        {/* LEFT ARROW */}
        {isScrollable && hovered && (
          <button
            onClick={() => scrollByAmount(-1)}
            className="
              absolute left-0 top-1/2 -translate-y-1/2
              z-50
              h-44 w-12
              flex items-center justify-center
              bg-black/30 backdrop-blur-md
              border-r border-white/20
              text-white text-2xl font-medium rounded-r-xl
            "
          >
            ‹
          </button>
        )}

        {/* RIGHT ARROW */}
        {isScrollable && hovered && (
          <button
            onClick={() => scrollByAmount(1)}
            className="
              absolute right-0 top-1/2 -translate-y-1/2
              z-50
              h-44 w-12
              flex items-center justify-center
              bg-black/30 backdrop-blur-md
              border-l border-white/20
              text-white text-2xl font-medium rounded-l-xl
            "
          >
            ›
          </button>
        )}

        {/* SCROLL ROW */}
        <div
          ref={scrollRef}
          className="
            flex gap-4 overflow-x-auto
            pt-2 pb-3
            scrollbar-hide
            px-4 sm:px-10
          "
        >
          {shows.map((s) => (
            <div
              key={s.id}
              className="w-56 sm:w-60 md:w-64 lg:w-72 flex-shrink-0"
            >
              <ShowCard {...s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ShowSection;
