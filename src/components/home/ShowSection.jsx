// src/components/home/ShowSection.jsx

import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import ShowCard from "../show/ShowCard.jsx";

function ShowSection({ sectionTitle, shows = [] }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;

    const el = scrollRef.current;
    const amount = Math.min(el.clientWidth * 0.8, 900);

    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (!shows.length) return null;

  return (
    <section className="relative py-5 overflow-visible">
      {/* TITLE */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 mb-3">
        <h3 className="text-xl sm:text-xl md:text-2xl font-semibold text-yellow-300">
          {sectionTitle}
        </h3>

        <Link
          to={`/category/${sectionTitle.toLowerCase().replace(/\s+/g, "-")}`}
          className="group flex items-center gap-1.5 text-white/80 hover:text-yellow-300 text-sm sm:text-base font-medium transition-all duration-200    hover:underline underline-offset-4"
        >
          <span>Show more</span>
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div className="relative overflow-visible">
        {/* LEFT BUTTON */}
        <button
          onClick={() => scroll("left")}
          className="
            hidden sm:flex
            absolute left-2 lg:left-4
            top-1/2 -translate-y-1/2
            z-50
            w-10 h-10
            items-center justify-center
            rounded-full
            bg-black/40 backdrop-blur-md
            border border-white/10
            text-white/70
            hover:text-white
            hover:bg-black/60
            hover:scale-110
            transition-all duration-200
          "
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={() => scroll("right")}
          className="
            hidden sm:flex
            absolute right-2 lg:right-4
            top-1/2 -translate-y-1/2
            z-50
            w-10 h-10
            items-center justify-center
            rounded-full
            bg-black/40 backdrop-blur-md
            border border-white/10
            text-white/70
            hover:text-white
            hover:bg-black/60
            hover:scale-110
            transition-all duration-200
          "
        >
          <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
        </button>

        {/* ROW */}
        <div
          ref={scrollRef}
          className="
            flex
            gap-1.5
            sm:gap-3
            overflow-x-auto
            pb-2
            scrollbar-hide
            scroll-smooth
          "
        >
          {shows.map((s, index) => (
            <div
              key={s.id}
              className={`
                flex-shrink-0
                w-[40vw]
                sm:w-56
                md:w-60
                lg:w-64
                xl:w-72

                ${index === 0 ? "ml-4 sm:ml-6 lg:ml-10" : ""}
                ${index === shows.length - 1 ? "mr-4 sm:mr-6 lg:mr-10" : ""}
              `}
            >
              <ShowCard {...s} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default ShowSection;
