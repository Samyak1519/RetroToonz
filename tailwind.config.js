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
        sans: ['"Nunito"', "sans-serif"], // ✅ Set as global default
        nunito: ['"Nunito"', "sans-serif"], // ✅ Optional class
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
