import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Header from "../Components/Header";
import VideoPlayer from "../Components/VideoPlayer";
import Episodes from "../Components/VideoPlayerEpisodes";
import ShowInfo from "../Components/VideoPlayerShowInfo";
import UpNext from "../Components/VideoPlayerUpNext";
import showsData from "../Data/Shows.json";

function VideoPlayerPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const allShows = showsData.allShows;
  const currentShow = allShows.find((show) => show.id === id);

  if (!currentShow) {
    return <div className="text-white p-4">Video not found</div>;
  }

  // flatten episodes for easy indexing
  const allEpisodes = currentShow.seasons.flatMap((s) => s.episodes ?? []);

  // support random episode passed via location.state (in case Random button sent it)
  const stateEpisodeId = location.state?.startEpisode?.episodeId ?? null;

  // prefer ?ep query param then location.state then default to first episode
  const epParam = searchParams.get("ep") || stateEpisodeId || (allEpisodes[0] && allEpisodes[0].episodeId);
  const currentEpisodeIndex = allEpisodes.findIndex((ep) => ep.episodeId === epParam);
  const currentEpisode = currentEpisodeIndex >= 0 ? allEpisodes[currentEpisodeIndex] : allEpisodes[0];

  // navigate by updating ?ep query param (keeps same show route)
  const goToNextEpisode = () => {
    if (!allEpisodes.length) return;
    const nextIndex = (currentEpisodeIndex + 1) % allEpisodes.length;
    setSearchParams({ ep: allEpisodes[nextIndex].episodeId });
  };

  const goToPreviousEpisode = () => {
    if (!allEpisodes.length) return;
    const prevIndex = (currentEpisodeIndex - 1 + allEpisodes.length) % allEpisodes.length;
    setSearchParams({ ep: allEpisodes[prevIndex].episodeId });
  };

  // helper to select episode (e.g., clicking from Episodes list)
  const selectEpisode = (episodeId) => {
    setSearchParams({ ep: episodeId });
  };

  // background artwork path (keeps UI like before)
  const bgUrl = "/media/extras/bullseye-gradient.svg";

  return (
    <div className="min-h-screen bg-[#0F0A24] text-white overflow-hidden">
      <Header />

      <div className="relative">
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

              <ShowInfo currentShow={currentShow} startEpisode={currentEpisode} />

              <div className="px-4 sm:px-8 md:px-12 mb-10">
                <Episodes
                  seasons={currentShow.seasons}
                  currentShowId={currentShow.id}
                  onSelectEpisode={selectEpisode} // make episodes clickable
                />
              </div>

              <div className="px-4 sm:px-8 md:px-12">
                <UpNext allShows={allShows} currentIndex={allShows.findIndex(s => s.id === id)} currentShow={currentShow} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayerPage;
