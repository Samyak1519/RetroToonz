// src/Components/VideoTopBar.jsx
import { FaArrowLeft, FaCog, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

export default function VideoTopBar({
    currentShow,
    currentEpisode,
    navigate,
    isMuted,
    volume,
    showVolumeSlider,
    setShowVolumeSlider,
    toggleMute,
    resetControlsTimer,
    showSettings,
    setShowSettings,
    settingsView,
    setSettingsView,
    isFullscreen,
}) {
    const showTitle = currentShow?.title || currentShow?.name || currentShow?.id || "Show";

    const episodeNumber =
        currentEpisode?.episodeNumber !== undefined && currentEpisode?.episodeNumber !== null
            ? String(currentEpisode.episodeNumber).padStart(2, "0")
            : currentEpisode?.episodeId ?? null;

    const episodeTitle = currentEpisode?.title || "";

    const containerClasses = [
        "absolute top-0 left-0 right-0 z-40",
        "bg-gradient-to-b from-black/70 to-transparent",
        "px-5 py-2 sm:py-3",
        "flex items-center justify-between",
        isFullscreen ? "sm:pt-6 lg:pt-8" : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div data-controls className={containerClasses}>
            <div className="flex items-center min-w-0">
                {/* Back button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (currentShow?.id) {
                            navigate(`/show/${currentShow.id}`);
                        } else {
                            navigate(-1);
                        }
                    }}
                    className="p-2 sm:p-3 mr-2 rounded-full hover:bg-white/10 transition flex items-center"
                    aria-label="Back to show"
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    <FaArrowLeft className="text-lg sm:text-xl" />
                </button>

                {isFullscreen && (
                    <div className="flex items-center gap-2 truncate min-w-0">
                        {/* Main label — plain inline text (no background) */}
                        <div className="text-sm sm:text-lg text-white truncate min-w-0">
                            <span className="font-semibold">{showTitle}</span>
                            {episodeNumber && (
                                <span className="text-white/90">
                                    {" "} : E{episodeNumber}
                                    {episodeTitle ? ` "${episodeTitle}"` : ""}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center relative">
                {/* volume button */}
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
                        aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>

                    <div
                        className={`absolute right-0 mt-12 w-36 bg-black/90 border border-white/10 rounded-md p-2 z-50 transition-all ${showVolumeSlider ? "opacity-100" : "opacity-0 pointer-events-none"
                            }`}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => {
                                const v = parseFloat(e.target.value);
                                e.stopPropagation();
                                // parent can listen for this custom event or you can wire a callback instead
                                const ev = new CustomEvent("video-volume-change", { detail: { value: v } });
                                window.dispatchEvent(ev);
                            }}
                            className="w-full accent-cyan-500"
                        />
                    </div>
                </div>

                {showSettings && settingsView !== "main" && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSettingsView("main");
                            resetControlsTimer();
                        }}
                        className="p-1 sm:p-2 rounded-full hover:bg-white/10 transition mr-2"
                        aria-label="Back in settings"
                        title="Back"
                    >
                        <FaArrowLeft className="text-sm sm:text-base" />
                    </button>
                )}

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
                    className="p-2 sm:p-3 rounded-full hover:bg-white/10 transition"
                    aria-label="Settings"
                    title="Settings"
                >
                    <FaCog className="text-lg sm:text-xl" />
                </button>
            </div>
        </div>
    );
}
