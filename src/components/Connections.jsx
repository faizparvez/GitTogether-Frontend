import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../redux/connectionSlice";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";

/**
 * Connections - UI updated to match GitTogether theme (SaaS, warm orange).
 * Logic is kept identical to your original component.
 */

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  /* -------------------------
     Loading state (shimmer)
     ------------------------- */
  if (isLoading) {
    return (
      <div className="relative min-h-screen overflow-hidden px-6 md:px-8 lg:px-12 pt-28 pb-16 bg-gradient-to-b from-[#FFE4D1] to-[#c26328]">
        <div className="relative z-10 container mx-auto max-w-6xl">
          {/* Header shimmer */}
          <div className="text-center mb-12 pt-2">
            <div className="h-12 w-96 bg-[#FFF1E8] rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 w-[560px] bg-[#FFF1E8] rounded-lg mx-auto animate-pulse"></div>
          </div>

          {/* Grid shimmer */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-[rgba(194,99,40,0.08)] bg-white/60 backdrop-blur-sm shadow-sm"
              >
                <div className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-[#FFF1E8] animate-pulse"></div>
                    </div>

                    <div className="flex-grow min-w-0 w-full">
                      <div className="h-6 w-44 bg-[#FFF1E8] rounded-lg mb-2 animate-pulse"></div>
                      <div className="h-4 w-28 bg-[#FFF1E8] rounded-lg mb-3 animate-pulse"></div>
                      <div className="h-4 w-full bg-[#FFF1E8] rounded-lg mb-2 animate-pulse"></div>
                      <div className="h-4 w-3/4 bg-[#FFF1E8] rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center p-6 pt-0">
                  <div className="w-full h-10 bg-[#FFF1E8] rounded-md animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="h-6 w-64 bg-[#FFF1E8] rounded-lg mx-auto mb-6 animate-pulse"></div>
            <div className="h-10 w-56 bg-[#FFF1E8] rounded-md mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  /* -------------------------
     No connections view
     ------------------------- */
  if (!connections || connections.length === 0) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 md:px-8 lg:px-12 pt-28 pb-16 bg-gradient-to-b from-[#FFE4D1] to-[#c26328]">
        <div className="relative z-10 text-center max-w-2xl">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#010D3E] mb-4 tracking-tight">
            No Connections Yet
          </h1>
          <p className="text-lg text-[#000000]/70 mb-8 leading-relaxed">
            Start connecting with other developers to see them here and build
            amazing things together.
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
      </div>
    );
  }

  /* -------------------------
     Main connections grid
     ------------------------- */
  return (
    <div className="relative min-h-screen overflow-hidden px-6 md:px-8 lg:px-12 pt-12 pb-16 bg-gradient-to-b from-[#FFE4D1] to-[#c26328]">
      <div className="relative z-10 container mx-auto max-w-6xl">
        {/* Header */}
        <div className="section-heading mb-12 pt-2">
          {/* Main Heading */}
          <h2 className="section-title mt-5 text-4xl md:text-5xl lg:text-6xl font-bold text-center text-[#010D3E] mx-auto leading-tight md:whitespace-nowrap">
            Your{" "}
            <span className="bg-gradient-to-r from-[#ff734d] to-[#d64000] text-transparent bg-clip-text">
              Developer Connections
            </span>
          </h2>

          {/* Subtext */}
          <p className="section-description mt-5 text-lg text-center text-[#000000] max-w-3xl mx-auto leading-relaxed">
            Connect, collaborate and build meaningful projects with developers
            in your network. Strengthen your community and grow together.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {connections.map((connection) => {
            const {
              _id,
              firstName,
              lastName,
              photoURL,
              age,
              gender,
              about,
              skills = [],
              interests = [],
              lookingFor = [],
            } = connection;

            return (
              <div
                key={_id}
                className="rounded-2xl border border-[rgba(194,99,40,0.08)] bg-white backdrop-blur-sm shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Card content */}
                <div className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <img
                        alt={`${firstName} ${lastName}'s profile`}
                        className="w-16 h-16 rounded-full object-cover shadow-sm border-none ring-0 outline-none"
                        src={photoURL}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-grow min-w-0">
                      <h2 className="font-semibold text-xl text-[#010D3E] hover:text-gradient-hero transition-all">
                        {firstName + " " + lastName}
                      </h2>

                      {/* {age && gender && (
                        <p className="text-sm text-[#7a6a5a] mt-1 mb-3">
                          {age + (age && gender ? " • " : "") + (gender || "")}
                        </p>
                      )} */}

                      {about && (
                        <p className="text-sm text-[#7a6a5a] leading-relaxed mb-4 line-clamp-3">
                          {about}
                        </p>
                      )}

                      {/* Meta badges (skills / interests) */}
                      <div className="flex flex-wrap gap-2">
                        {skills.slice(0, 4).map((s) => (
                          <span
                            key={s}
                            className="text-xs font-medium px-2 py-1 rounded-md border border-[rgba(194,99,40,0.08)] bg-[#fff6f3] text-[#c26328]"
                          >
                            {s}
                          </span>
                        ))}

                        {lookingFor.slice(0, 2).map((l) => (
                          <span
                            key={l}
                            className="text-xs px-2 py-1 rounded-md border border-[rgba(255,115,77,0.12)] bg-[#fff7f2] text-[#ff734d] font-semibold"
                          >
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="flex items-center p-6 pt-0 gap-3">
                  {/* Start Chat Button (50%) */}
                  <Link to={"/chat/" + _id} className="w-1/2">
                    <button
                      className="
        w-full inline-flex items-center justify-center gap-2
        rounded-lg text-sm font-semibold
        transition-all duration-300 cursor-pointer
        bg-gradient-to-r from-[#ff734d] to-[#d64000]
        text-white h-11 px-4
        shadow-[0_4px_12px_rgba(255,115,77,0.35)]
        hover:shadow-[0_6px_18px_rgba(255,115,77,0.45)]
        hover:brightness-110
        active:scale-[0.98]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff734d]
      "
                    >
                      <MessageSquare className="w-4 h-4" />
                      Start Chat
                    </button>
                  </Link>

                  {/* View Profile Button (50%) */}
                  <Link to={`/profile/${_id}`} className="w-1/2">
                    <button
                      className="
        w-full inline-flex items-center justify-center
        rounded-lg text-sm font-medium cursor-pointer
        transition-all duration-300
        border border-[#ff734d33]
        bg-white/70 text-[#c26328]
        h-11 px-4
        shadow-sm
        hover:bg-[#FFF3EB]
        hover:shadow-md
        hover:border-[rgba(194,99,40,0.25)]
        active:scale-[0.98]
      "
                    >
                      View Profile
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-base text-[#000000] mb-6">
            Looking to expand your network?
          </p>

          <Link
            to="/feed"
            className="
      inline-flex items-center gap-2 justify-center
      rounded-xl px-8 py-3 h-12
      text-base font-semibold
      bg-gradient-to-r from-[#ff734d] to-[#d64000]
      text-white shadow-lg shadow-[rgba(255,115,77,0.25)]
      border border-[rgba(255,115,77,0.35)]
      transition-all duration-300
      hover:shadow-xl hover:shadow-[rgba(214,64,0,0.35)]
      hover:scale-[1.02]
      active:scale-[0.98]
    "
          >
            Discover More Developers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Connections;
