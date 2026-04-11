// src/pages/WatchlistPage.jsx

import { AllBookmarkIcon, ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";

function WatchlistPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen text-white bg-gradient-to-b from-[#05060b] to-[#0f0a24]">
      <Header />

      {/* 🔝 Header Section */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 max-w-[1800px] mx-auto w-full">
        <div className="flex items-center gap-4 mt-6 mb-10">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="
              bg-white/5 hover:bg-white/10
              p-2.5 rounded-full
              border border-white/10
              transition-all
            "
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
          </button>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            Your Watchlist
          </h2>
        </div>

        {/* 📭 Empty State */}
        <div className="flex items-center justify-center text-center py-20">
          <div className="flex flex-col items-center mb-10">
            {/* 🔥 ICON */}
            <div className="mb-10 text-white/20 drop-shadow-[0_0_25px_rgba(255,255,255,0.08)] ">
              <HugeiconsIcon icon={AllBookmarkIcon} size={80} />
            </div>

            {/* TEXT */}
            <p className="text-gray-400 text-base sm:text-lg mb-2">
              Your saved shows will appear here.
            </p>
            <p className="text-gray-500 text-sm">
              Start adding shows to your watchlist 🎬
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default WatchlistPage;
