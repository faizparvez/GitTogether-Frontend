import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed, removeUserFromFeed } from "../redux/feedSlice";
import SwipeableCard from "./SwipeableCard";

/**
 * Feed Component - Updated layout with integrated buttons and light blue background
 * Buttons are built into the layout and positioned in the middle of available space
 */
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  // Fetch feed data
  const getFeed = async () => {
    if (feed) return;

    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  // Handle card swipe
  const handleSwipe = (userId) => {
    dispatch(removeUserFromFeed(userId));
  };

  // Handle button actions
  const handleButtonAction = async (action) => {
    if (!feed || feed.length === 0) return;

    const currentUser = feed[0];
    try {
      await axios.post(
        `${BASE_URL}/request/send/${action}/${currentUser._id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(currentUser._id));
    } catch (err) {
      console.error("Action failed:", err);
      dispatch(removeUserFromFeed(currentUser._id));
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // Loading state - with light blue background
  if (!feed) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Light blue gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200"></div>
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-300/50 via-blue-200/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-200/60 via-blue-100/40 to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-0 w-1/4 bg-gradient-to-r from-blue-200/40 via-blue-100/20 to-transparent"></div>
        <div className="absolute top-0 bottom-0 right-0 w-1/4 bg-gradient-to-l from-blue-200/40 via-blue-100/20 to-transparent"></div>
        <div className="absolute top-1/4 bottom-1/4 left-1/4 right-1/4 bg-gradient-to-br from-blue-50/60 via-blue-100/30 to-blue-50/40 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-200/25 rounded-full blur-2xl"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium">Loading profiles...</p>
        </div>
      </div>
    );
  }

  // Empty state - Updated with light blue background
  if (feed.length === 0) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        {/* Light blue gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200"></div>
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-300/50 via-blue-200/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-200/60 via-blue-100/40 to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-0 w-1/4 bg-gradient-to-r from-blue-200/40 via-blue-100/20 to-transparent"></div>
        <div className="absolute top-0 bottom-0 right-0 w-1/4 bg-gradient-to-l from-blue-200/40 via-blue-100/20 to-transparent"></div>
        <div className="absolute top-1/4 bottom-1/4 left-1/4 right-1/4 bg-gradient-to-br from-blue-50/60 via-blue-100/30 to-blue-50/40 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-200/25 rounded-full blur-2xl"></div>

        <div className="relative z-10 text-center max-w-sm">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            No More Profiles
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            You've seen all available developers. Check back later for new
            profiles!
          </p>
          <Link
            to="/connections"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            View Your Connections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Light blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200"></div>
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-300/50 via-blue-200/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-200/60 via-blue-100/40 to-transparent"></div>
      <div className="absolute top-0 bottom-0 left-0 w-1/4 bg-gradient-to-r from-blue-200/40 via-blue-100/20 to-transparent"></div>
      <div className="absolute top-0 bottom-0 right-0 w-1/4 bg-gradient-to-l from-blue-200/40 via-blue-100/20 to-transparent"></div>
      <div className="absolute top-1/4 bottom-1/4 left-1/4 right-1/4 bg-gradient-to-br from-blue-50/60 via-blue-100/30 to-blue-50/40 rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-300/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-200/25 rounded-full blur-2xl"></div>

      {/* Main Content Container - Integrated Layout */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-20">
        {/* Left Side Space - PASS Button in middle of left space */}
        <div className="flex-1 flex justify-center items-center">
          <button
            onClick={() => handleButtonAction("ignored")}
            className="group flex flex-col items-center space-y-3"
            disabled={feed.length === 0}
          >
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-all duration-300 hover:scale-110">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
            <div className="text-center opacity-70 group-hover:opacity-100 transition-opacity">
              <p className="text-gray-700 font-semibold text-sm">PASS</p>
              <p className="text-gray-500 text-xs">Swipe left</p>
            </div>
          </button>
        </div>

        {/* Card Stack - Centered, fixed width */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          {feed.slice(0, 3).map((user, index) => (
            <SwipeableCard
              key={user._id}
              user={user}
              onSwipe={handleSwipe}
              isTopCard={index === 0}
              zIndex={30 - index}
            />
          ))}
        </div>

        {/* Right Side Space - CONNECT Button in middle of right space */}
        <div className="flex-1 flex justify-center items-center">
          <button
            onClick={() => handleButtonAction("interested")}
            className="group flex flex-col items-center space-y-3"
            disabled={feed.length === 0}
          >
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-500 transition-all duration-300 hover:scale-110">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <div className="text-center opacity-70 group-hover:opacity-100 transition-opacity">
              <p className="text-blue-600 font-semibold text-sm">CONNECT</p>
              <p className="text-gray-500 text-xs">Swipe right</p>
            </div>
          </button>
        </div>
      </div>

      {/* Profile Counter - Still fixed at top right */}
      {feed.length > 0 && (
        <div className="fixed top-24 right-6 bg-white/95 backdrop-blur-sm border border-gray-200 text-gray-700 px-4 py-2 rounded-full shadow-lg z-40">
          <span className="text-sm font-medium">
            {feed.length} profile{feed.length !== 1 ? "s" : ""} left
          </span>
        </div>
      )}

      {/* Instructions - Below card, part of the feed component */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="text-center bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <p className="text-gray-600 text-sm font-medium">
            Drag the card or use side arrows to choose
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feed;