import defaultPoster from "../Assets/pokemon_poster.jpg";

function ShowCard({ title, year, thumbnail }) {
  return (
    <div className="flex flex-col justify-center w-[42vw] sm:w-44 md:w-48 lg:w-56 xl:w-64 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition duration-300 flex-shrink-0">
      {/* Responsive Aspect Ratio: 4:3 mobile, 16:9 desktop */}
      <div className="relative w-full pt-[75%] lg:pt-[56.25%] overflow-hidden rounded-t-lg">
        <img
          src={thumbnail}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Text Info */}
      <div className="mt-1 px-2 pb-2 text-black leading-tight">
        <h3 className="font-medium text-xs sm:text-sm truncate">{title}</h3>
        <p className="text-[10px] sm:text-xs text-gray-600">{year}</p>
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
