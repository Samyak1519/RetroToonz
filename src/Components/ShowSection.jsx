// src/Components/ShowSection.jsx
import ShowCard from "./ShowCard";

/**
 * ShowSection
 * - Mobile: horizontal snap carousel (one row, swipeable)
 * - sm+: responsive grid with dense columns so many cards show per row
 */
function ShowSection({ sectionTitle, shows = [], bgColor = "#0F0A24" }) {
  const id = `section-${sectionTitle.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <section
      id={id}
      className="px-3 sm:px-10 py-5"
      style={{ backgroundColor: bgColor }}
      aria-labelledby={`${id}-title`}
    >
      <h2 id={`${id}-title`} className="text-lg sm:text-xl font-bold text-white mb-4">
        {sectionTitle}
      </h2>

      {/* MOBILE: horizontal scroll row */}
      <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory sm:hidden">
        <div className="w-3 flex-shrink-0" aria-hidden />
        {shows.map((s) => (
          <div key={s.id} className="snap-start">
            <ShowCard
              id={s.id}
              title={s.title}
              year={s.year}
              thumbnail={s.thumbnail}
              thumbnailMobile={s.thumbnailMobile}
              tags={s.tags}
            />
          </div>
        ))}
        <div className="w-3 flex-shrink-0" aria-hidden />
      </div>

      {/* DESKTOP+: grid layout (dense) */}
      <div className="hidden sm:grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        {shows.map((s) => (
          <ShowCard
            key={s.id}
            id={s.id}
            title={s.title}
            year={s.year}
            thumbnail={s.thumbnail}
            thumbnailMobile={s.thumbnailMobile}
            tags={s.tags}
          />
        ))}
      </div>
    </section>
  );
}

export default ShowSection;
