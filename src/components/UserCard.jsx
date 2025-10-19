import React from "react";

/**
 * UserCard Component - Profile preview card that only shows actual user data
 * Synchronized with form inputs to display real-time changes
 * Only renders sections when data is available - no placeholder content
 */
const UserCard = ({ user }) => {
  const {
    firstName,
    lastName,
    photoURL,
    age,
    gender,
    about,
    skills,
    experience,
    role,
    interests,
  } = user;

  // Don't render card if no basic info is available
  if (!firstName && !lastName) {
    return (
      <div className="w-full max-w-sm mx-auto">
        <div className="w-full bg-gray-100 rounded-2xl border-2 border-gray-300 p-8 text-center">
          <p className="text-gray-500">
            Fill in your profile information to see preview
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Main card container matching SwipeableCard design */}
      <div className="w-full bg-white rounded-2xl shadow-2xl border-2 border-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/10 group">
        {/* Top banner section - blue gradient background */}
        <div className="relative h-28 bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-2xl">
          {/* Profile picture - only show if photoURL exists or if we have a name for fallback */}
          {(photoURL || (firstName && lastName)) && (
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              <img
                src={
                  photoURL ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    (firstName || "") + " " + (lastName || "")
                  )}&background=3b82f6&color=ffffff&size=200`
                }
                alt={`${firstName || ""} ${lastName || ""}`}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    (firstName || "") + " " + (lastName || "")
                  )}&background=3b82f6&color=ffffff&size=200`;
                }}
              />
              {/* Active status indicator */}
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
          )}
        </div>

        {/* User info section - only show if name exists */}
        {(firstName || lastName) && (
          <div className="pt-16 pb-4 px-6 text-center">
            <h2 className="text-2xl font-poppins font-bold text-gray-900 hover:text-blue-600 transition-colors">
              {firstName} {lastName}
            </h2>
            {/* Only show role if it exists, otherwise show "Developer" as default */}
            <p className="text-blue-600 font-semibold">{role || "Developer"}</p>
          </div>
        )}

        {/* Bio/About section - only show if about text exists */}
        {about && about.trim() && (
          <div className="px-6 pb-6 text-center border-b border-gray-200">
            <p className="text-gray-600 text-sm leading-relaxed">{about}</p>
          </div>
        )}

        {/* Details grid section - only show if experience exists */}
        {experience && (
          <div className="p-6 border-b border-gray-200">
            <div className="text-center">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Experience
              </h3>
              <span className="bg-gray-100 text-gray-800 text-sm font-bold px-4 py-1.5 rounded-full">
                {experience}
              </span>
            </div>
          </div>
        )}

        {/* Tech stack section - only show if skills exist */}
        {skills && skills.length > 0 && (
          <div className="px-6 pb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 text-center">
              Skills
            </h3>
            <div className="flex justify-center flex-wrap gap-2">
              {skills.slice(0, 6).map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1.5 rounded-full"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 6 && (
                <span className="text-gray-500 text-xs self-center">
                  +{skills.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Interests section - only show if interests exist */}
        {interests && interests.length > 0 && (
          <div className="px-6 pb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 text-center">
              Interests
            </h3>
            <div className="flex justify-center flex-wrap gap-2">
              {interests.slice(0, 4).map((interest, index) => (
                <span
                  key={index}
                  className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1.5 rounded-full"
                >
                  {interest}
                </span>
              ))}
              {interests.length > 4 && (
                <span className="text-gray-500 text-xs self-center">
                  +{interests.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Additional info section - only show if age or gender exists */}
        {(age || gender) && (
          <div className="px-6 pb-6 text-center border-t border-gray-200 pt-4">
            <div className="flex justify-center items-center space-x-4 text-sm text-gray-600">
              {age && <span>Age: {age}</span>}
              {age && gender && <span>•</span>}
              {gender && <span>{gender}</span>}
            </div>
          </div>
        )}

        {/* Show message if only basic info is available */}
        {!about &&
          !skills &&
          !interests &&
          !experience &&
          !age &&
          !gender &&
          (firstName || lastName) && (
            <div className="px-6 pb-6 text-center text-gray-500 text-sm">
              Complete your profile to see more details here
            </div>
          )}
      </div>
    </div>
  );
};

export default UserCard;
