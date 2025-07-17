import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-white px-6">
      <h1 className="text-[8rem] font-extrabold text-indigo-400 animate-pulse">
        404
      </h1>

      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-100">
        Oops! Page Not Found
      </h2>

      <p className="text-center max-w-md text-base md:text-lg mb-6 text-gray-400">
        The page you're looking for doesn't exist or has been moved. But don't
        worry — you can return to the homepage and continue exploring.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-indigo-500 text-white font-medium rounded-full shadow-md hover:bg-indigo-600 transition-all duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
