import Footer from "../Components/Footer";
import Header from "../Components/Header";

function WatchlistPage() {
  return (
    <>
      <Header />
      <div className="pt-24 min-h-screen text-white px-4">
        <h1 className="text-3xl font-bold mb-4">Your Watchlist</h1>
        <p className="text-gray-400">Your saved shows will appear here.</p>
      </div>
      <Footer />
    </>
  );
}

export default WatchlistPage;
