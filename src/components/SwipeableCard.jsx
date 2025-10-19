import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

/**
 * SwipeableCard Component - Beautiful profile card with HTML design
 * Keeps all existing animations and logic, only updates the visual design
 */
const SwipeableCard = ({ user, onSwipe, isTopCard, zIndex }) => {
  // State for drag functionality (KEEPING ALL EXISTING LOGIC)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Handle swipe action (UNCHANGED)
  const handleSwipeAction = async (action) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${action}/${user._id}`,
        {},
        { withCredentials: true }
      );
      onSwipe(user._id);
    } catch (err) {
      console.error("Swipe failed:", err);
      onSwipe(user._id);
    }
  };

  // Mouse events (UNCHANGED)
  const handleMouseDown = (e) => {
    if (!isTopCard) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isTopCard) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    if (!isDragging || !isTopCard) return;
    setIsDragging(false);

    if (Math.abs(dragOffset.x) > 120) {
      const action = dragOffset.x > 0 ? "interested" : "ignored";
      handleSwipeAction(action);
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  // Touch events (UNCHANGED)
  const handleTouchStart = (e) => {
    if (!isTopCard) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !isTopCard) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStart.x;
    const deltaY = touch.clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleTouchEnd = () => {
    if (!isDragging || !isTopCard) return;
    setIsDragging(false);

    if (Math.abs(dragOffset.x) > 120) {
      const action = dragOffset.x > 0 ? "interested" : "ignored";
      handleSwipeAction(action);
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  // Add mouse event listeners (UNCHANGED)
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  // Calculate rotation and swipe indicators (UNCHANGED LOGIC)
  const rotation = dragOffset.x * 0.05;
  const opacity = Math.min(Math.abs(dragOffset.x) / 120, 1);
  const isSwipingRight = dragOffset.x > 60;
  const isSwipingLeft = dragOffset.x < -60;

  return (
    <div
      className={`absolute w-80 h-auto max-w-sm cursor-grab ${
        isDragging ? "cursor-grabbing" : ""
      } ${!isTopCard ? "pointer-events-none" : ""}`}
      style={{
        zIndex: zIndex,
        transform: `translate(${dragOffset.x}px, ${
          dragOffset.y
        }px) rotate(${rotation}deg) scale(${isTopCard ? 1 : 0.95})`,
        opacity: isTopCard ? 1 : 0.7,
        transition: isDragging ? "none" : "all 0.3s ease-out",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Swipe Indicators - UPDATED: CONNECT in blue instead of LIKE in green */}
      {isDragging && isSwipingRight && (
        <div
          className="absolute -top-2 -right-2 z-50 bg-blue-500 text-white px-4 py-2 rounded-full font-bold text-sm transform rotate-12 shadow-lg"
          style={{ opacity: opacity }}
        >
          💙 CONNECT
        </div>
      )}

      {isDragging && isSwipingLeft && (
        <div
          className="absolute -top-2 -left-2 z-50 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm transform -rotate-12 shadow-lg"
          style={{ opacity: opacity }}
        >
          ❌ PASS
        </div>
      )}

      {/* MAIN CARD - NEW DESIGN MATCHING YOUR HTML */}
      <div className="w-full bg-white rounded-2xl shadow-2xl border-2 border-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/10 group">
        {/* Top Banner Section */}
        <div className="relative h-28 bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-2xl">
          {/* Profile Picture with Overlap - CLICKABLE */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <Link
              to={`/profile/${user._id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={user.photoURL}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-110 cursor-pointer"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.firstName + " " + user.lastName
                  )}&background=3b82f6&color=ffffff&size=200`;
                }}
              />
              {/* Active Status Indicator */}
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </Link>
          </div>
        </div>

        {/* User Info Section - CLICKABLE NAME */}
        <div className="pt-16 pb-4 px-6 text-center">
          <Link
            to={`/profile/${user._id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-poppins font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
              {user.firstName} {user.lastName}
            </h2>
          </Link>
          {/* Show role/title if available, fallback to "Developer" */}
          <p className="text-blue-600 font-semibold">
            {user.role || user.title || "Developer"}
          </p>
        </div>

        {/* AI-Generated Bio Section - Show if about exists */}
        {user.about && (
          <div className="px-6 pb-6 text-center border-b border-gray-200">
            <p className="text-gray-600 text-sm leading-relaxed">
              {user.about}
            </p>
          </div>
        )}

        {/* Details Grid Section - Show if experience or collaboration type exists */}
        {(user.experience || user.collaborationType) && (
          <div className="grid grid-cols-2 gap-4 p-6">
            {user.experience && (
              <div className="text-center">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Experience
                </h3>
                <span className="bg-gray-100 text-gray-800 text-sm font-bold px-4 py-1.5 rounded-full">
                  {user.experience}
                </span>
              </div>
            )}
            {user.collaborationType && (
              <div className="text-center">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Collaboration
                </h3>
                <span className="bg-gray-100 text-gray-800 text-sm font-bold px-4 py-1.5 rounded-full">
                  {user.collaborationType}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Tech Stack Section - Show if skills exist */}
        {user.skills && user.skills.length > 0 && (
          <div className="px-6 pb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 text-center">
              Top Skills
            </h3>
            <div className="flex justify-center flex-wrap gap-2">
              {user.skills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1.5 rounded-full"
                >
                  {skill}
                </span>
              ))}
              {user.skills.length > 4 && (
                <span className="text-gray-500 text-xs self-center">
                  +{user.skills.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* AI-Extracted Interests Section - Show if interests exist */}
        {user.interests && user.interests.length > 0 && (
          <div className="px-6 pb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 text-center">
              Interests
            </h3>
            <div className="flex justify-center flex-wrap gap-2">
              {user.interests.slice(0, 3).map((interest, index) => (
                <span
                  key={index}
                  className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1.5 rounded-full"
                >
                  {interest}
                </span>
              ))}
              {user.interests.length > 3 && (
                <span className="text-gray-500 text-xs self-center">
                  +{user.interests.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Additional Info Section - Show age and gender if available */}
        {(user.age || user.gender) && (
          <div className="px-6 pb-6 text-center border-t border-gray-200 pt-4">
            <div className="flex justify-center items-center space-x-4 text-sm text-gray-600">
              {user.age && <span>Age: {user.age}</span>}
              {user.age && user.gender && <span>•</span>}
              {user.gender && <span>{user.gender}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwipeableCard;
