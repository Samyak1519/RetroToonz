import { useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaPause,
  FaPlay,
  FaBackward,
  FaExpand,
  FaForward,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const VideoPlayer = ({ currentShow, goToNextShow, goToPreviousShow }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ fixed ESLint issue

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
    resetControlsTimer();
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    resetControlsTimer();
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
    resetControlsTimer();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    resetControlsTimer();
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container
        .requestFullscreen()
        .catch((err) => console.error("Fullscreen error:", err));
    }
    resetControlsTimer();
  };

  const handleVideoEnd = () => {
    goToNextShow();
  };

  const resetControlsTimer = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleOverlayClick = () => {
    resetControlsTimer();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => setIsPlaying(false));
      video.volume = volume;
    }
    resetControlsTimer();
  }, [currentShow]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black"
      onMouseMove={resetControlsTimer}
      onClick={handleOverlayClick}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={currentShow?.videoUrl}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleVideoEnd}
        autoPlay
        controls={false}
      />

      {/* Top Bar */}
      {showControls && (
        <div className="absolute top-0 left-0 w-full flex items-center p-4 text-white z-10 bg-gradient-to-b from-black via-transparent">
          
          <button
            onClick={() => navigate("/")}
            className="text-white text-xl cursor-pointer"
          >
            <FaArrowLeft />
          </button>

          <div className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold text-center px-2">
            {currentShow?.title}
          </div>
        </div>
      )}

      {/* Center Controls */}
      {showControls && (
        <div className="absolute inset-0 flex items-center justify-center space-x-6 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPreviousShow();
            }}
            className="bg-black bg-opacity-60 p-3 rounded-full text-white"
          >
            <FaBackward size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlayPause();
            }}
            className="bg-black bg-opacity-60 p-4 rounded-full text-white"
          >
            {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNextShow();
            }}
            className="bg-black bg-opacity-60 p-3 rounded-full text-white"
          >
            <FaForward size={20} />
          </button>
        </div>
      )}

      {/* Bottom Controls */}
      {showControls && (
        <div className="absolute bottom-0 left-0 w-full p-5 z-10 text-white bg-gradient-to-t from-black via-transparent px-10">
          {/* Time & Progress Bar */}
          <div className="flex items-center justify-between text-s mb-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            step="0.1"
            onChange={handleProgressChange}
            className="w-full accent-red-600"
          />

          {/* Volume & Fullscreen */}
          <div className="flex justify-between items-center mt-2 text-sm">
            <div className="flex items-center gap-2">
              <button onClick={toggleMute}>
                {isMuted || volume === 0 ? (
                  <FaVolumeMute size={18} />
                ) : (
                  <FaVolumeUp size={18} />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-24 accent-red-600"
              />
            </div>

            <button onClick={toggleFullscreen}>
              <FaExpand size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function
const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export default VideoPlayer;
