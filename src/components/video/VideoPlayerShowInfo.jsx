export default function VideoPlayerShowInfo({ currentShow, currentEpisode }) {
  if (!currentShow) return null;

  let sePid = "";
  if (
    currentEpisode?.seasonNumber !== undefined &&
    currentEpisode?.episodeNumber !== undefined
  ) {
    sePid = `S${String(currentEpisode.seasonNumber).padStart(2, "0")}E${String(
      currentEpisode.episodeNumber,
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
    <div className="px-4 sm:px-8 md:px-12 py-6 mb-4 max-w-[1200px]">
      {/* SHOW TITLE */}
      <h1 className="text-title text-white mb-2">{currentShow.title}</h1>

      {/* METADATA */}
      <div className="flex items-center flex-wrap gap-3 text-meta text-white/60 mb-4">
        {currentShow.year && <span>{currentShow.year}</span>}
        {currentShow.language && <span>• {currentShow.language}</span>}
        {currentShow.rating && (
          <span className="flex items-center gap-1">
            ⭐ {currentShow.rating}
          </span>
        )}
      </div>

      {/* TAGS */}
      {currentShow.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {currentShow.tags.map((tag, i) => (
            <span
              key={i}
              className="
              px-3 py-1
              text-meta
              bg-white/10
              border border-white/10
              rounded-full
              backdrop-blur-md
              hover:bg-white/20
              transition
            "
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* EPISODE TITLE */}
      <h2 className="text-heading text-white mb-2">
        {sePid && <span className="text-white/60">{sePid} • </span>}
        {currentEpisode?.title ?? "Untitled Episode"}
      </h2>

      {/* DESCRIPTION */}
      {synopsis && (
        <p className="text-body text-white/70 leading-relaxed max-w-[800px]">
          {synopsis}
        </p>
      )}
    </div>
  );
}
