import { useState } from "react";
import { Link } from "react-router-dom";

import { FavouriteIcon, PlayIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const DEFAULT_POSTER = "/media/extras/default.jpg";

function ShowCard({ id, title, year, poster, linkToWatch = false }) {
  const [isShortlisted, setIsShortlisted] = useState(false);

  const toggleShortlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsShortlisted((current) => !current);
  };

  const posterSrc = poster || DEFAULT_POSTER;
  const destination = linkToWatch ? `/watch/${id}` : `/show/${id}`;

  return (
    <Link
      to={destination}
      aria-label={`${linkToWatch ? "Watch" : "Open"} ${title}`}
      className="block w-full"
    >
      <article className="relative w-full">
        <div
          className="
            group
            relative
            overflow-visible
            rounded-xl
            transition-all
            duration-300
            ease-out
            hover:z-30
            hover:scale-[1.04]
          "
        >
          <div
            className="
              relative
              overflow-hidden
              rounded-xl
              bg-neutral-900
              ring-1
              ring-white/10
              transition-all
              duration-300
              sm:group-hover:ring-sky-400/60
              sm:group-hover:shadow-[0_12px_35px_rgba(0,0,0,0.6)]
            "
          >
            <div className="relative aspect-[2/3] w-full">
              <img
                src={posterSrc}
                alt={title}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = DEFAULT_POSTER;
                }}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-300
                  sm:group-hover:scale-105
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/80
                  via-black/20
                  to-transparent
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  hidden
                  items-center
                  justify-center
                  bg-black/30
                  opacity-0
                  transition-opacity
                  duration-200
                  sm:flex
                  sm:group-hover:opacity-100
                "
              >
                <div
                  className="
                    rounded-full
                    border
                    border-white/10
                    bg-black/50
                    p-3
                    text-white
                    backdrop-blur-lg
                    transition-transform
                    duration-200
                    hover:scale-110
                  "
                >
                  <HugeiconsIcon icon={PlayIcon} size={20} />
                </div>
              </div>

              <button
                type="button"
                onClick={toggleShortlist}
                aria-label={
                  isShortlisted
                    ? `Remove ${title} from favourites`
                    : `Add ${title} to favourites`
                }
                className="
                  absolute
                  right-2
                  top-2
                  z-20
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-black/30
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-200
                  hover:bg-black/50
                "
              >
                <HugeiconsIcon
                  icon={FavouriteIcon}
                  size={17}
                  className={isShortlisted ? "text-red-400" : "text-white/80"}
                />
              </button>

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-0
                  left-0
                  right-0
                  z-10
                  bg-gradient-to-t
                  from-black/90
                  via-black/50
                  to-transparent
                  px-3
                  pb-2
                  pt-8
                "
              >
                <h3
                  className="
                    truncate
                    text-xs
                    font-semibold
                    text-white
                    sm:text-sm
                  "
                >
                  {title}
                </h3>

                {year && (
                  <p className="text-[10px] text-gray-300 sm:text-xs">{year}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ShowCard;
