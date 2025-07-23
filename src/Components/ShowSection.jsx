import ShowCard from "./ShowCard";

function ShowSection({ sectionTitle, shows, bgColor = "#0F0A24" }) {
  return (
    <section
      className="px-4 sm:px-8 py-3 sm:py-3"
      style={{ backgroundColor: bgColor }}
    >
      <h2 className="text-lg sm:text-xl font-bold text-white mb-3 pl-0.5">
        {sectionTitle}
      </h2>

      <div className="flex overflow-x-auto space-x-3 md:space-x-4 scrollbar-hide pb-2">
        {shows.map((show) => (
          <ShowCard
            key={show.id}
            id={show.id}
            title={show.title}
            year={show.year}
            thumbnail={show.thumbnail}
            tags={show.tags}
          />
        ))}
      </div>
    </section>
  );
}

export default ShowSection;
