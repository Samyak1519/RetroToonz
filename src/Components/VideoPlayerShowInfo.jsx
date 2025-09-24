// src/Components/VideoPlayerShowInfo.jsx

export default function VideoPlayerShowInfo({ currentShow }) {
    if (!currentShow) return null;

    return (
        <div className="px-4 sm:px-8 md:px-12 py-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {currentShow.title}
            </h1>

            <div className="flex flex-wrap gap-2 text-sm text-gray-300 mb-4">
                {[
                    currentShow.year,
                    currentShow.language,
                    currentShow.rating && `⭐ ${currentShow.rating}`,
                    currentShow.duration,
                ]
                    .filter(Boolean)
                    .map((item, i, arr) => (
                        <span key={i}>
                            {item}
                            {i < arr.length - 1 && " | "}
                        </span>
                    ))}
            </div>

            {/* Tags */}
            {currentShow.tags?.length > 0 && (
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                        {currentShow.tags.map((tag, i) => (
                            <span
                                key={i}
                                className="px-2 py-1 text-xs font-medium bg-white/10 border border-white/20 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Optional description */}
            <p className="text-gray-200 max-w-3xl leading-relaxed text-md">
                S01E01 -
            </p>
            {/* <p className="text-gray-200 max-w-3xl leading-relaxed">{currentShow.description}</p> */}
        </div>
    );
}
