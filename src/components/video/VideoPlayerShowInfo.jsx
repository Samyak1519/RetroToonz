import { useNavigate } from "react-router-dom";

export default function VideoPlayerShowInfo({ currentShow, currentEpisode }) {
  const navigate = useNavigate();

  if (!currentShow) return null;

  /* =================================================
     EPISODE CODE
     ================================================= */

  const seasonNumber = currentEpisode?.seasonNumber;
  const episodeNumber = currentEpisode?.episodeNumber;

  let episodeCode = "";

  if (seasonNumber != null && episodeNumber != null) {
    episodeCode = `S${String(seasonNumber).padStart(
      2,
      "0",
    )}E${String(episodeNumber).padStart(2, "0")}`;
  } else if (episodeNumber != null) {
    episodeCode = `E${String(episodeNumber).padStart(2, "0")}`;
  }

  /* =================================================
     SYNOPSIS
     ================================================= */

  const synopsis =
    currentEpisode?.synopsis ||
    currentEpisode?.description ||
    currentShow.description ||
    "";

  /* =================================================
     TAGS
     ================================================= */

  const tags = Array.isArray(currentShow.tags)
    ? currentShow.tags.filter(Boolean)
    : [];

  /*
    Show only a few tags.

    Mobile:
    - Tags stay on one line.
    - Remaining tags can be reached by horizontal swipe.

    Desktop:
    - We show the same visible tags.
    - "+X more" indicates the remaining tags.
  */

  const visibleTags = tags.slice(0, 5);
  const remainingTags = Math.max(tags.length - visibleTags.length, 0);

  return (
    <section
      className="
        w-full
        px-4
        sm:px-6
        lg:px-8
        py-5
        sm:py-6
      "
    >
      <div
        className="
          w-full
          max-w-[1400px]
          mx-auto
        "
      >
        {/* =================================================
            SHOW INFORMATION
            ================================================= */}

        <div>
          {/* SHOW TITLE */}

          <h1
            className="
              text-xl
              sm:text-2xl
              lg:text-[26px]
              font-bold
              leading-tight
              text-white
            "
          >
            {currentShow.title}
          </h1>

          {/* META */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-2
              gap-y-1
              mt-1.5
              text-[11px]
              sm:text-xs
              text-white/45
            "
          >
            {currentShow.year && <span>{currentShow.year}</span>}

            {currentShow.year && currentShow.language && (
              <span className="text-white/25">•</span>
            )}

            {currentShow.language && <span>{currentShow.language}</span>}

            {currentShow.rating && (
              <>
                <span className="text-white/25">•</span>

                <span
                  className="
                    flex
                    items-center
                    gap-1
                    text-yellow-300
                  "
                >
                  <span>★</span>
                  <span>{currentShow.rating}</span>
                </span>
              </>
            )}

            {currentShow.views && (
              <>
                <span className="text-white/25">•</span>

                <span>{currentShow.views} views</span>
              </>
            )}
          </div>

          {/* =================================================
              VIEW SHOW BUTTON
              ================================================= */}

          <button
            type="button"
            onClick={() => navigate(`/show/${currentShow.id}`)}
            className="
              inline-flex
              items-center
              gap-1.5

              mt-3

              px-3
              py-1.5

              rounded-md

              text-[11px]
              sm:text-xs

              font-medium

              text-cyan-300

              bg-cyan-400/[0.05]

              border
              border-cyan-400/15

              hover:bg-cyan-400/[0.10]
              hover:border-cyan-400/25
              hover:text-cyan-200

              transition-all
              duration-200
            "
          >
            <span>View Show</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* =================================================
            TAGS
            ================================================= */}

        {tags.length > 0 && (
          <div
            className="
              flex
              flex-nowrap
              items-center

              gap-1.5

              mt-4

              overflow-x-auto
              scrollbar-hide

              pb-1

              sm:flex-wrap
              sm:overflow-visible
              sm:pb-0
            "
          >
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="
                  flex-shrink-0

                  px-2.5
                  py-1

                  rounded-full

                  whitespace-nowrap

                  text-[10px]
                  sm:text-[11px]

                  font-medium

                  text-white/55

                  bg-white/[0.035]

                  border
                  border-white/[0.06]
                "
              >
                {tag}
              </span>
            ))}

            {remainingTags > 0 && (
              <span
                className="
                  flex-shrink-0

                  px-2.5
                  py-1

                  rounded-full

                  whitespace-nowrap

                  text-[10px]
                  sm:text-[11px]

                  font-medium

                  text-cyan-400

                  bg-cyan-400/[0.04]

                  border
                  border-cyan-400/10
                "
              >
                +{remainingTags} more
              </span>
            )}
          </div>
        )}

        {/* =================================================
            CURRENT EPISODE
            ================================================= */}

        <div
          className="
            mt-5
            sm:mt-6
          "
        >
          <div
            className="
              flex
              items-start
              gap-2.5
            "
          >
            {/* CYAN ACCENT */}

            <div
              className="
                w-0.5
                self-stretch
                min-h-[30px]
                rounded-full
                bg-cyan-400
                flex-shrink-0
              "
            />

            <div className="min-w-0">
              {/* EPISODE TITLE */}

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-x-2
                  gap-y-0.5
                "
              >
                {episodeCode && (
                  <span
                    className="
                      text-[11px]
                      sm:text-xs
                      font-semibold
                      text-cyan-400
                    "
                  >
                    {episodeCode}
                  </span>
                )}

                {episodeCode && (
                  <span
                    className="
                      text-white/25
                      text-xs
                    "
                  >
                    •
                  </span>
                )}

                <h2
                  className="
                    text-sm
                    sm:text-base
                    lg:text-lg

                    font-semibold

                    leading-tight

                    text-white
                  "
                >
                  {currentEpisode?.title || "Untitled Episode"}
                </h2>
              </div>

              {/* =================================================
                  DESCRIPTION
                  ================================================= */}

              {synopsis && (
                <div className="mt-2">
                  <p
                    className="
                      max-w-[1100px]

                      text-[11px]
                      sm:text-xs
                      lg:text-sm

                      leading-relaxed

                      text-white/50

                      line-clamp-3
                    "
                  >
                    {synopsis}
                  </p>

                  {/* READ MORE */}

                  {synopsis.length > 220 && (
                    <button
                      type="button"
                      className="
                        mt-1

                        text-[10px]
                        sm:text-[11px]

                        font-medium

                        text-cyan-400

                        hover:text-cyan-300

                        transition-colors
                      "
                    >
                      Read more
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          HORIZONTAL SCROLLBAR HIDDEN
          ================================================= */}

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
