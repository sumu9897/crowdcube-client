import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Successfully logged out!"))
      .catch(() => toast.error("Failed to log out."));
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
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

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-gray-800 text-white text-sm px-2 py-1 rounded">
                    {user.displayName || user.email}
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
        </div>

        {/* Mobile menu */}
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
      </div>
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
