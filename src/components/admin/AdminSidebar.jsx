import {
  Alert02Icon,
  Analytics01Icon,
  DashboardSquare01Icon,
  GridIcon,
  Home02Icon,
  PlayListAddIcon,
  Settings01Icon,
  UserGroupIcon,
  ArrowLeft01Icon, // ✅ added
} from "@hugeicons/core-free-icons";

import { HugeiconsIcon } from "@hugeicons/react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminSidebar({ closeSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();

  const sections = [
    {
      title: "MAIN",
      items: [
        { name: "Dashboard", path: "/admin", icon: DashboardSquare01Icon },
      ],
    },
    {
      title: "CONTENT",
      items: [
        { name: "Shows", path: "/admin/shows", icon: PlayListAddIcon },
        { name: "Episodes", path: "/admin/episodes", icon: GridIcon },
        {
          name: "Homepage Section",
          path: "/admin/homepage-section",
          icon: Home02Icon,
        },
      ],
    },
    {
      title: "USERS",
      items: [{ name: "Users", path: "/admin/users", icon: UserGroupIcon }],
    },
    {
      title: "ANALYTICS",
      items: [
        { name: "Analytics", path: "/admin/analytics", icon: Analytics01Icon },
      ],
    },
    {
      title: "CONTROL",
      items: [
        {
          name: "Content Health",
          path: "/admin/content-health",
          icon: Alert02Icon,
        },
      ],
    },
    {
      title: "SYSTEM",
      items: [
        { name: "Settings", path: "/admin/settings", icon: Settings01Icon },
      ],
    },
  ];

  return (
    <aside
      className="w-64 h-[calc(100vh-16px)] m-2 sticky top-2 rounded-2xl 
      bg-gradient-to-b from-white/5 via-white/5 to-transparent 
      backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col"
    >
      {/* 🔝 HEADER (ENHANCED) */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition group"
        >
          <HugeiconsIcon
            icon={ArrowLeft01Icon}
            size={18}
            className="group-hover:-translate-x-0.5 transition"
          />
        </button>

        {/* Logo */}
        <h1 className="text-lg font-semibold tracking-wide bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          RetroToonz
        </h1>

        {/* Spacer for balance */}
        <div className="w-8" />
      </div>

      {/* 🔥 Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <nav className="space-y-6 text-sm">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 px-2">
                {section.title}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <div
                      key={item.name}
                      onClick={() => {
                        navigate(item.path);
                        closeSidebar?.();
                      }}
                      className={`group relative flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200
                      ${
                        isActive
                          ? "bg-indigo-500/10 text-indigo-400"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {/* 🔥 Active Glow Bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
                      )}

                      {/* Icon */}
                      <HugeiconsIcon
                        icon={item.icon}
                        size={18}
                        className={`transition ${
                          isActive ? "scale-110" : "group-hover:scale-105"
                        }`}
                      />

                      {/* Text */}
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* 🔻 Footer */}
      <div className="p-4 border-t border-white/10 text-xs text-gray-500">
        © 2026 RetroToonz
      </div>
    </aside>
  );
}
