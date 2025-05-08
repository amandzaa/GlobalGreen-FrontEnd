import React, { useState, useEffect } from "react";
import { Lock, KeySquare, Save, X, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { useAppDispatch } from "@/redux/store"; // Adjust if needed
import {
  deleteUser,
  updateUser,
  UserInputData,
} from "@/redux/features/user/userSlice";
import { UserData } from "@/types/user";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

interface AccountTabProps {
  userData: UserData;
  isLoading?: boolean;
}

export const ImprovedAccountTab: React.FC<AccountTabProps> = ({
  userData,
  isLoading = false,
}) => {
  const dispatch = useAppDispatch();

  const [localData, setLocalData] = useState<UserData>(userData);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLocalData(userData);
  }, [userData]);

  const handleInputChange = (field: keyof UserData, value: string) => {
    setLocalData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordChange = (field: keyof typeof passwordData, value: string) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (passwordError) setPasswordError("");
  };

  const startEditing = () => {
    console.log("📝 startEditing clicked!");
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setLocalData(userData);
    setIsEditing(false);
  };
  
  const Spinner = () => (
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  );

  const saveAll = async () => {
    setIsSaving(true); // 🔥 start spinner
    try {
      const updatedData: Partial<UserInputData> = {};

      for (const key in localData) {
        if (["user_id", "created_at", "role", "image_url"].includes(key))
          continue;
        const value = localData[key as keyof UserData];
        if (value !== undefined && value !== null && value !== "") {
          updatedData[key as keyof UserInputData] = String(value);
        }
      }
      if (Object.keys(updatedData).length === 0) {
        console.warn("No fields to update.");
        setIsSaving(false);
        return;
      }
      await dispatch(
        updateUser({ id: userData.id, data: updatedData })
      ).unwrap();
      console.log("✅ update success");
      setIsEditing(false);
    } catch (error) {
      console.error("❌ Failed to update user:", error);
    } finally {
      setIsSaving(false); // 🔥 stop spinner
    }
  };

  const savePassword = async () => {
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    setIsSaving(true);
    try {
      // Implement your password update logic here
      await dispatch(
        updateUser({
          id: userData.id,
          data: {
            password: passwordData.newPassword,
          },
        })
      ).unwrap();
      
      console.log("✅ Password updated successfully");
      setIsEditingPassword(false);
      // Reset password fields
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("❌ Failed to update password:", error);
      setPasswordError("Failed to update password. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const cancelPasswordEdit = () => {
    setIsEditingPassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordError("");
    // Reset password visibility states
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteUser(userData.id)).unwrap();
      console.log("✅ User deleted successfully");

      // Clear storage
      localStorage.clear();
      sessionStorage.clear();
      console.log("🧹 Cleared localStorage and sessionStorage");

      // Redirect
      router.push("/seller-homepage");
      console.log("➡️ Redirecting to /seller-homepage");
    } catch (error) {
      console.error("❌ Failed to delete user:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleDeleteAccount = () => {
    console.log("📝 delete clicked!");
    setShowDeleteModal(true);
  };

  return (
    <div className="p-8">
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Account Information</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Details */}
          <div>
            <h3 className="text-lg font-medium mb-4">Personal Details</h3>

            {["first_name", "last_name", "email", "phone"].map((field) => (
              <div key={field} className="mb-4">
                <label className="text-sm font-semibold text-gray-700">
                  {field
                    .split("_")
                    .map((w) => w[0].toUpperCase() + w.slice(1))
                    .join(" ")}
                </label>

                {isEditing ? (
                  <input
                    type="text"
                    value={localData[field as keyof UserData] || ""}
                    onChange={(e) =>
                      handleInputChange(field as keyof UserData, e.target.value)
                    }
                    className="mt-1 p-2 border rounded-md w-full text-sm"
                    disabled={isLoading}
                  />
                ) : (
                  <div className="mt-1 p-2 bg-gray-50 rounded-md text-gray-800 text-sm">
                    {localData[field as keyof UserData] || "—"}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Account Security */}
          <div>
            <h3 className="text-lg font-medium mb-4">Account Security</h3>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>
                {!isEditingPassword && (
                  <button
                    className="text-xs text-primary hover:text-primary-dark flex items-center"
                    onClick={() => setIsEditingPassword(true)}
                    disabled={isLoading}
                  >
                    <Lock size={12} className="mr-1" />
                    Change
                  </button>
                )}
              </div>
              
              <AnimatePresence mode="wait">
                {isEditingPassword ? (
                <motion.div
                  key="password-edit"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 space-y-3 overflow-hidden"
                >
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Current Password"
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                      className="p-2 pl-3 pr-10 border rounded-md w-full text-sm"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowCurrentPassword(prev => !prev)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="New Password"
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                      className="p-2 pl-3 pr-10 border rounded-md w-full text-sm"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowNewPassword(prev => !prev)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm New Password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                      className="p-2 pl-3 pr-10 border rounded-md w-full text-sm"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowConfirmPassword(prev => !prev)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  
                  {passwordError && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs mt-1"
                    >
                      {passwordError}
                    </motion.p>
                  )}
                  
                  <motion.div 
                    className="flex space-x-2 mt-2"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <button
                      onClick={savePassword}
                      className="px-3 py-1.5 bg-green-500 text-white text-sm rounded hover:bg-green-600 disabled:opacity-50 flex items-center gap-1"
                      disabled={isSaving}
                    >
                      {isSaving ? <Spinner /> : <Save size={14} />} Save
                    </button>
                    <button
                      onClick={cancelPasswordEdit}
                      className="px-3 py-1.5 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400 flex items-center gap-1"
                    >
                      <X size={14} /> Cancel
                    </button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="password-display"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-2 bg-gray-50 rounded-md"
                >
                  <p className="text-gray-700">••••••••</p>
                </motion.div>
              )}
              </AnimatePresence>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-700">
                  Two-Factor Authentication
                </label>
                <button
                  className="text-xs text-primary hover:text-primary-dark flex items-center"
                  onClick={() => {}}
                  disabled={isLoading}
                >
                  <KeySquare size={12} className="mr-1" />
                  Enable
                </button>
              </div>
              <div className="p-2 bg-gray-50 rounded-md">
                <p className="text-gray-700">Not Enabled</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-between items-center border-t pt-6">
          <div className="flex gap-3">
            <AnimatePresence mode="wait">
              {!isEditing ? (
                <motion.button
                  key="edit"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  onClick={startEditing}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center gap-2"
                  disabled={isLoading || isEditingPassword}
                >
                  <Edit size={16} /> Edit Account
                </motion.button>
              ) : (
                <motion.div
                  key="edit-actions"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-3"
                >
                  <button
                    onClick={saveAll}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 flex items-center justify-center gap-2"
                    disabled={isLoading || isSaving}
                  >
                    {isSaving ? <Spinner /> : <Save size={16} />} Save Changes
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 flex items-center justify-center gap-2"
                    disabled={isLoading || isSaving}
                  >
                    <X size={16} /> Cancel
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 flex items-center justify-center gap-2"
            disabled={isLoading || isDeleting || isEditing || isEditingPassword}
          >
            {isDeleting ? <Spinner /> : <Trash2 size={16} />} Delete Account
          </button>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};