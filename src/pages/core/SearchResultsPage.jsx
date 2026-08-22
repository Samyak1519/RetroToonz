// src/pages/SearchResultsPage.jsx

import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLocation, useNavigate } from "react-router-dom";

import Footer from "../../components/layout/Footer.jsx";
import Header from "../../components/layout/Header.jsx";
import ShowCard from "../../components/show/ShowCard.jsx";
import showsData from "../../data/Shows.json";

// Correct thumbnail handling
const enrich = (arr) =>
  arr.map((show) => ({
    ...show,
    thumbnail: show.thumbnail || "/media/extras/default.jpg",
    thumbnailMobile: show.thumbnailMobile || "/media/extras/default.jpg",
  }));

const allShows = enrich(showsData.allShows);

/* ----- FORMAT SEARCH / SECTION TITLE ----- */

const formatTitle = (value) => {
  if (!value) return "All Shows";

  return value
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/^./, (char) => char.toUpperCase());
};

function SearchResultsPage() {
  const navigate = useNavigate();

  const params = new URLSearchParams(useLocation().search);

  const query = params.get("q") || "";
  const section = params.get("section") || "";

  const searchResults = allShows.filter((show) =>
    show.title.toLowerCase().includes(query.toLowerCase()),
  );

  // What the page is showing results for
  const resultsTitle = formatTitle(query || section);

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-white">
      <Header />

      <main className="flex-grow pb-10">
        {/* MAIN CONTENT */}
        <div className="mx-auto w-full max-w-[1800px] px-4 py-6 sm:px-7 md:px-10 lg:px-16">
          {/* ================= HEADER ================= */}
          <div className="mb-10 flex items-start gap-4">
            {/* BACK BUTTON */}
            <button
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className="
                mt-1
                flex-shrink-0
                rounded-full
                border border-white/10
                bg-white/5
                p-2.5
                transition-all duration-200
                hover:bg-white/10
                hover:scale-105
              "
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
            </button>

            {/* TITLE + RESULT COUNT */}
            <div>
              <h3
                className="
                  text-xl
                  font-bold
                  text-yellow-300
                  sm:text-xl
                  md:text-2xl
                "
              >
                {resultsTitle}
              </h3>

              {(query || section) && (
                <p className="mt-1 text-xs text-gray-400">
                  {searchResults.length} result
                  {searchResults.length !== 1 && "s"} found
                </p>
              )}
            </div>
          </div>

          {/* ================= SEARCH RESULTS ================= */}
          {(query || section) && (
            <>
              {searchResults.length ? (
                <section className="mb-14">
                  {/* POSTER GRID */}
                  <div
                    className="
                      flex
                      flex-wrap
                      justify-center
                      sm:justify-start
                      gap-6
                    "
                  >
                    {searchResults.map((show) => (
                      <div
                        key={show.id}
                        className="
                          w-[40vw]
                          max-w-[180px]
                          flex-shrink-0

                          sm:w-[180px]
                          md:w-[190px]
                          lg:w-[200px]
                          xl:w-[210px]
                        "
                      >
                        <ShowCard {...show} />
                      </div>
                    ))}
                  </div>
                </section>
              ) : (
                <div className="py-20 text-center">
                  <p className="mb-2 text-lg text-gray-400">No results found</p>

                  <p className="text-sm text-gray-500">
                    Try searching something else
                  </p>
                </div>
              )}
            </>
          )}

          {/* ================= DIVIDER ================= */}
          <div className="mb-12 h-px w-full bg-white/10" />

          {/* ================= RECOMMENDED ================= */}
          <section>
            <h3
              className="
                mb-5
                text-xl
                font-semibold
                text-yellow-300
                md:text-2xl
              "
            >
              Recommended Shows
            </h3>

            {/* RECOMMENDED POSTERS */}
            <div
              className="
                flex
                flex-wrap
                justify-center
                sm:justify-start
                gap-6
              "
            >
              {[...allShows]
                .sort(() => 0.5 - Math.random())
                .slice(0, 6)
                .map((show) => (
                  <div
                    key={show.id}
                    className="
                      w-[40vw]
                      max-w-[180px]
                      flex-shrink-0

                      sm:w-[180px]
                      md:w-[190px]
                      lg:w-[200px]
                      xl:w-[210px]
                    "
                  >
                    <ShowCard {...show} />
                  </div>
                ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SearchResultsPage;
