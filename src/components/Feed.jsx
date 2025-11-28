import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed, removeUserFromFeed } from "../redux/feedSlice";
import SwipeableCard from "./SwipeableCard";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  // NEW: controls which card is exiting + direction
  const [exiting, setExiting] = useState({
    userId: null,
    direction: null,
  });

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

  useEffect(() => {
    getFeed();
  }, []);

  // NEW: Trigger exit animation before removing user
  const triggerExit = (userId, direction) => {
    setExiting({ userId, direction });

    setTimeout(() => {
      dispatch(removeUserFromFeed(userId));
      setExiting({ userId: null, direction: null }); // reset
    }, 500); // matches SwipeableCard animation duration
  };

  const handleButtonAction = async (action) => {
    if (!feed || feed.length === 0) return;

    const currentUser = feed[0];

    const direction = action === "interested" ? "right" : "left";

    // trigger exit animation immediately
    triggerExit(currentUser._id, direction);

    try {
      await axios.post(
        `${BASE_URL}/request/send/${action}/${currentUser._id}`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Action failed:", err);
    }
  };

  // ------------------------------------------------------------------
  // LOADING UI
  // ------------------------------------------------------------------
  if (!feed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFE4D1] to-[#c26328]">
        <div className="flex flex-col items-center bg-white/60 backdrop-blur-xl px-10 py-8 rounded-2xl border border-[#ff734d33] shadow-orange-lg">
          <div className="w-12 h-12 border-4 border-[#ff734d] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[#010D3E] font-medium">Loading profiles...</p>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // EMPTY FEED UI
  // ------------------------------------------------------------------
  if (feed.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-[#FFE4D1] to-[#c26328]">
        <div className="bg-white/70 backdrop-blur-xl border border-[#ff734d33] shadow-orange-lg rounded-2xl max-w-md w-full">
          <div className="p-6 flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#ff734d22] rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-[#d64000]" />
            </div>
            <h3 className="text-2xl font-bold text-[#010D3E]">All Caught Up!</h3>
          </div>

          <div className="px-6 pb-4 text-[#00000099]">
            You’ve viewed all available developers. Check back later for more recommendations!
          </div>

          <div className="px-6 pb-6">
            <Link
              to="/connections"
              className="w-full inline-flex items-center justify-center bg-gradient-cta text-white rounded-lg py-3 shadow-orange-lg hover:brightness-110 transition-all"
            >
              View My Connections
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // MAIN FEED UI
  // ------------------------------------------------------------------
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#FFE4D1] to-[#c26328] overflow-x-hidden">

      <div className="relative flex items-center justify-center min-h-screen px-4 py-20">

        {/* LEFT BUTTON */}
       <div className="flex-1 flex justify-center mt-10">
  <div className="group flex flex-col items-center space-y-4">

    {/* ICON is the REAL button */}
    <button
      type="button"
      onClick={() => handleButtonAction("ignored")}
      disabled={feed.length === 0}
      className="
        w-16 h-16 rounded-2xl
        bg-white/80 backdrop-blur-sm
        border border-[rgba(255,115,77,0.2)]
        shadow-orange flex items-center justify-center
        hover:scale-110 hover:shadow-orange-lg
        transition-all duration-300
        cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      <ChevronLeft className="w-7 h-7 text-[#c26328]" strokeWidth={2.5} />
    </button>

    {/* TEXT — not clickable */}
    <div className="text-center opacity-70 group-hover:opacity-100 cursor-default">
      <p className="text-[#010D3E] font-bold text-lg">Pass</p>
      <p className="text-[#000000] opacity-60 text-sm">Swipe left</p>
    </div>

  </div>
</div>


        {/* CARD STACK */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          {feed.slice(0, 3).map((user, index) => (
            <SwipeableCard
              key={user._id}
              user={user}
              isTopCard={index === 0}
              zIndex={30 - index}
              isExiting={exiting.userId === user._id}
              exitDirection={
                exiting.userId === user._id ? exiting.direction : null
              }
            />
          ))}
        </div>

        {/* RIGHT BUTTON */}
        <div className="flex-1 flex justify-center mt-10">
  <div className="group flex flex-col items-center space-y-4">

    <button
      type="button"
      onClick={() => handleButtonAction("interested")}
      disabled={feed.length === 0}
      className="
        w-16 h-16 rounded-2xl
        bg-gradient-to-r from-[#ff734d] to-[#d64000]
        shadow-orange-lg flex items-center justify-center
        hover:scale-110 hover:shadow-xl transition-all
        duration-300
        cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      <ChevronRight className="w-7 h-7 text-white" strokeWidth={2.5} />
    </button>

    <div className="text-center opacity-70 group-hover:opacity-100 cursor-default">
      <p className="text-[#d64000] font-bold text-lg">Connect</p>
      <p className="text-[#000000] opacity-60 text-sm">Swipe right</p>
    </div>

  </div>
</div>

      </div>

      {/* FIXED COUNTERS */}
      {feed.length > 0 && (
        <div className="fixed top-24 right-6 z-50">
          <div className="bg-white/70 backdrop-blur-xl border border-[#ff734d33] rounded-lg px-4 py-2 shadow-orange-lg">
            <span className="text-sm font-medium text-[#010D3E]">
              {feed.length} profile{feed.length !== 1 ? "s" : ""} left
            </span>
          </div>
        </div>
      )}

      <div className="fixed top-25 left-6 z-50">
        <div className="bg-white/70 backdrop-blur-xl border border-[#ff734d33] px-4 py-2 rounded-lg shadow-orange-lg">
          <p className="text-[#00000099] text-sm font-medium">
            Use the side buttons
          </p>
        </div>
      </div>

    </div>
  );
};

export default Feed;
