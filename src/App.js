import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import HomePage from "./Pages/HomePage";
import Login from "./Pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
