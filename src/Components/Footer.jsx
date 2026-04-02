import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#0a1628] via-[#0f1f38] to-[#081120] text-white/90 py-12 border-t border-white/10">
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-400/70 via-blue-400/70 to-cyan-400/70"></div>

      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10">
        {/* ================= MOBILE ================= */}
        <div className="flex flex-col items-center gap-6 md:hidden text-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-4xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent"
          >
            RetroToonz
          </Link>

          {/* Links */}
          <div className="flex gap-16 text-sm">
            <div className="space-y-2">
              <h4 className="text-white font-semibold text-base">Company</h4>
              <Link
                to="/about"
                className="block text-white/60 hover:text-cyan-300"
              >
                About Us
              </Link>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-semibold text-base">Explore</h4>
              <Link to="/" className="block text-white/60 hover:text-cyan-300">
                Home
              </Link>
              <Link
                to="/profile"
                className="block text-white/60 hover:text-cyan-300"
              >
                Profile
              </Link>
              <Link
                to="/watchlist"
                className="block text-white/60 hover:text-cyan-300"
              >
                Watchlist
              </Link>
            </div>
          </div>

          {/* Button */}
          <a
            href="https://buymeachai.ezee.li/Samyak005"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white/90 px-5 py-2 rounded-xl shadow-md"
          >
            <img
              src="https://buymeachai.ezee.li/assets/images/chai.png"
              alt="chai"
              className="w-6 h-6"
            />
            <span
              className="text-xl text-black/80 font-semibold"
              style={{ fontFamily: "'Cookie', cursive" }}
            >
              Buy me a chai
            </span>
          </a>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:flex justify-between items-start">
          {/* LEFT: Logo + Button */}
          <div className="flex flex-col items-center md:items-start gap-6 relative">
            {/* Glow Background */}
            <div className="absolute -top-6 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-40 h-40 bg-cyan-400/10 blur-3xl rounded-full pointer-events-none"></div>

            {/* Logo */}
            <Link
              to="/"
              className="relative text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent tracking-wide"
            >
              RetroToonz
            </Link>

            {/* CTA Button */}
            <a
              href="https://buymeachai.ezee.li/Samyak005"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-[2px]"
            >
              {/* Soft glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition duration-300"></div>

              {/* Icon */}
              <img
                src="https://buymeachai.ezee.li/assets/images/chai.png"
                alt="chai"
                className="w-6 h-6 relative z-10 group-hover:scale-110 transition-transform duration-300"
              />

              {/* Text */}
              <span
                className="relative z-10 text-2xl text-black/80 font-semibold"
                style={{ fontFamily: "'Cookie', cursive" }}
              >
                Buy me a chai
              </span>
            </a>
          </div>

          {/* RIGHT: Links */}
          <div className="flex gap-20 text-sm">
            <div className="space-y-2">
              <h4 className="text-white font-semibold text-base">Company</h4>
              <Link
                to="/about"
                className="block text-white/60 hover:text-cyan-300"
              >
                About Us
              </Link>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-semibold text-base">Explore</h4>
              <Link to="/" className="block text-white/60 hover:text-cyan-300">
                Home
              </Link>
              <Link
                to="/profile"
                className="block text-white/60 hover:text-cyan-300"
              >
                Profile
              </Link>
              <Link
                to="/watchlist"
                className="block text-white/60 hover:text-cyan-300"
              >
                Watchlist
              </Link>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <span>
            © {new Date().getFullYear()} RetroToonz. All rights reserved.
          </span>

          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">FAQ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
