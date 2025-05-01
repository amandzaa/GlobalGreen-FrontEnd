// pages/seller-dashboard/create-voucher.tsx
import { NextPage } from "next";
import { useState } from "react";
import DashboardLayout from "@/component/dashboardNavbarLayout/DashboardLayout";
import VoucherForm from "@/component/VoucherForm";
import { AlertCircle, CheckCircle } from "lucide-react";

const CreateVoucherPage: NextPage = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleSubmit = (formData: any) => {
    console.log("Voucher form submitted:", formData);
    // Here you would typically send the data to your API
    setShowSuccess(true);
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    // Handle navigation back to voucher list
    window.history.back();
  };

  const defaultCollapsed = {
    order: true,
    product: false,
    finance: true,
    store: true,
  };

  // Color palette from design
  const colors = {
    primary: "#2E8B57",    // Medium green
    secondary: "#87CEEB",  // Sky blue
    light: "#E6F4EA",      // Very light cream/green
    dark: "#20603D",       // Dark green
    accent: "#3474B4"      // Blue (from button)
  };

  return (
    <DashboardLayout
      title="Add New Voucher"
      breadcrumb="Add New Voucher"
      activePath="/seller-dashboard/voucher-product"
      defaultCollapsed={defaultCollapsed}
      notificationCount={5}
      messageCount={2}
    >
      <div className="bg-[#E6F4EA] min-h-screen p-6">
        {/* Header with GlobalGreen branding */}
        <div className="flex items-center mb-8">
          <div 
            className="w-10 h-10 rounded-full mr-3"
            style={{
              background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary}, ${colors.light}, ${colors.dark})`,
            }}
          ></div>
          <h1 className="text-2xl font-bold text-[#20603D]">GlobalGreen | Create Voucher</h1>
        </div>

        {/* Success Alert */}
        {showSuccess && (
          <div className="mb-6 bg-[#E6F4EA] border-l-4 border-[#2E8B57] p-4 rounded shadow-sm flex items-center">
            <CheckCircle className="text-[#2E8B57] mr-3" size={20} />
            <p className="text-[#20603D]">Voucher has been successfully created!</p>
          </div>
        )}

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E6F4EA] overflow-hidden">
          {/* Card Header */}
          <div className="bg-[#2E8B57] px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-medium text-white">Create New Promotional Voucher</h2>
            <div className="bg-[#20603D] text-white px-3 py-1 rounded-full text-sm">
              Fresh Deals
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-[#E6F4EA] p-4 border-b border-[#87CEEB]/30 flex items-start">
            <AlertCircle className="text-[#20603D] mr-3 mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="text-[#20603D] font-medium">Voucher Creation Tips</p>
              <p className="text-sm text-[#20603D]/80">
                Strategic vouchers can increase sales by up to 25%. Consider seasonal promotions for 
                fruits and vegetables currently in harvest.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-6">
            <VoucherForm 
              onSubmit={handleSubmit} 
              onCancel={handleCancel} 
              primaryColor={colors.primary}
              secondaryColor={colors.secondary}
              accentColor={colors.accent}
            />
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionCard 
            title="Seasonal Promotions" 
            description="Create vouchers for in-season produce"
            bgColor={colors.primary}
          />
          <QuickActionCard 
            title="Bundle Deals" 
            description="Promote complementary fruits & vegetables"
            bgColor={colors.secondary}
          />
          <QuickActionCard 
            title="New Customer Offers" 
            description="Welcome first-time buyers with special deals"
            bgColor={colors.dark}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

const QuickActionCard = ({ 
  title, 
  description, 
  bgColor 
}: { 
  title: string, 
  description: string, 
  bgColor: string 
}) => (
  <div 
    className="p-4 rounded-lg text-white cursor-pointer transition-transform hover:scale-105" 
    style={{ backgroundColor: bgColor }}
  >
    <h3 className="font-medium mb-2">{title}</h3>
    <p className="text-sm opacity-90">{description}</p>
  </div>
);

export default CreateVoucherPage;