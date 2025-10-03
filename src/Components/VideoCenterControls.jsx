// src/Components/VideoCenterControls.jsx
import { FaPause, FaPlay } from "react-icons/fa";
import { RiForward10Line, RiReplay10Line } from "react-icons/ri";

export default function VideoCenterControls({ isPlaying, togglePlayPause, rewind, forward }) {
    return (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-8 sm:gap-10">
                {/* Rewind */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (typeof rewind === "function") rewind();
                    }}
                    className="bg-black/40 p-2.5 sm:p-3 rounded-full text-white"
                    aria-label="Rewind 10s"
                >
                    <RiReplay10Line size={18} className="sm:hidden" />
                    <RiReplay10Line size={20} className="hidden sm:inline" />
                </button>

                {/* Play/Pause */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (typeof togglePlayPause === "function") togglePlayPause();
                    }}
                    className="bg-black/40 p-3.5 sm:p-4 rounded-full text-white"
                    aria-label={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? (
                        <>
                            <FaPause size={20} className="sm:hidden" />
                            <FaPause size={22} className="hidden sm:inline" />
                        </>
                    ) : (
                        <>
                            <FaPlay size={20} className="sm:hidden" />
                            <FaPlay size={22} className="hidden sm:inline" />
                        </>
                    )}
                </button>

                {/* Forward */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (typeof forward === "function") forward();
                    }}
                    className="bg-black/40 p-2.5 sm:p-3 rounded-full text-white"
                    aria-label="Forward 10s"
                >
                    <RiForward10Line size={18} className="sm:hidden" />
                    <RiForward10Line size={20} className="hidden sm:inline" />
                </button>
            </div>
        </div>
    );
}
