import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import DashboardLayout from "@/component/layout-dashboard/DashboardLayout";
import { VoucherForm, VoucherFormData } from "@/component/vouchers/VoucherForm";
import { findVoucherById, Voucher, sampleVouchers } from "@/data/sampleVouchers"; // Update path as needed

const EditVoucherPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showVoucherSelector, setShowVoucherSelector] = useState(!id);

  useEffect(() => {
    // If ID is provided in the URL, fetch that voucher
    if (id && typeof id === "string") {
      const voucher = findVoucherById(id);
      if (voucher) {
        setSelectedVoucher(voucher);
        setShowVoucherSelector(false);
      } else {
        setShowVoucherSelector(true);
      }
    }
    setIsLoading(false);
  }, [id]);

  const handleSubmit = (formData: VoucherFormData) => {
    // In a real app, this would send data to an API to update the voucher
    console.log("Updating voucher:", formData);
    
    // Show success message and redirect
    alert("Voucher updated successfully!");
    router.push("/seller-dashboard/voucher-list");
  };

  const handleCancel = () => {
    router.push("/seller-dashboard/voucher-list");
  };

  const handleVoucherSelect = (voucherId: string) => {
    const voucher = findVoucherById(voucherId);
    if (voucher) {
      setSelectedVoucher(voucher);
      setShowVoucherSelector(false);
    }
  };

  // Format voucher data to match VoucherForm's expected structure
  const formatVoucherData = (voucher: Voucher): VoucherFormData => {
    return {
      code: voucher.code,
      title: voucher.title,
      description: voucher.description,
      discountType: voucher.discountType,
      discountValue: voucher.discountValue.toString(),
      minPurchaseAmount: voucher.minPurchaseAmount !== null ? voucher.minPurchaseAmount.toString() : "",
      maxUsage: voucher.maxUsage !== null ? voucher.maxUsage.toString() : "",
      startDate: voucher.startDate,
      startTime: voucher.startTime,
      endDate: voucher.endDate,
      endTime: voucher.endTime,
      productScope: voucher.productScope,
      specificProducts: voucher.specificProducts,
      status: voucher.status
    };
  };

  if (isLoading) {
    return (
      <DashboardLayout
        title="Edit Voucher"
        breadcrumb="Voucher Management / Edit Voucher"
        activePath="/seller-dashboard/voucher-product"
        defaultCollapsed={{voucher:false}}
        notificationCount={5}
        messageCount={2}
      >
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Edit Voucher"
      breadcrumb="Voucher Management / Edit Voucher"
      activePath="/seller-dashboard/voucher-product"
      defaultCollapsed={{voucher:false}}
      notificationCount={5}
      messageCount={2}
    >
      {showVoucherSelector ? (
        <VoucherSelector onSelect={handleVoucherSelect} />
      ) : (
        <VoucherForm 
          initialData={selectedVoucher ? formatVoucherData(selectedVoucher) : undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isEditing={true}
        />
      )}
    </DashboardLayout>
  );
};

interface VoucherSelectorProps {
  onSelect: (id: string) => void;
}

const VoucherSelector: React.FC<VoucherSelectorProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredVouchers = sampleVouchers.filter(voucher => 
    voucher.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    voucher.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Select a Voucher to Edit</h2>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search vouchers by code or title..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredVouchers.map((voucher) => (
              <tr key={voucher.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {voucher.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {voucher.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {voucher.discountType === "percentage" 
                    ? `${voucher.discountValue}%` 
                    : `$${voucher.discountValue.toFixed(2)}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${voucher.status === 'active' ? 'bg-green-100 text-green-800' : 
                    voucher.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 
                    voucher.status === 'expired' ? 'bg-red-100 text-red-800' : 
                    'bg-gray-100 text-gray-800'}`}>
                    {voucher.status.charAt(0).toUpperCase() + voucher.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => onSelect(voucher.id)}
                    className="text-blue-600 hover:text-blue-900 focus:outline-none focus:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {filteredVouchers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  No vouchers found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditVoucherPage;