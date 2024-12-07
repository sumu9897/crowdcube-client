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
    <nav className="bg-blue-600 shadow-lg ">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-white text-xl font-bold">
            Crowdcube
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-gray-200">
              Home
            </Link>
            <Link to="/campaigns" className="text-white hover:text-gray-200">
              All Campaigns
            </Link>
            {user && (
              <>
                <Link
                  to="/addCampaign"
                  className="text-white hover:text-gray-200"
                >
                  Add Campaign
                </Link>
                <Link
                  to="/myCampaign"
                  className="text-white hover:text-gray-200"
                >
                  My Campaigns
                </Link>
                <Link
                  to="/myDonations"
                  className="text-white hover:text-gray-200"
                >
                  My Donations
                </Link>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <img
                    src={user?.photo || "/default-avatar.png"} // Default avatar
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-gray-800 text-white text-sm px-2 py-1 rounded">
                    {user?.displayName || "Anonymous"} {/* Fallback if no displayName */}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="bg-gray-100 text-blue-600 px-4 py-2 rounded"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-blue-600 px-4 py-2 rounded"
                >
                  Register
                </Link>
              </>
            )}
          </div>

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

        {isOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 px-4 pb-4">
              <Link to="/" className="text-white hover:text-gray-200">
                Home
              </Link>
              <Link to="/campaigns" className="text-white hover:text-gray-200">
                All Campaigns
              </Link>
              {user && (
                <>
                  <Link
                    to="/addCampaign"
                    className="text-white hover:text-gray-200"
                  >
                    Add Campaign
                  </Link>
                  <Link
                    to="/myCampaign"
                    className="text-white hover:text-gray-200"
                  >
                    My Campaigns
                  </Link>
                  <Link
                    to="/myDonations"
                    className="text-white hover:text-gray-200"
                  >
                    My Donations
                  </Link>
                </>
              )}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="bg-gray-100 text-blue-600 px-4 py-2 rounded"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-white text-blue-600 px-4 py-2 rounded"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
