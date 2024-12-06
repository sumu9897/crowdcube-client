import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Animated 404 Number */}
      <div className="text-8xl font-extrabold text-gray-800 animate-bounce">
        404
      </div>

      {/* Message */}
      <p className="mt-4 text-xl text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Animated Button */}
      <Link to="/">
        <button className="mt-6 px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition-transform transform hover:scale-105">
          Go Back Home
        </button>
      </Link>

      {/* Floating Icon Animation */}
      <div className="absolute top-16 left-16 animate-floating">
        🌟
      </div>
      <div className="absolute bottom-16 right-16 animate-floating-slow">
        🚀
      </div>
    </div>
  );
};

export default NotFound;
