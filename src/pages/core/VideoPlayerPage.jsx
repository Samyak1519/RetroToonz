// src/pages/VideoPlayerPage.jsx
import { AnimatePresence, motion } from "framer-motion";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import Footer from "../../components/layout/Footer.jsx";
import Header from "../../components/layout/Header.jsx";
import VideoPlayer from "../../components/video/VideoPlayer.jsx";
import ShowInfo from "../../components/video/VideoPlayerShowInfo.jsx";
import Episodes from "../../components/video/VideoPlayerEpisodes.jsx";
import UpNext from "../../components/video/VideoPlayerUpNext.jsx";
import showsData from "../../data/Shows.json";

const getPosterUrl = (id, device = "desktop") => {
  if (!id) return "";
  const ext = device === "mobile" ? "jpeg" : "jpg";
  return `/media/posters-${device}/${id}-poster-${device}.${ext}`;
};

function VideoPlayerPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const allShows = showsData.allShows || [];
  const currentShow = allShows.find((show) => show.id === id);

  const defaultPoster = "/media/posters-desktop/default-poster.jpg";

  if (!currentShow) {
    return <div className="text-white p-4">Video not found</div>;
  }

  const posterDesktop =
    currentShow.thumbnail && String(currentShow.thumbnail).startsWith("/media")
      ? currentShow.thumbnail
      : getPosterUrl(currentShow.id, "desktop");

  const posterMobile =
    currentShow.thumbnailMobile &&
    String(currentShow.thumbnailMobile).startsWith("/media")
      ? currentShow.thumbnailMobile
      : getPosterUrl(currentShow.id, "mobile");

  const allEpisodes = (currentShow.seasons || []).flatMap(
    (s) => s.episodes ?? [],
  );

  const stateEpisodeId = location.state?.startEpisode?.episodeId ?? null;
  const epParam =
    searchParams.get("ep") ||
    stateEpisodeId ||
    (allEpisodes[0] && allEpisodes[0].episodeId);

  const currentEpisodeIndex = allEpisodes.findIndex(
    (ep) => ep.episodeId === epParam,
  );
  const currentEpisode =
    currentEpisodeIndex >= 0
      ? allEpisodes[currentEpisodeIndex]
      : allEpisodes[0];

  const goToNextEpisode = () => {
    if (!allEpisodes.length) return;
    const nextIndex = (currentEpisodeIndex + 1) % allEpisodes.length;
    setSearchParams({ ep: allEpisodes[nextIndex].episodeId });
  };

  const goToPreviousEpisode = () => {
    if (!allEpisodes.length) return;
    const prevIndex =
      (currentEpisodeIndex - 1 + allEpisodes.length) % allEpisodes.length;
    setSearchParams({ ep: allEpisodes[prevIndex].episodeId });
  };

  const selectEpisode = (episodeId) => {
    if (!episodeId) return;
    setSearchParams({ ep: episodeId });
  };

  const bgUrl = "/media/extras/bullseye-gradient.svg";

  return (
    <div className="min-h-screen flex flex-col bg-[#0F0A24] text-white">
      <Header />

      <main className="flex-1 relative">
        {/* 🌌 Background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('${bgUrl}')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            opacity: 0.25,
          }}
        />

        {/* 📦 Content Wrapper */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentEpisode?.episodeId ?? `${currentShow.id}-ep`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {/* 🎬 Player */}
              <VideoPlayer
                currentShow={currentShow}
                startEpisode={currentEpisode}
                goToNextEpisode={goToNextEpisode}
                goToPreviousEpisode={goToPreviousEpisode}
              />

              {/* 📄 Show Info */}
              <ShowInfo
                currentShow={currentShow}
                currentEpisode={currentEpisode}
              />

              {/* 📺 Episodes */}
              <section className="px-4 sm:px-6 md:px-8 lg:px-12 mb-6">
                <Episodes
                  seasons={currentShow.seasons}
                  currentShowId={currentShow.id}
                  onSelectEpisode={selectEpisode}
                  posterDesktop={posterDesktop}
                  defaultPoster={defaultPoster}
                />
              </section>

              {/* 🔥 Up Next */}
              <section className="px-4 sm:px-6 md:px-8 lg:px-12 mb-10">
                <UpNext
                  allShows={allShows}
                  currentIndex={allShows.findIndex((s) => s.id === id)}
                />
              </section>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default VideoPlayerPage;
