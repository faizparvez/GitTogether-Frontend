import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../redux/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      // console.log(res);
      dispatch(addFeed(res?.data));
    } catch (err) {
      //TODO: handle error
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return;

  if (feed.length <= 0)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-orange-600"
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            No New Users Found!
          </h1>
          <p className="text-gray-600 max-w-md">
            Check back later for more developer profiles to connect with.
          </p>
        </div>
      </div>
    );

  return (
    feed && (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <UserCard user={feed[0]} />
          </div>
        </div>
      </div>
    )
  );
};
export default Feed;
