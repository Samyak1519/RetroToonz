import { useEffect, useRef, useState } from "react";
import {
  FaBackward,
  FaCompress,
  FaExpand,
  FaForward,
  FaPause,
  FaPlay,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";

import { FaArrowLeft } from "react-icons/fa";

import { RiForward10Line, RiReplay10Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

/**
 * VideoPlayer
 * - Video is placed in a responsive aspect container (mobile 3:4, sm+ 16:9)
 * - All controls are absolutely positioned OVER the video (top/center/bottom)
 * - Controls auto-hide after a short delay. Clicking the video toggles them.
 */
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

  const [showControls, setShowControls] = useState(true);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const clearControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = null;
    }
  };

  const resetControlsTimer = () => {
    setShowControls(true);
    clearControlsTimeout();
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
      controlsTimeoutRef.current = null;
    }, 3000);
  };

  // clicking the video toggles controls (but not when interacting with controls)
  const toggleControls = (e) => {
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

  const togglePlayPause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => { });
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
    resetControlsTimer();
  };

  const handleTimeUpdate = () => setCurrentTime(videoRef.current.currentTime || 0);
  const handleLoadedMetadata = () => setDuration(videoRef.current.duration || 0);

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) videoRef.current.currentTime = newTime;
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
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
    resetControlsTimer();
  };

  const toggleFullscreen = async (e) => {
    if (e) e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await container.requestFullscreen();
        // try lock orientation on supported browsers
        if (window.screen?.orientation?.lock) {
          window.screen.orientation.lock("landscape").catch(() => { });
        }
      }
    } catch (err) {
      console.warn("Fullscreen error", err);
    }
    resetControlsTimer();
  };

  const handleVideoEnd = () => goToNextShow();

  useEffect(() => {
    // play new video if possible, reset timers
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => setIsPlaying(false));
      v.volume = volume;
    }
    setShowControls(true);
    clearControlsTimeout();
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
      controlsTimeoutRef.current = null;
    }, 1500);

    return () => clearControlsTimeout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentShow]);

  useEffect(() => {
    const onFullChange = () => resetControlsTimer();
    document.addEventListener("fullscreenchange", onFullChange);
    return () => document.removeEventListener("fullscreenchange", onFullChange);
  }, []);

  return (
    <div ref={containerRef} className="w-full text-white">

      <div className="relative w-full aspect-[16/9] sm:aspect-[27/9] bg-black rounded-md overflow-hidden">
        <video
          ref={videoRef}
          src={currentShow?.videoUrl}
          className="absolute inset-0 w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleVideoEnd}
          autoPlay
          controls={false}
          onClick={toggleControls}
        />

        {/* OVERLAY CONTROLS (all absolute inside video area) */}
        {/* Top bar - REPLACED: Back button to show details page */}
        {showControls && (
          <div
            data-controls
            className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/70 to-transparent px-4 py-2 flex items-center"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                // navigate back to the show's details page
                if (currentShow?.id) {
                  navigate(`/show/${currentShow.id}`);
                } else {
                  navigate(-1);
                }
              }}
              className="p-3.5 ml-5 mt-2 rounded-full hover:bg-white/10 transition flex items-center gap-2"
              aria-label="Back to show"
            >
              <FaArrowLeft className="text-xl" />

            </button>
          </div>
        )}


        {/* Center controls */}
        {showControls && (
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (videoRef.current)
                    videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
                  resetControlsTimer();
                }}
                className="bg-black/60 p-3 rounded-full text-white"
                aria-label="Rewind 10s"
              >
                <RiReplay10Line size={20} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlayPause();
                }}
                className="bg-black/60 p-4 rounded-full text-white"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <FaPause size={22} /> : <FaPlay size={22} />}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (videoRef.current)
                    videoRef.current.currentTime = Math.min(
                      duration,
                      videoRef.current.currentTime + 10
                    );
                  resetControlsTimer();
                }}
                className="bg-black/60 p-3 rounded-full text-white"
                aria-label="Forward 10s"
              >
                <RiForward10Line size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Bottom bar (progress + actions) */}
        {showControls && (
          <div
            data-controls
            className="absolute left-0 right-0 bottom-0 z-30 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent"
          >
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={handleProgressChange}
              className="w-full accent-cyan-500 h-1 cursor-pointer"
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            />

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-sm">{formatTime(currentTime)}</div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPreviousShow();
                  }}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full flex items-center gap-2"
                >
                  <FaBackward /> <span className="hidden sm:inline">Previous</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextShow();
                  }}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full flex items-center gap-2"
                >
                  <span className="hidden sm:inline">Next</span> <FaForward />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute(e);
                      setShowVolumeSlider((p) => !p);
                    }}
                    className="p-1"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                  </button>

                  <div
                    className={`absolute -right-0 top-0 mt-8 transition-all ${showVolumeSlider ? "opacity-100 w-28" : "opacity-0 w-0 overflow-hidden"
                      }`}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-full accent-cyan-500"
                    />
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFullscreen(e);
                  }}
                  aria-label="Toggle fullscreen"
                >
                  {document.fullscreenElement ? <FaCompress /> : <FaExpand />}
                </button>

                <div className="text-sm">{formatTime(duration)}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const formatTime = (time = 0) => {
  const m = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

export default VideoPlayer;
