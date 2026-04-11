import { Listbox, Transition } from "@headlessui/react";
import {
  ArrowDown01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Fragment, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function EpisodeSection({ show, posterDesktop, posterMobile, defaultPoster }) {
  const navigate = useNavigate();

  const seasons = useMemo(() => {
    if (!show?.seasons || !Array.isArray(show.seasons)) return [];
    return show.seasons.map((s, idx) => ({
      label: s.title || `Season ${s.seasonNumber || idx + 1}`,
      index: idx,
    }));
  }, [show]);

  const [selectedSeason, setSelectedSeason] = useState(
    seasons.length > 0 ? seasons[0] : { label: "Season 1", index: 0 },
  );

  const episodes = useMemo(() => {
    const seasonObj =
      show?.seasons && show.seasons[selectedSeason.index]
        ? show.seasons[selectedSeason.index]
        : null;
    return seasonObj?.episodes && Array.isArray(seasonObj.episodes)
      ? seasonObj.episodes
      : [];
  }, [show, selectedSeason]);

  if (!show || seasons.length === 0) {
    return (
      <div className="mt-10">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
          Episodes
        </h2>
        <p className="text-gray-400">No seasons or episodes available.</p>
      </div>
    );
  }

  const getEpisodeThumb = () => {
    if (posterDesktop) return posterDesktop;
    return defaultPoster || "/media/posters-desktop/default-poster.jpg";
  };

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Episodes</h2>

        <div className="w-44 text-sm">
          <Listbox value={selectedSeason} onChange={setSelectedSeason}>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-[#1f1f1f] py-2 pl-4 pr-10 text-left text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <span className="block truncate">{selectedSeason.label}</span>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    className="h-5 w-5 text-gray-400"
                  />
                </span>
              </Listbox.Button>

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-50 mt-1 w-full rounded-md bg-[#2b2b2b] py-1 text-white shadow-lg ring-1 ring-black/10 border border-gray-700">
                  {seasons.map((season) => (
                    <Listbox.Option
                      key={season.index}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? "bg-purple-600 text-white" : "text-gray-100"
                        }`
                      }
                      value={season}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-semibold text-purple-300" : ""
                            }`}
                          >
                            {season.label}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-2 flex items-center">
                              <HugeiconsIcon
                                icon={CheckmarkCircle02Icon}
                                className="text-purple-300 text-xs"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>

      {/* ✅ Tablet now shows 4 cards, no padding added */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {episodes.length === 0 ? (
          <div className="col-span-full text-gray-400">
            No episodes found for this season.
          </div>
        ) : (
          episodes.map((episode, index) => {
            const epNum = episode.episodeNumber ?? index + 1;
            const epPrefix = `E${String(epNum).padStart(2, "0")}`;
            const thumb =
              getEpisodeThumb() ||
              defaultPoster ||
              "/media/posters-desktop/default-poster.jpg";

            return (
              <div
                key={episode.episodeId || index}
                onClick={() =>
                  navigate(`/watch/${show.id}?ep=${episode.episodeId}`)
                }
                className="group vt-card cursor-pointer rounded-lg overflow-hidden shadow-[0_6px_18px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:scale-[1.04] md:hover:scale-[1.05]"
              >
                {/* Thumbnail */}
                <div
                  className="relative bg-zinc-800"
                  style={{ paddingTop: "56.25%" }}
                >
                  <img
                    src={thumb}
                    alt={episode.title || `Episode ${epNum}`}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        defaultPoster ||
                        "/media/posters-desktop/default-poster.jpg";
                    }}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/30 pointer-events-none" />

                  {/* Episode badge */}
                  <div className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded-md text-xs font-semibold text-white">
                    {epPrefix}
                  </div>

                  {/* Centered Play Icon */}
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    aria-hidden="true"
                  >
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-transform duration-150 group-hover:scale-110">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className="sm:w-5 sm:h-5"
                      >
                        <path d="M5 3v18l15-9L5 3z" fill="white" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="p-2 py-2.5 bg-black/10">
                  <h3 className="text-xs sm:text-sm font-medium text-white truncate">
                    {episode.title || `Episode ${epNum}`}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-300 truncate mt-1 hidden sm:block">
                    {episode.description || ""}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default EpisodeSection;
