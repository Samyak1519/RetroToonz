// src/Pages/ProfilePage.jsx

import {
  UserIcon,
  ArrowLeft01Icon,
  Edit02Icon,
  Add01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../Components/Footer";
import Header from "../Components/Header";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("History");
  const navigate = useNavigate();
  const profileImage = "";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#050b14] via-[#0a1528] to-[#04080f] text-white">
      <Header />

      <main className="flex-grow">
        {/* 🔥 MATCHED GLOBAL CONTAINER */}
        <div className="px-4 sm:px-7 md:px-10 lg:px-16 py-6 max-w-[1800px] mx-auto">
          {/* 🔝 HEADER (NOW PERFECTLY CONSISTENT) */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="bg-white/5 hover:bg-white/10 p-2.5 rounded-full border border-white/10 transition-all"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={24} />
            </button>

            <div>
              <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white/80">
                My Account
              </h1>
            </div>
          </div>

          {/* 👤 PROFILE HEADER */}
          <section className="grid md:grid-cols-[auto_1fr] gap-8 items-center mb-12 sm:pl-15">
            {/* Avatar */}
            <div className="flex justify-center md:justify-start">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-cyan-400 object-cover shadow-[0_0_25px_rgba(0,255,255,0.4)]"
                />
              ) : (
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-cyan-400 bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_25px_rgba(0,255,255,0.3)]">
                  <HugeiconsIcon icon={UserIcon} size={64} />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-3xl font-semibold">
                Samyak Nimsarkar
              </h2>
              <p className="text-cyan-300 mt-1">@samyak005</p>

              {/* Buttons */}
              <div className="mt-5 flex flex-wrap gap-3 justify-center md:justify-start">
                <button className="flex items-center gap-2 px-5 py-2 rounded-lg border border-cyan-500 text-cyan-300 hover:bg-cyan-500/10 hover:shadow-[0_0_12px_rgba(0,255,255,0.3)] transition-all">
                  <HugeiconsIcon icon={Edit02Icon} size={18} />
                  Edit Profile
                </button>

                <button
                  onClick={() => navigate("/addshow")}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg border border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 hover:shadow-[0_0_12px_rgba(255,215,0,0.3)] transition-all"
                >
                  <HugeiconsIcon icon={Add01Icon} size={18} />
                  Add Show
                </button>
              </div>
            </div>
          </section>

          {/* 📑 TABS */}
          <div className="border-b border-white/10 flex gap-8 mb-8 sm:pl-20">
            {["History", "About"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 transition ${
                  activeTab === tab
                    ? "text-yellow-400 border-b-2 border-yellow-400"
                    : "text-gray-400 hover:text-yellow-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 🎬 SHOWS */}
          <div className="mb-16 sm:pl-16">
            <h3 className="text-3xl font-bold text-yellow-400 mb-2">Shows</h3>
            <p className="text-gray-400 mb-6">
              Explore your favorite shows here.
            </p>

            <div
              className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4 
              gap-6
            "
            >
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all">
                <div className="h-44 bg-gray-700 rounded-lg mb-3"></div>
                <h4 className="font-semibold">Show Title</h4>
                <p className="text-sm text-gray-400">
                  Short description goes here...
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
