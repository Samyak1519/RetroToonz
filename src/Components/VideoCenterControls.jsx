import { FaPause, FaPlay } from "react-icons/fa";
import { RiForward10Line, RiReplay10Line } from "react-icons/ri";

export default function VideoCenterControls({
    isPlaying,
    togglePlayPause,
    rewind,
    forward,
    isBuffering
}) {
    return (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">

            {/* ⭐ Spinner A — YouTube-style white circular loader */}
            {isBuffering && (
                <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
                    <div className="yt-spinner-container">
                        <div className="yt-spinner" />
                    </div>
                </div>
            )}

            <div className="pointer-events-auto flex items-center gap-8 sm:gap-10">

                {/* Rewind */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        rewind?.();
                    }}
                    className="bg-black/40 p-2.5 sm:p-3 rounded-full text-white"
                >
                    <RiReplay10Line size={20} />
                </button>

                {/* Play / Pause */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        togglePlayPause?.();
                    }}
                    className="bg-black/40 p-3.5 sm:p-4 rounded-full text-white"
                >
                    {isPlaying ? <FaPause size={22} /> : <FaPlay size={22} />}
                </button>

                {/* Forward */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        forward?.();
                    }}
                    className="bg-black/40 p-2.5 sm:p-3 rounded-full text-white"
                >
                    <RiForward10Line size={20} />
                </button>
            </div>

            {/* Spinner A CSS */}
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

                    /* YouTube-style thin arc */
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
