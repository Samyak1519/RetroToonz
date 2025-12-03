import { useRef, useState, useEffect } from "react";
import ShowCard from "./ShowCard";

function ShowSection({ sectionTitle, shows = [], bgColor = "#0F0A24" }) {
  const id = `section-${sectionTitle.replace(/\s+/g, "-").toLowerCase()}`;

  // refs + state
  const scrollRef = useRef(null);
  const containerRef = useRef(null); // to detect pointer over the row area (includes arrows)
  const [isScrollable, setIsScrollable] = useState(false);
  const [hovered, setHovered] = useState(false);

  // detect whether the row actually overflows (so we only show arrows when needed)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) {
      setIsScrollable(false);
      return;
    }

    const update = () => {
      setIsScrollable(el.scrollWidth - el.clientWidth > 8);
    };

    update();

    // ResizeObserver to re-check when layout changes
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(update);
      ro.observe(el);
    } else {
      window.addEventListener("resize", update);
    }

    // images may load later and change width
    const imgs = el.querySelectorAll("img");
    const imgHandler = () => update();
    imgs.forEach((img) => img.addEventListener("load", imgHandler));

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", update);
      imgs.forEach((img) => img.removeEventListener("load", imgHandler));
    };
  }, [shows]);

  // show a slightly larger scroll amount relative to viewport
  const scrollByAmount = (dir = 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.min(Math.round(el.clientWidth * 0.65), 760);
    el.scrollBy({ left: amount * dir, behavior: "smooth" });
  };

  const scrollLeft = () => scrollByAmount(-1);
  const scrollRight = () => scrollByAmount(1);

  // handlers to keep arrows visible when mouse is over the whole row area (including arrows)
  const handlePointerEnter = () => setHovered(true);
  const handlePointerLeave = () => setHovered(false);

  // class helper for arrow visibility
  const arrowVisibleClass = isScrollable && hovered ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none";

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

      {/* MOBILE: unchanged */}
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

      {/* DESKTOP: the outer wrapper is NOT a group (so hovering arrows won't trigger card group-hover) */}
      <div
        className="hidden sm:block relative"
        // track pointer over whole area: the scroll row + arrows live inside this area
        ref={containerRef}
        onMouseEnter={handlePointerEnter}
        onMouseLeave={handlePointerLeave}
      >
        {/* SCROLL ROW (this is the group for individual cards) - keep it as group so ShowCard can use group-hover */}
        <div
          ref={scrollRef}
          className="peer group hidden sm:flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide -mx-3 sm:-mx-10"
          role="list"
        >
          <div className="w-6 flex-shrink-0" aria-hidden />

          {shows.map((s) => (
            <div key={s.id} className="snap-start w-56 sm:w-60 md:w-64 lg:w-72 flex-shrink-0" role="listitem">
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

          <div className="w-6 flex-shrink-0" aria-hidden />
        </div>

        {/* LEFT ARROW — placed after the scroll row. Visible only when isScrollable && hovered. */}
        <button
          onClick={scrollLeft}
          aria-label="Scroll left"
          className={`
            absolute left-0 top-1/2 -translate-y-1/2 z-20
            w-12 h-12 rounded-full
            bg-black/50 backdrop-blur-md
            text-white text-3xl
            flex items-center justify-center
            ${arrowVisibleClass}
            hover:scale-110 transition
            shadow-xl shadow-white/20
          `}
        >
          ‹
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={scrollRight}
          aria-label="Scroll right"
          className={`
            absolute right-0 top-1/2 -translate-y-1/2 z-20
            w-12 h-12 rounded-full
            bg-black/50 backdrop-blur-md
            text-white text-3xl
            flex items-center justify-center
            ${arrowVisibleClass}
            hover:scale-110 transition
            shadow-xl shadow-white/20
          `}
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default ShowSection;
