import { useSelector } from "react-redux";
import EditProfileCard from "./EditProfileCard";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    user && (
      <div className="relative min-h-screen bg-gray-50">
        {/* Simple background with subtle blue accents matching your theme */}
        <div className="absolute top-32 right-20 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-20 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl"></div>

        <EditProfileCard user={user} />
      </div>
    )
  );
};

export default Profile;
