import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

function WatchlistPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen text-white">
      <Header />

      {/* Back Button and Title */}
      <div className="pt-24 px-6 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-black/70 hover:bg-black/90 p-2 rounded-full text-white text-xl sm:text-2xl transition"
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-3xl font-bold">Your Watchlist</h1>
      </div>

      {/* Centered Message */}
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-400 text-lg text-center">
          Your saved shows will appear here.
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default WatchlistPage;
