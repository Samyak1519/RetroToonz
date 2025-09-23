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
  FaCog,
  FaArrowLeft,
} from "react-icons/fa";
import { RiForward10Line, RiReplay10Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

/**
 * VideoPlayer (JavaScript + React)
 * - settings dropdown now shows a main list (Playback Speed / Quality)
 *   and drills down to the chosen submenu with a Back option.
 * - progress bar shows buffered ranges/played portion via gradient
 * - reduced top spacing for back/settings on mobile
 *
 * Notes:
 * - currentShow.qualities (optional) should be an array:
 *   [{ label: "1080p", url: "..." }, { label: "720p", url: "..." }, ...]
 */

const DEFAULT_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

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
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Settings dropdown + drilldown view
  const [showSettings, setShowSettings] = useState(false);
  const [settingsView, setSettingsView] = useState("main"); // "main" | "speed" | "quality"
  const [speedOptions] = useState(DEFAULT_SPEEDS);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Qualities: fallback to Auto if none provided
  const [qualities, setQualities] = useState(
    currentShow?.qualities ?? [{ label: "Auto", url: currentShow?.videoUrl }]
  );
  const [selectedQuality, setSelectedQuality] = useState(qualities[0]?.label ?? "Auto");

  // progress styling (gradient)
  const [progressBackground, setProgressBackground] = useState("");

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
      setShowSettings(false);
      setShowVolumeSlider(false);
      setSettingsView("main");
    }, 3000);
  };

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

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime || 0);
    updateProgressBackground();
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 0);
    updateProgressBackground();
  };

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

  // Update qualities when currentShow changes
  useEffect(() => {
    const q = currentShow?.qualities ?? [{ label: "Auto", url: currentShow?.videoUrl }];
    setQualities(q);
    setSelectedQuality(q[0]?.label ?? "Auto");
    // set video source to selected quality (first)
    const v = videoRef.current;
    if (v && q[0]?.url) {
      v.src = q[0].url;
      setTimeout(() => {
        v.play().catch(() => setIsPlaying(false));
      }, 50);
    }
    // reset UI state
    setCurrentTime(0);
    setDuration(0);
    setShowControls(true);
    clearControlsTimeout();
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
      controlsTimeoutRef.current = null;
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentShow]);

  useEffect(() => {
    const onFullChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      resetControlsTimer();
    };
    document.addEventListener("fullscreenchange", onFullChange);
    return () => document.removeEventListener("fullscreenchange", onFullChange);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (!containerRef.current) return;
      if (e.code === "Space") {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.max(0, (videoRef.current.currentTime || 0) - 10);
          setCurrentTime(videoRef.current.currentTime);
        }
        resetControlsTimer();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.min(
            duration || Infinity,
            (videoRef.current.currentTime || 0) + 10
          );
          setCurrentTime(videoRef.current.currentTime);
        }
        resetControlsTimer();
      } else if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key.toLowerCase() === "m") {
        e.preventDefault();
        toggleMute();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [duration]);

  // apply playback speed to the video element when changed
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  // When selectedQuality changes, switch video.src and try to preserve currentTime
  const changeQuality = (label) => {
    const q = qualities.find((x) => x.label === label);
    if (!q || !videoRef.current) {
      setSelectedQuality(label);
      return;
    }
    const v = videoRef.current;
    const time = v.currentTime || 0;
    const wasPlaying = !v.paused;
    v.pause();
    v.src = q.url;
    setSelectedQuality(q.label);
    // reload & seek to previous time (best-effort)
    v.load();
    v.currentTime = Math.min(time, q.url ? Infinity : time);
    if (wasPlaying) {
      v.play().catch(() => setIsPlaying(false));
    }
    resetControlsTimer();
  };

  // Build progress gradient string: played portion (accent), buffered portion (muted), remainder (dark)
  const updateProgressBackground = () => {
    const v = videoRef.current;
    if (!v || !duration || duration === 0) {
      setProgressBackground("");
      return;
    }
    const playedPct = Math.min(100, (v.currentTime / duration) * 100);
    // compute buffered end (furthest buffered range)
    let bufferedEnd = 0;
    try {
      for (let i = 0; i < v.buffered.length; i++) {
        bufferedEnd = Math.max(bufferedEnd, v.buffered.end(i));
      }
    } catch (err) {
      bufferedEnd = 0;
    }
    const bufferedPct = Math.min(100, (bufferedEnd / duration) * 100);

    // gradient: played (cyan) -> buffered (gray) -> remainder (semi-transparent dark)
    const accent = "rgba(34,211,238,1)"; // cyan-like
    const bufferedColor = "rgba(255,255,255,0.2)";
    const remainder = "rgba(255,255,255,0.06)";

    // ensure ordering: played <= buffered
    const played = Math.max(0, Math.min(playedPct, bufferedPct));
    const buffered = Math.max(playedPct, bufferedPct);

    const gradient = `linear-gradient(90deg, ${accent} 0% ${played}%, ${bufferedColor} ${played}% ${buffered}%, ${remainder} ${buffered}% 100%)`;
    setProgressBackground(gradient);
  };

  useEffect(() => {
    const ticker = setInterval(() => {
      updateProgressBackground();
    }, 250);
    return () => clearInterval(ticker);
  }, [duration, currentTime]);

  useEffect(() => {
    updateProgressBackground();
  }, [duration]);

  return (
    <div ref={containerRef} className="w-full text-white">
      <div
        className={`relative w-full bg-black rounded-md overflow-hidden ${isFullscreen ? "h-screen" : "aspect-[16/9] sm:aspect-[27/9]"
          }`}
      >
        <video
          ref={videoRef}
          src={qualities && qualities[0] ? qualities[0].url : currentShow?.videoUrl}
          className="absolute inset-0 w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleVideoEnd}
          autoPlay
          controls={false}
          onClick={toggleControls}
        />

        {/* TOP BAR */}
        {showControls && (
          <div
            data-controls
            className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/70 to-transparent px-4 py-2 flex items-center justify-between"
          >
            <div className="flex items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (currentShow?.id) {
                    navigate(`/show/${currentShow.id}`);
                  } else {
                    navigate(-1);
                  }
                }}
                className="p-2 sm:p-3.5 ml-2 sm:ml-3 rounded-full hover:bg-white/10 transition flex items-center gap-2"
                aria-label="Back to show"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <FaArrowLeft className="text-lg sm:text-xl" />
              </button>
            </div>

            {/* Settings icon: reduced padding on mobile */}
            <div className="flex items-center relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSettings((s) => {
                    const next = !s;
                    if (next) setSettingsView("main");
                    return next;
                  });
                  resetControlsTimer();
                }}
                className="p-2 sm:p-3.5 mr-2 sm:mr-3 rounded-full hover:bg-white/10 transition"
                aria-label="Settings"
                title="Settings"
              >
                <FaCog className="text-lg sm:text-xl" />
              </button>

              {/* Settings dropdown (MAIN + drilldowns) */}
              {showSettings && (
                <div
                  data-controls
                  className="absolute right-0 mt-12 sm:mt-14 mr-2 w-48 bg-black/90 border border-white/10 rounded-md p-2 z-50"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  {/* MAIN LIST */}
                  {settingsView === "main" && (
                    <div className="flex flex-col gap-1 p-1">
                      <button
                        className="text-left px-3 py-2 rounded text-sm bg-white/5 hover:bg-white/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSettingsView("speed");
                          resetControlsTimer();
                        }}
                      >
                        Playback Speed
                      </button>

                      <button
                        className="text-left px-3 py-2 rounded text-sm bg-white/5 hover:bg-white/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSettingsView("quality");
                          resetControlsTimer();
                        }}
                      >
                        Quality
                      </button>
                    </div>
                  )}

                  {/* SPEED SUBMENU - HORIZONTAL */}
                  {settingsView === "speed" && (
                    <div className="p-1">
                      <div className="flex items-center justify-between mb-2">
                        <button
                          className="text-sm text-white/60 px-2 py-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSettingsView("main");
                            resetControlsTimer();
                          }}
                        >
                          ← Back
                        </button>
                        <div className="text-xs text-white/80">Speed</div>
                        <div style={{ width: 40 }} />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {speedOptions.map((s) => (
                          <button
                            key={s}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPlaybackSpeed(s);
                              resetControlsTimer();
                            }}
                            className={`px-2 py-1 rounded text-sm ${playbackSpeed === s ? "bg-white/20" : "bg-white/5"
                              }`}
                          >
                            {s}x
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* QUALITY SUBMENU */}
                  {settingsView === "quality" && (
                    <div className="p-1">
                      <div className="flex items-center justify-between mb-2">
                        <button
                          className="text-sm text-white/60 px-2 py-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSettingsView("main");
                            resetControlsTimer();
                          }}
                        >
                          ← Back
                        </button>
                        <div className="text-xs text-white/80">Quality</div>
                        <div style={{ width: 40 }} />
                      </div>

                      <div className="flex flex-col gap-1">
                        {qualities.map((q) => (
                          <button
                            key={q.label}
                            onClick={(e) => {
                              e.stopPropagation();
                              changeQuality(q.label);
                              resetControlsTimer();
                            }}
                            className={`text-left px-3 py-2 rounded text-sm ${selectedQuality === q.label ? "bg-white/10" : "bg-white/5"
                              }`}
                          >
                            {q.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* CENTER CONTROLS */}
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
                    videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10);
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

        {/* BOTTOM BAR: progress + actions */}
        {showControls && (
          <div
            data-controls
            className="absolute left-0 right-0 bottom-0 z-30 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent"
          >
            {/* Progress row: current time - progress - duration (inline) */}
            <div className="flex items-center gap-3">
              <div className="text-sm w-12 text-left">{formatTime(currentTime)}</div>

              {/* Range input with dynamic gradient background showing played + buffered */}
              <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={currentTime}
                onChange={handleProgressChange}
                className="flex-1 h-1 cursor-pointer appearance-none"
                style={{
                  background: progressBackground || undefined,
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
              />

              <div className="text-sm w-12 text-right">{formatTime(duration)}</div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPreviousShow();
                  }}
                  className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded-full flex items-center gap-1 text-xs"
                  aria-label="Previous show"
                >
                  <FaBackward size={14} /> <span className="hidden sm:inline">Previous</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextShow();
                  }}
                  className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded-full flex items-center gap-1 text-xs"
                  aria-label="Next show"
                >
                  <span className="hidden sm:inline">Next</span> <FaForward size={14} />
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
                    aria-label={isMuted ? "Unmute" : "Mute"}
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
                  title="Toggle fullscreen (F)"
                >
                  {isFullscreen ? <FaCompress /> : <FaExpand />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function formatTime(time = 0) {
  if (!isFinite(time) || time <= 0) return "00:00";
  const h = Math.floor(time / 3600);
  const m = Math.floor((time % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
}

export default VideoPlayer;
