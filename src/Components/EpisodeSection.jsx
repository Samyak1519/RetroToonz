import { Fragment, useMemo, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaCheck, FaChevronDown } from "react-icons/fa";
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
    seasons.length > 0 ? seasons[0] : { label: "Season 1", index: 0 }
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

  // use poster if episode thumbnail is missing
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
                  <FaChevronDown className="h-3 w-3 text-gray-400" />
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
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? "bg-purple-600 text-white" : "text-gray-100"
                        }`
                      }
                      value={season}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? "font-semibold text-purple-300" : ""
                              }`}
                          >
                            {season.label}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-2 flex items-center">
                              <FaCheck className="text-purple-300 text-xs" />
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

      {/* Episodes grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {episodes.length === 0 ? (
          <div className="col-span-full text-gray-400">
            No episodes found for this season.
          </div>
        ) : (
          episodes.map((episode, index) => {
            const epNum = episode.episodeNumber ?? index + 1;
            const epPrefix = `E${String(epNum).padStart(2, "0")}`;
            return (
              <div
                key={episode.episodeId || index}
                onClick={() =>
                  navigate(`/watch/${show.id}?ep=${episode.episodeId}`)
                }
                className="cursor-pointer bg-gray-900 rounded-lg overflow-hidden shadow hover:shadow-lg hover:scale-105 transition duration-300"
              >
                <div className="relative pt-[56.25%] bg-gray-800">
                  <img
                    src={getEpisodeThumb()}
                    alt={episode.title || `Episode ${epNum}`}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        defaultPoster ||
                        "/media/posters-desktop/default-poster.jpg";
                    }}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center text-white text-lg font-bold">
                    {epPrefix}
                  </div>
                </div>

                <div className="p-3 text-white">
                  <h3 className="text-sm sm:text-base font-medium truncate">
                    {epPrefix} - {episode.title || `Episode ${epNum}`}
                  </h3>
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
