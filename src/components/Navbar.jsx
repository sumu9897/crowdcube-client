import React from "react";
import { FaHome, FaListAlt, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-2xl font-bold">
          <a href="/" className="hover:text-yellow-400 transition">
            DonationHub
          </a>
        </div>

        {/* Menu Links */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <a
              href="/"
              className="flex items-center space-x-2 hover:text-yellow-400 transition"
            >
              <FaHome />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a
              href="/campaigns"
              className="flex items-center space-x-2 hover:text-yellow-400 transition"
            >
              <FaListAlt />
              <span>Campaigns</span>
            </a>
          </li>
          <li>
            <a
              href="/profile"
              className="flex items-center space-x-2 hover:text-yellow-400 transition"
            >
              <FaUserCircle />
              <span>Profile</span>
            </a>
          </li>
        </ul>

        {/* Login/Register Section */}
        <div className="space-x-4 hidden md:block">
          <a
            href="/signin"
            className="px-4 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition"
          >
            Login
          </a>
          <a
            href="/signup"
            className="px-4 py-2 border border-yellow-400 rounded hover:bg-yellow-400 hover:text-gray-900 transition"
          >
            Register
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-xl">
            <span>&#9776;</span> {/* Burger Icon */}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
