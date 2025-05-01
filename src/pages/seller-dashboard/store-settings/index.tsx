import React, { useState } from "react";
import { Info, ChevronDown, ShoppingBag, Bell, Settings, CreditCard, MessageSquare, Calendar, Lock, User } from "lucide-react";

// TypeScript interfaces
interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PhoneEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalGreenDashboard = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [userData, setUserData] = useState({
    username: "garden_lover",
    phone: "******92",
    email: "ga*****@gmail.com",
  });

  // Modal states
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  const handleSaveProfile = (newUsername: string) => {
    setUserData({
      ...userData,
      username: newUsername,
    });
    setIsProfileModalOpen(false);
  };

  const handleSavePhone = (newPhone: string) => {
    setUserData({
      ...userData,
      phone: newPhone,
    });
    setIsPhoneModalOpen(false);
  };

  const tabs = [
    { id: "account", name: "Account & Security", icon: <Lock size={18} /> },
    { id: "orders", name: "My Orders", icon: <ShoppingBag size={18} /> },
    { id: "payment", name: "Payment Methods", icon: <CreditCard size={18} /> },
    { id: "delivery", name: "Delivery Addresses", icon: <User size={18} /> },
    { id: "notifications", name: "Notifications", icon: <Bell size={18} /> },
    { id: "subscription", name: "Subscriptions", icon: <Calendar size={18} /> },
  ];

  // Profile edit modal
  const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, onClose }) => {
    const [newUsername, setNewUsername] = useState(userData.username);
    
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Username</h2>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSaveProfile(newUsername)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Phone edit modal
  const PhoneEditModal: React.FC<PhoneEditModalProps> = ({ isOpen, onClose }) => {
    const [newPhone, setNewPhone] = useState(userData.phone);
    
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Phone Number</h2>
          <input
            type="text"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSavePhone(newPhone)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#E6F4EA]">
      {/* Sidebar */}
      <div className="w-64 bg-[#20603D] text-white p-4">
        <div className="flex items-center justify-center mb-10 mt-4">
          <h1 className="text-2xl font-bold">GlobalGreen</h1>
        </div>
        
        <div className="space-y-1">
          <div className="mb-4">
            <p className="text-[#87CEEB] uppercase text-xs font-semibold mb-2 pl-2">Main Menu</p>
            <div className="bg-[#2E8B57] text-white rounded-md p-2 flex items-center">
              <ShoppingBag size={18} className="mr-2" />
              <span>My Store</span>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-[#87CEEB] uppercase text-xs font-semibold mb-2 pl-2">Account</p>
            {tabs.map((tab) => (
              <div 
                key={tab.id}
                className={`cursor-pointer p-2 rounded-md flex items-center ${activeTab === tab.id ? 'bg-[#2E8B57] text-white' : 'text-white hover:bg-[#2E8B57]/50'}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span className="ml-2">{tab.name}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-auto pt-20">
            <div className="p-2 hover:bg-[#2E8B57]/50 rounded-md cursor-pointer flex items-center">
              <Settings size={18} className="mr-2" />
              <span>Settings</span>
            </div>
            <div className="p-2 hover:bg-[#2E8B57]/50 rounded-md cursor-pointer flex items-center">
              <span>Log Out</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-[#20603D]">My Account</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell size={20} className="text-gray-600" />
              </button>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#2E8B57] text-white flex items-center justify-center">
                  <span>GL</span>
                </div>
                <span className="ml-2 text-gray-700">{userData.username}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="p-4 text-sm">
          <span className="text-gray-500">Home / My Account / Account & Security</span>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-6 py-4 text-sm font-medium whitespace-nowrap flex items-center ${
                      activeTab === tab.id
                        ? "text-[#2E8B57] border-b-2 border-[#2E8B57]"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.icon}
                    <span className="ml-2">{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Account Information */}
            <div className="p-6">
              <h2 className="text-xl font-medium mb-6 text-[#20603D]">Account Information</h2>

              {/* My Profile */}
              <div className="py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="font-medium">My Profile</div>
                  <div className="flex items-center">
                    <div className="flex items-center mr-8">
                      <div className="w-8 h-8 rounded-full bg-[#2E8B57] flex items-center justify-center mr-2 overflow-hidden text-white">
                        <span className="text-xs">GL</span>
                      </div>
                      <span>{userData.username}</span>
                    </div>
                    <button
                      onClick={() => setIsProfileModalOpen(true)}
                      className="px-4 py-1.5 border border-[#2E8B57] text-[#2E8B57] rounded-md text-sm hover:bg-[#E6F4EA]"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>

              {/* Telephone */}
              <div className="py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Telephone</div>
                  <div className="flex items-center">
                    <span className="mr-8">{userData.phone}</span>
                    <button
                      onClick={() => setIsPhoneModalOpen(true)}
                      className="px-4 py-1.5 border border-[#2E8B57] text-[#2E8B57] rounded-md text-sm hover:bg-[#E6F4EA]"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Email</div>
                  <div className="flex items-center">
                    <span className="mr-8">{userData.email}</span>
                    <button className="px-4 py-1.5 border border-[#2E8B57] text-[#2E8B57] rounded-md text-sm hover:bg-[#E6F4EA]">
                      Change
                    </button>
                  </div>
                </div>
              </div>

              {/* Account password */}
              <div className="py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Account password</div>
                  <div className="flex items-center">
                    <span className="mr-8 text-gray-500">
                      Please change your password regularly to keep your GlobalGreen account secure.
                    </span>
                    <button className="px-4 py-1.5 bg-[#2E8B57] text-white rounded-md text-sm hover:bg-[#20603D]">
                      Update
                    </button>
                  </div>
                </div>
              </div>

              {/* Subscription Plan */}
              <div className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center font-medium">
                    <span>Weekly Produce Box</span>
                    <Info size={16} className="ml-2 text-gray-400" />
                  </div>
                  <div className="flex items-center">
                    <span className="mr-8 px-2 py-1 bg-[#87CEEB]/20 text-[#20603D] rounded">Active</span>
                    <button className="px-4 py-1.5 bg-[#87CEEB] text-white rounded-md text-sm hover:bg-[#87CEEB]/80 flex items-center">
                      Manage
                      <ChevronDown size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ProfileEditModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      <PhoneEditModal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
      />
    </div>
  );
};

export default GlobalGreenDashboard;