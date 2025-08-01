function EasterEgg({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <video
        src="/Assets/easteregg.gif"
        autoPlay
        onEnded={onClose}
        controls={false}
        className="w-[90%] max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] 2xl:max-w-[1000px] rounded-xl shadow-lg"
      />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-white/10 text-white hover:bg-white/20 px-4 py-1 rounded-full text-sm font-semibold"
      >
        ✖
      </button>
    </div>
  );
}

export default EasterEgg;
