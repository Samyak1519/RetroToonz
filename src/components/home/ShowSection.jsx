import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRef } from "react";
import { Link } from "react-router-dom";

import ShowCard from "../show/ShowCard.jsx";

function ShowSection({
  sectionTitle,
  sectionKey,
  shows = [],
  linkToWatch = false,
  showMore = true,
}) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const element = scrollRef.current;
    const amount = Math.min(element.clientWidth * 0.8, 900);

    element.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (!shows.length) return null;

  return (
    <section className="relative overflow-visible py-5">
      <div className="mb-3 flex items-center justify-between px-4 sm:px-6 lg:px-10">
        <h3 className="text-lg font-bold text-yellow-300 sm:text-lg md:text-xl">
          {sectionTitle}
        </h3>

        {showMore && sectionKey && (
          <Link
            to={`/search?section=${sectionKey}`}
            className="
              group
              flex
              items-center
              gap-1.5
              text-sm
              font-medium
              text-white/80
              transition-all
              hover:text-yellow-200
              sm:text-base
            "
          >
            <span className="underline-offset-4 hover:underline">
              Show more
            </span>

            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        )}
      </div>

      <div className="group/row relative overflow-visible">
        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label={`Scroll ${sectionTitle} left`}
          className="
            absolute
            left-2
            top-1/2
            z-50
            hidden
            h-10
            w-10
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-black/40
            text-white/70
            opacity-0
            pointer-events-none
            backdrop-blur-md
            transition-all
            duration-200
            group-hover/row:pointer-events-auto
            group-hover/row:opacity-100
            hover:scale-110
            hover:bg-black/60
            hover:text-white
            sm:flex
            lg:left-4
          "
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
        </button>

        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label={`Scroll ${sectionTitle} right`}
          className="
            absolute
            right-2
            top-1/2
            z-50
            hidden
            h-10
            w-10
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-black/40
            text-white/70
            opacity-0
            pointer-events-none
            backdrop-blur-md
            transition-all
            duration-200
            group-hover/row:pointer-events-auto
            group-hover/row:opacity-100
            hover:scale-110
            hover:bg-black/60
            hover:text-white
            sm:flex
            lg:right-4
          "
        >
          <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
        </button>

        <div
          ref={scrollRef}
          className="
            flex
            gap-3
            overflow-x-auto
            pb-2
            scrollbar-hide
            scroll-smooth
            sm:gap-4
            lg:gap-4
            xl:gap-[18px]
          "
        >
          {shows.map((show, index) => (
            <div
              key={show.id}
              className={`
                flex-shrink-0
                w-[40vw]
                max-w-[180px]

                sm:w-[180px]
                md:w-[190px]
                lg:w-[200px]
                xl:w-[210px]

                ${index === 0 ? "ml-4 sm:ml-6 lg:ml-10" : ""}
                ${index === shows.length - 1 ? "mr-4 sm:mr-6 lg:mr-10" : ""}
              `}
            >
              <ShowCard {...show} linkToWatch={linkToWatch} />
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
