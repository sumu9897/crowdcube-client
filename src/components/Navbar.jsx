import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate(); // Use navigate for redirection

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Successfully logged out!");
        navigate("/"); // Redirect to home page
      })
      .catch(() => toast.error("Failed to log out."));
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white text-3xl font-semibold tracking-wide hover:text-blue-100">
            Crowdcube
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-white text-lg hover:text-gray-300">
              Home
            </Link>
            <Link to="/campaigns" className="text-white text-lg hover:text-gray-300">
              All Campaigns
            </Link>
            {user && (
              <>
                <Link to="/addCampaign" className="text-white text-lg hover:text-gray-300">
                  Add Campaign
                </Link>
                <Link to="/myCampaign" className="text-white text-lg hover:text-gray-300">
                  My Campaigns
                </Link>
                <Link to="/myDonations" className="text-white text-lg hover:text-gray-300">
                  My Donations
                </Link>
              </>
            )}
          </div>

          {/* User Menu / Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <div className="relative group">
                <img
                  src={user?.photo || "/default-avatar.png"} // Default avatar
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer hover:ring-4 ring-blue-500 transition-all"
                />
                <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-gray-800 text-white text-sm px-2 py-1 rounded shadow-lg">
                  {user?.displayName || "Anonymous"} {/* Fallback */}
                </span>
              </div>
            ) : (
              <>
                <Link to="/signin" className="bg-white text-blue-600 px-4 py-2 rounded-md text-lg font-medium hover:bg-gray-200 transition-all">
                  Login
                </Link>
                <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-blue-700 transition-all">
                  Register
                </Link>
              </>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-red-700 transition-all"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-800 text-white p-4 space-y-4">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/campaigns" className="hover:text-gray-300">All Campaigns</Link>
            {user && (
              <>
                <Link to="/addCampaign" className="hover:text-gray-300">Add Campaign</Link>
                <Link to="/myCampaign" className="hover:text-gray-300">My Campaigns</Link>
                <Link to="/myDonations" className="hover:text-gray-300">My Donations</Link>
              </>
            )}
            {user ? (
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all">
                Logout
              </button>
            ) : (
              <>
                <Link to="/signin" className="bg-gray-100 text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200 transition-all">
                  Login
                </Link>
                <Link to="/signup" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200 transition-all">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
