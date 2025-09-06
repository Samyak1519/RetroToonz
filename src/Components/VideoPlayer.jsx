// src/Components/VideoPlayer.jsx
import { useEffect, useRef, useState } from "react";
import {
  FaBackward,
  FaCompress,
  FaExpand,
  FaForward,
  FaPause,
  FaPlay,
  FaTimes,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";
import { RiForward10Line, RiReplay10Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const VideoPlayer = ({ currentShow, goToNextShow, goToPreviousShow }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Controls visibility state
  const [showControls, setShowControls] = useState(true);
  // Volume slider visibility state
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Helper to clear timeout
  const clearControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = null;
    }
  };

  // Auto-hide timer (3s)
  const resetControlsTimer = () => {
    setShowControls(true);
    clearControlsTimeout();
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
      controlsTimeoutRef.current = null;
    }, 3000);
  };

  // Toggle controls (used on tap/click)
  const toggleControls = (e) => {
    // prevent toggling when clicking inside controls
    const clickedInsideControls = e?.target?.closest?.("[data-controls]") ?? false;
    if (clickedInsideControls) return;

    setShowControls((s) => {
      const next = !s;
      clearControlsTimeout();
      if (next) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
          controlsTimeoutRef.current = null;
        }, 3000);
      }
      return next;
    });
  };

  // Mouse move handler (desktop): show controls and reset timer
  const handleMouseMove = () => {
    resetControlsTimer();
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
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
    if (videoRef.current) videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
    resetControlsTimer();
  };

  const toggleMute = (e) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    resetControlsTimer();
  };

  const toggleFullscreen = async (e) => {
    if (e) e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      try {
        await container.requestFullscreen();
        if (
          typeof window !== "undefined" &&
          window.screen.orientation &&
          window.screen.orientation.lock
        ) {
          await window.screen.orientation.lock("landscape").catch((err) =>
            console.warn("Orientation lock failed:", err)
          );
        }
      } catch (err) {
        console.error("Fullscreen error:", err);
      }
    }
    resetControlsTimer();
  };

  const handleFullscreenChange = () => {
    resetControlsTimer();
  };

  const handleVideoEnd = () => {
    goToNextShow();
  };

  // overlay click handler: used to avoid hiding/showing when interacting with controls
  const handleOverlayClick = (e) => {
    toggleControls(e);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => setIsPlaying(false));
      video.volume = volume;
    }
    // show controls briefly on new video then auto-hide
    setShowControls(true);
    clearControlsTimeout();
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
      controlsTimeoutRef.current = null;
    }, 1500);

    return () => {
      clearControlsTimeout();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentShow]);

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      clearControlsTimeout();
    };
  }, []);

  // small helper to respect reduced motion preference (optional)
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Motion variants for top/bottom bars (subtle)
  const topBarVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: { opacity: 1, y: 0 },
  };
  const bottomBarVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black"
      onMouseMove={handleMouseMove}
      onClick={handleOverlayClick}
      onTouchStart={(e) => {
        // prevent default to avoid delayed click on some mobile browsers
        e.preventDefault();
        toggleControls(e);
      }}
    >
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
      <AnimatePresence initial={false}>
        {showControls && (
          <motion.div
            data-controls
            key="topbar"
            initial={prefersReducedMotion ? "visible" : "hidden"}
            animate="visible"
            exit={prefersReducedMotion ? "visible" : "hidden"}
            variants={prefersReducedMotion ? {} : topBarVariants}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            className="fixed top-0 w-full z-50 bg-gradient-to-r from-black/70 to-gray-700/30 backdrop-blur-md text-white"
          >
            <div className="flex items-center justify-end px-5 py-2.5 md:px-6 md:py-2 relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-center px-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-[70%]">
                {currentShow?.title}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/");
                }}
                className="text-white text-xl z-10 rounded-full p-2 hover:bg-gray-700 transition"
              >
                <FaTimes />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center Controls */}
      {showControls && (
        <div
          data-controls
          className="absolute inset-0 flex items-center justify-center space-x-7 z-10 pointer-events-none"
        >
          <div className="pointer-events-auto flex items-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (videoRef.current) {
                  videoRef.current.currentTime = Math.max(
                    0,
                    videoRef.current.currentTime - 10
                  );
                }
                resetControlsTimer();
              }}
              className="bg-black bg-opacity-60 p-3 rounded-full text-white"
            >
              <RiReplay10Line size={20} />
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
                if (videoRef.current) {
                  videoRef.current.currentTime = Math.min(
                    duration,
                    videoRef.current.currentTime + 10
                  );
                }
                resetControlsTimer();
              }}
              className="bg-black bg-opacity-60 p-3 rounded-full text-white"
            >
              <RiForward10Line size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Controls */}
      <AnimatePresence initial={false}>
        {showControls && (
          <motion.div
            data-controls
            key="bottombar"
            initial={prefersReducedMotion ? "visible" : "hidden"}
            animate="visible"
            exit={prefersReducedMotion ? "visible" : "hidden"}
            variants={prefersReducedMotion ? {} : bottomBarVariants}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            className="fixed bottom-0 left-0 w-full z-50 px-7 py-4 md:py-3 md:px-5 bg-gradient-to-t from-black/70 to-gray-700/30 backdrop-blur-md text-white"
          >
            <div className="flex items-center justify-between text-sm my-0.5">
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
              className="w-full accent-cyan-500 h-1 cursor-pointer mb-3"
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            />

            <div className="flex justify-between items-center mt-1 gap-5 text-sm">
              {/* Prev / Next */}
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPreviousShow();
                  }}
                  className="flex items-center gap-2 px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
                >
                  <FaBackward size={14} />
                  <span className="text-sm font-medium">Previous</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextShow();
                  }}
                  className="flex items-center gap-2 px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
                >
                  <span className="text-sm font-medium">Next</span>
                  <FaForward size={14} />
                </button>
              </div>

              {/* Volume + Fullscreen */}
              <div className="flex items-center gap-5">
                <div className="relative flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute(e);
                      setShowVolumeSlider((prev) => !prev);
                    }}
                  >
                    {isMuted || volume === 0 ? (
                      <FaVolumeMute size={18} />
                    ) : (
                      <FaVolumeUp size={18} />
                    )}
                  </button>

                  <div
                    className={`absolute right-8 transition-all duration-300 overflow-hidden ${showVolumeSlider ? "w-24 opacity-100" : "w-0 opacity-0"
                      }`}
                  >
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="ml-2 w-full accent-red-600 h-1 cursor-pointer"
                      onMouseDown={(e) => e.stopPropagation()}
                      onTouchStart={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFullscreen(e);
                  }}
                >
                  {document.fullscreenElement ? (
                    <FaCompress size={18} />
                  ) : (
                    <FaExpand size={18} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

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
