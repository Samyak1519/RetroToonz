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
        "space-galaxy": "linear-gradient(135deg,#0d1b2a, #1c1132, #082e38)",
      },
      fontFamily: {
        sans: ['"Nunito"', "sans-serif"],
        nunito: ['"Nunito"', "sans-serif"],
      },
      boxShadow: {
        player: "0 0 20px rgba(0, 0, 0, 0.7)",
        "card-glow": "0 4px 20px rgba(28, 17, 50, 0.6)",
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
