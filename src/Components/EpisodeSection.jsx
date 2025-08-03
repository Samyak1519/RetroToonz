import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaCheck, FaChevronDown } from "react-icons/fa";

const seasons = ["Season 1", "Season 2", "Season 3"];

function EpisodeSection() {
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);

  const episodes = Array.from({ length: 13 }, (_, i) => ({
    title: `Episode ${String(i + 1).padStart(2, "0")}`,
    duration: "24 min",
  }));

  return (
    <div className="mt-10">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Episodes</h2>

        {/* 📦 Season Dropdown */}
        <div className="w-44 text-sm">
          <Listbox value={selectedSeason} onChange={setSelectedSeason}>
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-[#1f1f1f] py-2 pl-4 pr-10 text-left text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <span className="block truncate">{selectedSeason}</span>
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
                  {seasons.map((season, index) => (
                    <Listbox.Option
                      key={index}
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
                            {season}
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
        {episodes.map((episode, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300"
          >
            <div className="relative pt-[56.25%] bg-gray-800">
              <img
                src="/Assets/default.jpg"
                alt={episode.title}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center text-white text-lg font-bold">
                Ep {index + 1}
              </div>
            </div>
            <div className="p-3 text-white">
              <h3 className="text-sm sm:text-base font-medium truncate">
                {episode.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Duration: {episode.duration}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EpisodeSection;
