// src/tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        spaceBlue: "#0d1b2a",
        cosmicPurle: "#1c1132",
        deepteal: "#082e38",
      },

      backgroundImage: {
        "space-galaxy": "linear-gradient(135deg,#0d1b2a,#1c1132,#082e38)",
        galaxy: "linear-gradient(135deg,#0d1b2a,#1c1132,#082e38)",
      },

      /* 🔤 FONT SETUP (Inter global) */
      fontFamily: {
        sans: ["Inter", "sans-serif"], // GLOBAL FONT
        inter: ["Inter", "sans-serif"], // optional utility
      },

      boxShadow: {
        player: "0 0 20px rgba(0, 0, 0, 0.7)",
        "card-glow": "0 4px 20px rgba(28, 17, 50, 0.6)",
        "neon-cyan": "0 0 10px #22d3ee, 0 0 20px #22d3ee",
      },

      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        spinSlow: "spinSlow 4s linear infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },

  plugins: [require("@tailwindcss/aspect-ratio")],
};
