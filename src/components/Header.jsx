// Import necessary hooks and libraries from React, Redux, and React Router
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Import your project's constants and Redux actions
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../redux/userSlice";

// --- The Final 'GitTogether' Header Component ---
const Header = () => {
  // --- State and Hooks ---

  // Get the current user state from the Redux store
  const user = useSelector((store) => store.user);

  // Hooks for dispatching Redux actions and programmatic navigation
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to track if the page has been scrolled, for the sticky header effect
  const [isScrolled, setIsScrolled] = useState(false);

  // --- Effects ---

  // This effect adds a scroll event listener to the window.
  // It updates the 'isScrolled' state based on the scroll position.
  useEffect(() => {
    const handleScroll = () => {
      // If the user has scrolled more than 10px, set isScrolled to true
      setIsScrolled(window.scrollY > 10);
    };

    // Add the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- API and Event Handlers ---

  // Handles the user logout process
  const handleLogout = async () => {
    try {
      // Make a POST request to the logout endpoint
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });

      // Dispatch the Redux action to remove the user from the store
      dispatch(removeUser());

      // Navigate the user back to the homepage
      navigate("/");
    } catch (err) {
      // In a real app, you might navigate to an error page or show a notification
      console.error("Logout failed:", err);
    }
  };

  // --- JSX Rendering ---

  return (
    // The main header container. It's fixed, sticky, and transitions its background.
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-6 flex justify-between items-center">
        {/* Left Section: Logo and Brand Name */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="flex items-center space-x-3">
            <svg
              className="h-10 text-blue-500"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="25"
                cy="50"
                r="15"
                stroke="#111827"
                strokeWidth="10"
              />
              <circle
                cx="75"
                cy="50"
                r="15"
                stroke="currentColor"
                strokeWidth="10"
              />
              <line
                x1="40"
                y1="50"
                x2="60"
                y2="50"
                stroke="#111827"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-poppins text-2xl font-bold text-gray-900">
              GitTogether
            </span>
          </Link>
        </div>

        {/* Center Section: Main Navigation Links */}
        {/* These links only appear if a user is logged in */}
        {user && (
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/profile"
              className="relative font-semibold text-gray-600 hover:text-blue-500 group transition-colors duration-300"
            >
              Profile
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/connections"
              className="relative font-semibold text-gray-600 hover:text-blue-500 group transition-colors duration-300"
            >
              Connections
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/requests"
              className="relative font-semibold text-gray-600 hover:text-blue-500 group transition-colors duration-300"
            >
              Requests
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
        )}

        {/* Right Section: Authentication Status */}
        <div className="flex-1 flex justify-end items-center gap-4">
          {user ? (
            // If the user is logged in, show their info and a Logout button
            <>
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL}
                  alt={user.firstName}
                  className="w-9 h-9 rounded-full object-cover border-2 border-gray-300"
                />
                <span className="font-medium text-gray-700 hidden sm:block">
                  Welcome, {user.firstName}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gray-200 text-gray-700 font-semibold px-5 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            // If the user is logged out, show Log In and Sign Up buttons
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-500 font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-blue-500 text-white font-medium px-5 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
