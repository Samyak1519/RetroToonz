import { useEffect, useRef, useState } from "react";
import {
  FaCompress,
  FaExpand,
  FaPause,
  FaPlay,
  FaRedo,
  FaStepBackward,
  FaStepForward,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const formatTime = (seconds) => {
  if (isNaN(seconds)) return "00:00";
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

const VideoPlayer = ({ src, poster, title, showId, nextId }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isBuffering, setIsBuffering] = useState(true);
  const [hasEnded, setHasEnded] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const hideTimeout = useRef(null);
  const countdownInterval = useRef(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const skipTime = (sec) => {
    if (videoRef.current) {
      videoRef.current.currentTime += sec;
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolume = (e) => {
    const vol = parseFloat(e.target.value);
    videoRef.current.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const resetHideTimer = () => {
    setShowControls(true);
    clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => setShowControls(false), 3000);
  };

  // ⌨️ Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === "ArrowRight") skipTime(10);
      if (e.key === "ArrowLeft") skipTime(-10);
      if (e.key.toLowerCase() === "m") toggleMute();
      if (e.key.toLowerCase() === "f") toggleFullscreen();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMuted, isFullscreen]);

  // Resume playback from last position
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const saved = localStorage.getItem(`progress-${showId}`);
    if (saved) {
      video.currentTime = parseFloat(saved);
    }

    const updateProgress = () => {
      setCurrentTime(video.currentTime);
      localStorage.setItem(`progress-${showId}`, video.currentTime);
    };

    const onLoadedMetadata = () => {
      setDuration(video.duration);
      setIsBuffering(false);
    };

    const onWaiting = () => setIsBuffering(true);
    const onPlaying = () => setIsBuffering(false);

    const onEnded = () => {
      setHasEnded(true);
      countdownInterval.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval.current);
            navigate(`/watch/${nextId}`);
          }
          return prev - 1;
        });
      }, 1000);
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("ended", onEnded);
      clearInterval(countdownInterval.current);
    };
  }, [showId, nextId]);

  // Auto-hide controls
  useEffect(() => {
    resetHideTimer();
    const handleMouseMove = () => resetHideTimer();
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(hideTimeout.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full max-w-6xl aspect-video mx-auto overflow-hidden bg-black rounded-lg shadow-xl"
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="auto"
        className="w-full h-full object-cover"
        onClick={togglePlay}
        autoPlay
      />

      {/* Loader */}
      {isBuffering && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-xl z-40">
          Loading...
        </div>
      )}

      {/* Controls */}
      {!hasEnded && (
        <div
          className={`absolute inset-0 bg-black/70 text-white flex flex-col justify-between transition-opacity duration-500 ${
            showControls ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Title */}
          <div className="absolute top-4 left-0 right-0 text-center z-20">
            <h2 className="text-lg sm:text-xl font-bold">
              Now Playing: {title}
            </h2>
          </div>

          {/* Center Controls */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-6 z-20">
            <button onClick={() => skipTime(-10)} className="text-3xl">
              <FaStepBackward />
            </button>
            <button
              onClick={togglePlay}
              className="bg-white text-black p-4 rounded-full text-2xl"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={() => skipTime(10)} className="text-3xl">
              <FaStepForward />
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-4 left-0 right-0 px-6 flex flex-col gap-3 z-20">
            {/* Time */}
            <div className="flex justify-between text-sm text-gray-300">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Progress */}
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-white appearance-none"
            />

            {/* Volume + Fullscreen */}
            <div className="flex items-center justify-between text-xl pt-1">
              <div className="flex items-center gap-3">
                <button onClick={toggleMute}>
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolume}
                  className="w-24 h-1"
                />
              </div>
              <button onClick={toggleFullscreen}>
                {isFullscreen ? <FaCompress /> : <FaExpand />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* End Screen */}
      {hasEnded && (
        <div className="absolute inset-0 bg-black/90 text-white flex flex-col items-center justify-center gap-4 text-center z-50">
          <h2 className="text-2xl font-bold">
            Next episode in {countdown} seconds...
          </h2>
          <div className="flex gap-4 text-xl">
            <button
              onClick={() => {
                videoRef.current.currentTime = 0;
                setHasEnded(false);
                videoRef.current.play();
                setIsPlaying(true);
              }}
              className="bg-white text-black px-4 py-2 rounded shadow"
            >
              <FaRedo className="inline mr-2" /> Replay
            </button>
            <button
              onClick={() => navigate(`/watch/${nextId}`)}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white shadow"
            >
              Next Episode →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
