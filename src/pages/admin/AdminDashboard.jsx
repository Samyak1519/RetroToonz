import {
  Alert02Icon,
  Analytics01Icon,
  DashboardSquare01Icon,
  GridIcon,
  Home01Icon,
  Home02Icon,
  Menu01Icon,
  PlayListAddIcon,
  Settings01Icon,
  UserGroupIcon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const stats = [
  { title: "Users", value: "12,430", change: "+12%" },
  { title: "Shows", value: "120", change: "+3" },
  { title: "Episodes", value: "1,240", change: "+24" },
  { title: "Views", value: "89,200", change: "+18%" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/admin", icon: DashboardSquare01Icon },
    { name: "Shows", path: "/admin/shows", icon: PlayListAddIcon },
    { name: "Episodes", path: "/admin/episodes", icon: GridIcon },
    { name: "Users", path: "/admin/users", icon: UserGroupIcon },
    { name: "Analytics", path: "/admin/analytics", icon: Analytics01Icon },
    { name: "Homepage", path: "/admin/homepage", icon: Home02Icon },
    { name: "Collections", path: "/admin/collections", icon: GridIcon },
    {
      name: "Content Health",
      path: "/admin/content-health",
      icon: Alert02Icon,
    },
    { name: "Settings", path: "/admin/settings", icon: Settings01Icon },
  ];

  const Sidebar = () => (
    <aside className="w-64 bg-black/60 backdrop-blur-xl p-5 border-r border-gray-800 flex flex-col justify-between h-full">
      <div>
        <h1 className="text-lg md:text-xl font-semibold mb-6 text-indigo-400 tracking-wide">
          RetroToonz Admin
        </h1>

        <nav className="space-y-2 text-sm">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${
                  isActive
                    ? "bg-indigo-500/15 text-indigo-400"
                    : "hover:bg-indigo-500/10 hover:text-indigo-300"
                }`}
              >
                <HugeiconsIcon icon={item.icon} size={18} />
                {item.name}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="text-xs text-gray-500 pt-6 border-t border-gray-800">
        © 2026 RetroToonz
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="w-64 bg-black">
            <Sidebar />
          </div>
          <div
            className="flex-1 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center px-4 md:px-6 py-4 border-b border-gray-800 bg-black/30 backdrop-blur-md">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <HugeiconsIcon icon={Menu01Icon} size={22} />
            </button>

            <HugeiconsIcon icon={Home01Icon} size={20} />
            <button
              onClick={() => navigate("/")}
              className="text-sm text-gray-300 hover:text-white transition"
            >
              Back to Home
            </button>
          </div>

          <div className="flex gap-2 md:gap-3">
            <button
              onClick={() => navigate("/admin/shows/add")}
              className="bg-indigo-600 hover:bg-indigo-500 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium shadow-md"
            >
              Add Show
            </button>
            <button
              onClick={() => navigate("/admin/episodes/add")}
              className="bg-cyan-600 hover:bg-cyan-500 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium shadow-md"
            >
              Add Episode
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 md:p-6 space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
            Dashboard
          </h2>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="bg-gray-900/60 backdrop-blur-lg p-3 md:p-4 rounded-xl border border-gray-800 hover:border-indigo-500/30 transition"
              >
                <p className="text-gray-400 text-[10px] md:text-xs uppercase tracking-wide">
                  {stat.title}
                </p>
                <h3 className="text-lg md:text-xl font-semibold mt-1">
                  {stat.value}
                </h3>
                <p className="text-green-400 text-[10px] md:text-xs mt-1">
                  {stat.change}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-900/60 backdrop-blur-lg p-4 md:p-5 rounded-xl border border-gray-800">
            <h3 className="text-base md:text-lg font-medium mb-3 tracking-wide">
              Quick Actions
            </h3>
            <div className="flex flex-wrap gap-2 md:gap-4">
              {[
                "Add Show",
                "Upload Episode",
                "Mark Trending",
                "Feature Show",
              ].map((action) => (
                <button
                  key={action}
                  className="bg-gray-800 hover:bg-indigo-500/20 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm transition"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-900/60 backdrop-blur-lg p-4 md:p-5 rounded-xl border border-gray-800">
            <h3 className="text-base md:text-lg font-medium mb-3 tracking-wide">
              Recent Activity
            </h3>
            <ul className="text-xs md:text-sm text-gray-300 space-y-2">
              <li className="hover:text-white transition">Added "Ben 10"</li>
              <li className="hover:text-white transition">
                Uploaded Episode 5 - Naruto
              </li>
              <li className="hover:text-white transition">
                Updated Thumbnail - Pokemon
              </li>
            </ul>
          </div>

          {/* Content Health */}
          <div className="bg-gray-900/60 backdrop-blur-lg p-4 md:p-5 rounded-xl border border-gray-800">
            <h3 className="text-base md:text-lg font-medium mb-3 tracking-wide">
              Content Health
            </h3>
            <ul className="text-xs md:text-sm text-gray-300 space-y-2">
              <li className="text-yellow-400">⚠️ 3 shows have no episodes</li>
              <li className="text-red-400">❌ 5 episodes missing thumbnails</li>
              <li className="text-pink-400">📉 2 shows low performance</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
