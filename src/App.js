import { SpeedInsights } from "@vercel/speed-insights/react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ComingSoon from "./Pages/ComingSoonPage";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import SearchResultsPage from "./Pages/SearchResultsPage";
import ShowDetailsPage from "./Pages/ShowDetailsPage";
import VideoPlayerPage from "./Pages/VideoPlayerPage";
import WatchlistPage from "./Pages/WatchlistPage";

import "./App.css";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
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
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-space-galaxy text-white transition-all duration-500 ease-in-out">
      <BrowserRouter>
        <AnimatedRoutes />
        <SpeedInsights />
      </BrowserRouter>
    </div>
  );
}
