import { Link } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center font-montserrat transition-colors duration-300">
      <div className="animate-bounce mb-8">
        <FaExclamationTriangle className="text-6xl text-[#D4AF37]" />
      </div>

      <h1 className="text-6xl md:text-8xl font-bold text-[#135B3A] dark:text-green-500 mb-4 font-serif">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-6">Page Not Found</h2>

      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8 text-lg">
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-[#135B3A] text-white px-8 py-3 rounded-full font-bold hover:bg-[#0f462c] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        <FaHome /> Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
