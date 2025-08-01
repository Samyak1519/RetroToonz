<<<<<<< HEAD
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
=======
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
>>>>>>> 3ea8f468a04a22cbae3c34b1da6d24830d81c8ba

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center  text-white font-nunito px-6 text-center">
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <p className="text-xl mb-6">
          Sorry, the page you are looking for does not exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-cosmicPurle hover:bg-deepteal transition px-6 py-3 rounded-lg shadow-card-glow"
        >
          <FaArrowLeft />
          Go Back Home
        </button>
      </div>
      <Footer />
    </>
  );
}

export default ErrorPage;
