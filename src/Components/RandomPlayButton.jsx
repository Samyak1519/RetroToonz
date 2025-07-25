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
      navigate(`/watch/${slug}`);
    }
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
      {/* Ping ring */}
      <span className="absolute inline-flex h-14 w-14 rounded-full bg-cyan-400 opacity-30 group-hover:animate-ping -z-10"></span>

      <FaRandom className="text-xl animate-spin-slow" />
      <span className="font-semibold hidden sm:block">Surprise Me!</span>
    </button>
  );
}

export default RandomPlayButton;
