import React, { useState, useEffect } from "react";

/**
 * DeveloperCard is a reusable UI component to display a small developer profile.
 */
const DeveloperCard = ({ developer, position, rotation, animationDelay }) => {
  return (
    <div
      className={`absolute ${position} animate-subtle-float`}
      style={{ animationDelay }}
    >
      <div className={`transform ${rotation}`}>
        <div className="bg-white p-3 lg:p-4 rounded-xl shadow-xl border border-gray-200 w-40 lg:w-52 text-center hover:shadow-2xl transition-all duration-300">
          <img
            src={developer.imageUrl}
            className="w-14 h-14 lg:w-18 lg:h-18 rounded-full object-cover border-3 border-white shadow-md mx-auto mb-3"
            alt={developer.name}
          />
          <h3 className="font-bold text-gray-900 text-sm lg:text-base">
            {developer.name}
          </h3>
          <p className="text-blue-600 text-xs lg:text-sm font-medium">
            {developer.role}
          </p>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const animatedWords = ["Partner", "Collaborator", "Teammate", "Co-Founder"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const developers = [
    {
      name: "Priya Sharma",
      role: "Full Stack Dev",
      imageUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&auto=format&fit=crop",
    },
    {
      name: "Rohan Patel",
      role: "Frontend Engineer",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&h=150&auto=format&fit=crop",
    },
    {
      name: "Aisha Khan",
      role: "Backend Developer",
      imageUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&h=150&auto=format&fit=crop",
    },
    {
      name: "Vikram Singh",
      role: "DevOps Engineer",
      imageUrl:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=150&h=150&auto=format&fit=crop",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex(
        (prevIndex) => (prevIndex + 1) % animatedWords.length
      );
    }, 2500);
    return () => clearInterval(interval);
  }, [animatedWords.length]);

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 md:px-8 lg:px-12 py-8">
      {/* INSPIRED GRADIENT BACKGROUND - Different intensities like the reference image */}

      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100"></div>

      {/* Top section - darker blue area (like the reference) */}
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-200/60 via-blue-100/40 to-transparent"></div>

      {/* Bottom section - subtle blue tint */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-150/50 via-blue-50/30 to-transparent"></div>

      {/* Left side - subtle darker area */}
      <div className="absolute top-0 bottom-0 left-0 w-1/4 bg-gradient-to-r from-blue-100/50 via-blue-50/30 to-transparent"></div>

      {/* Right side - subtle darker area */}
      <div className="absolute top-0 bottom-0 right-0 w-1/4 bg-gradient-to-l from-blue-100/50 via-blue-50/30 to-transparent"></div>

      {/* Center area - lighter to make content pop */}
      <div className="absolute top-1/4 bottom-1/4 left-1/4 right-1/4 bg-gradient-to-br from-white/80 via-blue-25/40 to-white/60 rounded-full blur-3xl"></div>

      {/* Additional subtle accent areas */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-200/30 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-150/25 rounded-full blur-2xl"></div>

      {/* Floating cards - keeping original styling */}
      {/* <DeveloperCard
        developer={developers[0]}
        position="top-24 left-12 lg:top-32 lg:left-24"
        rotation="-rotate-6"
        animationDelay="0s"
      />
      <DeveloperCard
        developer={developers[1]}
        position="top-24 right-12 lg:top-32 lg:right-24"
        rotation="rotate-3"
        animationDelay="-2s"
      />
      <DeveloperCard
        developer={developers[2]}
        position="bottom-12 left-12 lg:bottom-18 lg:left-24"
        rotation="rotate-6"
        animationDelay="-4s"
      />
      <DeveloperCard
        developer={developers[3]}
        position="bottom-12 right-12 lg:bottom-16 lg:right-24"
        rotation="-rotate-6"
        animationDelay="-6s"
      /> */}

      {/* Main content */}
      <div className="text-center relative z-10 max-w-5xl mx-auto px-4">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-poppins font-bold tracking-tight text-gray-900 mb-6 lg:mb-8 leading-tight">
          Find Your Perfect <br />
          <span className="text-blue-600 inline-block">
            <span
              key={currentWordIndex}
              className="inline-block word-slide-animation"
            >
              {animatedWords[currentWordIndex]}
            </span>
          </span>
        </h1>

        <div className="max-w-3xl mx-auto mb-8 lg:mb-10">
          <p className="text-2xl lg:text-3xl text-gray-800 font-bold mb-6 lg:mb-8">
            Software Developers{" "}
            <span className="text-blue-600">get together</span> with{" "}
            <span className="font-bold text-gray-900">GitTogether.</span>
          </p>
          <p className="text-lg lg:text-xl text-gray-700 mb-8 lg:mb-10 leading-relaxed">
            Don't let great ideas stay on your local machine. Branch out and
            connect with a network of passionate software developers ready to
            collaborate. Find the perfect partner to bring your vision to life.
          </p>
        </div>

        <button className="bg-blue-600 text-white font-bold px-10 py-4 lg:px-12 lg:py-5 rounded-xl text-lg lg:text-xl shadow-xl shadow-blue-500/25 hover:scale-105 hover:bg-blue-700 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30">
          Discover Profiles
        </button>
      </div>
    </main>
  );
};

export default Hero;
