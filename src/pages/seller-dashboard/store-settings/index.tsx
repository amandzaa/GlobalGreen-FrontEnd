import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Info, Truck, User, Loader, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/component/layout-dashboard/DashboardLayout";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { updateUser, resetUserState } from "@/redux/features/user/userSlice";
import { fetchUserData } from "@/redux/features/auth/authSlice";
import { toast } from "react-hot-toast";
import dayjs from 'dayjs';
import { ProfileSidebar, TabBar, TabItem, OverviewTab, ProfileEditModal, ImprovedAccountTab, ImprovedShipmentTab } from "@/component/profile";
import { UserData } from "@/types/user";

const StoreSetting = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user: authUser, token, isLoading: authLoading } = useAppSelector((state) => state.auth);
  const { isLoading: userLoading, isSuccess, isError, errorMessage } = useAppSelector((state) => state.users);

  const [activeTab, setActiveTab] = useState("account");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editField, setEditField] = useState("");
  const [editValue, setEditValue] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [, setIsMobile] = useState(false);
  const [shippingData, setShippingData] = useState({
    shippingMethod: "Standard Shipping",
    shippingTime: "3-5 business days",
    packagingType: "Eco-friendly packaging",
    processingTime: "1-2 business days"
  });

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  console.log("cek token dulu gaes", token)
  console.log("cek authuser dulu gaes", authUser)
  useEffect(() => {
    if (!isMounted) return;
    if (token && !authUser) {
      console.log("this will check token && !authUser")
      dispatch(fetchUserData());
    }
  }, [token, authUser, authLoading, dispatch, router, isMounted]);

console.log("cek authuser", authUser)
  
  useEffect(() => {
    if (!isMounted) return;
    if (authUser) {
      const userId = typeof authUser.user_id === 'string' ? Number(authUser.user_id) : authUser.user_id;
      const transformedUser: UserData = {
        id: userId,
        email: authUser.email || "",
        first_name: authUser.first_name || "",
        last_name: authUser.last_name || "",
        phone: authUser.phone || "",
        image_url: authUser.image_url || "",
        role: authUser.role || "Store Owner",
        username: `${authUser.first_name || ""}_${authUser.last_name || ""}`.toLowerCase(),
        address:  "",
        store_id: `GG-${userId}`,
        join_date: dayjs(authUser.created_at).format('MMMM D, YYYY'),
        birthday:  "",
        tools: [],
        github: "",
        slack: "",
        office: "Remote"
      };
      setUserData(transformedUser);
    }
  }, [authUser, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    if (isSuccess) {
      toast.success("Profile updated successfully!");
      if (token) dispatch(fetchUserData());
      dispatch(resetUserState());
      setIsProfileModalOpen(false);
    }
    if (isError) {
      toast.error(errorMessage || "Failed to update profile");
      dispatch(resetUserState());
    }
  }, [isSuccess, isError, errorMessage, dispatch, token, isMounted]);

  const handleEditField = (field: string, value: string) => {
    setEditField(field);
    setEditValue(value);
    setIsProfileModalOpen(true);
  };

  console.log("cek userdata : ", userData)

  const handleSaveProfile = (field: string, value: string) => {
    if (!userData) {
      toast.error("Unable to save: User data not available");
      return;
    }
  
    const updateData: Record<string, unknown> = { email: userData.email };
  
    switch (field) {
      case "username":
        updateData.username = value;
        break;
      case "fullName":
        const nameParts = value.split(" ");
        updateData.first_name = nameParts[0] || "";
        updateData.last_name = nameParts.slice(1).join(" ") || "";
        break;
      case "shippingMethod":
      case "shippingTime":
      case "packagingType":
      case "processingTime":
        setShippingData({ ...shippingData, [field]: value });
        return;
      default:
        updateData[field] = value;
        break;
    }

    dispatch(updateUser({ id: userData.id, data: updateData }));

    const updatedUser = { ...userData };
    if (field === "fullName") {
      const nameParts = value.split(" ");
      updatedUser.first_name = nameParts[0] || "";
      updatedUser.last_name = nameParts.slice(1).join(" ") || "";
    } else if (field !== "password") {
      // @ts-expect-error: field might not exist on userData type, but assigning dynamically
      updatedUser[field] = value;
    }
    setUserData(updatedUser);
  };

  const tabs: TabItem[] = [
    { id: "account", name: "Account", icon: <User size={18} /> },
    { id: "shipment", name: "Shipment", icon: <Truck size={18} /> },
    { id: "overview", name: "Overview", icon: <Info size={18} /> },
  ];

  if (!isMounted) {
    return (
      <DashboardLayout
      title="Store Settings"
      breadcrumb="Store / Store Settings"
      activePath="/seller-dashboard/store-settings"
      defaultCollapsed={{store: false}}
      notificationCount={5}
      messageCount={2}
    >
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <Loader className="animate-spin h-8 w-8 text-primary" />
            <p className="mt-4 text-gray-600">Loading your store settings...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Store Settings"
      breadcrumb="Store / Store Settings"
      activePath="/seller-dashboard/store-settings"
      defaultCollapsed={{store: false}}
      notificationCount={5}
      messageCount={2}
    >
      {userData ? (
        <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
          <AnimatePresence>
              <motion.div
                key="mobile-sidebar"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProfileSidebar userData={userData} />
              </motion.div>
          </AnimatePresence>

          {/* Main content */}
          <div className="flex-1">
            <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}  />
            <motion.div 
            key={activeTab} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
>
            {activeTab === "account" && <ImprovedAccountTab userData={userData} isLoading={userLoading} />}
            {activeTab === "shipment" && <ImprovedShipmentTab onEditField={handleEditField} isLoading={userLoading} shippingData={shippingData} />}
            {activeTab === "overview" && <OverviewTab userData={userData} onEditField={handleEditField} />}
          </motion.div>
          </div>

          <ProfileEditModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} field={editField} value={editValue} onSave={handleSaveProfile} isLoading={userLoading} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            {authLoading ? (
              <>
                <Loader className="animate-spin h-8 w-8 text-primary" />
                <p className="mt-4 text-gray-600">Loading your profile...</p>
              </>
            ) : (
              <>
                <AlertCircle className="h-8 w-8 text-red-500" />
                <p className="mt-4 text-gray-600">Failed to load profile data</p>
                <button className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark" onClick={() => dispatch(fetchUserData())}>
                  Retry
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default StoreSetting;
