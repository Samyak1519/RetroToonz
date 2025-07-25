import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VideoPlayer from "../Components/VideoPlayer";
import showsData from "../Data/Shows.json";

function VideoPlayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();

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
    <VideoPlayer
      currentShow={currentShow}
      goToNextShow={goToNextShow}
      goToPreviousShow={goToPreviousShow}
    />
  );
}

export default VideoPlayerPage;
