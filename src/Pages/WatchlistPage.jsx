<<<<<<< HEAD
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
=======
>>>>>>> 3ea8f468a04a22cbae3c34b1da6d24830d81c8ba
import Footer from "../Components/Footer";
import Header from "../Components/Header";

function WatchlistPage() {
<<<<<<< HEAD
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
=======
  return (
    <>
      <Header />
      <div className="pt-24 min-h-screen text-white px-4">
        <h1 className="text-3xl font-bold mb-4">Your Watchlist</h1>
        <p className="text-gray-400">Your saved shows will appear here.</p>
      </div>
      <Footer />
    </>
>>>>>>> 3ea8f468a04a22cbae3c34b1da6d24830d81c8ba
  );
}

export default WatchlistPage;
