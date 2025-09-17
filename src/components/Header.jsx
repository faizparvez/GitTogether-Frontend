import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../redux/userSlice";

// --- The Final 'GitTogether' Header Component ---
const Header = () => {
  // --- State and Hooks ---
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // --- Effects ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- API and Event Handlers ---
  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // --- JSX Rendering ---
  return (
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
        {user && (
          <nav className="hidden md:flex items-center gap-8">
            {/* The navigation links now have increased font size */}
            <Link
              to="/profile"
              className="relative font-bold text-gray-800 hover:text-blue-500 group transition-colors duration-300 text-base"
            >
              Profile
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/connections"
              className="relative font-bold text-gray-800 hover:text-blue-500 group transition-colors duration-300 text-base"
            >
              Connections
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/requests"
              className="relative font-bold text-gray-800 hover:text-blue-500 group transition-colors duration-300 text-base"
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
                {/* The welcome text now has increased font size */}
                <span className="font-semibold text-gray-800 hidden sm:block text-base">
                  Welcome, {user.firstName}
                </span>
              </div>
              {/* The logout button text now has increased font size */}
              <button
                onClick={handleLogout}
                className="font-bold text-blue-600 border border-blue-500/50 rounded-lg px-5 py-2 hover:bg-blue-500/10 transition-colors duration-300 text-base"
              >
                Logout
              </button>
            </>
          ) : (
            // If the user is logged out, show Log In and Sign Up buttons
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="text-gray-800 hover:text-blue-500 font-medium px-4 py-2 rounded-lg transition-colors text-base"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-blue-500 text-white font-medium px-5 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-sm text-base"
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
