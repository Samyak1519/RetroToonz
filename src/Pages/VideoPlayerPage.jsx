import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import VideoPlayer from "../Components/VideoPlayer";
import showsData from "../Data/Shows.json";

const VideoPlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const show = showsData.allShows.find((s) => s.id === id);

  if (!show) return <p className="text-white p-4">Video not found.</p>;

  return (
    <div className="fixed inset-0 bg-space-galaxy text-white z-50 overflow-hidden">
      {/* Optional: Back Button */}

      {/* <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-white bg-black/60 hover:bg-black/80 p-2 rounded-full z-50"
        title="Back"
      >
        ← Back
      </button> */}
      {/* ✅ Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-black/70 hover:bg-black/90 p-2 rounded-full text-white text-xl sm:text-2xl z-20 transition"
      >
        <FaArrowLeft />
      </button>

      <VideoPlayer
        src={show.videoUrl}
        poster={`/Assets/${show.thumbnail}`}
        title={show.title}
      />
    </div>
  );
};

export default VideoPlayerPage;
