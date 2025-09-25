import { UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("History");
  const navigate = useNavigate();
  const profileImage = ""; // URL if available

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#050b14] via-[#0a1528] to-[#04080f] text-white">
      <Header />

      <main className="flex-grow font-sans px-6 sm:px-24">
        <button
          onClick={() => navigate(-1)}
          className="bg-black/70 hover:bg-black/90 p-2 rounded-full text-white text-xl sm:text-2xl mt-4 transition"
        >
          <FaArrowLeft />
        </button>
        {/* Profile Header */}
        <section className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-8 mt-5 sm:pl-20">
          {/* Profile Picture */}
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-cyan-400 object-cover shadow-[0_0_20px_rgba(0,255,255,0.4)]"
            />
          ) : (
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-cyan-400 bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.3)]">
              <HugeiconsIcon
                icon={UserIcon}
                className="w-16 h-16 sm:w-20 sm:h-20 text-white"
              />
            </div>
          )}

          {/* Profile Info */}
          <div className="mt-6 sm:mt-0 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">
              Samyak Nimsarkar
            </h1>
            <h2 className="text-base sm:text-lg text-cyan-300">
              @samyak005
            </h2>

            {/* Action Buttons */}
            <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4 gap-3">
              <button className="px-5 py-2 rounded-lg border border-cyan-500 text-cyan-300 hover:bg-cyan-500/10 hover:shadow-[0_0_12px_rgba(0,255,255,0.3)] transition-all">
                Edit Profile
              </button>
              <button
                onClick={() => navigate("/addshow")}
                className="px-5 py-2 rounded-lg border border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 hover:shadow-[0_0_12px_rgba(255,215,0,0.3)] transition-all"
              >
                Add Show
              </button>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="mt-10 sm:mt-14 px-4 sm:px-20">
          <div className="flex space-x-8 overflow-x-auto no-scrollbar pb-2 border-b border-gray-700">
            {["History", "About"].map((tab) => (
              <div
                key={tab}
                className={`cursor-pointer pb-2 transition-all ${activeTab === tab
                  ? "text-yellow-400 border-b-2 border-yellow-400"
                  : "text-gray-400 hover:text-yellow-400"
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>

        {/* Shows Section */}
        <div className="mt-5 sm:mt-5 mb-10 px-4 sm:px-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">
            Shows
          </h3>
          <p className="text-lg text-gray-300">
            Explore your favorite shows here.
          </p>
          {/* Placeholder for Show Cards */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Example Card */}
            <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all">
              <div className="h-40 bg-gray-700 rounded-lg mb-3"></div>
              <h4 className="text-lg font-semibold">Show Title</h4>
              <p className="text-sm text-gray-400">
                Short description goes here...
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
