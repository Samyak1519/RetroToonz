import { Listbox, Transition } from "@headlessui/react";
import {
  ArrowDown01Icon,
  CheckmarkCircle02Icon,
  PlayIcon,
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
        <h2 className="text-title text-white mb-4">Episodes</h2>
        <p className="text-body text-white/60">
          No seasons or episodes available.
        </p>
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

        <div className="w-44 text-label">
          <Listbox value={selectedSeason} onChange={setSelectedSeason}>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-[#1f1f1f] py-2 pl-4 pr-10 text-left text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <span className="block truncate text-label">
                  {selectedSeason.label}
                </span>
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
                              selected ? "text-purple-300" : ""
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

      {/* ✅ Responsive grid untouched */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {episodes.length === 0 ? (
          <div className="col-span-full text-body text-white/60">
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
              <EpisodeCard
                key={episode.episodeId || index}
                episode={episode}
                index={index}
                showId={show.id}
                thumb={thumb}
                defaultPoster={defaultPoster}
                navigate={navigate}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

function EpisodeCard({
  episode,
  showId,
  index,
  thumb,
  defaultPoster,
  navigate,
}) {
  const epNum = episode.episodeNumber ?? index + 1;
  const epPrefix = `E${String(epNum).padStart(2, "0")}`;

  return (
    <div
      onClick={() => navigate(`/watch/${showId}?ep=${episode.episodeId}`)}
      className="group cursor-pointer 
                 rounded-2xl overflow-hidden
                 bg-white/5 p-0.5 sm:p-2
                 border border-white/10 
                 backdrop-blur-lg backdrop-saturate-150
                 transition-all duration-200
                 
                 hover:border-sky-400/50
                 hover:ring-1 hover:ring-sky-300/50
                 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
    >
      {/* IMAGE */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <img
          src={thumb}
          alt={episode.title || `Episode ${epNum}`}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              defaultPoster || "/media/posters-desktop/default-poster.jpg";
          }}
          loading="lazy"
          className="w-full h-full object-cover"
        />

        {/* Softer overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="bg-black/40 backdrop-blur-lg backdrop-saturate-150
               border border-white/10  
               p-2.5 sm:p-3 rounded-full 
               text-white/80 hover:text-white 
               hover:bg-black/50 hover:scale-105
               transition-all duration-200"
          >
            <HugeiconsIcon icon={PlayIcon} size={20} />
          </div>
        </div>

        {/* Episode Badge */}
        <div
          className="absolute top-2 left-2 
                     bg-black/40 backdrop-blur-md 
                     border border-white/10
                     px-2 py-0.5 rounded-md text-[10px] sm:text-xs text-white"
        >
          {epPrefix}
        </div>
      </div>

      {/* TITLE */}
      <div className="mt-1.5 ml-0.5">
        <h4 className="text-xs sm:text-sm text-white truncate">
          {episode.title || `Episode ${epNum}`}
        </h4>
      </div>
    </div>
  );
}

export default EpisodeSection;
