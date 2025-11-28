import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="bg-white/90 backdrop-blur-sm p-3 lg:p-4 rounded-xl shadow-xl border-2 border-[#ff734d] w-40 lg:w-52 text-center hover:shadow-2xl hover:shadow-[rgba(255,115,77,0.15)] transition-all duration-300">
          <img
            src={developer.imageUrl}
            className="w-14 h-14 lg:w-18 lg:h-18 rounded-full object-cover border-3 border-[#ff734d] shadow-md mx-auto mb-3"
            alt={developer.name}
          />
          <h3 className="font-bold text-[#010D3E] text-2xl lg:text-lg">
  {developer.name}
</h3>

<p className="text-[#000000] text-sm lg:text-xs">
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
  const navigate = useNavigate();

  const developers = [
    {
      name: "Priya Sharma",
      role: "Full Stack Developer",
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
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFF7F2] to-[#FFDCC2] px-6 md:px-8 lg:px-12 py-8">
      
      {/* Floating Developer Cards */}
      <DeveloperCard
        developer={developers[0]}
        position="top-24 left-12 lg:top-32 lg:left-24"
        rotation="-rotate-4"
        animationDelay="0s"
      />
      <DeveloperCard
        developer={developers[1]}
        position="top-32 right-12 lg:top-40 lg:right-24"
        rotation="rotate-2"
        animationDelay="-2s"
      />
      <DeveloperCard
        developer={developers[2]}
        position="bottom-20 left-22 lg:bottom-26 lg:left-34"
        rotation="rotate-3"
        animationDelay="-4s"
      />
      <DeveloperCard
        developer={developers[3]}
        position="bottom-12 right-20 lg:bottom-16 lg:right-32"
        rotation="-rotate-4"
        animationDelay="-6s"
      />

      {/* Main Content */}
      <div className="text-center relative z-10 max-w-5xl mx-auto px-4 py-20">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-poppins font-bold tracking-tight text-[#010D3E] mb-6 lg:mb-8 leading-tight">
          Find Your Perfect <br />
          <span className="inline-block">
            <span
              key={currentWordIndex}
              className="inline-block word-slide-animation bg-gradient-to-r from-[#ff734d] to-[#d64000]"
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {animatedWords[currentWordIndex]}
            </span>
          </span>
        </h1>

        <div className="max-w-3xl mx-auto mb-8 lg:mb-10">
          <p className="text-2xl lg:text-3xl text-[#010D3E] font-bold mb-6 lg:mb-8">
            Software Developers{" "}
            <span className="text-[#ff734d]">get together</span> with{" "}
            <span className="font-bold text-[#000000]">GitTogether.</span>
          </p>
          <p className="text-lg lg:text-xl text-[#000000] mb-8 lg:mb-10 leading-relaxed">
            Don't let great ideas stay on your local machine. Branch out and
            connect with a network of passionate software developers ready to
            collaborate. Find the perfect partner to bring your vision to life.
          </p>
        </div>

        <button onClick={() => navigate("/login")} className="cursor-pointer bg-gradient-to-r from-[#ff734d] to-[#d64000] text-white font-bold px-10 py-4 lg:px-12 lg:py-5 rounded-xl text-lg lg:text-xl shadow-xl shadow-[rgba(255,115,77,0.25)] hover:scale-105 hover:opacity-90 transition-all duration-300 hover:shadow-2xl hover:shadow-[rgba(255,115,77,0.3)]">
          Discover Profiles
        </button>
      </div>
    </main>
  );
};

export default Hero;