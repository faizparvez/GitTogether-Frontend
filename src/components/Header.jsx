// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import { BASE_URL } from "../utils/constants";
// import { removeUser } from "../utils/userSlice";

const Header = () => {
  // State to track scroll position for transparency effect
  const [isScrolled, setIsScrolled] = useState(false);
  
  //   const user = useSelector((store) => store.user);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // Effect to handle scroll events for transparency
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20); // Add transparency after 20px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //   const handleLogout = async () => {
  //     try {
  //       await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
  //       dispatch(removeUser());
  //       return navigate("/login");
  //     } catch (err) {
  //       // Error logic maybe redirect to error page
  //       console.log(err);
  //     }
  //   };

  return (
    <>
      {/* Sticky header container with transparency effects */}
      <div 
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-lg border border-gray-200/50' 
            : 'bg-white/95 backdrop-blur-sm shadow-md border border-gray-200/30'
        } rounded-2xl`}
        style={{
          padding: '8px 24px',
          minWidth: 'fit-content',
        }}
      >
        <div className="flex items-center justify-between gap-6">
          {/* Logo section - left side */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100/50 transition-colors duration-200"
            >
              {/* DevTinder Logo placeholder - replace with your actual logo */}
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DT</span>
              </div>
            </Link>
          </div>

          {/* Navigation links - center/right section */}
          <nav className="flex items-center gap-2">
            <Link 
              to="/profiles" 
              className="px-4 py-2 rounded-lg text-sm font-medium text-black hover:shadow-lg hover:shadow-orange-200 transition-all duration-200"
            >
              Profiles
            </Link>
            <Link 
              to="/connections" 
              className="px-4 py-2 rounded-lg text-sm font-medium text-black hover:shadow-lg hover:shadow-orange-200 transition-all duration-200"
            >
              Connections
            </Link>
            <Link 
              to="/requests" 
              className="px-4 py-2 rounded-lg text-sm font-medium text-black hover:shadow-lg hover:shadow-orange-200 transition-all duration-200"
            >
              Requests
            </Link>
            {/* Conditional rendering for SignIn/Logout */}
            {/* {user ? ( */}
              <button
                // onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-sm font-medium text-black hover:shadow-lg hover:shadow-orange-200 transition-all duration-200"
              >
                Logout
              </button>
            {/* ) : ( */}
            {/*
              <Link
                to="/signin"
                className="px-4 py-2 rounded-lg text-sm font-medium text-black hover:shadow-lg hover:shadow-orange-200 transition-all duration-200"
              >
                SignIn
              </Link>
            )} */}
          </nav>
        </div>
      </div>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-20"></div>
    </>
  );
};

export default Header;