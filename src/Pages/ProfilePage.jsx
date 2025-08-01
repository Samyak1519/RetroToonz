import { useState } from "react";
<<<<<<< HEAD
import Foooter from "../Components/Footer";
import Header from "../Components/Header";
=======
import Header from "../Components/Header";
import Foooter from "../Components/Footer";
>>>>>>> 3ea8f468a04a22cbae3c34b1da6d24830d81c8ba

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Movies");

  return (
    <div className="min-h-screen flex flex-col ">
      {" "}
      {/* full page layout */}
      <Header />
      <main className="flex-grow text-white font-sans pt-12 sm:pt-28 px-6 sm:px-24">
        <section className="flex flex-col items-center space-y-4 sm:ml-20 sm:space-y-0 sm:flex-row sm:space-x-6 mt-6 sm:mt-12">
          <div>
            <img
              src="profile-image.jpg"
              alt="Profile"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-yellow-500 object-cover"
            />
          </div>

          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-semibold">
              Samyak Nimsarkar
            </h1>
            <h2 className="text-base sm:text-xl font-normal">@samyak005</h2>
            <button className="mt-4 text-yellow-500 hover:underline">
              Edit Profile
            </button>
          </div>
        </section>
        {/* Navigation Tabs Section */}
        <div className="mt-6 sm:mt-14 px-4 sm:px-20">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-12 overflow-x-auto sm:overflow-x-visible">
            {["History", "About"].map((tab) => (
              <div
                key={tab}
                className={`cursor-pointer py-2 px-4 transition-colors text-center sm:text-left ${
                  activeTab === tab
                    ? "text-yellow-500 font-semibold tracking-wider"
                    : "text-gray-400 hover:text-yellow-500 font-semibold tracking-wide"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Active Tab Underline */}
          <div
            className="h-0.5 bg-slate-500 w-full mt-2"
            style={{
              transition: "width 0.3s ease-in-out",
              width: "100%",
            }}
          />
        </div>
        {/* Shows Section */}
        <div className="mt-8 sm:mt-14 px-4 sm:px-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-yellow-500">
            Shows
          </h3>
          <p className="text-lg sm:text-xl text-gray-300 mt-4">
            Explore your favorite shows here.
          </p>
        </div>
      </main>
      <Foooter />
    </div>
  );
};

export default ProfilePage;
