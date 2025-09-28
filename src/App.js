// src/App.js (or wherever your AppRoutes are)
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddShowPage from "./Pages/AddShowPage";
import AllShowsPage from "./Pages/AllShowsPage"; // <-- NEW
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

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/watchlist" element={<WatchlistPage />} />
      <Route path="/all-shows" element={<AllShowsPage />} /> {/* <-- NEW */}
      <Route path="/show/:id" element={<ShowDetailsPage />} />
      <Route path="/watch/:id" element={<VideoPlayerPage />} />
      <Route path="/comingsoon" element={<ComingSoon />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/addshow" element={<AddShowPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-space-galaxy text-white">
      <BrowserRouter>
        <AppRoutes />
        <SpeedInsights />
      </BrowserRouter>
    </div>
  );
}
