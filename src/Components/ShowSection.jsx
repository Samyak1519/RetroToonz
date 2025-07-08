import ShowCard from "./ShowCard";

function ShowSection({ sectionTitle, shows }) {
  return (
    <section className="my-4 px-4 sm:px-8">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-2 pl-0.5 sm:pl-2">
        {sectionTitle}
      </h2>

      <div className="flex overflow-x-auto space-x-3 scrollbar-hide pb-2">
        {shows.map((show, index) => (
          <ShowCard
            key={index}
            title={show.title}
            year={show.year}
            thumbnail={show.thumbnail}
          />
        ))}
      </div>
    </section>
  );
}

export default ShowSection;
