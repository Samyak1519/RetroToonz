import {
  Menu01Icon,
  Notification03Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLocation } from "react-router-dom";

export default function AdminHeader({ onMenuClick }) {
  const location = useLocation();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getTitle = () => {
    if (location.pathname === "/admin") return "Dashboard";
    if (location.pathname.includes("shows")) return "Shows";
    if (location.pathname.includes("episodes")) return "Episodes";
    if (location.pathname.includes("users")) return "Users";
    if (location.pathname.includes("analytics")) return "Analytics";
    if (location.pathname.includes("homepage")) return "Homepage";
    if (location.pathname.includes("collections")) return "Collections";
    if (location.pathname.includes("content-health")) return "Content Health";
    if (location.pathname.includes("settings")) return "Settings";
    return "Admin";
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-gradient-to-b from-black/40 via-black/20 to-transparent backdrop-blur-md px-4 md:px-6 py-4">
      {/* 🔝 Top Row */}
      <div className="flex items-start md:items-center justify-between gap-4">
        {/* LEFT */}
        <div className="flex items-start md:items-center gap-3">
          {/* Mobile Menu */}
          <button
            className="md:hidden mt-1 p-2 rounded-lg hover:bg-white/10 transition"
            onClick={onMenuClick}
          >
            <HugeiconsIcon icon={Menu01Icon} size={20} />
          </button>

          {/* Greeting */}
          <div>
            <h1 className="text-lg sm:text-xl md:text-3xl font-semibold tracking-tight">
              {getGreeting()},{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Samyak
              </span>
            </h1>

            {/* 🔥 Improved subtitle */}
            <p className="text-xs sm:text-sm text-white/50 mt-1 tracking-tight">
              {getTitle()} overview and insights
            </p>
          </div>
        </div>

        {/* RIGHT (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {/* 🔍 Search */}
          <div
            className="
            flex items-center gap-2 
            bg-black/40 backdrop-blur-lg
            border border-white/10 
            rounded-xl px-3 py-2 
            w-60 lg:w-72

            transition-all duration-200
            focus-within:border-indigo-400/40 
            focus-within:bg-black/60
          "
          >
            <HugeiconsIcon
              icon={Search01Icon}
              size={16}
              className="text-white/60"
            />
            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent outline-none text-sm w-full placeholder:text-white/40 text-white"
            />
          </div>

          {/* 🔔 Notification */}
          <div
            className="
            relative p-2 rounded-xl 
            bg-white/5 hover:bg-white/10 
            cursor-pointer transition group
          "
          >
            <HugeiconsIcon
              icon={Notification03Icon}
              size={18}
              className="transition-all duration-200 group-hover:scale-110"
            />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </div>

          {/* 👤 Profile */}
          <div
            className="
            w-9 h-9 rounded-full 
            bg-gradient-to-br from-indigo-500 to-cyan-500 
            flex items-center justify-center 
            text-sm font-semibold 
            cursor-pointer 
            transition-all duration-200
            hover:scale-105 hover:shadow-[0_0_12px_rgba(99,102,241,0.6)]
          "
          >
            S
          </div>
        </div>
      </div>

      {/* 📱 Mobile Row */}
      <div className="mt-4 flex md:hidden items-center gap-3">
        {/* Search */}
        <div
          className="
          flex items-center gap-2 
          bg-black/40 backdrop-blur-lg
          border border-white/10 
          rounded-xl px-3 py-2 flex-1
        "
        >
          <HugeiconsIcon
            icon={Search01Icon}
            size={16}
            className="text-white/60"
          />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-full placeholder:text-white/40 text-white"
          />
        </div>

        {/* Notification */}
        <div className="relative p-2 rounded-xl bg-white/5">
          <HugeiconsIcon icon={Notification03Icon} size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </div>

        {/* Profile */}
        <div
          className="
          w-9 h-9 rounded-full 
          bg-gradient-to-br from-indigo-500 to-cyan-500 
          flex items-center justify-center 
          text-sm font-semibold
        "
        >
          S
        </div>
      </div>
    </header>
  );
}
