import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import PageWrapper from "../Components/PageWrapper";

function WatchlistPage() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="flex flex-col min-h-screen text-white">
        <Header />

        {/* Back Button and Title */}
        <div className="pt-20 px-4 sm:px-6 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="bg-black/70 hover:bg-black/90 p-2 rounded-full text-white text-xl sm:text-2xl transition"
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-2xl sm:text-3xl font-semibold leading-none">
            Your Watchlist
          </h1>
        </div>

        {/* Centered Message */}
        <div className="flex-1 flex items-center justify-center px-4 text-center">
          <p className="text-gray-400 text-base sm:text-lg">
            Your saved shows will appear here.
          </p>
        </div>

        <Footer />
      </div>
    </PageWrapper>
  );
}

export default WatchlistPage;
