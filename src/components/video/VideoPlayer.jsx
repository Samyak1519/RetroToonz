import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoBottomBar from "./VideoBottomBar.jsx";
import VideoCenterControls from "./VideoCenterControls.jsx";
import VideoTopBar from "./VideoTopBar.jsx";

const VideoPlayer = ({
  currentShow,
  startEpisode,
  goToNextEpisode,
  goToPreviousEpisode,
}) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // gesture helpers
  const tapTimeoutRef = useRef(null);
  const lastTapRef = useRef(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const startCurrentTime = useRef(0);

  const navigate = useNavigate();

  // playback state
  const [isPlaying, setIsPlaying] = useState(true);
  const [isBuffering, setIsBuffering] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // UI state
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // quality
  const [qualities, setQualities] = useState([]);
  const [selectedQuality, setSelectedQuality] = useState("Auto");

  // overlays / feedback
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

  const showControlsOnTap = (e) => {
    const clickedInsideControls = e?.target?.closest?.("[data-controls]");
    if (clickedInsideControls) return;

    // Always show controls and restart timer
    resetControlsTimer(5000); // or 3000 if you want
  };

  const resetControlsTimer = (ms = 5000) => {
    setShowControls(true);
    clearControlsTimeout();
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
      controlsTimeoutRef.current = null;
    }, ms);
  };

  /* ---------- Basic handlers ---------- */

  const toggleControls = (e) => {
    const clickedInsideControls =
      e?.target?.closest?.("[data-controls]") ?? false;
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
      v.play().catch(() => {});
      setIsPlaying(true);
      setIsBuffering(true); // ⭐ show spinner until playing event fires
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

  // ⭐ NEW: video buffering/ready handlers
  const handleLoadStart = () => setIsBuffering(true);
  const handleWaiting = () => setIsBuffering(true);
  const handlePlaying = () => {
    setIsBuffering(false);
    setIsPlaying(true);
  };
  const handleCanPlay = () => setIsBuffering(false);

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
    const v = videoRef.current;
    if (!v) return;

    v.muted = !v.muted;
    setIsMuted(v.muted);

    if (!v.muted && v.volume === 0) {
      v.volume = 1;
      setVolume(1);
    }
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
        if (window.screen?.orientation?.lock)
          window.screen.orientation.lock("landscape").catch(() => {});
      }
    } catch {}
    resetControlsTimer();
  };

  const handleVideoEnd = () => {
    if (typeof goToNextEpisode === "function") goToNextEpisode();
  };

  // quality switching kept the same
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
      v.currentTime = time;
    } catch {}

    if (wasPlaying) v.play().catch(() => setIsPlaying(false));
    resetControlsTimer();
  };

  const updateProgressBackground = () => {
    const v = videoRef.current;
    if (!v || !duration) return;

    const playedPct = Math.min(100, (v.currentTime / duration) * 100);
    let bufferedEnd = 0;

    try {
      for (let i = 0; i < v.buffered.length; i++) {
        bufferedEnd = Math.max(bufferedEnd, v.buffered.end(i));
      }
    } catch {}

    const bufferedPct = Math.min(100, (bufferedEnd / duration) * 100);

    const accent = "rgba(34,211,238,1)";
    const bufferedColor = "rgba(255,255,255,0.2)";
    const remainder = "rgba(255,255,255,0.06)";

    const played = Math.min(playedPct, bufferedPct);
    const buffered = Math.max(playedPct, bufferedPct);

    setProgressBackground(
      `linear-gradient(90deg, ${accent} 0% ${played}%, ${bufferedColor} ${played}% ${buffered}%, ${remainder} ${buffered}% 100%)`,
    );
  };

  useEffect(() => {
    const ticker = setInterval(updateProgressBackground, 250);
    return () => clearInterval(ticker);
  }, [duration, currentTime]);

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
          videoRef.current.currentTime = Math.max(
            0,
            videoRef.current.currentTime - 10,
          );
          setCurrentTime(videoRef.current.currentTime);
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.min(
            duration,
            videoRef.current.currentTime + 10,
          );
          setCurrentTime(videoRef.current.currentTime);
        }
      } else if (e.key.toLowerCase() === "f") {
        toggleFullscreen();
      } else if (e.key.toLowerCase() === "m") {
        toggleMute();
      }

      resetControlsTimer();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [duration]);

  // load episode
  useEffect(() => {
    let sourceUrl = null;

    if (startEpisode?.qualities?.length) {
      setQualities(startEpisode.qualities);
      setSelectedQuality(startEpisode.qualities[0].label ?? "Auto");
      sourceUrl = startEpisode.qualities[0].url;
    } else if (startEpisode?.videoUrl) {
      setQualities([{ label: "Auto", url: startEpisode.videoUrl }]);
      sourceUrl = startEpisode.videoUrl;
    } else if (currentShow?.qualities?.length) {
      setQualities(currentShow.qualities);
      setSelectedQuality(currentShow.qualities[0].label ?? "Auto");
      sourceUrl = currentShow.qualities[0].url;
    } else {
      setQualities([{ label: "Auto", url: currentShow?.videoUrl }]);
      sourceUrl = currentShow?.videoUrl;
    }

    const v = videoRef.current;
    if (v && sourceUrl) {
      setIsBuffering(true); // ⭐ show spinner immediately
      v.src = sourceUrl;
      v.load();
      v.play().catch(() => setIsPlaying(false));
    }

    setCurrentTime(0);
    setDuration(0);
    setShowControls(true);

    clearControlsTimeout();
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 1500);

    return clearControlsTimeout;
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
     TOUCH HANDLERS (same except no volume swipe)
  ============================ */
  const handleTouchStart = (e) => {
    if (!videoRef.current) return;
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    startCurrentTime.current = videoRef.current.currentTime || 0;

    const now = Date.now();
    const dt = now - lastTapRef.current;
    lastTapRef.current = now;

    const rect = containerRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const zone = x / rect.width;

    if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);

    if (dt < 300) {
      if (zone < 0.33) {
        videoRef.current.currentTime = Math.max(
          0,
          videoRef.current.currentTime - 10,
        );
        setSeekFeedback("-10s");
      } else if (zone > 0.66) {
        videoRef.current.currentTime = Math.min(
          duration,
          videoRef.current.currentTime + 10,
        );
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
      showControlsOnTap();
      tapTimeoutRef.current = null;
    }, 300);
  };

  const handleTouchMove = (e) => {
    if (!videoRef.current) return;

    const touch = e.touches[0];
    const dx = touch.clientX - touchStartX.current;
    const dy = touch.clientY - touchStartY.current;
    const rect = containerRef.current.getBoundingClientRect();

    // only horizontal seeking
    if (Math.abs(dx) > Math.abs(dy)) {
      const seekDelta = (dx / rect.width) * duration;
      const newTime = Math.min(
        duration,
        Math.max(0, startCurrentTime.current + seekDelta),
      );
      setDragSeekTime(newTime);
      setSeekFeedback(formatTime(newTime));
    }

    resetControlsTimer(2000);
  };

  const handleTouchEnd = () => {
    if (dragSeekTime !== null && videoRef.current) {
      videoRef.current.currentTime = dragSeekTime;
      setCurrentTime(dragSeekTime);
    }
    setDragSeekTime(null);

    setTimeout(() => setSeekFeedback(null), 600);
    setTimeout(() => setVolumeFeedback(null), 600);
  };

  function formatTime(t = 0) {
    if (!isFinite(t) || t <= 0) return "00:00";
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(t % 60)
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
      <div
        className={`relative w-full bg-black rounded-md overflow-hidden ${
          isFullscreen ? "h-screen" : "aspect-[16/9] sm:aspect-[27/9]"
        }`}
      >
        <video
          ref={videoRef}
          src={qualities?.[0]?.url}
          className="absolute inset-0 w-full h-full object-contain"
          onLoadStart={handleLoadStart}
          onWaiting={handleWaiting}
          onCanPlay={handleCanPlay}
          onPlaying={handlePlaying}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleVideoEnd}
          autoPlay
          controls={false}
          onClick={showControlsOnTap}
          playsInline
          preload="metadata"
        />

        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        {/* TOP BAR */}
        {showControls && (
          <VideoTopBar
            currentShow={currentShow}
            currentEpisode={startEpisode}
            isFullscreen={isFullscreen}
            navigate={navigate}
            isMuted={isMuted}
            volume={volume}
            toggleMute={toggleMute}
            resetControlsTimer={resetControlsTimer}
          />
        )}

        {/* CENTER CONTROLS + SPINNER */}
        <VideoCenterControls
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
          rewind={() => {
            if (videoRef.current)
              videoRef.current.currentTime = Math.max(
                0,
                videoRef.current.currentTime - 10,
              );
            resetControlsTimer();
          }}
          forward={() => {
            if (videoRef.current)
              videoRef.current.currentTime = Math.min(
                duration,
                videoRef.current.currentTime + 10,
              );
            resetControlsTimer();
          }}
          isBuffering={isBuffering} // ⭐ NEW
          showControls={showControls}
        />

        {/* Seek feedback */}
        {seekFeedback && (
          <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-black/75 text-white px-4 py-2 rounded-lg text-lg font-semibold">
              {seekFeedback}
            </div>
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
    </div>
  );
};

export default VideoPlayer;
