import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoURL, age, gender, about } = user;

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Main card with black border to match swipeable cards */}
      <div className="bg-white rounded-xl shadow-xl border-2 border-black overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        {/* Header section with blue gradient */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 relative">
          <div className="flex items-center space-x-4">
            {/* Profile image */}
            <div className="flex-shrink-0">
              <img
                src={
                  photoURL ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    firstName + " " + lastName
                  )}&background=ffffff&color=3b82f6&size=64`
                }
                alt={`${firstName} ${lastName}`}
                className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    firstName + " " + lastName
                  )}&background=ffffff&color=3b82f6&size=64`;
                }}
              />
            </div>

            {/* Name and basic info */}
            <div className="flex-grow">
              <h3 className="font-poppins font-bold text-white text-xl leading-tight">
                {firstName} {lastName}
              </h3>
              {age && gender && (
                <p className="text-white/90 text-sm font-medium mt-1">
                  {age}, {gender}
                </p>
              )}
            </div>
          </div>

          {/* Decorative dots */}
          <div className="absolute top-4 right-4">
            <svg
              className="w-6 h-6 text-white/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </div>
        </div>

        {/* Body section */}
        <div className="p-6 bg-white">
          {/* About section */}
          {about && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                About
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                {about}
              </p>
            </div>
          )}

          {/* Status/Skills placeholder */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
              Developer
            </span>
            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
              Available
            </span>
            <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
              Open to collaborate
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button className="flex-1 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm">
              Connect
            </button>
            <button className="flex-1 border-2 border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors duration-200 text-sm">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
