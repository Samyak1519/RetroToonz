// src/Pages/VideoPlayerPage.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../Components/Header";
import VideoPlayer from "../Components/VideoPlayer";
import Episodes from "../Components/VideoPlayerEpisodes";
import ShowInfo from "../Components/VideoPlayerShowInfo";
import UpNext from "../Components/VideoPlayerUpNext";
import showsData from "../Data/Shows.json";

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
      <Header />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentShow.id}
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

          <ShowInfo currentShow={currentShow} />

          <div className="px-4 sm:px-8 md:px-12 mb-10">
            <Episodes
              seasons={currentShow.seasons}
              currentShowId={currentShow.id}
            />
          </div>

          <div className="px-4 sm:px-8 md:px-12">
            <UpNext
              allShows={allShows}
              currentIndex={currentIndex}
              currentShow={currentShow}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default VideoPlayerPage;
