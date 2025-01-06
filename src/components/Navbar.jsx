import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import { IoIosLogIn } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile menu state
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
    <nav className="fixed w-full bg-primary top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-white text-xl font-bold">
            Crowdcube
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-gray-200">
              Home
            </Link>
            <Link to="/campaigns" className="text-white hover:text-gray-200">
              All Campaigns
            </Link>
            <Link to="/about" className="text-white hover:text-gray-200">
              About Us
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4 relative">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-white hidden md:block">
                    {user.displayName || user.name}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                    <Link
                      to="/addCampaign"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Add Campaign
                    </Link>
                    <Link
                      to="/myCampaign"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Campaigns
                    </Link>
                    <Link
                      to="/myDonations"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Donations
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signin"
                className="bg-gray-100 text-blue-600 flex items-center gap-4 px-4 py-2 rounded"
              >
                <IoIosLogIn className="size-6" />
                Login
              </Link>
            )}
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white text-2xl focus:outline-none"
            >
              <GiHamburgerMenu />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-primary">
            <div className="flex flex-col space-y-4 px-4 pb-4">
              <Link
                to="/"
                className="text-white hover:text-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/campaigns"
                className="text-white hover:text-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Campaigns
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              {user && (
                <>
                  <Link
                    to="/addCampaign"
                    className="text-white hover:text-gray-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Add Campaign
                  </Link>
                  <Link
                    to="/myCampaign"
                    className="text-white hover:text-gray-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Campaigns
                  </Link>
                  <Link
                    to="/myDonations"
                    className="text-white hover:text-gray-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Donations
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
