import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { SpeedInsights } from "@vercel/speed-insights/react";
<<<<<<< HEAD
import ComingSoon from "./Pages/ComingSoonPage";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import SearchResultsPage from "./Pages/SearchResultsPage";
import ShowDetailsPage from "./Pages/ShowDetailsPage";
import VideoPlayerPage from "./Pages/VideoPlayerPage";
import WatchlistPage from "./Pages/WatchlistPage";
=======
import HomePage from "./Pages/HomePage";
import Login from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import ShowDetailsPage from "./Pages/ShowDetailsPage";
import VideoPlayerPage from "./Pages/VideoPlayerPage";
import WatchlistPage from "./Pages/WatchlistPage";
import ErrorPage from "./Pages/ErrorPage";
>>>>>>> 3ea8f468a04a22cbae3c34b1da6d24830d81c8ba

function App() {
  return (
    <div className="min-h-screen bg-space-galaxy text-white transition-all duration-500 ease-in-out">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/show/:id" element={<ShowDetailsPage />} />
          <Route path="/watch/:id" element={<VideoPlayerPage />} />
<<<<<<< HEAD
          <Route path="/comingsoon" element={<ComingSoon />} />
          <Route path="/search" element={<SearchResultsPage />} />
=======
>>>>>>> 3ea8f468a04a22cbae3c34b1da6d24830d81c8ba
          <Route path="*" element={<ErrorPage />} />
        </Routes>

        {/* 🔍 Speed Insights for Vercel Core Web Vitals */}
        <SpeedInsights />
      </BrowserRouter>
    </div>
  );
}

export default App;
