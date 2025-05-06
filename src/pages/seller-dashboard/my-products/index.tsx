// app/seller-dashboard/my-products/page.tsx
"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import DashboardLayout from "@/component/layout-dashboard/DashboardLayout";
import ProductTable from "@/component/tables/ProductTable";
import { sampleproducts } from "@/data/sampleProducts";

type ProductTab =
  | "all"
  | "live"
  | "needAction"
  | "underReview"
  | "notYetDisplayed";

export default function MyProductsPage() {
  const [activeTab, setActiveTab] = useState<ProductTab>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on active tab
  const getFilteredProducts = () => {
    let filtered = [...sampleproducts];

    // Filter by tab
    if (activeTab === "live") {
      filtered = filtered.filter((p) => p.status === "live");
    } else if (activeTab === "needAction") {
      filtered = filtered.filter((p) => p.status === "needImproved");
    } else if (activeTab === "underReview") {
      filtered = filtered.filter((p) => p.status === "underReview");
    } else if (activeTab === "notYetDisplayed") {
      filtered = filtered.filter((p) => p.status === "notYetDisplayed");
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.productId.includes(searchTerm) ||
          p.parentSku.includes(searchTerm)
      );
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  // Get counts for tabs
  const liveCount = sampleproducts.filter((p) => p.status === "live").length;
  const needActionCount = sampleproducts.filter(
    (p) => p.status === "needImproved"
  ).length;
  const underReviewCount = sampleproducts.filter(
    (p) => p.status === "underReview"
  ).length;
  const notYetDisplayedCount = sampleproducts.filter(
    (p) => p.status === "notYetDisplayed"
  ).length;

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <DashboardLayout
      title="My Products"
      breadcrumb="Product > My Products"
      activePath="/seller-dashboard/my-products"
      defaultCollapsed={{product: false}}
      notificationCount={38}
      messageCount={1}
    >
      <div className="p-6 bg-[#F7FAF7]">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-medium text-[var(--color-darkGreen)]">My Products</h1>
          <div className="flex gap-2">
            <div className="relative">
              <button className="px-4 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] rounded text-sm bg-white hover:bg-[#F7FAF7] flex items-center">
                Product Settings <ChevronDown size={16} className="ml-2" />
              </button>
            </div>
            <div className="relative">
              <button className="px-4 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] rounded text-sm bg-white hover:bg-[#F7FAF7] flex items-center">
                Mass Setup <ChevronDown size={16} className="ml-2" />
              </button>
            </div>
            <button className="bg-[var(--color-primary)] text-white px-4 py-2 rounded text-sm font-medium flex items-center hover:bg-[var(--color-darkGreen)]">
              <span className="mr-1">+</span> Add New Product
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] block w-full pl-10 p-2.5"
              placeholder="Search by product name, ID or SKU..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Product Tabs */}
        <div className="border-b border-gray-200 bg-white rounded-t-md shadow-sm">
          <div className="flex">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "all"
                  ? "text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]"
                  : "text-gray-600 hover:text-[var(--color-primary)]"
              }`}
            >
              All ({sampleproducts.length})
            </button>
            <button
              onClick={() => setActiveTab("live")}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "live"
                  ? "text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]"
                  : "text-gray-600 hover:text-[var(--color-primary)]"
              }`}
            >
              Live ({liveCount})
            </button>
            <button
              onClick={() => setActiveTab("needAction")}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "needAction"
                  ? "text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]"
                  : "text-gray-600 hover:text-[var(--color-primary)]"
              }`}
            >
              Need Action ({needActionCount})
            </button>
            <button
              onClick={() => setActiveTab("underReview")}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "underReview"
                  ? "text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]"
                  : "text-gray-600 hover:text-[var(--color-primary)]"
              }`}
            >
              Under Review by GlobalGreen ({underReviewCount})
            </button>
            <button
              onClick={() => setActiveTab("notYetDisplayed")}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "notYetDisplayed"
                  ? "text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]"
                  : "text-gray-600 hover:text-[var(--color-primary)]"
              }`}
            >
              Not Yet Displayed ({notYetDisplayedCount})
            </button>
          </div>
        </div>

        {/* Product Table */}
        <div className="mt-4">
          <ProductTable products={filteredProducts} itemsPerPage={5} />
        </div>
      </div>
    </DashboardLayout>
  );
}