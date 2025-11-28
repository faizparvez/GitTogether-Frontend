import React from "react";
import { Link } from "react-router-dom";

const SwipeableCard = ({
  user,
  isTopCard,
  zIndex,
  isExiting,
  exitDirection,
}) => {
  const getExitTransform = () => {
    if (!isExiting) {
      return isTopCard ? "scale(1)" : "scale(0.95)";
    }

    if (exitDirection === "right") {
      return "translateX(500px) rotate(20deg) scale(0.8)";
    } else if (exitDirection === "left") {
      return "translateX(-500px) rotate(-20deg) scale(0.8)";
    }
    return "scale(1)";
  };

  return (
    <div
      className="absolute w-80 h-auto mt-10 max-w-sm will-change-transform"
      style={{
        zIndex,
        contain: "layout style paint",
        transform: getExitTransform(),
        opacity: isTopCard ? (isExiting ? 0 : 1) : 0.7,
        transition: isExiting
          ? "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
          : "all 0.3s ease-out",
      }}
    >
      {/* Exit Badge */}
      {/* {isExiting && (
        <div
          className={`absolute -top-4 ${
            exitDirection === "right" ? "-right-4" : "-left-4"
          } z-50 px-4 py-2 rounded-xl font-bold text-sm shadow-orange-lg ${
            exitDirection === "right"
              ? "bg-gradient-to-r from-[#ff734d] to-[#d64000] text-white"
              : "bg-gradient-to-r from-red-500 to-red-600 text-white"
          }`}
          style={{
            transform:
              exitDirection === "right" ? "rotate(12deg)" : "rotate(-12deg)",
            opacity: isExiting ? 1 : 0,
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          {exitDirection === "right" ? "🤝 CONNECT" : "❌ PASS"}
        </div>
      )} */}

      {/* MAIN CARD */}
      <div className="w-full rounded-2xl border border-[rgba(255,115,77,0.2)] bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
        
        {/* Top Banner with Gradient */}
        <div className="relative h-28 bg-gradient-to-br from-[#EAEEFE] to-[#ff734d] overflow-hidden">
          {/* Decorative Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
          </div>

          {/* Profile Picture */}
          <div className="absolute left-1/2 top-2  -translate-x-1/2">
              <div className="relative">
                <img
                  src={user.photoURL}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-24 h-24 rounded-full object-cover border-1 border-white shadow-sm transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.firstName + " " + user.lastName
                    )}&background=ff734d&color=ffffff&size=200`;
                  }}
                />

                {/* Premium Badge */}
                {user.isPremium && (
                  <div className="absolute -top-1 -right-1 w-7 h-7 bg-gradient-to-r from-[#ff734d] to-[#d64000] rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                    <span className="text-white text-xs font-bold">⭐</span>
                  </div>
                )}
              </div>
          </div>
        </div>

        {/* NAME + TITLE */}
        <div className="pt-3 pb-3 px-6 text-center border-b border-[rgba(255,115,77,0.1)]">
         
            <h2 className="text-2xl font-bold text-[#010D3E] leading-tight">
              {user.firstName} {user.lastName}
            </h2>
          
          {/* Location */}
          {user.location && (
            <p className="text-sm text-[#000000] opacity-70 mt-2 flex items-center justify-center gap-1">
              <svg className="w-4 h-4 text-[#ff734d]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {user.location}
            </p>
          )}

          {/* Experience Level Badge */}
          {user.experienceLevel && (
            <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-white border border-[rgba(255,115,77,0.2)]">
              <span className="text-xs font-semibold text-[#ff734d]">
                {user.experienceLevel}
              </span>
            </div>
          )}
        </div>

        {/* AGE / GENDER - Footer Stats */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#EAEEFE] to-[#F3F7FF]">
          <div className="flex justify-center items-center space-x-4 text-sm">
            {user.age && (
              <div className="flex items-center gap-1.5 text-[#010D3E] font-medium">
                <svg className="w-4 h-4 text-[#ff734d]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span>{user.age} yrs</span>
              </div>
            )}
            
            {user.age && user.gender && (
              <span className="text-[#000000] opacity-30">•</span>
            )}
            
            {user.gender && (
              <div className="flex items-center gap-1.5 text-[#010D3E] font-medium">
                <svg className="w-4 h-4 text-[#ff734d]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
                <span>{user.gender}</span>
              </div>
            )}

            {/* Membership Badge */}
            {user.membershipType && (
              <>
                <span className="text-[#000000] opacity-30">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center border-[#ff734d] border-1 rounded-md bg-white text-[#d64000] text-md font-bold px-2 py-1">
                    {user.membershipType}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ABOUT */}
        {user.about && (
          <div className="px-6 py-4 text-center border-b border-[rgba(255,115,77,0.1)]">
            <p className="text-sm text-[#010D3E] leading-relaxed line-clamp-3">
              {user.about}
            </p>
          </div>
        )}

        {/* LOOKING FOR */}
        {user.lookingFor && user.lookingFor.length > 0 && (
          <div className="px-6 py-4 border-b border-[rgba(255,115,77,0.1)]">
            <h3 className="text-xs font-bold text-[#000000] opacity-60 uppercase tracking-wider mb-3 text-center">
              Looking For
            </h3>
            <div className="flex justify-center flex-wrap gap-2">
              {user.lookingFor.slice(0, 3).map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-lg bg-gradient-to-r from-[#ff734d] to-[#d64000] text-white text-xs font-semibold px-3 py-1.5 shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* SKILLS */}
        {/* {user.skills && user.skills.length > 0 && (
          <div className="px-6 py-4 border-b border-[rgba(255,115,77,0.1)]">
            <h3 className="text-xs font-bold text-[#000000] opacity-60 uppercase tracking-wider mb-3 text-center">
              Top Skills
            </h3>
            <div className="flex justify-center flex-wrap gap-2">
              {user.skills.slice(0, 6).map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-md bg-[#EAEEFE] text-[#010D3E] text-xs font-medium px-3 py-1.5 border border-[rgba(255,115,77,0.2)] hover:border-[rgba(255,115,77,0.4)] transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )} */}

        {/* INTERESTS */}
        {/* {user.interests && user.interests.length > 0 && (
          <div className="px-6 py-4 border-b border-[rgba(255,115,77,0.1)]">
            <h3 className="text-xs font-bold text-[#000000] opacity-60 uppercase tracking-wider mb-3 text-center">
              Interests
            </h3>
            <div className="flex justify-center flex-wrap gap-2">
              {user.interests.slice(0, 4).map((interest, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-md bg-white border border-[rgba(255,115,77,0.2)] text-[#000000] text-xs font-medium px-3 py-1.5"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )} */}

        {/* View Full Profile Button */}
        <div className="p-4">
          <Link
            to={`/profile/${user._id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="w-full py-2.5 px-4 cursor-pointer rounded-lg font-semibold text-sm bg-white border-2 border-[rgba(255,115,77,0.3)] text-[#ff734d] hover:bg-gradient-to-r hover:from-[#ff734d] hover:to-[#d64000] hover:text-white hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-md">
              View Full Profile →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SwipeableCard;