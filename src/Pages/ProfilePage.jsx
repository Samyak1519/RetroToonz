import Header from "../Components/Header";
import { FaUserCircle } from "react-icons/fa";

function ProfilePage() {
  return (
    <>
      <Header />

      {/* Top padding so content isn't hidden behind the fixed header */}
      <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl p-6 sm:p-8 shadow-md">
          {/* Profile Header */}
          <div className="flex flex-col items-center sm:flex-row sm:items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full border-4 border-cyan-500 flex items-center justify-center bg-gray-700 text-cyan-400">
              <FaUserCircle className="text-[96px]" />
            </div>

            {/* Info */}
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold">Samyak Nimsarkar</h1>
              <p className="text-sm text-gray-300">samyak@example.com</p>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-6 border-gray-700" />

          {/* Form Fields */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Username
              </label>
              <input
                type="text"
                defaultValue="Samyak Nimsarkar"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Email
              </label>
              <input
                type="email"
                defaultValue="samyak@example.com"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
            <button className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-lg">
              View Watchlist
            </button>
            <button className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg">
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
