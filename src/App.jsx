// src/App.jsx

import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ScrollToTop from "./components/common/ScrollToTop.jsx";

// Layout
import AdminLayout from "./layouts/AdminLayout.jsx";

// Admin Pages
import AddShowPage from "./pages/admin/AddShowPage.jsx";
import AnalyticsPage from "./pages/admin/AnalyticsPage.jsx";
import ContentHealthPage from "./pages/admin/ContentHealthPage.jsx";
import DashboardPage from "./pages/admin/DashboardPage.jsx"; // you can rename later
import EpisodesPage from "./pages/admin/EpisodesPage.jsx";

import SettingsPage from "./pages/admin/SettingsPage.jsx";
import ShowsPage from "./pages/admin/ShowsPage.jsx";
import UsersPage from "./pages/admin/UsersPage.jsx";

// Existing Pages
import HomepageSection from "./pages/admin/HomepageSection.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import SignupPage from "./pages/auth/SignupPage.jsx";
import AllShowsPage from "./pages/core/AllShowsPage.jsx";
import HomePage from "./pages/core/HomePage.jsx";
import SearchResultsPage from "./pages/core/SearchResultsPage.jsx";
import ShowDetailsPage from "./pages/core/ShowDetailsPage.jsx";
import VideoPlayerPage from "./pages/core/VideoPlayerPage.jsx";
import AboutPage from "./pages/misc/AboutPage.jsx";
import ComingSoon from "./pages/misc/ComingSoonPage.jsx";
import ErrorPage from "./pages/misc/ErrorPage.jsx";
import WatchlistPage from "./pages/misc/WatchlistPage.jsx";
import AdminProfilePage from "./pages/admin/AdminProfilePage.jsx";
import UserProfilePage from "./pages/user/UserProfilePage.jsx";

function AppRoutes() {
  return (
    <Routes>
      {/* 🌐 Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin-profile" element={<AdminProfilePage />} />

      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/watchlist" element={<WatchlistPage />} />
      <Route path="/all-show" element={<AllShowsPage />} />
      <Route path="/show/:id" element={<ShowDetailsPage />} />
      <Route path="/watch/:id" element={<VideoPlayerPage />} />
      <Route path="/comingsoon" element={<ComingSoon />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/about-us" element={<AboutPage />} />
      <Route path="/addshow" element={<AddShowPage />} />

      {/* 🔥 ADMIN ROUTES (FIXED) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="shows" element={<ShowsPage />} />
        <Route path="add-show" element={<AddShowPage />} />
        <Route path="episodes" element={<EpisodesPage />} />
        <Route path="homepage-section" element={<HomepageSection />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="content-health" element={<ContentHealthPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* ❌ 404 */}
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
