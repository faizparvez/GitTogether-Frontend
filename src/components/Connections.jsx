import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../redux/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
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
          <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-gray-900 mb-6">
            No <span className="text-blue-600">Connections</span> Yet
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Start connecting with other developers to see them here!
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
        {/* Header section matching your website's style */}
        <div className="text-center mb-16 pt-8">
          <h1 className="text-4xl lg:text-5xl font-poppins font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Your <span className="text-blue-600">Connections</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-700 leading-relaxed font-medium">
            Connect, collaborate, and build amazing things together with fellow
            developers.
          </p>
        </div>

        {/* Connections grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {connections.map((connection) => {
            const { _id, firstName, lastName, photoURL, age, gender, about } =
              connection;

            return (
              <div
                key={_id}
                className="bg-white rounded-xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-300"
              >
                <div className="flex items-start gap-6">
                  {/* Profile image */}
                  <div className="flex-shrink-0">
                    <img
                      alt={`${firstName} ${lastName}'s profile`}
                      className="w-20 h-20 rounded-full object-cover border-3 border-white shadow-lg"
                      src={photoURL}
                    />
                  </div>

                  {/* Profile info */}
                  <div className="flex-grow">
                    {/* Name as clickable link */}
                    <Link to={`/profile/${_id}`} className="inline-block">
                      <h2 className="font-poppins font-bold text-2xl text-gray-900 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                        {firstName + " " + lastName}
                      </h2>
                    </Link>

                    {/* Age and gender */}
                    {age && gender && (
                      <p className="text-blue-600 font-medium mb-3">
                        {age + ", " + gender}
                      </p>
                    )}

                    {/* About section */}
                    {about && (
                      <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3">
                        {about}
                      </p>
                    )}

                    {/* Action button */}
                    <Link to={"/chat/" + _id}>
                      <button className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Start Chat
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action section */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Looking to connect with more developers?
          </p>
          <Link
            to="/feed"
            className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-xl shadow-blue-500/25 hover:scale-105 hover:bg-blue-700 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30"
          >
            Discover More Developers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Connections;
