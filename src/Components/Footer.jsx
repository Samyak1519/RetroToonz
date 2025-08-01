import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-white py-6 mt-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Brand */}
          <Link
            to="/"
            className="text-lg font-bold text-cyan-400 hover:text-cyan-300"
          >
            RetroToonz
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-6 text-sm">
            <Link to="/" className="hover:text-cyan-300">
              Home
            </Link>
            <Link to="/profile" className="hover:text-cyan-300">
              Profile
            </Link>
            <Link to="/watchlist" className="hover:text-cyan-300">
              Watchlist
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-400">
            © {new Date().getFullYear()} RetroToonz. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
