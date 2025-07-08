import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRandom } from "react-icons/fa";

function RandomPlayButton({ shows }) {
  const navigate = useNavigate();
  const [randomShow, setRandomShow] = useState(null);

  useEffect(() => {
    if (shows?.length) {
      const index = Math.floor(Math.random() * shows.length);
      setRandomShow(shows[index]);
    }
  }, [shows]);

  const handlePlay = () => {
    if (randomShow) {
      const slug = randomShow.title.toLowerCase().replace(/\s+/g, "-");
      navigate(`/show/${slug}`);
    }
  };

  return (
    <button
      onClick={handlePlay}
      className="fixed bottom-10 right-6 z-50 group
        bg-white text-cyan-600 hover:text-white hover:bg-cyan-600
        border border-cyan-500 
        p-4 rounded-full shadow-2xl overflow-hidden"
      title="Play Random Show"
    >
      {/* Ring ping effect */}
      <span className="absolute inline-flex h-12 w-12 rounded-full bg-cyan-400 opacity-20 group-hover:animate-ping"></span>
      <FaRandom className="relative z-10 text-xl" />
    </button>
  );
}

export default RandomPlayButton;
