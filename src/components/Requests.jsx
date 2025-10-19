import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../redux/requestSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      // console.log(res);
      // we pass the request id which we want to remove from the redux store in the dispatch action func
      dispatch(removeRequest(_id));
    } catch (err) {}
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      // console.log(res);
      dispatch(addRequests(res?.data?.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 md:px-8 lg:px-12 pt-28 pb-16">
        {/* Light blue gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200"></div>
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-300/50 via-blue-200/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-200/60 via-blue-100/40 to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-0 w-1/4 bg-gradient-to-r from-blue-200/40 via-blue-100/20 to-transparent"></div>
        <div className="absolute top-0 bottom-0 right-0 w-1/4 bg-gradient-to-l from-blue-200/40 via-blue-100/20 to-transparent"></div>
        <div className="absolute top-1/4 bottom-1/4 left-1/4 right-1/4 bg-gradient-to-br from-blue-50/60 via-blue-100/30 to-blue-50/40 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-200/25 rounded-full blur-2xl"></div>

        <div className="relative z-10 text-center">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg
              className="w-12 h-12 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8l-5 5m0 0l-5-5m5 5v6"
              />
            </svg>
          </div>
          <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-gray-900 mb-6">
            No <span className="text-blue-600">Requests</span> Found
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            You don't have any connection requests at the moment.
          </p>
          <Link
            to="/feed"
            className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-xl shadow-blue-500/25 hover:scale-105 hover:bg-blue-700 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30"
          >
            Discover Developers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden px-6 md:px-8 lg:px-12 pt-28 pb-16">
      {/* Light blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200"></div>
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-300/50 via-blue-200/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-200/60 via-blue-100/40 to-transparent"></div>
      <div className="absolute top-0 bottom-0 left-0 w-1/4 bg-gradient-to-r from-blue-200/40 via-blue-100/20 to-transparent"></div>
      <div className="absolute top-0 bottom-0 right-0 w-1/4 bg-gradient-to-l from-blue-200/40 via-blue-100/20 to-transparent"></div>
      <div className="absolute top-1/4 bottom-1/4 left-1/4 right-1/4 bg-gradient-to-br from-blue-50/60 via-blue-100/30 to-blue-50/40 rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-300/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-200/25 rounded-full blur-2xl"></div>

      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Connection <span className="text-blue-600">Requests</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-700 leading-relaxed font-medium">
            Review and manage your incoming connection requests from fellow
            developers.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {requests.map((request) => {
            const { _id, firstName, lastName, photoURL, age, gender, about } =
              request.fromUserId;

            return (
              <div
                key={_id}
                className="bg-white rounded-xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-300"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <img
                      alt="photo"
                      className="w-20 h-20 rounded-full object-cover border-3 border-white shadow-lg"
                      src={photoURL}
                    />
                  </div>

                  <div className="flex-grow text-center md:text-left">
                    <Link to={`/profile/${_id}`} className="inline-block">
                      <h2 className="font-poppins font-bold text-2xl text-gray-900 hover:text-blue-600 transition-colors duration-200 cursor-pointer mb-2">
                        {firstName + " " + lastName}
                      </h2>
                    </Link>
                    {age && gender && (
                      <p className="text-blue-600 font-medium mb-3">
                        {age + ", " + gender}
                      </p>
                    )}
                    {about && (
                      <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3">
                        {about}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                    <button
                      className="bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 min-w-[100px] hover:shadow-xl"
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      Reject
                    </button>
                    <button
                      className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-xl shadow-blue-500/25 hover:bg-blue-700 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-[100px] hover:shadow-2xl hover:shadow-blue-500/30"
                      onClick={() => reviewRequest("accepted", request._id)}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
