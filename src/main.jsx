// src/main.jsx

import { inject } from "@vercel/analytics";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
inject(); // 🔍 Vercel analytics initialized

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
