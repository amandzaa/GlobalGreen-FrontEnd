// Improved inline editing version of ShipmentTab
import React from "react";
import { Truck, Package, Clock } from "lucide-react";
import { ProfileField } from "./ProfileField";

interface ShipmentTabProps {
  onEditField: (field: string, value: string) => void;
  isLoading?: boolean;
  shippingData: {
    shippingMethod: string;
    shippingTime: string;
    packagingType: string;
    processingTime: string;
  };
}

export const ImprovedShipmentTab: React.FC<ShipmentTabProps> = ({
  onEditField,
  isLoading = false,
  shippingData = {
    shippingMethod: "Standard Shipping",
    shippingTime: "3-5 business days",
    packagingType: "Eco-friendly packaging",
    processingTime: "1-2 business days"
  }
}) => {
  return (
    <div className="p-8">

    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-primary bg-opacity-10 rounded-full mr-3">
              <Truck size={20} className="text-primary" />
            </div>
            <h3 className="text-lg font-medium">Shipping Details</h3>
          </div>
          
          <ProfileField
            label="Shipping Method"
            value={shippingData.shippingMethod}
            field="shippingMethod"
            onEdit={onEditField}
            isLoading={isLoading}
            variant="compact"
          />
          
          <ProfileField
            label="Shipping Time"
            value={shippingData.shippingTime}
            field="shippingTime"
            onEdit={onEditField}
            isLoading={isLoading}
            variant="compact"
          />
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-primary bg-opacity-10 rounded-full mr-3">
              <Package size={20} className="text-primary" />
            </div>
            <h3 className="text-lg font-medium">Packaging</h3>
          </div>
          
          <ProfileField
            label="Packaging Type"
            value={shippingData.packagingType}
            field="packagingType"
            onEdit={onEditField}
            isLoading={isLoading}
            variant="compact"
          />
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-primary bg-opacity-10 rounded-full mr-3">
              <Clock size={20} className="text-primary" />
            </div>
            <h3 className="text-lg font-medium">Processing Time</h3>
          </div>
          
          <ProfileField
            label="Processing Time"
            value={shippingData.processingTime}
            field="processingTime"
            onEdit={onEditField}
            isLoading={isLoading}
            variant="compact"
          />
        </div>
      </div>
    </div>
    </div>
  );
};