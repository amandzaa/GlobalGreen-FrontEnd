// component/VoucherTable.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Search, Filter, ChevronDown, ChevronUp, Edit, Trash2, Copy, MoreVertical, Clock, Tag, Check, X, AlertCircle } from "lucide-react";
import { JSX } from "react/jsx-runtime";

// Using the existing Voucher interface from the project
import { Voucher as OriginalVoucher } from "@/data/sampleVouchers"; // Update path as needed
import { colors } from "@/types";

// Define the voucher type (matches the original interface but with some transformations for display)
export interface DisplayVoucher {
  id: string;
  name: string; // Will use 'title' from original
  code: string;
  discount: string; // Will be formatted from 'discountType' and 'discountValue'
  minPurchase: string; // Will be formatted from 'minPurchaseAmount'
  usageLimit: string; // Will be formatted from 'maxUsage'
  used: string; // Will be formatted from 'usageCount'
  startDate: string;
  endDate: string;
  status: "active" | "inactive" | "scheduled" | "expired"; // Updated to match original Voucher interface
  [key: string]: string; // Index signature to allow string indexing
}

// Define allowed sort keys
type SortKey = keyof DisplayVoucher;

// Define sort direction
type SortDirection = "ascending" | "descending";

// Props for the component
interface VoucherTableProps {
  vouchers: OriginalVoucher[];
  onDelete?: (id: string) => void;
  onCreateNew?: () => void;
}

// Status type for TypeScript checking - updated to match original interface
type VoucherStatus = "active" | "inactive" | "scheduled" | "expired";
type TabType = VoucherStatus | "all";

const VoucherTable: React.FC<VoucherTableProps> = ({ 
  vouchers: originalVouchers, 
  onDelete, 
  onCreateNew
}) => {
  const router = useRouter();
  
  // Transform original vouchers to display format
  const transformVouchers = (vouchers: OriginalVoucher[]): DisplayVoucher[] => {
    return vouchers.map(v => ({
      id: v.id,
      name: v.title,
      code: v.code,
      discount: v.discountType === "percentage" ? `${v.discountValue}%` : `${v.discountValue.toFixed(2)}`,
      minPurchase: v.minPurchaseAmount !== null ? `${v.minPurchaseAmount.toFixed(2)}` : 'None',
      usageLimit: v.maxUsage !== null ? v.maxUsage.toString() : 'Unlimited',
      used: v.usageCount.toString(),
      startDate: v.startDate,
      endDate: v.endDate,
      status: v.status,
      // Add any other fields that might be needed for display
    }));
  };
  
  const [vouchers, setVouchers] = useState(transformVouchers(originalVouchers));
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({ key: "id", direction: "ascending" });
  const [selectedTab, setSelectedTab] = useState<TabType>("all");
  
  // Update transformed vouchers when original vouchers change
  useEffect(() => {
    setVouchers(transformVouchers(originalVouchers));
  }, [originalVouchers]);
  
  // Filter vouchers based on search and tab
  const filteredVouchers = vouchers.filter(voucher => {
    const matchesSearch = 
      voucher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voucher.code.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (selectedTab === "all") return matchesSearch;
    return matchesSearch && voucher.status === selectedTab;
  });
  
  // Handle sorting
  const requestSort = (key: SortKey) => {
    let direction: SortDirection = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  
  // Sort vouchers based on current config
  const sortedVouchers = [...filteredVouchers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });
  
  // Delete voucher handler
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this voucher?")) {
      // Only call the onDelete handler, don't modify state directly
      // as the parent component should handle the state update
      if (onDelete) onDelete(id);
    }
  };
  
  // Edit voucher handler - Navigate to the edit page
  const handleEdit = (id: string) => {
    router.push(`/seller-dashboard/edit-voucher/${id}`);
  };
  
  // Handle create new voucher
  const handleCreateNew = () => {
    if (onCreateNew) {
      onCreateNew();
    } else {
      // If no callback is provided, navigate to the create new voucher page
      router.push("/seller-dashboard/edit-voucher/new");
    }
  };
  
  // Status badge component - Fixed by adding 'inactive' status
  const StatusBadge: React.FC<{ status: VoucherStatus }> = ({ status }) => {
    const statusStyles: Record<VoucherStatus, string> = {
      active: "bg-green-100 text-green-800 border-green-200",
      expired: "bg-gray-100 text-gray-500 border-gray-200",
      scheduled: "bg-blue-100 text-blue-800 border-blue-200",
      inactive: "bg-red-100 text-red-800 border-red-200" // Added missing inactive status
    };
    
    const statusIcons: Record<VoucherStatus, JSX.Element> = {
      active: <Check size={14} className="mr-1" />,
      expired: <Clock size={14} className="mr-1" />,
      scheduled: <AlertCircle size={14} className="mr-1" />,
      inactive: <X size={14} className="mr-1" /> // Added missing inactive status
    };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusStyles[status]}`}>
        {statusIcons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Card Header */}
      <div style={{ backgroundColor: colors.primary }} className="px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-medium text-white">Manage Vouchers</h2>
        <div 
          style={{ backgroundColor: colors.darkGreen }} 
          className="text-white px-4 py-2 rounded text-sm font-medium cursor-pointer"
          onClick={handleCreateNew}
        >
          + Create Voucher
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0">
        <div className="flex space-x-2">
          <button 
            onClick={() => setSelectedTab("all")}
            className={`px-3 py-2 text-sm rounded-md ${selectedTab === "all" ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-200"}`}>
            All Vouchers
          </button>
          <button 
            onClick={() => setSelectedTab("active")}
            className={`px-3 py-2 text-sm rounded-md ${selectedTab === "active" ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-200"}`}>
            Active
          </button>
          <button 
            onClick={() => setSelectedTab("scheduled")}
            className={`px-3 py-2 text-sm rounded-md ${selectedTab === "scheduled" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-200"}`}>
            Scheduled
          </button>
          <button 
            onClick={() => setSelectedTab("expired")}
            className={`px-3 py-2 text-sm rounded-md ${selectedTab === "expired" ? "bg-gray-600 text-white" : "text-gray-600 hover:bg-gray-200"}`}>
            Expired
          </button>
          <button 
            onClick={() => setSelectedTab("inactive")}
            className={`px-3 py-2 text-sm rounded-md ${selectedTab === "inactive" ? "bg-red-600 text-white" : "text-gray-600 hover:bg-gray-200"}`}>
            Inactive
          </button>
        </div>
        
        <div className="flex space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search vouchers..."
              className="pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          </div>
          
          <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600">
            <Filter size={16} className="mr-1" />
            Filter
          </button>
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("id")}
              >
                <div className="flex items-center">
                  ID
                  {sortConfig.key === "id" && (
                    sortConfig.direction === "ascending" ? 
                    <ChevronUp size={16} className="ml-1" /> : 
                    <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("name")}
              >
                <div className="flex items-center">
                  Voucher Name
                  {sortConfig.key === "name" && (
                    sortConfig.direction === "ascending" ? 
                    <ChevronUp size={16} className="ml-1" /> : 
                    <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Discount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usage
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("endDate")}
              >
                <div className="flex items-center">
                  Validity
                  {sortConfig.key === "endDate" && (
                    sortConfig.direction === "ascending" ? 
                    <ChevronUp size={16} className="ml-1" /> : 
                    <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("status")}
              >
                <div className="flex items-center">
                  Status
                  {sortConfig.key === "status" && (
                    sortConfig.direction === "ascending" ? 
                    <ChevronUp size={16} className="ml-1" /> : 
                    <ChevronDown size={16} className="ml-1" />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedVouchers.map((voucher) => (
              <tr key={voucher.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {voucher.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="font-medium">{voucher.name}</div>
                  <div className="text-xs text-gray-500">Min. Purchase: {voucher.minPurchase}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Tag size={14} className="text-gray-400 mr-2" />
                    <span className="text-sm font-medium">{voucher.code}</span>
                    <button className="ml-2 text-gray-400 hover:text-gray-600">
                      <Copy size={14} />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {voucher.discount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full" 
                        style={{ 
                          width: voucher.usageLimit === 'Unlimited' ? '0%' : 
                            `${(parseInt(voucher.used)/parseInt(voucher.usageLimit))*100}%`, 
                          backgroundColor: colors.primary 
                        }}
                      ></div>
                    </div>
                    <span className="ml-2">{voucher.used}/{voucher.usageLimit}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>{new Date(voucher.startDate).toLocaleDateString()} - </div>
                  <div>{new Date(voucher.endDate).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={voucher.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button 
                      className="p-1 text-blue-600 hover:text-blue-800"
                      onClick={() => handleEdit(voucher.id)}
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      className="p-1 text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(voucher.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                    <button className="p-1 text-gray-600 hover:text-gray-800">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedVouchers.length}</span> of{" "}
              <span className="font-medium">{sortedVouchers.length}</span> vouchers
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Previous
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                1
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Next
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherTable;