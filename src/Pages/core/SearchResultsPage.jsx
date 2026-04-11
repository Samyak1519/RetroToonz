import { useLocation, useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";

import Footer from "../../components/layout/Footer.jsx";
import Header from "../../components/layout/Header.jsx";
import ShowCard from "../../components/show/ShowCard";
import showsData from "../../data/Shows.json";

// ✅ Correct thumbnail handling (NO path breaking)
const enrich = (arr) =>
  arr.map((show) => ({
    ...show,
    thumbnail: show.thumbnail || "/media/extras/default.jpg",
    thumbnailMobile: show.thumbnailMobile || "/media/extras/default.jpg",
  }));

const allShows = enrich(showsData.allShows);

function SearchResultsPage() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search).get("q") || "";

  const searchResults = allShows.filter((show) =>
    show.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex flex-col min-h-screen text-white bg-gray-950">
      <Header />

      <main className="flex-grow pb-5">
        <div className="px-4 sm:px-7 md:px-10 lg:px-16 max-w-[1800px] mx-auto py-6">
          {/* 🔝 Header */}
          <div className="flex items-center gap-4 mb-12">
            <button
              onClick={() => navigate(-1)}
              className="bg-white/5 hover:bg-white/10 p-2.5 rounded-full border border-white/10 transition"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
            </button>

            <div>
              <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">
                Search Results
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
                {query ? `"${query}"` : "All Shows"}
              </h2>
            </div>
          </div>

          {/* 🔍 Results */}
          {query && (
            <>
              {searchResults.length ? (
                <div className="mb-12">
                  <p className="text-sm text-gray-400 mb-4">
                    {searchResults.length} result
                    {searchResults.length !== 1 && "s"} found
                  </p>

                  <div className="max-w-[900px]">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                      {searchResults.map((show) => (
                        <div
                          key={show.id}
                          className="transition-transform duration-300 hover:scale-[1.03]"
                        >
                          <ShowCard {...show} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-400 text-lg mb-2">No results found</p>
                  <p className="text-gray-500 text-sm">
                    Try searching something else
                  </p>
                </div>
              )}
            </>
          )}

          {/* Divider */}
          <div className="h-[1px] bg-white/10 mb-12" />

          {/* 🎬 Recommended */}
          <h2 className="text-lg sm:text-xl font-semibold mb-6">
            Recommended Shows
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {[...allShows]
              .sort(() => 0.5 - Math.random())
              .slice(0, 6)
              .map((show) => (
                <div
                  key={show.id}
                  className="transition-transform duration-300 hover:scale-[1.03]"
                >
                  <ShowCard {...show} />
                </div>
              ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SearchResultsPage;
