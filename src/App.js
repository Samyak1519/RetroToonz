import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import HomePage from "./Pages/HomePage";
import Login from "./Pages/LoginPage";

function App() {
  return (
    <div className="min-h-screen bg-space-galaxy text-white transition-all duration-500 ease-in-out">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
