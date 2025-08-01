import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import ShowCard from "../Components/ShowCard";
import showsData from "../Data/Shows.json";

// Add thumbnail fallback
const enrich = (arr) =>
  arr.map((show) => ({
    ...show,
    thumbnail: show.thumbnail
      ? `/Assets/${show.thumbnail}`
      : "/Assets/default.jpg",
  }));

const allShows = enrich(showsData.allShows);

function SearchResultsPage() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search).get("q") || "";

  const searchResults = allShows.filter((show) =>
    show.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="text-white min-h-screen relative">
      {/* Sticky Header */}
      <Header />

      {/* Back Button */}
      <div className="px-4 md:px-8 mt-16">
        <button
          onClick={() => navigate(-1)}
          className="bg-black/70 hover:bg-black/90 p-2 mt-5 rounded-full text-white text-xl sm:text-2xl mb-6 transition"
        >
          <FaArrowLeft />
        </button>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-8">
        {query && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Search Results for "{query}"
            </h2>
            {searchResults.length ? (
              <div className="flex flex-wrap gap-4 mb-10">
                {searchResults.map((show) => (
                  <ShowCard key={show.id} {...show} />
                ))}
              </div>
            ) : (
              <p className="text-gray-400 mb-10">No results found.</p>
            )}
          </>
        )}

        {/* Recommended Section */}
        <h2 className="text-xl font-semibold mb-4">Recommended Shows</h2>
        <div className="flex flex-wrap gap-4">
          {[...allShows]
            .sort(() => 0.5 - Math.random())
            .slice(0, 6)
            .map((show) => (
              <ShowCard key={show.id} {...show} />
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SearchResultsPage;
