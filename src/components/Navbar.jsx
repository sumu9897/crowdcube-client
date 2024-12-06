import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { NavLink } from 'react-router-dom'; 
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const { user , logOut}= useContext(AuthContext)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logOut()
    .then(() => {
      toast.success('Successfully logged out!');
    })
    .catch((error) => {
      toast.error('Failed to log out. Please try again.');
      console.error(error);
    });
};

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-white text-xl font-bold">
            <a href="/">Crowdcube</a>
          </div>

          {/* Navigation Links for Desktop */}
          <div className="hidden md:flex space-x-6">
            <a
              href="/"
              className="text-white hover:text-gray-200 transition duration-200"
            >
              Home
            </a>
            <a
              href="/campaigns"
              className="text-white hover:text-gray-200 transition duration-200"
            >
              All Campaigns
            </a>
            <a
              href="/addCampaign"
              className="text-white hover:text-gray-200 transition duration-200"
            >
              Add Campaign
            </a>
            <a
              href="/myCampaign"
              className="text-white hover:text-gray-200 transition duration-200"
            >
              My Campaigns
            </a>
            <a
              href="/myDonations"
              className="text-white hover:text-gray-200 transition duration-200"
            >
              My Donations
            </a>
          </div>

          {/* Conditional Buttons for Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <a
                  href="/signin"
                  className="bg-gray-100 text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition duration-200"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition duration-200"
                >
                  Register
                </a>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  title={user.displayName}
                />
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Collapsible Menu for Mobile */}
        {isOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 px-4 pb-4">
              <a
                href="/"
                className="text-white hover:text-gray-200 transition duration-200"
              >
                Home
              </a>
              <a
                href="/campaigns"
                className="text-white hover:text-gray-200 transition duration-200"
              >
                All Campaigns
              </a>
              <a
                href="/addCampaign"
                className="text-white hover:text-gray-200 transition duration-200"
              >
                Add Campaign
              </a>
              <a
                href="/myCampaign"
                className="text-white hover:text-gray-200 transition duration-200"
              >
                My Campaigns
              </a>
              <a
                href="/myDonations"
                className="text-white hover:text-gray-200 transition duration-200"
              >
                My Donations
              </a>

              {/* Conditional Buttons for Mobile */}
              {!isLoggedIn ? (
                <>
                  <a
                    href="/signin"
                    className="bg-gray-100 text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition duration-200"
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition duration-200"
                  >
                    Register
                  </a>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
