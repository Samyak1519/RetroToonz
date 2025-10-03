import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoTopBar from "./VideoTopBar";
import VideoCenterControls from "./VideoCenterControls";
import VideoBottomBar from "./VideoBottomBar";
import SettingsPopover from "./SettingsPopover";

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
  const [seekFeedback, setSeekFeedback] = useState(null);
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

  /* ---------- Basic handlers (text mostly as before) ---------- */
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

  const handleProgressChange = (newTime) => {
    if (videoRef.current) videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    resetControlsTimer();
  };

  const handleVolumeChange = (newVolume) => {
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

  // quality switching (kept same)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, currentTime]);

  useEffect(() => {
    updateProgressBackground();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  // keyboard handlers
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

  // load source / qualities when episode changes (kept same)
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

  /* ============================
     TOUCH / GESTURE HANDLERS (kept same)
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

    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
      tapTimeoutRef.current = null;
    }

    if (dt > 0 && dt < 300) {
      if (zone < 0.33) {
        videoRef.current.currentTime = Math.max(0, (videoRef.current.currentTime || 0) - 10);
        setSeekFeedback("-10s");
      } else if (zone > 0.66) {
        videoRef.current.currentTime = Math.min(duration || Infinity, (videoRef.current.currentTime || 0) + 10);
        setSeekFeedback("+10s");
      } else {
        togglePlayPause();
        setSeekFeedback(isPlaying ? "⏸" : "▶");
      }
      resetControlsTimer();
      setTimeout(() => setSeekFeedback(null), 700);
      return;
    }

    tapTimeoutRef.current = setTimeout(() => {
      toggleControls();
      tapTimeoutRef.current = null;
    }, 300);
  };

  const handleTouchMove = (e) => {
    if (!videoRef.current || !containerRef.current) return;
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
      tapTimeoutRef.current = null;
    }

    const touch = e.touches[0];
    const dx = touch.clientX - touchStartX.current;
    const dy = touch.clientY - touchStartY.current;
    const rect = containerRef.current.getBoundingClientRect();
    const zoneX = (touchStartX.current - rect.left) / rect.width;

    if (Math.abs(dy) > Math.abs(dx)) {
      if (zoneX > 0.5) {
        const delta = -dy / rect.height;
        let newVolume = Math.min(1, Math.max(0, startVolume.current + delta));
        if (videoRef.current) videoRef.current.volume = newVolume;
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
        setVolumeFeedback(Math.round(newVolume * 100));
      }
    } else {
      if (!duration || duration <= 0) return;
      const seekDelta = (dx / rect.width) * duration;
      const newTime = Math.min(duration, Math.max(0, startCurrentTime.current + seekDelta));
      setDragSeekTime(newTime);
      setSeekFeedback(formatTime(newTime));
    }
    resetControlsTimer(2000);
  };

  const handleTouchEnd = () => {
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
      tapTimeoutRef.current = null;
    }

    if (dragSeekTime !== null && videoRef.current) {
      videoRef.current.currentTime = dragSeekTime;
      setCurrentTime(dragSeekTime);
    }
    setDragSeekTime(null);

    setTimeout(() => setSeekFeedback(null), 600);
    setTimeout(() => setVolumeFeedback(null), 600);
  };

  /* ---------------------
     small helper: formatTime
     --------------------- */
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

        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        {/* TOP BAR — render only when controls are visible (keeps top & bottom in sync) */}
        {showControls && (
          <VideoTopBar
            currentShow={currentShow}
            currentEpisode={startEpisode}
            isFullscreen={isFullscreen}
            navigate={navigate}
            isMuted={isMuted}
            volume={volume}
            showVolumeSlider={showVolumeSlider}
            setShowVolumeSlider={setShowVolumeSlider}
            toggleMute={toggleMute}
            resetControlsTimer={resetControlsTimer}
            showSettings={showSettings}
            setShowSettings={setShowSettings}
            settingsView={settingsView}
            setSettingsView={setSettingsView}
          />
        )}



        {/* Settings popover (anchored to top-right area) */}
        {showSettings && (
          <SettingsPopover
            settingsView={settingsView}
            setSettingsView={setSettingsView}
            speedOptions={speedOptions}
            playbackSpeed={playbackSpeed}
            setPlaybackSpeed={setPlaybackSpeed}
            qualities={qualities}
            selectedQuality={selectedQuality}
            changeQuality={changeQuality}
            resetControlsTimer={resetControlsTimer}
          />
        )}

        {/* CENTER CONTROLS */}
        {showControls && (
          <VideoCenterControls
            isPlaying={isPlaying}
            togglePlayPause={togglePlayPause}
            rewind={() => {
              if (videoRef.current) videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
              resetControlsTimer();
            }}
            forward={() => {
              if (videoRef.current) videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10);
              resetControlsTimer();
            }}
          />
        )}

        {/* Overlays */}
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
          <VideoBottomBar
            currentTime={currentTime}
            duration={duration}
            dragSeekTime={dragSeekTime}
            setDragSeekTime={setDragSeekTime}
            onSeek={(t) => handleProgressChange(t)}
            formatTime={formatTime}
            progressBackground={progressBackground}
            goToNextEpisode={goToNextEpisode}
            goToPreviousEpisode={goToPreviousEpisode}
            toggleFullscreen={toggleFullscreen}
            isFullscreen={isFullscreen}
          />
        )}
      </div>

      {/* small helper CSS (unchanged) */}
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

export default VideoPlayer;
