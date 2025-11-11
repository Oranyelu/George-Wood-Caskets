import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#135B3A] text-white px-6 rounded-b-[50px]">
      <h1 className="text-[120px] md:text-[200px] font-bold animate-pulse">404</h1>
      <h2 className="text-3xl md:text-5xl font-bold mt-4 text-[#F0B52E]">
        Page Not Found
      </h2>
      <p className="mt-2 text-center max-w-md text-gray-200">
        Oops! The page you’re looking for doesn’t exist or has been moved. 
        Don’t worry, we’ll guide you back.
      </p>
      <Link to="/" className="mt-6">
        <button className="flex items-center gap-2 bg-[#A37E2C] hover:bg-[#f0b52e] text-white font-semibold px-6 py-3 rounded shadow-lg transition-all duration-300">
          <FaHome /> Back to Home
        </button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
