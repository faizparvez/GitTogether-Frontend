import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

// --- Reusable SVG Icon Components for Inputs ---
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);
const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);
const AtIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
    />
  </svg>
);

/**
 * The Login component provides a clean, animated, and user-friendly interface
 * for users to sign in or create a new account for the GitTogether platform.
 */
const Login = () => {
  // --- State Management ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");

  // --- Hooks ---
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- API Handlers ---
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong during login.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong during sign up.");
    }
  };

  return (
    // The main container now uses the same sophisticated background as the Hero component.
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* --- New Multi-Layered Background Styling --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100"></div>
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-200/60 via-blue-100/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-100/50 via-blue-50/30 to-transparent"></div>
      <div className="absolute top-0 bottom-0 left-0 w-1/4 bg-gradient-to-r from-blue-100/50 via-blue-50/30 to-transparent"></div>
      <div className="absolute top-0 bottom-0 right-0 w-1/4 bg-gradient-to-l from-blue-100/50 via-blue-50/30 to-transparent"></div>
      <div className="absolute top-1/4 bottom-1/4 left-1/4 right-1/4 bg-gradient-to-br from-white/80 via-blue-50/40 to-white/60 rounded-full blur-3xl"></div>
      {/* --- End of Background Styling --- */}

      {/* The main authentication card with a subtle entrance animation */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-200/80">
          {/* Header Section without Logo */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 font-poppins">
              {isLoginForm ? "Welcome Back!" : "Create Your Account"}
            </h2>
            <p className="text-gray-500 mt-2">
              {isLoginForm
                ? "Log in to find your next collaborator."
                : "Join our community of developers."}
            </p>
          </div>

          {/* Login/Sign Up Form */}
          <form
            onSubmit={isLoginForm ? handleLogin : handleSignUp}
            className="space-y-6"
          >
            {!isLoginForm && (
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <UserIcon />
                  </span>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <UserIcon />
                  </span>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>
              </div>
            )}

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <AtIcon />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockIcon />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>

            {error && (
              <div className="bg-red-100 border border-red-300 rounded-lg p-3 text-center">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all transform hover:scale-105"
            >
              {isLoginForm ? "Log In" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-8">
            {isLoginForm
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setIsLoginForm(!isLoginForm);
                setError("");
              }}
              className="font-semibold text-blue-600 hover:underline"
            >
              {isLoginForm ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
