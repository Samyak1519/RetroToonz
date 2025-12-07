import { FaRandom } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import showsData from "../Data/Shows.json";

function RandomPlayButton() {
  const navigate = useNavigate();

  function pickRandomEpisode(allShows) {
    const pool = [];
    allShows.forEach((show) => {
      (show.seasons || []).forEach((season) => {
        (season.episodes || []).forEach((ep) => {
          if (ep.isPlayable !== false) {
            pool.push({
              ...ep,
              showId: show.id,
              showTitle: show.title,
              seasonNumber: season.seasonNumber,
            });
          }
        });
      });
    });
    if (pool.length === 0) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  const handlePlay = () => {
    const allShows = showsData.allShows || showsData;
    const episode = pickRandomEpisode(allShows);
    if (!episode) {
      alert("No playable episode found.");
      return;
    }
    // Navigate to VideoPlayerPage with episode info in state
    navigate(`/watch/${episode.showId}`, { state: { startEpisode: episode } });
  };

  return (
    <button
      onClick={handlePlay}
      className="fixed mr-5 mb-2 bottom-10 right-6 z-50 group 
        bg-gradient-to-r from-cyan-500 to-blue-600
        hover:from-blue-600 hover:to-cyan-500
        text-white border-none shadow-xl
        px-6 py-4 rounded-full flex items-center gap-2 
        animate-bounce hover:animate-none transition-all duration-300"
      title="Play a random cartoon"
    >
      <span className="absolute inline-flex h-14 w-14 rounded-full bg-cyan-400 opacity-30 group-hover:animate-ping -z-10"></span>
      <FaRandom className="text-xl animate-spin-slow" />
      <span className="font-semibold hidden sm:block">Surprise Me!</span>
    </button>
  );
}

export default RandomPlayButton;
