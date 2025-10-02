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

const DEFAULT_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const VideoPlayer = ({ currentShow, startEpisode, goToNextEpisode, goToPreviousEpisode }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // gesture helpers
  const tapTimeoutRef = useRef(null);
  const lastTapRef = useRef(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const startVolume = useRef(1);
  const startCurrentTime = useRef(0);

  const navigate = useNavigate();

  // playback state
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // UI state
  const [showControls, setShowControls] = useState(true);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // settings / quality
  const [showSettings, setShowSettings] = useState(false);
  const [settingsView, setSettingsView] = useState("main"); // "main" | "speed" | "quality"
  const [speedOptions] = useState(DEFAULT_SPEEDS);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [qualities, setQualities] = useState([]);
  const [selectedQuality, setSelectedQuality] = useState("Auto");

  // UX overlays / feedback
  const [progressBackground, setProgressBackground] = useState("");
  const [seekFeedback, setSeekFeedback] = useState(null); // "+10s", "-10s" or timestamp while dragging
  const [volumeFeedback, setVolumeFeedback] = useState(null);
  const [dragSeekTime, setDragSeekTime] = useState(null);

  const clearControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = null;
    }
  };

  const resetControlsTimer = (ms = 3000) => {
    setShowControls(true);
    clearControlsTimeout();
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
      controlsTimeoutRef.current = null;
      setShowSettings(false);
      setShowVolumeSlider(false);
      setSettingsView("main");
    }, ms);
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

  const handleVideoEnd = () => {
    if (typeof goToNextEpisode === "function") goToNextEpisode();
  };

  // Load episode/show qualities and source
  useEffect(() => {
    let sourceUrl = null;
    if (startEpisode) {
      if (startEpisode.qualities && startEpisode.qualities.length) {
        setQualities(startEpisode.qualities);
        setSelectedQuality(startEpisode.qualities[0].label ?? "Auto");
        sourceUrl = startEpisode.qualities[0].url;
      } else {
        setQualities([{ label: "Auto", url: startEpisode.videoUrl }]);
        setSelectedQuality("Auto");
        sourceUrl = startEpisode.videoUrl;
      }
    } else {
      const q = currentShow?.qualities ?? (currentShow?.videoUrl ? [{ label: "Auto", url: currentShow.videoUrl }] : []);
      setQualities(q);
      setSelectedQuality(q[0]?.label ?? "Auto");
      sourceUrl = q[0]?.url;
    }

    const v = videoRef.current;
    if (v && sourceUrl) {
      v.src = sourceUrl;
      v.load();
      setTimeout(() => {
        v.play().catch(() => setIsPlaying(false));
      }, 50);
    }

    setCurrentTime(0);
    setDuration(0);
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
  }, [currentShow, startEpisode]);

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
          videoRef.current.currentTime = Math.min(duration || Infinity, (videoRef.current.currentTime || 0) + 10);
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

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

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
    v.load();
    try {
      v.currentTime = Math.min(time, q.url ? Infinity : time);
    } catch (err) { }
    if (wasPlaying) {
      v.play().catch(() => setIsPlaying(false));
    }
    resetControlsTimer();
  };

  const updateProgressBackground = () => {
    const v = videoRef.current;
    if (!v || !duration || duration === 0) {
      setProgressBackground("");
      return;
    }
    const playedPct = Math.min(100, (v.currentTime / duration) * 100);
    let bufferedEnd = 0;
    try {
      for (let i = 0; i < v.buffered.length; i++) {
        bufferedEnd = Math.max(bufferedEnd, v.buffered.end(i));
      }
    } catch (err) {
      bufferedEnd = 0;
    }
    const bufferedPct = Math.min(100, (bufferedEnd / duration) * 100);

    const accent = "rgba(34,211,238,1)"; // cyan-like
    const bufferedColor = "rgba(255,255,255,0.2)";
    const remainder = "rgba(255,255,255,0.06)";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  /* ============================
     TOUCH / GESTURE HANDLERS
     - double-tap left/right for +/-10s
     - vertical swipe on right side -> volume
     - horizontal drag -> seek (preview)
     - single tap handled with tapTimeout (do not interfere with double-tap)
     ============================ */

  const handleTouchStart = (e) => {
    if (!videoRef.current || !containerRef.current) return;
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    startVolume.current = videoRef.current.volume;
    startCurrentTime.current = videoRef.current.currentTime || 0;

    const now = Date.now();
    const dt = now - (lastTapRef.current || 0);
    lastTapRef.current = now;

    const rect = containerRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const zone = x / rect.width;

    // clear any pending single-tap
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
      tapTimeoutRef.current = null;
    }

    if (dt > 0 && dt < 300) {
      // double-tap: immediate action
      if (zone < 0.33) {
        // rewind 10s
        videoRef.current.currentTime = Math.max(0, (videoRef.current.currentTime || 0) - 10);
        setSeekFeedback("-10s");
      } else if (zone > 0.66) {
        // forward 10s
        videoRef.current.currentTime = Math.min(duration || Infinity, (videoRef.current.currentTime || 0) + 10);
        setSeekFeedback("+10s");
      } else {
        // center double-tap -> toggle play/pause
        togglePlayPause();
        setSeekFeedback(isPlaying ? "⏸" : "▶");
      }
      resetControlsTimer();
      setTimeout(() => setSeekFeedback(null), 700);
      return;
    }

    // possible single tap — wait to confirm (don't toggle immediately)
    tapTimeoutRef.current = setTimeout(() => {
      // only toggle if touch didn't move significantly (we'll check move on touchend)
      // If user moves, touchend will clear/avoid toggling because tapTimeout would have been cleared in touchmove
      toggleControls();
      tapTimeoutRef.current = null;
    }, 300);
  };

  const handleTouchMove = (e) => {
    if (!videoRef.current || !containerRef.current) return;
    // if user moves we should cancel any pending single-tap toggle
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
      tapTimeoutRef.current = null;
    }

    const touch = e.touches[0];
    const dx = touch.clientX - touchStartX.current;
    const dy = touch.clientY - touchStartY.current;
    const rect = containerRef.current.getBoundingClientRect();
    const zoneX = (touchStartX.current - rect.left) / rect.width;

    // vertical swipe on right half -> volume change
    if (Math.abs(dy) > Math.abs(dx)) {
      if (zoneX > 0.5) {
        const delta = -dy / rect.height; // swipe up increases volume
        let newVolume = Math.min(1, Math.max(0, startVolume.current + delta));
        if (videoRef.current) videoRef.current.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
        setVolumeFeedback(Math.round(newVolume * 100));
      } else {
        // left half vertical gestures ignored (brightness removed)
      }
    } else {
      // horizontal -> scrubbing preview
      if (!duration || duration <= 0) return;
      const seekDelta = (dx / rect.width) * duration; // proportion * duration
      const newTime = Math.min(duration, Math.max(0, startCurrentTime.current + seekDelta));
      setDragSeekTime(newTime);
      setSeekFeedback(formatTime(newTime));
    }
    resetControlsTimer(2000);
  };

  const handleTouchEnd = (e) => {
    // cancel pending single tap if movement happened
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
      tapTimeoutRef.current = null;
    }

    // finalize scrub if any
    if (dragSeekTime !== null && videoRef.current) {
      videoRef.current.currentTime = dragSeekTime;
      setCurrentTime(dragSeekTime);
    }
    setDragSeekTime(null);

    // hide feedbacks after short delay
    setTimeout(() => setSeekFeedback(null), 600);
    setTimeout(() => setVolumeFeedback(null), 600);
  };

  // progress gradient updater
  useEffect(() => {
    const ticker = setInterval(() => {
      updateProgressBackground();
    }, 250);
    return () => clearInterval(ticker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, currentTime]);

  return (
    <div
      ref={containerRef}
      className="w-full text-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={`relative w-full bg-black rounded-md overflow-hidden ${isFullscreen ? "h-screen" : "aspect-[16/9] sm:aspect-[27/9]"}`}>
        <video
          ref={videoRef}
          src={qualities && qualities[0] ? qualities[0].url : startEpisode?.videoUrl ?? currentShow?.videoUrl}
          className="absolute inset-0 w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleVideoEnd}
          autoPlay
          controls={false}
          onClick={toggleControls}
          playsInline
          preload="metadata"
        />

        {/* permanent dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        {/* TOP BAR (back + volume moved here + settings) */}
        {showControls && (
          <div data-controls className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/70 to-transparent px-4 py-2 flex items-center justify-between">
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

            <div className="flex items-center relative">
              {/* Volume icon moved to top */}
              <div className="relative mr-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute(e);
                    setShowVolumeSlider((p) => !p);
                    resetControlsTimer();
                  }}
                  className="p-2 rounded-full hover:bg-white/10 transition"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>

                {/* Top-mounted volume slider */}
                <div
                  className={`absolute right-0 mt-12 w-36 bg-black/90 border border-white/10 rounded-md p-2 z-50 transition-all ${showVolumeSlider ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-full accent-cyan-500"
                  />
                </div>
              </div>

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

              {showSettings && (
                <div
                  data-controls
                  className="absolute right-0 mt-12 sm:mt-14 mr-2 w-48 bg-black/90 border border-white/10 rounded-md p-2 z-50"
                  onMouseDown={(e) => e.stopPropagation()}
                >
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
                            className={`px-2 py-1 rounded text-sm ${playbackSpeed === s ? "bg-white/20" : "bg-white/5"}`}
                          >
                            {s}x
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

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
                            className={`text-left px-3 py-2 rounded text-sm ${selectedQuality === q.label ? "bg-white/10" : "bg-white/5"}`}
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
                  if (videoRef.current) videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
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
                  if (videoRef.current) videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10);
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

        {/* Overlays: seek & volume feedback */}
        {seekFeedback && (
          <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-black/75 text-white px-4 py-2 rounded-lg text-lg font-semibold">{seekFeedback}</div>
          </div>
        )}

        {volumeFeedback !== null && (
          <div className="absolute right-4 top-16 z-50 pointer-events-none">
            <div className="bg-black/75 text-white px-3 py-2 rounded-lg text-sm">🔊 {volumeFeedback}%</div>
          </div>
        )}

        {/* BOTTOM BAR */}
        {showControls && (
          <div data-controls className="absolute left-0 right-0 bottom-0 z-30 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex items-center gap-3">
              <div className="text-sm w-12 text-left">{formatTime(dragSeekTime ?? currentTime)}</div>

              <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={dragSeekTime ?? currentTime}
                onChange={(e) => {
                  const newTime = parseFloat(e.target.value);
                  setDragSeekTime(newTime);
                }}
                onMouseUp={(e) => {
                  const newTime = parseFloat(e.target.value);
                  if (videoRef.current) videoRef.current.currentTime = newTime;
                  setDragSeekTime(null);
                }}
                onTouchEnd={(e) => {
                  const newTime = parseFloat(e.target.value);
                  if (videoRef.current) videoRef.current.currentTime = newTime;
                  setDragSeekTime(null);
                }}
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
                {/* Previous Episode */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (typeof goToPreviousEpisode === "function") goToPreviousEpisode();
                  }}
                  className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded-full flex items-center gap-1 text-xs"
                  aria-label="Previous episode"
                >
                  <FaBackward size={14} /> <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Next Episode */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (typeof goToNextEpisode === "function") goToNextEpisode();
                  }}
                  className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded-full flex items-center gap-1 text-xs"
                  aria-label="Next episode"
                >
                  <span className="hidden sm:inline">Next</span> <FaForward size={14} />
                </button>
              </div>

              <div className="flex items-center gap-4">
                {/* Volume is moved to top; keep fullscreen here */}
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

      {/* small helper CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        /* Make range thumb larger for touch */
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 999px;
          background: #22d3ee;
          box-shadow: 0 0 0 6px rgba(34, 211, 238, 0.12);
        }
        input[type="range"]::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 999px;
          background: #22d3ee;
        }
      `}</style>
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
