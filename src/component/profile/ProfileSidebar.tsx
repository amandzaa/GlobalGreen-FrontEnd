import React, { useState } from "react";
import { User, Edit, Check, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store"; // path to your store types
import { updateUser } from "@/redux/features/user/userSlice";
import { UserData } from "@/types/user";
import { ProfileInfoItem } from "./ProfileInfoItem";

interface ProfileSidebarProps {
  userData: UserData;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ userData }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(userData.image_url || "");
  const [tempImageUrl, setTempImageUrl] = useState(imageUrl);

  const handleEditImage = () => {
    setTempImageUrl(imageUrl);
    setIsEditingImage(true);
  };

  const handleSaveImage = async () => {
    try {
      setImageUrl(tempImageUrl);
      setIsEditingImage(false);

      await dispatch(updateUser({
        id: userData.id, // your user ID
        data: { image_url: tempImageUrl }
      }));

      console.log("Image updated successfully!");
    } catch (error) {
      console.error("Failed to update image", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingImage(false);
  };
  console.log("cek imageurl :", userData.image_url)

  return (
    <div className="w-full md:w-80 bg-white border-r border-gray-200 py-4 md:py-6 px-3 md:px-4 flex flex-col items-center">
      <div className="w-full flex flex-col items-center mb-6 md:mb-14">
        {/* Profile picture container */}
        <div className="relative w-28 h-28 md:w-40 md:h-40 rounded-full bg-gray-200 mb-3 md:mb-4 mt-10 md:mt-20">
          <div className="w-full h-full rounded-full overflow-hidden">
            <img
              src={userData.image_url}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {!isEditingImage && (
            <button
              onClick={handleEditImage}
              className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md transform translate-x-0 translate-y-0 z-10"
              aria-label="Edit profile picture"
            >
              <Edit size={16} />
            </button>
          )}
        </div>

        {/* Edit mode */}
        {isEditingImage && (
          <div className="w-full max-w-xs mb-4 mt-2">
            <div className="flex items-center mb-2">
              <input
                type="text"
                value={tempImageUrl}
                onChange={(e) => setTempImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="flex-1 p-2 border border-gray-300 rounded-l text-sm"
              />
              <button
                onClick={handleSaveImage}
                className="bg-green-500 hover:bg-green-600 text-white p-2"
                aria-label="Save"
              >
                <Check size={16} />
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-r"
                aria-label="Cancel"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {/* User details */}
        <h2 className="text-lg md:text-xl font-medium">{userData.username}</h2>
        <p className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2">{userData.email}</p>
        <p className="text-xs md:text-sm text-gray-500">{userData.phone}</p>
        <p className="text-xs md:text-sm text-gray-500 mt-1">{userData.office}</p>
      </div>
    </div>
  );
};

export default ProfileSidebar;
