import { useState, useEffect } from "react";
import {
  MapPin,
  Briefcase,
  Code,
  Heart,
  Target,
  Mail,
  Edit,
  Calendar,
  User,
} from "lucide-react";
import Badge from "./UserProfileComponents/Badge";
import LoadingSpinner from "./LoadingSpinner";
import InfoItem from "./UserProfileComponents/InfoItem";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [profile, setProfile] = useState(null);

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(BASE_URL + `/profile/${userId}`, {
          withCredentials: true,
        });

        setProfile(response?.data?.data);
        setIsOwnProfile(response?.data?.isOwnProfile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleEditProfile = () => navigate("/profile/edit");

  if (loading) return <LoadingSpinner />;

  if (!profile)
    return (
      <div className="min-h-screen bg-[#EAEEFE] flex items-center justify-center">
        <p className="text-[#010D3E]">Profile not found</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE8D6] to-[#bc6a30] pt-25 pb-10 relative">
      
      <div className="relative max-w-5xl mx-auto px-4">
        {/* Main Profile Card */}
        <div className="rounded-lg border border-[rgba(255,115,77,0.2)] bg-white/90 shadow-xl backdrop-blur-sm">
          
          {/* Header Section */}
          <div className="p-8 border-b border-[rgba(255,115,77,0.15)]">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              
              {/* Avatar */}
              <img
                src={profile.photoURL}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="w-28 h-28 rounded-xl object-cover border-2 border-[#ff734d] shadow-md"
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                  
                  <div>
                    <h1 className="text-3xl ml-6 font-bold text-[#010D3E] tracking-tight mb-2">
                      {profile.firstName} {profile.lastName}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-sm mt-4">
                      <InfoItem
                        icon={MapPin}
                        iconColor="#ff734d"
                        label="Location"
                        value={profile.location || "Not specified"}
                      />

                      <InfoItem
                        icon={Briefcase}
                        iconColor="#ff734d"
                        label="Experience"
                        value={profile.experienceLevel || "Not specified"}
                      />
                    </div>
                  </div>

                  {/* Edit Button */}
                  {isOwnProfile && (
                    <button
                      onClick={handleEditProfile}
                      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium bg-gradient-to-r from-[#ff734d] to-[#d64000] text-white px-4 py-2 shadow-lg hover:opacity-90 transition-all"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </button>
                  )}
                </div>

                {/* Email */}
                {isOwnProfile && profile.email && (
                  <div className="mt-4 pt-4 border-t border-[rgba(255,115,77,0.2)]">
                <InfoItem
                        icon={Mail}
                        iconColor="#ff734d"
                        label="Email"
                        value={profile.email}
                      />  
                  </div>
                
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* LEFT COLUMN */}
              <div className="lg:col-span-2 space-y-8">

                {/* About */}
                {profile.about && (
                  <div>
                    <h2 className="text-lg font-semibold text-[#010D3E] mb-3 flex items-center gap-2">
                      <User className="w-5 h-5 text-[#ff734d]" />
                      About
                    </h2>
                    <p className="text-[#000000]/80 leading-relaxed">
                      {profile.about}
                    </p>
                  </div>
                )}

                {/* Skills */}
                {profile.skills?.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold text-[#010D3E] mb-3 flex items-center gap-2">
                      <Code className="w-5 h-5 text-[#ff734d]" />
                      Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill) => (
                        <Badge key={skill}>{skill}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interests */}
                {profile.interests?.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold text-[#010D3E] mb-3 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-[#ff734d]" />
                      Interests
                    </h2>

                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map((interest) => (
                        <Badge key={interest} variant="primary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-6">

                {/* Looking For */}
                {profile.lookingFor?.length > 0 && (
                  <div className="rounded-lg border border-[rgba(255,115,77,0.2)] bg-white/90 p-6 backdrop-blur-sm shadow-sm">
                    <h3 className="text-base font-semibold text-[#010D3E] mb-4 flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#ff734d]" />
                      Looking For
                    </h3>

                    <div className="space-y-2">
                      {profile.lookingFor.map((item) => (
                        <div key={item} className="text-sm text-[#000000]/80 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#ff734d]"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Profile Stats */}
                <div className="rounded-lg border border-[rgba(255,115,77,0.2)] bg-white/90 p-6 shadow-sm backdrop-blur-sm">
                  <h3 className="text-base font-semibold text-[#010D3E] mb-4">
                    Profile Details
                  </h3>

                  <div className="space-y-4">
                    {profile.age && (
                      <div>
                        <p className="text-xs text-[#000000]/60 mb-1">Age</p>
                        <p className="text-sm font-medium text-[#010D3E]">
                          {profile.age} years
                        </p>
                      </div>
                    )}

                    {profile.gender && (
                      <div>
                        <p className="text-xs text-[#000000]/60 mb-1">Gender</p>
                        <p className="text-sm font-medium text-[#010D3E]">
                          {profile.gender}
                        </p>
                      </div>
                    )}

                    {/* {profile.experienceLevel && (
                      <div>
                        <p className="text-xs text-[#000000]/60 mb-1">
                          Experience Level
                        </p>
                        <p className="text-sm font-medium text-[#010D3E]">
                          {profile.experienceLevel}
                        </p>
                      </div>
                    )} */}

                    {profile.createdAt && (
                      <div>
                        <p className="text-xs text-[#000000]/60 mb-1">Member Since</p>
                        <p className="text-sm font-medium text-[#010D3E] flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-[#ff734d]" />
                          {new Date(profile.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Summary */}
                <div className="rounded-lg border border-[rgba(255,115,77,0.2)] bg-white/90 p-6 shadow-sm backdrop-blur-sm">
                  <h3 className="text-base font-semibold text-[#010D3E] mb-4">
                    Profile Summary
                  </h3>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#000000]/70">Skills Listed</span>
                      <span className="font-medium text-[#ff734d]">
                        {profile.skills?.length || 0}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#000000]/70">Interests</span>
                      <span className="font-medium text-[#ff734d]">
                        {profile.interests?.length || 0}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#000000]/70">Goals</span>
                      <span className="font-medium text-[#ff734d]">
                        {profile.lookingFor?.length || 0}
                      </span>
                    </div>

                    {/* Completion Bar */}
                    <div className="pt-3 border-t border-[rgba(255,115,77,0.15)]">
                      <div className="flex justify-between items-center text-sm mb-2">
                        <span className="text-[#000000]/70">
                          Profile Completion
                        </span>

                        <span className="font-medium text-[#ff734d]">
                          {Math.round(
                            (((profile.about ? 1 : 0) +
                              (profile.skills?.length > 0 ? 1 : 0) +
                              (profile.interests?.length > 0 ? 1 : 0) +
                              (profile.lookingFor?.length > 0 ? 1 : 0) +
                              (profile.location ? 1 : 0) +
                              (profile.experienceLevel ? 1 : 0)) /
                              6) *
                              100
                          )}
                          %
                        </span>
                      </div>

                      <div className="w-full bg-[#F1F1F1] rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-[#ff734d] to-[#d64000] h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.round(
                              (((profile.about ? 1 : 0) +
                                (profile.skills?.length > 0 ? 1 : 0) +
                                (profile.interests?.length > 0 ? 1 : 0) +
                                (profile.lookingFor?.length > 0 ? 1 : 0) +
                                (profile.location ? 1 : 0) +
                                (profile.experienceLevel ? 1 : 0)) /
                                6) *
                                100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;
