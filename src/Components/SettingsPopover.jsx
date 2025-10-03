import React from "react";

export default function SettingsPopover({
    settingsView,
    setSettingsView,
    speedOptions,
    playbackSpeed,
    setPlaybackSpeed,
    qualities,
    selectedQuality,
    changeQuality,
    resetControlsTimer,
}) {
    return (
        <div
            data-controls
            className="absolute right-0 top-full mt-2 w-48 bg-black/90 border border-white/10 rounded-md p-2 z-50"
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
    );
}
