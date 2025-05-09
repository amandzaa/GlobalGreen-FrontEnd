import { UserData } from "@/types/user";
import { Mail, Phone, MapPin, User, ShoppingBag, CalendarIcon } from "lucide-react";
import { ContactInfoCard } from "./ContactInfoCard";

interface OverviewTabProps {
  userData: UserData;
  onEditField: (field: string, value: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ userData, onEditField }) => {
  return (
    <div className="p-8">
      <div className="bg-white rounded shadow-sm overflow-hidden mb-8">
        <h2 className="text-xl font-medium px-6 py-4 border-b">Store Details</h2>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-medium mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Email Address</p>
                    <p className="text-sm text-gray-600">{userData.email || "-"}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Phone Number</p>
                    <p className="text-sm text-gray-600">{userData.phone || "-"}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-gray-600">{userData.address || "-"}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Store Information */}
            <div>
              <h3 className="text-lg font-medium mb-4">Store Information</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <User className="w-6 h-6 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Username</p>
                    <p className="text-sm text-gray-600">{userData.username}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <ShoppingBag className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Store ID</p>
                    <p className="text-sm text-gray-600">{userData.store_id}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CalendarIcon className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Member Since</p>
                    <p className="text-sm text-gray-600">{userData.join_date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Subscription Information */}
          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-4">Subscription</h3>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-green-800">Premium Store Subscription</p>
                  <p className="text-sm text-green-700 mt-1">Active until January 2026</p>
                </div>
                <button className="px-3 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                  Manage
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};