export default function VideoPlayerShowInfo({ currentShow, currentEpisode }) {
  if (!currentShow) return null;

  let sePid = "";
  if (
    currentEpisode?.seasonNumber !== undefined &&
    currentEpisode?.episodeNumber !== undefined
  ) {
    sePid = `S${String(currentEpisode.seasonNumber).padStart(2, "0")}E${String(
      currentEpisode.episodeNumber
    ).padStart(2, "0")}`;
  } else if (currentEpisode?.episodeNumber !== undefined) {
    sePid = `E${String(currentEpisode.episodeNumber).padStart(2, "0")}`;
  } else if (currentEpisode?.episodeId) {
    sePid = currentEpisode.episodeId;
  }

  // Prefer episode synopsis; fallback to show description
  const synopsis =
    (currentEpisode &&
      (currentEpisode.synopsis ?? currentEpisode.description)) ??
    currentShow.description ??
    "";

  return (
    <div className="px-4 sm:px-8 md:px-12 py-6 mb-2">
      {/* Reduced heading sizes */}
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2">
        {currentShow.title}
      </h1>

      {/* metadata - slightly smaller */}
      <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-300 mb-4">
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

      {/* Episode identifier + title (made slightly smaller) */}
      <p className="text-gray-200 w-full leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
        {sePid ? `${sePid} - ` : ""}
        {currentEpisode?.title ?? currentShow.description ?? ""}
      </p>

      {synopsis ? (
        <p className="text-gray-300 w-full mt-3 leading-relaxed text-sm sm:text-sm md:text-sm lg:text-sm">
          {synopsis}
        </p>
      ) : null}
    </div>
  );
}
