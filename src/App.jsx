import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddShowPage from "./Pages/AddShowPage";
import AllShowsPage from "./Pages/AllShowsPage";
import ComingSoon from "./Pages/ComingSoonPage";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";
import AuthPage from "./Pages/AuthPage";
import ProfilePage from "./Pages/ProfilePage";
import SearchResultsPage from "./Pages/SearchResultsPage";
import ShowDetailsPage from "./Pages/ShowDetailsPage";
import VideoPlayerPage from "./Pages/VideoPlayerPage";
import WatchlistPage from "./Pages/WatchlistPage";
import AboutPage from "./Pages/AboutPage";
import ScrollToTop from "./Components/ScrollToTop"; // ✅ ADD THIS
import "./App.css";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
      <Route path="/profile" element={<ProfilePage />} />
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
        <ScrollToTop /> {/* ✅ THIS FIXES THE ISSUE */}
        <AppRoutes />
        <SpeedInsights />
      </BrowserRouter>
    </div>
  );
}
