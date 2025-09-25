import ShowCard from "./ShowCard";

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

      {/* MOBILE: horizontal carousel */}
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

      {/* DESKTOP+: horizontal carousel (replaces the grid) */}
      <div
        className="
          hidden
          sm:flex
          gap-5
          overflow-x-auto
          pb-3
          snap-x
          snap-mandatory
          scrollbar-hide
          -mx-3 sm:-mx-10
        "
        role="list"
      >
        {/* left spacer so first card can center nicely on desktop */}
        <div className="w-6 flex-shrink-0" aria-hidden />

        {shows.map((s) => (
          // width choices: tweak w-56 / sm:w-64 / md:w-72 etc to control how many cards show
          <div
            key={s.id}
            className="snap-start w-56 sm:w-60 md:w-64 lg:w-72 flex-shrink-0"
            role="listitem"
          >
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

        {/* right spacer */}
        <div className="w-6 flex-shrink-0" aria-hidden />
      </div>
    </section>
  );
}

export default ShowSection;
