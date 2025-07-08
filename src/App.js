import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import HomePage from "./Pages/HomePage";
import ShowDetailsPage from "./Pages/ShowDetailsPage";

function App() {
  return (
    <div className="min-h-screen bg-space-galaxy text-white transition-all duration-500 ease-in-out">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/show/:title" element={<ShowDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
