import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      {/* Animated 404 Number */}
      <div className="text-9xl font-extrabold text-gray-800 animate-pulse">
        404
      </div>

      {/* Message */}
      <p className="mt-6 text-2xl text-gray-600 font-semibold">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Call-to-Action Button */}
      <Link to="/">
        <button className="mt-8 px-8 py-3 text-lg text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300">
          Go Back Home
        </button>
      </Link>

      {/* Floating Icons Animation */}
      <div className="absolute top-16 left-10 animate-bounce-slow">
        🌟
      </div>
      <div className="absolute bottom-16 right-10 animate-bounce-fast">
        🚀
      </div>
    </div>
  );
};

export default NotFound;
