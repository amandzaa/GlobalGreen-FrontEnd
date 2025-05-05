// pages/seller-dashboard/voucher-list.tsx
import { NextPage } from "next";
import { useRouter } from "next/router";
import DashboardLayout from "@/component/layout-dashboard/DashboardLayout";
import VoucherTable from "@/component/tables/VoucherTable";
import { sampleVouchers } from "@/data/sampleVouchers";

const VoucherListPage: NextPage = () => {
  const router = useRouter();

  // Color palette from design
  const colors = {
    primary: "#2E8B57", // Medium green
    secondary: "#87CEEB", // Sky blue
    light: "#E6F4EA", // Very light cream/green
    dark: "#20603D", // Dark green
    accent: "#3474B4", // Blue (from button)
  };

  const handleDeleteVoucher = (id: string) => {
    // In a real app, this would make an API call to delete the voucher
    console.log(`Deleted voucher with ID: ${id}`);
  };

  const handleCreateNew = () => {
    // Navigate to create voucher page
    router.push("/seller-dashboard/add-voucher");
  };


  return (
    <DashboardLayout
      title="Voucher Management"
      breadcrumb="Voucher Management"
      activePath="/seller-dashboard/voucher-product"
      defaultCollapsed={{voucher:false}}
      notificationCount={5}
      messageCount={2}
    >
      <div className="bg-[#E6F4EA] min-h-screen p-6">
        {/* Voucher Table - Updated to match the component's props */}
        <VoucherTable
          vouchers={sampleVouchers}
          onDelete={handleDeleteVoucher}
          onCreateNew={handleCreateNew}
          colors={colors}
        />

        {/* Bottom section with helpful information */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-[#E6F4EA]">
          <h2 className="text-xl font-semibold text-[#20603D] mb-4">
            Voucher Strategy Tips
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#E6F4EA] p-4 rounded-lg">
              <h3 className="font-medium text-[#20603D] mb-2">
                Increase Sales
              </h3>
              <p className="text-sm text-[#20603D]/80">
                Vouchers can boost sales volume by up to 25%. Target seasonal
                produce and create limited-time offers to create urgency.
              </p>
            </div>

            <div className="bg-[#E6F4EA] p-4 rounded-lg">
              <h3 className="font-medium text-[#20603D] mb-2">
                Customer Retention
              </h3>
              <p className="text-sm text-[#20603D]/80">
                Send exclusive vouchers to repeat customers to encourage
                loyalty. Consider higher value discounts for your most valuable
                customer segments.
              </p>
            </div>

            <div className="bg-[#E6F4EA] p-4 rounded-lg">
              <h3 className="font-medium text-[#20603D] mb-2">
                New Inventory Clearance
              </h3>
              <p className="text-sm text-[#20603D]/80">
                Use targeted vouchers to help move excess inventory or introduce
                new organic produce varieties to your customer base.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VoucherListPage;