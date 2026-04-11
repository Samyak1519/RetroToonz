// src/pages/VideoPlayerPage.jsx
import { AnimatePresence, motion } from "framer-motion";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
<<<<<<< HEAD
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import VideoPlayer from "../../components/video/VideoPlayer";
import Episodes from "../../components/video/VideoPlayerEpisodes";
import ShowInfo from "../../components/video/VideoPlayerShowInfo";
import UpNext from "../../components/video/VideoPlayerUpNext";
import showsData from "../../Data/Shows.json";
=======
import Footer from "../../components/layout/Footer.jsx";
import Header from "../../components/layout/Header.jsx";
import VideoPlayer from "../../components/video/VideoPlayer.jsx";
import Episodes from "../../components/video/VideoPlayer.jsx";
import ShowInfo from "../../components/video/VideoPlayer.jsx";
import UpNext from "../../components/video/VideoPlayer.jsx";
import showsData from "../../data/Shows.json";
>>>>>>> e43d0ba959f5b4f67fdbad3036be0fbc2f7bda64

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
    // flex column layout ensures footer is bottom when main is short
    <div className="min-h-screen flex flex-col bg-[#0F0A24] text-white">
      <Header />

      {/* main area expands and scrolls when needed; background sits inside main so it fills between header and footer */}
      <main className="flex-1 relative overflow-auto">
        {/* gradient background that fills the main area only */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('${bgUrl}')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            opacity: 0.3,
          }}
        />

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentEpisode?.episodeId ?? `${currentShow.id}-ep`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="w-full"
            >
              <VideoPlayer
                currentShow={currentShow}
                startEpisode={currentEpisode}
                goToNextEpisode={goToNextEpisode}
                goToPreviousEpisode={goToPreviousEpisode}
              />

              <ShowInfo
                currentShow={currentShow}
                startEpisode={currentEpisode}
                currentEpisode={currentEpisode}
              />

              <div className="px-4 sm:px-8 md:px-12 mb-5">
                <Episodes
                  seasons={currentShow.seasons}
                  currentShowId={currentShow.id}
                  onSelectEpisode={selectEpisode}
                  posterDesktop={posterDesktop}
                  defaultPoster={defaultPoster}
                />
              </div>

              <div className="px-4 sm:px-8 md:px-12 mb-8">
                <UpNext
                  allShows={allShows}
                  currentIndex={allShows.findIndex((s) => s.id === id)}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* footer sits at bottom of page when main is short, or after content when main scrolls */}
      <Footer />
    </div>
  );
}

export default VideoPlayerPage;
