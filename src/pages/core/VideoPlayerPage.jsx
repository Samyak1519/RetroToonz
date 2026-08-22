import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

import ShowSection from "../../components/home/ShowSection.jsx";
import Footer from "../../components/layout/Footer.jsx";
import Header from "../../components/layout/Header.jsx";

import VideoPlayer from "../../components/video/VideoPlayer.jsx";
import Episodes from "../../components/video/VideoPlayerEpisodes.jsx";
import ShowInfo from "../../components/video/VideoPlayerShowInfo.jsx";

import showsData from "../../data/Shows.json";

function VideoPlayerPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const allShows = showsData.allShows || [];

  const currentShow = allShows.find((show) => show.id === id);

  if (!currentShow) {
    return <div className="p-4 text-white">Video not found</div>;
  }

  const allEpisodes = (currentShow.seasons || []).flatMap(
    (season) => season.episodes ?? [],
  );

  const stateEpisodeId = location.state?.startEpisode?.episodeId ?? null;

  const epParam =
    searchParams.get("ep") || stateEpisodeId || allEpisodes[0]?.episodeId;

  const currentEpisodeIndex = allEpisodes.findIndex(
    (episode) => episode.episodeId === epParam,
  );

  const currentEpisode =
    currentEpisodeIndex >= 0
      ? allEpisodes[currentEpisodeIndex]
      : allEpisodes[0];

  const currentShowIndex = allShows.findIndex((show) => show.id === id);

  const upcomingShows = [];

  if (allShows.length > 1 && currentShowIndex >= 0) {
    for (let i = 1; i <= Math.min(12, allShows.length - 1); i++) {
      upcomingShows.push(allShows[(currentShowIndex + i) % allShows.length]);
    }
  }

  const goToNextEpisode = () => {
    if (!allEpisodes.length) return;

    const nextIndex = (currentEpisodeIndex + 1) % allEpisodes.length;

    setSearchParams({
      ep: allEpisodes[nextIndex].episodeId,
    });
  };

  const goToPreviousEpisode = () => {
    if (!allEpisodes.length) return;

    const previousIndex =
      (currentEpisodeIndex - 1 + allEpisodes.length) % allEpisodes.length;

    setSearchParams({
      ep: allEpisodes[previousIndex].episodeId,
    });
  };

  const selectEpisode = (episodeId) => {
    if (!episodeId) return;

    setSearchParams({
      ep: episodeId,
    });
  };

  const bgUrl = "/media/extras/bullseye-gradient.svg";

  return (
    <div className="flex min-h-screen flex-col bg-[#0F0A24] text-white">
      <Header />

      <main className="relative flex-1">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url('${bgUrl}')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            opacity: 0.25,
          }}
        />

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentEpisode?.episodeId ?? `${currentShow.id}-ep`}
              initial={{
                opacity: 0,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.98,
              }}
              transition={{
                duration: 0.28,
                ease: "easeOut",
              }}
            >
              <VideoPlayer
                currentShow={currentShow}
                startEpisode={currentEpisode}
                goToNextEpisode={goToNextEpisode}
                goToPreviousEpisode={goToPreviousEpisode}
              />

              <ShowInfo
                currentShow={currentShow}
                currentEpisode={currentEpisode}
              />

              <section className="mb-6 px-4 sm:px-6 md:px-8 lg:px-12">
                <Episodes
                  seasons={currentShow.seasons}
                  showBackdrop={currentShow.backdrop}
                  activeEpisodeId={currentEpisode?.episodeId}
                  onSelectEpisode={selectEpisode}
                />
              </section>

              {upcomingShows.length > 0 && (
                <ShowSection
                  sectionTitle="Up Next"
                  shows={upcomingShows}
                  sectionKey="up-next"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default VideoPlayerPage;
