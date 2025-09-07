import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const devConnectRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Navigation handlers
  const handleGetStarted = () => {
    navigate("/login");
  };

  // Calculate underline width and trigger visibility
  useEffect(() => {
    setIsVisible(true);

    if (devConnectRef.current) {
      setUnderlineWidth(devConnectRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (devConnectRef.current) {
        setUnderlineWidth(devConnectRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full screen height minus header and centered */}
      <section className="h-[calc(100vh-5rem)] bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-orange-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div
            className="absolute top-0 right-0 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Main Content - Centered */}
          <div className="max-w-4xl mx-auto">
            {/* Main Heading - Smaller fonts and better colors */}
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight mb-6">
              Connect. Code. Collaborate:
              <br />
              <span className="text-2xl md:text-3xl text-gray-800">
                Find Your Perfect{" "}
              </span>
              <span className="relative inline-block text-orange-600">
                <span ref={devConnectRef}>Dev Partner</span>
                {/* Animated underline */}
                <span
                  className="absolute bottom-0 left-0 h-0.5 rounded-full bg-orange-600 transition-all duration-1500 ease-out"
                  style={{
                    width: isVisible ? `${underlineWidth}px` : "0px",
                    transitionDelay: "0.5s",
                  }}
                />
              </span>{" "}
              <span className="text-2xl md:text-3xl text-gray-800">Today</span>
            </h1>

            {/* Description - Smaller and better color */}
            <p className="text-base text-gray-800 leading-relaxed max-w-2xl mx-auto mb-8">
              Join the first dating platform designed exclusively for
              developers. Match based on tech stack, collaborate on projects,
              and build meaningful connections in the coding community.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary Button */}
              <button
                onClick={handleGetStarted}
                className="group bg-orange-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span className="inline-flex items-center">
                  Get Started Free
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
              </button>

              {/* Secondary Button */}
              <button className="group border-2 border-gray-800 text-gray-800 font-semibold px-8 py-3 rounded-full hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-105">
                <span className="inline-flex items-center">
                  Learn More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
              </button>
            </div>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent"></div>
      </section>

      {/* Additional Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-orange-600">DevTinder</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
              <div className="p-6 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors duration-300">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">⚡</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Smart Matching
                </h3>
                <p className="text-gray-700">
                  AI-powered algorithm matches you based on tech stack,
                  experience, and interests.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors duration-300">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">🤝</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Real Connections
                </h3>
                <p className="text-gray-700">
                  Build meaningful relationships with fellow developers who
                  share your passion.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors duration-300">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">🚀</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Collaborate & Grow
                </h3>
                <p className="text-gray-700">
                  Work on projects together and grow your skills while building
                  relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
