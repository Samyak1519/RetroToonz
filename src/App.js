import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import ComingSoon from "./Pages/ComingSoonPage";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import SearchResultsPage from "./Pages/SearchResultsPage";
import ShowDetailsPage from "./Pages/ShowDetailsPage";
import VideoPlayerPage from "./Pages/VideoPlayerPage";
import WatchlistPage from "./Pages/WatchlistPage";

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
          <Route path="/comingsoon" element={<ComingSoon />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>

        {/* 🔍 Speed Insights for Vercel Core Web Vitals */}
        <SpeedInsights />
      </BrowserRouter>
    </div>
  );
}

export default App;
