// src/Pages/WatchlistPage.jsx

import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

function WatchlistPage() {
  const navigate = useNavigate();

  return (

    <div className="flex flex-col min-h-screen text-white">
      <Header />

      {/* Back Button + Heading */}
      <div className="px-4 md:px-8 flex items-center gap-4 mt-5 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-black/70 hover:bg-black/90 p-2 rounded-full text-white text-xl sm:text-2xl transition"
        >
          <FaArrowLeft />
        </button>

        <h2 className="text-2xl font-semibold">
          Your Watchlist
        </h2>
      </div>


      {/* Centered Message */}
      <div className="flex-1 flex items-center justify-center px-4 text-center">
        <p className="text-gray-400 text-base sm:text-lg">
          Your saved shows will appear here.
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default WatchlistPage;
