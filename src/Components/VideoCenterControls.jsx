import { FaPause, FaPlay } from "react-icons/fa";
import { RiForward10Line, RiReplay10Line } from "react-icons/ri";

export default function VideoCenterControls({
    isPlaying,
    togglePlayPause,
    rewind,
    forward,
    isBuffering,
    showControls,
}) {
    const glassBtn =
        "bg-black/30 backdrop-blur-md border border-white/10 hover:bg-white/20 transition rounded-full text-white";

    return (
        <div
            data-controls
            className={`
                absolute inset-0 z-30 flex items-center justify-center
                pointer-events-none
                transition-opacity duration-300 ease-in-out
                ${showControls ? "opacity-100" : "opacity-0"}
            `}
        >
            {/* Spinner */}
            {isBuffering && (
                <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
                    <div className="yt-spinner-container">
                        <div className="yt-spinner" />
                    </div>
                </div>
            )}

            <div className="pointer-events-auto flex items-center gap-10 sm:gap-16">
                {/* Rewind */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        rewind?.();
                    }}
                    className={`${glassBtn} p-2.5 sm:p-3`}
                >
                    <RiReplay10Line size={20} />
                </button>

                {/* Play / Pause */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        togglePlayPause?.();
                    }}
                    className={`${glassBtn} p-3.5 sm:p-4`}
                >
                    {isPlaying ? <FaPause size={22} /> : <FaPlay size={22} />}
                </button>

                {/* Forward */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        forward?.();
                    }}
                    className={`${glassBtn} p-2.5 sm:p-3`}
                >
                    <RiForward10Line size={20} />
                </button>
            </div>

            {/* Spinner CSS (unchanged) */}
            <style jsx>{`
                .yt-spinner-container {
                    padding: 16px;
                    background: rgba(0, 0, 0, 0.4);
                    border-radius: 999px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .yt-spinner {
                    width: 40px;
                    height: 40px;
                    border-radius: 999px;
                    border: 3px solid rgba(255, 255, 255, 0.25);
                    border-top-color: white;
                    animation: yt-spin 0.75s linear infinite;
                }

                @keyframes yt-spin {
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
}
