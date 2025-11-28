import { useState, useEffect } from "react";
import { User, MapPin, Briefcase, Heart, Code, Loader2 } from "lucide-react";

import InputField from "./ProfileEditComponents/InputField";
import MultiSelectDropdown from "./ProfileEditComponents/MultiSelectDropdown";
import SectionCard from "./ProfileEditComponents/SectionCard";
import SelectField from "./ProfileEditComponents/SelectField";
import TextAreaField from "./ProfileEditComponents/TextAreaField";
import Toast from "./ProfileEditComponents/Toast";

import {
  SKILLS_OPTIONS,
  INTERESTS_OPTIONS,
  LOOKING_FOR_OPTIONS,
  EXPERIENCE_LEVELS,
  GENDER_OPTIONS,
  BASE_URL,
} from "../utils/constants";

import { validation } from "../utils/validation";
import LoadingSpinner from "./LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";
import axios from "axios";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    photoURL: "",
    about: "",
    skills: [],
    interests: [],
    lookingFor: [],
    location: "",
    experienceLevel: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const user = useSelector((store) => store.user);

  useEffect(() => {
    const loadProfile = () => {
      try {
        if (user) {
          setFormData({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            age: user.age || "",
            gender: user.gender || "",
            photoURL: user.photoURL || "",
            about: user.about || "",
            skills: user.skills || [],
            interests: user.interests || [],
            lookingFor: user.lookingFor || [],
            location: user.location || "",
            experienceLevel: user.experienceLevel || "",
          });
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        setToast({ type: "error", message: "Failed to load profile data" });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      if (validation[field]) {
        const error = validation[field](formData[field]);
        if (error) newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setToast({
        type: "error",
        message: "Please fix the errors before submitting",
      });
      return;
    }

    setSaving(true);

    try {
      const dataToSend = {
        ...formData,
        age: formData.age ? Number(formData.age) : undefined,
      };

      Object.keys(dataToSend).forEach((key) => {
        if (dataToSend[key] === undefined || dataToSend[key] === "") {
          delete dataToSend[key];
        }
      });

      const response = await axios.patch(
        `${BASE_URL}/profile/edit`,
        dataToSend,
        {
          withCredentials: true,
        }
      );

      setToast({
        type: "success",
        message: response.data.message || "Profile updated successfully!",
      });

      dispatch(addUser(response?.data?.data));
    } catch (error) {
      console.error("Error updating profile:", error);
      setToast({
        type: "error",
        message: "Failed to update profile. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE4D1] to-[#c26328] py-20">
      <div className="absolute top-24 right-20 w-72 h-72 bg-[#ff734d]/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#d64000]/15 rounded-full blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-[#010D3E] max-w-4xl mx-auto">
            Complete Your{" "}
            <span className="bg-gradient-to-r from-[#ff734d] to-[#d64000] text-transparent bg-clip-text">
              Profile
            </span>
          </h1>

          <p className="text-lg text-[#010D3E] max-w-2xl mx-auto leading-relaxed">
            Tell us more about yourself to help find your perfect match.
          </p>
        </div>

        <div className="space-y-8">
          {/* Basic Information */}
          <SectionCard
            title="Basic Information"
            description="Your personal details"
            icon={User}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="First Name"
                icon={User}
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                error={errors.firstName}
                placeholder="John"
                maxLength={20}
              />
              <InputField
                label="Last Name"
                icon={User}
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                error={errors.lastName}
                placeholder="Doe"
                maxLength={20}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Age"
                type="number"
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
                error={errors.age}
                placeholder="25"
                min={18}
              />

              <SelectField
                label="Gender"
                options={GENDER_OPTIONS}
                value={formData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                error={errors.gender}
              />
            </div>
          </SectionCard>

          {/* Profile Details */}
          <SectionCard
            title="Profile Details"
            description="Share more about yourself"
            icon={User}
          >
            <InputField
              label="Photo URL"
              value={formData.photoURL}
              onChange={(e) => handleChange("photoURL", e.target.value)}
              placeholder="https://example.com/photo.jpg"
            />

            <TextAreaField
              label="About"
              value={formData.about}
              onChange={(e) => handleChange("about", e.target.value)}
              error={errors.about}
              placeholder="Tell us about yourself, your interests, and what you're passionate about..."
              rows={4}
              maxLength={500}
            />
          </SectionCard>

          {/* Skills & Experience */}
          <SectionCard
            title="Skills & Experience"
            description="Your technical expertise"
            icon={Code}
          >
            <MultiSelectDropdown
              label="Skills"
              icon={Code}
              options={SKILLS_OPTIONS}
              selected={formData.skills}
              onChange={(value) => handleChange("skills", value)}
              error={errors.skills}
              maxItems={20}
            />

            <SelectField
              label="Experience Level"
              icon={Briefcase}
              options={EXPERIENCE_LEVELS}
              value={formData.experienceLevel}
              onChange={(e) => handleChange("experienceLevel", e.target.value)}
            />
          </SectionCard>

          {/* Interests */}
          <SectionCard
            title="Interests"
            description="What you're passionate about"
            icon={Heart}
          >
            <MultiSelectDropdown
              label="Interests"
              icon={Heart}
              options={INTERESTS_OPTIONS}
              selected={formData.interests}
              onChange={(value) => handleChange("interests", value)}
              error={errors.interests}
              maxItems={10}
            />
          </SectionCard>

          {/* Preferences & Location */}
          <SectionCard
            title="Preferences & Location"
            description="What you're looking for and where you're based"
            icon={MapPin}
          >
            <MultiSelectDropdown
              label="Looking For"
              options={LOOKING_FOR_OPTIONS}
              selected={formData.lookingFor}
              onChange={(value) => handleChange("lookingFor", value)}
              maxItems={5}
            />

            <InputField
              label="Location"
              icon={MapPin}
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              error={errors.location}
              placeholder="San Francisco, CA"
              maxLength={100}
            />
          </SectionCard>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium border border-[#FAC67A] bg-white hover:bg-[#FFE8D6] text-[#010D3E] h-10 px-6 transition-all"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="inline-flex items-center cursor-pointer justify-center gap-2 rounded-md text-sm font-medium bg-gradient-to-r from-[#ff734d] to-[#d64000] text-white hover:opacity-90 h-10 px-6 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Profile"
              )}
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
