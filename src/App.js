import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import HomePage from "./Pages/HomePage";
import Login from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import ShowDetailsPage from "./Pages/ShowDetailsPage";
import WatchlistPage from "./Pages/WatchlistPage";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <div className="min-h-screen bg-space-galaxy text-white transition-all duration-500 ease-in-out">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/show/:id" element={<ShowDetailsPage />} />
        </Routes>

        {/* 🔍 Speed Insights for Vercel Core Web Vitals */}
        <SpeedInsights />
      </BrowserRouter>
    </div>
  );
}

export default App;
