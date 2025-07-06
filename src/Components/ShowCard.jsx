import defaultPoster from "../Assets/pokemon_poster.jpg";

function ShowCard({ title, year, thumbnail }) {
  return (
    <div className="flex flex-col justify-center m-2 w-36 sm:w-44 md:w-48 lg:w-56 xl:w-64 border border-gray-300 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-white flex-shrink-0">
      {/* Responsive Aspect Ratio Wrapper: 4:3 on mobile/tablet, 16:9 on desktop */}
      <div className="relative w-full pt-[75%] lg:pt-[56.25%] overflow-hidden rounded-xl">
        <img
          src={thumbnail}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Text Info */}
      <div className="mt-2 px-2 pb-3 text-black">
        <h3 className="font-semibold text-xs sm:text-sm truncate">{title}</h3>
        <p className="text-[10px] sm:text-xs truncate">{year}</p>
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
