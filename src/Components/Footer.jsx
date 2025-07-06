function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-white py-6 mt-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Brand */}
          <div className="text-lg font-bold text-cyan-400">RetroToonz</div>

          {/* Navigation Links */}
          <div className="flex gap-6 text-sm">
            <a href="/" className="hover:text-cyan-300">
              Home
            </a>
            <a href="/profile" className="hover:text-cyan-300">
              Profile
            </a>
            <a href="/watchlist" className="hover:text-cyan-300">
              Watchlist
            </a>
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
