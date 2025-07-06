import ShowCard from "./ShowCard";

function ShowSection({ sectionTitle, shows }) {
  return (
    <section className="my-4 px-4">
      <h2 className="text-xl font-bold text-black mb-3 pl-3">{sectionTitle}</h2>

      <div className="flex overflow-x-auto space-x-4 scrollbar-hide pb-2">
        {shows.map((show, index) => (
          <ShowCard
            key={index}
            title={show.title}
            year={show.year}
            thumbnail={show.thumbnail} // ✅ Image now passed
          />
        ))}
      </div>
    </section>
  );
}

export default ShowSection;
