import {
  ArrowLeft01Icon,
  FilterMailIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/layout/Footer.jsx";
import Header from "../../components/layout/Header.jsx";
import ShowCard from "../../components/show/ShowCard.jsx";

import showsData from "../../data/Shows.json";

const posterDesktopDir = "/media/posters-desktop";
const posterMobileDir = "/media/posters-mobile";
const extrasDir = "/media/extras";

const normalizePosterPath = (value, preferMobile = false) => {
  if (!value) return null;

  if (typeof value === "string" && value.startsWith("/media/")) {
    return value;
  }

  const cleaned = String(value).replace(/^\/+/, "");
  const fileName = cleaned.split("/").pop();

  const targetDir = preferMobile ? posterMobileDir : posterDesktopDir;

  return `${targetDir}/${fileName}`;
};

const normalizeShows = (shows) =>
  (shows || []).map((show) => {
    const desktopThumbnail = show.thumbnail
      ? show.thumbnail.startsWith("/media/")
        ? show.thumbnail
        : normalizePosterPath(show.thumbnail, false)
      : null;

    let mobileThumbnail = null;

    if (show.thumbnailMobile) {
      mobileThumbnail = show.thumbnailMobile.startsWith("/media/")
        ? show.thumbnailMobile
        : normalizePosterPath(show.thumbnailMobile, true);
    } else if (desktopThumbnail) {
      const fileName = desktopThumbnail.split("/").pop();
      mobileThumbnail = `${posterMobileDir}/${fileName}`;
    }

    return {
      ...show,
      title: show.title || "Untitled",
      thumbnail: desktopThumbnail || `${extrasDir}/default.jpg`,
      thumbnailMobile: mobileThumbnail || `${extrasDir}/default.jpg`,
    };
  });

const allShows = normalizeShows(showsData.allShows || []);

const getLetter = (title) => {
  if (!title) return "#";

  const firstCharacter = title.trim().charAt(0).toUpperCase();

  return /[A-Z]/.test(firstCharacter) ? firstCharacter : "#";
};

function AllShowsPage() {
  const navigate = useNavigate();

  const [activeTag, setActiveTag] = useState("All");
  const [sortBy, setSortBy] = useState("title-asc");
  const [sortOpen, setSortOpen] = useState(false);

  const tags = useMemo(() => {
    const tagSet = new Set();

    allShows.forEach((show) => {
      if (!Array.isArray(show.tags)) return;

      show.tags.forEach((tag) => {
        tagSet.add(tag);
      });
    });

    return ["All", ...Array.from(tagSet).sort()];
  }, []);

  const filteredShows = useMemo(() => {
    const filtered = allShows.filter((show) => {
      if (activeTag === "All") return true;

      return Array.isArray(show.tags) && show.tags.includes(activeTag);
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "title-asc":
          return a.title.localeCompare(b.title);

        case "title-desc":
          return b.title.localeCompare(a.title);

        case "year-asc":
          return (Number(a.year) || 0) - (Number(b.year) || 0);

        case "year-desc":
          return (Number(b.year) || 0) - (Number(a.year) || 0);

        default:
          return 0;
      }
    });
  }, [activeTag, sortBy]);

  const groupedShows = useMemo(() => {
    const groups = {};

    filteredShows.forEach((show) => {
      const letter = getLetter(show.title);

      if (!groups[letter]) {
        groups[letter] = [];
      }

      groups[letter].push(show);
    });

    const letters = Object.keys(groups).sort((a, b) => {
      if (a === "#") return 1;
      if (b === "#") return -1;

      return a.localeCompare(b);
    });

    return letters.map((letter) => ({
      letter,
      shows: groups[letter],
    }));
  }, [filteredShows]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [activeTag, sortBy]);

  const sortOptions = [
    {
      value: "title-asc",
      label: "Title (A → Z)",
    },
    {
      value: "title-desc",
      label: "Title (Z → A)",
    },
    {
      value: "year-desc",
      label: "Newest First",
    },
    {
      value: "year-asc",
      label: "Oldest First",
    },
  ];

  return (
    <div
      className="
        flex
        min-h-screen
        flex-col
        bg-gradient-to-b
        from-[#05060b]
        to-[#0f0a24]
        font-nunito
        text-white
      "
    >
      <Header />

      <main className="flex-grow">
        <div
          className="
            mx-auto
            w-full
            max-w-[2000px]
            px-4
            py-6
            sm:px-7
            sm:py-8
            md:px-10
            lg:px-16
          "
        >
          <div className="mb-8 flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className="
                flex
                h-11
                w-11
                flex-shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/5
                text-white
                transition-all
                duration-200
                hover:scale-105
                hover:bg-white/10
              "
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
            </button>

            <div>
              <h3
                className="
                  text-xl
                  font-bold
                  text-yellow-300
                  sm:text-xl
                  md:text-2xl
                "
              >
                All Shows
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                {filteredShows.length} Shows
              </p>
            </div>

            <div className="flex-1" />

            <div className="relative hidden md:block">
              <button
                onClick={() => setSortOpen((open) => !open)}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  px-5
                  py-2.5
                  text-sm
                  text-white
                  transition-all
                  duration-200
                  hover:bg-white/10
                "
              >
                <span>Sort</span>

                <HugeiconsIcon icon={FilterMailIcon} size={18} />
              </button>

              {sortOpen && (
                <div
                  className="
                    absolute
                    right-0
                    top-full
                    z-50
                    mt-2
                    w-56
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#111827]
                    shadow-2xl
                    backdrop-blur-xl
                  "
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setSortOpen(false);
                      }}
                      className="
                        flex
                        w-full
                        items-center
                        justify-between
                        px-4
                        py-3
                        text-sm
                        text-white
                        transition
                        hover:bg-white/5
                      "
                    >
                      <span>{option.label}</span>

                      {sortBy === option.value && (
                        <HugeiconsIcon icon={Tick02Icon} size={16} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-10">
            <div
              className="
                scrollbar-hide
                flex
                items-center
                gap-2
                overflow-x-auto
                pb-4
              "
            >
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`
                    flex-shrink-0
                    whitespace-nowrap
                    rounded-full
                    border
                    px-5
                    py-2
                    text-sm
                    font-medium
                    transition-all
                    duration-200

                    ${
                      activeTag === tag
                        ? "border-transparent bg-gradient-to-r from-cyan-400 to-blue-500 text-black"
                        : "border-white/5 bg-white/5 text-gray-300 hover:bg-white/10"
                    }
                  `}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-12 pb-24">
            {groupedShows.map(({ letter, shows }) => (
              <section key={letter}>
                <div
                  className="
                    mb-6
                    flex
                    items-center
                    gap-4
                    sm:gap-6
                  "
                >
                  <h2
                    className="
                      flex-shrink-0
                      text-2xl
                      font-semibold
                      text-yellow-300
                    "
                  >
                    {letter}
                  </h2>

                  <div
                    className="
                      h-px
                      flex-1
                      bg-gradient-to-r
                      from-white/20
                      via-white/5
                      to-transparent
                    "
                  />

                  <span
                    className="
                      flex-shrink-0
                      rounded-md
                      bg-white/5
                      px-3
                      py-1
                      text-[10px]
                      font-bold
                      text-gray-600
                      sm:text-xs
                    "
                  >
                    {shows.length} {shows.length === 1 ? "SHOW" : "SHOWS"}
                  </span>
                </div>

                <div
                  className="
                    flex
                    flex-wrap
                    gap-6
                  "
                >
                  {shows.map((show) => (
                    <div
                      key={show.id}
                      className="
                        w-[40vw]
                        max-w-[180px]
                        flex-shrink-0

                        sm:w-[180px]
                        md:w-[190px]
                        lg:w-[200px]
                        xl:w-[210px]
                      "
                    >
                      <ShowCard {...show} />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default AllShowsPage;
