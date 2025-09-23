// src/Pages/VideoPlayerPage.jsx
import { useRef } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import VideoPlayer from "../Components/VideoPlayer";
import showsData from "../Data/Shows.json";
import Header from "../Components/Header";

function VideoPlayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const allShows = showsData.allShows;
  const currentIndex = allShows.findIndex((show) => show.id === id);
  const currentShow = currentIndex !== -1 ? allShows[currentIndex] : null;

  const videoRef = useRef(null);

  const goToNextShow = () => {
    const next = (currentIndex + 1) % allShows.length;
    navigate(`/watch/${allShows[next].id}`);
  };

  const goToPreviousShow = () => {
    const prev = (currentIndex - 1 + allShows.length) % allShows.length;
    navigate(`/watch/${allShows[prev].id}`);
  };

  if (!currentShow) {
    return <div className="text-white p-4">Video not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#0F0A24] text-white">
      {/* header */}
      <Header />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentShow.id} // key ensures re-animation on show change
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full"
        >
          <VideoPlayer
            currentShow={currentShow}
            goToNextShow={goToNextShow}
            goToPreviousShow={goToPreviousShow}
          />

          {/* Show Info */}
          <div className="px-4 sm:px-8 md:px-12 py-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{currentShow.title}</h1>
            <div className="flex flex-wrap gap-2 text-sm text-gray-300 mb-4">
              <span>{currentShow.year}</span>
              {currentShow.language && <span>{currentShow.language}</span>}
              {currentShow.rating && <span>⭐ {currentShow.rating}</span>}
              {currentShow.duration && <span>{currentShow.duration}</span>}
            </div>

            {/* Tags */}
            {currentShow.tags?.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {currentShow.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs font-medium bg-white/10 border border-white/20 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <p className="text-gray-200 max-w-3xl leading-relaxed">{currentShow.description}</p>
          </div>

          

          {/* Episodes (placeholder; replace with real seasons/episodes if you add them to JSON) */}
          <div className="px-4 sm:px-8 md:px-12 mb-10">
            <h2 className="text-xl font-semibold mb-4">Episodes</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {/* Replace with real data when you add seasons/episodes to your JSON */}
              {[1, 2, 3].map((ep) => (
                <Link
                  key={ep}
                  to={`/watch/${currentShow.id}?ep=${ep}`}
                  className="bg-white/10 hover:bg-white/20 rounded-lg overflow-hidden transition"
                >
                  <div className="aspect-video bg-gray-800 flex items-center justify-center text-gray-400 text-sm">
                    Episode {ep}
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium">Episode {ep} Title</h3>
                    <p className="text-xs text-gray-300 line-clamp-2">
                      Short episode description goes here...
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Up Next */}
          <div className="px-4 sm:px-8 md:px-12 pb-10">
            <h2 className="text-xl font-semibold mb-4">Up Next</h2>
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg hover:bg-white/10 transition">
              <img
                src={currentShow.thumbnailMobile || currentShow.thumbnail}
                alt={currentShow.title}
                className="w-24 h-16 object-cover rounded-md"
              />
              <div>
                <h3 className="text-sm font-medium">
                  {allShows[(currentIndex + 1) % allShows.length].title}
                </h3>
                <p className="text-xs text-gray-400">Starts after this episode</p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default VideoPlayerPage;
