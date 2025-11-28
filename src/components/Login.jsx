import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

// --- Reusable SVG Icon Components for Inputs ---
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-[#000000] opacity-60"
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
    className="h-5 w-5 text-[#000000] opacity-60"
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
    className="h-5 w-5 text-[#000000] opacity-60"
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

const CodeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
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

  const user = useSelector((store) => store.user);

  // useEffect(() => {
  //   if (user) {
  //     navigate("/feed");
  //   }
  // }, [user, navigate]);

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
      navigate("/profile/edit");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong during sign up.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFE8D6] to-[#bc6a30]
">
      
      {/* The main authentication card */}
      <div className="relative z-10 w-full max-w-md animate-fade-in mt-15">
        <div className="rounded-2xl border border-[rgba(255,115,77,0.2)] bg-white/90 backdrop-blur-sm shadow-2xl shadow-[rgba(255,115,77,0.1)] p-8">
          {/* Header Section with Logo */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-[#010D3E]">
              {isLoginForm ? "Welcome Back!" : "Create Your Account"}
            </h2>
            <p className="text-sm text-[#000000] mt-2">
              {isLoginForm
                ? "Log in to find your next coding partner."
                : "Join thousands of developers building together."}
            </p>
          </div>

          {/* Login/Sign Up Form */}
          <div className="space-y-4">
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
                    className="w-full pl-10 pr-4 py-3 bg-[#F1F1F1] border border-[rgba(255,115,77,0.2)] rounded-lg text-[#010D3E] placeholder:text-[#000000] placeholder:opacity-60 focus:ring-2 focus:ring-[#ff734d] focus:outline-none focus:border-[#ff734d] transition-all"
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
                    className="w-full pl-10 pr-4 py-3 bg-[#F1F1F1] border border-[rgba(255,115,77,0.2)] rounded-lg text-[#010D3E] placeholder:text-[#000000] placeholder:opacity-60 focus:ring-2 focus:ring-[#ff734d] focus:outline-none focus:border-[#ff734d] transition-all"
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
                className="w-full pl-10 pr-4 py-3 bg-[#F1F1F1] border border-[rgba(255,115,77,0.2)] rounded-lg text-[#010D3E] placeholder:text-[#000000] placeholder:opacity-60 focus:ring-2 focus:ring-[#ff734d] focus:outline-none focus:border-[#ff734d] transition-all"
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
                className="w-full pl-10 pr-4 py-3 bg-[#F1F1F1] border border-[rgba(255,115,77,0.2)] rounded-lg text-[#010D3E] placeholder:text-[#000000] placeholder:opacity-60 focus:ring-2 focus:ring-[#ff734d] focus:outline-none focus:border-[#ff734d] transition-all"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center animate-fade-in">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              onClick={isLoginForm ? handleLogin : handleSignUp}
              className="w-full cursor-pointer inline-flex items-center justify-center rounded-lg text-base font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff734d] bg-gradient-to-r from-[#ff734d] to-[#d64000] text-white hover:opacity-90 hover:scale-[1.02] hover:shadow-xl hover:shadow-[rgba(255,115,77,0.3)] h-12 px-4 shadow-lg shadow-[rgba(255,115,77,0.2)]"
            >
              {isLoginForm ? "Log In" : "Create Account"}
            </button>
          </div>

          {/* Toggle Form Type */}
          <p className="text-center text-[#000000] text-sm mt-6">
            {isLoginForm
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setIsLoginForm(!isLoginForm);
                setError("");
              }}
              className="font-semibold cursor-pointer text-[#ff734d] hover:text-[#d64000] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff734d] rounded transition-colors"
            >
              {isLoginForm ? "Sign Up" : "Log In"}
            </button>
          </p>

          {/* Social Proof / Trust Badge */}
          <div className="mt-6 pt-6 border-t border-[rgba(255,115,77,0.1)]">
            <div className="flex items-center justify-center gap-2 text-xs text-[#000000]">
              <svg
                className="h-4 w-4 text-[#ff734d]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Trusted by 1000+ developers worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;