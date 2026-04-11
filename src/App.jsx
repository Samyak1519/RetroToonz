// src/App.jsx

import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ScrollToTop from "./Components/ScrollToTop";

import AboutPage from "./Pages/AboutPage";
import AddShowPage from "./Pages/admin/AddShowPage";
import AllShowsPage from "./Pages/AllShowsPage";

import LoginPage from "./Pages/auth/LoginPage";
import SignupPage from "./Pages/auth/SignupPage";

import ComingSoon from "./Pages/ComingSoonPage";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";
// import ProfilePage from "./Pages/ProfilePage";
import UserProfilePage from "./Pages/user/UserProfilePage";
import SearchResultsPage from "./Pages/SearchResultsPage";
import ShowDetailsPage from "./Pages/ShowDetailsPage";
import VideoPlayerPage from "./Pages/VideoPlayerPage";
import WatchlistPage from "./Pages/WatchlistPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
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
