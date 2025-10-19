import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

const EditProfileCard = ({ user }) => {
  // Form state - synchronized with UserCard
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(
    user.skills ? user.skills.join(", ") : ""
  );
  const [experience, setExperience] = useState(user.experience || "");
  const [role, setRole] = useState(user.role || "");
  const [interests, setInterests] = useState(
    user.interests ? user.interests.join(", ") : ""
  );
  const [location, setLocation] = useState(user.location || "");
  const [lookingFor, setLookingFor] = useState(user.lookingFor || "");
  const [github, setGithub] = useState(user.github || "");
  const [linkedin, setLinkedin] = useState(user.linkedin || "");
  const [portfolio, setPortfolio] = useState(user.portfolio || "");
  const [twitter, setTwitter] = useState(user.twitter || "");
  const [email, setEmail] = useState(user.email || "");

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const saveProfile = async () => {
    setError("");
    try {
      // Prepare data for API - convert comma-separated strings to arrays
      const skillsArray = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill);
      const interestsArray = interests
        .split(",")
        .map((interest) => interest.trim())
        .filter((interest) => interest);

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoURL,
          age,
          gender,
          about,
          skills: skillsArray,
          experience,
          role,
          interests: interestsArray,
          location,
          lookingFor,
          github,
          linkedin,
          portfolio,
          twitter,
          email,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  const tabs = [
    { id: "basic", label: "Basic Info", icon: "👤" },
    { id: "about", label: "About & Bio", icon: "📝" },
    { id: "skills", label: "Skills & Experience", icon: "💻" },
    { id: "contact", label: "Contact & Social", icon: "🔗" },
  ];

  // Prepare user data for UserCard component
  const userData = {
    firstName,
    lastName,
    photoURL,
    age,
    gender,
    about,
    skills: skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill),
    experience,
    role,
    interests: interests
      .split(",")
      .map((interest) => interest.trim())
      .filter((interest) => interest),
    location,
    lookingFor,
    github,
    linkedin,
    portfolio,
    twitter,
    email,
  };

  return (
    <>
      <div className="min-h-screen bg-blue-200 pt-24 pb-12 px-6 md:px-8 lg:px-12">
        <div className="container mx-auto max-w-7xl">
          {/* Main content area with side-by-side layout */}
          <div className="flex flex-col lg:flex-row justify-center items-start gap-8">
            {/* Tabbed Edit Form */}
            <div className="w-full max-w-2xl">
              {/* Form heading - matching the preview style */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-poppins font-bold text-gray-900 mb-2">
                  Edit Your Profile
                </h3>
                <p className="text-gray-600">
                  Update your information and see the live preview
                </p>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-blue-300 overflow-hidden">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                  <nav className="flex">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-3 px-3 text-center font-semibold transition-colors duration-200 ${
                          activeTab === tab.id
                            ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-1">
                          <span className="text-lg">{tab.icon}</span>
                          <span className="text-xs lg:text-sm">
                            {tab.label}
                          </span>
                        </div>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  <div className="space-y-5">
                    {/* Basic Info Tab */}
                    {activeTab === "basic" && (
                      <>
                        <div className="text-center mb-5">
                          <h2 className="text-xl font-poppins font-bold text-gray-900">
                            Basic Information
                          </h2>
                          <p className="text-gray-600 text-sm mt-1">
                            Your name, photo, and basic details
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            First Name:
                          </label>
                          <input
                            type="text"
                            value={firstName}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Last Name:
                          </label>
                          <input
                            type="text"
                            value={lastName}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Photo URL:
                          </label>
                          <input
                            type="text"
                            value={photoURL}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
                            onChange={(e) => setPhotoURL(e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Role/Title:
                          </label>
                          <input
                            type="text"
                            value={role}
                            placeholder="e.g. Frontend Developer, Full Stack Engineer"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
                            onChange={(e) => setRole(e.target.value)}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Age:
                            </label>
                            <input
                              type="number"
                              value={age}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
                              onChange={(e) => setAge(e.target.value)}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Gender:
                            </label>
                            <select
                              value={gender}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 hover:bg-white appearance-none cursor-pointer text-gray-900"
                              onChange={(e) => setGender(e.target.value)}
                              style={{
                                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 12px center",
                                backgroundSize: "16px",
                              }}
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                      </>
                    )}

                    {/* About & Bio Tab */}
                    {activeTab === "about" && (
                      <>
                        <div className="text-center mb-5">
                          <h2 className="text-xl font-poppins font-bold text-gray-900">
                            About & Bio
                          </h2>
                          <p className="text-gray-600 text-sm mt-1">
                            Tell others about yourself and what you're looking
                            for
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            About You:
                          </label>
                          <textarea
                            value={about}
                            rows="5"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 hover:bg-white resize-none text-gray-900"
                            onChange={(e) => setAbout(e.target.value)}
                            placeholder="Tell other developers about yourself, your background, what you're passionate about..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Looking For:
                          </label>
                          <textarea
                            value={lookingFor}
                            rows="4"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 hover:bg-white resize-none text-gray-900"
                            onChange={(e) => setLookingFor(e.target.value)}
                            placeholder="What type of projects, collaboration, or partnerships are you interested in?"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Location:
                          </label>
                          <input
                            type="text"
                            value={location}
                            placeholder="City, Country"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
                            onChange={(e) => setLocation(e.target.value)}
                          />
                        </div>
                      </>
                    )}

                    {/* Skills & Experience Tab */}
                    {activeTab === "skills" && (
                      <>
                        <div className="text-center mb-5">
                          <h2 className="text-xl font-poppins font-bold text-gray-900">
                            Skills & Experience
                          </h2>
                          <p className="text-gray-600 text-sm mt-1">
                            Showcase your technical skills and experience level
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Technical Skills:
                          </label>
                          <textarea
                            value={skills}
                            rows="3"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 hover:bg-white resize-none text-gray-900"
                            onChange={(e) => setSkills(e.target.value)}
                            placeholder="Separate skills with commas: JavaScript, React, Node.js, Python, MongoDB"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Separate each skill with a comma
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Experience Level:
                          </label>
                          <select
                            value={experience}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 hover:bg-white appearance-none cursor-pointer text-gray-900"
                            onChange={(e) => setExperience(e.target.value)}
                            style={{
                              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 12px center",
                              backgroundSize: "16px",
                            }}
                          >
                            <option value="">Select Experience Level</option>
                            <option value="Junior">Junior (0-2 years)</option>
                            <option value="Mid-Level">
                              Mid-Level (2-5 years)
                            </option>
                            <option value="Senior">Senior (5+ years)</option>
                            <option value="Lead">
                              Lead/Architect (8+ years)
                            </option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Interests:
                          </label>
                          <textarea
                            value={interests}
                            rows="2"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 hover:bg-white resize-none text-gray-900"
                            onChange={(e) => setInterests(e.target.value)}
                            placeholder="Separate interests with commas: Open Source, Web3, AI/ML, Mobile Apps"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Separate each interest with a comma
                          </p>
                        </div>
                      </>
                    )}

                    {/* Contact & Social Tab */}
                    {activeTab === "contact" && (
                      <>
                        <div className="text-center mb-5">
                          <h2 className="text-xl font-poppins font-bold text-gray-900">
                            Contact & Social
                          </h2>
                          <p className="text-gray-600 text-sm mt-1">
                            Add your professional social profiles and contact
                            information
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            GitHub Profile:
                          </label>
                          <input
                            type="text"
                            value={github}
                            placeholder="https://github.com/yourusername"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
                            onChange={(e) => setGithub(e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            LinkedIn Profile:
                          </label>
                          <input
                            type="text"
                            value={linkedin}
                            placeholder="https://linkedin.com/in/yourusername"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
                            onChange={(e) => setLinkedin(e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Portfolio Website:
                          </label>
                          <input
                            type="text"
                            value={portfolio}
                            placeholder="https://yourportfolio.com"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
                            onChange={(e) => setPortfolio(e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Twitter/X Handle:
                          </label>
                          <input
                            type="text"
                            value={twitter}
                            placeholder="@yourusername"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
                            onChange={(e) => setTwitter(e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email (Optional):
                          </label>
                          <input
                            type="email"
                            value={email}
                            placeholder="your.email@example.com"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 hover:bg-white text-gray-900"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm font-medium">
                        {error}
                      </p>
                    </div>
                  )}

                  {/* Save button */}
                  <div className="mt-6">
                    <button
                      className="w-full bg-blue-600 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-xl shadow-blue-500/25 hover:scale-105 hover:bg-blue-700 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onClick={saveProfile}
                    >
                      Save Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Preview */}
            <div className="w-full max-w-lg lg:max-w-md">
              <div className="text-center mb-6">
                <h3 className="text-xl font-poppins font-bold text-gray-900 mb-2">
                  Profile Preview
                </h3>
                <p className="text-gray-600">
                  How other developers will see you
                </p>
              </div>
              <UserCard user={userData} />

              {/* Tab indicator */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-700 text-sm text-center">
                  Currently editing:{" "}
                  <span className="font-semibold">
                    {tabs.find((tab) => tab.id === activeTab)?.label}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-blue-600 text-white px-8 py-4 rounded-xl shadow-xl flex items-center gap-3 border border-blue-500">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="font-semibold text-lg">
              Profile saved successfully!
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfileCard;
