import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../redux/userSlice";
import { removeFeed } from "../redux/feedSlice";

const Header = () => {
  // --- State and Hooks ---
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- API and Event Handlers ---
  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, { user }, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // --- JSX Rendering ---
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-sm">
      {/* Navbar */}
      <div className="py-5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and Brand Name */}
            <Link
              to="/"
              className="flex cursor-pointer items-center gap-3 group"
            >
              <svg
                className="h-10 w-10 rounded-lg transition-transform duration-300 group-hover:scale-110"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Git-inspired connection icon with gradient */}
                <rect width="100" height="100" rx="12" fill="#ff734d" />
                <circle
                  cx="30"
                  cy="50"
                  r="12"
                  stroke="#FFFFFF"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="70"
                  cy="50"
                  r="12"
                  stroke="#FFFFFF"
                  strokeWidth="6"
                  fill="none"
                />
                <line
                  x1="42"
                  y1="50"
                  x2="58"
                  y2="50"
                  stroke="#FFFFFF"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-xl md:text-2xl font-bold text-black">
                GitTogether
              </span>
            </Link>

            {/* Desktop Navigation - Centered (Always Visible) */}
            {!user && (
              <nav className="absolute left-1/2 hidden -translate-x-1/2 transform items-center gap-8 md:flex">
                <a
                  href="#product"
                  className="font-medium text-black transition-colors duration-300 hover:text-[#ff734d]"
                >
                  Product
                </a>
                <a
                  href="#workflow"
                  className="font-medium text-black transition-colors duration-300 hover:text-[#ff734d]"
                >
                  Workflow
                </a>
                <a
                  href="#testimonials"
                  className="font-medium text-black transition-colors duration-300 hover:text-[#ff734d]"
                >
                  Testimonials
                </a>
              </nav>
            )}
            {user && (
              <nav className="absolute left-1/2 hidden -translate-x-1/2 transform items-center gap-8 md:flex">
                <Link
                  to="/feed"
                  className="font-medium text-black transition-colors duration-300 hover:text-[#ff734d]"
                >
                  Browse
                </Link>
                <Link
                  to="/connections"
                  className="font-medium text-black transition-colors duration-300 hover:text-[#ff734d]"
                >
                  Connections
                </Link>
                <Link
                  to="/requests"
                  className="font-medium text-black transition-colors duration-300 hover:text-[#ff734d]"
                >
                  Requests
                </Link>
                <Link
                  to="/pricing"
                  className="font-medium text-black transition-colors duration-300 hover:text-[#ff734d]"
                >
                  Pricing
                </Link>
              </nav>
            )}

            {/* Desktop CTA Button - Right Aligned */}
            <div className="hidden md:flex">
              {user ? (
                <div className="flex items-center gap-3">
                  <Link
                    to={`/profile/${user._id}`}
                    className="group flex items-center gap-2"
                  >
                    <img
                      src={user.photoURL}
                      alt={user.firstName}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-200 group-hover:ring-[#ff734d] transition-all duration-300"
                    />
                    <span className="font-medium text-black/80 hidden lg:block text-sm">
                      {user.firstName}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="ml-2 inline-flex cursor-pointer items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 border border-gray-200 bg-white hover:bg-gray-50 hover:border-[#ff734d] h-10 px-5 text-gray-600 hover:text-[#ff734d]"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-primary group relative overflow-hidden"
                >
                  <span className="inline-flex items-center">
                    Log In
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="cursor-pointer md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="mt-4 border-t border-gray-200 pb-4 md:hidden">
              <nav className="flex flex-col gap-4 pt-4">
                {user ? (
                  <>
                    {/* User Profile in Mobile */}
                    <Link
                      to={`/profile/${user._id}`}
                      className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <img
                        src={user.photoURL}
                        alt={user.firstName}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-black text-sm">
                          {user.firstName} {user.lastName}
                        </span>
                        <span className="text-xs text-gray-500">
                          View Profile
                        </span>
                      </div>
                    </Link>

                    {/* Navigation Links */}
                    <Link
                      to="/feed"
                      className="py-2 text-center font-medium text-black/60 transition-colors duration-300 hover:text-[#ff734d]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Browse
                    </Link>
                    <Link
                      to="/connections"
                      className="py-2 text-center font-medium text-black/60 transition-colors duration-300 hover:text-[#ff734d]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Connections
                    </Link>
                    <Link
                      to="/requests"
                      className="py-2 text-center font-medium text-black/60 transition-colors duration-300 hover:text-[#ff734d]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Requests
                    </Link>
                    <Link
                      to="/pricing"
                      className="py-2 text-center font-medium text-black/60 transition-colors duration-300 hover:text-[#ff734d]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Pricing
                    </Link>

                    {/* Logout Button */}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="btn btn-primary group relative overflow-hidden"
                    >
                      <span className="inline-flex items-center">Logout</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="btn btn-primary group relative overflow-hidden"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="inline-flex items-center">
                      Log In
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </Link>
                )}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
