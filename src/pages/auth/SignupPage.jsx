import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function AuthPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // ✅ STATE ADDED
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  // ✅ HANDLE INPUT
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // ✅ SIGNUP LOGIC
  function handleSignup(e) {
    e.preventDefault();

    const { fullName, username, email, password } = formData;

    if (!fullName || !username || !email || !password) {
      if (!isValidEmail(email)) {
        alert("Please enter a valid email");
        return;
      }
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const alreadyExists = existingUsers.find(
      (u) => u.email === email || u.username === username,
    );

    if (alreadyExists) {
      alert("User already exists");
      return;
    }

    const newUser = {
      fullName,
      username,
      email,
      password,
      role: "user",
    };

    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

    alert("Account created successfully!");
    navigate("/login");
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0b132b]">
      {/* ✅ CLOSE BUTTON */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-white transition-all border border-white/10 backdrop-blur-md group"
      >
        <HugeiconsIcon
          icon={Cancel01Icon}
          size={24}
          color="currentColor"
          strokeWidth={1.5}
          className="group-hover:rotate-90 transition-transform duration-300"
        />
      </button>

      {/* MAIN CONTENT */}
      <div className="flex-grow relative flex items-center justify-center px-6 sm:px-10 md:px-16 overflow-hidden">
        {/* Confetti Overlay */}
        <div className="absolute inset-0 bg-[url('/media/extras/confetti-doodles.svg')] bg-cover bg-center opacity-10 pointer-events-none" />

        {/* Soft Glow */}
        <div className="absolute right-1/3 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#ef476f]/20 blur-[120px] rounded-full pointer-events-none" />

        {/* Floating Animated Shapes */}
        <motion.div
          className="absolute top-10 left-10 text-[#FF6B6B] text-3xl"
          animate={{ y: [0, 15, 0], rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          ▲
        </motion.div>

        <motion.div
          className="absolute bottom-16 right-20 text-[#FFD166] text-2xl"
          animate={{ y: [0, -10, 0], rotate: [0, -20, 20, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        >
          ■
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-1/3 text-white text-4xl"
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          ~
        </motion.div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:flex flex-col md:flex-row items-center justify-between w-full max-w-6xl relative z-10">
          {/* Left Section */}
          <motion.div
            className="text-left text-gray-100 mb-10 md:mb-0 md:w-1/2 pl-0 md:pl-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-5xl font-bold mb-4 text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              RetroToonz
            </motion.h1>
            <p className="text-lg leading-relaxed text-gray-200">
              Relive the magic of classic cartoons — anytime, anywhere.
            </p>
          </motion.div>

          {/* Right Section */}
          <motion.div
            className="w-full md:w-[420px] bg-[#1b1f3a]/10 backdrop-blur-xl text-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.45)] p-8 my-22 border border-white/10"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-center text-emerald-100">
              Create an account
            </h2>

            {/* ✅ FORM UPDATED */}
            <form className="space-y-4" onSubmit={handleSignup}>
              {/* ✅ NEW FIELD */}
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-white/20 bg-transparent text-white placeholder-gray-400  rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#6495ED]"
              />

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border border-white/20 bg-transparent text-white placeholder-gray-400 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#6495ED]"
              />

              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-white/20 bg-transparent text-white placeholder-gray-400 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#6495ED]"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-white/20 bg-transparent text-white placeholder-gray-400 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#6495ED]"
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#EF476F] to-[#FF6B6B] text-white py-2.5 rounded-lg hover:from-[#FF5C8A] hover:to-[#FF8DAA] transition font-medium shadow-md shadow-[#EF476F]/30"
              >
                Sign Up
              </button>
            </form>

            <div className="flex items-center justify-center my-6">
              <div className="border-t border-gray-600 w-1/3" />
              <span className="text-gray-400 text-sm px-2">OR</span>
              <div className="border-t border-gray-600 w-1/3" />
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col space-y-3">
              <button className="flex items-center justify-center gap-2 w-full border border-white/20 rounded-lg py-2.5 hover:bg-white/10 transition">
                <img src="/logos/google-icon.png" className="w-5 h-5" />
                Continue with Google
              </button>
            </div>

            <p className="text-center text-gray-300 text-sm mt-6">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[#FFD166] hover:underline"
              >
                Log in
              </button>
            </p>
          </motion.div>
        </div>

        {/* MOBILE VIEW */}
        <div className="flex flex-col items-center justify-center text-center w-full max-w-sm md:hidden relative z-10 py-10">
          <motion.div
            className="text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-2 drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
              RetroToonz
            </h1>
            <p className="text-base text-gray-300 leading-relaxed">
              Relive the magic of classic cartoons — anytime, anywhere.
            </p>
          </motion.div>

          <motion.div
            className="w-full bg-[#111633]/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 p-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-5 text-center text-emerald-100">
              Create an account
            </h2>

            {/* ✅ SAME LOGIC APPLIED */}
            <form className="space-y-4" onSubmit={handleSignup}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-white/20 bg-transparent text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#6495ED]"
              />

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border border-white/20 bg-transparent text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#6495ED]"
              />

              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-white/20 bg-transparent text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#6495ED]"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-white/20 bg-transparent text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#6495ED]"
              />

              <button
                type="submit"
                className="w-full bg-[#EF476F] text-white py-3 rounded-lg hover:bg-[#FF5C8A] transition font-medium shadow-md shadow-[#EF476F]/30"
              >
                Sign Up
              </button>
            </form>

            <div className="flex items-center justify-center my-6">
              <div className="border-t border-gray-600 w-1/3" />
              <span className="text-gray-400 text-sm px-2">OR</span>
              <div className="border-t border-gray-600 w-1/3" />
            </div>

            <div className="flex flex-col space-y-3">
              <button className="flex items-center justify-center gap-2 w-full border border-white/20 rounded-lg py-3 hover:bg-white/10 transition">
                <img src="/logos/google-icon.png" className="w-5 h-5" />
                Continue with Google
              </button>

              <button className="flex items-center justify-center gap-2 w-full border border-white/20 rounded-lg py-3 hover:bg-white/10 transition">
                <img src="/logos/facebook-logo.png" className="w-5 h-5" />
                Continue with Facebook
              </button>

              <button className="flex items-center justify-center gap-2 w-full border border-white/20 rounded-lg py-3 hover:bg-white/10 transition">
                <img
                  src="/logos/apple-logo.png"
                  className="w-5 h-5 invert bg-white"
                />
                Continue with Apple
              </button>
            </div>

            <p className="text-center text-gray-300 text-sm mt-6">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[#FFD166] hover:underline"
              >
                Log in
              </button>
            </p>
          </motion.div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-auto py-4 text-center text-gray-400 text-xs sm:text-sm opacity-70">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-[#FFD166] font-semibold">RetroToonz</span>. All
          rights reserved.
        </p>
        <div className="flex justify-center gap-4 mt-1 text-gray-500">
          <a href="/about" className="hover:text-[#FFD166] transition">
            About
          </a>
          <a href="/privacy" className="hover:text-[#FFD166] transition">
            Privacy
          </a>
          <a href="/terms" className="hover:text-[#FFD166] transition">
            Terms
          </a>
        </div>
      </footer>
    </div>
  );
}
