import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const ComingSoonPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />

      <main className="flex-1 flex flex-col justify-center items-center px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">Coming Soon</h1>
        <p className="text-lg md:text-xl text-gray-300 mb-4 max-w-xl">
          We’re cooking up something special just for you. <br />
          Don’t go too far! Stay tuned!
        </p>

        <Link
          to="/"
          className="mt-4 underline text-blue-400 hover:no-underline hover:text-white font-medium
                     transition-all duration-300 ease-in-out
                     hover:bg-gradient-to-r from-blue-500 to-purple-600 hover:rounded-full
                     hover:px-6 hover:py-2 inline-block"
        >
          Let’s Explore While We Wait 🚀
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default ComingSoonPage;
