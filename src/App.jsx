// src/App.jsx

import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ScrollToTop from "./components/common/ScrollToTop";

import AddShowPage from "./pages/admin/AddShowPage";
import AllShowsPage from "./pages/core/AllShowsPage";
import AboutPage from "./pages/misc/AboutPage";

import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import HomePage from "./pages/core/HomePage";
import SearchResultsPage from "./pages/core/SearchResultsPage";
import ShowDetailsPage from "./pages/core/ShowDetailsPage";
import VideoPlayerPage from "./pages/core/VideoPlayerPage";
import ComingSoon from "./pages/misc/ComingSoonPage";
import ErrorPage from "./pages/misc/ErrorPage";
import WatchlistPage from "./pages/misc/WatchlistPage";
import UserProfilePage from "./pages/user/UserProfilePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/watchlist" element={<WatchlistPage />} />
      <Route path="/all-shows" element={<AllShowsPage />} />
      <Route path="/show/:id" element={<ShowDetailsPage />} />
      <Route path="/watch/:id" element={<VideoPlayerPage />} />
      <Route path="/comingsoon" element={<ComingSoon />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/addshow" element={<AddShowPage />} />
      <Route path="/about-us" element={<AboutPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-space-galaxy text-white">
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
        <SpeedInsights />
      </BrowserRouter>
    </div>
  );
}
