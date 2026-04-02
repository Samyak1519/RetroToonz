import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#0a1628] via-[#0f1f38] to-[#081120] text-white/90 py-10 backdrop-blur-md border-t border-white/10">
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-400/70 via-blue-400/70 to-cyan-400/70"></div>

      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-8">
        {/* Main Footer Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
          {/* Left: Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300 tracking-wide order-1 sm:order-none"
          >
            RetroToonz
          </Link>

          {/* Center: Navigation */}
          <div className="flex gap-10 text-base font-medium tracking-wide order-2 sm:order-none">
            {["Home", "Profile", "Watchlist"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                className="relative group"
              >
                <span className="transition-colors duration-300 group-hover:text-cyan-300">
                  {item}
                </span>
                <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Right: Copyright */}
          <div className="text-xs text-white/50 tracking-wider text-center sm:text-right order-3 sm:order-none mt-4 sm:mt-0">
            © {new Date().getFullYear()} RetroToonz. All rights reserved.
          </div>
        </div>

        {/* ☕ Custom Cookie Font Button */}
        <div className="w-full flex justify-center">
          <a
            href="https://buymeachai.ezee.li/Samyak005"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow-md hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-200"
          >
            <img
              src="https://buymeachai.ezee.li/assets/images/chai.png"
              alt="chai"
              className="w-7 h-7"
            />

            <span
              className="text-2xl text-black/80 font-semibold"
              style={{ fontFamily: "'Cookie', cursive" }}
            >
              Buy me a chai
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
