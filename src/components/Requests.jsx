import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../redux/requestSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {}
  };

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL}/user/requests`, {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ------------------------------------------------------------
  // SHIMMER LOADING STATE
  // ------------------------------------------------------------
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFE4D1] to-[#c26328] px-6 pb-20 pt-14">
        {/* Page Heading Shimmer */}
        <div className="section-heading mb-14 text-center">
          <div className="h-10 w-80 bg-white/40 rounded-lg mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 w-[500px] bg-white/30 rounded-lg mx-auto animate-pulse"></div>
        </div>

        {/* Card Shimmer Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="
                bg-white/50 backdrop-blur-xl border border-white/30 
                rounded-2xl shadow-lg shadow-orange-200/30 
                p-6 flex flex-col items-center text-center animate-pulse
              "
            >
              {/* Profile Image Shimmer */}
              <div className="relative mb-5">
                <div className="absolute inset-0 w-28 h-28 bg-[#ff734d]/10 blur-2xl rounded-full"></div>
                <div className="relative w-24 h-24 rounded-full bg-white/60 border-4 border-white/60"></div>
              </div>

              {/* Name Shimmer */}
              <div className="h-5 w-40 bg-white/60 rounded-md mb-3"></div>

              {/* Age / Gender Shimmer */}
              <div className="h-4 w-24 bg-white/40 rounded-md mb-3"></div>

              {/* About text shimmer */}
              <div className="space-y-2 w-full px-6">
                <div className="h-3 bg-white/50 rounded-md"></div>
                <div className="h-3 bg-white/40 rounded-md"></div>
                <div className="h-3 bg-white/30 rounded-md w-3/4 mx-auto"></div>
              </div>

              {/* Buttons Shimmer */}
              <div className="mt-6 w-full flex flex-col gap-3">
                <div className="w-full h-11 bg-white/60 rounded-lg"></div>
                <div className="w-full h-11 bg-white/40 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------
  // EMPTY
  // ------------------------------------------------------------
  if (requests?.length === 0 && !isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FFE4D1] to-[#c26328] px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[#010D3E] mb-4">
          No Requests Yet
        </h1>
        <p className="text-lg text-[#000000]/70 mb-8 text-center max-w-xl">
          You're all caught up! Check back later or discover new developers.
        </p>

        <Link
          to="/feed"
          className="
            btn btn-primary 
            bg-gradient-cta 
            shadow-orange-lg 
            btn-pulse-on-hover
            text-base font-semibold
            px-7 py-3
            rounded-xl
          "
        >
          Discover Developers
        </Link>
      </div>
    );
  }

  // ------------------------------------------------------------
  // MAIN VERTICAL CARDS
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE4D1] to-[#c26328] px-6 pb-20 pt-14">
      <div className="section-heading mb-14">
        <h2 className="section-title mt-5 text-4xl md:text-5xl lg:text-6xl font-bold text-center text-[#010D3E] max-w-4xl mx-auto leading-tight md:whitespace-nowrap">
          Your{" "}
          <span className="bg-gradient-to-r from-[#ff734d] to-[#d64000] text-transparent bg-clip-text">
            Connection Requests
          </span>
        </h2>

        <p className="section-description mt-4 text-lg text-center text-[#000000] max-w-3xl mx-auto leading-relaxed">
          Review incoming invites and grow your professional developer network
          with meaningful collaborations.
        </p>
      </div>

      {/* Cards Grid */}
      <div
        className="
          max-w-5xl mx-auto 
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
          gap-6 md:gap-8
        "
      >
        {requests?.map((req) => {
          const u = req.fromUserId;

          return (
            <div
              key={req._id}
              className="
                bg-white backdrop-blur-xl border border-white/40 
                rounded-2xl shadow-lg shadow-orange-200/40 
                hover:shadow-orange-300 hover:border-[#ff734d]/60
                transition-all duration-300 p-4 flex flex-col items-center text-center
              "
            >
              <div className="relative mb-5">
                <div className="absolute inset-0 w-28 h-28 bg-[#ff734d]/20 blur-2xl rounded-full"></div>

                <img
                  src={u.photoURL}
                  alt="profile"
                  className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>

              <Link to={`/profile/${u._id}`}>
                <h2 className="text-2xl font-semibold text-[#010D3E] hover:text-[#d64000] transition-colors">
                  {u.firstName} {u.lastName}
                </h2>
              </Link>

              {(u.age || u.gender) && (
                <p className="text-sm text-[#000000]/60 mt-1">
                  {u.age && u.gender
                    ? `${u.age}, ${u.gender}`
                    : u.age || u.gender}
                </p>
              )}

              <p className="text-sm text-[#000000]/70 leading-relaxed mt-3 line-clamp-3 max-w-xs">
                {u.about}
              </p>

              <div className="mt-6 w-full flex flex-col gap-3">
                <button
                  onClick={() => reviewRequest("accepted", req._id)}
                  className="w-full cursor-pointer bg-gradient-to-r from-[#ff734d] to-[#d64000] text-white py-3 rounded-lg font-semibold shadow-orange-lg hover:opacity-90 transition-all"
                >
                  ✓ Accept Request
                </button>

                <button
                  onClick={() => reviewRequest("rejected", req._id)}
                  className="w-full bg-white/70 cursor-pointer border border-[#000000]/20 text-[#000000] py-3 rounded-lg hover:bg-[#000000]/10 transition-all"
                >
                  ✕ Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
