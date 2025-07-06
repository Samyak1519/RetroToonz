import defaultPoster from "../Assets/pokemon_poster.jpg";

function ShowCard({ title, year, thumbnail }) {
  return (
    <div className="flex flex-col justify-center m-2 w-40 sm:w-48 md:w-56 lg:w-64 border border-gray-300 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-white">
      {/* 16:9 Aspect Ratio without plugin */}
      <div className="relative w-full pt-[56.25%] overflow-hidden rounded-xl">
        <img
          src={thumbnail}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Text Info */}
      <div className="mt-2 px-2 pb-3 text-black">
        <h3 className="font-semibold text-sm sm:text-base truncate">{title}</h3>
        <p className="text-xs sm:text-sm truncate">{year}</p>
      </div>
    </div>
  );
}

ShowCard.defaultProps = {
  title: "Untitled Show",
  year: "2023",
  thumbnail: defaultPoster,
};

export default ShowCard;
