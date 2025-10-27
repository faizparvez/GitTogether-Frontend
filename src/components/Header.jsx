import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../redux/userSlice";
import { removeFeed } from "../redux/feedSlice";

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
      dispatch(removeFeed());
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // --- JSX Rendering ---
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ease-in-out ${
        isScrolled ? "header-scrolled" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-6 flex justify-between items-center">
        {/* Left Section: Logo and Brand Name */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="flex items-center space-x-3 group">
            <svg
              className="h-10 text-[#6366f1] transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="25"
                cy="50"
                r="15"
                stroke="#fafafa"
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
                stroke="#fafafa"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-2xl font-bold text-[#fafafa] transition-colors duration-300 group-hover:text-[#6366f1]">
              GitTogether
            </span>
          </Link>
        </div>

        {/* Center Section: Main Navigation Links */}
        {user && (
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/feed"
              className="relative font-semibold text-[#fafafa] hover:text-[#6366f1] group transition-colors duration-300 text-sm"
            >
              Browse
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6366f1] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/connections"
              className="relative font-semibold text-[#fafafa] hover:text-[#6366f1] group transition-colors duration-300 text-sm"
            >
              Connections
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6366f1] transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/requests"
              className="relative font-semibold text-[#fafafa] hover:text-[#6366f1] group transition-colors duration-300 text-sm"
            >
              Requests
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6366f1] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
        )}

        {/* Right Section: Authentication Status */}
        <div className="flex-1 flex justify-end items-center gap-4">
          {user ? (
            // If the user is logged in, show their info and a Logout button
            <>
              <div className="flex items-center gap-3">
                <Link to="/profile" className="group">
                  <img
                    src={user.photoURL}
                    alt={user.firstName}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-[#3f3f46] group-hover:ring-[#6366f1] transition-all duration-300"
                  />
                </Link>
                <span className="font-medium text-[#fafafa] hidden sm:block text-sm">
                  Welcome, {user.firstName}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1] border border-[#3f3f46] bg-[#27272a] hover:bg-[#3f3f46] hover:text-[#fafafa] h-9 px-4 text-[#a1a1aa]"
              >
                Logout
              </button>
            </>
          ) : (
            // If the user is logged out, show Log In button
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1] bg-[#6366f1] text-white hover:bg-[#6366f1]/90 h-9 px-6 shadow-sm"
              >
                Log In
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
