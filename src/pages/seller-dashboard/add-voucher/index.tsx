import { NextPage } from "next";
import { useRouter } from "next/router";
import DashboardLayout from "@/component/layout-dashboard/DashboardLayout";
import { VoucherForm, VoucherFormData } from "@/component/vouchers/VoucherForm";

const CreateVoucherPage: NextPage = () => {
  const router = useRouter();
  
  // Default values are already handled in the VoucherForm component

  const handleSubmit = (formData: VoucherFormData) => {
    // In a real app, this would send data to an API
    console.log("Submitting voucher:", formData);
    
    // Show success message and redirect
    alert("Voucher created successfully!");
    router.push("/seller-dashboard/voucher-list");
  };

  const handleCancel = () => {
    router.push("/seller-dashboard/voucher-list");
  };

  return (
    <DashboardLayout
      title="Create New Voucher"
      breadcrumb="Voucher Management / Create New Voucher"
      activePath="/seller-dashboard/add-voucher"
      defaultCollapsed={{voucher:false}}
      notificationCount={5}
      messageCount={2}
    >
      <VoucherForm 
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditing={false}
      />
    </DashboardLayout>
  );
};

export default CreateVoucherPage;