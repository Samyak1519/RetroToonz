import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#0a1628] via-[#0f1f38] to-[#081120] text-white/90 py-10 backdrop-blur-md border-t border-white/10 ">
      {/* Subtle Gradient Top Border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400/70 via-blue-400/70 to-cyan-400/70"></div>

      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-8">
        {/* Left: Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300 tracking-wide"
        >
          RetroToonz
        </Link>

        {/* Center: Navigation Links */}
        <div className="flex gap-10 text-base font-medium tracking-wide">
          {["Home", "Profile", "Watchlist"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
              className="relative group"
            >
              <span className="transition-colors duration-300 group-hover:text-cyan-300">
                {item}
              </span>
              {/* Underline on hover */}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Right: Copyright */}
        <div className="text-xs text-white/50 tracking-wider">
          © {new Date().getFullYear()} RetroToonz. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
